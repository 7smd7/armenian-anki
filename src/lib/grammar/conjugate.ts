// Rule-based Eastern Armenian conjugation.
//
// Every form is built from four pieces:
//   • the present stem (infinitive minus -ել/-ալ)   → -ում participle, կ- forms, պիտի forms
//   • the infinitive                                 → -ու future participle
//   • the past root (family rule or override)        → perfect, simple past, imperative
//   • the helper verb լինել (եմ… / էի…)               → compound tenses

import {
    AORIST_ENDINGS,
    type AoristSet,
    type Verb,
} from "./verbs";
import { englishGloss, parseEnglish, type TenseId } from "./english";

export type { TenseId } from "./english";

export const PERSONS = ["ես", "դու", "նա", "մենք", "դուք", "նրանք"];
export const PERSON_EN = ["I", "you", "he/she", "we", "you (pl.)", "they"];

export const AUX_PRES = ["եմ", "ես", "է", "ենք", "եք", "են"];
export const AUX_PAST = ["էի", "էիր", "էր", "էինք", "էիք", "էին"];
export const NEG_PRES = ["չեմ", "չես", "չի", "չենք", "չեք", "չեն"];
export const NEG_PAST = ["չէի", "չէիր", "չէր", "չէինք", "չէիք", "չէին"];

const SUBJ = {
    el: {
        pres: ["եմ", "ես", "ի", "ենք", "եք", "են"],
        past: ["եի", "եիր", "եր", "եինք", "եիք", "եին"],
    },
    al: {
        pres: ["ամ", "աս", "ա", "անք", "աք", "ան"],
        past: ["այի", "այիր", "ար", "այինք", "այիք", "ային"],
    },
};

export interface TenseInfo {
    id: TenseId;
    name: string;
    meaning: string; // "I have written"
    formula: string;
    group: "compound" | "solo";
    /** -ում / -ել / -ելու participle the compound tense is built on */
    timeline: string; // short visual hint
}

export const TENSES: TenseInfo[] = [
    {
        id: "present",
        name: "Present",
        meaning: "I write / I am writing",
        formula: "stem + ում  +  եմ, ես, է…",
        group: "compound",
        timeline: "now, or every day",
    },
    {
        id: "imperfect",
        name: "Past imperfect",
        meaning: "I was writing / used to write",
        formula: "stem + ում  +  էի, էիր, էր…",
        group: "compound",
        timeline: "ongoing or habit in the past",
    },
    {
        id: "aorist",
        name: "Simple past",
        meaning: "I wrote",
        formula: "past root + եցի / ացի / ա endings",
        group: "solo",
        timeline: "finished point in the past",
    },
    {
        id: "perfect",
        name: "Present perfect",
        meaning: "I have written",
        formula: "past root + ել  +  եմ, ես, է…",
        group: "compound",
        timeline: "past action, result now",
    },
    {
        id: "pluperfect",
        name: "Past perfect",
        meaning: "I had written",
        formula: "past root + ել  +  էի, էիր, էր…",
        group: "compound",
        timeline: "before another past moment",
    },
    {
        id: "futPlan",
        name: "Future plan",
        meaning: "I am going to write",
        formula: "infinitive + ու  +  եմ, ես, է…",
        group: "compound",
        timeline: "decided, scheduled",
    },
    {
        id: "futPast",
        name: "Future in the past",
        meaning: "I was going to write",
        formula: "infinitive + ու  +  էի, էիր, էր…",
        group: "compound",
        timeline: "a plan made in the past",
    },
    {
        id: "future",
        name: "Future (will)",
        meaning: "I will write",
        formula: "կ + stem + եմ / ամ…",
        group: "solo",
        timeline: "probable, promise",
    },
    {
        id: "condPast",
        name: "Conditional",
        meaning: "I would write",
        formula: "կ + stem + եի / այի…",
        group: "solo",
        timeline: "would, if…",
    },
    {
        id: "oblig",
        name: "Obligation",
        meaning: "I must write",
        formula: "պիտի + stem + եմ / ամ…",
        group: "solo",
        timeline: "must, have to",
    },
    {
        id: "obligPast",
        name: "Past obligation",
        meaning: "I should have written",
        formula: "պիտի + stem + եի / այի…",
        group: "solo",
        timeline: "should have, was to",
    },
    {
        id: "imperative",
        name: "Command",
        meaning: "Write!",
        formula: "past root + իր / եք (many short irregulars)",
        group: "solo",
        timeline: "դու and դուք only",
    },
];

export const TENSE_BY_ID = Object.fromEntries(
    TENSES.map((t) => [t.id, t]),
) as Record<TenseId, TenseInfo>;

// ─── Stems ──────────────────────────────────────────────────────────

function conjType(verb: Verb): "el" | "al" {
    if (verb.base) return verb.base;
    return verb.inf.endsWith("ալ") ? "al" : "el";
}

/** infinitive minus -ել / -ալ */
export function presentStem(verb: Verb): string {
    return verb.inf.slice(0, -2);
}

export function pastRoot(verb: Verb): string {
    if (verb.pastRoot) return verb.pastRoot;
    const inf = verb.inf;
    switch (verb.family) {
        case "el":
            return presentStem(verb);
        case "al":
            return presentStem(verb) + "աց";
        case "anal":
            return inf.slice(0, -4) + "աց";
        case "enal":
            return inf.slice(0, -4) + "եց";
        case "nel":
            return inf.slice(0, -3);
        case "chel":
            return inf.slice(0, -3);
        case "cnel":
            return inf.slice(0, -3) + "ր";
        case "irregular":
            return conjType(verb) === "al"
                ? presentStem(verb) + "աց"
                : presentStem(verb);
    }
}

function aoristSpec(verb: Verb): { stem: string; set: AoristSet } {
    if (verb.aorist) return verb.aorist;
    switch (verb.family) {
        case "el":
            return { stem: presentStem(verb), set: "eci" };
        case "al":
            return { stem: presentStem(verb), set: "aci" };
        case "anal":
        case "enal":
        case "nel":
        case "chel":
            return { stem: pastRoot(verb), set: "a" };
        case "cnel":
            return { stem: pastRoot(verb), set: "i" };
        case "irregular":
            return conjType(verb) === "al"
                ? { stem: presentStem(verb), set: "aci" }
                : { stem: presentStem(verb), set: "eci" };
    }
}

export function aoristSetOf(verb: Verb): AoristSet {
    return aoristSpec(verb).set;
}

function aoristAlternates(verb: Verb): { stem: string; set: AoristSet }[] {
    const alts = [...(verb.aoristAlt ?? [])];
    // Causatives are also heard with -եցի: հիշեցրեցի
    if (verb.family === "cnel")
        alts.push({ stem: pastRoot(verb), set: "eci", note: "" });
    return alts;
}

function imperativeForms(verb: Verb): {
    sg: string;
    pl: string;
    sgAlt: string[];
    plAlt: string[];
} {
    if (verb.imperative)
        return {
            sgAlt: [],
            plAlt: [],
            ...verb.imperative,
        };
    const stem = presentStem(verb);
    const root = pastRoot(verb);
    if (verb.family === "al")
        return { sg: stem + "ա՛", pl: stem + "ացե՛ք", sgAlt: [], plAlt: [] };
    if (verb.family === "cnel")
        return { sg: root + "ո՛ւ", pl: root + "ե՛ք", sgAlt: [], plAlt: [] };
    // -ել, -անալ, -ենալ, -նել, -չել
    return { sg: root + "ի՛ր", pl: root + "ե՛ք", sgAlt: [], plAlt: [] };
}

// ─── Forms ──────────────────────────────────────────────────────────

export const STRESS = "՛";
export const stripMarks = (s: string) => s.replace(/[՛՜՞']/g, "");

export interface Form {
    /** main written form (imperatives carry the stress mark ՛) */
    text: string;
    /** other accepted answers */
    alternates: string[];
    english: string;
}

function compound(
    participle: string,
    person: number,
    past: boolean,
    negative: boolean,
): string {
    if (negative)
        return `${(past ? NEG_PAST : NEG_PRES)[person]} ${participle}`;
    return `${participle} ${(past ? AUX_PAST : AUX_PRES)[person]}`;
}

/** Negative-future form ("connegative"): գրի, կարդա */
export function connegative(verb: Verb): string {
    return presentStem(verb) + (conjType(verb) === "el" ? "ի" : "ա");
}

function subjunctive(verb: Verb, person: number, past: boolean): string {
    const t = SUBJ[conjType(verb)];
    return presentStem(verb) + (past ? t.past : t.pres)[person];
}

export function presentParticiple(verb: Verb): string {
    return verb.presentParticiple ?? presentStem(verb) + "ում";
}

export function perfectParticiple(verb: Verb): string {
    return pastRoot(verb) + "ել";
}

export function futureParticiple(verb: Verb): string {
    return verb.inf + "ու";
}

/** Persons that exist for a tense (commands: դու and դուք only) */
export function personsFor(tense: TenseId): number[] {
    return tense === "imperative" ? [1, 4] : [0, 1, 2, 3, 4, 5];
}

export function conjugate(
    verb: Verb,
    tense: TenseId,
    person: number,
    negative = false,
): Form {
    const english = englishGloss(parseEnglish(verb.en), tense, person, negative);
    const alternates: string[] = [];
    let text: string;

    switch (tense) {
        case "present":
            text = compound(presentParticiple(verb), person, false, negative);
            break;
        case "imperfect":
            text = compound(presentParticiple(verb), person, true, negative);
            break;
        case "perfect":
            text = compound(perfectParticiple(verb), person, false, negative);
            break;
        case "pluperfect":
            text = compound(perfectParticiple(verb), person, true, negative);
            break;
        case "futPlan":
            text = compound(futureParticiple(verb), person, false, negative);
            break;
        case "futPast":
            text = compound(futureParticiple(verb), person, true, negative);
            break;
        case "aorist": {
            const neg = negative ? "չ" : "";
            const { stem, set } = aoristSpec(verb);
            text = neg + stem + AORIST_ENDINGS[set][person];
            for (const alt of aoristAlternates(verb))
                alternates.push(
                    neg + alt.stem + AORIST_ENDINGS[alt.set][person],
                );
            break;
        }
        case "future":
            text = negative
                ? `${NEG_PRES[person]} ${connegative(verb)}`
                : "կ" + subjunctive(verb, person, false);
            break;
        case "condPast":
            text = negative
                ? `${NEG_PAST[person]} ${connegative(verb)}`
                : "կ" + subjunctive(verb, person, true);
            break;
        case "oblig":
        case "obligPast": {
            const form = subjunctive(verb, person, tense === "obligPast");
            text = `${negative ? "չպիտի" : "պիտի"} ${form}`;
            alternates.push(`${negative ? "չպետք է" : "պետք է"} ${form}`);
            break;
        }
        case "imperative": {
            const imp = imperativeForms(verb);
            const plural = person === 4;
            const main = plural ? imp.pl : imp.sg;
            const alts = plural ? imp.plAlt : imp.sgAlt;
            if (negative) {
                text = `մի՛ ${stripMarks(main)}`;
                alts.forEach((a) => alternates.push(`մի ${stripMarks(a)}`));
            } else {
                text = main;
                alternates.push(...alts);
            }
            break;
        }
    }

    return { text, alternates, english };
}

// ─── Explanations ───────────────────────────────────────────────────

const SET_LABEL: Record<AoristSet, string> = {
    a: "-ա, -ար, -ավ, -անք, -աք, -ան",
    eci: "-եցի, -եցիր, -եց, -եցինք, -եցիք, -եցին",
    aci: "-ացի, -ացիր, -աց, -ացինք, -ացիք, -ացին",
    i: "-ի, -իր, -եց, -ինք, -իք, -ին",
};

/** One-line "how was this built" note shown after an answer */
export function explain(verb: Verb, tense: TenseId, negative: boolean): string {
    const aux = (past: boolean) =>
        negative
            ? `${past ? "չէի" : "չեմ"}… goes in front`
            : `+ ${past ? "էի, էիր, էր…" : "եմ, ես, է…"}`;
    switch (tense) {
        case "present":
        case "imperfect":
            return `${presentParticiple(verb)} ${aux(tense === "imperfect")}${
                verb.presentParticiple ? "  (‑լիս verb: no ‑ում)" : ""
            }`;
        case "perfect":
        case "pluperfect":
            return `past root ${pastRoot(verb)}- + ել = ${perfectParticiple(verb)} ${aux(tense === "pluperfect")}`;
        case "futPlan":
        case "futPast":
            return `${verb.inf} + ու = ${futureParticiple(verb)} ${aux(tense === "futPast")}`;
        case "aorist": {
            const { stem, set } = aoristSpec(verb);
            return `${stem}- + ${SET_LABEL[set]}${negative ? "  ·  չ- glued on front" : ""}`;
        }
        case "future":
        case "condPast":
            return negative
                ? `drop կ-, use ${tense === "future" ? "չեմ, չես, չի…" : "չէի, չէիր, չէր…"} + ${connegative(verb)}`
                : `կ + ${presentStem(verb)}- + ${conjType(verb) === "el" ? (tense === "future" ? "եմ, ես, ի…" : "եի, եիր, եր…") : tense === "future" ? "ամ, աս, ա…" : "այի, այիր, ար…"}`;
        case "oblig":
        case "obligPast":
            return `${negative ? "չպիտի" : "պիտի"} + ${presentStem(verb)}- + ${conjType(verb) === "el" ? (tense === "oblig" ? "եմ, ես, ի…" : "եի, եիր, եր…") : tense === "oblig" ? "ամ, աս, ա…" : "այի, այիր, ար…"}  (պետք է works too)`;
        case "imperative":
            return verb.imperative
                ? `irregular command: ${verb.imperative.sg} / ${verb.imperative.pl}${negative ? "  ·  մի՛ in front" : ""}`
                : `${imperativeForms(verb).sg} / ${imperativeForms(verb).pl}${negative ? "  ·  մի՛ in front" : ""}`;
    }
}

// ─── Answer checking ────────────────────────────────────────────────

export function normalize(s: string): string {
    return stripMarks(s.normalize("NFC"))
        .replace(/եւ/g, "և")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}

export function isCorrect(answer: string, form: Form): boolean {
    const a = normalize(answer);
    return [form.text, ...form.alternates].some((f) => normalize(f) === a);
}
