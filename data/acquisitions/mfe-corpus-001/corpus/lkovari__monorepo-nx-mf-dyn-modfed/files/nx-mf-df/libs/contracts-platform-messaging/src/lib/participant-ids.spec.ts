import {
  MF_REMOTE_A_ID,
  MF_REMOTE_B_ID,
  MF_REMOTE_C_ID,
  resolvePlatformParticipantIdFromPath,
  SHELL_HOST_ID,
} from './participant-ids';

describe('resolvePlatformParticipantIdFromPath', () => {
  it('maps /mf_remote_a routes to mf_remote_a', () => {
    expect(resolvePlatformParticipantIdFromPath('/mf_remote_a')).toBe(
      MF_REMOTE_A_ID,
    );
    expect(resolvePlatformParticipantIdFromPath('/mf_remote_a/feature')).toBe(
      MF_REMOTE_A_ID,
    );
  });

  it('maps /mf_remote_b routes to mf_remote_b', () => {
    expect(resolvePlatformParticipantIdFromPath('/mf_remote_b')).toBe(
      MF_REMOTE_B_ID,
    );
  });

  it('maps /mf_remote_c routes to mf_remote_c', () => {
    expect(resolvePlatformParticipantIdFromPath('/mf_remote_c/page')).toBe(
      MF_REMOTE_C_ID,
    );
  });

  it('maps root and unknown paths to main-host', () => {
    expect(resolvePlatformParticipantIdFromPath('/')).toBe(SHELL_HOST_ID);
    expect(resolvePlatformParticipantIdFromPath('/home')).toBe(SHELL_HOST_ID);
    expect(resolvePlatformParticipantIdFromPath('')).toBe(SHELL_HOST_ID);
    expect(resolvePlatformParticipantIdFromPath('/unknown')).toBe(
      SHELL_HOST_ID,
    );
  });
});
