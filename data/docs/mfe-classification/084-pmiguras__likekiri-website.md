---
schema: 1
id: 1329274714
full_name: pmiguras/likekiri-website
url: https://github.com/pmiguras/likekiri-website
commit: 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 12
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 084 — pmiguras/likekiri-website

## Context

Production-oriented system with a public site, an administration panel and business modules. The classification is based on composition code in the shells themselves, federation configurations and manifests published by the modules; the description in `README.md:3–9` serves only as context. The production orientation also appears in separate processes and the proxy in `infra/systemd/likekiri-module-hello.service:6–12` and `infra/caddy/likekiri.caddy:6–33`.

The commit matches `data/samples/mfe-sample-001/clones.csv:85`. Complete inventory through `git ls-tree -r --name-only 4b8c5fd5053751aba70fcd4859a38fd33062c8d3`: 226 files, none under `node_modules/`. Paths in this annotation are relative to the snapshot root, without an additional prefix. There are 12 own frontend targets: `apps/admin-shell`, `apps/web-shell` and ten directories in `modules/`. `apps/core` is the integration backend; `packages/contract`, `packages/i18n` and `packages/tokens` are shared libraries, not additional frontend units. The built file in `modules/clientes/dist-ssr/entry-ssr.js` is output of the same `clientes` target, not another unit.

The only local references observed are `main`, `origin/main` and `origin/HEAD`, all at the evaluated commit. They were recorded only as context; no other version supports the classification.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Build/deploy | `pnpm-workspace.yaml:1–4` includes apps, packages and modules. The admin has its own build in `apps/admin-shell/package.json:7–10` and web-shell in `apps/web-shell/package.json:7–9`. The admin enters through `apps/admin-shell/src/main.tsx:1–9`; web-shell has distinct client and SSR entries in `apps/web-shell/vite.config.ts:11–23`. | moderate |
| Configuration / Composition (hello) | `modules/hello/vite.config.ts:10–29` defines remote `hello`, exposes `HelloIsland` and `HelloAdminPage` and builds its own entry. `modules/hello/server.mjs:32–52` associates these exposures with web and admin surfaces. The components exist in `modules/hello/src/HelloIsland.tsx:12–14` and `modules/hello/src/HelloAdminPage.tsx:7–8`. | strong |
| Configuration / Composition (cuentas) | `modules/cuentas/vite.config.ts:8–26` exposes three pages and defines its own build; `modules/cuentas/server.mjs:32–58` maps these pages to admin routes. | strong |
| Configuration / Composition (registry) | `modules/registry/vite.config.ts:8–24` exposes `RegistryPage` and defines the build entry; `modules/registry/server.mjs:32–45` associates it with the admin’s `/registry` route. | strong |
| Configuration / Composition (ejemplo-web) | `modules/ejemplo-web/vite.config.ts:11–27` exposes `SimuladorIsland` and defines its build; `modules/ejemplo-web/server.mjs:33–48` registers the public route `/ejemplo-web/:modo`. This is a target with executable files, not just a documentation excerpt. | strong |
| Configuration / Composition (ejemplo-admin) | `modules/ejemplo-admin/vite.config.ts:10–27` exposes `PanelPage` and `AjustesPage` and defines its build; `modules/ejemplo-admin/server.mjs:33–52` registers both panel routes. | strong |
| Configuration / Composition (clientes) | `modules/clientes/vite.config.ts:22–42` exposes three islands and two administration pages with its own entry; `modules/clientes/server.mjs:998–1017` associates them with web and admin routes. The client and SSR build is its own in `modules/clientes/package.json:7–10`. | strong |
| Configuration / Composition (sitio) | `modules/sitio/vite.config.ts:8–24` exposes `SitioPage` and defines its build; `modules/sitio/server.mjs:32–46` registers the admin page `/sitio`. | strong |
| Configuration / Composition (media) | `modules/media/vite.config.ts:8–24` exposes `MediaPage` and defines its build; `modules/media/server.mjs:421–434` registers the admin route `/media`. | strong |
| Configuration / Composition (chat) | `modules/chat/vite.config.ts:8–18` exposes `ChatWidgetIsland` and `ChatAdminPage`, with its own entry/build; `modules/chat/server.mjs:486–497` registers a public widget and administration pages. The same target participates in both surfaces. | strong |
| Configuration / Composition (ops) | `modules/ops/vite.config.ts:8–15` exposes `OpsAdminPage` and defines its build; `modules/ops/server.mjs:259–268` registers its page in admin. | strong |
| Source code (discovery) | Core synchronizes modules in `apps/core/src/registry/registry.service.ts:117–138`, fetches `/.well-known/module-manifest` in `apps/core/src/registry/registry.service.ts:394–412` and compiles routes with `moduleId` and `remoteEntry` in `apps/core/src/registry/registry.service.ts:466–486`. `apps/core/src/registry/registry.service.ts:213–223` produces the shell routes; the endpoint delivers them in `apps/core/src/auth/shell-manifest.controller.ts:19–38`. | strong |
| Source code / Composition (admin) | `apps/admin-shell/src/api.ts:85` requests the manifest; `apps/admin-shell/src/App.tsx:141–157` loads it, `apps/admin-shell/src/App.tsx:214–226` resolves the route and instantiates `ModulePage`. The loader initializes/registers the remotes and calls `loadRemote` in `apps/admin-shell/src/federation.ts:28–51`; `apps/admin-shell/src/views/ModulePage.tsx:22–48` calls this loader and renders the received component. Therefore the runtime is consumed by the application. | strong |
| Source code / Composition (web) | `apps/core/src/shell/shell.controller.ts:44–53` resolves the public route and sends its description to the shell. `apps/core/src/shell/shell.service.ts:127–147` passes on `moduleId`, component, URL and props. `apps/web-shell/src/entry-server.tsx:77–101` creates the placeholder and `apps/web-shell/src/entry-server.tsx:176–181` includes the island runtime. `apps/web-shell/src/islands.ts:22–44` collects these descriptors; `apps/web-shell/src/islands.ts:52–67` loads the remotes and mounts or hydrates the UI; `apps/web-shell/src/islands.ts:75–113` initializes and triggers this flow. | strong |
| Source code (delegated SSR) | Core requests HTML from the module server over HTTP in `apps/core/src/registry/registry.service.ts:294–318`. `modules/clientes/server.mjs:463–469` loads its own SSR bundle; `modules/clientes/src/entry-ssr.ts:14–23` renders the three islands. The shell receives this HTML and marks the node for hydration in `apps/web-shell/src/entry-server.tsx:83–96`; the client calls `hydrateRoot` in `apps/web-shell/src/islands.ts:63–67`. This is not the shell importing another frontend’s source. | strong |
| Build/deploy | `modules/hello/server.mjs:19–22` defines its own port, remote URL and output directory; `modules/hello/server.mjs:98–113` serves the built bundle. There is an independent process in `infra/systemd/likekiri-module-hello.service:10–12` and a proxy to it in `infra/caddy/likekiri.caddy:15–18`. The proxy also separates the other modules in `infra/caddy/likekiri.caddy:19–29` and `infra/caddy/likekiri.caddy:50–73`. | moderate |
| Configuration (snapshot limitation) | Actual configuration `config/modules.json` is explicitly ignored in `.gitignore:11–12`; only the example with `hello` is versioned in `config/modules.example.json:2–6`. Core reads this configuration in `apps/core/src/registry/registry.service.ts:372–391`. Thus, the enabled list in a deployment is not observable, although the ten targets and their integration contracts are present. | context |
| Source code (negative coupling search) | Audit of static/dynamic imports and re-exports in own `.ts`, `.tsx` and `.mjs` files under `apps/`, `modules/` and `packages/`, excluding `dist*` outputs: no relative import crossing an app/module boundary to another app/module’s sources was found. The local named imports found refer only to the libraries `@likekiri/contract`, `@likekiri/contract/hmac`, `@likekiri/i18n` and `@likekiri/tokens`; there is no named import of another frontend target. Composition between frontends is the remote loading cited above. | absent |
| Configuration / Source code (negative search for other mechanisms) | Own `.ts`, `.tsx`, `.mjs` and `.json` files under `apps/`, `modules/` and `packages/`, excluding `dist*`, were searched for `<iframe`, `postMessage`, `srcDoc`, `single-spa`, `registerApplication`, `registerMicroApps`, `customElements.define`, `importmap` and `import-map`, without results. A link between the surfaces is not used as the basis for Q4; federation calls and mounting are demonstrated in code. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two shells with their own entries/builds (`apps/admin-shell/src/main.tsx:1–9`, `apps/web-shell/vite.config.ts:11–23`) and ten federated modules inventoried in the table. Concrete composition relationship example: `modules/hello/server.mjs:38–52` connects the same module to both surfaces; `modules/chat/server.mjs:492–497` does the same for chat. Count: 12 own targets, without duplicating exposed components or SSR builds. |
| Q2 | Yes | Separate entries and builds in the shells and each module, according to inventoried configurations; for example, `modules/hello/vite.config.ts:23–29`, `modules/clientes/package.json:7–10`, `apps/admin-shell/package.json:7–10` and `apps/web-shell/package.json:7–9`. Separate module process in `infra/systemd/likekiri-module-hello.service:10–12`. The described audit found no direct source imports between frontend units. The modules have no standalone app: `src/index.ts` only re-exports components (for example, `modules/hello/src/index.ts:1–2`), and `remoteEntry.js` is the federated entry; the criterion requires their own entry and build, not a standalone executable application. |
| Q3 | Yes | Core produces module routes in `apps/core/src/registry/registry.service.ts:213–223`; admin forwards them to `ModulePage` in `apps/admin-shell/src/App.tsx:214–226`. The public site receives descriptors of the same units in `apps/core/src/shell/shell.service.ts:127–147` and mounts their islands. These are surfaces of the same modular application with shared modules, not two sites without a composition relationship. |
| Q4 | Yes | Concrete exposures in module builds, discovery of their manifests, registration and consumption by the runtime: `modules/hello/vite.config.ts:10–19`, `apps/core/src/registry/registry.service.ts:394–412`, `apps/admin-shell/src/federation.ts:34–51`, `apps/admin-shell/src/views/ModulePage.tsx:25–48` and `apps/web-shell/src/islands.ts:52–67`. The calls are connected to shell entries, not merely declared as dependencies. |
| Q5 | Yes | The chain between manifest, independent build, remote loading and rendering is implemented in the Q1–Q4 artifacts; for example, `modules/hello/server.mjs:38–52`, `apps/admin-shell/src/federation.ts:34–51` and `apps/admin-shell/src/views/ModulePage.tsx:25–48`. There is no Q5 disagreement. |

## Rationale

- Q1–Q5 are Yes: `MFE-implemented` applies, under the inclusion case of a monorepo containing hosts and remotes. `repo_type: production` records the system’s orientation, without asserting deployment or proven execution in this static inspection.
- The examples `hello`, `ejemplo-web` and `ejemplo-admin` are own targets with executable configurations, components and manifests for these hosts. They are not MFE only as teaching content, nor targets without a composition relationship (precedents 023/028). The business modules also have the same explicit contracts.
- The host is code in the repository itself; the word platform does not represent a third-party platform extension mechanism here. Neither the platform plugin exclusion (037) nor the MFE-unit class with absent host (051) applies.
- The shared contract, translation and token libraries do not support build-time composition between frontends: UI components are obtained at runtime through federation. There is no open link or iframe decision to resolve for this proposal.

## Analysis notes

- **RQ1:** README and dependencies confirm the project vocabulary, but the central evidence is the code-to-code connection between exposures, manifests, loaders and mounting. Absence of credentials and the actual registry limits observation of deployment state; it does not erase the implemented mechanism or allow asserting that all modules are enabled simultaneously. The versioned ADRs record the architectural decision: `docs/adr/002-stack-y-versiones.md:29–32` (choice of `@module-federation/vite` instead of `@originjs`), `docs/adr/004-ssr-islas-auth-y-despliegue.md:14` (islands through `@module-federation/runtime`), `docs/adr/005`, `006` and `007` (admin by modules, server-driven shell and SSR delegated to the module) and `docs/como-integrar-un-modulo.md`. This is documentation (moderate strength), corroborating code and useful for artifact mining.
- **RQ2:** Module Federation with manifest-based discovery and two consumers: administration SPA and React islands in the SSR site. The delegated SSR of `clientes` adds HTML obtained over HTTP before federated hydration; no other approach category needs to be created to support inclusion.
- **RQ3:** a module is one build unit even when it exposes multiple pages/islands or participates in both surfaces. Therefore, `clientes` and `chat` count once each, and the server/client bundles of the same target are not additional units.
- **Protocol:** searching existing annotations for `likekiri` and `pmiguras` found no previously recorded family. There is mechanism affinity with `docs/mfe-classification/045-mrgleam__mf-tanstack-demo.md` and `docs/mfe-classification/070-viernesviernes__EmerTech-Lab-Assignment-3.md` (React/Vite shells and federated consumption), without evidence of common origin. The internal `ejemplo-web` and `ejemplo-admin` templates belong to the snapshot itself; their names do not demonstrate kinship with another candidate.
