import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../../components/ui/Loading/Loading';
import './Levels.css';

const API_URL = 'http://localhost';

export default function Levels() {
    const { chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadChapterAndLevels = async () => {
            try {
                // Fetch chapter details
                const chapterResponse = await fetch(`${API_URL}/chapters/${chapterId}`);
                if (!chapterResponse.ok) {
                    throw new Error(`HTTP error! status: ${chapterResponse.status}`);
                }
                const chapterData = await chapterResponse.json();
                setChapter(chapterData);
                setLevels(chapterData.levels || []);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching chapter and levels:", err);
            } finally {
                setLoading(false);
            }
        };

        loadChapterAndLevels();
        window.scrollTo(0, 0);
    }, [chapterId]);

    const handleLevelSelect = (levelId) => {
        navigate(`/adventure/level/${levelId}`);
    };

    const handleBackToChapters = () => {
        navigate('/adventure');
    };

    if (loading) {
        return <Loading message="Loading levels..." className="levels-page" />;
    }

    if (error) {
        return (
            <div className="levels-page error">
                <div className="error-message">Error loading levels: {error}</div>
            </div>
        );
    }

    return (
        <div className="levels-page">
            <button className="back-button" onClick={handleBackToChapters}>
                ← Back to Chapters
            </button>

            <div className="levels-header">
                <h1 className="chapter-name">{chapter?.title}</h1>
                <p className="chapter-desc">{chapter?.description}</p>
            </div>

            <div className="levels-container">
                <div className="levels-grid">
                    {levels.slice(0, 9).map((level) => (
                        <button
                            key={level.id}
                            className="level-square"
                            onClick={() => handleLevelSelect(level.id)}
                            title={level.title}
                        >
                            {level.order_index}
                        </button>
                    ))}
                </div>

                {levels.length >= 10 && (
                    <div className="level-10-container">
                        <button
                            className="level-square level-10"
                            onClick={() => handleLevelSelect(levels[9].id)}
                            title={levels[9].title}
                        >
                            10
                        </button>
                    </div>
                )}
            </div>

            {/* Level details preview */}
            <div className="levels-list">
                {levels.map((level) => (
                    <div
                        key={level.id}
                        className="level-info"
                        onClick={() => handleLevelSelect(level.id)}
                    >
                        <span className="level-number">Level {level.order_index}</span>
                        <h3 className="level-title">{level.title}</h3>
                        <p className="level-description">{level.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}