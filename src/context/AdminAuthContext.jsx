import { createContext, useState, useEffect, useCallback } from 'react';
import { authApi, getAdminToken, setAdminToken, removeAdminToken } from '@/lib/api';

export const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAdminToken();
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await authApi.getMeAdmin();
        setAdmin(response.data.admin);
        setIsAuthenticated(true);
      } catch (error) {
        // Token invalid, clear it
        removeAdminToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Set auth data after login
  const setAuth = useCallback((token, adminData) => {
    setAdminToken(token);
    setAdmin(adminData);
    setIsAuthenticated(true);
  }, []);

  // Logout
  const logout = useCallback(() => {
    removeAdminToken();
    setAdmin(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    admin,
    isLoading,
    isAuthenticated,
    setAuth,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
