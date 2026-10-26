import type { Evento } from '../evento';
type Props = { evento: Evento; onSelecionar: (id: string) => void };
// O card emite intenção; o consumidor decide o que fazer com ela.
export function CardEvento({ evento, onSelecionar }: Props) {
  return <article><h2>{evento.titulo}</h2><p>{evento.vagas} vagas</p>
    <button onClick={() => onSelecionar(evento.id)}>Selecionar evento</button></article>;
}
