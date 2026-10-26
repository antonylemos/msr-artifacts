import { Injectable, signal } from '@angular/core';
import { quantidadeReducer, type Acao } from './quantidade-reducer';
@Injectable()
export class CompraStore {
  private readonly state = signal(1);
  readonly qtd = this.state.asReadonly();
  dispatch(acao: Acao) { this.state.update(atual => quantidadeReducer(atual, acao)); }
}
