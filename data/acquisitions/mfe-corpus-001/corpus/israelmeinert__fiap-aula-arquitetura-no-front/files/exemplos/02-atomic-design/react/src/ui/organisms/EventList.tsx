export function EventList({ titulos }: { titulos: string[] }) {
  return <section aria-label="Eventos">{titulos.length ? titulos.map(t => <article key={t}><h2>{t}</h2></article>) : <p role="status">Nenhum evento encontrado</p>}</section>;
}
