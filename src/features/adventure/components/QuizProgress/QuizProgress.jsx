import './QuizProgress.css';

export default function QuizProgress({ current, total, theme = {} }) {
    const progress = (current / total) * 100;

    return (
        <div className="quiz-progress">
            <div className="progress-text" style={{ color: theme.progressText || '#91ff00' }}>
                Question {current} of {total}
            </div>
            <div className="progress-bar" style={{
                backgroundColor: theme.progressBarBackground || '#1A2214',
                borderColor: theme.progressBarBorder || '#396200'
            }}>
                <div
                    className="progress-fill"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: theme.progressBarFill || '#91ff00'
                    }}
                />
            </div>
        </div>
    );
}