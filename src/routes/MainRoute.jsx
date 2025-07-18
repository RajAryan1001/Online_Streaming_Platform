import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import AuthPage from '../auth/AuthPage';
import Users from '../pages/Users';
import MyMovie from '../pages/MyMovies.jsx';
import MovieFetch from '../pages/MovieFetch';
import MovieDetails from '../pages/MovieDetails.jsx'; // Make sure this import path is correct
import MovieEdit from '../pages/MovieEdit';
import Favorites from '../pages/favorate.jsx';
import Reem from  '../pages/Reem.jsx';


import { useStreamContext } from '../context/StreamContext';
import AddMovie from '../pages/AddMovie.jsx';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useStreamContext();
  return currentUser ? children : <Navigate to="/auth/signin" replace />;
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
       <Route path="/reem" element={<Reem />} />
      <Route path="/movies" element={<MyMovie />} />
      <Route path="/moviesfetch" element={<MovieFetch />} />
      <Route path='/add-movie' element ={<AddMovie/>} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/movies/:id" element={<MovieDetails />} /> {/* Single route declaration */}
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/movies/:id/edit" element={<MovieEdit />} />
      <Route path="/users" 
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default MainRoutes;