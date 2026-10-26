import { Component } from '@angular/core';
import { eventoDemo } from '../../../entities/evento';
import { Compra } from '../../../widgets/compra';
@Component({ selector: 'ef-evento-page', standalone: true, imports: [Compra],
  template: `<main><h1>07 · Feature-Sliced Design</h1><ef-compra [evento]="evento" /></main>`,
})
export class EventoPage { readonly evento = eventoDemo; }
