import { Injectable, computed, signal } from '@angular/core';
import { calcularTotal } from './calcular-total';
@Injectable()
export class CompraViewModel {
  private readonly state = signal(1);
  readonly qtd = this.state.asReadonly();
  readonly total = computed(() => calcularTotal(15000, this.qtd()));
  readonly podeAumentar = computed(() => this.qtd() < 6);
  aumentar() { this.state.update(q => Math.min(6, q + 1)); }
  reiniciar() { this.state.set(1); }
}
