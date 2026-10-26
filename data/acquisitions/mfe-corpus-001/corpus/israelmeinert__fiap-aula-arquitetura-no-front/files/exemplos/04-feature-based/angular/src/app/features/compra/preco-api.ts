export async function consultarPreco(id: string): Promise<number> {
  const r = await fetch(`/api/eventos/${encodeURIComponent(id)}`, { signal: AbortSignal.timeout(3000) });
  if (!r.ok) throw new Error('Evento indisponível');
  const v: unknown = await r.json();
  if (typeof v !== 'object' || v === null || !('precoCentavos' in v) || typeof v.precoCentavos !== 'number' || !Number.isSafeInteger(v.precoCentavos) || v.precoCentavos < 0) throw new Error('Preço inválido');
  return v.precoCentavos;
}
