// src/features/reader/components/MarkReadButton/MarkReadButton.jsx
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
            if (!isAuthenticated || !user) return;

            try {
                const userBooks = await getUserBooks(user.id);
                const book = userBooks.find(b => b.book_id === parseInt(bookId));
                setIsRead(book?.is_read || false);
            } catch (error) {
                console.error('Error checking read status:', error);
            }
        };

        checkReadStatus();
    }, [bookId, user, isAuthenticated]);

    const handleToggleRead = async () => {
        if (!isAuthenticated) {
            // Redirect to login or show message
            alert('Please login to mark books as read');
            return;
        }

        setLoading(true);
        try {
            if (isRead) {
                await markBookAsUnread(user.id, bookId);
                setIsRead(false);
            } else {
                await markBookAsRead(user.id, bookId);
                setIsRead(true);
            }
        } catch (error) {
            console.error('Error toggling read status:', error);
            alert('Failed to update read status');
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
            title={isRead ? 'Mark as unread' : 'Mark as read'}
        >
            {loading ? '...' : (isRead ? '✓' : '○')}
        </button>
    );
}