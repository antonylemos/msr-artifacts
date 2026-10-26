import { Component, input } from '@angular/core';

export type BadgeStatus = 'success' | 'warning' | 'neutral' | 'danger';

@Component({
  selector: 'ds-badge',
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class BadgeComponent {
  status = input<BadgeStatus>('neutral');
}
