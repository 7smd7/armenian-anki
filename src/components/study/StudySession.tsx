"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FlashcardAnimated } from "@/components/study/FlashcardAnimated";
import { ImportModal } from "@/components/modals/ImportModal";
import type { CardData, CardStateData } from "@/types/card";

interface ApiCardData {
    id: string;
    armenianScript: string;
    translit: string;
    englishMeaning: string;
    exampleSentence: string | null;
    exampleTranslation: string | null;
    grammar: string | null;
    cheatPhrase: string | null;
    topic: string | null;
}

interface ApiCardState {
    cardStateId: string;
    reps: number;
    interval: number;
    ease: number;
    lapses: number;
    isForwardLearned: boolean;
    isReverseLearned: boolean;
    isMastered: boolean;
}

export function StudySession({
    deckId,
    selectedTopic,
}: {
    deckId: string;
    deckTitle?: string;
    selectedTopic?: string;
}) {
    const [card, setCard] = useState<ApiCardData | null>(null);
    const [state, setState] = useState<ApiCardState | null>(null);
    const [remaining, setRemaining] = useState(0);
    const [totalCards, setTotalCards] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [completed, setCompleted] = useState(false);
    const [reviewsCount, setReviewsCount] = useState(0);
    const [skippedIds, setSkippedIds] = useState<Set<string>>(new Set());
    const [showImport, setShowImport] = useState(false);

    const fetchNextCard = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = new URL("/api/study/next", window.location.origin);
            url.searchParams.set("deckId", deckId);
            url.searchParams.set("reverse", reverse.toString());
            if (selectedTopic) url.searchParams.set("topic", selectedTopic);
            if (skippedIds.size > 0)
                url.searchParams.set("skip", [...skippedIds].join(","));

            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch card");

            const data = await res.json();

            if (data.completed || !data.card) {
                setCompleted(true);
                setCard(null);
                setState(null);
                setRemaining(0);
                setTotalCards(data.totalCards ?? 0);
            } else {
                setCard(data.card);
                setState(data.state);
                setRemaining(data.remaining);
                setTotalCards(data.totalCards ?? 0);
                setCompleted(false);
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false);
        }
    }, [deckId, reverse, selectedTopic, skippedIds]);

    useEffect(() => {
        fetchNextCard();
    }, [fetchNextCard]);

    const handleReview = useCallback(
        async (grade: number, responseTime: number) => {
            if (!state || !card) return;

            try {
                const res = await fetch("/api/study/review", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        cardStateId: state.cardStateId,
                        cardId: card.id,
                        direction: reverse ? "reverse" : "forward",
                        grade,
                        responseTime,
                    }),
                });

                if (!res.ok) throw new Error("Failed to submit review");

                setReviewsCount((c) => c + 1);
                // Card was graded — remove from skip list so it can resurface
                if (card)
                    setSkippedIds((s) => {
                        const n = new Set(s);
                        n.delete(card.id);
                        return n;
                    });
                fetchNextCard();
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : String(err));
            }
        },
        [state, card, reverse, fetchNextCard],
    );

    if (loading) {
        return (
            <div className='flex flex-col items-center py-16 gap-4'>
                <div className='w-10 h-10 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin' />
                <p className='text-gray-500'>Loading your cards…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='text-center py-10'>
                <p className='text-red-500 mb-4'>{error}</p>
                <button
                    onClick={fetchNextCard}
                    className='px-4 py-2 bg-indigo-600 text-white rounded-xl'
                >
                    Retry
                </button>
            </div>
        );
    }

    if (totalCards === 0) {
        return (
            <>
                <div className='text-center py-10 space-y-6'>
                    <div className='text-6xl'>📭</div>
                    <h3 className='text-xl font-bold text-gray-800'>
                        This deck has no cards yet
                    </h3>
                    <p className='text-gray-500 text-sm'>
                        Import a CSV to populate this deck, or manage it
                        manually.
                    </p>
                    <div className='flex flex-col gap-3 max-w-xs mx-auto'>
                        <button
                            onClick={() => setShowImport(true)}
                            className='w-full py-3 rounded-xl font-semibold text-white bg-accent'
                        >
                            Import CSV
                        </button>
                        <Link
                            href={`/decks/${deckId}`}
                            className='w-full py-3 rounded-xl font-semibold text-center border border-gray-300 text-gray-700 hover:bg-gray-50 transition'
                        >
                            Manage Deck
                        </Link>
                    </div>
                </div>
                <ImportModal
                    isOpen={showImport}
                    onClose={() => setShowImport(false)}
                    initialMode='update_deck'
                    initialDeckId={deckId}
                />
            </>
        );
    }

    if (completed) {
        return (
            <div className='text-center py-10 space-y-4'>
                <div className='text-6xl'>🎉</div>
                <h3 className='text-2xl font-bold text-gray-800'>
                    Session complete!
                </h3>
                <p className='text-gray-600'>{reviewsCount} cards reviewed</p>
                <button
                    onClick={() => {
                        setReviewsCount(0);
                        setCompleted(false);
                        fetchNextCard();
                    }}
                    className='w-full max-w-xs mx-auto block py-3 rounded-xl font-semibold text-white bg-accent'
                >
                    Study Again
                </button>
            </div>
        );
    }

    if (!card || !state) {
        return (
            <div className='text-center py-10'>
                <p className='text-gray-600 mb-4'>
                    No cards due for study right now.
                </p>
            </div>
        );
    }

    const cardData: CardData = {
        id: card.id,
        armenianScript: card.armenianScript,
        translit: card.translit,
        englishMeaning: card.englishMeaning,
        exampleSentence: card.exampleSentence,
        exampleTranslation: card.exampleTranslation,
        grammar: card.grammar,
        cheatPhrase: card.cheatPhrase,
        topic: card.topic,
    };

    const stateData: CardStateData = {
        easeFactor: state.ease,
        interval: state.interval,
        repetitions: state.reps,
        lapses: state.lapses,
        isForwardLearned: state.isForwardLearned,
        isReverseLearned: state.isReverseLearned,
        isMastered: state.isMastered,
    };

    return (
        <div className='w-full space-y-4'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span className='text-sm font-bold text-gray-800'>
                        {totalCards - remaining}
                    </span>
                    <span className='text-sm text-gray-400'>/</span>
                    <span className='text-sm text-gray-500'>
                        {totalCards} mastered
                    </span>
                </div>
                <span className='text-xs text-gray-400'>
                    {reviewsCount} reviewed
                </span>
            </div>

            <FlashcardAnimated
                card={cardData}
                state={stateData}
                reverse={reverse}
                onToggleReverse={(r) => setReverse(r)}
                onReview={handleReview}
                onSkip={() => {
                    if (card) setSkippedIds((s) => new Set([...s, card.id]));
                    // skippedIds change triggers fetchNextCard via useEffect
                }}
            />
        </div>
    );
}
