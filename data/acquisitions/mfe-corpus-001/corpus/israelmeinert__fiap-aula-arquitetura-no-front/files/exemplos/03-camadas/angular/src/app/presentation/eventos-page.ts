import { Component, signal } from '@angular/core';
import { listarAbertos } from '../application/listar-abertos';
import type { Evento } from '../model/evento';
@Component({ selector: 'ef-root', standalone: true, 
  template: `<main><h1>03 · Camadas</h1><button [disabled]="status() === 'Carregando'" (click)="carregar()">Consultar eventos</button><p role="status">{{ status() }}</p>@for (e of eventos(); track e.id) { <article><h2>{{ e.titulo }}</h2><p>{{ e.vagas }} vagas</p></article> }</main>`,
})
export class EventosPage { readonly status = signal('Pronto'); readonly eventos = signal<Evento[]>([]);
async carregar() {
  this.status.set('Carregando'); this.eventos.set([]);
  try { const dados = await listarAbertos(); this.eventos.set(dados); this.status.set(`${dados.length} eventos disponíveis`); }
  catch { this.status.set('Falha ao carregar. Tente novamente.'); }
} }
