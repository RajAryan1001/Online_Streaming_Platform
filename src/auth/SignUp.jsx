"use client"

import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useStreamContext } from "../context/StreamContext"
import { User, Mail, Lock, Film, Sparkles, ArrowRight, Eye, Clapperboard, Popcorn } from "lucide-react"

export default function SignUp() {
  const { addUser, users, loading } = useStreamContext()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (data) => {
    if (users.some((user) => user.email === data.email)) {
      toast.error("Email already exists! Please sign in or use a different email.")
      return
    }
    const newUser = addUser(data)
    if (newUser) {
      toast.success("🎉 Account created successfully! Welcome to Streamflix!")
      reset()
      navigate("/auth/signin")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-white text-3xl font-black mb-3 tracking-wide">🎬 PREPARING YOUR EXPERIENCE</p>
          <p className="text-gray-400 text-xl font-light">Loading cinematic resources...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4" style={{marginTop:'75px'}}>
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-pink-600/5 to-red-600/10 rounded-3xl blur-2xl" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative bg-gradient-to-br from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 md:p-10"
        >
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <Film className="w-10 h-10 text-red-400 mr-4 animate-pulse-icon" />
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                JOIN
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 ml-3">
                  STREAMFLIX
                </span>
              </h2>
              <Sparkles className="w-10 h-10 text-pink-400 ml-4 animate-pulse-icon" />
            </div>
            <p className="text-gray-300 text-lg font-light max-w-xs mx-auto mb-4">
              Unlock a universe of cinematic masterpieces.
            </p>
            <p className="text-gray-400 text-sm font-light max-w-xs mx-auto">
              Your personal theater awaits. Sign up to curate your collection, discover new favorites, and dive into
              unforgettable stories.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300" />
              <input
                placeholder="Your Cinematic Alias"
                {...register("name", { required: "Username is required" })}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
              />
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>}
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pink-400 transition-colors duration-300" />
              <input
                placeholder="Your Email for Exclusive Access"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
              <input
                placeholder="Your Secret Password (min 6 characters)"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/60 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80"
              />
              {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full group relative px-10 py-4 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white rounded-xl font-black text-xl shadow-2xl hover:shadow-red-500/60 transition-all duration-700 ease-in-out transform hover:scale-105 hover:-rotate-1 overflow-hidden border border-red-400/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="tracking-wide">CREATING ACCOUNT...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="tracking-wide">CREATE YOUR STREAMFLIX ACCOUNT</span>
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />
          </button>

          <div className="flex justify-center items-center mt-6 text-gray-400 text-sm">
            <p className="mr-2">Already a Streamflix member?</p>
            <button
              type="button"
              onClick={() => navigate("/auth/signin")}
              className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors duration-300 flex items-center"
            >
              <Eye className="w-4 h-4 mr-1" /> Sign In to Your Cinema
            </button>
          </div>
          <div className="flex justify-center items-center mt-4 text-gray-500 text-xs">
            <Clapperboard className="w-3 h-3 mr-1" />
            <p>Your cinematic journey begins here.</p>
            <Popcorn className="w-3 h-3 ml-1" />
          </div>
        </form>
      </div>


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
