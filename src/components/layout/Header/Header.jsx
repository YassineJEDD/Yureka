import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './Header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);
    const menuRef = useRef(null);
    const profileIconRef = useRef(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 990);
    };

    const handleProfileClick = () => {
        if (isMobile) {
            toggleMenu();
        } else {
            if (isAuthenticated) {
                navigate('/profile');
            } else {
                navigate('/login');
            }
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                profileIconRef.current &&
                !menuRef.current.contains(event.target) &&
                !profileIconRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className="main-header">
            <div className="header-content">
                <Link to="/" >
                    <img src="/src/assets/Yureka-Assets/yureka-m-logo.png" alt="Logo" className="logo-yureka" />
                </Link>

                {/* desktop nav */}
                <nav className="main-nav desktop-nav">
                    <Link to="/adventure">
                        <img src="/src/assets/Yureka-Assets/adventure-nav.png" alt="adventure" className="adventure-nav" />
                    </Link>
                    <Link to="/discover">
                        <img src="/src/assets/Yureka-Assets/discover-nav.png" alt="discover" className="discover-nav" />
                    </Link>
                    <Link to="/flashcards">
                        <img src="/src/assets/Yureka-Assets/flashcards-nav.png" alt="flashcards" className="flashcards-nav" />
                    </Link>
                    <Link to="/community">
                        <img src="/src/assets/Yureka-Assets/community-nav.png" alt="community" className="community-nav" />
                    </Link>
                </nav>

                <div className="profile-container">
                    <img
                        src="/src/assets/Yureka-Assets/profile-icon.png"
                        alt="profile-icon"
                        className="profile-icon"
                        onClick={handleProfileClick}
                        ref={profileIconRef}
                        style={{
                            filter: isAuthenticated ? 'drop-shadow(0px 0px 10px rgba(145, 255, 0, 0.5))' : 'none'
                        }}
                    />

                    {/* Mobile menu */}
                    {isMenuOpen && isMobile && (
                        <div className="mobile-menu" ref={menuRef}>
                            <Link to="/adventure" onClick={closeMenu}>
                                <span>Adventure</span>
                            </Link>
                            <Link to="/discover" onClick={closeMenu}>
                                <span>Discover</span>
                            </Link>
                            <Link to="/flashcards" onClick={closeMenu}>
                                <span>Flashcards</span>
                            </Link>
                            <Link to="/community" onClick={closeMenu}>
                                <span>Community</span>
                            </Link>
                            {isAuthenticated ? (
                                <Link to="/profile" onClick={closeMenu}>
                                    <span>Profile</span>
                                </Link>
                            ) : (
                                <Link to="/login" onClick={closeMenu}>
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}