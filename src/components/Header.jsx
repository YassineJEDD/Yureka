import { Link } from 'react-router-dom';
import '../styles/components/Header.css';

export default function Header() {
    return (
        <header className="main-header">
            <div className="header-content">
                <Link to="/" >
                    <img src="/Yureka-Assets/yureka-m-logo.png" alt="Logo" className="logo-yureka" />
                </Link>

                <nav className="main-nav">
                    <Link to="/discover">
                        <img src="/Yureka-Assets/discover-nav.png" alt="discover" />
                    </Link>
                    <Link to="/flashcards">
                        <img src="/Yureka-Assets/flashcards-nav.png" alt="flashcards" className="flashcards-nav" />
                    </Link>
                    <Link to="/feedback">
                        <img src="/Yureka-Assets/feedback-nav.png" alt="feedback" />
                    </Link>
                    <Link to="/community">
                        <img src="/Yureka-Assets/community-nav.png" alt="community" className="community-nav" />
                    </Link>
                </nav>

                <div>
                    <Link to="/profile">
                        <img src="/Yureka-Assets/profile-icon.png" alt="profile-icon" className="profile-icon" />
                    </Link>
                </div>
            </div>
        </header>
)
}