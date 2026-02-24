// API route for deck listing and creation
// GET /api/decks - List all decks for current user
// POST /api/decks - Create a new empty deck

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/server-utils";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const userId = session.user.id;

        const decks = await prisma.deck.findMany({
            where: { ownerId: userId },
            include: {
                _count: { select: { cards: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            decks: decks.map((d: any) => ({
                id: d.id,
                title: d.title,
                slug: d.slug,
                description: d.description,
                cardCount: d._count.cards,
                createdAt: d.createdAt,
                updatedAt: d.updatedAt,
            })),
        });
    } catch (error) {
        console.error("Deck list error:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch decks",
                details: error instanceof Error ? error.message : undefined,
            },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const userId = session.user.id;
        const { title, description } = await request.json();

        if (!title?.trim()) {
            return NextResponse.json(
                { error: "Title required" },
                { status: 400 },
            );
        }

        const slug = generateSlug(title);

        // Check for duplicate
        const existing = await prisma.deck.findUnique({
            where: { ownerId_slug: { ownerId: userId, slug } },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Deck with this title already exists" },
                { status: 409 },
            );
        }

        const deck = await prisma.deck.create({
            data: {
                ownerId: userId,
                title,
                slug,
                description: description || null,
            },
        });

        return NextResponse.json({ deck }, { status: 201 });
    } catch (error) {
        console.error("Deck create error:", error);
        return NextResponse.json(
            {
                error: "Failed to create deck",
                details: error instanceof Error ? error.message : undefined,
            },
            { status: 500 },
        );
    }
}
