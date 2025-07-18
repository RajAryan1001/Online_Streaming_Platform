// src/auth/AuthPage.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';

const AuthPage = () => {
  return (
    <div className="auth-page">
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="signin" replace />} />
      </Routes>
    </div>
  );
};

export default AuthPage;