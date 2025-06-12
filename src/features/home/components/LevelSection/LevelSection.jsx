import StoryCard from '../../../../components/ui/StoryCard/StoryCard';
import Carousel from '../Carousel/Carousel';
import './LevelSection.css';

const LevelSection = ({ title, emoji, description, stories, storiesPerView }) => {
    const storyElements = stories.length > 0
        ? stories.map(story => <StoryCard key={story.id} story={story} />)
        : [1, 2, 3].map(i => (
            <div key={i} className="story-card placeholder">
                <div className="placeholder-content"></div>
            </div>
        ));

    return (
        <section className="level-section">
            <h2><span className="home-emoji">{emoji}</span> {title}</h2>
            <p className="level-description">{description}</p>
            <Carousel itemsCount={stories.length || 3} itemsPerView={storiesPerView}>
                {storyElements}
            </Carousel>
        </section>
    );
};

export default LevelSection;