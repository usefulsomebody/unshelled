import { useAuth } from '../contexts/userContext';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Outlet />;
};

AuthRoute.displayName = 'AuthRoute';
export default AuthRoute;
