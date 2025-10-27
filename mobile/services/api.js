import axios from 'axios';
export const API = axios.create({
  baseURL: "http://10.123.224.172" 
});

import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('token', token);
const token = await SecureStore.getItemAsync('token');
if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;


// Upload avatar
async function uploadAvatar(uri, filename) {
  const form = new FormData();
  form.append("file", {
    uri,
    name: filename || "avatar.jpg",
    type: "image/jpeg"
  });
  const res = await API.post("/upload-avatar", form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data.url; // cloudinary url
}

// Register
async function register(name, email, password, avatarUri) {
  let avatar_url = null;
  if (avatarUri) {
    avatar_url = await uploadAvatar(avatarUri, "avatar.jpg");
  }
  const res = await API.post("/register", { name, email, password, avatar_url });
  return res.data;
}

// Login
async function login(email, password) {
  const res = await API.post("/login", { email, password });
  await SecureStore.setItemAsync('token', res.data.access_token);
  console.log("Token stored securely: ", res.data.access_token);
}

app.listen(8000, () => console.log("Server running on port 8000"));