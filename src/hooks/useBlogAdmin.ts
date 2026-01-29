import { useState, useEffect, useCallback } from 'react';

const ADMIN_SESSION_KEY = 'blog_admin_authenticated';

export const useBlogAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(session === 'true');
    setIsLoading(false);
  }, []);

  const login = useCallback((code: string): boolean => {
    // The admin code is validated against the environment variable
    const adminCode = import.meta.env.VITE_BLOG_ADMIN_CODE;
    
    if (code === adminCode) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isLoading, login, logout };
};
