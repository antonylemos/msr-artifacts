import { criarSimulador } from './application/criar-simulador';
import { catalogoHttp } from './infrastructure/catalogo-http';

import { Simulador } from './presentation/Simulador';
// Só a composição conhece as implementações concretas.
const simularHttp = criarSimulador(catalogoHttp);

export function CompraRoot() {
  return <Simulador simular={ simularHttp } />;
}
