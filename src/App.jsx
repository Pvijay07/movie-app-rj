import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzRhYmYwNzk1MmI0ZTJhOGM3NGE3MjBhZDZhNjBjMCIsIm5iZiI6MTcyMjA4MTg0OS40NTI5OTk4LCJzdWIiOiI2NmE0ZTIzOWY0MjU5YjUzMTc2MDA5ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Plz6e6M8zpPA1n_gqT3XDJm0y_KEaTXhlbZHseN6hQ0";
const API_OPTIONS = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
};
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [debounce, setDeBounce] = useState("");
  useDebounce(() => setDeBounce(searchTerm), 500, [searchTerm]);

  const fecthMovies = async (query = "") => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = query
        ? `${API_URL}/discover/movie?query=${encodeURIComponent(query)}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc`;
      const res = await fetch(response, API_OPTIONS);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching movies");
    }
    setLoading(false);
  };
  useEffect(() => {
    fecthMovies(debounce);
  }, [debounce]);
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className="all-movies">
            <h2 className="mt-[20px]">All Movies</h2>
            {loading ? (
              <p className="text-white">Loading Movies...</p>
            ) : errorMessage ? (
              <p className="text-red-500"></p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
