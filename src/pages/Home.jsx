import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import StoryCard from '../components/StoryCard';
import { stories } from '../data/stories';
import '../styles/pages/Home.css';

export default function Home() {
    const [newbieStories, setNewbieStories] = useState([]);
    const [explorerStories, setExplorerStories] = useState([]);

    useEffect(() => {
        const newbies = stories.filter(story => story.level === 'beginner');
        const explorers = stories.filter(story => story.level === 'intermediate');

        setNewbieStories(newbies);
        setExplorerStories(explorers);
    }, []);

    return (
        <div className="home-page">
            <Hero />

            <section className="title-home">
                <h2>Choose the level that <br /> suits you and dive into a<br />new adventure.<span className="title-emoji">✨</span></h2>
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
                <h2><span className="home-emoji">🗺️</span> Explorer</h2>
                <p className="level-description">Every path leads to discovery. As an Explorer, challenge yourself with longer stories and fresh expressions that push your limits.</p>
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
            </section>

            {/* Sage Section */}
            <section className="level-section">
                <h2><span className="home-emoji">🧌</span> Sage</h2>
                <p className="level-description">Wisdom comes with practice. As a Sage, dive into deeper narratives and refined language to sharpen your understanding.</p>
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
            </section>

            {/* Grand Master Section */}
            <section className="level-section">
                <h2><span className="home-emoji">🐉</span> Grand Master</h2>
                <p className="level-description">Mastery is a journey, not a destination. As a Grand Master, immerse yourself in authentic stories with the depth and nuance of <br/> native-level Chinese.</p>
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
            </section>

            <section className="discover-more-section">
                <div className="discover-more-container">
                    <img src="/Yureka-Assets/discover-more.png" alt="Discover More" className="discover-more-img" />
                    <a href="/discover-more" className="discover-more-link">Discover more stories</a>
                </div>
            </section>
        </div>
    );
}