import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfe1',
  exposes: {
    './Routes': 'appshell/mfe1/src/app/remote-entry/entry.routes.ts',
    './GreetingComponent':
      'appshell/mfe1/src/app/greeting/greeting.component.ts',
  },
};

export default config;
