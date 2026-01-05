// import React, { useState } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import AppContent from './components/AppContent';
// import { getTheme } from './utils/auth';

// function App() {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [showSplash, setShowSplash] = useState(true);
//     const [user, setUser] = useState(null);
//     const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
//     const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || '');

//     return (
//         <BrowserRouter>
//             <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
//                 <AppContent
//                     isAuthenticated={isAuthenticated}
//                     setIsAuthenticated={setIsAuthenticated}
//                     showSplash={showSplash}
//                     setShowSplash={setShowSplash}
//                     user={user}
//                     setUser={setUser}
//                     isDarkMode={isDarkMode}
//                     setIsDarkMode={setIsDarkMode}
//                     selectedCategory={selectedCategory}
//                     setSelectedCategory={setSelectedCategory}
//                 />
//             </div>
//         </BrowserRouter>
//     );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

// FontAwesome setup
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas);

// Inline token and theme management
const getToken = () => localStorage.getItem('token');
const setToken = (token) => (token ? localStorage.setItem('token', token) : localStorage.removeItem('token'));
const getTheme = () => localStorage.getItem('theme') || 'light';
const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
};

function SplashScreen({ setShowSplash }) {
    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 3000);
        return () => clearTimeout(timer);
    }, [setShowSplash]);

    return (
        <div className="splash-screen">
            <h1>AAPKA PAL</h1>
        </div>
    );
}

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post('https://pal-backend-tooi.onrender.com/api/auth/login', { email, password }, {
                headers: { 'Content-Type': 'application/json' },
            });
            setToken(response.data.token);
            onLogin(response.data.token);
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid credentials';
            setError(errorMessage === 'User not found' ? 'User not found' : errorMessage === 'Password mismatch' ? 'Password mismatch' : 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login</h2>
                <div className="error-alert">{error}</div>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
                    <button type="submit" disabled={loading}>
                        <FontAwesomeIcon icon="sign-in-alt" /> {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="signup-link">
                    New User? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Create an account</a>
                </p>
            </div>
        </div>
    );
}

function Signup({ onLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
        setPreview(file ? URL.createObjectURL(file) : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (profilePic) formData.append('profilePic', profilePic);

        try {
            const response = await axios.post('https://pal-backend-tooi.onrender.com/api/auth/signup', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccess('Account created, redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Signup</h2>
                {error && <div className="toast error">{error}</div>}
                {success && <div className="toast success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required disabled={loading} />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required disabled={loading} />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required disabled={loading} />
                    <div>
                        <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
                        <small style={{ color: '#888' }}> (Optional)</small>
                    </div>
                    {preview && <img src={preview} alt="Preview" className="profile-preview" />}
                    <button type="submit" disabled={loading}>
                        <FontAwesomeIcon icon="user-plus" /> {loading ? 'Signing up...' : 'Create Account'}
                    </button>
                </form>
                <p className="back-link">
                    <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Back to Login</a>
                </p>
            </div>
        </div>
    );
}

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
        { name: 'Poem', icon: 'feather', color: '#00C4B4' },
        { name: 'Shayari', icon: 'pen', color: '#FF6B6B' },
        { name: 'Blog', icon: 'book', color: '#4ECDC4' },
        { name: 'Story', icon: 'scroll', color: '#45B7D1' },
    ];

    return (
        <div className={`content-selector ${getTheme()}`}>
            {showWelcome && (
                <div className="welcome-message" style={{ animation: 'fadeInOut 3s forwards' }}>
                    Welcome {user?.name.split(' ')[0]}!
                </div>
            )}
            {!showWelcome && (
                <div className="advanced-content-container">
                    <h2 className="category-title">
                        {Array.from("Explore Your Creativity").map((char, index) => (
                            <span key={index}>{char}</span>
                        ))}
                    </h2>
                    <div className="category-carousel">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="category-card"
                                onClick={() => handleSelect(category.name.toLowerCase())}
                                style={{ backgroundColor: category.color, animationDelay: `${index * 0.1}s` }}
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

function ContentFeed({ category }) {
    const [contents, setContents] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [expandedContent, setExpandedContent] = useState(null);
    const [showImageModal, setShowImageModal] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedMood, setSelectedMood] = useState('all');
    const [showMoodDropdown, setShowMoodDropdown] = useState(false);
    const itemsPerPage = 10;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const moods = ['all', 'happy', 'sad', 'love', 'anxious', 'calm', 'thoughtful'];

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            try {
                const response = await axios.get('https://pal-backend-tooi.onrender.com/api/auth/profile', {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setUser(response.data.user);
            } catch (err) {
                console.error('Fetch user error:', err);
                navigate('/login');
            }
        };

        const fetchContents = async () => {
            try {
                const response = await axios.get(`https://pal-backend-tooi.onrender.com/api/content?type=${category}${selectedMood !== 'all' ? `&mood=${selectedMood}` : ''}`, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                // Ensure only content matching the selected mood is set
                const filteredContents = selectedMood === 'all'
                    ? response.data
                    : response.data.filter(content => content.mood.toLowerCase() === selectedMood.toLowerCase());
                setContents(filteredContents);
            } catch (err) {
                console.error('Fetch contents error:', err);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
        fetchContents();
        setCurrentPage(1);
    }, [category, selectedMood, navigate]);

    const handleLike = async (contentId) => {
        const contentItem = document.querySelector(`[data-content-id="${contentId}"]`);
        if (contentItem) {
            contentItem.classList.add('liked');
            setTimeout(() => contentItem.classList.remove('liked'), 1200);
        }

        setContents(contents.map(content =>
            content._id === contentId
                ? { ...content, likes: [...content.likes, 'user'] }
                : content
        ));

        try {
            await axios.post(`https://pal-backend-tooi.onrender.com/api/content/${contentId}/like`, {}, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            const response = await axios.get(`https://pal-backend-tooi.onrender.com/api/content?type=${category}${selectedMood !== 'all' ? `&mood=${selectedMood}` : ''}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            const filteredContents = selectedMood === 'all'
                ? response.data
                : response.data.filter(content => content.mood.toLowerCase() === selectedMood.toLowerCase());
            setContents(filteredContents);
        } catch (err) {
            console.error('Like error:', err);
            setContents(contents.map(content =>
                content._id === contentId
                    ? { ...content, likes: content.likes.filter(like => like !== 'user') }
                    : content
            ));
        }
    };

    const toggleExpand = (contentId) => {
        setExpandedContent(expandedContent === contentId ? null : contentId);
    };

    const refreshContent = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://pal-backend-tooi.onrender.com/api/content?type=${category}${selectedMood !== 'all' ? `&mood=${selectedMood}` : ''}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            const filteredContents = selectedMood === 'all'
                ? response.data
                : response.data.filter(content => content.mood.toLowerCase() === selectedMood.toLowerCase());
            setContents(filteredContents);
        } catch (err) {
            console.error('Refresh contents error:', err);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const countWords = (text) => text.trim().split(/\s+/).length;

    const totalPages = Math.ceil(contents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentContents = contents.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        setShowMoodDropdown(false);
        setCurrentPage(1);
    };

    return (
        <div className={`content-feed ${getTheme()}`}>
            <div className="mood-filter">
                <button className="mood-filter-btn" onClick={() => setShowMoodDropdown(!showMoodDropdown)}>
                    <FontAwesomeIcon icon="filter" /> Filter by Mood: {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}
                </button>
                {showMoodDropdown && (
                    <div className="mood-dropdown">
                        {moods.map((mood) => (
                            <div
                                key={mood}
                                className="mood-option"
                                onClick={() => handleMoodSelect(mood)}
                            >
                                {mood.charAt(0).toUpperCase() + mood.slice(1)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {loading && <div className="loading-message">{selectedMood !== 'all' ? `Fetching ${selectedMood} mood content...` : 'Content on the way… hold on.'}</div>}
            {!loading && contents.length === 0 && (
                <div className="loading-message">
                    {selectedMood !== 'all' ? `No content available for ${selectedMood} mood` : 'The digital world is empty… time to add your touch!'}
                </div>
            )}
            {!loading && contents.length > 0 && (
                <>
                    {currentContents.map((content) => {
                        const wordCount = countWords(content.body);
                        const shouldShowFull = wordCount <= 60;
                        const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';
                        const showUserName = user && content.user && content.user.name !== user.name;

                        return (
                            <div key={content._id} className={`content-item ${getTheme()}`} data-content-id={content._id}>
                                <div className="content-header">
                                    {showUserName && <h3>{content.user?.name || 'Unknown'}</h3>}
                                </div>
                                {content.title && <h4>{content.title}</h4>}
                                <p>{displayContent}</p>
                                {content.mood && <div className="content-mood">Mood: {content.mood.charAt(0).toUpperCase() + content.mood.slice(1)}</div>}
                                {!shouldShowFull && wordCount > 60 && (
                                    <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
                                        {expandedContent === content._id ? 'Show Less' : 'Read More'}
                                    </button>
                                )}
                                {content.image && (
                                    <img
                                        src={content.image.startsWith('http') ? content.image : `https://pal-backend-tooi.onrender.com${content.image}`}
                                        alt="Content"
                                        className="content-image"
                                        onClick={() => setShowImageModal(content._id)}
                                        onError={(e) => console.log('Image load error:', e.target.src, e)}
                                    />
                                )}
                                <div className="content-footer">
                                    <span>{new Date(content.createdAt).toLocaleString()}</span>
                                    <button onClick={() => handleLike(content._id)}>
                                        <FontAwesomeIcon icon="heart" /> {content.likes.length}
                                    </button>
                                </div>
                                {showImageModal === content._id && content.image && (
                                    <div className="image-modal-overlay" onClick={() => setShowImageModal(null)}>
                                        <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                                            <button className="close-modal-btn" onClick={() => setShowImageModal(null)}>
                                                <FontAwesomeIcon icon="times" />
                                            </button>
                                            <img
                                                src={content.image.startsWith('http') ? content.image : `https://pal-backend-tooi.onrender.com${content.image}`}
                                                alt="Enlarged Content"
                                                className="enlarged-image"
                                                onError={(e) => console.log('Modal image load error:', e.target.src, e)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {contents.length > itemsPerPage && (
                        <div className="pagination">
                            {currentPage > 1 && (
                                <button onClick={handlePrevPage} className="pagination-btn">
                                    <FontAwesomeIcon icon="chevron-left" /> Previous
                                </button>
                            )}
                            {currentPage < totalPages && (
                                <button onClick={handleNextPage} className="pagination-btn">
                                    Next <FontAwesomeIcon icon="chevron-right" />
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
            <button className="bottom-plus" onClick={() => setShowUpload(true)}>
                <FontAwesomeIcon icon="plus" />
            </button>
            {showUpload && <UploadContainer category={category} onClose={() => setShowUpload(false)} onUploadSuccess={refreshContent} />}
        </div>
    );
}

function UploadContainer({ category, onClose, onUploadSuccess }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [mood, setMood] = useState('happy');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('type', category);
        if (title) formData.append('title', title);
        formData.append('body', body);
        if (mood !== 'happy') formData.append('mood', mood);
        if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
        formData.append('isDraft', false);

        try {
            await axios.post('https://pal-backend-tooi.onrender.com/api/content', formData, {
                headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
            });
            setTitle('');
            setBody('');
            setMood('happy');
            setImage(null);
            onClose();
            navigate(`/${category}`);
            if (onUploadSuccess) onUploadSuccess();
            const toastSuccess = document.querySelector('.toast.success');
            if (toastSuccess) {
                toastSuccess.textContent = 'Content uploaded!';
                toastSuccess.classList.add('show');
                setTimeout(() => toastSuccess.classList.remove('show'), 3000);
            }
        } catch (err) {
            console.error('Upload error:', err.response?.data || err.message);
            const toastError = document.querySelector('.toast.error');
            if (toastError) {
                toastError.textContent = 'Upload failed';
                toastError.classList.add('show');
                setTimeout(() => toastError.classList.remove('show'), 3000);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('type', category);
        if (title) formData.append('title', title);
        formData.append('body', body);
        if (mood !== 'happy') formData.append('mood', mood);
        if (image && (category === 'blog' || category === 'story')) formData.append('image', image);
        formData.append('isDraft', true);

        try {
            await axios.post('https://pal-backend-tooi.onrender.com/api/content', formData, {
                headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
            });
            setTitle('');
            setBody('');
            setMood('happy');
            setImage(null);
            onClose();
            navigate('/profile');
            const toastSuccess = document.querySelector('.toast.success');
            if (toastSuccess) {
                toastSuccess.textContent = 'Draft saved!';
                toastSuccess.classList.add('show');
                setTimeout(() => toastSuccess.classList.remove('show'), 3000);
            }
        } catch (err) {
            console.error('Save draft error:', err.response?.data || err.message);
            const toastError = document.querySelector('.toast.error');
            if (toastError) {
                toastError.textContent = 'Save failed';
                toastError.classList.add('show');
                setTimeout(() => toastError.classList.remove('show'), 3000);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-overlay">
            <div className={`upload-container-large ${getTheme()}`}>
                <button className="close-btn" onClick={onClose}>
                    <FontAwesomeIcon icon="times" />
                </button>
                <h2>Upload {category}</h2>
                <form>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title (optional)"
                        disabled={loading}
                    />
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Content"
                        required
                        disabled={loading}
                        style={{ overflowY: 'auto', maxHeight: '300px' }}
                    />
                    <select value={mood} onChange={(e) => setMood(e.target.value)} disabled={loading}>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="love">Love</option>
                        <option value="anxious">Anxious</option>
                        <option value="calm">Calm</option>
                        <option value="thoughtful">Thoughtful</option>
                    </select>
                    {(category === 'blog' || category === 'story') && (
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} disabled={loading} />
                    )}
                    <div className="button-group">
                        <button type="button" onClick={handleSubmit} disabled={loading}>
                            <FontAwesomeIcon icon="upload" /> {loading ? 'Uploading...' : 'Upload'}
                        </button>
                        <button type="button" onClick={handleSaveDraft} disabled={loading}>
                            <FontAwesomeIcon icon="save" /> {loading ? 'Saving...' : 'Save Draft'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ProfilePage({ setIsAuthenticated, selectedCategory }) {
    const [user, setUser] = useState(null);
    const [uploadedContents, setUploadedContents] = useState([]);
    const [draftContents, setDraftContents] = useState([]);
    const [editDraft, setEditDraft] = useState(null);
    const [uploadedFilter, setUploadedFilter] = useState('');
    const [draftFilter, setDraftFilter] = useState('');
    const [expandedContent, setExpandedContent] = useState(null);
    const [showImageModal, setShowImageModal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editProfile, setEditProfile] = useState(false);
    const [newName, setNewName] = useState('');
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [preview, setPreview] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            try {
                const response = await axios.get('https://pal-backend-tooi.onrender.com/api/auth/profile', {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setUser(response.data.user);
                setNewName(response.data.user.name);
            } catch (err) {
                console.error('Fetch user error:', err);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        const fetchUserContents = async () => {
            try {
                const response = await axios.get('https://pal-backend-tooi.onrender.com/api/content/user', {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setUploadedContents(response.data.filter(c => !c.isDraft));
                setDraftContents(response.data.filter(c => c.isDraft));
            } catch (err) {
                console.error('Fetch user contents error:', err);
            }
        };

        fetchUser();
        fetchUserContents();
    }, [navigate]);

    const handleDelete = async (id, isDraft) => {
        try {
            await axios.delete(`https://pal-backend-tooi.onrender.com/api/content/${id}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (isDraft) setDraftContents(draftContents.filter(c => c._id !== id));
            else setUploadedContents(uploadedContents.filter(c => c._id !== id));
            const toastSuccess = document.querySelector('.toast.success');
            if (toastSuccess) {
                toastSuccess.textContent = 'Content deleted!';
                toastSuccess.classList.add('show');
                setTimeout(() => toastSuccess.classList.remove('show'), 3000);
            }
        } catch (err) {
            console.error('Delete error:', err.response?.data);
            const toastError = document.querySelector('.toast.error');
            if (toastError) {
                toastError.textContent = err.response?.data?.message || 'Delete failed';
                toastError.classList.add('show');
                setTimeout(() => toastError.classList.remove('show'), 3000);
            }
        }
    };

    const handleEdit = (draft) => {
        setEditDraft(draft);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editDraft) return;
        const formData = new FormData();
        formData.append('title', editDraft.title || '');
        formData.append('body', editDraft.body);
        formData.append('mood', editDraft.mood || 'happy');
        formData.append('isDraft', true);

        try {
            await axios.put(`https://pal-backend-tooi.onrender.com/api/content/${editDraft._id}`, formData, {
                headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
            });
            setEditDraft(null);
            const fetchUserContents = async () => {
                const response = await axios.get('https://pal-backend-tooi.onrender.com/api/content/user', {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setDraftContents(response.data.filter(c => c.isDraft));
            };
            fetchUserContents();
            const toastSuccess = document.querySelector('.toast.success');
            if (toastSuccess) {
                toastSuccess.textContent = 'Draft updated!';
                toastSuccess.classList.add('show');
                setTimeout(() => toastSuccess.classList.remove('show'), 3000);
            }
        } catch (err) {
            console.error('Edit error:', err);
            const toastError = document.querySelector('.toast.error');
            if (toastError) {
                toastError.textContent = 'Edit failed';
                toastError.classList.add('show');
                setTimeout(() => toastError.classList.remove('show'), 3000);
            }
        }
    };

    const handleUploadEdit = async (e) => {
        e.preventDefault();
        if (!editDraft) return;
        const formData = new FormData();
        formData.append('title', editDraft.title || '');
        formData.append('body', editDraft.body);
        formData.append('mood', editDraft.mood || 'happy');
        formData.append('isDraft', false);
        formData.append('type', editDraft.type);

        try {
            await axios.put(`https://pal-backend-tooi.onrender.com/api/content/${editDraft._id}`, formData, {
                headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
            });
            setEditDraft(null);
            const fetchUserContents = async () => {
                const response = await axios.get('https://pal-backend-tooi.onrender.com/api/content/user', {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                setDraftContents(response.data.filter(c => c.isDraft));
                setUploadedContents(response.data.filter(c => !c.isDraft));
            };
            fetchUserContents();
            navigate(`/${editDraft.type}`);
            const toastSuccess = document.querySelector('.toast.success');
            if (toastSuccess) {
                toastSuccess.textContent = 'Content uploaded!';
                toastSuccess.classList.add('show');
                setTimeout(() => toastSuccess.classList.remove('show'), 3000);
            }
        } catch (err) {
            console.error('Upload error:', err);
            const toastError = document.querySelector('.toast.error');
            if (toastError) {
                toastError.textContent = 'Upload failed';
                toastError.classList.add('show');
                setTimeout(() => toastError.classList.remove('show'), 3000);
            }
        }
    };

    const handleLogout = () => {
        setToken(null);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('selectedCategory');
        localStorage.removeItem('welcomeShown');
    };

    const toggleExpand = (contentId) => {
        setExpandedContent(expandedContent === contentId ? null : contentId);
    };

    const countWords = (text) => text.trim().split(/\s+/).length;

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const formData = new FormData();
        formData.append('name', newName);
        if (newProfilePic) formData.append('profilePic', newProfilePic);

        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.classList.add('updating');

        try {
            const response = await axios.put('https://pal-backend-tooi.onrender.com/api/user/profile', formData, {
                headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
            });
            setUser(response.data.user);
            setEditProfile(false);
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Profile not updated, try again');
            setTimeout(() => setError(''), 3000);
        } finally {
            submitButton.classList.remove('updating');
            submitButton.disabled = false;
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewProfilePic(file);
        setPreview(file ? URL.createObjectURL(file) : '');
    };

    return (
        <div className={`profile-page ${getTheme()}`}>
            {loading && <div className="loading-message">Beaming in your profile data...</div>}
            {!loading && user && (
                <div className={`profile-screen ${getTheme()}`}>
                    <div className="profile-header">
                        <h1>Profile</h1>
                        <button onClick={handleLogout} className="logout-btn">
                            <FontAwesomeIcon icon="sign-out-alt" /> Logout
                        </button>
                    </div>
                    <div className="profile-details">
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                        <img
                            src={user.profilePic?.startsWith('http') ? user.profilePic : user.profilePic ? `https://pal-backend-tooi.onrender.com${user.profilePic}` : 'https://pal-backend-tooi.onrender.com/byde.png'}
                            alt="Profile"
                            className="profile-img"
                            onError={(e) => console.log('Profile image load error in ProfilePage:', e.target.src, e)}
                        />
                        {editProfile ? (
                            <form onSubmit={handleUpdateProfile} className="profile-update-form">
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="New Name"
                                    required
                                />
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                                {preview && <img src={preview} alt="Preview" className="profile-preview" />}
                                <div className="button-group">
                                    <button type="submit">Save Changes</button>
                                    <button type="button" onClick={() => setEditProfile(false)}>Cancel</button>
                                </div>
                                {error && <div className="toast error">{error}</div>}
                                {success && <div className="toast success">{success}</div>}
                            </form>
                        ) : (
                            <button onClick={() => setEditProfile(true)} className="edit-profile-btn">
                                <FontAwesomeIcon icon="edit" /> Edit Profile
                            </button>
                        )}
                    </div>
                    <div className="content-sections">
                        <h3>Uploaded Contents</h3>
                        <select onChange={(e) => setUploadedFilter(e.target.value)} value={uploadedFilter}>
                            <option value="">All Categories</option>
                            <option value="poem">Poem</option>
                            <option value="shayari">Shayari</option>
                            <option value="blog">Blog</option>
                            <option value="story">Story</option>
                        </select>
                        {uploadedContents.length > 0 ? (
                            uploadedContents
                                .filter(content => !uploadedFilter || content.type === uploadedFilter)
                                .map((content) => {
                                    const wordCount = countWords(content.body);
                                    const shouldShowFull = wordCount <= 60;
                                    const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';
                                    const showUserName = user && content.user && content.user.name !== user.name;

                                    return (
                                        <div key={content._id} className={`content-item ${getTheme()}`}>
                                            <div className="content-header">
                                                {showUserName && <h3>{content.user?.name || 'Unknown'}</h3>}
                                            </div>
                                            {content.title && <h4>{content.title}</h4>}
                                            <p>{displayContent}</p>
                                            {content.mood && <div className="content-mood">Mood: {content.mood.charAt(0).toUpperCase() + content.mood.slice(1)}</div>}
                                            {!shouldShowFull && wordCount > 60 && (
                                                <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
                                                    {expandedContent === content._id ? 'Show Less' : 'Read More'}
                                                </button>
                                            )}
                                            {content.image && (
                                                <img
                                                    src={content.image.startsWith('http') ? content.image : `https://pal-backend-tooi.onrender.com${content.image}`}
                                                    alt="Content"
                                                    className="content-image"
                                                    onClick={() => setShowImageModal(content._id)}
                                                    onError={(e) => console.log('Image load error:', e.target.src, e)}
                                                />
                                            )}
                                            <div className="content-footer">
                                                <span>{new Date(content.createdAt).toLocaleString()}</span>
                                                <button onClick={() => handleDelete(content._id, false)}><FontAwesomeIcon icon="trash" /></button>
                                            </div>
                                            {showImageModal === content._id && content.image && (
                                                <div className="image-modal-overlay" onClick={() => setShowImageModal(null)}>
                                                    <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                                                        <button className="close-modal-btn" onClick={() => setShowImageModal(null)}>
                                                            <FontAwesomeIcon icon="times" />
                                                        </button>
                                                        <img
                                                            src={content.image.startsWith('http') ? content.image : `https://pal-backend-tooi.onrender.com${content.image}`}
                                                            alt="Enlarged Content"
                                                            className="enlarged-image"
                                                            onError={(e) => console.log('Modal image load error:', e.target.src, e)}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                        ) : (
                            <p>No uploaded contents yet.</p>
                        )}
                        <h3>Saved Drafts</h3>
                        <select onChange={(e) => setDraftFilter(e.target.value)} value={draftFilter}>
                            <option value="">All Categories</option>
                            <option value="poem">Poem</option>
                            <option value="shayari">Shayari</option>
                            <option value="blog">Blog</option>
                            <option value="story">Story</option>
                        </select>
                        {draftContents.length > 0 ? (
                            draftContents
                                .filter(content => !draftFilter || content.type === draftFilter)
                                .map((content) => {
                                    const wordCount = countWords(content.body);
                                    const shouldShowFull = wordCount <= 60;
                                    const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';
                                    const showUserName = user && content.user && content.user.name !== user.name;

                                    return (
                                        <div key={content._id} className={`content-item ${getTheme()}`}>
                                            <div className="content-header">
                                                {showUserName && <h3>{content.user?.name || 'Unknown'}</h3>}
                                            </div>
                                            {content.title && <h4>{content.title}</h4>}
                                            <p>{displayContent}</p>
                                            {content.mood && <div className="content-mood">Mood: {content.mood.charAt(0).toUpperCase() + content.mood.slice(1)}</div>}
                                            {!shouldShowFull && wordCount > 60 && (
                                                <button onClick={() => toggleExpand(content._id)} className="read-more-btn">
                                                    {expandedContent === content._id ? 'Show Less' : 'Read More'}
                                                </button>
                                            )}
                                            {content.image && (
                                                <img
                                                    src={content.image.startsWith('http') ? content.image : `https://pal-backend-tooi.onrender.com${content.image}`}
                                                    alt="Content"
                                                    className="content-image"
                                                    onClick={() => setShowImageModal(content._id)}
                                                    onError={(e) => console.log('Image load error:', e.target.src, e)}
                                                />
                                            )}
                                            <div className="content-footer">
                                                <span>{new Date(content.createdAt).toLocaleString()}</span>
                                                <button onClick={() => handleDelete(content._id, true)}><FontAwesomeIcon icon="trash" /></button>
                                                <button onClick={() => handleEdit(content)}><FontAwesomeIcon icon="edit" /></button>
                                            </div>
                                            {showImageModal === content._id && content.image && (
                                                <div className="image-modal-overlay" onClick={() => setShowImageModal(null)}>
                                                    <div className="image-modal" onClick={(e) => e.stopPropagation()}>
                                                        <button className="close-modal-btn" onClick={() => setShowImageModal(null)}>
                                                            <FontAwesomeIcon icon="times" />
                                                        </button>
                                                        <img
                                                            src={content.image.startsWith('http') ? content.image : `https://pal-backend-tooi.onrender.com${content.image}`}
                                                            alt="Enlarged Content"
                                                            className="enlarged-image"
                                                            onError={(e) => console.log('Modal image load error:', e.target.src, e)}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                        ) : (
                            <p>No saved drafts yet.</p>
                        )}
                        {editDraft && (
                            <div className="upload-overlay">
                                <div className={`upload-container-large ${getTheme()}`}>
                                    <button className="close-btn" onClick={() => setEditDraft(null)}>
                                        <FontAwesomeIcon icon="times" />
                                    </button>
                                    <h2>Edit Draft</h2>
                                    <form>
                                        <input
                                            type="text"
                                            value={editDraft.title || ''}
                                            onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
                                            placeholder="Title (optional)"
                                        />
                                        <textarea
                                            value={editDraft.body || ''}
                                            onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
                                            placeholder="Content"
                                            required
                                            style={{ overflowY: 'auto', maxHeight: '300px' }}
                                        />
                                        <select
                                            value={editDraft.mood || 'happy'}
                                            onChange={(e) => setEditDraft({ ...editDraft, mood: e.target.value })}
                                        >
                                            <option value="happy">Happy</option>
                                            <option value="sad">Sad</option>
                                            <option value="love">Love</option>
                                            <option value="anxious">Anxious</option>
                                            <option value="calm">Calm</option>
                                            <option value="thoughtful">Thoughtful</option>
                                        </select>
                                        <div className="button-group">
                                            <button type="button" onClick={handleSaveEdit}>
                                                <FontAwesomeIcon icon="save" /> Save
                                            </button>
                                            <button type="button" onClick={handleUploadEdit}>
                                                <FontAwesomeIcon icon="upload" /> Upload
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

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

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
    const [showSplash, setShowSplash] = useState(true);
    const [user, setUser] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');
    const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || 'poem');

    return (
        <Router>
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
        </Router>
    );
}

export default App;