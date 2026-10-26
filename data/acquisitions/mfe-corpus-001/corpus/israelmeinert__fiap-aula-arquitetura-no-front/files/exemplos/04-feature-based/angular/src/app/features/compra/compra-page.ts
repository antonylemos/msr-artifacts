import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { consultarPreco } from './preco-api';
import { calcularTotal } from './calcular-total';
@Component({ selector: 'ef-compra-page', standalone: true, 
  template: `<section><h2>Simulação de compra</h2><button [disabled]="carregando()" (click)="simular()">Simular 2 ingressos</button><p role="status">{{ mensagem() }}</p></section>`,
})
export class CompraPage { private readonly route = inject(ActivatedRoute); readonly carregando = signal(false); readonly mensagem = signal('Pronto');
async simular() { this.carregando.set(true); try { const id = this.route.snapshot.queryParamMap.get('id') ?? 'react-day'; this.mensagem.set(`Total: ${calcularTotal(await consultarPreco(id), 2)} centavos`); } catch { this.mensagem.set('Não foi possível simular'); } finally { this.carregando.set(false); } } }
