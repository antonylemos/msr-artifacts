import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularVersion } from '@nx-mf-df/common-ui-lib';

@Component({
  standalone: true,
  selector: 'nxmfdf-home',
  imports: [AngularVersion],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly versionTextStyle = {
    fontWeight: '600',
    color: 'magenta',
  };

  protected readonly platformCommunicationPackage =
    '@lkovari/microfrontend-platform-communication';

  protected readonly platformCommunicationVersion = '0.3.2';

  protected readonly demoQueryPurpose =
    'Send a host-to-remote query over the bus and wait for the correlated result — exercises request() with expectedResult.';

  protected readonly demoCommandPurpose =
    'Fire a command at a remote and wait for its ACK — exercises sendCommand() with ackTimeoutMs.';

  protected readonly demoQueuePurpose =
    'Tracks in-flight demo queries (outgoing and incoming) so you can inspect status and reply when a remote asks the host.';
}
