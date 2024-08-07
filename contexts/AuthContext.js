import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout, signup as authSignup, refreshSession } from '../utils/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        try {
          await refreshSession();
          setUser(currentUser);
        } catch (error) {
          console.error('Session refresh failed:', error);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const user = await authLogin(email, password);
    setUser(user);
    return user;
  };

  const signup = async (name, email, password) => {
    const user = await authSignup(name, email, password);
    setUser(user);
    return user;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};