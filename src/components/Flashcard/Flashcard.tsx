import React from 'react';
import { motion } from 'framer-motion';
import FramerFlipAnimation from './FlipAnimation';
import FlashcardActions from './FlashcardActions';
import { useFlashcardContext } from '../../context/FlashcardContext';
import { Flashcard as FlashcardType } from '../../types';

interface FlashcardProps {
  card: FlashcardType;
}

const Flashcard: React.FC<FlashcardProps> = ({ card }) => {
  const { 
    isFlipped, 
    flipCard, 
    reviewCard 
  } = useFlashcardContext();

  const handleKnow = () => {
    if (isFlipped) {
      reviewCard(card.id, true);
    }
  };

  const handleDontKnow = () => {
    if (isFlipped) {
      reviewCard(card.id, false);
    }
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Card number indicator */}
      <div className="flex justify-center mb-2">
        <span className="px-4 py-1 bg-white bg-opacity-70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 shadow-sm border border-gray-100">
          Card #{card.id.substring(0, 4)}
        </span>
      </div>

      {/* Main flashcard */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-card p-8 border border-gray-100">
        <div 
          className="cursor-pointer"
          onClick={() => !isFlipped && flipCard()}
        >
          <FramerFlipAnimation
            isFlipped={isFlipped}
            front={
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-50 text-primary-500 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-display font-semibold text-gray-800 mb-3">Question</div>
                <div className="mt-4 text-2xl font-bold text-gray-900 bg-white p-6 rounded-xl shadow-inner-soft border border-gray-100">{card.front}</div>
              </div>
            }
            back={
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary-50 text-secondary-500 mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="text-2xl font-display font-semibold text-gray-800 mb-3">Answer</div>
                <div className="mt-4 text-2xl font-bold text-gray-900 bg-white p-6 rounded-xl shadow-inner-soft border border-gray-100">{card.back}</div>
              </div>
            }
          />
        </div>

        <FlashcardActions 
          isFlipped={isFlipped}
          onFlip={flipCard}
          onKnow={handleKnow}
          onDontKnow={handleDontKnow}
          canAnswer={isFlipped}
        />

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="px-4 py-2 bg-gray-50 rounded-full text-xs font-medium text-gray-500 border border-gray-200 flex items-center justify-center w-fit mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Tap card to flip
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Flashcard;