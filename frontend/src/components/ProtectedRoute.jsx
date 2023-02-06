import { useAuth } from '../contexts/userContext';
import Loader from './Loader';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loader />;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

ProtectedRoute.displayName = 'ProtectedRoute';
export default ProtectedRoute;
