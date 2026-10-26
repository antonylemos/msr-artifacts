# Changelog — 2026-05-24

## Upgrade `@lkovari/microfrontend-platform-communication` 0.1.4 → 0.2.1

### Dependencies

- Bumped `@lkovari/microfrontend-platform-communication` to `^0.2.1` in `nx-mf-df/package.json` and `@nx-mf-df/common-ui-lib` peer dependencies.
- Regenerated `nx-mf-df/pnpm-lock.yaml` for 0.2.1.

### Changed

- **pnpm patch** updated for 0.2.1 (`patches/@lkovari__microfrontend-platform-communication@0.2.1.patch`). The npm tarball ships `.js` files but `package.json` `exports` still point at `.mjs`; Native Federation fails without the patch until upstream fixes exports.

### Code

- **`platform-message-replay.storage.ts`**: Session replay reads now validate each stored item with `platformMessageEventSchema.safeParse` instead of an unchecked cast.

### Documentation

- **`README.md`**: Replaced “Patch for pnpm” with platform package version note and link to this changelog.
- **`nx-mf-comm-info.md`**: Version references updated to `^0.2.1`; patch section updated for 0.2.1.
- **`platform-communication-details.md`**: Aligned with library 0.2.0/0.2.1 API (`attemptPublish`, dedupe `Nack`, `MessageBase` handlers, Angular lifecycle, `provideRemotePlatformBus`, §18 monorepo map).

### Behavior (library; no app code changes required)

Existing integration already matches 0.2.1 patterns (`MessageBase` subscribers + Zod, `bus.request` with response schema). Notable runtime differences from 0.2.0:

- **`tryPublish`**: Duplicate `messageId` within the dedupe window returns `accepted: false` with `errorCode: 'dedupe'` (host has dedupe enabled, 5s window).
- **`tryPublish`**: Validation/policy failures return `Nack` with `errorCode: 'delivery'` instead of silent success.
- **`provideBus` / `provideHostBridge`**: Bus and bridge are disposed when their injector is destroyed (root host config is unaffected).

### Verification

After `pnpm install` in `nx-mf-df/`:

```bash
pnpm exec nx run-many -t build,lint,test --projects=main-host,common-ui-lib,contracts-platform-messaging
```

Manual smoke: platform message composer, demo shell H2R query, federated remote routes.
