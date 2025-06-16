import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import MoviePage from "./components/MoviePage";
import { useDebounce } from "react-use";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import MovieWatch from "./components/MovieWatch";
import Navbar from "./components/Navbar";
import PersonMovies from "./components/PersonMovies";
import TvShow from "./components/TvShow";

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
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [recommendationMovies, setRecommendationMovies] = useState([]);

  useDebounce(() => setDeBounce(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
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

  const fetchPopularMovies = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = `${API_URL}/movie/popular`;
      const res = await fetch(response, API_OPTIONS);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      setPopularMovies(data.results);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching popular movies");
    }
    setLoading(false);
  };

  const fetchUpcomingMovies = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = `${API_URL}/movie/upcoming`;
      const res = await fetch(response, API_OPTIONS);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      setUpcomingMovies(data.results);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching upcoming movies");
    }
    setLoading(false);
  };

  const fetchRecommendationMovies = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = `${API_URL}/movie/1284120/recommendations`;
      const res = await fetch(response, API_OPTIONS);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      setRecommendationMovies(data.results);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching recommendation movies");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendationMovies();
    fetchPopularMovies();
    fetchUpcomingMovies();
  }, []);

  useEffect(() => {
    fetchMovies(debounce);
  }, [debounce]);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <div className="pattern">
                <div className="wrapper">
                  <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>
                      Find <span className="text-gradient">Movies</span> You'll
                      Enjoy Without the Hassle
                    </h1>
                    <Search
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </header>

                  <section className="popular-movies">
                    <h2 className="mt-[20px] text-xl font-semibold text-white">
                      Popular Movies
                    </h2>
                    {loading ? (
                      <p className="text-white">Loading Movies...</p>
                    ) : errorMessage ? (
                      <p className="text-red-500">
                        Error loading popular movies
                      </p>
                    ) : (
                      <ul className="flex overflow-x-auto gap-4 py-4 no-scrollbar">
                        {popularMovies.map((movie) => (
                          <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="block"
                          >
                            <li
                              key={movie.id}
                              className="flex-shrink-0 w-[150px]"
                            >
                              <MovieCard movie={movie} />
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </section>

                  <section className="upcoming-movies">
                    <h2 className="mt-[20px] text-xl font-semibold text-white">
                      Upcoming Movies
                    </h2>
                    {loading ? (
                      <p className="text-white">Loading Movies...</p>
                    ) : errorMessage ? (
                      <p className="text-red-500">
                        Error loading upcoming movies
                      </p>
                    ) : (
                      <ul className="flex overflow-x-auto gap-4 py-4 no-scrollbar">
                        {upcomingMovies.map((movie) => (
                          <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="block"
                          >
                            <li
                              key={movie.id}
                              className="flex-shrink-0 w-[150px]"
                            >
                              <MovieCard movie={movie} />
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </section>

                  <section className="upcoming-movies">
                    <h2 className="mt-[20px] text-xl font-semibold text-white">
                      Recommendation Movies
                    </h2>
                    {loading ? (
                      <p className="text-white">Loading Movies...</p>
                    ) : errorMessage ? (
                      <p className="text-red-500">
                        Error loading recommendation movies
                      </p>
                    ) : (
                      <ul className="flex overflow-x-auto gap-4 py-4 no-scrollbar">
                        {recommendationMovies.map((movie) => (
                          <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="block"
                          >
                            <li className="flex-shrink-0 w-[150px]">
                              <MovieCard movie={movie} />
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </section>

                  <section className="all-movies">
                    <h2 className="mt-[20px] text-white">All Movies</h2>
                    {loading ? (
                      <p className="text-white">Loading Movies...</p>
                    ) : errorMessage ? (
                      <p className="text-red-500">{errorMessage}</p>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {movies.map((movie) => (
                          <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="block"
                          >
                            <MovieCard movie={movie} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              </div>
            </main>
          }
        />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/watch/:id" element={<MovieWatch />} />
        <Route path="/person-movies/:id" element={<PersonMovies />} />
        <Route path="/tv-shows" element={<TvShow/>} />
      </Routes>
    </Router>
  );
}

export default App;
