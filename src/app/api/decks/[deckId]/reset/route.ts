// POST /api/decks/[deckId]/reset
// Resets the current user's SRS progress for every card in the deck.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface RouteContext {
    params: Promise<{ deckId: string }>;
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    const session = await auth();
    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { deckId } = await params;

    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck || deck.ownerId !== userId) {
        return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    const freshDefaults = {
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        lapses: 0,
        dueAt: new Date(),
        lastReviewedAt: null,
        isForwardLearned: false,
        isReverseLearned: false,
        isMastered: false,
        suspendedAt: null,
    };

    // Reset every UserCardState row belonging to this user in this deck
    const result = await prisma.userCardState.updateMany({
        where: {
            userId,
            card: { deckId, isActive: true },
        },
        data: freshDefaults,
    });

    return NextResponse.json({ reset: result.count });
}
