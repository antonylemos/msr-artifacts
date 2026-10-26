import { Component, input, output } from '@angular/core';

@Component({ selector: 'ef-text-input', standalone: true, 
  template: `<input type="search" [value]="value()" (input)="change.emit($any($event.target).value)" />`,
})
export class TextInput { readonly value = input(''); readonly change = output<string>(); }
