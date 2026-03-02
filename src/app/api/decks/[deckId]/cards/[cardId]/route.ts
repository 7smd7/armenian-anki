// PATCH /api/decks/[deckId]/cards/[cardId] — edit card fields
// DELETE /api/decks/[deckId]/cards/[cardId] — soft-delete card

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface RouteContext {
    params: Promise<{ deckId: string; cardId: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
    const session = await auth();
    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { deckId, cardId } = await params;

    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck || deck.ownerId !== userId) {
        return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    const card = await prisma.card.findUnique({ where: { id: cardId } });
    if (!card || card.deckId !== deckId) {
        return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
        armenianScript,
        translit,
        englishMeaning,
        exampleSentence,
        exampleTranslation,
        grammar,
        cheatPhrase,
        topic,
    } = body;

    const updated = await prisma.card.update({
        where: { id: cardId },
        data: {
            ...(armenianScript?.trim() && {
                armenianScript: armenianScript.trim(),
            }),
            ...(translit?.trim() && { translit: translit.trim() }),
            ...(englishMeaning?.trim() && {
                englishMeaning: englishMeaning.trim(),
            }),
            exampleSentence: exampleSentence?.trim() || null,
            exampleTranslation: exampleTranslation?.trim() || null,
            grammar: grammar?.trim() || null,
            cheatPhrase: cheatPhrase?.trim() || null,
            topic: topic?.trim() || null,
        },
    });

    return NextResponse.json({ card: updated });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    const session = await auth();
    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { deckId, cardId } = await params;

    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck || deck.ownerId !== userId) {
        return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    const card = await prisma.card.findUnique({ where: { id: cardId } });
    if (!card || card.deckId !== deckId) {
        return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    // Soft delete: mark inactive rather than destroy (preserves review logs)
    await prisma.card.update({
        where: { id: cardId },
        data: { isActive: false },
    });

    return NextResponse.json({ success: true });
}
