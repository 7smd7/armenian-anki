// Tiny English verb inflector, used to gloss Armenian forms ("she had written").
// An English verb is written "head|tail": the head is inflected, the tail stays
// as is ("get|angry" → "got angry", "wake|somebody up" → "woke somebody up").

interface HeadForms {
    s: string; // 3rd person singular present
    past: string;
    pp: string; // past participle
    ing: string;
}

const IRREGULAR: Record<string, HeadForms> = {
    be: { s: "is", past: "was", pp: "been", ing: "being" },
    become: { s: "becomes", past: "became", pp: "become", ing: "becoming" },
    bring: { s: "brings", past: "brought", pp: "brought", ing: "bringing" },
    buy: { s: "buys", past: "bought", pp: "bought", ing: "buying" },
    come: { s: "comes", past: "came", pp: "come", ing: "coming" },
    cry: { s: "cries", past: "cried", pp: "cried", ing: "crying" },
    die: { s: "dies", past: "died", pp: "died", ing: "dying" },
    do: { s: "does", past: "did", pp: "done", ing: "doing" },
    drink: { s: "drinks", past: "drank", pp: "drunk", ing: "drinking" },
    eat: { s: "eats", past: "ate", pp: "eaten", ing: "eating" },
    fall: { s: "falls", past: "fell", pp: "fallen", ing: "falling" },
    find: { s: "finds", past: "found", pp: "found", ing: "finding" },
    fly: { s: "flies", past: "flew", pp: "flown", ing: "flying" },
    forget: { s: "forgets", past: "forgot", pp: "forgotten", ing: "forgetting" },
    freeze: { s: "freezes", past: "froze", pp: "frozen", ing: "freezing" },
    get: { s: "gets", past: "got", pp: "gotten", ing: "getting" },
    give: { s: "gives", past: "gave", pp: "given", ing: "giving" },
    go: { s: "goes", past: "went", pp: "gone", ing: "going" },
    have: { s: "has", past: "had", pp: "had", ing: "having" },
    hear: { s: "hears", past: "heard", pp: "heard", ing: "hearing" },
    know: { s: "knows", past: "knew", pp: "known", ing: "knowing" },
    leave: { s: "leaves", past: "left", pp: "left", ing: "leaving" },
    lose: { s: "loses", past: "lost", pp: "lost", ing: "losing" },
    make: { s: "makes", past: "made", pp: "made", ing: "making" },
    put: { s: "puts", past: "put", pp: "put", ing: "putting" },
    read: { s: "reads", past: "read", pp: "read", ing: "reading" },
    run: { s: "runs", past: "ran", pp: "run", ing: "running" },
    say: { s: "says", past: "said", pp: "said", ing: "saying" },
    see: { s: "sees", past: "saw", pp: "seen", ing: "seeing" },
    sing: { s: "sings", past: "sang", pp: "sung", ing: "singing" },
    sit: { s: "sits", past: "sat", pp: "sat", ing: "sitting" },
    sleep: { s: "sleeps", past: "slept", pp: "slept", ing: "sleeping" },
    speak: { s: "speaks", past: "spoke", pp: "spoken", ing: "speaking" },
    steal: { s: "steals", past: "stole", pp: "stolen", ing: "stealing" },
    stick: { s: "sticks", past: "stuck", pp: "stuck", ing: "sticking" },
    take: { s: "takes", past: "took", pp: "taken", ing: "taking" },
    teach: { s: "teaches", past: "taught", pp: "taught", ing: "teaching" },
    understand: {
        s: "understands",
        past: "understood",
        pp: "understood",
        ing: "understanding",
    },
    wake: { s: "wakes", past: "woke", pp: "woken", ing: "waking" },
    write: { s: "writes", past: "wrote", pp: "written", ing: "writing" },
};

const VOWELS = "aeiou";

function regular(base: string): HeadForms {
    const last = base.at(-1) ?? "";
    const prev = base.at(-2) ?? "";
    const s = /(s|sh|ch|x|z)$/.test(base)
        ? base + "es"
        : last === "y" && !VOWELS.includes(prev)
          ? base.slice(0, -1) + "ies"
          : base + "s";
    const past =
        last === "e"
            ? base + "d"
            : last === "y" && !VOWELS.includes(prev)
              ? base.slice(0, -1) + "ied"
              : base + "ed";
    const ing =
        last === "e" && prev !== "e" ? base.slice(0, -1) + "ing" : base + "ing";
    return { s, past, pp: past, ing };
}

export interface EnglishVerb {
    base: string; // "get angry"
    head: string;
    tail: string;
    forms: HeadForms;
}

export function parseEnglish(spec: string): EnglishVerb {
    const [head, tail = ""] = spec.split("|");
    const forms = IRREGULAR[head] ?? regular(head);
    return {
        base: tail ? `${head} ${tail}` : head,
        head,
        tail,
        forms,
    };
}

export const EN_SUBJECTS = ["I", "you", "he/she", "we", "you (pl.)", "they"];

const withTail = (v: EnglishVerb, form: string) =>
    v.tail ? `${form} ${v.tail}` : form;

/** Inflected head + tail for a person in the simple present ("I am", "she gets angry") */
function presentSimple(v: EnglishVerb, person: number): string {
    if (v.head === "be") {
        const be = ["am", "are", "is", "are", "are", "are"][person];
        return withTail(v, be);
    }
    return withTail(v, person === 2 ? v.forms.s : v.head);
}

function pastSimple(v: EnglishVerb, person: number): string {
    if (v.head === "be") {
        return withTail(v, person === 0 || person === 2 ? "was" : "were");
    }
    return withTail(v, v.forms.past);
}

const BE_PRES = ["am", "are", "is", "are", "are", "are"];
const BE_PAST = ["was", "were", "was", "were", "were", "were"];
const HAVE = ["have", "have", "has", "have", "have", "have"];
const DO_NEG = ["don't", "don't", "doesn't", "don't", "don't", "don't"];

export type TenseId =
    | "present"
    | "imperfect"
    | "aorist"
    | "perfect"
    | "pluperfect"
    | "futPlan"
    | "futPast"
    | "future"
    | "condPast"
    | "oblig"
    | "obligPast"
    | "imperative";

/** English gloss of one Armenian form, e.g. ("aorist", 2, neg) → "he/she didn't write" */
export function englishGloss(
    v: EnglishVerb,
    tense: TenseId,
    person: number,
    negative: boolean,
): string {
    const S = EN_SUBJECTS[person];
    const base = v.base;
    const ing = withTail(v, v.forms.ing);
    const pp = withTail(v, v.forms.pp);
    const n = negative ? " not" : "";

    switch (tense) {
        case "present":
            if (v.head === "be")
                return `${S} ${presentSimple(v, person).replace(/^(\S+)/, `$1${n}`)}`;
            return negative
                ? `${S} ${DO_NEG[person]} ${base}`
                : `${S} ${presentSimple(v, person)}`;
        case "imperfect":
            if (v.head === "be")
                return `${S} ${pastSimple(v, person).replace(/^(\S+)/, `$1${n}`)}`;
            return `${S} ${BE_PAST[person]}${n} ${ing}`;
        case "aorist":
            if (v.head === "be")
                return `${S} ${pastSimple(v, person).replace(/^(\S+)/, `$1${n}`)}`;
            return negative
                ? `${S} didn't ${base}`
                : `${S} ${pastSimple(v, person)}`;
        case "perfect":
            return `${S} ${HAVE[person]}${n} ${pp}`;
        case "pluperfect":
            return `${S} had${n} ${pp}`;
        case "futPlan":
            return `${S} ${BE_PRES[person]}${n} going to ${base}`;
        case "futPast":
            return `${S} ${BE_PAST[person]}${n} going to ${base}`;
        case "future":
            return negative ? `${S} won't ${base}` : `${S} will ${base}`;
        case "condPast":
            return negative ? `${S} wouldn't ${base}` : `${S} would ${base}`;
        case "oblig":
            return `${S} must${n} ${base}`;
        case "obligPast":
            return negative
                ? `${S} shouldn't have ${pp}`
                : `${S} should have ${pp}`;
        case "imperative": {
            const who = person === 4 ? " (you all)" : "";
            return negative ? `Don't ${base}!${who}` : `${cap(base)}!${who}`;
        }
    }
}

function cap(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
