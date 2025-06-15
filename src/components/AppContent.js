import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import ContentSelector from './ContentSelector';
import ContentFeed from './ContentFeed';
import ProfilePage from './ProfilePage';
import SplashScreen from './SplashScreen';
import { setTheme, getToken, setToken } from '../utils/auth';

function AppContent({ isAuthenticated, setIsAuthenticated, showSplash, setShowSplash, user, setUser, isDarkMode, setIsDarkMode, selectedCategory, setSelectedCategory }) {
    const navigate = useNavigate();

    useEffect(() => {
        setTheme(isDarkMode ? 'dark' : 'light');
        if (isAuthenticated) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get('https://pal-backend-tooi.onrender.com/api/auth/profile', {
                        headers: { Authorization: `Bearer ${getToken()}` },
                    });
                    setUser(response.data.user);
                } catch (err) {
                    console.error('Fetch user error:', err);
                    setIsAuthenticated(false);
                    setToken(null);
                    setUser(null);
                    navigate('/login');
                }
            };
            fetchUser();
        }
    }, [isAuthenticated, isDarkMode, navigate]);

    const handleLogin = (token) => {
        setToken(token);
        setIsAuthenticated(true);
        setShowSplash(false);
    };

    const handleLogout = () => {
        setToken(null);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('selectedCategory');
        localStorage.removeItem('welcomeShown');
        navigate('/login');
    };

    if (showSplash) return <SplashScreen setShowSplash={setShowSplash} />;

    return (
        <>
            {!isAuthenticated ? (
                <div className="auth-container">
                    <Routes>
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                        <Route path="*" element={<Login onLogin={handleLogin} />} />
                    </Routes>
                </div>
            ) : (
                <>
                    <Navbar onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} navigate={navigate} />
                    <Routes>
                        <Route path="/" element={<ContentSelector setSelectedCategory={setSelectedCategory} user={user} />} />
                        <Route path="/:category" element={<ContentFeed category={selectedCategory} />} />
                        <Route path="/profile" element={<ProfilePage setIsAuthenticated={setIsAuthenticated} selectedCategory={selectedCategory} />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                    </Routes>
                    <div className="toast success"></div>
                    <div className="toast error"></div>
                </>
            )}
        </>
    );
}

export default AppContent;