import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppRemoteComponent } from './app/app.component';

bootstrapApplication(AppRemoteComponent, appConfig)
  .catch((err) => console.error(err));
