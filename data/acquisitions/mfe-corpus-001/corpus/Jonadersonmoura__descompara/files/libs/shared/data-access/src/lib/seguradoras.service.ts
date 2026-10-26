import { Injectable, signal } from '@angular/core';
import { ProdutoSeguro, Seguradora } from '@descompara/shared-types';

@Injectable({ providedIn: 'root' })
export class SeguradorasService {
  private readonly seguradorasSignal = signal<Seguradora[]>([
    { id: 's1', nome: 'Porto Confiança Seguros', cnpj: '12.345.678/0001-90', ativa: true },
    { id: 's2', nome: 'Azul Proteção Veicular', cnpj: '98.765.432/0001-10', ativa: true },
    { id: 's3', nome: 'Horizonte Seguradora', cnpj: '11.222.333/0001-44', ativa: false },
  ]);

  private readonly produtosSignal = signal<ProdutoSeguro[]>([
    { id: 'p1', seguradoraId: 's1', nome: 'Auto Essencial', categoria: 'auto', precoBase: 189.9, ativo: true },
    { id: 'p2', seguradoraId: 's1', nome: 'Auto Completo', categoria: 'auto', precoBase: 289.9, ativo: true },
    { id: 'p3', seguradoraId: 's2', nome: 'Moto Proteção', categoria: 'moto', precoBase: 99.9, ativo: true },
    { id: 'p4', seguradoraId: 's2', nome: 'Frota Empresarial', categoria: 'frota', precoBase: 1290, ativo: false },
  ]);

  readonly seguradoras = this.seguradorasSignal.asReadonly();
  readonly produtos = this.produtosSignal.asReadonly();
}
