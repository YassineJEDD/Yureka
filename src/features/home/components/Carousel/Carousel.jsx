import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ children, itemsCount, itemsPerView }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const hasMultipleSlides = itemsCount > itemsPerView;
    const maxIndex = Math.ceil(itemsCount / itemsPerView) - 1;

    const moveCarousel = (direction) => {
        if (direction === 'next') {
            setCurrentIndex(Math.min(currentIndex + 1, maxIndex));
        } else {
            setCurrentIndex(Math.max(currentIndex - 1, 0));
        }
    };

    const visibleChildren = React.Children.toArray(children).slice(
        currentIndex * itemsPerView,
        (currentIndex * itemsPerView) + itemsPerView
    );

    return (
        <div className="carousel-container">
            {hasMultipleSlides && (
                <button
                    className={`carousel-button prev ${currentIndex === 0 ? 'disabled' : ''}`}
                    onClick={() => moveCarousel('prev')}
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
                    {visibleChildren}
                </div>
            </div>

            {hasMultipleSlides && (
                <button
                    className={`carousel-button next ${currentIndex >= maxIndex ? 'disabled' : ''}`}
                    onClick={() => moveCarousel('next')}
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
    );
};

export default Carousel;