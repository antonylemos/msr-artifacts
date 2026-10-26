import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule],
  template: `Hi I am MFE 2!`,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {}
