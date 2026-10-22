import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { cartReducer } from './features/cart/store/cart.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WINDOW, windowProvider } from './core/providers/window-service';
import { DOCUMENT } from '@angular/common';
import { provideToastr } from 'ngx-toastr';
import { CartEffects } from './features/cart/store/cart.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideStore({ cart: cartReducer }),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  provideAnimationsAsync(),
  provideToastr(),
  {
    provide: WINDOW,
    useFactory: (document: Document) => windowProvider(document),
    deps: [DOCUMENT],
  },
  provideEffects(CartEffects)]
};
