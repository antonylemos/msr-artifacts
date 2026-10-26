// AppModule — the root Angular module for this microfrontend.
// BrowserModule provides essential Angular directives and services for browser apps.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports:      [BrowserModule],
  bootstrap:    [AppComponent],
})
export class AppModule {}
