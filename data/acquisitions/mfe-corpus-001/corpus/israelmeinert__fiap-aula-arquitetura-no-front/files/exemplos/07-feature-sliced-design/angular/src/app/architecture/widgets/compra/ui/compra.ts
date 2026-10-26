import { Component, input } from '@angular/core';
import { CardEvento, type Evento } from '../../../entities/evento';
import { SelecionarIngresso } from '../../../features/selecionar-ingresso';
@Component({ selector: 'ef-compra', standalone: true, imports: [CardEvento, SelecionarIngresso],
  template: `<section><ef-card-evento [evento]="evento()" /><ef-selecionar-ingresso [eventoId]="evento().id" /></section>`,
})
export class Compra { readonly evento = input.required<Evento>(); }
