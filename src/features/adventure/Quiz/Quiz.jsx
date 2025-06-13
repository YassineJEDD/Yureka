import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../../components/ui/Loading/Loading';
import QuizQuestion from './components/QuizQuestion/QuizQuestion';
import QuizComplete from './components/QuizComplete/QuizComplete';
import './Quiz.css';

const API_URL = 'http://localhost';

export default function Quiz() {
    const { levelId } = useParams();
    const [level, setLevel] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const loadLevelAndQuestions = async () => {
            try {
                // Fetch level details
                const levelResponse = await fetch(`${API_URL}/levels/${levelId}`);
                if (!levelResponse.ok) {
                    throw new Error(`HTTP error! status: ${levelResponse.status}`);
                }
                const levelData = await levelResponse.json();
                setLevel(levelData);

                // Fetch questions for this level
                const questionsResponse = await fetch(`${API_URL}/levels/${levelId}/questions`);
                if (!questionsResponse.ok) {
                    throw new Error(`HTTP error! status: ${questionsResponse.status}`);
                }
                const questionsData = await questionsResponse.json();
                setQuestions(questionsData);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching level and questions:", err);
            } finally {
                setLoading(false);
            }
        };

        loadLevelAndQuestions();
        window.scrollTo(0, 0);
    }, [levelId]);

    const handleAnswerSelect = async (answer) => {
        if (isAnswerChecked) return;

        setSelectedAnswer(answer);
        setIsAnswerChecked(true);

        try {
            // Validate answer with the API
            const response = await fetch(`${API_URL}/questions/${questions[currentQuestionIndex].id}/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answer: answer })
            });

            if (!response.ok) {
                throw new Error('Failed to validate answer');
            }

            const result = await response.json();

            if (result.is_correct) {
                // Correct answer
                if (wrongAttempts === 0) {
                    setScore(score + 1);
                }

                // Auto advance after a short delay
                setTimeout(() => {
                    handleNextQuestion();
                }, 1500);
            } else {
                // Wrong answer
                setWrongAttempts(wrongAttempts + 1);

                // Allow retry after a short delay
                setTimeout(() => {
                    setSelectedAnswer(null);
                    setIsAnswerChecked(false);
                }, 1500);
            }
        } catch (err) {
            console.error("Error validating answer:", err);
            // Allow retry on error
            setSelectedAnswer(null);
            setIsAnswerChecked(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerChecked(false);
            setWrongAttempts(0);
        } else {
            setIsComplete(true);
        }
    };

    const handleBackToLevels = () => {
        navigate(`/adventure/chapter/${level?.chapter_id}`);
    };

    const handleRetryQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsComplete(false);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
        setWrongAttempts(0);
    };

    if (loading) {
        return <Loading message="Loading quiz..." className="quiz-page" />;
    }

    if (error) {
        return (
            <div className="quiz-page error">
                <div className="error-message">Error loading quiz: {error}</div>
            </div>
        );
    }

    if (isComplete) {
        return (
            <QuizComplete
                score={score}
                totalQuestions={questions.length}
                levelTitle={level?.title}
                onRetry={handleRetryQuiz}
                onBackToLevels={handleBackToLevels}
            />
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-page">
            <div className="quiz-header">
                <button className="back-button" onClick={handleBackToLevels}>
                    ← Back to Levels
                </button>
                <div className="quiz-info">
                    <h2 className="level-name">{level?.title}</h2>
                    <div className="quiz-progress">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                </div>
            </div>

            <div className="quiz-container">
                {currentQuestion && (
                    <QuizQuestion
                        question={currentQuestion}
                        selectedAnswer={selectedAnswer}
                        isAnswerChecked={isAnswerChecked}
                        wrongAttempts={wrongAttempts}
                        onAnswerSelect={handleAnswerSelect}
                    />
                )}
            </div>

            <div className="quiz-footer">
                <div className="score-display">
                    Score: {score}/{questions.length}
                </div>
            </div>
        </div>
    );
}