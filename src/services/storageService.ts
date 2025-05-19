import { Flashcard, CardStatus, ReviewHistory, Stats } from '../types';

const STORAGE_KEYS = {
  FLASHCARDS: 'flashcards-data',
  CARD_STATUS: 'card-status-data',
  REVIEW_HISTORY: 'review-history-data',
  STATS: 'stats-data'
};

/**
 * Save data to localStorage
 */
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

/**
 * Get data from localStorage
 */
export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};

/**
 * Save all flashcard app data to localStorage
 */
export const saveFlashcardAppData = (
  flashcards: Flashcard[],
  cardStatus: CardStatus[],
  reviewHistory: ReviewHistory[],
  stats: Stats
): void => {
  saveToLocalStorage(STORAGE_KEYS.FLASHCARDS, flashcards);
  saveToLocalStorage(STORAGE_KEYS.CARD_STATUS, cardStatus);
  saveToLocalStorage(STORAGE_KEYS.REVIEW_HISTORY, reviewHistory);
  saveToLocalStorage(STORAGE_KEYS.STATS, stats);
};

/**
 * Load all flashcard app data from localStorage
 */
export const loadFlashcardAppData = (): {
  flashcards: Flashcard[];
  cardStatus: CardStatus[];
  reviewHistory: ReviewHistory[];
  stats: Stats;
} | null => {
  try {
    const flashcards = getFromLocalStorage<Flashcard[]>(STORAGE_KEYS.FLASHCARDS, []);
    const cardStatus = getFromLocalStorage<CardStatus[]>(STORAGE_KEYS.CARD_STATUS, []);
    const reviewHistory = getFromLocalStorage<ReviewHistory[]>(STORAGE_KEYS.REVIEW_HISTORY, []);
    const stats = getFromLocalStorage<Stats>(STORAGE_KEYS.STATS, {
      totalReviews: 0,
      knownCount: 0,
      unknownCount: 0,
      reviewsByDate: {}
    });
    
    return {
      flashcards,
      cardStatus,
      reviewHistory,
      stats
    };
  } catch (error) {
    console.error("Error loading flashcard app data:", error);
    return null;
  }
};

/**
 * Clear all flashcard app data from localStorage
 */
export const clearFlashcardAppData = (): void => {
  removeFromLocalStorage(STORAGE_KEYS.FLASHCARDS);
  removeFromLocalStorage(STORAGE_KEYS.CARD_STATUS);
  removeFromLocalStorage(STORAGE_KEYS.REVIEW_HISTORY);
  removeFromLocalStorage(STORAGE_KEYS.STATS);
};