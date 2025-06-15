import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UploadContainer from './UploadContainer';
import { getTheme, getToken } from '../utils/auth';

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
                setContents(response.data);
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
            setTimeout(() => contentItem.classList.remove('liked'), 600);
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
            setContents(response.data);
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
            setContents(response.data);
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

export default ContentFeed;