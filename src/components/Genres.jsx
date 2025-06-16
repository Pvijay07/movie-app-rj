import { useEffect, useState } from "react";

const GenreFilter = ({ type = "movie", onSelectGenre }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const endpoint =
          type === "movie" ? "genre/movie/list" : "genre/tv/list";

        const response = await fetch(
          `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [type]);

  if (loading) return <div>Loading genres...</div>;

  return (
    <div className="genre-filter">
      <h3>Filter by Genre</h3>
      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className="genre-button"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
