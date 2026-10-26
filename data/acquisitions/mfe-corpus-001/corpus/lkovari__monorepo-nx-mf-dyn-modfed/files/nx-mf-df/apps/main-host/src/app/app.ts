import { Component } from '@angular/core';
import { Layout } from './shared/components/layout/layout';

@Component({
  imports: [Layout],
  selector: 'nxmfdf-main-host-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'main-host';
}
