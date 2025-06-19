const API_URL = 'http://localhost';

export const fetchBooks = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();

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

export const fetchStory = async (storyId) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await fetch(`http://localhost/books/${storyId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const story = await response.json();

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

export const fetchChapters = async () => {
    try {
        const response = await fetch(`${API_URL}/chapters`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const chapters = await response.json();
        return chapters;
    } catch (error) {
        console.error("Error fetching chapters:", error);
        throw error;
    }
};

export const fetchChapter = async (chapterId) => {
    try {
        const response = await fetch(`${API_URL}/chapters/${chapterId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const chapter = await response.json();
        return chapter;
    } catch (error) {
        console.error("Error fetching chapter:", error);
        throw error;
    }
};

export const fetchLevelsByChapter = async (chapterId) => {
    try {
        const response = await fetch(`${API_URL}/levels?chapter_id=${chapterId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const levels = await response.json();
        return levels;
    } catch (error) {
        console.error("Error fetching levels:", error);
        throw error;
    }
};

export const fetchLevel = async (levelId) => {
    try {
        const response = await fetch(`${API_URL}/levels/${levelId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const level = await response.json();
        return level;
    } catch (error) {
        console.error("Error fetching level:", error);
        throw error;
    }
};

export const fetchQuestionsByLevel = async (levelId) => {
    try {
        const response = await fetch(`${API_URL}/levels/${levelId}/questions`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const questions = await response.json();
        return questions;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
};
