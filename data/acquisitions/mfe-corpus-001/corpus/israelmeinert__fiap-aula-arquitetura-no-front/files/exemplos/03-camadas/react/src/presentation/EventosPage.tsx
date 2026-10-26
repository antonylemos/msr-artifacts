import { useState } from 'react';
import { listarAbertos } from '../application/listar-abertos';
import type { Evento } from '../model/evento';
export function App() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [status, setStatus] = useState('Pronto');
  async function carregar() {
    setStatus('Carregando'); setEventos([]);
    try { const dados = await listarAbertos(); setEventos(dados); setStatus(`${dados.length} eventos disponíveis`); }
    catch { setStatus('Falha ao carregar. Tente novamente.'); }
  }
  return <main><h1>03 · Camadas</h1><button disabled={status === 'Carregando'} onClick={carregar}>Consultar eventos</button>
    <p role="status">{status}</p>{eventos.map(e => <article key={e.id}><h2>{e.titulo}</h2><p>{e.vagas} vagas</p></article>)}</main>;
}
