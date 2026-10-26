import type { Provider } from '@angular/core';
import { SIMULAR } from './presentation/tokens';
import { criarSimulador } from './application/criar-simulador';
import { catalogoHttp } from './infrastructure/catalogo-http';

export const COMPRA_PROVIDERS: Provider[] = [{ provide: SIMULAR, useFactory: () => criarSimulador(catalogoHttp) }];

