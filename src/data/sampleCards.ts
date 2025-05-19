// filepath: /Users/kusratho/Documents/Playground/Learning/spaced-repetition-flashcards/src/data/sampleCards.ts
import { v4 as uuidv4 } from 'uuid';
import { Flashcard } from '../types';


const createCard = (front: string, back: string): Flashcard => ({
  id: uuidv4(),
  front,
  back,
  createdAt: Date.now(),
});

export const sampleCards: Flashcard[] = [
  createCard(
    "What fruit is known as the 'king of fruits' in Southeast Asia?",
    "Durian"
  ),
  createCard(
    "What is the largest planet in our solar system?",
    "Jupiter"
  ),
  createCard(
    "Who wrote 'Romeo and Juliet'?",
    "William Shakespeare"
  ),
  createCard(
    "What is the chemical symbol for water?",
    "H₂O"
  ),
  createCard(
    "What year did the Titanic sink?",
    "1912"
  ),
  createCard(
    "What is the powerhouse of the cell?",
    "Mitochondria"
  ),
  createCard(
    "What is JavaScript's typeof null?",
    "object"
  ),
  createCard(
    "What React hook manages state in functional components?",
    "useState"
  ),
  createCard(
    "What does CSS stand for?",
    "Cascading Style Sheets"
  ),
  createCard(
    "What is the Big O notation for binary search?",
    "O(log n)"
  ),
];
