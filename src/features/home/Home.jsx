import { useEffect, useState } from 'react';
import { fetchBooks, getBooksByLevel } from '../../services/api';
import Hero from './components/Hero/Hero';
import LevelSection from './components/LevelSection/LevelSection';
import TitleSection from './components/TitleSection/TitleSection';
import DiscoverMoreSection from './components/DiscoverMoreSection/DiscoverMoreSection';
import Loading from '../../components/ui/Loading/Loading';
import HeroAdventure from '../adventure/HeroAdventure/HeroAdventure';
import './Home.css';

export default function Home() {
    const [stories, setStories] = useState({
        newbie: [],
        explorer: [],
        sage: [],
        grandMaster: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [storiesPerView, setStoriesPerView] = useState(3);
    const [showHeroAdventure, setShowHeroAdventure] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setStoriesPerView(1);
            } else if (window.innerWidth <= 1185) {
                setStoriesPerView(2);
            } else {
                setStoriesPerView(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const books = await fetchBooks();
                setStories({
                    newbie: getBooksByLevel(books, 'newbie'),
                    explorer: getBooksByLevel(books, 'explorer'),
                    sage: getBooksByLevel(books, 'sage'),
                    grandMaster: getBooksByLevel(books, 'grand master')
                });
            } catch (err) {
                setError(err.message);
                console.error("Error fetching books:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return <Loading message="Loading of the stories..." className="home-page" />;
    }

    if (error) {
        return (
            <div className="home-page error">
                <div className="error-message">Error loading stories: {error}</div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <Hero />
            {showHeroAdventure && <HeroAdventure onClose={() => setShowHeroAdventure(false)} />}
            <TitleSection />

            <LevelSection
                title="Newbie"
                emoji="🐣"
                description="Every Master starts as a Newbie. Begin your journey by reading easy stories and light novels that match your level."
                stories={stories.newbie}
                storiesPerView={storiesPerView}
            />

            <LevelSection
                title="Explorer"
                emoji="🗺"
                description="Every path leads to discovery. As an Explorer, challenge yourself with longer stories and fresh expressions that push your limits."
                stories={stories.explorer}
                storiesPerView={storiesPerView}
            />

            <LevelSection
                title="Sage"
                emoji="🧙🏼‍♂️"
                description="Wisdom comes with practice. As a Sage, dive into deeper narratives and refined language to sharpen your understanding."
                stories={stories.sage}
                storiesPerView={storiesPerView}
            />

            <LevelSection
                title="Grand Master"
                emoji="🐉"
                description="Mastery is a journey, not a destination. As a Grand Master, immerse yourself in authentic stories with the depth and nuance of native-level Chinese."
                stories={stories.grandMaster}
                storiesPerView={storiesPerView}
            />

            <DiscoverMoreSection />
        </div>
    );
}