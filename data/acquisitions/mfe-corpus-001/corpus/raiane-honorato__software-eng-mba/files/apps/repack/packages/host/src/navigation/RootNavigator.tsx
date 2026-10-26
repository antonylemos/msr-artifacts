import { RootTabParamList } from '@mygym/navigation';
import { colors } from '@mygym/theme';
import { AppText } from '@mygym/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HouseIcon, MagnifyingGlassIcon } from 'phosphor-react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckInTab } from '../screens/CheckInTab';
import { DashboardTab } from '../screens/DashboardTab';

const Tab = createBottomTabNavigator<RootTabParamList>();

// Espelho do RootNavigator do Turborepo. Única diferença: as abas apontam para
// os wrappers (CheckInTab/DashboardTab) que fazem lazy import dos remotes —
// no Turborepo apontavam direto para os stacks recebidos por props (build-time).
// Do ponto de vista da navegação, um mini-app federado é "só mais uma aba".
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
          const Icon = route.name === 'Home' ? HouseIcon : MagnifyingGlassIcon;
          return (
            <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
              <Icon
                size={20}
                weight={focused ? 'fill' : 'regular'}
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
            {route.name === 'Home' ? 'Início' : 'Academias'}
          </AppText>
        ),
      })}
    >
      <Tab.Screen name="Home" component={DashboardTab} />
      <Tab.Screen name="FindGyms" component={CheckInTab} />
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
    alignItems: 'center',
    justifyContent: 'center',
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
