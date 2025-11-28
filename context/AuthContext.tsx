import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api, initializeDatabase } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (contact: string, password: string) => Promise<boolean>;
  signup: (name: string, contact: string, password: string) => Promise<boolean>;
  logout: () => void;
  deleteProfile: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Initialize DB seeds
        initializeDatabase();
        
        // 2. Check session
        const currentUser = await api.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error("Auth Initialization Failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (contact: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const loggedInUser = await api.auth.login(contact, password);
      setUser(loggedInUser);
      return true;
    } catch (error) {
      console.warn("Login failed (invalid credentials)");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, contact: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser = await api.auth.signup({ name, contact, password });
      setUser(newUser);
      return true;
    } catch (error: any) {
      // Don't log expected validation errors as red console errors
      if (error.message === 'User already exists') {
        console.warn("Signup validation: User already exists");
      } else {
        console.error("Signup failed:", error);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await api.auth.logout();
    setUser(null);
  };

  const deleteProfile = async () => {
    if (!user) return;
    try {
      await api.auth.deleteAccount(user.id);
      setUser(null);
    } catch (error) {
      console.error("Delete account failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, deleteProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};