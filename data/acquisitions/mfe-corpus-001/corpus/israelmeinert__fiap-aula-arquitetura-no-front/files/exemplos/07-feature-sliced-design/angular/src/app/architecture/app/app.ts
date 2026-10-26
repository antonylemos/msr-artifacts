import { Component } from '@angular/core';
import { EventoPage } from '../pages/evento';
@Component({ selector: 'ef-root', standalone: true, imports: [EventoPage],
  template: `<ef-evento-page />`,
})
export class App {  }
