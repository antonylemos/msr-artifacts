import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';

import { PlatformMessageListenerService } from '../services/platform-message-listener.service';

export function providePlatformMessageListenerBootstrap() {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (_listener: PlatformMessageListenerService) => () => undefined,
      deps: [PlatformMessageListenerService],
    },
  ]);
}
