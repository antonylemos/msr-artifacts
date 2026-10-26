import type { MfeBridgeHandle } from '@lkovari/microfrontend-platform-communication/core';

export function getUsableWindowBridge(): MfeBridgeHandle | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const candidate = window.__MFE_BRIDGE__;
  if (!isUsableMfeBridgeHandle(candidate)) {
    return null;
  }
  return candidate;
}

function isUsableMfeBridgeHandle(value: unknown): value is MfeBridgeHandle {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  const getBus = Reflect.get(value, 'getBus');
  const tryPublish = Reflect.get(value, 'tryPublish');
  const dispose = Reflect.get(value, 'dispose');
  const appId = Reflect.get(value, 'appId');
  return (
    typeof getBus === 'function' &&
    typeof tryPublish === 'function' &&
    typeof dispose === 'function' &&
    typeof appId === 'string'
  );
}
