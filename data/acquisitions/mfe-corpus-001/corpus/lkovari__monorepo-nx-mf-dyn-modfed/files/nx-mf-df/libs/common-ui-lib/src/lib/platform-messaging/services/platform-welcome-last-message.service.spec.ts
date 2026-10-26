import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import { MF_REMOTE_A_ID } from '@nx-mf-df/contracts-platform-messaging';

import { appendPlatformMessageForReplay } from '../platform-message/platform-message-replay.storage';
import {
  clearReplayStorage,
  createTestPlatformMessage,
  testMessageUuid,
} from '../testing/platform-messaging-test-fixtures';
import { PlatformWelcomeLastMessageService } from './platform-welcome-last-message.service';
import { RemotePlatformBusService } from './remote-platform-bus.service';
import { WELCOME_REMOTE_PARTICIPANT_ID } from '../welcome-remote-participant.token';

describe('PlatformWelcomeLastMessageService', () => {
  beforeEach(() => {
    clearReplayStorage();
  });

  it('peeks latest replay message by occurredAtUtc', () => {
    appendPlatformMessageForReplay(
      createTestPlatformMessage({
        messageId: testMessageUuid(50),
        occurredAtUtc: '2026-05-31T09:00:00.000Z',
        payload: {
          title: 'Old',
          body: 'Old body',
          severity: 'info',
          createdByApp: 'main-host',
        },
      }),
    );
    appendPlatformMessageForReplay(
      createTestPlatformMessage({
        messageId: testMessageUuid(51),
        occurredAtUtc: '2026-05-31T11:00:00.000Z',
        payload: {
          title: 'Latest',
          body: 'New body',
          severity: 'success',
          createdByApp: 'main-host',
        },
      }),
    );
    TestBed.configureTestingModule({
      providers: [
        PlatformWelcomeLastMessageService,
        RemotePlatformBusService,
        { provide: WELCOME_REMOTE_PARTICIPANT_ID, useValue: MF_REMOTE_A_ID },
        {
          provide: BUS_TOKEN,
          useValue: { subscribe: vi.fn().mockReturnValue(vi.fn()) },
        },
      ],
    });
    const service = TestBed.inject(PlatformWelcomeLastMessageService);
    expect(service.parts()?.title).toBe('Latest');
  });

  it('maps broadcast target to all apps label', () => {
    let handler: ((message: unknown) => void) | undefined;
    TestBed.configureTestingModule({
      providers: [
        PlatformWelcomeLastMessageService,
        RemotePlatformBusService,
        { provide: WELCOME_REMOTE_PARTICIPANT_ID, useValue: MF_REMOTE_A_ID },
        {
          provide: BUS_TOKEN,
          useValue: {
            subscribe: (_name: string, cb: (message: unknown) => void) => {
              handler = cb;
              return vi.fn();
            },
          },
        },
      ],
    });
    const service = TestBed.inject(PlatformWelcomeLastMessageService);
    handler?.(
      createTestPlatformMessage({
        messageId: testMessageUuid(52),
        target: undefined,
        payload: {
          title: 'Hello all',
          body: 'Everyone',
          severity: 'info',
          createdByApp: 'main-host',
        },
      }),
    );
    expect(service.parts()?.to).toBe('all apps');
  });

  it('shows explicit target id', () => {
    let handler: ((message: unknown) => void) | undefined;
    TestBed.configureTestingModule({
      providers: [
        PlatformWelcomeLastMessageService,
        RemotePlatformBusService,
        { provide: WELCOME_REMOTE_PARTICIPANT_ID, useValue: MF_REMOTE_A_ID },
        {
          provide: BUS_TOKEN,
          useValue: {
            subscribe: (_name: string, cb: (message: unknown) => void) => {
              handler = cb;
              return vi.fn();
            },
          },
        },
      ],
    });
    const service = TestBed.inject(PlatformWelcomeLastMessageService);
    handler?.(
      createTestPlatformMessage({
        messageId: testMessageUuid(53),
        target: 'mf_remote_b',
      }),
    );
    expect(service.parts()?.to).toBe('mf_remote_b');
  });

  it('does not initialize on server platform', () => {
    TestBed.configureTestingModule({
      providers: [
        PlatformWelcomeLastMessageService,
        RemotePlatformBusService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: WELCOME_REMOTE_PARTICIPANT_ID, useValue: MF_REMOTE_A_ID },
        { provide: BUS_TOKEN, useValue: { subscribe: vi.fn() } },
      ],
    });
    const service = TestBed.inject(PlatformWelcomeLastMessageService);
    expect(service.parts()).toBeNull();
  });
});
