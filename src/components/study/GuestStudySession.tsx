"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { FlashcardAnimated } from "./FlashcardAnimated";
import type { CardData, CardStateData } from "@/types/card";
import {
    loadGuestSession,
    saveGuestCardState,
    clearGuestSession,
    getDefaultCardState,
    hasGuestSession,
    GuestCardState,
} from "@/lib/srs/guest-srs";
import { FSRSScheduler, CardState } from "@/lib/srs/fsrs";
import type { SampleCard } from "@/app/api/decks/sample/route";

const scheduler = new FSRSScheduler();

interface GuestStudySessionProps {
    onRequestSignIn: () => void;
}

function toCardStateData(gs: GuestCardState): CardStateData {
    return {
        easeFactor: gs.easeFactor,
        interval: gs.interval,
        repetitions: gs.repetitions,
        lapses: gs.lapses,
        isForwardLearned: gs.isForwardLearned,
        isReverseLearned: gs.isReverseLearned,
        isMastered: gs.isMastered,
    };
}

function isDue(state: GuestCardState): boolean {
    return new Date(state.dueAt) <= new Date();
}

export function GuestStudySession({ onRequestSignIn }: GuestStudySessionProps) {
    const { data: session, status } = useSession();
    const [allCards, setAllCards] = useState<SampleCard[]>([]);
    const [dueQueue, setDueQueue] = useState<SampleCard[]>([]);
    const [currentCard, setCurrentCard] = useState<SampleCard | null>(null);
    const [currentState, setCurrentState] = useState<GuestCardState | null>(
        null,
    );
    const [directionMode, setDirectionMode] = useState<"mix" | "forward" | "reverse">("mix");
    const [reverse, setReverse] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sessionCount, setSessionCount] = useState(0);
    // One-time check: did this guest have session data before auth?
    const [hadGuestSession] = useState(() => hasGuestSession());

    const refreshQueue = useCallback(
        (cards?: SampleCard[]) => {
            const cardList = cards ?? allCards;
            const guestSession = loadGuestSession();
            const due: SampleCard[] = [];

            for (const card of cardList) {
                const state =
                    guestSession.states[card.externalRowId] ??
                    getDefaultCardState();
                // Forward direction
                if (!state.isForwardLearned && isDue(state)) due.push(card);
            }
            // Shuffle due cards
            due.sort(() => Math.random() - 0.5);
            setDueQueue(due);
            setCurrentCard(due[0] ?? null);
            if (due[0]) {
                const guestSession = loadGuestSession();
                const st =
                    guestSession.states[due[0].externalRowId] ??
                    getDefaultCardState();
                setCurrentState(st);
            } else {
                setCurrentState(null);
            }
        },
        [allCards],
    );

    // Derive migration state — no setState needed in effects
    const migratingProgress =
        status === "authenticated" && !!session && hadGuestSession;

    // Fetch sample cards — runs once on mount only
    // (refreshQueue is called with explicit `cards` arg, not via closure over allCards)
    useEffect(() => {
        fetch("/api/decks/sample")
            .then((r) => r.json())
            .then(({ cards }) => {
                setAllCards(cards);
                refreshQueue(cards);
                setLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Migrate guest session to DB when user logs in
    // Effect only performs external work (fetch + redirect), no setState
    useEffect(() => {
        if (status !== "authenticated" || !session || !hasGuestSession())
            return;

        const guestSession = loadGuestSession();

        (async () => {
            try {
                await fetch("/api/auth/migrate-guest", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ states: guestSession.states }),
                });
                clearGuestSession();
            } catch {
                // Non-fatal — user can start fresh
            }
            // Redirect to home which will now show logged-in view
            window.location.href = "/";
        })();
    }, [status, session]);

    const handleReview = useCallback(
        (grade: number) => {
            if (!currentCard || !currentState) return;

            const fsrsState: CardState = {
                easeFactor: currentState.easeFactor,
                interval: currentState.interval,
                repetitions: currentState.repetitions,
                lapses: currentState.lapses,
            };
            const scheduled = scheduler.schedule(fsrsState, grade);

            const isForwardLearned =
                currentState.isForwardLearned || (!reverse && grade >= 1);
            const isReverseLearned =
                currentState.isReverseLearned || (reverse && grade >= 1);

            const newState: GuestCardState = {
                easeFactor: scheduled.easeFactor,
                interval: scheduled.interval,
                repetitions: scheduled.repetitions,
                lapses: scheduled.lapses,
                dueAt: scheduled.nextDueAt.toISOString(),
                isForwardLearned,
                isReverseLearned,
                isMastered: isForwardLearned && isReverseLearned,
            };

            saveGuestCardState(currentCard.externalRowId, newState);
            setSessionCount((c) => c + 1);

            // Move to next due card
            const remaining = dueQueue.slice(1);
            if (grade === 0) {
                // Requeue at a random position for "Again"
                const reinsertAt = Math.min(
                    Math.floor(Math.random() * 5) + 1,
                    remaining.length,
                );
                remaining.splice(reinsertAt, 0, currentCard);
            }
            setDueQueue(remaining);
            if (remaining[0]) {
                const guestSession = loadGuestSession();
                const st =
                    guestSession.states[remaining[0].externalRowId] ??
                    getDefaultCardState();
                setCurrentState(st);
            }
            setCurrentCard(remaining[0] ?? null);
        },
        [currentCard, currentState, dueQueue, reverse],
    );

    if (migratingProgress) {
        return (
            <div className='flex flex-col items-center justify-center py-16 gap-4'>
                <div className='w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin' />
                <p className='text-gray-600 font-medium'>
                    Saving your progress…
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center py-16 gap-4'>
                <div className='w-10 h-10 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin' />
                <p className='text-gray-500'>Loading sample deck…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='text-center py-12'>
                <p className='text-red-500 mb-4'>Failed to load sample deck</p>
                <button
                    onClick={() => window.location.reload()}
                    className='px-4 py-2 bg-indigo-600 text-white rounded-lg'
                >
                    Retry
                </button>
            </div>
        );
    }

    const guestSession = loadGuestSession();
    const learnedCount = Object.values(guestSession.states).filter(
        (s) => s.isForwardLearned,
    ).length;

    if (!currentCard || !currentState) {
        const totalDueForReverse = allCards.filter((card) => {
            const state = guestSession.states[card.externalRowId];
            return (
                state?.isForwardLearned &&
                !state?.isReverseLearned &&
                isDue(state)
            );
        });

        return (
            <div className='text-center py-10 space-y-4'>
                <div className='text-6xl mb-2'>🎉</div>
                <h3 className='text-2xl font-bold text-gray-800'>
                    Session complete!
                </h3>
                <p className='text-gray-600'>
                    {sessionCount} cards reviewed • {learnedCount}/
                    {allCards.length} learned forward
                </p>

                {totalDueForReverse.length > 0 && (
                    <button
                        onClick={() => {
                            setReverse(true);
                            refreshQueue();
                        }}
                        className='w-full max-w-xs mx-auto block py-3 rounded-xl font-semibold text-white transition-all bg-accent'
                    >
                        Practice Reverse ↩
                    </button>
                )}

                <button
                    onClick={() => refreshQueue()}
                    className='w-full max-w-xs mx-auto block py-3 rounded-xl font-semibold border-2 border-indigo-200 text-indigo-600 bg-white transition-all hover:bg-indigo-50'
                >
                    Study Again
                </button>

                <div className='pt-4 border-t border-gray-100'>
                    <p className='text-sm text-gray-500 mb-3'>
                        Sign in to save your progress and import custom decks
                    </p>
                    <button
                        onClick={onRequestSignIn}
                        className='flex items-center gap-2 mx-auto px-5 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-indigo-300 transition'
                    >
                        <GoogleIcon />
                        Continue with Google
                    </button>
                </div>
            </div>
        );
    }

    const toCardData = (c: SampleCard): CardData => ({
        externalRowId: c.externalRowId,
        armenianScript: c.armenianScript,
        translit: c.translit,
        englishMeaning: c.englishMeaning,
        exampleSentence: c.exampleSentence,
        exampleTranslation: c.exampleTranslation,
        grammar: c.grammar,
        cheatPhrase: c.cheatPhrase,
        topic: c.topic,
    });

    return (
        <div className='w-full space-y-4'>
            {/* Progress header */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <span className='text-sm font-medium text-gray-600'>
                        {dueQueue.length} left
                    </span>
                    <div className='w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-indigo-500 rounded-full transition-all'
                            style={{
                                width: `${Math.max(0, 100 - (dueQueue.length / allCards.length) * 100)}%`,
                            }}
                        />
                    </div>
                    <span className='text-sm text-gray-400'>
                        {learnedCount} learned
                    </span>
                </div>
            </div>

            <FlashcardAnimated
                card={toCardData(currentCard)}
                state={toCardStateData(currentState)}
                reverse={reverse}
                directionMode={directionMode}
                onDirectionChange={(m) => {
                    setDirectionMode(m);
                    if (m === "forward") setReverse(false);
                    else if (m === "reverse") setReverse(true);
                    // mix: keep current reverse as-is (guest demo doesn't use weak-link logic)
                }}
                onReview={handleReview}
                onSkip={() => {
                    // Move current card to end of queue, no state change
                    const remaining = dueQueue.slice(1);
                    remaining.push(currentCard);
                    setDueQueue(remaining);
                    const guestSession = loadGuestSession();
                    const st =
                        guestSession.states[remaining[0]?.externalRowId] ??
                        getDefaultCardState();
                    setCurrentCard(remaining[0] ?? null);
                    setCurrentState(remaining[0] ? st : null);
                }}
            />

            {/* Sign-in nudge */}
            <div className='text-center pt-2'>
                <button
                    onClick={onRequestSignIn}
                    className='text-sm text-indigo-500 hover:text-indigo-700 underline-offset-2 hover:underline'
                >
                    Sign in to save progress & import your own decks →
                </button>
            </div>
        </div>
    );
}

function GoogleIcon() {
    return (
        <svg width='18' height='18' viewBox='0 0 24 24'>
            <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'
            />
            <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            />
        </svg>
    );
}
