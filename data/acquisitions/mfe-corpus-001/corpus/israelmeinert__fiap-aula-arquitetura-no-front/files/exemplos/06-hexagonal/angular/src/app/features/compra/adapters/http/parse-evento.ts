import type { Evento } from './evento-dto';

function isEvento(value: unknown): value is Evento {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === 'string' && v.id.length > 0
    && typeof v.titulo === 'string' && v.titulo.length > 0
    && typeof v.precoCentavos === 'number' && Number.isSafeInteger(v.precoCentavos) && v.precoCentavos >= 0
    && typeof v.vagas === 'number' && Number.isSafeInteger(v.vagas) && v.vagas >= 0;
}
export function parseEvento(value: unknown): Evento {
  if (!isEvento(value)) throw new Error('Formato de evento inválido');
  // Mapeamento explícito: campos extras da API não chegam à apresentação.
  return { id: value.id, titulo: value.titulo, precoCentavos: value.precoCentavos, vagas: value.vagas };
}
export function parseEventos(value: unknown): Evento[] {
  if (!Array.isArray(value)) throw new Error('Formato de lista inválido');
  return value.map(parseEvento);
}
