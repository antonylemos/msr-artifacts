import type { MessageBase } from '@lkovari/microfrontend-platform-communication/contracts';
import type { Bus, Unsubscribe } from '@lkovari/microfrontend-platform-communication/core';

export interface PlatformMessageHandlerContext {
  readonly bus: Bus;
  readonly subscriberId: string;
}

export interface PlatformMessageHandlerRegistration {
  readonly messageName: string;
  readonly handler: (message: MessageBase) => void | Promise<void>;
}

export function registerPlatformMessageHandler(
  ctx: PlatformMessageHandlerContext,
  registration: PlatformMessageHandlerRegistration,
): Unsubscribe {
  return ctx.bus.subscribe(
    registration.messageName,
    registration.handler,
    { subscriberId: ctx.subscriberId },
  );
}
