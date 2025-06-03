import React, { useEffect, useState } from 'react';
import '../../styles/pages/Discover.css';
import '../../styles/pages/Home.css';
import { Link } from "react-router-dom";
import StoryCard from '../components/StoryCard';
import Loading from '../components/Loading';

export default function Discover() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [carouselIndexes, setCarouselIndexes] = useState({});
    const [storiesPerView, setStoriesPerView] = useState(3);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost/books');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const fetchedBooks = await response.json();

                const booksWithImages = fetchedBooks.map(book => {
                    if (book.image_url) {
                        return {
                            ...book,
                            image: book.image_url
                        };
                    }
                });

                setBooks(booksWithImages);

                const allGenres = Array.from(
                    new Set(
                        booksWithImages.flatMap(book =>
                            Array.isArray(book.genre)
                                ? book.genre
                                : (book.genre ? [book.genre] : [])
                        )
                    )
                );
                setGenres(allGenres);

                const initialIndexes = {};
                allGenres.forEach(genre => {
                    initialIndexes[genre] = 0;
                });
                setCarouselIndexes(initialIndexes);

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

    const filteredStories = books.filter(book => {
        const matchesFilter = filter === 'all' || book.level?.toLowerCase() === filter.toLowerCase();
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const moveCarousel = (genre, direction, storiesForGenre) => {
        setCarouselIndexes(prev => {
            const maxIndex = Math.max(0, Math.ceil(storiesForGenre.length / storiesPerView) - 1);
            const currentIndex = prev[genre] || 0;
            let newIndex = currentIndex;
            if (direction === 'next') {
                newIndex = Math.min(currentIndex + 1, maxIndex);
            } else {
                newIndex = Math.max(currentIndex - 1, 0);
            }
            return { ...prev, [genre]: newIndex };
        });
    };

    if (loading) {
        return <Loading message="Loading of the library..." className="discover-page" />;
    }

    if (error) {
        return (
            <div className="discover-page error">
                <div className="error-message">Error loading stories: {error}</div>
            </div>
        );
    }

    return (
        <div className="discover-page">
            {/* Hero Section */}
            <div className="library-hero">
                <div className="hero-content">
                    <h1>Library</h1>
                    <h2 className="hero-subline">-</h2>
                    <p className="hero-text">
                        Here, you'll find stories of every level and genre. Just pick what suits
                        you, and dive into Yureka's vast library.
                    </p>
                </div>
                <div className="hero-image-discover">
                    <img src="/public/Yureka-Assets/yureka-library-banner-discover.png" alt="Yureka Library" />
                </div>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search stories..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div className="story-filters-discover">
                <h2 className="filter-heading">
                    <span className="filter-icon">🌴</span> All stories
                </h2>
                <div className="level-filters">
                    <button
                        className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        <span className="filter-icon">🦉</span> All
                    </button>
                    <button
                        className={`filter-button ${filter === 'newbie' ? 'active' : ''}`}
                        onClick={() => setFilter('newbie')}
                    >
                        <span className="filter-icon">🐣</span> Newbie
                    </button>
                    <button
                        className={`filter-button ${filter === 'explorer' ? 'active' : ''}`}
                        onClick={() => setFilter('explorer')}
                    >
                        <span className="filter-icon">🗺️</span> Explorer
                    </button>
                    <button
                        className={`filter-button ${filter === 'sage' ? 'active' : ''}`}
                        onClick={() => setFilter('sage')}
                    >
                        <span className="filter-icon">🧙🏼‍♂️</span> Sage
                    </button>
                    <button
                        className={`filter-button ${filter === 'grand master' ? 'active' : ''}`}
                        onClick={() => setFilter('grand master')}
                    >
                        <span className="filter-icon">🐉</span> Master
                    </button>
                </div>
            </div>

            {/* Sections par genre */}
            <div className="genre-sections">
                {genres.map((genre) => {
                    const storiesForGenre = filteredStories.filter(book =>
                        Array.isArray(book.genre)
                            ? book.genre.includes(genre)
                            : book.genre === genre
                    );
                    const currentIndex = carouselIndexes[genre] || 0;
                    const hasMoreThanOneSlide = storiesForGenre.length > storiesPerView;
                    const visibleStories = storiesForGenre.slice(
                        currentIndex * storiesPerView,
                        (currentIndex * storiesPerView) + storiesPerView
                    );
                    const maxIndex = Math.max(0, Math.ceil(storiesForGenre.length / storiesPerView) - 1);

                    return (
                        <section className="level-section" key={genre}>
                            <h2>
                                <img
                                    src={`/discover-genre-logo/${genre.toLowerCase().replace(/\s+/g, '-')}.png`}
                                    className="genre-logo"
                                    style={{ width: 32, height: 32, marginRight: 8, verticalAlign: 'middle' }}
                                />
                                {genre}
                            </h2>
                            <div className="carousel-container">
                                {hasMoreThanOneSlide && (
                                    <button
                                        className={`carousel-button prev ${currentIndex === 0 ? 'disabled' : ''}`}
                                        onClick={() => moveCarousel(genre, 'prev', storiesForGenre)}
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
                                            <div className="no-results-genre">
                                                No result, try something else.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {hasMoreThanOneSlide && (
                                    <button
                                        className={`carousel-button next ${currentIndex >= maxIndex ? 'disabled' : ''}`}
                                        onClick={() => moveCarousel(genre, 'next', storiesForGenre)}
                                        disabled={currentIndex >= maxIndex}
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
                })}
            </div>

        </div>
    );
}
