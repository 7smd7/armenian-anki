"use client";

import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import type { Deck } from "@/types/deck";

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: "new_deck" | "update_deck";
    initialDeckId?: string;
}

export function ImportModal({
    isOpen,
    onClose,
    initialMode,
    initialDeckId,
}: ImportModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [mode, setMode] = useState<"new_deck" | "update_deck">(
        initialMode ?? "new_deck",
    );
    const [deckTitle, setDeckTitle] = useState("");
    const [deckId, setDeckId] = useState(initialDeckId ?? "");
    const [decks, setDecks] = useState<Deck[]>([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);

    // Fetch available decks for update mode
    useEffect(() => {
        if (isOpen && mode === "update_deck") {
            fetch("/api/decks")
                .then((r) => r.json())
                .then((d) => {
                    setDecks(d.decks ?? []);
                })
                .catch(() => {});
        }
    }, [isOpen, mode]);

    const reset = () => {
        setFile(null);
        setDeckTitle("");
        setDeckId(initialDeckId ?? "");
        setResult(null);
        setError(null);
        setLoading(false);
        setMode(initialMode ?? "new_deck");
    };

    const handleClose = () => {
        if (result?.success) {
            // Refresh page on success
            window.location.reload();
        }
        reset();
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a CSV file");
            return;
        }
        if (mode === "new_deck" && !deckTitle.trim()) {
            setError("Enter a deck title");
            return;
        }
        if (mode === "update_deck" && !deckId) {
            setError("Select a deck to update");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("mode", mode);
            if (mode === "new_deck")
                formData.append("deckTitle", deckTitle.trim());
            else formData.append("deckId", deckId);

            const r = await fetch("/api/decks/import", {
                method: "POST",
                body: formData,
            });
            const data = await r.json();
            if (!r.ok) throw new Error(data.error ?? "Import failed");
            setResult(data);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setLoading(false);
        }
    };

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files[0];
        if (f?.name.endsWith(".csv")) setFile(f);
        else setError("Please drop a .csv file");
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title='Import CSV'>
            <div className='px-5 py-4'>
                {result?.success ? (
                    // Success state
                    <div className='py-6 text-center space-y-3'>
                        <div className='text-5xl'>✅</div>
                        <h3 className='font-semibold text-green-800 text-lg'>
                            Import successful!
                        </h3>
                        <div className='text-sm text-gray-600 space-y-1'>
                            <p>
                                <strong>
                                    {result.importJob?.rowsInserted ?? 0}
                                </strong>{" "}
                                new cards added
                            </p>
                            {result.importJob?.rowsUpdated > 0 && (
                                <p>
                                    <strong>
                                        {result.importJob.rowsUpdated}
                                    </strong>{" "}
                                    updated
                                </p>
                            )}
                            {result.importJob?.rowsSkipped > 0 && (
                                <p className='text-amber-600'>
                                    <strong>
                                        {result.importJob.rowsSkipped}
                                    </strong>{" "}
                                    skipped
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleClose}
                            className='mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold'
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {/* Mode toggle */}
                        <div className='flex gap-2'>
                            {(["new_deck", "update_deck"] as const).map((m) => (
                                <button
                                    key={m}
                                    type='button'
                                    onClick={() => {
                                        setMode(m);
                                        setError(null);
                                    }}
                                    className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${mode === m ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}
                                >
                                    {m === "new_deck"
                                        ? "New Deck"
                                        : "Update Existing"}
                                </button>
                            ))}
                        </div>

                        {mode === "new_deck" ? (
                            <div>
                                <label
                                    htmlFor='deck-title'
                                    className='text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1'
                                >
                                    Deck Title
                                </label>
                                <input
                                    id='deck-title'
                                    type='text'
                                    value={deckTitle}
                                    onChange={(e) =>
                                        setDeckTitle(e.target.value)
                                    }
                                    placeholder='e.g., Armenian Intermediate'
                                    className='w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50'
                                    maxLength={80}
                                />
                            </div>
                        ) : (
                            <div>
                                <label
                                    htmlFor='update-deck'
                                    className='text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1'
                                >
                                    Update Deck
                                </label>
                                <select
                                    id='update-deck'
                                    value={deckId}
                                    onChange={(e) => setDeckId(e.target.value)}
                                    className='w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50 appearance-none'
                                >
                                    <option value=''>Select a deck…</option>
                                    {decks.map((d) => (
                                        <option key={d.id} value={d.id}>
                                            {d.title} ({d.cardCount} cards)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* File drop zone */}
                        <div>
                            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1'>
                                CSV File
                            </label>
                            <div
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragging(true);
                                }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleFileDrop}
                                className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all ${dragging ? "border-indigo-400 bg-indigo-50" : file ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-gray-300 bg-gray-50"}`}
                            >
                                <input
                                    type='file'
                                    accept='.csv'
                                    title='Upload CSV file'
                                    className='absolute inset-0 opacity-0 cursor-pointer'
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) {
                                            setFile(f);
                                            setError(null);
                                        }
                                    }}
                                />
                                {file ? (
                                    <div className='text-green-700'>
                                        <div className='text-2xl mb-1'>📄</div>
                                        <p className='font-semibold text-sm'>
                                            {file.name}
                                        </p>
                                        <p className='text-xs text-green-600 mt-1'>
                                            {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                ) : (
                                    <div className='text-gray-500'>
                                        <div className='text-3xl mb-2'>⬆️</div>
                                        <p className='text-sm font-medium'>
                                            Drop CSV here or tap to browse
                                        </p>
                                        <p className='text-xs text-gray-400 mt-1'>
                                            UTF-8 encoded, 8-column format
                                        </p>
                                    </div>
                                )}
                            </div>

                            <a
                                href='/samples/vocab-import-sample.csv'
                                download
                                className='block text-center text-xs text-indigo-500 mt-2 hover:underline'
                            >
                                Download sample CSV format →
                            </a>
                        </div>

                        {error && (
                            <div className='px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700'>
                                {error}
                            </div>
                        )}

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-60 bg-accent'
                        >
                            {loading ? (
                                <span className='flex items-center justify-center gap-2'>
                                    <span className='w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin' />
                                    Importing…
                                </span>
                            ) : (
                                "Import CSV"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
}
