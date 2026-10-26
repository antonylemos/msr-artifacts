import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideBus, provideHostBridge } from '@lkovari/microfrontend-platform-communication/angular';
import { MessageService } from 'primeng/api';
import {
  createPlatformMessagingTopicRegistry,
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
  PLATFORM_BRIDGE_ACCESS_TOKEN,
  platformMessagingValidators,
  PLATFORM_PARTICIPANT_ID,
  provideDemoShellH2rCommandRemoteHandlerBootstrap,
  provideDemoShellH2rQueryRemoteHandlerBootstrap,
  providePlatformMessageListenerBootstrap,
  provideWorkspacePrimeNG,
  SHELL_HOST_ID,
} from '@nx-mf-df/common-ui-lib';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    provideBus({
      appId: SHELL_HOST_ID,
      defaultSubscriberId: SHELL_HOST_ID,
      dispatch: 'microtask',
      validators: platformMessagingValidators,
      dedupe: {
        enabled: true,
        windowMs: 5000,
      },
      registry: createPlatformMessagingTopicRegistry(),
      allowUnregisteredMessageNames: false,
    }),
    provideHostBridge({
      remotes: [MF_REMOTE_A_ID, MF_REMOTE_B_ID, MF_REMOTE_C_ID],
      onConflict: 'return-existing',
      accessToken: PLATFORM_BRIDGE_ACCESS_TOKEN,
    }),
    provideWorkspacePrimeNG(),
    MessageService,
    { provide: PLATFORM_PARTICIPANT_ID, useValue: SHELL_HOST_ID },
    providePlatformMessageListenerBootstrap(),
    provideDemoShellH2rQueryRemoteHandlerBootstrap(),
    provideDemoShellH2rCommandRemoteHandlerBootstrap(),
  ],
};
