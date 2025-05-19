import React from 'react';
import { motion } from 'framer-motion';

interface FlashcardActionsProps {
  onKnow: () => void;
  onDontKnow: () => void;
  onFlip: () => void;
  isFlipped: boolean;
  canAnswer: boolean;
}

const FlashcardActions: React.FC<FlashcardActionsProps> = ({ 
  onKnow, 
  onDontKnow, 
  onFlip, 
  isFlipped,
  canAnswer = true 
}) => {
  // Simple handlers that only work when the card is flipped (showing answer)
  const handleKnow = () => {
    if (isFlipped) {
      onKnow(); // Only allow when card is flipped showing the answer
    }
  };

  const handleDontKnow = () => {
    if (isFlipped) {
      onDontKnow(); // Only allow when card is flipped showing the answer
    }
  };

  return (
    <div className="mt-10">
      {/* Flip button */}
      <div className="flex justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn px-6 py-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-xl text-gray-700 hover:text-primary-600 font-medium transition-all duration-300"
          onClick={onFlip}
        >
          <span className="flex items-center">
            {isFlipped ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                View Question
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Reveal Answer
              </>
            )}
          </span>
        </motion.button>
      </div>
      
      {/* Know/Don't Know buttons - Only enabled when card is flipped */}
      <div className="grid grid-cols-2 gap-6">
        <motion.button
          whileHover={isFlipped ? { scale: 1.03 } : undefined}
          whileTap={isFlipped ? { scale: 0.97 } : undefined}
          className={`btn btn-success relative overflow-hidden group ${!isFlipped ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={handleKnow}
          disabled={!isFlipped}
        >
          <div className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <div className="flex items-center justify-center relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">I Know This</span>
          </div>
        </motion.button>
        
        <motion.button
          whileHover={isFlipped ? { scale: 1.03 } : undefined}
          whileTap={isFlipped ? { scale: 0.97 } : undefined}
          className={`btn btn-danger relative overflow-hidden group ${!isFlipped ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={handleDontKnow}
          disabled={!isFlipped}
        >
          <div className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <div className="flex items-center justify-center relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Still Learning</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default FlashcardActions;