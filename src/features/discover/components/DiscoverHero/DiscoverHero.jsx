import './DiscoverHero.css';

const DiscoverHero = () => {
    return (
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
                <img src="/src/assets/Yureka-Assets/yureka-library-banner-discover.png" alt="Yureka Library" />
            </div>
        </div>
    );
};

export default DiscoverHero;