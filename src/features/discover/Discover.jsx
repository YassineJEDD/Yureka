import { useEffect, useState } from 'react';
import { fetchBooks, getGenresFromBooks, filterBooks, getBooksByGenre } from '../../services/api';
import DiscoverHero from './components/DiscoverHero/DiscoverHero';
import SearchBar from './components/SearchBar/SearchBar';
import FilterBar from './components/FilterBar/FilterBar';
import GenreSection from './components/GenreSection/GenreSection';
import Loading from '../../components/ui/Loading/Loading';
import './Discover.css';


export default function Discover() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [carouselIndexes, setCarouselIndexes] = useState({});
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
        const loadBooks = async () => {
            try {
                const fetchedBooks = await fetchBooks();
                setBooks(fetchedBooks);

                const allGenres = getGenresFromBooks(fetchedBooks);
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

        loadBooks();
        window.scrollTo(0, 0);
    }, []);

    const moveCarousel = (genre, direction, storiesCount) => {
        setCarouselIndexes(prev => {
            const maxIndex = Math.max(0, Math.ceil(storiesCount / storiesPerView) - 1);
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

    const filteredBooks = filterBooks(books, { level: filter, searchTerm });

    return (
        <div className="discover-page">
            <DiscoverHero />

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <FilterBar
                currentFilter={filter}
                onFilterChange={setFilter}
            />

            <div className="genre-sections">
                {genres.map((genre) => {
                    const storiesForGenre = getBooksByGenre(filteredBooks, genre);
                    const currentIndex = carouselIndexes[genre] || 0;

                    return (
                        <GenreSection
                            key={genre}
                            genre={genre}
                            stories={storiesForGenre}
                            currentIndex={currentIndex}
                            storiesPerView={storiesPerView}
                            onMoveCarousel={(direction) =>
                                moveCarousel(genre, direction, storiesForGenre.length)
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}