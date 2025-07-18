"use client"

import { Link }from "react-router-dom"
import { Film, Sparkles, Heart, Award, Users, Globe, Lightbulb, ArrowLeft } from "lucide-react"

export default function AboutUs() {
  const containerClass = "mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"

  const HeroSection = () => {
    return (
      <div className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-blue-950/20" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-purple-950/10 to-black" />
            <div className="absolute inset-0 opacity-3">
              <div
                className="h-full w-full bg-repeat"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3Ccircle cx='60' cy='60' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "80px 80px",
                }}
              />
            </div>
            <div className="absolute top-20 left-20 w-2 h-2 bg-purple-500 rounded-full animate-pulse opacity-60" />
            <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" />
            <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-30" />
          </div>
        </div>
        <div className={`relative z-10 w-full ${containerClass} text-center`}>
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-60 animate-pulse" />
              <div className="relative flex items-center bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white text-sm font-black px-8 py-4 rounded-full shadow-2xl border border-purple-400/30">
                <Film className="w-6 h-6 mr-3 text-yellow-300 animate-pulse" />
                <span className="tracking-wider">🌟 BEHIND THE SCENES</span>
                <Sparkles className="w-6 h-6 ml-3 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-white mb-8 drop-shadow-2xl leading-tight animate-fade-in-up animation-delay-100 tracking-tight">
            <span className="relative">
              ABOUT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                STREAMFLIX
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl -z-10" />
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4 drop-shadow-lg animate-fade-in-up animation-delay-200 max-w-4xl mx-auto font-light">
            🎬 Your Ultimate Cinematic Journey Starts Here
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 drop-shadow-lg animate-fade-in-up animation-delay-300 max-w-4xl mx-auto leading-relaxed font-light">
            Discover the passion, vision, and dedication that drives Streamflix to bring you an unparalleled movie
            collection experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-400">
            <Link
              href="/moviesfetch"
              className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Film className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Explore Our Collection</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            <Link
              href="/"
              className="group flex items-center justify-center px-10 py-4 bg-gray-800/80 backdrop-blur-sm text-white rounded-full font-semibold text-xl shadow-2xl hover:bg-gray-700/80 transition-all duration-500 ease-in-out transform hover:scale-110 border border-gray-600/50 hover:border-gray-500/50"
            >
              <ArrowLeft className="w-7 h-7 mr-3 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const SectionTitle = ({ icon: Icon, title, subtitle }) => (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-yellow-400 mr-4 animate-pulse-icon" />
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          {title}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 ml-3">
            {subtitle}
          </span>
        </h2>
        <Icon className="w-10 h-10 text-yellow-400 ml-4 animate-pulse-icon" />
      </div>
      <p className="text-gray-300 text-xl font-light max-w-3xl mx-auto mb-4">
        Discover the core values and aspirations that define our cinematic journey.
      </p>
    </div>
  )

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-gradient-to-br from-gray-950/90 via-gray-900/90 to-gray-950/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 p-8 text-center group hover:border-purple-500/50 transition-all duration-500 transform hover:scale-[1.02]">
      <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-purple-500/30 transition-all duration-500">
        <Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
      </div>
      <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white" style={{marginTop:'65px'}}>
      <HeroSection />
      <main className="relative z-10 -mt-24 md:-mt-32 space-y-20 md:space-y-24 pb-24">
        <div className={containerClass}>
          <SectionTitle icon={Award} title="OUR" subtitle="MISSION" />
          <div className="bg-gradient-to-br from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-10 md:p-16 text-center">
            <p className="text-gray-300 text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto font-light mb-8">
              At Streamflix, our mission is to revolutionize how you experience cinema. We believe every movie is a
              journey, and every collection tells a unique story. We are dedicated to providing a seamless, immersive,
              and personalized platform for cinephiles to curate, discover, and celebrate their favorite films.
            </p>
            <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light">
              We strive to be the ultimate destination for movie lovers, fostering a community where passion for film
              thrives.
            </p>
          </div>
        </div>

        <div className={containerClass}>
          <SectionTitle icon={Lightbulb} title="OUR CORE" subtitle="VALUES" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={Users}
              title="Community First"
              description="Building a vibrant community where movie enthusiasts can connect, share, and discuss their cinematic passions."
            />
            <FeatureCard
              icon={Globe}
              title="Innovation Driven"
              description="Continuously pushing the boundaries of technology to enhance your movie discovery and viewing experience."
            />
            <FeatureCard
              icon={Heart}
              title="Passion for Cinema"
              description="Driven by an unwavering love for movies, we aim to share the magic of storytelling with the world."
            />
          </div>
        </div>

        <div className={containerClass}>
          <SectionTitle icon={Sparkles} title="WHAT MAKES US" subtitle="UNIQUE" />
          <div className="bg-gradient-to-br from-gray-950/95 via-gray-900/95 to-gray-950/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-10 md:p-16">
            <ul className="space-y-8 text-gray-300 text-xl md:text-2xl font-light">
              <li className="flex items-start">
                <Film className="w-8 h-8 text-red-400 mr-4 flex-shrink-0 mt-1" />
                <span>
                  <span className="font-bold text-white">Personalized Collections:</span> Curate your own cinematic
                  universe with ease, tracking every film that resonates with you.
                </span>
              </li>
              <li className="flex items-start">
                <Sparkles className="w-8 h-8 text-pink-400 mr-4 flex-shrink-0 mt-1" />
                <span>
                  <span className="font-bold text-white">Immersive Experience:</span> Our sleek, intuitive interface and
                  stunning visuals make every interaction a delight.
                </span>
              </li>
              <li className="flex items-start">
                <Heart className="w-8 h-8 text-purple-400 mr-4 flex-shrink-0 mt-1" />
                <span>
                  <span className="font-bold text-white">Discovery Engine:</span> Unearth hidden gems and rediscover
                  forgotten classics with our intelligent search and filter tools.
                </span>
              </li>
              <li className="flex items-start">
                <Users className="w-8 h-8 text-blue-400 mr-4 flex-shrink-0 mt-1" />
                <span>
                  <span className="font-bold text-white">Community & Connection:</span> Share your passion, discuss
                  films, and connect with fellow cinephiles.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${containerClass} text-center py-12`}>
          <p className="text-gray-400 text-xl font-light mb-8">
            Join the Streamflix family and embark on an unforgettable cinematic adventure!
          </p>
          <Link
            href="/moviesfetch"
            className="group relative px-16 py-6 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 text-white rounded-2xl font-black text-2xl shadow-2xl hover:shadow-red-500/60 transition-all duration-700 ease-in-out transform hover:scale-110 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Film className="w-8 h-8 mr-4 inline group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            <span className="relative z-10 tracking-wide">START YOUR JOURNEY NOW</span>
          </Link>
        </div>
      </main>

    <style jsx>{`
          /* You can add your custom Tailwind CSS animations here */
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
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* New animations for enhanced effects */
@keyframes sparkle {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  25% {
    transform: scale(1.1) rotate(10deg);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  50% {
    transform: scale(1) rotate(-5deg);
    text-shadow: 0 0 15px rgba(255, 255, 255, 1);
  }
  75% {
    transform: scale(1.1) rotate(5deg);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
}

@keyframes shatter {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: scale(1.05) rotate(5deg);
    opacity: 0.9;
  }
  50% {
    transform: scale(0.95) rotate(-5deg);
    opacity: 0.8;
  }
  75% {
    transform: scale(1.1) rotate(10deg);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.8) rotate(15deg);
    opacity: 0.5;
  }
}

@keyframes pulse-icon {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
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

.animate-sparkle {
  animation: sparkle 1s ease-in-out infinite;
}

.animate-shatter {
  animation: shatter 0.6s ease-out forwards;
}

.animate-pulse-icon {
  animation: pulse-icon 2s infinite ease-in-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
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
