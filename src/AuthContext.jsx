import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from './supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Signup function
  const signup = async (email, password) => {
    return await supabase.auth.signUp(
      { email, password },
      { options: { shouldCreateSession: true } } 
    );
  };

   const signin = async (email, password) => {
    return await supabase.auth.signInWithPassword(
      { email, password },
      { options: { shouldCreateSession: true } } 
    );
  };

  return (
    <AuthContext.Provider value={{ signup, signin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
