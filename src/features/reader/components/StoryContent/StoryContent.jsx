import './StoryContent.css';

const StoryContent = ({
                          story,
                          activeSentenceIndex,
                          handleSentenceClick,
                          handleWordHover,
                          handleWordLeave,
                          showPinyin
                      }) => {
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
    };

    return (
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
    );
};

export default StoryContent;