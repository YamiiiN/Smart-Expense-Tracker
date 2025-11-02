import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from "expo-secure-store";
import { API } from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getCurrentUser = async () => {
  try {
    // get token from SecureStore (or AsyncStorage if you prefer)
    const token = await SecureStore.getItemAsync("token");
    if (!token) throw new Error("No token found");

    // set Axios header
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // call backend
    const response = await API.get("/user/me"); // adjust endpoint if needed
    return response.data; // assuming backend sends user data in .data
  } catch (err) {
    console.error("Error fetching current user:", err);
    throw err;
  }
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUser = await AsyncStorage.getItem('userData');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      // setIsLoading(false);
    }
  };
  const login = async (userData) => {
    try {
      if (userData && userData.user && userData.user.token) {
        await AsyncStorage.setItem('userToken', userData.user.token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData.user));

        setIsAuthenticated(true);
        setUser(userData.user);
        // console.log('User logged in:', userData.user);
      } else {
        console.error('Invalid login response:', userData);
      }
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  };
  
  const logout = async () => {
    try {
      // Remove token and user data from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      await SecureStore.deleteItemAsync('token'); // Add this line

      // Clear state
      setToken(null);
      setUser(null);
      setIsAuthenticated(false); // Make sure this line is present

      console.log('User logged out successfully');
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  };
  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };


  const value = {
    user,
    token,
    // isLoading,
    login,
    logout,
    getToken,
    isAuthenticated,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};