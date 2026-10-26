import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import {
  createDemoShellH2rQuery,
  DEMO_SHELL_H2R_QUERY_RESULT,
  demoShellH2rQueryResultSchema,
  MF_REMOTE_A_ID,
} from '@nx-mf-df/contracts-platform-messaging';
import { MessageService } from 'primeng/api';

import { createMockBus, testMessageUuid } from '../testing/platform-messaging-test-fixtures';
import { DemoQueryQueueService } from '../services/demo-query-queue.service';
import { DemoShellH2rQuerySuiteComponent } from './demo-shell-h2r-query-suite.component';

describe('DemoShellH2rQuerySuiteComponent', () => {
  let fixture: ComponentFixture<DemoShellH2rQuerySuiteComponent>;
  let messageServiceAdd: ReturnType<typeof vi.fn>;
  let request: ReturnType<typeof vi.fn>;
  let sendCommand: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    messageServiceAdd = vi.fn();
    request = vi.fn();
    sendCommand = vi.fn();
    await TestBed.configureTestingModule({
      imports: [DemoShellH2rQuerySuiteComponent],
      providers: [
        DemoQueryQueueService,
        { provide: MessageService, useValue: { add: messageServiceAdd } },
        {
          provide: BUS_TOKEN,
          useValue: { request, sendCommand },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoShellH2rQuerySuiteComponent);
    fixture.componentRef.setInput('bridgeAvailable', true);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('does not open request dialog when bridge is unavailable', () => {
    fixture.componentRef.setInput('bridgeAvailable', false);
    fixture.detectChanges();
    fixture.componentInstance['openRequestDialog']();
    expect(fixture.componentInstance['requestDialogOpen']()).toBe(false);
  });

  it('does not send query with empty question', () => {
    fixture.componentInstance['questionText'] = '   ';
    fixture.componentInstance['sendQuery']();
    expect(request).not.toHaveBeenCalled();
  });

  it('completes outgoing query on valid response', async () => {
    const queue = TestBed.inject(DemoQueryQueueService);
    const result = demoShellH2rQueryResultSchema.parse({
      messageName: DEMO_SHELL_H2R_QUERY_RESULT,
      messageVersion: 1,
      messageId: testMessageUuid(60),
      correlationId: testMessageUuid(61),
      causationId: testMessageUuid(62),
      source: MF_REMOTE_A_ID,
      occurredAtUtc: '2026-05-31T12:00:00.000Z',
      kind: 'event',
      eventKind: 'demo.shell.h2r.query.result',
      sensitivity: 'public',
      payload: { answer: '42' },
    });
    request.mockResolvedValue(result);
    fixture.componentInstance['questionText'] = 'What?';
    fixture.componentInstance['selectedTarget'] = MF_REMOTE_A_ID;
    fixture.componentInstance['sendQuery']();
    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledOnce();
    });
    await vi.waitFor(() => {
      expect(queue.entries()[0]?.status).toBe('completed');
    });
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' }),
    );
  });

  it('marks outgoing query failed on request rejection', async () => {
    const queue = TestBed.inject(DemoQueryQueueService);
    request.mockRejectedValue(new Error('timeout'));
    fixture.componentInstance['questionText'] = 'What?';
    fixture.componentInstance['selectedTarget'] = MF_REMOTE_A_ID;
    fixture.componentInstance['sendQuery']();
    await vi.waitFor(() => {
      expect(queue.entries()[0]?.status).toBe('failed');
    });
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'error',
        summary: 'Demo query failed',
      }),
    );
  });

  it('does not complete outgoing query when response schema is invalid', async () => {
    const queue = TestBed.inject(DemoQueryQueueService);
    request.mockResolvedValue({ invalid: true });
    fixture.componentInstance['questionText'] = 'What?';
    fixture.componentInstance['selectedTarget'] = MF_REMOTE_A_ID;
    fixture.componentInstance['sendQuery']();
    await vi.waitFor(() => {
      expect(request).toHaveBeenCalledOnce();
    });
    expect(queue.entries()[0]?.status).toBe('awaiting-remote');
  });

  it('shows success toast when command is acknowledged', async () => {
    sendCommand.mockResolvedValue({ accepted: true });
    fixture.componentInstance['selectedTarget'] = MF_REMOTE_A_ID;
    fixture.componentInstance['sendCommand']();
    await vi.waitFor(() => {
      expect(sendCommand).toHaveBeenCalledOnce();
    });
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' }),
    );
  });

  it('shows error toast when command ack is rejected', async () => {
    sendCommand.mockResolvedValue({
      accepted: false,
      message: 'not allowed',
    });
    fixture.componentInstance['selectedTarget'] = MF_REMOTE_A_ID;
    fixture.componentInstance['sendCommand']();
    await vi.waitFor(() => {
      expect(messageServiceAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          severity: 'error',
          summary: 'Command not acknowledged',
        }),
      );
    });
  });

  it('does not send command without bus', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DemoShellH2rQuerySuiteComponent],
      providers: [
        DemoQueryQueueService,
        { provide: MessageService, useValue: { add: messageServiceAdd } },
      ],
    });
    fixture = TestBed.createComponent(DemoShellH2rQuerySuiteComponent);
    fixture.componentRef.setInput('bridgeAvailable', true);
    fixture.componentInstance['selectedTarget'] = MF_REMOTE_A_ID;
    fixture.componentInstance['sendCommand']();
    expect(sendCommand).not.toHaveBeenCalled();
  });

  it('submits remote response through queue service', () => {
    const queue = TestBed.inject(DemoQueryQueueService);
    const req = createDemoShellH2rQuery({
      source: 'main-host',
      target: MF_REMOTE_A_ID,
      payload: { q: 'Ping?' },
    });
    queue.handleIncomingQuery(req, MF_REMOTE_A_ID, createMockBus());
    fixture.componentInstance['responseText'] = 'Pong';
    fixture.componentInstance['submitResponse']();
    expect(messageServiceAdd).toHaveBeenCalledWith(
      expect.objectContaining({ summary: 'Demo query response sent' }),
    );
  });

  it('returns queue status labels for entry states', () => {
    const queue = TestBed.inject(DemoQueryQueueService);
    const req = createDemoShellH2rQuery({
      source: 'main-host',
      target: MF_REMOTE_A_ID,
      payload: { q: 'Q' },
    });
    queue.recordOutgoing(req);
    const entry = queue.entries()[0];
    expect(entry).toBeDefined();
    if (entry) {
      expect(fixture.componentInstance['queueStatusLabel'](entry)).toBe(
        'Request sent',
      );
    }
  });
});
