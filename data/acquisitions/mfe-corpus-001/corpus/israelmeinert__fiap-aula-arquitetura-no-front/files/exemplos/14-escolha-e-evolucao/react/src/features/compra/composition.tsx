import { criarSimulador } from './application/criar-simulador';
import { catalogoHttp } from './infrastructure/catalogo-http';
import { Simulador } from './presentation/Simulador';
const simular = criarSimulador(catalogoHttp);
export function CompraRoot({ eventoId }: { eventoId: string }) { return <Simulador simular={simular} eventoId={eventoId} />; }
