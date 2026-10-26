import { DashboardStackParamList } from "@mygym/navigation";
import { useCheckInStore } from "@mygym/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardActiveScreen } from "../screens/DashboardActiveScreen";
import { DashboardEmptyScreen } from "../screens/DashboardEmptyScreen";
import { DashboardPostWorkoutScreen } from "../screens/DashboardPostWorkoutScreen";
import { WorkoutFinishScreen } from "../screens/WorkoutFinishScreen";

const Stack = createNativeStackNavigator<DashboardStackParamList>();

function DashboardHomeScreen() {
  const isActive = useCheckInStore((s) => s.isActive);
  const canCheckIn = useCheckInStore((s) => s.canCheckInToday());

  if (isActive) return <DashboardActiveScreen />;
  if (!canCheckIn) return <DashboardPostWorkoutScreen />;
  return <DashboardEmptyScreen />;
}

export function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={DashboardHomeScreen} />
      <Stack.Screen name="WorkoutFinish" component={WorkoutFinishScreen} />
    </Stack.Navigator>
  );
}
