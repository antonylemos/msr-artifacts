import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import {
  MF_REMOTE_A_ID,
  PLATFORM_BRIDGE_ACCESS_TOKEN,
  PLATFORM_MESSAGE_V1,
  SHELL_HOST_ID,
} from '@nx-mf-df/contracts-platform-messaging';

import { appendPlatformMessageForReplay } from '../platform-message/platform-message-replay.storage';
import {
  clearReplayStorage,
  createTestPlatformMessage,
  testMessageUuid,
} from '../testing/platform-messaging-test-fixtures';
import {
  PLATFORM_MESSAGE_IGNORE_SELF_ORIGINATED,
  PLATFORM_PARTICIPANT_ID,
} from '../tokens';
import { PlatformMessageListenerService } from './platform-message-listener.service';
import { RemotePlatformBusService } from './remote-platform-bus.service';

describe('PlatformMessageListenerService', () => {
  const bridgeKey = '__MFE_BRIDGE__';
  let routerEvents: Subject<NavigationEnd>;
  let routerUrl: string;
  let messageHandler: ((message: unknown) => void) | undefined;
  let messageServiceAdd: ReturnType<typeof vi.fn>;

  afterEach(() => {
    Reflect.deleteProperty(window, bridgeKey);
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    clearReplayStorage();
    routerEvents = new Subject();
    routerUrl = '/';
    messageHandler = undefined;
    messageServiceAdd = vi.fn();
    const bus = {
      subscribe: (
        _name: string,
        handler: (message: unknown) => void,
      ) => {
        messageHandler = handler;
        return vi.fn();
      },
    };
    TestBed.configureTestingModule({
      providers: [
        PlatformMessageListenerService,
        RemotePlatformBusService,
        { provide: BUS_TOKEN, useValue: bus },
        {
          provide: Router,
          useValue: {
            get url() {
              return routerUrl;
            },
            events: routerEvents.asObservable(),
          },
        },
        { provide: MessageService, useValue: { add: messageServiceAdd } },
      ],
    });
    TestBed.inject(PlatformMessageListenerService);
  });

  it('resolves shell participant on root route', () => {
    const service = TestBed.inject(PlatformMessageListenerService);
    expect(service.viewingParticipantId()).toBe(SHELL_HOST_ID);
  });

  it('resolves remote participant from route', () => {
    routerUrl = '/mf_remote_a/feature';
    routerEvents.next(new NavigationEnd(1, routerUrl, routerUrl));
    const service = TestBed.inject(PlatformMessageListenerService);
    expect(service.viewingParticipantId()).toBe(MF_REMOTE_A_ID);
  });

  it('ignores invalid messages', () => {
    const service = TestBed.inject(PlatformMessageListenerService);
    messageHandler?.({ messageName: 'invalid' });
    expect(service.history()).toHaveLength(0);
  });

  it('records valid messages in history', () => {
    const service = TestBed.inject(PlatformMessageListenerService);
    const message = createTestPlatformMessage({ messageId: testMessageUuid(40) });
    messageHandler?.(message);
    expect(service.history()).toHaveLength(1);
    expect(service.history()[0]?.title).toBe('Test title');
  });

  it('deduplicates messages by messageId', () => {
    const service = TestBed.inject(PlatformMessageListenerService);
    const message = createTestPlatformMessage({ messageId: testMessageUuid(41) });
    messageHandler?.(message);
    messageHandler?.(message);
    expect(service.history()).toHaveLength(1);
  });

  it('filters visible history by participant target', () => {
    const service = TestBed.inject(PlatformMessageListenerService);
    messageHandler?.(
      createTestPlatformMessage({
        messageId: testMessageUuid(42),
        target: undefined,
      }),
    );
    messageHandler?.(
      createTestPlatformMessage({
        messageId: testMessageUuid(43),
        target: 'mf_remote_a',
        payload: {
          title: 'Remote A only',
          body: 'Body',
          severity: 'info',
          createdByApp: 'main-host',
        },
      }),
    );
    expect(service.visibleHistory()).toHaveLength(1);
    routerUrl = '/mf_remote_a/feature';
    routerEvents.next(new NavigationEnd(2, routerUrl, routerUrl));
    expect(service.visibleHistory()).toHaveLength(2);
    routerUrl = '/mf_remote_b/feature';
    routerEvents.next(new NavigationEnd(3, routerUrl, routerUrl));
    expect(service.visibleHistory()).toHaveLength(1);
    expect(service.visibleHistory()[0]?.title).toBe('Test title');
  });

  it('ignores self-originated messages when configured', () => {
    TestBed.resetTestingModule();
    clearReplayStorage();
    const bus = {
      subscribe: (
        _name: string,
        handler: (message: unknown) => void,
      ) => {
        messageHandler = handler;
        return vi.fn();
      },
    };
    TestBed.configureTestingModule({
      providers: [
        PlatformMessageListenerService,
        RemotePlatformBusService,
        { provide: BUS_TOKEN, useValue: bus },
        {
          provide: Router,
          useValue: {
            url: '/mf_remote_a',
            events: new Subject().asObservable(),
          },
        },
        { provide: PLATFORM_MESSAGE_IGNORE_SELF_ORIGINATED, useValue: true },
        { provide: PLATFORM_PARTICIPANT_ID, useValue: MF_REMOTE_A_ID },
        { provide: MessageService, useValue: { add: vi.fn() } },
      ],
    });
    const service = TestBed.inject(PlatformMessageListenerService);
    messageHandler?.(
      createTestPlatformMessage({
        messageId: testMessageUuid(44),
        source: MF_REMOTE_A_ID,
      }),
    );
    expect(service.history()).toHaveLength(0);
  });

  it('replays stored messages on subscribe', () => {
    appendPlatformMessageForReplay(
      createTestPlatformMessage({ messageId: testMessageUuid(45) }),
    );
    TestBed.resetTestingModule();
    appendPlatformMessageForReplay(
      createTestPlatformMessage({ messageId: testMessageUuid(45) }),
    );
    const bus = {
      subscribe: vi.fn().mockImplementation((_name, handler) => {
        messageHandler = handler;
        return vi.fn();
      }),
    };
    TestBed.configureTestingModule({
      providers: [
        PlatformMessageListenerService,
        RemotePlatformBusService,
        { provide: BUS_TOKEN, useValue: bus },
        {
          provide: Router,
          useValue: {
            url: '/',
            events: new Subject().asObservable(),
          },
        },
        { provide: MessageService, useValue: { add: messageServiceAdd } },
      ],
    });
    const service = TestBed.inject(PlatformMessageListenerService);
    expect(service.history()).toHaveLength(1);
  });

  it('shows toast for success severity', () => {
    const service = TestBed.inject(PlatformMessageListenerService);
    messageHandler?.(
      createTestPlatformMessage({
        messageId: testMessageUuid(46),
        payload: {
          title: 'Done',
          body: 'All good',
          severity: 'success',
          createdByApp: 'main-host',
        },
      }),
    );
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success', summary: 'Done' }),
    );
    expect(service.history()).toHaveLength(1);
  });

  it('does not initialize on server platform', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        PlatformMessageListenerService,
        RemotePlatformBusService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: BUS_TOKEN, useValue: { subscribe: vi.fn() } },
        {
          provide: Router,
          useValue: { url: '/', events: new Subject().asObservable() },
        },
      ],
    });
    const service = TestBed.inject(PlatformMessageListenerService);
    expect(service.history()).toHaveLength(0);
  });

  it('subscribes with platform message contract name', () => {
    const subscribe = vi.fn().mockReturnValue(vi.fn());
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        PlatformMessageListenerService,
        RemotePlatformBusService,
        { provide: BUS_TOKEN, useValue: { subscribe } },
        {
          provide: Router,
          useValue: { url: '/', events: new Subject().asObservable() },
        },
      ],
    });
    TestBed.inject(PlatformMessageListenerService);
    expect(subscribe).toHaveBeenCalledWith(
      PLATFORM_MESSAGE_V1,
      expect.any(Function),
      { subscriberId: SHELL_HOST_ID },
    );
  });
});

describe('PlatformMessageListenerService remote bridge fallback', () => {
  const bridgeKey = '__MFE_BRIDGE__';

  afterEach(() => {
    Reflect.deleteProperty(window, bridgeKey);
    vi.useRealTimers();
  });

  it('subscribes when window bridge becomes available without BUS_TOKEN', () => {
    vi.useFakeTimers();
    const subscribe = vi.fn().mockReturnValue(vi.fn());
    const bus = { subscribe };
    clearReplayStorage();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        PlatformMessageListenerService,
        RemotePlatformBusService,
        {
          provide: Router,
          useValue: {
            url: '/mf_remote_a',
            events: new Subject().asObservable(),
          },
        },
        { provide: MessageService, useValue: { add: vi.fn() } },
        { provide: PLATFORM_PARTICIPANT_ID, useValue: MF_REMOTE_A_ID },
      ],
    });
    TestBed.inject(PlatformMessageListenerService);
    expect(subscribe).not.toHaveBeenCalled();

    Reflect.set(window, bridgeKey, {
      appId: 'main-host',
      remotes: ['mf_remote_a'],
      getBus: (token?: string) =>
        token === PLATFORM_BRIDGE_ACCESS_TOKEN ? bus : null,
      tryPublish: () => ({ accepted: true }),
      dispose: () => undefined,
    });
    vi.advanceTimersByTime(100);
    expect(subscribe).toHaveBeenCalledWith(
      PLATFORM_MESSAGE_V1,
      expect.any(Function),
      { subscriberId: MF_REMOTE_A_ID },
    );
  });
});
