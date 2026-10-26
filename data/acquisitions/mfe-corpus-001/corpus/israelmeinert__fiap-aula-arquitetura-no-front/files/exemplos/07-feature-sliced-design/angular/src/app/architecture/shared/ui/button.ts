import { Component, input, output } from '@angular/core';

@Component({ selector: 'ef-button', standalone: true, 
  template: `<button [disabled]="disabled()" (click)="pressed.emit()"><ng-content /></button>`,
})
export class Button { readonly disabled = input(false); readonly pressed = output<void>(); }
