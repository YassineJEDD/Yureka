import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStory } from '../../services/api';
import ReaderHeader from './components/ReaderHeader/ReaderHeader';
import StoryBanner from './components/StoryBanner/StoryBanner';
import FloatingMenu from './components/FloatingMenu/FloatingMenu';
import DesktopDefinitionBox from './components/DefinitionBox/Desktop/DesktopDefinitionBox.jsx';
import MobileDefinitionBox from './components/DefinitionBox/Mobile/MobileDefinitionBox.jsx';
import StoryContent from './components/StoryContent/StoryContent';
import Loading from '../../components/ui/Loading/Loading';
import './Reader.css';

export default function Reader() {
    const { storyId } = useParams();
    const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
    const [activeSentence, setActiveSentence] = useState({
        chinese: "",
        english: ""
    });
    const [activeWord, setActiveWord] = useState(null);
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPinyin, setShowPinyin] = useState(false);
    const [isSentenceMode, setIsSentenceMode] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1130);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1130);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const loadStory = async () => {
            try {
                const fetchedStory = await fetchStory(storyId);
                setStory(fetchedStory);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching story:", err);
            } finally {
                setLoading(false);
            }
        };

        loadStory();
        window.scrollTo(0, 0);
    }, [storyId]);

    const handleSentenceClick = (index) => {
        setActiveSentenceIndex(index);
        setActiveSentence({
            chinese: story.content[index].chinese,
            english: story.content[index].english
        });
        setActiveWord(null);
        if (isMobile) setIsSentenceMode(true);
    };

    const handleWordHover = (word) => {
        setActiveWord(word);
        if (isMobile) setIsSentenceMode(false);
    };

    const handleWordLeave = () => {
        setActiveWord(null);
    };

    if (loading) {
        return <Loading message="Loading story..." className="reader-page" />;
    }

    if (error) {
        return (
            <div className="reader-page error">
                <div className="error-message">Error loading story: {error}</div>
            </div>
        );
    }

    if (!story) return <div>Story not found</div>;

    return (
        <div className="reader-page">
            {/* Floating menu desktop */}
            <FloatingMenu
                showPinyin={showPinyin}
                setShowPinyin={setShowPinyin}
                initialPosition={{
                    x: window.innerWidth - 200,
                    y: 500
                }}
            />

            {/* Header */}
            <ReaderHeader title={story.title} />

            <div className="reader">
                {/* Banner */}
                <StoryBanner
                    title={story.title}
                    summary={story.summary}
                    image={story.image}
                />
            </div>

            {/* Content section */}
            <div className="content-story-container">
                {/* Desktop definition box */}
                <DesktopDefinitionBox
                    activeSentence={activeSentence}
                    activeWord={activeWord}
                />

                {/* Mobile definition box */}
                <MobileDefinitionBox
                    activeSentence={activeSentence}
                    activeWord={activeWord}
                    showPinyin={showPinyin}
                    setShowPinyin={setShowPinyin}
                    isSentenceMode={isSentenceMode}
                    onBoxClick={() => setIsSentenceMode(true)}
                    onBoxMouseEnter={() => setIsSentenceMode(false)}
                />

                {/* Story content */}
                <StoryContent
                    story={story}
                    activeSentenceIndex={activeSentenceIndex}
                    handleSentenceClick={handleSentenceClick}
                    handleWordHover={handleWordHover}
                    handleWordLeave={handleWordLeave}
                    showPinyin={showPinyin}
                />
            </div>
        </div>
    );
}