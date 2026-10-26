import { Text, View } from 'react-native';

export function HelloScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Hello from Remote!</Text>
    </View>
  );
}

export default HelloScreen;
