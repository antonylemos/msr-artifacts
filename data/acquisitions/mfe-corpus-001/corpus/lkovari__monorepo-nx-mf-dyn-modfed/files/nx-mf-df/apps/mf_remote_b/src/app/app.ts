import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';
import {
  MF_REMOTE_B_ID,
  PlatformMessageHistoryPanelComponent,
  PlatformWelcomeLastMessageService,
  RemoteStandaloneMessagingBannerComponent,
  WELCOME_REMOTE_PARTICIPANT_ID,
} from '@nx-mf-df/common-ui-lib';

import { NxWelcome } from './nx-welcome';

@Component({
  imports: [
    NxWelcome,
    RouterModule,
    Toast,
    RemoteStandaloneMessagingBannerComponent,
    PlatformMessageHistoryPanelComponent,
  ],
  selector: 'nxmfdf-mf-remote-b-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [
    { provide: WELCOME_REMOTE_PARTICIPANT_ID, useValue: MF_REMOTE_B_ID },
    PlatformWelcomeLastMessageService,
  ],
})
export class App {
  protected title = 'mf_remote_b';
}
