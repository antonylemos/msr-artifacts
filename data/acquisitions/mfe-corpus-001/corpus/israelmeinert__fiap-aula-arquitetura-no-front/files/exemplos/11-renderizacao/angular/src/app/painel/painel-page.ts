import { Component, signal } from '@angular/core';

@Component({ selector: 'ef-painel-page', standalone: true, 
  template: `<section><h1>Painel renderizado no navegador</h1><p role="status">{{ qtd() }} ingresso(s)</p><button (click)="qtd.update(aumentar)">Adicionar ingresso</button></section>`,
})
export class PainelPage { readonly qtd = signal(1); readonly aumentar = (q: number) => Math.min(6, q + 1); }
