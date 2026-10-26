import {
  platformMessageEventSchema,
  type PlatformMessageEvent,
} from '@nx-mf-df/contracts-platform-messaging';

const STORAGE_KEY = 'nx-mf-df.platform-message.replay';

function readStore(): PlatformMessageEvent[] {
  if (typeof sessionStorage === 'undefined') {
    return [];
  }
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (raw === null || raw === '') {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    const messages: PlatformMessageEvent[] = [];
    for (const item of parsed) {
      const result = platformMessageEventSchema.safeParse(item);
      if (result.success) {
        messages.push(result.data);
      }
    }
    return messages;
  } catch {
    return [];
  }
}

function writeStore(messages: PlatformMessageEvent[]): void {
  if (typeof sessionStorage === 'undefined') {
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function appendPlatformMessageForReplay(
  message: PlatformMessageEvent,
): void {
  const store = readStore();
  store.push(message);
  if (store.length > 50) {
    store.splice(0, store.length - 50);
  }
  writeStore(store);
}

function messageMatchesParticipant(
  message: PlatformMessageEvent,
  participantId: string,
): boolean {
  const target = message.target;
  if (target === undefined || target === '') {
    return true;
  }
  return target === participantId;
}

export function takeReplayMessagesForParticipant(
  participantId: string,
): PlatformMessageEvent[] {
  const store = readStore();
  const matching = store.filter((m) => messageMatchesParticipant(m, participantId));
  const remaining = store.filter((m) => !messageMatchesParticipant(m, participantId));
  writeStore(remaining);
  return matching;
}

export function peekReplayMessagesForParticipant(
  participantId: string,
): PlatformMessageEvent[] {
  return readStore().filter((m) => messageMatchesParticipant(m, participantId));
}
