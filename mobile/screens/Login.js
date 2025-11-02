import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import styles from '../styles/commonStyles';
// import { useAuth } from '../services/auth';
import { API } from '../services/api';
import { useAuth } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const handleLogin = async () => {
    try {
      // 1️⃣ Call FastAPI login
      const res = await API.post("/user/login", { email, password });
      const token = res.data.access_token;

      // 2️⃣ Store token in SecureStore
      await SecureStore.setItemAsync("token", token);

      // 3️⃣ Set token in axios header for future requests
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 4️⃣ Fetch current user
      const userRes = await API.get("/user/me");
      const userData = userRes.data;

      // 5️⃣ Save user data in AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // 6️⃣ Update Auth Context
      login({ user: { ...userData, token } });

      Alert.alert("Success", "Logged in successfully!");
      // navigation.navigate('MainNavigator');

    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <LinearGradient
      colors={['#175C3A', '#2FAF7B']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        {/* decorative background shapes */}
        <View style={styles.decoGradientTop} pointerEvents="none" />
        <View style={styles.decoGradientBottom} pointerEvents="none" />

        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image source={require('../assets/SEP_logo.png')} style={styles.logoImage} />
            </View>
            <Text style={styles.title}>Smart Expense Tracker</Text>
            <Text style={styles.subtitle}>Sign in to manage your expenses</Text>
            <Text style={styles.tagline}>Track spending • Set budgets • Save smarter</Text>
          </View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.buttonGradient}>
            <TouchableOpacity style={styles.buttonAlt} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.buttonTextAlt}>Log In</Text>
            </TouchableOpacity>
          </View>



          <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
            Don't have an account? Register here
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}