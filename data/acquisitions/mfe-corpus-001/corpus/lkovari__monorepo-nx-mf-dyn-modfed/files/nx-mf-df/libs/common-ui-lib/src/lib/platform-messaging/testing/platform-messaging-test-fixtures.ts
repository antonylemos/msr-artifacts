import {
  PLATFORM_MESSAGE_V1,
  createPlatformEventMessage,
  type PlatformMessageEvent,
} from '@nx-mf-df/contracts-platform-messaging';
import type { Bus } from '@lkovari/microfrontend-platform-communication/core';
import type { MessageBase } from '@lkovari/microfrontend-platform-communication/contracts';

export function testMessageUuid(suffix: number): string {
  return `11111111-1111-4111-8111-${suffix.toString(16).padStart(12, '0')}`;
}

export function createTestPlatformMessage(
  overrides: Partial<PlatformMessageEvent> = {},
): PlatformMessageEvent {
  return {
    messageName: PLATFORM_MESSAGE_V1,
    messageVersion: 1,
    messageId: testMessageUuid(1),
    correlationId: testMessageUuid(2),
    source: 'main-host',
    occurredAtUtc: '2026-05-31T10:00:00.000Z',
    kind: 'event',
    eventKind: 'platform.message',
    sensitivity: 'public',
    payload: {
      title: 'Test title',
      body: 'Test body',
      severity: 'info',
      createdByApp: 'main-host',
    },
    ...overrides,
  };
}

const STORAGE_KEY = 'nx-mf-df.platform-message.replay';

export function clearReplayStorage(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function createMockBus(
  overrides: Partial<Bus> = {},
): Bus {
  const noop = vi.fn();
  const bus: Bus = {
    appId: 'test-app',
    publish: vi.fn(),
    attemptPublish: vi.fn().mockReturnValue({ status: 'delivered' }),
    sendCommand: vi.fn().mockResolvedValue({ accepted: true }),
    request: vi.fn().mockResolvedValue({ messageName: 'test' }),
    subscribe: vi.fn().mockReturnValue(noop),
    observeAll: vi.fn().mockReturnValue(noop),
    registerBeforeDeliver: vi.fn().mockReturnValue(noop),
    dispose: vi.fn(),
    ...overrides,
  };
  return bus;
}

export function createMinimalMessageBase(
  overrides: Partial<MessageBase> = {},
): MessageBase {
  return {
    messageName: PLATFORM_MESSAGE_V1,
    messageVersion: 1,
    messageId: testMessageUuid(3),
    correlationId: testMessageUuid(4),
    source: 'main-host',
    occurredAtUtc: '2026-05-31T10:00:00.000Z',
    kind: 'event',
    sensitivity: 'public',
    ...overrides,
  };
}
