import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './LoginPromptPopup.css';

export default function LoginPromptPopup() {
    const [showPopup, setShowPopup] = useState(false);
    const [hasClosedOnce, setHasClosedOnce] = useState(false);
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const authPaths = ['/login', '/register'];
        if (authPaths.includes(location.pathname)) {
            setShowPopup(false);
            return;
        }

        if (!loading && !isAuthenticated && !hasClosedOnce) {
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [location.pathname, isAuthenticated, loading, hasClosedOnce]);

    const handleLogin = () => {
        setShowPopup(false);
        navigate('/login');
    };

    const handleRegister = () => {
        setShowPopup(false);
        navigate('/register');
    };

    const handleClose = () => {
        setShowPopup(false);
        setHasClosedOnce(true);
    };

    if (!showPopup || isAuthenticated) {
        return null;
    }

    return (
        <div className="login-prompt-overlay">
            <div className="login-prompt-popup">
                <button className="popup-close-button" onClick={handleClose}>
                    <img src="/src/assets/Adventure-Assets/black-X.png" alt="Close" />
                </button>

                <div className="popup-dragon-container">
                    <img
                        src="/src/assets/Adventure-Assets/dragon-navigate-adventure.png"
                        alt="Dragon"
                        className="popup-dragon"
                    />
                </div>

                <h2 className="popup-title">Save Your Journey!</h2>

                <p className="popup-description">
                    Log in to track your progress, mark stories as read, and unlock achievements
                    on your Chinese learning adventure!
                </p>

                <div className="popup-benefits">
                    <div className="benefit-item">
                        <span className="benefit-icon">📚</span>
                        <span>Track read stories</span>
                    </div>
                    <div className="benefit-item">
                        <span className="benefit-icon">🏆</span>
                        <span>Earn achievements</span>
                    </div>
                    <div className="benefit-item">
                        <span className="benefit-icon">📈</span>
                        <span>Monitor progress</span>
                    </div>
                </div>

                <div className="popup-actions">
                    <button className="popup-login-button" onClick={handleLogin}>
                        Login
                    </button>
                    <button className="popup-register-button" onClick={handleRegister}>
                        Create Account
                    </button>
                </div>

                <button className="popup-skip-button" onClick={handleClose}>
                    Continue as Guest
                </button>
            </div>
        </div>
    );
}