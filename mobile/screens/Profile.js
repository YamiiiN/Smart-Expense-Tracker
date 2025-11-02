import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { API, getCurrentUser } from "../services/api";
import styles from "../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../services/auth";


export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { logout } = useAuth();


  const fetchProfile = async () => {
    try {
      setIsFetching(true);
      const token = await SecureStore.getItemAsync("token");
      if (!token) {
        throw new Error("No auth token");
      }

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/user/me");

      setUser({
        name: response.data.name,
        email: response.data.email,
        avatar_url: response.data.avatar_url || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      Alert.alert("Error", "Failed to load profile");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  // Choose new avatar
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to change your avatar.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setUser({ ...user, avatar_url: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);

      // Only append avatar if it's a new local file
      if (user.avatar_url && user.avatar_url.startsWith('file')) {
        formData.append("avatar", {
          uri: user.avatar_url,
          type: 'image/jpeg',
          name: 'avatar.jpg'
        });
      }

      const response = await API.put("/user/me/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setUser(response.data.user);
        setIsEditing(false);
        Alert.alert("Success", "Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert(
        "Error",
        error.response?.data?.detail || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await logout();
              navigation.replace('Start');
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          }
        }
      ]
    );
  };

  if (isFetching) {
    return (
      <View style={[styles.profileContainer, styles.centered]}>
        <ActivityIndicator size="large" color="#2FAF7B" />
      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileTitle}>My Profile</Text>

    
      {/* Avatar */}
      <TouchableOpacity onPress={isEditing ? pickImage : null}>
        <Image
          source={
            user.avatar_url
              ? { uri: user.avatar_url }
              : require("../assets/default-avatar.png")
          }
          style={styles.profileAvatar}
        />
        {isEditing && (
          <Text style={styles.changePhotoText}>Change Photo</Text>
        )}
      </TouchableOpacity>

      {/* Editable Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
          editable={isEditing}
          style={[styles.input, !isEditing && styles.readOnlyInput]}
        />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          editable={isEditing}
          style={[styles.input, !isEditing && styles.readOnlyInput]}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? "Saving..." : "Save"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
