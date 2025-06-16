import { StarIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PersonMovies = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRhYmYwNzk1MmI0ZTJhOGM3NGE3MjBhZDZhNjBjMCIsIm5iZiI6MTcyMjA4MTg0OS40NTI5OTk4LCJzdWIiOiI2NmE0ZTIzOWY0MjU5YjUzMTc2MDA5ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Plz6e6M8zpPA1n_gqT3XDJm0y_KEaTXhlbZHseN6hQ0";
  const API_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchPersonMovies = async () => {
      try {
        setLoading(true);

        const personResponse = await fetch(
          `${API_URL}/person/${id}?language=en-US`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
              accept: "application/json",
            },
          }
        );
        const personData = await personResponse.json();
        setPerson(personData);

        const moviesResponse = await fetch(
          `${API_URL}/person/${id}/movie_credits?language=en-US`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
              accept: "application/json",
            },
          }
        );
        const moviesData = await moviesResponse.json();

        console.log(moviesData);

        // Combine cast and crew, remove duplicates, and sort by popularity
        const combined = [...moviesData.cast, ...moviesData.crew];
        const uniqueMovies = combined.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );
        setMovies(uniqueMovies.sort((a, b) => b.popularity - a.popularity));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonMovies();
  }, [id]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!person) return <div className="text-white">Person not found</div>;

  return (
    <div className="text-white p-6">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <img
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                : "/placeholder-person.jpg"
            }
            alt={person.name}
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl font-bold mb-4">{person.name}</h1>
          {person.biography && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Biography</h2>
              <p className="text-gray-300">{person.biography}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            {person.birthday && (
              <div>
                <h3 className="font-semibold">Born</h3>
                <p>{new Date(person.birthday).toLocaleDateString()}</p>
                {person.deathday && (
                  <p>Died: {new Date(person.deathday).toLocaleDateString()}</p>
                )}
              </div>
            )}
            {person.place_of_birth && (
              <div>
                <h3 className="font-semibold">Place of Birth</h3>
                <p>{person.place_of_birth}</p>
              </div>
            )}
            {person.known_for_department && (
              <div>
                <h3 className="font-semibold">Known For</h3>
                <p>{person.known_for_department}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">{person.name}'s Movies</h2>
        {movies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <a href={`/movie/${movie.id}`}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder-movie.jpg"
                    }
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold truncate">{movie.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-400">
                        {movie.release_date?.substring(0, 4)}
                      </span>
                      <span className="flex items-center text-sm">
                        <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                    {movie.character && (
                      <p className="text-xs text-gray-400 truncate mt-1">
                        as {movie.character}
                      </p>
                    )}
                    {movie.job && (
                      <p className="text-xs text-gray-400 truncate mt-1">
                        {movie.job}
                      </p>
                    )}
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PersonMovies;
