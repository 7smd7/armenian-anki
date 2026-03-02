// Public endpoint — no auth required
// GET /api/decks/sample
// Returns the parsed sample deck cards for guest study mode

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import {
    CSVRowSchema,
    validateCSVHeaders,
    parseExampleSentence,
} from "@/lib/csv/headers";

export interface SampleCard {
    externalRowId: string; // row index as string (matches CSV parse logic)
    armenianScript: string;
    translit: string;
    englishMeaning: string;
    exampleSentence: string | null;
    exampleTranslation: string | null;
    grammar: string | null;
    cheatPhrase: string | null;
    topic: string | null;
}

// Cache the parsed result in memory (server restarts clear it)
let cachedCards: SampleCard[] | null = null;

export async function GET() {
    if (cachedCards) {
        return NextResponse.json(
            { cards: cachedCards },
            {
                headers: { "Cache-Control": "public, max-age=86400" },
            },
        );
    }

    const csvPath = path.join(
        process.cwd(),
        "public",
        "samples",
        "vocab-import-sample.csv",
    );

    let text: string;
    try {
        text = fs.readFileSync(csvPath, "utf-8");
    } catch {
        return NextResponse.json(
            { error: "Sample file not found" },
            { status: 500 },
        );
    }

    // Strip comment lines (lines starting with //)
    const cleanText = text
        .split("\n")
        .filter((l) => !l.trim().startsWith("//"))
        .join("\n");

    const result = (Papa as any).parse(cleanText, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: true,
        encoding: "UTF-8",
    });

    const headers = (result.meta.fields || []) as string[];
    if (!validateCSVHeaders(headers)) {
        return NextResponse.json(
            { error: "Sample CSV has invalid headers" },
            { status: 500 },
        );
    }

    const cards: SampleCard[] = [];

    (result.data as any[]).forEach((row, idx) => {
        try {
            const validated = CSVRowSchema.parse(row);
            const exRow = parseExampleSentence(
                validated["Example Sentence + [Translation]"],
            );
            cards.push({
                externalRowId: String(idx + 2), // matches import logic (+2 for header + 1-based)
                armenianScript: validated["Armenian Script"],
                translit: validated["Translit."],
                englishMeaning: validated["English Meaning"],
                exampleSentence: exRow?.sentence ?? null,
                exampleTranslation: exRow?.translation ?? null,
                grammar:
                    validated["Grammar (Root/Infinitive + Imperative)"] ?? null,
                cheatPhrase: validated["Cheat Phrase (Mnemonic)"] ?? null,
                topic: validated["Topic/Tag"] ?? null,
            });
        } catch {
            // Skip invalid rows
        }
    });

    cachedCards = cards;

    return NextResponse.json(
        { cards },
        {
            headers: { "Cache-Control": "public, max-age=86400" },
        },
    );
}
