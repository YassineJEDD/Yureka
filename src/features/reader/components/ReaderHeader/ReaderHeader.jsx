import { Link } from 'react-router-dom';
import './ReaderHeader.css';

const ReaderHeader = ({ title }) => {
    return (
        <header className="simple-header">
            <div className="header-content">
                <Link to="/">
                    <img src="/src/assets/Yureka-Assets/yureka-m-logo.png" alt="Logo" className="logo-yureka-reader" />
                </Link>

                <div className="story-title-header">
                    {title}
                </div>

                <div>
                    <Link to="/profile">
                        <img src="/src/assets/Yureka-Assets/profile-icon.png" alt="profile-icon" className="profile-icon-reader" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default ReaderHeader;