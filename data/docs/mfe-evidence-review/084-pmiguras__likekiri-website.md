---
schema: 1
id: 1329274714
full_name: pmiguras/likekiri-website
commit: 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 084 — pmiguras/likekiri-website

## Repository overview

Production-oriented modular platform in a pnpm monorepo: two React/Vite shells, dashboard `apps/admin-shell` (#42) and site `apps/web-shell` (#44), ten federated modules in `modules/*` (#45 through #54), NestJS backend `apps/core` (#43) and three libraries (#55 through #57). Shells name no modules in code: targets arrive through runtime data, from the core registry and manifests published by each module.

The chain supporting the architecture:
- **Dependencies:** `@module-federation/runtime` in both shells (#1, #2) and `@module-federation/vite` in the ten modules (#3 through #12).
- **Configuration:** each module declares itself as a remote, named after its `moduleId`, with exposed components and shared React (#13 through #22). There are no static `remotes` in the shells.
- **Code:** core fetches each module manifest and compiles routes per surface (#38). Dashboard requests `admin` routes, registers the remote and loads and mounts the component (#24 through #29). On the site, core executes shell SSR in its own process (#36, #37); shell writes island placeholders (#33, #35), and island runtime initializes federation and mounts or hydrates each component (#30 through #32). For `clientes`, core requests HTML from the module server, and shell inserts it (#34, #39).
- **Relationships:** this results in thirteen active host → remote relationships (#58 through #70): dashboard consumes nine modules and site four; `chat`, `clientes` and `hello` enter both surfaces.
- **Build and deployment:** twelve applications have their own builds. Ten modules also have their own deployment, with systemd unit, port and Caddy route (#73 through #82), while both shells run together in the core process (#71, #72).

Potentially misleading points:
- Strongest composition code is in backend (#36 through #39), which is not a frontend unit; it resolves targets used by shells.
- Sole versioned module registry is an example read by nothing (#23, #40; #151). Deployment's enabled list is outside snapshot, but target identity comes from module manifests.
- `apps/core` and `packages/*` libraries are not frontend units (#43, #55 through #57).

The ten modules as standalone applications remain ambiguous: build entry only reexports components, and there is no `index.html` (#45 through #54). History shows they originated this way, as remotes (#150). Their remote role does not depend on this, and relationships (#58 through #70) and separate deployment (#73 through #82) position them as units.

Documentation is extensive and generally faithful to code: it describes the microkernel with federated modules, registry, islands, delegated SSR and widgets (for example #83, #100 through #104, #146). Contradictions concern README diagram and request flow (#96, #97, #99), texts preceding delegated SSR (#124, #136, #145), `hello` admin static origin (#126) and site's "static" header (#144); history explains each (#152 through #157), with only `hello` inconclusive about the past (#155). Four production verification claims have no artifact (#128, #130, #133, #138).

## Observations

### 1. apps/admin-shell/package.json:14; apps/admin-shell/src/federation.ts:1, 34-46; apps/admin-shell/src/views/ModulePage.tsx:4, 25

**Observation:** `@module-federation/runtime` (`2.8.2`) is declared in admin-shell `dependencies`. `federation.ts` imports `init`, `loadRemote` and `registerRemotes` from the package and calls them in the remote component loader used by `ModulePage`.

**Interpretation:** Module Federation runtime is present in dashboard and used to load remotes at runtime.

### 2. apps/web-shell/package.json:13; apps/web-shell/src/islands.ts:1, 54-56, 90-107

**Observation:** `@module-federation/runtime` (`2.8.2`) is declared in web-shell `dependencies`. `islands.ts`, client build entry (`islands.js`), imports `init` and `loadRemote` and calls them with island remotes.

**Interpretation:** Module Federation runtime is present in site and used by client island runtime.

### 3. modules/chat/package.json:19; modules/chat/vite.config.ts:3, 8-16

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/chat`. `vite.config.ts` imports `federation` and applies it in `plugins`.

**Interpretation:** Federation plugin is present in module `chat` build.

### 4. modules/clientes/package.json:18; modules/clientes/vite.config.ts:3, 22-36

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/clientes`. `vite.config.ts` imports `federation` and applies it in `plugins`. Only the client build uses the plugin; SSR build does not.

**Interpretation:** Federation plugin is present in module `clientes` build.

### 5. modules/cuentas/package.json:18; modules/cuentas/vite.config.ts:3, 8-20

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/cuentas`. `vite.config.ts` imports `federation` and applies it in `plugins`.

**Interpretation:** Federation plugin is present in module `cuentas` build.

### 6. modules/ejemplo-admin/package.json:18; modules/ejemplo-admin/vite.config.ts:3, 10-21

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/ejemplo-admin`. `vite.config.ts` imports `federation` and applies it in `plugins`.

**Interpretation:** Federation plugin is present in module `ejemplo-admin` build.

### 7. modules/ejemplo-web/package.json:18; modules/ejemplo-web/vite.config.ts:3, 11-21

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/ejemplo-web`. `vite.config.ts` imports `federation` and applies it in `plugins`.

**Interpretation:** Federation plugin is present in module `ejemplo-web` build.

### 8. modules/hello/package.json:17; modules/hello/vite.config.ts:3, 10-21

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/hello`. `vite.config.ts` imports `federation` and applies it in `plugins`.

**Interpretation:** Federation plugin is present in module `hello` build.

### 9. modules/media/package.json:19; modules/media/vite.config.ts:3, 8-18

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/media`. `vite.config.ts` imports `federation` and applies it in `plugins`.

**Interpretation:** Federation plugin is present in module `media` build.

### 10. modules/ops/package.json:10; modules/ops/vite.config.ts:3, 8-13

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/ops`. `vite.config.ts` imports `federation` and applies it in `plugins`.

**Interpretation:** Federation plugin is present in module `ops` build.

### 11. modules/registry/package.json:18; modules/registry/vite.config.ts:3, 8-18

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/registry`. `vite.config.ts` imports `federation` and applies it in `plugins`.

**Interpretation:** Federation plugin is present in module `registry` build.

### 12. modules/sitio/package.json:18; modules/sitio/vite.config.ts:3, 8-18

**Observation:** `@module-federation/vite` (`1.20.5`) is declared in `devDependencies` of `modules/sitio`. `vite.config.ts` imports `federation` and applies it in `plugins`.

**Interpretation:** Federation plugin is present in module `sitio` build.

### 13. modules/chat/vite.config.ts:8-16

**Observation:** `federation({ ... })` declares `name: 'chat'` and `filename: 'remoteEntry.js'`, exposes `./ChatWidgetIsland`, `./ChatAdminPage` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `chat` is configured as a remote, with its own name, components offered to shells and shared React.

### 14. modules/clientes/vite.config.ts:22-36

**Observation:** `federation({ ... })` in the client build branch (SSR branch, 11-17, does not use the plugin) declares `name: 'clientes'` and `filename: 'remoteEntry.js'`, exposes `./RegistroIsland`, `./AccesoIsland`, `./PortalIsland`, `./CuentasAdminPage`, `./FacturacionAdminPage` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `clientes` is configured as a remote, with its own name, components offered to shells and shared React.

### 15. modules/cuentas/vite.config.ts:8-20

**Observation:** `federation({ ... })` declares `name: 'cuentas'` and `filename: 'remoteEntry.js'`, exposes `./UsersPage`, `./InvitationsPage`, `./PasswordPage` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `cuentas` is configured as a remote, with its own name, components offered to shells and shared React.

### 16. modules/ejemplo-admin/vite.config.ts:10-21

**Observation:** `federation({ ... })` declares `name: 'ejemplo-admin'` and `filename: 'remoteEntry.js'`, exposes `./PanelPage`, `./AjustesPage` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `ejemplo-admin` is configured as a remote, with its own name, components offered to shells and shared React.

### 17. modules/ejemplo-web/vite.config.ts:11-21

**Observation:** `federation({ ... })` declares `name: 'ejemplo-web'` and `filename: 'remoteEntry.js'`, exposes `./SimuladorIsland` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `ejemplo-web` is configured as a remote, with its own name, components offered to shells and shared React.

### 18. modules/hello/vite.config.ts:10-21

**Observation:** `federation({ ... })` declares `name: 'hello'` and `filename: 'remoteEntry.js'`, exposes `./HelloIsland`, `./HelloAdminPage` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `hello` is configured as a remote, with its own name, components offered to shells and shared React.

### 19. modules/media/vite.config.ts:8-18

**Observation:** `federation({ ... })` declares `name: 'media'` and `filename: 'remoteEntry.js'`, exposes `./MediaPage` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `media` is configured as a remote, with its own name, components offered to shells and shared React.

### 20. modules/ops/vite.config.ts:8-13

**Observation:** `federation({ ... })` declares `name: 'ops'` and `filename: 'remoteEntry.js'`, exposes `./OpsAdminPage` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `ops` is configured as a remote, with its own name, components offered to shells and shared React.

### 21. modules/registry/vite.config.ts:8-18

**Observation:** `federation({ ... })` declares `name: 'registry'` and `filename: 'remoteEntry.js'`, exposes `./RegistryPage` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `registry` is configured as a remote, with its own name, components offered to shells and shared React.

### 22. modules/sitio/vite.config.ts:8-18

**Observation:** `federation({ ... })` declares `name: 'sitio'` and `filename: 'remoteEntry.js'`, exposes `./SitioPage` and shares `react` and `react-dom` as singletons.

**Interpretation:** Module `sitio` is configured as a remote, with its own name, components offered to shells and shared React.

### 23. config/modules.example.json:3-7

**Observation:** The file's sole entry declares `"moduleId": "hello"`, `"baseUrl": "http://127.0.0.1:4001"` and an example `hmacKey`. Actual registry is read from `MODULE_REGISTRY_CONFIG`, and `config/modules.json` is in `.gitignore`.

**Interpretation:** A template for core module registry: shows how a deployment specifies module applications and locations, but no build or runtime reads it.

**Note:** Guidance for configuration declaring another unit as an application is `strong`, but this file is an example read by nothing (3.4.4, Composition `No`; 3.4.8 #2). It does not participate in composition, so remains `weak`, without a `configures` relationship.

### 24. apps/admin-shell/src/federation.ts:1

**Observation:** `import { init, loadRemote, registerRemotes } from '@module-federation/runtime'`. All three are used in the same file, at :36, :40 and :44.

**Interpretation:** Dashboard imports federation runtime functions that register and load remotes.

### 25. apps/admin-shell/src/federation.ts:34, 39-41

**Observation:** `registerRemotes([remote])`, with `remote = { name: route.moduleId, entry: route.remoteEntry, type: 'module' }`, when runtime is already initialized and module is not yet known. `route` comes from manifest delivered by core.

**Interpretation:** Dashboard registers a remote received as a parameter at runtime, naming no module in code.

### 26. apps/admin-shell/src/federation.ts:13-26, 34-38

**Observation:** `init({ name: 'likekiri_admin', remotes: [remote], shared: hostShared })` on first load; `hostShared` supplies host `react` and `react-dom` as singletons.

**Interpretation:** Dashboard initializes federation with first received remote and shares its React with remotes.

### 27. apps/admin-shell/src/federation.ts:43-47

**Observation:** ``loadRemote<Record<string, unknown>>(`${route.moduleId}/${exposed}`)``, with `exposed` taken from `route.component` without `./`; component is `remoteModule[exposed]` or `default`.

**Interpretation:** Dashboard obtains another unit's exposed component, whose name arrives through runtime data.

### 28. apps/admin-shell/src/views/ModulePage.tsx:4, 25, 48; apps/admin-shell/src/App.tsx:226

**Observation:** `createElement(state.Component, params)` renders component loaded by `loadRemoteComponent(route)`. `ModulePage` is rendered by the module route in `App`.

**Interpretation:** Dashboard mounts the component loaded from another unit on the page, with URL parameters as props.

### 29. apps/admin-shell/src/api.ts:9-15, 37-42, 85; apps/admin-shell/src/App.tsx:148, 214

**Observation:** `request<ShellManifest>('/api/shell/manifest?surface=admin')` requests the `admin` surface route table from core, with `moduleId`, `component` and `remoteEntry` of each module. `App` loads it and matches current route with `matchModuleRoute`.

**Interpretation:** Dashboard resolves through core which modules and components enter each route; targets are not in dashboard code.

### 30. apps/web-shell/src/islands.ts:1, 80-90, 113

**Observation:** `init({ name: 'likekiri_web', remotes, shared: { react, react-dom } })` registers remotes collected from island placeholders (`data-remote`). `boot()` runs when bundle `islands.js` loads.

**Interpretation:** Site initializes client federation with remotes announced by shell HTML and shares its React.

### 31. apps/web-shell/src/islands.ts:54-57

**Observation:** ``loadRemote<Record<string, unknown>>(`${spec.moduleId}/${spec.exposed}`)``, with `moduleId` and `exposed` read from placeholder.

**Interpretation:** Site obtains another unit's exposed component, whose name arrives through HTML.

### 32. apps/web-shell/src/islands.ts:62-71

**Observation:** `hydrateRoot(spec.el, element)` when island arrived prerendered (`data-hydrate`), otherwise `createRoot(spec.el).render(element)`. A failure only marks the island location.

**Interpretation:** Site mounts or hydrates another unit's component at the island location, isolating island failure.

### 33. apps/web-shell/src/entry-server.tsx:77-82; apps/web-shell/src/islands.ts:23-28; apps/core/src/shell/shell.service.ts:138-144

**Observation:** ``'data-likekiri-island': `${island.moduleId}/${island.component}` `` and `'data-remote': island.remoteEntry` in page placeholder. Island descriptor comes from core, and `islands.ts` reads these attributes.

**Interpretation:** Shell HTML declares which component of which module occupies the page and where its `remoteEntry` comes from; the contract between SSR and island runtime.

### 34. apps/web-shell/src/entry-server.tsx:23-27, 95-96; apps/core/src/registry/registry.service.ts:307-317

**Observation:** `dangerouslySetInnerHTML={{ __html: island.html as string }}` inserts HTML prerendered by module server into placeholder, requested by core from module `/render`.

**Interpretation:** Shell includes markup produced by another unit on the server; server composition without Module Federation.

### 35. apps/web-shell/src/entry-server.tsx:57-58, 132; apps/core/src/registry/registry.service.ts:346-355

**Observation:** ``data-likekiri-island={`${w.moduleId}/${w.component}`}`` and `data-remote={w.remoteEntry}` for each global widget, rendered on every page. List comes from `registry.webWidgets()`.

**Interpretation:** Shell declares global floating islands, such as chat, through the same placeholder contract.

### 36. apps/core/src/shell/shell.service.ts:83-89

**Observation:** `import(pathToFileURL(entryPath).href)` loads web-shell `server/entry-server.js`, with path assembled from `webDistDir`. File is in `apps/core`, which is not a frontend unit.

**Interpretation:** Backend loads site shell SSR bundle at runtime to render pages in its own process.

### 37. apps/core/src/shell/shell.service.ts:135-147; apps/core/src/shell/shell.controller.ts:53

**Observation:** `entry.render(request, { onReady, onError })` executes web-shell render, passing matched module island descriptor and global widgets.

**Interpretation:** Server step delivering modules that site shell must announce on the page.

### 38. apps/core/src/registry/registry.service.ts:401-406, 471-485; modules/hello/server.mjs:87-95

**Observation:** `fetch(url, { headers, signal })` fetches `/.well-known/module-manifest` at each registered module's `baseUrl`, with signed headers. Manifest supplies `remoteEntry` and routes for the table core delivers to shells.

**Interpretation:** Backend resolves targets and `remoteEntry` used by both shells through module manifests.

### 39. apps/core/src/registry/registry.service.ts:307-318; apps/core/src/shell/shell.controller.ts:46-49

**Observation:** `fetch(new URL('/render', synced.registration.baseUrl), { method: 'POST', ... })` requests component HTML from module server and uses `data.html` as `islandHtml`.

**Interpretation:** Backend obtains prerendered island markup from another unit; server side of delegated SSR.

### 40. config/modules.example.json:4-5; apps/core/src/registry/registry-config.ts:4-7

**Observation:** `"moduleId": "hello"` and `"baseUrl": "http://127.0.0.1:4001"`. Core reads registry from `MODULE_REGISTRY_CONFIG`, rather than this example.

**Interpretation:** An example entry: names `hello`, but activates no composition.

### 41. .; package.json:1-13; pnpm-workspace.yaml:1-4

**Observation:** pnpm workspace root manifest (`apps/*`, `packages/*`, `modules/*`). `build` only delegates to members (`pnpm -r build`), without UI entry or build.

**Interpretation:** Monorepo coordination root rather than a frontend unit.

### 42. apps/admin-shell; apps/admin-shell/package.json:1-26; apps/admin-shell/index.html:12-13; apps/admin-shell/src/main.tsx:5-9; apps/admin-shell/vite.config.ts:4-8

**Observation:** Own manifest (`@likekiri/admin-shell`), `index.html` with `#root` and `/src/main.tsx`, React mounting through `createRoot` and own Vite configuration with `base: '/admin-assets/'`.

**Interpretation:** A frontend unit: dashboard SPA, with its own entry and build.

### 43. apps/core; apps/core/package.json:1-35; infra/systemd/likekiri-core.service:12, 16

**Observation:** Own manifest (`core`), NestJS backend building only through `tsc`, run by a systemd unit (`node apps/core/dist/main.js`).

**Interpretation:** Backend integrating modules and serving shells rather than a frontend unit.

### 44. apps/web-shell; apps/web-shell/package.json:1-26; apps/web-shell/vite.config.ts:8-29; apps/web-shell/src/entry-server.tsx:176-181; apps/web-shell/src/islands.ts:63-67, 113

**Observation:** Own manifest (`@likekiri/web-shell`), client (`src/islands.ts`) and SSR (`src/entry-server.tsx`) Vite build. Render uses `renderToPipeableStream` with `bootstrapModules: ['/assets/islands.js']`, and island runtime mounts through `hydrateRoot`/`createRoot`.

**Interpretation:** A frontend unit: site React shell, with its own client and SSR entries and build.

### 45. modules/chat; modules/chat/package.json:1-26; modules/chat/vite.config.ts:5-19; modules/chat/src/index.ts:1-2; infra/systemd/likekiri-module-chat.service:10, 13; infra/caddy/likekiri.caddy:28-30, 69-71

**Observation:** Own manifest (`@likekiri/module-chat`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 46. modules/clientes; modules/clientes/package.json:1-24; modules/clientes/vite.config.ts:9-46; modules/clientes/src/index.ts:1-5; infra/systemd/likekiri-module-clientes.service:10, 13; infra/caddy/likekiri.caddy:22-24, 63-65

**Observation:** Own manifest (`@likekiri/module-clientes`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 47. modules/cuentas; modules/cuentas/package.json:1-25; modules/cuentas/vite.config.ts:5-29; modules/cuentas/src/index.ts:1-3; infra/systemd/likekiri-module-cuentas.service:10, 12; infra/caddy/likekiri.caddy:51-53

**Observation:** Own manifest (`@likekiri/module-cuentas`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 48. modules/ejemplo-admin; modules/ejemplo-admin/package.json:1-25; modules/ejemplo-admin/vite.config.ts:7-30; modules/ejemplo-admin/src/index.ts:1-2; infra/systemd/likekiri-module-ejemplo-admin.service:10, 12; infra/caddy/likekiri.caddy:57-59

**Observation:** Own manifest (`@likekiri/module-ejemplo-admin`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 49. modules/ejemplo-web; modules/ejemplo-web/package.json:1-25; modules/ejemplo-web/vite.config.ts:8-30; modules/ejemplo-web/src/index.ts:1; infra/systemd/likekiri-module-ejemplo-web.service:10, 12; infra/caddy/likekiri.caddy:19-21

**Observation:** Own manifest (`@likekiri/module-ejemplo-web`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 50. modules/hello; modules/hello/package.json:1-24; modules/hello/vite.config.ts:7-32; modules/hello/src/index.ts:1-2; infra/systemd/likekiri-module-hello.service:10, 12; infra/caddy/likekiri.caddy:16-18

**Observation:** Own manifest (`@likekiri/module-hello`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 51. modules/media; modules/media/package.json:1-26; modules/media/vite.config.ts:5-27; modules/media/src/index.ts:1; infra/systemd/likekiri-module-media.service:10, 13; infra/caddy/likekiri.caddy:25-27, 66-68

**Observation:** Own manifest (`@likekiri/module-media`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 52. modules/ops; modules/ops/package.json:1-13; modules/ops/vite.config.ts:5-16; modules/ops/src/index.ts:1; infra/systemd/likekiri-module-ops.service:10, 12; infra/caddy/likekiri.caddy:72-74

**Observation:** Own manifest (`@likekiri/module-ops`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 53. modules/registry; modules/registry/package.json:1-25; modules/registry/vite.config.ts:5-27; modules/registry/src/index.ts:1; infra/systemd/likekiri-module-registry.service:10, 12; infra/caddy/likekiri.caddy:54-56

**Observation:** Own manifest (`@likekiri/module-registry`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 54. modules/sitio; modules/sitio/package.json:1-24; modules/sitio/vite.config.ts:5-27; modules/sitio/src/index.ts:1; infra/systemd/likekiri-module-sitio.service:10, 12; infra/caddy/likekiri.caddy:60-62

**Observation:** Own manifest (`@likekiri/module-sitio`) and federated build with `remoteEntry.js`. Build entry (`src/index.ts`) only reexports components, and there is no `index.html`. It has its own systemd process and Caddy proxy.

**Interpretation:** Two readings remain plausible: a frontend unit existing only as a shell remote, or a component package without its own UI. Remote role does not depend on this.

### 55. packages/contract; packages/contract/package.json:1-31

**Observation:** Own manifest (`@likekiri/contract`), only library `main`/`exports` and build through `tsc`.

**Interpretation:** A module–core contract library rather than a frontend unit.

### 56. packages/i18n; packages/i18n/package.json:1-21

**Observation:** Own manifest (`@likekiri/i18n`), only library `main`/`exports` and build through `tsc`.

**Interpretation:** A shared text library rather than a frontend unit.

### 57. packages/tokens; packages/tokens/package.json:1-15

**Observation:** Own manifest (`@likekiri/tokens`), only library `main`/`types` and build through `tsc`.

**Interpretation:** A shared design token library rather than a frontend unit.

### 58. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/chat/vite.config.ts:8-16; modules/chat/server.mjs:43, 496-497

**Observation:** Dashboard requests `admin` surface routes from core, registers remote and loads `chat/<exposto>` through `loadRemote`, mounting component in `ModulePage`. Target is `chat`: module server `MODULE_ID` equals federation `name`, and manifest `admin` routes use components exposed in `vite.config.ts`.

**Interpretation:** An active host → remote relationship between dashboard and module `chat` through runtime Module Federation, with target resolved through module manifest.

### 59. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/clientes/vite.config.ts:22-36; modules/clientes/server.mjs:45, 1016-1017

**Observation:** Dashboard requests `admin` surface routes from core, registers remote and loads `clientes/<exposto>` through `loadRemote`, mounting component in `ModulePage`. Target is `clientes`: module server `MODULE_ID` equals federation `name`, and manifest `admin` routes use components exposed in `vite.config.ts`.

**Interpretation:** An active host → remote relationship between dashboard and module `clientes` through runtime Module Federation, with target resolved through module manifest.

### 60. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/cuentas/vite.config.ts:8-20; modules/cuentas/server.mjs:23, 41-59

**Observation:** Dashboard requests `admin` surface routes from core, registers remote and loads `cuentas/<exposto>` through `loadRemote`, mounting component in `ModulePage`. Target is `cuentas`: module server `MODULE_ID` equals federation `name`, and manifest `admin` routes use components exposed in `vite.config.ts`.

**Interpretation:** An active host → remote relationship between dashboard and module `cuentas` through runtime Module Federation, with target resolved through module manifest.

### 61. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/ejemplo-admin/vite.config.ts:10-21; modules/ejemplo-admin/server.mjs:24, 42-53

**Observation:** Dashboard requests `admin` surface routes from core, registers remote and loads `ejemplo-admin/<exposto>` through `loadRemote`, mounting component in `ModulePage`. Target is `ejemplo-admin`: module server `MODULE_ID` equals federation `name`, and manifest `admin` routes use components exposed in `vite.config.ts`.

**Interpretation:** An active host → remote relationship between dashboard and module `ejemplo-admin` through runtime Module Federation, with target resolved through module manifest.

### 62. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/hello/vite.config.ts:10-21; modules/hello/server.mjs:23, 48-53

**Observation:** Dashboard requests `admin` surface routes from core, registers remote and loads `hello/<exposto>` through `loadRemote`, mounting component in `ModulePage`. Target is `hello`: module server `MODULE_ID` equals federation `name`, and manifest `admin` routes use components exposed in `vite.config.ts`.

**Interpretation:** An active host → remote relationship between dashboard and module `hello` through runtime Module Federation, with target resolved through module manifest.

### 63. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/media/vite.config.ts:8-18; modules/media/server.mjs:32, 430-435

**Observation:** Dashboard requests `admin` surface routes from core, registers remote and loads `media/<exposto>` through `loadRemote`, mounting component in `ModulePage`. Target is `media`: module server `MODULE_ID` equals federation `name`, and manifest `admin` routes use components exposed in `vite.config.ts`.

**Interpretation:** An active host → remote relationship between dashboard and module `media` through runtime Module Federation, with target resolved through module manifest.

### 64. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/ops/vite.config.ts:8-13; modules/ops/server.mjs:36, 267

**Observation:** Dashboard requests `admin` surface routes from core, registers remote and loads `ops/<exposto>` through `loadRemote`, mounting component in `ModulePage`. Target is `ops`: module server `MODULE_ID` equals federation `name`, and manifest `admin` routes use components exposed in `vite.config.ts`.

**Interpretation:** An active host → remote relationship between dashboard and module `ops` through runtime Module Federation, with target resolved through module manifest.

### 65. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/registry/vite.config.ts:8-18; modules/registry/server.mjs:23, 41-46

**Observation:** Dashboard requests `admin` surface routes from core, registers remote and loads `registry/<exposto>` through `loadRemote`, mounting component in `ModulePage`. Target is `registry`: module server `MODULE_ID` equals federation `name`, and manifest `admin` routes use components exposed in `vite.config.ts`.

**Interpretation:** An active host → remote relationship between dashboard and module `registry` through runtime Module Federation, with target resolved through module manifest.

### 66. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/sitio/vite.config.ts:8-18; modules/sitio/server.mjs:23, 41-47

**Observation:** Dashboard requests `admin` surface routes from core, registers remote and loads `sitio/<exposto>` through `loadRemote`, mounting component in `ModulePage`. Target is `sitio`: module server `MODULE_ID` equals federation `name`, and manifest `admin` routes use components exposed in `vite.config.ts`.

**Interpretation:** An active host → remote relationship between dashboard and module `sitio` through runtime Module Federation, with target resolved through module manifest.

### 67. apps/core/src/shell/shell.service.ts:89, 147; apps/web-shell/src/entry-server.tsx:79-80; apps/web-shell/src/islands.ts:54, 65-67, 90; apps/core/src/registry/registry.service.ts:346-355, 403; apps/web-shell/src/entry-server.tsx:57-58; modules/chat/vite.config.ts:8-16; modules/chat/server.mjs:43, 495

**Observation:** Core matches public route, executes web-shell render and passes island descriptor; shell writes placeholder with `data-likekiri-island` and `data-remote`, and island runtime registers remote and loads `chat/<exposto>`. Enters as a global widget, in a placeholder written on every page, and the same route may also match as a page island. Target is `chat`, through module manifest `MODULE_ID` and `web` routes.

**Interpretation:** An active host → remote relationship between site and module `chat` through runtime Module Federation.

### 68. apps/core/src/shell/shell.service.ts:89, 147; apps/web-shell/src/entry-server.tsx:79-80; apps/web-shell/src/islands.ts:54, 65-67, 90; apps/core/src/registry/registry.service.ts:307-318, 403; apps/web-shell/src/entry-server.tsx:95-96; modules/clientes/server.mjs:1095; modules/clientes/vite.config.ts:22-36; modules/clientes/server.mjs:45, 1013-1015

**Observation:** Core matches public route, executes web-shell render and passes island descriptor; shell writes placeholder with `data-likekiri-island` and `data-remote`, and island runtime registers remote and loads `clientes/<exposto>`. Routes are `ssr: 'server'`: core requests HTML from module `POST /render`, shell inserts it in placeholder and client hydrates with federated component. Target is `clientes`, through module manifest `MODULE_ID` and `web` routes.

**Interpretation:** An active host → remote relationship between site and module `clientes` through runtime Module Federation, with SSR delegated to module on the same path.

### 69. apps/core/src/shell/shell.service.ts:89, 147; apps/web-shell/src/entry-server.tsx:79-80; apps/web-shell/src/islands.ts:54, 65-67, 90; apps/core/src/registry/registry.service.ts:403; modules/ejemplo-web/vite.config.ts:11-21; modules/ejemplo-web/server.mjs:24, 42-48

**Observation:** Core matches public route, executes web-shell render and passes island descriptor; shell writes placeholder with `data-likekiri-island` and `data-remote`, and island runtime registers remote and loads `ejemplo-web/<exposto>`. Route is `ssr: 'shell'`: shell only writes placeholder, and island mounts on client. Target is `ejemplo-web`, through module manifest `MODULE_ID` and `web` routes.

**Interpretation:** An active host → remote relationship between site and module `ejemplo-web` through runtime Module Federation.

### 70. apps/core/src/shell/shell.service.ts:89, 147; apps/web-shell/src/entry-server.tsx:79-80; apps/web-shell/src/islands.ts:54, 65-67, 90; apps/core/src/registry/registry.service.ts:403; modules/hello/vite.config.ts:10-21; modules/hello/server.mjs:23, 41-47

**Observation:** Core matches public route, executes web-shell render and passes island descriptor; shell writes placeholder with `data-likekiri-island` and `data-remote`, and island runtime registers remote and loads `hello/<exposto>`. Route is `ssr: 'shell'`: shell only writes placeholder, and island mounts on client. Target is `hello`, through module manifest `MODULE_ID` and `web` routes.

**Interpretation:** An active host → remote relationship between site and module `hello` through runtime Module Federation.

### 71. apps/admin-shell/vite.config.ts:4-8; apps/admin-shell/package.json:9; package.json:9; apps/core/src/main.ts:27-32; apps/core/src/shell/shell.service.ts:100-103; infra/systemd/likekiri-core.service:12, 16

**Observation:** Own build (`vite build`) with `dist` output and `/admin-assets/` prefix. Core serves dashboard statics and `index.html`, and Caddy for `admin.likekiri.com` forwards everything other than `/modules/*` to core. No artifact publishes dashboard alone. No versioning used in publication.

**Interpretation:** Dashboard has its own build boundary, but is published alongside core and site (separate build, joint deployment).

### 72. apps/web-shell/vite.config.ts:8-29; apps/web-shell/package.json:8; package.json:9; apps/core/src/main.ts:21-26; apps/core/src/shell/shell.service.ts:81-87; infra/systemd/likekiri-core.service:12, 16; infra/caddy/likekiri.caddy:9-13

**Observation:** Two own builds, client (`dist/client`) and SSR (`dist/server`). Core imports SSR bundle and serves `dist/client` at `/assets/`. Caddy serves `/assets/*` from `/srv/likekiri/public`, populated by no snapshot artifact. No versioning used in publication.

**Interpretation:** Site has its own build boundary, but is published in core process (separate build, joint deployment).

### 73. modules/chat/vite.config.ts:5-19; modules/chat/package.json:8; infra/systemd/likekiri-module-chat.service:10, 13; modules/chat/server.mjs:37; infra/caddy/likekiri.caddy:28-30, 69-71

**Observation:** Own federated build, with `dist` output. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4009`, and Caddy gives module its own `/modules/chat/*` route on likekiri.com and admin.likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `chat` has its own build and deployment boundaries (separate build and deployment).

### 74. modules/clientes/vite.config.ts:9-46; modules/clientes/package.json:8; infra/systemd/likekiri-module-clientes.service:10, 13; modules/clientes/server.mjs:40, 466; infra/caddy/likekiri.caddy:22-24, 63-65

**Observation:** Own federated build, with `dist` output. Also generates `dist-ssr`, loaded by module server to respond to `/render`. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4006`, and Caddy gives module its own `/modules/clientes/*` route on likekiri.com and admin.likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `clientes` has its own build and deployment boundaries (separate build and deployment).

### 75. modules/cuentas/vite.config.ts:5-29; modules/cuentas/package.json:8; infra/systemd/likekiri-module-cuentas.service:10, 12; modules/cuentas/server.mjs:22; infra/caddy/likekiri.caddy:51-53

**Observation:** Own federated build, with `dist` output. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4002`, and Caddy gives module its own `/modules/cuentas/*` route on admin.likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `cuentas` has its own build and deployment boundaries (separate build and deployment).

### 76. modules/ejemplo-admin/vite.config.ts:7-30; modules/ejemplo-admin/package.json:8; infra/systemd/likekiri-module-ejemplo-admin.service:10, 12; modules/ejemplo-admin/server.mjs:23; infra/caddy/likekiri.caddy:57-59

**Observation:** Own federated build, with `dist` output. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4005`, and Caddy gives module its own `/modules/ejemplo-admin/*` route on admin.likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `ejemplo-admin` has its own build and deployment boundaries (separate build and deployment).

### 77. modules/ejemplo-web/vite.config.ts:8-30; modules/ejemplo-web/package.json:8; infra/systemd/likekiri-module-ejemplo-web.service:10, 12; modules/ejemplo-web/server.mjs:23; infra/caddy/likekiri.caddy:19-21

**Observation:** Own federated build, with `dist` output. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4004`, and Caddy gives module its own `/modules/ejemplo-web/*` route on likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `ejemplo-web` has its own build and deployment boundaries (separate build and deployment).

### 78. modules/hello/vite.config.ts:7-32; modules/hello/package.json:8; infra/systemd/likekiri-module-hello.service:10, 12; modules/hello/server.mjs:22, 98-113; infra/caddy/likekiri.caddy:16-18

**Observation:** Own federated build, with `dist` output. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4001`, and Caddy gives module its own `/modules/hello/*` route on likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `hello` has its own build and deployment boundaries (separate build and deployment).

### 79. modules/media/vite.config.ts:5-27; modules/media/package.json:8; infra/systemd/likekiri-module-media.service:10, 13; modules/media/server.mjs:28; infra/caddy/likekiri.caddy:25-27, 66-68

**Observation:** Own federated build, with `dist` output. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4008`, and Caddy gives module its own `/modules/media/*` route on likekiri.com and admin.likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `media` has its own build and deployment boundaries (separate build and deployment).

### 80. modules/ops/vite.config.ts:5-16; modules/ops/package.json:7; infra/systemd/likekiri-module-ops.service:10, 12; modules/ops/server.mjs:31; infra/caddy/likekiri.caddy:72-74

**Observation:** Own federated build, with `dist` output. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4010`, and Caddy gives module its own `/modules/ops/*` route on admin.likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `ops` has its own build and deployment boundaries (separate build and deployment).

### 81. modules/registry/vite.config.ts:5-27; modules/registry/package.json:8; infra/systemd/likekiri-module-registry.service:10, 12; modules/registry/server.mjs:22; infra/caddy/likekiri.caddy:54-56

**Observation:** Own federated build, with `dist` output. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4003`, and Caddy gives module its own `/modules/registry/*` route on admin.likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `registry` has its own build and deployment boundaries (separate build and deployment).

### 82. modules/sitio/vite.config.ts:5-27; modules/sitio/package.json:8; infra/systemd/likekiri-module-sitio.service:10, 12; modules/sitio/server.mjs:22; infra/caddy/likekiri.caddy:60-62

**Observation:** Own federated build, with `dist` output. Own systemd unit runs module `server.mjs`, serving `dist` at `127.0.0.1:4007`, and Caddy gives module its own `/modules/sitio/*` route on admin.likekiri.com. Checkout `/srv/likekiri/app` is shared by all units. Manifest version (0.1.0) is not used for publication.

**Interpretation:** Module `sitio` has its own build and deployment boundaries (separate build and deployment).

### 83. CLAUDE.md:3-5

**Observation:** "Plataforma modular (microkernel híbrido): core NestJS que no conoce ningún dominio de negocio, módulos independientes que publican manifest + bundle federado, `likekiri.com` (shell SSR + islas) y `admin.likekiri.com` (SPA CSR)."

**English translation:** Modular hybrid microkernel platform: a business-domain-free NestJS core, independent modules publishing manifests and federated bundles, public SSR/island shell and admin CSR SPA.

**Interpretation:** Presents unit organization: a domain-free core, modules publishing manifests and federated bundles, and both surfaces. The claim is corroborated.

### 84. CLAUDE.md:10-11

**Observation:** "**El core nunca importa un módulo.** `grep -rn \"modules/\" apps/core/src` debe devolver vacío. Los módulos entran solo por manifest validado."

**English translation:** Core never imports a module; modules enter only through a validated manifest. The proposed grep must return empty.

**Interpretation:** Says modules connect to platform only through core-validated manifests, without core imports. The claim is corroborated.

### 85. CLAUDE.md:12-13

**Observation:** "`packages/contract` es el contrato módulo↔core."

**English translation:** Package contract is the module–core contract.

**Interpretation:** Positions the module–core contract library. The claim is corroborated.

### 86. CLAUDE.md:25-26

**Observation:** "`apps/core` — NestJS: API, registry, auth, SSR del shell." […] "`apps/web-shell` — React shell del website público (SSR en core + hidratación)."

**English translation:** Core provides API, registry, authentication and shell SSR; web-shell is the public React shell, rendered in core and hydrated.

**Interpretation:** Describes site shell as a unit rendered in core and hydrated on client. The claim is corroborated.

### 87. CLAUDE.md:27-29

**Observation:** "`apps/admin-shell` — shell de la SPA de admin: login, aceptar invitación y cargador de micro-frontends. SIN pantallas de negocio: el sidebar se construye 100% desde el manifest (ADR 005)."

**English translation:** Admin-shell provides only login, invitation acceptance and micro-frontend loading, without business screens; sidebar comes entirely from manifest.

**Interpretation:** Describes dashboard as micro-frontend loader whose business screens come from modules. The claim is corroborated.

### 88. CLAUDE.md:31-32

**Observation:** "`modules/cuentas` — usuarios, invitaciones y contraseña (submenú \"Cuentas\")." "`modules/registry` — vista del registry (submenú \"Plataforma\", modo toggle)."

**English translation:** cuentas provides users, invitations and passwords; registry provides registry view. Both enter admin as submenus.

**Interpretation:** Positions `cuentas` and `registry` as dashboard modules. The claim is corroborated.

### 89. CLAUDE.md:33-34

**Observation:** "`modules/ejemplo-web` / `modules/ejemplo-admin` — PLANTILLAS comentadas para crear módulos nuevos (una por superficie)"

**English translation:** Commented templates, one per surface, for creating new modules.

**Interpretation:** Positions the two template modules, one per surface. The claim is corroborated.

### 90. CLAUDE.md:35-37

**Observation:** "`modules/clientes` — módulo con DOMINIO PROPIO (API + SQLite): registro y portal de clientes en el front […], cuentas/planes/facturación en el admin."

**English translation:** A module with its own API/SQLite business domain, public registration and customer portal, and admin accounts, plans and billing.

**Interpretation:** Positions `clientes` as a module with screens on both surfaces. The claim is corroborated.

### 91. CLAUDE.md:38-39

**Observation:** "`modules/sitio` — server-driven UI: edita la estructura del sitio público (anuncio, menú, pie) que el core inyecta en cada render del SSR (ADR 006)."

**English translation:** Module sitio edits public site structure, injected by core into every SSR render.

**Interpretation:** Says a module screen in dashboard edits the structure drawn by site shell. The claim is corroborated.

### 92. CLAUDE.md:41

**Observation:** "`modules/chat` — chat en vivo por WebSocket (widget global + panel de agente)."

**English translation:** Chat provides a global public widget and an admin agent panel over WebSocket.

**Interpretation:** Positions chat on both surfaces, as site widget and admin panel. The claim is corroborated.

### 93. CLAUDE.md:43

**Observation:** "`packages/tokens` — design tokens compartidos."

**English translation:** Shared design tokens.

**Interpretation:** Positions a shared library. The claim is corroborated.

### 94. CLAUDE.md:44

**Observation:** "`infra/` — plantillas de Caddy, systemd y docker-compose (dev)."

**English translation:** infra/ contains Caddy, systemd and development docker-compose templates.

**Interpretation:** Describes infrastructure template folder. The claim is corroborated.

### 95. README.md:35-37

**Observation:** "Si un módulo se cae o se borra de la configuración, el resto de la plataforma sigue funcionando."

**English translation:** If a module fails or is removed from configuration, the rest of the platform keeps working.

**Interpretation:** Claims operational module independence. Code supports failure isolation rather than an observed execution. The claim is corroborated.

### 96. README.md:40-50

**Observation:** diagram: "Caddy (único punto de entrada externo, TLS, proxy)" → "likekiri.com / www", "admin.likekiri.com", "/modules/<id>/* (por host)" → "apps/core"

**English translation:** Caddy is the only external entry point, handling TLS and proxying both hosts and /modules/<id>/* to core.

**Interpretation:** Places `/modules/<id>/*` paths behind core, but Caddy sends them directly to each module port. The claim is contradicted.

### 97. README.md:54-59

**Observation:** diagram: "apps/core" → "import() dinámico" → "apps/web-shell (SSR + islas)", "apps/admin-shell (SPA, sidebar generado desde el manifest)"

**English translation:** Core loads both shells through dynamic import().

**Interpretation:** Says core loads both shells through `import()`; this holds for web-shell, but dashboard is served as `index.html` and statics. The claim is contradicted.

### 98. README.md:54-59

**Observation:** diagram: "apps/core" → "fetch HTTP firmado HMAC" → "modules/<id> (proceso propio) manifest + remoteEntry.js + server.mjs + DB propia (opcional)"

**English translation:** Core communicates with each module through signed HTTP; each is its own process with manifest, federated entry, server script and optional database.

**Interpretation:** Describes each module as its own process queried by core through signed HTTP. The claim is corroborated.

### 99. README.md:64-65

**Observation:** "Caddy reenvía la petición al core (`127.0.0.1:3000`), salvo los estáticos federados bajo `/modules/<id>/*`, que van directo al proceso del módulo."

**English translation:** Caddy forwards requests to core except /modules/<id>/*, sent directly to module processes.

**Interpretation:** Module portion matches, but site has another exception: `/assets/*` is served by Caddy from disk. The claim is contradicted.

### 100. README.md:69-70

**Observation:** "Para `web`, el core resuelve el path contra el **registry** de módulos (rutas + páginas propias del shell) y arma un `RenderRequest`."

**English translation:** For the public site, core matches path against module registry routes and shell pages and assembles the render request.

**Interpretation:** Describes how core chooses each site page module. The claim is corroborated.

### 101. README.md:71-73

**Observation:** "El core carga dinámicamente (`import()` ESM, ya que el propio core es CommonJS) el bundle SSR de `apps/web-shell` (`dist/server/entry-server.js`) y hace streaming del HTML (`renderToPipeableStream`)"

**English translation:** Core loads the web-shell SSR bundle through ESM import() despite core being CommonJS and streams HTML.

**Interpretation:** Describes core loading shell SSR bundle. The claim is corroborated.

### 102. README.md:74-77

**Observation:** "Si la ruta del módulo declara `ssr: \"server\"` (ADR 007), el core pide el HTML ya renderizado al propio módulo (`POST /render`, firmado, timeout de 400 ms) y lo incrusta con `data-hydrate=\"1\"`. Si el módulo no responde a tiempo, degrada automáticamente a un placeholder de isla"

**English translation:** With ssr: "server", core requests signed rendered HTML from module with a four-hundred-millisecond timeout and inserts it with hydration marker; timeout falls back to an island placeholder.

**Interpretation:** Describes SSR delegated to module and degradation to placeholder. The claim is corroborated.

### 103. README.md:78-80

**Observation:** "En el cliente, `islands.ts` escanea los `[data-likekiri-island]`, inicializa Module Federation (React/ReactDOM compartidos como singleton) y monta o hidrata cada isla. Si una isla falla, solo se rompe su propio hueco."

**English translation:** Client island runtime scans placeholders, initializes federation with singleton React/ReactDOM and mounts or hydrates each island; failure affects only that island.

**Interpretation:** Describes island runtime loading site modules. The claim is corroborated.

### 104. README.md:87-90

**Observation:** "Al navegar a una ruta de módulo, `federation.ts` carga el componente remoto vía `@module-federation/runtime` (`loadRemote`) y lo monta con los `:params` de la URL como props."

**English translation:** Admin loads remote component through loadRemote and mounts it with URL parameters as props.

**Interpretation:** Describes dashboard module loading. The claim is corroborated.

### 105. README.md:94-95

**Observation:** "Lee `config/modules.json` (`{ moduleId, baseUrl, hmacKey }` por módulo, sin claves duplicadas ni compartidas)."

**English translation:** Registry reads module ids, base URLs and HMAC keys from the configured registry file, rejecting duplicate ids and shared keys.

**Interpretation:** Describes module registry read by core. Actual file is outside snapshot; format matches example and code. The claim is corroborated.

### 106. README.md:96-98

**Observation:** "Cada `REGISTRY_REFRESH_MINUTES` (por defecto 5) sincroniza con todos los módulos: `GET /.well-known/module-manifest` firmado, verifica la firma de la respuesta y valida el manifest"

**English translation:** Core periodically pulls each signed manifest, verifies response signature and validates it; default refresh is five minutes.

**Interpretation:** Describes core obtaining module manifests. The claim is corroborated.

### 107. README.md:101-102

**Observation:** "Compila tablas de rutas para `web` y `admin`; ante colisión de ruta, **gana el primer módulo en registrarla** y el manifest en conflicto se rechaza entero."

**English translation:** Core compiles route tables per surface; first registered route wins collisions, and conflicting manifest is rejected in full.

**Interpretation:** Describes how core allocates routes among modules per surface. The claim is corroborated.

### 108. README.md:117-118

**Observation:** "`widget: true` en una ruta la convierte en isla flotante global, visible en todas las páginas del sitio (usado por el chat, ADR 008)."

**English translation:** widget: true makes a route a global floating island visible on all public pages, as used by chat.

**Interpretation:** Describes chat entering every site page. The claim is corroborated.

### 109. README.md:136

**Observation:** "pnpm 11.20.0 (workspaces puros — sin Turborepo ni Nx)"

**English translation:** Only pnpm workspaces, without Turborepo or Nx.

**Interpretation:** Names monorepo tool. The claim is corroborated.

### 110. README.md:142

**Observation:** "Frontend (shells y módulos) \| React 19 + Vite 8"

**English translation:** Shells and modules use React nineteen and Vite eight.

**Interpretation:** Names unit framework and build. The claim is corroborated.

### 111. README.md:143

**Observation:** "Federación de módulos \| `@module-federation/vite` (build) y `@module-federation/runtime` (carga en cliente)"

**English translation:** Federation uses the Vite build plugin and client runtime loader.

**Interpretation:** Names federation technology in build and client. The claim is corroborated.

### 112. README.md:149

**Observation:** "Proceso en producción \| systemd nativo, sin Docker (Docker solo para Postgres en desarrollo)"

**English translation:** Production uses native systemd without Docker; Docker is only for development Postgres.

**Interpretation:** Describes production process execution. The claim is corroborated.

### 113. README.md:151-152

**Observation:** "No hay ESLint, Prettier ni CI (`.github/workflows`) configurados actualmente en el repo"

**English translation:** No ESLint, Prettier or CI is configured.

**Interpretation:** Describes absence of CI. The claim is corroborated.

**Note:** Section 3.4.7 corroborates it through the Overview in 3.4.6 ("Não há CI"; English translation: "There is no CI"), which has no observation of its own; this row therefore has no target.

### 114. README.md:172

**Observation:** "`ops/` Admin-only: respaldo de base de datos y commit/push a git"

**English translation:** Module ops enters only admin, providing database backup and git commit/push.

**Interpretation:** Positions `ops` only in dashboard. The claim is corroborated.

### 115. README.md:176

**Observation:** "`i18n/` Strings ES/EN compartidos por ambos shells"

**English translation:** Spanish/English strings are shared by both shells.

**Interpretation:** Positions a library shared by shells. The claim is corroborated.

### 116. README.md:179

**Observation:** "`systemd/` Una unit file por proceso (core + cada módulo desplegable)"

**English translation:** One systemd unit per process: core and each deployable module.

**Interpretation:** Says each module is published in its own process. The claim is corroborated.

### 117. README.md:244-245

**Observation:** "El `web-shell` no tiene servidor de desarrollo propio: su SSR se sirve a través del core, que carga el bundle construido"

**English translation:** Web-shell has no independent development server; its built SSR bundle is served through core.

**Interpretation:** Says site shell does not run without core. The claim is corroborated.

### 118. README.md:326

**Observation:** "deploy vía rsync + systemd" (ADR 004).

**English translation:** Publishing through rsync and systemd.

**Interpretation:** Systemd portion matches; snapshot has no rsync artifact. The claim is partial.

### 119. apps/admin-shell/src/federation.ts:11-12

**Observation:** "El host APORTA su React a los remotos (singleton)."

**English translation:** Admin supplies its own React to remotes as singleton.

**Interpretation:** Describes React sharing between host and remotes. The claim is corroborated.

### 120. apps/admin-shell/vite.config.ts:6

**Observation:** "Prefijo propio para no colisionar con /assets del web-shell en el core."

**English translation:** Admin uses its own prefix to avoid collision with web-shell assets in the same core.

**Interpretation:** Indicates both shells are served by same core. The claim is corroborated.

### 121. apps/web-shell/src/entry-server.tsx:13-15

**Observation:** "El core hace SSR únicamente del shell; los componentes remotos se emiten como placeholders de isla que el cliente carga vía Module Federation e hidrata."

**English translation:** Core renders only shell; remote components are emitted as island placeholders loaded and hydrated by client federation.

**Interpretation:** Describes division between shell SSR and client module loading; delegated HTML comes from module server rather than core. The claim is corroborated.

### 122. apps/web-shell/src/entry-server.tsx:179-180

**Observation:** "El runtime de islas solo se envía cuando la página tiene islas: las páginas estáticas del shell viajan sin JavaScript."

**English translation:** Island runtime is sent only when page contains islands; static shell pages carry no JavaScript.

**Interpretation:** Describes when island runtime is sent to client. The claim is corroborated.

### 123. apps/web-shell/vite.config.ts:4-7

**Observation:** "Dos builds: cliente: solo el runtime de islas (islands.js con nombre fijo, referenciado por bootstrapModules del SSR como /assets/islands.js); servidor: entry-server.tsx para el SSR del shell desde el core"

**English translation:** Two builds: client contains only fixed-name island runtime referenced by SSR; server provides shell SSR within core.

**Interpretation:** Describes the site shell two builds. The claim is corroborated.

### 124. docs/adr/004-ssr-islas-auth-y-despliegue.md:11-14

**Observation:** "Las islas NO se renderizan en servidor: el SSR emite un placeholder `data-likekiri-island` + `data-props` […] y el runtime cliente (`islands.js`) las monta con `@module-federation/runtime`."

**English translation:** Islands are not server-rendered; SSR emits placeholders and props, mounted by client runtime federation.

**Interpretation:** Placeholder and mounting match, but `clientes` islands are rendered on module server. The claim is contradicted.

### 125. docs/adr/004-ssr-islas-auth-y-despliegue.md:44-45

**Observation:** "`/srv/likekiri/public/assets` = assets cliente del web-shell servidos directo por Caddy."

**English translation:** Web-shell client assets are served directly from disk by Caddy.

**Interpretation:** Caddy serves `/assets/*` from that directory, but nothing in snapshot copies web-shell assets there. The claim is partial.

### 126. docs/adr/005-admin-por-modulos-y-submenus.md:65-67

**Observation:** "Los estáticos federados de módulos de admin se sirven por el mismo origen (`https://admin.likekiri.com/modules/<id>/` vía handle_path de Caddy), sin CORS. Los de web siguen en `https://likekiri.com/modules/<id>/`."

**English translation:** Admin module statics use the admin origin without CORS; web module statics remain at public origin.

**Interpretation:** Holds for admin-only modules, but `hello`, which has a dashboard page, only has a route on `likekiri.com`. The claim is contradicted.

### 127. docs/adr/005-admin-por-modulos-y-submenus.md:70-72

**Observation:** "Las pantallas de módulos usan las clases CSS del shell (panel, chip, boton…) además de los design tokens; ese acoplamiento estético está asumido y documentado en los README de los módulos."

**English translation:** Module screens use shell CSS classes and design tokens; this aesthetic coupling is accepted and documented in module READMEs.

**Interpretation:** Records style coupling between modules and dashboard shell. The claim is corroborated.

### 128. docs/adr/006-server-driven-shell-y-tipo-de-cuenta.md:31-32

**Observation:** "Circuito verificado en producción: fila en `ShellSetting` → siguiente render muestra anuncio y menú modificados; sin fila → defaults."

**English translation:** Site configuration circuit was verified in production: stored ShellSetting changes next render; absent row uses defaults.

**Interpretation:** Claims production verification of site configuration, recorded by no artifact. The claim remains uncorroborated.

### 129. docs/adr/007-ssr-delegado-al-modulo.md:20-23

**Observation:** "El módulo construye un bundle SSR aparte (`vite build --ssr`, sin federación) y su `server.mjs` expone `POST /render` → `renderToString` del componente pedido. La petición del core llega **firmada con la clave HMAC del módulo** y el módulo la verifica."

**English translation:** Module builds a separate SSR bundle without federation, used by its server to render requested component; requests are signed with module HMAC key and verified.

**Interpretation:** Describes module side of delegated SSR. The claim is corroborated.

### 130. docs/adr/007-ssr-delegado-al-modulo.md:31-33

**Observation:** "Verificado en producción: `/clientes/acceso` entrega el formulario completo en el HTML inicial sin ejecutar JS; con el servicio del módulo detenido, la misma URL responde 200 con el placeholder y la isla se monta en cliente."

**English translation:** Production verification includes complete initial form HTML without JS and graceful placeholder degradation with stopped module.

**Interpretation:** Claims production verification of delegated SSR and degradation, recorded by no artifact. The claim remains uncorroborated.

### 131. docs/adr/007-ssr-delegado-al-modulo.md:52-53

**Observation:** "Sin contexto React compartido a través de la frontera: las islas son autocontenidas por diseño."

**English translation:** No React context crosses the boundary; islands are self-contained by design.

**Interpretation:** Describes boundary between shell and module islands. The claim is corroborated.

### 132. docs/adr/007-ssr-delegado-al-modulo.md:54-55

**Observation:** "`modules/clientes` es el primer caso (registro, acceso y portal); `hello` y `ejemplo-web` permanecen en `\"shell\"` como referencia del modo básico."

**English translation:** clientes uses delegated SSR for registration, login and portal; hello and ejemplo-web remain in shell mode.

**Interpretation:** Says which module uses delegated SSR and which use basic mode. The claim is corroborated.

### 133. docs/adr/008-chat-websocket-y-widgets-globales.md:29-30

**Observation:** "Verificado `wss://likekiri.com/modules/chat/ws` de punta a punta con TLS."

**English translation:** Chat WebSocket was verified end to end with TLS through public domain.

**Interpretation:** Claims production verification of chat WebSocket, recorded by no artifact. The claim remains uncorroborated.

### 134. docs/como-integrar-un-modulo.md:8-9

**Observation:** "Otros ejemplos vivos: `modules/hello` (web + admin), `modules/cuentas` (admin con permisos consumidos), `modules/registry` (admin)."

**English translation:** hello uses both surfaces; cuentas and registry only admin, with consumed permissions for accounts.

**Interpretation:** Positions three modules in surfaces. The claim is corroborated.

### 135. docs/como-integrar-un-modulo.md:67-69

**Observation:** "El nombre expuesto (sin `./`) debe coincidir con el **nombre del export** del archivo […]. Los shells buscan `mod['MiPagina'] ?? mod.default`."

**English translation:** Shells seek the export matching exposed name without its prefix or default; those names must match.

**Interpretation:** Describes convention between exposed name and export sought by shells. The claim is corroborated.

### 136. docs/como-integrar-un-modulo.md:162-165

**Observation:** "**Ruta** con `surface: \"web\"` y `ssr: \"shell\"` (único modo hoy): el core renderiza en servidor el layout […] y emite tu isla como placeholder"

**English translation:** For public routes, ssr: "shell" is the only current mode: core server-renders layout and emits the island placeholder.

**Interpretation:** `shell` mode matches, but is not the only one: `clientes` uses `ssr: 'server'`. The claim is contradicted.

### 137. docs/como-integrar-un-modulo.md:208-210

**Observation:** "La API vive en el server del módulo, expuesta por Caddy bajo `/modules/<id>/api/...` en los orígenes que la necesiten — misma ruta relativa desde el front y desde el admin, sin CORS."

**English translation:** Module API runs in its own server and is exposed by Caddy on both needed origins using the same relative path, without CORS.

**Interpretation:** Describes location and exposure of module backend API. The claim is corroborated.

### 138. docs/como-integrar-un-modulo.md:235-236

**Observation:** "`modules/ejemplo-web` (isla web comentada, en producción en `/ejemplo-web/demo`)"

**English translation:** Template module is in production at its demonstration path.

**Interpretation:** Claims template module is published in production, shown by no artifact. The claim remains uncorroborated.

### 139. docs/design/design-system.md:17-19

**Observation:** "Las variables `--lk-*` actuales las consumen `admin-shell` y 9 archivos de módulos (`chat`, `clientes`, `cuentas`, `media`, `ops`, `ejemplo-web`)."

**English translation:** Token variables are consumed by admin and nine files across six modules.

**Interpretation:** Describes use of shared design variables. The claim is corroborated.

### 140. modules/cuentas/README.md:17-19

**Observation:** "Sus pantallas hablan con las APIs del core (`/api/admin/*`, `/api/auth/*`) por el mismo origen"

**English translation:** Screens in cuentas use core APIs through the same origin.

**Interpretation:** Describes module screens calling backend APIs. The claim is corroborated.

### 141. modules/ejemplo-admin/README.md:16-17

**Observation:** "**Llamadas a la API del core** por el mismo origen (`/api/health` en PanelPage)"

**English translation:** ejemplo-admin screen calls core API through the same origin.

**Interpretation:** Describes a module screen calling backend API. The claim is corroborated.

### 142. modules/ejemplo-admin/README.md:18-19

**Observation:** "Dos páginas expuestas desde un mismo remoteEntry (`./PanelPage`, `./AjustesPage`)."

**English translation:** Two pages exposed through the same remoteEntry.

**Interpretation:** Describes modules exposed by a remote. The claim is corroborated.

### 143. modules/ejemplo-admin/vite.config.ts:5-6

**Observation:** "name = moduleId; cada expose es una página que la SPA monta cuando la ruta del manifest coincide."

**English translation:** Federation name equals moduleId; each expose is a page mounted by admin when manifest route matches.

**Interpretation:** Links federation name to `moduleId` and exposures to pages mounted by dashboard. The claim is corroborated.

### 144. modules/ejemplo-web/README.md:18-19

**Observation:** "**Un módulo web no registra menú**: el header del sitio público es estático; `menu: []`."

**English translation:** Public module registers no menu; public header is static.

**Interpretation:** Menu portion matches, but site header is drawn on each render from configuration edited by `sitio`. The claim is contradicted.

### 145. modules/ejemplo-web/package.json:5

**Observation:** "Módulo de ejemplo de la superficie web: isla SSR + hidratación"

**English translation:** Example public module is an SSR island with hydration.

**Interpretation:** `ejemplo-web` island mounts only on client; SSR applies to layout. The claim is contradicted.

### 146. modules/hello/README.md:9-12

**Observation:** "**Componentes React federados** (`vite.config.ts` + `@module-federation/vite`): el build produce `dist/remoteEntry.js`, que expone `./HelloIsland` y `./HelloAdminPage`. Los shells los cargan en runtime; el core jamás importa este código."

**English translation:** hello exposes two federated React components loaded by shells at runtime; core never imports their code.

**Interpretation:** Describes `hello` as a remote loaded by both shells. The claim is corroborated.

### 147. modules/media/README.md:3-6

**Observation:** "Biblioteca de archivos del admin […]. Módulo independiente con API y almacenamiento propios (SQLite + disco), como `clientes`."

**English translation:** media is an independent admin file library with its own API and SQLite/disk storage, like clientes.

**Interpretation:** Positions `media` as an independent dashboard module. The claim is corroborated.

### 148. modules/media/README.md:17-18

**Observation:** "**Servir**: `https://likekiri.com/modules/media/files/<id>.<ext>` (también por el origen del admin)"

**English translation:** Files are published on public and admin origins.

**Interpretation:** Describes where module backend serves uploaded files. The claim is corroborated.

### 149. modules/registry/README.md:14-15

**Observation:** "Consume la API del core `/api/admin/registry`"

**English translation:** registry screen consumes core registry API.

**Interpretation:** Describes a module screen calling backend API. The claim is corroborated.

### 150. b8e9bb8 2026-08-09 (modules/hello); 538ba5d 2026-08-09 (modules/cuentas); 74aa201 2026-08-09 (modules/registry); ff12015 2026-08-09 (modules/ejemplo-web); d1c8ed8 2026-08-09 (modules/ejemplo-admin); b30a632 2026-08-09 (modules/clientes); e4ac6f6 2026-08-09 (modules/sitio); afbd254 2026-08-09 (modules/media); 2777b37 2026-08-09 (modules/chat); 5d7e591 2026-08-10 (modules/ops)

**Observation:** Each module is created by a commit containing `src/index.ts`, `vite.config.ts` and `server.mjs` (`hello` in two steps). The ten `src/index.ts` files do not change afterward, and no commit creates or removes `index.html` or `main.tsx` in `modules/`.

**Interpretation:** Modules originated as remotes and never had an entry starting UI independently; structure's `Undetermined` does not remain from an abandoned stage. Point clarified, without changing section 3.4.3 value.

### 151. config/modules.example.json:3-7; .gitignore:12; apps/core/src/registry/registry-config.ts:3-7 (resolved by the snapshot)

**Observation:** Actual `config/modules.json`, containing HMAC keys, is in `.gitignore`, and core code says only example is versioned. History was not consulted.

**Interpretation:** Example registry is a template rather than active or abandoned configuration. Snapshot resolves the point.

### 152. 44bf4ff 2026-08-09 (apps/core/src/main.ts); 5d7e591 2026-08-10 (infra/caddy/likekiri.caddy); ac38c35 2026-08-10 (apps/core/src/shell/shell.service.ts); 4b8c5fd 2026-08-16 (README.md)

**Observation:** `README.md` only appears in snapshot commit, six days after last Caddy and core changes. Caddy version from `5d7e591` already matches snapshot; earlier Caddy and `shell.service.ts` versions are unavailable in clone.

**Interpretation:** README discrepancies do not come from versioned changes after it. Point clarified; claims remain contradicted.

### 153. c80dbce 2026-08-09 (infra); 27ebeba 2026-08-09 (docs/adr/004-ssr-islas-auth-y-despliegue.md); ccf3467 2026-08-09 (docs/adr/004-ssr-islas-auth-y-despliegue.md)

**Observation:** ADR 004 changes only in `ccf3467`, whose version matches snapshot. `infra/` receives only systemd units, Caddy and `infra/ops/`, and no file is removed from `infra/`, `docs/`, `config/`, `packages/`, `modules/` or root.

**Interpretation:** Repository never had an rsync or asset-copy script; described copy is performed outside it. Point clarified.

### 154. ccf3467 2026-08-09 (docs/adr/004-ssr-islas-auth-y-despliegue.md); ae539bf 2026-08-09 (docs/como-integrar-un-modulo.md); ae16de2 2026-08-09 (packages/contract); c290788 2026-08-09 (apps/core); 8cc44af 2026-08-09 (apps/web-shell); 8ffb581 2026-08-09 (modules/clientes); 07c85d0 2026-08-09 (docs/adr/007-ssr-delegado-al-modulo.md)

**Observation:** Last ADR 004 and guide versions, matching snapshot, precede `ae16de2`, announcing `ssr` `'server'` mode, and series implementing and documenting it.

**Interpretation:** Both sentences were written before delegated SSR and were not updated. Point clarified.

### 155. b8e9bb8 2026-08-09 (modules/hello); ae30ea2 2026-08-09 (infra/caddy/likekiri.caddy; modules/hello/server.mjs); f529e9b 2026-08-09 (infra/caddy/likekiri.caddy); 4334294 2026-08-09 (docs/adr/005-admin-por-modulos-y-submenus.md); 5d7e591 2026-08-10 (infra/caddy/likekiri.caddy)

**Observation:** `HelloAdminPage.tsx` has existed since module skeleton, and ADR 005 was written afterward and never changes. All Caddy versions before `5d7e591` and the `server.mjs` of `hello` at `ae30ea2` failed due to missing objects.

**Interpretation:** History does not show whether dashboard domain ever had a `hello` route. Point inconclusive, but uncertainty concerns only past: in snapshot Caddy does not provide that route.

### 156. ff12015 2026-08-09 (modules/ejemplo-web/README.md); 7e19810 2026-08-09 (apps/core/src/shell/shell.service.ts); ccafe11 2026-08-09; e4ac6f6 2026-08-09 (modules/sitio)

**Observation:** The `ejemplo-web` README is created in `ff12015`, already containing the sentence, and never changes. Commits making header configurable through backend and creating `sitio` follow.

**Interpretation:** The "static" header sentence comes from an earlier stage and was not updated. Point clarified.

### 157. ff12015 2026-08-09 (modules/ejemplo-web/package.json); ae16de2 2026-08-09 (packages/contract)

**Observation:** The `package.json` of `ejemplo-web` is created in `ff12015`, already with `description`, and never changes. Module predates `ae16de2`, announcing `ssr` `'server'` mode.

**Interpretation:** The "isla SSR" (English translation: "SSR island") does not remain from a delegated SSR stage, which came later. Point clarified; claim remains contradicted.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/admin-shell/package.json:14) | 1 technology | manifest | module-federation | technological | weak | declares #24; declares #25; declares #26; declares #27 |
| 2 | 3.4.2 (apps/web-shell/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #30; declares #31 |
| 3 | 3.4.2 (modules/chat/package.json:19) | 1 technology | manifest | module-federation | technological | weak | declares #13 |
| 4 | 3.4.2 (modules/clientes/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #14 |
| 5 | 3.4.2 (modules/cuentas/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #15 |
| 6 | 3.4.2 (modules/ejemplo-admin/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #16 |
| 7 | 3.4.2 (modules/ejemplo-web/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #17 |
| 8 | 3.4.2 (modules/hello/package.json:17) | 1 technology | manifest | module-federation | technological | weak | declares #18 |
| 9 | 3.4.2 (modules/media/package.json:19) | 1 technology | manifest | module-federation | technological | weak | declares #19 |
| 10 | 3.4.2 (modules/ops/package.json:10) | 1 technology | manifest | module-federation | technological | weak | declares #20 |
| 11 | 3.4.2 (modules/registry/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #21 |
| 12 | 3.4.2 (modules/sitio/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #22 |
| 13 | 3.4.2 (modules/chat/package.json:19, Evidence); 3.4.3 (modules/chat, Markers and Build); 3.4.5 #1, #10 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #21, #37 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #45; configures #58; configures #67 |
| 14 | 3.4.2 (modules/clientes/package.json:18, Evidence); 3.4.3 (modules/clientes, Markers and Build); 3.4.5 #2, #11 (Configuration); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #46; configures #59; configures #68 |
| 15 | 3.4.2 (modules/cuentas/package.json:18, Evidence); 3.4.3 (modules/cuentas, Markers and Build); 3.4.5 #3 (Configuration); 3.4.6 #5 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #47; configures #60 |
| 16 | 3.4.2 (modules/ejemplo-admin/package.json:18, Evidence); 3.4.3 (modules/ejemplo-admin, Markers and Build); 3.4.5 #4 (Configuration); 3.4.6 #6 (Artifacts); 3.4.7 #60, #61 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #48; configures #61 |
| 17 | 3.4.2 (modules/ejemplo-web/package.json:18, Evidence); 3.4.3 (modules/ejemplo-web, Markers and Build); 3.4.5 #12 (Configuration); 3.4.6 #7 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #49; configures #69 |
| 18 | 3.4.2 (modules/hello/package.json:17, Evidence); 3.4.3 (modules/hello, Markers and Build); 3.4.4 (apps/admin-shell/src/federation.ts:44; apps/web-shell/src/islands.ts:54, Observation); 3.4.5 #5, #13 (Configuration); 3.4.6 #8 (Artifacts); 3.4.7 #1, #37, #64 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #50; configures #62; configures #70 |
| 19 | 3.4.2 (modules/media/package.json:19, Evidence); 3.4.3 (modules/media, Markers and Build); 3.4.5 #6 (Configuration); 3.4.6 #9 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #51; configures #63 |
| 20 | 3.4.2 (modules/ops/package.json:10, Evidence); 3.4.3 (modules/ops, Markers and Build); 3.4.5 #7 (Configuration); 3.4.6 #10 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #52; configures #64 |
| 21 | 3.4.2 (modules/registry/package.json:18, Evidence); 3.4.3 (modules/registry, Markers and Build); 3.4.5 #8 (Configuration); 3.4.6 #11 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #53; configures #65 |
| 22 | 3.4.2 (modules/sitio/package.json:18, Evidence); 3.4.3 (modules/sitio, Markers and Build); 3.4.5 #9 (Configuration); 3.4.6 #12 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #54; configures #66 |
| 23 | 3.4.4 (config/modules.example.json:4, File:line); 3.4.5 #5, #13 (Configuration); 3.4.6 #8 (Where served); 3.4.7 #23 (Evidence) | 2 configuration | configuration | — | architectural | weak | — |
| 24 | 3.4.4 (apps/admin-shell/src/federation.ts:1) | 3 code | source code | module-federation | technological | moderate | implements #58; implements #59; implements #60; implements #61; implements #62; implements #63; implements #64; implements #65; implements #66 |
| 25 | 3.4.4 (apps/admin-shell/src/federation.ts:40) | 3 code | source code | module-federation | technological | moderate | implements #58; implements #59; implements #60; implements #61; implements #62; implements #63; implements #64; implements #65; implements #66 |
| 26 | 3.4.4 (apps/admin-shell/src/federation.ts:36) | 3 code | source code | module-federation | technological | moderate | implements #58; implements #59; implements #60; implements #61; implements #62; implements #63; implements #64; implements #65; implements #66 |
| 27 | 3.4.4 (apps/admin-shell/src/federation.ts:44) | 3 code | source code | module-federation | technological | moderate | implements #58; implements #59; implements #60; implements #61; implements #62; implements #63; implements #64; implements #65; implements #66 |
| 28 | 3.4.4 (apps/admin-shell/src/views/ModulePage.tsx:48) | 3 code | source code | module-federation | technological | moderate | implements #58; implements #59; implements #60; implements #61; implements #62; implements #63; implements #64; implements #65; implements #66 |
| 29 | 3.4.4 (apps/admin-shell/src/api.ts:85) | 3 code | source code | module-federation | technological | moderate | implements #58; implements #59; implements #60; implements #61; implements #62; implements #63; implements #64; implements #65; implements #66 |
| 30 | 3.4.4 (apps/web-shell/src/islands.ts:90) | 3 code | source code | module-federation | technological | moderate | implements #67; implements #68; implements #69; implements #70 |
| 31 | 3.4.4 (apps/web-shell/src/islands.ts:54) | 3 code | source code | module-federation | technological | moderate | implements #67; implements #68; implements #69; implements #70 |
| 32 | 3.4.4 (apps/web-shell/src/islands.ts:65) | 3 code | source code | module-federation | technological | moderate | implements #67; implements #68; implements #69; implements #70 |
| 33 | 3.4.4 (apps/web-shell/src/entry-server.tsx:79) | 3 code | source code | module-federation | technological | moderate | implements #67; implements #68; implements #69; implements #70 |
| 34 | 3.4.4 (apps/web-shell/src/entry-server.tsx:96) | 3 code | source code | — | technological | moderate | implements #68 |
| 35 | 3.4.4 (apps/web-shell/src/entry-server.tsx:57) | 3 code | source code | module-federation | technological | moderate | implements #67 |
| 36 | 3.4.4 (apps/core/src/shell/shell.service.ts:89) | 3 code | source code | — | technological | moderate | implements #67; implements #68; implements #69; implements #70 |
| 37 | 3.4.4 (apps/core/src/shell/shell.service.ts:147) | 3 code | source code | — | technological | moderate | implements #67; implements #68; implements #69; implements #70 |
| 38 | 3.4.4 (apps/core/src/registry/registry.service.ts:403) | 3 code | source code | module-federation | technological | moderate | implements #58; implements #59; implements #60; implements #61; implements #62; implements #63; implements #64; implements #65; implements #66; implements #67; implements #68; implements #69; implements #70 |
| 39 | 3.4.4 (apps/core/src/registry/registry.service.ts:307) | 3 code | source code | — | technological | moderate | implements #68 |
| 40 | 3.4.4 (config/modules.example.json:4) | 3 code | configuration | — | architectural | weak | — |
| 41 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 42 | 3.4.3 (apps/admin-shell) | 4 structure | directory | — | architectural | moderate | — |
| 43 | 3.4.3 (apps/core) | 4 structure | directory | — | context | weak | — |
| 44 | 3.4.3 (apps/web-shell) | 4 structure | directory | — | architectural | moderate | — |
| 45 | 3.4.3 (modules/chat) | 4 structure | directory | — | architectural | ambiguous | — |
| 46 | 3.4.3 (modules/clientes) | 4 structure | directory | — | architectural | ambiguous | — |
| 47 | 3.4.3 (modules/cuentas) | 4 structure | directory | — | architectural | ambiguous | — |
| 48 | 3.4.3 (modules/ejemplo-admin) | 4 structure | directory | — | architectural | ambiguous | — |
| 49 | 3.4.3 (modules/ejemplo-web) | 4 structure | directory | — | architectural | ambiguous | — |
| 50 | 3.4.3 (modules/hello) | 4 structure | directory | — | architectural | ambiguous | — |
| 51 | 3.4.3 (modules/media) | 4 structure | directory | — | architectural | ambiguous | — |
| 52 | 3.4.3 (modules/ops) | 4 structure | directory | — | architectural | ambiguous | — |
| 53 | 3.4.3 (modules/registry) | 4 structure | directory | — | architectural | ambiguous | — |
| 54 | 3.4.3 (modules/sitio) | 4 structure | directory | — | architectural | ambiguous | — |
| 55 | 3.4.3 (packages/contract) | 4 structure | directory | — | context | weak | — |
| 56 | 3.4.3 (packages/i18n) | 4 structure | directory | — | context | weak | — |
| 57 | 3.4.3 (packages/tokens) | 4 structure | directory | — | context | weak | — |
| 58 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #42; links #45 |
| 59 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #42; links #46 |
| 60 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #42; links #47 |
| 61 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #42; links #48 |
| 62 | 3.4.5 #5 | 5 composition | source code | module-federation | architectural | strong | links #42; links #50 |
| 63 | 3.4.5 #6 | 5 composition | source code | module-federation | architectural | strong | links #42; links #51 |
| 64 | 3.4.5 #7 | 5 composition | source code | module-federation | architectural | strong | links #42; links #52 |
| 65 | 3.4.5 #8 | 5 composition | source code | module-federation | architectural | strong | links #42; links #53 |
| 66 | 3.4.5 #9 | 5 composition | source code | module-federation | architectural | strong | links #42; links #54 |
| 67 | 3.4.5 #10 | 5 composition | source code | module-federation | architectural | strong | links #44; links #45 |
| 68 | 3.4.5 #11 | 5 composition | source code | module-federation | architectural | strong | links #44; links #46 |
| 69 | 3.4.5 #12 | 5 composition | source code | module-federation | architectural | strong | links #44; links #49 |
| 70 | 3.4.5 #13 | 5 composition | source code | module-federation | architectural | strong | links #44; links #50 |
| 71 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #42 |
| 72 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #44 |
| 73 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #45 |
| 74 | 3.4.6 #4 | 6 build-deploy | deploy | — | architectural | moderate | publishes #46 |
| 75 | 3.4.6 #5 | 6 build-deploy | deploy | — | architectural | moderate | publishes #47 |
| 76 | 3.4.6 #6 | 6 build-deploy | deploy | — | architectural | moderate | publishes #48 |
| 77 | 3.4.6 #7 | 6 build-deploy | deploy | — | architectural | moderate | publishes #49 |
| 78 | 3.4.6 #8 | 6 build-deploy | deploy | — | architectural | moderate | publishes #50 |
| 79 | 3.4.6 #9 | 6 build-deploy | deploy | — | architectural | moderate | publishes #51 |
| 80 | 3.4.6 #10 | 6 build-deploy | deploy | — | architectural | moderate | publishes #52 |
| 81 | 3.4.6 #11 | 6 build-deploy | deploy | — | architectural | moderate | publishes #53 |
| 82 | 3.4.6 #12 | 6 build-deploy | deploy | — | architectural | moderate | publishes #54 |
| 83 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #42; corroborates #44; corroborates #18; corroborates modules/hello/server.mjs:122-123 |
| 84 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #38 |
| 85 | 3.4.7 #3 | 7 documentation | documentation | — | context | weak | corroborates #55 |
| 86 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #44; corroborates #36; corroborates #37; corroborates #72; corroborates #32 |
| 87 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #29; corroborates #58; corroborates #59; corroborates #60; corroborates #61; corroborates #62; corroborates #63; corroborates #64; corroborates #65; corroborates #66 |
| 88 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #60; corroborates #65 |
| 89 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #61; corroborates #69 |
| 90 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #59; corroborates #68 |
| 91 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #66; corroborates modules/sitio/src/SitioPage.tsx:22-32; corroborates apps/core/src/shell/shell.service.ts:130-131 |
| 92 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #58; corroborates #67 |
| 93 | 3.4.7 #11 | 7 documentation | documentation | — | context | weak | corroborates #57; corroborates apps/admin-shell/src/styles.ts:1; corroborates apps/web-shell/src/styles.ts:1 |
| 94 | 3.4.7 #12 | 7 documentation | documentation | — | context | weak | corroborates infra/caddy/likekiri.caddy:1-3; corroborates infra/docker-compose.yml:1-3 |
| 95 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #32; corroborates apps/web-shell/src/islands.ts:69-71; corroborates apps/admin-shell/src/views/ModulePage.tsx:29-31 |
| 96 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | contradicts #73; contradicts #74; contradicts #75; contradicts #76; contradicts #77; contradicts #78; contradicts #79; contradicts #80; contradicts #81; contradicts #82 |
| 97 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | contradicts #71; contradicts apps/core/src/shell/shell.service.ts:100-106 |
| 98 | 3.4.7 #16 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #38; corroborates #73; corroborates #74; corroborates #75; corroborates #76; corroborates #77; corroborates #78; corroborates #79; corroborates #80; corroborates #81; corroborates #82 |
| 99 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | contradicts #72; contradicts infra/caddy/likekiri.caddy:9-13 |
| 100 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates #67; corroborates #68; corroborates #69; corroborates #70; corroborates apps/core/src/shell/shell.controller.ts:44-53 |
| 101 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates #36; corroborates #37 |
| 102 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | corroborates #39; corroborates #34; corroborates #68 |
| 103 | 3.4.7 #21 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #30; corroborates #31; corroborates #32 |
| 104 | 3.4.7 #22 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #27; corroborates #28 |
| 105 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | corroborates #23; corroborates apps/core/src/registry/registry-config.ts:3-19 |
| 106 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | corroborates #38 |
| 107 | 3.4.7 #25 | 7 documentation | documentation | — | architectural | weak | corroborates apps/core/src/registry/registry.service.ts:466-499 |
| 108 | 3.4.7 #26 | 7 documentation | documentation | — | architectural | weak | corroborates #35; corroborates #67 |
| 109 | 3.4.7 #27 | 7 documentation | documentation | — | technological | weak | corroborates #41; corroborates pnpm-workspace.yaml:1-4 |
| 110 | 3.4.7 #28 | 7 documentation | documentation | — | technological | weak | corroborates apps/admin-shell/package.json:15, 24; corroborates modules/hello/package.json:13, 22 |
| 111 | 3.4.7 #29 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #5; corroborates #6; corroborates #7; corroborates #8; corroborates #9; corroborates #10; corroborates #11; corroborates #12; corroborates #13; corroborates #14; corroborates #15; corroborates #16; corroborates #17; corroborates #18; corroborates #19; corroborates #20; corroborates #21; corroborates #22; corroborates #24; corroborates #30 |
| 112 | 3.4.7 #30 | 7 documentation | documentation | — | context | weak | corroborates #78; corroborates infra/docker-compose.yml:1-3 |
| 113 | 3.4.7 #31 | 7 documentation | documentation | — | context | weak | — |
| 114 | 3.4.7 #32 | 7 documentation | documentation | — | architectural | weak | corroborates #64; corroborates #80 |
| 115 | 3.4.7 #33 | 7 documentation | documentation | — | context | weak | corroborates #56; corroborates apps/admin-shell/src/App.tsx:9; corroborates apps/web-shell/src/entry-server.tsx:9 |
| 116 | 3.4.7 #34 | 7 documentation | documentation | — | architectural | weak | corroborates #73; corroborates #74; corroborates #75; corroborates #76; corroborates #77; corroborates #78; corroborates #79; corroborates #80; corroborates #81; corroborates #82 |
| 117 | 3.4.7 #35 | 7 documentation | documentation | — | architectural | weak | corroborates #36; corroborates #72 |
| 118 | 3.4.7 #36 | 7 documentation | documentation | — | context | weak | partially corroborates #71; partially corroborates #72 |
| 119 | 3.4.7 #37 | 7 documentation | comment | module-federation | technological | weak | corroborates #26; corroborates #18; corroborates #13 |
| 120 | 3.4.7 #38 | 7 documentation | comment | — | architectural | weak | corroborates #71; corroborates #72 |
| 121 | 3.4.7 #39 | 7 documentation | comment | module-federation | architectural | weak | corroborates #33; corroborates #39 |
| 122 | 3.4.7 #40 | 7 documentation | comment | — | technological | weak | corroborates apps/web-shell/src/entry-server.tsx:124, 148, 166, 181 |
| 123 | 3.4.7 #41 | 7 documentation | comment | — | architectural | weak | corroborates #72 |
| 124 | 3.4.7 #42 | 7 documentation | documentation | module-federation | architectural | weak | contradicts #39; contradicts #34; contradicts #68 |
| 125 | 3.4.7 #43 | 7 documentation | documentation | — | architectural | weak | partially corroborates #72 |
| 126 | 3.4.7 #44 | 7 documentation | documentation | — | architectural | weak | contradicts #78; contradicts #62 |
| 127 | 3.4.7 #45 | 7 documentation | documentation | — | architectural | weak | corroborates apps/admin-shell/src/styles.ts:82, 94; corroborates modules/chat/src/ChatAdminPage.tsx:185, 213, 220; corroborates modules/cuentas/src/UsersPage.tsx:68 |
| 128 | 3.4.7 #46 | 7 documentation | documentation | — | context | weak | — |
| 129 | 3.4.7 #47 | 7 documentation | documentation | — | architectural | weak | corroborates #4; corroborates #74; corroborates modules/clientes/server.mjs:463-466, 1095 |
| 130 | 3.4.7 #48 | 7 documentation | documentation | — | architectural | weak | — |
| 131 | 3.4.7 #49 | 7 documentation | documentation | — | architectural | weak | corroborates #32; corroborates apps/web-shell/src/islands.ts:30-32, 62-67 |
| 132 | 3.4.7 #50 | 7 documentation | documentation | — | architectural | weak | corroborates #68; corroborates #69; corroborates #70 |
| 133 | 3.4.7 #51 | 7 documentation | documentation | — | context | weak | — |
| 134 | 3.4.7 #52 | 7 documentation | documentation | — | architectural | weak | corroborates #60; corroborates #62; corroborates #65; corroborates #70 |
| 135 | 3.4.7 #53 | 7 documentation | documentation | module-federation | technological | weak | corroborates #27; corroborates #31 |
| 136 | 3.4.7 #54 | 7 documentation | documentation | — | architectural | weak | contradicts #68; contradicts packages/contract/src/manifest.ts:44 |
| 137 | 3.4.7 #55 | 7 documentation | documentation | — | context | weak | corroborates #74; corroborates modules/clientes/src/api.ts:5-9 |
| 138 | 3.4.7 #56 | 7 documentation | documentation | — | architectural | weak | — |
| 139 | 3.4.7 #57 | 7 documentation | documentation | — | context | weak | corroborates apps/admin-shell/src/styles.ts:1, 10; corroborates modules/cuentas/src/UsersPage.tsx:68; corroborates modules/ops/src/OpsAdminPage.tsx:127 |
| 140 | 3.4.7 #58 | 7 documentation | documentation | — | context | weak | corroborates modules/cuentas/src/api.ts:81-97; corroborates apps/core/src/auth/admin.controller.ts:36 |
| 141 | 3.4.7 #59 | 7 documentation | documentation | — | context | weak | corroborates modules/ejemplo-admin/src/PanelPage.tsx:18-23; corroborates apps/core/src/health.controller.ts:8-10 |
| 142 | 3.4.7 #60 | 7 documentation | documentation | module-federation | technological | weak | corroborates #16; corroborates #61 |
| 143 | 3.4.7 #61 | 7 documentation | comment | module-federation | architectural | weak | corroborates #16; corroborates #61 |
| 144 | 3.4.7 #62 | 7 documentation | documentation | — | architectural | weak | contradicts apps/web-shell/src/Document.tsx:41-44; contradicts apps/core/src/shell/shell.service.ts:130-131 |
| 145 | 3.4.7 #63 | 7 documentation | comment | — | technological | weak | contradicts #69; contradicts apps/web-shell/src/islands.ts:67 |
| 146 | 3.4.7 #64 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #8; corroborates #18; corroborates #62; corroborates #70 |
| 147 | 3.4.7 #65 | 7 documentation | documentation | — | architectural | weak | corroborates #63; corroborates #79 |
| 148 | 3.4.7 #66 | 7 documentation | documentation | — | context | weak | corroborates #79 |
| 149 | 3.4.7 #67 | 7 documentation | documentation | — | context | weak | corroborates modules/registry/src/RegistryPage.tsx:12-13; corroborates apps/core/src/auth/admin.controller.ts:36, 245 |
| 150 | 3.4.8 #1 | 8 history | history | module-federation | architectural | weak | explains #45; explains #46; explains #47; explains #48; explains #49; explains #50; explains #51; explains #52; explains #53; explains #54 |
| 151 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #23; explains #40 |
| 152 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #96; explains #97; explains #99 |
| 153 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #118; explains #125 |
| 154 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #124; explains #136 |
| 155 | 3.4.8 #6 | 8 history | history | — | architectural | weak | explains #126; explains #78 |
| 156 | 3.4.8 #7 | 8 history | history | — | architectural | weak | explains #144 |
| 157 | 3.4.8 #8 | 8 history | history | — | technological | weak | explains #145 |

## Summary

Observations: 157. Dimensions (technology: 12, configuration: 11, code: 17, structure: 17, composition: 13, build-deploy: 12, documentation: 67, history: 8). Strength (strong: 13, moderate: 40, weak: 94, ambiguous: 10). Evidence (technological: 47, architectural: 90, context: 20).

