import { Component } from '@angular/core';

@Component({
  selector: 'app-mar-aberto-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();
}
