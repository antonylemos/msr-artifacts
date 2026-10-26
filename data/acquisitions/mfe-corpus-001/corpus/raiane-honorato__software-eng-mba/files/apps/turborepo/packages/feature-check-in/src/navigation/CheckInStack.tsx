import { CheckInStackParamList } from "@mygym/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CheckInConfirmationScreen } from "../screens/CheckInConfirmationScreen";
import { GymListScreen } from "../screens/GymListScreen";

const Stack = createNativeStackNavigator<CheckInStackParamList>();

export function CheckInStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GymList" component={GymListScreen} />
      <Stack.Screen
        name="CheckInConfirmation"
        component={CheckInConfirmationScreen}
      />
    </Stack.Navigator>
  );
}
