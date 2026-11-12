// Spaced repetition for grammar cards.
//
// Scheduling reuses the vocabulary algorithm (learning-overlay.ts): minute-level
// learning steps on the first day, then day intervals from the scheduler.
// Card selection follows /api/study/next without its new-card cap, and runs on a list of card keys so
// it works the same for signed-in users (states from the DB) and guests
// (states in localStorage).

import {
    applyReview,
    classifyCard,
    type CardStateForReview,
} from "../srs/learning-overlay";

/** JSON form of a card state (dates as ISO strings) */
export interface SrsState {
    easeFactor: number;
    interval: number;
    repetitions: number;
    lapses: number;
    dueAt: string;
    lastReviewedAt: string | null;
}

export type SrsStates = Record<string, SrsState>;

export const NEW_STATE = (now = new Date()): SrsState => ({
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    lapses: 0,
    dueAt: now.toISOString(),
    lastReviewedAt: null,
});

export function toReviewState(s: SrsState): CardStateForReview {
    return {
        ...s,
        dueAt: new Date(s.dueAt),
        lastReviewedAt: s.lastReviewedAt ? new Date(s.lastReviewedAt) : null,
    };
}

export function reviewCard(
    state: SrsState | undefined,
    grade: number,
    now = new Date(),
): SrsState {
    const r = applyReview(toReviewState(state ?? NEW_STATE(now)), grade, now);
    return {
        easeFactor: r.easeFactor,
        interval: r.interval,
        repetitions: r.repetitions,
        lapses: r.lapses,
        dueAt: r.dueAt.toISOString(),
        lastReviewedAt: r.lastReviewedAt.toISOString(),
    };
}

/** "1m", "10m", "3d": time until the card comes back after this grade */
export function previewInterval(
    state: SrsState | undefined,
    grade: number,
    now = new Date(),
): string {
    const next = reviewCard(state, grade, now);
    const minutes = (new Date(next.dueAt).getTime() - now.getTime()) / 60_000;
    if (minutes < 60) return `${Math.max(1, Math.round(minutes))}m`;
    if (minutes < 60 * 24) return `${Math.round(minutes / 60)}h`;
    return `${Math.round(minutes / 1440)}d`;
}

export type Bucket = "learning" | "review" | "new" | "learningLater" | "ahead";

export interface NextCard {
    key: string;
    bucket: Bucket;
}

/**
 * Pick the next card. Like Anki, but with no daily or in-learning cap on new
 * cards: as long as the learner keeps going, new material keeps coming.
 * 1. learning card due now   2. review due now   3. next new card
 * 4. learning card due later today (shown early)   5. practice ahead
 * Due cards always come first, so reviews are never pushed back by new cards.
 * `keys` is in introduction order. `avoid` is the card just shown.
 */
export function pickNext(
    keys: string[],
    states: SrsStates,
    now = new Date(),
    avoid?: string,
): NextCard | null {
    const candidates = keys.length > 1 ? keys.filter((k) => k !== avoid) : keys;
    if (candidates.length === 0) return null;

    const t = now.getTime();

    let learning: [string, number] | null = null;
    let review: [string, number] | null = null;
    let later: [string, number] | null = null;
    let ahead: [string, number] | null = null;
    let firstNew: string | null = null;

    for (const key of candidates) {
        const s = states[key];
        if (!s || !s.lastReviewedAt) {
            firstNew ??= key;
            continue;
        }
        const due = Date.parse(s.dueAt);
        const last = Date.parse(s.lastReviewedAt);
        const bucket = classifyCard(toReviewState(s), now);
        if (bucket === "learning") {
            if (!learning || due < learning[1]) learning = [key, due];
        } else if (bucket === "review") {
            if (!review || due < review[1]) review = [key, due];
        } else if (bucket === "learningLaterToday") {
            if (!later || last < later[1]) later = [key, last];
        }
        if (due > t && (!ahead || last < ahead[1])) ahead = [key, last];
    }

    if (learning) return { key: learning[0], bucket: "learning" };
    if (review) return { key: review[0], bucket: "review" };
    if (firstNew) return { key: firstNew, bucket: "new" };
    if (later) return { key: later[0], bucket: "learningLater" };
    if (ahead) return { key: ahead[0], bucket: "ahead" };
    return { key: candidates[0], bucket: "ahead" };
}

export interface QueueCounts {
    /** due now: learning steps + reviews */
    due: number;
    /** never studied */
    new: number;
    /** graduated to day intervals at least once */
    learned: number;
    total: number;
}

export function countQueue(
    keys: string[],
    states: SrsStates,
    now = new Date(),
): QueueCounts {
    let due = 0;
    let fresh = 0;
    let learned = 0;
    for (const key of keys) {
        const s = states[key];
        if (!s || !s.lastReviewedAt) {
            fresh++;
            continue;
        }
        if (Date.parse(s.dueAt) <= now.getTime()) due++;
        if (s.repetitions > 0) learned++;
    }
    return { due, new: fresh, learned, total: keys.length };
}

/** Share of cards that have graduated (repetitions > 0), or null if none studied */
export function learnedShare(keys: string[], states: SrsStates): number | null {
    let studied = 0;
    let learned = 0;
    for (const k of keys) {
        const s = states[k];
        if (s?.lastReviewedAt) studied++;
        if (s && s.repetitions > 0) learned++;
    }
    return studied === 0 ? null : learned / keys.length;
}

/** Validate an untrusted state object (guest import) */
export function isSrsState(x: unknown): x is SrsState {
    if (!x || typeof x !== "object") return false;
    const s = x as Record<string, unknown>;
    return (
        typeof s.easeFactor === "number" &&
        typeof s.interval === "number" &&
        typeof s.repetitions === "number" &&
        typeof s.lapses === "number" &&
        typeof s.dueAt === "string" &&
        !Number.isNaN(Date.parse(s.dueAt)) &&
        (s.lastReviewedAt === null ||
            (typeof s.lastReviewedAt === "string" &&
                !Number.isNaN(Date.parse(s.lastReviewedAt))))
    );
}
