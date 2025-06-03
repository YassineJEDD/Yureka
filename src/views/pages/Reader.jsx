/*Current Version*/
import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../../styles/pages/Reader.css'
import Loading from '../components/Loading.jsx'

function UnifiedDefinitionBox({
                                  activeSentence,
                                  activeWord,
                                  showPinyin,
                                  setShowPinyin,
                                  isSentenceMode,
                                  onBoxClick,
                                  onBoxMouseEnter
                              }) {
    return (
        <div
            className="unified-definition-box"
            onClick={onBoxClick}
            onMouseEnter={onBoxMouseEnter}
            style={{ cursor: "pointer" }}
        >
            <div className="definition-content">
                {activeWord && !isSentenceMode ? (
                    <>
                        <span className="chinese-word">{activeWord.chinese}</span>
                        {activeWord.pinyin && (
                            <span className="pinyin">[{activeWord.pinyin}]</span>
                        )}
                        <span className="english-definition">{activeWord.english}</span>
                        {activeWord.part_of_speech && (
                            <span className="part-of-speech">({activeWord.part_of_speech})</span>
                        )}
                    </>
                ) : (
                    <span className="english-definition">{activeSentence.english}</span>
                )}
                <button
                    className={`toggle-pinyin${showPinyin ? " active" : ""}`}
                    onClick={e => {
                        e.stopPropagation();
                        setShowPinyin(!showPinyin);
                    }}
                >
                    拼音 Pinyin
                </button>
            </div>
        </div>
    );
}

export default function Reader() {
    const { storyId } = useParams()
    const [activeSentenceIndex, setActiveSentenceIndex] = useState(null)
    const [activeSentence, setActiveSentence] = useState({
        chinese: "",
        english: ""
    })
    const [activeWord, setActiveWord] = useState(null)
    const [story, setStory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showPinyin, setShowPinyin] = useState(false)
    const [menuPosition, setMenuPosition] = useState(() => ({
        x: window.innerWidth - 200,
        y: 500
    }));
    const [isDragging, setIsDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const menuRef = useRef(null)

    const [isSentenceMode, setIsSentenceMode] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1130)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1130)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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
                }

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

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            setMenuPosition({
                x: newX,
                y: newY
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    const handleDragStart = (e) => {
        if (!menuRef.current) return;

        const rect = menuRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDragging(true);
    };

    const handleSentenceClick = (index) => {
        setActiveSentenceIndex(index)
        setActiveSentence({
            chinese: story.content[index].chinese,
            english: story.content[index].english
        })
        setActiveWord(null)
        if (isMobile) setIsSentenceMode(true)
    }

    const handleWordHover = (word) => {
        setActiveWord(word)
        if (isMobile) setIsSentenceMode(false)
    }

    const handleWordLeave = () => {
        setActiveWord(null)
    }

    const renderSentenceWithWords = (sentence, sentenceIndex) => {
        if (sentence.words && sentence.words.length > 0) {
            const originalText = sentence.chinese;
            let result = [];
            let currentIndex = 0;

            sentence.words.forEach((word, wordIndex) => {
                const wordStartIndex = originalText.indexOf(word.chinese, currentIndex);

                if (wordStartIndex > currentIndex) {
                    const punctuationBefore = originalText.substring(currentIndex, wordStartIndex);
                    if (punctuationBefore) {
                        result.push(
                            <span key={`punct-before-${sentenceIndex}-${wordIndex}`}>
                            {punctuationBefore}
                        </span>
                        );
                    }
                }

                const characters = Array.from(word.chinese);

                let pinyinSyllables = [];
                if (word.pinyin) {
                    pinyinSyllables = word.pinyin.split(/\s+/);

                    if (pinyinSyllables.length !== characters.length) {
                        pinyinSyllables = Array.from(word.pinyin.replace(/\s+/g, ''))
                            .reduce((acc, char, i) => {
                                const index = Math.floor(i * characters.length / word.pinyin.replace(/\s+/g, '').length);
                                if (!acc[index]) acc[index] = '';
                                acc[index] += char;
                                return acc;
                            }, Array(characters.length).fill(''));
                    }
                }

                result.push(
                    <span
                        key={`word-${sentenceIndex}-${wordIndex}`}
                        className="word-container"
                        onMouseEnter={() => handleWordHover(word)}
                        onMouseLeave={handleWordLeave}
                    >
                    {characters.map((char, charIndex) => (
                        <span key={`char-${sentenceIndex}-${wordIndex}-${charIndex}`} className="character-container">
                            {showPinyin && pinyinSyllables[charIndex] && (
                                <span className="pinyin-overlay">
    {pinyinSyllables[charIndex]}
</span>
                            )}
                            <span className="character">{char}</span>
                        </span>
                    ))}
                </span>
                );

                currentIndex = wordStartIndex + word.chinese.length;
            });

            if (currentIndex < originalText.length) {
                const remainingText = originalText.substring(currentIndex);
                result.push(
                    <span key={`punct-end-${sentenceIndex}`}>
                    {remainingText}
                </span>
                );
            }

            return result;
        } else {
            return sentence.chinese;
        }
    }

    if (loading) {
        return <Loading message="Chargement de l'histoire..." className="reader-page" />;
    }

    if (error) return (
        <div className="reader-page error">
            <div className="error-message">Error loading story: {error}</div>
        </div>
    );

    if (!story) return <div>Story not found</div>;

    return (
        <div className="reader-page">
            {/* Floating menu */}
            <div
                ref={menuRef}
                className={`floating-menu ${isDragging ? 'dragging' : ''}`}
                style={{
                    left: `${menuPosition.x}px`,
                    top: `${menuPosition.y}px`
                }}
            >
                <div
                    className="drag-handle"
                    onMouseDown={handleDragStart}
                >
                    <div className="drag-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <button
                    className={`pinyin-toggle ${showPinyin ? 'active' : ''}`}
                    onClick={() => setShowPinyin(!showPinyin)}
                >
                    拼音 <br /> Pinyin
                </button>
            </div>

            {/* Header */}
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

            {/* Banner */}
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
                                <p className="story-description">{story.summary}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* content-section */}
            <div className="content-story-container">
                {/* Regular definitions-container */}
                <div className="story-definition-box">
                    <div className="sentence-definition">
                        {activeSentence.english && (
                            <p className="definition-text">{activeSentence.english}</p>
                        )}
                    </div>
                    <div className="word-definition">
                        {activeWord && (
                            <div className="word-info">
                                <div className="word-details">
                                    <span className="chinese-word">{activeWord.chinese}</span>
                                    {activeWord.pinyin && (
                                        <span className="pinyin">[{activeWord.pinyin}]</span>
                                    )}
                                </div>
                                <div className="english-definition">{activeWord.english}</div>
                                {activeWord.part_of_speech && (
                                    <div className="part-of-speech">({activeWord.part_of_speech})</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* unified box responsive */}
                <UnifiedDefinitionBox
                    activeSentence={activeSentence}
                    activeWord={activeWord}
                    showPinyin={showPinyin}
                    setShowPinyin={setShowPinyin}
                    isSentenceMode={isSentenceMode}
                    onBoxClick={() => setIsSentenceMode(true)}
                    onBoxMouseEnter={() => setIsSentenceMode(false)}
                />

                {/* Story */}
                <div className="story-reader-content">
                    {story.content.length > 0 && (
                        <span
                            className={`first-sentence ${activeSentenceIndex === 0 ? 'active' : ''}`}
                            onClick={() => handleSentenceClick(0)}
                        >
                            {renderSentenceWithWords(story.content[0], 0)}
                        </span>
                    )}
                    <p className="continuous-text">
                        {story.content.slice(1).map((sentence, index) => (
                            <span
                                key={index + 1}
                                className={`sentence ${activeSentenceIndex === index + 1 ? 'active' : ''}`}
                                onClick={() => handleSentenceClick(index + 1)}
                            >
                                {renderSentenceWithWords(sentence, index + 1)}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    )
}
