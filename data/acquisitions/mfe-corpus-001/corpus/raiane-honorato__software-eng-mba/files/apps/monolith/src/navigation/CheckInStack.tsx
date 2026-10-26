import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GymListScreen } from '../modules/check-in/screens/GymListScreen'
import { CheckInConfirmationScreen } from '../modules/check-in/screens/CheckInConfirmationScreen'

export type CheckInStackParamList = {
  GymList: undefined
  CheckInConfirmation: { gymId: string }
}

const Stack = createNativeStackNavigator<CheckInStackParamList>()

export function CheckInStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GymList" component={GymListScreen} />
      <Stack.Screen name="CheckInConfirmation" component={CheckInConfirmationScreen} />
    </Stack.Navigator>
  )
}
