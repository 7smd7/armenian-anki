// CSV header definitions and validation
import { z } from "zod";

// Full 8-column format (with optional difficulty first)
export const CSV_HEADERS_FULL = [
    "difficulty",
    "Armenian Script",
    "Translit.",
    "English Meaning",
    "Example Sentence + [Translation]",
    "Grammar (Root/Infinitive + Imperative)",
    "Cheat Phrase (Mnemonic)",
    "Topic/Tag",
] as const;

// 7-column format (without difficulty) — used by Hayeren 1 CSV
export const CSV_HEADERS_SHORT = [
    "Armenian Script",
    "Translit.",
    "English Meaning",
    "Example Sentence + [Translation]",
    "Grammar (Root/Infinitive + Imperative)",
    "Cheat Phrase (Mnemonic)",
    "Topic/Tag",
] as const;

// Keep the original export name for backwards compat
export const CSV_HEADERS = CSV_HEADERS_FULL;
export type CSVHeaderName =
    | (typeof CSV_HEADERS_FULL)[number]
    | (typeof CSV_HEADERS_SHORT)[number];

export const CSVRowSchema = z.object({
    difficulty: z
        .string()
        .transform((v) => (v ? parseInt(v, 10) : undefined))
        .pipe(z.number().min(1).max(5))
        .optional()
        .catch(undefined),
    "Armenian Script": z.string().min(1),
    "Translit.": z.string().min(1),
    "English Meaning": z.string().min(1),
    "Example Sentence + [Translation]": z.string().optional(),
    "Grammar (Root/Infinitive + Imperative)": z.string().optional(),
    "Cheat Phrase (Mnemonic)": z.string().optional(),
    "Topic/Tag": z.string().optional(),
});

export type CSVRow = z.infer<typeof CSVRowSchema>;

export function validateCSVHeaders(headers: string[]): boolean {
    const trimmed = headers.map((h) => h.trim());
    // Accept 8-column format (with difficulty)
    if (trimmed.length === CSV_HEADERS_FULL.length) {
        return trimmed.every((h, idx) => h === CSV_HEADERS_FULL[idx]);
    }
    // Accept 7-column format (without difficulty)
    if (trimmed.length === CSV_HEADERS_SHORT.length) {
        return trimmed.every((h, idx) => h === CSV_HEADERS_SHORT[idx]);
    }
    return false;
}

export function parseExampleSentence(
    fullText: string | undefined,
): { sentence: string; translation: string } | null {
    if (!fullText) return null;

    // Expected format: "Sentence (in Armenian). - [English Translation]"
    // Or: "Sentence (in Armenian). [English Translation]"
    const match = fullText.match(/^(.*?)\s*-?\s*\[(.*?)\]\s*\.?$/);
    if (match) {
        return { sentence: match[1].trim(), translation: match[2].trim() };
    }

    return { sentence: fullText, translation: "" };
}
