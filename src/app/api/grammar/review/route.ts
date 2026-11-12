// Record one grammar review and reschedule the card
// POST /api/grammar/review
// Body: { cardKey, grade (0-3), correct, responseTime? }
// → { state: SrsState }

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isValidCardKey } from "@/lib/grammar/cards";
import { NEW_STATE, reviewCard, type SrsState } from "@/lib/grammar/srs";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { cardKey, grade, correct, responseTime } = await request.json();
        if (typeof cardKey !== "string" || !isValidCardKey(cardKey)) {
            return NextResponse.json({ error: "Unknown card" }, { status: 400 });
        }
        if (!Number.isInteger(grade) || grade < 0 || grade > 3) {
            return NextResponse.json({ error: "Grade must be 0-3" }, { status: 400 });
        }

        const now = new Date();
        const row = await prisma.grammarCardState.findUnique({
            where: { userId_cardKey: { userId, cardKey } },
        });
        const before: SrsState = row
            ? {
                  easeFactor: row.easeFactor,
                  interval: row.interval,
                  repetitions: row.repetitions,
                  lapses: row.lapses,
                  dueAt: row.dueAt.toISOString(),
                  lastReviewedAt: row.lastReviewedAt?.toISOString() ?? null,
              }
            : NEW_STATE(now);
        const after = reviewCard(before, grade, now);

        const data = {
            easeFactor: after.easeFactor,
            interval: after.interval,
            repetitions: after.repetitions,
            lapses: after.lapses,
            dueAt: new Date(after.dueAt),
            lastReviewedAt: after.lastReviewedAt
                ? new Date(after.lastReviewedAt)
                : null,
        };

        await prisma.$transaction([
            prisma.grammarCardState.upsert({
                where: { userId_cardKey: { userId, cardKey } },
                create: { userId, cardKey, ...data },
                update: data,
            }),
            prisma.grammarReviewLog.create({
                data: {
                    userId,
                    cardKey,
                    grade,
                    correct: Boolean(correct),
                    responseTime:
                        typeof responseTime === "number"
                            ? Math.round(responseTime)
                            : null,
                    scheduledBefore: new Date(before.dueAt),
                    scheduledAfter: new Date(after.dueAt),
                },
            }),
        ]);

        return NextResponse.json({ state: after });
    } catch (error) {
        console.error("Grammar review error:", error);
        return NextResponse.json(
            { error: "Failed to save review" },
            { status: 500 },
        );
    }
}
