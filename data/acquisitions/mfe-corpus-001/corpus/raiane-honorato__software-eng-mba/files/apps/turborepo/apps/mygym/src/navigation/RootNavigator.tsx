import { CheckInStack } from "@mygym/feature-check-in";
import { DashboardStack } from "@mygym/feature-dashboard";
import { RootTabParamList } from "@mygym/navigation";
import { colors } from "@mygym/theme";
import { AppText } from "@mygym/ui";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HouseIcon, MagnifyingGlassIcon } from "phosphor-react-native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { height: 64 + insets.bottom, paddingBottom: insets.bottom + 8 },
        ],
        tabBarActiveTintColor: colors.onSurface,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarIcon: ({ focused }) => {
          const Icon = route.name === "Home" ? HouseIcon : MagnifyingGlassIcon;
          return (
            <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
              <Icon
                size={20}
                weight={focused ? "fill" : "regular"}
                color={colors.onSurface}
              />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => (
          <AppText
            variant="caption"
            style={focused ? styles.tabLabelActive : styles.tabLabel}
          >
            {route.name === "Home" ? "Início" : "Academias"}
          </AppText>
        ),
      })}
    >
      <Tab.Screen name="Home" component={DashboardStack} />
      <Tab.Screen name="FindGyms" component={CheckInStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 8,
  },
  tabIcon: {
    width: 40,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIconActive: {
    backgroundColor: colors.tertiaryFixed,
  },
  tabLabel: {
    color: colors.onSurfaceVariant,
  },
  tabLabelActive: {
    color: colors.onSurface,
  },
});
