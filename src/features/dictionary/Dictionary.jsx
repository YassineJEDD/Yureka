import { useState } from 'react';
import './Dictionary.css';

export default function Dictionary() {
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!word.trim()) return;

        setLoading(true);
        setError(null);
        setTranslation(null);

        try {
            const definitionResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`);

            if (!definitionResponse.ok) {
                throw new Error('Word not found');
            }

            const definitionData = await definitionResponse.json();

            const translationResponse = await fetch(
                `https://api.mymemory.translated.net/get?q=${word.trim()}&langpair=en|zh-CN`
            );
            const translationData = await translationResponse.json();

            setTranslation({
                word: word.trim(),
                phonetic: definitionData[0]?.phonetic || '',
                meanings: definitionData[0]?.meanings || [],
                translation: translationData.responseData?.translatedText || ''
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dictionary-container">
            <div className="dictionary-header">
                <h1>English to Chinese Dictionary</h1>
                <p>Look up any English word to get its Chinese translation</p>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Enter an English word"
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Translate
                </button>
            </form>

            {loading && <div className="loading">Loading...</div>}

            {error && <div className="error">{error}</div>}

            {translation && (
                <div className="translation-result">
                    <div className="word-info">
                        <h2>{translation.word}</h2>
                        {translation.phonetic && <p className="phonetic">{translation.phonetic}</p>}
                    </div>

                    <div className="translation-box">
                        <h3>Chinese Translation:</h3>
                        <p className="chinese-translation">{translation.translation}</p>
                    </div>

                    {translation.meanings.length > 0 && (
                        <div className="meanings">
                            <h3>Definitions:</h3>
                            {translation.meanings.map((meaning, index) => (
                                <div key={index} className="meaning-item">
                                    <h4>{meaning.partOfSpeech}</h4>
                                    <ul>
                                        {meaning.definitions.slice(0, 3).map((def, i) => (
                                            <li key={i}>{def.definition}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}