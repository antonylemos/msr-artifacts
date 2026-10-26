---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Repository overview

Authored project text is Spanish, at `README.mkd:1-154`. Mining did not mark it as `documentation`, because pattern is `**/*.md`; no `doc-*` occurrences exist in `matches.csv`. It was read in full, including both diagrams. Four mined documents are identical English templates without specific collective application claims: `apps/cms/README.md:1-5`, `apps/dashboard/README.md:1-5`, `apps/kanban/README.md:1-5` and `apps/shell/README.md:1-5`.

Documentation mixes existing configuration with a broader ecosystem description. Four apps and configured federation exist, but implemented shell composition only loads/renders Dashboard widget (`apps/shell/src/App.vue:5-7,21-28`). CMS and Kanban remain declared remotes without code consumption (3.4.5 #2-3). Local kit is used only by shell (`apps/shell/src/App.vue:3,14-15`); remotes only have Tailwind scan its sources (`apps/dashboard/src/style.css:4`; `apps/cms/src/style.css:4`; `apps/kanban/src/style.css:4`); widget has local state (`apps/dashboard/src/components/WidgetDinero.vue:2-4,12`), without announced shared session/state. Reviews 3.4.2–3.4.6 are `final`, sharing classification/acquisition ID and commit.

Headings `README.mkd:1,7,38,65,113,115,123,130,137,144` contextualize claims below. Functional chart/form/task descriptions (`README.mkd:125-142`) do not describe architectural relationships; snapshot contains minimal screens (`apps/cms/src/App.vue:1-10`, `apps/kanban/src/App.vue:1-10`, `apps/dashboard/src/App.vue:1-10`). Installation/execution/build command blocks (`README.mkd:83-87,93-95,108-111`) produce no rows. Production sequence includes `pnpm preview`, but root lacks that script (`package.json:6-11`); execution-list ports 5173–5176 (`README.mkd:99-102`) differ from configured 5000–5003 (`apps/shell/vite.config.ts:9,13`; `apps/dashboard/vite.config.ts:8,14`; `apps/cms/vite.config.ts:8,12`; `apps/kanban/vite.config.ts:8,12`). These are local-execution details without publication artifact (3.4.6 #1-4).

Root, four app and `packages/ui-kit` manifests, `pnpm-workspace.yaml`, `turbo.json`, four Vite configurations, entries/components cited by previous reviews and `apps/shell/src/vite-env.d.ts` were read. Root description is empty (`package.json:4`). Remote configuration comments about target, debugging and CSS (`apps/cms/vite.config.ts:28-30`; `apps/dashboard/vite.config.ts:30-32`; `apps/kanban/vite.config.ts:28-30`) generically justify options without claiming inter-unit style use. Shell comment explains Tailwind plugin call (`apps/shell/vite.config.ts:17-18`); type/export comments only locate files/exports (`apps/shell/src/vite-env.d.ts:1`; `packages/ui-kit/src/index.ts:2`). Repeated stylesheet comment in four apps (`apps/shell/src/style.css:3`; `apps/dashboard/src/style.css:3`; `apps/cms/src/style.css:3`; `apps/kanban/src/style.css:3`) only conditions `@source` directive on each project’s need. None adds architectural claims. Interface text claiming to come over network from Dashboard (`apps/shell/src/App.vue:19`) repeats relationship #7.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.mkd:3 | “Un ecosistema de Arquitectura Microfrontend [...] construido con Vue 3, Vite y Module Federation” (English translation: "microfrontend architecture ecosystem built with Vue 3, Vite and Module Federation") | structure | corroborated | 3.4.2, plugin rows in four apps; 3.4.3, units apps/*; 3.4.5 #1 |
| 2 | README.mkd:5 | “aplicaciones verticales independientes” (English translation: "independent vertical applications") | independence | corroborated | 3.4.3, units apps/*; apps/cms/package.json:6-10; apps/dashboard/package.json:6-10; apps/kanban/package.json:6-10; apps/shell/package.json:6-9 |
| 3 | README.mkd:5 | “comparten diseño, lógica y estado” (English translation: "share design, logic and state") | other | contradicted | apps/shell/src/App.vue:2-7,14-15; apps/dashboard/src/components/WidgetDinero.vue:1-19; apps/cms/src/App.vue:1-10; apps/kanban/src/App.vue:1-10 |
| 4 | README.mkd:9 | “El sistema utiliza el patrón Host (Shell) + Remotes” (English translation: "system uses host/shell and remotes pattern") | structure | corroborated | 3.4.5 #1-3; apps/shell/vite.config.ts:19-27 |
| 5 | README.mkd:9 | “cargando los microfrontends bajo demanda (Lazy Loading)” (English translation: "loading microfrontends on demand") | composition | corroborated | 3.4.4, dynamic-loading and runtime-composition; apps/shell/src/App.vue:5-7,21-28 |
| 6 | README.mkd:9 | “compartiendo dependencias críticas para optimizar el bundle size” (English translation: "sharing critical dependencies to optimize bundle size") | composition | corroborated | apps/shell/vite.config.ts:26; apps/dashboard/vite.config.ts:24; apps/cms/vite.config.ts:22; apps/kanban/vite.config.ts:22; apps/shell/src/main.ts:1; apps/dashboard/src/main.ts:1; apps/cms/src/main.ts:1; apps/kanban/src/main.ts:1 |
| 7 | README.mkd:25 | “Shell -->\|Carga Remota\| Dashboard” (English translation: "shell remotely loads Dashboard") | composition | corroborated | 3.4.5 #1; apps/shell/src/App.vue:5-7,23 |
| 8 | README.mkd:26 | “Shell -->\|Carga Remota\| CMS” (English translation: "shell remotely loads CMS") | composition | contradicted | 3.4.5 #2; apps/shell/vite.config.ts:23; apps/shell/src/App.vue:1-33 |
| 9 | README.mkd:27 | “Shell -->\|Carga Remota\| Kanban” (English translation: "shell remotely loads Kanban") | composition | contradicted | 3.4.5 #3; apps/shell/vite.config.ts:24; apps/shell/src/App.vue:1-33 |
| 10 | README.mkd:29 | “Shell -.->\|Consume\| UIKit” (English translation: "shell consumes UI Kit") | other | corroborated | apps/shell/package.json:12; apps/shell/src/App.vue:3,14-15 |
| 11 | README.mkd:30 | “Dashboard -.->\|Consume\| UIKit” (English translation: "Dashboard consumes UI Kit") | other | contradicted | apps/dashboard/package.json:12-16; apps/dashboard/src/App.vue:1-10; apps/dashboard/src/components/WidgetDinero.vue:1-19 |
| 12 | README.mkd:31 | “CMS -.->\|Consume\| UIKit” (English translation: "CMS consumes UI Kit") | other | contradicted | apps/cms/package.json:12-16; apps/cms/src/App.vue:1-10 |
| 13 | README.mkd:32 | “Kanban -.->\|Consume\| UIKit” (English translation: "Kanban consumes UI Kit") | other | contradicted | apps/kanban/package.json:12-16; apps/kanban/src/App.vue:1-10 |
| 14 | README.mkd:40 | “Turborepo para la orquestación de tareas y pnpm workspaces” (English translation: "Turborepo orchestrates tasks and pnpm workspaces") | build-deploy | corroborated | package.json:7-10,18; turbo.json:3-13; pnpm-workspace.yaml:1-3 |
| 15 | README.mkd:44-51 | “apps/ [...] Shell [...] Dashboard [...] CMS [...] Kanban” (English translation: "four applications in apps/") | structure | corroborated | 3.4.3, units apps/cms, apps/dashboard, apps/kanban and apps/shell |
| 16 | README.mkd:54-57 | “Librerías Compartidas [...] @repo/ui-kit [...] @repo/utils [...] Configuración TS” (English translation: "shared libraries: UI Kit, utils and TS configuration") | structure | contradicted | 3.4.3, unit packages/ui-kit; packages/ui-kit/package.json:1-21; packages/ui-kit/tsconfig.json:1-19 |
| 17 | README.mkd:68 | “Build Tool: Vite 6” | build-deploy | contradicted | apps/cms/package.json:23; apps/dashboard/package.json:23; apps/kanban/package.json:23; apps/shell/package.json:23 |
| 18 | README.mkd:73 | “State Management: Pinia (Shared State)” | other | contradicted | apps/shell/package.json:11-25; apps/cms/package.json:12-25; apps/dashboard/package.json:12-25; apps/kanban/package.json:12-25; apps/dashboard/src/components/WidgetDinero.vue:2-4,12 |
| 19 | README.mkd:91 | “Turborepo lanzará las 4 aplicaciones en paralelo” (English translation: "Turborepo starts all four applications in parallel") | independence | corroborated | package.json:7; turbo.json:4-7; apps/cms/package.json:7; apps/dashboard/package.json:7; apps/kanban/package.json:7; apps/shell/package.json:7 |
| 20 | README.mkd:99 | “Entra aquí para ver la integración completa” (English translation: "enter here to see complete integration") | composition | contradicted | 3.4.5 #1-3; apps/shell/src/App.vue:1-33 |
| 21 | README.mkd:117-119 | “Maneja [...] Autenticación (JWT compartido)” (English translation: "shell manages authentication with shared JWT") | other | contradicted | apps/shell/src/App.vue:1-33; apps/shell/src/main.ts:1-5; apps/cms/src/App.vue:1-10; apps/kanban/src/App.vue:1-10; apps/dashboard/src/components/WidgetDinero.vue:1-19 |
| 22 | README.mkd:120 | “Enrutamiento raíz” (English translation: "root routing in shell") | composition | contradicted | apps/shell/src/App.vue:1-33; apps/shell/src/main.ts:1-5; apps/shell/package.json:11-25 |
| 23 | README.mkd:150 | “Cada equipo puede desplegar su microfrontend (Dashboard, CMS) sin afectar al Shell ni a los otros módulos” (English translation: "each team can deploy its microfrontend without affecting shell or other modules") | build-deploy | uncorroborated | — |
| 24 | README.mkd:152 | “ver el cambio reflejado instantáneamente en las 4 apps gracias al Hot Module Replacement (HMR) unificado” (English translation: "see UI Kit changes in all four apps through unified HMR") | other | contradicted | apps/shell/src/App.vue:3,14-15; apps/cms/package.json:12-16; apps/dashboard/package.json:12-16; apps/kanban/package.json:12-16; package.json:7,10 |

## Observations

**1. README.mkd.** Vue 3, Vite and federation plugin exist in all four apps (3.4.2), with effective shell → Dashboard chain (3.4.5 #1). Same-sentence high-performance qualification is promotional, without snapshot measurement. Technologies recur at `README.mkd:47,67,69,71`; specific Vite version is addressed in #17.

**2. README.mkd.** Independence is supported by each app’s own entries/development scripts (3.4.3; `apps/cms/package.json:7`; `apps/dashboard/package.json:7`; `apps/kanban/package.json:7`; `apps/shell/package.json:7`). This confirms neither prior business division of monoliths nor team evolution, presented as example motivation.

**3. README.mkd.** Claim concerns inter-application sharing, but UI Kit is consumed only by shell (`apps/shell/src/App.vue:3,14-15`). Widget state is local `ref` changed by button (`apps/dashboard/src/components/WidgetDinero.vue:2-4,12`); CMS and Kanban only display headings (`apps/cms/src/App.vue:5`; `apps/kanban/src/App.vue:5`). Announced common logic/state is unimplemented.

**4. README.mkd.** Host declares three remotes (`apps/shell/vite.config.ts:19-27`), each exposing one module (3.4.5 #1-3). Diagram labels (`README.mkd:14,17-19`) and unit headings (`README.mkd:115,123,130,137`) repeat roles.

**5. README.mkd.** On-demand loading exists through `defineAsyncComponent` with `import('dashboard/Widget')`, rendered in `Suspense` (`apps/shell/src/App.vue:5-7,21-28`). General description does not demonstrate all remotes load: specific CMS/Kanban edges are evaluated in #8-9. `README.mkd:121` repeats remote-loading responsibility.

**6. README.mkd.** `vue` is in `shared` in all four Vite files (`apps/shell/vite.config.ts:26`; `apps/dashboard/vite.config.ts:24`; `apps/cms/vite.config.ts:22`; `apps/kanban/vite.config.ts:22`), used by all four `src/main.ts:1` entries. `README.mkd:151` explains same configuration as avoiding four downloads. Configuration corroborates mechanism; no execution or download/bundle-size measurement occurred.

**7. README.mkd.** Diagram edge is implemented by widget import/rendering (`apps/shell/src/App.vue:5-7,23`), with Dashboard exposure `./Widget` (`apps/dashboard/vite.config.ts:21-23`). Visible shell text (`apps/shell/src/App.vue:19`) describes same remote origin.

**8. README.mkd.** CMS has declared host URL (`apps/shell/vite.config.ts:23`) and exposes `./Cms` (`apps/cms/vite.config.ts:19-21`), but shell component only imports Dashboard and does not mount CMS (`apps/shell/src/App.vue:1-33`). Effective-loading arrow exceeds observed code; 3.4.5 #2 records Active `No`.

**9. README.mkd.** Kanban also appears only in configuration (`apps/shell/vite.config.ts:24`; `apps/kanban/vite.config.ts:19-21`), without shell import/rendering (`apps/shell/src/App.vue:1-33`). Relationship is Active `No` in 3.4.5 #3.

**10. README.mkd.** Shell consumption arrow is implemented: manifest declares `@repo/ui-kit` as workspace dependency (`apps/shell/package.json:12`), root component imports/renders `setupMsg` and `MyButton` (`apps/shell/src/App.vue:3,14-15`). Import is static through workspace path, and package is not a unit in 3.4.3. `README.mkd:146` repeats visual-consistency promise across all microfrontends without npm publication; other app consumption is evaluated in #11-13. Package exists as local source exporting `MyButton` and `setupMsg` (`packages/ui-kit/src/index.ts:1-4`).

**11. README.mkd.** Dashboard manifest does not declare `@repo/ui-kit` (`apps/dashboard/package.json:12-16`), and neither root component nor widget imports package contents (`apps/dashboard/src/App.vue:1-10`; `apps/dashboard/src/components/WidgetDinero.vue:1-19`). Stylesheet asks Tailwind to scan package sources (`apps/dashboard/src/style.css:4`), generating classes but consuming neither UI Kit component nor export.

**12. README.mkd.** CMS also does not declare package (`apps/cms/package.json:12-16`), root component displaying only heading (`apps/cms/src/App.vue:1-10`). Same Tailwind `@source` directive (`apps/cms/src/style.css:4`) creates no library use.

**13. README.mkd.** Kanban repeats CMS situation: no manifest dependency (`apps/kanban/package.json:12-16`), no root-component import (`apps/kanban/src/App.vue:1-10`), only `@source` directive (`apps/kanban/src/style.css:4`).

**14. README.mkd.** Scripts call `turbo dev`, `turbo build` and `turbo lint` (`package.json:7-9`), with tasks at `turbo.json:3-13` and workspace at `pnpm-workspace.yaml:1-3`. Declaration recurs at `README.mkd:3,70,81`. Configured automation is corroborated; 3.4.2 `Undetermined` result for Turbo use follows that stage’s own criterion excluding scripts as use evidence.

**15. README.mkd.** Second diagram’s four apps are four 3.4.3 units with own entries/configurations. Diagram ports 5000–5003 match `apps/shell/vite.config.ts:9`, `apps/dashboard/vite.config.ts:8`, `apps/cms/vite.config.ts:8` and `apps/kanban/vite.config.ts:8`.

**16. README.mkd.** Complete snapshot listing under `packages/` contains only `ui-kit`; no `@repo/utils` or TS configuration package exists. `packages/ui-kit/tsconfig.json:1-19` is that package’s internal configuration. Diagram combines existing library with two absent ones; joint claim is therefore contradicted. Actual UI Kit consumption is evaluated separately in #10-13.

**17. README.mkd.** All application manifests declare `vite: ^7.2.4`, rather than Vite 6 (`apps/cms/package.json:23`; `apps/dashboard/package.json:23`; `apps/kanban/package.json:23`; `apps/shell/package.json:23`).

**18. README.mkd.** Pinia is absent from four application manifests, with no shared store in code. Implemented state is local to widget (`apps/dashboard/src/components/WidgetDinero.vue:2-4,12`). This names a specific mechanism, distinct from generic sharing in #3.

**19. README.mkd.** `pnpm dev` delegates to Turbo `dev` task (`package.json:7`; `turbo.json:4-7`), present as `vite` in all four apps. This corroborates configuration to start them together. Alternative `dev:hybrid` uses shell in dev and remotes in build/preview (`package.json:10`); no execution validated `pnpm dev` federated functioning.

**20. README.mkd.** Announced complete integration is absent from shell root: local button and Dashboard widget (`apps/shell/src/App.vue:13-28`), without CMS/Kanban. Relationships 3.4.5 #2-3 are configured but inactive. Execution-list port discrepancy was recorded in Repository overview.

**21. README.mkd.** Neither shell entry nor root component implements authentication/session (`apps/shell/src/main.ts:1-5`; `apps/shell/src/App.vue:1-33`). Remote components also use no JWT. Shared-authentication promise contrasts with minimal available code; same-list layout details remain outside table.

**22. README.mkd.** Shell directly mounts `App` (`apps/shell/src/main.ts:3-5`), which directly renders widget (`apps/shell/src/App.vue:21-28`). No router or route-based remote selection exists; manifest likewise declares no routing dependency (`apps/shell/package.json:11-25`).

**23. README.mkd.** Review 3.4.6 records separate builds but Deploy `not observed` for all four apps. `vite preview` scripts/local URLs do not support independent-deployment promise. No publication configuration permits verifying effects of deploying Dashboard/CMS on others.

**24. README.mkd.** Promise of reflecting UI Kit changes in all four apps does not match found consumption: only shell imports package (`apps/shell/src/App.vue:3,14-15`). None of three remote manifests declares dependency. Vite development and joint orchestration (`package.json:7,10`) create no other-app library consumers.

## Summary

Claims: 24 (corroborated: 10, partial: 0, contradicted: 13, uncorroborated: 1). Themes: (structure: 4, composition: 7, build-deploy: 3, independence: 2, other: 8).
