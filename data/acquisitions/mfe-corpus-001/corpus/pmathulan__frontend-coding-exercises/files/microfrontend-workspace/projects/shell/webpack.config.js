const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'shell',

  exposes: {
    './Component': './projects/shell/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  remotes: {
    mfe1: "mfe1@http://localhost:4201/remoteEntry.js",
  }  

});
