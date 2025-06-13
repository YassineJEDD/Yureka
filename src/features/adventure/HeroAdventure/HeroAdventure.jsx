import heroAdventureImage from '../../../assets/Adventure-Assets/hero-adventure.png';
import startButtonImage from '../../../assets/Adventure-Assets/start-hero-adventure.png';
import closeButtonImage from '../../../assets/Adventure-Assets/black-X.png';
import './HeroAdventure.css';
import {Link} from "react-router-dom";

export default function HeroAdventure({ onClose }) {
    return (
        <div className="hero-adventure">
            <div className="hero-adventure-container">
                <img
                    src={heroAdventureImage}
                    alt="Adventure Hero"
                    className="hero-adventure-image"
                />
                <button className="hero-adventure-button">
                    <Link to="/adventure">
                        <img
                            src={startButtonImage}
                            alt="Start Adventure"
                        />
                    </Link>
                </button>
                <button className="hero-adventure-close" onClick={onClose}>
                    <img
                        src={closeButtonImage}
                        alt="Close"
                    />
                </button>
            </div>
        </div>
    );
}