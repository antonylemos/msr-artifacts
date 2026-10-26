import { Component, signal } from '@angular/core';

@Component({ selector: 'ef-checkout', standalone: true, 
  template: `<section><h2>Checkout Angular</h2><p role="status">{{ qtd() }} ingresso(s) · {{ qtd() * 15000 }} centavos</p><button [disabled]="qtd() >= 6" (click)="adicionar()">Adicionar ingresso</button></section>`,
})
export class CheckoutApp { readonly qtd = signal(1); adicionar() { this.qtd.update(q => Math.min(6, q + 1)); } }
