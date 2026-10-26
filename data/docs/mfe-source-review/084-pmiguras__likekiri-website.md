---
schema: 1
id: 1329274714
full_name: pmiguras/likekiri-website
commit: 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 084 — pmiguras/likekiri-website

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-load-remote | apps/admin-shell/src/federation.ts:1 | apps/admin-shell | remote-resolution | Yes | Imports `init`, `loadRemote` and `registerRemotes` from `@module-federation/runtime`; the three uses are at apps/admin-shell/src/federation.ts:36, :40 and :44, all Yes |
| src-load-remote | apps/admin-shell/src/federation.ts:40 | apps/admin-shell | remote-resolution | Yes | `registerRemotes([remote])` registers an already discovered remote module (`{ name: route.moduleId, entry: route.remoteEntry, type: 'module' }` at apps/admin-shell/src/federation.ts:34) when the runtime has already been initialized; `route` comes from the core manifest (apps/admin-shell/src/api.ts:85) and names one of `modules/*` (for example: `hello`, modules/hello/server.mjs:23,34,38) |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/admin-shell/src/federation.ts:36 | apps/admin-shell | remote-resolution | Yes | `init({ name: 'likekiri_admin', remotes: [remote], shared: hostShared })` registers the panel’s first remote and shares the host’s React (apps/admin-shell/src/federation.ts:13-26); it is the other branch of the same `if` at apps/admin-shell/src/federation.ts:35-42, and the `src-load-remote` pattern does not match `init(` |
| manual | apps/admin-shell/src/federation.ts:44 | apps/admin-shell | remote-resolution | Yes | ``loadRemote<Record<string, unknown>>(`${route.moduleId}/${exposed}`)`` (apps/admin-shell/src/federation.ts:44-46) resolves the component exposed by the other unit (`exposed` normalized at :43, for example: `hello/HelloAdminPage`, modules/hello/vite.config.ts:11,14-16) and returns it to the panel; the `src-load-remote` pattern did not match the line because the call has a type parameter
| manual | apps/admin-shell/src/views/ModulePage.tsx:48 | apps/admin-shell | runtime-composition | Yes | `createElement(state.Component, params)` mounts in the panel the component loaded from the other unit; loading is triggered at apps/admin-shell/src/views/ModulePage.tsx:25 (`loadRemoteComponent(route)`, imported at :4) and `ModulePage` is rendered by the module route at apps/admin-shell/src/App.tsx:226 |
| manual | apps/admin-shell/src/api.ts:85 | apps/admin-shell | remote-resolution | Yes | `request<ShellManifest>('/api/shell/manifest?surface=admin')` resolves through the core manifest the route table with each module’s `moduleId`, `component` and `remoteEntry` (apps/admin-shell/src/api.ts:9-15,37-42); called at apps/admin-shell/src/App.tsx:148 and consumed at :214 (`matchModuleRoute(manifest.routes, path)`); not captured by the patterns because it uses `fetch` (apps/admin-shell/src/api.ts:54) |
| manual | apps/web-shell/src/islands.ts:90 | apps/web-shell | remote-resolution | Yes | `init({ name: 'likekiri_web', remotes, shared: { react, react-dom } })` registers the remotes collected from island placeholders (apps/web-shell/src/islands.ts:80-87, from `data-remote` read at :28) and supplies the host’s React; `boot()` runs when the bundle loads (apps/web-shell/src/islands.ts:113), injected by SSR as `bootstrapModules` (apps/web-shell/src/entry-server.tsx:181); `init` and `loadRemote` are imported at apps/web-shell/src/islands.ts:1 |
| manual | apps/web-shell/src/islands.ts:54 | apps/web-shell | remote-resolution | Yes | ``loadRemote<Record<string, unknown>>(`${spec.moduleId}/${spec.exposed}`)`` resolves the component exposed by the other unit (for example: `hello/HelloIsland`, modules/hello/vite.config.ts:11,14-16); the `src-load-remote` pattern did not match the line because the call has a type parameter |
| manual | apps/web-shell/src/islands.ts:65 | apps/web-shell | runtime-composition | Yes | `hydrateRoot(spec.el, element)` mounts the other unit’s component in the island slot (`element` created at apps/web-shell/src/islands.ts:62); when the module did not pre-render (`data-hydrate` absent), the same mechanism mounts through `createRoot(spec.el).render(element)` at apps/web-shell/src/islands.ts:67; failure of one island only degrades its own slot (:71) |
| manual | apps/web-shell/src/entry-server.tsx:79 | apps/web-shell | host-relationship | Yes | ``'data-likekiri-island': `${island.moduleId}/${island.component}` `` and `'data-remote': island.remoteEntry` (:80) declare, in the shell HTML, which module occupies that place on the page and where its bundle comes from; this is the contract read by apps/web-shell/src/islands.ts:23-28; the descriptor arrives from core at apps/core/src/shell/shell.service.ts:138-144 |
| manual | apps/web-shell/src/entry-server.tsx:96 | apps/web-shell | other | Yes | `dangerouslySetInnerHTML={{ __html: island.html as string }}` inserts into the shell HTML the markup pre-rendered by the other unit’s own server (`html` described at apps/web-shell/src/entry-server.tsx:23-27, produced by the module’s `/render` through apps/core/src/registry/registry.service.ts:307-317); server composition, which fits neither `embedding` nor `custom-element` |
| manual | apps/web-shell/src/entry-server.tsx:57 | apps/web-shell | host-relationship | Yes | ``data-likekiri-island={`${w.moduleId}/${w.component}`}`` and `data-remote={w.remoteEntry}` (:58) declare the global floating islands (for example: chat) mounted by the shell on every page; the list comes from `registry.webWidgets()` (apps/core/src/registry/registry.service.ts:346-355) through rendering at apps/core/src/shell/shell.controller.ts:53, and `Widgets` is rendered at apps/web-shell/src/entry-server.tsx:132 |
| manual | apps/core/src/shell/shell.service.ts:89 | — | dynamic-loading | Yes | `import(pathToFileURL(entryPath).href)` loads at runtime another unit’s SSR bundle, web-shell’s `server/entry-server.js` (path assembled at apps/core/src/shell/shell.service.ts:83-87 from `webDistDir`); the file is in apps/core, judged `No` by the structural review, so the unit is `—` |
| manual | apps/core/src/shell/shell.service.ts:147 | — | runtime-composition | Yes | `entry.render(request, { onReady, onError })` executes web-shell rendering in the core process, passing the matched module’s island descriptor (apps/core/src/shell/shell.service.ts:135-145) and the global widgets; this is the mounting step using the module loaded at apps/core/src/shell/shell.service.ts:89, and is triggered by apps/core/src/shell/shell.controller.ts:53 |
| manual | apps/core/src/registry/registry.service.ts:403 | — | remote-resolution | Yes | `fetch(url, { headers, signal })` resolves each module’s manifest at `/.well-known/module-manifest` (URL assembled at apps/core/src/registry/registry.service.ts:401 from the registered `baseUrl`), which supplies `remoteEntry` and the routes feeding the compiled table (:471-485) served to the shells; the module responds with the signed manifest (modules/hello/server.mjs:87-95) |
| manual | apps/core/src/registry/registry.service.ts:307 | — | other | Yes | `fetch(new URL('/render', synced.registration.baseUrl), { method: 'POST', ... })` (:307-315) asks the other unit’s server to pre-render the component and return the HTML (`data.html`, :317-318), used as `islandHtml` at apps/core/src/shell/shell.controller.ts:46-49 and inserted into the page at apps/web-shell/src/entry-server.tsx:96; server composition mechanism outside the listed categories |
| manual | config/modules.example.json:4 | — | host-relationship | No | `"moduleId": "hello"` and `"baseUrl": "http://127.0.0.1:4001"` (:5) declare which module application core uses and where; this is an example file and is not read by any build or runtime — the actual registry comes from `MODULE_REGISTRY_CONFIG`, gitignored (apps/core/src/registry/registry-config.ts:4-7) |

## Summary

Constructs participating in composition: 16 (remote-resolution: 8, runtime-composition: 3, host-relationship: 2, other: 2, dynamic-loading: 1).

## Notes

- The `matches.csv` contains only two `src-*` occurrences, both at apps/admin-shell/src/federation.ts, although composition appears in four places. The `src-load-remote` pattern matches `loadRemote(` and did not match `loadRemote<Record<string, unknown>>(` (apps/admin-shell/src/federation.ts:44, apps/web-shell/src/islands.ts:54) or `init(` (apps/admin-shell/src/federation.ts:36, apps/web-shell/src/islands.ts:90); the core and panel resolutions through `fetch` were also missed.
- The `server.mjs` files of the ten `modules/*` declare the module’s own `remoteEntry`, `exposes`, `routes` and `menu` (for example: modules/hello/server.mjs:32-62), meaning the surface and route where each component enters. They did not become rows because the step 4 list specifies the declaration **in the host**, and here the module declares information about itself; the full relationship between units is the subject of the composition review (protocol section 3.4.5). What the host declares in code is the module registry (config/modules.example.json:4-5), already in the table.
- The remote resolution target units are the snapshot’s own `modules/*`, but always through runtime data (`moduleId`, `remoteEntry` from the manifest): no line of shell code names a module literally.
- `apps/core/src/shell/shell.service.ts:103-104` (`readFile` of admin-shell’s `index.html`) serves the already built administration shell; this is delivery of a unit rather than inter-unit composition, so it did not become a row.
- Nothing in the snapshot defines or consumes a custom element, `<iframe>`, `postMessage`, `BroadcastChannel` or `CustomEvent`. Props and HTML passed to islands (apps/web-shell/src/islands.ts:19,32) are data of the already recorded loading rather than a separate communication mechanism. `packages/contract` handles the HMAC signature between core and modules (packages/contract/package.json:1-31), rather than communication between frontend units.
- False positives discarded in the step 4 search: `import('react').CSSProperties` at modules/chat/src/ChatAdminPage.tsx:313,316 and modules/clientes/src/PortalIsland.tsx:162 (type import), `await import(...)` at apps/core/test/shell.test.ts:69-70 (test) and mentions of `import()` and `loadRemote` at README.md:55,71,89 and docs/adr/004-ssr-islas-auth-y-despliegue.md:9 (documentation).
