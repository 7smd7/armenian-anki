export interface Deck {
    id: string;
    title: string;
    cardCount: number;
    // Fields returned by the full deck list (DecksModal)
    slug?: string;
    description?: string | null;
    createdAt?: string;
}
