import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RemotePlatformBusService } from '../services/remote-platform-bus.service';

@Component({
  selector: 'lib-remote-standalone-messaging-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './remote-standalone-messaging-banner.component.html',
})
export class RemoteStandaloneMessagingBannerComponent {
  protected readonly remoteBus = inject(RemotePlatformBusService);
}
