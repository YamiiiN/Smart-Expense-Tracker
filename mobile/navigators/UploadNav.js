import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Upload from '../screens/Upload'
const Stack = createNativeStackNavigator();

export default function UploadNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UploadScreen" component={Upload} />     
    </Stack.Navigator>
  )
}
