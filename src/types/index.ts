export interface Flashcard {
    id: string;
    front: string;
    back: string;
    createdAt: number; // timestamp
    lastReviewed?: number; // timestamp
}

export interface ReviewHistory {
    cardId: string;
    date: number; // timestamp
    known: boolean;
}

export interface CardStatus {
    cardId: string;
    known: boolean;
    dueDate: number; // timestamp for next review
    easeFactor: number; // multiplication factor for spacing
    reviewCount: number;
    consecutiveCorrect: number;
}

export interface FlashcardContextType {
    flashcards: Flashcard[];
    cardStatus: CardStatus[];
    reviewHistory: ReviewHistory[];
    currentCardIndex: number;
    isFlipped: boolean;
    stats: Stats;
    addFlashcard: (flashcard: Omit<Flashcard, 'id' | 'createdAt'>) => void;
    updateFlashcard: (flashcard: Flashcard) => void;
    deleteFlashcard: (id: string) => void;
    reviewCard: (cardId: string, known: boolean) => void;
    flipCard: () => void;
    goToNextCard: () => void;
}

export interface Stats {
    totalReviews: number;
    knownCount: number;
    unknownCount: number;
    reviewsByDate: { [date: string]: { known: number; unknown: number } };
}