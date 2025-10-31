import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
// import Dashboard from './screens/Dashboard';
// import MainScreen from './screens/MainScreen';
// import Profile from './screens/Profile';
import MainNavigator from './navigators/MainNav';
import { AuthProvider } from './services/auth';
import { useAuth } from './services/auth';
import HomeNav from './navigators/HomeNav';

const Stack = createNativeStackNavigator();
function AppWrapper() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {isAuthenticated ? (
          <Stack.Screen
            name="MainNavigator"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}

// import { NavigationContainer } from "@react-navigation/native";
// import { AuthProvider } from "./services/auth";
// import MainNavigator from "./navigators/MainNav";

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <MainNavigator />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }
