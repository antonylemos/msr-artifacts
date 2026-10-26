import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { EventoPage } from './app/evento/evento-page';
bootstrapApplication(EventoPage, { providers: [provideZonelessChangeDetection(), provideHttpClient()] }).catch(error => console.error(error));
