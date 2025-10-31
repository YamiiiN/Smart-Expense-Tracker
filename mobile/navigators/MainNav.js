import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardNav from "./DashboardNav";
import HomeNav from "./HomeNav";
import ProfileNav from "./ProfileNav";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeNav} />
      <Tab.Screen name="Dashboard" component={DashboardNav} />
      <Tab.Screen name="Profile" component={ProfileNav} />
    </Tab.Navigator>
  );
}

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useAuth } from "../services/auth";

// import HomeNav from "./HomeNav";
// import DashboardNav from "./DashboardNav";
// import ProfileNav from "./ProfileNav";
// import Login from "../screens/Login";
// import Register from "../screens/Register";

// const Stack = createNativeStackNavigator();

// export default function MainNavigator() {
//   const { token } = useAuth();

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {token ? (
//         <>
//           <Stack.Screen name="HomeNav" component={HomeNav} />
//           <Stack.Screen name="DashboardNav" component={DashboardNav} />
//           <Stack.Screen name="ProfileNav" component={ProfileNav} />
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Register" component={Register} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }
