import '../Mobile/MobileDefinitionBox.css';
import './DesktopDefinitionBox.css';

const DesktopDefinitionBox = ({ activeSentence, activeWord }) => {
    return (
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
    );
};

export default DesktopDefinitionBox;