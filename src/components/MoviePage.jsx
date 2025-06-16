import { StarIcon } from "@heroicons/react/16/solid";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MovieRow from "./MovieRow";
// import { buildErrorMessage } from "vite";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [relatedError, setRelatedError] = useState(null);
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRhYmYwNzk1MmI0ZTJhOGM3NGE3MjBhZDZhNjBjMCIsIm5iZiI6MTcyMjA4MTg0OS40NTI5OTk4LCJzdWIiOiI2NmE0ZTIzOWY0MjU5YjUzMTc2MDA5ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Plz6e6M8zpPA1n_gqT3XDJm0y_KEaTXhlbZHseN6hQ0";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_URL}/movie/${id}?language=en-US`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
            accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `${API_URL}/movie/${id}/credits?language=en-US`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
              accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCast();
  }, [id]);

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      try {
        setRelatedLoading(true);
        const response = await fetch(
          `${API_URL}/movie/${id}/similar?language=en-US`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
              accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setRelatedMovies(data.results);
      } catch (error) {
        setRelatedError(error.message);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedMovies();
  }, [id]);

 
  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!movie) return <div className="text-center py-8">Movie not found</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full rounded-lg mt-4"
      />
      <div className="mt-4 text-gray-100">
        <p className="text-gray-100">{movie.overview}</p>
        <p className="mt-2 font-semibold">Rating: {movie.vote_average}/10</p>
        <p className="mt-1">Release Date: {movie.release_date}</p>
        <p className="mt-1">Runtime: {movie.runtime} minutes</p>
      </div>

      <div className="mt-4">
        <Link to={`/watch/${id}`}>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Watch Now
          </button>
        </Link>
      </div>

      <section className="mt-8 ">
        <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
        {loading ? (
          <div className="flex space-x-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-24 h-36 bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            <ul className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
              {cast.map((person) => (
                <Link
                  key={person.id}
                  to={`/person-movies/${person.id}`}
                  className="block"
                >
                  <li
                    key={person.id}
                    className="flex-shrink-0 w-24 text-center"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 mb-2 mx-auto">
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                          alt={person.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg
                            className="w-12 h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="text-white text-sm font-medium truncate">
                      {person.name}
                    </h3>
                    <p className="text-gray-400 text-xs truncate">
                      {person.character}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </section>

      <MovieRow
        title="You May Also Like"
        movies={relatedMovies}
        loading={relatedLoading}
        error={relatedError}
      />
    </div>
  );
};

export default MoviePage;
