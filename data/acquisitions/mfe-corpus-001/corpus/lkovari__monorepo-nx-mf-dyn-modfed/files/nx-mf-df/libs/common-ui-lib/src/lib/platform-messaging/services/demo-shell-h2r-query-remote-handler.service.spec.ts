import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import {
  createDemoShellH2rQuery,
  DEMO_SHELL_H2R_QUERY,
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
  PLATFORM_BRIDGE_ACCESS_TOKEN,
} from '@nx-mf-df/contracts-platform-messaging';
import { Subject } from 'rxjs';

import { DemoQueryQueueService } from './demo-query-queue.service';
import { DemoShellH2rQueryRemoteHandlerService } from './demo-shell-h2r-query-remote-handler.service';
import { RemotePlatformBusService } from './remote-platform-bus.service';
import { PLATFORM_PARTICIPANT_ID } from '../tokens';

describe('DemoShellH2rQueryRemoteHandlerService', () => {
  const bridgeKey = '__MFE_BRIDGE__';
  let handlers: Map<string, (message: unknown) => void>;
  let routerEvents: Subject<NavigationEnd>;
  let routerUrl: string;

  afterEach(() => {
    Reflect.deleteProperty(window, bridgeKey);
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    handlers = new Map();
    routerEvents = new Subject();
    routerUrl = '/mf_remote_a';
    const bus = {
      subscribe: (
        messageName: string,
        handler: (message: unknown) => void,
        opts: { subscriberId: string },
      ) => {
        handlers.set(`${messageName}:${opts.subscriberId}`, handler);
        return vi.fn();
      },
    };
    TestBed.configureTestingModule({
      providers: [
        DemoShellH2rQueryRemoteHandlerService,
        DemoQueryQueueService,
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
      ],
    });
    TestBed.inject(DemoShellH2rQueryRemoteHandlerService);
  });

  it('handles valid incoming query on standalone remote route', () => {
    const queue = TestBed.inject(DemoQueryQueueService);
    const handler = handlers.get(`${DEMO_SHELL_H2R_QUERY}:${MF_REMOTE_A_ID}`);
    expect(handler).toBeDefined();
    const req = createDemoShellH2rQuery({
      source: 'main-host',
      target: MF_REMOTE_A_ID,
      payload: { q: 'Hello remote A?' },
    });
    handler?.(req);
    expect(queue.responsePrompt()).not.toBeNull();
    expect(queue.entries()[0]?.question).toBe('Hello remote A?');
  });

  it('ignores invalid query payloads', () => {
    const queue = TestBed.inject(DemoQueryQueueService);
    const handler = handlers.get(`${DEMO_SHELL_H2R_QUERY}:${MF_REMOTE_A_ID}`);
    handler?.({ messageName: DEMO_SHELL_H2R_QUERY, invalid: true });
    expect(queue.entries()).toHaveLength(0);
  });

  it('subscribes all remotes when host bus token is present', () => {
    TestBed.resetTestingModule();
    handlers = new Map();
    const bus = {
      subscribe: (
        messageName: string,
        handler: (message: unknown) => void,
        opts: { subscriberId: string },
      ) => {
        handlers.set(`${messageName}:${opts.subscriberId}`, handler);
        return vi.fn();
      },
    };
    TestBed.configureTestingModule({
      providers: [
        DemoShellH2rQueryRemoteHandlerService,
        DemoQueryQueueService,
        RemotePlatformBusService,
        { provide: BUS_TOKEN, useValue: bus },
        {
          provide: Router,
          useValue: {
            url: '/',
            events: new Subject().asObservable(),
          },
        },
      ],
    });
    TestBed.inject(DemoShellH2rQueryRemoteHandlerService);
    expect(handlers.has(`${DEMO_SHELL_H2R_QUERY}:${MF_REMOTE_A_ID}`)).toBe(
      true,
    );
    expect(handlers.has(`${DEMO_SHELL_H2R_QUERY}:${MF_REMOTE_B_ID}`)).toBe(
      true,
    );
    expect(handlers.has(`${DEMO_SHELL_H2R_QUERY}:${MF_REMOTE_C_ID}`)).toBe(
      true,
    );
  });

  it('uses PLATFORM_PARTICIPANT_ID when set on standalone remote', () => {
    TestBed.resetTestingModule();
    handlers = new Map();
    routerUrl = '/';
    const bus = {
      subscribe: (
        messageName: string,
        handler: (message: unknown) => void,
        opts: { subscriberId: string },
      ) => {
        handlers.set(`${messageName}:${opts.subscriberId}`, handler);
        return vi.fn();
      },
    };
    TestBed.configureTestingModule({
      providers: [
        DemoShellH2rQueryRemoteHandlerService,
        DemoQueryQueueService,
        RemotePlatformBusService,
        { provide: BUS_TOKEN, useValue: bus },
        { provide: PLATFORM_PARTICIPANT_ID, useValue: MF_REMOTE_B_ID },
        {
          provide: Router,
          useValue: {
            url: '/',
            events: new Subject().asObservable(),
          },
        },
      ],
    });
    TestBed.inject(DemoShellH2rQueryRemoteHandlerService);
    expect(handlers.has(`${DEMO_SHELL_H2R_QUERY}:${MF_REMOTE_B_ID}`)).toBe(
      true,
    );
    expect(handlers.has(`${DEMO_SHELL_H2R_QUERY}:${MF_REMOTE_A_ID}`)).toBe(
      false,
    );
  });

  it('does not subscribe without bus on server platform', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        DemoShellH2rQueryRemoteHandlerService,
        DemoQueryQueueService,
        RemotePlatformBusService,
        { provide: PLATFORM_ID, useValue: 'server' },
        {
          provide: Router,
          useValue: {
            url: '/mf_remote_a',
            events: new Subject().asObservable(),
          },
        },
      ],
    });
    expect(() => TestBed.inject(DemoShellH2rQueryRemoteHandlerService)).not.toThrow();
  });

  it('subscribes via window bridge when BUS_TOKEN is absent', () => {
    vi.useFakeTimers();
    const bridgeHandlers = new Map<string, (message: unknown) => void>();
    const bus = {
      subscribe: (
        messageName: string,
        handler: (message: unknown) => void,
        opts: { subscriberId: string },
      ) => {
        bridgeHandlers.set(`${messageName}:${opts.subscriberId}`, handler);
        return vi.fn();
      },
    };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        DemoShellH2rQueryRemoteHandlerService,
        DemoQueryQueueService,
        RemotePlatformBusService,
        {
          provide: Router,
          useValue: {
            url: '/mf_remote_a',
            events: new Subject().asObservable(),
          },
        },
        { provide: PLATFORM_PARTICIPANT_ID, useValue: MF_REMOTE_A_ID },
      ],
    });
    TestBed.inject(DemoShellH2rQueryRemoteHandlerService);
    expect(bridgeHandlers.size).toBe(0);

    Reflect.set(window, '__MFE_BRIDGE__', {
      appId: 'main-host',
      remotes: ['mf_remote_a'],
      getBus: (token?: string) =>
        token === PLATFORM_BRIDGE_ACCESS_TOKEN ? bus : null,
      tryPublish: () => ({ accepted: true }),
      dispose: () => undefined,
    });
    vi.advanceTimersByTime(100);
    expect(
      bridgeHandlers.has(`${DEMO_SHELL_H2R_QUERY}:${MF_REMOTE_A_ID}`),
    ).toBe(true);
  });
});
