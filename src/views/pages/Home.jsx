import { useEffect, useState } from 'react';
import Hero from '../components/Hero.jsx';
import StoryCard from '../components/StoryCard.jsx';
import '../../styles/pages/Home.css';
import { Link } from "react-router-dom";
import Loading from '../components/Loading.jsx';

export default function Home() {
    const [newbieStories, setNewbieStories] = useState([]);
    const [explorerStories, setExplorerStories] = useState([]);
    const [sageStories, setSageStories] = useState([]);
    const [grandMasterStories, setGrandMasterStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newbieIndex, setNewbieIndex] = useState(0);
    const [explorerIndex, setExplorerIndex] = useState(0);
    const [sageIndex, setSageIndex] = useState(0);
    const [grandMasterIndex, setGrandMasterIndex] = useState(0);

    const [storiesPerView, setStoriesPerView] = useState(3);

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
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost/books');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const books = await response.json();

                const booksWithImages = books.map(book => {
                    if (book.image_url) {
                        return {
                            ...book,
                            image: book.image_url
                        };
                    }

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

    const moveCarousel = (direction, stories, currentIndex, setIndex) => {
        if (direction === 'next') {
            setIndex(Math.min(currentIndex + 1, Math.ceil(stories.length / storiesPerView) - 1));
        } else {
            setIndex(Math.max(currentIndex - 1, 0));
        }
    };

    const LevelSection = ({ title, emoji, description, stories, currentIndex, setIndex }) => {
        const hasMoreThanOneSlide = stories.length > storiesPerView;
        const visibleStories = stories.slice(
            currentIndex * storiesPerView,
            (currentIndex * storiesPerView) + storiesPerView
        );

        return (
            <section className="level-section">
                <h2><span className="home-emoji">{emoji}</span> {title}</h2>
                <p className="level-description">{description}</p>
                <div className="carousel-container">
                    {hasMoreThanOneSlide && (
                        <button
                            className={`carousel-button prev ${currentIndex === 0 ? 'disabled' : ''}`}
                            onClick={() => moveCarousel('prev', stories, currentIndex, setIndex)}
                            disabled={currentIndex === 0}
                        >
                            <img
                                src="/public/Yureka-Assets/prev-button.png"
                                alt="Précédent"
                                className="carousel-button-image"
                            />
                        </button>
                    )}

                    <div className="story-grids-container">
                        <div className="story-grid carousel">
                            {visibleStories.length > 0 ? (
                                visibleStories.map(story => (
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

                    {hasMoreThanOneSlide && (
                        <button
                            className={`carousel-button next ${currentIndex >= Math.ceil(stories.length / storiesPerView) - 1 ? 'disabled' : ''}`}
                            onClick={() => moveCarousel('next', stories, currentIndex, setIndex)}
                            disabled={currentIndex >= Math.ceil(stories.length / storiesPerView) - 1}
                        >
                            <img
                                src="/public/Yureka-Assets/next-button.png"
                                alt="Suivant"
                                className="carousel-button-image"
                            />
                        </button>
                    )}
                </div>
            </section>
        );
    };

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
            <section className="title-home">
                <h2>Choose the level that <br /> fits you and dive into a<br /> new adventure.<span className="title-emoji">✨</span></h2>
            </section>

            <LevelSection
                title="Newbie"
                emoji="🐣"
                description="Every Master starts as a Newbie. Begin your journey by reading easy stories and light novels that match your level."
                stories={newbieStories}
                currentIndex={newbieIndex}
                setIndex={setNewbieIndex}
            />

            <LevelSection
                title="Explorer"
                emoji="🗺"
                description="Every path leads to discovery. As an Explorer, challenge yourself with longer stories and fresh expressions that push your limits."
                stories={explorerStories}
                currentIndex={explorerIndex}
                setIndex={setExplorerIndex}
            />

            <LevelSection
                title="Sage"
                emoji="🧙🏼‍♂️"
                description="Wisdom comes with practice. As a Sage, dive into deeper narratives and refined language to sharpen your understanding."
                stories={sageStories}
                currentIndex={sageIndex}
                setIndex={setSageIndex}
            />

            <LevelSection
                title="Grand Master"
                emoji="🐉"
                description="Mastery is a journey, not a destination. As a Grand Master, immerse yourself in authentic stories with the depth and nuance of native-level Chinese."
                stories={grandMasterStories}
                currentIndex={grandMasterIndex}
                setIndex={setGrandMasterIndex}
            />

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
