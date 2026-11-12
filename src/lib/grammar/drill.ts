// Turns a scheduled grammar card into a question. A verb card (verb × tense)
// gets a random person and, optionally, a negative each time it comes up, so
// reviews test the rule rather than one memorised form.

import {
    TENSES,
    TENSE_BY_ID,
    PERSONS,
    PERSON_EN,
    conjugate,
    explain,
    normalize,
    personsFor,
    type TenseId,
} from "./conjugate";
import { FAMILY_INFO, type Verb, type VerbFamily } from "./verbs";
import { parseEnglish } from "./english";
import { TOPICS, type TopicId } from "./topics";
import { parseCardKey, topicItem } from "./cards";

export type DrillMode = "conjugate" | "translate" | "recognize";

export interface DrillSettings {
    mode: DrillMode | TopicId;
    tenses: TenseId[];
    families: VerbFamily[];
    negatives: boolean;
    typing: boolean;
}

export const isVerbMode = (m: DrillSettings["mode"]): m is DrillMode =>
    m === "conjugate" || m === "translate" || m === "recognize";

export interface Question {
    cardKey: string;
    /** shown above the prompt, e.g. the tense */
    label?: string;
    prompt: string;
    hint?: string;
    armenianPrompt?: boolean;
    answer: string;
    /** everything accepted when typing */
    accepted: string[];
    options: string[];
    /** can this be answered by typing? */
    typeable: boolean;
    explanation: string;
    note?: string;
    speak?: string;
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const NEIGHBOURS: Record<TenseId, TenseId[]> = {
    present: ["imperfect", "futPlan", "future"],
    imperfect: ["present", "pluperfect", "futPast"],
    aorist: ["perfect", "pluperfect", "imperfect"],
    perfect: ["pluperfect", "aorist", "futPlan"],
    pluperfect: ["perfect", "imperfect", "futPast"],
    futPlan: ["futPast", "future", "present"],
    futPast: ["futPlan", "condPast", "pluperfect"],
    future: ["condPast", "oblig", "futPlan"],
    condPast: ["future", "obligPast", "futPast"],
    oblig: ["obligPast", "future", "condPast"],
    obligPast: ["oblig", "condPast", "future"],
    imperative: ["aorist", "future", "oblig"],
};

/** Other forms of the same verb that look plausible but are wrong */
function verbDistractors(
    verb: Verb,
    tense: TenseId,
    person: number,
    negative: boolean,
    taken: Set<string>,
): string[] {
    const pool: string[] = [];
    for (const p of personsFor(tense))
        if (p !== person) pool.push(conjugate(verb, tense, p, negative).text);
    for (const t of TENSES)
        if (t.id !== tense && personsFor(t.id).includes(person))
            pool.push(conjugate(verb, t.id, person, negative).text);

    // Near-misses (neighbouring tenses) first
    const near = new Set(
        NEIGHBOURS[tense].flatMap((t) =>
            personsFor(t).includes(person)
                ? [conjugate(verb, t, person, negative).text]
                : [],
        ),
    );
    const ordered = [
        ...shuffle(pool.filter((x) => near.has(x))),
        ...shuffle(pool.filter((x) => !near.has(x))),
    ];
    const out: string[] = [];
    for (const f of ordered) {
        const n = normalize(f);
        if (taken.has(n)) continue;
        taken.add(n);
        out.push(f);
        if (out.length === 3) break;
    }
    return out;
}

function verbQuestion(
    cardKey: string,
    verb: Verb,
    tense: TenseId,
    mode: DrillMode,
    allowNegatives: boolean,
): Question {
    const person = pick(personsFor(tense));
    const negative = allowNegatives && Math.random() < 0.3;
    const form = conjugate(verb, tense, person, negative);
    const info = TENSE_BY_ID[tense];
    const en = parseEnglish(verb.en).base;
    const verbLabel = `${verb.inf} · to ${en}`;
    const note = verb.note;

    if (mode === "recognize") {
        // Only offer tenses whose form differs from the one shown
        const shown = normalize(form.text);
        const others = shuffle(
            TENSES.filter(
                (t) =>
                    t.id !== tense &&
                    personsFor(t.id).includes(person) &&
                    normalize(conjugate(verb, t.id, person, negative).text) !== shown,
            ),
        );
        const near = others.filter((t) => NEIGHBOURS[tense].includes(t.id));
        const rest = others.filter((t) => !NEIGHBOURS[tense].includes(t.id));
        return {
            cardKey,
            label: verbLabel,
            prompt: form.text,
            hint: "Which tense is this?",
            armenianPrompt: true,
            answer: info.name,
            accepted: [info.name],
            options: shuffle([
                info.name,
                ...[...near, ...rest].slice(0, 3).map((t) => t.name),
            ]),
            typeable: false,
            explanation: `${form.english}  ·  ${info.formula}`,
            note,
            speak: form.text,
        };
    }

    const taken = new Set([form.text, ...form.alternates].map(normalize));
    const base = {
        cardKey,
        answer: form.text,
        accepted: [form.text, ...form.alternates],
        options: shuffle([
            form.text,
            ...verbDistractors(verb, tense, person, negative, taken),
        ]),
        typeable: true,
        explanation: explain(verb, tense, negative),
        note,
        speak: form.text,
    };

    if (mode === "translate") {
        return { ...base, label: verbLabel, prompt: form.english, hint: info.name };
    }

    const who =
        tense === "imperative"
            ? person === 4
                ? "դուք · you all"
                : "դու · you"
            : `${PERSONS[person]} · ${PERSON_EN[person]}`;
    return {
        ...base,
        label: `${info.name}${negative ? " · negative" : ""}`,
        prompt: verb.inf,
        armenianPrompt: true,
        hint: `${who}  ·  to ${en}  ·  ${FAMILY_INFO[verb.family].short}`,
    };
}

export function questionForCard(
    cardKey: string,
    settings: DrillSettings,
): Question | null {
    const card = parseCardKey(cardKey);
    if (!card) return null;
    if (card.kind === "verb") {
        const mode = isVerbMode(settings.mode) ? settings.mode : "conjugate";
        return verbQuestion(cardKey, card.verb, card.tense, mode, settings.negatives);
    }
    const item = topicItem(card.itemId, card.topic);
    if (!item) return null;
    return {
        cardKey,
        label: TOPICS.find((t) => t.id === card.topic)?.name,
        prompt: item.prompt,
        hint: item.hint,
        armenianPrompt: item.armenianPrompt,
        answer: item.answer,
        accepted: [item.answer],
        options: item.options,
        typeable: !item.armenianPrompt && /[Ա-և]/.test(item.answer),
        explanation: item.explanation,
        speak: item.speak,
    };
}

export function checkTyped(answer: string, q: Question): boolean {
    const a = normalize(answer);
    return q.accepted.some((x) => normalize(x) === a);
}
