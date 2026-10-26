import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({ selector: 'ef-root', standalone: true, imports: [RouterLink, RouterOutlet],
  template: `<main><h1>14 · Módulos com Clean na compra</h1><nav><a routerLink="/eventos">Catálogo</a><a routerLink="/compra">Compra</a></nav><router-outlet /></main>`,
})
export class App {  }
