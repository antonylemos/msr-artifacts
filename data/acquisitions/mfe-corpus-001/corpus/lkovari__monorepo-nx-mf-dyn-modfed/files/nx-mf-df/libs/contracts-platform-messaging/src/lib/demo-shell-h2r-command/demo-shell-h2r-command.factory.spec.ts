import {
  createDemoShellH2rCommand,
} from './demo-shell-h2r-command.factory';
import { DEMO_SHELL_H2R_COMMAND } from './message-names';

describe('createDemoShellH2rCommand', () => {
  it('creates a command with required metadata', () => {
    const command = createDemoShellH2rCommand({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { action: 'demo.refresh' },
    });
    expect(command.messageName).toBe(DEMO_SHELL_H2R_COMMAND);
    expect(command.kind).toBe('command');
    expect(command.commandName).toBe('demo.shell.h2r.command');
    expect(command.payload.action).toBe('demo.refresh');
  });

  it('includes ackTimeoutMs when provided', () => {
    const command = createDemoShellH2rCommand({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { action: 'demo.refresh' },
      ackTimeoutMs: 3000,
    });
    expect(command.ackTimeoutMs).toBe(3000);
  });

  it('omits ackTimeoutMs when not provided', () => {
    const command = createDemoShellH2rCommand({
      source: 'main-host',
      target: 'mf_remote_a',
      payload: { action: 'demo.refresh' },
    });
    expect('ackTimeoutMs' in command).toBe(false);
  });

  it('defaults sensitivity to public', () => {
    const command = createDemoShellH2rCommand({
      source: 'main-host',
      target: 'mf_remote_b',
      payload: { action: 'demo.refresh' },
    });
    expect(command.sensitivity).toBe('public');
  });
});
