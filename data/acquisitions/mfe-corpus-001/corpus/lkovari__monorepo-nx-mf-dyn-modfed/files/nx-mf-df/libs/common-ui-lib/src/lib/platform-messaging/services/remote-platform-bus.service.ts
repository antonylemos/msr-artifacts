import { isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import type { AckResult, MessageBase } from '@lkovari/microfrontend-platform-communication/contracts';
import type { Bus } from '@lkovari/microfrontend-platform-communication/core';
import { PLATFORM_BRIDGE_ACCESS_TOKEN } from '@nx-mf-df/contracts-platform-messaging';

import { getUsableWindowBridge } from '../mfe-window-bridge.util';

@Injectable({ providedIn: 'root' })
export class RemotePlatformBusService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly bridgeAvailable = signal(false);

  constructor() {
    this.refreshBridgeAvailability();
    if (isPlatformBrowser(this.platformId)) {
      queueMicrotask(() => this.refreshBridgeAvailability());
      const rafId = window.requestAnimationFrame(() =>
        this.refreshBridgeAvailability(),
      );
      let attempts = 0;
      const intervalId = window.setInterval(() => {
        attempts += 1;
        this.refreshBridgeAvailability();
        if (this.bridgeAvailable() || attempts >= 40) {
          window.clearInterval(intervalId);
        }
      }, 50);
      this.destroyRef.onDestroy(() => {
        window.cancelAnimationFrame(rafId);
        window.clearInterval(intervalId);
      });
    }
  }

  refreshBridgeAvailability(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.bridgeAvailable.set(false);
      return;
    }
    this.bridgeAvailable.set(getUsableWindowBridge() !== null);
  }

  getSharedBus(): Bus | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return getUsableWindowBridge()?.getBus(PLATFORM_BRIDGE_ACCESS_TOKEN) ?? null;
  }

  getHostAppId(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const handle = getUsableWindowBridge();
    return handle?.appId ?? null;
  }

  getRemoteTargets(): readonly string[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }
    const handle = getUsableWindowBridge();
    return handle?.remotes ?? [];
  }

  tryPublish(message: MessageBase): AckResult | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const handle = getUsableWindowBridge();
    if (!handle) {
      return null;
    }
    return handle.tryPublish(message, PLATFORM_BRIDGE_ACCESS_TOKEN);
  }
}
