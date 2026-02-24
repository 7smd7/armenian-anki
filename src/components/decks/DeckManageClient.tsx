"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import type { DeckCard, CardEditForm } from "@/types/card";
import { EMPTY_FORM, cardToForm } from "@/constants/deckForm";

interface DeckManageClientProps {
    deckId: string;
    initialTitle: string;
    initialCardCount: number;
}

export function DeckManageClient({
    deckId,
    initialTitle,
    initialCardCount,
}: DeckManageClientProps) {
    const [title] = useState(initialTitle);
    const [cards, setCards] = useState<DeckCard[]>([]);
    const [total, setTotal] = useState(initialCardCount);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Add card form — open by default when deck has no cards yet
    const [addOpen, setAddOpen] = useState(initialCardCount === 0);
    const [addForm, setAddForm] = useState<CardEditForm>(EMPTY_FORM);
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState<string | null>(null);

    // Edit card state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<CardEditForm>(EMPTY_FORM);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    // Delete
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const fetchCards = useCallback(
        async (p = page, s = search) => {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams({
                    page: String(p),
                    pageSize: "20",
                });
                if (s) params.set("search", s);
                const r = await fetch(`/api/decks/${deckId}/cards?${params}`);
                const data = await r.json();
                if (!r.ok)
                    throw new Error(data.error ?? "Failed to load cards");
                setCards(data.cards);
                setTotal(data.total);
                setTotalPages(data.totalPages);
            } catch (e: unknown) {
                setError(e instanceof Error ? e.message : String(e));
            } finally {
                setLoading(false);
            }
        },
        [deckId, page, search],
    );

    useEffect(() => {
        fetchCards(1, search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deckId]); // intentional: run only on mount / deckId change

    const handleSearchChange = (val: string) => {
        setSearch(val);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            setPage(1);
            fetchCards(1, val);
        }, 300);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        fetchCards(newPage, search);
    };

    // Add card
    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddLoading(true);
        setAddError(null);
        try {
            const r = await fetch(`/api/decks/${deckId}/cards`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addForm),
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data.error ?? "Failed to add card");
            setAddForm(EMPTY_FORM);
            setAddOpen(false);
            fetchCards(1, search);
        } catch (e: unknown) {
            setAddError(e instanceof Error ? e.message : String(e));
        } finally {
            setAddLoading(false);
        }
    };

    // Edit card
    const startEdit = (card: DeckCard) => {
        setEditingId(card.id);
        setEditForm(cardToForm(card));
        setEditError(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditError(null);
    };

    const handleEdit = async (e: React.FormEvent, cardId: string) => {
        e.preventDefault();
        setEditLoading(true);
        setEditError(null);
        try {
            const r = await fetch(`/api/decks/${deckId}/cards/${cardId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data.error ?? "Failed to update card");
            setCards((prev) =>
                prev.map((c) => (c.id === cardId ? data.card : c)),
            );
            setEditingId(null);
        } catch (e: unknown) {
            setEditError(e instanceof Error ? e.message : String(e));
        } finally {
            setEditLoading(false);
        }
    };

    // Delete
    const handleDelete = async (cardId: string) => {
        if (
            !window.confirm(
                "Delete this card? (It will be hidden, review history preserved)",
            )
        )
            return;
        setDeletingId(cardId);
        try {
            const r = await fetch(`/api/decks/${deckId}/cards/${cardId}`, {
                method: "DELETE",
            });
            if (!r.ok)
                throw new Error((await r.json()).error ?? "Failed to delete");
            setCards((prev) => prev.filter((c) => c.id !== cardId));
            setTotal((t) => t - 1);
        } catch (e: unknown) {
            alert(e instanceof Error ? e.message : String(e));
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className='min-h-dvh flex flex-col bg-background'>
            <Nav />
            <main className='flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-5'>
                {/* Page header */}
                <div className='flex items-center gap-3'>
                    <Link
                        href='/'
                        className='text-gray-400 hover:text-gray-600 transition-colors'
                    >
                        <svg
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2.5'
                        >
                            <polyline points='15 18 9 12 15 6' />
                        </svg>
                    </Link>
                    <div className='flex-1 min-w-0'>
                        <h1 className='text-xl font-bold text-gray-900 truncate'>
                            {title}
                        </h1>
                        <p className='text-xs text-gray-500 mt-0.5'>
                            {total} cards
                        </p>
                    </div>
                    <Link
                        href={`/decks/${deckId}/study`}
                        className='px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors bg-accent'
                    >
                        Study
                    </Link>
                    <a
                        href={`/api/decks/${deckId}/export`}
                        className='px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-colors'
                    >
                        Export
                    </a>
                </div>

                {/* Search + Add */}
                <div className='flex gap-2'>
                    <input
                        type='search'
                        placeholder='Search cards…'
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className='flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200'
                    />
                    <button
                        onClick={() => {
                            setAddOpen(true);
                            setAddError(null);
                            setAddForm(EMPTY_FORM);
                        }}
                        className='px-4 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 transition-colors bg-accent'
                    >
                        + Add
                    </button>
                </div>

                {/* Add card form */}
                {addOpen && (
                    <div className='bg-indigo-50 rounded-2xl border-2 border-indigo-200 p-4 space-y-3'>
                        <h3 className='font-semibold text-indigo-900 text-sm'>
                            New Card
                        </h3>
                        <form onSubmit={handleAdd} className='space-y-3'>
                            <CardFormFields
                                form={addForm}
                                onChange={setAddForm}
                            />
                            {addError && (
                                <p className='text-xs text-red-600'>
                                    {addError}
                                </p>
                            )}
                            <div className='flex gap-2 pt-1'>
                                <button
                                    type='submit'
                                    disabled={addLoading}
                                    className='flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 bg-accent'
                                >
                                    {addLoading ? "Saving…" : "Add Card"}
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setAddOpen(false)}
                                    className='flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-600'
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Card list */}
                {loading ? (
                    <div className='space-y-3'>
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className='h-16 bg-gray-100 rounded-xl animate-pulse'
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className='text-center py-8 text-red-500'>{error}</div>
                ) : cards.length === 0 ? (
                    <div className='text-center py-12 text-gray-500'>
                        <p className='text-sm'>
                            {search
                                ? "No cards match your search."
                                : "No cards yet. Add your first card above."}
                        </p>
                    </div>
                ) : (
                    <div className='space-y-2.5'>
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'
                            >
                                {editingId === card.id ? (
                                    <form
                                        onSubmit={(e) => handleEdit(e, card.id)}
                                        className='p-4 space-y-3'
                                    >
                                        <CardFormFields
                                            form={editForm}
                                            onChange={setEditForm}
                                        />
                                        {editError && (
                                            <p className='text-xs text-red-600'>
                                                {editError}
                                            </p>
                                        )}
                                        <div className='flex gap-2'>
                                            <button
                                                type='submit'
                                                disabled={editLoading}
                                                className='flex-1 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-60 bg-accent'
                                            >
                                                {editLoading
                                                    ? "Saving…"
                                                    : "Save"}
                                            </button>
                                            <button
                                                type='button'
                                                onClick={cancelEdit}
                                                className='flex-1 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700'
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className='flex items-start gap-3 px-4 py-3'>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-baseline gap-2 flex-wrap'>
                                                <span className='font-armenian font-bold text-gray-900 text-base'>
                                                    {card.armenianScript}
                                                </span>
                                                <span className='text-gray-400 text-sm'>
                                                    {card.translit}
                                                </span>
                                                {card.topic && (
                                                    <span className='text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100'>
                                                        {card.topic}
                                                    </span>
                                                )}
                                            </div>
                                            <p className='text-gray-700 text-sm mt-0.5'>
                                                {card.englishMeaning}
                                            </p>
                                            {card.cheatPhrase && (
                                                <p className='text-amber-600 text-xs mt-1 italic'>
                                                    {card.cheatPhrase}
                                                </p>
                                            )}
                                        </div>
                                        <div className='flex items-center gap-1 shrink-0'>
                                            <button
                                                onClick={() => startEdit(card)}
                                                className='p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors'
                                                title='Edit'
                                            >
                                                <svg
                                                    width='15'
                                                    height='15'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    strokeWidth='2.5'
                                                >
                                                    <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
                                                    <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(card.id)
                                                }
                                                disabled={
                                                    deletingId === card.id
                                                }
                                                className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50'
                                                title='Delete'
                                            >
                                                {deletingId === card.id ? (
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
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className='flex items-center justify-center gap-3 pt-2'>
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                            className='px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-50 hover:bg-gray-50'
                        >
                            ← Prev
                        </button>
                        <span className='text-sm text-gray-600'>
                            {page} / {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages}
                            className='px-3 py-1.5 rounded-lg text-sm border border-gray-200 disabled:opacity-50 hover:bg-gray-50'
                        >
                            Next →
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

// Shared form fields for add and edit
function CardFormFields({
    form,
    onChange,
}: {
    form: CardEditForm;
    onChange: (f: CardEditForm) => void;
}) {
    const set = (key: keyof CardEditForm, val: string) =>
        onChange({ ...form, [key]: val });

    const required = (
        label: string,
        key: keyof CardEditForm,
        placeholder?: string,
    ) => (
        <div>
            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1'>
                {label} *
            </label>
            <input
                type='text'
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                required
                className='w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white font-armenian'
            />
        </div>
    );

    const optional = (
        label: string,
        key: keyof CardEditForm,
        placeholder?: string,
    ) => (
        <div>
            <label className='text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1'>
                {label}
            </label>
            <input
                type='text'
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                className='w-full px-3 py-2 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-200 bg-gray-50'
            />
        </div>
    );

    return (
        <>
            <div className='grid grid-cols-2 gap-3'>
                {required("Armenian Script", "armenianScript", "e.g. Մեծ")}
                {required("Transliteration", "translit", "e.g. mets")}
            </div>
            {required("English Meaning", "englishMeaning", "e.g. Big")}
            <div className='grid grid-cols-2 gap-3'>
                {optional("Topic / Tag", "topic", "e.g. Colors")}
                {optional("Difficulty (1–5)", "difficultyBase", "e.g. 3")}
            </div>
            {optional("Mnemonic", "cheatPhrase", "Memory trick…")}
            {optional(
                "Example sentence",
                "exampleSentence",
                "Armenian example sentence",
            )}
            {optional(
                "Example translation",
                "exampleTranslation",
                "English translation",
            )}
            {optional("Grammar note", "grammar", "Grammar explanation")}
        </>
    );
}
