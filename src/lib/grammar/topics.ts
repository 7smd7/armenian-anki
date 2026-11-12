// Non-verb grammar: pronouns, place words (postpositions), conditionals and
// the state verbs that have no -ում form. Each topic has reference data for
// the Learn tab and a quiz generator for the Practice tab.

export interface QuizItem {
    /** stable id used for progress tracking */
    id: string;
    topic: TopicId;
    prompt: string;
    /** smaller line under the prompt */
    hint?: string;
    /** the prompt itself is Armenian (bigger Armenian font, speak button) */
    armenianPrompt?: boolean;
    answer: string;
    options: string[];
    explanation: string;
    /** Armenian text to read aloud after answering */
    speak?: string;
}

export type TopicId = "pronouns" | "places" | "conditionals" | "stateVerbs";

export const TOPICS: { id: TopicId; name: string; blurb: string }[] = [
    {
        id: "pronouns",
        name: "Pronouns",
        blurb: "me, my, mine, myself, my own",
    },
    {
        id: "places",
        name: "Place words",
        blurb: "on, in, under, behind… after the noun",
    },
    {
        id: "conditionals",
        name: "If-sentences",
        blurb: "եթե: real, unreal, past, always-true",
    },
    {
        id: "stateVerbs",
        name: "have · know · there is",
        blurb: "ունեմ, գիտեմ, կա, կարող եմ",
    },
];

// ─── Pronouns ──────────────────────────────────────────────────────

export const PRONOUN_COLUMNS = [
    { key: "subject", label: "Subject", en: ["I", "you", "he / she", "we", "you (pl.)", "they"] },
    { key: "object", label: "Object", en: ["me / to me", "you / to you", "him, her / to him, her", "us / to us", "you (pl.) / to you", "them / to them"] },
    { key: "possessive", label: "Possessive", en: ["my", "your", "his / her", "our", "your (pl.)", "their"] },
    { key: "mine", label: "Possessive pronoun", en: ["mine", "yours", "his / hers", "ours", "yours (pl.)", "theirs"] },
    { key: "reflexive", label: "Reflexive", en: ["myself", "yourself", "himself / herself", "ourselves", "yourselves", "themselves"] },
    { key: "own", label: "Own", en: ["my own", "your own", "his / her own", "our own", "your (pl.) own", "their own"] },
] as const;

export const PRONOUNS: Record<(typeof PRONOUN_COLUMNS)[number]["key"], string[]> = {
    subject: ["ես", "դու", "նա", "մենք", "դուք", "նրանք"],
    object: ["ինձ", "քեզ", "նրան", "մեզ", "ձեզ", "նրանց"],
    possessive: ["իմ", "քո", "նրա", "մեր", "ձեր", "նրանց"],
    mine: ["իմը", "քոնը", "նրանը", "մերը", "ձերը", "նրանցը"],
    reflexive: ["ինքս", "ինքդ", "ինքը", "ինքներս", "ինքներդ", "իրենք"],
    own: ["իմ սեփական", "քո սեփական", "իր սեփական", "մեր սեփական", "ձեր սեփական", "իրենց սեփական"],
};

// ─── Place words ───────────────────────────────────────────────────

export const PLACES = [
    { en: "on", hy: "վրա", alt: "", example: "սեղանի վրա", exampleEn: "on the table" },
    { en: "in / inside", hy: "մեջ", alt: "", example: "տուփի մեջ", exampleEn: "in the box" },
    { en: "under", hy: "տակ", alt: "", example: "աթոռի տակ", exampleEn: "under the chair" },
    { en: "behind", hy: "հետևում", alt: "հետև", example: "դռան հետևում", exampleEn: "behind the door" },
    { en: "in front of", hy: "դիմաց", alt: "", example: "տան դիմաց", exampleEn: "in front of the house" },
    { en: "above / over", hy: "վերևում", alt: "վերև", example: "մահճակալի վերևում", exampleEn: "above the bed" },
    { en: "beside", hy: "կողքին", alt: "կողքիս = beside me", example: "պատուհանի կողքին", exampleEn: "beside the window" },
    { en: "near / at", hy: "մոտ", alt: "", example: "տան մոտ", exampleEn: "near the house" },
    { en: "between", hy: "միջև", alt: "", example: "տան և դպրոցի միջև", exampleEn: "between the house and the school" },
];

// ─── Conditionals ──────────────────────────────────────────────────

export const CONDITIONAL_TYPES = [
    {
        id: "real",
        name: "Real / likely future",
        when: "It may well happen",
        ifPart: "եթե + subjunctive (գա, ունենամ)",
        mainPart: "կ- future (կմնամ)",
        example: "Եթե անձրև գա, ես տանը կմնամ։",
        exampleEn: "If it rains, I will stay home.",
    },
    {
        id: "unrealPresent",
        name: "Unreal now",
        when: "Not true now, or unlikely",
        ifPart: "եթե + past subjunctive (ունենայի)",
        mainPart: "կ- conditional (կգայի)",
        example: "Եթե ժամանակ ունենայի, կգայի։",
        exampleEn: "If I had time, I would come.",
    },
    {
        id: "unrealPast",
        name: "Unreal past",
        when: "It did not happen",
        ifPart: "եթե + past subjunctive (spoken) or գրած լինեի",
        mainPart: "կ- conditional (կօգնեի)",
        example: "Եթե շուտ իմանայի, քեզ կօգնեի։",
        exampleEn: "If I had known sooner, I would have helped you.",
    },
    {
        id: "zero",
        name: "Always true",
        when: "Facts and habits",
        ifPart: "եթե + present (հալվում է)",
        mainPart: "present (դառնում է)",
        example: "Եթե ձյունը հալվում է, ջուր է դառնում։",
        exampleEn: "If snow melts, it becomes water.",
    },
] as const;

const CONDITIONAL_SENTENCES: { hy: string; en: string; type: (typeof CONDITIONAL_TYPES)[number]["id"] }[] = [
    { hy: "Եթե անձրև գա, ես տանը կմնամ։", en: "If it rains, I will stay home.", type: "real" },
    { hy: "Եթե վաղը գաս, միասին կգնանք։", en: "If you come tomorrow, we will go together.", type: "real" },
    { hy: "Եթե ժամանակ ունենայի, կգայի։", en: "If I had time, I would come.", type: "unrealPresent" },
    { hy: "Եթե փող ունենայի, մեքենա կգնեի։", en: "If I had money, I would buy a car.", type: "unrealPresent" },
    { hy: "Եթե շուտ իմանայի, քեզ կօգնեի։", en: "If I had known sooner, I would have helped you.", type: "unrealPast" },
    { hy: "Եթե ձյունը հալվում է, ջուր է դառնում։", en: "If snow melts, it becomes water.", type: "zero" },
    { hy: "Եթե ջուրը տաքացնում ես, եռում է։", en: "If you heat water, it boils.", type: "zero" },
];

const CONDITIONAL_GAPS = [
    {
        id: "gap-unreal-if",
        prompt: "Եթե ժամանակ ___, կգայի։",
        hint: "If I had time, I would come.",
        answer: "ունենայի",
        options: ["ունենայի", "ունենամ", "ունեմ", "կունենայի"],
        explanation: "Unreal: the if-part takes the past subjunctive without կ-.",
    },
    {
        id: "gap-real-main",
        prompt: "Եթե անձրև գա, ես տանը ___։",
        hint: "If it rains, I will stay home.",
        answer: "կմնամ",
        options: ["կմնամ", "կմնայի", "մնացի", "մնում էի"],
        explanation: "Real future: if-part subjunctive (գա), result with կ- future.",
    },
    {
        id: "gap-unreal-main",
        prompt: "Եթե փող ունենայի, մեքենա ___։",
        hint: "If I had money, I would buy a car.",
        answer: "կգնեի",
        options: ["կգնեի", "կգնեմ", "գնեցի", "գնելու եմ"],
        explanation: "Unreal: the result takes the կ- conditional (կ + -եի).",
    },
    {
        id: "gap-real-if",
        prompt: "Եթե վաղը ___, միասին կգնանք։",
        hint: "If you come tomorrow, we will go together.",
        answer: "գաս",
        options: ["գաս", "կգաս", "եկար", "գայիր"],
        explanation: "The if-part never takes կ-: plain subjunctive գաս.",
    },
    {
        id: "gap-then",
        prompt: "Եթե…, ___ … = If…, then…",
        hint: "Which word can start the result clause?",
        answer: "ապա",
        options: ["ապա", "եթե", "որ", "բայց"],
        explanation: "ապա (or ուրեմն) = then. It is optional.",
    },
];

// ─── State verbs ───────────────────────────────────────────────────

export const STATE_VERBS = [
    {
        en: "to have",
        present: ["ունեմ", "ունես", "ունի", "ունենք", "ունեք", "ունեն"],
        negative: "չունեմ",
        past: "ունեի (նա ուներ)",
        borrows: "ունենալ: ունեցա, ունեցել եմ, կունենամ",
    },
    {
        en: "to know",
        present: ["գիտեմ", "գիտես", "գիտի", "գիտենք", "գիտեք", "գիտեն"],
        negative: "չգիտեմ",
        past: "գիտեի (նա գիտեր)",
        borrows: "իմանալ: իմացա, իմացել եմ, կիմանամ",
    },
    {
        en: "there is",
        present: ["կամ", "կաս", "կա", "կանք", "կաք", "կան"],
        negative: "չկա",
        past: "կայի (կար = there was)",
        borrows: "լինել: եղավ, եղել է, կլինի",
    },
    {
        en: "to be",
        present: ["եմ", "ես", "է", "ենք", "եք", "են"],
        negative: "չեմ (նա չէ)",
        past: "էի (նա էր)",
        borrows: "լինել: եղա, եղել եմ, կլինեմ",
    },
    {
        en: "can",
        present: ["կարող եմ", "կարող ես", "կարող է", "կարող ենք", "կարող եք", "կարող են"],
        negative: "չեմ կարող",
        past: "կարող էի",
        borrows: "կարողանալ: կարողացա, կկարողանամ",
    },
];

const STATE_QUESTIONS: { id: string; prompt: string; answer: string; options: string[]; explanation: string }[] = [
    { id: "sv-have-neg", prompt: "I don't have", answer: "չունեմ", options: ["չունեմ", "չեմ ունում", "ունեմ չէ", "չունենամ"], explanation: "State verbs take չ- directly: չունեմ. There is no ունում." },
    { id: "sv-know-3", prompt: "he / she knows", answer: "գիտի", options: ["գիտի", "գիտում է", "գիտե", "իմանում է"], explanation: "գիտեմ, գիտես, գիտի… no -ում form." },
    { id: "sv-know-neg", prompt: "I don't know", answer: "չգիտեմ", options: ["չգիտեմ", "չեմ գիտում", "չեմ գիտի", "գիտեմ չէ"], explanation: "չ- attaches to the verb itself: չգիտեմ." },
    { id: "sv-there-neg", prompt: "there isn't", answer: "չկա", options: ["չկա", "չի կա", "կա չէ", "չկան"], explanation: "կա → չկա." },
    { id: "sv-there-past", prompt: "there was", answer: "կար", options: ["կար", "կայի", "կաց", "եղավ"], explanation: "Past imperfect of կա: կար. (եղավ = it happened / there came to be.)" },
    { id: "sv-had-3", prompt: "he / she had (back then)", answer: "ուներ", options: ["ուներ", "ունեց", "ունի", "ունեցավ"], explanation: "Past of ունեմ: ունեի, ունեիր, ուներ…" },
    { id: "sv-found-out", prompt: "I found out (once)", answer: "իմացա", options: ["իմացա", "գիտեի", "գիտեցի", "իմանում էի"], explanation: "For a finished past event, գիտեմ borrows իմանալ: իմացա." },
    { id: "sv-will-have", prompt: "I will have", answer: "կունենամ", options: ["կունենամ", "կունեմ", "ունենալու եմ է", "կունեի"], explanation: "Future borrows ունենալ: կունենամ." },
    { id: "sv-cant", prompt: "I can't", answer: "չեմ կարող", options: ["չեմ կարող", "չկարող եմ", "կարող չեմ", "չեմ կարողանում"], explanation: "կարող եմ works like a compound: չեմ կարող." },
    { id: "sv-not-student", prompt: "he / she is not a student", answer: "նա ուսանող չէ", options: ["նա ուսանող չէ", "նա ուսանող չի", "նա չի ուսանող", "նա ուսանող չեմ"], explanation: "Alone, 'is not' is չէ. չի is only the helper inside a tense (չի գրում)." },
    { id: "sv-could", prompt: "I managed to (once)", answer: "կարողացա", options: ["կարողացա", "կարող էի", "կարողեցի", "կարող եմ"], explanation: "A finished 'could' uses կարողանալ: կարողացա." },
];

// ─── Quiz builders ─────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/** Up to n unique distractors that differ from the answer */
function pickDistractors(answer: string, pool: string[], n = 3): string[] {
    return shuffle([...new Set(pool)].filter((x) => x !== answer)).slice(0, n);
}

function pronounItems(): QuizItem[] {
    const items: QuizItem[] = [];
    PRONOUN_COLUMNS.slice(1).forEach((col) => {
        const forms = PRONOUNS[col.key];
        forms.forEach((answer, p) => {
            // Same person in other columns + same column other persons
            const sameRow = PRONOUN_COLUMNS.map((c) => PRONOUNS[c.key][p]);
            const pool = [...sameRow, ...forms];
            items.push({
                id: `pron-${col.key}-${p}`,
                topic: "pronouns",
                prompt: col.en[p],
                hint: `${col.label} of ${PRONOUNS.subject[p]}`,
                answer,
                options: shuffle([answer, ...pickDistractors(answer, pool)]),
                explanation: `${PRONOUNS.subject[p]} → ${col.label.toLowerCase()}: ${answer}`,
                speak: answer,
            });
        });
    });
    return items;
}

function placeItems(): QuizItem[] {
    const words = PLACES.map((p) => p.hy);
    const items: QuizItem[] = [];
    PLACES.forEach((p, i) => {
        items.push({
            id: `place-${i}`,
            topic: "places",
            prompt: p.en,
            answer: p.hy,
            options: shuffle([p.hy, ...pickDistractors(p.hy, words)]),
            explanation: `Comes after a genitive noun: ${p.example} (${p.exampleEn})`,
            speak: p.example,
        });
        items.push({
            id: `place-phrase-${i}`,
            topic: "places",
            prompt: p.exampleEn,
            answer: p.example,
            options: shuffle([
                p.example,
                ...pickDistractors(
                    p.example,
                    PLACES.map((q) => p.example.replace(p.hy, q.hy)),
                ),
            ]),
            explanation: `Noun in the genitive, then the place word: ${p.example}`,
            speak: p.example,
        });
    });
    return items;
}

function conditionalItems(): QuizItem[] {
    const typeNames = CONDITIONAL_TYPES.map((t) => t.name);
    const items: QuizItem[] = CONDITIONAL_SENTENCES.map((s, i) => {
        const type = CONDITIONAL_TYPES.find((t) => t.id === s.type)!;
        return {
            id: `cond-type-${i}`,
            topic: "conditionals" as const,
            prompt: s.hy,
            hint: "Which kind of if-sentence is this?",
            armenianPrompt: true,
            answer: type.name,
            options: typeNames,
            explanation: `${s.en}  ·  if-part: ${type.ifPart}; result: ${type.mainPart}`,
            speak: s.hy,
        };
    });
    CONDITIONAL_GAPS.forEach((g) =>
        items.push({
            id: `cond-${g.id}`,
            topic: "conditionals",
            prompt: g.prompt,
            hint: g.hint,
            armenianPrompt: true,
            answer: g.answer,
            options: shuffle(g.options),
            explanation: g.explanation,
            speak: g.prompt.replace("___", g.answer),
        }),
    );
    return items;
}

function stateVerbItems(): QuizItem[] {
    return STATE_QUESTIONS.map((q) => ({
        id: q.id,
        topic: "stateVerbs" as const,
        prompt: q.prompt,
        answer: q.answer,
        options: shuffle(q.options),
        explanation: q.explanation,
        speak: q.answer,
    }));
}

export function topicItems(topic: TopicId): QuizItem[] {
    switch (topic) {
        case "pronouns":
            return pronounItems();
        case "places":
            return placeItems();
        case "conditionals":
            return conditionalItems();
        case "stateVerbs":
            return stateVerbItems();
    }
}
