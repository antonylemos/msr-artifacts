import { Selecionar } from './Selecionar';
import { parseEvento } from '../../server/parse-evento';
export default async function Page() {
  const base = process.env.CATALOGO_URL;
  if (!base) throw new Error('Configure CATALOGO_URL');
  const r = await fetch(`${base}/eventos/react-day`, { cache: 'no-store', signal: AbortSignal.timeout(3000) });
  if (!r.ok) throw new Error('Evento indisponível');
  const evento = parseEvento(await r.json());
  return <main><h1>11 · Renderização · {evento.titulo}</h1><p>{evento.vagas} vagas</p><p>SSR por requisição: {new Date().toISOString()}</p><Selecionar /><nav><a href="/sobre">Sobre (SSG)</a><a href="/painel">Painel (CSR)</a></nav></main>;
}
