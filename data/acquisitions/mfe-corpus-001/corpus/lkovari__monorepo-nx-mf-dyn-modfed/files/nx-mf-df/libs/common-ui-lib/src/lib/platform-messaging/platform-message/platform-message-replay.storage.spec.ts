import {
  appendPlatformMessageForReplay,
  peekReplayMessagesForParticipant,
  takeReplayMessagesForParticipant,
} from './platform-message-replay.storage';
import {
  clearReplayStorage,
  createTestPlatformMessage,
  testMessageUuid,
} from '../testing/platform-messaging-test-fixtures';

describe('platform-message-replay.storage', () => {
  beforeEach(() => {
    clearReplayStorage();
  });

  it('returns empty store when session storage is empty', () => {
    expect(takeReplayMessagesForParticipant('main-host')).toEqual([]);
  });

  it('ignores invalid JSON in session storage', () => {
    sessionStorage.setItem(
      'nx-mf-df.platform-message.replay',
      'not-json',
    );
    expect(peekReplayMessagesForParticipant('main-host')).toEqual([]);
  });

  it('ignores non-array JSON in session storage', () => {
    sessionStorage.setItem(
      'nx-mf-df.platform-message.replay',
      JSON.stringify({ invalid: true }),
    );
    expect(peekReplayMessagesForParticipant('main-host')).toEqual([]);
  });

  it('filters invalid items from stored array', () => {
    sessionStorage.setItem(
      'nx-mf-df.platform-message.replay',
      JSON.stringify([{ messageName: 'invalid' }]),
    );
    expect(peekReplayMessagesForParticipant('main-host')).toEqual([]);
  });

  it('matches broadcast messages for any participant', () => {
    const broadcast = createTestPlatformMessage({
      messageId: testMessageUuid(10),
    });
    appendPlatformMessageForReplay(broadcast);
    expect(peekReplayMessagesForParticipant('mf_remote_a')).toHaveLength(1);
    expect(peekReplayMessagesForParticipant('main-host')).toHaveLength(1);
  });

  it('does not replay empty-string target entries filtered by schema', () => {
    const message = createTestPlatformMessage({
      messageId: testMessageUuid(11),
      target: '',
    });
    appendPlatformMessageForReplay(message);
    expect(peekReplayMessagesForParticipant('mf_remote_b')).toHaveLength(0);
  });

  it('matches only targeted participant', () => {
    const targeted = createTestPlatformMessage({
      messageId: testMessageUuid(12),
      target: 'mf_remote_a',
    });
    appendPlatformMessageForReplay(targeted);
    expect(peekReplayMessagesForParticipant('mf_remote_a')).toHaveLength(1);
    expect(peekReplayMessagesForParticipant('mf_remote_b')).toHaveLength(0);
  });

  it('take removes matching messages and keeps others', () => {
    const forA = createTestPlatformMessage({
      messageId: testMessageUuid(20),
      target: 'mf_remote_a',
    });
    const forB = createTestPlatformMessage({
      messageId: testMessageUuid(21),
      target: 'mf_remote_b',
    });
    appendPlatformMessageForReplay(forA);
    appendPlatformMessageForReplay(forB);

    const taken = takeReplayMessagesForParticipant('mf_remote_a');
    expect(taken).toHaveLength(1);
    expect(taken[0]?.messageId).toBe(testMessageUuid(20));
    expect(peekReplayMessagesForParticipant('mf_remote_b')).toHaveLength(1);
    expect(peekReplayMessagesForParticipant('mf_remote_a')).toHaveLength(0);
  });

  it('peek does not mutate storage', () => {
    const message = createTestPlatformMessage({ messageId: testMessageUuid(30) });
    appendPlatformMessageForReplay(message);
    peekReplayMessagesForParticipant('main-host');
    expect(peekReplayMessagesForParticipant('main-host')).toHaveLength(1);
  });

  it('trims store to last 50 messages', () => {
    for (let i = 0; i < 55; i += 1) {
      appendPlatformMessageForReplay(
        createTestPlatformMessage({
          messageId: testMessageUuid(100 + i),
          occurredAtUtc: `2026-05-31T10:00:${String(i).padStart(2, '0')}.000Z`,
        }),
      );
    }
    expect(peekReplayMessagesForParticipant('main-host')).toHaveLength(50);
    const ids = peekReplayMessagesForParticipant('main-host').map(
      (m) => m.messageId,
    );
    expect(ids[0]).toBe(testMessageUuid(105));
    expect(ids[49]).toBe(testMessageUuid(154));
  });
});
