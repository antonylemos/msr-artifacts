import { Component, output } from '@angular/core';

@Component({ selector: 'ef-button', standalone: true, 
  template: `<button (click)="pressed.emit()"><ng-content /></button>`,
})
export class Button { readonly pressed = output<void>(); }
