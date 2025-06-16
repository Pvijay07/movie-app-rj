import React, { useState, useEffect } from "react";
// import { API_KEY, API_URL } from "../config";

const AutoCompleteSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRhYmYwNzk1MmI0ZTJhOGM3NGE3MjBhZDZhNjBjMCIsIm5iZiI6MTcyMjA4MTg0OS40NTI5OTk4LCJzdWIiOiI2NmE0ZTIzOWY0MjU5YjUzMTc2MDA5ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Plz6e6M8zpPA1n_gqT3XDJm0y_KEaTXhlbZHseN6hQ0";
        const API_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchSearchResults(query);
    }, 300); // Debounce delay

    return () => clearTimeout(timer);
  }, [query]);

  const fetchSearchResults = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          searchQuery
        )}&page=1&include_adult=false`
      );
      const data = await response.json();
      setResults(data.results);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    setQuery(item.title || item.name);
    setShowDropdown(false);
    // Navigate to item page or perform other action
  };

  return (
    <div className="search-container relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies, TV shows..."
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onFocus={() => results.length > 0 && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />

      {loading && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg p-2">
          <div className="p-2 text-gray-500">Searching...</div>
        </div>
      )}

      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg max-h-80 overflow-y-auto z-50">
          {results.map((item) => (
            <div
              key={item.id}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSelect(item)}
            >
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-12 h-16 object-cover rounded mr-3"
                />
              )}
              <div>
                <h4 className="font-medium">{item.title || item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.media_type === "movie" ? "Movie" : "TV Show"} •{" "}
                  {item.release_date?.substring(0, 4) ||
                    item.first_air_date?.substring(0, 4)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteSearch;
