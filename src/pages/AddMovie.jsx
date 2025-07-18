import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // React Router DOM hooks
import { useMovieContext } from "../context/MovieContext";
import { toast } from "react-toastify";
import {
  Film,
  Plus,
  Save,
  X,
  ArrowLeft,
  Sparkles,
  Wand2,
  Calendar,
  Tag,
  LinkIcon,
  BookOpen,
  User,
  Video,
  Star,
} from "lucide-react";

export default function AddEditMovie() {
  const navigate = useNavigate();
  const { id: movieId } = useParams(); // Get movie ID from URL params
  const { movies, addMovie, updateMovie, loading } = useMovieContext();

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    genre: "",
    description: "",
    poster: "",
    director: "",
    trailer: "",
    rating: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (movieId) {
      const movieToEdit = movies.find((movie) => movie.id === movieId);
      if (movieToEdit) {
        setFormData(movieToEdit);
        setIsEditing(true);
      } else {
        toast.error("Movie not found for editing.");
        navigate("/moviesfetch"); // Redirect using React Router
      }
    }
  }, [movieId, movies, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateMovie(formData);
        toast.success("🎬 Cinematic masterpiece updated!");
      } else {
        await addMovie(formData);
        toast.success("🎉 New masterpiece added to your collection!");
      }
      navigate("/moviesfetch"); // React Router navigation
    } catch (error) {
      toast.error("Failed to save movie. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-white text-3xl font-black mb-3 tracking-wide">
            🎬 LOADING YOUR CINEMA
          </p>
          <p className="text-gray-400 text-xl font-light">
            Preparing your premium movie collection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-12 px-4">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-600/5 to-red-600/10 rounded-3xl blur-2xl" />
        
        {/* Main Form Container */}
        <div className="relative bg-gradient-to-br from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6 md:p-8 lg:p-10 overflow-hidden"  style={{marginTop:'70px'}}>
          
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4 md:mb-6" >
              <Film className="w-8 h-8 md:w-10 md:h-10 text-red-400 mr-0 md:mr-4 mb-2 md:mb-0 animate-pulse" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {isEditing ? "REFINE YOUR" : "ADD A NEW"}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 ml-2 md:ml-3">
                  MASTERPIECE
                </span>
              </h1>
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-pink-400 ml-0 md:ml-4 mt-2 md:mt-0 animate-pulse" />
            </div>
            <p className="text-gray-300 text-base md:text-lg lg:text-xl font-light mb-2">
              {isEditing
                ? "✨ Polish every detail of your cinematic gem."
                : "🚀 Bring your next epic story to life in your collection."}
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Field */}
              <div className="relative group">
                <label className="block text-gray-300 mb-2 text-base md:text-lg font-medium flex items-center">
                  <Film className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-400" /> Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-lg md:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 text-base md:text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                  placeholder="The Grand Cinematic Adventure"
                  required
                />
              </div>

              {/* Year Field */}
              <div className="relative group">
                <label className="block text-gray-300 mb-2 text-base md:text-lg font-medium flex items-center">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-pink-400" /> Year*
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-lg md:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500/50 transition-all duration-300 text-base md:text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                  placeholder="2023"
                  required
                />
              </div>

              {/* Genre Field */}
              <div className="relative group">
                <label className="block text-gray-300 mb-2 text-base md:text-lg font-medium flex items-center">
                  <Tag className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" /> Genre*
                </label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-lg md:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500/50 transition-all duration-300 text-base md:text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                  placeholder="Action, Drama, Sci-Fi"
                  required
                />
              </div>

              {/* Director Field */}
              <div className="relative group">
                <label className="block text-gray-300 mb-2 text-base md:text-lg font-medium flex items-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-400" /> Director
                </label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-lg md:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 text-base md:text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                  placeholder="Visionary Filmmaker"
                />
              </div>

              {/* Poster URL Field */}
              <div className="relative group">
                <label className="block text-gray-300 mb-2 text-base md:text-lg font-medium flex items-center">
                  <LinkIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-400" /> Poster URL
                </label>
                <input
                  type="url"
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-lg md:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500/50 transition-all duration-300 text-base md:text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                  placeholder="https://example.com/poster.jpg"
                />
              </div>

              {/* Trailer URL Field */}
              <div className="relative group">
                <label className="block text-gray-300 mb-2 text-base md:text-lg font-medium flex items-center">
                  <Video className="w-4 h-4 md:w-5 md:h-5 mr-2 text-purple-400" /> Trailer URL
                </label>
                <input
                  type="url"
                  name="trailer"
                  value={formData.trailer}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-lg md:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 transition-all duration-300 text-base md:text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              {/* Rating Field */}
              <div className="relative group">
                <label className="block text-gray-300 mb-2 text-base md:text-lg font-medium flex items-center">
                  <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 text-yellow-400" /> Rating
                </label>
                <input
                  type="text"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full p-3 md:p-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-lg md:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500/50 transition-all duration-300 text-base md:text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                  placeholder="8.5"
                />
              </div>
            </div>

            {/* Description Field */}
            <div className="relative group">
              <label className="block text-gray-300 mb-2 text-base md:text-lg font-medium flex items-center">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2 text-orange-400" /> Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 md:p-4 bg-gray-800/60 border-2 border-gray-700/50 rounded-lg md:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500/50 transition-all duration-300 text-base md:text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                placeholder="A captivating tale of courage, destiny, and the power of the human spirit..."
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white rounded-xl md:rounded-2xl font-bold md:font-black text-base md:text-lg shadow-xl md:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 ease-in-out transform hover:scale-[1.02] overflow-hidden border border-red-400/30 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center">
                  {isEditing ? (
                    <Save className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                  ) : (
                    <Plus className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                  <span>
                    {loading
                      ? isEditing
                        ? "SAVING..."
                        : "ADDING..."
                      : isEditing
                        ? "SAVE CHANGES"
                        : "ADD MOVIE"}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigate("/moviesfetch")}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-xl md:shadow-2xl hover:shadow-gray-500/20 transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-gray-600/50 hover:border-gray-500/70 backdrop-blur-sm flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>BACK</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}