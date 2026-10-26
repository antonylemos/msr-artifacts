import type { Evento } from '../model/evento';
export function CardEvento({ evento }: { evento: Evento }) { return <article><h2>{evento.titulo}</h2><p>{evento.vagas} vagas · {evento.precoCentavos} centavos</p></article>; }
