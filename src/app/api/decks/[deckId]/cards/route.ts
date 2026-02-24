// GET  /api/decks/[deckId]/cards  — paginated card list (for manage page)
// POST /api/decks/[deckId]/cards  — add a single card to a deck

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface RouteContext {
    params: Promise<{ deckId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
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

    const url = new URL(request.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
    const pageSize = Math.min(
        100,
        parseInt(url.searchParams.get("pageSize") ?? "50"),
    );
    const search = url.searchParams.get("search") ?? "";

    const where = {
        deckId,
        isActive: true,
        ...(search
            ? {
                  OR: [
                      {
                          armenianScript: {
                              contains: search,
                              mode: "insensitive" as const,
                          },
                      },
                      {
                          englishMeaning: {
                              contains: search,
                              mode: "insensitive" as const,
                          },
                      },
                      {
                          topic: {
                              contains: search,
                              mode: "insensitive" as const,
                          },
                      },
                  ],
              }
            : {}),
    };

    const [cards, total] = await Promise.all([
        prisma.card.findMany({
            where,
            orderBy: { createdAt: "asc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.card.count({ where }),
    ]);

    return NextResponse.json({
        cards,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    });
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
        difficultyBase,
    } = body;

    if (
        !armenianScript?.trim() ||
        !translit?.trim() ||
        !englishMeaning?.trim()
    ) {
        return NextResponse.json(
            {
                error: "armenianScript, translit, and englishMeaning are required",
            },
            { status: 400 },
        );
    }

    const card = await prisma.card.create({
        data: {
            deckId,
            armenianScript: armenianScript.trim(),
            translit: translit.trim(),
            englishMeaning: englishMeaning.trim(),
            exampleSentence: exampleSentence?.trim() || null,
            exampleTranslation: exampleTranslation?.trim() || null,
            grammar: grammar?.trim() || null,
            cheatPhrase: cheatPhrase?.trim() || null,
            topic: topic?.trim() || null,
            difficultyBase: difficultyBase ? parseInt(difficultyBase) : null,
        },
    });

    // Create UserCardState for the deck owner
    await prisma.userCardState.create({
        data: { userId, cardId: card.id },
    });

    return NextResponse.json({ card }, { status: 201 });
}
