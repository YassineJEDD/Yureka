import { useState, useEffect } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { markBookAsRead, markBookAsUnread, getUserBooks } from '../../../../services/api';
import './MarkReadButton.css';

export default function MarkReadButton({ bookId }) {
    const { user, isAuthenticated } = useAuth();
    const [isRead, setIsRead] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkReadStatus = async () => {
            if (!isAuthenticated || !user) {
                console.log('Not authenticated or no user');
                return;
            }

            try {
                const userBooks = await getUserBooks(user.id);

                const book = userBooks.find(b => {
                    return (b.id && b.id.toString() === bookId.toString()) ||
                        (b.book_id && b.book_id.toString() === bookId.toString());
                });

                if (book) {
                    console.log('Found book:', book.id, 'is_read:', book.is_read, 'type:', typeof book.is_read);

                    const readStatus = book.is_read === true ||
                        book.is_read === 1 ||
                        book.is_read === '1';

                    console.log('Setting read status to:', readStatus);
                    setIsRead(readStatus);
                } else {
                    console.log('No matching book found for ID:', bookId);
                    setIsRead(false);
                }

            } catch (error) {
                console.error('Error checking read status:', error);
                setIsRead(false);
            }
        };

        checkReadStatus();

        const handleFocus = () => {
            checkReadStatus();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [bookId, user, isAuthenticated]);

    const handleToggleRead = async () => {
        if (!isAuthenticated) {
            alert('Please login to mark books as read');
            return;
        }

        setLoading(true);
        const previousState = isRead;

        try {
            if (isRead) {
                console.log('Marking book as unread:', bookId);
                await markBookAsUnread(user.id, bookId);
                setIsRead(false);
            } else {
                console.log('Marking book as read:', bookId);
                await markBookAsRead(user.id, bookId);
                setIsRead(true);
            }

            setTimeout(async () => {
                try {
                    const userBooks = await getUserBooks(user.id);
                    const book = userBooks.find(b =>
                        (b.id && b.id.toString() === bookId.toString()) ||
                        (b.book_id && b.book_id.toString() === bookId.toString())
                    );

                    if (book) {
                        const verifiedStatus = book.is_read === true ||
                            book.is_read === 1 ||
                            book.is_read === '1';
                        console.log('Verified book status after toggle:', book.is_read, 'Setting to:', verifiedStatus);
                        setIsRead(verifiedStatus);
                    }
                } catch (error) {
                    console.error('Error verifying status:', error);
                }
            }, 500);

        } catch (error) {
            console.error('Error toggling read status:', error);
            alert('Failed to update read status');
            setIsRead(previousState);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <button
            className={`mark-read-button ${isRead ? 'read' : ''}`}
            onClick={handleToggleRead}
            disabled={loading}
        >
            {loading ? 'Loading...' : (isRead ? 'Mark as unread' : 'Mark as Read')}
        </button>
    );
}