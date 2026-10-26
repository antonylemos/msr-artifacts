---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
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

# 343 — Jonadersonmoura/descompara

## Repository overview

Nx workspace contains four Angular applications with own entries/builds (#47, #49, #56, #58). Native Federation chain starts at dependency #1, passes through builders/application configurations (#15–#22), reaches host manifest (#27). Shell initializes federation/loads `./Routes` at root, `intranet`, `admin` routes (#39–#44). Names/exposed modules/URLs support three active host → remote relationships (#60–#62).

Builds produce own outputs/CI executes jointly; deployment/independent versioning unobserved (#66–#69). Manifest URLs point to local development. Local asynchronous bootstraps/own-name registrations in remotes do not alone link units (#28–#37). Root, e2e projects/shared libraries structural context without increasing application count.

`AuthService` communication remains ambiguous (#45, #63–#65): reactive service may connect remotes if single instance between builds, or be local state in each application. `shareAll` configures singleton packages but does not demonstrate local-library sharing. `@softarc/native-federation-orchestrator` declaration also retains undetermined usage (#13). `@module-federation/enhanced`, `@nx/module-federation`, `@nx/webpack` declarations without recorded configured usage (#3, #8, #12).

Documentation describes composition/application separation but assigns navbar, home/guards to shell and calls mechanism “Module Federation”; 3.4.7 records three claims contradicted (#73, #74, #76). History single root commit: proves no earlier stages/explains no excess-declaration/divergence origins (#83–#89). Orchestrator/reactive-channel uncertainties continue affecting snapshot; other historical uncertainties only about past.

## Observations

### 1. package.json:58

**Observation:** Manifest declares `@angular-architects/native-federation: ^22.0.6` in `dependencies`.

**Interpretation:** Declarative signal of federation technology used; configuration/unit links have own observations.

### 2. package.json:65

**Observation:** Manifest declares `@nx/angular: ^23.1.0` in `dependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition.

### 3. package.json:18

**Observation:** Manifest declares `@module-federation/enhanced: ^2.1.0` in `devDependencies`.

**Interpretation:** Isolated declaration misleading signal of another mechanism: 3.4.2 records Configured No.

### 4. package.json:19

**Observation:** Manifest declares `@nx/devkit: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition.

### 5. package.json:20

**Observation:** Manifest declares `@nx/eslint: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition.

### 6. package.json:21

**Observation:** Manifest declares `@nx/eslint-plugin: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition.

### 7. package.json:22

**Observation:** Manifest declares `@nx/js: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition.

### 8. package.json:23

**Observation:** Manifest declares `@nx/module-federation: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition. Section 3.4.2 records Configured No, no snapshot usage found.

### 9. package.json:24

**Observation:** Manifest declares `@nx/playwright: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition.

### 10. package.json:25

**Observation:** Manifest declares `@nx/vitest: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition.

### 11. package.json:26

**Observation:** Manifest declares `@nx/web: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition.

### 12. package.json:27

**Observation:** Manifest declares `@nx/webpack: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition. Section 3.4.2 records Configured No, no snapshot usage found.

### 13. package.json:31

**Observation:** Manifest declares `@softarc/native-federation-orchestrator: ^4.2.2` in `devDependencies`.

**Interpretation:** May participate transitively in used federation or be excess declaration; effective execution path remains undetermined.

### 14. package.json:44

**Observation:** Manifest declares `nx: 23.1.0` in `devDependencies`.

**Interpretation:** Workspace-tool declaration without alone demonstrating inter-application composition.

### 15. admin/federation.config.mjs:1-43

**Observation:** `withNativeFederation` defines `name: admin` and `shared` with `shareAll`, `singleton: true`, `strictVersion: true`, own rule for `@angular/core`. Exposes `./Routes` through `./admin/src/app/remote-entry/entry.routes.ts`.

**Interpretation:** Configures Native Federation in unit without naming other application target. Package sharing does not demonstrate local AuthService library singleton.

### 16. admin/project.json:9-24

**Observation:** Target `build` uses `@angular-architects/native-federation:build`, delegates to `admin:esbuild` in production/development configurations.

**Interpretation:** Federation builder integrates unit build without alone linking distinct units.

### 17. intranet/federation.config.mjs:1-43

**Observation:** `withNativeFederation` defines `name: intranet` and `shared` with `shareAll`, `singleton: true`, `strictVersion: true`, own rule for `@angular/core`. Exposes `./Routes` through `./intranet/src/app/remote-entry/entry.routes.ts`.

**Interpretation:** Configures Native Federation in unit without naming other application target. Package sharing does not demonstrate local AuthService library singleton.

### 18. intranet/project.json:9-24

**Observation:** Target `build` uses `@angular-architects/native-federation:build`, delegates to `intranet:esbuild` in production/development configurations.

**Interpretation:** Federation builder integrates unit build without alone linking distinct units.

### 19. marAberto/federation.config.mjs:1-43

**Observation:** `withNativeFederation` defines `name: marAberto` and `shared` with `shareAll`, `singleton: true`, `strictVersion: true`, own rule for `@angular/core`. Exposes `./Routes` through `./marAberto/src/app/remote-entry/entry.routes.ts`.

**Interpretation:** Configures Native Federation in unit without naming other application target. Package sharing does not demonstrate local AuthService library singleton.

### 20. marAberto/project.json:9-24

**Observation:** Target `build` uses `@angular-architects/native-federation:build`, delegates to `marAberto:esbuild` in production/development configurations.

**Interpretation:** Federation builder integrates unit build without alone linking distinct units.

### 21. shell/federation.config.mjs:1-38

**Observation:** `withNativeFederation` defines `name: shell` and `shared` with `shareAll`, `singleton: true`, `strictVersion: true`, own rule for `@angular/core`.

**Interpretation:** Configures Native Federation in unit without naming other application target. Package sharing does not demonstrate local AuthService library singleton.

### 22. shell/project.json:9-24

**Observation:** Target `build` uses `@angular-architects/native-federation:build`, delegates to `shell:esbuild` in production/development configurations.

**Interpretation:** Federation builder integrates unit build without alone linking distinct units.

### 23. shell/project.json:25-35

**Observation:** Target `serve` uses `@angular-architects/native-federation:build` with `dev: true`, `devServer: true`, `target: shell:serve-original:development`.

**Interpretation:** Configures federation mechanism during unit development.

### 24. admin/project.json:25-35

**Observation:** Target `serve` uses `@angular-architects/native-federation:build` with `dev: true`, `devServer: true`, `target: admin:serve-original:development`.

**Interpretation:** Configures federation mechanism during unit development.

### 25. intranet/project.json:25-35

**Observation:** Target `serve` uses `@angular-architects/native-federation:build` with `dev: true`, `devServer: true`, `target: intranet:serve-original:development`.

**Interpretation:** Configures federation mechanism during unit development.

### 26. marAberto/project.json:25-35

**Observation:** Target `serve` uses `@angular-architects/native-federation:build` with `dev: true`, `devServer: true`, `target: marAberto:serve-original:development`.

**Interpretation:** Configures federation mechanism during unit development.

### 27. shell/public/federation.manifest.json:1-5

**Observation:** Manifest associates `admin`, `intranet`, `marAberto` with URLs `http://localhost:4203/remoteEntry.json`, `http://localhost:4202/remoteEntry.json`, `http://localhost:4201/remoteEntry.json`, respectively.

**Interpretation:** Host declares three targets external to own unit through explicit remote-resolution mechanism. Local development addresses.

### 28. admin/src/main.ts:5

**Observation:** `import('./bootstrap')` called in initialization chain of `admin`.

**Interpretation:** Local asynchronous loading without target in another unit.

### 29. intranet/src/main.ts:5

**Observation:** `import('./bootstrap')` called in initialization chain of `intranet`.

**Interpretation:** Local asynchronous loading without target in another unit.

### 30. marAberto/src/main.ts:5

**Observation:** `import('./bootstrap')` called in initialization chain of `marAberto`.

**Interpretation:** Local asynchronous loading without target in another unit.

### 31. shell/src/main.ts:5

**Observation:** `import('./bootstrap')` called in initialization chain of `shell`.

**Interpretation:** Local asynchronous loading without target in another unit.

### 32. admin/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Imports initialization mechanism; line names no targets.

### 33. admin/src/main.ts:3

**Observation:** Calls `initFederation({ admin: './remoteEntry.json' })`.

**Interpretation:** Registers only own unit for standalone initialization; resolves no other application.

### 34. intranet/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Imports initialization mechanism; line names no targets.

### 35. intranet/src/main.ts:3

**Observation:** Calls `initFederation({ intranet: './remoteEntry.json' })`.

**Interpretation:** Registers only own unit for standalone initialization; resolves no other application.

### 36. marAberto/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Imports initialization mechanism; line names no targets.

### 37. marAberto/src/main.ts:3

**Observation:** Calls `initFederation({ marAberto: './remoteEntry.json' })`.

**Interpretation:** Registers only own unit for standalone initialization; resolves no other application.

### 38. shell/src/app/app.routes.ts:2

**Observation:** Imports `loadRemoteModule` from `@angular-architects/native-federation`.

**Interpretation:** Provides composition loader without naming target on line.

### 39. shell/src/app/app.routes.ts:8

**Observation:** Route `''` uses `loadChildren` with `loadRemoteModule('marAberto', './Routes')`, returns `m.remoteRoutes`.

**Interpretation:** Links shell navigation path to another unit’s routes, `marAberto`, through Native Federation.

### 40. shell/src/app/app.routes.ts:13

**Observation:** Route `'intranet'` uses `loadChildren` with `loadRemoteModule('intranet', './Routes')`, returns `m.remoteRoutes`.

**Interpretation:** Links shell navigation path to another unit’s routes, `intranet`, through Native Federation.

### 41. shell/src/app/app.routes.ts:18

**Observation:** Route `'admin'` uses `loadChildren` with `loadRemoteModule('admin', './Routes')`, returns `m.remoteRoutes`.

**Interpretation:** Links shell navigation path to another unit’s routes, `admin`, through Native Federation.

### 42. shell/src/main.ts:1

**Observation:** Imports `initFederation` from `@angular-architects/native-federation`.

**Interpretation:** Imports initialization mechanism; line names no targets.

### 43. shell/src/main.ts:3; shell/public/federation.manifest.json:2-4

**Observation:** Calls `initFederation('/federation.manifest.json')` before bootstrap. Manifest names admin, intranet, marAberto.

**Interpretation:** Prepares host remote resolution through manifest; call receives resolution mechanism path.

### 44. shell/src/app/app.routes.ts:4-20; shell/src/app/app.config.ts:9

**Observation:** `appRoutes` maps root to marAberto, `intranet` to intranet, `admin` to admin using `loadRemoteModule`; `provideRouter(appRoutes)` registers table.

**Interpretation:** Organizes three remote navigation targets in host.

### 45. libs/shared/data-access/src/lib/auth.service.ts:6-27; marAberto/src/app/login/login.ts:19; intranet/src/app/login/login.ts:19; admin/src/app/login/login.ts:19; intranet/src/app/header/header.ts:17; admin/src/app/header/header.ts:17; libs/shared/guards/src/lib/role.guard.ts:14-17; intranet/src/app/remote-entry/entry.routes.ts:12; admin/src/app/remote-entry/entry.routes.ts:12

**Observation:** `AuthService`, root-provided, maintains user signal/login/logout/setRole methods; logins write service/admin-intranet guards read role.

**Interpretation:** May be inter-remote reactive channel if single instance between builds, or repeated local state per application. Snapshot does not demonstrate sharing.

### 46. ./; package.json:1-69; nx.json:1-94

**Observation:** Root has private workspace manifest, empty scripts/Nx configuration; no own UI entry/build.

**Interpretation:** Monorepo coordination without another frontend unit.

### 47. admin/; admin/project.json:2-4; admin/src/main.ts:1-5; admin/src/bootstrap.ts:1-5; admin/project.json:9-24; admin/project.json:72-79

**Observation:** Directory `admin` is Nx `application`, with own main/bootstrap and Native Federation target over esbuild, output `dist/admin`.

**Interpretation:** Frontend application boundary with own entry/build.

### 48. admin-e2e/; admin-e2e/package.json:1-8; admin-e2e/project.json:2-8; admin-e2e/playwright.config.mts:1-3

**Observation:** `admin-e2e` Playwright test project implicitly depends on `admin`, with private manifest/empty explicit targets, no UI entry/build.

**Interpretation:** Application test infrastructure without another frontend unit.

### 49. intranet/; intranet/project.json:2-4; intranet/src/main.ts:1-5; intranet/src/bootstrap.ts:1-5; intranet/project.json:9-24; intranet/project.json:72-79

**Observation:** Directory `intranet` is Nx `application`, with own main/bootstrap and Native Federation target over esbuild, output `dist/intranet`.

**Interpretation:** Frontend application boundary with own entry/build.

### 50. intranet-e2e/; intranet-e2e/package.json:1-8; intranet-e2e/project.json:2-8; intranet-e2e/playwright.config.mts:1-3

**Observation:** `intranet-e2e` Playwright test project implicitly depends on `intranet`, with private manifest/empty explicit targets, no UI entry/build.

**Interpretation:** Application test infrastructure without another frontend unit.

### 51. libs/shared/data-access/; libs/shared/data-access/project.json:1-13

**Observation:** `libs/shared/data-access` belongs to workspace shared libraries without application entry/build target.

**Interpretation:** Shared code without establishing autonomous frontend application.

### 52. libs/shared/guards/; libs/shared/guards/project.json:1-13

**Observation:** `libs/shared/guards` belongs to workspace shared libraries without application entry/build target.

**Interpretation:** Shared code without establishing autonomous frontend application.

### 53. libs/shared/theme/; libs/shared/theme/project.json:1-13

**Observation:** `libs/shared/theme` belongs to workspace shared libraries without application entry/build target.

**Interpretation:** Shared code without establishing autonomous frontend application.

### 54. libs/shared/types/; libs/shared/types/project.json:1-4; libs/shared/types/package.json:1-17

**Observation:** `libs/shared/types` belongs to workspace shared libraries without application entry/build target.

**Interpretation:** Shared code without establishing autonomous frontend application.

### 55. libs/shared/ui/; libs/shared/ui/project.json:1-13

**Observation:** `libs/shared/ui` belongs to workspace shared libraries without application entry/build target.

**Interpretation:** Shared code without establishing autonomous frontend application.

### 56. marAberto/; marAberto/project.json:2-4; marAberto/src/main.ts:1-5; marAberto/src/bootstrap.ts:1-5; marAberto/project.json:9-24; marAberto/project.json:72-79

**Observation:** Directory `marAberto` is Nx `application`, with own main/bootstrap and Native Federation target over esbuild, output `dist/marAberto`.

**Interpretation:** Frontend application boundary with own entry/build.

### 57. marAberto-e2e/; marAberto-e2e/package.json:1-8; marAberto-e2e/project.json:2-8; marAberto-e2e/playwright.config.mts:1-3

**Observation:** `marAberto-e2e` Playwright test project implicitly depends on `marAberto`, with private manifest/empty explicit targets, no UI entry/build.

**Interpretation:** Application test infrastructure without another frontend unit.

### 58. shell/; shell/project.json:2-4; shell/src/main.ts:1-5; shell/src/bootstrap.ts:1-5; shell/project.json:9-24; shell/project.json:63-70

**Observation:** Directory `shell` is Nx `application`, with own main/bootstrap and Native Federation target over esbuild, output `dist/shell`.

**Interpretation:** Frontend application boundary with own entry/build.

### 59. shell-e2e/; shell-e2e/package.json:1-8; shell-e2e/project.json:2-8; shell-e2e/playwright.config.mts:1-3

**Observation:** `shell-e2e` Playwright test project implicitly depends on `shell`, with private manifest/empty explicit targets, no UI entry/build.

**Interpretation:** Application test infrastructure without another frontend unit.

### 60. shell/src/app/app.routes.ts:18; shell/src/main.ts:3; shell/public/federation.manifest.json:2; admin/federation.config.mjs:4-10

**Observation:** Shell requests `./Routes` from `admin` in route table; manifest resolves `admin` to local remoteEntry/configuration of `admin` exposes `./Routes`.

**Interpretation:** Active shell-to-admin host → remote relationship recorded in 3.4.5.

### 61. shell/src/app/app.routes.ts:13; shell/src/main.ts:3; shell/public/federation.manifest.json:3; intranet/federation.config.mjs:4-10

**Observation:** Shell requests `./Routes` from `intranet` in route table; manifest resolves `intranet` to local remoteEntry/configuration of `intranet` exposes `./Routes`.

**Interpretation:** Active shell-to-intranet host → remote relationship recorded in 3.4.5.

### 62. shell/src/app/app.routes.ts:8; shell/src/main.ts:3; shell/public/federation.manifest.json:4; marAberto/federation.config.mjs:4-10

**Observation:** Shell requests `./Routes` from `marAberto` in route table; manifest resolves `marAberto` to local remoteEntry/configuration of `marAberto` exposes `./Routes`.

**Interpretation:** Active shell-to-marAberto host → remote relationship recorded in 3.4.5.

### 63. libs/shared/data-access/src/lib/auth.service.ts:6-27; marAberto/src/app/login/login.ts:19; admin/src/app/login/login.ts:19; libs/shared/guards/src/lib/role.guard.ts:14-17; admin/src/app/remote-entry/entry.routes.ts:12; shell/federation.config.mjs:7-18; marAberto/federation.config.mjs:12-23; admin/federation.config.mjs:12-23

**Observation:** `marAberto` and `admin` import local AuthService; logins change user/restricted-remote guards read role. Recorded direction `source → target`, mechanism `events`, Active `Undetermined`.

**Interpretation:** Single instance allows reactive inter-unit communication; per-build instances mean independent local states. Configuration does not resolve alternative.

### 64. libs/shared/data-access/src/lib/auth.service.ts:6-27; admin/src/app/login/login.ts:19; intranet/src/app/login/login.ts:19; libs/shared/guards/src/lib/role.guard.ts:14-17; admin/src/app/remote-entry/entry.routes.ts:12; intranet/src/app/remote-entry/entry.routes.ts:12; shell/federation.config.mjs:7-18; admin/federation.config.mjs:12-23; intranet/federation.config.mjs:12-23

**Observation:** `admin` and `intranet` import local AuthService; logins change user/restricted-remote guards read role. Recorded direction `bidirectional`, mechanism `events`, Active `Undetermined`.

**Interpretation:** Single instance allows reactive inter-unit communication; per-build instances mean independent local states. Configuration does not resolve alternative.

### 65. libs/shared/data-access/src/lib/auth.service.ts:6-27; marAberto/src/app/login/login.ts:19; intranet/src/app/login/login.ts:19; libs/shared/guards/src/lib/role.guard.ts:14-17; intranet/src/app/remote-entry/entry.routes.ts:12; shell/federation.config.mjs:7-18; marAberto/federation.config.mjs:12-23; intranet/federation.config.mjs:12-23

**Observation:** `marAberto` and `intranet` import local AuthService; logins change user/restricted-remote guards read role. Recorded direction `source → target`, mechanism `events`, Active `Undetermined`.

**Interpretation:** Single instance allows reactive inter-unit communication; per-build instances mean independent local states. Configuration does not resolve alternative.

### 66. admin/project.json:9-24; admin/project.json:72-79; admin/project.json:126-133; .github/workflows/ci.yml:25-39

**Observation:** Build target of `admin` uses Native Federation over esbuild, generates `dist/admin`, executed by CI with other projects. Own dev-server. Review records separate Build, unobserved Deployment, Versioning No.

**Interpretation:** Confirms application build separation. Build CI/local service do not demonstrate independent publication/versioning.

### 67. intranet/project.json:9-24; intranet/project.json:72-79; intranet/project.json:126-133; .github/workflows/ci.yml:25-39

**Observation:** Build target of `intranet` uses Native Federation over esbuild, generates `dist/intranet`, executed by CI with other projects. Own dev-server. Review records separate Build, unobserved Deployment, Versioning No.

**Interpretation:** Confirms application build separation. Build CI/local service do not demonstrate independent publication/versioning.

### 68. marAberto/project.json:9-24; marAberto/project.json:72-79; marAberto/project.json:126-133; .github/workflows/ci.yml:25-39

**Observation:** Build target of `marAberto` uses Native Federation over esbuild, generates `dist/marAberto`, executed by CI with other projects. Own dev-server. Review records separate Build, unobserved Deployment, Versioning No.

**Interpretation:** Confirms application build separation. Build CI/local service do not demonstrate independent publication/versioning.

### 69. shell/project.json:9-24; shell/project.json:63-79; shell/project.json:117-124; .github/workflows/ci.yml:25-39

**Observation:** Build target of `shell` uses Native Federation over esbuild, generates `dist/shell`, executed by CI with other projects. Own dev-server. Review records separate Build, unobserved Deployment, Versioning No.

**Interpretation:** Confirms application build separation. Build CI/local service do not demonstrate independent publication/versioning.

### 70. README.md:3

**Observation:** README states: "construído como microfrontends com **Angular 22** + **Nx**, usando **Module Federation nativo** (`@angular-architects/native-federation`)".

English translation: Built as microfrontends with Angular twenty-two and Nx, using native Module Federation (the cited Angular Architects package).

**Interpretation:** Situates microfrontend system/names Native Federation; claim corroborated by configuration/composition chain.

### 71. README.md:5

**Observation:** README states: "dividido em 3 ambientes independentes [...] mas todos reaproveitando os mesmos componentes de UI".

English translation: Divided into three independent environments, all reusing same UI components.

**Interpretation:** Describes three remote boundaries/UI reuse; review records corroboration through entries, builds/common imports.

### 72. README.md:13

**Observation:** README states: "Um app **shell** (host, porta 4200) orquestra a navegação entre eles, descobrindo cada remote em runtime via um manifesto de federação — nenhum dos apps precisa saber dos outros em build-time".

English translation: A shell app (host, port forty-two hundred) orchestrates navigation, discovering each remote at runtime through federation manifest; no app needs build-time knowledge of others.

**Interpretation:** Describes host/remotes organization/runtime discovery; manifest/routes corroborate organization.

### 73. README.md:19

**Observation:** README states: "shell/ # host — navbar, home, rotas, guards".

English translation: Shell: host with navbar, home, routes and guards.

**Interpretation:** Review records contradicted: shell has outlet/routes while public home, headers/guards in remotes.

### 74. README.md:27

**Observation:** README states: "roleGuard — protege rotas do shell por papel do usuário".

English translation: roleGuard protects shell routes by user role.

**Interpretation:** Review records contradicted: shell routes apply no guards; admin/intranet protect own exposed homes.

### 75. README.md:31

**Observation:** README states: "Cada `shell`/`marAberto`/`intranet`/`admin` é um projeto Angular independente (`project.json` próprio)".

English translation: Each of shell, marAberto, intranet and admin is independent Angular project with own project configuration.

**Interpretation:** Describes four Angular project boundaries in workspace corroborated by project.json files/own entries/builds.

### 76. README.md:31

**Observation:** README states: "ligado por Module Federation".

English translation: Linked through Module Federation.

**Interpretation:** Names Module Federation while code imports Native Federation/other technology packages unconfigured; review records contradicted.

### 77. README.md:31

**Observation:** README states: "As libs em `libs/shared/*` são os únicos pontos de acoplamento entre eles — importadas via path mapping [...] nunca por referência direta entre apps".

English translation: Libraries under shared libs are only coupling points, imported through path mapping, never direct cross-app references.

**Interpretation:** Describes local-library code sharing/no direct application imports, corroborated by cited aliases/imports. Does not resolve cross-build instance sharing.

### 78. README.md:46

**Observation:** README states: "inclusive quando cada remote roda sozinho (fora do shell)".

English translation: Including when each remote runs alone, outside shell.

**Interpretation:** Remote standalone execution claim corroborated by own initialization, entry/development service; no execution proof.

### 79. README.md:50

**Observation:** README states: "Cada remote expõe suas rotas via `federation.config.mjs` (`exposes: { './Routes': '.../entry.routes.ts' }`)".

English translation: Each remote exposes its routes through federation configuration with the shown Routes exposure.

**Interpretation:** Describes three remotes’ route exposure corroborated by exposes blocks/shell relationships.

### 80. README.md:51

**Observation:** README states: "O shell não importa nada estaticamente: `shell/public/federation.manifest.json` mapeia nome do remote → URL do `remoteEntry.json`, e `shell/src/app/app.routes.ts` carrega cada um em runtime com `loadRemoteModule('marAberto', './Routes')`".

English translation: Shell imports nothing statically: its federation manifest maps remote name to remote-entry URL; application routes load each at runtime with the shown loader call.

**Interpretation:** Describes host remote runtime loading corroborated by manifest/loadRemoteModule calls in routes.

### 81. README.md:52

**Observation:** README states: "`shared: shareAll(...)` no `federation.config.mjs` garante que `@angular/core`, `rxjs` etc. sejam uma instância única compartilhada entre shell e remotes".

English translation: Shared shareAll in federation configuration ensures Angular core, RxJS and others are single shared instance between shell and remotes.

**Interpretation:** Describes federation package sharing corroborated by shareAll singleton configuration. Does not demonstrate local AuthService singleton.

### 82. README.md:66

**Observation:** README states: "O shell e os 3 remotes são servidos **separadamente** — cada um roda seu próprio dev-server".

English translation: Shell and three remotes served separately, each running own development server.

**Interpretation:** Describes development-server separation of four applications corroborated by serve targets; claims no independent deployment.

### 83. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/federation.config.mjs)

**Observation:** First observable version already declares @module-federation/enhanced/contains Native Federation configurations. No earlier recorded version. Section 3.4.8 records inconclusive result.

**Interpretation:** Cannot distinguish preparation, removal of other mechanism or excess declaration; snapshot No remains clear.

### 84. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (admin/federation.config.mjs)

**Observation:** Manifest with @nx/module-federation/four project configurations added in sole commit. Section 3.4.8 records inconclusive result.

**Interpretation:** Unused declaration origin unknown; snapshot No does not depend on historical explanation.

### 85. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (nx.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/project.json)

**Observation:** @nx/webpack, defaults for @nx/angular:webpack-browser and Native Federation builds coexist in root commit. Section 3.4.8 records inconclusive result.

**Interpretation:** No sequence proving build migration; unconfigured declaration remains isolated signal.

### 86. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package-lock.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/src/main.ts)

**Observation:** Manifest, lockfile/application entries added together; no earlier change clarifying orchestrator participation. Section 3.4.8 records inconclusive result.

**Interpretation:** Transitive participation in mechanism or excess declaration remain plausible; uncertainty affects snapshot technology usage.

### 87. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (libs/shared/data-access/src/lib/auth.service.ts); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/federation.config.mjs)

**Observation:** Commit adds service, logins, guards, aliases/federation configurations together without earlier sharing stage. Section 3.4.8 records inconclusive result.

**Interpretation:** Reactive inter-unit channel versus local per-build state alternative remains open; history does not resolve snapshot communication organization.

### 88. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (README.md); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (README.md); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/src/app/app.html); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/src/app/app.routes.ts)

**Observation:** README, outlet/shell routes added in same root commit with remote headers/homes. Section 3.4.8 records inconclusive result.

**Interpretation:** Documentary divergence exists since first observable version. No evidence of earlier shell navbar/home stage; current picture clear.

### 89. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (README.md); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (README.md); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (admin/src/app/remote-entry/entry.routes.ts); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (intranet/src/app/remote-entry/entry.routes.ts); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (libs/shared/data-access/src/lib/auth.service.ts)

**Observation:** README placing guards in shell/code with guards and login in remotes added together. Section 3.4.8 records inconclusive result.

**Interpretation:** History demonstrates neither guard transfer nor pre-login version. Snapshot divergence remains documentary, without uncertainty about guard location.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:58) | 1 technology | manifest | native-federation | technological | weak | declares #15; declares #16; declares #17; declares #18; declares #19; declares #20; declares #21; declares #22; declares #23; declares #24; declares #25; declares #26; declares #38; declares #39; declares #40; declares #41; declares #42; declares #43 |
| 2 | 3.4.2 (package.json:65) | 1 technology | manifest | — | context | weak | declares shell/project.json:119; declares admin/project.json:128; declares intranet/project.json:128; declares marAberto/project.json:128 |
| 3 | 3.4.2 (package.json:18) | 1 technology | manifest | module-federation | technological | weak | — |
| 4 | 3.4.2 (package.json:19) | 1 technology | manifest | — | context | weak | declares shell-e2e/playwright.config.mts:3; declares shell-e2e/playwright.config.mts:37 |
| 5 | 3.4.2 (package.json:20) | 1 technology | manifest | — | context | weak | declares nx.json:35-40; declares shell/project.json:42-44 |
| 6 | 3.4.2 (package.json:21) | 1 technology | manifest | — | context | weak | declares eslint.config.mjs:1; declares shell/eslint.config.mjs:1 |
| 7 | 3.4.2 (package.json:22) | 1 technology | manifest | — | context | weak | declares nx.json:15-28 |
| 8 | 3.4.2 (package.json:23) | 1 technology | manifest | — | context | weak | — |
| 9 | 3.4.2 (package.json:24) | 1 technology | manifest | — | context | weak | declares nx.json:29-34; declares shell-e2e/playwright.config.mts:2-25 |
| 10 | 3.4.2 (package.json:25) | 1 technology | manifest | — | context | weak | declares shell/project.json:45-53; declares nx.json:60-63 |
| 11 | 3.4.2 (package.json:26) | 1 technology | manifest | — | context | weak | declares shell/project.json:54-62 |
| 12 | 3.4.2 (package.json:27) | 1 technology | manifest | — | context | weak | — |
| 13 | 3.4.2 (package.json:31) | 1 technology | manifest | native-federation | technological | ambiguous | — |
| 14 | 3.4.2 (package.json:44) | 1 technology | manifest | — | context | weak | declares .github/workflows/ci.yml:25-37 |
| 15 | 3.4.2 (package.json:58, Evidence); 3.4.2 (package.json:18, Evidence); 3.4.3 (admin, Markers); 3.4.4 (admin/src/main.ts:3, Observation); 3.4.4 (shell/src/app/app.routes.ts:18, Observation); 3.4.5 #1 (Configuration); 3.4.5 #4, #5 (Configuration); 3.4.7 #10, #12 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #47 |
| 16 | 3.4.2 (package.json:58, Evidence); 3.4.3 (admin, Markers and Build); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #66 |
| 17 | 3.4.2 (package.json:58, Evidence); 3.4.2 (package.json:18, Evidence); 3.4.3 (intranet, Markers); 3.4.4 (intranet/src/main.ts:3, Observation); 3.4.4 (shell/src/app/app.routes.ts:13, Observation); 3.4.5 #2 (Configuration); 3.4.5 #5, #6 (Configuration); 3.4.7 #10, #12 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #49 |
| 18 | 3.4.2 (package.json:58, Evidence); 3.4.3 (intranet, Markers and Build); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #67 |
| 19 | 3.4.2 (package.json:58, Evidence); 3.4.2 (package.json:18, Evidence); 3.4.3 (marAberto, Markers); 3.4.4 (marAberto/src/main.ts:3, Observation); 3.4.4 (shell/src/app/app.routes.ts:8, Observation); 3.4.5 #3 (Configuration); 3.4.5 #4, #6 (Configuration); 3.4.7 #10, #12 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #56 |
| 20 | 3.4.2 (package.json:58, Evidence); 3.4.3 (marAberto, Markers and Build); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #68 |
| 21 | 3.4.2 (package.json:58, Evidence); 3.4.2 (package.json:18, Evidence); 3.4.2 (package.json:23, Evidence); 3.4.3 (shell, Markers); 3.4.5 #4, #5, #6 (Configuration); 3.4.7 #3, #12 (Evidence) | 2 configuration | configuration | native-federation | technological | moderate | configures #58 |
| 22 | 3.4.2 (package.json:58, Evidence); 3.4.2 (package.json:27, Evidence); 3.4.3 (shell, Markers and Build); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | native-federation | technological | moderate | configures #69 |
| 23 | 3.4.2 (package.json:65, Evidence); 3.4.3 (shell, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #58 |
| 24 | 3.4.3 (admin, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #47 |
| 25 | 3.4.3 (intranet, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #49 |
| 26 | 3.4.3 (marAberto, Markers) | 2 configuration | configuration | native-federation | technological | moderate | configures #56 |
| 27 | 3.4.4 (shell/src/app/app.routes.ts:8, :13, :18 and shell/src/main.ts:3, Observation); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #1, #2, #3 (Where served); 3.4.7 #3, #11 (Evidence) | 2 configuration | configuration | native-federation | architectural | strong | configures #60; configures #61; configures #62 |
| 28 | 3.4.4 (admin/src/main.ts:5, src-async-bootstrap) | 3 code | source code | — | technological | weak | — |
| 29 | 3.4.4 (intranet/src/main.ts:5, src-async-bootstrap) | 3 code | source code | — | technological | weak | — |
| 30 | 3.4.4 (marAberto/src/main.ts:5, src-async-bootstrap) | 3 code | source code | — | technological | weak | — |
| 31 | 3.4.4 (shell/src/main.ts:5, src-async-bootstrap) | 3 code | source code | — | technological | weak | — |
| 32 | 3.4.4 (admin/src/main.ts:1, src-load-remote) | 3 code | source code | native-federation | technological | weak | — |
| 33 | 3.4.4 (admin/src/main.ts:3, src-load-remote) | 3 code | source code | native-federation | technological | weak | — |
| 34 | 3.4.4 (intranet/src/main.ts:1, src-load-remote) | 3 code | source code | native-federation | technological | weak | — |
| 35 | 3.4.4 (intranet/src/main.ts:3, src-load-remote) | 3 code | source code | native-federation | technological | weak | — |
| 36 | 3.4.4 (marAberto/src/main.ts:1, src-load-remote) | 3 code | source code | native-federation | technological | weak | — |
| 37 | 3.4.4 (marAberto/src/main.ts:3, src-load-remote) | 3 code | source code | native-federation | technological | weak | — |
| 38 | 3.4.4 (shell/src/app/app.routes.ts:2, src-load-remote) | 3 code | source code | native-federation | technological | moderate | implements #60; implements #61; implements #62 |
| 39 | 3.4.4 (shell/src/app/app.routes.ts:8, src-load-remote) | 3 code | source code | native-federation | architectural | strong | implements #62 |
| 40 | 3.4.4 (shell/src/app/app.routes.ts:13, src-load-remote) | 3 code | source code | native-federation | architectural | strong | implements #61 |
| 41 | 3.4.4 (shell/src/app/app.routes.ts:18, src-load-remote) | 3 code | source code | native-federation | architectural | strong | implements #60 |
| 42 | 3.4.4 (shell/src/main.ts:1, src-load-remote) | 3 code | source code | native-federation | technological | moderate | implements #60; implements #61; implements #62 |
| 43 | 3.4.4 (shell/src/main.ts:3, src-load-remote) | 3 code | source code | native-federation | technological | moderate | implements #60; implements #61; implements #62 |
| 44 | 3.4.4 (shell/src/app/app.routes.ts:4, manual) | 3 code | source code | native-federation | architectural | strong | implements #60; implements #61; implements #62 |
| 45 | 3.4.4 (libs/shared/data-access/src/lib/auth.service.ts:8, manual) | 3 code | source code | events | architectural | ambiguous | implements #63; implements #64; implements #65 |
| 46 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 47 | 3.4.3 (admin) | 4 structure | directory | — | architectural | moderate | — |
| 48 | 3.4.3 (admin-e2e) | 4 structure | directory | — | context | weak | — |
| 49 | 3.4.3 (intranet) | 4 structure | directory | — | architectural | moderate | — |
| 50 | 3.4.3 (intranet-e2e) | 4 structure | directory | — | context | weak | — |
| 51 | 3.4.3 (libs/shared/data-access) | 4 structure | directory | — | context | weak | — |
| 52 | 3.4.3 (libs/shared/guards) | 4 structure | directory | — | context | weak | — |
| 53 | 3.4.3 (libs/shared/theme) | 4 structure | directory | — | context | weak | — |
| 54 | 3.4.3 (libs/shared/types) | 4 structure | directory | — | context | weak | — |
| 55 | 3.4.3 (libs/shared/ui) | 4 structure | directory | — | context | weak | — |
| 56 | 3.4.3 (marAberto) | 4 structure | directory | — | architectural | moderate | — |
| 57 | 3.4.3 (marAberto-e2e) | 4 structure | directory | — | context | weak | — |
| 58 | 3.4.3 (shell) | 4 structure | directory | — | architectural | moderate | — |
| 59 | 3.4.3 (shell-e2e) | 4 structure | directory | — | context | weak | — |
| 60 | 3.4.5 #1 | 5 composition | source code | native-federation | architectural | strong | links #58; links #47 |
| 61 | 3.4.5 #2 | 5 composition | source code | native-federation | architectural | strong | links #58; links #49 |
| 62 | 3.4.5 #3 | 5 composition | source code | native-federation | architectural | strong | links #58; links #56 |
| 63 | 3.4.5 #4 | 5 composition | source code | events | architectural | ambiguous | links #56; links #47 |
| 64 | 3.4.5 #5 | 5 composition | source code | events | architectural | ambiguous | links #47; links #49 |
| 65 | 3.4.5 #6 | 5 composition | source code | events | architectural | ambiguous | links #56; links #49 |
| 66 | 3.4.6 #1 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #47 |
| 67 | 3.4.6 #2 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #49 |
| 68 | 3.4.6 #3 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #56 |
| 69 | 3.4.6 #4 | 6 build-deploy | configuration | native-federation | architectural | moderate | publishes #58 |
| 70 | 3.4.7 #1 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #1; corroborates #60; corroborates #61; corroborates #62 |
| 71 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #47; corroborates #49; corroborates #56; corroborates admin/src/app/home/home.ts:7; corroborates intranet/src/app/home/home.ts:8; corroborates marAberto/src/app/home/home.ts:8 |
| 72 | 3.4.7 #3 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #27; corroborates #60; corroborates #61; corroborates #62 |
| 73 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | contradicts shell/src/app/app.html:1; contradicts #44; contradicts marAberto/src/app/remote-entry/entry.routes.ts:9-12; contradicts admin/src/app/remote-entry/entry.routes.ts:12; contradicts intranet/src/app/remote-entry/entry.routes.ts:12 |
| 74 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | contradicts #44; contradicts admin/src/app/remote-entry/entry.routes.ts:12; contradicts intranet/src/app/remote-entry/entry.routes.ts:12 |
| 75 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #58; corroborates #47; corroborates #49; corroborates #56 |
| 76 | 3.4.7 #7 | 7 documentation | documentation | module-federation | architectural | weak | contradicts #1; contradicts #3; contradicts #8; contradicts #38 |
| 77 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates tsconfig.base.json:22-30; corroborates admin/src/app/home/home.ts:7-8; corroborates intranet/src/app/home/home.ts:8-10; corroborates marAberto/src/app/home/home.ts:8-9; corroborates shell/src/styles.scss:1 |
| 78 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #47; corroborates #49; corroborates #56; corroborates #66; corroborates #67; corroborates #68 |
| 79 | 3.4.7 #10 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #15; corroborates #17; corroborates #19 |
| 80 | 3.4.7 #11 | 7 documentation | documentation | native-federation | architectural | weak | corroborates #27; corroborates #39; corroborates #40; corroborates #41 |
| 81 | 3.4.7 #12 | 7 documentation | documentation | native-federation | technological | weak | corroborates #21; corroborates #15; corroborates #17; corroborates #19 |
| 82 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #66; corroborates #67; corroborates #68; corroborates #69 |
| 83 | 3.4.8 #1 | 8 history | history | module-federation | technological | weak | explains #3 |
| 84 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #8 |
| 85 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #12 |
| 86 | 3.4.8 #4 | 8 history | history | native-federation | technological | ambiguous | explains #13 |
| 87 | 3.4.8 #5 | 8 history | history | events | architectural | ambiguous | explains #45; explains #63; explains #64; explains #65 |
| 88 | 3.4.8 #6 | 8 history | history | — | architectural | weak | explains #73 |
| 89 | 3.4.8 #7 | 8 history | history | — | architectural | weak | explains #73; explains #74 |

## Summary

Observations: 89. Dimensions (technology: 14, configuration: 13, code: 18, structure: 14, composition: 6, build-deploy: 4, documentation: 13, history: 7). Strength (strong: 8, moderate: 23, weak: 51, ambiguous: 7). Evidence (technological: 31, architectural: 35, context: 23).
