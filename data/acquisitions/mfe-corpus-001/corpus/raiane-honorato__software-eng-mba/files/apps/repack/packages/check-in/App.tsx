import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CheckInStack } from './src/navigation/CheckInStack';

// Entry STANDALONE do mini-app check-in — usado só quando ele roda sozinho
// (fora do host). O NavigationContainer fica AQUI, fora do módulo exposto:
// quando o host carrega o CheckInStack via federação, quem fornece o container
// é o host (regra de ouro — um único NavigationContainer, no host).
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <CheckInStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
