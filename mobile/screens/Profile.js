import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { API, useAuth } from "../services/auth";


export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout, getCurrentUser } = useAuth();

  // Fetch current user info
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
  try {
    const data = await getCurrentUser();
    setUser({
      name: data.name,
      email: data.email,
      avatar: data.avatar || data.avatar_url || "",
    });
  } catch (error) {
    console.log("Error fetching user:", error);
  }
};


  // const fetchUser = async () => {
  //   try {
  //     const token = await SecureStore.getItemAsync("token");
  //     if (!token) return;

  //     API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     const data = await getCurrentUser();

  //     setUser({
  //       name: data.name,
  //       email: data.email,
  //       avatar: data.avatar || data.avatar_url || "",
  //     });
  //   } catch (error) {
  //     console.log("Error fetching user:", error);
  //   }
  // };

  // Choose new avatar
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, avatar: result.assets[0].uri });
    }
  };

  // Update profile
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("token");
      if (!token) return;

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);

      if (user.avatar && user.avatar.startsWith("file:")) {
        formData.append("avatar", {
          uri: user.avatar,
          name: "avatar.jpg",
          type: "image/jpeg",
        });
      }

      const res = await API.put("/me/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.data.success) {
        const updatedUser = res.data.user || res.data; // support both response styles

        // Update the local state with the new avatar URL and info
        setUser({
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar_url || updatedUser.avatar || user.avatar,
        });

        Alert.alert("Profile Updated", "Your profile has been successfully updated!");
        setIsEditing(false);
      } else {
        Alert.alert("Error", res.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      Alert.alert("Error", "Something went wrong while saving profile.");
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


  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileTitle}>My Profile</Text>

      {/* Avatar */}
      <TouchableOpacity onPress={isEditing ? pickImage : null}>
        <Image
          source={
            user.avatar
              ? { uri: user.avatar }
              : require("../assets/default-avatar.png")
          }
          style={styles.profileAvatar}
        />
        {isEditing && <Text style={styles.changePhotoText}>Change Photo</Text>}
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
