import { Component, input, output } from '@angular/core';
import { TextInput } from '../atoms/text-input';
import { Button } from '../atoms/button';
@Component({ selector: 'ef-search-field', standalone: true, imports: [TextInput, Button],
  template: `<div><label>Buscar evento<ef-text-input [value]="value()" (change)="change.emit($event)" /></label><ef-button (pressed)="clear.emit()">Limpar busca</ef-button></div>`,
})
export class SearchField { readonly value = input(''); readonly change = output<string>(); readonly clear = output<void>(); }
