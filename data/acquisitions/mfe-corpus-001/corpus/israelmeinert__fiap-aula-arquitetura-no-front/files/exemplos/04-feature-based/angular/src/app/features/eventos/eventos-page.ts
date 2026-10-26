import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Status } from '../../shared/ui/status';
import { listarEventos } from './eventos-http';
import type { Evento } from './evento';
@Component({ selector: 'ef-eventos-page', standalone: true, imports: [RouterLink, Status],
  template: `<section><button [disabled]="status() === 'Carregando'" (click)="carregar()">Consultar eventos</button><ef-status [mensagem]="status()" />@for (e of eventos(); track e.id) { <article><h2>{{ e.titulo }}</h2><a [routerLink]="['/compra']" [queryParams]="{ id: e.id }">Simular {{ e.titulo }}</a></article> }</section>`,
})
export class EventosPage { readonly eventos = signal<Evento[]>([]); readonly status = signal('Pronto');
async carregar() { this.status.set('Carregando'); this.eventos.set([]); try { this.eventos.set(await listarEventos()); this.status.set('Selecione um evento'); } catch { this.status.set('Falha ao carregar. Tente novamente.'); } } }
