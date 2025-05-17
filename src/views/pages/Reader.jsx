import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { stories } from '../../data/stories.js'
import '../../styles/pages/Reader.css'

export default function Reader() {
    const { storyId } = useParams()
    const [activeSentenceIndex, setActiveSentenceIndex] = useState(null)
    const [activeSentence, setActiveSentence] = useState({
        chinese: "",
        english: ""
    })
    const [story, setStory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await fetch(`http://localhost/books/${storyId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const fetchedStory = await response.json();

                if (fetchedStory.image_url) {
                    const storyWithImage = {
                        ...fetchedStory,
                        image: fetchedStory.image_url,
                        content: fetchedStory.content || []
                    };

                    setStory(storyWithImage);
                    return;
                }

                const matchingStory = stories.find(s =>
                    s.id === parseInt(storyId) ||
                    s.title === fetchedStory.title
                );

                const storyWithImages = {
                    ...fetchedStory,
                    image: matchingStory ? matchingStory.image : null,
                    content: fetchedStory.content || []
                };

                setStory(storyWithImages);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching story:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
        window.scrollTo(0, 0);
    }, [storyId]);

    const handleSentenceClick = (index) => {
        setActiveSentenceIndex(index)
        setActiveSentence({
            chinese: story.content[index].chinese,
            english: story.content[index].english
        })
    }

    if (loading) return (
        <div className="reader-page loading">
            <div className="loading-indicator">Loading story...</div>
        </div>
    );

    if (error) return (
        <div className="reader-page error">
            <div className="error-message">Error loading story: {error}</div>
        </div>
    );

    if (!story) return <div>Story not found</div>;

    return (
        <div className="reader-page">
            {/* Header Component */}
            <header className="simple-header">
                <div className="header-content">
                    <Link to="/" >
                        <img src="/public/Yureka-Assets/yureka-m-logo.png" alt="Logo" className="logo-yureka-reader" />
                    </Link>

                    <div className="story-title-header">
                        {story.title}
                    </div>

                    <div>
                        <Link to="/profile">
                            <img src="/public/Yureka-Assets/profile-icon.png" alt="profile-icon" className="profile-icon-reader" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Story Banner Section */}
            <div className="reader">
                <div className="story-banner">
                    <div className="story-banner-image" style={{ backgroundImage: `url(${story.image})` }}>
                        <div className="story-banner-overlay">
                            <div className="story-info-container">
                                <h1 className="banner-title">
                                    {story.title.split(' ').map((word, index) => (
                                        <span key={index} className="title-word">{word}</span>
                                    ))}
                                </h1>
                                <div className="level-badge-container">
                                    <span className={`level-badge ${story.level.toLowerCase().replace(" ", "-")}`}>
                                        {story.level === "newbie" && <span className="level-emoji">🐣 </span>}
                                        {story.level === "explorer" && <span className="level-emoji">🗺 </span>}
                                        {story.level === "sage" && <span className="level-emoji">🧌 </span>}
                                        {story.level === "grand master" && <span className="level-emoji">🐉 </span>}
                                        {story.level}
                                    </span>
                                </div>
                                <p className="story-description">{story.summary}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Content Section */}
            <div className="content-story-container">
                {/* Definition Box (Sticky) */}
                <div className="story-definition-box">
                    <div className="sentence-definition">
                        {activeSentence.english && (
                            <p className="definition-text">{activeSentence.english}</p>
                        )}
                    </div>
                    <div className="word-definition">
                        {/* Word definition will be implemented later */}
                    </div>
                </div>

                {/* Story Sentences List */}
                <div className="story-reader-content">
                    {story.content.map((sentence, index) => (
                        <div
                            key={index}
                            className={`sentence-reader ${activeSentenceIndex === index ? 'active' : ''}`}
                            onClick={() => handleSentenceClick(index)}
                        >
                            <p className="chinese">{sentence.chinese}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}