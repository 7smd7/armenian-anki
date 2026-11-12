"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { TENSES, type TenseId } from "@/lib/grammar/conjugate";
import { FAMILY_INFO, FAMILY_ORDER, type VerbFamily } from "@/lib/grammar/verbs";
import { TOPICS } from "@/lib/grammar/topics";
import {
    checkTyped,
    isVerbMode,
    questionForCard,
    type DrillMode,
    type DrillSettings,
    type Question,
} from "@/lib/grammar/drill";
import {
    keysForFamily,
    keysForTense,
    topicCardKeys,
    verbCardKeys,
} from "@/lib/grammar/cards";
import {
    countQueue,
    learnedShare,
    pickNext,
    previewInterval,
    reviewCard,
    type Bucket,
    type SrsStates,
} from "@/lib/grammar/srs";
import {
    localStore,
    migrateGuestProgress,
    remoteStore,
    type GrammarStore,
} from "@/lib/grammar/store";
import { Speak } from "./Speak";
import { ArmenianKeypad } from "./ArmenianKeypad";

const VERB_MODES: { id: DrillMode; name: string; blurb: string }[] = [
    { id: "conjugate", name: "Conjugate", blurb: "verb + tense → form" },
    { id: "translate", name: "Translate", blurb: "English → Armenian" },
    { id: "recognize", name: "Name the tense", blurb: "form → tense" },
];

const TENSE_PRESETS: { name: string; tenses: TenseId[] }[] = [
    { name: "Everyday 4", tenses: ["present", "aorist", "perfect", "future"] },
    {
        name: "Helper tenses",
        tenses: ["present", "imperfect", "perfect", "pluperfect", "futPlan", "futPast"],
    },
    {
        name: "Solo tenses",
        tenses: ["aorist", "future", "condPast", "oblig", "obligPast", "imperative"],
    },
    { name: "All", tenses: TENSES.map((t) => t.id) },
];

const DEFAULT_SETTINGS: DrillSettings = {
    mode: "conjugate",
    tenses: ["present", "aorist", "perfect", "future"],
    families: ["el", "al", "anal"],
    negatives: false,
    typing: false,
};

const GRADES = [
    { grade: 0, label: "Again", key: "1", cls: "border-red-200 text-red-700 hover:bg-red-50" },
    { grade: 1, label: "Hard", key: "2", cls: "border-amber-200 text-amber-700 hover:bg-amber-50" },
    { grade: 2, label: "Good", key: "3", cls: "border-green-300 text-green-700 hover:bg-green-50" },
    { grade: 3, label: "Easy", key: "4", cls: "border-sky-200 text-sky-700 hover:bg-sky-50" },
];

const BUCKET_LABEL: Record<Bucket, { text: string; cls: string }> = {
    new: { text: "New", cls: "bg-sky-50 text-sky-700" },
    learning: { text: "Learning", cls: "bg-amber-50 text-amber-700" },
    learningLater: { text: "Learning", cls: "bg-amber-50 text-amber-700" },
    review: { text: "Review", cls: "bg-green-50 text-green-700" },
    ahead: { text: "Extra practice", cls: "bg-gray-100 text-gray-500" },
};

const SETTINGS_KEY = "armenian_anki_grammar_settings";

function loadSettings(): DrillSettings {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
        // ignore
    }
    return DEFAULT_SETTINGS;
}

function cardKeysFor(s: DrillSettings): string[] {
    return isVerbMode(s.mode)
        ? verbCardKeys(s.tenses, s.families)
        : topicCardKeys(s.mode);
}

interface Current {
    question: Question;
    bucket: Bucket;
    shownAt: number;
}

function drawCard(
    s: DrillSettings,
    states: SrsStates,
    avoid?: string,
): Current | null {
    const next = pickNext(cardKeysFor(s), states, new Date(), avoid);
    if (!next) return null;
    const question = questionForCard(next.key, s);
    if (!question) return null;
    return { question, bucket: next.bucket, shownAt: Date.now() };
}

// Rendered only in the browser (the Practice tab is chosen client-side), so
// reading localStorage during the first render is safe.
export function Practice({ preset }: { preset: Partial<DrillSettings> | null }) {
    const { data: session, status } = useSession();
    const signedIn = status === "authenticated";
    const store: GrammarStore = signedIn ? remoteStore : localStore;

    const [settings, setSettings] = useState<DrillSettings>(() =>
        preset ? { ...loadSettings(), ...preset } : loadSettings(),
    );
    const [states, setStates] = useState<SrsStates | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [saveError, setSaveError] = useState(false);
    const [notice, setNotice] = useState<string | null>(null);
    const [current, setCurrent] = useState<Current | null>(null);
    const [setupOpen, setSetupOpen] = useState(false);
    const [picked, setPicked] = useState<string | null>(null);
    const [typed, setTyped] = useState("");
    const [result, setResult] = useState<null | boolean>(null);
    const [keypad, setKeypad] = useState(false);
    const [tally, setTally] = useState({ right: 0, total: 0 });
    const inputRef = useRef<HTMLInputElement>(null);
    const gradeRef = useRef<HTMLButtonElement>(null);

    // Load progress once we know who is studying
    useEffect(() => {
        if (status === "loading") return;
        let cancelled = false;
        (async () => {
            try {
                if (signedIn) {
                    const merged = await migrateGuestProgress();
                    if (merged > 0)
                        setNotice(
                            `Moved ${merged} grammar card${merged === 1 ? "" : "s"} from this browser to your account.`,
                        );
                }
                const loaded = await store.load();
                if (cancelled) return;
                setStates(loaded);
                setCurrent(drawCard(settings, loaded));
            } catch (e) {
                if (!cancelled)
                    setLoadError(e instanceof Error ? e.message : "Failed to load progress");
            }
        })();
        return () => {
            cancelled = true;
        };
        // settings are read once here; later changes draw cards in update()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, signedIn]);

    // Save settings (also when a lesson preset was applied)
    useEffect(() => {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch {
            // ignore
        }
    }, [settings]);

    const resetAnswer = () => {
        setPicked(null);
        setTyped("");
        setResult(null);
    };

    const update = (patch: Partial<DrillSettings>) => {
        const s = { ...settings, ...patch };
        setSettings(s);
        if (states) setCurrent(drawCard(s, states));
        resetAnswer();
    };

    const question = current?.question ?? null;
    const typingNow = settings.typing && !!question?.typeable;
    const cardState = question && states ? states[question.cardKey] : undefined;

    const answer = (choice: string) => {
        if (!question || result !== null) return;
        const ok = typingNow ? checkTyped(choice, question) : choice === question.answer;
        setPicked(choice);
        setResult(ok);
        setTally((c) => ({ right: c.right + (ok ? 1 : 0), total: c.total + 1 }));
        setTimeout(() => gradeRef.current?.focus(), 0);
    };

    /** Save the grade, reschedule, and show the next card */
    const grade = useCallback(
        (g: number) => {
            if (!current || !states || result === null) return;
            const key = current.question.cardKey;
            const before = states[key];
            // Update immediately with the local calculation; the server's
            // answer (same algorithm) replaces it when it arrives.
            const optimistic = { ...states, [key]: reviewCard(before, g) };
            setStates(optimistic);
            setCurrent(drawCard(settings, optimistic, key));
            resetAnswer();
            setTimeout(() => inputRef.current?.focus(), 0);
            store
                .review(key, g, result, Date.now() - current.shownAt, before)
                .then((saved) => {
                    setSaveError(false);
                    setStates((s) => (s ? { ...s, [key]: saved } : s));
                })
                .catch(() => setSaveError(true));
        },
        [current, states, result, settings, store],
    );

    const reset = async () => {
        if (!confirm("Reset all grammar progress? This cannot be undone.")) return;
        await store.reset();
        setStates({});
        setCurrent(drawCard(settings, {}));
        setTally({ right: 0, total: 0 });
        resetAnswer();
    };

    // Keyboard: 1-4 picks an option; after answering 1-4 = Again…Easy, Enter = suggested
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!question) return;
            const inInput = (e.target as HTMLElement)?.tagName === "INPUT";
            const n = Number(e.key);
            if (result === null) {
                if (!typingNow && !inInput && n >= 1 && n <= question.options.length) {
                    e.preventDefault();
                    answer(question.options[n - 1]);
                }
                return;
            }
            if (n >= 1 && n <= 4 && (result || n === 1)) {
                e.preventDefault();
                grade(n - 1);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    const toggle = <T,>(list: T[], item: T) =>
        list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

    const verbMode = isVerbMode(settings.mode);
    const keys = cardKeysFor(settings);
    const counts = states ? countQueue(keys, states) : null;
    const share = (k: string[]) => (states ? learnedShare(k, states) : null);

    return (
        <div className='flex flex-col gap-4'>
            {/* ── Who is studying ── */}
            <div className='flex items-center justify-between gap-3 rounded-xl bg-white border border-gray-100 px-4 py-2.5 text-sm'>
                {status === "loading" ? (
                    <span className='text-gray-400'>Loading…</span>
                ) : signedIn ? (
                    <span className='text-gray-600'>
                        Progress is saved to your account
                        {session?.user?.name ? ` (${session.user.name})` : ""}.
                    </span>
                ) : (
                    <>
                        <span className='text-gray-600'>
                            Guest: progress is kept in this browser only.
                        </span>
                        <button
                            onClick={() => signIn("google", { callbackUrl: "/grammar#practice" })}
                            className='shrink-0 font-semibold text-indigo-600 hover:text-indigo-800'
                        >
                            Sign in to save
                        </button>
                    </>
                )}
            </div>
            {notice && (
                <div className='rounded-xl bg-green-50 text-green-800 px-4 py-2.5 text-sm'>
                    {notice}
                </div>
            )}

            {/* ── Mode picker ── */}
            <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-3 gap-2'>
                    {VERB_MODES.map((m) => (
                        <ModeButton
                            key={m.id}
                            active={settings.mode === m.id}
                            onClick={() => update({ mode: m.id })}
                            name={m.name}
                            blurb={m.blurb}
                        />
                    ))}
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                    {TOPICS.map((t) => (
                        <ModeButton
                            key={t.id}
                            active={settings.mode === t.id}
                            onClick={() => update({ mode: t.id })}
                            name={t.name}
                            blurb={t.blurb}
                            mastery={share(topicCardKeys(t.id))}
                        />
                    ))}
                </div>
            </div>

            {/* ── Verb drill setup ── */}
            {verbMode && (
                <div className='rounded-2xl bg-white border border-gray-100 shadow-sm'>
                    <button
                        onClick={() => setSetupOpen((o) => !o)}
                        className='w-full flex items-center justify-between gap-3 px-4 py-3 text-left'
                    >
                        <div className='min-w-0'>
                            <div className='text-sm font-semibold text-gray-800'>
                                {settings.tenses.length} tenses ·{" "}
                                {settings.families.length} verb groups
                                {settings.negatives ? " · with negatives" : ""}
                            </div>
                            <div className='text-xs text-gray-400 truncate'>
                                {settings.tenses
                                    .map((t) => TENSES.find((x) => x.id === t)?.name)
                                    .join(", ") || "Pick at least one tense"}
                            </div>
                        </div>
                        <span className='text-xs font-semibold text-indigo-600 shrink-0'>
                            {setupOpen ? "Done" : "Change"}
                        </span>
                    </button>

                    {setupOpen && (
                        <div className='px-4 pb-4 flex flex-col gap-4 border-t border-gray-100 pt-3'>
                            <div>
                                <SectionLabel>Tenses</SectionLabel>
                                <div className='flex flex-wrap gap-1.5 mb-2'>
                                    {TENSE_PRESETS.map((p) => (
                                        <button
                                            key={p.name}
                                            onClick={() => update({ tenses: p.tenses })}
                                            className='px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        >
                                            {p.name}
                                        </button>
                                    ))}
                                </div>
                                <div className='flex flex-wrap gap-1.5'>
                                    {TENSES.map((t) => (
                                        <Chip
                                            key={t.id}
                                            active={settings.tenses.includes(t.id)}
                                            onClick={() =>
                                                update({ tenses: toggle(settings.tenses, t.id) })
                                            }
                                            mastery={share(keysForTense(t.id))}
                                        >
                                            {t.name}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <SectionLabel>Verb groups</SectionLabel>
                                <div className='flex flex-wrap gap-1.5'>
                                    {FAMILY_ORDER.map((f) => (
                                        <Chip
                                            key={f}
                                            active={settings.families.includes(f)}
                                            onClick={() =>
                                                update({
                                                    families: toggle<VerbFamily>(settings.families, f),
                                                })
                                            }
                                            mastery={share(keysForFamily(f))}
                                        >
                                            {FAMILY_INFO[f].label}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-x-5 gap-y-2'>
                                <Toggle
                                    checked={settings.negatives}
                                    onChange={(v) => update({ negatives: v })}
                                    label='Include negatives'
                                />
                                {settings.mode !== "recognize" && (
                                    <Toggle
                                        checked={settings.typing}
                                        onChange={(v) => update({ typing: v })}
                                        label='Type answers'
                                    />
                                )}
                            </div>
                            <p className='text-xs text-gray-400'>
                                Each verb in each tense is one card, scheduled like
                                your vocabulary. The bar under a chip shows how many
                                of its cards you have learned.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {!verbMode && (
                <Toggle
                    checked={settings.typing}
                    onChange={(v) => update({ typing: v })}
                    label='Type answers (when the answer is Armenian)'
                />
            )}

            {/* ── Queue counts ── */}
            {counts && (
                <div className='grid grid-cols-3 gap-2 text-center'>
                    <Count label='Due now' value={counts.due} cls='text-green-600' />
                    <Count label='New' value={counts.new} cls='text-sky-600' />
                    <Count
                        label='Learned'
                        value={`${counts.learned}/${counts.total}`}
                        cls='text-indigo-600'
                    />
                </div>
            )}

            {saveError && (
                <div className='rounded-xl bg-red-50 text-red-700 px-4 py-2.5 text-sm'>
                    Your last answer couldn’t be saved. Check your connection; the
                    next answer will try again.
                </div>
            )}

            {/* ── Question card ── */}
            {loadError ? (
                <div className='rounded-2xl bg-red-50 text-red-700 p-6 text-sm text-center'>
                    {loadError}
                </div>
            ) : !states ? (
                <div className='flex justify-center py-10'>
                    <div className='w-8 h-8 border-4 border-indigo-200 border-t-transparent rounded-full animate-spin' />
                </div>
            ) : !question || !current ? (
                <div className='rounded-2xl bg-white border border-dashed border-gray-200 p-8 text-center text-sm text-gray-400'>
                    Pick at least one tense and one verb group.
                </div>
            ) : (
                <div className='rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col gap-4'>
                    <div className='flex items-center justify-between gap-2 text-xs'>
                        <span className='font-semibold uppercase tracking-wider text-indigo-500 truncate'>
                            {question.label}
                        </span>
                        <span className='flex items-center gap-2 shrink-0'>
                            <span
                                className={`px-2 py-0.5 rounded-full font-semibold ${BUCKET_LABEL[current.bucket].cls}`}
                            >
                                {BUCKET_LABEL[current.bucket].text}
                            </span>
                            <span className='text-gray-400 tabular-nums'>
                                {tally.right}/{tally.total}
                            </span>
                        </span>
                    </div>

                    <div className='text-center py-2'>
                        <div className='flex items-center justify-center gap-1'>
                            <div
                                className={
                                    question.armenianPrompt
                                        ? "font-armenian text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug"
                                        : "text-xl sm:text-2xl font-semibold text-gray-900 leading-snug"
                                }
                            >
                                {question.prompt}
                            </div>
                            {question.armenianPrompt && !question.prompt.includes("___") && (
                                <Speak text={question.prompt} />
                            )}
                        </div>
                        {question.hint && (
                            <div className='mt-1.5 text-sm text-gray-500 font-armenian'>
                                {question.hint}
                            </div>
                        )}
                    </div>

                    {typingNow ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (result === null && typed.trim()) answer(typed);
                            }}
                            className='flex flex-col gap-2'
                        >
                            <div className='flex gap-2'>
                                <input
                                    ref={inputRef}
                                    value={typed}
                                    onChange={(e) => setTyped(e.target.value)}
                                    readOnly={result !== null}
                                    autoFocus
                                    autoComplete='off'
                                    autoCapitalize='off'
                                    spellCheck={false}
                                    lang='hy'
                                    placeholder='Type in Armenian…'
                                    className={`flex-1 min-w-0 px-4 py-3 rounded-xl border-2 font-armenian text-lg outline-none transition-colors ${
                                        result === null
                                            ? "border-gray-200 focus:border-indigo-400"
                                            : result
                                              ? "border-green-400 bg-green-50"
                                              : "border-red-300 bg-red-50"
                                    }`}
                                />
                                {result === null && (
                                    <button
                                        type='submit'
                                        className='px-4 rounded-xl font-semibold text-white'
                                        style={{ background: "var(--accent)" }}
                                    >
                                        Check
                                    </button>
                                )}
                            </div>
                            {result === null && (
                                <div className='flex items-center justify-between text-xs'>
                                    <button
                                        type='button'
                                        onClick={() => setKeypad((k) => !k)}
                                        className='font-semibold text-indigo-600'
                                    >
                                        {keypad ? "Hide letters" : "Armenian letters"}
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => answer("")}
                                        className='text-gray-400 hover:text-gray-600'
                                    >
                                        Show answer
                                    </button>
                                </div>
                            )}
                            {keypad && result === null && (
                                <ArmenianKeypad
                                    onKey={(ch) => setTyped((t) => t + ch)}
                                    onBackspace={() => setTyped((t) => t.slice(0, -1))}
                                    onSpace={() => setTyped((t) => t + " ")}
                                />
                            )}
                        </form>
                    ) : (
                        <div
                            className={`grid gap-2 ${
                                question.options.some((o) => o.length > 22)
                                    ? "grid-cols-1"
                                    : "grid-cols-2"
                            }`}
                        >
                            {question.options.map((opt, i) => {
                                const isAnswer = opt === question.answer;
                                const isPicked = opt === picked;
                                const state =
                                    result === null
                                        ? "idle"
                                        : isAnswer
                                          ? "right"
                                          : isPicked
                                            ? "wrong"
                                            : "dim";
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => answer(opt)}
                                        disabled={result !== null}
                                        className={`relative px-3 py-3 rounded-xl border-2 text-base font-medium transition-all text-center ${
                                            /[Ա-և]/.test(opt) ? "font-armenian" : ""
                                        } ${
                                            state === "idle"
                                                ? "border-gray-200 bg-white text-gray-800 hover:border-indigo-300 hover:bg-indigo-50 active:scale-[0.98]"
                                                : state === "right"
                                                  ? "border-green-400 bg-green-50 text-green-800"
                                                  : state === "wrong"
                                                    ? "border-red-300 bg-red-50 text-red-700"
                                                    : "border-gray-100 bg-white text-gray-300"
                                        }`}
                                    >
                                        <span className='hidden sm:inline absolute left-2 top-1.5 text-[10px] text-gray-300 font-sans'>
                                            {i + 1}
                                        </span>
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* ── Feedback ── */}
                    {result !== null && (
                        <div
                            className={`rounded-xl p-4 flex flex-col gap-2 ${
                                result ? "bg-green-50" : "bg-amber-50"
                            }`}
                        >
                            <div className='flex items-center gap-2'>
                                <span
                                    className={`text-sm font-bold ${
                                        result ? "text-green-700" : "text-amber-700"
                                    }`}
                                >
                                    {result ? "Correct!" : "Answer:"}
                                </span>
                                <span
                                    className={`text-lg font-semibold text-gray-900 ${
                                        /[Ա-և]/.test(question.answer) ? "font-armenian" : ""
                                    }`}
                                >
                                    {question.answer}
                                </span>
                                {question.speak && <Speak text={question.speak} />}
                            </div>
                            <div className='text-sm text-gray-600 font-armenian leading-relaxed'>
                                {question.explanation}
                            </div>
                            {question.note && (
                                <div className='text-sm text-indigo-700 font-armenian'>
                                    💡 {question.note}
                                </div>
                            )}
                            {question.accepted.length > 1 && (
                                <div className='text-xs text-gray-500 font-armenian'>
                                    Also correct: {question.accepted.slice(1).join(" · ")}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Grading (Anki-style) ── */}
                    {result === false && (
                        <button
                            ref={gradeRef}
                            onClick={() => grade(0)}
                            className='w-full py-3 rounded-xl font-semibold text-white transition-all active:scale-[0.98]'
                            style={{ background: "var(--accent)" }}
                        >
                            Next →{" "}
                            <span className='font-normal opacity-80 text-sm'>
                                (again in {previewInterval(cardState, 0)})
                            </span>
                        </button>
                    )}
                    {result === true && (
                        <div className='flex flex-col gap-1.5'>
                            <div className='text-xs text-gray-400 text-center'>
                                How hard was it?
                            </div>
                            <div className='grid grid-cols-4 gap-2'>
                                {GRADES.map((g) => (
                                    <button
                                        key={g.grade}
                                        ref={g.grade === 2 ? gradeRef : undefined}
                                        onClick={() => grade(g.grade)}
                                        className={`flex flex-col items-center py-2 rounded-xl border-2 bg-white font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 ${g.cls}`}
                                    >
                                        {g.label}
                                        <span className='text-[11px] font-normal opacity-70'>
                                            {previewInterval(cardState, g.grade)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <button
                onClick={reset}
                className='self-center text-xs text-gray-400 hover:text-gray-600'
            >
                Reset grammar progress
            </button>
        </div>
    );
}

function Count({
    label,
    value,
    cls,
}: {
    label: string;
    value: number | string;
    cls: string;
}) {
    return (
        <div className='rounded-xl bg-white border border-gray-100 py-2'>
            <div className={`text-lg font-bold tabular-nums ${cls}`}>{value}</div>
            <div className='text-[11px] text-gray-400 uppercase tracking-wider'>
                {label}
            </div>
        </div>
    );
}

function ModeButton({
    active,
    onClick,
    name,
    blurb,
    mastery,
}: {
    active: boolean;
    onClick: () => void;
    name: string;
    blurb: string;
    mastery?: number | null;
}) {
    return (
        <button
            onClick={onClick}
            className={`relative overflow-hidden text-left px-3 py-2.5 rounded-xl border-2 transition-all ${
                active
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
            }`}
        >
            <div
                className={`text-sm font-semibold ${
                    active ? "text-indigo-700" : "text-gray-800"
                }`}
            >
                {name}
            </div>
            <div className='text-[11px] text-gray-400 leading-tight mt-0.5 font-armenian'>
                {blurb}
            </div>
            {mastery != null && <MasteryBar value={mastery} />}
        </button>
    );
}

function Chip({
    active,
    onClick,
    children,
    mastery,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    mastery: number | null;
}) {
    return (
        <button
            onClick={onClick}
            className={`relative overflow-hidden px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                active
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
            }`}
        >
            {children}
            {mastery != null && <MasteryBar value={mastery} />}
        </button>
    );
}

function MasteryBar({ value }: { value: number }) {
    return (
        <span className='absolute left-0 bottom-0 h-[3px] w-full bg-gray-100'>
            <span
                className='block h-full bg-green-400'
                style={{ width: `${Math.max(4, value * 100)}%` }}
            />
        </span>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5'>
            {children}
        </div>
    );
}

function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
}) {
    return (
        <label className='inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none'>
            <span
                className={`relative w-9 h-5 rounded-full transition-colors ${
                    checked ? "bg-indigo-500" : "bg-gray-200"
                }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        checked ? "translate-x-4" : ""
                    }`}
                />
            </span>
            <input
                type='checkbox'
                className='sr-only'
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            {label}
        </label>
    );
}
