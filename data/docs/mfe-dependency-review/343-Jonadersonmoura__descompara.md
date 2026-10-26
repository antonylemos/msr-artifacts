---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 343 — Jonadersonmoura/descompara

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:58 | dependencies | @angular-architects/native-federation | ^22.0.6 | native-federation | Yes | shell/project.json:9-24 (target `build` with executor `@angular-architects/native-federation:build`, over target `esbuild` in `:63-91`, `browser: shell/src/main.ts`), same in admin/project.json:9-24, intranet/project.json:9-24 and marAberto/project.json:9-24; shell/federation.config.mjs:1-4 (`withNativeFederation({ name: 'shell', ... })`), admin/federation.config.mjs:1-10 (`exposes: { './Routes': ... }`), same in intranet/ and marAberto/; shell/src/main.ts:1-5 (`initFederation('/federation.manifest.json')` before `import('./bootstrap')`); shell/src/app/app.routes.ts:2-18 (`loadRemoteModule('marAberto' / 'intranet' / 'admin', './Routes')`) |
| package.json:65 | dependencies | @nx/angular | ^23.1.0 | monorepo-tool | Yes | shell/project.json:117-132 (target `serve-original` with executor `@nx/angular:dev-server`, called by `serve` in `:25-28`, `target: shell:serve-original:development`), same in admin/project.json:128, intranet/project.json:128 and marAberto/project.json:128; shell-e2e/playwright.config.mts:33-34 (`webServer.command: 'npx nx run shell:serve'`) |
| package.json:18 | devDependencies | @module-federation/enhanced | ^2.1.0 | module-federation | No | no import of `@module-federation/enhanced` in the snapshot code and build files (grep, excluding the lockfile); the inspection list items (`federation.config.mjs`, `src/main.ts`, shell/src/app/app.routes.ts) import `@angular-architects/native-federation`; package-lock.json:8006-8012 (only optional peer of `@nx/module-federation`, which is also unused) |
| package.json:19 | devDependencies | @nx/devkit | 23.1.0 | monorepo-tool | Yes | shell-e2e/playwright.config.mts:3 and `:37` (`import { workspaceRoot } from '@nx/devkit'`, used in `webServer.cwd`), same in admin-e2e/, intranet-e2e/ and marAberto-e2e/ `playwright.config.mts:3`; nx.json:29-34 (plugin `@nx/playwright/plugin` infers target `e2e` from these configurations; shell-e2e/project.json:8 with `targets` empty); .github/workflows/ci.yml:37 (`npx nx run-many -t lint test build typecheck e2e`) |
| package.json:20 | devDependencies | @nx/eslint | 23.1.0 | monorepo-tool | Yes | nx.json:35-40 (plugin `@nx/eslint/plugin`, `targetName: lint`); shell/project.json:42-44 (target `lint` with executor `@nx/eslint:lint`), same in admin/, intranet/, marAberto/ and libs/shared/{data-access,guards,theme,ui}/project.json:9-11; .github/workflows/ci.yml:37 (`run-many -t lint ...`) |
| package.json:21 | devDependencies | @nx/eslint-plugin | 23.1.0 | monorepo-tool | Yes | eslint.config.mjs:1 (`import nx from '@nx/eslint-plugin'`); shell/eslint.config.mjs:1, same in admin/, intranet/, marAberto/, libs/shared/{data-access,guards,theme,ui}/eslint.config.mjs:1; these configurations are read by target `lint` (shell/project.json:42-44; nx.json:35-40), run in .github/workflows/ci.yml:37 |
| package.json:22 | devDependencies | @nx/js | 23.1.0 | monorepo-tool | Yes | nx.json:15-28 (plugin `@nx/js/typescript` registered, with options `typecheck` and `build`; loaded on every nx execution, such as in .github/workflows/ci.yml:37 `run-many -t ... typecheck`); no import or executor `@nx/js` outside nx.json (grep, excluding the lockfile) |
| package.json:23 | devDependencies | @nx/module-federation | 23.1.0 | monorepo-tool | No | no import, executor or plugin `@nx/module-federation` in the snapshot code and configuration files (grep, excluding the lockfile); federation uses `@angular-architects/native-federation` (shell/federation.config.mjs:1); only declared in package.json:23 |
| package.json:24 | devDependencies | @nx/playwright | 23.1.0 | monorepo-tool | Yes | nx.json:29-34 (plugin `@nx/playwright/plugin`, `targetName: e2e`); shell-e2e/playwright.config.mts:2 and `:25` (`nxE2EPreset` imported and invoked), same in admin-e2e/, intranet-e2e/ and marAberto-e2e/ `playwright.config.mts:2`; .github/workflows/ci.yml:37 (`run-many -t ... e2e`) |
| package.json:25 | devDependencies | @nx/vitest | 23.1.0 | monorepo-tool | Yes | shell/project.json:45-53 (target `test` with executor `@nx/vitest:test`), same in admin/project.json:46, intranet/project.json:46 and marAberto/project.json:46; nx.json:60-63 (`targetDefaults` from `@nx/vitest:test`); .github/workflows/ci.yml:37 (`run-many -t lint test ...`) |
| package.json:26 | devDependencies | @nx/web | 23.1.0 | monorepo-tool | Yes | shell/project.json:54-62 (target `serve-static` with executor `@nx/web:file-server` and `buildTarget: shell:build`), same in admin/project.json:56, intranet/project.json:56 and marAberto/project.json:56 |
| package.json:27 | devDependencies | @nx/webpack | 23.1.0 | monorepo-tool | No | no import, executor or plugin `@nx/webpack` in the snapshot code and configuration files (grep, excluding the lockfile); the builds use `@angular-architects/native-federation:build` over `@angular/build:application` (shell/project.json:10 and `:64`); only declared in package.json:27 |
| package.json:31 | devDependencies | @softarc/native-federation-orchestrator | ^4.2.2 | native-federation | Undetermined | no direct import of the package in the code and build files (grep, excluding the lockfile); package-lock.json:375 (`@angular-architects/native-federation` 22.0.6, used in shell/src/main.ts:1-3 and in `project.json`, depends on `@softarc/native-federation-orchestrator` ^4.5.2); the snapshot does not show whether the `initFederation` used goes through this package |
| package.json:44 | devDependencies | nx | 23.1.0 | monorepo-tool | Yes | .github/workflows/ci.yml:25 and `:36-37` (an active job runs `npx nx start-ci-run`, `npx nx format:check` and `npx nx run-many -t lint test build typecheck e2e`); shell-e2e/playwright.config.mts:33-34 (`webServer.command: 'npx nx run shell:serve'`); nx.json:14-93 (`plugins`, `targetDefaults` and `generators` configured) |

## Notes

- The inspection lists for `@module-federation/enhanced` point to the same Native Federation configurations (`federation.config.mjs`, `src/main.ts`, `app.routes.ts`); none imports this package. Unlike precedents 039 and 109, there is no invoked Module Federation wrapper: `@nx/module-federation` is also unused.
- `@softarc/native-federation-orchestrator`: the only connection is in the lockfile (dependency of `@angular-architects/native-federation`); declared at the root with a version (`^4.2.2`) differing from the wrapper's requirement (`^4.5.2`). With uncertainty between `Yes` and `No`, it remained `Undetermined`.
- `@nx/angular` enters only through the dev-server (`serve-original`); the production build uses `@angular/build:application` (shell/project.json:63-64). nx.json:67-77 has `targetDefaults` for `@nx/angular:webpack-browser`, an executor used by no `project.json`.
- The `.agents/`, `.claude/`, `.codex/`, `.cursor/`, `.gemini/`, `.opencode/` and `.github/skills/` directories contain coding assistant skills; they were not counted as use.

