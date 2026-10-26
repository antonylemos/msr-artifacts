export const mfConfig = {
  name: 'shell',
  filename: 'remoteEntry.js',
  remotes: {
    authMf: 'http://localhost:3001/dist/assets/remoteEntry.js',
    dashboardMf: 'http://localhost:3002/dist/assets/remoteEntry.js',
    adminMf: 'http://localhost:3003/dist/assets/remoteEntry.js',
    messagingMf: 'http://localhost:3004/dist/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
};
