import { CardEvento, type Evento } from '../../../entities/evento';
import { SelecionarIngresso } from '../../../features/selecionar-ingresso';
export function Compra({ evento }: { evento: Evento }) { return <section><CardEvento evento={evento} /><SelecionarIngresso eventoId={evento.id} /></section>; }
