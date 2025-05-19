import { CardStatus } from '../types';

// Constants for the SM-2 algorithm
const MIN_EASE_FACTOR = 1.3;
const MAX_EASE_FACTOR = 2.5;
const MIN_INTERVAL = 1; // 1 day
const INCORRECT_INTERVAL = 0.00069; // About 1 minute in days (for testing purposes)

/**
 * Implements a modified version of the SuperMemo SM-2 algorithm
 * to calculate the next review date for a flashcard
 */
export const calculateNextReview = (
  currentStatus: CardStatus,
  isKnown: boolean
): CardStatus => {
  let { easeFactor, reviewCount, consecutiveCorrect, dueDate } = currentStatus;
  const intervalDays = isKnown ? calculateInterval(reviewCount, consecutiveCorrect, easeFactor) : INCORRECT_INTERVAL;
  
  // Update ease factor based on performance
  if (isKnown) {
    // Increase ease factor for correct answers
    easeFactor = Math.min(easeFactor + 0.1, MAX_EASE_FACTOR);
    consecutiveCorrect++;
  } else {
    // Decrease ease factor for incorrect answers
    easeFactor = Math.max(easeFactor - 0.2, MIN_EASE_FACTOR);
    consecutiveCorrect = 0;
  }
  
  reviewCount++;
  
  // Calculate next review date in milliseconds
  const nextDueDate = Date.now() + Math.floor(intervalDays * 24 * 60 * 60 * 1000);
  
  return {
    ...currentStatus,
    known: isKnown,
    dueDate: nextDueDate,
    easeFactor,
    reviewCount,
    consecutiveCorrect
  };
};

/**
 * Calculate interval in days before next review
 */
function calculateInterval(reviewCount: number, consecutiveCorrect: number, easeFactor: number): number {
  if (reviewCount === 0) return MIN_INTERVAL;
  if (reviewCount === 1) return 1;
  if (reviewCount === 2) return 3;
  
  // For subsequent reviews
  const lastInterval = getLastInterval(reviewCount, consecutiveCorrect);
  return lastInterval * easeFactor;
}

/**
 * Get the last interval based on review count and consecutive correct answers
 */
function getLastInterval(reviewCount: number, consecutiveCorrect: number): number {
  if (reviewCount <= 2) return 1;
  
  // Fibonacci-like progression for interval growth
  if (consecutiveCorrect === 1) return 1;
  if (consecutiveCorrect === 2) return 3;
  if (consecutiveCorrect === 3) return 5;
  if (consecutiveCorrect === 4) return 8;
  if (consecutiveCorrect === 5) return 13;
  
  // For longer streaks, grow more aggressively
  return 21 * (consecutiveCorrect - 5);
}