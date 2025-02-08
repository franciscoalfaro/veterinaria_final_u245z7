import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import CryptoJS from 'crypto-js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in on component mount
    const storedSession = localStorage.getItem('supabaseSession');
    if (storedSession) {
      const session = JSON.parse(storedSession);
      if (session && session.isLoggedIn) {
        setIsLoggedIn(session.isLoggedIn);
        setUserRole(session.userRole);
        setUserId(session.userId)
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username);

      if (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Error al intentar iniciar sesión.' };
      } else if (data && data.length > 0) {
        const user = data[0];
        const hashedPassword = CryptoJS.SHA256(password).toString();
        if (user.password === hashedPassword) {
          setIsLoggedIn(true);
          setUserRole(user.role);
          setUserId(user.id)

          // Store session in localStorage
          localStorage.setItem('supabaseSession', JSON.stringify({ isLoggedIn: true, userRole: user.role, userId:user.id }));

          const { password, ...newData } = user;

          return { success: newData};
        } else {
          return { success: false, error: 'Contraseña incorrecta.' };
        }
      } else {
        return { success: false, error: 'Usuario no encontrado.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error al intentar iniciar sesión.' };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    // Clear session from localStorage
    localStorage.removeItem('supabaseSession');
    navigate('/login', { replace: true }); // Redirect to login after logout
  };

  const value = {
    isLoggedIn,
    userRole,
    userId,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
