import { parseEventos } from './parse-eventos';
export async function listarEventos() {
  const r = await fetch('/api/eventos', { signal: AbortSignal.timeout(3000) });
  if (!r.ok) throw new Error('Falha ao consultar eventos');
  return parseEventos(await r.json());
}
