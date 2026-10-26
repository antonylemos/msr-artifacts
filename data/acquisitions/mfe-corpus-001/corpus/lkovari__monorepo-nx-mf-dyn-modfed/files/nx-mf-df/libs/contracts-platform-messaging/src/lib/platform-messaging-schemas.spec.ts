import { createDemoShellH2rCommand } from './demo-shell-h2r-command/demo-shell-h2r-command.factory';
import { demoShellH2rCommandSchema } from './demo-shell-h2r-command/demo-shell-h2r-command.schema';
import { createDemoShellH2rQuery } from './demo-shell-h2r-query/demo-shell-h2r-query.factory';
import { demoShellH2rQuerySchema } from './demo-shell-h2r-query/demo-shell-h2r-query.schema';
import { createPlatformEventMessage } from './platform-message/platform-message.factory';
import { platformMessageEventSchema } from './platform-message/platform-message.schema';

describe('platformMessageEventSchema', () => {
  it('accepts valid platform event messages', () => {
    const message = createPlatformEventMessage({
      source: 'main-host',
      target: undefined,
      sensitivity: 'public',
      payload: {
        title: 'Hello',
        body: 'World',
        severity: 'info',
        createdByApp: 'main-host',
      },
    });
    expect(platformMessageEventSchema.safeParse(message).success).toBe(true);
  });

  it('rejects empty title and body', () => {
    const message = createPlatformEventMessage({
      source: 'main-host',
      target: undefined,
      sensitivity: 'public',
      payload: {
        title: '',
        body: '',
        severity: 'info',
        createdByApp: 'main-host',
      },
    });
    expect(platformMessageEventSchema.safeParse(message).success).toBe(false);
  });

  it('rejects invalid severity values', () => {
    const message = createPlatformEventMessage({
      source: 'main-host',
      target: undefined,
      sensitivity: 'public',
      payload: {
        title: 'Hello',
        body: 'World',
        severity: 'info',
        createdByApp: 'main-host',
      },
    });
    const invalid = {
      ...message,
      payload: { ...message.payload, severity: 'critical' },
    };
    expect(platformMessageEventSchema.safeParse(invalid).success).toBe(false);
  });
});

describe('demoShellH2rQuerySchema', () => {
  it('accepts valid demo query messages', () => {
    const message = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Status?' },
      timeoutMs: 5000,
    });
    expect(demoShellH2rQuerySchema.safeParse(message).success).toBe(true);
  });

  it('rejects queries without expectedResult', () => {
    const message = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Status?' },
    });
    const invalid = { ...message, expectedResult: undefined };
    expect(demoShellH2rQuerySchema.safeParse(invalid).success).toBe(false);
  });

  it('rejects non-query kinds', () => {
    const message = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: 'Status?' },
    });
    const invalid = { ...message, kind: 'event' };
    expect(demoShellH2rQuerySchema.safeParse(invalid).success).toBe(false);
  });

  it('rejects blank question payloads', () => {
    const message = createDemoShellH2rQuery({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { q: '' },
    });
    expect(demoShellH2rQuerySchema.safeParse(message).success).toBe(false);
  });
});

describe('demoShellH2rCommandSchema', () => {
  it('accepts valid demo command messages', () => {
    const message = createDemoShellH2rCommand({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { action: 'demo.refresh' },
      ackTimeoutMs: 5000,
    });
    expect(demoShellH2rCommandSchema.safeParse(message).success).toBe(true);
  });

  it('rejects non-command kinds', () => {
    const message = createDemoShellH2rCommand({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { action: 'demo.refresh' },
    });
    const invalid = { ...message, kind: 'query' };
    expect(demoShellH2rCommandSchema.safeParse(invalid).success).toBe(false);
  });

  it('rejects blank action payloads', () => {
    const message = createDemoShellH2rCommand({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { action: '' },
    });
    expect(demoShellH2rCommandSchema.safeParse(message).success).toBe(false);
  });
});
