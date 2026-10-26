import type { Provider } from '@angular/core';
import { SIMULAR } from './adapters/ui/tokens';
import { criarSimulador } from './core/criar-simulador';
import { catalogoHttp } from './adapters/http/catalogo-http';
import { catalogoMemoria } from './adapters/memory/catalogo';
export const COMPRA_PROVIDERS: Provider[] = [{ provide: SIMULAR, useFactory: () => criarSimulador(catalogoHttp) }];
export const DEMO_PROVIDERS: Provider[] = [{ provide: SIMULAR, useFactory: () => criarSimulador(catalogoMemoria) }];
