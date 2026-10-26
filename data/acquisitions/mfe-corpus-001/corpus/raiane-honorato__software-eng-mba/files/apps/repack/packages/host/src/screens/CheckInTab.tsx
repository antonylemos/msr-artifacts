import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '@mygym/theme';
import ErrorBoundary from '../ErrorBoundary';

// Carrega o CheckInStack do mini-app REMOTO em runtime, pela rede.
// O import 'checkin/CheckInStack' é resolvido pelo Module Federation (host
// baixa o container do check-in). Mapeamos o export nomeado para `default`
// porque React.lazy resolve `module.default` — mantendo o Stack com export
// nomeado (idêntico ao Turborepo, código de domínio inalterado).
const CheckInStack = React.lazy(() =>
  import('checkin/CheckInStack').then((m) => ({ default: m.CheckInStack })),
);

// Embalagem obrigatória de tudo remoto: Suspense (enquanto baixa) +
// ErrorBoundary (se o remote estiver fora do ar → erro só nesta aba).
export function CheckInTab() {
  return (
    <ErrorBoundary name="checkin/CheckInStack">
      <React.Suspense fallback={<TabLoading />}>
        <CheckInStack />
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
