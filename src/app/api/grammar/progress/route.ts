// Grammar practice progress for the signed-in user
// GET    /api/grammar/progress → { states: { [cardKey]: SrsState } }
// POST   /api/grammar/progress  body { states } → merge guest progress after sign-in
// DELETE /api/grammar/progress → reset all grammar progress

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isValidCardKey } from "@/lib/grammar/cards";
import { isSrsState, type SrsStates } from "@/lib/grammar/srs";

async function userId() {
    const session = await auth();
    return session?.user?.id ?? null;
}

const unauthorized = () =>
    NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET() {
    const uid = await userId();
    if (!uid) return unauthorized();

    const rows = await prisma.grammarCardState.findMany({
        where: { userId: uid },
    });
    const states: SrsStates = {};
    for (const r of rows) {
        states[r.cardKey] = {
            easeFactor: r.easeFactor,
            interval: r.interval,
            repetitions: r.repetitions,
            lapses: r.lapses,
            dueAt: r.dueAt.toISOString(),
            lastReviewedAt: r.lastReviewedAt?.toISOString() ?? null,
        };
    }
    return NextResponse.json({ states });
}

export async function POST(request: NextRequest) {
    const uid = await userId();
    if (!uid) return unauthorized();

    let body: { states?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    if (!body.states || typeof body.states !== "object") {
        return NextResponse.json({ error: "states required" }, { status: 400 });
    }

    const incoming = Object.entries(body.states as Record<string, unknown>)
        .filter(([key, s]) => isValidCardKey(key) && isSrsState(s))
        .slice(0, 5000) as [string, SrsStates[string]][];

    const existing = await prisma.grammarCardState.findMany({
        where: { userId: uid, cardKey: { in: incoming.map(([k]) => k) } },
        select: { cardKey: true, lastReviewedAt: true },
    });
    const existingAt = new Map(
        existing.map((e) => [e.cardKey, e.lastReviewedAt?.getTime() ?? 0]),
    );

    // Keep whichever copy was reviewed more recently
    let merged = 0;
    for (const [cardKey, s] of incoming) {
        if (!s.lastReviewedAt) continue;
        const guestAt = Date.parse(s.lastReviewedAt);
        if ((existingAt.get(cardKey) ?? -1) >= guestAt) continue;
        const data = {
            easeFactor: s.easeFactor,
            interval: s.interval,
            repetitions: s.repetitions,
            lapses: s.lapses,
            dueAt: new Date(s.dueAt),
            lastReviewedAt: new Date(guestAt),
        };
        await prisma.grammarCardState.upsert({
            where: { userId_cardKey: { userId: uid, cardKey } },
            create: { userId: uid, cardKey, ...data },
            update: data,
        });
        merged++;
    }
    return NextResponse.json({ merged });
}

export async function DELETE() {
    const uid = await userId();
    if (!uid) return unauthorized();
    await prisma.$transaction([
        prisma.grammarCardState.deleteMany({ where: { userId: uid } }),
        prisma.grammarReviewLog.deleteMany({ where: { userId: uid } }),
    ]);
    return NextResponse.json({ success: true });
}
