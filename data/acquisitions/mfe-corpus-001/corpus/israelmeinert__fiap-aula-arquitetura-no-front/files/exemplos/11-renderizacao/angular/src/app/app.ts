import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({ selector: 'ef-root', standalone: true, imports: [RouterLink, RouterOutlet],
  template: `<main><nav><a routerLink="/evento">Evento (SSR)</a><a routerLink="/sobre">Sobre (SSG)</a><a routerLink="/painel">Painel (CSR)</a></nav><router-outlet /></main>`,
})
export class App {  }
