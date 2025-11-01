import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import styles from '../styles/commonStyles';
import { API } from '../services/api';
export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      // Input validation
      if (!name || !email || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      // Register the user
      const registerResponse = await API.post("/user/register", {
        name,
        email,
        password,
      });

      console.log("Registration successful:", registerResponse.data);

      // Show success message and navigate to Login
      Alert.alert(
        "Success",
        "Account created successfully! Please login.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login")
          }
        ]
      );

    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error details:", err.response?.data);

      Alert.alert(
        "Error",
        err.response?.data?.detail || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
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
        <View style={styles.decoGradientTop} pointerEvents="none" />
        <View style={styles.decoGradientBottom} pointerEvents="none" />

        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image source={require('../assets/SEP_logo.png')} style={styles.logoImage} />
            </View>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Create your account to start tracking expenses</Text>
            <Text style={styles.tagline}>Log transactions • Track budgets • See insights</Text>
          </View>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

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
            <TouchableOpacity style={styles.buttonAlt} onPress={handleRegister} activeOpacity={0.85}>
              <Text style={styles.buttonTextAlt}>Register</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Already have an account? Login
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}