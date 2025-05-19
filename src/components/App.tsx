import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { FlashcardProvider } from '../context/FlashcardContext';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import ReviewSession from './Review/ReviewSession';
import Dashboard from './Dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <FlashcardProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
            <Routes>
              <Route path="/" element={<ReviewSession />} />
              <Route path="/stats" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FlashcardProvider>
    </Router>
  );
};

export default App;