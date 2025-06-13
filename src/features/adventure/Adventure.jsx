import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/ui/Loading/Loading';
import './Adventure.css';

const API_URL = 'http://localhost';

export default function Adventure() {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadChapters = async () => {
            try {
                const response = await fetch(`${API_URL}/chapters`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setChapters(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching chapters:", err);
            } finally {
                setLoading(false);
            }
        };

        loadChapters();
        window.scrollTo(0, 0);
    }, []);

    const handleChapterEnter = (chapterId) => {
        navigate(`/adventure/chapter/${chapterId}`);
    };

    if (loading) {
        return <Loading message="Loading chapters..." className="adventure-page" />;
    }

    if (error) {
        return (
            <div className="adventure-page error">
                <div className="error-message">Error loading chapters: {error}</div>
            </div>
        );
    }

    return (
        <div className="adventure-page">
            <div className="adventure-hero">
                <h1 className="adventure-title">Adventure Mode</h1>
                <p className="adventure-subtitle">Master Chinese through structured lessons</p>
            </div>

            <div className="chapters-container">
                {chapters.map((chapter) => (
                    <div key={chapter.id} className="chapter-card">
                        <div className="chapter-number">Chapter {chapter.id}</div>
                        <h2 className="chapter-title">{chapter.title}</h2>
                        <p className="chapter-description">{chapter.description}</p>
                        <button
                            className="chapter-enter-btn"
                            onClick={() => handleChapterEnter(chapter.id)}
                        >
                            Enter
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}