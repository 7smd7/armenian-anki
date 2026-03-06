// Same-day learning overlay
// Adds minute-level repetition on top of the existing day-level FSRSScheduler.
// All decisions derive from persisted UserCardState fields only — no session memory.

import { createFSRSScheduler } from './fsrs';

// ── Constants ──────────────────────────────────────────────
export const LEARNING_STEPS = [1, 5, 10] as const; // minutes
export const ACTIVE_LEARNING_LIMIT = 5;
export const MAXIMUM_INTERVAL = 14; // days
export const EASE_MINIMUM = 1.3;
export const EASE_MAXIMUM = 3.0;

const EASE_DELTA: Record<number, number> = {
    0: -0.2, // Again
    1: -0.14, // Hard
    2: 0.0, // Good
    3: 0.1, // Easy
};

// Step table: STEP_TABLE[currentStep][grade] → minutes until next review, or 'graduate'
const STEP_TABLE: Record<number, Record<number, number | 'graduate'>> = {
    0: { 0: 1, 1: 1, 2: 5, 3: 'graduate' },
    1: { 0: 1, 1: 5, 2: 10, 3: 'graduate' },
    2: { 0: 1, 1: 10, 2: 'graduate', 3: 'graduate' },
};

// ── Types ──────────────────────────────────────────────────
export interface CardStateForReview {
    easeFactor: number;
    interval: number;
    repetitions: number;
    lapses: number;
    dueAt: Date;
    lastReviewedAt: Date | null;
}

export interface ReviewUpdatePayload {
    easeFactor: number;
    interval: number;
    repetitions: number;
    lapses: number;
    dueAt: Date;
    lastReviewedAt: Date;
}

// ── Time helpers ───────────────────────────────────────────
export function startOfUTCDay(date: Date): Date {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
}

export function startOfNextUTCDay(date: Date): Date {
    const d = startOfUTCDay(date);
    d.setUTCDate(d.getUTCDate() + 1);
    return d;
}

function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60 * 1000);
}

function addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

// ── Learning step inference ────────────────────────────────
// Infer current learning step from the gap between dueAt and lastReviewedAt.
// Tolerance bands: [0–2] → step 0, (2–7] → step 1, (7+] → step 2
export function inferLearningStep(
    dueAt: Date,
    lastReviewedAt: Date,
): number {
    const gapMinutes =
        (dueAt.getTime() - lastReviewedAt.getTime()) / 60_000;
    if (gapMinutes <= 2) return 0;
    if (gapMinutes <= 7) return 1;
    return 2;
}

// ── Card classification ────────────────────────────────────
export type CardBucket =
    | 'new'
    | 'learning'
    | 'learningLaterToday'
    | 'review'
    | 'future';

export function classifyCard(
    cardState: CardStateForReview,
    now: Date,
): CardBucket {
    if (cardState.lastReviewedAt === null) {
        return 'new';
    }

    const todayStart = startOfUTCDay(now);
    const tomorrowStart = startOfNextUTCDay(now);

    if (cardState.lastReviewedAt >= todayStart) {
        if (cardState.dueAt <= now) return 'learning';
        if (cardState.dueAt < tomorrowStart) return 'learningLaterToday';
        return 'future';
    }

    // lastReviewedAt is before today
    if (cardState.dueAt <= now) return 'review';
    return 'future';
}

// ── Graduation to day-level scheduling ─────────────────────
function graduateToDay(
    cardState: CardStateForReview,
    grade: number,
    newEase: number,
    now: Date,
): ReviewUpdatePayload {
    // Call existing scheduler with ORIGINAL easeFactor (avoids double adjustment)
    const scheduler = createFSRSScheduler();
    const dayResult = scheduler.schedule(
        {
            easeFactor: cardState.easeFactor, // original, NOT newEase
            interval: cardState.interval,
            repetitions: cardState.repetitions,
            lapses: cardState.lapses,
        },
        grade,
        now,
    );

    // Cap interval to MAXIMUM_INTERVAL days
    const cappedInterval = Math.min(dayResult.interval, MAXIMUM_INTERVAL);
    const cappedDueAt = addDays(now, cappedInterval);

    return {
        easeFactor: newEase, // overlay-adjusted ease overrides scheduler
        interval: cappedInterval,
        repetitions: dayResult.repetitions,
        lapses: dayResult.lapses,
        dueAt: cappedDueAt,
        lastReviewedAt: now,
    };
}

// ── Main review handler ────────────────────────────────────
// Determines scheduling outcome for a single review.
// Returns the fields to write to UserCardState.
export function applyReview(
    cardState: CardStateForReview,
    grade: number,
    now: Date = new Date(),
): ReviewUpdatePayload {
    if (grade < 0 || grade > 3) {
        throw new Error('Grade must be between 0 and 3');
    }

    // ── Ease factor (applied once, every review) ──
    const newEase = clamp(
        cardState.easeFactor + (EASE_DELTA[grade] ?? 0),
        EASE_MINIMUM,
        EASE_MAXIMUM,
    );

    // ── Lapses (increment on every Again) ──
    const newLapses =
        grade === 0 ? cardState.lapses + 1 : cardState.lapses;

    // ── Classify card ──
    const bucket = classifyCard(cardState, now);

    // ════════════════════════════════════════════
    // CASE A: First review today (new or review)
    // ════════════════════════════════════════════
    if (bucket === 'new' || bucket === 'review') {
        if (grade === 3) {
            // Easy → skip learning, graduate immediately
            return graduateToDay(cardState, grade, newEase, now);
        }
        // Grades 0, 1, 2 → enter learning step 0 (due in 1 minute)
        return {
            easeFactor: newEase,
            interval: cardState.interval, // unchanged during learning
            repetitions: cardState.repetitions, // unchanged during learning
            lapses: newLapses,
            dueAt: addMinutes(now, 1),
            lastReviewedAt: now,
        };
    }

    // ════════════════════════════════════════════
    // CASE B: Already in today's learning loop
    // ════════════════════════════════════════════
    if (bucket === 'learning' || bucket === 'learningLaterToday') {
        const step = inferLearningStep(
            cardState.dueAt,
            cardState.lastReviewedAt!,
        );
        const result = STEP_TABLE[step]?.[grade];

        if (result === undefined) {
            throw new Error(
                `Invalid step/grade combination: step=${step}, grade=${grade}`,
            );
        }

        if (result === 'graduate') {
            return graduateToDay(cardState, grade, newEase, now);
        }

        return {
            easeFactor: newEase,
            interval: cardState.interval, // unchanged during learning
            repetitions: cardState.repetitions, // unchanged during learning
            lapses: newLapses,
            dueAt: addMinutes(now, result),
            lastReviewedAt: now,
        };
    }

    // 'future' cards should not be reviewable
    throw new Error(`Card is not actionable (bucket: ${bucket})`);
}
