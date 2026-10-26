import {
  CommandMessageSchema,
  EventMessageSchema,
} from '@lkovari/microfrontend-platform-communication/schemas';
import { z } from 'zod';

import {
  DEMO_SHELL_H2R_COMMAND,
  DEMO_SHELL_H2R_COMMAND_ACK,
} from './message-names';

export const demoShellH2rCommandSchema = CommandMessageSchema.extend({
  messageName: z.literal(DEMO_SHELL_H2R_COMMAND),
  messageVersion: z.literal(1),
  kind: z.literal('command'),
  commandName: z.literal('demo.shell.h2r.command'),
  payload: z.object({ action: z.string().min(1) }),
});

export type DemoShellH2rCommand = z.infer<typeof demoShellH2rCommandSchema>;

export const demoShellH2rCommandAckSchema = EventMessageSchema.extend({
  messageName: z.literal(DEMO_SHELL_H2R_COMMAND_ACK),
  messageVersion: z.literal(1),
  kind: z.literal('event'),
  eventKind: z.literal('demo.shell.h2r.command.ack'),
  payload: z.object({ acknowledgedAction: z.string().min(1) }),
});

export type DemoShellH2rCommandAck = z.infer<typeof demoShellH2rCommandAckSchema>;
