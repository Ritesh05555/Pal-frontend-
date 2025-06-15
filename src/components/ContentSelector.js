import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTheme } from '../utils/auth';

function ContentSelector({ setSelectedCategory, user }) {
    const [showWelcome, setShowWelcome] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/' && !localStorage.getItem('welcomeShown')) {
            const timer = setTimeout(() => {
                setShowWelcome(false);
                localStorage.setItem('welcomeShown', 'true');
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setShowWelcome(false);
        }
    }, [location.pathname]);

    const handleSelect = (category) => {
        setSelectedCategory(category);
        localStorage.setItem('selectedCategory', category);
        navigate(`/${category}`);
    };

    const categories = [
        { name: 'Poem', icon: 'feather' },
        { name: 'Shayari', icon: 'pen' },
        { name: 'Blog', icon: 'book' },
        { name: 'Story', icon: 'scroll' },
    ];

    return (
        <div className={`content-selector ${getTheme()}`}>
            {showWelcome && (
                <div className="welcome-message">
                    Welcome {user?.name.split(' ')[0]}!
                </div>
            )}
            {!showWelcome && (
                <div className="advanced-content-container">
                    <h2 className="category-title">Explore Your Creativity</h2>
                    <div className="category-carousel">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="category-card"
                                onClick={() => handleSelect(category.name.toLowerCase())}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <FontAwesomeIcon icon={category.icon} className="category-icon" />
                                <span className="category-name">{category.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContentSelector;