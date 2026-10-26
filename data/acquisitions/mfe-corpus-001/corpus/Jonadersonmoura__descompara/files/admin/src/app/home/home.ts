import { Component, inject } from '@angular/core';
import {
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  PageHeaderComponent,
} from '@descompara/shared-ui';
import { SeguradorasService } from '@descompara/shared-data-access';

@Component({
  selector: 'app-admin-home',
  imports: [BadgeComponent, ButtonComponent, CardComponent, PageHeaderComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly seguradorasService = inject(SeguradorasService);

  protected readonly seguradoras = this.seguradorasService.seguradoras;
  protected readonly produtos = this.seguradorasService.produtos;

  protected nomeSeguradora(seguradoraId: string): string {
    return this.seguradoras().find((s) => s.id === seguradoraId)?.nome ?? '—';
  }
}
