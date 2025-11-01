import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import MainNavigator from './navigators/MainNav';
import { AuthProvider } from './services/auth';
import { useAuth } from './services/auth';
import Start from './screens/Start';

const Stack = createNativeStackNavigator();
// function AppWrapper() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Start">
//         {isAuthenticated ? (
//           <Stack.Screen
//             name="MainNavigator"
//             component={MainNavigator}
//             options={{ headerShown: false }}
//           />
//         ) : (
//           <>
//             <Stack.Screen
//               name="Start"
//               component={Start}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Login"rs
//               component={Login}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="Register"
//               component={Register}
//               options={{ headerShown: false }}
//             />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
function AppWrapper() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainNavigator" component={MainNavigator} />
        ) : (
          <>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
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