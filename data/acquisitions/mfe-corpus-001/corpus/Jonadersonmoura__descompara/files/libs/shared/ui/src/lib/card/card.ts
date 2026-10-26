import { Component, input } from '@angular/core';

@Component({
  selector: 'ds-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  title = input('');
}
