import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setToken } from '../utils/auth';

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

export default Login;