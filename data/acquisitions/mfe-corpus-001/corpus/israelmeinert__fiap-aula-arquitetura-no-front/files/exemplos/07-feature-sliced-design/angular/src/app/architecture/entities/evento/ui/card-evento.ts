import { Component, input } from '@angular/core';
import type { Evento } from '../model/evento';
@Component({ selector: 'ef-card-evento', standalone: true, 
  template: `<article><h2>{{ evento().titulo }}</h2><p>{{ evento().vagas }} vagas · {{ evento().precoCentavos }} centavos</p></article>`,
})
export class CardEvento { readonly evento = input.required<Evento>(); }
