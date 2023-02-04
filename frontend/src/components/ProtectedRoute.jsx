import { useAuth } from "../contexts/userContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

ProtectedRoute.displayName = "ProtectedRoute";
export default ProtectedRoute;
