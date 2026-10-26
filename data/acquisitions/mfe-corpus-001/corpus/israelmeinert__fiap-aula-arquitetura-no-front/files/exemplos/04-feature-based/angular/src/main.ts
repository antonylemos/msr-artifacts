import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
bootstrapApplication(App, { providers: [provideZonelessChangeDetection(), provideRouter(routes)] })
  .catch(error => console.error(error));
