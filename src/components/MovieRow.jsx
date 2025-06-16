import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies, loading, error }) => {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

      {loading ? (
        <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 h-72 bg-gray-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-400">No movies found</p>
      ) : (
        <div className="relative">
          <ul className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="block"
              >
                <li className="flex-shrink-0 w-[150px]">
                  <MovieCard key={movie.id} movie={movie} />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default MovieRow;
