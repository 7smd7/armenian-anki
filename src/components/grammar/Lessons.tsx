"use client";

import { useState } from "react";
import {
    AUX_PAST,
    AUX_PRES,
    NEG_PAST,
    NEG_PRES,
    PERSONS,
    TENSE_BY_ID,
    conjugate,
    type TenseId,
} from "@/lib/grammar/conjugate";
import { VERBS, FAMILY_INFO, FAMILY_ORDER, AORIST_ENDINGS } from "@/lib/grammar/verbs";
import {
    CONDITIONAL_TYPES,
    PLACES,
    PRONOUNS,
    PRONOUN_COLUMNS,
    STATE_VERBS,
} from "@/lib/grammar/topics";
import type { DrillSettings } from "@/lib/grammar/drill";
import { Speak } from "./Speak";

const V = (inf: string) => VERBS.find((v) => v.inf === inf)!;
const form = (inf: string, t: TenseId, p = 0, neg = false) =>
    conjugate(V(inf), t, p, neg).text;

interface Lesson {
    id: string;
    title: string;
    summary: string;
    preset: Partial<DrillSettings>;
    body: React.ReactNode;
}

export function Lessons({
    onPractice,
}: {
    onPractice: (preset: Partial<DrillSettings>) => void;
}) {
    const [open, setOpen] = useState<string | null>("timeline");

    return (
        <div className='flex flex-col gap-3'>
            <p className='text-sm text-gray-500 px-1'>
                Short lessons, from the big picture to the details. Open one, read
                it, then press <b>Practice this</b>.
            </p>
            {LESSONS.map((l, i) => {
                const isOpen = open === l.id;
                return (
                    <section
                        key={l.id}
                        className='rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden'
                    >
                        <button
                            onClick={() => setOpen(isOpen ? null : l.id)}
                            className='w-full flex items-center gap-3 px-4 py-3 text-left'
                            aria-expanded={isOpen}
                        >
                            <span
                                className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                                    isOpen
                                        ? "bg-indigo-500 text-white"
                                        : "bg-indigo-50 text-indigo-600"
                                }`}
                            >
                                {i + 1}
                            </span>
                            <span className='flex-1 min-w-0'>
                                <span className='block font-semibold text-gray-900'>
                                    {l.title}
                                </span>
                                <span className='block text-xs text-gray-400 truncate font-armenian'>
                                    {l.summary}
                                </span>
                            </span>
                            <span
                                className={`text-gray-300 transition-transform ${
                                    isOpen ? "rotate-90" : ""
                                }`}
                            >
                                ›
                            </span>
                        </button>
                        {isOpen && (
                            <div className='px-4 pb-4 flex flex-col gap-4 text-sm text-gray-700 leading-relaxed'>
                                {l.body}
                                <button
                                    onClick={() => onPractice(l.preset)}
                                    className='self-start px-4 py-2 rounded-xl font-semibold text-white text-sm'
                                    style={{ background: "var(--accent)" }}
                                >
                                    Practice this →
                                </button>
                            </div>
                        )}
                    </section>
                );
            })}
        </div>
    );
}

// ─── Building blocks ────────────────────────────────────────────────

function Hy({ children, speak }: { children: string; speak?: boolean }) {
    return (
        <span className='inline-flex items-center gap-0.5 font-armenian font-semibold text-gray-900'>
            {children}
            {speak && <Speak text={children} className='w-6! h-6!' />}
        </span>
    );
}

function Box({
    tone = "indigo",
    children,
}: {
    tone?: "indigo" | "amber" | "green";
    children: React.ReactNode;
}) {
    const cls = {
        indigo: "bg-indigo-50 text-indigo-900",
        amber: "bg-amber-50 text-amber-900",
        green: "bg-green-50 text-green-900",
    }[tone];
    return <div className={`rounded-xl px-3 py-2.5 ${cls}`}>{children}</div>;
}

function Table({
    head,
    rows,
    armenianCols = [],
}: {
    head: string[];
    rows: (string | React.ReactNode)[][];
    armenianCols?: number[];
}) {
    return (
        <div className='overflow-x-auto -mx-1'>
            <table className='w-full text-sm border-collapse'>
                <thead>
                    <tr>
                        {head.map((h, i) => (
                            <th
                                key={i}
                                className='text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-1 pb-1.5 whitespace-nowrap'
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className='border-t border-gray-100'>
                            {r.map((c, j) => (
                                <td
                                    key={j}
                                    className={`px-1 py-1.5 align-top ${
                                        armenianCols.includes(j)
                                            ? "font-armenian text-gray-900"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {c}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── Timeline ───────────────────────────────────────────────────────

type Glyph = "dot" | "wave" | "result" | "before" | "now" | "plan" | "maybe" | "oldPlan";

const TIMELINE: { tense: TenseId; glyph: Glyph }[] = [
    { tense: "aorist", glyph: "dot" },
    { tense: "imperfect", glyph: "wave" },
    { tense: "perfect", glyph: "result" },
    { tense: "pluperfect", glyph: "before" },
    { tense: "present", glyph: "now" },
    { tense: "futPlan", glyph: "plan" },
    { tense: "future", glyph: "maybe" },
    { tense: "futPast", glyph: "oldPlan" },
];

function TimelineGlyph({ glyph }: { glyph: Glyph }) {
    const c = "#6c63ff";
    const wave = (x1: number, x2: number) => {
        let d = `M${x1} 14`;
        for (let x = x1; x < x2; x += 8) d += ` q2 -6 4 0 q2 6 4 0`;
        return <path d={d} fill='none' stroke={c} strokeWidth='2' />;
    };
    return (
        <svg viewBox='0 0 200 28' className='block w-full max-w-sm mx-auto' aria-hidden>
            <line x1='4' y1='14' x2='196' y2='14' stroke='#e2e0f0' strokeWidth='2' />
            <line x1='100' y1='3' x2='100' y2='25' stroke='#f59e0b' strokeWidth='2' />
            {glyph === "dot" && <circle cx='45' cy='14' r='5' fill={c} />}
            {glyph === "wave" && wave(24, 72)}
            {glyph === "result" && (
                <>
                    <circle cx='45' cy='14' r='5' fill={c} />
                    <line x1='50' y1='14' x2='92' y2='14' stroke={c} strokeWidth='2' strokeDasharray='0' />
                    <path d='M88 9 l6 5 -6 5' fill='none' stroke={c} strokeWidth='2' />
                </>
            )}
            {glyph === "before" && (
                <>
                    <circle cx='30' cy='14' r='5' fill={c} />
                    <line x1='35' y1='14' x2='62' y2='14' stroke={c} strokeWidth='2' />
                    <circle cx='68' cy='14' r='5' fill='white' stroke={c} strokeWidth='2' />
                </>
            )}
            {glyph === "now" && (
                <>
                    {wave(84, 116)}
                    {[40, 60, 140, 160].map((x) => (
                        <circle key={x} cx={x} cy='14' r='2.5' fill={c} opacity='0.5' />
                    ))}
                </>
            )}
            {glyph === "plan" && (
                <>
                    <line x1='100' y1='14' x2='150' y2='14' stroke={c} strokeWidth='3' />
                    <circle cx='156' cy='14' r='5' fill={c} />
                </>
            )}
            {glyph === "maybe" && (
                <>
                    <line x1='100' y1='14' x2='150' y2='14' stroke={c} strokeWidth='2' strokeDasharray='4 4' />
                    <circle cx='156' cy='14' r='5' fill='white' stroke={c} strokeWidth='2' />
                </>
            )}
            {glyph === "oldPlan" && (
                <>
                    <line x1='22' y1='14' x2='62' y2='14' stroke={c} strokeWidth='3' />
                    <circle cx='68' cy='14' r='5' fill={c} />
                    <path d='M16 6 q-6 8 0 16 M80 6 q6 8 0 16' fill='none' stroke={c} strokeWidth='1.5' />
                </>
            )}
        </svg>
    );
}

function Timeline() {
    return (
        <div className='flex flex-col gap-1'>
            <div className='w-full max-w-sm mx-auto grid grid-cols-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider'>
                <span>past</span>
                <span className='text-center text-amber-500'>now</span>
                <span className='text-right'>future</span>
            </div>
            {TIMELINE.map(({ tense, glyph }) => {
                const t = TENSE_BY_ID[tense];
                return (
                    <div key={tense} className='border-t border-gray-50 pt-1'>
                        <TimelineGlyph glyph={glyph} />
                        <div className='flex items-baseline justify-between gap-2 -mt-0.5'>
                            <span className='text-xs text-gray-500'>
                                <b className='text-gray-800'>{t.name}</b> · {t.meaning}
                            </span>
                            <Hy speak>{form("գրել", tense)}</Hy>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Lessons ────────────────────────────────────────────────────────


const LESSONS: Lesson[] = [
    {
        id: "timeline",
        title: "The big picture",
        summary: "8 tenses on one timeline, with գրել",
        preset: { mode: "recognize", tenses: ["aorist", "imperfect", "perfect", "pluperfect", "present", "futPlan", "future", "futPast"], families: ["el"], negatives: false },
        body: (
            <>
                <p>
                    Every Armenian tense answers two questions: <b>when</b> (past,
                    now, future) and <b>how</b> (a finished dot, an ongoing wave, or
                    a plan). Here is <Hy>գրել</Hy> (to write) in each one.
                </p>
                <Timeline />
                <Box>
                    <b>Dot vs wave:</b> <Hy>գրեցի</Hy> = I wrote (done, one time).{" "}
                    <Hy>գրում էի</Hy> = I was writing / used to write (in progress or
                    a habit).
                </Box>
            </>
        ),
    },
    {
        id: "helper",
        title: "The helper verb",
        summary: "եմ, ես, է… and էի, էիր, էր… set the time",
        preset: { mode: "conjugate", tenses: ["present", "imperfect"], families: ["el", "al"], negatives: true },
        body: (
            <>
                <p>
                    Half of the tenses are two words: a verb form plus the helper
                    (<Hy>լինել</Hy>, to be). The helper carries the person and the
                    time. Learn these four rows and you can build six tenses.
                </p>
                <Table
                    head={["", "now", "past", "not, now", "not, past"]}
                    armenianCols={[0, 1, 2, 3, 4]}
                    rows={PERSONS.map((p, i) => [
                        <span key='p' className='text-gray-400'>{p}</span>,
                        AUX_PRES[i],
                        AUX_PAST[i],
                        NEG_PRES[i],
                        NEG_PAST[i],
                    ])}
                />
                <Box tone='amber'>
                    <b>Negatives jump to the front:</b> <Hy>գրում եմ</Hy> →{" "}
                    <Hy>չեմ գրում</Hy>, <Hy>գրել եմ</Hy> → <Hy>չեմ գրել</Hy>.
                    <br />
                    In the 3rd person the helper is <Hy>չի</Hy> (<Hy>նա չի գրում</Hy>),
                    but plain “is not” is <Hy>չէ</Hy> (<Hy>նա ուսանող չէ</Hy>).
                </Box>
            </>
        ),
    },
    {
        id: "compound",
        title: "3 forms × 2 helpers = 6 tenses",
        summary: "գրում / գրել / գրելու + եմ or էի",
        preset: { mode: "conjugate", tenses: ["present", "imperfect", "perfect", "pluperfect", "futPlan", "futPast"], families: ["el", "al"], negatives: false },
        body: (
            <>
                <p>
                    Pick the verb form for the <b>kind</b> of action, then the helper
                    for <b>now</b> or <b>past</b>:
                </p>
                <div className='grid grid-cols-[auto_1fr_1fr] gap-px bg-gray-100 rounded-xl overflow-hidden text-center'>
                    <div className='bg-gray-50 p-2' />
                    <div className='bg-gray-50 p-2 text-xs font-semibold text-gray-500'>
                        + <span className='font-armenian'>եմ</span> (now)
                    </div>
                    <div className='bg-gray-50 p-2 text-xs font-semibold text-gray-500'>
                        + <span className='font-armenian'>էի</span> (past)
                    </div>
                    {[
                        { f: "գրում", label: "-ում · ongoing", a: "present", b: "imperfect" },
                        { f: "գրել", label: "-ել · completed", a: "perfect", b: "pluperfect" },
                        { f: "գրելու", label: "-ու · planned", a: "futPlan", b: "futPast" },
                    ].map((r) => (
                        <div key={r.f} className='contents'>
                            <div className='bg-gray-50 p-2 text-left'>
                                <div className='font-armenian font-semibold text-gray-900'>{r.f}</div>
                                <div className='text-[10px] text-gray-400 font-armenian'>{r.label}</div>
                            </div>
                            {[r.a, r.b].map((t) => (
                                <div key={t} className='bg-white p-2'>
                                    <div className='font-armenian font-semibold text-gray-900'>
                                        {form("գրել", t as TenseId)}
                                    </div>
                                    <div className='text-[11px] text-gray-500'>
                                        {TENSE_BY_ID[t as TenseId].meaning.split(" / ")[0]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <ul className='list-disc pl-5 space-y-1'>
                    <li>
                        <b>-ում</b>: drop <Hy>-ել / -ալ</Hy>, add <Hy>ում</Hy>:{" "}
                        <Hy>կարդալ</Hy> → <Hy>կարդում</Hy>. Exceptions:{" "}
                        <Hy>գալիս</Hy>, <Hy>տալիս</Hy>, <Hy>լալիս</Hy>.
                    </li>
                    <li>
                        <b>-ել</b>: the <b>past root</b> + <Hy>ել</Hy>. For <Hy>-ալ</Hy>{" "}
                        verbs it is <Hy>կարդացել</Hy>; irregulars have their own root
                        (lesson 6).
                    </li>
                    <li>
                        <b>-ու</b>: the whole infinitive + <Hy>ու</Hy>:{" "}
                        <Hy>կարդալու</Hy>, <Hy>գալու</Hy>. Never irregular.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "solo",
        title: "One-word tenses",
        summary: "գրեցի, կգրեմ, կգրեի, պիտի գրեմ",
        preset: { mode: "conjugate", tenses: ["aorist", "future", "condPast", "oblig"], families: ["el", "al"], negatives: true },
        body: (
            <>
                <p>
                    <b>Simple past</b>: a finished event. The ending set depends on
                    the verb:
                </p>
                <Table
                    head={["", "-ել: գրել", "-ալ: կարդալ", "root-change: հասկանալ"]}
                    armenianCols={[0, 1, 2, 3]}
                    rows={PERSONS.map((p, i) => [
                        <span key='p' className='text-gray-400'>{p}</span>,
                        "գր" + AORIST_ENDINGS.eci[i],
                        "կարդ" + AORIST_ENDINGS.aci[i],
                        "հասկաց" + AORIST_ENDINGS.a[i],
                    ])}
                />
                <Box tone='amber'>
                    Negative: glue <Hy>չ</Hy> on: <Hy>չգրեցի</Hy>, <Hy>չեկա</Hy>.
                </Box>
                <p>
                    <b>կ- forms</b>: <Hy>կ</Hy> + stem + personal ending. Present
                    endings give “will”, past endings give “would”.
                </p>
                <Table
                    head={["", "will: գրել", "will: կարդալ", "would: գրել", "would: կարդալ"]}
                    armenianCols={[0, 1, 2, 3, 4]}
                    rows={PERSONS.map((p, i) => [
                        <span key='p' className='text-gray-400'>{p}</span>,
                        form("գրել", "future", i),
                        form("կարդալ", "future", i),
                        form("գրել", "condPast", i),
                        form("կարդալ", "condPast", i),
                    ])}
                />
                <Box tone='amber'>
                    <b>Negative of կ- forms:</b> drop <Hy>կ</Hy>, put the negative
                    helper first, and end the verb in <Hy>-ի</Hy> (-ել verbs) or{" "}
                    <Hy>-ա</Hy> (-ալ verbs):
                    <br />
                    <Hy>կգրեմ</Hy> → <Hy>չեմ գրի</Hy> · <Hy>կկարդայի</Hy> →{" "}
                    <Hy>չէի կարդա</Hy>
                </Box>
                <p>
                    <b>Must</b>: <Hy>պիտի</Hy> or <Hy>պետք է</Hy> + the same endings,
                    without <Hy>կ</Hy>: <Hy>պիտի գրեմ</Hy> (I must write),{" "}
                    <Hy>պիտի գրեի</Hy> (I should have written). Negative:{" "}
                    <Hy>չպիտի գրեմ</Hy>.
                </p>
                <Box>
                    Before a vowel <Hy>կ</Hy> just joins: <Hy>կուտեմ</Hy>,{" "}
                    <Hy>կանեմ</Hy>, <Hy>կասեմ</Hy>.
                </Box>
            </>
        ),
    },
    {
        id: "commands",
        title: "Commands",
        summary: "գրի՛ր / գրե՛ք, մի՛ գրիր",
        preset: { mode: "conjugate", tenses: ["imperative"], families: [...FAMILY_ORDER], negatives: true },
        body: (
            <>
                <p>
                    Only <Hy>դու</Hy> and <Hy>դուք</Hy>. The mark <Hy>՛</Hy> shows
                    the stressed vowel. For “don’t”, put <Hy>մի՛</Hy> in front.
                </p>
                <Table
                    head={["group", "you", "you all", "don’t"]}
                    armenianCols={[1, 2, 3]}
                    rows={(["գրել", "կարդալ", "հասկանալ", "մոտենալ", "մտնել", "փախչել", "հիշեցնել"] as const).map((inf) => [
                        <span key='g' className='font-armenian'>{FAMILY_INFO[V(inf).family].short}</span>,
                        form(inf, "imperative", 1),
                        form(inf, "imperative", 4),
                        form(inf, "imperative", 1, true),
                    ])}
                />
                <p>Short irregular commands you hear every day:</p>
                <Table
                    head={["verb", "you", "you all"]}
                    armenianCols={[0, 1, 2]}
                    rows={["գալ", "տալ", "անել", "ասել", "դնել", "ուտել", "բերել", "տեսնել", "առնել", "թողնել", "տանել", "լինել"].map((inf) => [
                        inf,
                        form(inf, "imperative", 1),
                        form(inf, "imperative", 4),
                    ])}
                />
            </>
        ),
    },
    {
        id: "roots",
        title: "Past roots & irregular verbs",
        summary: "only 3 places can be irregular",
        preset: { mode: "conjugate", tenses: ["aorist", "perfect", "imperative"], families: ["anal", "enal", "nel", "chel", "cnel", "irregular"], negatives: false },
        body: (
            <>
                <Box tone='green'>
                    <b>The rule to remember:</b> a verb can only be irregular in the{" "}
                    <b>perfect</b>, the <b>simple past</b> and the <b>command</b>.
                    Everything else is built from the infinitive:{" "}
                    <Hy>գալու եմ</Hy>, <Hy>կգամ</Hy>, <Hy>ուտում եմ</Hy>.
                </Box>
                <p>Each verb group changes its root in the past in one predictable way:</p>
                <Table
                    head={["group", "what happens", "example"]}
                    armenianCols={[2]}
                    rows={FAMILY_ORDER.filter((f) => f !== "irregular").map((f) => [
                        <span key='f' className='font-armenian font-semibold text-gray-800'>{FAMILY_INFO[f].short}</span>,
                        <span key='r' className='font-armenian'>{FAMILY_INFO[f].rule}</span>,
                        FAMILY_INFO[f].example,
                    ])}
                />
                <p>Irregular verbs: learn three forms each.</p>
                <Table
                    head={["verb", "I have …", "I …(past)", "command"]}
                    armenianCols={[0, 1, 2, 3]}
                    rows={VERBS.filter((v) => v.family === "irregular").map((v) => [
                        <span key='v'>
                            {v.inf}
                            <span className='block text-[11px] text-gray-400 font-sans'>
                                {v.en.replace("|", " ")}
                            </span>
                        </span>,
                        conjugate(v, "perfect", 0).text,
                        conjugate(v, "aorist", 0).text,
                        conjugate(v, "imperative", 1).text,
                    ])}
                />
                <p className='text-xs text-gray-500'>
                    Colloquial short pasts you will hear: <Hy>տվի</Hy> (<Hy>տվեցի</Hy>),{" "}
                    <Hy>արի</Hy> (<Hy>արեցի</Hy>), <Hy>դրի</Hy> (<Hy>դրեցի</Hy>),{" "}
                    <Hy>ասեցի</Hy> (<Hy>ասացի</Hy>). The Conjugator tab shows every
                    form of every verb.
                </p>
            </>
        ),
    },
    {
        id: "state",
        title: "have · know · there is",
        summary: "ունեմ, գիտեմ, կա: no -ում",
        preset: { mode: "stateVerbs" },
        body: (
            <>
                <p>
                    A few “state” verbs take endings directly, with <Hy>չ</Hy> glued
                    on. For finished pasts and futures they borrow a full verb.
                </p>
                <Table
                    head={["", "present", "not", "was / had", "other tenses"]}
                    armenianCols={[1, 2, 3, 4]}
                    rows={STATE_VERBS.map((s) => [
                        <b key='e' className='text-gray-800'>{s.en}</b>,
                        s.present.slice(0, 3).join(", ") + "…",
                        s.negative,
                        s.past,
                        s.borrows,
                    ])}
                />
                <Box>
                    <Hy>գալ</Hy>, <Hy>տալ</Hy> and <Hy>լալ</Hy> use <Hy>-լիս</Hy>{" "}
                    instead of <Hy>-ում</Hy>: <Hy>գալիս եմ</Hy>, <Hy>տալիս էի</Hy>,{" "}
                    <Hy>չեմ գալիս</Hy>.
                </Box>
            </>
        ),
    },
    {
        id: "conditionals",
        title: "If-sentences",
        summary: "եթե + 4 patterns",
        preset: { mode: "conditionals" },
        body: (
            <>
                <p>
                    <Hy>եթե</Hy> = if. The if-part <b>never</b> takes <Hy>կ</Hy>; the
                    result usually does. <Hy>ապա</Hy> / <Hy>ուրեմն</Hy> (= then) can
                    start the result.
                </p>
                <div className='flex flex-col gap-2'>
                    {CONDITIONAL_TYPES.map((c, i) => (
                        <div key={c.id} className='rounded-xl border border-gray-100 p-3'>
                            <div className='font-semibold text-gray-900'>
                                {i + 1}. {c.name}{" "}
                                <span className='font-normal text-gray-400 text-xs'>· {c.when}</span>
                            </div>
                            <div className='text-xs text-gray-500 font-armenian mt-0.5'>
                                if: {c.ifPart} → {c.mainPart}
                            </div>
                            <div className='mt-1.5'>
                                <Hy speak>{c.example}</Hy>
                                <div className='text-xs text-gray-500'>{c.exampleEn}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <Box>
                    <b>Quick pick:</b> likely → 1 · not true now → 2 · didn’t happen →
                    3 · always true → 4
                </Box>
            </>
        ),
    },
    {
        id: "pronouns",
        title: "Pronouns",
        summary: "ինձ, իմ, իմը, ինքս, իմ սեփական",
        preset: { mode: "pronouns" },
        body: (
            <>
                <Table
                    head={PRONOUN_COLUMNS.map((c) => c.label)}
                    armenianCols={[0, 1, 2, 3, 4, 5]}
                    rows={PRONOUNS.subject.map((_, p) =>
                        PRONOUN_COLUMNS.map((c) => (
                            <span key={c.key}>
                                {PRONOUNS[c.key][p]}
                                <span className='block text-[10px] text-gray-400 font-sans'>
                                    {c.en[p]}
                                </span>
                            </span>
                        )),
                    )}
                />
                <Box>
                    <Hy>իմ</Hy> goes before a noun (<Hy>իմ գիրքը</Hy>, my book);{" "}
                    <Hy>իմը</Hy> stands alone (<Hy>սա իմն է</Hy>, this is mine).
                </Box>
            </>
        ),
    },
    {
        id: "places",
        title: "Place words",
        summary: "սեղանի վրա: noun + ի + place word",
        preset: { mode: "places" },
        body: (
            <>
                <p>
                    English puts “on” before the noun. Armenian puts the place word{" "}
                    <b>after</b> the noun, and the noun goes in the genitive (usually{" "}
                    <Hy>-ի</Hy>): <Hy>սեղան</Hy> → <Hy>սեղանի վրա</Hy>.
                </p>
                <Table
                    head={["English", "word", "example"]}
                    armenianCols={[1]}
                    rows={PLACES.map((p) => [
                        p.en,
                        <span key='w'>
                            {p.hy}
                            {p.alt && (
                                <span className='block text-[11px] text-gray-400'>{p.alt}</span>
                            )}
                        </span>,
                        <span key='e'>
                            <Hy speak>{p.example}</Hy>
                            <span className='block text-[11px] text-gray-400'>{p.exampleEn}</span>
                        </span>,
                    ])}
                />
            </>
        ),
    },
];

