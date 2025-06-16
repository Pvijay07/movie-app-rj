import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX, FiLoader } from 'react-icons/fi';

const EnhancedAutoComplete = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
        const API_KEY =
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRhYmYwNzk1MmI0ZTJhOGM3NGE3MjBhZDZhNjBjMCIsIm5iZiI6MTcyMjA4MTg0OS40NTI5OTk4LCJzdWIiOiI2NmE0ZTIzOWY0MjU5YjUzMTc2MDA5ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Plz6e6M8zpPA1n_gqT3XDJm0y_KEaTXhlbZHseN6hQ0";

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 2) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const performSearch = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setResults(data.results.slice(0, 8)); // Limit to 8 results
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Arrow down
    if (e.key === 'ArrowDown' && activeIndex < results.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    // Arrow up
    else if (e.key === 'ArrowUp' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    // Enter
    else if (e.key === 'Enter' && activeIndex >= 0) {
      handleSelect(results[activeIndex]);
    }
    // Escape
    else if (e.key === 'Escape') {
      setResults([]);
      inputRef.current.blur();
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setQuery(item.title || item.name);
    setResults([]);
    // You would typically navigate to the item's page here
    console.log('Selected:', item);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedItem(null);
    inputRef.current.focus();
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <FiSearch className="absolute left-3 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search movies, TV shows, people..."
          className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <FiX />
          </button>
        )}
      </div>

      {loading && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4 flex justify-center">
            <FiLoader className="animate-spin text-blue-500" />
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
        >
          {results.map((item, index) => (
            <div
              key={`${item.id}-${item.media_type}`}
              className={`p-3 hover:bg-blue-50 cursor-pointer flex items-center transition-colors ${
                index === activeIndex ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleSelect(item)}
            >
              <div className="flex-shrink-0 w-12 h-16 bg-gray-100 rounded overflow-hidden mr-3">
                {item.poster_path || item.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${
                      item.poster_path || item.profile_path
                    }`}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FiFilm />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{item.title || item.name}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="capitalize">
                    {item.media_type === 'person' ? 'Person' : item.media_type}
                  </span>
                  {item.release_date && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{item.release_date.substring(0, 4)}</span>
                    </>
                  )}
                  {item.first_air_date && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{item.first_air_date.substring(0, 4)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default EnhancedAutoComplete;
