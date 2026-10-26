---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
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

# 321 — JandrySan/becas-uleam

## Repository overview

pnpm monorepo with container at root and three workspace modules: `1verificador-vue`, `2postulacion-react` and `3seguimiento-angular` (pnpm-workspace.yaml:1-4; package.json:7-11). Root `build` chains, in one command, container `vite build`, each module’s `build` through `pnpm --dir` and finally `node scripts/build-integrado.mjs` (package.json:17); beforehand, `prebuild` runs `scripts/generar-angular-env.mjs` (package.json:16), generating `3seguimiento-angular/src/environments/environment.generated.ts` with Supabase variables and failing if absent (scripts/generar-angular-env.mjs:48-61, 63-86). Each module compiles to its own `dist`: Vue with `vite build` and `base: '/vue/'` (1verificador-vue/package.json:8; 1verificador-vue/vite.config.ts:5), React with `tsc -b && vite build` and `base: '/react/'` (2postulacion-react/package.json:8; 2postulacion-react/vite.config.ts:5), Angular with `ng build --base-href /angular/` and output `dist/seguimiento-solicitud-angular` (3seguimiento-angular/package.json:7; 3seguimiento-angular/angular.json:16). Root has no `vite.config.*`, so container build uses Vite defaults, `index.html` as entry and `dist` as output. The `build-integrado.mjs` copies all three `dist` directories to `dist/vue`, `dist/react` and `dist/angular` within root `dist` (scripts/build-integrado.mjs:6-19), forming one static site.

The only deployment artifact is `vercel.json`, installing with pnpm, running `pnpm run build` and publishing `dist` (vercel.json:3-5): one hosting deploy with container at `/` and modules in subdirectories. This is production configuration. README describes same Vercel deploy (README.md:70-78), cites `npm run build` instead of `pnpm run build` in `vercel.json` (README.md:76) and states `vercel.json` "ya incluye rewrites para `/vue/`, `/react/` y
`/angular/`" (English translation: "already includes rewrites for /vue/, /react/ and /angular/") (README.md:80), but file has no `rewrites` (vercel.json:1-6); subdirectories are served as static files of `dist`. README attributes choice of subdirectories and hash routing to "desplegar todo como una sola app estática" (English translation: "deploying everything as a single static app") (README.md:92). README `ops-hosting` occurrences (README.md:61, 70, 73, 75, 80) are this documentation and do not decide Deploy column.

Rest is development: `start` runs, with `concurrently`, container Vite on port 3000, Vue Vite on 5173, React Vite on 5174 and Angular `ng serve` on 4200 (package.json:14-15; 3seguimiento-angular/package.json:6), and container switches iframe URLs to these ports when running at `localhost:3000` (src/main.ts:24-34). No Dockerfile, compose, CI workflow or other hosting configuration is present in snapshot. No module is published as a package: all are `private: true` (1verificador-vue/package.json:3; 2postulacion-react/package.json:4; 3seguimiento-angular/package.json:4), and versions (package.json:3; 2postulacion-react/package.json:3; 3seguimiento-angular/package.json:3) are unused in any publication. The `supabase/schema.sql` is schema of Supabase-hosted database, not a frontend build or deployment artifact.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | joint | `/` (vercel.json:5) | No | package.json:17 (container `vite build`, first step of integrated build); vercel.json:3-5 (single Vercel deploy of `dist` integrated) |
| 2 | 1verificador-vue | separate | joint | `/vue/` (1verificador-vue/vite.config.ts:5; scripts/build-integrado.mjs:14); `http://localhost:5173/vue/` in development (src/main.ts:26) | No | 1verificador-vue/package.json:8 (`vite build`); 1verificador-vue/vite.config.ts:5 (`base: '/vue/'`); scripts/build-integrado.mjs:14 (copies `dist` to `dist/vue`); vercel.json:3-5 (single deploy) |
| 3 | 1verificador-vue/verificador | separate | not observed | — | No | 1verificador-vue/verificador/package.json:8 (`vue-tsc -b && vite build`); 1verificador-vue/verificador/vite.config.ts:5-7 (Vue plugin, without `base`) |
| 4 | 2postulacion-react | separate | joint | `/react/` (2postulacion-react/vite.config.ts:5; scripts/build-integrado.mjs:15); `http://localhost:5174/react/` in development (src/main.ts:27) | No | 2postulacion-react/package.json:8 (`tsc -b && vite build`); 2postulacion-react/vite.config.ts:5 (`base: '/react/'`); scripts/build-integrado.mjs:15 (copies `dist` to `dist/react`); vercel.json:3-5 (single deploy) |
| 5 | 3seguimiento-angular | separate | joint | `/angular/` (3seguimiento-angular/package.json:7; scripts/build-integrado.mjs:16-19); `http://localhost:4200/#/seguimiento` in development (src/main.ts:28) | No | 3seguimiento-angular/package.json:7 (`ng build --base-href /angular/`); 3seguimiento-angular/angular.json:16 (output `dist/seguimiento-solicitud-angular`); scripts/generar-angular-env.mjs:63-86 (generates build environment); scripts/build-integrado.mjs:16-19 (copies build to `dist/angular`); vercel.json:3-5 (single deploy) |

## Observations

**1. . (container).** Build is `vite build` in first step of root `build` (package.json:17), with default Vite configuration (no root `vite.config.*`), generating root `dist` containing only container; modules enter later through copying. Hence build `separate`. Deploy is `joint`: `vercel.json:3-5` publishes this `dist`, also containing all three modules. Version `2.0.0` (package.json:3) is unused in publication.

**2. 1verificador-vue.** Own build with `vite build` (1verificador-vue/package.json:8), generating `1verificador-vue/dist` with `base: '/vue/'` (1verificador-vue/vite.config.ts:5); root script only triggers it (package.json:17). Deploy is `joint`: `dist` is copied to `dist/vue` (scripts/build-integrado.mjs:14) and published in same Vercel deploy as container (vercel.json:3-5). In development runs separately on port 5173 (package.json:14), not counting as deploy. Version `0.0.0` (1verificador-vue/package.json:4), unused.

**3. 1verificador-vue/verificador.** Nested Vue scaffold with own build (1verificador-vue/verificador/package.json:8; 1verificador-vue/verificador/vite.config.ts:5-7): `separate`, but no script triggers it. Absent from workspace (pnpm-workspace.yaml:1-4), root `build` (package.json:17) and copies in `scripts/build-integrado.mjs:14-19`, while `vercel.json` publishes only root `dist`. No deployment artifact covers it: `not observed`. Configuration defines no `base`, unlike containing Vue module.

**4. 2postulacion-react.** Own build with `tsc -b && vite build` (2postulacion-react/package.json:8) and `base: '/react/'` (2postulacion-react/vite.config.ts:5), triggered by root (package.json:17): `separate`. The `dist` is copied to `dist/react` (scripts/build-integrado.mjs:15) and released in single deploy (vercel.json:3-5): `joint`. Port 5174 only in development (package.json:14). Version `1.0.0` (2postulacion-react/package.json:3), unused.

**5. 3seguimiento-angular.** Own build with `ng build --base-href /angular/` (3seguimiento-angular/package.json:7), target `build` in `angular.json` with output `dist/seguimiento-solicitud-angular` (3seguimiento-angular/angular.json:13-16): `separate`. The only module depending on a root step to compile: `prebuild` generates its `environment.generated.ts` with Supabase variables (package.json:16; scripts/generar-angular-env.mjs:63-86). Build is copied to `dist/angular`, first trying subdirectory `browser` of builder `application` (scripts/build-integrado.mjs:16-19), and published in single deploy (vercel.json:3-5): `joint`. The `ng serve` on port 4200 is development-only (package.json:14; 3seguimiento-angular/package.json:6). Version `1.0.0` (3seguimiento-angular/package.json:3), unused.

## Summary

Applications: 5. Build (separate: 5). Deploy (joint: 4, not observed: 1). Independent versioning: 0.
