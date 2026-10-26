# Mikrofrontend kommunikáció — részletes leírás

Ez a dokumentum két részből áll:

1. **Az EXAMPLE-USAGE.md tartalma** — mit mutat be a könyvtár szerzői példái (topológiák, üzenettípusok, mintakód).
2. **A jelenlegi monorepo implementáció** — hogyan van ez bekötve a `nx-mf-df` workspace-ben, és pontosan mit használunk az `@lkovari/microfrontend-platform-communication` npm csomagból.

---

## 1. rész: Az EXAMPLE-USAGE.md tartalma

Az EXAMPLE-USAGE.md egy **másolható, kódrészletekre épülő** útmutató. Célja, hogy három gyakorlati kommunikációs topológiát és az öt üzenetfajtát (`MessageKind`) ugyanazon busz-infrastruktúrán keresztül bemutassa.

### 1.1 Alapelvek

| Elv | Magyarázat |
|-----|------------|
| **Egy busz példány** | Két külön `createBus()` hívás **nem látja egymás üzeneteit**. A host és a remote-ok ugyanahhoz a buszhoz csatlakoznak: a host létrehozza, `createHostBridge`-gel kitölti a `window.__MFE_BRIDGE__` globális objektumot, a remote-ok `bridge.getBus()`-szal olvassák. |
| **Célzás** | `target` mezővel lehet szűkíteni, melyik feliratkozó kapja az üzenetet. A feliratkozásnál `subscriberId` egyezik a participant azonosítóval. |
| **Időbélyeg** | `occurredAtUtc` ISO-8601 offsettel (`new Date().toISOString()`). |
| **Üres meta mezők** | Remote oldalon `tryPublish` használható: `messageId`, `correlationId`, `occurredAtUtc` üres stringként is megadható — a bridge kitölti UUID-kkel és időbélyeggel. |
| **Angular** | Ugyanaz az elv: hoston `provideBus` + `provideHostBridge`, remote bundle-ben `window.__MFE_BRIDGE__` a shell betöltése után. |

### 1.2 Importálási felület (példa dokumentumban)

A példa a következő belépési pontokat használja:

- `@lkovari/microfrontend-platform-communication` — `createBus`, `createHostBridge`
- `.../schemas` — `EventMessageSchema`, `CommandMessageSchema`, `QueryMessageSchema`, `StateMessageSchema`, `UserContextMessageSchema`
- `.../contracts` — típusok (`EventMessage`, `CommandMessage`, stb.)

### 1.3 Három topológia

#### Topológia 1: Host → Remote A

- A host publikál `target: 'remote-a'` értékkel.
- A remote feliratkozik: `bus.subscribe(..., { subscriberId: 'remote-a' })`.
- Minden üzenetfajtára külön `messageName` és Zod validator a busz `validators` táblájában.

#### Topológia 2: Remote A → Host

- A remote publikál `target: 'shell-host'` értékkel.
- A host `createBus`-nál `defaultSubscriberId: 'shell-host'` — így a host oldali `subscribe` hívások alapértelmezetten a shell identitással futnak.
- Fontos: ha a host nem ad meg `subscriberId`-t, a default az, ami elkapja a remote felől érkező üzeneteket.

#### Topológia 3: Remote A → Remote B (hoston keresztül)

- **Nincs külön busz** remote-ok között. Mindkét remote `window.__MFE_BRIDGE__.getBus()` — fizikailag ugyanaz a példány.
- Remote A küld: `source: 'remote-a'`, `target: 'remote-b'`.
- Remote B feliratkozik: `{ subscriberId: 'remote-b' }`.
- Ez host-közvetített, de **in-process** megosztott busz; nem iframe postMessage.

### 1.4 Az öt üzenetfajta (MessageKind)

Minden blokk **egy** `kind` értéket használ. A könyvtár enumja: `event`, `command`, `query`, `state`, `user-context`.

| Kind | Küldés (általános) | Fogadás | Különleges mezők |
|------|-------------------|---------|------------------|
| **event** | `tryPublish` / `publish` | `subscribe` | `eventKind`, `payload` |
| **command** | `tryPublish` | `subscribe` | `commandName`, `ackTimeoutMs` (opcionális) |
| **query** | `bus.request(queryMsg, timeoutMs)` | `subscribe` a query-re, majd válasz `publish` | Query: `queryName`, `timeoutMs`. Válasz: külön `messageName` (pl. `*:result`), `kind: 'event'`, **`causationId` = a query `messageId`** |
| **state** | `tryPublish` | `subscribe` | `stateKey`, `operation` (`replace`), `revision` |
| **user-context** | `tryPublish` | `subscribe` | `payload`: `userId`, `displayName`, `rolesForUi`, opcionálisan `locale` |

#### Query / válasz párosítás (kritikus)

1. A kérdező `bus.request()`-et hív.
2. A válaszadó feliratkozik a query `messageName`-re.
3. A válasz egy **event** üzenet, amelynek:
   - `messageName` a result contract (pl. `usage:h2r:query:result`)
   - `causationId` megegyezik a bejövő query `messageId` értékével
   - `correlationId` általában a query `correlationId`-jét örökli
4. A busz a `request` Promise-ját ezzel a válasszal oldja fel, vagy timeouttal elutasítja.

#### Dispatch mód

- `event`, `command`, `state`, `user-context` példákban gyakran `dispatch: 'sync'`.
- `query` példákban gyakran `dispatch: 'microtask'` (aszinkronabb feldolgozás, request/response párhoz).

### 1.5 Hibakeresési checklist (EXAMPLE-USAGE záró megjegyzés)

1. Valóban **egy** busz példány fut-e (nem külön `createBus` remote bundle-ben)?
2. `target` és `subscriberId` **karakterre pontosan** egyezik-e?
3. A validatorban szerepel-e a `messageName`?
4. Query-nél a válasz `causationId` helyes-e?

---

## 2. rész: Jelenlegi implementáció a monorepóban

### 2.1 Architektúra összefoglaló

```
main-host (shell)
  ├─ provideBus(...)           → létrehozza a Bus-t, BUS_TOKEN DI
  ├─ provideHostBridge(...)    → window.__MFE_BRIDGE__
  ├─ validators + TopicRegistry (contracts lib)
  └─ UI: header, composer, demo suite, history

mf_remote_a / b / c
  ├─ NEM hív provideBus-t (federated component a shellben)
  ├─ PLATFORM_PARTICIPANT_ID
  ├─ providePlatformMessageListenerBootstrap
  ├─ provideDemoShellH2rQueryRemoteHandlerBootstrap
  └─ RemotePlatformBusService → __MFE_BRIDGE__.getBus() / tryPublish
```

**Native Federation megkötés:** A remote `app.config.ts` **nem fut**, amikor a remote csak lazy route-ként töltődik be a shellbe — csak a federált komponens és a shell által regisztrált provider-ek. Ezért a demo query handler a **main-host** `app.config`-jában is bootstrap-pel fut, és host oldalon mindhárom remote `subscriberId`-re feliratkozik.

### 2.2 Az npm csomag: `@lkovari/microfrontend-platform-communication@^0.2.1`

#### Alcsomagok (subpath exports)

| Import útvonal | Mit ad | Hol használjuk |
|----------------|--------|----------------|
| `@lkovari/microfrontend-platform-communication/angular` | `provideBus`, `provideHostBridge`, `BUS_TOKEN`, `HOST_BRIDGE_TOKEN` | `main-host/app.config.ts`, szolgáltatások host ágon |
| `@lkovari/microfrontend-platform-communication/core` | `TopicRegistry`, `Bus`, `Unsubscribe`, `MfeBridgeHandle` | contracts registry, remote bus adapter |
| `@lkovari/microfrontend-platform-communication/contracts` | `MessageBase`, `AckResult`, `Sensitivity`, üzenettípus interfészek | sender, listener, factory-k |
| `@lkovari/microfrontend-platform-communication/schemas` | Zod alapsémák (`EventMessageSchema`, `QueryMessageSchema`, …) | contracts lib: saját payload `.extend()` |

A gyökér import (`createBus`, `createHostBridge`) a példa dokumentumban szerepel; **Angular appban** a host a `angular` alcsomag `provideBus` / `provideHostBridge` provider-eit használja, ami ugyanazt a globális hidat állítja elő.

#### pnpm patch (0.2.1)

A `nx-mf-df/patches/@lkovari__microfrontend-platform-communication@0.2.1.patch` a csomag `package.json` `exports` mezőjében `.mjs` → `.js` javítást végez, mert a publikált `dist` `.js` fájlokat tartalmaz, de az exportok még `.mjs`-re mutatnak. Patch nélkül a Native Federation build nem találja a fájlokat.

### 2.3 Host busz konfiguráció (`main-host/src/app/app.config.ts`)

```typescript
provideBus({
  appId: SHELL_HOST_ID,              // 'main-host'
  defaultSubscriberId: SHELL_HOST_ID,
  dispatch: 'microtask',
  validators: platformMessagingValidators,
  dedupe: { enabled: true, windowMs: 5000 },
  registry: createPlatformMessagingTopicRegistry(),
  allowUnregisteredMessageNames: false,
}),
provideHostBridge({
  remotes: [MF_REMOTE_A_ID, MF_REMOTE_B_ID, MF_REMOTE_C_ID],
  onConflict: 'return-existing',
}),
```

| Beállítás | Jelentés |
|-----------|----------|
| `appId` / `defaultSubscriberId` | Shell participant: `main-host` |
| `dispatch: 'microtask'` | Üzenetek microtask sorban (query request-hez illeszkedik) |
| `validators` | Zod map: `messageName` → séma (contracts lib) |
| `registry` | `TopicRegistry`: ki publikálhat / ki iratkozhat fel melyik topicra |
| `dedupe` | 5 mp ablakban duplikált üzenetek szűrése |
| `allowUnregisteredMessageNames: false` | Ismeretlen `messageName` elutasítva |
| `provideHostBridge` | Kitölti `window.__MFE_BRIDGE__`-t; `onConflict: 'return-existing'` — ne írja felül, ha már létezik |

### 2.4 Könyvtárak szerepe

#### `@nx-mf-df/contracts-platform-messaging`

- **Participant ID-k:** `main-host`, `mf_remote_a`, `mf_remote_b`, `mf_remote_c`
- **Üzenetnevek és sémák:**
  - `platform.message.v1` — event, értesítések (title, body, severity)
  - `demo:shell:h2r:query` — query, shell → remote
  - `demo:shell:h2r:query:result` — event, remote → shell, `causationId` párosítás
- **`platformMessagingValidators`** — host `provideBus`-nak átadva
- **`createPlatformMessagingTopicRegistry()`** — ACL:
  - `platform.message.v1`: minden participant publikálhat és feliratkozhat
  - demo query: csak `main-host` publikálhat; csak remote-ok iratkozhatnak fel
  - demo result: csak remote-ok publikálhatnak; csak `main-host` iratkozhat fel
- **`registerPlatformMessageHandler`** — típusos `bus.subscribe` wrapper
- **`resolvePlatformParticipantIdFromPath`** — URL útvonal → participant (pl. `/mf_remote_a` → `mf_remote_a`)

#### `@nx-mf-df/common-ui-lib`

Adapter és UI réteg a busz fölött:

| Komponens / szolgáltatás | Feladat |
|--------------------------|---------|
| `MessageSenderService` | Host: `HOST_BRIDGE_TOKEN.tryPublish`. Remote: `RemotePlatformBusService.tryPublish`. Sikeres `platform.message.v1` esetén replay buffer. |
| `PlatformMessageListenerService` | Feliratkozás `platform.message.v1`-re; route alapján `subscriberId`; toast + history; dedupe messageId alapján |
| `RemotePlatformBusService` | Pollolja a `window.__MFE_BRIDGE__` elérhetőségét; `getSharedBus()`, `tryPublish` |
| `DemoShellH2rQuerySuiteComponent` | Demo Query + Demo Queue UI |
| `DemoQueryQueueService` | Bejövő/kimenő sorok signal store-ban |
| `DemoShellH2rQueryRemoteHandlerService` | Query handler: sorba teszi, megnyitja a válasz dialógust |

### 2.5 `window.__MFE_BRIDGE__` életciklusa

1. **Host bootstrap:** `provideHostBridge` létrehozza a hidat, `appId` és `remotes` metaadat.
2. **Host küldés:** `HOST_BRIDGE_TOKEN` → közvetlenül a busz `tryPublish`.
3. **Remote / shellben futó federált kód:** `getUsableWindowBridge()` → `getBus()` vagy `tryPublish`.
4. **Nincs bridge:** `RemotePlatformBusService.bridgeAvailable === false`; standalone remote dev módban banner jelzi.

### 2.6 Platform értesítések (`platform.message.v1`)

**Miért külön contract:** Általános, felhasználói értesítések — nem keverjük query/command logikával.

**Folyamat:**

1. Felhasználó a shell headerben megnyitja a message composer-t (csak **event**, read-only felirat: `platform.message.v1`).
2. `createPlatformEventMessage()` (contracts) építi az üzenetet; `MessageSenderService.trySend`.
3. Fogadó oldal: `PlatformMessageListenerService` a aktív route participant szerint iratkozik fel.
4. PrimeNG toast + jobb alsó history panel.
5. **Replay:** `sessionStorage`-ba mentés; későn mountoló subscriber replayeli (workaround a busz „nincs visszamenőleges delivery” viselkedésére).

**Remote viselkedés:** Listen-only (nincs küldő UI remote route-on); önálló remote dev szerveren banner, ha nincs bridge.

### 2.7 Demo Query — részletes folyamat

**Üzenetnevek (nem az EXAMPLE-USAGE `usage:*` prefix, hanem production-szerű demo nevek):**

| Lépés | messageName | kind | source → target |
|-------|-------------|------|-----------------|
| Kérdés | `demo:shell:h2r:query` | `query` | `main-host` → `mf_remote_*` |
| Válasz | `demo:shell:h2r:query:result` | `event` | `mf_remote_*` → `main-host` |

**UI lépések:**

1. **Demo query** gomb → „Send demo query” dialóg: cél remote + szabad szöveges kérdés.
2. `DemoShellH2rQuerySuiteComponent` → `bus.request()` 120 s timeouttal.
3. `DemoShellH2rQueryRemoteHandlerService` megkapja a query-t:
   - `DemoQueryQueueService.enqueueIncoming` — **Reply received** sor (még válasz nélkül)
   - `responsePrompt` signal — megnyílik a **„Reply to demo query”** dialóg
4. Felhasználó beírja a választ → handler `publish` a result üzenetet (`causationId` = query `messageId`).
5. A `request` Promise feloldódik → siker toast a válasszal.
6. Queue: incoming sor frissül **Q + A** mezőkkel.

**Host speciális viselkedés:** Ha van `BUS_TOKEN` (host process), a handler **mindhárom** remote ID-re feliratkozik egyszerre, hogy federált route nélkül is működjön a válasz dialógus.

**Miért nem automatikus válasz:** Korábban hardcoded sablon válasz ment; most emberi válasz a második dialógusban — így látszik a teljes request/response kör.

### 2.8 Demo Queue — részletes szemantika

A `DemoQueryQueueService` signal-alapú lista:

| direction | Badge (UI) | Mit mutat |
|-----------|------------|-----------|
| `outgoing` | **Request sent** | Csak a küldött **Q** (kérdés). **Nincs** válasz mező — a kimenő sor nem duplikálja a választ. |
| `incoming` | **Reply received** | **Q** (kapott kérdés) és **A** (a válasz dialógusban beírt szöveg) |

**Miért két sor típus:** Egy interakció két nézőpontot tanít: mit küldött a shell, és mit dolgozott fel a „remote” oldal (handler + emberi válasz).

### 2.9 Remote `app.config` (önálló dev szerver)

Példa `mf_remote_a`:

- `PLATFORM_PARTICIPANT_ID` → `mf_remote_a`
- `providePlatformMessageListenerBootstrap()`
- `provideDemoShellH2rQueryRemoteHandlerBootstrap()`
- **Nincs** `provideBus` / `provideHostBridge`

Önálló `nx serve mf_remote_a` esetén nincs shell bridge — a banner és a polling jelzi. Integrált shellben a host bridge-et használja.

### 2.10 Új üzenet hozzáadása (gyakorlati sablon)

1. **contracts-platform-messaging:** Zod séma + `messageName` konstans + factory.
2. **`platformMessagingValidators`** és **`platformMessagingTopicRegistrations`** bővítése.
3. **Feature handler:** `registerPlatformMessageHandler` vagy dedikált service `bus.subscribe` / `bus.request`.
4. **Host:** validators/registry automatikusan jön az `app.config`-ból; új topic ACL explicit.
5. **Ne** nyúlj a `platform.message.v1` sémához, ha a funkció más üzleti jelentésű.

### 2.11 Összehasonlítás: EXAMPLE-USAGE vs. monorepo

| Téma | EXAMPLE-USAGE | Monorepo |
|------|---------------|----------|
| Host ID | `shell-host` | `main-host` |
| Remote ID | `remote-a` | `mf_remote_a` (és b, c) |
| Busz létrehozás | Kézi `createBus` + `createHostBridge` | `provideBus` + `provideHostBridge` |
| Validátorok | Inline a példában | `contracts-platform-messaging` |
| Query demo | `usage:h2r:query` | `demo:shell:h2r:query` |
| UI | Nincs (csak console.log) | Composer, toast, history, demo suite, queue |
| Öt kind | Mindegyik bemutatva | **event** (platform + result), **query** (demo); command/state/user-context nincs UI demo |
| Remote→Remote | Példa kóddal | Nincs dedikált UI; architektúrailag ugyanaz a busz támogatná `target`-tel |

### 2.12 Gyakori hibák és megoldások (tapasztalat)

| Tünet | Ok | Megoldás a repo-ban |
|-------|-----|---------------------|
| Query timeout | Handler nem futott shellben | Host bootstrap + mindhárom remote subscriber a host processben |
| Toast mindig ugyanazt mutatta | Hardcoded demo válasz | Két dialógus, felhasználói válasz |
| Válasz a kimenő queue soron is | `completeOutgoing` tárolta az `answer`-t | Outgoing csak Q; incoming Q+A |
| Üzenet nem érkezik | Külön busz vagy rossz target/subscriberId | Egy bridge; participant ID-k központilag |
| Későn mountolt listener nem lát semmit | Busz nem replayel | `sessionStorage` replay platform üzenetekhez |

---

## 3. Záró összefoglaló

Az **EXAMPLE-USAGE.md** a könyvtár **teljes üzenetfajta- és topológia-készletét** mutatja kézi `createBus` / `getBus` / `tryPublish` hívásokkal.

A **monorepo** ezt Angular DI-re és könyvtári határokra fordítja: a host tulajdonolja a buszt és a hidat, a contractok külön libben élnek, a UI adapterek a `common-ui-lib`-ben, és két konkrét demo funkció (`platform.message.v1` értesítések + `demo:shell:h2r:query` kérés/válasz + Demo Queue) teszi kattinthatóvá az elméletet anélkül, hogy minden `MessageKind`-hez lenne külön gomb.

Az `@lkovari/microfrontend-platform-communication` csomag adja a **busz magot**, a **bridge globális handle-t**, a **Zod alapsémákat**, a **topic ACL registry-t**, és az **Angular provider-eket**; a projekt-specifikus üzleti jelentés a `contracts-platform-messaging` és a feature szolgáltatásokban van.
