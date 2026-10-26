import type { ZodTypeAny } from 'zod';
import { TopicRegistry } from '@lkovari/microfrontend-platform-communication/core';

import {
  DEMO_SHELL_H2R_COMMAND,
  DEMO_SHELL_H2R_COMMAND_ACK,
} from './demo-shell-h2r-command/message-names';
import {
  demoShellH2rCommandAckSchema,
  demoShellH2rCommandSchema,
} from './demo-shell-h2r-command/demo-shell-h2r-command.schema';
import {
  DEMO_SHELL_H2R_QUERY,
  DEMO_SHELL_H2R_QUERY_RESULT,
} from './demo-shell-h2r-query/message-names';
import {
  demoShellH2rQueryResultSchema,
  demoShellH2rQuerySchema,
} from './demo-shell-h2r-query/demo-shell-h2r-query.schema';
import { PLATFORM_MESSAGE_V1 } from './platform-message/message-names';
import { platformMessageEventSchema } from './platform-message/platform-message.schema';
import {
  ALL_PARTICIPANT_IDS,
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
  SHELL_HOST_ID,
} from './participant-ids';

export const platformMessagingValidators: Readonly<Record<string, ZodTypeAny>> =
  {
    [PLATFORM_MESSAGE_V1]: platformMessageEventSchema,
    [DEMO_SHELL_H2R_QUERY]: demoShellH2rQuerySchema,
    [DEMO_SHELL_H2R_QUERY_RESULT]: demoShellH2rQueryResultSchema,
    [DEMO_SHELL_H2R_COMMAND]: demoShellH2rCommandSchema,
    [DEMO_SHELL_H2R_COMMAND_ACK]: demoShellH2rCommandAckSchema,
  };

export interface PlatformTopicRegistration {
  readonly messageName: string;
  readonly allowedPublishers: readonly string[];
  readonly allowedSubscribers: readonly string[];
  readonly minMessageVersion: number;
  readonly maxMessageVersion: number;
}

export const platformMessagingTopicRegistrations: readonly PlatformTopicRegistration[] =
  [
    {
      messageName: PLATFORM_MESSAGE_V1,
      allowedPublishers: [...ALL_PARTICIPANT_IDS],
      allowedSubscribers: [...ALL_PARTICIPANT_IDS],
      minMessageVersion: 1,
      maxMessageVersion: 1,
    },
    {
      messageName: DEMO_SHELL_H2R_QUERY,
      allowedPublishers: [SHELL_HOST_ID],
      allowedSubscribers: [
        MF_REMOTE_A_ID,
        MF_REMOTE_B_ID,
        MF_REMOTE_C_ID,
      ],
      minMessageVersion: 1,
      maxMessageVersion: 1,
    },
    {
      messageName: DEMO_SHELL_H2R_QUERY_RESULT,
      allowedPublishers: [MF_REMOTE_A_ID, MF_REMOTE_B_ID, MF_REMOTE_C_ID],
      allowedSubscribers: [SHELL_HOST_ID],
      minMessageVersion: 1,
      maxMessageVersion: 1,
    },
    {
      messageName: DEMO_SHELL_H2R_COMMAND,
      allowedPublishers: [SHELL_HOST_ID],
      allowedSubscribers: [MF_REMOTE_A_ID, MF_REMOTE_B_ID, MF_REMOTE_C_ID],
      minMessageVersion: 1,
      maxMessageVersion: 1,
    },
    {
      messageName: DEMO_SHELL_H2R_COMMAND_ACK,
      allowedPublishers: [MF_REMOTE_A_ID, MF_REMOTE_B_ID, MF_REMOTE_C_ID],
      allowedSubscribers: [SHELL_HOST_ID],
      minMessageVersion: 1,
      maxMessageVersion: 1,
    },
  ];

export function createPlatformMessagingTopicRegistry(): TopicRegistry {
  const registry = new TopicRegistry();
  for (const entry of platformMessagingTopicRegistrations) {
    registry.register(entry);
  }
  return registry;
}
