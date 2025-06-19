import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchChapter, fetchLevelsByChapter } from '../../../services/api.js';
import { chapterThemes } from '../themes.js';
import LevelSquare from '../components/LevelSquare/LevelSquare.jsx';
import Loading from '../../../components/ui/Loading/Loading.jsx';
import './Levels.css';

export default function Levels() {
    const { chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const theme = chapterThemes[chapterId] || chapterThemes[1];

    const chapterImagePath = `/src/assets/Adventure-Assets/Levels-Cards/Levels-Cards${chapterId}.png`;

    useEffect(() => {
        const loadChapterAndLevels = async () => {
            try {
                const [fetchedChapter, fetchedLevels] = await Promise.all([
                    fetchChapter(chapterId),
                    fetchLevelsByChapter(chapterId)
                ]);
                setChapter(fetchedChapter);
                setLevels(fetchedLevels);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching chapter data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadChapterAndLevels();
    }, [chapterId]);

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

    const sortedLevels = [...levels].sort((a, b) =>
        (a.order_index || a.id) - (b.order_index || b.id)
    );

    const gridLevels = sortedLevels.slice(0, 9);
    const level10 = sortedLevels[9];

    return (
        <div className="levels-page">
            <div className="levels-header" style={{
                background: theme.header,
                borderBottom: `2px solid ${theme.headerBorder}`
            }}>
                <Link to="/adventure" className="back-button" style={{ color: theme.backButton }}>
                    ← Back to Chapters
                </Link>
                <h1 style={{ color: theme.title }}>{chapter?.title}</h1>
                <p className="chapter-description" style={{ color: theme.description }}>
                    {chapter?.description}
                </p>
            </div>

            <div className="levels-container">
                {/* Chapter image card with levels overlay */}
                <div className="chapter-levels-card">
                    <img
                        src={chapterImagePath}
                        alt={`Level map for ${chapter?.title}`}
                        className="chapter-levels-image"
                    />
                    <div className="levels-overlay">
                        <div className="levels-grid">
                            {gridLevels.map((level) => (
                                <LevelSquare
                                    key={level.id}
                                    level={level}
                                    chapterId={chapterId}
                                    themeColor={theme.levelSquare}
                                />
                            ))}
                        </div>

                        {level10 && (
                            <div className="level-10-container">
                                <LevelSquare
                                    level={level10}
                                    chapterId={chapterId}
                                    isLevel10={true}
                                    themeColor={theme.levelSquare}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}