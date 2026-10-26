import { Component, computed, inject } from '@angular/core';
import {
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  PageHeaderComponent,
  BadgeStatus,
} from '@descompara/shared-ui';
import { ApolicesService, AuthService, OfertasService } from '@descompara/shared-data-access';
import { StatusApolice } from '@descompara/shared-types';

const STATUS_BADGE: Record<StatusApolice, BadgeStatus> = {
  ativa: 'success',
  pendente: 'warning',
  cancelada: 'danger',
};

@Component({
  selector: 'app-intranet-home',
  imports: [BadgeComponent, ButtonComponent, CardComponent, PageHeaderComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly auth = inject(AuthService);
  private readonly apolicesService = inject(ApolicesService);
  private readonly ofertasService = inject(OfertasService);

  protected readonly usuario = this.auth.currentUser;
  protected readonly apolices = this.apolicesService.apolices;
  protected readonly ofertas = this.ofertasService.ofertas;

  protected readonly totalAtivas = computed(
    () => this.apolices().filter((a) => a.status === 'ativa').length,
  );

  protected badgeStatus(status: StatusApolice): BadgeStatus {
    return STATUS_BADGE[status];
  }
}
