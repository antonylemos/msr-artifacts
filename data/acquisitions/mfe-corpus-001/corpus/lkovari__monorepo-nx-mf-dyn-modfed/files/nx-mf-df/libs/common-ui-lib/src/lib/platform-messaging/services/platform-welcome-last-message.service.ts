import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import type { MessageBase } from '@lkovari/microfrontend-platform-communication/contracts';
import type { Unsubscribe } from '@lkovari/microfrontend-platform-communication/core';

import {
  PLATFORM_MESSAGE_V1,
  platformMessageEventSchema,
  type PlatformMessageEvent,
} from '@nx-mf-df/contracts-platform-messaging';
import { peekReplayMessagesForParticipant } from '../platform-message/platform-message-replay.storage';
import { RemotePlatformBusService } from './remote-platform-bus.service';
import { WELCOME_REMOTE_PARTICIPANT_ID } from '../welcome-remote-participant.token';

export interface PlatformWelcomeLastMessageParts {
  readonly source: string;
  readonly to: string;
  readonly title: string;
  readonly body: string;
}

@Injectable()
export class PlatformWelcomeLastMessageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly participantId = inject(WELCOME_REMOTE_PARTICIPANT_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly busToken = inject(BUS_TOKEN, { optional: true });
  private readonly remoteBus = inject(RemotePlatformBusService);

  private busUnsubscribe: Unsubscribe | null = null;

  readonly parts = signal<PlatformWelcomeLastMessageParts | null>(null);

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
    this.destroyRef.onDestroy(() => {
      this.detach();
    });
  }

  private trySubscribe(): void {
    if (this.busUnsubscribe !== null) {
      return;
    }
    const bus = this.busToken ?? this.remoteBus.getSharedBus();
    if (!bus) {
      return;
    }
    this.busUnsubscribe = bus.subscribe(
      PLATFORM_MESSAGE_V1,
      (message: MessageBase) => {
        const parsed = platformMessageEventSchema.safeParse(message);
        if (!parsed.success) {
          return;
        }
        this.updateLine(parsed.data);
      },
      { subscriberId: this.participantId },
    );
    this.applyReplay();
  }

  private detach(): void {
    if (this.busUnsubscribe !== null) {
      this.busUnsubscribe();
      this.busUnsubscribe = null;
    }
  }

  private applyReplay(): void {
    const items = peekReplayMessagesForParticipant(this.participantId);
    if (items.length === 0) {
      return;
    }
    const latest = items.reduce((best, cur) =>
      cur.occurredAtUtc > best.occurredAtUtc ? cur : best,
    );
    this.updateLine(latest);
  }

  private updateLine(evt: PlatformMessageEvent): void {
    const p = evt.payload;
    const t = evt.target;
    const to = t === undefined || t === '' ? 'all apps' : t;
    this.parts.set({
      source: evt.source,
      to,
      title: p.title,
      body: p.body,
    });
  }
}
