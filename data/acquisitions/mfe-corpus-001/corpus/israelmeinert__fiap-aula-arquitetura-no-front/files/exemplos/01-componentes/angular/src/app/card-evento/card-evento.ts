import { Component, input, output } from '@angular/core';
import type { Evento } from '../evento';
@Component({ selector: 'ef-card-evento', standalone: true, 
  template: `<article><h2>{{ evento().titulo }}</h2><p>{{ evento().vagas }} vagas</p>
<button (click)="selecionar.emit(evento().id)">Selecionar evento</button></article>`,
})
export class CardEvento { readonly evento = input.required<Evento>(); readonly selecionar = output<string>(); }
