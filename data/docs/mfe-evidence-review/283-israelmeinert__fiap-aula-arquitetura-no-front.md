---
schema: 1
id: 1408068032
full_name: israelmeinert/fiap-aula-arquitetura-no-front
commit: e1c6fb92488afd39e2c1d704ee1243ed52d862b6
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

# 283 — israelmeinert/fiap-aula-arquitetura-no-front

## Repository overview

Dependency review found no MFE technology library, therefore no dimension 1 observation. Composition implemented through browser features: shell manifest names two remotes (#1), shell resolves names (#8), imports ESM (#9), calling `mount` with cleanup (#10). React/Angular remotes offer adapters (#2, #3). Chain forms two active `script` relationships (#42, #43) between three block 10 units (#30–#32), each with separate build (#62–#64). URL-based ESM loading is mechanism 3.4.5 calls `script`, corresponding to classification `runtime-script`.

Structure contains 29 frontend applications (#12–#37, #39–#41); other 26 isolated examples do not participate in two relationships. Root coordinates workspace (#11); BFF backend support (#38). Four presentation HTML findings context: custom element, iframe and messages belong to slide runtime (#4–#7). Own isolated application builds (#44–#61, #65–#72) do not make them composition participants. None of 29 build/deployment records has observed deployment or independent versioning.

Only manifest generates configuration observation: other files cited in tables declare workspace, compilation, styles, framework integration or local proxies without composition elements defined in 3.5. TypeScript contract type code rather than tool configuration. Common build/serve scripts support structural, composition and build observations without configuring federation or registering remote targets.

27 documentary claims weak semantic support (#73–#99). Slide tree attributes routes to shell, but buttons/absent router contradict portion (#78). Independent publication only partially corroborated (#92); documentation itself declares no deployment provision (#93). Origin changes also require adjusting fixed shell list (#94). Single-commit history does not clarify past routing intent (#100), while publication uncertainty resolved by snapshot (#101). No snapshot architectural ambiguity remains in two points.

## Observations

### 1. exemplos/10-micro-frontends/apps/shell/public/remotes.json:1-5

**Observation:** Manifest declares `version: 1`, `catalogo: "http://127.0.0.1:4301/microfrontend.js"` and `checkout: "http://127.0.0.1:4302/microfrontend.js"`.

**Interpretation:** Shell configuration names two remote targets and ESM entry points.

### 2. exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-6

**Observation:** `mount(host)` creates React root, renders `App`, returning function calling `root.unmount()`.

**Interpretation:** React remote provides mounting/cleanup adapter for parameter-supplied host.

### 3. exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12

**Observation:** `mount(host)` creates Angular application, instantiates `CheckoutApp` with `hostElement: host`, attaches view, returning view/component/application cleanup.

**Interpretation:** Angular remote provides mounting/cleanup cycle for parameter-supplied host.

### 4. aula-arquitetura-front-end.html:20284

**Observation:** Embedded script declares class extending `HTMLElement`, uses `attachShadow` and registers `marp-auto-scaling` through `customElements.define`.

**Interpretation:** Custom element serves Marp material scaling without constituting frontend unit composition.

### 5. aula-arquitetura-front-end.html:20635

**Observation:** Slide script creates `iframe` for presentation’s own overview (`view=overview`).

**Interpretation:** Iframe internal to deck, embedding no other domain application.

### 6. aula-arquitetura-front-end.html:20284

**Observation:** Slide runtime selects own `iframe` elements, calling `postMessage` for them.

**Interpretation:** Communication internal to presentation without connecting frontend units.

### 7. aula-arquitetura-front-end.html:20635

**Observation:** Presentation script uses `window.parent.postMessage("closeOverview", ...)` and messages `navigate:...` between deck windows.

**Interpretation:** Messages control presentation windows rather than communication between domain applications.

### 8. exemplos/10-micro-frontends/apps/shell/src/main.ts:8-22; exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37; exemplos/10-micro-frontends/apps/shell/public/remotes.json:1-5

**Observation:** `abrir(nome)` retrieves `/remotes.json`, validates version, extracts `manifesto[nome]` and checks origin. Buttons call `abrir("catalogo")` and `abrir("checkout")`.

**Interpretation:** Shell resolves two composition targets named by buttons/manifest.

### 9. exemplos/10-micro-frontends/apps/shell/src/main.ts:20-25; exemplos/10-micro-frontends/packages/contracts/mount.ts:4

**Observation:** `import(/* @vite-ignore */ url.href)` loads ESM module from manifest-resolved URL; result typed as `Remote`.

**Interpretation:** Shell uses runtime ESM loading mechanism; call receives URL through variable without independently naming target.

### 10. exemplos/10-micro-frontends/apps/shell/src/main.ts:7-13; exemplos/10-micro-frontends/apps/shell/src/main.ts:26-28; exemplos/10-micro-frontends/apps/shell/src/main.ts:38

**Observation:** `remote.mount(slot)` mounts in shell-created element. Returned function stored in `cleanup`, called on unmount/switch.

**Interpretation:** Consumer executes remote mounting/cleanup contract; call receives previously loaded module.

### 11. .; package.json:9-15; package.json:23; scripts/build.mjs:6-11; README.md:5

**Observation:** Root declares npm workspaces and script iterating their builds. Class presentation in `aula-arquitetura-front-end.html`.

**Interpretation:** Material coordination root without own UI; not frontend unit.

### 12. exemplos/01-componentes/angular; angular.json:15-16; exemplos/01-componentes/angular/src/main.ts:6; angular.json:12-13; exemplos/01-componentes/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:15-16 (`browser` exemplos/01-componentes/angular/src/main.ts, `index` exemplos/01-componentes/angular/src/index.html); exemplos/01-componentes/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:12-13 (target `build`, `@angular/build:application`); exemplos/01-componentes/angular/package.json:8 (`ng build 01-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 13. exemplos/01-componentes/react; exemplos/01-componentes/react/index.html:2; exemplos/01-componentes/react/src/main.tsx:6; exemplos/01-componentes/react/vite.config.ts:1-3; exemplos/01-componentes/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/01-componentes/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/01-componentes/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/01-componentes/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/01-componentes/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 14. exemplos/02-atomic-design/angular; angular.json:61-62; exemplos/02-atomic-design/angular/src/main.ts:6; angular.json:58-59; exemplos/02-atomic-design/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:61-62 (`browser` exemplos/02-atomic-design/angular/src/main.ts, `index` exemplos/02-atomic-design/angular/src/index.html); exemplos/02-atomic-design/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:58-59 (target `build`, `@angular/build:application`); exemplos/02-atomic-design/angular/package.json:8 (`ng build 02-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 15. exemplos/02-atomic-design/react; exemplos/02-atomic-design/react/index.html:2; exemplos/02-atomic-design/react/src/main.tsx:6; exemplos/02-atomic-design/react/vite.config.ts:1-3; exemplos/02-atomic-design/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/02-atomic-design/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/02-atomic-design/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/02-atomic-design/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/02-atomic-design/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 16. exemplos/03-camadas/angular; angular.json:107-108; exemplos/03-camadas/angular/src/main.ts:6; angular.json:104-105; exemplos/03-camadas/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:107-108 (`browser` exemplos/03-camadas/angular/src/main.ts, `index` exemplos/03-camadas/angular/src/index.html); exemplos/03-camadas/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:104-105 (target `build`, `@angular/build:application`); exemplos/03-camadas/angular/package.json:8 (`ng build 03-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 17. exemplos/03-camadas/react; exemplos/03-camadas/react/index.html:2; exemplos/03-camadas/react/src/main.tsx:6; exemplos/03-camadas/react/vite.config.ts:1-3; exemplos/03-camadas/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/03-camadas/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/03-camadas/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/03-camadas/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/03-camadas/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 18. exemplos/04-feature-based/angular; angular.json:153-154; exemplos/04-feature-based/angular/src/main.ts:6; angular.json:150-151; exemplos/04-feature-based/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:153-154 (`browser` exemplos/04-feature-based/angular/src/main.ts, `index` exemplos/04-feature-based/angular/src/index.html); exemplos/04-feature-based/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:150-151 (target `build`, `@angular/build:application`); exemplos/04-feature-based/angular/package.json:8 (`ng build 04-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 19. exemplos/04-feature-based/react; exemplos/04-feature-based/react/index.html:2; exemplos/04-feature-based/react/src/main.tsx:6; exemplos/04-feature-based/react/vite.config.ts:1-3; exemplos/04-feature-based/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/04-feature-based/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/04-feature-based/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/04-feature-based/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/04-feature-based/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 20. exemplos/05-clean-architecture/angular; angular.json:199-200; exemplos/05-clean-architecture/angular/src/main.ts:6; angular.json:196-197; exemplos/05-clean-architecture/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:199-200 (`browser` exemplos/05-clean-architecture/angular/src/main.ts, `index` exemplos/05-clean-architecture/angular/src/index.html); exemplos/05-clean-architecture/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:196-197 (target `build`, `@angular/build:application`); exemplos/05-clean-architecture/angular/package.json:8 (`ng build 05-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 21. exemplos/05-clean-architecture/react; exemplos/05-clean-architecture/react/index.html:2; exemplos/05-clean-architecture/react/src/main.tsx:6; exemplos/05-clean-architecture/react/vite.config.ts:1-3; exemplos/05-clean-architecture/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/05-clean-architecture/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/05-clean-architecture/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/05-clean-architecture/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/05-clean-architecture/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 22. exemplos/06-hexagonal/angular; angular.json:245-246; exemplos/06-hexagonal/angular/src/main.ts:6; angular.json:242-243; exemplos/06-hexagonal/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:245-246 (`browser` exemplos/06-hexagonal/angular/src/main.ts, `index` exemplos/06-hexagonal/angular/src/index.html); exemplos/06-hexagonal/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:242-243 (target `build`, `@angular/build:application`); exemplos/06-hexagonal/angular/package.json:8 (`ng build 06-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 23. exemplos/06-hexagonal/react; exemplos/06-hexagonal/react/index.html:2; exemplos/06-hexagonal/react/src/main.tsx:6; exemplos/06-hexagonal/react/vite.config.ts:1-3; exemplos/06-hexagonal/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/06-hexagonal/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/06-hexagonal/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/06-hexagonal/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/06-hexagonal/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 24. exemplos/07-feature-sliced-design/angular; angular.json:291-292; exemplos/07-feature-sliced-design/angular/src/main.ts:6; angular.json:288-289; exemplos/07-feature-sliced-design/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:291-292 (`browser` exemplos/07-feature-sliced-design/angular/src/main.ts, `index` exemplos/07-feature-sliced-design/angular/src/index.html); exemplos/07-feature-sliced-design/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:288-289 (target `build`, `@angular/build:application`); exemplos/07-feature-sliced-design/angular/package.json:8 (`ng build 07-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 25. exemplos/07-feature-sliced-design/react; exemplos/07-feature-sliced-design/react/index.html:2; exemplos/07-feature-sliced-design/react/src/main.tsx:6; exemplos/07-feature-sliced-design/react/vite.config.ts:1-3; exemplos/07-feature-sliced-design/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/07-feature-sliced-design/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/07-feature-sliced-design/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/07-feature-sliced-design/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/07-feature-sliced-design/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 26. exemplos/08-mvvm/angular; angular.json:337-338; exemplos/08-mvvm/angular/src/main.ts:6; angular.json:334-335; exemplos/08-mvvm/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:337-338 (`browser` exemplos/08-mvvm/angular/src/main.ts, `index` exemplos/08-mvvm/angular/src/index.html); exemplos/08-mvvm/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:334-335 (target `build`, `@angular/build:application`); exemplos/08-mvvm/angular/package.json:8 (`ng build 08-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 27. exemplos/08-mvvm/react; exemplos/08-mvvm/react/index.html:2; exemplos/08-mvvm/react/src/main.tsx:6; exemplos/08-mvvm/react/vite.config.ts:1-3; exemplos/08-mvvm/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/08-mvvm/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/08-mvvm/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/08-mvvm/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/08-mvvm/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 28. exemplos/09-flux/angular; angular.json:383-384; exemplos/09-flux/angular/src/main.ts:6; angular.json:380-381; exemplos/09-flux/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:383-384 (`browser` exemplos/09-flux/angular/src/main.ts, `index` exemplos/09-flux/angular/src/index.html); exemplos/09-flux/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:380-381 (target `build`, `@angular/build:application`); exemplos/09-flux/angular/package.json:8 (`ng build 09-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 29. exemplos/09-flux/react; exemplos/09-flux/react/index.html:2; exemplos/09-flux/react/src/main.tsx:6; exemplos/09-flux/react/vite.config.ts:1-3; exemplos/09-flux/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/09-flux/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/09-flux/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/09-flux/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/09-flux/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 30. exemplos/10-micro-frontends/apps/catalogo-react; scripts/build-remoto.mjs:21; exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-5; exemplos/10-micro-frontends/apps/catalogo-react/package.json:7; scripts/build-remoto.mjs:21-26

**Observation:** Directory has own manifest. Entry: scripts/build-remoto.mjs:21 (`entryPoints` `src/mount.tsx` in react mode); exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-5 (`mount` creates React root and returns cleanup). Build: exemplos/10-micro-frontends/apps/catalogo-react/package.json:7 (`node ../../../../scripts/build-remoto.mjs react`); scripts/build-remoto.mjs:21-26 (esbuild generates `dist/microfrontend.js` ESM).

**Interpretation:** React remote with mounting function/own esbuild build, served at own port. Part of block 10 composed group.

### 31. exemplos/10-micro-frontends/apps/checkout-angular; exemplos/10-micro-frontends/apps/checkout-angular/tsconfig.json:13-15; scripts/build-remoto.mjs:21; exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12; exemplos/10-micro-frontends/apps/checkout-angular/package.json:7; scripts/build-remoto.mjs:9-26

**Observation:** Directory has own manifest. Entry: exemplos/10-micro-frontends/apps/checkout-angular/tsconfig.json:13-15 (`files` `src/mount.ts` for ngc); scripts/build-remoto.mjs:21 (`entryPoints` `dist/compiled/mount.js` in angular mode); exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12 (`mount` creates Angular application and returns cleanup). Build: exemplos/10-micro-frontends/apps/checkout-angular/package.json:7 (`ngc -p tsconfig.json && node ../../../../scripts/build-remoto.mjs angular`); scripts/build-remoto.mjs:9-26 (Angular linker and esbuild ESM).

**Interpretation:** Angular remote with mounting function/own ngc + esbuild build, served at own port. Part of block 10 composed group.

### 32. exemplos/10-micro-frontends/apps/shell; exemplos/10-micro-frontends/apps/shell/index.html:1; exemplos/10-micro-frontends/apps/shell/src/main.ts:36-38; exemplos/10-micro-frontends/apps/shell/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/10-micro-frontends/apps/shell/index.html:1 (`<script type="module" src="/src/main.ts">`); exemplos/10-micro-frontends/apps/shell/src/main.ts:36-38 (connects remote-mounting buttons). Build: exemplos/10-micro-frontends/apps/shell/package.json:8 (`tsc --noEmit && vite build`, Vite without configuration file).

**Interpretation:** Vite/TypeScript shell with own entry/build. Part of block 10 composed group.

### 33. exemplos/11-renderizacao/angular; angular.json:429-430; exemplos/11-renderizacao/angular/src/main.ts:4; angular.json:437-441; angular.json:426-427; exemplos/11-renderizacao/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:429-430 (`browser` exemplos/11-renderizacao/angular/src/main.ts, `index` exemplos/11-renderizacao/angular/src/index.html); exemplos/11-renderizacao/angular/src/main.ts:4 (`bootstrapApplication`); angular.json:437-441 (`server` main.server.ts, `outputMode: server`, `ssr.entry` server.ts). Build: angular.json:426-427 (target `build`, `@angular/build:application`); exemplos/11-renderizacao/angular/package.json:8 (`ng build 11-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 34. exemplos/11-renderizacao/next; exemplos/11-renderizacao/next/src/app/layout.tsx:4; exemplos/11-renderizacao/next/next.config.mjs:1-2; exemplos/11-renderizacao/next/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/11-renderizacao/next/src/app/layout.tsx:4 (`Layout`, App Router); exemplos/11-renderizacao/next/src/app/evento/page.tsx (route `/evento`). Build: exemplos/11-renderizacao/next/next.config.mjs:1-2 (Next configuration); exemplos/11-renderizacao/next/package.json:8 (`next build --webpack`).

**Interpretation:** Next.js application with own entry/build. Isolated material application; boundary establishes no other-unit link.

### 35. exemplos/12-ilhas/angular; angular.json:480-481; exemplos/12-ilhas/angular/src/main.ts:6; angular.json:477-478; exemplos/12-ilhas/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:480-481 (`browser` exemplos/12-ilhas/angular/src/main.ts, `index` exemplos/12-ilhas/angular/src/index.html); exemplos/12-ilhas/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:477-478 (target `build`, `@angular/build:application`); exemplos/12-ilhas/angular/package.json:8 (`ng build 12-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 36. exemplos/12-ilhas/astro; exemplos/12-ilhas/astro/src/pages/index.astro:1-5; exemplos/12-ilhas/astro/astro.config.mjs:1-3; exemplos/12-ilhas/astro/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/12-ilhas/astro/src/pages/index.astro:1-5 (Astro page with island `<Selecionar client:visible />`). Build: exemplos/12-ilhas/astro/astro.config.mjs:1-3 (Astro with React integration); exemplos/12-ilhas/astro/package.json:8 (`astro build`).

**Interpretation:** Astro application with own entry/build. Isolated material application; boundary establishes no other-unit link.

### 37. exemplos/13-bff/apps/web-angular; angular.json:526-527; exemplos/13-bff/apps/web-angular/src/main.ts:5; angular.json:523-524; exemplos/13-bff/apps/web-angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:526-527 (`browser` exemplos/13-bff/apps/web-angular/src/main.ts, `index` exemplos/13-bff/apps/web-angular/src/index.html); exemplos/13-bff/apps/web-angular/src/main.ts:5 (`bootstrapApplication`). Build: angular.json:523-524 (target `build`, `@angular/build:application`); exemplos/13-bff/apps/web-angular/package.json:8 (`ng build 13-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 38. exemplos/13-bff/apps/web-bff; exemplos/13-bff/apps/web-bff/src/main.ts:1-5; exemplos/13-bff/apps/web-bff/package.json:8

**Observation:** `src/main.ts` starts Express server at port 4011. Script `build` executes only `tsc -p tsconfig.json --noEmit`.

**Interpretation:** Directory contains supporting BFF without frontend unit.

### 39. exemplos/13-bff/next; exemplos/13-bff/next/src/app/layout.tsx:4; exemplos/13-bff/next/next.config.mjs:1-2; exemplos/13-bff/next/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/13-bff/next/src/app/layout.tsx:4 (`Layout`, App Router); exemplos/13-bff/next/src/app/evento/page.tsx (route `/evento`). Build: exemplos/13-bff/next/next.config.mjs:1-2 (Next configuration); exemplos/13-bff/next/package.json:8 (`next build --webpack`).

**Interpretation:** Next.js application with own entry/build. Isolated material application; boundary establishes no other-unit link.

### 40. exemplos/14-escolha-e-evolucao/angular; angular.json:572-573; exemplos/14-escolha-e-evolucao/angular/src/main.ts:6; angular.json:569-570; exemplos/14-escolha-e-evolucao/angular/package.json:8

**Observation:** Directory has own manifest. Entry: angular.json:572-573 (`browser` exemplos/14-escolha-e-evolucao/angular/src/main.ts, `index` exemplos/14-escolha-e-evolucao/angular/src/index.html); exemplos/14-escolha-e-evolucao/angular/src/main.ts:6 (`bootstrapApplication`). Build: angular.json:569-570 (target `build`, `@angular/build:application`); exemplos/14-escolha-e-evolucao/angular/package.json:8 (`ng build 14-angular`).

**Interpretation:** Angular application with own entry/build target in angular.json. Isolated material application; boundary establishes no other-unit link.

### 41. exemplos/14-escolha-e-evolucao/react; exemplos/14-escolha-e-evolucao/react/index.html:2; exemplos/14-escolha-e-evolucao/react/src/main.tsx:6; exemplos/14-escolha-e-evolucao/react/vite.config.ts:1-3; exemplos/14-escolha-e-evolucao/react/package.json:8

**Observation:** Directory has own manifest. Entry: exemplos/14-escolha-e-evolucao/react/index.html:2 (`<script type="module" src="/src/main.tsx">`); exemplos/14-escolha-e-evolucao/react/src/main.tsx:6 (`createRoot(host).render(<App />)`). Build: exemplos/14-escolha-e-evolucao/react/vite.config.ts:1-3 (Vite with React plugin); exemplos/14-escolha-e-evolucao/react/package.json:8 (`tsc --noEmit && vite build`).

**Interpretation:** React application with own entry/Vite build. Isolated material application; boundary establishes no other-unit link.

### 42. exemplos/10-micro-frontends/apps/shell/src/main.ts:16-28; exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37; exemplos/10-micro-frontends/apps/shell/public/remotes.json:3; exemplos/10-micro-frontends/apps/catalogo-react/package.json:7-8; scripts/build-remoto.mjs:21-26; scripts/servir-remoto.mjs:2-6; exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-6

**Observation:** Catalogo button calls `abrir`; manifest key `catalogo` resolves ESM bundle served at port 4301. Build of `catalogo-react` generates `microfrontend.js`; shell imports it, calling `mount`.

**Interpretation:** Shell composes remote catalogo-react at runtime through mechanism `script`, with ESM loading by URL and mounting/cleanup cycle. Relationship active in snapshot.

### 43. exemplos/10-micro-frontends/apps/shell/src/main.ts:16-28; exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37; exemplos/10-micro-frontends/apps/shell/public/remotes.json:4; exemplos/10-micro-frontends/apps/checkout-angular/package.json:7-8; scripts/build-remoto.mjs:21-26; scripts/servir-remoto.mjs:2-6; exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12

**Observation:** Checkout button calls `abrir`; manifest key `checkout` resolves ESM bundle served at port 4302. Build of `checkout-angular` generates `microfrontend.js`; shell imports it, calling `mount`.

**Interpretation:** Shell composes remote checkout-angular at runtime through mechanism `script`, with ESM loading by URL and mounting/cleanup cycle. Relationship active in snapshot.

### 44. angular.json:12-13; angular.json:21; exemplos/01-componentes/angular/package.json:8; exemplos/01-componentes/angular/package.json:7

**Observation:** Script `build` calls `ng build 01-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/01-componentes/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 45. exemplos/01-componentes/react/vite.config.ts:1-3; exemplos/01-componentes/react/package.json:8; exemplos/01-componentes/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 46. angular.json:58-59; angular.json:67; exemplos/02-atomic-design/angular/package.json:8; exemplos/02-atomic-design/angular/package.json:7

**Observation:** Script `build` calls `ng build 02-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/02-atomic-design/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 47. exemplos/02-atomic-design/react/vite.config.ts:1-3; exemplos/02-atomic-design/react/package.json:8; exemplos/02-atomic-design/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 48. angular.json:104-105; angular.json:113; exemplos/03-camadas/angular/package.json:8; exemplos/03-camadas/angular/package.json:7

**Observation:** Script `build` calls `ng build 03-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/03-camadas/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 49. exemplos/03-camadas/react/vite.config.ts:1-3; exemplos/03-camadas/react/package.json:8; exemplos/03-camadas/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 50. angular.json:150-151; angular.json:159; exemplos/04-feature-based/angular/package.json:8; exemplos/04-feature-based/angular/package.json:7

**Observation:** Script `build` calls `ng build 04-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/04-feature-based/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 51. exemplos/04-feature-based/react/vite.config.ts:1-3; exemplos/04-feature-based/react/package.json:8; exemplos/04-feature-based/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 52. angular.json:196-197; angular.json:205; exemplos/05-clean-architecture/angular/package.json:8; exemplos/05-clean-architecture/angular/package.json:7

**Observation:** Script `build` calls `ng build 05-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/05-clean-architecture/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 53. exemplos/05-clean-architecture/react/vite.config.ts:1-3; exemplos/05-clean-architecture/react/package.json:8; exemplos/05-clean-architecture/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 54. angular.json:242-243; angular.json:251; exemplos/06-hexagonal/angular/package.json:8; exemplos/06-hexagonal/angular/package.json:7

**Observation:** Script `build` calls `ng build 06-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/06-hexagonal/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 55. exemplos/06-hexagonal/react/vite.config.ts:1-3; exemplos/06-hexagonal/react/package.json:8; exemplos/06-hexagonal/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 56. angular.json:288-289; angular.json:297; exemplos/07-feature-sliced-design/angular/package.json:8; exemplos/07-feature-sliced-design/angular/package.json:7

**Observation:** Script `build` calls `ng build 07-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/07-feature-sliced-design/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 57. exemplos/07-feature-sliced-design/react/vite.config.ts:1-3; exemplos/07-feature-sliced-design/react/package.json:8; exemplos/07-feature-sliced-design/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 58. angular.json:334-335; angular.json:343; exemplos/08-mvvm/angular/package.json:8; exemplos/08-mvvm/angular/package.json:7

**Observation:** Script `build` calls `ng build 08-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/08-mvvm/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 59. exemplos/08-mvvm/react/vite.config.ts:1-3; exemplos/08-mvvm/react/package.json:8; exemplos/08-mvvm/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 60. angular.json:380-381; angular.json:389; exemplos/09-flux/angular/package.json:8; exemplos/09-flux/angular/package.json:7

**Observation:** Script `build` calls `ng build 09-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/09-flux/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 61. exemplos/09-flux/react/vite.config.ts:1-3; exemplos/09-flux/react/package.json:8; exemplos/09-flux/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 62. exemplos/10-micro-frontends/apps/catalogo-react/package.json:7; scripts/build-remoto.mjs:21-26; exemplos/10-micro-frontends/apps/catalogo-react/package.json:8; scripts/servir-remoto.mjs:2-6; exemplos/10-micro-frontends/apps/shell/public/remotes.json:3

**Observation:** Build script calls `build-remoto.mjs react`: esbuild bundles `src/mount.tsx` as `dist/microfrontend.js` ESM. Script `dev` serves own `dist` at port 4301 with shell CORS. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Bundle can be recompiled separately from other block 10 units. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 63. exemplos/10-micro-frontends/apps/checkout-angular/package.json:7; scripts/build-remoto.mjs:9-26; exemplos/10-micro-frontends/apps/checkout-angular/package.json:8; scripts/servir-remoto.mjs:2-6; exemplos/10-micro-frontends/apps/shell/public/remotes.json:4

**Observation:** Build calls `ngc -p tsconfig.json` and `build-remoto.mjs angular`: linker/esbuild bundle `dist/compiled/mount.js` as `dist/microfrontend.js` ESM. Script `dev` serves `dist` at port 4302 with shell CORS. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Bundle can be recompiled separately from other block 10 units. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 64. exemplos/10-micro-frontends/apps/shell/package.json:8; exemplos/10-micro-frontends/apps/shell/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Bundle can be recompiled separately from other block 10 units. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 65. angular.json:426-427; angular.json:435-441; exemplos/11-renderizacao/angular/package.json:8; exemplos/11-renderizacao/angular/package.json:7; exemplos/11-renderizacao/angular/src/server.ts:10

**Observation:** Script `build` calls `ng build 11-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/11-renderizacao/angular/dist`. Target also generates SSR server serving directory `browser` at `127.0.0.1:4200`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 66. exemplos/11-renderizacao/next/next.config.mjs:1-2; exemplos/11-renderizacao/next/package.json:8; exemplos/11-renderizacao/next/package.json:7

**Observation:** Manifest declares `next build --webpack` and `next start` at `127.0.0.1:3000`; Next configuration defines `outputFileTracingRoot`. Own output is `.next/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 67. angular.json:477-478; angular.json:486; exemplos/12-ilhas/angular/package.json:8; exemplos/12-ilhas/angular/package.json:7

**Observation:** Script `build` calls `ng build 12-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/12-ilhas/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 68. exemplos/12-ilhas/astro/astro.config.mjs:1-3; exemplos/12-ilhas/astro/package.json:8; exemplos/12-ilhas/astro/package.json:7

**Observation:** Manifest declares `astro build`; Astro configuration includes React integration. Application generates own `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 69. angular.json:523-524; angular.json:532; exemplos/13-bff/apps/web-angular/package.json:8; exemplos/13-bff/apps/web-angular/package.json:7

**Observation:** Script `build` calls `ng build 13-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/13-bff/apps/web-angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 70. exemplos/13-bff/next/next.config.mjs:1-2; exemplos/13-bff/next/package.json:8; exemplos/13-bff/next/package.json:7

**Observation:** Manifest declares `next build --webpack` and `next start` at `127.0.0.1:3000`; Next configuration defines `outputFileTracingRoot`. Own output is `.next/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 71. angular.json:569-570; angular.json:578; exemplos/14-escolha-e-evolucao/angular/package.json:8; exemplos/14-escolha-e-evolucao/angular/package.json:7

**Observation:** Script `build` calls `ng build 14-angular`. Corresponding `angular.json` target uses `@angular/build:application` and produces own output in `exemplos/14-escolha-e-evolucao/angular/dist`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 72. exemplos/14-escolha-e-evolucao/react/vite.config.ts:1-3; exemplos/14-escolha-e-evolucao/react/package.json:8; exemplos/14-escolha-e-evolucao/react/package.json:7

**Observation:** Manifest declares `build: "tsc --noEmit && vite build"`, producing own application `dist/`. No deployment artifact or independent versioning recorded for application.

**Interpretation:** Build confirms own application boundary. Own build does not connect isolated application to others. Local execution does not demonstrate independent publication: Deploy remains `not observed`.

### 73. README.md:3

**Observation:** Document states: "As pastas seguem os 14 blocos da apresentação e implementam alternativas do mesmo problema". English translation: "Folders follow fourteen presentation blocks, implementing alternatives for same problem."

**Interpretation:** Documentation presents alternative applications organized in blocks; directory count not equal to composed unit count.

### 74. README.md:22

**Observation:** Document states: "`10` inicia o conjunto de micro-frontends". English translation: "The numbered block starts microfrontend group."

**Interpretation:** Text identifies block 10 as composed group, matching two active relationships.

### 75. README.md:28

**Observation:** Document states: "Shell dos micro-frontends". English translation: "Microfrontend shell."

**Interpretation:** Name assigns shell consumer/coordinator role for remotes.

### 76. README.md:93

**Observation:** Document states: "Cada pasta é uma alternativa independente. Os exemplos não importam regras uns dos outros; compartilham apenas o estilo visual de demonstração.". English translation: "Each folder an independent alternative. Examples do not import each other’s rules; share only demonstration visual style."

**Interpretation:** Claim describes separation of alternatives/style sharing without declaring inter-block composition.

### 77. conteudo/aula-arquitetura-front-end.md:2059-2069

**Observation:** Document states: tree "workspace/ # monorepo é opcional … apps/ shell/ catalogo-react/ … checkout-angular/ … packages/ contracts/mount.ts". English translation: "Workspace: monorepo optional; apps include shell, React catalog and Angular checkout; packages contain mounting contract."

**Interpretation:** Tree describes three block 10 units in workspace, distinguishing contract type package.

### 78. conteudo/aula-arquitetura-front-end.md:2062

**Observation:** Document states: "shell/ # descoberta, rotas, fallback". English translation: "Shell: discovery, routes, fallback."

**Interpretation:** Claim assigns shell routing role contradicted by snapshot: remotes activated by buttons. Discovery/fallback implemented, but row corroboration remains `contradicted`.

### 79. conteudo/aula-arquitetura-front-end.md:2068

**Observation:** Document states: "contracts/mount.ts # contrato estável, sem store global". English translation: "Mounting contract: stable contract without global store."

**Interpretation:** Text describes integration contract without global store; types define mounting/cleanup.

### 80. conteudo/aula-arquitetura-front-end.md:2073

**Observation:** Document states: "**adaptadores de montagem**, não uma configuração completa de federação". English translation: "Mounting adapters rather than complete federation configuration."

**Interpretation:** Documentation describes own mounting adapters matching script composition without federation library.

### 81. conteudo/aula-arquitetura-front-end.md:2102

**Observation:** Document states: "Contrato com o shell: **receber um elemento e devolver a limpeza**.". English translation: "Shell contract: receive element and return cleanup."

**Interpretation:** Text describes host/remote integration cycle based on received element/returned cleanup function.

### 82. conteudo/aula-arquitetura-front-end.md:2104

**Observation:** Document states: "A origem do módulo pode mudar sem expor os componentes internos ao shell.". English translation: "Module origin can change without exposing internal components to shell."

**Interpretation:** Claim describes components encapsulated behind URL/mounting contract. Origin change also requires adjusting shell origin list.

### 83. conteudo/aula-arquitetura-front-end.md:2107

**Observation:** Document states: "Este é um contrato didático próprio, não o contrato exato bootstrap/mount/unmount de single-spa.". English translation: "Own teaching contract rather than exact single-spa bootstrap/mount/unmount contract."

**Interpretation:** Claim distinguishes teaching contract from named single-spa lifecycle; naming technology does not show usage.

### 84. conteudo/aula-arquitetura-front-end.md:2107

**Observation:** Document states: "O shell chama a limpeza antes de descartar a montagem.". English translation: "Shell calls cleanup before discarding mount."

**Interpretation:** Text describes consumer responsibility to execute cleanup when discarding mount.

### 85. conteudo/aula-arquitetura-front-end.md:2141

**Observation:** Document states: "o shell mantém o mesmo contrato". English translation: "Shell maintains same contract."

**Interpretation:** Claim describes same shell contract integrating both remotes.

### 86. exemplos/10-micro-frontends/README.md:3

**Observation:** Document states: "Compor aplicações que possuem artefatos de build separados.". English translation: "Compose applications with separate build artifacts."

**Interpretation:** Text associates application composition with separate build artifacts, matching block 10 relationships/builds.

### 87. exemplos/10-micro-frontends/README.md:18

**Observation:** Document states: "Shell → manifesto → módulo ESM remoto → mount(host) → cleanup()". English translation: "Shell → manifest → remote ESM module → mount host → cleanup."

**Interpretation:** Diagram describes discovery, ESM loading, mounting/cleanup chain implemented by shell.

### 88. exemplos/10-micro-frontends/README.md:21

**Observation:** Document states: "Catálogo React e Checkout Angular são compilados separadamente e servidos em 4301 e 4302.". English translation: "React catalog and Angular checkout compiled separately, served at respective stated ports."

**Interpretation:** Claim describes two build boundaries/separate local servers; ports do not demonstrate deployment.

### 89. exemplos/10-micro-frontends/README.md:23

**Observation:** Document states: "O shell em 4300 carrega um remoto por vez, trata falha de carregamento". English translation: "Shell at stated port loads one remote at a time, handling loading failures."

**Interpretation:** Text describes remote switching/consumer fallback; documentation semantic implementation support.

### 90. exemplos/10-micro-frontends/README.md:23

**Observation:** Document states: "O Angular remoto usa AOT: ngc compila os componentes e o linker finaliza as bibliotecas antes do bundle ESM.". English translation: "Angular remote uses AOT: ngc compiles components and linker finalizes libraries before ESM bundle."

**Interpretation:** Claim describes remote Angular unit build chain without establishing publication.

### 91. exemplos/10-micro-frontends/README.md:107

**Observation:** Document states: "Recompile apenas catálogo e confirme que o shell continua sem novo build.". English translation: "Recompile only catalog, confirming shell continues without new build."

**Interpretation:** Exercise describes rebuilding catalog without shell rebuild, supported by runtime loading. Origin change remains subject to fixed consumer list.

### 92. exemplos/10-micro-frontends/README.md:111

**Observation:** Document states: "Há bundles separados e um caminho de publicação independente". English translation: "Separate bundles and independent publication path."

**Interpretation:** Claim partially corroborated: separate builds/URLs external to bundle support described path without provisioned publication.

### 93. exemplos/10-micro-frontends/README.md:111

**Observation:** Document states: "o laboratório não provisiona um pipeline de deploy". English translation: "Laboratory does not provision deployment pipeline."

**Interpretation:** Declared absence of deployment pipeline matches `not observed` result for 29 applications.

### 94. exemplos/10-micro-frontends/README.md:125

**Observation:** Document states: "ajuste as URLs em `apps/shell/public/remotes.json` e a lista de origens permitidas do shell". English translation: "Adjust URLs in stated shell manifest and shell allowed-origin list."

**Interpretation:** Documentation explicit remote operation depends on both manifest URLs and shell-embedded origin list.

### 95. exemplos/10-micro-frontends/README.md:125

**Observation:** Document states: "Neste laboratório o shell fornece os estilos". English translation: "Shell supplies laboratory styles."

**Interpretation:** Text describes remote visual dependency on shell document.

### 96. exemplos/10-micro-frontends/README.md:125

**Observation:** Document states: "o contrato é de montagem, sem comunicação de seleção entre catálogo e checkout". English translation: "Mounting contract without selection communication between catalog and checkout."

**Interpretation:** Claim delimits integration to mounting/cleanup without catalog selection exchange with checkout.

### 97. exemplos/10-micro-frontends/README.md:125

**Observation:** Document states: "Cada remoto embute seu framework.". English translation: "Each remote embeds own framework."

**Interpretation:** Text describes bundles including each remote framework without runtime sharing of dependencies.

### 98. exemplos/10-micro-frontends/packages/contracts/mount.ts:1

**Observation:** Document states: "Contrato de integração versionado, sem componentes ou estado global compartilhados.". English translation: "Versioned integration contract without shared components/global state."

**Interpretation:** Comment describes typed/versioned shell/remote contract without shared components/global state.

### 99. material/gabarito.md:16

**Observation:** Document states: "montar e desmontar destrói a raiz React ou a aplicação Angular; a próxima montagem começa com estado novo". English translation: "Mounting and unmounting destroys React root or Angular application; next mount begins with new state."

**Interpretation:** Answer key describes cleanup effect on identity/local state of React/Angular instances.

### 100. e1c6fb92488afd39e2c1d704ee1243ed52d862b6 2026-10-06 (conteudo/aula-arquitetura-front-end.md; exemplos/10-micro-frontends/apps/shell/)

**Observation:** Only commit adds slides/shell together. No earlier version or block 10 route file in history recorded by 3.4.8.

**Interpretation:** History does not clarify whether route comment intent or remnant predating first commit. Uncertainty about past; snapshot button composition clear, route claim remains contradicted.

### 101. exemplos/10-micro-frontends/README.md:111; exemplos/10-micro-frontends/README.md:125

**Observation:** In same sentence describing independent publication path, README declares laboratory provisions no deployment pipeline. Publication of each `dist/` appears as instruction.

**Interpretation:** Snapshot resolves uncertainty: documented publication possibility without abandoned deployment artifact to explain. No need to infer earlier deployment stage.

**Note:** Section 3.4.8 records Commits `—` for point resolved by snapshot; header therefore points to resolving excerpts without attributing investigation commit.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (manual row main.ts:16, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #19, #20 (Where served); 3.4.7 #10, #19, #20, #22 (Evidence) | 2 configuration | configuration | script | architectural | strong | configures #8; configures #42; configures #43 |
| 2 | 3.4.4 (src-mount-export, exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3) | 3 code | source code | script | technological | moderate | implements #42 |
| 3 | 3.4.4 (src-mount-export, exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4) | 3 code | source code | script | technological | moderate | implements #43 |
| 4 | 3.4.4 (src-custom-element, aula-arquitetura-front-end.html:20284) | 3 code | source code | — | context | weak | — |
| 5 | 3.4.4 (src-iframe, aula-arquitetura-front-end.html:20635) | 3 code | source code | — | context | weak | — |
| 6 | 3.4.4 (src-cross-unit-communication, aula-arquitetura-front-end.html:20284) | 3 code | source code | — | context | weak | — |
| 7 | 3.4.4 (src-cross-unit-communication, aula-arquitetura-front-end.html:20635) | 3 code | source code | — | context | weak | — |
| 8 | 3.4.4 (manual, exemplos/10-micro-frontends/apps/shell/src/main.ts:16) | 3 code | source code | script | architectural | strong | implements #42; implements #43 |
| 9 | 3.4.4 (manual, exemplos/10-micro-frontends/apps/shell/src/main.ts:23) | 3 code | source code | script | technological | moderate | implements #42; implements #43 |
| 10 | 3.4.4 (manual, exemplos/10-micro-frontends/apps/shell/src/main.ts:26) | 3 code | source code | script | technological | moderate | implements #42; implements #43 |
| 11 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 12 | 3.4.3 (exemplos/01-componentes/angular) | 4 structure | directory | — | architectural | moderate | — |
| 13 | 3.4.3 (exemplos/01-componentes/react) | 4 structure | directory | — | architectural | moderate | — |
| 14 | 3.4.3 (exemplos/02-atomic-design/angular) | 4 structure | directory | — | architectural | moderate | — |
| 15 | 3.4.3 (exemplos/02-atomic-design/react) | 4 structure | directory | — | architectural | moderate | — |
| 16 | 3.4.3 (exemplos/03-camadas/angular) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (exemplos/03-camadas/react) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (exemplos/04-feature-based/angular) | 4 structure | directory | — | architectural | moderate | — |
| 19 | 3.4.3 (exemplos/04-feature-based/react) | 4 structure | directory | — | architectural | moderate | — |
| 20 | 3.4.3 (exemplos/05-clean-architecture/angular) | 4 structure | directory | — | architectural | moderate | — |
| 21 | 3.4.3 (exemplos/05-clean-architecture/react) | 4 structure | directory | — | architectural | moderate | — |
| 22 | 3.4.3 (exemplos/06-hexagonal/angular) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.3 (exemplos/06-hexagonal/react) | 4 structure | directory | — | architectural | moderate | — |
| 24 | 3.4.3 (exemplos/07-feature-sliced-design/angular) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.3 (exemplos/07-feature-sliced-design/react) | 4 structure | directory | — | architectural | moderate | — |
| 26 | 3.4.3 (exemplos/08-mvvm/angular) | 4 structure | directory | — | architectural | moderate | — |
| 27 | 3.4.3 (exemplos/08-mvvm/react) | 4 structure | directory | — | architectural | moderate | — |
| 28 | 3.4.3 (exemplos/09-flux/angular) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.3 (exemplos/09-flux/react) | 4 structure | directory | — | architectural | moderate | — |
| 30 | 3.4.3 (exemplos/10-micro-frontends/apps/catalogo-react) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (exemplos/10-micro-frontends/apps/checkout-angular) | 4 structure | directory | — | architectural | moderate | — |
| 32 | 3.4.3 (exemplos/10-micro-frontends/apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 33 | 3.4.3 (exemplos/11-renderizacao/angular) | 4 structure | directory | — | architectural | moderate | — |
| 34 | 3.4.3 (exemplos/11-renderizacao/next) | 4 structure | directory | — | architectural | moderate | — |
| 35 | 3.4.3 (exemplos/12-ilhas/angular) | 4 structure | directory | — | architectural | moderate | — |
| 36 | 3.4.3 (exemplos/12-ilhas/astro) | 4 structure | directory | — | architectural | moderate | — |
| 37 | 3.4.3 (exemplos/13-bff/apps/web-angular) | 4 structure | directory | — | architectural | moderate | — |
| 38 | 3.4.3 (exemplos/13-bff/apps/web-bff) | 4 structure | directory | — | context | weak | — |
| 39 | 3.4.3 (exemplos/13-bff/next) | 4 structure | directory | — | architectural | moderate | — |
| 40 | 3.4.3 (exemplos/14-escolha-e-evolucao/angular) | 4 structure | directory | — | architectural | moderate | — |
| 41 | 3.4.3 (exemplos/14-escolha-e-evolucao/react) | 4 structure | directory | — | architectural | moderate | — |
| 42 | 3.4.5 #1 | 5 composition | source code | script | architectural | strong | links #32; links #30 |
| 43 | 3.4.5 #2 | 5 composition | source code | script | architectural | strong | links #32; links #31 |
| 44 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #12 |
| 45 | 3.4.6 #2 | 6 build-deploy | manifest | — | architectural | moderate | publishes #13 |
| 46 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #14 |
| 47 | 3.4.6 #4 | 6 build-deploy | manifest | — | architectural | moderate | publishes #15 |
| 48 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #16 |
| 49 | 3.4.6 #6 | 6 build-deploy | manifest | — | architectural | moderate | publishes #17 |
| 50 | 3.4.6 #7 | 6 build-deploy | configuration | — | architectural | moderate | publishes #18 |
| 51 | 3.4.6 #8 | 6 build-deploy | manifest | — | architectural | moderate | publishes #19 |
| 52 | 3.4.6 #9 | 6 build-deploy | configuration | — | architectural | moderate | publishes #20 |
| 53 | 3.4.6 #10 | 6 build-deploy | manifest | — | architectural | moderate | publishes #21 |
| 54 | 3.4.6 #11 | 6 build-deploy | configuration | — | architectural | moderate | publishes #22 |
| 55 | 3.4.6 #12 | 6 build-deploy | manifest | — | architectural | moderate | publishes #23 |
| 56 | 3.4.6 #13 | 6 build-deploy | configuration | — | architectural | moderate | publishes #24 |
| 57 | 3.4.6 #14 | 6 build-deploy | manifest | — | architectural | moderate | publishes #25 |
| 58 | 3.4.6 #15 | 6 build-deploy | configuration | — | architectural | moderate | publishes #26 |
| 59 | 3.4.6 #16 | 6 build-deploy | manifest | — | architectural | moderate | publishes #27 |
| 60 | 3.4.6 #17 | 6 build-deploy | configuration | — | architectural | moderate | publishes #28 |
| 61 | 3.4.6 #18 | 6 build-deploy | manifest | — | architectural | moderate | publishes #29 |
| 62 | 3.4.6 #19 | 6 build-deploy | manifest | script | architectural | moderate | publishes #30 |
| 63 | 3.4.6 #20 | 6 build-deploy | manifest | script | architectural | moderate | publishes #31 |
| 64 | 3.4.6 #21 | 6 build-deploy | manifest | — | architectural | moderate | publishes #32 |
| 65 | 3.4.6 #22 | 6 build-deploy | configuration | — | architectural | moderate | publishes #33 |
| 66 | 3.4.6 #23 | 6 build-deploy | manifest | — | architectural | moderate | publishes #34 |
| 67 | 3.4.6 #24 | 6 build-deploy | configuration | — | architectural | moderate | publishes #35 |
| 68 | 3.4.6 #25 | 6 build-deploy | manifest | — | architectural | moderate | publishes #36 |
| 69 | 3.4.6 #26 | 6 build-deploy | configuration | — | architectural | moderate | publishes #37 |
| 70 | 3.4.6 #27 | 6 build-deploy | manifest | — | architectural | moderate | publishes #39 |
| 71 | 3.4.6 #28 | 6 build-deploy | configuration | — | architectural | moderate | publishes #40 |
| 72 | 3.4.6 #29 | 6 build-deploy | manifest | — | architectural | moderate | publishes #41 |
| 73 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #13; corroborates #14; corroborates #15; corroborates #16; corroborates #17; corroborates #18; corroborates #19; corroborates #20; corroborates #21; corroborates #22; corroborates #23; corroborates #24; corroborates #25; corroborates #26; corroborates #27; corroborates #28; corroborates #29; corroborates #30; corroborates #31; corroborates #32; corroborates #33; corroborates #34; corroborates #35; corroborates #36; corroborates #37; corroborates #39; corroborates #40; corroborates #41 |
| 74 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #42; corroborates #43 |
| 75 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #32; corroborates #42; corroborates #43 |
| 76 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates exemplos/01-componentes/react/src/main.tsx:3; corroborates exemplos/11-renderizacao/next/src/app/layout.tsx:2; corroborates exemplos/10-micro-frontends/apps/shell/src/main.ts:2; corroborates angular.json:18-20 |
| 77 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #30; corroborates #31; corroborates #32; corroborates exemplos/10-micro-frontends/packages/contracts/mount.ts:2-5 |
| 78 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | contradicts #8; contradicts exemplos/10-micro-frontends/apps/shell/index.html:1 |
| 79 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates exemplos/10-micro-frontends/packages/contracts/mount.ts:2-5 |
| 80 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #2; corroborates #3; corroborates #42; corroborates #43 |
| 81 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #2; corroborates #3; corroborates exemplos/10-micro-frontends/packages/contracts/mount.ts:2-4 |
| 82 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #8; corroborates #9; corroborates #10 |
| 83 | 3.4.7 #11 | 7 documentation | documentation | single-spa | technological | weak | corroborates exemplos/10-micro-frontends/packages/contracts/mount.ts:3-4 |
| 84 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #10 |
| 85 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #8; corroborates #9; corroborates #10; corroborates exemplos/10-micro-frontends/packages/contracts/mount.ts:4 |
| 86 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #42; corroborates #43; corroborates #62; corroborates #63; corroborates #64 |
| 87 | 3.4.7 #15 | 7 documentation | documentation | script | architectural | weak | corroborates #8; corroborates #9; corroborates #10; corroborates #42; corroborates #43 |
| 88 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #62; corroborates #63 |
| 89 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates #10; corroborates exemplos/10-micro-frontends/apps/shell/src/main.ts:30-33; corroborates tests/e2e/aula.spec.ts:148-149; corroborates tests/e2e/aula.spec.ts:153-156 |
| 90 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates #63 |
| 91 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates #62; corroborates #64; corroborates #1; corroborates #9 |
| 92 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | partially corroborates #62; partially corroborates #63; partially corroborates #64; partially corroborates #1 |
| 93 | 3.4.7 #21 | 7 documentation | documentation | — | architectural | weak | corroborates #44; corroborates #45; corroborates #46; corroborates #47; corroborates #48; corroborates #49; corroborates #50; corroborates #51; corroborates #52; corroborates #53; corroborates #54; corroborates #55; corroborates #56; corroborates #57; corroborates #58; corroborates #59; corroborates #60; corroborates #61; corroborates #62; corroborates #63; corroborates #64; corroborates #65; corroborates #66; corroborates #67; corroborates #68; corroborates #69; corroborates #70; corroborates #71; corroborates #72 |
| 94 | 3.4.7 #22 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #8 |
| 95 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | corroborates exemplos/10-micro-frontends/apps/shell/src/main.ts:2; corroborates exemplos/10-micro-frontends/apps/catalogo-react/src/App.tsx:4; corroborates exemplos/10-micro-frontends/apps/checkout-angular/src/app/checkout-app.ts:3-5 |
| 96 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | corroborates exemplos/10-micro-frontends/apps/catalogo-react/src/App.tsx:3-4; corroborates exemplos/10-micro-frontends/packages/contracts/mount.ts:2-5 |
| 97 | 3.4.7 #25 | 7 documentation | documentation | — | architectural | weak | corroborates scripts/build-remoto.mjs:21-24; corroborates #62; corroborates #63 |
| 98 | 3.4.7 #26 | 7 documentation | comment | — | architectural | weak | corroborates exemplos/10-micro-frontends/packages/contracts/mount.ts:2-5; corroborates #8 |
| 99 | 3.4.7 #27 | 7 documentation | documentation | — | architectural | weak | corroborates #2; corroborates #3; corroborates tests/e2e/aula.spec.ts:150-152 |
| 100 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #78 |
| 101 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #92; explains #93 |

## Summary

Observations: 101. Dimensions (technology: 0, configuration: 1, code: 9, structure: 31, composition: 2, build-deploy: 29, documentation: 27, history: 2). Strength (strong: 4, moderate: 62, weak: 35, ambiguous: 0). Evidence (technological: 5, architectural: 90, context: 6).

