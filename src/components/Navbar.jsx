"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useStreamContext } from "../context/StreamContext"
import { toast } from "react-toastify"
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  Play,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  Film,
  Heart,
  Info,
  Users,
  History,
  Plus,
} from "lucide-react"

const Navbar = () => {
  const { currentUser, logout } = useStreamContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const userMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const searchInputRef = useRef(null)

  // Close dropdowns/menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
      if (
        isSearchOpen &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest(".search-toggle-button")
      ) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchOpen])

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully!")
    if (location.pathname === "/users") {
      navigate("/")
    }
    setIsUserMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsSearchOpen(false)
    setIsUserMenuOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    setIsMobileMenuOpen(false)
    setIsUserMenuOpen(false)
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100) // Focus input after it appears
    }
  }

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-black via-gray-950 to-black backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="group flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-500/30 transition-all duration-300 ease-in-out">
                  <Play className="w-6 h-6 text-white fill-current" />
                </div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
                  StreamFlix
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {[
                  { path: "/", label: "Home", icon: Home },
                  { path: "/reem", label: "Movies", icon: Film },
                  { path: "/favorites", label: "Favorites", icon: Heart },
                  { path: "/about", label: "About", icon: Info },
                  ...(currentUser ? [{ path: "/users", label: "Users", icon: Users }] : []),
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-200 ease-in-out ${location.pathname === item.path
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search */}
              <div className="relative flex items-center">
                {isSearchOpen && (
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search movies, shows..."
                    className="bg-gray-800/70 border border-gray-700 rounded-full px-4 py-2 text-white placeholder-gray-400 outline-none w-32 sm:w-48 md:w-64 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                )}
                <button
                  onClick={toggleSearch}
                  className={`search-toggle-button w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 ease-in-out ${isSearchOpen ? "bg-red-600 shadow-lg shadow-red-600/30 ml-2" : "bg-gray-800/50 hover:bg-gray-700/50"
                    }`}
                  title="Search"
                >
                  {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                </button>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Search - keep existing code */}

                {/* Replace Notifications with Add Movie */}
                <Link
                  to="/add-movie" // Or your add movie route
                  className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 ease-in-out relative"
                  title="Add Movie"
                >
                  <Plus className="w-5 h-5" />
                </Link>

                {/* Keep existing User Section code */}
              </div>

              {/* User Section */}
              {currentUser ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full px-3 py-2 transition-all duration-200 ease-in-out backdrop-blur-sm"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white font-medium hidden sm:block">{currentUser.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden animate-fade-in-down">
                      {/* User Info */}
                      <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {currentUser.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{currentUser.name}</div>
                            <div className="text-gray-400 text-sm">{currentUser.email}</div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {[
                          { path: "/profile", label: "Profile", icon: User },
                          { path: "/settings", label: "Settings", icon: Settings },
                          { path: "/favorites", label: "My Favorites", icon: Heart },
                          { path: "/history", label: "Watch History", icon: History },
                        ].map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </Link>
                        ))}

                        <div className="border-t border-gray-700/50 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 w-full"
                          >
                            <LogOut className="w-5 h-5" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/auth/signin"
                    className="px-4 py-2 text-white font-medium hover:bg-white/10 rounded-full transition-all duration-200 hidden sm:block"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 hidden sm:block"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={toggleMobileMenu}></div>
      )}

      {/* Mobile Menu Content (Slide-in from right) */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-gray-900/95 backdrop-blur-xl shadow-2xl border-l border-gray-700/50 z-50 transform transition-transform duration-300 ease-in-out lg:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-800">
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Menu
          </span>
          <button onClick={toggleMobileMenu} className="p-2 text-gray-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-2">
          {[
            { path: "/", label: "Home", icon: Home },
            { path: "/movies", label: "Movies", icon: Film },
            { path: "/favorites", label: "Favorites", icon: Heart },
            { path: "/about", label: "About", icon: Info },
            ...(currentUser ? [{ path: "/users", label: "Users", icon: Users }] : []),
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              onClick={toggleMobileMenu}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User Section for Mobile */}
        <div className="border-t border-gray-700/50 p-4">
          {currentUser ? (
            <>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{currentUser.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{currentUser.name}</div>
                  <div className="text-gray-400 text-sm">{currentUser.email}</div>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                  onClick={toggleMobileMenu}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                  onClick={toggleMobileMenu}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <Link
                to="/auth/signin"
                className="block w-full px-4 py-3 text-center text-white font-medium bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-all duration-200"
                onClick={toggleMobileMenu}
              >
                Sign in
              </Link>
              <Link
                to="/auth/signup"
                className="block w-full px-4 py-3 text-center text-white font-medium bg-gradient-to-r from-red-600 to-pink-600 rounded-xl hover:shadow-lg transition-all duration-200"
                onClick={toggleMobileMenu}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
