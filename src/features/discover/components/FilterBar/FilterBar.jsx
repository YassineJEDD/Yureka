import './FilterBar.css';

const FilterBar = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="story-filters-discover">
            <h2 className="filter-heading">
                <span className="filter-icon">🌴</span> All stories
            </h2>
            <div className="level-filters">
                <button
                    className={`filter-button ${currentFilter === 'all' ? 'active' : ''}`}
                    onClick={() => onFilterChange('all')}
                >
                    <span className="filter-icon">🦉</span> All
                </button>
                <button
                    className={`filter-button ${currentFilter === 'newbie' ? 'active' : ''}`}
                    onClick={() => onFilterChange('newbie')}
                >
                    <span className="filter-icon">🐣</span> Newbie
                </button>
                <button
                    className={`filter-button ${currentFilter === 'explorer' ? 'active' : ''}`}
                    onClick={() => onFilterChange('explorer')}
                >
                    <span className="filter-icon">🗺️</span> Explorer
                </button>
                <button
                    className={`filter-button ${currentFilter === 'sage' ? 'active' : ''}`}
                    onClick={() => onFilterChange('sage')}
                >
                    <span className="filter-icon">🧙🏼‍♂️</span> Sage
                </button>
                <button
                    className={`filter-button ${currentFilter === 'grand master' ? 'active' : ''}`}
                    onClick={() => onFilterChange('grand master')}
                >
                    <span className="filter-icon">🐉</span> Master
                </button>
            </div>
        </div>
    );
};

export default FilterBar;