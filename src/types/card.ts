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

/** Per-card SRS progress returned by the deck-management API */
export interface DeckCardSrsState {
    easeFactor: number;
    interval: number;
    repetitions: number;
    lapses: number;
    dueAt: string;
    lastReviewedAt: string | null;
    isForwardLearned: boolean;
    isReverseLearned: boolean;
    isMastered: boolean;
}

/** Deck-wide statistics returned alongside the card list */
export interface DeckStats {
    total: number;
    mastered: number;
    learning: number;
    dueToday: number;
    notStarted: number;
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
    createdAt: string;
    srsState: DeckCardSrsState | null;
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
}
