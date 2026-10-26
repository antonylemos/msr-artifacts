import { Component } from '@angular/core';
import { Simulador } from './adapters/ui/simulador';
import { COMPRA_PROVIDERS } from './providers';
@Component({ selector: 'ef-compra-root', standalone: true, imports: [Simulador], providers: COMPRA_PROVIDERS,
  template: `<ef-simulador />`,
})
export class CompraRoot {  }
