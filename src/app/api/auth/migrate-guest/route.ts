// POST /api/auth/migrate-guest
// Migrates guest localStorage SRS state to the DB after first login.
// Creates the sample deck for this user (if not already imported), then
// upserts UserCardState rows with the guest's progress.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import {
    CSVRowSchema,
    validateCSVHeaders,
    parseExampleSentence,
} from "@/lib/csv/headers";
import { generateSlug } from "@/lib/server-utils";
import crypto from "crypto";
import type { GuestCardState } from "@/lib/srs/guest-srs";

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    let body: { states: Record<string, GuestCardState> };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const { states } = body;
    if (!states || typeof states !== "object") {
        return NextResponse.json({ error: "states required" }, { status: 400 });
    }

    // ── 1. Load & parse sample CSV ──────────────────────────────────────────────
    const csvPath = path.join(
        process.cwd(),
        "public",
        "samples",
        "vocab-import-sample.csv",
    );
    const csvText = fs.readFileSync(csvPath, "utf-8");
    // Strip comment lines
    const cleanCSV = csvText
        .split("\n")
        .filter((l: string) => !l.trim().startsWith("//"))
        .join("\n");
    const fileHash = crypto.createHash("sha256").update(csvText).digest("hex");

    const parsed = (Papa as any).parse(cleanCSV, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: true,
        encoding: "UTF-8",
    });

    const headers = (parsed.meta.fields || []) as string[];
    if (!validateCSVHeaders(headers)) {
        return NextResponse.json(
            { error: "Sample CSV invalid" },
            { status: 500 },
        );
    }

    interface ParsedRow {
        rowIndex: number;
        armenianScript: string;
        translit: string;
        englishMeaning: string;
        exampleSentence: string | null;
        exampleTranslation: string | null;
        grammar: string | null;
        cheatPhrase: string | null;
        topic: string | null;
    }

    const rows: ParsedRow[] = [];
    (parsed.data as any[]).forEach((row, idx) => {
        try {
            const v = CSVRowSchema.parse(row);
            const ex = parseExampleSentence(
                v["Example Sentence + [Translation]"],
            );
            rows.push({
                rowIndex: idx + 2,
                armenianScript: v["Armenian Script"],
                translit: v["Translit."],
                englishMeaning: v["English Meaning"],
                exampleSentence: ex?.sentence ?? null,
                exampleTranslation: ex?.translation ?? null,
                grammar: v["Grammar (Root/Infinitive + Imperative)"] ?? null,
                cheatPhrase: v["Cheat Phrase (Mnemonic)"] ?? null,
                topic: v["Topic/Tag"] ?? null,
            });
        } catch {
            /* skip invalid rows */
        }
    });

    // ── 2. Find or create sample deck ──────────────────────────────────────────
    const deckTitle = "Armenian Sample Deck";
    const slug = generateSlug(deckTitle);

    let deck = await prisma.deck.findUnique({
        where: { ownerId_slug: { ownerId: userId, slug } },
    });

    if (!deck) {
        deck = await prisma.deck.create({
            data: {
                ownerId: userId,
                title: deckTitle,
                slug,
                description: "Built-in sample deck for learning Armenian",
                sourceFingerprint: fileHash,
            },
        });
    }

    // ── 3. Upsert cards ────────────────────────────────────────────────────────
    for (const row of rows) {
        await prisma.card.upsert({
            where: {
                deckId_externalRowId: {
                    deckId: deck.id,
                    externalRowId: String(row.rowIndex),
                },
            },
            create: {
                deckId: deck.id,
                externalRowId: String(row.rowIndex),
                armenianScript: row.armenianScript,
                translit: row.translit,
                englishMeaning: row.englishMeaning,
                exampleSentence: row.exampleSentence,
                exampleTranslation: row.exampleTranslation,
                grammar: row.grammar,
                cheatPhrase: row.cheatPhrase,
                topic: row.topic,
            },
            update: {
                armenianScript: row.armenianScript,
                translit: row.translit,
                englishMeaning: row.englishMeaning,
            },
        });
    }

    // ── 4. Upsert UserCardState rows with guest progress ───────────────────────
    const cards = await prisma.card.findMany({
        where: { deckId: deck.id, isActive: true },
        select: { id: true, externalRowId: true },
    });

    let migratedCount = 0;
    for (const card of cards) {
        const guestState = card.externalRowId
            ? states[card.externalRowId]
            : undefined;

        if (guestState && guestState.repetitions > 0) {
            // Carry over real study progress
            await prisma.userCardState.upsert({
                where: { userId_cardId: { userId, cardId: card.id } },
                create: {
                    userId,
                    cardId: card.id,
                    easeFactor: guestState.easeFactor,
                    interval: guestState.interval,
                    repetitions: guestState.repetitions,
                    lapses: guestState.lapses,
                    dueAt: new Date(guestState.dueAt),
                    isForwardLearned: guestState.isForwardLearned,
                    isReverseLearned: guestState.isReverseLearned,
                    isMastered: guestState.isMastered,
                    lastReviewedAt: new Date(),
                },
                update: {
                    easeFactor: guestState.easeFactor,
                    interval: guestState.interval,
                    repetitions: guestState.repetitions,
                    lapses: guestState.lapses,
                    dueAt: new Date(guestState.dueAt),
                    isForwardLearned: guestState.isForwardLearned,
                    isReverseLearned: guestState.isReverseLearned,
                    isMastered: guestState.isMastered,
                    lastReviewedAt: new Date(),
                },
            });
            migratedCount++;
        } else {
            // Just ensure the state row exists (fresh start for unreviewed cards)
            await prisma.userCardState.upsert({
                where: { userId_cardId: { userId, cardId: card.id } },
                create: { userId, cardId: card.id },
                update: {},
            });
        }
    }

    return NextResponse.json({ success: true, deckId: deck.id, migratedCount });
}
