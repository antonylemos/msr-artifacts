// mount.ts — Called by the host app to render this Angular MFE.
//
// How it works:
//   1. The host calls mount(containerElement)
//   2. We create an <app-root> element and append it to the container
//   3. Angular bootstraps AppModule and finds the <app-root> in the document
//   4. AppComponent is rendered into <app-root>
//
// Note: zone.js MUST be the very first import so it patches browser globals before
// Angular's NgZone constructor runs (NG0908 otherwise).
// In Module Federation, shared/lazy chunk loading can create a race condition where
// Angular core initialises before the polyfills chunk executes zone.js.
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

let bootstrapped = false;

const mount = (element: HTMLElement): void => {
  // Place <app-root> inside the container provided by the host
  const appRoot = document.createElement('app-root');
  element.appendChild(appRoot);

  // Bootstrap Angular only once — zone.js cannot be re-initialised
  if (!bootstrapped) {
    bootstrapped = true;
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error('[Angular MFE] Bootstrap error:', err));
  }
};

export default mount;
