import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAdminLoggedIn } = useAuth();

  if (!isAdminLoggedIn) {
    // If not logged in, redirect to the admin login page
    return <Navigate to="/admin/login" replace />;
  }

  // If logged in, render the component
  return children;
};

export default ProtectedRoute;
