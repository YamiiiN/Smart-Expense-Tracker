import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Stats from '../screens/Stats'
const Stack = createNativeStackNavigator();

export default function StatsNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StatsScreen" component={Stats} />
    </Stack.Navigator>
  )
}
