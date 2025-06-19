import { useEffect, useState } from 'react';
import { fetchChapters } from '../../services/api';
import ChapterCard from './components/ChapterCard/ChapterCard';
import AdventureHero from './components/AdventureHero/AdventureHero';
import Loading from '../../components/ui/Loading/Loading';
import './Adventure.css';
import chooseChapterImage from '../../assets/Adventure-Assets/choose-chapter.png';
import dragonImage from '../../assets/Adventure-Assets/dragon-navigate-adventure.png'; // Import the dragon image

export default function Adventure() {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadChapters = async () => {
            try {
                const fetchedChapters = await fetchChapters();
                setChapters(fetchedChapters);
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
            <AdventureHero />

            <div className="chapters-container">
                <div className="title-container">
                    <img src={dragonImage} alt="Dragon" className="title-dragon left-dragon" />
                    <img src={chooseChapterImage} alt="Choose Chapter" className="chapters-title" />
                    <img src={dragonImage} alt="Dragon" className="title-dragon right-dragon" />
                </div>
                <div className="chapters-list">
                    {chapters.map((chapter) => (
                        <ChapterCard key={chapter.id} chapter={chapter} />
                    ))}
                </div>
            </div>
        </div>
    );
}