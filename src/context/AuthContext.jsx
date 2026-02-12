import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authApi, getToken, setToken, removeToken } from '@/lib/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await authApi.getMe();
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        // Token invalid, clear it
        removeToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Set auth data after login/register
  const setAuth = useCallback((token, userData) => {
    setToken(token);
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  // Logout
  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setAuth,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
