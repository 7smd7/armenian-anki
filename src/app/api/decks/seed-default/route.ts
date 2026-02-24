// POST /api/decks/seed-default
// Adds the built-in "Hayeren 1" deck to the authenticated user's library.
// Reads the CSV from the filesystem — no file upload required.

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseCSVText } from "@/lib/csv/parse";
import { parseExampleSentence, CSVRow } from "@/lib/csv/headers";
import { generateSlug } from "@/lib/server-utils";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const DECK_TITLE = "Hayeren 1";
const DECK_SLUG = "hayeren-1";
const CSV_PATH = path.join(
    process.cwd(),
    "public",
    "samples",
    "Hayaren 1 - Vocabulary.csv",
);

export async function POST() {
    try {
        const session = await auth();
        if (!session?.user || !(session.user as any).id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }
        const userId = (session.user as any).id;

        // Don't create it twice
        const existing = await prisma.deck.findUnique({
            where: { ownerId_slug: { ownerId: userId, slug: DECK_SLUG } },
        });
        if (existing) {
            return NextResponse.json(
                { alreadyExists: true, deckId: existing.id },
                { status: 200 },
            );
        }

        // Read + parse CSV
        const text = fs.readFileSync(CSV_PATH, "utf-8");
        const parseResult = parseCSVText(text);

        if (parseResult.rows.length === 0) {
            return NextResponse.json(
                {
                    error: "Failed to parse default deck CSV",
                    details: parseResult.errors,
                },
                { status: 500 },
            );
        }

        const slug = generateSlug(DECK_TITLE);
        const deck = await prisma.deck.create({
            data: { ownerId: userId, title: DECK_TITLE, slug },
        });

        // Insert all cards
        for (const row of parseResult.rows) {
            const csvData = row as CSVRow;
            const rowData = {
                armenianScript: csvData["Armenian Script"],
                translit: csvData["Translit."],
                englishMeaning: csvData["English Meaning"],
            };
            const externalRowId = crypto
                .createHash("sha256")
                .update(JSON.stringify(rowData))
                .digest("hex");

            const exampleParsed = parseExampleSentence(
                csvData["Example Sentence + [Translation]"],
            );

            await prisma.card.upsert({
                where: {
                    deckId_externalRowId: { deckId: deck.id, externalRowId },
                },
                create: {
                    deckId: deck.id,
                    externalRowId,
                    armenianScript: csvData["Armenian Script"],
                    translit: csvData["Translit."],
                    englishMeaning: csvData["English Meaning"],
                    exampleSentence: exampleParsed?.sentence ?? null,
                    exampleTranslation: exampleParsed?.translation ?? null,
                    grammar:
                        csvData["Grammar (Root/Infinitive + Imperative)"] ??
                        null,
                    cheatPhrase: csvData["Cheat Phrase (Mnemonic)"] ?? null,
                    topic: csvData["Topic/Tag"] ?? null,
                    difficultyBase: csvData.difficulty ?? 5,
                },
                update: {},
            });
        }

        // Create user progress states for all cards
        const cards = await prisma.card.findMany({
            where: { deckId: deck.id, isActive: true },
            select: { id: true },
        });
        if (cards.length > 0) {
            await prisma.userCardState.createMany({
                data: cards.map((c) => ({ userId, cardId: c.id })),
                skipDuplicates: true,
            });
        }

        return NextResponse.json(
            { success: true, deckId: deck.id, cardCount: cards.length },
            { status: 201 },
        );
    } catch (error) {
        console.error("Seed default error:", error);
        return NextResponse.json(
            { error: "Failed to add deck", details: (error as any)?.message },
            { status: 500 },
        );
    }
}
