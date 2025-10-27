import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import styles from "../styles/commonStyles";

export default function Dashboard() {
  const activities = [
    { icon: "cart-outline", label: "Shopping", amount: "-$600.00", color: "#FF6B6B" },
    { icon: "film-outline", label: "Movie", amount: "-$120.00", color: "#FFA500" },
    { icon: "swap-horizontal-outline", label: "Transfer", amount: "+$900.00", color: "#38B000" },
  ];

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
            <Text style={styles.userName}>Ky!</Text>
          </View>
          <Ionicons name="notifications-outline" size={28} color="#2F3E46" />
        </View>

        {/* Balance Summary */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Overall Balance</Text>
          <Text style={styles.balanceAmount}>$12,991.00</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Debit Card</Text>
            <Text style={styles.balanceLabel}>Cash</Text>
          </View>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceValue}>$8,351.00</Text>
            <Text style={styles.balanceValue}>$4,640.00</Text>
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
          <MaterialIcons name="bar-chart" size={24} color="#A8A8A8" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome5 name="user" size={22} color="#A8A8A8" />
        </TouchableOpacity>
      </View>
    </View>
  );
}