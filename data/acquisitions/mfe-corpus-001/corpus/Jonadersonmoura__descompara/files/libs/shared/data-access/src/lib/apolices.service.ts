import { Injectable, signal } from '@angular/core';
import { Apolice } from '@descompara/shared-types';

@Injectable({ providedIn: 'root' })
export class ApolicesService {
  private readonly apolicesSignal = signal<Apolice[]>([
    { id: 'a1', produtoId: 'p1', clienteNome: 'Maria Souza', placa: 'ABC1D23', premioMensal: 189.9, status: 'ativa' },
    { id: 'a2', produtoId: 'p2', clienteNome: 'João Pereira', placa: 'XYZ9E88', premioMensal: 289.9, status: 'pendente' },
    { id: 'a3', produtoId: 'p3', clienteNome: 'Carla Lima', placa: 'JJK4L56', premioMensal: 99.9, status: 'cancelada' },
  ]);

  readonly apolices = this.apolicesSignal.asReadonly();
}
