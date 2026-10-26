import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule],
  template: `<div>Host AppShell<div>`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {}
