import { Link } from 'react-router-dom';
import './ChapterCard.css';

export default function ChapterCard({ chapter }) {
    const bannerImage = new URL(`/src/assets/Adventure-Assets/Chapter-Cards/SW-Chapter${chapter.id}.png`, import.meta.url).href;

    return (
        <Link
            to={`/adventure/chapter/${chapter.id}`}
            className="chapter-card-link"
        >
            <div
                className="chapter-card"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
                <div className="chapter-content">
                    <div className="chapter-header">
                        <span className="chapter-id">Chapter {chapter.id}</span>
                        <h3 className="chapter-title">{chapter.title}</h3>
                    </div>
                    <p className="chapter-description">{chapter.description}</p>
                </div>
            </div>
        </Link>
    );
}