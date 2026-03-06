// API route for submitting a review
// POST /api/study/review
// Body: { cardStateId, cardId, direction, grade, responseTime }
//
// Uses the learning overlay for same-day scheduling decisions,
// delegating to FSRSScheduler only on graduation.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { applyReview } from "@/lib/srs/learning-overlay";
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

        if (typeof grade !== "number" || grade < 0 || grade > 3) {
            return NextResponse.json(
                { error: "Grade must be 0-3" },
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

        // Apply review through learning overlay
        const now = new Date();
        const updatePayload = applyReview(
            {
                easeFactor: cardState.easeFactor,
                interval: cardState.interval,
                repetitions: cardState.repetitions,
                lapses: cardState.lapses,
                dueAt: cardState.dueAt,
                lastReviewedAt: cardState.lastReviewedAt,
            },
            grade,
            now,
        );

        // Update mastery (unchanged)
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
                easeFactor: updatePayload.easeFactor,
                interval: updatePayload.interval,
                repetitions: updatePayload.repetitions,
                lapses: updatePayload.lapses,
                dueAt: updatePayload.dueAt,
                lastReviewedAt: updatePayload.lastReviewedAt,
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
                scheduledBefore: cardState.dueAt,
                scheduledAfter: updatePayload.dueAt,
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
