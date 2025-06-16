import React, { useEffect, useState } from "react";

const TvShow = () => {
  const [shows, setShows] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "https://api.themoviedb.org/3";
const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRhYmYwNzk1MmI0ZTJhOGM3NGE3MjBhZDZhNjBjMCIsIm5iZiI6MTcyMjA4MTg0OS40NTI5OTk4LCJzdWIiOiI2NmE0ZTIzOWY0MjU5YjUzMTc2MDA5ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Plz6e6M8zpPA1n_gqT3XDJm0y_KEaTXhlbZHseN6hQ0";
  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(
          `${API_URL}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`, 
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setShows(data.results); // Store the results array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, []);

  if (loading) return <div>Loading TV shows...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!shows.length) return <div>No TV shows found</div>;

  return (
    <div className="tv-shows-container movie-card">
      {shows.map((show) => (
        <div key={show.id} className="tv-show-card">
          <img
            src={
              show.poster_path
                ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                : "/no-movie.png"
            }
            alt={show.name || "TV Show"}
          />
          <div className="mt-4 text-gray-100">
            <h3>{show.name}</h3>
            <div className="content">
              <div className="rating">
                <img src="star.svg" alt="Rating" />
                <p>{show.vote_average ? show.vote_average.toFixed(1) : "N/A"}</p>
              </div>
              <span>•</span>
              <div className="lang">
                <p>{show.original_language ? show.original_language.toUpperCase() : "N/A"}</p>
              </div>
              <span>•</span>
              <div className="year">
                <p>{show.first_air_date ? show.first_air_date.split("-")[0] : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TvShow;