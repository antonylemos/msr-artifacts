import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from '@mygym/theme';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';

// Shell real do host: infraestrutura compartilhada que era do apps/mygym no
// Turborepo — SafeAreaProvider, um ÚNICO NavigationContainer e as Bottom Tabs.
// As abas carregam os mini-apps por federação (ver src/navigation/RootNavigator).
//
// TODO (polish): fontes Inter. No bare exige empacotar os .ttf e linkar via
// react-native.config.js (swap do expo-font, D3). Adiado — sem elas o texto
// cai no font do sistema (regressão visual, não quebra a federação).
function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
