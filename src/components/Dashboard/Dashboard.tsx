import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useFlashcardContext } from '../../context/FlashcardContext';
import StatsGraph from './StatsGraph';
import ProgressChart from './ProgressChart';

const Dashboard: React.FC = () => {
    const { stats, flashcards, reviewHistory, cardStatus } = useFlashcardContext();
    
    // Calculate accuracy percentage
    const accuracy = stats.totalReviews > 0 
        ? Math.round((stats.knownCount / stats.totalReviews) * 100) 
        : 0;
    
    // Calculate how many cards are due today
    const now = Date.now();
    const dueCards = cardStatus.filter(card => card.dueDate <= now).length;
    
    // Calculate mastered cards (cards reviewed at least 5 times with 80%+ accuracy)
    const cardIds = flashcards.map(card => card.id);
    const cardStats = cardIds.map(id => {
        const reviews = reviewHistory.filter(r => r.cardId === id);
        const correct = reviews.filter(r => r.known).length;
        const total = reviews.length;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;
        return { id, reviews: total, accuracy };
    });
    
    const masteredCards = cardStats.filter(card => card.reviews >= 5 && card.accuracy >= 80).length;
    
    // Prepare data for review trends chart
    const reviewTrends = useMemo(() => {
        const last7Days = [...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        }).reverse();
        
        return last7Days.map(date => {
            const dayStats = stats.reviewsByDate[date] || { known: 0, unknown: 0 };
            return {
                date: date.split('-').slice(1).join('/'), // Format: MM/DD
                correct: dayStats.known,
                incorrect: dayStats.unknown
            };
        });
    }, [stats.reviewsByDate]);

    // Animation variants for staggered children animations
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 12
            } 
        }
    };
    
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-5xl mx-auto px-4 py-8"
        >
            {/* Hero Heading with custom gradient */}
            <motion.div 
                className="mb-10 text-center" 
                variants={itemVariants}
            >
                <h1 className="hero-heading mb-2">Knowledge Dashboard</h1>
                <p className="text-secondary-600 text-lg">Track your progress and optimize your learning</p>
            </motion.div>
            
            {/* Stats Overview Cards */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
                variants={containerVariants}
            >
                <motion.div 
                    className="stat-card"
                    variants={itemVariants}
                >
                    <span className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Total Reviews</span>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-800">{stats.totalReviews}</span>
                        <span className="ml-2 text-sm font-medium text-primary-600">sessions</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Lifetime learning events</div>
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-primary-50 text-primary-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    </div>
                </motion.div>
                
                <motion.div 
                    className="stat-card"
                    variants={itemVariants}
                >
                    <span className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Recall Accuracy</span>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-800">{accuracy}%</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Overall knowledge retention</div>
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-secondary-50 text-secondary-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </motion.div>
                
                <motion.div 
                    className="stat-card"
                    variants={itemVariants}
                >
                    <span className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Due Today</span>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-800">{dueCards}</span>
                        <span className="ml-2 text-sm font-medium text-accent-600">cards</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Ready for review now</div>
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-accent-50 text-accent-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    </div>
                </motion.div>
                
                <motion.div 
                    className="stat-card"
                    variants={itemVariants}
                >
                    <span className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-1">Mastered</span>
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-800">{masteredCards}</span>
                        <span className="ml-2 text-sm font-medium text-green-600">cards</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Long-term memory</div>
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-green-50 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                </motion.div>
            </motion.div>
            
            {/* Two column layout for charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Review Trends Chart */}
                <motion.div 
                    className="card p-6 lg:p-8"
                    variants={itemVariants}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                        <span className="w-1.5 h-5 bg-primary-600 rounded-full mr-3 inline-block"></span>
                        Review Trends
                    </h2>
                    <div className="h-72">
                        <StatsGraph data={reviewTrends} />
                    </div>
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        Reviews completed over the last 7 days
                    </div>
                </motion.div>
                
                {/* Progress Distribution Chart */}
                <motion.div 
                    className="card p-6 lg:p-8"
                    variants={itemVariants}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                        <span className="w-1.5 h-5 bg-secondary-600 rounded-full mr-3 inline-block"></span>
                        Learning Progress
                    </h2>
                    <div className="h-72">
                        <ProgressChart 
                            total={flashcards.length}
                            mastered={masteredCards}
                            learning={flashcards.length - masteredCards - dueCards}
                            due={dueCards}
                        />
                    </div>
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        Distribution of card mastery levels
                    </div>
                </motion.div>
            </div>
            
            {/* Recent Activity or Empty state */}
            {flashcards.length === 0 ? (
                <motion.div 
                    variants={itemVariants}
                    className="mt-8 glass-panel rounded-2xl p-10 text-center"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No flashcard data available yet</h3>
                    <p className="text-gray-600 mb-6">Start reviewing to see your learning statistics!</p>
                    <a href="/" className="btn btn-primary">Start Reviewing</a>
                </motion.div>
            ) : (
                <motion.div 
                    variants={itemVariants}
                    className="mt-8 card"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="w-1.5 h-5 bg-accent-600 rounded-full mr-3 inline-block"></span>
                        Learning Insights
                    </h2>
                    <div className="border-l-2 border-primary-100 pl-4 py-1 mt-4">
                        <p className="text-gray-700">
                            {accuracy > 80 ? 
                                "Great job! Your high accuracy rate shows excellent retention." :
                                "Keep practicing! Regular reviews will help improve your retention rate."
                            }
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Dashboard;