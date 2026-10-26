import { Component, signal } from '@angular/core';
import { CardEvento } from '../card-evento/card-evento';
import { eventoDemo } from '../evento';
@Component({ selector: 'ef-root', standalone: true, imports: [CardEvento],
  template: `<main><h1>01 · Componentes</h1>
<ef-card-evento [evento]="evento" (selecionar)="selecionado.set($event)" />
<p role="status">{{ selecionado() ? 'Evento selecionado: ' + selecionado() : 'Selecione um evento' }}</p></main>`,
})
export class EventoPage { readonly evento = eventoDemo; readonly selecionado = signal(''); }
