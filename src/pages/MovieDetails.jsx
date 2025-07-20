"use client"
import { useParams, useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import { Star, Film, Calendar, Users, Clock, Link as LinkIcon, Heart, X, Edit, Flame, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MovieDetails() {
  const { id } = useParams();
  const { movies, toggleFavorite, deleteMovie } = useMovieContext();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === id);
    if (!foundMovie) {
      toast.error("Movie not found");
      navigate("/reem");
      return;
    }
    setMovie(foundMovie);
  }, [id, movies, navigate]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-white text-3xl font-black mb-3 tracking-wide">🎬 LOADING CINEMATIC MASTERPIECE</p>
          <p className="text-gray-400 text-xl font-light">Preparing your premium movie experience...</p>
        </div>
      </div>
    );
  }

  const handleToggleFavorite = async () => {
    await toggleFavorite(movie.id);
    toast.success(movie.isFavorite ? "Removed from favorites" : "Added to favorites!");
  };

  const handleDelete = async () => {
    const success = await deleteMovie(movie.id);
    if (success) {
      toast.success("Movie removed from your collection");
      navigate("/movies");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image */}
      {movie.poster && (
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8 md:py-12 relative -mt-20">
        {/* Movie Card */}
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Poster */}
          <div className="md:w-1/3 p-4 flex justify-center">
            <img 
              src={movie.poster || 'https://via.placeholder.com/300x450'} 
              alt={movie.title}
              className="w-64 h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          {/* Details */}
          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(`/edit-movie/${movie.id}`)}
                  className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                  title="Delete"
                >
                  <Flame className="w-5 h-5" />
                </button>
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full ${movie.isFavorite ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
                  title={movie.isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`w-5 h-5 ${movie.isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
            
            {movie.tmdbData?.tagline && (
              <p className="text-xl text-gray-300 italic mb-4">"{movie.tmdbData.tagline}"</p>
            )}
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-yellow-400">
                <Star className="w-5 h-5 mr-1" />
                <span>{movie.rating || 'N/A'}</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 mr-1" />
                <span>{movie.year}</span>
              </div>
              
              {movie.tmdbData?.runtime && (
                <div className="flex items-center text-gray-300">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{Math.floor(movie.tmdbData.runtime / 60)}h {movie.tmdbData.runtime % 60}m</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-300">
                <Film className="w-5 h-5 mr-1" />
                <span>{movie.genre}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300">{movie.description}</p>
            </div>
            
            {/* Cast Section */}
            {movie.cast?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {movie.cast.map((actor, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-3 text-center">
                      {actor.profilePic ? (
                        <img 
                          src={actor.profilePic} 
                          alt={actor.name}
                          className="w-full h-32 object-cover rounded-md mb-2 mx-auto"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-600 rounded-md mb-2 flex items-center justify-center">
                          <Users className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <h3 className="font-medium truncate">{actor.name}</h3>
                      <p className="text-sm text-gray-400 truncate">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {movie.trailer && (
                <a 
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Trailer
                </a>
              )}
              {movie.tmdbData?.imdb_id && (
                <a 
                  href={`https://www.imdb.com/title/${movie.tmdbData.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
                >
                  <LinkIcon className="w-5 h-5 mr-2" />
                  View on IMDB
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-red-400">Delete Movie</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete "{movie.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Flame className="w-5 h-5 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}