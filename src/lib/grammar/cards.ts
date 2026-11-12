// Grammar "cards" for spaced repetition.
//
// A card is one skill, not one sentence:
//   v:<infinitive>:<tense>   a verb in one tense (person and ± are picked at review time)
//   t:<item id>              one topic question (pronoun form, place word, …)
//
// Cards live in code, so new verbs or tenses become new cards automatically.
// The order below is the order new cards are introduced (like Anki's new queue).

import { TENSES, type TenseId } from "./conjugate";
import { VERBS, FAMILY_ORDER, type Verb, type VerbFamily } from "./verbs";
import { topicItems, TOPICS, type TopicId, type QuizItem } from "./topics";

/** Tenses introduced in waves: everyday first, rarer forms later */
const TENSE_STAGES: TenseId[][] = [
    ["present", "aorist", "perfect", "future"],
    ["imperfect", "futPlan", "imperative", "oblig"],
    ["pluperfect", "futPast", "condPast", "obligPast"],
];

export const verbKey = (inf: string, tense: TenseId) => `v:${inf}:${tense}`;
export const topicKey = (itemId: string) => `t:${itemId}`;

/** All verb cards in introduction order: stage → verb rank → family → tense */
const VERB_CARD_ORDER: { key: string; verb: Verb; tense: TenseId }[] = (() => {
    const byFamily = new Map<VerbFamily, Verb[]>(
        FAMILY_ORDER.map((f) => [f, VERBS.filter((v) => v.family === f)]),
    );
    const maxRank = Math.max(...[...byFamily.values()].map((l) => l.length));
    const out: { key: string; verb: Verb; tense: TenseId }[] = [];
    for (const stage of TENSE_STAGES)
        for (let rank = 0; rank < maxRank; rank++)
            for (const f of FAMILY_ORDER) {
                const verb = byFamily.get(f)![rank];
                if (!verb) continue;
                for (const tense of stage)
                    out.push({ key: verbKey(verb.inf, tense), verb, tense });
            }
    return out;
})();

const VERB_CARDS = new Map(VERB_CARD_ORDER.map((c) => [c.key, c]));

const TOPIC_CARDS = new Map<string, { topic: TopicId; itemId: string }>(
    TOPICS.flatMap((t) =>
        topicItems(t.id).map((item) => [
            topicKey(item.id),
            { topic: t.id, itemId: item.id },
        ]),
    ),
);

export function isValidCardKey(key: string): boolean {
    return VERB_CARDS.has(key) || TOPIC_CARDS.has(key);
}

export type ParsedCard =
    | { kind: "verb"; verb: Verb; tense: TenseId }
    | { kind: "topic"; topic: TopicId; itemId: string };

export function parseCardKey(key: string): ParsedCard | null {
    const v = VERB_CARDS.get(key);
    if (v) return { kind: "verb", verb: v.verb, tense: v.tense };
    const t = TOPIC_CARDS.get(key);
    if (t) return { kind: "topic", ...t };
    return null;
}

/** Verb cards matching the chosen tenses and verb groups, in introduction order */
export function verbCardKeys(tenses: TenseId[], families: VerbFamily[]): string[] {
    const t = new Set(tenses);
    const f = new Set(families);
    return VERB_CARD_ORDER.filter(
        (c) => t.has(c.tense) && f.has(c.verb.family),
    ).map((c) => c.key);
}

export function topicCardKeys(topic: TopicId): string[] {
    return [...TOPIC_CARDS.entries()]
        .filter(([, c]) => c.topic === topic)
        .map(([k]) => k);
}

/** A fresh copy of a topic item (options reshuffled each time) */
export function topicItem(itemId: string, topic: TopicId): QuizItem | undefined {
    return topicItems(topic).find((i) => i.id === itemId);
}

/** Card keys grouped for progress bars */
export function keysForTense(tense: TenseId) {
    return VERB_CARD_ORDER.filter((c) => c.tense === tense).map((c) => c.key);
}
export function keysForFamily(family: VerbFamily) {
    return VERB_CARD_ORDER.filter((c) => c.verb.family === family).map((c) => c.key);
}

export const TOTAL_CARDS = VERB_CARDS.size + TOPIC_CARDS.size;
export { TENSES };
