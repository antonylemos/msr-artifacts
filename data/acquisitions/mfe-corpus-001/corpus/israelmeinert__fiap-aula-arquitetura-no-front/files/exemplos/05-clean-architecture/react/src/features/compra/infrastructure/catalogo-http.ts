import type { Catalogo } from '../application/criar-simulador';
import { parseEvento } from './parse-evento';

export const catalogoHttp: Catalogo = {
  async precoDe(id) {
    const r = await fetch(`/api/eventos/${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(3000) });
    if (!r.ok) throw new Error('Evento indisponível');
    return parseEvento(await r.json()).precoCentavos;
  },
};
