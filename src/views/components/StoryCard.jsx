import { Link } from 'react-router-dom';
import '../../styles/components/StoryCard.css';

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
            </div>
        </Link>
    );
}
