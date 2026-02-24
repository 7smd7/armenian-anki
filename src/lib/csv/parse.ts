// CSV parsing using PapaParse
import Papa from "papaparse";
import { CSVRow, CSVRowSchema, validateCSVHeaders } from "./headers";

export interface ParsedCSVResult {
    headers: string[];
    rows: (CSVRow & { rowIndex: number })[];
    errors: { rowIndex: number; error: string }[];
}

export async function parseCSVFile(file: File): Promise<ParsedCSVResult> {
    const text = await file.text();

    return new Promise((resolve) => {
        Papa.parse(text, {
            header: true,
            dynamicTyping: false,
            skipEmptyLines: true,
            encoding: "UTF-8",
            complete: (results) => {
                const headers = results.meta.fields || [];

                // Validate headers
                if (!validateCSVHeaders(headers)) {
                    resolve({
                        headers,
                        rows: [],
                        errors: [
                            {
                                rowIndex: 0,
                                error: `Invalid CSV headers. Expected 7 columns (Armenian Script, Translit., English Meaning, ...) or 8 columns with optional 'difficulty' as the first column.`,
                            },
                        ],
                    });
                    return;
                }

                // Parse and validate rows
                const rows: (CSVRow & { rowIndex: number })[] = [];
                const errors: { rowIndex: number; error: string }[] = [];

                (results.data as any[]).forEach((row, idx) => {
                    try {
                        const validated = CSVRowSchema.parse(row);
                        rows.push({ ...validated, rowIndex: idx + 2 }); // +2 for header and 1-based
                    } catch (error: any) {
                        errors.push({
                            rowIndex: idx + 2,
                            error: error.message || "Validation failed",
                        });
                    }
                });

                resolve({ headers, rows, errors });
            },
            error: (error: any) => {
                resolve({
                    headers: [],
                    rows: [],
                    errors: [{ rowIndex: 0, error: error.message }],
                });
            },
        });
    });
}

// Generate SHA256 hash of file for deduplication
export async function hashFile(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Server-side CSV parsing from a raw string (no File API needed).
 * Accepts both 7-column and 8-column formats.
 */
export function parseCSVText(text: string): ParsedCSVResult {
    // Strip comment lines (lines starting with //)
    const clean = text
        .split("\n")
        .filter((l) => !l.trim().startsWith("//"))
        .join("\n");

    const results = (Papa as any).parse(clean, {
        header: true,
        dynamicTyping: false,
        skipEmptyLines: true,
        encoding: "UTF-8",
    });

    const headers: string[] = results.meta?.fields ?? [];

    if (!validateCSVHeaders(headers)) {
        return {
            headers,
            rows: [],
            errors: [{ rowIndex: 0, error: "Invalid CSV headers" }],
        };
    }

    const rows: (CSVRow & { rowIndex: number })[] = [];
    const errors: { rowIndex: number; error: string }[] = [];

    (results.data as any[]).forEach((row: any, idx: number) => {
        try {
            const validated = CSVRowSchema.parse(row);
            rows.push({ ...validated, rowIndex: idx + 2 });
        } catch (err: any) {
            errors.push({
                rowIndex: idx + 2,
                error: err.message ?? "Validation failed",
            });
        }
    });

    return { headers, rows, errors };
}
