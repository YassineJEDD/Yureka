import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserBooks } from '../../services/api';
import Loading from '../../components/ui/Loading/Loading';
import './Profile.css';

export default function Profile() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [readBooks, setReadBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const loadUserBooks = async () => {
            try {
                const books = await getUserBooks(user.id);
                // Map the books to ensure image property is correctly set
                const mappedBooks = books.map(book => ({
                    ...book,
                    image: book.image_url || book.image || '/src/assets/Yureka-Assets/placeholder.jpg'
                }));
                // Only consider books as read if they have a valid timestamp
                setReadBooks(mappedBooks.filter(book =>
                    book.is_read && book.marked_read_at && new Date(book.marked_read_at).getTime() > 0
                ));
            } catch (error) {
                console.error('Error loading user books:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserBooks();
    }, [user, isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return <Loading message="Loading profile..." className="profile-page" />;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
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
                                <div className="books-grid">
                                    {readBooks.map(book => (
                                        <div key={book.book_id} className="book-item">
                                            <img src={book.image || '/placeholder.jpg'} alt={book.title} />
                                            <h4>{book.title}</h4>
                                            <p className="read-date">
                                                {book.marked_read_at && new Date(book.marked_read_at).getTime() > 0
                                                    ? `Read on ${new Date(book.marked_read_at).toLocaleDateString()}`
                                                    : 'Recently read'}
                                            </p>
                                        </div>
                                    ))}
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