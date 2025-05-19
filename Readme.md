# MemoryMaster: Spaced Repetition Flashcard App

<div align="center">
  <h3>Remember more. Study less.</h3>
</div>

MemoryMaster is an elegant spaced repetition flashcard application designed to optimize your learning experience. Built with React, TypeScript, and Vite, the app uses scientifically-proven spaced repetition techniques to help you retain information more efficiently.

## ✨ Features

- **Beautiful Interactive Flashcards** - Smooth flip animations and a clean UI
- **Smart Spaced Repetition Algorithm** - Based on the proven SM-2 algorithm
- **Adaptive Learning Schedule** - Cards you know well appear less frequently 
- **Comprehensive Dashboard** - Track your progress with visual analytics
- **Responsive Design** - Works on desktop and mobile devices
- **Offline Functionality** - All data stored locally in your browser

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/kushalr7/spaced-repetition-flashcards.git
cd spaced-repetition-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🧠 How Spaced Repetition Works

The app uses a modified version of the SuperMemo SM-2 algorithm to determine the optimal intervals between card reviews:

1. **Review a card** - View the question, try to recall the answer
2. **Rate your recall** - Mark the card as "Known" or "Still Learning"
3. **Smart scheduling** - The algorithm schedules the next review based on your performance
4. **Efficient learning** - Cards you know well appear less frequently, while challenging cards show up more often

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Storage**: LocalStorage

## 📊 Project Structure

```
spaced-repetition-app/
├── src/
│   ├── components/           # UI components
│   │   ├── Flashcard/        # Flashcard-related components
│   │   ├── Dashboard/        # Analytics and statistics
│   │   ├── Review/           # Review session components
│   │   └── Layout/           # App layout components
│   ├── context/              # React context providers
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility and algorithm functions
│   ├── types/                # TypeScript type definitions
│   ├── services/             # Storage and API services
│   └── data/                 # Sample data
└── public/                   # Static assets
```

## 🔮 Future Enhancements

- User accounts and cloud synchronization
- Customizable card categories and tags
- Import/export functionality
- Mobile application
- Timed practice sessions
- Gamification features

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/kushalr7/spaced-repetition-flashcards)
- [X/Twitter](https://x.com/kushal_r7)

---

<div align="center">
  © 2023 MemoryMaster. Built with 💙 by Kushal R.
</div>
