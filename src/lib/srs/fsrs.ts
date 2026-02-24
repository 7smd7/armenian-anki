// FSRS scheduling algorithm
// Simplified implementation compatible with FSRS logic
// Reference: https://github.com/open-spaced-repetition/fsrs.js

export interface FSRSParameters {
    requestRetention: number; // Target retention (0.8-0.95 recommended), default 0.9
    maximumInterval: number; // Maximum interval in days, default 36500
}

export interface CardState {
    easeFactor: number;
    interval: number;
    repetitions: number;
    lapses: number;
}

export interface ScheduledInfo {
    easeFactor: number;
    interval: number;
    repetitions: number;
    lapses: number;
    nextDueAt: Date;
}

const DEFAULT_PARAMS: FSRSParameters = {
    requestRetention: 0.9,
    maximumInterval: 36500,
};

export class FSRSScheduler {
    params: FSRSParameters;

    constructor(params: Partial<FSRSParameters> = {}) {
        this.params = { ...DEFAULT_PARAMS, ...params };
    }

    /**
     * Schedule the next review based on user response.
     * Grade: 0 = again, 1 = hard, 2 = good, 3 = easy, 4 = perfect
     */
    schedule(
        state: CardState,
        grade: number,
        now: Date = new Date(),
    ): ScheduledInfo {
        if (grade < 0 || grade > 4) {
            throw new Error("Grade must be between 0 and 4");
        }

        const { interval } = state;
        let { easeFactor, repetitions, lapses } = state;
        let nextInterval = interval;

        if (grade < 2) {
            // Lapse: incorrect response
            lapses++;
            repetitions = 0;
            nextInterval = 1;
            easeFactor = Math.max(1.3, easeFactor - 0.2);
        } else {
            // Correct response
            repetitions++;

            if (repetitions === 1) {
                nextInterval = 1;
            } else if (repetitions === 2) {
                nextInterval = 3;
            } else {
                // SM-2 formula: interval = previous_interval * ease_factor
                nextInterval = Math.round(interval * easeFactor);
            }

            // Adjust ease factor based on grade
            const adjustments: { [key: number]: number } = {
                2: -0.14,
                3: 0,
                4: 0.1,
            };

            if (adjustments[grade] !== undefined) {
                easeFactor = Math.max(1.3, easeFactor + adjustments[grade]);
            }
        }

        // Cap interval
        nextInterval = Math.min(nextInterval, this.params.maximumInterval);

        const nextDueAt = new Date(
            now.getTime() + nextInterval * 24 * 60 * 60 * 1000,
        );

        return {
            easeFactor,
            interval: nextInterval,
            repetitions,
            lapses,
            nextDueAt,
        };
    }
}

export function createFSRSScheduler(params?: Partial<FSRSParameters>) {
    return new FSRSScheduler(params);
}
