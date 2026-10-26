import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-admin-entry',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './entry.html',
  styleUrl: './entry.scss',
  host: { 'data-theme': 'admin', class: 'ambiente' },
})
export class RemoteEntry {}
