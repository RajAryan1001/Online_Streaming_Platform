import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });


  const [loading, setLoading] = useState(false);
  const API_KEY = 'f005a88f06786fe358d90f49fa315563';

  // Save movies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  // Fetch movie cast from TMDB API
  const fetchMovieCast = async (title, year) => {
    try {
      // Step 1: Search for movie ID
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&year=${year}`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();

      if (!searchData.results?.length) return [];

      const movieId = searchData.results[0].id;

      // Step 2: Fetch cast using movie ID
      const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
      const creditsRes = await fetch(creditsUrl);
      const creditsData = await creditsRes.json();

      // Format cast data (limit to 10 actors)
      return creditsData.cast.slice(0, 10).map(actor => ({
        name: actor.name,
        character: actor.character,
        profilePic: actor.profile_path 
          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
          : null,
      }));
    } catch (error) {
      console.error("Failed to fetch cast:", error);
      return [];
    }
  };

  // Add new movie with cast data
  const addMovie = async (movieData) => {
    setLoading(true);
    try {
      const cast = await fetchMovieCast(movieData.title, movieData.year);
      const newMovie = {
        ...movieData,
        id: nanoid(),
        cast,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        rating: 0
      };
      setMovies(prev => [...prev, newMovie]);
      toast.success("Movie added successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to add movie");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update existing movie
  const updateMovie = async (id, updatedData) => {
    setLoading(true);
    try {
      let cast = [];
      if (updatedData.title || updatedData.year) {
        cast = await fetchMovieCast(
          updatedData.title || movies.find(m => m.id === id).title,
          updatedData.year || movies.find(m => m.id === id).year
        );
      }

      setMovies(prevMovies => 
        prevMovies.map(movie => 
          movie.id === id 
            ? { ...movie, ...updatedData, cast: cast.length ? cast : movie.cast }
            : movie
        )
      );
      toast.success("Movie updated successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to update movie");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete movie
  const deleteMovie = (id) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
    toast.success("Movie deleted successfully!");
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
      )
    );
  };

  return (
    <MovieContext.Provider value={{
      movies,
      addMovie,
      updateMovie,
      deleteMovie,
      toggleFavorite,
      loading

      
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);