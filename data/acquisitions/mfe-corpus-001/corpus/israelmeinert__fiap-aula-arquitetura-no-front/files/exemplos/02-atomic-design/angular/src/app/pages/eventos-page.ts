import { Component, signal, computed } from '@angular/core';
import { SearchField } from '../ui/molecules/search-field';
import { EventList } from '../ui/organisms/event-list';
import { CatalogTemplate } from '../ui/templates/catalog-template';
@Component({ selector: 'ef-root', standalone: true, imports: [SearchField, EventList, CatalogTemplate],
  template: `<ef-catalog-template><ef-search-field busca [value]="busca()" (change)="busca.set($event)" (clear)="busca.set('')" /><ef-event-list lista [titulos]="titulos()" /></ef-catalog-template>`,
})
export class EventosPage { readonly busca = signal(''); readonly titulos = computed(() => ['React Day', 'Angular Day'].filter(t => t.toLowerCase().includes(this.busca().toLowerCase()))); }
