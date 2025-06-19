import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLevel, fetchQuestionsByLevel } from '../../../services/api.js';
import { chapterThemes } from '../themes.js';
import QuizQuestion from '../components/QuizQuestion/QuizQuestion.jsx';
import QuizProgress from '../components/QuizProgress/QuizProgress.jsx';
import QuizComplete from '../components/QuizComplete/QuizComplete.jsx';
import Loading from '../../../components/ui/Loading/Loading.jsx';
import './Quiz.css';
import closeButtonImage from '../../../assets/Adventure-Assets/black-X.png';

export default function Quiz() {
    const { chapterId, levelId } = useParams();
    const navigate = useNavigate();
    const [level, setLevel] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const theme = chapterThemes[chapterId] || chapterThemes[1];


    useEffect(() => {
        const loadQuizData = async () => {
            try {
                const [fetchedLevel, fetchedQuestions] = await Promise.all([
                    fetchLevel(levelId),
                    fetchQuestionsByLevel(levelId)
                ]);
                setLevel(fetchedLevel);
                const sortedQuestions = fetchedQuestions.sort((a, b) =>
                    (a.order_index || a.id) - (b.order_index || b.id)
                );
                setQuestions(sortedQuestions);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching quiz data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadQuizData();
    }, [levelId]);

    const handleAnswerSelect = async (answerId) => {
        setSelectedAnswer(answerId);
        setShowFeedback(true);

        const currentQuestion = questions[currentQuestionIndex];

        let correct = false;
        if (currentQuestion.answer_options && currentQuestion.answer_options.length > 0) {
            const selectedOption = currentQuestion.answer_options.find(opt => opt.id === answerId);

            console.log('Selected option:', selectedOption);
            console.log('is_correct value:', selectedOption?.is_correct);
            console.log('is_correct type:', typeof selectedOption?.is_correct);

            correct = selectedOption && (
                selectedOption.is_correct === true ||
                selectedOption.is_correct === 1 ||
                selectedOption.is_correct === "1" ||
                selectedOption.is_correct === "true"
            );
        } else {
            correct = false;
        }

        console.log('Answer is correct:', correct);

        setIsCorrect(correct);
    };

    const handleContinue = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setIsCorrect(false);
        } else {
            setQuizComplete(true);
        }
    };

    const handleRetry = () => {
        setSelectedAnswer(null);
        setShowFeedback(false);
        setIsCorrect(false);
    };

    const handleQuizComplete = () => {
        navigate(`/adventure/chapter/${chapterId}`);
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

    if (quizComplete) {
        return (
            <QuizComplete
                level={level}
                totalQuestions={questions.length}
                onComplete={handleQuizComplete}
            />
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-page">
            <div className="quiz-header" style={{
                background: theme.header,
                borderBottom: `2px solid ${theme.headerBorder}`
            }}>
                <div className="title-progress-column">
                    <h1 style={{ color: theme.title }}>{level?.title}</h1>
                    <QuizProgress
                        current={currentQuestionIndex + 1}
                        total={questions.length}
                        theme={theme}
                    />
                </div>
                <div className="quiz-exit-button" onClick={() => navigate(`/adventure/chapter/${chapterId}`)}>
                    <img src={closeButtonImage} alt="Close" />
                </div>
            </div>

            <div className="quiz-container">
                {currentQuestion && (
                    <QuizQuestion
                        question={currentQuestion}
                        selectedAnswer={selectedAnswer}
                        showFeedback={showFeedback}
                        isCorrect={isCorrect}
                        onAnswerSelect={handleAnswerSelect}
                        theme={theme}
                    />
                )}
            </div>

            <div className="quiz-footer" style={{
                background: theme.header,
                borderTop: `2px solid ${theme.headerBorder}`
            }}>
                <div className="footer-content-container">
                    {showFeedback && (
                        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                            {isCorrect ? (
                                <div className="feedback-content">
                                    <span>Correct!</span>
                                </div>
                            ) : (
                                <div className="feedback-content">
                                    <span>Incorrect. Try again!</span>
                                    <button className="retry-button" onClick={handleRetry}>
                                        Retry
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        className="continue-button"
                        disabled={!isCorrect || !showFeedback}
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}