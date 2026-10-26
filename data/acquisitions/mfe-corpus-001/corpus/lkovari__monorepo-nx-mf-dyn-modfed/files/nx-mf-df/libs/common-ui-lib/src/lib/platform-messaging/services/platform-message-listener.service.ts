import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import type { MessageBase } from '@lkovari/microfrontend-platform-communication/contracts';
import type { Unsubscribe } from '@lkovari/microfrontend-platform-communication/core';
import {
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
  PLATFORM_MESSAGE_V1,
  platformMessageEventSchema,
  SHELL_HOST_ID,
  type PlatformMessageEvent,
} from '@nx-mf-df/contracts-platform-messaging';
import { filter } from 'rxjs';

import { takeReplayMessagesForParticipant } from '../platform-message/platform-message-replay.storage';
import {
  PLATFORM_MESSAGE_IGNORE_SELF_ORIGINATED,
  PLATFORM_PARTICIPANT_ID,
} from '../tokens';
import { RemotePlatformBusService } from './remote-platform-bus.service';

export interface PlatformMessageHistoryEntry {
  readonly id: string;
  readonly messageName: string;
  readonly eventKind: string;
  readonly source: string;
  readonly target: string | undefined;
  readonly severity: 'info' | 'success' | 'warn' | 'error';
  readonly title: string;
  readonly body: string;
  readonly occurredAtUtc: string;
}

@Injectable({ providedIn: 'root' })
export class PlatformMessageListenerService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly participantFromEnv = inject(PLATFORM_PARTICIPANT_ID, {
    optional: true,
  });
  private readonly busToken = inject(BUS_TOKEN, { optional: true });
  private readonly remoteBus = inject(RemotePlatformBusService);
  private readonly messageService = inject(MessageService, { optional: true });
  private readonly ignoreSelfOriginated = inject(
    PLATFORM_MESSAGE_IGNORE_SELF_ORIGINATED,
    { optional: true },
  );

  private busUnsubscribe: Unsubscribe | null = null;

  private lastSubscribedParticipant: string | null = null;

  private readonly seenMessageIds = new Set<string>();

  readonly history = signal<readonly PlatformMessageHistoryEntry[]>([]);

  readonly viewingParticipantId = signal(SHELL_HOST_ID);

  readonly visibleHistory = computed(() => {
    const pid = this.viewingParticipantId();
    return this.history().filter((e) => {
      const t = e.target;
      if (t === undefined || t === '') {
        return true;
      }
      return t === pid;
    });
  });

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.syncViewingParticipant();
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
        this.syncViewingParticipant();
        this.trySubscribe();
      });
    this.destroyRef.onDestroy(() => {
      this.detachBusListener();
    });
  }

  private resolveParticipantId(): string {
    const path = this.router.url.split('?')[0];
    const segments = path.split('/').filter(Boolean);
    const top = segments[0];
    if (top === 'mf_remote_a') {
      return MF_REMOTE_A_ID;
    }
    if (top === 'mf_remote_b') {
      return MF_REMOTE_B_ID;
    }
    if (top === 'mf_remote_c') {
      return MF_REMOTE_C_ID;
    }
    return this.participantFromEnv ?? SHELL_HOST_ID;
  }

  private syncViewingParticipant(): void {
    this.viewingParticipantId.set(this.resolveParticipantId());
  }

  private trySubscribe(): void {
    const participantId = this.resolveParticipantId();
    if (
      this.busUnsubscribe !== null &&
      this.lastSubscribedParticipant === participantId
    ) {
      return;
    }
    this.detachBusListener();
    const bus = this.busToken ?? this.remoteBus.getSharedBus();
    if (!bus) {
      this.lastSubscribedParticipant = null;
      return;
    }
    this.lastSubscribedParticipant = participantId;
    this.busUnsubscribe = bus.subscribe(
      PLATFORM_MESSAGE_V1,
      (message: MessageBase) => {
        const parsed = platformMessageEventSchema.safeParse(message);
        if (!parsed.success) {
          return;
        }
        const evt = parsed.data;
        const pid = this.resolveParticipantId();
        if (this.ignoreSelfOriginated === true && evt.source === pid) {
          return;
        }
        this.recordAndToast(evt);
      },
      { subscriberId: participantId },
    );
    this.applyReplayedMessages(participantId);
  }

  private detachBusListener(): void {
    if (this.busUnsubscribe !== null) {
      this.busUnsubscribe();
      this.busUnsubscribe = null;
    }
  }

  private applyReplayedMessages(participantId: string): void {
    for (const evt of takeReplayMessagesForParticipant(participantId)) {
      const pid = participantId;
      if (this.ignoreSelfOriginated === true && evt.source === pid) {
        continue;
      }
      this.appendHistory(evt);
    }
  }

  private appendHistory(evt: PlatformMessageEvent): void {
    if (this.seenMessageIds.has(evt.messageId)) {
      return;
    }
    this.seenMessageIds.add(evt.messageId);
    if (this.seenMessageIds.size > 200) {
      this.seenMessageIds.clear();
    }
    const payload = evt.payload;
    const entry: PlatformMessageHistoryEntry = {
      id: crypto.randomUUID(),
      messageName: evt.messageName,
      eventKind: evt.eventKind,
      source: evt.source,
      target: evt.target,
      severity: payload.severity,
      title: payload.title,
      body: payload.body,
      occurredAtUtc: evt.occurredAtUtc,
    };
    this.history.update((items) => [...items, entry]);
  }

  private recordAndToast(evt: PlatformMessageEvent): void {
    this.appendHistory(evt);
    const payload = evt.payload;
    const summary = `${payload.title}`;
    const detail = `[${evt.messageName}] ${evt.source} → ${evt.target ?? 'broadcast'} · ${payload.body}`;
    const svc = this.messageService;
    if (!svc) {
      return;
    }
    const severity = payload.severity;
    if (severity === 'success') {
      svc.add({ severity: 'success', summary, detail, life: 6000 });
      return;
    }
    if (severity === 'warn') {
      svc.add({ severity: 'warn', summary, detail, life: 6000 });
      return;
    }
    if (severity === 'error') {
      svc.add({ severity: 'error', summary, detail, life: 8000 });
      return;
    }
    svc.add({ severity: 'info', summary, detail, life: 6000 });
  }
}
