import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('registered') === 'true') {
            setShowSuccessPopup(true);

            const timer = setTimeout(() => {
                setShowSuccessPopup(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/profile');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            {showSuccessPopup && (
                <div className="registration-success-popup">
                    <div className="popup-content">
                        <h3>Registration Successful!</h3>
                        <p>Your account has been created. Please log in now.</p>
                        <button onClick={() => setShowSuccessPopup(false)}>
                            Got it
                        </button>
                    </div>
                </div>
            )}

            <div className="auth-container">
                <h1 className="auth-title">Login</h1>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="auth-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}