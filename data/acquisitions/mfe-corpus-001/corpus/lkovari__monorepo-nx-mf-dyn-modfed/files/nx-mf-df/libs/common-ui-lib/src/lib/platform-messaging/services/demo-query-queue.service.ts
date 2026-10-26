import { Injectable, signal } from '@angular/core';
import type { Bus } from '@lkovari/microfrontend-platform-communication/core';
import {
  DEMO_SHELL_H2R_QUERY_RESULT,
  demoShellH2rQueryResultSchema,
  type DemoShellH2rQuery,
} from '@nx-mf-df/contracts-platform-messaging';

export type DemoQueryQueueEntryStatus =
  | 'awaiting-response'
  | 'awaiting-remote'
  | 'completed'
  | 'failed';

export interface DemoQueryQueueEntry {
  readonly id: string;
  readonly kind: 'incoming' | 'outgoing';
  readonly messageId: string;
  readonly correlationId: string;
  readonly source: string;
  readonly target: string;
  readonly question: string;
  readonly answer?: string;
  readonly status: DemoQueryQueueEntryStatus;
  readonly createdAtUtc: string;
  readonly updatedAtUtc: string;
}

export interface DemoQueryResponsePrompt {
  readonly queueEntryId: string;
  readonly request: DemoShellH2rQuery;
  readonly responderId: string;
  readonly bus: Bus;
}

@Injectable({ providedIn: 'root' })
export class DemoQueryQueueService {
  readonly entries = signal<readonly DemoQueryQueueEntry[]>([]);

  readonly responsePrompt = signal<DemoQueryResponsePrompt | null>(null);

  readonly queueDialogOpen = signal(false);

  recordOutgoing(request: DemoShellH2rQuery): void {
    const now = new Date().toISOString();
    const target = request.target ?? '';
    const entry: DemoQueryQueueEntry = {
      id: crypto.randomUUID(),
      kind: 'outgoing',
      messageId: request.messageId,
      correlationId: request.correlationId,
      source: request.source,
      target,
      question: request.payload.q,
      status: 'awaiting-remote',
      createdAtUtc: now,
      updatedAtUtc: now,
    };
    this.prependEntry(entry);
  }

  handleIncomingQuery(request: DemoShellH2rQuery, responderId: string, bus: Bus): void {
    const now = new Date().toISOString();
    const entry: DemoQueryQueueEntry = {
      id: crypto.randomUUID(),
      kind: 'incoming',
      messageId: request.messageId,
      correlationId: request.correlationId,
      source: request.source,
      target: responderId,
      question: request.payload.q,
      status: 'awaiting-response',
      createdAtUtc: now,
      updatedAtUtc: now,
    };
    this.prependEntry(entry);
    this.responsePrompt.set({
      queueEntryId: entry.id,
      request,
      responderId,
      bus,
    });
  }

  completeOutgoing(messageId: string): void {
    this.updateEntryByMessageId(messageId, (entry) => {
      if (entry.kind !== 'outgoing') {
        return entry;
      }
      return {
        ...entry,
        status: 'completed',
        updatedAtUtc: new Date().toISOString(),
      };
    });
  }

  failOutgoing(messageId: string): void {
    this.updateEntryByMessageId(messageId, (entry) => {
      if (entry.kind !== 'outgoing') {
        return entry;
      }
      return {
        ...entry,
        status: 'failed',
        updatedAtUtc: new Date().toISOString(),
      };
    });
  }

  submitResponse(answer: string): boolean {
    const prompt = this.responsePrompt();
    if (prompt === null) {
      return false;
    }
    const trimmed = answer.trim();
    if (trimmed.length === 0) {
      return false;
    }
    const { request, responderId, bus, queueEntryId } = prompt;
    bus.publish(
      demoShellH2rQueryResultSchema.parse({
        messageName: DEMO_SHELL_H2R_QUERY_RESULT,
        messageVersion: 1,
        messageId: crypto.randomUUID(),
        correlationId: request.correlationId,
        causationId: request.messageId,
        source: responderId,
        occurredAtUtc: new Date().toISOString(),
        kind: 'event',
        eventKind: 'demo.shell.h2r.query.result',
        sensitivity: 'public',
        payload: { answer: trimmed },
      }),
    );
    this.updateEntryById(queueEntryId, (entry) => ({
      ...entry,
      answer: trimmed,
      status: 'completed',
      updatedAtUtc: new Date().toISOString(),
    }));
    this.responsePrompt.set(null);
    return true;
  }

  dismissResponsePrompt(): void {
    this.responsePrompt.set(null);
  }

  openQueueDialog(): void {
    this.queueDialogOpen.set(true);
  }

  closeQueueDialog(): void {
    this.queueDialogOpen.set(false);
  }

  private prependEntry(entry: DemoQueryQueueEntry): void {
    this.entries.update((items) => [entry, ...items].slice(0, 100));
  }

  private updateEntryById(
    id: string,
    updater: (entry: DemoQueryQueueEntry) => DemoQueryQueueEntry,
  ): void {
    this.entries.update((items) =>
      items.map((item) => (item.id === id ? updater(item) : item)),
    );
  }

  private updateEntryByMessageId(
    messageId: string,
    updater: (entry: DemoQueryQueueEntry) => DemoQueryQueueEntry,
  ): void {
    this.entries.update((items) =>
      items.map((item) => (item.messageId === messageId ? updater(item) : item)),
    );
  }
}
