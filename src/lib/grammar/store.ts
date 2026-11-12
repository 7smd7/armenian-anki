// Where grammar progress lives: the DB for signed-in users, localStorage for
// guests. Both expose the same interface so the practice screen doesn't care.

import {
    reviewCard,
    isSrsState,
    type SrsState,
    type SrsStates,
} from "./srs";

export interface GrammarStore {
    kind: "local" | "remote";
    load(): Promise<SrsStates>;
    review(
        cardKey: string,
        grade: number,
        correct: boolean,
        responseTime: number,
        current: SrsState | undefined,
    ): Promise<SrsState>;
    reset(): Promise<void>;
}

const LOCAL_KEY = "armenian_anki_grammar_srs_v1";

function readLocal(): SrsStates {
    try {
        const raw = localStorage.getItem(LOCAL_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const out: SrsStates = {};
        for (const [k, v] of Object.entries(parsed)) if (isSrsState(v)) out[k] = v;
        return out;
    } catch {
        return {};
    }
}

function writeLocal(states: SrsStates) {
    try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(states));
    } catch {
        // storage full or blocked: progress just isn't kept
    }
}

export const localStore: GrammarStore = {
    kind: "local",
    async load() {
        return readLocal();
    },
    async review(cardKey, grade, _correct, _ms, current) {
        const next = reviewCard(current, grade);
        writeLocal({ ...readLocal(), [cardKey]: next });
        return next;
    },
    async reset() {
        try {
            localStorage.removeItem(LOCAL_KEY);
        } catch {
            // ignore
        }
    },
};

export const remoteStore: GrammarStore = {
    kind: "remote",
    async load() {
        const res = await fetch("/api/grammar/progress");
        if (!res.ok) throw new Error(`Failed to load progress (${res.status})`);
        return ((await res.json()).states ?? {}) as SrsStates;
    },
    async review(cardKey, grade, correct, responseTime) {
        const res = await fetch("/api/grammar/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cardKey, grade, correct, responseTime }),
        });
        if (!res.ok) throw new Error(`Failed to save review (${res.status})`);
        return (await res.json()).state as SrsState;
    },
    async reset() {
        await fetch("/api/grammar/progress", { method: "DELETE" });
    },
};

/**
 * After sign-in: copy guest progress into the account, then clear it locally.
 * Returns how many cards were merged.
 */
export async function migrateGuestProgress(): Promise<number> {
    const states = readLocal();
    if (Object.keys(states).length === 0) return 0;
    const res = await fetch("/api/grammar/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ states }),
    });
    if (!res.ok) return 0;
    const { merged } = await res.json();
    await localStore.reset();
    return merged ?? 0;
}
