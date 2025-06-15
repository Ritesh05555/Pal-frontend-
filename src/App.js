import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './components/AppContent';
import { getTheme } from './utils/auth';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [user, setUser] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
    const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || '');

    return (
        <BrowserRouter>
            <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
                <AppContent
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    showSplash={showSplash}
                    setShowSplash={setShowSplash}
                    user={user}
                    setUser={setUser}
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
        </BrowserRouter>
    );
}

export default App;