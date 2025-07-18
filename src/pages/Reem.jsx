"use client"
import { useState } from "react"
import { useMovieContext } from "../context/MovieContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import {
  Info,
  Star,
  X,
  ChevronDown,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  Play,
  Film,
  Award,
  Zap,
  Sparkles,
  Crown,
  Heart,
  Eye,
  Plus,
  Edit,
  Wand2,
  Flame,
  Target,
  Scissors,
} from "lucide-react"

const MoviesFetch = () => {
  const { movies, deleteMovie, loading, toggleFavorite } = useMovieContext()
  const navigate = useNavigate()
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  // Container class for consistent centering
  const containerClass = "mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"

  // Filter movies based on search and genre
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "" || movie.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  // Get unique genres
  const genres = [...new Set(movies.map((movie) => movie.genre))]

  const handleEdit = (movie) => {
    navigate("/add-movie", { state: { movieToEdit: movie } })
  }

  const handleDelete = async (movieId) => {
    const success = await deleteMovie(movieId)
    if (success) {
      setShowDeleteConfirm(null)
      toast.success("🎬 Movie removed from your cinema!")
    }
  }

  const handleToggleFavorite = async (movieId) => {
    await toggleFavorite(movieId)
    toast.success("❤️ Favorites updated!")
  }

  // Hero Section Component
  const HeroSection = () => {
    return (
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Ultra Cinematic Background */}
        <div className="absolute inset-0 w-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-gray-950">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-red-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-red-950/20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-pink-950/10 to-black" />

            {/* Premium Film Strip Pattern */}
            <div className="absolute inset-0 opacity-3">
              <div
                className="h-full w-full bg-repeat"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3Ccircle cx='60' cy='60' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "80px 80px",
                }}
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-60" />
            <div className="absolute top-40 right-32 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-40" />
            <div className="absolute bottom-32 left-40 w-3 h-3 bg-red-400 rounded-full animate-pulse opacity-30" />
          </div>
        </div>

        {/* Premium Content */}
        <div className={`relative z-10 w-full ${containerClass} text-center`}>
          {/* Premium Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-lg opacity-60 animate-pulse" />
              <div className="relative flex items-center bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white text-sm font-black px-8 py-4 rounded-full shadow-2xl border border-red-400/30">
                <Crown className="w-6 h-6 mr-3 text-yellow-300 animate-pulse" />
                <span className="tracking-wider">🎬 PREMIUM CINEMA COLLECTION</span>
                <Sparkles className="w-6 h-6 ml-3 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Ultra Premium Title */}
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-white mb-8 drop-shadow-2xl leading-tight animate-fade-in-up animation-delay-100 tracking-tight" style={{marginTop:'190px'}}>
            <span className="relative">
              MY{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-600 animate-gradient">
                CINEMA
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-pink-600/20 blur-xl -z-10" />
            </span>
          </h1>

          {/* Premium Subtitle */}
          <div className="mb-6 animate-fade-in-up animation-delay-200">
            <p className="text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-200 font-light mb-4 drop-shadow-lg">
              ✨ Your Exclusive Movie Theater Experience
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full shadow-lg" />
          </div>

          {/* Premium Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 drop-shadow-lg animate-fade-in-up animation-delay-300 max-w-4xl mx-auto leading-relaxed font-light">
            🎭 Step into your personal cinematic sanctuary where every frame is a masterpiece waiting to be discovered.
            From <span className="text-red-400 font-medium">Oscar-winning dramas</span> to{" "}
            <span className="text-pink-400 font-medium">mind-bending thrillers</span>, your collection tells the story
            of your unique taste in cinema.
          </p>

          <p className="text-base sm:text-lg text-gray-400 mb-12 animate-fade-in-up animation-delay-350 max-w-3xl mx-auto">
            🌟 Curate, organize, and celebrate the films that have shaped your cinematic journey. Every movie is a
            portal to different worlds, emotions, and unforgettable experiences.
          </p>

          {/* Ultra Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center animate-fade-in-up animation-delay-400 mb-12">
            {/* Primary CTA - Add Movie */}
            <button
              onClick={() => navigate("/add-movie")}
              className="group relative px-12 py-5 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-red-500/60 transition-all duration-700 ease-in-out transform hover:scale-110 hover:-rotate-1 overflow-hidden border border-red-400/30"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Button Content */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="relative">
                  <Plus className="w-8 h-8 mr-4 group-hover:rotate-180 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="tracking-wide">ADD CINEMATIC MASTERPIECE</span>
                <Zap className="w-6 h-6 ml-4 group-hover:scale-125 transition-transform duration-300 text-yellow-300" />
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />
            </button>

            {/* Secondary CTA - View Toggle */}
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="group relative px-12 py-5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-gray-500/40 transition-all duration-700 ease-in-out transform hover:scale-110 border border-gray-600/50 hover:border-gray-500/70 backdrop-blur-sm"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Button Content */}
              <div className="relative z-10 flex items-center justify-center">
                {viewMode === "grid" ? (
                  <List className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Grid className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform duration-300" />
                )}
                <span className="tracking-wide">
                  {viewMode === "grid" ? "CINEMATIC LIST VIEW" : "THEATER GRID VIEW"}
                </span>
                <Eye className="w-6 h-6 ml-4 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </button>
          </div>

          {/* Premium Stats */}
          <div className="animate-fade-in-up animation-delay-500">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-2xl blur-lg" />
              <div className="relative bg-gradient-to-r from-red-950/80 via-black/80 to-pink-950/80 backdrop-blur-lg border border-red-500/30 rounded-2xl px-8 py-6 shadow-2xl">
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center">
                    <Film className="w-6 h-6 text-red-400 mr-2" />
                    <span className="text-red-300 font-bold text-lg">{movies.length}</span>
                    <span className="text-gray-400 ml-2">Epic Films</span>
                  </div>
                  <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 rounded-full" />
                  <div className="flex items-center">
                    <Award className="w-6 h-6 text-yellow-400 mr-2" />
                    <span className="text-yellow-300 font-bold text-lg">{genres.length}</span>
                    <span className="text-gray-400 ml-2">Unique Genres</span>
                  </div>
                  <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 rounded-full" />
                  <div className="flex items-center">
                    <Heart className="w-6 h-6 text-pink-400 mr-2 fill-current" />
                    <span className="text-pink-300 font-bold text-lg">
                      {movies.filter(m => m.isFavorite).length}
                    </span>
                    <span className="text-gray-400 ml-2">Favorites</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="flex flex-col items-center text-gray-400 group cursor-pointer">
            <span className="text-sm mb-3 font-medium tracking-wide group-hover:text-red-400 transition-colors">
              EXPLORE YOUR COLLECTION
            </span>
            <div className="relative">
              <ChevronDown className="w-8 h-8 group-hover:text-red-400 transition-colors" />
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Premium Search and Filter Section
  const SearchFilterSection = () => {
    return (
      <div className={`${containerClass} mb-20`}>
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-600/5 to-red-600/10 rounded-3xl blur-2xl" />

          <div className="relative bg-gradient-to-br from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-10 md:p-12">
            {/* Premium Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <Search className="w-8 h-8 text-red-400 animate-pulse" />
                  <div className="absolute inset-0 bg-red-500/30 rounded-full blur-lg animate-pulse" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mx-6 tracking-tight">
                  DISCOVER YOUR NEXT
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 ml-3">
                    OBSESSION
                  </span>
                </h2>
                <div className="relative">
                  <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
                  <div className="absolute inset-0 bg-pink-500/30 rounded-full blur-lg animate-pulse" />
                </div>
              </div>
              <p className="text-gray-300 text-xl font-light mb-4">
                🎪 Navigate through your premium cinema collection with style and precision
              </p>
              <p className="text-gray-400 text-lg font-light">
                Find hidden gems, rediscover forgotten favorites, and explore new cinematic territories
              </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-center">
              {/* Premium Search */}
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search your cinematic universe..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 bg-gray-800/60 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-500 text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/5 to-pink-600/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Premium Genre Filter */}
              <div className="relative min-w-[280px] group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-red-600/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full pl-16 pr-12 py-5 bg-gray-800/60 border-2 border-gray-700/50 rounded-2xl text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500/50 transition-all duration-500 appearance-none cursor-pointer text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
                  >
                    <option value="">All Cinematic Genres</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre} className="bg-gray-800">
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Premium Results Counter */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-pink-600/30 rounded-2xl blur-lg animate-pulse" />
                <div className="relative bg-gradient-to-r from-red-950/80 to-pink-950/80 border border-red-500/40 rounded-2xl px-8 py-5 backdrop-blur-sm shadow-xl">
                  <div className="flex items-center">
                    <Film className="w-6 h-6 text-red-400 mr-3" />
                    <span className="text-red-300 font-black text-lg">{filteredMovies.length}</span>
                    <span className="text-gray-300 ml-2 font-medium">
                      cinematic experience{filteredMovies.length !== 1 ? "s" : ""} found
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ULTRA MODERN Movie Card Component for Grid View
  const MovieCard = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <div
        className="relative flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group transition-all duration-700 ease-in-out hover:scale-105 hover:z-20 hover:shadow-red-500/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Premium Image Container */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={movie.poster || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-80 object-cover transition-all duration-700 ease-in-out group-hover:brightness-30 group-hover:scale-110"
          />

          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>

        {/* ULTRA MODERN Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60 flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out">
            <div className="text-center mb-8">
              <h3 className="text-white font-black text-xl mb-3 line-clamp-2 tracking-wide">{movie.title}</h3>
              <div className="flex items-center justify-center space-x-3 text-sm mb-6">
                <span className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-3 py-1 rounded-full font-bold shadow-lg">
                  <Star className="w-4 h-4 mr-1 fill-current" /> {movie.rating || "N/A"}
                </span>
                <span className="bg-gray-700/80 backdrop-blur-sm px-3 py-1 rounded-full text-gray-200 font-medium">
                  {movie.year}
                </span>
                <span className="bg-gradient-to-r from-red-600/40 to-pink-600/40 backdrop-blur-sm px-3 py-1 rounded-full text-red-300 font-medium border border-red-500/30">
                  {movie.genre}
                </span>
              </div>
            </div>

            {/* ULTRA MODERN Action Buttons */}
            <div className="flex space-x-3">
              {/* Info Button - Modern Glassmorphism */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedMovie(movie)
                }}
                className="group/btn relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:-rotate-3 shadow-xl hover:shadow-white/20"
                title="View Movie Details"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <Info className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-300" />
              </button>

              {/* Edit Button - Ultra Modern with Animation */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleEdit(movie)
                }}
                className="group/btn relative overflow-hidden bg-gradient-to-br from-blue-600/90 via-blue-500/90 to-cyan-500/90 backdrop-blur-md border border-blue-400/30 rounded-2xl p-4 hover:from-blue-500/90 hover:via-cyan-500/90 hover:to-blue-600/90 transition-all duration-500 transform hover:scale-110 hover:rotate-3 shadow-xl hover:shadow-blue-500/40"
                title="Edit Cinematic Masterpiece"
              >
                {/* Animated Background Particles */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping" />
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-cyan-300 rounded-full animate-ping animation-delay-200" />
                  <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse" />
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                {/* Icon with Advanced Animation */}
                <div className="relative z-10 flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-white group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
                  <div className="absolute inset-0 bg-cyan-400/30 rounded-full opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity duration-300" />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/btn:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
              </button>

              {/* Delete Button - Ultra Modern Destructive */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDeleteConfirm(movie.id)
                }}
                className="group/btn relative overflow-hidden bg-gradient-to-br from-red-600/90 via-red-500/90 to-pink-500/90 backdrop-blur-md border border-red-400/30 rounded-2xl p-4 hover:from-red-500/90 hover:via-pink-500/90 hover:to-red-600/90 transition-all duration-500 transform hover:scale-110 hover:-rotate-3 shadow-xl hover:shadow-red-500/40"
                title="Remove from Collection"
              >
                {/* Animated Danger Particles */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping" />
                  <div className="absolute bottom-2 right-1 w-1 h-1 bg-orange-400 rounded-full animate-ping animation-delay-300" />
                  <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-red-300 rounded-full animate-pulse animation-delay-100" />
                </div>

                {/* Fire Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-red-500/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* Icon with Destruction Animation */}
                <div className="relative z-10 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
                  <div className="absolute inset-0 bg-orange-400/30 rounded-full opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity duration-300" />
                </div>

                {/* Danger Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover/btn:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
              </button>
            </div>

            {/* Modern Action Labels */}
            <div className="flex space-x-8 mt-4 text-xs text-gray-400 font-medium">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 animation-delay-200">
                DETAILS
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 animation-delay-300">
                EDIT
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 animation-delay-400">
                REMOVE
              </span>
            </div>
          </div>
        )}

        {/* Premium Info Overlay (Always Visible) */}
        {!isHovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-6 pt-12">
            <h3 className="text-white font-bold text-lg truncate mb-2 tracking-wide">{movie.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span className="flex items-center bg-gray-800/60 backdrop-blur-sm px-2 py-1 rounded-full">
                <Calendar className="w-3 h-3 mr-1" /> {movie.year}
              </span>
              <span className="flex items-center bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm px-2 py-1 rounded-full border border-yellow-500/30">
                <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" /> {movie.rating || "N/A"}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ULTRA MODERN Movie List Item Component for List View
  const MovieListItem = ({ movie }) => {
    return (
      <div className="relative group">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-pink-600/5 to-red-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-gradient-to-r from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 hover:border-gray-600/70 transition-all duration-700 group hover:scale-[1.02] hover:shadow-red-500/20">
          <div className="flex items-center space-x-8">
            {/* Premium Movie Poster */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                className="relative w-28 h-36 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700 border border-gray-700/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
            </div>

            {/* Premium Movie Info */}
            <div className="flex-1">
              <h3 className="text-3xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-pink-400 transition-all duration-500 tracking-wide">
                {movie.title}
              </h3>
              <div className="flex items-center space-x-6 text-sm mb-6">
                <span className="flex items-center bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-medium">{movie.year}</span>
                </span>
                <span className="flex items-center bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/30">
                  <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                  <span className="font-bold text-yellow-300">{movie.rating || "N/A"}</span>
                </span>
                <span className="bg-gradient-to-r from-red-600/30 to-pink-600/30 backdrop-blur-sm px-4 py-2 rounded-full text-red-300 font-bold border border-red-500/30">
                  {movie.genre}
                </span>
                {movie.isFavorite && (
                  <span className="bg-gradient-to-r from-pink-600/30 to-red-600/30 backdrop-blur-sm px-4 py-2 rounded-full text-pink-200 font-bold border border-pink-500/30 flex items-center">
                    <Heart className="w-4 h-4 mr-2 fill-current" />
                    FAVORITE
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-base line-clamp-2 leading-relaxed font-light">{movie.description}</p>
            </div>

            {/* ULTRA MODERN Action Buttons for List View */}
            <div className="flex flex-col space-y-4">
              {/* View Details Button - Modern Glass */}
              <button
                onClick={() => setSelectedMovie(movie)}
                className="group/btn relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-4 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative z-10 flex items-center">
                  <Play className="w-5 h-5 mr-3 text-white group-hover/btn:scale-110 transition-transform duration-300" />
                  <span className="text-white font-bold tracking-wide">WATCH DETAILS</span>
                </div>
              </button>

              {/* Edit Button - Ultra Modern */}
              <button
                onClick={() => handleEdit(movie)}
                className="group/btn relative overflow-hidden bg-gradient-to-r from-blue-600/80 via-blue-500/80 to-cyan-500/80 backdrop-blur-md border border-blue-400/30 rounded-2xl px-8 py-4 hover:from-blue-500/90 hover:via-cyan-500/90 hover:to-blue-600/90 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-blue-500/30"
              >
                {/* Advanced Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 left-4 w-1 h-1 bg-cyan-300 rounded-full animate-ping" />
                  <div className="absolute bottom-2 right-4 w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-200" />
                </div>

                <div className="relative z-10 flex items-center">
                  <Target className="w-5 h-5 mr-3 text-white group-hover/btn:scale-110 group-hover/btn:rotate-180 transition-all duration-500" />
                  <span className="text-white font-bold tracking-wide">EDIT MASTERPIECE</span>
                </div>
              </button>

              {/* Remove Button - Ultra Modern Destructive */}
              <button
                onClick={() => setShowDeleteConfirm(movie.id)}
                className="group/btn relative overflow-hidden bg-gradient-to-r from-red-600/80 via-red-500/80 to-pink-500/80 backdrop-blur-md border border-red-400/30 rounded-2xl px-8 py-4 hover:from-red-500/90 hover:via-pink-500/90 hover:to-red-600/90 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-red-500/30"
              >
                {/* Danger Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                {/* Fire Particles */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 left-4 w-1 h-1 bg-orange-400 rounded-full animate-ping" />
                  <div className="absolute bottom-2 right-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping animation-delay-300" />
                </div>

                <div className="relative z-10 flex items-center">
                  <Scissors className="w-5 h-5 mr-3 text-white group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
                  <span className="text-white font-bold tracking-wide">REMOVE</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Premium Movie Details Modal Component
  const MovieDetailsModal = ({ movie, onClose }) => {
    if (!movie) return null

    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 z-[100] animate-fade-in">
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl shadow-2xl max-w-6xl w-full mx-4 overflow-hidden transform scale-95 animate-scale-in border border-gray-700/50">
          {/* Premium Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-20 p-4 bg-gray-800/80 backdrop-blur-sm rounded-full text-white hover:bg-gray-700/80 transition-all duration-500 transform hover:scale-110 hover:rotate-90 group"
          >
            <X className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-red-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
          </button>

          {/* Add to Favorites Button */}
          <button
            onClick={() => handleToggleFavorite(movie.id)}
            className="absolute top-8 right-24 z-20 p-4 bg-gray-800/80 backdrop-blur-sm rounded-full text-white hover:bg-gray-700/80 transition-all duration-500 transform hover:scale-110 group"
          >
            <Heart 
              className={`w-6 h-6 group-hover:scale-110 transition-transform duration-300 ${movie.isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-300'}`}
            />
            <div className="absolute inset-0 bg-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
          </button>

          {/* Premium Movie Header */}
          <div
            className="relative h-80 sm:h-96 md:h-[28rem] bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.poster})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/60 to-transparent" />
            <div className="absolute top-8 left-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-lg animate-pulse" />
                <span className="relative bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-black px-6 py-3 rounded-full shadow-xl border border-red-400/30">
                  🎬 NOW FEATURING
                </span>
              </div>
            </div>
          </div>

          {/* Premium Movie Content */}
          <div className="p-10 sm:p-12 md:p-16 -mt-24 relative z-10">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
              {movie.title}
            </h2>

            <div className="flex flex-wrap items-center gap-6 mb-10 text-sm sm:text-base">
              <span className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-3 rounded-full font-black shadow-xl">
                <Star className="w-5 h-5 mr-2 fill-current" /> {movie.rating || "N/A"} RATING
              </span>
              <span className="bg-gray-700/80 backdrop-blur-sm text-gray-200 px-6 py-3 rounded-full font-bold border border-gray-600/50">
                {movie.year}
              </span>
              <span className="bg-gradient-to-r from-red-600/40 to-pink-600/40 backdrop-blur-sm text-red-300 px-6 py-3 rounded-full font-bold border border-red-500/30">
                {movie.genre}
              </span>
              {movie.isFavorite && (
                <span className="bg-gradient-to-r from-pink-600/40 to-red-600/40 backdrop-blur-sm text-pink-200 px-6 py-3 rounded-full font-bold border border-pink-500/30 flex items-center">
                  <Heart className="w-5 h-5 mr-2 fill-current" /> FAVORITE
                </span>
              )}
            </div>

            <p className="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed font-light">{movie.description}</p>

            {/* ULTRA MODERN Modal Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Edit Button - Ultra Premium */}
              <button
                onClick={() => handleEdit(movie)}
                className="group relative flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-700 ease-in-out transform hover:scale-105 overflow-hidden border border-blue-400/30"
              >
                {/* Advanced Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Multiple Shimmer Layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent transform skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1200" />

                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-3 left-6 w-1 h-1 bg-cyan-300 rounded-full animate-ping" />
                  <div className="absolute bottom-3 right-6 w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-200" />
                  <div className="absolute top-4 right-12 w-0.5 h-0.5 bg-white rounded-full animate-pulse animation-delay-100" />
                </div>

                <div className="relative z-10 flex items-center">
                  <Edit className="w-7 h-7 mr-4 group-hover:rotate-180 group-hover:scale-110 transition-all duration-500" />
                  <span className="tracking-wide">EDIT THIS MASTERPIECE</span>
                </div>
              </button>

              {/* Remove Button - Ultra Premium Destructive */}
              <button
                onClick={() => setShowDeleteConfirm(movie.id)}
                className="group relative flex items-center justify-center px-12 py-5 bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-red-500/50 transition-all duration-700 ease-in-out transform hover:scale-105 overflow-hidden border border-red-400/30"
              >
                {/* Advanced Danger Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Fire Shimmer Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent transform skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1200" />

                {/* Danger Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-3 left-6 w-1 h-1 bg-orange-400 rounded-full animate-ping" />
                  <div className="absolute bottom-3 right-6 w-1 h-1 bg-yellow-400 rounded-full animate-ping animation-delay-300" />
                  <div className="absolute top-4 right-12 w-0.5 h-0.5 bg-red-300 rounded-full animate-pulse animation-delay-150" />
                </div>

                <div className="relative z-10 flex items-center">
                  <Flame className="w-7 h-7 mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="tracking-wide">REMOVE FROM COLLECTION</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Premium Delete Confirmation Modal
  const DeleteConfirmModal = ({ movieId, onClose, onConfirm }) => {
    const movie = movies.find((m) => m.id === movieId)
    if (!movie) return null

    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 z-[100] animate-fade-in">
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden transform scale-95 animate-scale-in border border-gray-700/50">
          <div className="p-12 text-center">
            {/* Premium Warning Icon */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full blur-xl animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <Flame className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>

            <h3 className="text-4xl font-black text-white mb-4 tracking-wide">REMOVE FROM COLLECTION</h3>
            <p className="text-gray-300 mb-3 text-xl font-light">Are you absolutely sure you want to remove</p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 font-black text-2xl mb-8 tracking-wide">
              "{movie.title}"
            </p>
            <p className="text-gray-400 mb-12 text-lg leading-relaxed max-w-lg mx-auto">
              This cinematic masterpiece will be permanently removed from your personal theater collection. This action
              cannot be undone and all memories associated with this film will be lost forever.
            </p>

            {/* ULTRA MODERN Confirmation Buttons */}
            <div className="flex gap-6">
              <button
                onClick={onClose}
                className="flex-1 relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-10 py-5 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <span className="relative z-10 text-white font-bold text-lg tracking-wide">KEEP MASTERPIECE</span>
              </button>

              <button
                onClick={() => onConfirm(movieId)}
                className="flex-1 relative overflow-hidden bg-gradient-to-r from-red-600/90 via-red-500/90 to-pink-500/90 backdrop-blur-md border border-red-400/30 rounded-2xl px-10 py-5 hover:from-red-500/90 hover:via-pink-500/90 hover:to-red-600/90 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-red-500/40"
              >
                {/* Fire Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />

                <span className="relative z-10 text-white font-bold text-lg tracking-wide">REMOVE FOREVER</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-white text-3xl font-black mb-3 tracking-wide">🎬 LOADING YOUR CINEMA</p>
          <p className="text-gray-400 text-xl font-light">Preparing your premium movie collection...</p>
          <p className="text-gray-500 text-lg font-light mt-2">
            Curating cinematic experiences just for you...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />

      <main className="relative z-10 -mt-24 md:-mt-32 space-y-20 md:space-y-24 pb-24">
        <SearchFilterSection />

        {filteredMovies.length === 0 ? (
          <div className={`${containerClass} text-center py-24`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-600/5 to-red-600/10 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-20">
                <div className="relative w-40 h-40 mx-auto mb-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full blur-xl animate-pulse" />
                  <div className="relative w-40 h-40 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center shadow-2xl">
                    <Film className="w-20 h-20 text-gray-400" />
                  </div>
                </div>

                <h3 className="text-5xl font-black text-white mb-6 tracking-wide">🎭 NO MOVIES FOUND</h3>
                <p className="text-gray-400 mb-4 text-2xl leading-relaxed max-w-3xl mx-auto font-light">
                  {searchTerm || selectedGenre
                    ? "Your search didn't match any movies in your premium collection. Try different keywords or explore all cinematic genres to discover hidden gems."
                    : "Your personal cinema awaits its first masterpiece! Start building your legendary movie collection by adding your inaugural cinematic experience."}
                </p>
                <p className="text-gray-500 mb-8 text-xl font-light">
                  Every legendary collection starts with a single, unforgettable film that captures your imagination.
                </p>
                <p className="text-gray-600 mb-12 text-lg font-light">
                  What story will you choose to begin your cinematic journey?
                </p>

                <button
                  onClick={() => navigate("/add-movie")}
                  className="group relative px-16 py-6 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white rounded-2xl font-black text-2xl shadow-2xl hover:shadow-red-500/60 transition-all duration-700 ease-in-out transform hover:scale-110 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Plus className="w-8 h-8 mr-4 inline group-hover:rotate-180 transition-transform duration-500 relative z-10" />
                  <span className="relative z-10 tracking-wide">ADD YOUR FIRST MASTERPIECE</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={containerClass}>
            {/* Premium Collection Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-8">
                <Award className="w-10 h-10 text-yellow-400 mr-4" />
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  YOUR PREMIUM
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 ml-3">
                    COLLECTION
                  </span>
                </h2>
                <Crown className="w-10 h-10 text-yellow-400 ml-4" />
              </div>
              <p className="text-gray-300 text-xl font-light max-w-3xl mx-auto mb-4">
                Showcasing <span className="text-red-400 font-bold">{filteredMovies.length}</span> premium cinematic
                experience{filteredMovies.length !== 1 ? "s" : ""} from your personal theater empire
              </p>
              <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
                Each film represents a carefully curated moment in cinema history, handpicked for your collection
              </p>
            </div>

            {/* Premium Movie Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {filteredMovies.map((movie) => (
                  <MovieListItem key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />

      {showDeleteConfirm && (
        <DeleteConfirmModal
          movieId={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(null)}
          onConfirm={handleDelete}
        />
      )}

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
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
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
        
        .animation-delay-350 {
          animation-delay: 0.35s;
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
        
        /* Premium select arrow */
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

export default MoviesFetch