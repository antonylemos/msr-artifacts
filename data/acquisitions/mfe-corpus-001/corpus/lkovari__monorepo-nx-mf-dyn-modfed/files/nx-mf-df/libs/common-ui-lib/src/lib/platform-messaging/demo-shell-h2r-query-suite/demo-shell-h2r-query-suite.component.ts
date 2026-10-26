import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import {
  createDemoShellH2rCommand,
  createDemoShellH2rQuery,
  DEMO_SHELL_H2R_COMMAND,
  DEMO_SHELL_H2R_QUERY,
  demoShellH2rQueryResultSchema,
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
  SHELL_HOST_ID,
} from '@nx-mf-df/contracts-platform-messaging';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import {
  DemoQueryQueueEntry,
  DemoQueryQueueService,
} from '../services/demo-query-queue.service';

const REQUEST_TIMEOUT_MS = 120_000;

const COMMAND_ACK_TIMEOUT_MS = 5_000;

@Component({
  selector: 'lib-demo-shell-h2r-query-suite',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    SelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demo-shell-h2r-query-suite.component.html',
  styleUrl: './demo-shell-h2r-query-suite.component.scss',
})
export class DemoShellH2rQuerySuiteComponent {
  readonly bridgeAvailable = input(true);

  private readonly bus = inject(BUS_TOKEN, { optional: true });
  private readonly messages = inject(MessageService);
  private readonly queue = inject(DemoQueryQueueService);

  protected readonly targetOptions = [
    { label: 'Remote A', value: MF_REMOTE_A_ID },
    { label: 'Remote B', value: MF_REMOTE_B_ID },
    { label: 'Remote C', value: MF_REMOTE_C_ID },
  ];

  protected selectedTarget = MF_REMOTE_A_ID;
  protected questionText = '';
  protected responseText = '';

  protected readonly requestDialogOpen = signal(false);
  protected readonly sendingQuery = signal(false);
  protected readonly sendingCommand = signal(false);

  protected readonly responsePrompt = this.queue.responsePrompt;
  protected readonly queueDialogOpen = this.queue.queueDialogOpen;
  protected readonly queueEntries = this.queue.entries;

  protected readonly responseDialogOpen = computed(
    () => this.responsePrompt() !== null,
  );

  constructor() {
    effect(() => {
      const prompt = this.responsePrompt();
      if (prompt !== null) {
        this.responseText = '';
      }
    });
  }

  protected openRequestDialog(): void {
    if (!this.bridgeAvailable()) {
      return;
    }
    this.requestDialogOpen.set(true);
  }

  protected closeRequestDialog(): void {
    this.requestDialogOpen.set(false);
  }

  protected onRequestDialogVisibleChange(visible: boolean): void {
    this.requestDialogOpen.set(visible);
  }

  protected openQueueDialog(): void {
    this.queue.openQueueDialog();
  }

  protected onQueueDialogVisibleChange(visible: boolean): void {
    if (visible) {
      this.queue.openQueueDialog();
      return;
    }
    this.queue.closeQueueDialog();
  }

  protected onResponseDialogVisibleChange(visible: boolean): void {
    if (!visible) {
      this.queue.dismissResponsePrompt();
    }
  }

  protected canSendQuery(): boolean {
    return (
      this.questionText.trim().length > 0 &&
      this.selectedTarget.length > 0 &&
      !this.sendingQuery()
    );
  }

  protected sendQuery(): void {
    if (!this.canSendQuery()) {
      return;
    }
    const bus = this.bus;
    const target = this.selectedTarget;
    const question = this.questionText.trim();
    if (!bus || !target || !this.bridgeAvailable()) {
      return;
    }
    this.sendingQuery.set(true);
    const req = createDemoShellH2rQuery({
      source: SHELL_HOST_ID,
      target,
      payload: { q: question },
      timeoutMs: REQUEST_TIMEOUT_MS,
    });
    this.queue.recordOutgoing(req);
    void bus
      .request(req, undefined, demoShellH2rQueryResultSchema)
      .then((res) => {
        const parsed = demoShellH2rQueryResultSchema.safeParse(res);
        if (!parsed.success) {
          return;
        }
        this.queue.completeOutgoing(req.messageId);
        this.messages.add({
          severity: 'success',
          summary: DEMO_SHELL_H2R_QUERY,
          detail: `${target}: ${parsed.data.payload.answer}`,
          life: 8000,
        });
        this.closeRequestDialog();
        this.questionText = '';
      })
      .catch(() => {
        this.queue.failOutgoing(req.messageId);
        this.messages.add({
          severity: 'error',
          summary: 'Demo query failed',
          detail: `No response from ${target} within ${REQUEST_TIMEOUT_MS / 1000}s`,
          life: 8000,
        });
      })
      .finally(() => {
        this.sendingQuery.set(false);
      });
  }

  protected canSendCommand(): boolean {
    return (
      this.bridgeAvailable() &&
      this.selectedTarget.length > 0 &&
      !this.sendingCommand()
    );
  }

  protected sendCommand(): void {
    const bus = this.bus;
    const target = this.selectedTarget;
    if (!bus || !target || !this.bridgeAvailable() || this.sendingCommand()) {
      return;
    }
    this.sendingCommand.set(true);
    const command = createDemoShellH2rCommand({
      source: SHELL_HOST_ID,
      target,
      payload: { action: 'demo.refresh' },
      ackTimeoutMs: COMMAND_ACK_TIMEOUT_MS,
    });
    void bus
      .sendCommand(command)
      .then((ack) => {
        if (ack.accepted) {
          this.messages.add({
            severity: 'success',
            summary: DEMO_SHELL_H2R_COMMAND,
            detail: `${target} acknowledged the command`,
            life: 6000,
          });
          return;
        }
        this.messages.add({
          severity: 'error',
          summary: 'Command not acknowledged',
          detail: ack.message,
          life: 8000,
        });
      })
      .finally(() => {
        this.sendingCommand.set(false);
      });
  }

  protected dismissResponse(): void {
    this.queue.dismissResponsePrompt();
    this.responseText = '';
  }

  protected submitResponse(): void {
    const sent = this.queue.submitResponse(this.responseText);
    if (!sent) {
      return;
    }
    this.responseText = '';
    this.messages.add({
      severity: 'info',
      summary: 'Demo query response sent',
      detail: 'Reply published to the platform bus',
      life: 5000,
    });
  }

  protected queueStatusLabel(entry: DemoQueryQueueEntry): string {
    if (entry.kind === 'outgoing') {
      if (entry.status === 'failed') {
        return 'Failed';
      }
      return 'Request sent';
    }
    if (entry.status === 'awaiting-response') {
      return 'Awaiting response';
    }
    if (entry.status === 'completed') {
      return 'Reply received';
    }
    return 'Failed';
  }

  protected queueBadgeClass(entry: DemoQueryQueueEntry): string {
    if (entry.status === 'completed') {
      return 'c-demo-queue__badge c-demo-queue__badge--completed';
    }
    if (entry.status === 'failed') {
      return 'c-demo-queue__badge c-demo-queue__badge--failed';
    }
    return 'c-demo-queue__badge c-demo-queue__badge--pending';
  }
}
