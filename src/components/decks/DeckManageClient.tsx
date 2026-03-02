"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import type { DeckCard, DeckStats, CardEditForm } from "@/types/card";
import { EMPTY_FORM, cardToForm } from "@/constants/deckForm";
import { useAlert } from "@/components/modals/AlertProvider";

interface DeckManageClientProps {
    deckId: string;
    initialTitle: string;
    initialCardCount: number;
}

type SortField = "createdAt" | "easeFactor" | "lapses" | "dueAt" | "repetitions";
type SortOrder = "asc" | "desc";
type FilterOption = "all" | "mastered" | "unmastered" | "hard" | "easy" | "due";

interface Query {
    search: string;
    sort: SortField;
    order: SortOrder;
    filter: FilterOption;
    category: string;
}

function diffColor(card: DeckCard): string {
    const s = card.srsState;
    // no review data yet → new
    if (!s || s.repetitions === 0) return "bg-gray-200";
    if (s.isMastered) return "bg-green-400";
    if (s.easeFactor < 1.6) return "bg-red-400";
    if (s.easeFactor < 2.0) return "bg-orange-400";
    if (s.easeFactor < 2.3) return "bg-yellow-400";
    return "bg-blue-400";
}

function diffLabel(card: DeckCard): { text: string; color: string } {
    const s = card.srsState;
    if (!s || s.repetitions === 0) return { text: "New", color: "text-gray-500" };
    if (s.easeFactor < 1.6) return { text: "Hard", color: "text-red-500" };
    if (s.easeFactor < 2.0) return { text: "Struggling", color: "text-orange-500" };
    if (s.easeFactor < 2.3) return { text: "Learning", color: "text-yellow-600" };
    return { text: "Good", color: "text-blue-500" };
}

function isDueNow(card: DeckCard): boolean {
    if (!card.srsState || card.srsState.isMastered) return false;
    return new Date(card.srsState.dueAt) <= new Date();
}

const SORT_OPTIONS: { value: SortField; label: string }[] = [
    { value: "createdAt",   label: "Date added" },
    { value: "easeFactor",  label: "Difficulty" },
    { value: "lapses",      label: "Mistakes" },
    { value: "dueAt",       label: "Due date" },
    { value: "repetitions", label: "Reviews" },
];

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
    { value: "all",        label: "All" },
    { value: "due",        label: "Due" },
    { value: "hard",       label: "Hard" },
    { value: "easy",       label: "Easy" },
    { value: "unmastered", label: "Learning" },
    { value: "mastered",   label: "Mastered" },
];

export function DeckManageClient({
    deckId,
    initialTitle,
    initialCardCount,
}: DeckManageClientProps) {
    const [title] = useState(initialTitle);
    const [cards, setCards] = useState<DeckCard[]>([]);
    const [stats, setStats] = useState<DeckStats | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [query, setQuery] = useState<Query>({
        search: "",
        sort: "createdAt",
        order: "asc",
        filter: "all",
        category: "all",
    });
    const [categories, setCategories] = useState<string[]>([]);

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

    // Reset tracking
    const [resettingCardId, setResettingCardId] = useState<string | null>(null);
    const [resettingDeck, setResettingDeck] = useState(false);

    const { showAlert, showConfirm } = useAlert();

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const fetchCards = useCallback(
        async (p: number, q: Query, append: boolean) => {
            if (!append) setLoading(true);
            else setLoadingMore(true);
            setError(null);
            try {
                const params = new URLSearchParams({
                    page: String(p),
                    pageSize: "30",
                    sort: q.sort,
                    order: q.order,
                    filter: q.filter,
                });
                if (q.search) params.set("search", q.search);
                if (q.category !== "all") params.set("category", q.category);
                const r = await fetch(`/api/decks/${deckId}/cards?${params}`);
                const data = await r.json();
                if (!r.ok) throw new Error(data.error ?? "Failed to load cards");
                setCards((prev) => (append ? [...prev, ...data.cards] : data.cards));
                setHasMore(data.hasMore);
                setStats(data.stats);
                setCategories(Array.isArray(data.categories) ? data.categories : []);
            } catch (e: unknown) {
                setError(e instanceof Error ? e.message : String(e));
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        },
        [deckId],
    );

    // initial load
    useEffect(() => {
        fetchCards(1, query, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deckId]);

    // infinite scroll
    useEffect(() => {
        if (!hasMore || loadingMore) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const next = page + 1;
                    setPage(next);
                    fetchCards(next, query, true);
                }
            },
            { threshold: 0.1 },
        );
        const el = sentinelRef.current;
        if (el) obs.observe(el);
        return () => obs.disconnect();
    }, [hasMore, loadingMore, page, query, fetchCards]);

    // Show floating scroll-to-top button after scrolling down
    useEffect(() => {
        const onScroll = () => {
            setShowScrollTop(window.scrollY > 450);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const applyQuery = (next: Query) => {
        setQuery(next);
        setPage(1);
        fetchCards(1, next, false);
    };

    const handleSearchChange = (val: string) => {
        setQuery((q) => ({ ...q, search: val }));
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() =>
            applyQuery({ ...query, search: val }), 300,
        );
    };

    const handleFilterChange = (f: FilterOption) => applyQuery({ ...query, filter: f });
    const handleCategoryChange = (category: string) => applyQuery({ ...query, category });
    const handleSortChange = (s: SortField) => applyQuery({ ...query, sort: s });
    const toggleOrder = () => applyQuery({ ...query, order: query.order === "asc" ? "desc" : "asc" });
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
            fetchCards(1, query, false);
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
                prev.map((c) => (c.id === cardId ? { ...data.card, srsState: c.srsState } : c)),
            );
            setEditingId(null);
        } catch (e: unknown) {
            setEditError(e instanceof Error ? e.message : String(e));
        } finally {
            setEditLoading(false);
        }
    };

    // Reset single card
    const handleResetCard = async (cardId: string) => {
        if (!(await showConfirm("Reset progress for this card? All SRS data will be cleared."))) return;
        setResettingCardId(cardId);
        try {
            const r = await fetch(`/api/decks/${deckId}/cards/${cardId}/reset`, { method: "POST" });
            if (!r.ok) throw new Error((await r.json()).error ?? "Failed to reset");
            setCards((prev) =>
                prev.map((c) =>
                    c.id === cardId
                        ? { ...c, srsState: null }
                        : c,
                ),
            );
            // Refresh stats
            fetchCards(1, query, false);
        } catch (e: unknown) {
            showAlert(e instanceof Error ? e.message : String(e));
        } finally {
            setResettingCardId(null);
        }
    };

    // Reset entire deck
    const handleResetDeck = async () => {
        if (!(await showConfirm(`Reset progress for ALL cards in "${title}"? This cannot be undone.`))) return;
        setResettingDeck(true);
        try {
            const r = await fetch(`/api/decks/${deckId}/reset`, { method: "POST" });
            if (!r.ok) throw new Error((await r.json()).error ?? "Failed to reset deck");
            fetchCards(1, query, false);
        } catch (e: unknown) {
            showAlert(e instanceof Error ? e.message : String(e));
        } finally {
            setResettingDeck(false);
        }
    };

    // Delete
    const handleDelete = async (cardId: string) => {
        if (
            !(await showConfirm(
                "Delete this card? (It will be hidden, review history preserved)",
            ))
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
            setStats((s) => s ? { ...s, total: s.total - 1 } : s);
        } catch (e: unknown) {
            showAlert(e instanceof Error ? e.message : String(e));
        } finally {
            setDeletingId(null);
        }
    };

    const total = stats?.total ?? initialCardCount;

    return (
        <div className='min-h-dvh flex flex-col bg-background'>
            <Nav />
            <main className='flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-4'>
                {/* Page header */}
                <div className='flex items-center gap-3'>
                    <Link href='/' className='text-gray-400 hover:text-gray-600 transition-colors'>
                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                            <polyline points='15 18 9 12 15 6' />
                        </svg>
                    </Link>
                    <div className='flex-1 min-w-0'>
                        <h1 className='text-xl font-bold text-gray-900 truncate'>{title}</h1>
                        <p className='text-xs text-gray-500 mt-0.5'>{total} cards</p>
                    </div>
                    <Link href={`/decks/${deckId}/study`} className='px-4 py-2 rounded-xl text-sm font-semibold text-white transition-colors bg-accent'>
                        Study
                    </Link>
                    <a href={`/api/decks/${deckId}/export`} className='px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-colors'>
                        Export
                    </a>
                    <button
                        onClick={handleResetDeck}
                        disabled={resettingDeck}
                        title='Reset all tracking for this deck'
                        className='px-3 py-2 rounded-xl text-sm font-semibold text-red-500 border border-red-100 bg-white hover:bg-red-50 transition-colors disabled:opacity-50'
                    >
                        {resettingDeck ? (
                            <div className='w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin' />
                        ) : (
                            <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                                <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
                                <path d='M3 3v5h5' />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Stats bar */}
                {stats && (
                    <div className='grid grid-cols-4 gap-2'>
                        <StatChip label='Mastered' value={stats.mastered} color='bg-green-50 text-green-700 border-green-100' />
                        <StatChip label='Learning' value={stats.learning} color='bg-blue-50 text-blue-700 border-blue-100' />
                        <StatChip label='Due' value={stats.dueToday} color='bg-orange-50 text-orange-700 border-orange-100' />
                        <StatChip label='New' value={stats.notStarted} color='bg-gray-50 text-gray-600 border-gray-100' />
                    </div>
                )}

                {/* Search + Add */}
                <div className='flex gap-2'>
                    <input
                        type='search'
                        placeholder='Search cards…'
                        value={query.search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className='flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200'
                    />
                    <button
                        onClick={() => { setAddOpen(true); setAddError(null); setAddForm(EMPTY_FORM); }}
                        className='px-4 py-2.5 rounded-xl text-sm font-semibold text-white shrink-0 transition-colors bg-accent'
                    >
                        + Add
                    </button>
                </div>

                {/* Compact controls */}
                <div className='rounded-xl border border-gray-200 bg-white p-2.5'>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                        <label className='block'>
                            <span className='text-[11px] text-gray-400'>Status</span>
                            <select
                                value={query.filter}
                                onChange={(e) => handleFilterChange(e.target.value as FilterOption)}
                                className='mt-1 w-full px-2.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200'
                            >
                                {FILTER_OPTIONS.map(({ value, label }) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>

                        <label className='block'>
                            <span className='text-[11px] text-gray-400'>Category</span>
                            <select
                                value={query.category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className='mt-1 w-full px-2.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200'
                            >
                                <option value='all'>All categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </label>

                        <label className='block'>
                            <span className='text-[11px] text-gray-400'>Sort by</span>
                            <select
                                value={query.sort}
                                onChange={(e) => handleSortChange(e.target.value as SortField)}
                                className='mt-1 w-full px-2.5 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200'
                            >
                                {SORT_OPTIONS.map(({ value, label }) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>

                        <div className='flex items-end'>
                            <button
                                onClick={toggleOrder}
                                className='w-full px-2.5 py-2 text-sm rounded-lg border bg-white text-gray-600 border-gray-200 hover:border-gray-400 transition-colors'
                            >
                                {query.order === "asc" ? "↑ Asc" : "↓ Desc"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add card form */}
                {addOpen && (
                    <div className='bg-indigo-50 rounded-2xl border-2 border-indigo-200 p-4 space-y-3'>
                        <h3 className='font-semibold text-indigo-900 text-sm'>New Card</h3>
                        <form onSubmit={handleAdd} className='space-y-3'>
                            <CardFormFields form={addForm} onChange={setAddForm} />
                            {addError && <p className='text-xs text-red-600'>{addError}</p>}
                            <div className='flex gap-2 pt-1'>
                                <button type='submit' disabled={addLoading} className='flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 bg-accent'>
                                    {addLoading ? "Saving…" : "Add Card"}
                                </button>
                                <button type='button' onClick={() => setAddOpen(false)} className='flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white border border-gray-200 text-gray-600'>
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
                            {query.search || query.filter !== "all" || query.category !== "all"
                                ? "No cards match your filter."
                                : "No cards yet. Add your first card above."}
                        </p>
                    </div>
                ) : (
                    <div className='space-y-2.5'>
                        {cards.map((card) => (
                            <div key={card.id} className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
                                {editingId === card.id ? (
                                    <form onSubmit={(e) => handleEdit(e, card.id)} className='p-4 space-y-3'>
                                        <CardFormFields form={editForm} onChange={setEditForm} />
                                        {editError && <p className='text-xs text-red-600'>{editError}</p>}
                                        <div className='flex gap-2'>
                                            <button type='submit' disabled={editLoading} className='flex-1 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-60 bg-accent'>
                                                {editLoading ? "Saving…" : "Save"}
                                            </button>
                                            <button type='button' onClick={cancelEdit} className='flex-1 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700'>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className='flex gap-3 px-4 py-3'>
                                        {/* difficulty color bar */}
                                        <div className={`w-1 self-stretch rounded-full shrink-0 ${diffColor(card)}`} />

                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-start justify-between gap-2'>
                                                <div className='min-w-0'>
                                                    <div className='flex items-baseline gap-2 flex-wrap'>
                                                        <span className='font-armenian font-bold text-gray-900 text-base'>{card.armenianScript}</span>
                                                        <span className='text-gray-400 text-sm'>{card.translit}</span>
                                                    </div>
                                                </div>
                                                {card.topic && (
                                                    <span className='shrink-0 text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100'>
                                                        {card.topic}
                                                    </span>
                                                )}
                                            </div>

                                            <p className='text-gray-700 text-sm mt-0.5'>{card.englishMeaning}</p>
                                            {card.cheatPhrase && (
                                                <p className='text-amber-600 text-xs mt-1 italic'>{card.cheatPhrase}</p>
                                            )}

                                            <div className='mt-2 pt-2 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap'>
                                                <div className='flex items-center gap-3 flex-wrap min-w-0'>
                                                    {!card.srsState?.isMastered && (() => {
                                                        const { text, color } = diffLabel(card);
                                                        return <span className={`text-xs font-medium ${color}`}>{text}</span>;
                                                    })()}
                                                    {card.srsState && !card.srsState.isMastered && (
                                                        <>
                                                            <span className='text-xs text-gray-400'>×{card.srsState.repetitions} reviews</span>
                                                            {card.srsState.lapses > 0 && (
                                                                <span className='text-xs text-red-400'>{card.srsState.lapses} lapse{card.srsState.lapses > 1 ? "s" : ""}</span>
                                                            )}
                                                            {isDueNow(card) && (
                                                                <span className='text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-medium'>Due</span>
                                                            )}
                                                        </>
                                                    )}
                                                    {card.srsState?.isMastered && (
                                                        <span className='text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-medium'>✓ Mastered</span>
                                                    )}
                                                </div>

                                                <div className='flex items-center gap-1 shrink-0'>
                                                    <button onClick={() => startEdit(card)} className='p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors' title='Edit'>
                                                        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
                                                            <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
                                                            <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => handleResetCard(card.id)} disabled={resettingCardId === card.id} className='p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50' title='Reset tracking'>
                                                        {resettingCardId === card.id ? (
                                                            <div className='w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin' />
                                                        ) : (
                                                            <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                                                <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
                                                                <path d='M3 3v5h5' />
                                                            </svg>
                                                        )}
                                                    </button>
                                                    <button onClick={() => handleDelete(card.id)} disabled={deletingId === card.id} className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50' title='Delete'>
                                                        {deletingId === card.id ? (
                                                            <div className='w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin' />
                                                        ) : (
                                                            <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                                                <polyline points='3 6 5 6 21 6' />
                                                                <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
                                                                <path d='M10 11v6M14 11v6' />
                                                                <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Infinite scroll sentinel */}
                <div ref={sentinelRef} className='py-2 flex justify-center'>
                    {loadingMore && (
                        <div className='w-6 h-6 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin' />
                    )}
                </div>

            </main>

            <button
                type='button'
                onClick={scrollToTop}
                aria-label='Scroll to top'
                title='Back to top'
                className={`fixed bottom-5 right-5 z-40 h-11 w-11 rounded-full shadow-sm border border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all ${
                    showScrollTop
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                }`}
            >
                <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2.5'
                    className='mx-auto'
                >
                    <polyline points='18 15 12 9 6 15' />
                </svg>
            </button>
        </div>
    );
}

function StatChip({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className={`rounded-xl border px-3 py-2 text-center ${color}`}>
            <div className='text-lg font-bold leading-none'>{value}</div>
            <div className='text-xs mt-0.5 font-medium opacity-80'>{label}</div>
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
            {optional("Topic / Tag", "topic", "e.g. Colors")}
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
