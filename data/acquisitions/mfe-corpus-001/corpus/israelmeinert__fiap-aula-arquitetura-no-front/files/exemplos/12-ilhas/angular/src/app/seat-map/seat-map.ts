import { Component, signal } from '@angular/core';

@Component({ selector: 'ef-seat-map', standalone: true, 
  template: `<section><h2>Mapa de assentos</h2><p role="status">{{ qtd() }} ingresso(s)</p><button [disabled]="qtd() >= 6" (click)="qtd.update(aumentar)">Adicionar ingresso</button></section>`,
})
export class SeatMap { readonly qtd = signal(1); readonly aumentar = (q: number) => Math.min(6, q + 1); }
