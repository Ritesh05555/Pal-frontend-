import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTheme, getToken } from '../utils/auth';

function UploadContainer({ category, onClose, onUploadSuccess }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [mood, setMood] = useState('happy');
    const [isDraft, setIsDraft] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('mood', mood);
        formData.append('type', category);
        formData.append('isDraft', isDraft);
        if (image) formData.append('image', image);

        try {
            await axios.post('https://pal-backend-tooi.onrender.com/api/content', formData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUploadSuccess();
            onClose();
            const toastSuccess = document.querySelector('.toast.success');
            if (toastSuccess) {
                toastSuccess.textContent = isDraft ? 'Draft saved!' : 'Content uploaded!';
                toastSuccess.classList.add('show');
                setTimeout(() => toastSuccess.classList.remove('show'), 3000);
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.response?.data?.message || 'Upload failed');
            const toastError = document.querySelector('.toast.error');
            if (toastError) {
                toastError.textContent = err.response?.data?.message || 'Upload failed';
                toastError.classList.add('show');
                setTimeout(() => toastError.classList.remove('show'), 3000);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="upload-overlay">
            <div className={`upload-container-large ${getTheme()}`}>
                <button className="close-btn" onClick={onClose}>
                    <FontAwesomeIcon icon="times" />
                </button>
                <h2>Upload {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title (optional)"
                    />
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Content"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <select value={mood} onChange={(e) => setMood(e.target.value)}>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="love">Love</option>
                        <option value="anxious">Anxious</option>
                        <option value="calm">Calm</option>
                        <option value="thoughtful">Thoughtful</option>
                    </select>
                    <div className="button-group">
                        <button type="submit" disabled={isSubmitting} onClick={() => setIsDraft(false)}>
                            <FontAwesomeIcon icon="upload" /> Upload
                        </button>
                        <button type="submit" disabled={isSubmitting} onClick={() => setIsDraft(true)}>
                            <FontAwesomeIcon icon="save" /> Save as Draft
                        </button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default UploadContainer;