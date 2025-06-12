import './MobileDefinitionBox.css';
import '../Desktop/DesktopDefinitionBox.css';

const MobileDefinitionBox = ({
                                 activeSentence,
                                 activeWord,
                                 showPinyin,
                                 setShowPinyin,
                                 isSentenceMode,
                                 onBoxClick,
                                 onBoxMouseEnter
                             }) => {
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
};

export default MobileDefinitionBox;