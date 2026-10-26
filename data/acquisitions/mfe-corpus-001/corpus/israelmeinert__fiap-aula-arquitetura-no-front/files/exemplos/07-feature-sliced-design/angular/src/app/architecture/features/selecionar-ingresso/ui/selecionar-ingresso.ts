import { Component, input, signal } from '@angular/core';
import { Button } from '../../../shared/ui';
import { aumentar } from '../model/limitar-quantidade';
@Component({ selector: 'ef-selecionar-ingresso', standalone: true, imports: [Button],
  template: `<section><p role="status">{{ qtd() }} ingresso(s) para {{ eventoId() }}</p><ef-button [disabled]="qtd() >= 6" (pressed)="adicionar()">Adicionar ingresso</ef-button></section>`,
})
export class SelecionarIngresso { readonly eventoId = input.required<string>(); readonly qtd = signal(1); adicionar() { this.qtd.update(aumentar); } }
