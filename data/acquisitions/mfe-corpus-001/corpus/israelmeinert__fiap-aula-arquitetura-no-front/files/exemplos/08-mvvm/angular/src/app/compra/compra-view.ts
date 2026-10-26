import { Component, inject } from '@angular/core';
import { CompraViewModel } from './compra-view-model';
@Component({ selector: 'ef-root', standalone: true, providers: [CompraViewModel],
  template: `<main><h1>08 · MVVM</h1><p role="status">{{ vm.qtd() }} ingresso(s) · {{ vm.total() }} centavos</p><button [disabled]="!vm.podeAumentar()" (click)="vm.aumentar()">Adicionar ingresso</button><button (click)="vm.reiniciar()">Reiniciar</button></main>`,
})
export class CompraView { readonly vm = inject(CompraViewModel); }
