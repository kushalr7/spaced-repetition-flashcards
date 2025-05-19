import { useState, useEffect } from 'react';
import { Flashcard, CardStatus, ReviewHistory } from '../types';
import { calculateNextReview } from '../utils/spacedRepetitionAlgorithm';
import { getDateKey } from '../utils/dateUtils';

/**
 * Custom hook for managing spaced repetition logic
 */
interface UseSpacedRepetitionProps {
  flashcards: Flashcard[];
  cardStatus: CardStatus[];
  reviewHistory: ReviewHistory[];
}

interface UseSpacedRepetitionReturn {
  dueCards: Flashcard[];
  todayCount: number;
  reviewCard: (cardId: string, known: boolean) => CardStatus;
  getNextDueDate: (cardId: string) => string | null;
  getCardStatus: (cardId: string) => CardStatus | undefined;
  getCardPerformance: (cardId: string) => { 
    total: number;
    correct: number;
    accuracy: number;
  };
}

const useSpacedRepetition = ({
  flashcards,
  cardStatus,
  reviewHistory
}: UseSpacedRepetitionProps): UseSpacedRepetitionReturn => {
  const [dueCards, setDueCards] = useState<Flashcard[]>([]);
  const [todayCount, setTodayCount] = useState(0);

  // Calculate due cards whenever flashcards or statuses change
  useEffect(() => {
    if (flashcards.length === 0 || cardStatus.length === 0) return;
    
    const now = Date.now();
    const dueCardIds = cardStatus
      .filter(status => status.dueDate <= now)
      .map(status => status.cardId);
    
    const due = flashcards.filter(card => dueCardIds.includes(card.id));
    setDueCards(due);
    
    // Count reviews from today
    const todayKey = getDateKey(now);
    const todayReviews = reviewHistory.filter(
      review => getDateKey(review.date) === todayKey
    ).length;
    
    setTodayCount(todayReviews);
  }, [flashcards, cardStatus, reviewHistory]);

  // Process a card review and calculate its next due date
  const reviewCard = (cardId: string, known: boolean): CardStatus => {
    const status = cardStatus.find(s => s.cardId === cardId);
    
    if (!status) {
      throw new Error(`No status found for card ID: ${cardId}`);
    }
    
    return calculateNextReview(status, known);
  };

  // Get the formatted next due date for a card
  const getNextDueDate = (cardId: string): string | null => {
    const status = cardStatus.find(s => s.cardId === cardId);
    
    if (!status) return null;
    
    const date = new Date(status.dueDate);
    return date.toLocaleDateString();
  };

  // Get the status for a specific card
  const getCardStatus = (cardId: string): CardStatus | undefined => {
    return cardStatus.find(s => s.cardId === cardId);
  };

  // Get performance metrics for a specific card
  const getCardPerformance = (cardId: string) => {
    const cardReviews = reviewHistory.filter(r => r.cardId === cardId);
    const total = cardReviews.length;
    const correct = cardReviews.filter(r => r.known).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    return { total, correct, accuracy };
  };

  return {
    dueCards,
    todayCount,
    reviewCard,
    getNextDueDate,
    getCardStatus,
    getCardPerformance
  };
};

export default useSpacedRepetition;