// API route for exporting a deck to CSV
// GET /api/decks/[deckId]/export

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CSV_HEADERS } from "@/lib/csv/headers";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ deckId: string }> },
) {
    try {
        const session = await auth();
        if (!session?.user || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const userId = session.user.id;
        const { deckId } = await params;

        // Fetch deck and validate ownership
        const deck = await prisma.deck.findUnique({
            where: { id: deckId },
            include: { cards: { where: { isActive: true } } },
        });

        if (!deck || deck.ownerId !== userId) {
            return NextResponse.json(
                { error: "Deck not found" },
                { status: 404 },
            );
        }

        // Build CSV content
        const csvLines: string[] = [];

        // Header row
        csvLines.push(CSV_HEADERS.join(","));

        // Card rows
        for (const card of deck.cards) {
            const row = [
                card.difficultyBase?.toString() || "3", // Default to 3 if not set
                card.armenianScript,
                card.translit,
                card.englishMeaning,
                card.exampleSentence && card.exampleTranslation
                    ? `${card.exampleSentence} [${card.exampleTranslation}]`
                    : card.exampleSentence || "",
                card.grammar || "",
                card.cheatPhrase || "",
                card.topic || "",
            ];

            // CSV-safe escaping: wrap in quotes if contains comma, quote, or newline
            const safeLine = row
                .map((cell) => {
                    const cellStr = String(cell || "");
                    if (
                        cellStr.includes(",") ||
                        cellStr.includes('"') ||
                        cellStr.includes("\n")
                    ) {
                        return `"${cellStr.replace(/"/g, '""')}"`;
                    }
                    return cellStr;
                })
                .join(",");

            csvLines.push(safeLine);
        }

        const csv = csvLines.join("\n");

        // Return as downloadable file
        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv;charset=utf-8",
                "Content-Disposition": `attachment; filename="${deck.slug}-export.csv"`,
            },
        });
    } catch (error) {
        console.error("Export error:", error);
        return NextResponse.json(
            {
                error: "Export failed",
                details: error instanceof Error ? error.message : undefined,
            },
            { status: 500 },
        );
    }
}
