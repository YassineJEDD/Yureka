import { Link } from "react-router-dom";
import './DiscoverMoreSection.css';

const DiscoverMoreSection = () => {
    return (
        <section className="discover-more-section">
            <div className="discover-more-container">
                <img
                    src="/src/assets/Yureka-Assets/discover-more.png"
                    alt="Discover More"
                    className="discover-more-img"
                />
                <Link to="/discover" className="discover-more-link">
                    <p>Discover more stories</p>
                </Link>
            </div>
        </section>
    );
};

export default DiscoverMoreSection;