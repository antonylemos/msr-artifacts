import { Component, signal } from '@angular/core';
import { CompraRoot, CompraDemo } from './features/compra';
@Component({ selector: 'ef-root', standalone: true, imports: [CompraRoot, CompraDemo],
  template: `<main><h1>06 · Hexagonal</h1><button (click)="memoria.set(!memoria())">Trocar adaptador</button><p role="status">Adaptador: {{ memoria() ? 'memória' : 'HTTP' }}</p>@if (memoria()) { <ef-compra-demo /> } @else { <ef-compra-root /> }</main>`,
})
export class App { readonly memoria = signal(true); }
