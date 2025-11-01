import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Start from "../screens/Start";

const Stack = createNativeStackNavigator();

export default function ProfileNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={Profile} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Start" component={Start} />
        </Stack.Navigator>
    );
}
