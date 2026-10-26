module.exports = {
  commands: require('@callstack/repack/commands/rspack'),
  // Fontes Inter empacotadas no binário do host (swap do expo-font, D3).
  // `npx react-native-asset` linka os .ttf ao projeto nativo (Info.plist / assets).
  assets: ['./assets/fonts'],
};