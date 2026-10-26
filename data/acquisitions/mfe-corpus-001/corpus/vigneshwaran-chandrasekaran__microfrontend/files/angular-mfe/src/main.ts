// main.ts — Standalone entry point.
// Used when visiting http://localhost:4200 directly (not via the host).
// When loaded via the host, mount.ts is used instead.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
