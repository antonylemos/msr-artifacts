import { TestBed } from '@angular/core/testing';
import {
  createDemoShellH2rQuery,
  DEMO_SHELL_H2R_QUERY_RESULT,
} from '@nx-mf-df/contracts-platform-messaging';

import { createMockBus } from '../testing/platform-messaging-test-fixtures';
import { DemoQueryQueueService } from './demo-query-queue.service';

describe('DemoQueryQueueService', () => {
  let service: DemoQueryQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoQueryQueueService);
  });

  it('records outgoing query entries', () => {
    const req = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Hello?' },
    });
    service.recordOutgoing(req);
    const entries = service.entries();
    expect(entries).toHaveLength(1);
    expect(entries[0]?.kind).toBe('outgoing');
    expect(entries[0]?.status).toBe('awaiting-remote');
    expect(entries[0]?.question).toBe('Hello?');
  });

  it('opens response prompt for incoming queries', () => {
    const req = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Ping?' },
    });
    const bus = createMockBus();
    service.handleIncomingQuery(req, 'mf_remote_a', bus);
    expect(service.responsePrompt()).not.toBeNull();
    expect(service.entries()[0]?.kind).toBe('incoming');
    expect(service.entries()[0]?.status).toBe('awaiting-response');
  });

  it('submitResponse returns false without prompt', () => {
    expect(service.submitResponse('answer')).toBe(false);
  });

  it('submitResponse returns false for blank answer', () => {
    const req = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Ping?' },
    });
    const bus = createMockBus();
    service.handleIncomingQuery(req, 'mf_remote_a', bus);
    expect(service.submitResponse('   ')).toBe(false);
    expect(bus.publish).not.toHaveBeenCalled();
  });

  it('submitResponse publishes result and completes entry', () => {
    const req = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Ping?' },
    });
    const publish = vi.fn();
    const bus = createMockBus({ publish });
    service.handleIncomingQuery(req, 'mf_remote_a', bus);
    const sent = service.submitResponse('Pong');
    expect(sent).toBe(true);
    expect(publish).toHaveBeenCalledOnce();
    const published = publish.mock.calls[0]?.[0];
    expect(published.messageName).toBe(DEMO_SHELL_H2R_QUERY_RESULT);
    expect(published.causationId).toBe(req.messageId);
    expect(published.correlationId).toBe(req.correlationId);
    expect(published.payload.answer).toBe('Pong');
    expect(service.responsePrompt()).toBeNull();
    expect(service.entries()[0]?.status).toBe('completed');
    expect(service.entries()[0]?.answer).toBe('Pong');
  });

  it('completeOutgoing only updates outgoing entries', () => {
    const req = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Q1' },
    });
    service.recordOutgoing(req);
    const incomingReq = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Q2' },
    });
    service.handleIncomingQuery(incomingReq, 'mf_remote_a', createMockBus());
    service.completeOutgoing(req.messageId);
    const entries = service.entries();
    const outgoing = entries.find((e) => e.messageId === req.messageId);
    const incoming = entries.find((e) => e.messageId === incomingReq.messageId);
    expect(outgoing?.status).toBe('completed');
    expect(incoming?.status).toBe('awaiting-response');
  });

  it('failOutgoing only updates outgoing entries', () => {
    const req = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Q1' },
    });
    service.recordOutgoing(req);
    service.failOutgoing(req.messageId);
    expect(service.entries()[0]?.status).toBe('failed');
  });

  it('caps entries at 100 items', () => {
    for (let i = 0; i < 105; i += 1) {
      service.recordOutgoing(
        createDemoShellH2rQuery({
          source: 'main-host',
          target: 'mf_remote_a',
          payload: { q: `Q${i}` },
          timeoutMs: 1000,
        }),
      );
    }
    expect(service.entries()).toHaveLength(100);
  });

  it('toggles queue dialog state', () => {
    expect(service.queueDialogOpen()).toBe(false);
    service.openQueueDialog();
    expect(service.queueDialogOpen()).toBe(true);
    service.closeQueueDialog();
    expect(service.queueDialogOpen()).toBe(false);
  });
});
