import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BUS_TOKEN,
  HOST_BRIDGE_TOKEN,
} from '@lkovari/microfrontend-platform-communication/angular';
import {
  DEMO_SHELL_H2R_COMMAND,
  DEMO_SHELL_H2R_QUERY,
  MF_REMOTE_A_ID,
} from '@nx-mf-df/contracts-platform-messaging';
import { MessageService } from 'primeng/api';

import { BROADCAST_TARGET_VALUE } from '../message-options';
import { DemoQueryQueueService } from '../services/demo-query-queue.service';
import { MessageSenderService } from '../services/message-sender.service';
import { RemotePlatformBusService } from '../services/remote-platform-bus.service';
import { MessageComposerComponent } from './message-composer.component';

describe('MessageComposerComponent', () => {
  let fixture: ComponentFixture<MessageComposerComponent>;
  let messageServiceAdd: ReturnType<typeof vi.fn>;
  let trySend: ReturnType<typeof vi.fn>;
  let sendCommand: ReturnType<typeof vi.fn>;
  let request: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    messageServiceAdd = vi.fn();
    trySend = vi.fn().mockReturnValue({ accepted: true });
    sendCommand = vi.fn().mockResolvedValue({ accepted: true });
    request = vi.fn().mockReturnValue(new Promise(() => undefined));
    await TestBed.configureTestingModule({
      imports: [MessageComposerComponent],
      providers: [
        MessageSenderService,
        RemotePlatformBusService,
        DemoQueryQueueService,
        { provide: MessageService, useValue: { add: messageServiceAdd } },
        {
          provide: HOST_BRIDGE_TOKEN,
          useValue: { tryPublish: trySend },
        },
        {
          provide: BUS_TOKEN,
          useValue: { sendCommand, request },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComposerComponent);
    fixture.componentRef.setInput('currentAppId', 'main-host');
    fixture.componentRef.setInput('bridgeAvailable', true);
    await fixture.whenStable();
  });

  it('should create with source prefilled from currentAppId', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance['form'].get('source')?.value).toBe(
      'main-host',
    );
  });

  it('does not submit when bridge is unavailable', () => {
    fixture.componentRef.setInput('bridgeAvailable', false);
    fixture.detectChanges();
    fixture.componentInstance['submit']();
    expect(trySend).not.toHaveBeenCalled();
  });

  it('does not submit an event when title and body are empty', () => {
    fixture.componentInstance['form'].patchValue({ title: '', body: '' });
    fixture.componentInstance['submit']();
    expect(trySend).not.toHaveBeenCalled();
  });

  it('maps broadcast target to undefined and sends event', () => {
    const dismissSpy = vi.fn();
    fixture.componentInstance.dismiss.subscribe(dismissSpy);
    fixture.componentInstance['form'].patchValue({
      kind: 'event',
      source: 'main-host',
      title: 'Hello',
      body: 'World',
      target: BROADCAST_TARGET_VALUE,
      sensitivity: 'public',
      severity: 'info',
    });
    fixture.componentInstance['submit']();
    expect(trySend).toHaveBeenCalledOnce();
    const message = trySend.mock.calls[0]?.[0];
    expect('target' in message).toBe(false);
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success', summary: 'Message sent' }),
    );
    expect(dismissSpy).toHaveBeenCalledOnce();
  });

  it('shows error when event send returns null', () => {
    trySend.mockReturnValue(null);
    fixture.componentInstance['form'].patchValue({
      kind: 'event',
      source: 'main-host',
      title: 'Hello',
      body: 'World',
      target: BROADCAST_TARGET_VALUE,
      sensitivity: 'public',
      severity: 'info',
    });
    fixture.componentInstance['submit']();
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'error',
        summary: 'Send failed',
      }),
    );
  });

  it('shows error when event message is rejected', () => {
    trySend.mockReturnValue({ accepted: false, message: 'denied' });
    fixture.componentInstance['form'].patchValue({
      kind: 'event',
      source: 'main-host',
      title: 'Hello',
      body: 'World',
      target: BROADCAST_TARGET_VALUE,
      sensitivity: 'public',
      severity: 'info',
    });
    fixture.componentInstance['submit']();
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'error',
        summary: 'Message rejected',
        detail: 'denied',
      }),
    );
  });

  it('sends a command through the bus when kind is command', async () => {
    const dismissSpy = vi.fn();
    fixture.componentInstance.dismiss.subscribe(dismissSpy);
    fixture.componentInstance['form'].patchValue({
      kind: 'command',
      source: 'main-host',
      target: MF_REMOTE_A_ID,
      action: 'demo.refresh',
      sensitivity: 'public',
    });
    fixture.componentInstance['submit']();
    expect(sendCommand).toHaveBeenCalledOnce();
    const command = sendCommand.mock.calls[0]?.[0];
    expect(command.messageName).toBe(DEMO_SHELL_H2R_COMMAND);
    expect(command.target).toBe(MF_REMOTE_A_ID);
    await fixture.whenStable();
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'success',
        summary: DEMO_SHELL_H2R_COMMAND,
      }),
    );
    expect(dismissSpy).toHaveBeenCalledOnce();
  });

  it('does not send a command without a remote target', () => {
    fixture.componentInstance['form'].patchValue({
      kind: 'command',
      source: 'main-host',
      target: BROADCAST_TARGET_VALUE,
      action: 'demo.refresh',
    });
    fixture.componentInstance['submit']();
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('sends a query, records it in the queue and dismisses', () => {
    const queue = TestBed.inject(DemoQueryQueueService);
    const dismissSpy = vi.fn();
    fixture.componentInstance.dismiss.subscribe(dismissSpy);
    fixture.componentInstance['form'].patchValue({
      kind: 'query',
      source: 'main-host',
      target: MF_REMOTE_A_ID,
      question: 'What is the status?',
      sensitivity: 'public',
    });
    fixture.componentInstance['submit']();
    expect(request).toHaveBeenCalledOnce();
    const query = request.mock.calls[0]?.[0];
    expect(query.messageName).toBe(DEMO_SHELL_H2R_QUERY);
    expect(query.target).toBe(MF_REMOTE_A_ID);
    expect(queue.entries().some((entry) => entry.kind === 'outgoing')).toBe(
      true,
    );
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'info',
        summary: DEMO_SHELL_H2R_QUERY,
      }),
    );
    expect(dismissSpy).toHaveBeenCalledOnce();
  });

  it('only exposes the event kind for non-host participants', () => {
    fixture.componentRef.setInput('currentAppId', MF_REMOTE_A_ID);
    fixture.detectChanges();
    const options = fixture.componentInstance['kindOptions']();
    expect(options).toHaveLength(1);
    expect(options[0]?.value).toBe('event');
  });

  it('emits dismiss on cancel', () => {
    const dismissSpy = vi.fn();
    fixture.componentInstance.dismiss.subscribe(dismissSpy);
    fixture.componentInstance['cancel']();
    expect(dismissSpy).toHaveBeenCalledOnce();
  });
});
