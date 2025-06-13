import './QuizComplete.css';

export default function QuizComplete({
                                         score,
                                         totalQuestions,
                                         levelTitle,
                                         onRetry,
                                         onBackToLevels
                                     }) {
    const percentage = Math.round((score / totalQuestions) * 100);

    const getGrade = () => {
        if (percentage >= 90) return { grade: 'A+', message: 'Outstanding!', color: '#00ff00' };
        if (percentage >= 80) return { grade: 'A', message: 'Excellent!', color: '#91ff00' };
        if (percentage >= 70) return { grade: 'B', message: 'Good job!', color: '#ffff00' };
        if (percentage >= 60) return { grade: 'C', message: 'Not bad!', color: '#ff9900' };
        return { grade: 'D', message: 'Keep practicing!', color: '#ff6666' };
    };

    const gradeInfo = getGrade();

    return (
        <div className="quiz-complete">
            <div className="complete-container">
                <h2 className="complete-title">Level Complete!</h2>

                <div className="level-info">
                    <p className="level-completed">{levelTitle}</p>
                </div>

                <div className="score-section">
                    <div className="score-circle" style={{ borderColor: gradeInfo.color }}>
                        <div className="grade" style={{ color: gradeInfo.color }}>
                            {gradeInfo.grade}
                        </div>
                        <div className="percentage">{percentage}%</div>
                    </div>

                    <div className="score-details">
                        <p className="score-text">
                            You scored <span className="score-highlight">{score}</span> out of{' '}
                            <span className="total-highlight">{totalQuestions}</span>
                        </p>
                        <p className="grade-message" style={{ color: gradeInfo.color }}>
                            {gradeInfo.message}
                        </p>
                    </div>
                </div>

                <div className="achievement-section">
                    {percentage === 100 && (
                        <div className="achievement perfect">
                            <span className="achievement-icon">⭐</span>
                            <span className="achievement-text">Perfect Score!</span>
                        </div>
                    )}
                    {percentage >= 80 && percentage < 100 && (
                        <div className="achievement excellent">
                            <span className="achievement-icon">🌟</span>
                            <span className="achievement-text">Great Performance!</span>
                        </div>
                    )}
                </div>

                <div className="action-buttons">
                    <button className="retry-button" onClick={onRetry}>
                        Try Again
                    </button>
                    <button className="back-button primary" onClick={onBackToLevels}>
                        Back to Levels
                    </button>
                </div>
            </div>
        </div>
    );
}