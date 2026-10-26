import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Toast } from 'primeng/toast';
import {
  PlatformMessageHistoryPanelComponent,
} from '@nx-mf-df/common-ui-lib';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Main } from '../main/main';

@Component({
  selector: 'nxmfdf-layout',
  imports: [Toast, Header, Footer, Main, PlatformMessageHistoryPanelComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {}
