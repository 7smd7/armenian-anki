// Guest (unauthenticated) SRS state stored in localStorage
// Keys mirror UserCardState fields so migration to DB is straightforward

export interface GuestCardState {
    easeFactor: number;
    interval: number;
    repetitions: number;
    lapses: number;
    dueAt: string; // ISO string
    isForwardLearned: boolean;
    isReverseLearned: boolean;
    isMastered: boolean;
}

export interface GuestSession {
    // Key is the card's externalRowId (row index as string: "2", "3", ...)
    states: Record<string, GuestCardState>;
    updatedAt: string;
}

const STORAGE_KEY = "armenian_anki_guest";

function isClient(): boolean {
    return typeof window !== "undefined";
}

export function loadGuestSession(): GuestSession {
    if (!isClient()) return { states: {}, updatedAt: new Date().toISOString() };
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { states: {}, updatedAt: new Date().toISOString() };
        return JSON.parse(raw) as GuestSession;
    } catch {
        return { states: {}, updatedAt: new Date().toISOString() };
    }
}

export function saveGuestCardState(
    externalRowId: string,
    state: GuestCardState,
): void {
    if (!isClient()) return;
    const session = loadGuestSession();
    session.states[externalRowId] = state;
    session.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearGuestSession(): void {
    if (!isClient()) return;
    localStorage.removeItem(STORAGE_KEY);
}

export function hasGuestSession(): boolean {
    if (!isClient()) return false;
    const session = loadGuestSession();
    return Object.keys(session.states).length > 0;
}

export function getDefaultCardState(): GuestCardState {
    return {
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        lapses: 0,
        dueAt: new Date().toISOString(),
        isForwardLearned: false,
        isReverseLearned: false,
        isMastered: false,
    };
}
