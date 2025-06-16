import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import AutoCompleteSearch from './AutoCompleteSearch';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-red-600 hover:text-red-500">
              MovieFlix
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-red-400 transition duration-300">
              Home
            </Link>
            <Link to="/" className="hover:text-red-400 transition duration-300">
              Movies
            </Link>
            <Link to="/tv-shows" className="hover:text-red-400 transition duration-300">
              TV Shows
            </Link>
            <Link to="/genres" className="hover:text-red-400 transition duration-300">
              Anime
            </Link>
            
          </div>

          {/* Search and User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-gray-800 rounded-full py-1 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-400 hover:text-white" />
              </button>
            </form>

            <button className="relative p-2 hover:text-red-400">
              <FaBell size={20} />
              <span className="absolute top-0 right-0 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            <div className="relative group">
              <button className="flex items-center space-x-1 focus:outline-none">
                <FaUserCircle size={24} />
                <span className="hidden lg:inline-block">Username</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">
                  Profile
                </Link>
                <Link to="/watchlist" className="block px-4 py-2 hover:bg-gray-700">
                  Watchlist
                </Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-700">
                  Settings
                </Link>
                <Link to="/logout" className="block px-4 py-2 hover:bg-gray-700 border-t border-gray-700">
                  Logout
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-gray-800 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-400 hover:text-white" />
              </button>
            </form>

            <div className="flex flex-col space-y-3">
              <Link
                to="/movies"
                className="hover:text-red-400 transition duration-300 py-2"
                onClick={toggleMobileMenu}
              >
                Movies
              </Link>
              <Link
                to="/tv-shows"
                className="hover:text-red-400 transition duration-300 py-2"
                onClick={toggleMobileMenu}
              >
                TV Shows
              </Link>
              <Link
                to="/genres"
                className="hover:text-red-400 transition duration-300 py-2"
                onClick={toggleMobileMenu}
              >
                Genres
              </Link>
              <Link
                to="/upcoming"
                className="hover:text-red-400 transition duration-300 py-2"
                onClick={toggleMobileMenu}
              >
                Upcoming
              </Link>
              <Link
                to="/profile"
                className="hover:text-red-400 transition duration-300 py-2"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <Link
                to="/watchlist"
                className="hover:text-red-400 transition duration-300 py-2"
                onClick={toggleMobileMenu}
              >
                Watchlist
              </Link>
              <Link
                to="/settings"
                className="hover:text-red-400 transition duration-300 py-2"
                onClick={toggleMobileMenu}
              >
                Settings
              </Link>
              <Link
                to="/logout"
                className="hover:text-red-400 transition duration-300 py-2 border-t border-gray-700 pt-3"
                onClick={toggleMobileMenu}
              >
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;