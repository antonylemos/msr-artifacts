import { InjectionToken } from '@angular/core';

export const PLATFORM_PARTICIPANT_ID = new InjectionToken<string>(
  'PLATFORM_PARTICIPANT_ID',
);

export const PLATFORM_MESSAGE_IGNORE_SELF_ORIGINATED =
  new InjectionToken<boolean>('PLATFORM_MESSAGE_IGNORE_SELF_ORIGINATED');
