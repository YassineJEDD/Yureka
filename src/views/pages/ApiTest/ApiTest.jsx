import React, { useEffect, useState } from 'react';
import './ApiTest.css';

const ApiTest = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost/books');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched books:', data);
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="api-test-container">
            <h1>Books from API</h1>
            <div className="books-list">
                {books.map(book => (
                    <div key={book.id} className="book-card">
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <p>{book.summary}</p>
                        <p>{book.level}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApiTest;