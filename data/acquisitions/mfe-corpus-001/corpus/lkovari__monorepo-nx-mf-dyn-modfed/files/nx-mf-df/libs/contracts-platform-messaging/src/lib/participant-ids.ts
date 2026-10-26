export const SHELL_HOST_ID = 'main-host';

export const MF_REMOTE_A_ID = 'mf_remote_a';

export const MF_REMOTE_B_ID = 'mf_remote_b';

export const MF_REMOTE_C_ID = 'mf_remote_c';

export const ALL_PARTICIPANT_IDS = [
  SHELL_HOST_ID,
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
] as const;

export type PlatformParticipantId = (typeof ALL_PARTICIPANT_IDS)[number];

export function resolvePlatformParticipantIdFromPath(
  pathname: string,
): string {
  const segments = pathname.split('/').filter(Boolean);
  const top = segments[0];
  if (top === MF_REMOTE_A_ID) {
    return MF_REMOTE_A_ID;
  }
  if (top === MF_REMOTE_B_ID) {
    return MF_REMOTE_B_ID;
  }
  if (top === MF_REMOTE_C_ID) {
    return MF_REMOTE_C_ID;
  }
  return SHELL_HOST_ID;
}
