import { EventMessageSchema } from '@lkovari/microfrontend-platform-communication/schemas';
import { z } from 'zod';

import { PLATFORM_MESSAGE_V1 } from './message-names';

export const platformMessagePayloadSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  severity: z.enum(['info', 'success', 'warn', 'error']),
  createdByApp: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type PlatformMessagePayload = z.infer<typeof platformMessagePayloadSchema>;

export const platformMessageEventSchema = EventMessageSchema.extend({
  messageName: z.literal(PLATFORM_MESSAGE_V1),
  messageVersion: z.literal(1),
  kind: z.literal('event'),
  eventKind: z.literal('platform.message'),
  payload: platformMessagePayloadSchema,
});

export type PlatformMessageEvent = z.infer<typeof platformMessageEventSchema>;
