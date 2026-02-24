// API route for submitting a review
// POST /api/study/review
// Body: { cardStateId, cardId, direction, grade, responseTime }

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createFSRSScheduler } from "@/lib/srs/fsrs";
import { updateMasteryState } from "@/lib/srs/mastery";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || !session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const userId = session.user.id;
        const { cardStateId, cardId, direction, grade, responseTime } =
            await request.json();

        // Validate input
        if (
            !cardStateId ||
            !cardId ||
            !["forward", "reverse"].includes(direction)
        ) {
            return NextResponse.json(
                { error: "Invalid input" },
                { status: 400 },
            );
        }

        if (typeof grade !== "number" || grade < 0 || grade > 4) {
            return NextResponse.json(
                { error: "Grade must be 0-4" },
                { status: 400 },
            );
        }

        // Fetch current state
        const cardState = await prisma.userCardState.findUnique({
            where: { id: cardStateId },
            include: { card: true, user: true },
        });

        if (!cardState || cardState.userId !== userId) {
            return NextResponse.json(
                { error: "Card state not found" },
                { status: 404 },
            );
        }

        // Schedule next review using FSRS
        const scheduler = createFSRSScheduler();
        const now = new Date();
        const scheduledInfo = scheduler.schedule(
            {
                easeFactor: cardState.easeFactor,
                interval: cardState.interval,
                repetitions: cardState.repetitions,
                lapses: cardState.lapses,
            },
            grade,
            now,
        );

        // Update mastery
        const masteryUpdate = updateMasteryState(
            {
                isForwardLearned: cardState.isForwardLearned,
                isReverseLearned: cardState.isReverseLearned,
                isMastered: cardState.isMastered,
            },
            direction,
            grade,
        );

        // Update user card state
        const updated = await prisma.userCardState.update({
            where: { id: cardStateId },
            data: {
                easeFactor: scheduledInfo.easeFactor,
                interval: scheduledInfo.interval,
                repetitions: scheduledInfo.repetitions,
                lapses: scheduledInfo.lapses,
                dueAt: scheduledInfo.nextDueAt,
                lastReviewedAt: now,
                ...masteryUpdate,
            },
        });

        // Log review
        await prisma.reviewLog.create({
            data: {
                userId,
                cardId,
                userCardStateId: cardStateId,
                direction,
                grade,
                responseTime: responseTime || null,
                scheduledBefore: now,
                scheduledAfter: scheduledInfo.nextDueAt,
            },
        });

        return NextResponse.json({
            success: true,
            cardStateId: cardStateId,
            updated: {
                reps: updated.repetitions,
                interval: updated.interval,
                ease: updated.easeFactor,
                lapses: updated.lapses,
                nextDueAt: updated.dueAt,
                isForwardLearned: updated.isForwardLearned,
                isReverseLearned: updated.isReverseLearned,
                isMastered: updated.isMastered,
            },
        });
    } catch (error) {
        console.error("Review error:", error);
        return NextResponse.json(
            {
                error: "Failed to process review",
                details: error instanceof Error ? error.message : undefined,
            },
            { status: 500 },
        );
    }
}
