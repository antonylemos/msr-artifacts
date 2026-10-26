'use client';
import { useState } from 'react';
import { parseResumo, type Resumo } from '../../shared/parse-resumo';
export function ResumoView() {
  const [resumo, setResumo] = useState<Resumo | null>(null); const [status, setStatus] = useState('Pronto');
  async function carregar() {
    setStatus('Carregando'); setResumo(null);
    try { const r = await fetch('/api/resumo', { signal: AbortSignal.timeout(5000) }); if (!r.ok) throw new Error('Resumo indisponível'); setResumo(parseResumo(await r.json())); setStatus('Resumo carregado'); }
    catch { setStatus('Resumo indisponível. Tente novamente.'); }
  }
  return <section><button disabled={status === 'Carregando'} onClick={carregar}>Carregar resumo</button><p role="status">{status}</p>
    {resumo && <article><h2>{resumo.titulo}</h2><p>{resumo.disponivel ? 'Ingressos disponíveis' : 'Evento esgotado'}</p></article>}</section>;
}
