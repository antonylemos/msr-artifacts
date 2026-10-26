import { useState } from 'react';
import { listarEventos } from './eventos-http';
import type { Evento } from './evento';
import { Status } from '../../shared/ui/Status';
export function EventosPage({ onSelecionar }: { onSelecionar: (evento: Evento) => void }) {
  const [eventos, setEventos] = useState<Evento[]>([]); const [status, setStatus] = useState('Pronto');
  async function carregar() {
    setStatus('Carregando'); setEventos([]);
    try { setEventos(await listarEventos()); setStatus('Selecione um evento'); } catch { setStatus('Falha ao carregar. Tente novamente.'); }
  }
  return <section><button disabled={status === 'Carregando'} onClick={carregar}>Consultar eventos</button><Status mensagem={status} />
    {eventos.map(e => <article key={e.id}><h2>{e.titulo}</h2><button disabled={e.vagas === 0} onClick={() => onSelecionar(e)}>Selecionar {e.titulo}</button></article>)}</section>;
}
