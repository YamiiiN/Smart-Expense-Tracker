import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { API } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../services/auth";
import profileStyles from "../styles/profileStyles";

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState({ name: "", email: "", avatar_url: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { logout } = useAuth();

  const fetchProfile = async () => {
    try {
      setIsFetching(true);
      const token = await SecureStore.getItemAsync("token");
      if (!token) throw new Error("No auth token");

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

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "Please grant camera roll permissions to change your avatar.");
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

      if (user.avatar_url && user.avatar_url.startsWith("file")) {
        formData.append("avatar", {
          uri: user.avatar_url,
          type: "image/jpeg",
          name: "avatar.jpg",
        });
      }

      const response = await API.put("/user/me/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setUser(response.data.user);
        setIsEditing(false);
        Alert.alert("Success", "Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", error.response?.data?.detail || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await logout();
            navigation.replace("Start");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  if (isFetching) {
    return (
      <View style={profileStyles.loaderContainer}>
        <ActivityIndicator size="large" color="#2FAF7B" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={profileStyles.scrollContainer}>
      <View style={profileStyles.container}>
        <Text style={profileStyles.title}>My Profile</Text>

        {/* Avatar */}
        <TouchableOpacity onPress={isEditing ? pickImage : null} style={profileStyles.avatarContainer}>
          <Image
            source={user.avatar_url ? { uri: user.avatar_url } : require("../assets/default-avatar.png")}
            style={profileStyles.avatar}
          />
          {isEditing && <Text style={profileStyles.changePhotoText}>Change Photo</Text>}
        </TouchableOpacity>

        {/* Profile Form */}
        <View style={profileStyles.card}>
          <Text style={profileStyles.label}>Full Name</Text>
          <TextInput
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
            editable={isEditing}
            style={[profileStyles.input, !isEditing && profileStyles.readOnlyInput]}
          />

          <Text style={profileStyles.label}>Email Address</Text>
          <TextInput
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
            editable={isEditing}
            style={[profileStyles.input, !isEditing && profileStyles.readOnlyInput]}
          />
        </View>

        {/* Buttons */}
        <View style={profileStyles.buttonRow}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[profileStyles.button, profileStyles.saveButton]}
                onPress={handleSave}
                disabled={loading}
              >
                <Text style={profileStyles.buttonText}>{loading ? "Saving..." : "Save Changes"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[profileStyles.button, profileStyles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={profileStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[profileStyles.button, profileStyles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={profileStyles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
          <Text style={profileStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
