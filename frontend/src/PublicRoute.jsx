import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('token'); 
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [role, setRole] = useState('');

  useEffect(() => {
    if (!user) return;

    if (user.role === "intern") {
      setRole('stagaire');
    } else if (user.role === "recruiter") {
      setRole('recruteur');
    } else if (user.role === "admin") {
      setRole('adminstrateur');
    }
  }, [user]);

  if (isAuthenticated) {
    // Wait for role to be set, otherwise don't redirect yet
    if (!role) {
      return null; // or a loading spinner if you want
    }
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return children;
};

export default PublicRoute;
