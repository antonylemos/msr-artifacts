export var mfConfig = {
    name: 'messagingMf',
    filename: 'remoteEntry.js',
    exposes: {
        './App': './src/exposes.tsx',
    },
    shared: ['react', 'react-dom', 'react-router-dom'],
};
