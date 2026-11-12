// Verb list for the grammar trainer.
//
// Most verbs need only infinitive, English and family: the conjugation engine
// (conjugate.ts) derives every form from the family rule. Irregular verbs add
// overrides for the only three places a verb can be irregular — the perfect
// participle (past root), the simple past and the imperative — plus the -լիս
// present of գալ / տալ.
//
// English is "head|tail" (see english.ts): the head word is inflected.

export type VerbFamily =
    | "el" // regular -ել: գրել
    | "al" // regular -ալ: կարդալ
    | "anal" // -անալ → -աց-: հասկանալ
    | "enal" // -ենալ → -եց-: մոտենալ
    | "nel" // -նել, ն drops: մտնել
    | "chel" // -չել, չ drops: փախչել
    | "cnel" // causative -ցնել → -ցր-: հիշեցնել
    | "irregular";

/** Simple past ending sets (ես · դու · նա · մենք · դուք · նրանք) */
export type AoristSet = "a" | "eci" | "aci" | "i";

export const AORIST_ENDINGS: Record<AoristSet, string[]> = {
    a: ["ա", "ար", "ավ", "անք", "աք", "ան"],
    eci: ["եցի", "եցիր", "եց", "եցինք", "եցիք", "եցին"],
    aci: ["ացի", "ացիր", "աց", "ացինք", "ացիք", "ացին"],
    i: ["ի", "իր", "եց", "ինք", "իք", "ին"],
};

export interface VerbOverrides {
    /** -լիս present participle (գալիս) instead of stem + ում */
    presentParticiple?: string;
    /** root used for the perfect participle (root + ել) */
    pastRoot?: string;
    /** simple past: stem + ending set */
    aorist?: { stem: string; set: AoristSet };
    /** accepted alternative simple pasts (colloquial / older forms) */
    aoristAlt?: { stem: string; set: AoristSet; note: string }[];
    /** imperative with stress mark (՛) */
    imperative?: { sg: string; pl: string; sgAlt?: string[]; plAlt?: string[] };
}

export interface Verb extends VerbOverrides {
    inf: string;
    en: string;
    family: VerbFamily;
    /** family the stems follow when family is "irregular" */
    base?: "el" | "al";
    /** one-line memory hook shown after answering */
    note?: string;
}

const v = (
    inf: string,
    en: string,
    family: VerbFamily,
    extra: Partial<Verb> = {},
): Verb => ({ inf, en, family, ...extra });

export const VERBS: Verb[] = [
    // ── Regular -ել ────────────────────────────────────────────────
    v("գրել", "write", "el"),
    v("խոսել", "speak", "el"),
    v("սիրել", "love", "el"),
    v("նստել", "sit", "el"),
    v("խմել", "drink", "el"),
    v("աշխատել", "work", "el"),
    v("ապրել", "live", "el"),
    v("սպասել", "wait", "el"),
    v("սովորել", "learn", "el"),
    v("հիշել", "remember", "el"),
    v("ուզել", "want", "el"),
    v("նայել", "look", "el"),
    v("լսել", "hear", "el"),
    v("երգել", "sing", "el"),
    v("զանգել", "call", "el"),
    v("գնել", "buy", "el", {
        note: "The ն belongs to the root here, so գնել is a regular -ել verb.",
    }),

    // ── Regular -ալ ────────────────────────────────────────────────
    v("կարդալ", "read", "al"),
    v("խաղալ", "play", "al"),
    v("գնալ", "go", "al"),
    v("մնալ", "stay", "al"),

    // ── -անալ ──────────────────────────────────────────────────────
    v("հասկանալ", "understand", "anal"),
    v("ամուսնանալ", "marry", "anal"),
    v("արթնանալ", "wake|up", "anal"),
    v("բարկանալ", "get|angry", "anal"),
    v("բարձրանալ", "go|up", "anal"),
    v("գողանալ", "steal", "anal"),
    v("զարմանալ", "get|surprised", "anal"),
    v("իմանալ", "find|out", "anal", {
        note: "իմանալ gives the past and future of գիտեմ (to know).",
    }),
    v("լողանալ", "shower", "anal"),
    v("խոստանալ", "promise", "anal"),
    v("ծանոթանալ", "get|acquainted", "anal"),
    v("կարողանալ", "manage", "anal", {
        note: "կարողանալ gives the past and future of կարող եմ (can).",
    }),
    v("հանգստանալ", "rest", "anal"),
    v("հեռանալ", "go|away", "anal"),
    v("հիվանդանալ", "get|sick", "anal"),
    v("ձանձրանալ", "get|bored", "anal"),
    v("մոռանալ", "forget", "anal"),
    v("ստանալ", "receive", "anal"),
    v("ուշանալ", "be|late", "anal"),
    v("ուրախանալ", "be|glad", "anal"),

    // ── -ենալ ──────────────────────────────────────────────────────
    v("մոտենալ", "approach", "enal"),
    v("վախենալ", "be|afraid", "enal"),
    v("ունենալ", "have", "enal", {
        note: "ունենալ gives the past and future of ունեմ (to have).",
    }),
    v("կամենալ", "wish", "enal"),
    v("պարծենալ", "boast", "enal"),

    // ── -նել ───────────────────────────────────────────────────────
    v("մտնել", "enter", "nel"),
    v("անցնել", "pass", "nel"),
    v("գտնել", "find", "nel"),
    v("ընկնել", "fall", "nel"),
    v("իջնել", "go|down", "nel"),
    v("հագնել", "put|on", "nel"),
    v("հասնել", "reach", "nel"),
    v("մեռնել", "die", "nel"),
    v("առնել", "buy", "nel", {
        imperative: { sg: "ա՛ռ", pl: "առե՛ք" },
        note: "Short command: ա՛ռ.",
    }),
    v("տեսնել", "see", "nel", {
        imperative: { sg: "տե՛ս", pl: "տեսե՛ք" },
        note: "Short command: տե՛ս.",
    }),

    // ── -չել ───────────────────────────────────────────────────────
    v("փախչել", "run|away", "chel"),
    v("թռչել", "fly", "chel"),
    v("կորչել", "get|lost", "chel"),
    v("կպչել", "stick", "chel"),
    v("սառչել", "freeze", "chel"),
    v("դիպչել", "touch", "chel"),

    // ── Causative -ցնել ────────────────────────────────────────────
    v("հիշեցնել", "remind", "cnel"),
    v("արթնացնել", "wake|somebody up", "cnel"),
    v("բարձրացնել", "lift", "cnel"),
    v("զարմացնել", "surprise", "cnel"),
    v("ծանոթացնել", "introduce", "cnel"),
    v("կորցնել", "lose", "cnel"),
    v("հասկացնել", "explain", "cnel"),
    v("հասցնել", "deliver", "cnel"),
    v("նստեցնել", "seat", "cnel"),
    v("սովորեցնել", "teach", "cnel"),
    v("վախեցնել", "frighten", "cnel"),
    v("վերջացնել", "finish", "cnel"),
    v("վերցնել", "take", "cnel"),
    v("հարցնել", "ask", "cnel", {
        note: "Not a causative in meaning, but it conjugates like one: հարցրի, հարցրո՛ւ.",
    }),

    // ── Irregular (Appendix 6) ─────────────────────────────────────
    v("գալ", "come", "irregular", {
        base: "al",
        presentParticiple: "գալիս",
        pastRoot: "եկ",
        aorist: { stem: "եկ", set: "a" },
        imperative: { sg: "արի՛", pl: "եկե՛ք", sgAlt: ["եկ"] },
        note: "Present uses գալիս, not գում. Past root եկ-.",
    }),
    v("տալ", "give", "irregular", {
        base: "al",
        presentParticiple: "տալիս",
        pastRoot: "տվ",
        aorist: { stem: "տվ", set: "eci" },
        aoristAlt: [{ stem: "տվ", set: "i", note: "colloquial տվի" }],
        imperative: { sg: "տո՛ւր", pl: "տվե՛ք" },
        note: "Present uses տալիս. Past root տվ-, command տո՛ւր.",
    }),
    v("ուտել", "eat", "irregular", {
        base: "el",
        pastRoot: "կեր",
        aorist: { stem: "կեր", set: "a" },
        imperative: { sg: "կե՛ր", pl: "կերե՛ք" },
        note: "Past root կեր-: կերա, կերել եմ, կե՛ր.",
    }),
    v("տանել", "take|away", "irregular", {
        base: "el",
        pastRoot: "տար",
        aorist: { stem: "տար", set: "a" },
        imperative: { sg: "տա՛ր", pl: "տարե՛ք" },
        note: "Past root տար-: տարա, տարել եմ, տա՛ր.",
    }),
    v("լինել", "be", "irregular", {
        base: "el",
        pastRoot: "եղ",
        aorist: { stem: "եղ", set: "a" },
        imperative: { sg: "եղի՛ր", pl: "եղե՛ք" },
        note: "Past root եղ-: եղա, եղել եմ, եղի՛ր.",
    }),
    v("դառնալ", "become", "irregular", {
        base: "al",
        pastRoot: "դարձ",
        aorist: { stem: "դարձ", set: "a" },
        imperative: { sg: "դարձի՛ր", pl: "դարձե՛ք" },
        note: "Past root դարձ-.",
    }),
    v("վերադառնալ", "return", "irregular", {
        base: "al",
        pastRoot: "վերադարձ",
        aorist: { stem: "վերադարձ", set: "a" },
        imperative: { sg: "վերադարձի՛ր", pl: "վերադարձե՛ք" },
        note: "Like դառնալ: past root վերադարձ-.",
    }),
    v("դնել", "put", "irregular", {
        base: "el",
        pastRoot: "դր",
        aorist: { stem: "դր", set: "eci" },
        aoristAlt: [{ stem: "դր", set: "i", note: "colloquial դրի" }],
        imperative: { sg: "դի՛ր", pl: "դրե՛ք" },
        note: "Past root դր-, command դի՛ր.",
    }),
    v("անել", "do", "irregular", {
        base: "el",
        pastRoot: "ար",
        aorist: { stem: "ար", set: "eci" },
        aoristAlt: [{ stem: "ար", set: "i", note: "colloquial արի" }],
        imperative: { sg: "արա՛", pl: "արե՛ք" },
        note: "Past root ար-: արեցի, արել եմ, արա՛.",
    }),
    v("թողնել", "leave", "irregular", {
        base: "el",
        pastRoot: "թող",
        aorist: { stem: "թող", set: "eci" },
        imperative: { sg: "թո՛ղ", pl: "թողե՛ք" },
        note: "Drops ն like -նել verbs but takes -եցի: թողեցի.",
    }),
    v("լվանալ", "wash", "irregular", {
        base: "al",
        pastRoot: "լվաց",
        aorist: { stem: "լվ", set: "aci" },
        imperative: { sg: "լվա՛", pl: "լվացե՛ք" },
        note: "Looks like -անալ but goes լվացի, լվա՛.",
    }),
    v("ասել", "say", "irregular", {
        base: "el",
        pastRoot: "աս",
        aorist: { stem: "աս", set: "aci" },
        aoristAlt: [{ stem: "աս", set: "eci", note: "colloquial ասեցի" }],
        imperative: { sg: "ասա՛", pl: "ասե՛ք", plAlt: ["ասացեք"] },
        note: "Perfect ասել եմ, but past ասացի and command ասա՛.",
    }),
    v("բերել", "bring", "irregular", {
        base: "el",
        imperative: { sg: "բե՛ր", pl: "բերե՛ք" },
        note: "Regular everywhere except the short command բե՛ր.",
    }),
];

export const FAMILY_INFO: Record<
    VerbFamily,
    { label: string; short: string; rule: string; example: string }
> = {
    el: {
        label: "Regular -ել",
        short: "-ել",
        rule: "Root stays: գր- + -եցի, գր- + ել եմ",
        example: "գրել → գրեցի, գրել եմ, գրի՛ր",
    },
    al: {
        label: "Regular -ալ",
        short: "-ալ",
        rule: "Past adds -աց-: կարդ- + -ացի, կարդացել եմ",
        example: "կարդալ → կարդացի, կարդացել եմ, կարդա՛",
    },
    anal: {
        label: "-անալ verbs",
        short: "-անալ",
        rule: "-ան- becomes -աց-, simple past takes -ա endings",
        example: "հասկանալ → հասկացա, հասկացել եմ, հասկացի՛ր",
    },
    enal: {
        label: "-ենալ verbs",
        short: "-ենալ",
        rule: "-են- becomes -եց-, simple past takes -ա endings",
        example: "մոտենալ → մոտեցա, մոտեցել եմ, մոտեցի՛ր",
    },
    nel: {
        label: "-նել verbs",
        short: "-նել",
        rule: "ն drops in the past root, simple past takes -ա endings",
        example: "մտնել → մտա, մտել եմ, մտի՛ր",
    },
    chel: {
        label: "-չել verbs",
        short: "-չել",
        rule: "չ drops in the past root, simple past takes -ա endings",
        example: "փախչել → փախա, փախել եմ, փախի՛ր",
    },
    cnel: {
        label: "Causative -ցնել",
        short: "-ցնել",
        rule: "-ցն- becomes -ցր-, command ends in -ցրո՛ւ",
        example: "հիշեցնել → հիշեցրի, հիշեցրել եմ, հիշեցրո՛ւ",
    },
    irregular: {
        label: "Irregular",
        short: "irreg.",
        rule: "Own past root: learn perfect, simple past and command",
        example: "գալ → եկա, եկել եմ, արի՛",
    },
};

export const FAMILY_ORDER: VerbFamily[] = [
    "el",
    "al",
    "anal",
    "enal",
    "nel",
    "chel",
    "cnel",
    "irregular",
];
