import { Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResumoApi } from './resumo-api';
import type { Resumo } from './parse-resumo';
@Component({ selector: 'ef-root', standalone: true, 
  template: `<main><h1>13 · BFF com Angular</h1><button [disabled]="status() === 'Carregando'" (click)="carregar()">Carregar resumo</button><p role="status">{{ status() }}</p>@if (resumo(); as r) { <article><h2>{{ r.titulo }}</h2><p>{{ r.disponivel ? 'Ingressos disponíveis' : 'Evento esgotado' }}</p></article> }</main>`,
})
export class EventoPage { private readonly api = inject(ResumoApi); readonly resumo = signal<Resumo | null>(null); readonly status = signal('Pronto');
async carregar() { this.status.set('Carregando'); this.resumo.set(null); try { this.resumo.set(await firstValueFrom(this.api.carregar())); this.status.set('Resumo carregado'); } catch { this.status.set('Resumo indisponível. Tente novamente.'); } } }
