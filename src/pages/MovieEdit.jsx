"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useMovieContext } from "../context/MovieContext"
import { toast } from "react-toastify"
import {
  ArrowLeft,
  Film,
  Calendar,
  ImageIcon,
  FileText,
  Video,
  Star,
  Save,
  X,
  Camera,
  Clapperboard,
  Edit3,
  Eye,
} from "lucide-react"

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Western",
]

const MovieEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { movies, updateMovie, loading } = useMovieContext()
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    description: "",
    poster: "",
    trailer: "",
    year: "",
  })

  // Load movie data when component mounts
  useEffect(() => {
    const movie = movies.find((movie) => movie.id === id)
    if (movie) {
      setFormData({
        title: movie.title,
        genre: movie.genre,
        description: movie.description,
        poster: movie.poster,
        trailer: movie.trailer,
        year: movie.year,
      })
    }
  }, [id, movies])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateMovie(id, formData)
    navigate(`/reem`)
    toast.success("🎬 Movie updated successfully!")
  }

  const handleGoBack = () => {
    navigate("/reem")
  }

  const currentMovie = movies.find((movie) => movie.id === id)

  if (!currentMovie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Film className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">🎭 Movie Not Found</h1>
          <p className="text-gray-400 mb-8 text-lg">The movie you're looking for doesn't exist in your collection.</p>
          <button
            onClick={() => navigate("/moviesfetch")}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-700 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-red-500/40 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 mr-3 inline" />
            Back to Collection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50" />
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full bg-repeat-x"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center mb-8 px-6 py-3 bg-gray-800/70 backdrop-blur-sm text-gray-300 rounded-full font-medium hover:bg-gray-700/70 transition-all duration-300 ease-in-out transform hover:scale-105 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Cinema Collection
          </button>

          <div className="flex items-center justify-center mb-6">
            <Edit3 className="w-8 h-8 text-red-500 mr-3 animate-pulse" />
            <span className="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-fade-in-up">
              🎬 EDIT MODE
            </span>
            <Clapperboard className="w-8 h-8 text-red-500 ml-3 animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight animate-fade-in-up animation-delay-100">
            EDIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">MOVIE</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-4 drop-shadow-lg animate-fade-in-up animation-delay-200 max-w-4xl mx-auto font-light">
            🎭 Refine Your Cinematic Masterpiece
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 drop-shadow-lg animate-fade-in-up animation-delay-300 max-w-3xl mx-auto leading-relaxed">
            Perfect every detail of "<span className="text-red-400 font-semibold">{currentMovie.title}</span>" and make
            it shine brighter in your personal movie collection.
          </p>

          <div className="bg-red-600/20 border border-red-500/30 rounded-2xl px-6 py-4 inline-block backdrop-blur-sm animate-fade-in-up animation-delay-400">
            <p className="text-red-300 font-medium">
              🎪 Currently editing: <span className="text-white font-bold">{currentMovie.title}</span> (
              {currentMovie.year})
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-950/90 via-gray-900/90 to-gray-950/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-red-600/20 via-red-500/10 to-pink-600/20 p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-center">
                <Camera className="w-6 h-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Movie Details Editor</h2>
                <Film className="w-6 h-6 text-red-400 ml-3" />
              </div>
              <p className="text-center text-gray-300 mt-2">Update your movie information with precision and style</p>
            </div>

            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Title Field */}
                    <div>
                      <label className="flex items-center text-xl font-bold text-gray-200 mb-4">
                        <Film className="w-6 h-6 mr-3 text-red-500" />
                        Movie Title*
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-5 bg-gray-800/60 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm"
                        placeholder="Enter movie title..."
                        required
                      />
                    </div>

                    {/* Year and Genre Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Year Field */}
                      <div>
                        <label className="flex items-center text-xl font-bold text-gray-200 mb-4">
                          <Calendar className="w-6 h-6 mr-3 text-red-500" />
                          Release Year*
                        </label>
                        <input
                          type="number"
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          className="w-full p-5 bg-gray-800/60 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm"
                          placeholder="2024"
                          min="1900"
                          max={new Date().getFullYear()}
                          required
                        />
                      </div>

                      {/* Genre Field */}
                      <div>
                        <label className="flex items-center text-xl font-bold text-gray-200 mb-4">
                          <Star className="w-6 h-6 mr-3 text-red-500" />
                          Genre*
                        </label>
                        <select
                          name="genre"
                          value={formData.genre}
                          onChange={handleChange}
                          className="w-full p-5 bg-gray-800/60 border-2 border-gray-700/50 rounded-2xl text-white focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm appearance-none cursor-pointer"
                          required
                        >
                          <option value="" className="bg-gray-800">
                            Select a genre
                          </option>
                          {genres.map((genre) => (
                            <option key={genre} value={genre} className="bg-gray-800">
                              {genre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="flex items-center text-xl font-bold text-gray-200 mb-4">
                        <FileText className="w-6 h-6 mr-3 text-red-500" />
                        Movie Description*
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-5 bg-gray-800/60 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm resize-none"
                        rows="6"
                        placeholder="Enter movie description..."
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Poster URL */}
                    <div>
                      <label className="flex items-center text-xl font-bold text-gray-200 mb-4">
                        <ImageIcon className="w-6 h-6 mr-3 text-red-500" />
                        Poster URL*
                      </label>
                      <input
                        type="url"
                        name="poster"
                        value={formData.poster}
                        onChange={handleChange}
                        className="w-full p-5 bg-gray-800/60 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm"
                        placeholder="https://example.com/poster.jpg"
                        required
                      />

                      {/* Poster Preview */}
                      {formData.poster && (
                        <div className="mt-6">
                          <div className="flex items-center mb-3">
                            <Eye className="w-5 h-5 mr-2 text-gray-400" />
                            <span className="text-gray-400 font-medium">Poster Preview</span>
                          </div>
                          <div className="relative group">
                            <img
                              src={formData.poster || "/placeholder.svg"}
                              alt="Movie Poster Preview"
                              className="w-full max-w-xs h-80 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = "/placeholder.svg?height=400&width=300"
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Trailer URL */}
                    <div>
                      <label className="flex items-center text-xl font-bold text-gray-200 mb-4">
                        <Video className="w-6 h-6 mr-3 text-red-500" />
                        Trailer URL
                      </label>
                      <input
                        type="url"
                        name="trailer"
                        value={formData.trailer}
                        onChange={handleChange}
                        className="w-full p-5 bg-gray-800/60 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm"
                        placeholder="https://youtube.com/watch?v=..."
                      />
                      <p className="text-gray-400 text-sm mt-2 flex items-center">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                        Optional: Add a trailer link to enhance the movie experience
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-700/50 pt-10">
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`group flex items-center justify-center px-12 py-5 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-green-500/40 transition-all duration-500 ease-in-out transform hover:scale-105 relative overflow-hidden ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? (
                        <>
                          <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          <span>Updating Movie...</span>
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <Save className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                          <span className="relative z-10">Save Changes</span>
                          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleGoBack}
                      className="group flex items-center justify-center px-12 py-5 bg-gray-700/80 backdrop-blur-sm text-white rounded-2xl font-bold text-xl shadow-2xl hover:bg-gray-600/80 transition-all duration-500 ease-in-out transform hover:scale-105 border border-gray-600/50 hover:border-gray-500/50"
                    >
                      <X className="w-7 h-7 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                      Cancel Edit
                    </button>
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-gray-400 text-lg">🎬 Make your movie collection perfect, one edit at a time</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-950/80 via-gray-900/80 to-gray-950/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700/50 p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">🎭 Pro Editing Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">High-Quality Posters</p>
                  <p className="text-gray-400 text-sm">Use high-resolution images for the best visual experience</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">Compelling Descriptions</p>
                  <p className="text-gray-400 text-sm">Write engaging summaries that capture the movie's essence</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">Accurate Information</p>
                  <p className="text-gray-400 text-sm">Double-check release years and genre classifications</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">Trailer Links</p>
                  <p className="text-gray-400 text-sm">Add official trailers to enhance the movie experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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
        
        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 8px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 4px;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 4px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
        
        /* Custom select arrow */
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 16px center;
          background-repeat: no-repeat;
          background-size: 20px 16px;
        }
      `}</style>
    </div>
  )
}

export default MovieEdit
