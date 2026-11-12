"use client";

import { useMemo, useState } from "react";
import {
    TENSES,
    PERSONS,
    conjugate,
    explain,
    personsFor,
} from "@/lib/grammar/conjugate";
import { VERBS, FAMILY_INFO, FAMILY_ORDER } from "@/lib/grammar/verbs";
import { parseEnglish } from "@/lib/grammar/english";
import { Speak } from "./Speak";

export function Conjugator() {
    const [verbInf, setVerbInf] = useState("գրել");
    const [query, setQuery] = useState("");
    const [negative, setNegative] = useState(false);
    const [listOpen, setListOpen] = useState(false);

    const verb = VERBS.find((v) => v.inf === verbInf) ?? VERBS[0];

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return VERBS;
        return VERBS.filter(
            (v) =>
                v.inf.includes(q) ||
                parseEnglish(v.en).base.toLowerCase().includes(q),
        );
    }, [query]);

    return (
        <div className='flex flex-col gap-4'>
            {/* Verb picker */}
            <div className='rounded-2xl bg-white border border-gray-100 shadow-sm p-4 flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                    <div className='flex-1 min-w-0'>
                        <div className='flex items-center gap-1'>
                            <span className='font-armenian text-2xl font-bold text-gray-900'>
                                {verb.inf}
                            </span>
                            <Speak text={verb.inf} />
                        </div>
                        <div className='text-sm text-gray-500'>
                            to {parseEnglish(verb.en).base} ·{" "}
                            <span className='font-armenian'>
                                {FAMILY_INFO[verb.family].label}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setListOpen((o) => !o)}
                        className='px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                    >
                        {listOpen ? "Close" : "Change verb"}
                    </button>
                </div>

                {listOpen && (
                    <div className='flex flex-col gap-2'>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                            placeholder='Search Armenian or English…'
                            className='px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-400 outline-none text-sm font-armenian'
                        />
                        <div className='max-h-72 overflow-y-auto flex flex-col gap-3 pr-1'>
                            {FAMILY_ORDER.map((f) => {
                                const list = filtered.filter((v) => v.family === f);
                                if (!list.length) return null;
                                return (
                                    <div key={f}>
                                        <div className='text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1 font-armenian'>
                                            {FAMILY_INFO[f].label}
                                        </div>
                                        <div className='flex flex-wrap gap-1.5'>
                                            {list.map((v) => (
                                                <button
                                                    key={v.inf}
                                                    onClick={() => {
                                                        setVerbInf(v.inf);
                                                        setListOpen(false);
                                                        setQuery("");
                                                    }}
                                                    title={`to ${parseEnglish(v.en).base}`}
                                                    className={`px-2.5 py-1 rounded-full text-sm font-armenian border transition-colors ${
                                                        v.inf === verb.inf
                                                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                                            : "border-gray-200 text-gray-700 hover:border-indigo-300"
                                                    }`}
                                                >
                                                    {v.inf}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className='text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 font-armenian'>
                    {FAMILY_INFO[verb.family].rule}
                    {verb.note && (
                        <span className='block text-indigo-700 mt-0.5'>💡 {verb.note}</span>
                    )}
                </div>

                <div className='flex rounded-lg bg-gray-100 p-1 text-sm font-semibold self-start'>
                    {[false, true].map((n) => (
                        <button
                            key={String(n)}
                            onClick={() => setNegative(n)}
                            className={`px-3 py-1 rounded-md transition-colors ${
                                negative === n
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500"
                            }`}
                        >
                            {n ? "Negative" : "Positive"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tense tables */}
            <div className='grid sm:grid-cols-2 gap-3'>
                {TENSES.map((t) => (
                    <div
                        key={t.id}
                        className='rounded-2xl bg-white border border-gray-100 shadow-sm p-4'
                    >
                        <div className='flex items-baseline justify-between gap-2'>
                            <h3 className='font-semibold text-gray-900'>{t.name}</h3>
                            <span className='text-xs text-gray-400'>{t.timeline}</span>
                        </div>
                        <div className='text-xs text-gray-500 font-armenian mb-2'>
                            {explain(verb, t.id, negative)}
                        </div>
                        <table className='w-full text-sm'>
                            <tbody>
                                {personsFor(t.id).map((p) => {
                                    const f = conjugate(verb, t.id, p, negative);
                                    return (
                                        <tr key={p} className='border-t border-gray-50'>
                                            <td className='py-1 pr-2 text-gray-400 font-armenian w-14'>
                                                {PERSONS[p]}
                                            </td>
                                            <td className='py-1 font-armenian font-medium text-gray-900'>
                                                {f.text}
                                                {f.alternates.length > 0 && (
                                                    <span className='text-gray-400 font-normal text-xs'>
                                                        {" "}
                                                        / {f.alternates.join(" / ")}
                                                    </span>
                                                )}
                                            </td>
                                            <td className='py-1 text-right w-7'>
                                                <Speak text={f.text} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className='text-[11px] text-gray-400 mt-1'>
                            {conjugate(verb, t.id, personsFor(t.id)[0], negative).english}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
