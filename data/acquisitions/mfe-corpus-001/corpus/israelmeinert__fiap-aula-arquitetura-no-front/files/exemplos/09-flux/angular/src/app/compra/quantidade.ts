import { Component, inject } from '@angular/core';
import { CompraStore } from './compra-store';
@Component({ selector: 'ef-root', standalone: true, providers: [CompraStore],
  template: `<main><h1>09 · Flux e estado</h1><p role="status">{{ store.qtd() }} ingresso(s)</p><button [disabled]="store.qtd() >= 6" (click)="store.dispatch({ type: 'adicionar' })">Adicionar ingresso</button><button (click)="store.dispatch({ type: 'reiniciar' })">Reiniciar</button></main>`,
})
export class Quantidade { readonly store = inject(CompraStore); }
