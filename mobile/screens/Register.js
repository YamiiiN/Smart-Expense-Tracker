import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import styles from '../styles/commonStyles';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://192.168.0.103:8000/register', { name, email, password });
      Alert.alert('Success', 'Account created!');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Error', err.response?.data?.detail || 'Registration failed');
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