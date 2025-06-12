import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search stories..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;