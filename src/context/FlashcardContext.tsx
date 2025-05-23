import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { calculateNextReview } from '../utils/spacedRepetitionAlgorithm';
import { Flashcard, FlashcardContextType, CardStatus, ReviewHistory, Stats } from '../types';
import { sampleCards } from '../data/sampleCards';

const STORAGE_KEY = 'flashcard-app-data';

// Initial Stats
const initialStats: Stats = {
  totalReviews: 0,
  knownCount: 0,
  unknownCount: 0,
  reviewsByDate: {}
};

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export const FlashcardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [cardStatus, setCardStatus] = useState<CardStatus[]>([]);
  const [reviewHistory, setReviewHistory] = useState<ReviewHistory[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState<Stats>(initialStats);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    // Always use the latest sample cards from the code
    // This ensures new deployments with updated cards are reflected
    setFlashcards(sampleCards);
    
    if (savedData) {
      const { cardStatus, reviewHistory, stats } = JSON.parse(savedData);
      // Re-use existing card status for any matching card IDs
      // Create default status for any new cards from sample data
      const updatedCardStatus = sampleCards.map(card => {
        const existingStatus = cardStatus.find((status: CardStatus) => status.cardId === card.id);
        if (existingStatus) {
          return existingStatus;
        }
        return {
          cardId: card.id,
          known: false,
          dueDate: Date.now(),
          easeFactor: 2.5,
          reviewCount: 0,
          consecutiveCorrect: 0
        };
      });
      
      setCardStatus(updatedCardStatus);
      setReviewHistory(reviewHistory);
      setStats(stats);
    } else {
      // Initialize with default status for all sample cards if no saved data
      setCardStatus(sampleCards.map(card => ({
        cardId: card.id,
        known: false,
        dueDate: Date.now(),
        easeFactor: 2.5,
        reviewCount: 0,
        consecutiveCorrect: 0
      })));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (flashcards.length > 0) {
      const dataToSave = {
        flashcards,
        cardStatus,
        reviewHistory,
        stats
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [flashcards, cardStatus, reviewHistory, stats]);

  const addFlashcard = (flashcardData: Omit<Flashcard, 'id' | 'createdAt'>) => {
    const newCard: Flashcard = {
      ...flashcardData,
      id: uuidv4(),
      createdAt: Date.now()
    };

    const newStatus: CardStatus = {
      cardId: newCard.id,
      known: false,
      dueDate: Date.now(),
      easeFactor: 2.5,
      reviewCount: 0,
      consecutiveCorrect: 0
    };

    setFlashcards(prev => [...prev, newCard]);
    setCardStatus(prev => [...prev, newStatus]);
  };

  const updateFlashcard = (updatedCard: Flashcard) => {
    setFlashcards(prev =>
      prev.map(card => card.id === updatedCard.id ? updatedCard : card)
    );
  };

  const deleteFlashcard = (id: string) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
    setCardStatus(prev => prev.filter(status => status.cardId !== id));
    setReviewHistory(prev => prev.filter(review => review.cardId !== id));
    
    // If we delete the current card, adjust the index
    if (currentCardIndex >= flashcards.length - 1) {
      setCurrentCardIndex(Math.max(0, flashcards.length - 2));
    }
  };

  // Record a review and update scheduling
  const reviewCard = (cardId: string, known: boolean) => {
    const now = Date.now();
    const dateKey = new Date(now).toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    // Update review history
    const newReview: ReviewHistory = {
      cardId,
      date: now,
      known
    };
    setReviewHistory(prev => [...prev, newReview]);
    
    // Find existing card status
    const existingStatus = cardStatus.find(status => status.cardId === cardId);
    
    if (existingStatus) {
      // Calculate new scheduling based on performance
      const updatedStatus = calculateNextReview(existingStatus, known);
      
      // Update card status
      setCardStatus(prev => 
        prev.map(status => status.cardId === cardId ? updatedStatus : status)
      );
      
      // Update card's lastReviewed timestamp
      setFlashcards(prev =>
        prev.map(card => card.id === cardId ? { ...card, lastReviewed: now } : card)
      );
      
      // Update stats
      setStats(prev => {
        const dayStats = prev.reviewsByDate[dateKey] || { known: 0, unknown: 0 };
        return {
          totalReviews: prev.totalReviews + 1,
          knownCount: prev.knownCount + (known ? 1 : 0),
          unknownCount: prev.unknownCount + (known ? 0 : 1),
          reviewsByDate: {
            ...prev.reviewsByDate,
            [dateKey]: {
              known: dayStats.known + (known ? 1 : 0),
              unknown: dayStats.unknown + (known ? 0 : 1)
            }
          }
        };
      });
    }
    
    // Reset flip state and move to next card
    setIsFlipped(false);
    goToNextCard();
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const goToNextCard = () => {
    // Always move to the next card when requested
    // This ensures cards are shown in sequence during a review session
    const nextIndex = (currentCardIndex + 1) % flashcards.length;
    setCurrentCardIndex(nextIndex);
    
    // Note: We've simplified this function to always show cards in sequence
    // This ensures you don't get stuck on the same card repeatedly
    // The spaced repetition algorithm still works in the background
    // to track which cards you know and don't know
  };

  return (
    <FlashcardContext.Provider 
      value={{ 
        flashcards, 
        cardStatus, 
        reviewHistory,
        currentCardIndex,
        isFlipped,
        stats,
        addFlashcard, 
        updateFlashcard, 
        deleteFlashcard,
        reviewCard,
        flipCard,
        goToNextCard
      }}
    >
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcardContext = () => {
  const context = useContext(FlashcardContext);
  if (context === undefined) {
    throw new Error('useFlashcardContext must be used within a FlashcardProvider');
  }
  return context;
};