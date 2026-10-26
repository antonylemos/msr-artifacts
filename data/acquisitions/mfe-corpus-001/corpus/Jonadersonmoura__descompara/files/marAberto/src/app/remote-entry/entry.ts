import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-mar-aberto-entry',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './entry.html',
  styleUrl: './entry.scss',
  host: { 'data-theme': 'mar-aberto', class: 'ambiente' },
})
export class RemoteEntry {}
