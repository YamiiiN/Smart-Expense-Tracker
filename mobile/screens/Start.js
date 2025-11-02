import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  Dimensions,
  Platform,
  Easing,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/commonStyles";


const { width } = Dimensions.get("window");

export default function Start({ navigation }) {
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  const images = [
    require("../assets/sep2.png"),
    require("../assets/sep1.png"),
    require("../assets/sep3.png"),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const nextIndex = (currentIndex + 1) % images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(slideAnim, {
          toValue: -width * 0.1,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start(() => {
        setCurrentIndex(nextIndex);

        fadeAnim.setValue(0);
        slideAnim.setValue(width * 0.1);

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ]).start();
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={[styles.homeSafe, { paddingTop: statusBarHeight }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6FAEE" />
      <LinearGradient
        colors={["#E6FAEE", "#F6FFF8"]}
        style={styles.homeGradient}
      >
        {/* Carousel container */}
        <View
          style={{
            width,
            height: 300,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Animated.Image
            key={currentIndex}
            source={images[currentIndex]}
            style={{
              width: width * 1,
              height: 290,
              resizeMode: "contain",
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
              renderToHardwareTextureAndroid: true,
              shouldRasterizeIOS: true,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 90,
          }}
        >
          {images.map((_, i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginHorizontal: 5,
                backgroundColor: i === currentIndex ? "#2ecc71" : "#cfd8dc",
              }}
            />
          ))}
        </View>

        <Text style={styles.homeTitle}>Helps you to track your expenses.</Text>
        <Text style={styles.homeSubtitle}>
          Stay on top of your spending, budget smartly, and reach your financial
          goals.
        </Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.homeButtonText}>Let’s Start!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeLinkWrapper}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.homeLinkText}>
            Already have an account?{" "}
            <Text style={styles.homeLinkHighlight}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}