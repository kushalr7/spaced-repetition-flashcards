import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipAnimationProps {
  isFlipped: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  children?: React.ReactNode; // Make children optional
}

const FlipAnimation: React.FC<FlipAnimationProps> = ({ isFlipped, front, back, children }) => {
  return (
    <div className="flip-card w-full h-64 relative">
      <div className={`flip-card-inner w-full h-full ${isFlipped ? 'flip-card-flipped' : ''}`}>
        <div className="flip-card-front absolute w-full h-full flex items-center justify-center rounded-lg shadow-md bg-white p-6">
          {front}
        </div>
        <div className="flip-card-back absolute w-full h-full flex items-center justify-center rounded-lg shadow-md bg-white p-6" style={{ transform: 'rotateY(180deg)' }}>
          {back}
        </div>
      </div>
      {children}
    </div>
  );
};

// Alternative implementation using Framer Motion
export const FramerFlipAnimation: React.FC<FlipAnimationProps> = ({ isFlipped, front, back }) => {
  return (
    <div className="relative w-full h-64">
      <AnimatePresence initial={false} mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            className="absolute w-full h-full rounded-lg shadow-md bg-white p-6 flex items-center justify-center"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {front}
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="absolute w-full h-full rounded-lg shadow-md bg-white p-6 flex items-center justify-center"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -90 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {back}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FramerFlipAnimation;