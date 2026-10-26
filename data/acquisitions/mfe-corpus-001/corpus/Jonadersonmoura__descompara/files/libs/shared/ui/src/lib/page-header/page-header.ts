import { Component, input } from '@angular/core';

@Component({
  selector: 'ds-page-header',
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input('');
}
