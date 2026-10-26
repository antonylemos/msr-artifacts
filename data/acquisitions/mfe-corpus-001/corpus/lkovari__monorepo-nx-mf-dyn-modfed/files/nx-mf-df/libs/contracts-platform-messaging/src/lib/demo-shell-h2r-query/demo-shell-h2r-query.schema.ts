import {
  EventMessageSchema,
  QueryMessageSchema,
} from '@lkovari/microfrontend-platform-communication/schemas';
import { z } from 'zod';

import {
  DEMO_SHELL_H2R_QUERY,
  DEMO_SHELL_H2R_QUERY_RESULT,
} from './message-names';

export const demoShellH2rQuerySchema = QueryMessageSchema.extend({
  messageName: z.literal(DEMO_SHELL_H2R_QUERY),
  messageVersion: z.literal(1),
  kind: z.literal('query'),
  queryName: z.literal('demo.shell.h2r.query'),
  expectedResult: z.literal(DEMO_SHELL_H2R_QUERY_RESULT),
  payload: z.object({ q: z.string().min(1) }),
});

export type DemoShellH2rQuery = z.infer<typeof demoShellH2rQuerySchema>;

export const demoShellH2rQueryResultSchema = EventMessageSchema.extend({
  messageName: z.literal(DEMO_SHELL_H2R_QUERY_RESULT),
  messageVersion: z.literal(1),
  kind: z.literal('event'),
  eventKind: z.literal('demo.shell.h2r.query.result'),
  payload: z.object({ answer: z.string().min(1) }),
});

export type DemoShellH2rQueryResult = z.infer<typeof demoShellH2rQueryResultSchema>;
