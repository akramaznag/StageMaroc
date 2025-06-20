import React from 'react'
import { Navigate } from 'react-router-dom';

export default function RequireNoEnterprise({children}) {
 const user = JSON.parse(sessionStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/recruteur/connexion" replace />;
  }

  if (user.has_enterprise) {
    return <Navigate to="/recruteur/dashboard" replace />;
  }
  return children;
}
