"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Nav } from "@/components/Nav";
import { GuestStudySession } from "@/components/study/GuestStudySession";
import { StudySession } from "@/components/study/StudySession";
import { DecksModal } from "@/components/modals/DecksModal";
import { ImportModal } from "@/components/modals/ImportModal";
import { signIn } from "next-auth/react";
import type { Deck } from "@/types/deck";

export function HomeController() {
    const { status } = useSession();
    const isAuthenticated = status === "authenticated";
    const isLoading = status === "loading";

    const [decksModalOpen, setDecksModalOpen] = useState(() => {
        if (typeof window === "undefined") return false;
        const params = new URLSearchParams(window.location.search);
        const shouldOpen = params.get("modal") === "decks";
        if (shouldOpen) window.history.replaceState({}, "", "/");
        return shouldOpen;
    });
    const [importModalOpen, setImportModalOpen] = useState(false);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
    const [decksLoading, setDecksLoading] = useState(false);
    const [seeding, setSeeding] = useState(false);

    const fetchDecks = async () => {
        setDecksLoading(true);
        try {
            const r = await fetch("/api/decks");
            const d = await r.json();
            const deckList: Deck[] = d.decks ?? [];
            setDecks(deckList);
            if (deckList.length > 0) setSelectedDeckId(deckList[0].id);
        } catch {
            // ignore
        } finally {
            setDecksLoading(false);
        }
    };

    const handleAddDefaultDeck = async () => {
        setSeeding(true);
        try {
            const res = await fetch("/api/decks/seed-default", {
                method: "POST",
            });
            const data = await res.json();
            if (data.deckId) {
                await fetchDecks();
            }
        } catch {
            // ignore
        } finally {
            setSeeding(false);
        }
    };

    // Fetch decks when authenticated
    useEffect(() => {
        if (!isAuthenticated) return;
        fetchDecks();
    }, [isAuthenticated]);

    // After import modal closes, re-fetch decks
    const handleImportClose = () => {
        setImportModalOpen(false);
        if (isAuthenticated) fetchDecks();
    };

    const selectedDeck = decks.find((d) => d.id === selectedDeckId);

    return (
        <div className='min-h-dvh flex flex-col bg-background'>
            <Nav onOpenDecks={() => setDecksModalOpen(true)} />

            <main className='flex-1 flex flex-col max-w-md mx-auto w-full px-4 py-6'>
                {isLoading ? (
                    // Loading skeleton
                    <div className='flex flex-col items-center justify-center flex-1 gap-4'>
                        <div className='w-10 h-10 border-4 border-indigo-200 border-t-transparent rounded-full animate-spin' />
                    </div>
                ) : isAuthenticated ? (
                    // ─── AUTHENTICATED VIEW ─────────────────────────────────
                    <div className='flex flex-col gap-5'>
                        {decksLoading ? (
                            <div className='flex justify-center py-8'>
                                <div className='w-8 h-8 border-4 border-indigo-200 border-t-transparent rounded-full animate-spin' />
                            </div>
                        ) : decks.length === 0 ? (
                            // ── No decks yet ── featured starter + options
                            <div className='flex flex-col gap-4 pt-4'>
                                {/* Featured starter deck */}
                                <div className='rounded-2xl border-2 border-indigo-200 bg-linear-to-br from-indigo-50 to-purple-50 p-5 flex flex-col gap-3'>
                                    <div className='flex items-start justify-between gap-2'>
                                        <div>
                                            <div className='text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1'>
                                                Built-in deck
                                            </div>
                                            <h2 className='text-lg font-bold text-gray-900'>
                                                Hayeren 1
                                            </h2>
                                            <p className='text-sm text-gray-500 mt-0.5'>
                                                572 words · examples · grammar ·
                                                mnemonics
                                            </p>
                                        </div>
                                        <span className='text-3xl'>🇦🇲</span>
                                    </div>
                                    <button
                                        onClick={handleAddDefaultDeck}
                                        disabled={seeding}
                                        className='w-full py-3 rounded-xl font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-60'
                                        style={{ background: "var(--accent)" }}
                                    >
                                        {seeding
                                            ? "Adding…"
                                            : "Add to my library →"}
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className='flex items-center gap-3'>
                                    <div className='flex-1 h-px bg-gray-200' />
                                    <span className='text-xs text-gray-400 font-medium'>
                                        or
                                    </span>
                                    <div className='flex-1 h-px bg-gray-200' />
                                </div>

                                {/* Secondary options */}
                                <div className='flex flex-col gap-2'>
                                    <button
                                        onClick={() => setImportModalOpen(true)}
                                        className='w-full py-2.5 rounded-xl font-semibold border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors'
                                    >
                                        Import your own CSV
                                    </button>
                                    <button
                                        onClick={() => setDecksModalOpen(true)}
                                        className='w-full py-2.5 rounded-xl font-semibold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors'
                                    >
                                        Create an empty deck
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Deck selector */}
                                {decks.length > 1 && (
                                    <div className='flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar'>
                                        {decks.map((deck) => (
                                            <button
                                                key={deck.id}
                                                onClick={() =>
                                                    setSelectedDeckId(deck.id)
                                                }
                                                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                                                    selectedDeckId === deck.id
                                                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                                }`}
                                            >
                                                {deck.title}
                                                <span className='ml-1.5 text-xs opacity-60'>
                                                    {deck.cardCount}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Study session */}
                                {selectedDeckId && (
                                    <StudySession
                                        key={selectedDeckId}
                                        deckId={selectedDeckId}
                                        deckTitle={selectedDeck?.title}
                                    />
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    // ─── GUEST VIEW ───────────────────────────────────────────
                    <div className='flex flex-col gap-5'>
                        {/* Hero headline — compact */}
                        <div className='text-center pt-2 pb-1'>
                            <h1 className='text-2xl font-bold text-gray-900 leading-tight'>
                                Learn Armenian,{" "}
                                <span className='text-accent'>no sign-up</span>
                            </h1>
                            <p className='text-sm text-gray-500 mt-1'>
                                Try the sample deck right now ↓
                            </p>
                        </div>

                        <GuestStudySession
                            onRequestSignIn={() =>
                                signIn("google", { callbackUrl: "/" })
                            }
                        />
                    </div>
                )}
            </main>

            {/* Modals */}
            <DecksModal
                isOpen={decksModalOpen}
                onClose={() => {
                    setDecksModalOpen(false);
                    if (isAuthenticated) fetchDecks();
                }}
                onOpenImport={() => setImportModalOpen(true)}
            />
            <ImportModal isOpen={importModalOpen} onClose={handleImportClose} />
        </div>
    );
}
