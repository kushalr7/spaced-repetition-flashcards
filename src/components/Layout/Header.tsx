import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    const location = useLocation();
    
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <header className="bg-gradient-to-r from-white to-blue-50 border-b border-blue-100/80 relative overflow-hidden z-10 shadow-sm">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-primary-50/50 to-transparent -z-10"></div>
            <div className="absolute left-1/4 -bottom-8 w-24 h-24 rounded-full bg-gradient-to-tr from-primary-400/10 to-secondary-400/10 -z-10"></div>
            
            <div className="container mx-auto px-4 md:px-6 py-5">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center"
                    >
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white mr-3 shadow-glow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <motion.h1 
                                className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-secondary-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                MemoryMaster
                            </motion.h1>
                            <p className="text-sm font-medium text-gray-600">Remember more, study less</p>
                        </div>
                    </motion.div>
                    
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <ul className="flex space-x-8">
                            <li>
                                <Link 
                                    to="/" 
                                    className={`py-2 px-3 rounded-lg font-medium transition-all duration-300 ${isActive('/') 
                                        ? 'text-primary-700 bg-primary-50/60 shadow-inner-soft' 
                                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50/30'}`}
                                >
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Review
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/stats" 
                                    className={`py-2 px-3 rounded-lg font-medium transition-all duration-300 ${isActive('/stats') 
                                        ? 'text-secondary-700 bg-secondary-50/60 shadow-inner-soft' 
                                        : 'text-gray-600 hover:text-secondary-600 hover:bg-secondary-50/30'}`}
                                >
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Stats
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                </div>
            </div>
        </header>
    );
};

export default Header;