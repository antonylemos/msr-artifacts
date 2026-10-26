import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useCheckInStore } from '../store/checkInStore'
import { DashboardEmptyScreen } from '../modules/dashboard/screens/DashboardEmptyScreen'
import { DashboardActiveScreen } from '../modules/dashboard/screens/DashboardActiveScreen'
import { WorkoutFinishScreen } from '../modules/dashboard/screens/WorkoutFinishScreen'
import { DashboardPostWorkoutScreen } from '../modules/dashboard/screens/DashboardPostWorkoutScreen'

export type DashboardStackParamList = {
  DashboardHome: undefined
  WorkoutFinish: undefined
}

const Stack = createNativeStackNavigator<DashboardStackParamList>()

function DashboardHomeScreen() {
  const isActive = useCheckInStore((s) => s.isActive)
  const canCheckIn = useCheckInStore((s) => s.canCheckInToday())

  if (isActive) return <DashboardActiveScreen />
  if (!canCheckIn) return <DashboardPostWorkoutScreen />
  return <DashboardEmptyScreen />
}

export function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={DashboardHomeScreen} />
      <Stack.Screen name="WorkoutFinish" component={WorkoutFinishScreen} />
    </Stack.Navigator>
  )
}
