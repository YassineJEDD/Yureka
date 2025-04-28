import { Link } from 'react-router-dom';
import '../styles/components/StoryCard.css';

export default function StoryCard({ story }) {
    return (
        <Link to={`/read/${story.id}`} className={`story-card ${!story ? 'placeholder' : ''}`}>
            {story ? (
                <>
                    <h3>{story.title}</h3>
                    <span className={`level-badge ${story.level}`}>
                        {story.level}
                    </span>
                    {story.lastRead && (
                        <p className="last-read">Last read: {story.lastRead.toLocaleDateString()}</p>
                    )}
                </>
            ) : (
                <div className="placeholder-content"></div>
            )}
        </Link>
    );
}