import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '@mygym/theme';
import ErrorBoundary from '../ErrorBoundary';

// Carrega o DashboardStack do mini-app REMOTO em runtime, pela rede.
// (mesmo padrão do CheckInTab — ver comentários lá)
const DashboardStack = React.lazy(() =>
  import('dashboard/DashboardStack').then((m) => ({ default: m.DashboardStack })),
);

export function DashboardTab() {
  return (
    <ErrorBoundary name="dashboard/DashboardStack">
      <React.Suspense fallback={<TabLoading />}>
        <DashboardStack />
      </React.Suspense>
    </ErrorBoundary>
  );
}

function TabLoading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
});
