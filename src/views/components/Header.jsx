import { Link } from 'react-router-dom';
import '../../../../Yureka/src/styles/components/Header.css';

export default function Header() {
    return (
        <header className="main-header">
            <div className="header-content">
                <Link to="/" >
                    <img src="/public/Yureka-Assets/yureka-m-logo.png" alt="Logo" className="logo-yureka" />
                </Link>

                <nav className="main-nav">
                    <Link to="/discover">
                        <img src="/public/Yureka-Assets/discover-nav.png" alt="discover" />
                    </Link>
                    <Link to="/flashcards">
                        <img src="/public/Yureka-Assets/flashcards-nav.png" alt="flashcards" className="flashcards-nav" />
                    </Link>
                    <Link to="/feedback">
                        <img src="/public/Yureka-Assets/feedback-nav.png" alt="feedback" />
                    </Link>
                    <Link to="/community">
                        <img src="/public/Yureka-Assets/community-nav.png" alt="community" className="community-nav" />
                    </Link>
                </nav>

                <div>
                    <Link to="/profile">
                        <img src="/public/Yureka-Assets/profile-icon.png" alt="profile-icon" className="profile-icon" />
                    </Link>
                </div>
            </div>
        </header>
    )
}
