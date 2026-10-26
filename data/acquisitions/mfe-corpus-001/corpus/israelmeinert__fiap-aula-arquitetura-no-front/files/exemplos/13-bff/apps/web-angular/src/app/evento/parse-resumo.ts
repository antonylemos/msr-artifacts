export type Resumo = { id: string; titulo: string; disponivel: boolean };
export function parseResumo(value: unknown): Resumo {
  if (typeof value !== 'object' || value === null) throw new Error('Resumo inválido');
  const v = value as Record<string, unknown>;
  if (typeof v.id !== 'string' || !v.id || typeof v.titulo !== 'string' || !v.titulo || typeof v.disponivel !== 'boolean') throw new Error('Resumo inválido');
  return { id: v.id, titulo: v.titulo, disponivel: v.disponivel };
}
