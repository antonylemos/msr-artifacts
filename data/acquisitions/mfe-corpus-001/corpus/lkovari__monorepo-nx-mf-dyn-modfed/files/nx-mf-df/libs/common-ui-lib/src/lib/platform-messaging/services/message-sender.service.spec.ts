import { TestBed } from '@angular/core/testing';
import { HOST_BRIDGE_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import {
  createPlatformEventMessage,
  PLATFORM_BRIDGE_ACCESS_TOKEN,
} from '@nx-mf-df/contracts-platform-messaging';

import {
  peekReplayMessagesForParticipant,
} from '../platform-message/platform-message-replay.storage';
import { clearReplayStorage } from '../testing/platform-messaging-test-fixtures';
import { MessageSenderService } from './message-sender.service';
import { RemotePlatformBusService } from './remote-platform-bus.service';

describe('MessageSenderService', () => {
  beforeEach(() => {
    clearReplayStorage();
  });

  it('returns null when no bridge is available', () => {
    TestBed.configureTestingModule({
      providers: [MessageSenderService, RemotePlatformBusService],
    });
    const service = TestBed.inject(MessageSenderService);
    const message = createPlatformEventMessage({
      source: 'main-host',
      target: undefined,
      sensitivity: 'public',
      payload: {
        title: 'T',
        body: 'B',
        severity: 'info',
        createdByApp: 'main-host',
      },
    });
    expect(service.trySend(message)).toBeNull();
  });

  it('uses host bridge when injected', () => {
    const tryPublish = vi.fn().mockReturnValue({ accepted: true });
    TestBed.configureTestingModule({
      providers: [
        MessageSenderService,
        RemotePlatformBusService,
        {
          provide: HOST_BRIDGE_TOKEN,
          useValue: { tryPublish },
        },
      ],
    });
    const service = TestBed.inject(MessageSenderService);
    const message = createPlatformEventMessage({
      source: 'main-host',
      target: 'mf_remote_a',
      sensitivity: 'public',
      payload: {
        title: 'T',
        body: 'B',
        severity: 'info',
        createdByApp: 'main-host',
      },
    });
    const result = service.trySend(message);
    expect(result?.accepted).toBe(true);
    expect(tryPublish).toHaveBeenCalledOnce();
    expect(tryPublish).toHaveBeenCalledWith(
      message,
      PLATFORM_BRIDGE_ACCESS_TOKEN,
    );
  });

  it('appends accepted platform messages to replay storage', () => {
    const tryPublish = vi.fn().mockReturnValue({ accepted: true });
    TestBed.configureTestingModule({
      providers: [
        MessageSenderService,
        RemotePlatformBusService,
        {
          provide: HOST_BRIDGE_TOKEN,
          useValue: { tryPublish },
        },
      ],
    });
    const service = TestBed.inject(MessageSenderService);
    const message = createPlatformEventMessage({
      source: 'main-host',
      target: undefined,
      sensitivity: 'public',
      payload: {
        title: 'Replay',
        body: 'Stored',
        severity: 'info',
        createdByApp: 'main-host',
      },
    });
    service.trySend(message);
    expect(peekReplayMessagesForParticipant('main-host').length).toBeGreaterThan(
      0,
    );
  });

  it('does not append when publish is rejected', () => {
    const tryPublish = vi.fn().mockReturnValue({
      accepted: false,
      message: 'rejected',
    });
    TestBed.configureTestingModule({
      providers: [
        MessageSenderService,
        RemotePlatformBusService,
        {
          provide: HOST_BRIDGE_TOKEN,
          useValue: { tryPublish },
        },
      ],
    });
    const service = TestBed.inject(MessageSenderService);
    const message = createPlatformEventMessage({
      source: 'main-host',
      target: undefined,
      sensitivity: 'public',
      payload: {
        title: 'Skip',
        body: 'Me',
        severity: 'info',
        createdByApp: 'main-host',
      },
    });
    service.trySend(message);
    expect(peekReplayMessagesForParticipant('main-host')).toHaveLength(0);
  });
});
