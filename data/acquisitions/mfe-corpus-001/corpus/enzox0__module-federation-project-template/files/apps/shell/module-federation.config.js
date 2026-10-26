export var mfConfig = {
    name: 'shell',
    filename: 'remoteEntry.js',
    remotes: {
        authMf: 'http://localhost:3004/assets/remoteEntry.js',
        dashboardMf: 'http://localhost:3005/assets/remoteEntry.js',
        adminMf: 'http://localhost:3006/assets/remoteEntry.js',
        messagingMf: 'http://localhost:3007/assets/remoteEntry.js',
    },
    shared: ['react', 'react-dom', 'react-router-dom'],
};
