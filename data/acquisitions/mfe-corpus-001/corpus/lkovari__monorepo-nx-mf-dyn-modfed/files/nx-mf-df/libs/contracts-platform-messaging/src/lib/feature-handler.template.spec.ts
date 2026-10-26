import type { MessageBase } from '@lkovari/microfrontend-platform-communication/contracts';
import { registerPlatformMessageHandler } from './feature-handler.template';

describe('registerPlatformMessageHandler', () => {
  it('subscribes with message name and subscriber id', () => {
    const handler = vi.fn();
    const unsubscribe = vi.fn();
    const subscribe = vi.fn().mockReturnValue(unsubscribe);
    const bus = { subscribe };

    const result = registerPlatformMessageHandler(
      { bus, subscriberId: 'mf_remote_a' },
      { messageName: 'demo.message', handler },
    );

    expect(subscribe).toHaveBeenCalledWith('demo.message', handler, {
      subscriberId: 'mf_remote_a',
    });
    expect(result).toBe(unsubscribe);
  });

  it('forwards messages to the registered handler', () => {
    const handler = vi.fn();
    let capturedHandler: ((message: MessageBase) => void) | undefined;
    const bus = {
      subscribe: (
        _name: string,
        cb: (message: MessageBase) => void,
      ) => {
        capturedHandler = cb;
        return vi.fn();
      },
    };

    registerPlatformMessageHandler(
      { bus, subscriberId: 'main-host' },
      { messageName: 'platform.message.v1', handler },
    );

    const message: MessageBase = {
      messageName: 'platform.message.v1',
      messageVersion: 1,
      messageId: 'id-1',
      correlationId: 'corr-1',
      source: 'main-host',
      occurredAtUtc: '2026-05-31T00:00:00.000Z',
      kind: 'event',
      sensitivity: 'public',
    };
    capturedHandler?.(message);
    expect(handler).toHaveBeenCalledWith(message);
  });
});
