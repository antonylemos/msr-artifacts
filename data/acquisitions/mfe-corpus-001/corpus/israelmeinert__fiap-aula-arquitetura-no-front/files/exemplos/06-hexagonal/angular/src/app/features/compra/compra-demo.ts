import { Component } from '@angular/core';
import { Simulador } from './adapters/ui/simulador';
import { DEMO_PROVIDERS } from './providers';
@Component({ selector: 'ef-compra-demo', standalone: true, imports: [Simulador], providers: DEMO_PROVIDERS,
  template: `<ef-simulador />`,
})
export class CompraDemo {  }
