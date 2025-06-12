import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Logo */}
                <div className="footer-logo">
                    <Link to="/" >
                        <img src="/src/assets/Yureka-Assets/yureka-m-logo.png" alt="Logo" className="logo-yureka" />
                    </Link>
                </div>

                {/* Columns */}
                <div className="footer-columns">

                    <div className="footer-column">
                        <h4>CREW</h4>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Pricing</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>CHECKPOINTS</h4>
                        <ul>
                            <li><a href="#" className="adventure-checkpoint">Adventure</a></li>
                            <li><a href="/discover">Discover</a></li>
                            <li><a href="#">Flashcards</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>LEGAL</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Text */}
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Ycorporation</p>
                </div>

            </div>
        </footer>
    );
}
