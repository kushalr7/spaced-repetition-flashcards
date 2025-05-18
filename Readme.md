# README.md

# Spaced Repetition Flashcard Engine

This project is a Spaced Repetition Flashcard Engine built with React, utilizing TailwindCSS for styling and Recharts for visualizing review statistics. The application is designed to help users learn and retain information effectively through spaced repetition techniques.

## Features

- **Flashcard Component**: Displays flashcard content with a flip animation.
- **Know / Don’t Know Buttons**: Allows users to indicate their familiarity with the flashcard content.
- **Spaced Repetition Logic**: Implements a custom algorithm to schedule flashcards based on user performance.
- **Review Stats Dashboard**: Visualizes user performance and learning progress with graphs.
- **Persistent Storage**: Utilizes localStorage to save and retrieve flashcard data.

## Project Structure

```
spaced-repetition-flashcards
├── src
│   ├── components
│   │   ├── App.tsx
│   │   ├── Flashcard
│   │   │   ├── Flashcard.tsx
│   │   │   ├── FlashcardActions.tsx
│   │   │   └── FlipAnimation.tsx
│   │   ├── Dashboard
│   │   │   ├── Dashboard.tsx
│   │   │   ├── StatsGraph.tsx
│   │   │   └── ProgressChart.tsx
│   │   └── Layout
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── hooks
│   │   ├── useSpacedRepetition.ts
│   │   └── useLocalStorage.ts
│   ├── utils
│   │   ├── spacedRepetitionAlgorithm.ts
│   │   └── dateUtils.ts
│   ├── types
│   │   └── index.ts
│   ├── context
│   │   └── FlashcardContext.tsx
│   ├── data
│   │   └── sampleCards.ts
│   ├── services
│   │   └── storageService.ts
│   ├── index.tsx
│   └── index.css
├── public
│   └── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd spaced-repetition-flashcards
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

## Usage

- Navigate through the flashcards using the "Know" and "Don’t Know" buttons to indicate your familiarity with the content.
- Review your progress in the dashboard, which displays various statistics and graphs based on your performance.

## Technologies Used

- React
- TypeScript
- TailwindCSS
- Recharts
- LocalStorage

## License

This project is licensed under the MIT License.