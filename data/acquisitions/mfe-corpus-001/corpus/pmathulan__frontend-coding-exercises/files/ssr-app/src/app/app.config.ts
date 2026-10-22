import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  /**
   * Enable client-side hydration to make the server-rendered DOM interactive.
   * This ensures a smooth transition from the static HTML to the dynamic Angular application.
   */
  provideClientHydration(withEventReplay())]
};
