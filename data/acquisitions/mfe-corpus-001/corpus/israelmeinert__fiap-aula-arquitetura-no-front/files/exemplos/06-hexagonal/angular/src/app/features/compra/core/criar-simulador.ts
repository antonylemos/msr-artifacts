import { calcularTotal } from './calcular-total';

export interface Catalogo { precoDe(eventoId: string): Promise<number>; }
export type Simular = (id: string, qtd: number) => Promise<number>;
export function criarSimulador(catalogo: Catalogo): Simular {
  return async (id, qtd) => calcularTotal(await catalogo.precoDe(id), qtd);
}
