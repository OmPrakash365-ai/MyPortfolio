import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, getCurrentUserApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('portfolio_access_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('portfolio_access_token');
      if (storedToken) {
        try {
          const userData = await getCurrentUserApi();
          setUser(userData);
          setToken(storedToken);
        } catch (err) {
          console.error("Token verification failed:", err);
          localStorage.removeItem('portfolio_access_token');
          localStorage.removeItem('portfolio_refresh_token');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (username, password) => {
    const data = await loginApi(username, password);
    localStorage.setItem('portfolio_access_token', data.access);
    if (data.refresh) {
      localStorage.setItem('portfolio_refresh_token', data.refresh);
    }
    setToken(data.access);
    const userData = await getCurrentUserApi();
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('portfolio_access_token');
    localStorage.removeItem('portfolio_refresh_token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
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
