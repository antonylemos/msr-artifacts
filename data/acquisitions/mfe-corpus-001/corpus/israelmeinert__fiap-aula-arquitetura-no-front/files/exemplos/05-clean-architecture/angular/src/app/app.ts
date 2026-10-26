import { Component } from '@angular/core';
import { CompraRoot } from './features/compra';
@Component({ selector: 'ef-root', standalone: true, imports: [CompraRoot],
  template: `<main><h1>05 · Clean Architecture</h1><ef-compra-root /></main>`,
})
export class App {  }
