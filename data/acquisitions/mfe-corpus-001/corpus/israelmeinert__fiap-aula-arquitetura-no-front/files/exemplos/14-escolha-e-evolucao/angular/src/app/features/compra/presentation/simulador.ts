import { Component, inject, signal } from '@angular/core';
import { SIMULAR } from './tokens';
import { ActivatedRoute } from '@angular/router';
@Component({ selector: 'ef-simulador', standalone: true, 
  template: `<section><label>Quantidade de ingressos<input type="number" min="1" max="6" [value]="qtd()" (input)="qtd.set(+$any($event.target).value)" /></label><button [disabled]="ocupado()" (click)="executar()">Simular compra</button><p role="status">{{ mensagem() }}</p></section>`,
})
export class Simulador { private readonly route = inject(ActivatedRoute); private readonly simular = inject(SIMULAR); readonly qtd = signal(2); readonly ocupado = signal(false); readonly mensagem = signal('Pronto');
async executar() { this.ocupado.set(true); this.mensagem.set('Calculando'); try { this.mensagem.set(`Total: ${await this.simular(this.route.snapshot.queryParamMap.get('id') ?? 'react-day', this.qtd())} centavos`); } catch { this.mensagem.set('Não foi possível simular'); } finally { this.ocupado.set(false); } } }
