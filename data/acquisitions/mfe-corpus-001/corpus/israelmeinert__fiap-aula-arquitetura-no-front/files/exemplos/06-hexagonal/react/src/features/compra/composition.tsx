import { criarSimulador } from './core/criar-simulador';
import { catalogoHttp } from './adapters/http/catalogo-http';
import { catalogoMemoria } from './adapters/memory/catalogo';
import { Simulador } from './adapters/ui/Simulador';
// Só a composição conhece as implementações concretas.
const simularHttp = criarSimulador(catalogoHttp);
const simularMemoria = criarSimulador(catalogoMemoria);
export function CompraRoot({ memoria = false }: { memoria?: boolean }) {
  return <Simulador simular={ memoria ? simularMemoria : simularHttp } />;
}
