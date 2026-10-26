---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 351 — lguilhermecardoso/mfe-react-vite-example

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| mf-dashboard/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mf-dashboard/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mf-dashboard/vite.config.ts:10-17 (the default Vite configuration invokes `federation` with `name: "mf_dashboard"`, `exposes` `./Dashboard` and `shared`); mf-dashboard/package.json:8 (the build runs `vite build` with no alternative configuration); build-all.sh:12 (`npm run build` of the unit) |
| mf-dashboard/package.json:31 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | no import or invocation of `"vite-plugin-federation"` unscoped in `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` and `*.yml` (grep); mf-dashboard/vite.config.ts:3 imports `@originjs/vite-plugin-federation`, another package |
| mf-login/package.json:20 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mf-login/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mf-login/vite.config.ts:10-17 (the default Vite configuration invokes `federation` with `name: "mf_login"`, `exposes` `./Login` and `shared`); mf-login/package.json:8 (the build runs `vite build` with no alternative configuration); build-all.sh:9 (`npm run build` of the unit) |
| mf-login/package.json:31 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | no import or invocation of `"vite-plugin-federation"` unscoped in `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` and `*.yml` (grep); mf-login/vite.config.ts:3 imports `@originjs/vite-plugin-federation`, another package |
| mf-navbar/package.json:20 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mf-navbar/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mf-navbar/vite.config.ts:10-17 (the default Vite configuration invokes `federation` with `name: "mf_navbar"`, `exposes` `./Navbar` and `shared`); mf-navbar/package.json:8 (the build runs `vite build` with no alternative configuration); build-all.sh:15 (`npm run build` of the unit) |
| mf-navbar/package.json:31 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | no import or invocation of `"vite-plugin-federation"` unscoped in `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` and `*.yml` (grep); mf-navbar/vite.config.ts:3 imports `@originjs/vite-plugin-federation`, another package |
| mf-personagem-detalhe/package.json:13 | dependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | mf-personagem-detalhe/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); mf-personagem-detalhe/vite.config.ts:10-17 (the default Vite configuration invokes `federation` with `name: "mf_personagem_detalhe"`, `exposes` `./PersonagemDetalhe` and `shared`); mf-personagem-detalhe/package.json:8 (the build runs `vite build` with no alternative configuration); build-all.sh:18 (`npm run build` of the unit) |
| mf-personagem-detalhe/package.json:31 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | no import or invocation of `"vite-plugin-federation"` unscoped in `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` and `*.yml` (grep); mf-personagem-detalhe/vite.config.ts:3 imports `@originjs/vite-plugin-federation`, another package |
| root-app/package.json:21 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | root-app/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); root-app/vite.config.ts:11-24 (`remotes` `mf_login`, `mf_dashboard`, `mf_personagem_detalhe`, `mf_navbar`); root-app/vite.config.ts:31-35 (`federation({ name: "root_app", remotes, shared })` in plugins of the default Vite configuration); root-app/package.json:8 (the build runs `vite build` with no alternative configuration); build-all.sh:21 (`npm run build` of the unit) |
| root-app/package.json:33 | devDependencies | vite-plugin-federation | ^0.0.1 | module-federation | No | no import or invocation of `"vite-plugin-federation"` unscoped in `*.ts`, `*.tsx`, `*.js`, `*.json`, `*.sh` and `*.yml` (grep); root-app/vite.config.ts:3 imports `@originjs/vite-plugin-federation`, another package |

## Notes

- The `same_package_matches` lists for the `vite-plugin-federation` rows are the same as those for `@originjs/vite-plugin-federation`: the inspection pattern matches `federation(...)` calls without distinguishing which of the two packages is imported. The only import in the five `vite.config.ts` files (line 3) is from the scoped package.
- The five `vite.config.ts` files are Vite's default configuration in each unit; `build-all.sh:8-21` runs `npm run build` in each one, and `.github/workflows/deploy.yml:19-20` executes `build-all.sh`.

