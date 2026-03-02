// GET  /api/decks/[deckId]/cards  — paginated card list with SRS state, sort, filter, stats
// POST /api/decks/[deckId]/cards  — add a single card to a deck

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface RouteContext {
    params: Promise<{ deckId: string }>;
}

type SortField = "createdAt" | "easeFactor" | "lapses" | "dueAt" | "repetitions";
type SortOrder = "asc" | "desc";
type FilterOption = "all" | "mastered" | "unmastered" | "hard" | "easy" | "due";

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
    const pageSize = Math.min(100, parseInt(url.searchParams.get("pageSize") ?? "30"));
    const search = url.searchParams.get("search") ?? "";
    const sort = (url.searchParams.get("sort") ?? "createdAt") as SortField;
    const order = (url.searchParams.get("order") ?? "asc") as SortOrder;
    const filter = (url.searchParams.get("filter") ?? "all") as FilterOption;
    const category = url.searchParams.get("category") ?? "all";

    const searchWhere = search
        ? {
              OR: [
                  { armenianScript: { contains: search, mode: "insensitive" as const } },
                  { englishMeaning: { contains: search, mode: "insensitive" as const } },
                  { topic: { contains: search, mode: "insensitive" as const } },
              ],
          }
        : {};

    const baseWhere = {
        deckId,
        isActive: true,
        ...(category !== "all" ? { topic: category } : {}),
        ...searchWhere,
    };

    // Fetch deck-wide stats (unaffected by current search/filter)
    const [totalCardsInDeck, deckUserStates, categoryRows] = await Promise.all([
        prisma.card.count({ where: { deckId, isActive: true } }),
        prisma.userCardState.findMany({
            where: { userId, card: { deckId, isActive: true } },
            select: {
                isMastered: true,
                isForwardLearned: true,
                dueAt: true,
            },
        }),
        prisma.card.findMany({
            where: { deckId, isActive: true, topic: { not: null } },
            select: { topic: true },
            distinct: ["topic"],
            orderBy: { topic: "asc" },
        }),
    ]);

    const categories = categoryRows
        .map((row) => row.topic?.trim())
        .filter((topic): topic is string => Boolean(topic));

    const now = new Date();
    const stats = {
        total: totalCardsInDeck,
        mastered: deckUserStates.filter((s) => s.isMastered).length,
        learning: deckUserStates.filter((s) => !s.isMastered && s.isForwardLearned).length,
        dueToday: deckUserStates.filter(
            (s) => !s.isMastered && new Date(s.dueAt) <= now,
        ).length,
        notStarted: totalCardsInDeck - deckUserStates.length,
    };

    // Fetch all matching cards + their SRS state for in-memory sort/filter
    const allCards = await prisma.card.findMany({
        where: baseWhere,
        include: {
            userStates: {
                where: { userId },
                take: 1,
            },
        },
        orderBy: { createdAt: "asc" }, // base order; overridden below
    });

    // Filter
    const filtered = allCards.filter((card) => {
        const s = card.userStates[0] ?? null;
        switch (filter) {
            case "mastered":   return s?.isMastered === true;
            case "unmastered": return !s || !s.isMastered;
            case "hard":       return s ? s.easeFactor < 1.8 : false;
            case "easy":       return s ? s.easeFactor >= 2.3 : false;
            case "due":        return !s || new Date(s.dueAt) <= now;
            default:           return true;
        }
    });

    // Sort
    const sorted = [...filtered].sort((a, b) => {
        const sa = a.userStates[0] ?? null;
        const sb = b.userStates[0] ?? null;
        let va: number;
        let vb: number;
        switch (sort) {
            case "easeFactor":
                va = sa?.easeFactor ?? 2.5;
                vb = sb?.easeFactor ?? 2.5;
                break;
            case "lapses":
                va = sa?.lapses ?? 0;
                vb = sb?.lapses ?? 0;
                break;
            case "dueAt":
                va = sa ? new Date(sa.dueAt).getTime() : 0;
                vb = sb ? new Date(sb.dueAt).getTime() : 0;
                break;
            case "repetitions":
                va = sa?.repetitions ?? 0;
                vb = sb?.repetitions ?? 0;
                break;
            default: // createdAt
                va = new Date(a.createdAt).getTime();
                vb = new Date(b.createdAt).getTime();
        }
        return order === "asc" ? va - vb : vb - va;
    });

    const total = sorted.length;
    const totalPages = Math.ceil(total / pageSize);
    const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({
        cards: paginated.map((card) => {
            const { userStates, ...cardFields } = card;
            const s = userStates[0] ?? null;
            return {
                ...cardFields,
                createdAt: card.createdAt.toISOString(),
                srsState: s
                    ? {
                          easeFactor: s.easeFactor,
                          interval: s.interval,
                          repetitions: s.repetitions,
                          lapses: s.lapses,
                          dueAt: s.dueAt.toISOString(),
                          lastReviewedAt: s.lastReviewedAt?.toISOString() ?? null,
                          isForwardLearned: s.isForwardLearned,
                          isReverseLearned: s.isReverseLearned,
                          isMastered: s.isMastered,
                      }
                    : null,
            };
        }),
        total,
        page,
        pageSize,
        totalPages,
        hasMore: page < totalPages,
        stats,
        categories,
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
        },
    });

    // Create UserCardState for the deck owner
    await prisma.userCardState.create({
        data: { userId, cardId: card.id },
    });

    return NextResponse.json({ card }, { status: 201 });
}
