---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
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

# 176 — Lnx117/single_spa_main

## Repository overview

Snapshot has six files and one unit, root-level single-spa root config, a Vite project (#10). Both composed microfrontends, `menu` and `base`, live in other repositories and only appear as `localhost` development-server URLs.

Architecture-supporting chain is entirely in root:
- **Dependencies:** `single-spa` and `vite-plugin-single-spa` declared and used (#1, #2).
- **Configuration:** plugin configured in `type: 'root'` mode (#3), and `.envtest` gives `menu` and `base` URLs (#4).
- **Code:** registrations `menu` and `base` name external units (#5, #6), loading functions fetch lifecycles through `import()` of environment-variable URLs (#7, #8), and `start()` starts orchestrator (#9).
- **Relationships:** two active root-config → application relationships result, with targets outside snapshot (#11, #12).

Root has own build, without deployment in repository (#13).

Execution caveat: code says URLs come from `.env`/`.env.local`, but sole versioned file containing them is `.envtest`, not loaded by Vite by default (#4, #20). History does not explain difference because both files arrive together in sole commit (#27). This does not change relationships: each registration target is named in code and URL declared in snapshot.

Documentation consists entirely of Russian comments in `.envtest`, `src/main.ts` and `vite.config.ts`. Confirms root and registration roles (#15, #17–#19, #21–#25). Claims depending on absent microfrontends or unversioned files are only partially confirmed: each microfrontend's Vite development server (#14), `.env` files (#20) and CSS isolation (#26). CDN builds have no artifact (#16). Nothing remains ambiguous in snapshot. Microfrontend side itself is unobserved.

Configuration: 2 blocks retained. `vite.config.ts` serves one unit, included through single-spa plugin (#3). `.envtest` included through microfrontend URLs (#4). Excluded:
- `server` block of `vite.config.ts:17-22`, with development-server port 9080 cited in 3.4.6 #1 (Where served) and 3.4.7 #1 (Evidence), and alias `@` in `vite.config.ts:23-29`;
- `scripts` in `package.json:6-10`, concerning build and development server (dimension 6);
- `index.html`, not a configuration file: containers and entry appear in code and structure observations (#5, #6, #10).

## Observations

### 1. package.json:16

**Observation:** `single-spa` `^6.0.3` in `dependencies`. Review marks configured through import in src/main.ts:3, `registerApplication` calls in src/main.ts:13-17 and 21-25 and `start()` in src/main.ts:29.

**Interpretation:** Root declares single-spa orchestrator and uses it in entry.

### 2. package.json:20

**Observation:** `vite-plugin-single-spa` `^1.1.0` in `devDependencies`. Review marks configured through import in vite.config.ts:3 and call in `plugins` (vite.config.ts:12-15), loaded by scripts `vite` and `vite build` (package.json:7-8).

**Interpretation:** Root declares single-spa Vite plugin and uses it in own build configuration.

### 3. vite.config.ts:3; vite.config.ts:12-15

**Observation:** `vitePluginSingleSpa({ type: 'root', cssStrategy: 'multiMife' })` in `plugins` list of `defineConfig` (vite.config.ts:5-16), imported from `vite-plugin-single-spa`. File declares no remotes or URLs.

**Interpretation:** Configuration gives project single-spa root config role and defines CSS strategy for multiple applications. Configures mechanism in unit without naming others.

### 4. .envtest:8; .envtest:11; .envtest:2-4

**Observation:** `VITE_MENU=http://localhost:9083/src/index.ts` and `VITE_BASE=http://localhost:9081/src/index.ts`, with comments saying each microfrontend is Vite development server on own port and `main.ts` uses `import()` on URLs to load lifecycles `bootstrap`, `mount` and `unmount`. File named `.envtest`; comment in src/main.ts:5-6 mentions `.env`/`.env.local`, absent from snapshot.

**Interpretation:** File declares addresses through which root resolves external units `menu` and `base`. Filename is a local execution caveat: Vite does not load it by default.

### 5. src/main.ts:13-17; src/main.ts:3; index.html:12

**Observation:** `registerApplication({ name: 'menu', app: () => import(env.VITE_MENU), activeWhen: '/' })`, with `registerApplication` imported from `single-spa`. Page has container `single-spa-application:menu` inside `<nav>`.

**Interpretation:** Root registers external application `menu` by name, active on all routes, and defines mount location.

### 6. src/main.ts:21-25; index.html:17

**Observation:** `registerApplication({ name: 'base', app: () => import(env.VITE_BASE), activeWhen: '/' })`. Page has container `single-spa-application:base` inside `<main>`.

**Interpretation:** Root registers external application `base` by name, also active on all routes alongside `menu`.

### 7. src/main.ts:15; src/main.ts:7; .envtest:8

**Observation:** `app: () => import(/* @vite-ignore */ env.VITE_MENU)`, with `env` read from `import.meta.env`. Snapshot value of `VITE_MENU` only in `.envtest`.

**Interpretation:** Loading function of registration `menu` fetches external microfrontend lifecycles at runtime through environment-variable URL.

### 8. src/main.ts:23; .envtest:11

**Observation:** `app: () => import(/* @vite-ignore */ env.VITE_BASE)`. Snapshot value of `VITE_BASE` only in `.envtest`.

**Interpretation:** Loading function of registration `base` fetches external microfrontend lifecycles at runtime through environment-variable URL.

### 9. src/main.ts:29; src/main.ts:3

**Observation:** `start()`, imported from `single-spa`.

**Interpretation:** Starts orchestrator. Without it, `menu` and `base` registrations do not mount.

### 10. .; index.html:20; vite.config.ts:5-16; package.json:8

**Observation:** Root Vite project, with `package.json`, entry page `index.html` loading `/src/main.ts`, Vite configuration with single-spa plugin and `vite build`, without workspace.

**Interpretation:** Sole frontend unit in snapshot, root config with own boundary.

### 11. src/main.ts:13; src/main.ts:15; src/main.ts:29; .envtest:8; vite.config.ts:12-15

**Observation:** Root `.` registers `menu` in single-spa, loads lifecycles through `import()` from URL `http://localhost:9083/src/index.ts` and starts orchestrator, with plugin in `type: 'root'`. Target absent from snapshot.

**Interpretation:** An active root-config → application relationship with external target.

### 12. src/main.ts:21; src/main.ts:23; src/main.ts:29; .envtest:11; vite.config.ts:12-15

**Observation:** Root `.` registers `base`, loads lifecycles through `import()` from URL `http://localhost:9081/src/index.ts` and starts orchestrator. Target absent from snapshot, and application mounted alongside `menu`.

**Interpretation:** An active root-config → application relationship with external target.

### 13. package.json:8; vite.config.ts:5-16

**Observation:** `"build": "vite build"` at root, with root config configuration. Microfrontend `import()` calls have `@vite-ignore` and resolve at runtime (src/main.ts:15, 23). No deployment artifact; `dev` and `preview` are development commands, and version `1.0.0` unused in publication.

**Interpretation:** Root has own build excluding microfrontends, without observed deployment or independent versioning.

### 14. .envtest:2

**Observation:** "В dev-режиме каждый микрофронт — отдельный Vite dev-сервер на своём порту."

**English translation:** In development mode each microfrontend is a separate Vite development server on its own port.

**Interpretation:** Claims each microfrontend runs separately on own server. Distinct ports confirm separation; each server being Vite has no artifact. Claim partially corroborated.

### 15. .envtest:3-4

**Observation:** "main.ts делает import() по этим URL, чтобы загрузить lifecycle-хуки (bootstrap, mount, unmount) каждого микрофронта."

**English translation:** main.ts imports these URLs to load each microfrontend lifecycle hooks: bootstrap, mount and unmount.

**Interpretation:** Claims how root loads microfrontends. Claim corroborated by loading-function `import()` calls.

### 16. .envtest:5

**Observation:** "А потом уже можно использовать билды по типу VITE_MENU_URL=https://test-cdn.breez.ru/bt/menu/index.js"

**English translation:** Later, builds hosted at a CDN URL can be used.

**Interpretation:** Claims future step with microfrontends published on CDN. No snapshot artifact performs build or points to address. Claim remains uncorroborated.

### 17. .envtest:7

**Observation:** "Навигационное меню"

**English translation:** Navigation menu label of `VITE_MENU`.

**Interpretation:** Claims unit `menu` page role. Claim corroborated by registration and container in `<nav>`.

### 18. .envtest:10

**Observation:** "Основной контент страниц"

**English translation:** Main page content label of `VITE_BASE`.

**Interpretation:** Claims unit `base` page role. Claim corroborated by registration and container in `<main>`.

### 19. src/main.ts:1-2

**Observation:** "Root config single-spa — точка входа, которая регистрирует и запускает все микрофронтенды приложения."

**English translation:** Single-spa root config — entry registering and starting all application microfrontends.

**Interpretation:** Claims file is root config entry, registering and starting microfrontends. Claim corroborated.

### 20. src/main.ts:5-6

**Observation:** "URL-адреса микрофронтендов берутся из переменных окружения Vite (файл .env / .env.local), чтобы легко переключать адреса между dev/prod."

**English translation:** Microfrontend URLs come from Vite environment variables, in environment files, to switch addresses easily between development and production.

**Interpretation:** Claims microfrontend URL origin. Environment-variable reading confirmed; files `.env`/`.env.local` and development/production switch have no artifact. Claim partially corroborated.

### 21. src/main.ts:10

**Observation:** "activeWhen: '/' — монтируется на всех маршрутах (всегда виден)."

**English translation:** activeWhen: '/' — mounted on all routes, always visible.

**Interpretation:** Claims when unit `menu` mounts. Claim corroborated.

### 22. src/main.ts:20

**Observation:** "Тоже активен на '/', т.е. отображается параллельно с menu."

**English translation:** Also active on '/', displayed alongside menu.

**Interpretation:** Claims `base` and `menu` display together. Claim corroborated.

### 23. src/main.ts:27-28

**Observation:** "Запуск single-spa: начинает слушать изменения URL и монтировать/размонтировать зарегистрированные микрофронтенды."

**English translation:** Starting single-spa: begins listening to URL changes and mounting/unmounting registered microfrontends.

**Interpretation:** Claims role of `start()`. Claim corroborated.

### 24. vite.config.ts:7

**Observation:** "Интеграция с single-spa — микрофронтендовым оркестратором."

**English translation:** Integration with single-spa, microfrontend orchestrator.

**Interpretation:** Names plugin technology. Claim corroborated.

### 25. vite.config.ts:8-9

**Observation:** "type: 'root' — этот проект является корневым (root config), т.е. он загружает и монтирует дочерние микрофронтенды."

**English translation:** type: 'root' — project is root config, loading and mounting child microfrontends.

**Interpretation:** Claims project is root composing microfrontends. Claim corroborated by plugin option and relationships.

### 26. vite.config.ts:10-11

**Observation:** "cssStrategy: 'multiMife' — изоляция CSS между микрофронтендами, чтобы стили одного приложения не ломали другое."

**English translation:** cssStrategy: 'multiMife' — CSS isolation between microfrontends so application styles do not break another.

**Interpretation:** Claims plugin option effect. Option configured; isolation depends on absent microfrontends and has no artifact. Claim partially corroborated.

### 27. 112c73b 2026-03-14 (src/main.ts; .envtest)

**Observation:** `src/main.ts`, with comment about `.env`/`.env.local`, and `.envtest`, with values of `VITE_MENU` and `VITE_BASE`, arrive together in sole commit, snapshot. No `.env` or `.env.local` appears in history, even as removed file.

**Interpretation:** History does not say whether `.envtest` is an `.env` renamed for versioning or example copy of externally maintained file. Uncertainty concerns file origin; URLs are declared in snapshot and relationships remain active.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:16) | 1 technology | manifest | single-spa | technological | weak | declares #5; declares #6; declares #9 |
| 2 | 3.4.2 (package.json:20) | 1 technology | manifest | single-spa | technological | weak | declares #3 |
| 3 | 3.4.2 (package.json:20, Evidence); 3.4.3 (., Build); 3.4.5 #1, #2 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #11, #12, #13 (Evidence) | 2 configuration | configuration | single-spa | technological | moderate | configures #10; configures #11; configures #12 |
| 4 | 3.4.4 (src/main.ts:15, :23, Observation); 3.4.5 #1, #2 (Configuration); 3.4.7 #1, #7 (Evidence) | 2 configuration | configuration | single-spa | architectural | strong | configures #11; configures #12; configures #7; configures #8 |
| 5 | 3.4.4 (src/main.ts:13) | 3 code | source code | single-spa | architectural | strong | implements #11 |
| 6 | 3.4.4 (src/main.ts:21) | 3 code | source code | single-spa | architectural | strong | implements #12 |
| 7 | 3.4.4 (src/main.ts:15) | 3 code | source code | single-spa | technological | moderate | implements #11 |
| 8 | 3.4.4 (src/main.ts:23) | 3 code | source code | single-spa | technological | moderate | implements #12 |
| 9 | 3.4.4 (src/main.ts:29) | 3 code | source code | single-spa | technological | moderate | implements #11; implements #12 |
| 10 | 3.4.3 (.) | 4 structure | directory | — | architectural | moderate | — |
| 11 | 3.4.5 #1 | 5 composition | source code | single-spa | architectural | strong | links #10 |
| 12 | 3.4.5 #2 | 5 composition | source code | single-spa | architectural | strong | links #10 |
| 13 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #10 |
| 14 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | partially corroborates #4; partially corroborates #11; partially corroborates #12 |
| 15 | 3.4.7 #2 | 7 documentation | comment | single-spa | technological | weak | corroborates #7; corroborates #8; corroborates #11; corroborates #12 |
| 16 | 3.4.7 #3 | 7 documentation | comment | — | architectural | weak | — |
| 17 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates #5; corroborates #11 |
| 18 | 3.4.7 #5 | 7 documentation | comment | — | architectural | weak | corroborates #6; corroborates #12 |
| 19 | 3.4.7 #6 | 7 documentation | comment | single-spa | architectural | weak | corroborates #10; corroborates #5; corroborates #6; corroborates #9; corroborates #11; corroborates #12 |
| 20 | 3.4.7 #7 | 7 documentation | comment | — | technological | weak | partially corroborates #7; partially corroborates #8; partially corroborates #4 |
| 21 | 3.4.7 #8 | 7 documentation | comment | single-spa | architectural | weak | corroborates #5; corroborates #11 |
| 22 | 3.4.7 #9 | 7 documentation | comment | — | architectural | weak | corroborates #6; corroborates #12 |
| 23 | 3.4.7 #10 | 7 documentation | comment | single-spa | technological | weak | corroborates #9 |
| 24 | 3.4.7 #11 | 7 documentation | comment | single-spa | technological | weak | corroborates #2; corroborates #3 |
| 25 | 3.4.7 #12 | 7 documentation | comment | single-spa | architectural | weak | corroborates #3; corroborates #11; corroborates #12 |
| 26 | 3.4.7 #13 | 7 documentation | comment | — | technological | weak | partially corroborates #3 |
| 27 | 3.4.8 #1 | 8 history | history | — | technological | weak | explains #4; explains #20 |

## Summary

Observations: 27. Dimensions (technology: 2, configuration: 2, code: 5, structure: 1, composition: 2, build-deploy: 1, documentation: 13, history: 1). Strength (strong: 5, moderate: 6, weak: 16, ambiguous: 0). Evidence (technological: 12, architectural: 15, context: 0).

