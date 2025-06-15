import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTheme, getToken, setToken } from '../utils/auth';

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
                setIsAuthenticated(false);
                setToken(null);
                navigate('/login');
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
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
        fetchUserContents();
    }, [navigate, setIsAuthenticated]);

    const handleDelete = async (id, isDraft) => {
        try {
            await axios.delete(`https://pal-backend-tooi.onrender.com/api/content/${id}`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (isDraft) {
                setDraftContents(draftContents.filter(c => c._id !== id));
            } else {
                setUploadedContents(uploadedContents.filter(c => c._id !== id));
            }
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
            const response = await axios.get('https://pal-backend-tooi.onrender.com/api/content/user', {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setDraftContents(response.data.filter(c => c.isDraft));
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
                toastError.textContent = err.response?.data?.message || 'Edit failed';
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
            const response = await axios.get('https://pal-backend-tooi.onrender.com/api/content/user', {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setDraftContents(response.data.filter(c => c.isDraft));
            setUploadedContents(response.data.filter(c => !c.isDraft));
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
                toastError.textContent = err.response?.data?.message || 'Upload failed';
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
        navigate('/login');
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
            const toastSuccess = document.querySelector('.toast.success');
            if (toastSuccess) {
                toastSuccess.textContent = 'Profile updated!';
                toastSuccess.classList.add('show');
                setTimeout(() => toastSuccess.classList.remove('show'), 3000);
            }
        } catch (err) {
            console.error('Profile update error:', err);
            setError('Profile not updated, try again');
            setTimeout(() => setError(''), 3000);
            const toastError = document.querySelector('.toast.error');
            if (toastError) {
                toastError.textContent = 'Profile update failed';
                toastError.classList.add('show');
                setTimeout(() => toastError.classList.remove('show'), 3000);
            }
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
            {loading && <div className={`loading-message ${getTheme()}`}>Beaming in your profile...</div>}
            {!loading && user && (
                <div className={`profile-screen ${getTheme()}`}>
                    <div className="profile-header">
                        <h1>Your Profile</h1>
                        <button className="logout-btn" onClick={handleLogout}>
                            <FontAwesomeIcon icon="sign-out-alt" /> Logout
                        </button>
                    </div>
                    <div className="profile-details">
                        <img
                            src={user.profilePic?.startsWith('http') ? user.profilePic : user.profilePic ? `https://pal-backend-tooi.onrender.com${user.profilePic}` : 'https://pal-backend-tooi.onrender.com/byde.png'}
                            alt="Profile"
                            className="profile-img"
                            onError={(e) => console.log('Profile image load error:', e.target.src, e)}
                        />
                        <button className="edit-profile-btn" onClick={() => setEditProfile(!editProfile)}>
                            <FontAwesomeIcon icon="edit" /> Edit Profile
                        </button>
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                    </div>
                    {editProfile && (
                        <form className="profile-update-form" onSubmit={handleUpdateProfile}>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {preview && <img src={preview} alt="Preview" className="profile-preview" />}
                            <div className="button-group">
                                <button type="submit">
                                    <FontAwesomeIcon icon="save" /> Save
                                </button>
                                <button type="button" onClick={() => setEditProfile(false)}>
                                    <FontAwesomeIcon icon="times" /> Cancel
                                </button>
                            </div>
                            {success && <div className="success">{success}</div>}
                            {error && <div className="error">{error}</div>}
                        </form>
                    )}
                    <div className="content-sections">
                        <h3>Uploaded Content</h3>
                        <select value={uploadedFilter} onChange={(e) => setUploadedFilter(e.target.value)}>
                            <option value="">All</option>
                            <option value="poem">Poem</option>
                            <option value="shayari">Shayari</option>
                            <option value="blog">Blog</option>
                            <option value="story">Story</option>
                        </select>
                        {uploadedContents
                            .filter(c => !uploadedFilter || c.type === uploadedFilter)
                            .map(content => {
                                const wordCount = countWords(content.body);
                                const shouldShowFull = wordCount <= 60;
                                const displayContent = shouldShowFull || expandedContent === content._id ? content.body : content.body.substring(0, 100) + '...';
                                return (
                                    <div key={content._id} className={`content-item ${getTheme()}`}>
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
                                            <button onClick={() => handleDelete(content._id, false)}>
                                                <FontAwesomeIcon icon="trash" />
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
                        <h3>Drafts</h3>
                        <select value={draftFilter} onChange={(e) => setDraftFilter(e.target.value)}>
                            <option value="">All</option>
                            <option value="poem">Poem</option>
                            <option value="shayari">Shayari</option>
                            <option value="blog">Blog</option>
                            <option value="story">Story</option>
                        </select>
                        {draftContents
                            .filter(c => !draftFilter || c.type === draftFilter)
                            .map(content => (
                                <div key={content._id} className={`content-item ${getTheme()}`}>
                                    {content.title && <h4>{content.title}</h4>}
                                    <p>{content.body}</p>
                                    {content.mood && <div className="content-mood">Mood: {content.mood.charAt(0).toUpperCase() + content.mood.slice(1)}</div>}
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
                                        <button onClick={() => handleEdit(content)}>
                                            <FontAwesomeIcon icon="edit" />
                                        </button>
                                        <button onClick={() => handleDelete(content._id, true)}>
                                            <FontAwesomeIcon icon="trash" />
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
                            ))}
                        {editDraft && (
                            <div className={`upload-container-large ${getTheme()}`}>
                                <button className="close-btn" onClick={() => setEditDraft(null)}>
                                    <FontAwesomeIcon icon="times" />
                                </button>
                                <h2>Edit Draft</h2>
                                <form onSubmit={handleSaveEdit}>
                                    <input
                                        type="text"
                                        value={editDraft.title || ''}
                                        onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
                                        placeholder="Title (optional)"
                                    />
                                    <textarea
                                        value={editDraft.body}
                                        onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
                                        placeholder="Content"
                                        required
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
                                        <button type="submit">
                                            <FontAwesomeIcon icon="save" /> Save Draft
                                        </button>
                                        <button type="button" onClick={handleUploadEdit}>
                                            <FontAwesomeIcon icon="upload" /> Upload
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;