import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PLATFORM_BRIDGE_ACCESS_TOKEN } from '@nx-mf-df/contracts-platform-messaging';

import { createMinimalMessageBase } from '../testing/platform-messaging-test-fixtures';
import { RemotePlatformBusService } from './remote-platform-bus.service';

describe('RemotePlatformBusService', () => {
  const bridgeKey = '__MFE_BRIDGE__';

  afterEach(() => {
    Reflect.deleteProperty(window, bridgeKey);
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  it('reports bridge unavailable when window bridge is missing', () => {
    TestBed.configureTestingModule({
      providers: [RemotePlatformBusService],
    });
    const service = TestBed.inject(RemotePlatformBusService);
    service.refreshBridgeAvailability();
    expect(service.bridgeAvailable()).toBe(false);
    expect(service.getSharedBus()).toBeNull();
    expect(service.getHostAppId()).toBeNull();
    expect(service.getRemoteTargets()).toEqual([]);
    expect(service.tryPublish(createMinimalMessageBase())).toBeNull();
  });

  it('detects usable window bridge', () => {
    const bus = { subscribe: vi.fn() };
    const getBus = vi.fn().mockReturnValue(bus);
    const tryPublish = vi.fn().mockReturnValue({ accepted: true });
    Reflect.set(window, bridgeKey, {
      appId: 'mf_remote_a',
      remotes: ['main-host'],
      getBus,
      tryPublish,
      dispose: () => undefined,
    });
    TestBed.configureTestingModule({
      providers: [RemotePlatformBusService],
    });
    const service = TestBed.inject(RemotePlatformBusService);
    service.refreshBridgeAvailability();
    expect(service.bridgeAvailable()).toBe(true);
    expect(service.getSharedBus()).toBe(bus);
    expect(getBus).toHaveBeenCalledWith(PLATFORM_BRIDGE_ACCESS_TOKEN);
    expect(service.getHostAppId()).toBe('mf_remote_a');
    expect(service.getRemoteTargets()).toEqual(['main-host']);
    const message = createMinimalMessageBase();
    service.tryPublish(message);
    expect(tryPublish).toHaveBeenCalledWith(
      message,
      PLATFORM_BRIDGE_ACCESS_TOKEN,
    );
  });

  it('returns null bus when gated getBus rejects access', () => {
    const getBus = vi.fn().mockReturnValue(null);
    Reflect.set(window, bridgeKey, {
      appId: 'mf_remote_a',
      remotes: ['main-host'],
      getBus,
      tryPublish: () => ({ accepted: true }),
      dispose: () => undefined,
    });
    TestBed.configureTestingModule({
      providers: [RemotePlatformBusService],
    });
    const service = TestBed.inject(RemotePlatformBusService);
    service.refreshBridgeAvailability();
    expect(service.getSharedBus()).toBeNull();
    expect(getBus).toHaveBeenCalledWith(PLATFORM_BRIDGE_ACCESS_TOKEN);
  });

  it('returns safe defaults on server platform', () => {
    TestBed.configureTestingModule({
      providers: [
        RemotePlatformBusService,
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });
    const service = TestBed.inject(RemotePlatformBusService);
    expect(service.bridgeAvailable()).toBe(false);
    expect(service.getSharedBus()).toBeNull();
    expect(service.getRemoteTargets()).toEqual([]);
  });

  it('stops polling after bridge becomes available', () => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [RemotePlatformBusService],
    });
    const service = TestBed.inject(RemotePlatformBusService);
    expect(service.bridgeAvailable()).toBe(false);

    Reflect.set(window, bridgeKey, {
      appId: 'mf_remote_a',
      remotes: [],
      getBus: () => null,
      tryPublish: () => ({ accepted: true }),
      dispose: () => undefined,
    });
    vi.advanceTimersByTime(100);
    expect(service.bridgeAvailable()).toBe(true);

    Reflect.deleteProperty(window, bridgeKey);
    vi.advanceTimersByTime(5000);
    expect(service.bridgeAvailable()).toBe(true);
  });
});
