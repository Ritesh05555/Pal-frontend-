import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setTheme } from '../utils/auth';

function Navbar({ onLogout, isDarkMode, setIsDarkMode, user, navigate }) {
    return (
        <nav className="navbar">
            <button onClick={() => { setIsDarkMode(!isDarkMode); setTheme(!isDarkMode ? 'dark' : 'light'); }} className="mode-btn">
                <FontAwesomeIcon icon={isDarkMode ? 'sun' : 'moon'} />
            </button>
            <h1 className="navbar-title">AAPKA PAL</h1>
            {user && (
                <div className="profile-section" onClick={() => navigate('/profile')}>
                    <img
                        src={user.profilePic?.startsWith('http') ? user.profilePic : user.profilePic ? `https://pal-backend-tooi.onrender.com${user.profilePic}` : 'https://pal-backend-tooi.onrender.com/byde.png'}
                        alt="Profile"
                        className="profile-img"
                        onError={(e) => console.log('Profile image load error in Navbar:', e.target.src, e)}
                    />
                </div>
            )}
        </nav>
    );
}

export default Navbar;