import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { PlatformMessageListenerService } from '../services/platform-message-listener.service';

@Component({
  selector: 'lib-platform-message-history-panel',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './platform-message-history-panel.component.html',
  styleUrl: './platform-message-history-panel.component.css',
})
export class PlatformMessageHistoryPanelComponent {
  protected readonly listener = inject(PlatformMessageListenerService);

  protected readonly entries = computed(() =>
    [...this.listener.visibleHistory()].reverse(),
  );
}
