// src/services/api.js
const API_URL = 'http://localhost';

export const fetchBooks = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();

        // Process books with images
        return books.map(book => ({
            ...book,
            image: book.image_url || ''
        }));
    } catch (error) {
        throw error;
    }
};

export const getBooksByLevel = (books, level) => {
    return books.filter(book => book.level === level);
};

// src/services/api.js - Add these functions

export const getGenresFromBooks = (books) => {
    return Array.from(
        new Set(
            books.flatMap(book =>
                Array.isArray(book.genre)
                    ? book.genre
                    : (book.genre ? [book.genre] : [])
            )
        )
    );
};

export const getBooksByGenre = (books, genre) => {
    return books.filter(book =>
        Array.isArray(book.genre)
            ? book.genre.includes(genre)
            : book.genre === genre
    );
};

export const filterBooks = (books, { level = 'all', searchTerm = '' }) => {
    return books.filter(book => {
        const matchesLevel = level === 'all' || book.level?.toLowerCase() === level.toLowerCase();
        const matchesSearch = !searchTerm ||
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesLevel && matchesSearch;
    });
};

// src/services/api.js - Add these functions

export const fetchStory = async (storyId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch(`http://localhost/books/${storyId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const story = await response.json();

        // Process story with image
        if (story.image_url) {
            return {
                ...story,
                image: story.image_url,
                content: story.content || []
            };
        }
        return story;
    } catch (error) {
        throw error;
    }
};