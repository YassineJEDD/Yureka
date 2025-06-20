import { Link } from 'react-router-dom';
import './Community.css';

export default function Community() {
    return (
        <div className="community-page">
            <div className="community-container">
                <img
                    src="/src/assets/Adventure-Assets/dragon-navigate-adventure.png"
                    alt="Dragon"
                    className="community-dragon"
                />

                <h1 className="community-title">Community Feature</h1>

                <div className="community-message">
                    <p className="message-text">We're working on it!</p>
                    <p className="message-subtext">
                        Our team is building an awesome community space for Chinese learners.
                        Check back soon!
                    </p>
                </div>

                <Link to="/" className="home-button">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}