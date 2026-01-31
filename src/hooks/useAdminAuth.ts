import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has admin role
  const checkAdminRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', { _user_id: userId, _role: 'admin' });
      
      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }
      
      return data === true;
    } catch (err) {
      console.error('Error checking admin role:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check admin role when auth state changes
        if (session?.user) {
          // Use setTimeout to avoid Supabase client deadlock
          setTimeout(async () => {
            const hasAdminRole = await checkAdminRole(session.user.id);
            setIsAdmin(hasAdminRole);
            setIsLoading(false);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const hasAdminRole = await checkAdminRole(session.user.id);
        setIsAdmin(hasAdminRole);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [checkAdminRole]);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        const hasAdminRole = await checkAdminRole(data.user.id);
        if (!hasAdminRole) {
          // Sign out if not an admin
          await supabase.auth.signOut();
          return { success: false, error: 'You do not have admin privileges' };
        }
        setIsAdmin(true);
        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (err) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  }, [checkAdminRole]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  }, []);

  return { 
    user, 
    session, 
    isAdmin, 
    isAuthenticated: !!user && isAdmin, 
    isLoading, 
    login, 
    logout 
  };
};
