import React from 'react';
import { motion } from 'framer-motion';
import Flashcard from '../Flashcard/Flashcard';
import { useFlashcardContext } from '../../context/FlashcardContext';

const ReviewSession: React.FC = () => {
  const { 
    flashcards, 
    currentCardIndex, 
    cardStatus,
    stats
  } = useFlashcardContext();

  if (flashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-gray-700">No Flashcards</h2>
        <p className="text-gray-600 mt-2">There are no flashcards to review</p>
      </div>
    );
  }

  const currentCard = flashcards[currentCardIndex];
  const currentCardStatus = cardStatus.find(s => s.cardId === currentCard.id);
  
  // Calculate progress
  const totalCards = flashcards.length;
  const reviewedToday = stats.reviewsByDate[new Date().toISOString().split('T')[0]]?.known || 0;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-500">Card {currentCardIndex + 1} of {totalCards}</h3>
          <div className="text-sm font-medium text-gray-500">
            {reviewedToday} reviewed today
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${(currentCardIndex / totalCards) * 100}%` }}
          ></div>
        </div>
      </div>

      <Flashcard card={currentCard} />

      {currentCardStatus && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Reviews: {currentCardStatus.reviewCount} | 
          {currentCardStatus.known ? ' Last result: Knew it' : ' Last result: Didn\'t know'}
        </div>
      )}
    </motion.div>
  );
};

export default ReviewSession;
