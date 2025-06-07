// components/PrivateRoute.jsx
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
 const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));

  // Fallback to default login route if no user
  if (!token || !user) {
    const redirectPath = allowedRoles.includes('intern') ? '/stagaire/connexion/' : '/recruteur/connexion/';
    return <Navigate to={redirectPath} replace />;
  }

  // Redirect to homepage if role is not allowed
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;
