import React from 'react'
import { Navigate } from 'react-router-dom';

export default function RequireProfileRoute({children}) {
const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/stagaire/connexion" replace />;
  }

  if (!user.has_intern_profile) {
    return <Navigate to="/stagaire/creer_profil" replace />;
  }
  return children;
}
