import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNav from "./HomeNav";
import ProfileNav from "./ProfileNav";
import StatsNav from "./StatsNav";
import UploadNav from "./UploadNav";
import StartNav from "./StartNav";
const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeNav} />
      <Tab.Screen name="Upload" component={UploadNav} /> 
      <Tab.Screen name="Stats" component={StatsNav} /> 
      <Tab.Screen name="Profile" component={ProfileNav} />
    </Tab.Navigator>
  );
}

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        let iconName;
        switch (route.name) {
          case "Home":
            iconName = "home";
            break;
          case "Upload":
            iconName = "camera";
            break;
          case "Stats":
            iconName = "bar-chart";
            break;
          case "Profile":
            iconName = "user";
            break;
          default:
            iconName = "circle";
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Choose icon component based on route
        const IconComponent =
          route.name === "Camera" || route.name === "Profile"
            ? FontAwesome5
            : route.name === "Stats"
            ? MaterialIcons
            : Ionicons;

        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.navButton}
          >
            <IconComponent
              name={iconName}
              size={24}
              color={isFocused ? "#2F3E46" : "#A8A8A8"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
