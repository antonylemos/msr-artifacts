import { PLATFORM_MESSAGE_V1 } from './message-names';
import {
  createPlatformEventMessage,
  PLATFORM_BROADCAST_TARGET_SENTINEL,
} from './platform-message.factory';

describe('createPlatformEventMessage', () => {
  const baseInput = {
    source: 'main-host',
    sensitivity: 'public' as const,
    payload: {
      title: 'Hello',
      body: 'World',
      severity: 'info' as const,
      createdByApp: 'main-host',
    },
  };

  it('omits target for undefined broadcast', () => {
    const message = createPlatformEventMessage({
      ...baseInput,
      target: undefined,
    });
    expect(message.messageName).toBe(PLATFORM_MESSAGE_V1);
    expect('target' in message).toBe(false);
  });

  it('omits target for empty string', () => {
    const message = createPlatformEventMessage({
      ...baseInput,
      target: '',
    });
    expect('target' in message).toBe(false);
  });

  it('omits target for broadcast sentinel', () => {
    const message = createPlatformEventMessage({
      ...baseInput,
      target: PLATFORM_BROADCAST_TARGET_SENTINEL,
    });
    expect('target' in message).toBe(false);
  });

  it('includes explicit target when provided', () => {
    const message = createPlatformEventMessage({
      ...baseInput,
      target: 'mf_remote_a',
    });
    expect(message.target).toBe('mf_remote_a');
  });

  it('generates required message metadata', () => {
    const message = createPlatformEventMessage({
      ...baseInput,
      target: 'mf_remote_b',
    });
    expect(message.messageId.length).toBeGreaterThan(0);
    expect(message.correlationId.length).toBeGreaterThan(0);
    expect(message.occurredAtUtc.length).toBeGreaterThan(0);
    expect(message.kind).toBe('event');
    expect(message.eventKind).toBe('platform.message');
  });
});
