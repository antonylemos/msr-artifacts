import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { EventoPage } from './app/evento-page/evento-page';


bootstrapApplication(EventoPage, { providers: [provideZonelessChangeDetection()] })
  .catch(error => console.error(error));
