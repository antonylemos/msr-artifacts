import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import {
  createDemoShellH2rCommand,
  DEMO_SHELL_H2R_COMMAND,
  DEMO_SHELL_H2R_COMMAND_ACK,
  MF_REMOTE_A_ID,
} from '@nx-mf-df/contracts-platform-messaging';
import { Subject } from 'rxjs';

import { DemoShellH2rCommandRemoteHandlerService } from './demo-shell-h2r-command-remote-handler.service';
import { RemotePlatformBusService } from './remote-platform-bus.service';
import { PLATFORM_PARTICIPANT_ID } from '../tokens';

describe('DemoShellH2rCommandRemoteHandlerService', () => {
  let handlers: Map<string, (message: unknown) => void>;
  let publish: ReturnType<typeof vi.fn>;

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    handlers = new Map();
    publish = vi.fn();
    const bus = {
      subscribe: (
        messageName: string,
        handler: (message: unknown) => void,
        opts: { subscriberId: string },
      ) => {
        handlers.set(`${messageName}:${opts.subscriberId}`, handler);
        return vi.fn();
      },
      publish,
    };
    TestBed.configureTestingModule({
      providers: [
        DemoShellH2rCommandRemoteHandlerService,
        RemotePlatformBusService,
        { provide: BUS_TOKEN, useValue: bus },
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
    TestBed.inject(DemoShellH2rCommandRemoteHandlerService);
  });

  it('publishes ack for valid command', () => {
    const handler = handlers.get(`${DEMO_SHELL_H2R_COMMAND}:${MF_REMOTE_A_ID}`);
    const command = createDemoShellH2rCommand({
      source: 'main-host',
      target: MF_REMOTE_A_ID,
      payload: { action: 'demo.refresh' },
    });
    handler?.(command);
    expect(publish).toHaveBeenCalledOnce();
    const ack = publish.mock.calls[0]?.[0];
    expect(ack.messageName).toBe(DEMO_SHELL_H2R_COMMAND_ACK);
    expect(ack.correlationId).toBe(command.correlationId);
    expect(ack.causationId).toBe(command.messageId);
    expect(ack.source).toBe(MF_REMOTE_A_ID);
    expect(ack.target).toBe('main-host');
    expect(ack.payload.acknowledgedAction).toBe('demo.refresh');
  });

  it('ignores invalid command payloads', () => {
    const handler = handlers.get(`${DEMO_SHELL_H2R_COMMAND}:${MF_REMOTE_A_ID}`);
    handler?.({ messageName: DEMO_SHELL_H2R_COMMAND, invalid: true });
    expect(publish).not.toHaveBeenCalled();
  });

  it('does not subscribe on server platform', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        DemoShellH2rCommandRemoteHandlerService,
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
    expect(() =>
      TestBed.inject(DemoShellH2rCommandRemoteHandlerService),
    ).not.toThrow();
  });
});
