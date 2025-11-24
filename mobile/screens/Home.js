import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/commonStyles";
import * as SecureStore from "expo-secure-store";
import { API } from "../services/api";
import { useAuth } from "../services/auth";
import { useFocusEffect } from "@react-navigation/native";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [monthLabel, setMonthLabel] = useState("");
  const [recentUploads, setRecentUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getCurrentUser } = useAuth();

  const fetchUserAndHome = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      // Fetch user
      try {
        const user = await getCurrentUser();
        setUserName(user?.name || "");
      } catch (err) {
        console.warn("Failed to fetch user:", err);
      }

      // Fetch home data
      const res = await API.get("/home/data");
      if (res.data && res.data.success) {
        const d = res.data.data;
        setMonthlyTotal(d.monthly_total ?? 0);
        setMonthLabel(d.month_label ?? "");
        setRecentUploads(d.uploads ?? []);
      }
    } catch (err) {
      console.error("Error fetching home data:", err);
    } finally {
      setLoading(false);
    }
  };

  // 👇 This runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchUserAndHome();
    }, [])
  );

  return (
    <View style={styles.dashboardContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greetingText}>Welcome back,</Text>
            <Text style={styles.userName}>{userName ? `${userName} !` : "..."}</Text>
          </View>
          <Ionicons name="notifications-outline" size={28} color="#2F3E46" />
        </View>

        {/* Balance Summary */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Overall Expenses</Text>
            <Text style={styles.balanceLabel}>Month</Text>
          </View>
          <View style={styles.balanceRow}>
            {loading ? (
              <ActivityIndicator color="#2FAF7B" />
            ) : (
              <Text style={styles.balanceValue}>₱{Number(monthlyTotal).toLocaleString()}</Text>
            )}
            <Text style={styles.balanceValue}>{monthLabel || ""}</Text>
          </View>
        </View>

        {/* Recent Uploads */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Uploads</Text>
          {loading ? (
            <ActivityIndicator />
          ) : recentUploads.length === 0 ? (
            <Text style={styles.mutedText}>No receipts yet</Text>
          ) : (
            recentUploads.map((item, index) => (
              <View key={item.id || index} style={styles.activityItem}>
                <View style={styles.activityLeft}>
                  {item.image_url ? (
                    <Image
                      source={{ uri: item.image_url }}
                      style={{ width: 40, height: 40, borderRadius: 6, marginRight: 10 }}
                    />
                  ) : (
                    <Ionicons
                      name="document-text-outline"
                      size={28}
                      color="#6B7A78"
                      style={{ marginRight: 10 }}
                    />
                  )}
                  <View>
                    <Text style={styles.activityLabel}>{item.name || "Receipt"}</Text>
                    <Text style={styles.activitySubLabel}>
                      {item.category || "Uncategorized"} •{" "}
                      {item.date ? new Date(item.date).toLocaleDateString() : ""}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.activityAmount,
                    { color: item.total ? "#FF6B6B" : "#FFA500" },
                  ]}
                >
                  {item.total ? `-₱${Number(item.total).toFixed(2)}` : "Pending"}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
