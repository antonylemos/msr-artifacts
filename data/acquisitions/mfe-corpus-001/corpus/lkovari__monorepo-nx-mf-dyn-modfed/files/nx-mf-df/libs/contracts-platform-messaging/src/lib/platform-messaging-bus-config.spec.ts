import { BusPolicyError, createBus } from '@lkovari/microfrontend-platform-communication/core';

import { createDemoShellH2rQuery } from './demo-shell-h2r-query/demo-shell-h2r-query.factory';
import { DEMO_SHELL_H2R_QUERY } from './demo-shell-h2r-query/message-names';
import {
  DEMO_SHELL_H2R_QUERY_RESULT,
} from './demo-shell-h2r-query/message-names';
import {
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
  SHELL_HOST_ID,
} from './participant-ids';
import {
  createPlatformMessagingTopicRegistry,
  platformMessagingTopicRegistrations,
  platformMessagingValidators,
} from './platform-messaging-bus-config';

describe('platformMessagingTopicRegistrations', () => {
  it('registers every validator topic', () => {
    const registeredNames = platformMessagingTopicRegistrations.map(
      (entry) => entry.messageName,
    );
    for (const messageName of Object.keys(platformMessagingValidators)) {
      expect(registeredNames).toContain(messageName);
    }
    expect(registeredNames).toHaveLength(
      Object.keys(platformMessagingValidators).length,
    );
  });

  it('restricts demo query publishing to the shell host', () => {
    const entry = platformMessagingTopicRegistrations.find(
      (topic) => topic.messageName === DEMO_SHELL_H2R_QUERY,
    );
    expect(entry?.allowedPublishers).toEqual([SHELL_HOST_ID]);
    expect(entry?.allowedSubscribers).toContain(MF_REMOTE_A_ID);
    expect(entry?.allowedSubscribers).not.toContain(SHELL_HOST_ID);
  });

  it('restricts demo query result publishing to remotes only', () => {
    const entry = platformMessagingTopicRegistrations.find(
      (topic) => topic.messageName === DEMO_SHELL_H2R_QUERY_RESULT,
    );
    expect(entry?.allowedPublishers).toEqual([
      MF_REMOTE_A_ID,
      MF_REMOTE_B_ID,
      MF_REMOTE_C_ID,
    ]);
    expect(entry?.allowedSubscribers).toEqual([SHELL_HOST_ID]);
  });

  it('pins message versions to 1 for every topic', () => {
    for (const entry of platformMessagingTopicRegistrations) {
      expect(entry.minMessageVersion).toBe(1);
      expect(entry.maxMessageVersion).toBe(1);
    }
  });
});

describe('createPlatformMessagingTopicRegistry', () => {
  it('exposes registration metadata for each validator topic', () => {
    const registry = createPlatformMessagingTopicRegistry();
    for (const messageName of Object.keys(platformMessagingValidators)) {
      expect(registry.getRegistration(messageName)).toBeDefined();
    }
  });

  it('blocks remote publishers for shell-only query topics', () => {
    const registry = createPlatformMessagingTopicRegistry();
    const query = createDemoShellH2rQuery({
      source: MF_REMOTE_A_ID,
      target: SHELL_HOST_ID,
      payload: { q: 'blocked?' },
    });
    expect(() => registry.assertCanPublish(query)).toThrow(BusPolicyError);
  });

  it('enforces ACL at the bus publish boundary', () => {
    const bus = createBus({
      appId: SHELL_HOST_ID,
      validators: platformMessagingValidators,
      registry: createPlatformMessagingTopicRegistry(),
    });
    const query = createDemoShellH2rQuery({
      source: MF_REMOTE_A_ID,
      target: SHELL_HOST_ID,
      payload: { q: 'blocked?' },
    });
    expect(() => bus.publish(query)).toThrow(BusPolicyError);
    bus.dispose();
  });
});
