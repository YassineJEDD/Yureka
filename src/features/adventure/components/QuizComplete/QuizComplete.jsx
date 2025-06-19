import './QuizComplete.css';

export default function QuizComplete({ level, totalQuestions, onComplete }) {
    return (
        <div className="quiz-complete">
            <div className="complete-content">
                <div className="trophy-icon">🏆</div>
                <h1>Level Complete!</h1>
                <p className="complete-message">
                    Congratulations! You've completed {level?.title}
                </p>
                <div className="complete-stats">
                    <div className="stat-item">
                        <span className="stat-label">Questions Completed</span>
                        <span className="stat-value">{totalQuestions}</span>
                    </div>
                </div>
                <button className="continue-button" onClick={onComplete}>
                    Continue to Levels
                </button>
            </div>
        </div>
    );
}