import './StoryBanner.css';

const StoryBanner = ({ title, summary, image }) => {
    return (
        <div className="story-banner">
            <div className="story-banner-image" style={{ backgroundImage: `url(${image})` }}>
                <div className="story-banner-overlay">
                    <div className="story-info-container">
                        <h1 className="banner-title">
                            {title.split(' ').map((word, index) => (
                                <span key={index} className="title-word">{word}</span>
                            ))}
                        </h1>
                        <p className="story-description">{summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryBanner;