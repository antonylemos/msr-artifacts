import { Component, input } from '@angular/core';

@Component({ selector: 'ef-event-list', standalone: true, 
  template: `<section aria-label="Eventos">@for (titulo of titulos(); track titulo) { <article><h2>{{ titulo }}</h2></article> } @empty { <p role="status">Nenhum evento encontrado</p> }</section>`,
})
export class EventList { readonly titulos = input.required<string[]>(); }
