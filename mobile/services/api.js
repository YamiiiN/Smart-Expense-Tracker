import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const API = axios.create({
  baseURL: "http://192.168.0.103:8000" 
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

// Upload avatar
// export async function uploadAvatar(uri, filename = 'avatar.jpg') {
//   try {
//     const form = new FormData();
//     form.append("file", {
//       uri,
//       name: filename,
//       type: "image/jpeg"
//     });

//     const res = await API.post("/upload-avatar", form, {
//       headers: { "Content-Type": "multipart/form-data" }
//     });

//     return res.data.url; // Cloudinary URL
//   } catch (error) {
//     console.error("Error uploading avatar:", error);
//     throw error;
//   }
// }

// Register
