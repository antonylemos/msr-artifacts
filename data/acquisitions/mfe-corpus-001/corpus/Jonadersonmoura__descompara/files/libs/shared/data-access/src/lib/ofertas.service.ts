import { Injectable, signal } from '@angular/core';
import { OfertaSeguro } from '@descompara/shared-types';

@Injectable({ providedIn: 'root' })
export class OfertasService {
  private readonly ofertasSignal = signal<OfertaSeguro[]>([
    {
      id: 'o1',
      seguradora: 'Porto Confiança Seguros',
      produto: 'Auto Essencial',
      categoria: 'auto',
      precoMensal: 189.9,
      franquiaPercentual: 20,
      avaliacao: 4.3,
    },
    {
      id: 'o2',
      seguradora: 'Porto Confiança Seguros',
      produto: 'Auto Completo',
      categoria: 'auto',
      precoMensal: 289.9,
      franquiaPercentual: 10,
      avaliacao: 4.3,
    },
    {
      id: 'o3',
      seguradora: 'Azul Proteção Veicular',
      produto: 'Moto Proteção',
      categoria: 'moto',
      precoMensal: 99.9,
      franquiaPercentual: 15,
      avaliacao: 4.6,
    },
    {
      id: 'o4',
      seguradora: 'Azul Proteção Veicular',
      produto: 'Frota Ágil',
      categoria: 'frota',
      precoMensal: 990,
      franquiaPercentual: 25,
      avaliacao: 4.1,
    },
    {
      id: 'o5',
      seguradora: 'Horizonte Seguradora',
      produto: 'Auto Horizonte Plus',
      categoria: 'auto',
      precoMensal: 219.9,
      franquiaPercentual: 18,
      avaliacao: 3.9,
    },
    {
      id: 'o6',
      seguradora: 'Vega Seguros',
      produto: 'Auto Vega Total',
      categoria: 'auto',
      precoMensal: 259,
      franquiaPercentual: 12,
      avaliacao: 4.7,
    },
    {
      id: 'o7',
      seguradora: 'Vega Seguros',
      produto: 'Moto Vega Basic',
      categoria: 'moto',
      precoMensal: 79.9,
      franquiaPercentual: 20,
      avaliacao: 4.0,
    },
    {
      id: 'o8',
      seguradora: 'Horizonte Seguradora',
      produto: 'Frota Corporate',
      categoria: 'frota',
      precoMensal: 1450,
      franquiaPercentual: 22,
      avaliacao: 4.2,
    },
  ]);

  readonly ofertas = this.ofertasSignal.asReadonly();
}
