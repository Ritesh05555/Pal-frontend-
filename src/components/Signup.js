import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setToken } from '../utils/auth';

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

export default Signup;