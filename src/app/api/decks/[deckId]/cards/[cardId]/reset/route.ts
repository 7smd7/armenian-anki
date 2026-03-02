// POST /api/decks/[deckId]/cards/[cardId]/reset
// Resets the current user's SRS progress for a single card back to defaults.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface RouteContext {
    params: Promise<{ deckId: string; cardId: string }>;
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    const session = await auth();
    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { deckId, cardId } = await params;

    // Verify the card belongs to this deck and the deck belongs to this user
    const card = await prisma.card.findUnique({
        where: { id: cardId },
        include: { deck: true },
    });
    if (!card || card.deckId !== deckId || card.deck.ownerId !== userId) {
        return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    // Upsert: reset to factory defaults if exists, create fresh if not
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

    const state = await prisma.userCardState.upsert({
        where: { userId_cardId: { userId, cardId } },
        create: { userId, cardId, ...freshDefaults },
        update: freshDefaults,
    });

    return NextResponse.json({ state });
}
