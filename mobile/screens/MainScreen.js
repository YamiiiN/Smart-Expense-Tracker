import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Dashboard from "../screens/Dashboard"; // your current Dashboard.js
// import CameraScreen from "../screens/Camera"; // create placeholder screens
// import StatsScreen from "./StatsScreen";
import Profile from "../screens/Profile";
import styles from "../styles/commonStyles";

export default function MainScreen() {
  const [activeScreen, setActiveScreen] = useState("Home");

  const renderScreen = () => {
    switch (activeScreen) {
      case "Home":
        return <Dashboard />; 
    //   case "Camera":
    //     return <CameraScreen />;
    //   case "Stats":
    //     return <StatsScreen />;
      case "Profile":
        return <Profile />;
    //   default:
    //     return <Dashboard />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Dynamic Screen Content */}
      <View style={{ flex: 1 }}>{renderScreen()}</View>

      {/* Persistent Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setActiveScreen("Home")} style={styles.navButton}>
          <Ionicons name="home" size={24} color={activeScreen === "Home" ? "#2F3E46" : "#A8A8A8"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen("Camera")} style={styles.navButton}>
          <FontAwesome5 name="camera" size={22} color={activeScreen === "Camera" ? "#2F3E46" : "#A8A8A8"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen("Stats")} style={styles.navButton}>
          <MaterialIcons name="bar-chart" size={24} color={activeScreen === "Stats" ? "#2F3E46" : "#A8A8A8"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveScreen("Profile")} style={styles.navButton}>
          <FontAwesome5 name="user" size={22} color={activeScreen === "Profile" ? "#2F3E46" : "#A8A8A8"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
