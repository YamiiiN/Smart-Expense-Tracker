import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const API = axios.create({
  baseURL: "http://10.182.96.172:8000" 
});

export async function setTokenHeader() {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error reading token from SecureStore:", error);
  }
}

setTokenHeader();