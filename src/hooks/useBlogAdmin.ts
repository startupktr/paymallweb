import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const ADMIN_SESSION_KEY = 'blog_admin_authenticated';

export const useBlogAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a valid session
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    // Session must have been validated server-side within the last hour
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        const expiresAt = new Date(sessionData.expiresAt);
        if (expiresAt > new Date()) {
          setIsAuthenticated(true);
        } else {
          // Session expired, clear it
          sessionStorage.removeItem(ADMIN_SESSION_KEY);
        }
      } catch {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (code: string): Promise<boolean> => {
    try {
      // Validate admin code server-side via edge function
      const { data, error } = await supabase.functions.invoke('verify-admin-code', {
        body: { code }
      });

      if (error) {
        console.error('Error verifying admin code:', error);
        return false;
      }

      if (data?.valid) {
        // Store session with 1-hour expiration
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        
        sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({
          authenticated: true,
          expiresAt: expiresAt.toISOString()
        }));
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isLoading, login, logout };
};
