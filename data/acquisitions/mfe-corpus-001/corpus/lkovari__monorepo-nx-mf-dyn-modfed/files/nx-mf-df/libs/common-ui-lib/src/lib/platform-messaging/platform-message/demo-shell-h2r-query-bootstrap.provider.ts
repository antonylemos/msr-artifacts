import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';

import { DemoShellH2rQueryRemoteHandlerService } from '../services/demo-shell-h2r-query-remote-handler.service';

export function provideDemoShellH2rQueryRemoteHandlerBootstrap() {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (_handler: DemoShellH2rQueryRemoteHandlerService) => () => undefined,
      deps: [DemoShellH2rQueryRemoteHandlerService],
    },
  ]);
}
