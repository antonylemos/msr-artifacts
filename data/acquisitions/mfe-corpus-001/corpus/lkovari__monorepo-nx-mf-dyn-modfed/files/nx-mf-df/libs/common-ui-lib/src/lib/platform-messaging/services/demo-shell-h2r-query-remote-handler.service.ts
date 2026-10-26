import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import type { Unsubscribe } from '@lkovari/microfrontend-platform-communication/core';
import {
  DEMO_SHELL_H2R_QUERY,
  demoShellH2rQuerySchema,
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
  registerPlatformMessageHandler,
  resolvePlatformParticipantIdFromPath,
} from '@nx-mf-df/contracts-platform-messaging';
import { filter } from 'rxjs';

import { PLATFORM_PARTICIPANT_ID } from '../tokens';
import { DemoQueryQueueService } from './demo-query-queue.service';
import { RemotePlatformBusService } from './remote-platform-bus.service';

const REMOTE_PARTICIPANT_IDS = [
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
] as const;

@Injectable({ providedIn: 'root' })
export class DemoShellH2rQueryRemoteHandlerService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly remoteBus = inject(RemotePlatformBusService);
  private readonly busToken = inject(BUS_TOKEN, { optional: true });
  private readonly participantFromEnv = inject(PLATFORM_PARTICIPANT_ID, {
    optional: true,
  });
  private readonly demoQueue = inject(DemoQueryQueueService);

  private readonly unsubscribes = new Map<string, Unsubscribe>();

  private lastSubscribedKey: string | null = null;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.trySubscribe();
    if (!this.busToken) {
      effect(() => {
        this.remoteBus.bridgeAvailable();
        this.trySubscribe();
      });
    }
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.trySubscribe();
      });
    this.destroyRef.onDestroy(() => {
      this.detachAll();
    });
  }

  private resolveSubscriberIds(): readonly string[] {
    const envId = this.participantFromEnv;
    if (isRemoteParticipantId(envId)) {
      return [envId];
    }
    if (this.busToken) {
      return REMOTE_PARTICIPANT_IDS;
    }
    const routeId = resolvePlatformParticipantIdFromPath(
      this.router.url.split('?')[0] ?? '',
    );
    if (isRemoteParticipantId(routeId)) {
      return [routeId];
    }
    return [];
  }

  private trySubscribe(): void {
    const subscriberIds = this.resolveSubscriberIds();
    const key = subscriberIds.join('|');
    if (
      this.lastSubscribedKey === key &&
      this.unsubscribes.size === subscriberIds.length &&
      subscriberIds.length > 0
    ) {
      return;
    }
    this.detachAll();
    const bus = this.busToken ?? this.remoteBus.getSharedBus();
    if (!bus || subscriberIds.length === 0) {
      this.lastSubscribedKey = null;
      return;
    }
    this.lastSubscribedKey = key;
    for (const subscriberId of subscriberIds) {
      if (this.unsubscribes.has(subscriberId)) {
        continue;
      }
      const unsubscribe = registerPlatformMessageHandler(
        { bus, subscriberId },
        {
          messageName: DEMO_SHELL_H2R_QUERY,
          handler: (message) => {
            const parsed = demoShellH2rQuerySchema.safeParse(message);
            if (!parsed.success) {
              return;
            }
            const req = parsed.data;
            this.demoQueue.handleIncomingQuery(req, subscriberId, bus);
          },
        },
      );
      this.unsubscribes.set(subscriberId, unsubscribe);
    }
  }

  private detachAll(): void {
    for (const unsubscribe of this.unsubscribes.values()) {
      unsubscribe();
    }
    this.unsubscribes.clear();
    this.lastSubscribedKey = null;
  }
}

function isRemoteParticipantId(
  value: string | null | undefined,
): value is (typeof REMOTE_PARTICIPANT_IDS)[number] {
  return (
    value === MF_REMOTE_A_ID ||
    value === MF_REMOTE_B_ID ||
    value === MF_REMOTE_C_ID
  );
}

export function provideDemoShellH2rQueryRemoteHandler() {
  return DemoShellH2rQueryRemoteHandlerService;
}
