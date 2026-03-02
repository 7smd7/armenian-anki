import type { DeckCard, CardEditForm } from "@/types/card";

export const EMPTY_FORM: CardEditForm = {
    armenianScript: "",
    translit: "",
    englishMeaning: "",
    exampleSentence: "",
    exampleTranslation: "",
    grammar: "",
    cheatPhrase: "",
    topic: "",
};

export function cardToForm(c: DeckCard): CardEditForm {
    return {
        armenianScript: c.armenianScript,
        translit: c.translit,
        englishMeaning: c.englishMeaning,
        exampleSentence: c.exampleSentence ?? "",
        exampleTranslation: c.exampleTranslation ?? "",
        grammar: c.grammar ?? "",
        cheatPhrase: c.cheatPhrase ?? "",
        topic: c.topic ?? "",
    };
}
