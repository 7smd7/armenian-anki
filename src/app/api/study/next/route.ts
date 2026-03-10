// API route for fetching the next card to study
// GET /api/study/next?deckId=xxx&topic=xxx
//
// Implements the simplified next-card selection algorithm:
// 1. Learning card due now (same-day reinforcement)
// 2. Review card due now (oldest-due first)
// 3. New card (only if openLearningTodayCount < ACTIVE_LEARNING_LIMIT)
// 4. Session complete
//
// Cards scheduled later today are simply ignored until they become due.
// No wait states — the user is never blocked.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
    ACTIVE_LEARNING_LIMIT,
    startOfUTCDay,
    startOfNextUTCDay,
} from "@/lib/srs/learning-overlay";
import { decideMixDirection } from "@/lib/srs/mastery";

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
        // "mix" | "forward" | "reverse" — default to mix
        const directionParam = searchParams.get("direction") ?? "mix";
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

        // Backfill missing user states for this deck
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

        // ── Time boundaries (UTC) ──
        const now = new Date();
        const startOfToday = startOfUTCDay(now);
        const startOfTomorrow = startOfNextUTCDay(now);

        // ── Shared WHERE clause ──
        const COMMON = {
            userId,
            card: {
                deckId,
                isActive: true,
                ...(skipIds.length > 0 ? { id: { notIn: skipIds } } : {}),
                ...(topic ? { topic } : {}),
            },
            isMastered: false,
            suspendedAt: null,
        };

        // ── Remaining (non-mastered, non-suspended) count ──
        const remaining = await prisma.userCardState.count({
            where: COMMON,
        });

        // ── Priority 1: learning card due now ──
        const learningDue = await prisma.userCardState.findFirst({
            where: {
                ...COMMON,
                lastReviewedAt: { gte: startOfToday },
                dueAt: { lte: now },
            },
            orderBy: { dueAt: "asc" },
            include: { card: true },
        });

        if (learningDue) {
            return buildCardResponse(learningDue, directionParam, totalCards, remaining);
        }

        // ── Priority 2: review card due now ──
        const reviewDue = await prisma.userCardState.findFirst({
            where: {
                ...COMMON,
                lastReviewedAt: { not: null, lt: startOfToday },
                dueAt: { lte: now },
            },
            orderBy: { dueAt: "asc" },
            include: { card: true },
        });

        if (reviewDue) {
            return buildCardResponse(reviewDue, directionParam, totalCards, remaining);
        }

        // ── Priority 3: new card (only if under learning limit) ──
        const openCount = await prisma.userCardState.count({
            where: {
                ...COMMON,
                lastReviewedAt: { gte: startOfToday },
                dueAt: { lt: startOfTomorrow },
            },
        });

        if (openCount < ACTIVE_LEARNING_LIMIT) {
            const newCard = await prisma.userCardState.findFirst({
                where: {
                    ...COMMON,
                    lastReviewedAt: null,
                },
                orderBy: { card: { createdAt: "asc" } },
                include: { card: true },
            });

            if (newCard) {
                return buildCardResponse(newCard, directionParam, totalCards, remaining);
            }
        }

        // ── Priority 4: session complete ──
        return NextResponse.json({
            card: null,
            remaining: 0,
            totalCards,
            completed: true,
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

// ── Response builder ──────────────────────────────────────
function buildCardResponse(
    cardState: {
        id: string;
        easeFactor: number;
        interval: number;
        repetitions: number;
        lapses: number;
        isForwardLearned: boolean;
        isReverseLearned: boolean;
        isMastered: boolean;
        card: {
            id: string;
            armenianScript: string;
            translit: string;
            englishMeaning: string;
            exampleSentence: string | null;
            exampleTranslation: string | null;
            grammar: string | null;
            cheatPhrase: string | null;
            topic: string | null;
        };
    },
    direction: string,
    totalCards: number,
    remaining: number,
) {
    const reverseMode =
        direction === "mix"
            ? decideMixDirection({
                  isForwardLearned: cardState.isForwardLearned,
                  isReverseLearned: cardState.isReverseLearned,
              })
            : direction === "reverse";
    return NextResponse.json({
        card: {
            id: cardState.card.id,
            armenianScript: cardState.card.armenianScript,
            translit: cardState.card.translit,
            englishMeaning: cardState.card.englishMeaning,
            exampleSentence: cardState.card.exampleSentence,
            exampleTranslation: cardState.card.exampleTranslation,
            grammar: cardState.card.grammar,
            cheatPhrase: cardState.card.cheatPhrase,
            topic: cardState.card.topic,
        },
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
        totalCards,
        remaining,
    });
}
