import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { Quantidade } from './app/compra/quantidade';


bootstrapApplication(Quantidade, { providers: [provideZonelessChangeDetection()] })
  .catch(error => console.error(error));
