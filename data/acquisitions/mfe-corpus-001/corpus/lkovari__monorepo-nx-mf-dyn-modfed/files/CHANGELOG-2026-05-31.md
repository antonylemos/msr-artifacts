# Changelog — 2026-05-31

## Upgrade `@lkovari/microfrontend-platform-communication` 0.2.1 → 0.3.0

### Dependencies

- Bumped `@lkovari/microfrontend-platform-communication` to `^0.3.0` in `nx-mf-df/package.json` and `@nx-mf-df/common-ui-lib` peer dependencies.
- Reinstalled and regenerated `nx-mf-df/pnpm-lock.yaml` for 0.3.0.

### Changed

- **pnpm patch** regenerated for 0.3.0 (`patches/@lkovari__microfrontend-platform-communication@0.3.0.patch`); the stale 0.2.1 patch was removed and `nx-mf-df/pnpm-workspace.yaml` `patchedDependencies` repointed to `@0.3.0`. The 0.3.0 tarball still ships `.js` files while `package.json` `exports`/`module` point at `.mjs`, so Native Federation fails without the patch until upstream fixes exports.

## Feature 1 — Token-gated bridge (end-to-end)

The host now gates `getBus()` / `tryPublish()` behind an access token. Because host and remotes are first-party federated code that cannot share a closure-held random token across the boundary, a shared compile-time constant is used.

- **`platform-bridge-access-token.ts`** (new, contracts lib): exports `PLATFORM_BRIDGE_ACCESS_TOKEN`, re-exported through the contracts index and `@nx-mf-df/common-ui-lib`.
- **`apps/main-host/src/app/app.config.ts`**: `provideHostBridge({ ..., accessToken: PLATFORM_BRIDGE_ACCESS_TOKEN })`.
- **`remote-platform-bus.service.ts`**: passes the token to `getUsableWindowBridge()?.getBus(PLATFORM_BRIDGE_ACCESS_TOKEN)` and `handle.tryPublish(message, PLATFORM_BRIDGE_ACCESS_TOKEN)`.
- **`message-sender.service.ts`**: host path forwards the token via `handle.tryPublish(message, PLATFORM_BRIDGE_ACCESS_TOKEN)` (the injected `HOST_BRIDGE_TOKEN` handle is the same gated handle).
- **`mfe-window-bridge.util.ts`**: unchanged — the type guard checks function presence and the new optional `token` parameter is compatible.

## Feature 2 — Kind-aware runtime

### Query refinement

- **`demo-shell-h2r-query.schema.ts`** / **`demo-shell-h2r-query.factory.ts`**: added `expectedResult: DEMO_SHELL_H2R_QUERY_RESULT` to the query so the bus enforces the response `messageName`.
- **`demo-shell-h2r-query-suite.component.ts`**: now calls `bus.request(req, undefined, demoShellH2rQueryResultSchema)` so the bus falls back to the query's own `timeoutMs`.

### Command + `sendCommand`

`sendCommand` resolves on any message whose `causationId === command.messageId`, bounded by `ackTimeoutMs` (default 5000 ms).

- **`demo-shell-h2r-command/`** (new contracts): `message-names.ts` (`DEMO_SHELL_H2R_COMMAND`, `DEMO_SHELL_H2R_COMMAND_ACK`), `demo-shell-h2r-command.schema.ts` (command via `CommandMessageSchema`, ack via `EventMessageSchema`), `demo-shell-h2r-command.factory.ts` (`createDemoShellH2rCommand`), all exported from the contracts index.
- **`platform-messaging-bus-config.ts`**: registered command + ack in `platformMessagingValidators` and added topic ACLs (command: publishers `[SHELL_HOST_ID]`, subscribers remotes; ack: publishers remotes, subscribers `[SHELL_HOST_ID]`).
- **`demo-shell-h2r-command-remote-handler.service.ts`** + **`demo-shell-h2r-command-bootstrap.provider.ts`** (new): subscribe to `DEMO_SHELL_H2R_COMMAND` per subscriber and immediately publish an ACK event with `causationId = command.messageId` and `source = subscriberId`. Wired into all four app configs (`main-host`, `mf_remote_a`, `mf_remote_b`, `mf_remote_c`).
- **`demo-shell-h2r-query-suite.component.ts`** (+ `.html`): added a "Demo command" button that calls `bus.sendCommand(createDemoShellH2rCommand({ source: SHELL_HOST_ID, target, ... }))` and toasts the resolved `AckResult`.

## Feature 3 — Registry (kept as-is)

No code change. The manual `createPlatformMessagingTopicRegistry()` encodes publisher/subscriber ACLs that `autoRegisterTopics` / `TopicRegistry.fromValidators()` cannot infer from Zod schemas, so it is intentionally retained. `versionedMessageSchema` is available but offers no functional gain here.

### Verification

After `pnpm install` in `nx-mf-df/`:

```bash
pnpm exec nx run-many -t build --projects=common-ui-lib,main-host,mf_remote_a
```

`common-ui-lib`, `main-host`, and `mf_remote_a` build successfully with the patched ESM resolution.

Manual smoke: platform message composer (gated bridge), demo shell H2R query/result, and the new demo command → ACK round-trip across federated remote routes.

## Feature 4 — Platform messaging edge-case tests (Vitest)

Added **94 Vitest tests** covering platform-messaging edge cases across contracts and UI libraries.

### `contracts-platform-messaging` (19 tests)

- Vitest runner wired via `vitest.config.ts` and `nx run contracts-platform-messaging:test`.
- **`participant-ids.spec.ts`**: route → participant resolution for all remotes, shell, and unknown paths.
- **`platform-message.factory.spec.ts`**: broadcast target normalization (`undefined`, `''`, sentinel) vs explicit target.
- **`demo-shell-h2r-query.factory.spec.ts`** / **`demo-shell-h2r-command.factory.spec.ts`**: optional timeout fields and default sensitivity.
- **`feature-handler.template.spec.ts`**: `registerPlatformMessageHandler` subscription wiring.

### `common-ui-lib` (75 tests)

- **`platform-message-replay.storage.spec.ts`**: corrupt/empty storage, schema filtering, participant matching, peek vs take, 50-message cap.
- **`mfe-window-bridge.util.spec.ts`**: missing/invalid/valid `window.__MFE_BRIDGE__` handles.
- **`demo-query-queue.service.spec.ts`**: queue caps, incoming/outgoing lifecycle, response validation.
- **`message-sender.service.spec.ts`**: host-bridge vs no-bridge paths and replay-on-accept.
- **`remote-platform-bus.service.spec.ts`**: SSR safety, bridge detection, polling stop.
- **`platform-message-listener.service.spec.ts`**: schema rejection, dedupe, self-ignore, replay, visible-history filtering, toasts.
- **`platform-welcome-last-message.service.spec.ts`**: replay latest selection and broadcast target label.
- **`demo-shell-h2r-query-remote-handler.service.spec.ts`** / **`demo-shell-h2r-command-remote-handler.service.spec.ts`**: subscriber resolution, invalid payloads, command ACK publish.
- **`message-composer.component.spec.ts`** / **`demo-shell-h2r-query-suite.component.spec.ts`**: form guards, send outcomes, query timeout/invalid result, command ack paths.

Shared helpers live in `libs/common-ui-lib/src/lib/platform-messaging/testing/platform-messaging-test-fixtures.ts` (valid UUID fixtures, mock bus).

### Verification

```bash
pnpm exec nx run contracts-platform-messaging:test
pnpm exec nx run common-ui-lib:test
```

Both targets pass (19 + 75 tests).
