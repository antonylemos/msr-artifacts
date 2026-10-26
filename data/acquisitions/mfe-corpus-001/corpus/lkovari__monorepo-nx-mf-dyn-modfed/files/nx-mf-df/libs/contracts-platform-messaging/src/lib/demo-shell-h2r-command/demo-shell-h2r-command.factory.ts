import type { Sensitivity } from '@lkovari/microfrontend-platform-communication/contracts';

import type { DemoShellH2rCommand } from './demo-shell-h2r-command.schema';
import { DEMO_SHELL_H2R_COMMAND } from './message-names';

export interface CreateDemoShellH2rCommandInput {
  readonly source: string;
  readonly target: string;
  readonly sensitivity?: Sensitivity;
  readonly payload: { readonly action: string };
  readonly ackTimeoutMs?: number;
}

export function createDemoShellH2rCommand(
  input: CreateDemoShellH2rCommandInput,
): DemoShellH2rCommand {
  const message: DemoShellH2rCommand = {
    messageName: DEMO_SHELL_H2R_COMMAND,
    messageVersion: 1,
    messageId: crypto.randomUUID(),
    correlationId: crypto.randomUUID(),
    source: input.source,
    target: input.target,
    occurredAtUtc: new Date().toISOString(),
    kind: 'command',
    commandName: 'demo.shell.h2r.command',
    sensitivity: input.sensitivity ?? 'public',
    payload: input.payload,
  };
  if (input.ackTimeoutMs !== undefined) {
    return { ...message, ackTimeoutMs: input.ackTimeoutMs };
  }
  return message;
}
