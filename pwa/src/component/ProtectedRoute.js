import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './../useAuth';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/" state={{ from: location }} />;
  } else if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If the user's role is not within the allowed roles, redirect them to an appropriate error page or another page
    return <Navigate to="/not-authorized" />;
  } else {
    // If the user is authenticated and has the right role, render the protected content
    return children;
  }
};

export default ProtectedRoute;
