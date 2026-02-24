"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Modal } from "./Modal";
import type { Deck } from "@/types/deck";

interface DecksModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenImport: () => void;
}

export function DecksModal({ isOpen, onClose, onOpenImport }: DecksModalProps) {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [createError, setCreateError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [renaming, setRenaming] = useState<string | null>(null);
    const [renameTitle, setRenameTitle] = useState("");
    const [seeding, setSeeding] = useState(false);

    const hasStarterDeck = decks.some((d) => d.slug === "hayeren-1");

    const handleSeedDefault = async () => {
        setSeeding(true);
        try {
            await fetch("/api/decks/seed-default", { method: "POST" });
            await fetchDecks();
        } catch {
            // ignore
        } finally {
            setSeeding(false);
        }
    };

    const fetchDecks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const r = await fetch("/api/decks");
            const data = await r.json();
            if (!r.ok) throw new Error(data.error ?? "Failed to fetch decks");
            setDecks(data.decks);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) fetchDecks();
    }, [isOpen, fetchDecks]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        setCreating(true);
        setCreateError(null);
        try {
            const r = await fetch("/api/decks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle.trim() }),
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data.error ?? "Failed to create deck");
            setNewTitle("");
            await fetchDecks();
        } catch (e: unknown) {
            setCreateError(e instanceof Error ? e.message : String(e));
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (deckId: string, title: string) => {
        if (
            !window.confirm(
                `Delete "${title}" and all its cards? This cannot be undone.`,
            )
        )
            return;
        setDeletingId(deckId);
        try {
            const r = await fetch(`/api/decks/${deckId}`, { method: "DELETE" });
            if (!r.ok)
                throw new Error((await r.json()).error ?? "Failed to delete");
            setDecks((prev) => prev.filter((d) => d.id !== deckId));
        } catch (e: unknown) {
            alert(e instanceof Error ? e.message : String(e));
        } finally {
            setDeletingId(null);
        }
    };

    const handleRename = async (deckId: string) => {
        if (!renameTitle.trim()) {
            setRenaming(null);
            return;
        }
        try {
            const r = await fetch(`/api/decks/${deckId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: renameTitle.trim() }),
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data.error ?? "Failed to rename");
            setDecks((prev) =>
                prev.map((d) =>
                    d.id === deckId
                        ? { ...d, title: data.deck.title, slug: data.deck.slug }
                        : d,
                ),
            );
            setRenaming(null);
        } catch (e: unknown) {
            alert(e instanceof Error ? e.message : String(e));
        }
    };

    const startRename = (deck: Deck) => {
        setRenaming(deck.id);
        setRenameTitle(deck.title);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='My Decks'>
            <div className='px-5 py-4 space-y-5'>
                {/* Create new deck */}
                <form onSubmit={handleCreate} className='space-y-2'>
                    <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                        New Deck
                    </label>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder='e.g., Armenian Beginner'
                            className='flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50'
                            maxLength={80}
                        />
                        <button
                            type='submit'
                            disabled={creating || !newTitle.trim()}
                            className='px-4 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shrink-0'
                        >
                            {creating ? "…" : "Create"}
                        </button>
                    </div>
                    {createError && (
                        <p className='text-xs text-red-500'>{createError}</p>
                    )}
                </form>

                {/* Import button */}
                <button
                    onClick={() => {
                        onClose();
                        onOpenImport();
                    }}
                    className='w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl border-2 border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all'
                >
                    <svg
                        width='16'
                        height='16'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2.5'
                        viewBox='0 0 24 24'
                    >
                        <path d='M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4' />
                        <polyline points='17 8 12 3 7 8' />
                        <line x1='12' y1='3' x2='12' y2='15' />
                    </svg>
                    Import from CSV
                </button>

                <div className='border-t border-gray-100' />

                {/* Starter deck offer — only shown if user doesn't already have it */}
                {!loading && !hasStarterDeck && (
                    <div className='flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100'>
                        <div className='min-w-0'>
                            <p className='text-sm font-semibold text-indigo-800'>
                                Hayeren 1
                            </p>
                            <p className='text-xs text-indigo-500'>
                                572 words · built-in starter deck
                            </p>
                        </div>
                        <button
                            onClick={handleSeedDefault}
                            disabled={seeding}
                            className='shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors'
                        >
                            {seeding ? "Adding…" : "Add"}
                        </button>
                    </div>
                )}

                {/* Deck list */}
                {loading ? (
                    <div className='space-y-3'>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className='h-20 bg-gray-100 rounded-xl animate-pulse'
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className='text-center py-6'>
                        <p className='text-red-500 text-sm mb-3'>{error}</p>
                        <button
                            onClick={fetchDecks}
                            className='text-sm text-indigo-600 underline'
                        >
                            Try again
                        </button>
                    </div>
                ) : decks.length === 0 ? (
                    <div className='text-center py-8 text-gray-500'>
                        <div className='text-4xl mb-2'>📚</div>
                        <p className='text-sm'>
                            No decks yet. Create one or import a CSV above.
                        </p>
                    </div>
                ) : (
                    <div className='space-y-3 pb-2'>
                        {decks.map((deck) => (
                            <div
                                key={deck.id}
                                className='bg-gray-50 rounded-xl border border-gray-100 overflow-hidden'
                            >
                                <div className='flex items-start justify-between px-4 py-3 gap-3'>
                                    <div className='flex-1 min-w-0'>
                                        {renaming === deck.id ? (
                                            <div className='flex gap-2'>
                                                <input
                                                    autoFocus
                                                    value={renameTitle}
                                                    onChange={(e) =>
                                                        setRenameTitle(
                                                            e.target.value,
                                                        )
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter")
                                                            handleRename(
                                                                deck.id,
                                                            );
                                                        if (e.key === "Escape")
                                                            setRenaming(null);
                                                    }}
                                                    placeholder='New deck name'
                                                    className='flex-1 text-sm px-2 py-1 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200'
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleRename(deck.id)
                                                    }
                                                    className='text-xs px-2 py-1 bg-indigo-600 text-white rounded-lg'
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setRenaming(null)
                                                    }
                                                    className='text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-lg'
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='flex items-center gap-2'>
                                                <h3 className='font-semibold text-gray-800 truncate'>
                                                    {deck.title}
                                                </h3>
                                                <button
                                                    onClick={() =>
                                                        startRename(deck)
                                                    }
                                                    className='text-gray-400 hover:text-gray-600 shrink-0'
                                                    title='Rename'
                                                >
                                                    <svg
                                                        width='13'
                                                        height='13'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='2.5'
                                                    >
                                                        <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
                                                        <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                        <p className='text-xs text-gray-500 mt-0.5'>
                                            {deck.cardCount} cards
                                        </p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDelete(deck.id, deck.title)
                                        }
                                        disabled={deletingId === deck.id}
                                        className='text-gray-400 hover:text-red-500 transition-colors shrink-0 p-1'
                                        title='Delete deck'
                                    >
                                        {deletingId === deck.id ? (
                                            <div className='w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin' />
                                        ) : (
                                            <svg
                                                width='15'
                                                height='15'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeWidth='2'
                                            >
                                                <polyline points='3 6 5 6 21 6' />
                                                <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
                                                <path d='M10 11v6M14 11v6' />
                                                <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <div className='flex border-t border-gray-100'>
                                    <Link
                                        href={`/decks/${deck.id}/study`}
                                        onClick={onClose}
                                        className='flex-1 text-center py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors'
                                    >
                                        Study
                                    </Link>
                                    <div className='w-px bg-gray-100' />
                                    <Link
                                        href={`/decks/${deck.id}`}
                                        onClick={onClose}
                                        className='flex-1 text-center py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors'
                                    >
                                        Manage
                                    </Link>
                                    <div className='w-px bg-gray-100' />
                                    <a
                                        href={`/api/decks/${deck.id}/export`}
                                        className='flex-1 text-center py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors'
                                    >
                                        Export
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
}
