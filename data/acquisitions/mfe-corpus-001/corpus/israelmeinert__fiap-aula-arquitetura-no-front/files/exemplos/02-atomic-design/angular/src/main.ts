import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { EventosPage } from './app/pages/eventos-page';


bootstrapApplication(EventosPage, { providers: [provideZonelessChangeDetection()] })
  .catch(error => console.error(error));
