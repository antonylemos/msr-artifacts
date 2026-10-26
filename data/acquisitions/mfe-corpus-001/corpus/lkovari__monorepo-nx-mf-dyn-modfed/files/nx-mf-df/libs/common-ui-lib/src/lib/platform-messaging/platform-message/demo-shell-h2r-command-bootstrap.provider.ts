import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';

import { DemoShellH2rCommandRemoteHandlerService } from '../services/demo-shell-h2r-command-remote-handler.service';

export function provideDemoShellH2rCommandRemoteHandlerBootstrap() {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (_handler: DemoShellH2rCommandRemoteHandlerService) => () =>
        undefined,
      deps: [DemoShellH2rCommandRemoteHandlerService],
    },
  ]);
}
