import { Link } from 'react-router-dom'

export default function StoryCard({ story }) {
    return (
        <Link to={`/read/${story.id}`} className="story-card">
            <h3>{story.title}</h3>
            <span className={`level-badge ${story.level}`}>
        {story.level}
      </span>
            {story.lastRead && (
                <p className="last-read">Last read: {story.lastRead.toLocaleDateString()}</p>
            )}
        </Link>
    )
}