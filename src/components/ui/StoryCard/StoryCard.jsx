import { Link } from 'react-router-dom';
import './StoryCard.css';

export default function StoryCard({ story }) {
    if (!story) {
        return (
            <div className="story-card placeholder">
                <div className="placeholder-content"></div>
            </div>
        );
    }

    return (
        <Link to={`/read/${story.id}`} className="story-card">
            <div className="story-card-image">
                <img src={story.image} alt={story.title} />
            </div>
            <div className="story-card-content">
                <h3>{story.title}</h3>
                <p>{story.description}</p>

                <div className="story-card-badges">
                    <span className="story-badge genre-badge">
                        {story.genre}
                    </span>
                </div>
            </div>
        </Link>
    );
}