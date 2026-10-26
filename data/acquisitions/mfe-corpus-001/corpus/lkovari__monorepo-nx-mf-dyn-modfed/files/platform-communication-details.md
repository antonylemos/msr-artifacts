# @lkovari/microfrontend-platform-communication — integration reference

This document is derived from the published package’s source layout (`mfe-platform-communication/`), not from README prose. It is intended for humans and for tooling (for example another AI) that must wire **@lkovari/microfrontend-platform-communication@^0.2.1** into a **modern Angular host** and **Angular remotes** in a native-federated or shell-plus-remote setup.

---

## 1. Package facts

| Field | Value |
|--------|--------|
| npm name | `@lkovari/microfrontend-platform-communication` |
| Version in repo | `0.2.1` |
| `type` | `module` |
| `sideEffects` | `false` (tree-shake friendly) |
| Runtime dependency | `zod` `^3.23.8` (always install; used for validators) |
| Build target (library) | ES2022 (`tsup` `target: 'es2022'`) |

**Peer dependencies** (all marked optional in `peerDependenciesMeta`; install what you use):

- `@angular/core` `>=17.0.0` — Angular integration
- `rxjs` `>=7.0.0` — used by `BusService.messages$()` only
- `react` `>=18.0.0`, `vue` `>=3.3.0` — optional adapters

**Engines** (package metadata): Node `>=18.17.0`; package manager example in repo uses `pnpm@9`.

**Install**

```bash
npm install @lkovari/microfrontend-platform-communication@^0.2.1 zod
```

Angular projects already have `@angular/core`; add `rxjs` if not present.

---

## 2. Public entry points (`package.json` `exports`)

The published artifact exposes **six** conditional entry points (`import` / `require` / `types`):

| Subpath | Role |
|---------|------|
| `@lkovari/microfrontend-platform-communication` | Re-exports **contracts**, **schemas**, **core** only (root `src/index.ts`) |
| `@lkovari/microfrontend-platform-communication/contracts` | Type-only contracts (`MessageBase`, message kinds, `AckResult`, …) |
| `@lkovari/microfrontend-platform-communication/schemas` | Zod schemas for messages (`MessageBaseSchema`, `EventMessageSchema`, …) |
| `@lkovari/microfrontend-platform-communication/core` | Framework-agnostic bus, host bridge, registry, state sync, errors |
| `@lkovari/microfrontend-platform-communication/angular` | `provideBus`, `injectBus`, `provideHostBridge`, `BusService`, `HostBridgeService`, tokens |
| `@lkovari/microfrontend-platform-communication/react` | `BusProvider`, `HostBridgeProvider`, hooks |
| `@lkovari/microfrontend-platform-communication/vue` | `createBusPlugin`, `createHostBridgePlugin`, composables |

**Implication for tree-shaking:** Import from the smallest surface you need (for example `.../angular` in apps, `.../contracts` in shared contract libs).

### 2.1 TypeScript: `moduleResolution` and `Window`

- Use **`moduleResolution`: `"bundler"`** (typical Angular CLI) or **`"node16"` / `"nodenext"`** so `package.json` `exports` resolve correctly for subpaths like `.../angular` and `.../core`.
- The library declares **`window.__MFE_BRIDGE__`** via `declare global` in the host-bridge module. Importing symbols from **`@lkovari/microfrontend-platform-communication/core`** (or anything that re-exports that module) pulls in the merged **`Window`** shape for TypeScript. If you only read the handle without importing from the package, add your own ambient declaration matching `MfeBridgeHandle` or import `isValidMfeBridgeHandle` once for the side effect of types.

---

## 3. Architectural model (what the library actually does)

### 3.1 In-process event bus

`createBus` builds a **`Bus`** instance backed by a browser **`EventTarget`**. Messages are dispatched as `CustomEvent` instances with a fixed internal `type` string (`@lkovari/microfrontend-platform-communication/message`). Subscribers register listeners; delivery is queued (`sync` or `microtask`).

There is **no** `postMessage`, **no** WebSocket, and **no** cross-origin transport in this package. All participants that should communicate must share the **same `Bus` instance** (same JavaScript realm / same bundle runtime as the shell).

### 3.2 Host-mediated remotes

The tests encode the intended MFE rule explicitly: **two separate `createBus` instances do not deliver to each other**. Remotes that each instantiate their own bus are isolated. **Cross-remote traffic** happens when every party uses **`bridge.getBus()`** from the **same** `MfeBridgeHandle` (single shared bus), typically owned by the shell.

### 3.3 Window bridge handle

`createHostBridge` assigns **`window.__MFE_BRIDGE__`** to an **`MfeBridgeHandle`** (when `window` exists). That handle exposes:

- `protocolVersion` — constant `MFE_BRIDGE_PROTOCOL_VERSION` (`1`)
- `appId`, `remotes` — metadata (remotes list is not enforced as ACL in core; it documents intent — see **§7**)
- `getBus()` — the shared `Bus`
- `tryPublish(message)` — **never throws** for publish-time failures; returns `Ack` or `Nack`
- `dispose()` — tears down optional state sync listener and clears `window.__MFE_BRIDGE__` if it still points at this handle

**`tryPublish` normalization:** Missing `messageId`, `correlationId`, or `occurredAtUtc` are filled with `crypto.randomUUID()` / `new Date().toISOString()` before `bus.publish`. Validation and policy still run on the normalized message.

**Conflict policies** (`CreateHostBridgeOptions.onConflict`, default `'throw'`):

- `'throw'` — if a valid bridge already exists on `window`, throws `HostBridgeError`
- `'return-existing'` — returns existing handle if shape matches same `appId`, same `bus` reference, same `remotes` array, and `stateSync` options deep-equal via `JSON.stringify`
- `'replace'` — disposes prior valid handle or deletes invalid `window.__MFE_BRIDGE__`, then installs the new one

**Validation helper:** `isValidMfeBridgeHandle(value)` performs structural checks (protocol version, `appId` string, `remotes` array, `getBus` / `tryPublish` / `dispose` functions).

**SSR and non-browser runtimes:** When `typeof window === 'undefined'`, `createHostBridge` still returns a full **`MfeBridgeHandle`** (bus, `tryPublish`, `dispose`, state sync) but **does not** read or write `window.__MFE_BRIDGE__`. Remotes that rely on the global handle must run in a browser context after the shell has attached the bridge.

---

## 4. Message contracts (types + Zod)

Types are `z.infer<>` of the schemas in `src/schemas/*.schema.ts`. **Every published message must pass** the Zod schema registered under `messageName` in `CreateBusOptions.validators`, unless `allowUnregisteredMessageNames: true`.

### 4.1 `MessageBase` (all kinds)

From `MessageBaseSchema` (`strict` objects):

| Field | Constraints |
|--------|----------------|
| `messageName` | string, min length 1 |
| `messageVersion` | integer, positive |
| `messageId` | UUID string |
| `correlationId` | UUID string |
| `causationId` | optional UUID |
| `source` | string, min length 1 (publisher identity; used with `TopicRegistry`) |
| `target` | optional string, min length 1 — **subscriber routing** (see §6 and §7) |
| `occurredAtUtc` | `z.string().datetime({ offset: true })` — ISO datetime **with offset** |
| `kind` | `'event' \| 'command' \| 'query' \| 'state' \| 'user-context'` |
| `sensitivity` | `'public' \| 'internal' \| 'restricted'` |
| `validationDescriptor` | optional strict object with optional `required`, `min`, `max` |

### 4.2 Kind-specific fields

- **Event** (`EventMessageSchema`): `kind: 'event'`, `eventKind` (string), `payload` unknown.
- **Command** (`CommandMessageSchema`): `kind: 'command'`, `commandName`, `payload`, optional `ackTimeoutMs`.
- **Query** (`QueryMessageSchema`): `kind: 'query'`, `queryName`, `payload`, optional `expectedResult`, optional `timeoutMs`.
- **State** (`StateMessageSchema`): `kind: 'state'`, `stateKey`, `operation` (`replace` \| `patch` \| `remove` \| `reset`), `revision` (non-negative int), `payload` unknown.
- **User context** (`UserContextMessageSchema`): `kind: 'user-context'`, `payload` matching `UserContextSchema` (`userId`, `displayName`, `rolesForUi`, optional `avatarUrl`, `tenantId`, `locale`, `featureFlags`, `sessionVersion`).

**Schema-only timeout fields:** `CommandMessage.ackTimeoutMs` and `QueryMessage.timeoutMs` are **part of the Zod contract only**. The bus **does not** read them; there is no built-in ACK scheduler or query deadline beyond **`bus.request(..., timeoutMs)`**, which controls how long the caller waits for a response whose **`causationId`** matches the request **`messageId`**. If you need ACK deadlines or query SLA semantics, implement them in subscribers or shell orchestration using those payload fields explicitly.

Exported schema symbols include: `MessageBaseSchema`, `MessageKindSchema`, `SensitivitySchema`, `EventMessageSchema`, `CommandMessageSchema`, `QueryMessageSchema`, `StateMessageSchema`, `StateOperationSchema`, `UserContextSchema`, `UserContextMessageSchema`.

### 4.3 Extending schemas for domain topics

Production code should **extend** base schemas with stricter `payload` (and optionally literal `messageName` / `stateKey`), as in tests:

- `EventMessageSchema.extend({ payload: z.object({ ... }) })`
- `StateMessageSchema.extend({ stateKey: z.literal('person'), payload: PersonSchema })`

Register the **extended** schema in `validators[messageName]`.

---

## 5. `createBus(options)` — `CreateBusOptions`

| Option | Type | Behavior |
|--------|------|-----------|
| `appId` | `string` | Stored on `bus.appId`; default `subscriberId` for `subscribe()` when `subscriberId` omitted |
| `defaultSubscriberId` | `string?` | Overrides default subscriber id for subscriptions |
| `dispatch` | `'sync' \| 'microtask'` | Default `'microtask'`. `sync` runs handlers before `publish` returns; `microtask` defers |
| `dedupe` | `{ enabled: true; windowMs: number }?` | Drops duplicate `messageId` within window |
| `validators` | `Readonly<Record<string, ZodTypeAny>>` | **Required** key: `messageName` → Zod schema |
| `policy` | `(message: MessageBase) => void?` | Composed **after** optional default sensitivity policy |
| `registry` | `TopicRegistry?` | Publisher/subscriber ACL + version window per topic |
| `allowUnregisteredMessageNames` | `boolean?` | If `true`, unknown `messageName` skips schema validation |
| `messageTtlMs` | `number?` | If set, rejects stale `occurredAtUtc` vs `Date.now()` |
| `enableDefaultSensitivityPolicy` | `boolean?` | Default `true`. If `true`, **`sensitivity: 'restricted'`** throws `BusPolicyError` |
| `onDispatchError` | `(error: unknown) => void?` | Swallows errors from `publish` / `request` publish leg instead of throwing |
| `onSubscriberError` | `(error: unknown) => void?` | Async handler rejections; falls back to `onDispatchError` then `console.error` |

### 5.1 `request`, dedupe, and `onDispatchError`

`bus.request` first registers a pending waiter for **`req.messageId`**, then calls **`bus.publish(req)`**.

- If **`onDispatchError`** is set and **`publish`** fails during synchronous preparation (validation, policy, registry, TTL, and so on), **`onDispatchError`** runs and **`publish` returns without enqueueing delivery**. The pending **`request`** promise is **not** rejected immediately; it remains until the **`request`** timeout elapses, then rejects with a timeout-style `BusValidationError` (`'request timed out'`). The same applies if **`dedupe`** drops the message (`prepareSync` returns false): nothing is delivered and no response can arrive, so the waiter also runs until timeout unless you avoid `request` for deduped flows or tune timeouts and caller logic accordingly.
- If **`onDispatchError`** is **not** set, preparation failures from **`publish`** throw before or after the waiter is registered depending on timing; callers should treat **`request`** as unsafe without **`onDispatchError`** unless inputs are guaranteed valid.

**`Bus` API**

- `publish(message)` — validates, dedupes, policy, registry, hooks, then queues delivery
- `request(req, timeoutMs?, responseValidator?)` — registers waiter keyed by **`req.messageId`** as causation, publishes `req`, resolves first message whose **`causationId` equals `req.messageId`**. Default timeout **5000** ms. Optional `responseValidator` Zod parse on result. **Rejects** if resolved message’s `causationId !== req.messageId` (defensive). Does **not** correlate only by `correlationId` alone (see tests).
- `subscribe(messageName, handler, options?)` — returns `Unsubscribe`
- `observeAll(handler)` — all messages after validation path
- `registerBeforeDeliver(handler)` — synchronous hook before queue (used by state sync)
- `dispose()` — clears listeners and pending requests

**Errors**

- `BusValidationError` — validation / timeout / delivery semantics; has `code: BusErrorCode`
- `BusPolicyError` — policy / registry; has `code`
- `HostBridgeError` — bridge lifecycle / global conflict; **`code`** is one of **`'conflict'`** (bridge already present or incompatible reuse), **`'invalid-global'`** (`window.__MFE_BRIDGE__` set to a non-handle), **`'mismatch'`** (`onConflict: 'return-existing'` but options differ from the existing handle)

`BusErrorCode`: `'validation' | 'unauthorized' | 'incompatible-version' | 'delivery' | 'timeout' | 'dedupe' | 'unknown'`.

**Ack / Nack** (`envelopes.ts`): `AckResult` is discriminated union `accepted: true` vs `false` with `errorCode`, `message`, `receivedAtUtc`.

---

## 6. Targeted delivery (`target` + `subscriberId`)

Handlers only receive an event if:

1. `detail.messageName === messageName` passed to `subscribe`, and  
2. Either `detail.target` is **undefined** (broadcast), **or** `detail.target === subscriberId` for that subscription.

`subscriberId` defaults to `defaultSubscriberId ?? appId`.

**Patterns from tests**

- Host broadcasts to all remotes: omit `target` on message; each remote subscribes with its own `subscriberId`.
- Host → one remote: set `message.target` to that remote’s `subscriberId`.
- Remote → host: host subscribes with default id (host `appId` / `defaultSubscriberId`); remote publishes with `target: 'shell-host'` (or whatever id the host subscriber uses). Prefer reading **`handle.appId`** from **`window.__MFE_BRIDGE__`** when the shell’s bus id should drive targeting (see **§7**).

---

## 7. Module Federation names vs bus identity (`source`, `target`, `subscriberId`)

There is **no automatic “who am I?”** from Webpack or Module Federation. Federation exposes **build-time** remote names (for example in `remotes` / `exposes`). **The platform bus does not read those.** `appId` and participant ids on the bus are **plain strings** you agree on and pass into `provideBus`, `subscribe`, and `publish`.

Strings like **`mf_remote_a`** vs **`mf_remote_b`** on the bus are whatever you **standardize** (often aligned with federation names for human sanity, but **not** wired automatically).

### 7.1 What actually registers identities?

**Host bus** — `createBus` / `provideBus`:

- **`appId`** — default identity for this runtime side of the bus (also the default **`subscriberId`** when `subscribe` omits one, unless **`defaultSubscriberId`** overrides it).
- **`defaultSubscriberId`** (optional) — overrides that default subscriber id for subscriptions.

**Host bridge** — `provideHostBridge({ remotes: [...] })`:

- Puts **`window.__MFE_BRIDGE__`** with **`appId`**, **`remotes`**, **`getBus()`**, and the rest of **`MfeBridgeHandle`**.
- The **`remotes`** array is **metadata** (“documents intent”); the **core** library does **not** use it as an automatic ACL for routing. Routing is done with **`target`** + **`subscriberId`** (see §6).

**“Registration”** in practice: the host configures **bus + bridge**; each remote attaches to the **same** `Bus` via **`getBus()`** and picks a **`subscriberId`** when calling **`subscribe`** (and publishes **`source`** values your team defines).

### 7.2 How does the host know who sent a message?

Publishers set **`source`** on the message (`MessageBase`). That is **convention**, not proof — the library does **not** authenticate **`source`** (see §14).

### 7.3 How is the recipient chosen (remote B vs remote C vs host)?

Delivery uses **`target`** (optional) and each subscription’s **`subscriberId`**:

- If **`target`** is **omitted** → **broadcast** for that `messageName`: every subscriber to that topic receives it (subject to optional **`TopicRegistry`** rules).
- If **`target`** is set → only subscribers whose **`subscriberId`** equals **`target`** receive it.

Relevant logic in `bus.ts`:

```204:212:mfe-platform-communication/src/core/bus.ts
      const listener: Listener = (event: Event) => {
        const ce = event as CustomEvent<MessageBase>;
        const detail = ce.detail;
        if (detail.messageName !== messageName) {
          return;
        }
        if (detail.target !== undefined && detail.target !== subscriberId) {
          return;
        }
```

The **recipient** is whoever subscribed with that **`subscriberId`**. The host typically uses **`defaultSubscriberId: 'shell-host'`** (or aligns **`appId`** with the host subscriber); remote B uses **`subscribe(..., { subscriberId: 'remote-b' })`**. To reach only B, **`publish`** with **`target: 'remote-b'`**.

### 7.4 Can a remote read host id and remote list for `target`?

**Yes.** After resolving **`window.__MFE_BRIDGE__`** to an **`MfeBridgeHandle`**, read **`handle.appId`** (typical **`target`** for “message to shell”) and **`handle.remotes`** (expected remote ids the host configured). Set **`target`** accordingly when publishing. That list is whatever the host passed to **`provideHostBridge`** — keep it **in sync** with how each remote calls **`subscribe({ subscriberId: '...' })`**. If remotes are added or renamed at runtime, you still need an agreed contract (or shell-mediated messaging) beyond the static **`remotes`** array.

```9:17:mfe-platform-communication/src/core/host-bridge.ts
export interface MfeBridgeHandle {
  readonly protocolVersion: typeof MFE_BRIDGE_PROTOCOL_VERSION;
  readonly appId: string;
  readonly remotes: readonly string[];
  readonly stateSync?: StateSyncAttachOptions;
  readonly getBus: () => Bus;
  tryPublish: (message: MessageBase) => AckResult;
  dispose: () => void;
}
```

### 7.5 Summary

| Concern | Mechanism |
|---------|-----------|
| Who am I on the bus? | Strings you configure; not inferred from federation |
| Routing / recipient | **`message.target`** vs subscription **`subscriberId`** |
| Sender hint | **`message.source`** (conventional) |
| Discovering ids for targeting | **`window.__MFE_BRIDGE__.appId`** and **`.remotes`**, plus your own docs or dynamic contracts if remotes change at runtime |

---

## 8. `TopicRegistry`

`TopicRegistry` registers `TopicRegistration` per `messageName`. **`allowedSubscribers`** / **`allowedPublishers`** compare against the same conventional strings as **`subscribe({ subscriberId })`** and **`message.source`** (**§7**).

- `allowedPublishers` — if set, `message.source` must be listed
- `allowedSubscribers` — if set, `subscribe`’s `subscriberId` must be listed
- `minMessageVersion` / `maxMessageVersion` — inclusive bounds on `message.messageVersion`

Throws `BusPolicyError` with codes `'unauthorized'` or `'incompatible-version'`.

---

## 9. State synchronization (`attachStateSync` / `provideHostBridge` `stateSync`)

When `createHostBridge` receives `stateSync` with `enabled: true`, it calls `attachStateSync(bus, options)` which registers `registerBeforeDeliver`. For each incoming `kind === 'state'` message it updates an in-memory revision and snapshot map per `stateKey`.

**Operations**

- `replace` — set revision + payload snapshot (subject to conflict strategy)
- `patch` — deep-merge object payloads (null removes keys); then treated as synthetic `replace`
- `remove` — delete key from maps
- `reset` — revision `0`, snapshot removed

**Conflict strategies** (`conflictStrategy`, default `'last-writer-wins'`)

- `'last-writer-wins'`
- `'reject-if-stale'` — throws `BusValidationError` if incoming `revision <=` current
- `'custom'` — `customConflict(ctx) => 'accept' | 'reject'`

Coordinator exposes `getRevision(stateKey)`, `getSnapshot<T>(stateKey)`, `dispose()`.

---

## 10. Angular host application

### 10.1 Providers

From `@lkovari/microfrontend-platform-communication/angular`:

- `BUS_TOKEN` — `InjectionToken<Bus>`
- `provideBus(options: CreateBusOptions): EnvironmentProviders`
- **`injectBus(): Bus`** — `inject(BUS_TOKEN)`; use in factories or components that need the raw **`Bus`** without `BusService`
- `HOST_BRIDGE_TOKEN` — `InjectionToken<MfeBridgeHandle>`
- `provideHostBridge(options): EnvironmentProviders` where `options` is `Omit<CreateHostBridgeOptions, 'bus' | 'appId'>` (you pass `remotes`, optional `stateSync`, `onConflict`)

`provideHostBridge`’s factory **`inject(BUS_TOKEN)`**, so **`provideBus` must be registered** and resolvable before the host bridge is created (list `provideBus` before `provideHostBridge` in `ApplicationConfig.providers`).

### 10.2 Services

- **`BusService`** (`providedIn: 'root'`) — requires `BUS_TOKEN`; else throws with guidance to call `provideBus`.
  - `publish`, `request`, `messages$(messageName, subscribeOptions?)` → RxJS `Observable` wrapping `subscribe`
- **`HostBridgeService`** — requires `HOST_BRIDGE_TOKEN`; else throws with guidance to call `provideHostBridge`.
  - `tryPublish`, `getBus()`

### 10.3 Suggested `app.config.ts` shape

Use one shared **`validators`** map for every `messageName` the shell and remotes may exchange. Host `appId` should match how you intend the host subscriber id to work (often the literal shell id, for example `shell-host`).

Register **narrow Zod** schemas for each topic (extend base message schemas).

Optional: pass `TopicRegistry` for ACLs, `registry` on `createBus` via `provideBus`.

### 10.4 Boot order and HMR

If `createHostBridge` runs twice with default `onConflict: 'throw'` (for example double bootstrap in dev), you get `HostBridgeError`. Use `'return-existing'` with stable options, or `'replace'` during development, intentionally disposing the old bus if needed.

### 10.5 Minimal Angular examples

**Host `ApplicationConfig`** — `provideBus` must appear **before** `provideHostBridge` in the `providers` array. The example uses an empty validator map plus `allowUnregisteredMessageNames` so the snippet stays small; production hosts should register real Zod schemas per `messageName` (see §4.3).

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideBus, provideHostBridge } from '@lkovari/microfrontend-platform-communication/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBus({
      appId: 'shell-host',
      defaultSubscriberId: 'shell-host',
      validators: {},
      allowUnregisteredMessageNames: true,
      dispatch: 'microtask',
    }),
    provideHostBridge({
      remotes: ['remote-orders', 'remote-profile'],
      onConflict: 'return-existing',
    }),
  ],
};
```

**Remote: resolve the shared bus** — inject or construct a small service that reads **`window.__MFE_BRIDGE__`** only in the browser and uses **`isValidMfeBridgeHandle`** from **`core`** as a type guard before **`getBus()`**.

```typescript
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { isValidMfeBridgeHandle } from '@lkovari/microfrontend-platform-communication/core';
import type { Bus } from '@lkovari/microfrontend-platform-communication/core';

@Injectable({ providedIn: 'root' })
export class RemotePlatformBus {
  private readonly platformId = inject(PLATFORM_ID);

  getSharedBus(): Bus {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('Shared platform bus is only available in the browser');
    }
    const handle = window.__MFE_BRIDGE__;
    if (!isValidMfeBridgeHandle(handle)) {
      throw new Error('Host bridge is not available or invalid');
    }
    return handle.getBus();
  }
}
```

Subscribe with **`{ subscriberId: 'remote-orders' }`** (or your remote id) when you need targeted delivery from the host (see §6 and §7).

---

## 11. Angular remote applications

Remotes loaded into the **same** page runtime as the shell should **not** construct an isolated bus for cross-MFE traffic. Instead:

1. After shell bootstrap, read `window.__MFE_BRIDGE__`.
2. Prefer `isValidMfeBridgeHandle` before use.
3. Use **`handle.getBus()`** for `publish` / `subscribe` / `request`, **or** `tryPublish` if you must avoid throws (validation failures become `Nack`).

**`subscriberId` contract:** When calling `subscribe`, pass `{ subscriberId: '<remote-id>' }` where `<remote-id>` matches an entry in the host’s `remotes` array and matches what the host uses in `target` for directed messages.

**Validators:** The remote’s runtime uses the **same** `Bus` instance as the host; validation schemas are whatever the host configured when creating the bus. Remotes must send messages that satisfy those schemas (deploy **compatible** contract versions; use `messageVersion` + registry bounds for governance).

If a remote is a **standalone** deployment with no shell (dev server only), you may temporarily `provideBus` locally for local testing, understanding that this bus will not see production shell traffic.

For a concrete provider ordering and remote access pattern, see **§10.5**.

---

## 12. Request–response pattern (any consumer on shared bus)

1. Caller builds request message `req` with unique `messageId`.
2. Caller uses `bus.request(req, timeoutMs?, responseZod?)`.
3. Responder subscribes to the **request** `messageName` and, in handler, publishes a **response** message whose **`causationId` is exactly `req.messageId`** (see `RequestResponseCoordinator`).
4. Response `messageName` can differ from request’s; coordinator matches on **`causationId`** only.
5. Optional third argument validates the response with Zod; failure becomes `BusValidationError`.

**Not supported as completion signal:** response that only echoes `correlationId` without correct `causationId` (tests show timeout).

If the request’s **`publish`** leg is swallowed by **`onDispatchError`** or the message is dropped by **dedupe**, the **`request`** promise still behaves as in **§5.1** (typically timeout unless a response arrives).

---

## 13. React and Vue (same bus semantics)

- **React** (`@lkovari/microfrontend-platform-communication/react`): **`BusContext`**, **`BusProvider`** (props are `CreateBusOptions` plus `children`), **`HostBridgeProvider`** (`remotes`, optional `stateSync`, `onConflict`, `children`), **`useBus`**, **`useSubscribe(messageName, handler, subscribeOptions?)`**, **`usePublish()`** returning a stable `publish` callback. `HostBridgeProvider` calls `useBus()` then `createHostBridge` in `useEffect`, disposes on cleanup; effect dependencies include `JSON.stringify(remotes)` so remotes array changes remount the bridge.
- **Vue** (`@lkovari/microfrontend-platform-communication/vue`): **`BusKey`**, **`HostBridgeKey`** injection keys; **`createBusPlugin(options)`** must install **before** **`createHostBridgePlugin(options)`**; **`useBus()`**, **`useSubscribe(messageName, handler, subscribeOptions?)`** (subscribe on `onMounted`, unsubscribe on `onUnmounted`).

Same **host vs remote** rules: one shared bus per page coordination layer. Non-Angular remotes in the same page still use **`window.__MFE_BRIDGE__`** / **`getBus()`** unless they are children of a React/Vue provider tree that already owns the bus.

---

## 14. Security and sensitivity

- Default policy **blocks** `sensitivity: 'restricted'` on the bus (`BusPolicyError` / Nack path).
- This library does **not** encrypt payloads, **does not** authenticate `source` strings, and **does not** sandbox remotes. Treat `source` / `subscriberId` as **convention**, not cryptographic proof. Enforce trust boundaries in the shell or backend.

---

## 15. Operational checklist for integrators

1. Install package + `zod`; configure TypeScript **`moduleResolution`** so `exports` resolve (see **§2.1**).
2. Define versioned **`messageName`** strings and Zod schemas; extend base schemas from this package.
3. Standardize bus participant strings (**`appId`**, **`defaultSubscriberId`**, **`subscriberId`**, **`source`**, **`target`**) independently of Module Federation remote names; keep **`provideHostBridge({ remotes })`** in sync with each remote’s **`subscribe({ subscriberId })`** (**§7**).
4. **Host:** `provideBus` + `provideHostBridge({ remotes: [...] })` in `ApplicationConfig`.
5. **Host:** subscribe with `subscriberId` matching shell identity; remotes subscribe with their remote ids.
6. **Remotes:** resolve `window.__MFE_BRIDGE__`, use `getBus()` or `tryPublish`; use **`handle.appId`** / **`handle.remotes`** when choosing **`target`** (**§7**).
7. Use **`target`** only when you need point-to-point delivery on a shared bus.
8. For request–response, wire **`causationId`** to the request’s **`messageId`**.
9. If you use **`onDispatchError`**, remember failed **`publish`** inside **`request`** leaves the waiter active until **timeout** (§5.1); handle or avoid that combination for invalid requests.
10. Dispose bridges and buses on teardown in tests or micro-frontend unload if you create them manually.

---

## 16. Source map to repository layout

Published code is built from **`mfe-platform-communication/`**:

- `src/core/` — `bus.ts`, `host-bridge.ts`, `dispatcher.ts`, `registry.ts`, `policy.ts`, `dedupe.ts`, `request-response.ts`, `state-sync.ts`, `errors.ts`
- `src/contracts/` — Type exports
- `src/schemas/` — Zod exports
- `src/angular/` — Angular DI adapters
- `src/react/`, `src/vue/` — other framework adapters
- `test/` — behavioral specification (`bus.spec.ts`, `host-bridge.spec.ts`, …)

---

## 17. Quick symbol index (import paths)

| Need | Import from |
|------|----------------|
| `createBus`, `Bus`, `TopicRegistry`, `createHostBridge`, errors | `@lkovari/microfrontend-platform-communication/core` |
| Message types, `AckResult` | `@lkovari/microfrontend-platform-communication/contracts` |
| Zod schemas | `@lkovari/microfrontend-platform-communication/schemas` |
| All three above | `@lkovari/microfrontend-platform-communication` (root) |
| Angular providers, `injectBus`, services | `@lkovari/microfrontend-platform-communication/angular` |
| React adapters | `@lkovari/microfrontend-platform-communication/react` |
| Vue plugins and composables | `@lkovari/microfrontend-platform-communication/vue` |

This document, together with **`mfe-platform-communication/test/`**, is sufficient to reproduce correct **Angular host** and **remote** wiring against **@lkovari/microfrontend-platform-communication@^0.2.1** without reading a README.
