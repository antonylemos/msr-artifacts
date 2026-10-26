import type { Sensitivity } from '@lkovari/microfrontend-platform-communication/contracts';

import type { DemoShellH2rQuery } from './demo-shell-h2r-query.schema';
import {
  DEMO_SHELL_H2R_QUERY,
  DEMO_SHELL_H2R_QUERY_RESULT,
} from './message-names';

export interface CreateDemoShellH2rQueryInput {
  readonly source: string;
  readonly target: string;
  readonly sensitivity?: Sensitivity;
  readonly payload: { readonly q: string };
  readonly timeoutMs?: number;
}

export function createDemoShellH2rQuery(
  input: CreateDemoShellH2rQueryInput,
): DemoShellH2rQuery {
  const message: DemoShellH2rQuery = {
    messageName: DEMO_SHELL_H2R_QUERY,
    messageVersion: 1,
    messageId: crypto.randomUUID(),
    correlationId: crypto.randomUUID(),
    source: input.source,
    target: input.target,
    occurredAtUtc: new Date().toISOString(),
    kind: 'query',
    queryName: 'demo.shell.h2r.query',
    expectedResult: DEMO_SHELL_H2R_QUERY_RESULT,
    sensitivity: input.sensitivity ?? 'public',
    payload: input.payload,
  };
  if (input.timeoutMs !== undefined) {
    return { ...message, timeoutMs: input.timeoutMs };
  }
  return message;
}
