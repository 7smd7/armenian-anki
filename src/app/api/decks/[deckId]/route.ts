// PATCH /api/decks/[deckId] — rename deck
// DELETE /api/decks/[deckId] — delete deck and all its data

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/server-utils";

interface RouteContext {
    params: Promise<{ deckId: string }>;
}

async function getOwnedDeck(deckId: string, userId: string) {
    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck || deck.ownerId !== userId) return null;
    return deck;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
    const session = await auth();
    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { deckId } = await params;

    const deck = await getOwnedDeck(deckId, userId);
    if (!deck)
        return NextResponse.json({ error: "Deck not found" }, { status: 404 });

    const body = await request.json();
    const { title, description } = body;

    if (!title?.trim()) {
        return NextResponse.json({ error: "Title required" }, { status: 400 });
    }

    const newSlug = generateSlug(title);

    // Check slug collision (other decks with same slug)
    const collision = await prisma.deck.findFirst({
        where: { ownerId: userId, slug: newSlug, id: { not: deckId } },
    });
    if (collision) {
        return NextResponse.json(
            { error: "A deck with this title already exists" },
            { status: 409 },
        );
    }

    const updated = await prisma.deck.update({
        where: { id: deckId },
        data: {
            title: title.trim(),
            slug: newSlug,
            description: description ?? deck.description,
        },
    });

    return NextResponse.json({ deck: updated });
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    const session = await auth();
    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { deckId } = await params;

    const deck = await getOwnedDeck(deckId, userId);
    if (!deck)
        return NextResponse.json({ error: "Deck not found" }, { status: 404 });

    // Delete cascade: ReviewLogs → UserCardStates → Cards → ImportJobs → Deck
    await prisma.$transaction(async (tx) => {
        const cards = await tx.card.findMany({
            where: { deckId },
            select: { id: true },
        });
        const cardIds = cards.map((c) => c.id);

        if (cardIds.length > 0) {
            await tx.reviewLog.deleteMany({
                where: { cardId: { in: cardIds } },
            });
            await tx.userCardState.deleteMany({
                where: { cardId: { in: cardIds } },
            });
            await tx.card.deleteMany({ where: { deckId } });
        }

        await tx.importJob.deleteMany({ where: { deckId } });
        await tx.deck.delete({ where: { id: deckId } });
    });

    return NextResponse.json({ success: true });
}
