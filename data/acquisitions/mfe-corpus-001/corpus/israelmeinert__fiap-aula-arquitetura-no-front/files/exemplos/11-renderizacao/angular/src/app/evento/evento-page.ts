import { Component, signal, inject } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/core';
@Component({ selector: 'ef-evento-page', standalone: true, 
  template: `<section><h1>11 · Renderização · React Day</h1><p>SSR por requisição: {{ instante }}</p><p role="status">{{ qtd() }} ingresso(s)</p><button [disabled]="qtd() >= 6" (click)="adicionar()">Adicionar ingresso</button></section>`,
})
export class EventoPage { // TransferState preserva o instante inicial para evitar diferença na hidratação.
private readonly transfer = inject(TransferState); private readonly key = makeStateKey<string>('instante-evento');
readonly instante = this.transfer.get(this.key, new Date().toISOString());
readonly qtd = signal(1);
constructor() { this.transfer.set(this.key, this.instante); }
adicionar() { this.qtd.update(q => Math.min(6, q + 1)); } }
