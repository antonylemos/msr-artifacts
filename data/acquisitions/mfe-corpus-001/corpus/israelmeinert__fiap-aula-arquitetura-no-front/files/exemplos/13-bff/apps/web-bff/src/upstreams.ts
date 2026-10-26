import type { Consultas } from './montar-resumo';
import { parseEvento } from './parse-evento';
async function consultar(caminho: string): Promise<unknown> {
  const base = process.env.CATALOGO_URL;
  if (!base) throw new Error('Configure CATALOGO_URL');
  const r = await fetch(`${base}${caminho}`, { cache: 'no-store', signal: AbortSignal.timeout(3000) });
  if (!r.ok) throw new Error('Serviço indisponível');
  return r.json();
}
export const api: Consultas = {
  async evento() { const e = parseEvento(await consultar('/eventos/react-day')); return { id: e.id, titulo: e.titulo }; },
  async vagas() {
    const v = await consultar('/disponibilidade/react-day');
    if (typeof v !== 'object' || v === null || !('vagas' in v) || typeof v.vagas !== 'number' || !Number.isSafeInteger(v.vagas) || v.vagas < 0) throw new Error('Disponibilidade inválida');
    return v.vagas;
  },
};
