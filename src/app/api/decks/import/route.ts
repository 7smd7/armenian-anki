// API route for CSV deck import
// POST /api/decks/import
// Body: FormData with file and mode (new_deck|update_deck) and deckTitle (for new decks)

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseCSVFile, hashFile } from "@/lib/csv/parse";
import { parseExampleSentence, CSVRow } from "@/lib/csv/headers";
import { generateSlug, sanitizeFileName } from "@/lib/server-utils";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    // Maps CSV difficulty (1-5, capped at 4) to an initial UserCardState shape.
    // null = never studied (use Prisma defaults, card is due now).
    function difficultyToInitialState(
        difficulty: number | null | undefined,
        now: Date,
    ) {
        const d = difficulty != null ? Math.min(difficulty, 4) : null;
        if (d == null) return {}; // let Prisma defaults kick in
        if (d <= 1)
            return {
                easeFactor: 2.6,
                interval: 7,
                repetitions: 1,
                isForwardLearned: true,
                isReverseLearned: true,
                isMastered: true,
                lastReviewedAt: now,
                dueAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
            };
        if (d === 2)
            return {
                easeFactor: 2.5,
                interval: 3,
                repetitions: 1,
                isForwardLearned: true,
                lastReviewedAt: now,
                dueAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
            };
        if (d === 3)
            return {
                easeFactor: 2.36,
                interval: 1,
                repetitions: 1,
                lastReviewedAt: now,
                dueAt: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
            };
        // d >= 4: Again — don't know at all
        return {
            easeFactor: 1.3,
            interval: 1,
            lapses: 1,
            lastReviewedAt: now,
            dueAt: now,
        };
    }
    try {
        const session = await auth();
        if (!session?.user || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const userId = session.user.id;
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const mode = formData.get("mode") as string; // "new_deck" or "update_deck"
        const deckTitle = formData.get("deckTitle") as string; // Required for new_deck
        const deckId = formData.get("deckId") as string; // Required for update_deck

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 },
            );
        }

        if (!["new_deck", "update_deck"].includes(mode)) {
            return NextResponse.json(
                { error: "Invalid mode" },
                { status: 400 },
            );
        }

        // Parse CSV
        const parseResult = await parseCSVFile(file);
        if (parseResult.errors.length > 0 && parseResult.rows.length === 0) {
            return NextResponse.json(
                {
                    error: "CSV parsing failed",
                    details: parseResult.errors,
                },
                { status: 400 },
            );
        }

        const fileHash = await hashFile(file);

        // Process based on mode
        let deck;

        if (mode === "new_deck") {
            if (!deckTitle?.trim()) {
                return NextResponse.json(
                    { error: "Deck title required for new deck" },
                    { status: 400 },
                );
            }

            const slug = generateSlug(deckTitle);

            // Check for duplicate slug
            const existing = await prisma.deck.findUnique({
                where: { ownerId_slug: { ownerId: userId, slug } },
            });

            if (existing) {
                return NextResponse.json(
                    { error: "Deck with this title already exists" },
                    { status: 409 },
                );
            }

            deck = await prisma.deck.create({
                data: {
                    ownerId: userId,
                    title: deckTitle,
                    slug,
                    sourceFingerprint: fileHash,
                },
            });
        } else {
            // update_deck mode
            if (!deckId) {
                return NextResponse.json(
                    { error: "Deck ID required for update mode" },
                    { status: 400 },
                );
            }

            deck = await prisma.deck.findUnique({
                where: { id: deckId },
            });

            if (!deck || deck.ownerId !== userId) {
                return NextResponse.json(
                    { error: "Deck not found" },
                    { status: 404 },
                );
            }

            // Update fingerprint
            await prisma.deck.update({
                where: { id: deckId },
                data: { sourceFingerprint: fileHash },
            });
        }

        // Upsert cards into deck
        // Strategy: match by externalRowId if provided, else by stable hash of (Armenian + Translit + English)
        const rowsInserted: string[] = [];
        const rowsUpdated: string[] = [];
        for (const row of parseResult.rows) {
            const csvData = row as CSVRow;

            // Generate stable external row ID
            const rowData = {
                armenianScript: csvData["Armenian Script"],
                translit: csvData["Translit."],
                englishMeaning: csvData["English Meaning"],
            };

            // Hash core fields for stable identity
            const rowHash = crypto
                .createHash("sha256")
                .update(JSON.stringify(rowData))
                .digest("hex");

            const externalRowId = rowHash;

            // Parse example sentence
            const exampleParsed = parseExampleSentence(
                csvData["Example Sentence + [Translation]"],
            );

            const cardData = {
                armenianScript: csvData["Armenian Script"],
                translit: csvData["Translit."],
                englishMeaning: csvData["English Meaning"],
                exampleSentence: exampleParsed?.sentence || null,
                exampleTranslation: exampleParsed?.translation || null,
                grammar:
                    csvData["Grammar (Root/Infinitive + Imperative)"] || null,
                cheatPhrase: csvData["Cheat Phrase (Mnemonic)"] || null,
                topic: csvData["Topic/Tag"] || null,
            };

            const existing = await prisma.card.findUnique({
                where: {
                    deckId_externalRowId: {
                        deckId: deck.id,
                        externalRowId: externalRowId,
                    },
                },
            });

            if (existing) {
                await prisma.card.update({
                    where: { id: existing.id },
                    data: cardData,
                });
                rowsUpdated.push(externalRowId);
            } else {
                const newCard = await prisma.card.create({
                    data: {
                        ...cardData,
                        deckId: deck.id,
                        externalRowId,
                    },
                });
                rowsInserted.push(externalRowId);
                // Seed initial SRS state from CSV difficulty
                const now = new Date();
                const initialState = difficultyToInitialState(
                    csvData.difficulty ?? null,
                    now,
                );
                await prisma.userCardState.create({
                    data: { userId, cardId: newCard.id, ...initialState },
                });
            }
        }

        // For existing cards that were updated, ensure UserCardState exists
        // (skipDuplicates so we never overwrite existing user progress)
        if (rowsUpdated.length > 0) {
            const updatedCards = await prisma.card.findMany({
                where: {
                    deckId: deck.id,
                    isActive: true,
                    externalRowId: { in: rowsUpdated },
                },
                select: { id: true },
            });
            if (updatedCards.length > 0) {
                await prisma.userCardState.createMany({
                    data: updatedCards.map((c) => ({ userId, cardId: c.id })),
                    skipDuplicates: true,
                });
            }
        }

        // Log import job
        const importJob = await prisma.importJob.create({
            data: {
                deckId: deck.id,
                mode,
                fileName: sanitizeFileName(file.name),
                fileHash,
                rowsParsed: parseResult.rows.length,
                rowsInserted: rowsInserted.length,
                rowsUpdated: rowsUpdated.length,
                rowsSkipped: parseResult.errors.length,
                errors: JSON.stringify(parseResult.errors),
            },
        });

        return NextResponse.json(
            {
                success: true,
                deckId: deck.id,
                importJob: {
                    id: importJob.id,
                    rowsParsed: importJob.rowsParsed,
                    rowsInserted: importJob.rowsInserted,
                    rowsUpdated: importJob.rowsUpdated,
                    rowsSkipped: importJob.rowsSkipped,
                    errors: parseResult.errors,
                },
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Import error:", error);
        return NextResponse.json(
            { error: "Import failed", details: error instanceof Error ? error.message : undefined },
            { status: 500 },
        );
    }
}
