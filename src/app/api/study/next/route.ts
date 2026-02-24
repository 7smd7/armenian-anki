// API route for fetching the next card to study
// GET /api/study/next?deckId=xxx&topic=xxx

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const userId = session.user.id;
        const searchParams = request.nextUrl.searchParams;
        const deckId = searchParams.get("deckId");
        const topic = searchParams.get("topic");
        const reverseMode = searchParams.get("reverse") === "true";
        const skipParam = searchParams.get("skip");
        const skipIds = skipParam ? skipParam.split(",").filter(Boolean) : [];

        if (!deckId) {
            return NextResponse.json(
                { error: "deckId required" },
                { status: 400 },
            );
        }

        // Verify deck ownership
        const deck = await prisma.deck.findUnique({
            where: { id: deckId },
        });

        if (!deck || deck.ownerId !== userId) {
            return NextResponse.json(
                { error: "Deck not found" },
                { status: 404 },
            );
        }

        // Backfill missing user states for this deck (for decks imported before state initialization existed)
        const totalCards = await prisma.card.count({
            where: { deckId, isActive: true },
        });

        const totalStates = await prisma.userCardState.count({
            where: {
                userId,
                card: { deckId },
            },
        });

        if (totalCards > 0 && totalStates < totalCards) {
            const deckCards = await prisma.card.findMany({
                where: { deckId, isActive: true },
                select: { id: true },
            });

            if (deckCards.length > 0) {
                await prisma.userCardState.createMany({
                    data: deckCards.map((card) => ({
                        userId,
                        cardId: card.id,
                    })),
                    skipDuplicates: true,
                });
            }
        }

        // Find next card to study
        // Query for cards in deck that are:
        // 1. Active
        // 2. Not mastered (isMastered = false)
        // 3. Due for review (dueAt <= now)
        // 4. Optionally filtered by topic
        // 5. Not suspended

        const now = new Date();

        const query = prisma.card.findFirst({
            where: {
                deckId,
                isActive: true,
                ...(skipIds.length > 0 ? { id: { notIn: skipIds } } : {}),
                userStates: {
                    some: {
                        userId,
                        isMastered: false,
                        dueAt: { lte: now },
                        suspendedAt: null,
                    },
                },
                ...(topic ? { topic } : {}),
            },
            include: {
                userStates: {
                    where: { userId },
                },
            },
            orderBy: {
                userStates: {
                    _count: "asc", // Cards with fewer reviews first
                },
            },
        });

        // Fallback: if no card is due, fetch the earliest upcoming card
        let card = await query;

        if (!card) {
            card = await prisma.card.findFirst({
                where: {
                    deckId,
                    isActive: true,
                    ...(skipIds.length > 0 ? { id: { notIn: skipIds } } : {}),
                    userStates: {
                        some: {
                            userId,
                            isMastered: false,
                            suspendedAt: null,
                        },
                    },
                    ...(topic ? { topic } : {}),
                },
                include: {
                    userStates: {
                        where: { userId },
                    },
                },
                orderBy: {
                    userStates: {
                        _count: "asc",
                    },
                },
            });
        }

        if (!card) {
            return NextResponse.json({
                card: null,
                remaining: 0,
                totalCards,
                completed: true,
            });
        }

        const cardState = card.userStates[0];

        // Count remaining cards
        const remaining = await prisma.card.count({
            where: {
                deckId,
                isActive: true,
                userStates: {
                    some: {
                        userId,
                        isMastered: false,
                        suspendedAt: null,
                    },
                },
                ...(topic ? { topic } : {}),
            },
        });

        return NextResponse.json({
            card: {
                id: card.id,
                armenianScript: card.armenianScript,
                translit: card.translit,
                englishMeaning: card.englishMeaning,
                exampleSentence: card.exampleSentence,
                exampleTranslation: card.exampleTranslation,
                grammar: card.grammar,
                cheatPhrase: card.cheatPhrase,
                topic: card.topic,
            },
            totalCards,
            state: {
                cardStateId: cardState.id,
                reps: cardState.repetitions,
                interval: cardState.interval,
                ease: cardState.easeFactor,
                lapses: cardState.lapses,
                isForwardLearned: cardState.isForwardLearned,
                isReverseLearned: cardState.isReverseLearned,
                isMastered: cardState.isMastered,
            },
            reverse: reverseMode,
            remaining,
        });
    } catch (error) {
        console.error("Study next error:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch next card",
                details: error instanceof Error ? error.message : undefined,
            },
            { status: 500 },
        );
    }
}
