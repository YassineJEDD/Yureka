import StoryCard from '../../../../components/ui/StoryCard/StoryCard';
import './GenreSection.css';

const GenreSection = ({
                          genre,
                          stories,
                          currentIndex,
                          storiesPerView,
                          onMoveCarousel
                      }) => {
    const hasMoreThanOneSlide = stories.length > storiesPerView;
    const visibleStories = stories.slice(
        currentIndex * storiesPerView,
        (currentIndex * storiesPerView) + storiesPerView
    );
    const maxIndex = Math.max(0, Math.ceil(stories.length / storiesPerView) - 1);

    return (
        <section className="level-section">
            <h2>
                <img
                    src={`/src/assets/discover-genre-logo/${genre.toLowerCase().replace(/\s+/g, '-')}.png`}
                    className="genre-logo"
                    alt={genre}
                    style={{ width: 32, height: 32, marginRight: 8, verticalAlign: 'middle' }}
                />
                {genre}
            </h2>
            <div className="carousel-container">
                {hasMoreThanOneSlide && (
                    <button
                        className={`carousel-button prev ${currentIndex === 0 ? 'disabled' : ''}`}
                        onClick={() => onMoveCarousel('prev')}
                        disabled={currentIndex === 0}
                    >
                        <img
                            src="/src/assets/Yureka-Assets/prev-button.png"
                            alt="Previous"
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
                        onClick={() => onMoveCarousel('next')}
                        disabled={currentIndex >= maxIndex}
                    >
                        <img
                            src="/src/assets/Yureka-Assets/next-button.png"
                            alt="Next"
                            className="carousel-button-image"
                        />
                    </button>
                )}
            </div>
        </section>
    );
};

export default GenreSection;