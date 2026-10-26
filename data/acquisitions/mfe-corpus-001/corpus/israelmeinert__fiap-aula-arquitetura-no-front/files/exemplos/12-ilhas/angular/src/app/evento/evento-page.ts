import { Component } from '@angular/core';
import { SeatMap } from '../seat-map/seat-map';
@Component({ selector: 'ef-root', standalone: true, imports: [SeatMap],
  template: `<main><h1>12 · Carregamento seletivo · React Day</h1><p>Role até o mapa para carregar o componente.</p><section style="min-height: 100vh"><h2>Programação</h2><p>Arquitetura, componentes e estado.</p></section>@defer (on viewport) { <ef-seat-map /> } @placeholder { <p>O mapa de assentos será carregado aqui.</p> } @loading { <p role="status">Carregando mapa</p> } @error { <p role="alert">Não foi possível carregar o mapa.</p> }</main>`,
})
export class EventoPage {  }
