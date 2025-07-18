import React, { useState, useRef } from "react";
import { useMovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Star, Plus, Play, ChevronDown, Search, Edit, Trash2, ChevronRight, ChevronLeft } from "lucide-react";

const MovieFetch = () => {
  const { movies, loading, deleteMovie, toggleFavorite } = useMovieContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const scrollRefs = useRef({});

  // Define all genres you want to display
  const allGenres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Documentary", "Drama", "Fantasy", "Horror", "Mystery",
    "Romance", "Sci-Fi", "Thriller", "Western"
  ];

  // Filter movies based on search term
  const filteredMovies = movies.filter(movie => {
    if (!movie) return false;
    return searchTerm === "" || 
      (movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (movie.description && movie.description.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  // Group movies by genre - Corrected version
  const moviesByGenre = allGenres.reduce((acc, genre) => {
    const genreMovies = filteredMovies.filter(movie => {
      if (!movie.genre) return false;
      return movie.genre.split(",").map(g => g.trim()).includes(genre);
    });
    
    if (genreMovies.length > 0) {
      acc[genre] = genreMovies;
    }
    return acc;
  }, {});

  // Scroll function for carousel
  const scroll = (genre, direction) => {
    if (scrollRefs.current[genre]) {
      const scrollAmount = scrollRefs.current[genre].offsetWidth * 0.8;
      scrollRefs.current[genre].scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-300">Loading cinematic experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-700 drop-shadow-lg">
          Movie Collection
        </h1>

        {/* Search Control */}
        <div className="flex flex-col mb-10 p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
          <div className="flex-1">
            <label htmlFor="search-input" className="block mb-2 font-medium text-gray-300">
              Search Movies
            </label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-400 text-lg text-center">
          Showing <span className="font-semibold text-white">{filteredMovies.length}</span> movies
        </div>

        {/* Genre Sections */}
        {Object.keys(moviesByGenre).length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
            <p className="text-gray-400 text-xl mb-6">No movies found matching your criteria 😔</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(moviesByGenre).map(([genre, genreMovies]) => (
              <div key={genre} className="relative group">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 px-4 sm:px-6 lg:px-8">
                  {genre} Movies
                </h2>

                {/* Scroll Buttons */}
                <button
                  onClick={() => scroll(genre, "left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center text-white transition-opacity duration-300 ease-in-out"
                >
                  <ChevronLeft className="w-8 h-8 drop-shadow-lg" />
                </button>
                <button
                  onClick={() => scroll(genre, "right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center text-white transition-opacity duration-300 ease-in-out"
                >
                  <ChevronRight className="w-8 h-8 drop-shadow-lg" />
                </button>

                {/* Movies Carousel */}
                <div
                  ref={el => scrollRefs.current[genre] = el}
                  className="flex space-x-4 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {genreMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="relative flex-shrink-0 w-48 sm:w-56 md:w-64 rounded-xl overflow-hidden shadow-2xl cursor-pointer group transition-transform duration-300 ease-in-out hover:scale-105 hover:z-20 bg-gray-900 border border-gray-800/50"
                      onMouseEnter={() => setHoveredMovie(movie.id)}
                      onMouseLeave={() => setHoveredMovie(null)}
                    >
                      <Link to={`/movies/${movie.id}`}>
                        <img
                          src={movie.poster || "/placeholder.svg?height=450&width=300"}
                          alt={movie.title || "Movie poster"}
                          className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-t-xl transition-all duration-300 ease-in-out group-hover:brightness-75"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.svg?height=450&width=300&text=Poster+Not+Available";
                            e.target.className = "w-full h-64 sm:h-72 md:h-80 object-contain bg-gray-800 p-4";
                          }}
                        />
                      </Link>

                      {/* Hover Overlay */}
                      {hoveredMovie === movie.id && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 transition-opacity duration-300 ease-in-out opacity-100">
                          <h3 className="text-white font-bold text-lg text-center mb-2 line-clamp-2">{movie.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" /> {movie.rating}
                            </span>
                            <span>{movie.year}</span>
                          </div>
                          <div className="flex space-x-3">
                            <Link
                              to={`/movies/${movie.id}`}
                              className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-110"
                              title="Play Movie"
                            >
                              <Play className="w-6 h-6 fill-current" />
                            </Link>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(movie.id);
                              }}
                              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 transform hover:scale-110 ${
                                movie.isFavorite
                                  ? "bg-red-600 text-white hover:bg-red-700"
                                  : "bg-gray-700/70 text-white hover:bg-gray-600/70"
                              }`}
                              title={movie.isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                              <Star className={`w-6 h-6 ${movie.isFavorite ? "fill-current" : ""}`} />
                            </button>
                            <button
                              className="w-12 h-12 bg-gray-700/70 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-600/70 transition-all duration-200 transform hover:scale-110"
                              title="Add to My List"
                            >
                              <Plus className="w-6 h-6" />
                            </button>
                          </div>
                          <div className="flex space-x-3 mt-4">
                            <Link
                              to={`/movies/${movie.id}/edit`}
                              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </Link>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                if (window.confirm("Delete this movie?")) {
                                  deleteMovie(movie.id);
                                }
                              }}
                              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Info below image (visible when not hovered) */}
                      {hoveredMovie !== movie.id && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-8">
                          <h3 className="text-white font-semibold text-base truncate">{movie.title}</h3>
                          <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
                            <span>{movie.year}</span>
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" /> {movie.rating}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieFetch;