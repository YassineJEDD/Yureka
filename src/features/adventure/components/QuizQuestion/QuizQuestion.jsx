import './QuizQuestion.css';

export default function QuizQuestion({
                                         question,
                                         selectedAnswer,
                                         showFeedback,
                                         onAnswerSelect,
                                         theme = {}
                                     }) {
    const handleOptionClick = (optionId) => {
        if (!showFeedback) {
            onAnswerSelect(optionId);
        }
    };

    const isOptionCorrect = (option) => {
        return option.is_correct === true ||
            option.is_correct === 1 ||
            option.is_correct === "1" ||
            option.is_correct === "true";
    };

    const getOptionStyle = (option) => {
        const isSelected = selectedAnswer === option.id;
        const correct = isOptionCorrect(option);

        if (showFeedback && isSelected) {
            if (correct) {
                return {
                    backgroundColor: `${theme.quizCorrect}33`,
                    borderColor: theme.quizCorrect,
                    color: theme.quizCorrect
                };
            } else {
                return {
                    backgroundColor: 'rgba(255, 70, 70, 0.2)',
                    borderColor: '#ff4646',
                    color: '#ff4646'
                };
            }
        } else if (isSelected) {
            return {
                backgroundColor: `${theme.quizSelected}33`,
                borderColor: theme.quizSelected
            };
        }

        return {
            borderColor: theme.quizBorder || '#396200'
        };
    };

    return (
        <div className="quiz-question">
            <div className="question-text">
                {question.question_text}
            </div>

            <div className="answer-options">
                {question.answer_options?.map((option) => {
                    const optionStyle = getOptionStyle(option);

                    return (
                        <button
                            key={option.id}
                            className={`answer-option ${
                                selectedAnswer === option.id ? 'selected' : ''
                            }`}
                            onClick={() => handleOptionClick(option.id)}
                            disabled={showFeedback}
                            style={optionStyle}
                        >
                            {option.option_text}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}