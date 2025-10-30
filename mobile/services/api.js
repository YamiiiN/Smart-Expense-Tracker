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
export async function register(name, email, password, avatarUri = null) {
  try {
    let avatar_url = null;
    if (avatarUri) {
      avatar_url = await uploadAvatar(avatarUri);
    }

    const res = await API.post("/register", { name, email, password, avatar_url });
    return res.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}


// Login
export async function login(email, password) {
  try {
    const res = await API.post("/login", { email, password });

    // Store token securely
    await SecureStore.setItemAsync('token', res.data.access_token);

    // Set Axios header for future requests
    API.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;

    console.log("Token stored securely:", res.data.access_token);
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

app.listen(8000, () => console.log("Server running on port 8000"));