import './QuizQuestion.css';

export default function QuizQuestion({
                                         question,
                                         selectedAnswer,
                                         isAnswerChecked,
                                         wrongAttempts,
                                         onAnswerSelect
                                     }) {
    const getAnswerClassName = (option) => {
        let className = 'answer-option';

        if (selectedAnswer === option.option_text || selectedAnswer === option.id) {
            if (isAnswerChecked) {
                className += option.is_correct ? ' correct' : ' incorrect';
            } else {
                className += ' selected';
            }
        }

        if (isAnswerChecked && option.is_correct) {
            className += ' show-correct';
        }

        return className;
    };

    const getExerciseTypeDisplay = (type) => {
        const displayNames = {
            'word_translation': 'Translation',
            'pinyin_matching': 'Pinyin Match',
            'chinese_matching': 'Chinese Match',
            'part_of_speech': 'Grammar'
        };
        return displayNames[type] || type;
    };

    return (
        <div className="quiz-question">
            <div className="question-header">
                <span className="exercise-type">
                    {getExerciseTypeDisplay(question.exercise_type_name)}
                </span>
                {wrongAttempts > 0 && (
                    <span className="wrong-attempts">
                        Attempts: {wrongAttempts}
                    </span>
                )}
            </div>

            <div className="question-content">
                <h3 className="question-text">{question.question_text}</h3>

                {/* Show vocabulary word details if available */}
                {question.vocabulary_words && question.vocabulary_words.length > 0 && (
                    <div className="vocabulary-hint">
                        {question.vocabulary_words.map((word, index) => (
                            <div key={index} className="vocab-word">
                                <span className="chinese">{word.chinese_characters}</span>
                                <span className="pinyin">[{word.pinyin}]</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="answer-options">
                {question.answer_options.map((option) => (
                    <button
                        key={option.id}
                        className={getAnswerClassName(option)}
                        onClick={() => onAnswerSelect(option.option_text)}
                        disabled={isAnswerChecked}
                    >
                        {option.option_text}
                    </button>
                ))}
            </div>

            {isAnswerChecked && (
                <div className="feedback">
                    {selectedAnswer && !question.answer_options.find(
                        opt => (opt.option_text === selectedAnswer || opt.id === selectedAnswer) && opt.is_correct
                    ) ? (
                        <p className="feedback-text incorrect">
                            Try again! The correct answer will be highlighted.
                        </p>
                    ) : (
                        <p className="feedback-text correct">
                            Correct! Moving to next question...
                        </p>
                    )}
                    {question.explanation && (
                        <p className="explanation">{question.explanation}</p>
                    )}
                </div>
            )}
        </div>
    );
}