"use client"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useMovieContext } from "../context/MovieContext"
import { Heart, Star, Calendar, Film, Play, Info, ArrowLeft, Sparkles, Crown, Award, Search } from "lucide-react"

const Favorites = () => {
  const { movies } = useMovieContext()
  const navigate = useNavigate()
  const [hoveredMovie, setHoveredMovie] = useState(null)

  const favoriteMovies = movies.filter((movie) => movie.isFavorite)

  // Hero Section Component
  const HeroSection = () => {
    return (
      <div className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 w-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-black to-red-900">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            {/* Heart pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="h-full w-full bg-repeat"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ff69b4' fillOpacity='0.1'%3E%3Cpath d='M30 45c-1.5-1.5-15-13.5-15-22.5 0-6 4.5-10.5 10.5-10.5 3 0 4.5 1.5 4.5 1.5s1.5-1.5 4.5-1.5c6 0 10.5 4.5 10.5 10.5 0 9-13.5 21-15 22.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <div className="flex items-center justify-center mb-8">
            <Heart className="w-10 h-10 text-pink-500 mr-4 animate-pulse fill-current" />
            <span className="inline-block bg-gradient-to-r from-pink-600 to-red-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg animate-fade-in-up">
              💖 FAVORITE COLLECTION
            </span>
            <Sparkles className="w-10 h-10 text-pink-500 ml-4 animate-pulse" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl leading-tight animate-fade-in-up animation-delay-100">
            MY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">FAVORITES</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-4 drop-shadow-lg animate-fade-in-up animation-delay-200 max-w-4xl mx-auto font-light">
            💝 Your Most Beloved Cinematic Treasures
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 drop-shadow-lg animate-fade-in-up animation-delay-300 max-w-3xl mx-auto leading-relaxed">
            A curated collection of the movies that captured your heart. These are the films that made you laugh, cry,
            and fall in love with cinema all over again.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-400">
            <button
              onClick={() => navigate("/moviesfetch")}
              className="group flex items-center justify-center px-10 py-4 bg-gradient-to-r from-pink-600 via-pink-500 to-red-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Search className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Discover More Movies</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <button
              onClick={() => navigate("/")}
              className="group flex items-center justify-center px-10 py-4 bg-gray-800/80 backdrop-blur-sm text-white rounded-full font-semibold text-xl shadow-2xl hover:bg-gray-700/80 transition-all duration-500 ease-in-out transform hover:scale-110 border border-gray-600/50 hover:border-gray-500/50"
            >
              <ArrowLeft className="w-7 h-7 mr-3 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
          </div>

          <div className="mt-12 animate-fade-in-up animation-delay-500">
            <div className="bg-pink-600/20 border border-pink-500/30 rounded-2xl px-6 py-4 inline-block backdrop-blur-sm">
              <p className="text-pink-300 font-bold text-lg">
                💕 {favoriteMovies.length} movie{favoriteMovies.length !== 1 ? "s" : ""} in your favorites
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Movie Card Component
  const FavoriteMovieCard = ({ movie }) => {
    const isHovered = hoveredMovie === movie.id

    return (
      <div
        className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group transition-all duration-500 ease-in-out hover:scale-105 hover:z-20 hover:shadow-pink-500/20"
        onMouseEnter={() => setHoveredMovie(movie.id)}
        onMouseLeave={() => setHoveredMovie(null)}
      >
        {/* Favorite Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-gradient-to-r from-pink-600 to-red-600 rounded-full p-2 shadow-lg animate-pulse">
            <Heart className="w-5 h-5 text-white fill-current" />
          </div>
        </div>

        <Link to={`/movies/${movie.id}`}>
          <img
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-80 object-cover rounded-2xl transition-all duration-500 ease-in-out group-hover:brightness-50"
          />
        </Link>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <Crown className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-yellow-400 font-bold text-sm">FAVORITE</span>
                <Crown className="w-6 h-6 text-yellow-400 ml-2" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">{movie.title}</h3>
              <div className="flex items-center justify-center space-x-3 text-sm text-gray-300 mb-4">
                <span className="flex items-center bg-yellow-500/20 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" /> {movie.rating || "N/A"}
                </span>
                <span className="bg-gray-700/50 px-2 py-1 rounded-full">{movie.year}</span>
                <span className="bg-pink-600/30 px-2 py-1 rounded-full text-pink-300">{movie.genre}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Link
                to={`/movies/${movie.id}`}
                className="group/btn flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-full shadow-xl hover:from-pink-500 hover:to-pink-400 transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                title="Watch Details"
              >
                <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              </Link>

              <Link
                to={`/movies/${movie.id}`}
                className="group/btn flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-full shadow-xl hover:from-gray-600 hover:to-gray-500 transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                title="Movie Details"
              >
                <Info className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Info below image */}
        {!isHovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 pt-8">
            <h3 className="text-white font-bold text-base truncate mb-1">{movie.title}</h3>
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" /> {movie.year}
              </span>
              <span className="flex items-center bg-yellow-500/20 px-2 py-1 rounded-full">
                <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" /> {movie.rating || "N/A"}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Empty State Component
  const EmptyFavorites = () => {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center py-20">
        <div className="bg-gradient-to-br from-gray-950/90 via-gray-900/90 to-gray-950/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 p-16">
          <div className="w-32 h-32 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
            <Heart className="w-16 h-16 text-white fill-current" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-6">💔 No Favorites Yet</h3>
          <p className="text-gray-400 mb-4 text-xl leading-relaxed max-w-2xl mx-auto">
            Your heart is waiting to be captured! Start exploring movies and add the ones that make your soul sing to
            your favorites collection.
          </p>
          <p className="text-gray-500 mb-10 text-lg">
            Every great love story starts with a single movie. What will yours be?
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/moviesfetch"
              className="group px-12 py-5 bg-gradient-to-r from-pink-600 via-pink-500 to-red-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 ease-in-out transform hover:scale-110 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Search className="w-7 h-7 mr-3 inline group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Discover Movies to Love</span>
            </Link>

            <Link
              to="/"
              className="group px-12 py-5 bg-gray-800/80 backdrop-blur-sm text-white rounded-full font-semibold text-xl shadow-2xl hover:bg-gray-700/80 transition-all duration-500 ease-in-out transform hover:scale-110 border border-gray-600/50 hover:border-gray-500/50"
            >
              <Film className="w-7 h-7 mr-3 inline group-hover:scale-110 transition-transform" />
              Browse All Movies
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />

      <main className="relative z-10 -mt-20 md:-mt-32 space-y-16 md:space-y-20 pb-20">
        {favoriteMovies.length === 0 ? (
          <EmptyFavorites />
        ) : (
          <>
            {/* Favorites Grid Section */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-yellow-400 mr-3" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Your Hall of Fame</h2>
                  <Award className="w-8 h-8 text-yellow-400 ml-3" />
                </div>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto" style={{marginTop:"80px"}}>
                  These are the movies that earned a special place in your heart. Each one tells a story that resonated
                  with your soul.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                {favoriteMovies.map((movie) => (
                  <FavoriteMovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="bg-gradient-to-r from-gray-950/90 via-gray-900/90 to-gray-950/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 p-8 md:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">💖 Your Favorite Movie Stats</h3>
                  <p className="text-gray-300 text-lg">Insights into your cinematic preferences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white fill-current" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">{favoriteMovies.length}</h4>
                    <p className="text-gray-400">Favorite Movies</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white fill-current" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      {favoriteMovies.length > 0
                        ? Math.round(
                            (favoriteMovies.reduce((acc, movie) => acc + (Number.parseFloat(movie.rating) || 0), 0) /
                              favoriteMovies.length) *
                              10,
                          ) / 10
                        : 0}
                    </h4>
                    <p className="text-gray-400">Average Rating</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Film className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      {favoriteMovies.length > 0 ? [...new Set(favoriteMovies.map((movie) => movie.genre))].length : 0}
                    </h4>
                    <p className="text-gray-400">Favorite Genres</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Favorites
