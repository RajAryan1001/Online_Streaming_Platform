
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Play, Edit, Trash2 } from 'lucide-react';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, deleteMovie, toggleFavorite } = useMovieContext();
  
  const movie = movies.find(movie => movie.id === id);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(id);
      navigate('/reem');
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(id);
  };

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <Link 
          to="/reem" 
          className="text-blue-400 hover:underline"
        >
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Collection
        </button>
      </div>

      {/* Movie Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Movie Poster */}
          <div className="lg:w-1/3">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/500x750?text=Poster+Not+Available';
                }}
              />
              {/* Favorite Button */}
              <button
                onClick={handleToggleFavorite}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm ${
                  movie.isFavorite 
                    ? 'bg-red-500/90 text-white' 
                    : 'bg-gray-800/80 text-gray-300'
                } transition-all duration-300 hover:scale-110`}
                aria-label={movie.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart 
                  className={`w-6 h-6 ${movie.isFavorite ? 'fill-current' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:w-2/3">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black mb-4">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                  <Star className="w-4 h-4 mr-2 fill-current" /> {movie.rating || "N/A"}
                </span>
                <span className="bg-gray-700/80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-200 border border-gray-600/50">
                  {movie.year}
                </span>
                <span className="bg-gradient-to-r from-red-600/40 to-pink-600/40 backdrop-blur-sm px-4 py-2 rounded-full text-red-300 border border-red-500/30">
                  {movie.genre}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3">Synopsis</h2>
                <p className="text-gray-300 leading-relaxed">{movie.description || 'No description available'}</p>
              </div>

              {/* Cast Section */}
              {movie.cast?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Cast</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {movie.cast.map((person, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm border border-gray-700/50">
                        {person.profilePic ? (
                          <img 
                            src={person.profilePic} 
                            alt={person.name}
                            className="w-full h-32 object-cover rounded mb-2"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/200x300?text=Actor';
                            }}
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-700 rounded mb-2 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        <p className="font-semibold text-white truncate">{person.name}</p>
                        <p className="text-sm text-gray-400 truncate">as {person.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                {movie.trailer && (
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </a>
                )}
                <Link
                  to={`/movies/${movie.id}/edit`}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Movie
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Movie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;