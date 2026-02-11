import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AdminAuthContext } from '@/context/AdminAuthContext';

export function AdminRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AdminAuthContext);
  const location = useLocation();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
