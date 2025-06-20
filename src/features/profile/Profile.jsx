import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserBooks, markBookAsUnread } from '../../services/api';
import Loading from '../../components/ui/Loading/Loading';
import './Profile.css';

export default function Profile() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [readBooks, setReadBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [currentBookIndex, setCurrentBookIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const loadUserBooks = async () => {
            try {
                const books = await getUserBooks(user.id);
                const mappedBooks = books.map(book => ({
                    ...book,
                    image: book.image_url || book.image || '/src/assets/Yureka-Assets/placeholder.jpg',
                    book_id: book.id || book.book_id
                }));

                const readBooks = mappedBooks.filter(book => {
                    const isRead = book.is_read === true ||
                        book.is_read === 1 ||
                        book.is_read === '1';

                    const hasValidTimestamp = book.marked_read_at &&
                        new Date(book.marked_read_at).getTime() > 0;

                    return isRead && hasValidTimestamp;
                });

                setReadBooks(readBooks);
            } catch (error) {
                console.error('Error loading user books:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserBooks();
    }, [user, isAuthenticated, navigate]);

    const handleMarkAsUnread = async (bookId) => {
        try {
            setLoading(true);
            await markBookAsUnread(user.id, bookId);

            setReadBooks(prevBooks => prevBooks.filter(book => book.book_id.toString() !== bookId.toString()));
        } catch (error) {
            console.error('Error marking book as unread:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const goToPreviousBook = () => {
        setCurrentBookIndex(prevIndex =>
            prevIndex > 0 ? prevIndex - 1 : 0
        );
    };

    const goToNextBook = () => {
        setCurrentBookIndex(prevIndex =>
            prevIndex < readBooks.length - 1 ? prevIndex + 1 : prevIndex
        );
    };

    if (loading) {
        return <Loading message="Loading profile..." className="profile-page" />;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-info">
                    <h1 className="profile-username">{user?.username}</h1>
                    <p className="profile-email">{user?.email}</p>
                    <div className="profile-stats">
                        <div className="stat">
                            <span className="stat-value">{readBooks.length}</span>
                            <span className="stat-label">Books Read</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">0</span>
                            <span className="stat-label">Achievements</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">0</span>
                            <span className="stat-label">Streak Days</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-page-container">
                <div className="profile-tabs">
                    <button
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab ${activeTab === 'books' ? 'active' : ''}`}
                        onClick={() => setActiveTab('books')}
                    >
                        Books Read
                    </button>
                    <button
                        className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </button>
                </div>

                <div className="profile-content">
                    {activeTab === 'overview' && (
                        <div className="overview-section">
                            <h2>Welcome back, {user?.username}!</h2>
                            <p>You've read {readBooks.length} books so far. Keep it up!</p>
                            <div className="recent-activity">
                                <h3>Recent Activity</h3>
                                {readBooks.length > 0 ? (
                                    <ul>
                                        {readBooks.slice(0, 5).map(book => (
                                            <li key={book.book_id}>
                                                {book.title} - Read on {new Date(book.marked_read_at).toLocaleDateString()}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No books read yet. Start exploring the library!</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'books' && (
                        <div className="books-section">
                            <h2>Books You've Read</h2>
                            {readBooks.length > 0 ? (
                                <div className="book-carousel">
                                    <button
                                        className={`book-carousel-button prev ${currentBookIndex === 0 ? 'disabled' : ''}`}
                                        onClick={goToPreviousBook}
                                        disabled={currentBookIndex === 0}
                                    >
                                        <img
                                            src="/src/assets/Yureka-Assets/prev-button.png"
                                            alt="Previous"
                                            className="carousel-button-image"
                                        />
                                    </button>

                                    <div className="book-carousel-content">
                                        <div className="book-item">
                                            <img src={readBooks[currentBookIndex].image || '/placeholder.jpg'} alt={readBooks[currentBookIndex].title} />
                                            <h4>{readBooks[currentBookIndex].title}</h4>
                                            <p className="read-date">
                                                {readBooks[currentBookIndex].marked_read_at && new Date(readBooks[currentBookIndex].marked_read_at).getTime() > 0
                                                    ? `Read on ${new Date(readBooks[currentBookIndex].marked_read_at).toLocaleDateString()}`
                                                    : 'Recently read'}
                                            </p>
                                            <button
                                                className="unread-button"
                                                onClick={() => handleMarkAsUnread(readBooks[currentBookIndex].book_id)}
                                            >
                                                Mark as Unread
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        className={`book-carousel-button next ${currentBookIndex >= readBooks.length - 1 ? 'disabled' : ''}`}
                                        onClick={goToNextBook}
                                        disabled={currentBookIndex >= readBooks.length - 1}
                                    >
                                        <img
                                            src="/src/assets/Yureka-Assets/next-button.png"
                                            alt="Next"
                                            className="carousel-button-image"
                                        />
                                    </button>
                                </div>
                            ) : (
                                <p>You haven't marked any books as read yet.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="settings-section">
                            <h2>Account Settings</h2>
                            <div className="settings-group">
                                <h3>Account Information</h3>
                                <p><strong>Username:</strong> {user?.username}</p>
                                <p><strong>Email:</strong> {user?.email}</p>
                                <p><strong>Member Since:</strong> {new Date(user?.created_at).toLocaleDateString()}</p>
                            </div>
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}