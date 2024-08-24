import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get('https://book-exchange-iyt6.onrender.com/api/auth/user');
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post('https://book-exchange-iyt6.onrender.com/api/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      await fetchUser();
    } catch (error) {
      console.error('Registration error:', error.response.data.msg);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://book-exchange-iyt6.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      await fetchUser();
    } catch (error) {
      console.error('Login error:', error.response.data.msg);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};