"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { CardData, CardStateData } from "@/types/card";
import { GRADE_CONFIG } from "@/constants/gradeConfig";

export type { CardData, CardStateData };

interface FlashcardAnimatedProps {
    card: CardData;
    state: CardStateData;
    reverse: boolean;
    onToggleReverse: (reverse: boolean) => void;
    onReview: (grade: number, responseTimeMs: number) => void;
    onSkip: () => void;
}

export function FlashcardAnimated({
    card,
    state,
    reverse,
    onToggleReverse,
    onReview,
    onSkip,
}: FlashcardAnimatedProps) {
    const [flipped, setFlipped] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const startTimeRef = useRef(0);
    const [prevCardKey, setPrevCardKey] = useState(
        () => `${card.armenianScript}|${card.englishMeaning}`,
    );

    // Reset card when content changes (render-time state adjustment)
    const cardKey = `${card.armenianScript}|${card.englishMeaning}`;
    if (cardKey !== prevCardKey) {
        setPrevCardKey(cardKey);
        setFlipped(false);
    }

    // Reset timer when card changes (side effect, ref mutation is safe in effects)
    useEffect(() => {
        startTimeRef.current = Date.now();
    }, [cardKey]);

    const frontText = reverse ? card.englishMeaning : card.armenianScript;
    const frontSub = reverse ? "" : card.translit;
    const backLabel = reverse ? "ARMENIAN" : "ENGLISH";
    const backText = reverse ? card.armenianScript : card.englishMeaning;
    const backSub = reverse ? card.translit : null;

    const handleGrade = useCallback(
        (grade: number) => {
            onReview(grade, Date.now() - startTimeRef.current);
        },
        [onReview],
    );

    const handleToggle = (dir: boolean) => {
        // Don't allow toggling while a card is flipped mid-review
        if (flipped) return;
        onToggleReverse(dir);
    };

    return (
        <div className='flex flex-col gap-3 w-full'>
            {/* DIRECTION TOGGLE + HINTS TOGGLE */}
            <div className='flex gap-2 justify-center items-center'>
                <button
                    onClick={() => handleToggle(false)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        !reverse
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300"
                    }`}
                >
                    {state.isForwardLearned ? "✓" : "○"} Forward
                </button>
                <button
                    onClick={() => handleToggle(true)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        reverse
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300"
                    }`}
                >
                    {state.isReverseLearned ? "✓" : "○"} Reverse
                </button>
                {/* Eye icon — show/hide hints (phonetic & category) */}
                <button
                    onClick={() => setShowHints((v) => !v)}
                    title={showHints ? "Hide hints" : "Show hints"}
                    className={`p-1.5 rounded-full border transition-all ${
                        showHints
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : "bg-white text-gray-400 border-gray-200 hover:border-indigo-300 hover:text-indigo-500"
                    }`}
                    aria-label={showHints ? "Hide hints" : "Show hints"}
                >
                    {showHints ? (
                        /* eye open */
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                            <circle cx='12' cy='12' r='3' />
                        </svg>
                    ) : (
                        /* eye off */
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94' />
                            <path d='M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19' />
                            <line x1='1' y1='1' x2='23' y2='23' />
                        </svg>
                    )}
                </button>
            </div>

            {/* CARD — no fixed height, text wraps naturally */}
            {!flipped ? (
                /* ── FRONT ── */
                <div
                    className='bg-white border-2 border-indigo-100 shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center gap-3 cursor-pointer select-none transition-shadow hover:shadow-xl active:scale-[0.99]'
                    onClick={() => setFlipped(true)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            setFlipped(true);
                        }
                    }}
                    aria-label='Tap to reveal answer'
                >
                    <div
                        className={`text-center font-bold leading-snug wrap-break-word w-full text-foreground ${
                            reverse
                                ? "text-3xl sm:text-4xl"
                                : "font-armenian text-4xl sm:text-5xl"
                        }`}
                    >
                        {frontText}
                    </div>

                    {frontSub && showHints && (
                        <div className='text-gray-400 text-lg tracking-wide'>
                            {frontSub}
                        </div>
                    )}

                    {card.topic && showHints && (
                        <span className='text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 font-medium'>
                            {card.topic}
                        </span>
                    )}

                    <div className='mt-1 text-sm text-gray-400 flex items-center gap-1.5'>
                        <svg
                            width='14'
                            height='14'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                            <circle cx='12' cy='12' r='3' />
                        </svg>
                        tap to reveal
                    </div>
                </div>
            ) : (
                /* ── BACK ── */
                <div
                    className='bg-linear-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-lg rounded-2xl px-6 py-6 flex flex-col items-center gap-3 cursor-pointer select-none'
                    onClick={() => setFlipped(false)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            setFlipped(false);
                        }
                    }}
                >
                    {/* Question reminder — what was on the front */}
                    <div className='w-full flex items-center gap-2 pb-3 border-b border-indigo-100'>
                        <span className='text-xs text-gray-400 shrink-0'>
                            You saw:
                        </span>
                        <span
                            className={`font-semibold text-gray-600 wrap-break-word leading-snug ${
                                reverse ? "text-base" : "font-armenian text-lg"
                            }`}
                        >
                            {frontText}
                        </span>
                        {frontSub && (
                            <span className='text-gray-400 text-sm ml-1 shrink-0'>
                                ({frontSub})
                            </span>
                        )}
                    </div>
                    {/* Answer */}
                    <div className='text-xs font-semibold text-indigo-400 uppercase tracking-widest'>
                        {backLabel}
                    </div>
                    <div
                        className={`text-center font-bold leading-snug wrap-break-word w-full ${
                            reverse
                                ? "font-armenian text-4xl sm:text-5xl text-indigo-900"
                                : "text-3xl sm:text-4xl text-indigo-700"
                        }`}
                    >
                        {backText}
                    </div>
                    {backSub && (
                        <div className='text-gray-500 text-lg'>{backSub}</div>
                    )}

                    {/* Example — always shown when available */}
                    {card.exampleSentence && (
                        <div className='w-full bg-white/80 rounded-xl px-4 py-3 border border-white/90 mt-1'>
                            <div className='text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1'>
                                Example
                            </div>
                            <div className='font-armenian text-gray-800 text-sm leading-relaxed wrap-break-word'>
                                {card.exampleSentence}
                            </div>
                            {card.exampleTranslation && (
                                <div className='text-gray-500 italic text-sm mt-1'>
                                    {card.exampleTranslation}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* ACTION AREA — always at same vertical position */}
            {!flipped ? (
                <div className='flex gap-2'>
                    <button
                        className='flex-1 py-4 rounded-xl font-semibold text-white text-lg transition-all active:scale-[0.98] bg-accent'
                        onClick={() => setFlipped(true)}
                    >
                        Reveal Answer
                    </button>
                    <button
                        className='px-5 py-4 rounded-xl font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 active:scale-[0.98] transition-all text-sm'
                        onClick={onSkip}
                        title='Skip — come back later'
                    >
                        Skip
                    </button>
                </div>
            ) : (
                <div className='space-y-2'>
                    <p className='text-center text-sm text-gray-500 font-medium'>
                        How well did you remember?
                    </p>
                    <div className='grid grid-cols-4 gap-1.5 w-full'>
                        {GRADE_CONFIG.map(({ grade, label, emoji, bg }) => (
                            <button
                                key={grade}
                                className={`grade-btn text-white flex-col gap-0.5 ${bg} w-full`}
                                onClick={() => handleGrade(grade)}
                            >
                                <span className='text-lg leading-none'>
                                    {emoji}
                                </span>
                                <span className='text-xs leading-none'>
                                    {label}
                                </span>
                            </button>
                        ))}
                    </div>
                    <button
                        className='w-full py-2 rounded-xl text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all'
                        onClick={onSkip}
                    >
                        Skip for now
                    </button>
                </div>
            )}

            {/* EXTRA DETAILS — below buttons, scrollable via page */}
            {flipped && (card.cheatPhrase || card.grammar) && (
                <div className='space-y-2 pt-1'>
                    {card.cheatPhrase && (
                        <div className='bg-amber-50 rounded-xl px-4 py-3 border border-amber-100'>
                            <div className='text-xs text-amber-500 font-semibold uppercase tracking-wider mb-1'>
                                Mnemonic
                            </div>
                            <div className='text-gray-700 text-sm leading-relaxed'>
                                {card.cheatPhrase}
                            </div>
                        </div>
                    )}
                    {card.grammar && (
                        <div className='bg-white rounded-xl px-4 py-3 border border-gray-200'>
                            <div className='text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1'>
                                Grammar
                            </div>
                            <div className='text-gray-600 text-sm leading-relaxed'>
                                {card.grammar}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
