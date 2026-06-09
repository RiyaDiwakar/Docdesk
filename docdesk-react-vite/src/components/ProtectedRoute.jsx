import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute - Only authenticated users can access
 * If no token in localStorage → redirect to /login
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}