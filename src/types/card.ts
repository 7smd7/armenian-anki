export interface CardData {
    id?: string;
    externalRowId?: string;
    armenianScript: string;
    translit: string;
    englishMeaning: string;
    exampleSentence?: string | null;
    exampleTranslation?: string | null;
    grammar?: string | null;
    cheatPhrase?: string | null;
    topic?: string | null;
    difficultyBase?: number | null;
}

export interface CardStateData {
    easeFactor: number;
    interval: number;
    repetitions: number;
    lapses: number;
    isForwardLearned: boolean;
    isReverseLearned: boolean;
    isMastered: boolean;
}

/** Card shape returned by the deck-management API */
export interface DeckCard {
    id: string;
    armenianScript: string;
    translit: string;
    englishMeaning: string;
    exampleSentence: string | null;
    exampleTranslation: string | null;
    grammar: string | null;
    cheatPhrase: string | null;
    topic: string | null;
    difficultyBase: number | null;
}

/** Form state for adding / editing a deck card */
export interface CardEditForm {
    armenianScript: string;
    translit: string;
    englishMeaning: string;
    exampleSentence: string;
    exampleTranslation: string;
    grammar: string;
    cheatPhrase: string;
    topic: string;
    difficultyBase: string;
}
