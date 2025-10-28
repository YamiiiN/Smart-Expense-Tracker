import React, { useState, useEffect } from "react"; 
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles/commonStyles";
import * as SecureStore from "expo-secure-store";
import { API, getCurrentUser } from "../services/api";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const activities = [
    { icon: "cart-outline", label: "Shopping", amount: "-₱600.00", color: "#FF6B6B" },
    { icon: "film-outline", label: "Movie", amount: "-₱120.00", color: "#FFA500" },
    { icon: "swap-horizontal-outline", label: "Transfer", amount: "+₱900.00", color: "#38B000" },
  ];
//change code logic later

   useEffect(() => {
  async function fetchUser() {
    try {
      // Check if token exists
      const token = await SecureStore.getItemAsync('token');
      console.log("Token from SecureStore:", token);

      if (!token) {
        console.log("No token found, skipping fetchUser.");
        return; // don't call /me if no token
      }

      // Set Axios header
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("Authorization header set:", API.defaults.headers.common['Authorization']);

      // Fetch user from backend
      const user = await getCurrentUser();
      console.log("Fetched user from API:", user);

      // Update state
      setUserName(user.name);
      console.log("State updated, userName:", user.name);
    } catch (err) {
      console.error("Error in fetchUser:", err);
    }
  }

  fetchUser();
}, []);

  return (
    <View style={styles.dashboardContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greetingText}>Welcome back,</Text>
            <Text style={styles.userName}>{userName ? `${userName} !` : "..."}</Text>
            {/* <Text style={styles.userName}>Ky!</Text> */}
          </View>
          <Ionicons name="notifications-outline" size={28} color="#2F3E46" />
        </View>

        {/* Balance Summary */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Overall Balance</Text>
          <Text style={styles.balanceAmount}>₱12,991.00</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Debit Card</Text>
            <Text style={styles.balanceLabel}>Cash</Text>
          </View>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceValue}>₱8,351.00</Text>
            <Text style={styles.balanceValue}>₱4,640.00</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {activities.map((item, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityLeft}>
                <Ionicons name={item.icon} size={24} color={item.color} />
                <Text style={styles.activityLabel}>{item.label}</Text>
              </View>
              <Text style={[styles.activityAmount, { color: item.color }]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color="#2F3E46" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome5 name="camera" size={22} color="#A8A8A8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="bar-chart" size={24} color="#A8A8A8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome5 name="user" size={22} color="#A8A8A8" />
        </TouchableOpacity>
      </View>
    </View>
  );
}