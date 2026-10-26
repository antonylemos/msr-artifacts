import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { CompraView } from './app/compra/compra-view';


bootstrapApplication(CompraView, { providers: [provideZonelessChangeDetection()] })
  .catch(error => console.error(error));
