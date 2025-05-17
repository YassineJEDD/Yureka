import { useEffect, useState } from 'react';
import Hero from '../components/Hero.jsx';
import StoryCard from '../components/StoryCard.jsx';
import { stories } from '../../data/stories.js'; // Keep for images
import '../../styles/pages/Home.css';
import { Link } from "react-router-dom";

export default function Home() {
    const [newbieStories, setNewbieStories] = useState([]);
    const [explorerStories, setExplorerStories] = useState([]);
    const [sageStories, setSageStories] = useState([]);
    const [grandMasterStories, setGrandMasterStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost/books');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const books = await response.json();

                const booksWithImages = books.map(book => {
                    // Utiliser l'URL Cloudinary si disponible
                    if (book.image_url) {
                        return {
                            ...book,
                            image: book.image_url
                        };
                    }

                    // Fallback sur stories.js (pour la transition)
                    const matchingStory = stories.find(story =>
                        story.title === book.title ||
                        story.id === book.id
                    );

                    return {
                        ...book,
                        image: matchingStory ? matchingStory.image : null
                    };
                });

                const newbies = booksWithImages.filter(book => book.level === 'newbie');
                const explorers = booksWithImages.filter(book => book.level === 'explorer');
                const sages = booksWithImages.filter(book => book.level === 'sage');
                const grandMasters = booksWithImages.filter(book => book.level === 'grand master');

                setNewbieStories(newbies);
                setExplorerStories(explorers);
                setSageStories(sages);
                setGrandMasterStories(grandMasters);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching books:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return (
            <div className="home-page loading">
                <div className="loading-indicator">Loading stories...</div>
            </div>
        );
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
            <section className="title-home">
                <h2>Choose the level that <br /> fits you and dive into a<br /> adventure.<span className="title-emoji">✨</span></h2>
            </section>

            {/* Newbie Section */}
            <section className="level-section">
                <h2><span className="home-emoji">🐣</span> Newbie</h2>
                <p className="level-description">Every Master starts as a Newbie. Begin your journey by reading easy stories and light novels that match your level.</p>
                <div className="story-grids-container">
                    <div className="story-grid">
                        {newbieStories.length > 0 ? (
                            newbieStories.map(story => (
                                <StoryCard key={story.id} story={story} />
                            ))
                        ) : (
                            [1, 2, 3].map(i => (
                                <div key={i} className="story-card placeholder">
                                    <div className="placeholder-content"></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Explorer Section */}
            <section className="level-section">
                <h2><span className="home-emoji">🗺</span> Explorer</h2>
                <p className="level-description">Every path leads to discovery. As an Explorer, challenge yourself with longer stories and fresh expressions that push your limits.</p>
                <div className="story-grids-container">
                    <div className="story-grid">
                        {explorerStories.length > 0 ? (
                            explorerStories.map(story => (
                                <StoryCard key={story.id} story={story} />
                            ))
                        ) : (
                            [1, 2, 3].map(i => (
                                <div key={i} className="story-card placeholder">
                                    <div className="placeholder-content"></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Sage Section */}
            <section className="level-section">
                <h2><span className="home-emoji">🧌</span> Sage</h2>
                <p className="level-description">Wisdom comes with practice. As a Sage, dive into deeper narratives and refined language to sharpen your understanding.</p>
                <div className="story-grids-container">
                    <div className="story-grid">
                        {sageStories.length > 0 ? (
                            sageStories.map(story => (
                                <StoryCard key={story.id} story={story} />
                            ))
                        ) : (
                            [1, 2, 3].map(i => (
                                <div key={i} className="story-card placeholder">
                                    <div className="placeholder-content"></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Grand Master Section */}
            <section className="level-section">
                <h2><span className="home-emoji">🐉</span> Grand Master</h2>
                <p className="level-description">Mastery is a journey, not a destination. As a Grand Master, immerse yourself in authentic stories with the depth and nuance of <br/> native-level Chinese.</p>
                <div className="story-grids-container">
                    <div className="story-grid">
                        {grandMasterStories.length > 0 ? (
                            grandMasterStories.map(story => (
                                <StoryCard key={story.id} story={story} />
                            ))
                        ) : (
                            [1, 2, 3].map(i => (
                                <div key={i} className="story-card placeholder">
                                    <div className="placeholder-content"></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section className="discover-more-section">
                <div className="discover-more-container">
                    <img src="/public/Yureka-Assets/discover-more.png" alt="Discover More" className="discover-more-img" />
                    <Link to="/discover" className="discover-more-link">
                        <p>Discover more stories</p>
                    </Link>
                </div>
            </section>
        </div>
    );
}