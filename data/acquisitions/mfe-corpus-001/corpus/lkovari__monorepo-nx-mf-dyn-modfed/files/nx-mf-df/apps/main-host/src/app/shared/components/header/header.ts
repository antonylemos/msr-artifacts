import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';
import {
  DemoShellH2rQuerySuiteComponent,
  PlatformMessagingTriggerComponent,
  resolvePlatformParticipantIdFromPath,
} from '@nx-mf-df/common-ui-lib';

@Component({
  selector: 'nxmfdf-header',
  imports: [
    DatePipe,
    RouterModule,
    PlatformMessagingTriggerComponent,
    DemoShellH2rQuerySuiteComponent,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly lastUpdate = Date.parse('2026-06-07T23:11:24');

  private readonly router = inject(Router);

  private readonly urlPath = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url.split('?')[0] ?? ''),
    ),
    { initialValue: this.router.url.split('?')[0] ?? '' },
  );

  protected readonly composerParticipantId = computed(() =>
    resolvePlatformParticipantIdFromPath(this.urlPath()),
  );
}
