import React, {useEffect, useState} from 'react';
import { stories } from '../../data/stories'; // Keep for images
import '../../styles/pages/Discover.css';
import {Link} from "react-router-dom";

export default function Discover() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                    const matchingStory = stories.find(story =>
                        story.title === book.title ||
                        story.id === book.id
                    );

                    return {
                        ...book,
                        image: matchingStory ? matchingStory.image : null
                    };
                });

                setBooks(booksWithImages);
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

    const filteredStories = books.filter(book => {
        const matchesFilter = filter === 'all' || book.level.toLowerCase() === filter.toLowerCase();
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="discover-page loading">
                <div className="loading-indicator">Loading library...</div>
            </div>
        );
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
                    <img src="/public/Yureka-Assets/yureka-reader.png" alt="Yureka character" />
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
                        <span className="filter-icon">🧌</span> Sage
                    </button>
                    <button
                        className={`filter-button ${filter === 'grand master' ? 'active' : ''}`}
                        onClick={() => setFilter('grand master')}
                    >
                        <span className="filter-icon">🐉</span> Master
                    </button>
                </div>
            </div>

            {/* Story Grid */}
            <div className="story-grid-discover">
                {filteredStories.length > 0 ? (
                    filteredStories.map(story => (
                        <Link to={`/read/${story.id}`} key={story.id} className="story-card-discover">
                            <img
                                src={story.image || "/placeholder-story.png"}
                                alt={story.title}
                                className="story-image-discover"
                            />
                            <div className="story-info-discover">
                                <h3 className="story-title-discover">{story.title}</h3>
                                <p className="story-description-discover">{story.description}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="no-results">No stories match your search criteria</div>
                )}
            </div>

            <section className="load-more-section">
                <div className="load-more-container">
                    <img src="/public/Yureka-Assets/discover-more.png" alt="Discover More" className="load-more-img" />
                    <Link to="/discover" className="load-more-link">
                        <p>Load more stories</p>
                    </Link>
                </div>
            </section>
        </div>
    );
}