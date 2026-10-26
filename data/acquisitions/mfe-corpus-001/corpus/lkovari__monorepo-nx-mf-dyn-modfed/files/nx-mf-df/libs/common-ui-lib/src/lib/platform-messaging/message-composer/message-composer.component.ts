import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BUS_TOKEN } from '@lkovari/microfrontend-platform-communication/angular';
import type { Sensitivity } from '@lkovari/microfrontend-platform-communication/contracts';
import type { Bus } from '@lkovari/microfrontend-platform-communication/core';
import {
  ALL_PARTICIPANT_IDS,
  createDemoShellH2rCommand,
  createDemoShellH2rQuery,
  createPlatformEventMessage,
  DEMO_SHELL_H2R_COMMAND,
  DEMO_SHELL_H2R_QUERY,
  demoShellH2rQueryResultSchema,
  PLATFORM_MESSAGE_V1,
  SHELL_HOST_ID,
} from '@nx-mf-df/contracts-platform-messaging';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import {
  BROADCAST_TARGET_VALUE,
  PLATFORM_MESSAGE_KIND_OPTIONS,
  PLATFORM_SENSITIVITY_OPTIONS,
  PLATFORM_SEVERITY_OPTIONS,
  type ComposerMessageKind,
} from '../message-options';
import { DemoQueryQueueService } from '../services/demo-query-queue.service';
import { MessageSenderService } from '../services/message-sender.service';
import { RemotePlatformBusService } from '../services/remote-platform-bus.service';

const REQUEST_TIMEOUT_MS = 120_000;

const COMMAND_ACK_TIMEOUT_MS = 5_000;

@Component({
  selector: 'lib-message-composer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    SelectModule,
    InputTextModule,
    TextareaModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './message-composer.component.html',
})
export class MessageComposerComponent {
  protected readonly form: FormGroup;

  readonly currentAppId = input.required<string>();

  readonly bridgeAvailable = input(true);

  readonly dismiss = output<void>();

  private readonly fb = inject(FormBuilder);

  private readonly sender = inject(MessageSenderService);

  private readonly messages = inject(MessageService);

  private readonly queue = inject(DemoQueryQueueService);

  private readonly busToken = inject(BUS_TOKEN, { optional: true });

  private readonly remoteBus = inject(RemotePlatformBusService);

  protected readonly sensitivityOptions = PLATFORM_SENSITIVITY_OPTIONS;

  protected readonly severityOptions = PLATFORM_SEVERITY_OPTIONS;

  protected readonly sending = signal(false);

  protected readonly selectedKind;

  protected readonly hostKindsAvailable = computed(
    () => this.currentAppId() === SHELL_HOST_ID,
  );

  protected readonly kindOptions = computed(() =>
    this.hostKindsAvailable()
      ? [...PLATFORM_MESSAGE_KIND_OPTIONS]
      : PLATFORM_MESSAGE_KIND_OPTIONS.filter(
          (option) => option.value === 'event',
        ),
  );

  protected readonly targetOptions;

  protected readonly contractLabel;

  constructor() {
    const kindControl = this.fb.nonNullable.control<ComposerMessageKind>(
      'event',
      Validators.required,
    );
    this.form = this.fb.group({
      kind: kindControl,
      source: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      sensitivity: this.fb.nonNullable.control<
        (typeof PLATFORM_SENSITIVITY_OPTIONS)[number]['value']
      >('public', Validators.required),
      severity: this.fb.nonNullable.control<
        (typeof PLATFORM_SEVERITY_OPTIONS)[number]['value']
      >('info', Validators.required),
      title: this.fb.nonNullable.control(''),
      body: this.fb.nonNullable.control(''),
      action: this.fb.nonNullable.control('demo.refresh'),
      question: this.fb.nonNullable.control(''),
      target: this.fb.nonNullable.control<string>(BROADCAST_TARGET_VALUE),
    });

    this.selectedKind = toSignal(kindControl.valueChanges, {
      initialValue: kindControl.value,
    });

    this.targetOptions = computed(() => {
      const options = buildTargetSelectOptions(this.currentAppId());
      if (this.selectedKind() === 'event') {
        return options;
      }
      return options.filter(
        (option) => option.value !== BROADCAST_TARGET_VALUE,
      );
    });

    this.contractLabel = computed(() => {
      const kind = this.selectedKind();
      if (kind === 'command') {
        return `${DEMO_SHELL_H2R_COMMAND} (command)`;
      }
      if (kind === 'query') {
        return `${DEMO_SHELL_H2R_QUERY} (query)`;
      }
      return `${PLATFORM_MESSAGE_V1} (event)`;
    });

    effect(() => {
      const id = this.currentAppId();
      this.form.patchValue({ source: id }, { emitEvent: false });
    });

    effect(() => {
      if (this.selectedKind() === 'event') {
        return;
      }
      const currentTarget = this.form.controls['target'].value;
      if (currentTarget !== BROADCAST_TARGET_VALUE) {
        return;
      }
      const firstRemote = this.targetOptions()[0]?.value;
      if (firstRemote !== undefined) {
        this.form.controls['target'].setValue(firstRemote, {
          emitEvent: false,
        });
      }
    });
  }

  protected canSend(): boolean {
    if (!this.bridgeAvailable() || this.sending()) {
      return false;
    }
    const raw = this.form.getRawValue();
    if (raw.source.trim().length === 0) {
      return false;
    }
    if (raw.kind === 'event') {
      return raw.title.trim().length > 0 && raw.body.trim().length > 0;
    }
    if (!this.isRemoteTarget(raw.target)) {
      return false;
    }
    if (raw.kind === 'command') {
      return raw.action.trim().length > 0;
    }
    if (raw.kind === 'query') {
      return raw.question.trim().length > 0;
    }
    return false;
  }

  protected submit(): void {
    if (!this.canSend()) {
      return;
    }
    const raw = this.form.getRawValue();
    const source = raw.source.trim();
    if (!isSensitivity(raw.sensitivity)) {
      return;
    }
    if (raw.kind === 'command') {
      this.sendCommand(source, raw.target, raw.action.trim(), raw.sensitivity);
      return;
    }
    if (raw.kind === 'query') {
      this.sendQuery(source, raw.target, raw.question.trim(), raw.sensitivity);
      return;
    }
    this.sendEvent(source, raw, raw.sensitivity);
  }

  protected cancel(): void {
    this.dismiss.emit();
  }

  private sendEvent(
    source: string,
    raw: ReturnType<FormGroup['getRawValue']>,
    sensitivity: Sensitivity,
  ): void {
    const target =
      raw.target === BROADCAST_TARGET_VALUE ? undefined : raw.target;
    const message = createPlatformEventMessage({
      source,
      target,
      sensitivity,
      payload: {
        title: raw.title,
        body: raw.body,
        severity: raw.severity,
        createdByApp: source,
      },
    });
    const result = this.sender.trySend(message);
    if (result === null) {
      this.messages.add({
        severity: 'error',
        summary: 'Send failed',
        detail: 'Platform bridge is not available',
      });
      return;
    }
    if (result.accepted) {
      this.messages.add({
        severity: 'success',
        summary: 'Message sent',
        detail: 'Platform message was accepted',
      });
      this.dismiss.emit();
      return;
    }
    this.messages.add({
      severity: 'error',
      summary: 'Message rejected',
      detail: result.message,
    });
  }

  private sendCommand(
    source: string,
    target: string,
    action: string,
    sensitivity: Sensitivity,
  ): void {
    const bus = this.resolveBus();
    if (!bus) {
      this.notifyBusUnavailable();
      return;
    }
    this.sending.set(true);
    const command = createDemoShellH2rCommand({
      source,
      target,
      sensitivity,
      payload: { action },
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
          this.dismiss.emit();
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
        this.sending.set(false);
      });
  }

  private sendQuery(
    source: string,
    target: string,
    question: string,
    sensitivity: Sensitivity,
  ): void {
    const bus = this.resolveBus();
    if (!bus) {
      this.notifyBusUnavailable();
      return;
    }
    const request = createDemoShellH2rQuery({
      source,
      target,
      sensitivity,
      payload: { q: question },
      timeoutMs: REQUEST_TIMEOUT_MS,
    });
    this.queue.recordOutgoing(request);
    void bus
      .request(request, undefined, demoShellH2rQueryResultSchema)
      .then((response) => {
        const parsed = demoShellH2rQueryResultSchema.safeParse(response);
        if (!parsed.success) {
          this.queue.failOutgoing(request.messageId);
          return;
        }
        this.queue.completeOutgoing(request.messageId);
        this.messages.add({
          severity: 'success',
          summary: DEMO_SHELL_H2R_QUERY,
          detail: `${target}: ${parsed.data.payload.answer}`,
          life: 8000,
        });
      })
      .catch(() => {
        this.queue.failOutgoing(request.messageId);
        this.messages.add({
          severity: 'error',
          summary: 'Demo query failed',
          detail: `No response from ${target} within ${REQUEST_TIMEOUT_MS / 1000}s`,
          life: 8000,
        });
      });
    this.messages.add({
      severity: 'info',
      summary: DEMO_SHELL_H2R_QUERY,
      detail: `Query sent to ${target}`,
      life: 5000,
    });
    this.dismiss.emit();
  }

  private resolveBus(): Bus | null {
    return this.busToken ?? this.remoteBus.getSharedBus();
  }

  private notifyBusUnavailable(): void {
    this.messages.add({
      severity: 'error',
      summary: 'Send failed',
      detail: 'Platform bus is not available',
    });
  }

  private isRemoteTarget(target: string): boolean {
    return (
      target.length > 0 &&
      target !== BROADCAST_TARGET_VALUE &&
      target !== SHELL_HOST_ID
    );
  }
}

function buildTargetSelectOptions(currentAppId: string): {
  label: string;
  value: string;
}[] {
  const targets = ALL_PARTICIPANT_IDS.filter((id) => id !== currentAppId);
  return [
    { label: 'Broadcast / all apps', value: BROADCAST_TARGET_VALUE },
    ...targets.map((id) => ({ label: id, value: id })),
  ];
}

function isSensitivity(value: string): value is Sensitivity {
  return value === 'public' || value === 'internal';
}
