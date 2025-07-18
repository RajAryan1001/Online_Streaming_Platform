"use client" // This is needed for client-side hooks like useForm
import { useForm } from "react-hook-form"
import { useStreamContext } from "../context/StreamContext" // Keeping the user's original context import
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom" // Keeping the user's original router import
import { Mail, Lock, Film, Sparkles, ArrowRight, UserPlus } from "lucide-react"

export default function SignIn() {
  const { findUser, setCurrentUser } = useStreamContext() // Keeping original context usage
  const navigate = useNavigate() // Keeping original router usage
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const user = findUser(data.email, data.password)
      if (user) {
        setCurrentUser(user)
        toast.success(`Welcome back, ${user.name}! Your cinematic journey awaits!`) // Enhanced toast message
        navigate("/")
      } else {
        toast.error("Invalid email or password! Please check your credentials and try again.") // Enhanced error message
      }
    } catch (error) {
      toast.error("An unexpected error occurred during login. Please try again later.") // Enhanced error message
      console.error("Login error:", error)
    }
  }

  // Note: The loading state from the previous turn's AuthContext is not directly used here
  // as the user provided a specific SignIn component with useStreamContext.
  // If you wish to integrate a loading state, you would manage it within this component
  // or ensure useStreamContext provides it. For now, I'm keeping the provided structure.

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-blue-600/10 rounded-3xl blur-2xl" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative bg-gradient-to-br from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 md:p-10"
        >
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <Film className="w-10 h-10 text-blue-400 mr-4 animate-pulse-icon" />
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                WELCOME BACK
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 ml-3">
                  CINEPHILE
                </span>
              </h2>
              <Sparkles className="w-10 h-10 text-purple-400 ml-4 animate-pulse-icon" />
            </div>
            <p className="text-gray-300 text-lg font-light max-w-xs mx-auto">
              Sign in to continue your epic cinematic journey.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your Email for Cinematic Access"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full pl-12 pr-4 py-3 bg-gray-800/60 border-2 ${
                  errors.email ? "border-red-500" : "border-gray-700/50"
                } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80`}
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Your Secret Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full pl-12 pr-4 py-3 bg-gray-800/60 border-2 ${
                  errors.password ? "border-red-500" : "border-gray-700/50"
                } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500/50 transition-all duration-300 text-lg font-medium backdrop-blur-sm hover:bg-gray-800/80`}
              />
              {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me for next screening
              </label>
            </div>
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-400 hover:text-blue-300 underline focus:outline-none transition-colors duration-300"
                onClick={() => toast.info("Don't worry, your cinematic key is safe with us! (Feature coming soon)")}
              >
                Forgot your cinematic key?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-8 w-full group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-xl font-black text-xl shadow-2xl hover:shadow-blue-500/60 transition-all duration-700 ease-in-out transform hover:scale-105 hover:rotate-1 overflow-hidden border border-blue-400/30 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
                    <span className="tracking-wide">ACCESSING CINEMA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="tracking-wide">SIGN IN TO YOUR CINEMA</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />
            </button>
          </div>

          <div className="flex justify-center items-center mt-6 text-gray-400 text-sm">
            <p className="mr-2">New to Streamflix?</p>
            <button
              onClick={() => navigate("/auth/signup")}
              className="text-red-400 hover:text-red-300 underline font-medium transition-colors duration-300 flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-1" /> Create Your Account
            </button>
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
