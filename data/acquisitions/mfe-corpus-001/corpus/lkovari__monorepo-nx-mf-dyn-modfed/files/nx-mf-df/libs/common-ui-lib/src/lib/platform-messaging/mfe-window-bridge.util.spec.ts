import { getUsableWindowBridge } from './mfe-window-bridge.util';

describe('getUsableWindowBridge', () => {
  const bridgeKey = '__MFE_BRIDGE__';

  afterEach(() => {
    Reflect.deleteProperty(window, bridgeKey);
  });

  it('returns null when bridge is missing', () => {
    expect(getUsableWindowBridge()).toBeNull();
  });

  it('returns null when bridge is not an object', () => {
    Reflect.set(window, bridgeKey, 'invalid');
    expect(getUsableWindowBridge()).toBeNull();
  });

  it('returns null when bridge lacks required methods', () => {
    Reflect.set(window, bridgeKey, {
      appId: 'remote-a',
      getBus: undefined,
      tryPublish: () => ({ accepted: true }),
      dispose: () => undefined,
    });
    expect(getUsableWindowBridge()).toBeNull();
  });

  it('returns bridge when handle is usable', () => {
    const handle = {
      appId: 'mf_remote_a',
      getBus: () => null,
      tryPublish: () => ({ accepted: true }),
      dispose: () => undefined,
      remotes: ['main-host'],
    };
    Reflect.set(window, bridgeKey, handle);
    expect(getUsableWindowBridge()).toBe(handle);
  });
});
