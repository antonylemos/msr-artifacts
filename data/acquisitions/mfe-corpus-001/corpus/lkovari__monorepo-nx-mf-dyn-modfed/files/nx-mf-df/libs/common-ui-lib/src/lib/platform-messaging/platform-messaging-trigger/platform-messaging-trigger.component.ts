import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { MessageComposerComponent } from '../message-composer/message-composer.component';
import { RemotePlatformBusService } from '../services/remote-platform-bus.service';

@Component({
  selector: 'lib-platform-messaging-trigger',
  standalone: true,
  imports: [ButtonModule, DialogModule, MessageComposerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './platform-messaging-trigger.component.html',
})
export class PlatformMessagingTriggerComponent {
  readonly participantId = input.required<string>();

  protected readonly dialogOpen = signal(false);

  private readonly shellBus = inject(BUS_TOKEN, { optional: true });

  private readonly remoteBridge = inject(RemotePlatformBusService);

  protected readonly messagingReady = computed(() => {
    if (this.shellBus) {
      return true;
    }
    return this.remoteBridge.bridgeAvailable();
  });

  protected open(): void {
    this.dialogOpen.set(true);
  }

  protected onComposerDismiss(): void {
    this.dialogOpen.set(false);
  }
}
