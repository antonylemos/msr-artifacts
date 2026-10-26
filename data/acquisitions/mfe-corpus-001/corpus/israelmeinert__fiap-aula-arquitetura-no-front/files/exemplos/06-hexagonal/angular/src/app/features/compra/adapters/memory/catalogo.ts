import type { Catalogo } from '../../core/criar-simulador';
const precos = new Map([['react-day', 15000], ['angular-day', 12000]]);
export const catalogoMemoria: Catalogo = {
  async precoDe(id) { const preco = precos.get(id); if (preco === undefined) throw new Error('Evento não encontrado'); return preco; },
};
