const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'seedMfeRemote',

  exposes: {
    './RemoteWidget': './projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
