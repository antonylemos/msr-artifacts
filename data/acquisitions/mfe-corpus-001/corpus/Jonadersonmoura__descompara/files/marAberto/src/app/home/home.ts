import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  PageHeaderComponent,
} from '@descompara/shared-ui';
import { OfertasService } from '@descompara/shared-data-access';

@Component({
  selector: 'app-mar-aberto-home',
  imports: [RouterLink, BadgeComponent, ButtonComponent, CardComponent, PageHeaderComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly ofertasService = inject(OfertasService);

  protected readonly ofertas = this.ofertasService.ofertas;
}
