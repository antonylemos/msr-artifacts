---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
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

## Workspace

`pnpm-workspace.yaml:1-4` (`packages`: `1verificador-vue`, `2postulacion-react`, `3seguimiento-angular`); the same list in `package.json:7-11` (`workspaces`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json | package.json:1-27 (container manifest) | index.html:65 (`<script type="module" src="/src/main.ts">`); src/main.ts:87-97 (changes `frame.src` of the `<iframe>` in index.html:61) | package.json:15 (`vite`) and package.json:17 (`vite build && ...`), no `vite.config.*` (Vite default configuration, `index.html` entry) | — (workspace root) | vercel.json:3-5 (`pnpm run build`, `outputDirectory: dist`; single deployment of the integrated build) | Yes | TypeScript container with its own `index.html` entry and Vite build. |
| 1verificador-vue | 1verificador-vue/index.html;1verificador-vue/package.json;1verificador-vue/vite.config.ts | 1verificador-vue/package.json:1-25 | 1verificador-vue/index.html:11 (`/src/main.ts`); 1verificador-vue/src/main.ts:20-23 (mounts Vue with Pinia and router) | 1verificador-vue/vite.config.ts:4-7 (`base: '/vue/'`, plugin Vue); 1verificador-vue/package.json:8 (`vite build`) | pnpm-workspace.yaml:2 (`1verificador-vue`) | — (only included in the single deployment: scripts/build-integrado.mjs:14 copies `dist` to `dist/vue`) | Yes | Vue application with its own entry and Vite build. |
| 1verificador-vue/verificador | 1verificador-vue/verificador/package.json;1verificador-vue/verificador/vite.config.ts | 1verificador-vue/verificador/package.json:1-22 | 1verificador-vue/verificador/index.html:62 (`/src/main.ts`); 1verificador-vue/verificador/src/main.ts:5 (`createApp(App).mount('#app')`) | 1verificador-vue/verificador/vite.config.ts:5-7 (plugin Vue); 1verificador-vue/verificador/package.json:8 (`vue-tsc -b && vite build`) | — | — | Yes | Nested Vue scaffold with its own entry and Vite build, outside the workspace and integrated build. |
| 2postulacion-react | 2postulacion-react/index.html;2postulacion-react/package.json;2postulacion-react/vite.config.ts | 2postulacion-react/package.json:1-25 | 2postulacion-react/index.html:1 (`/src/main.tsx`); 2postulacion-react/src/main.tsx:9-17 (mounts React with `HashRouter`) | 2postulacion-react/vite.config.ts:4-7 (`base: '/react/'`, plugin React); 2postulacion-react/package.json:8 (`tsc -b && vite build`) | pnpm-workspace.yaml:3 (`2postulacion-react`) | — (only included in the single deployment: scripts/build-integrado.mjs:15 copies `dist` to `dist/react`) | Yes | React application with its own entry and Vite build. |
| 3seguimiento-angular | 3seguimiento-angular/angular.json;3seguimiento-angular/package.json | 3seguimiento-angular/package.json:1-30 | 3seguimiento-angular/angular.json:17-18 (`index: src/index.html`, `browser: src/main.ts`); 3seguimiento-angular/src/main.ts:14-15 (`bootstrapApplication`) | 3seguimiento-angular/angular.json:13-14 (`build` target with `@angular-devkit/build-angular:application`); 3seguimiento-angular/package.json:7 (`ng build --base-href /angular/`) | pnpm-workspace.yaml:4 (`3seguimiento-angular`) | — (only included in the single deployment: scripts/build-integrado.mjs:16-19 copies the build to `dist/angular`) | Yes | Angular application with its own entry and build target. |

## Summary

Frontend applications in the snapshot: 5 (., 1verificador-vue, 1verificador-vue/verificador, 2postulacion-react, 3seguimiento-angular).

## Notes

- The classification records `frontend_units: 4` (container and three modules) and excludes the `1verificador-vue/verificador/` scaffold. Here it counts as an observable boundary: it has its own entry and build, but is neither in `pnpm-workspace.yaml:1-4` nor in the root `build` (`package.json:17`), and the container does not load it.
- The root has no `vite.config.*`; the build uses Vite’s default configuration, which takes the directory’s `index.html` as its entry.
- The only deployment is the root’s (`vercel.json:3-5`), which publishes the integrated `dist` assembled by `scripts/build-integrado.mjs:14-19`. The modules have no separate deployment. The `ops-hosting` occurrences in `README.md:61-80` document this same deployment.
