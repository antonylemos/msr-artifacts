---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 181 — EmanuelG0895/MicroFrontendDocker

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| MF-CharacterDetail | MF-CharacterDetail/index.html;MF-CharacterDetail/module-federation.config.ts;MF-CharacterDetail/package.json;MF-CharacterDetail/rspack.config.ts;MF-CharacterDetail/webpack.config.js | MF-CharacterDetail/package.json | MF-CharacterDetail/rspack.config.ts:17-19 (`entry.main: ./src/index.ts`); MF-CharacterDetail/rspack.config.ts:83-85 (`HtmlRspackPlugin` with `./index.html`); MF-CharacterDetail/src/App.tsx:14-15 (`createRoot(...).render(<App />)`) | MF-CharacterDetail/rspack.config.ts:15-97 + MF-CharacterDetail/package.json:5 (`rspack build`) | — | MF-CharacterDetail/Dockerfile:1-40 (own multi-stage build, `EXPOSE 3002`); docker-compose.yml:52-55 (`mf-character-detail` service with `context: ./MF-CharacterDetail`) | Yes | React app with its own entry and Rspack build (Module Federation remote) |
| MF-Characters | MF-Characters/index.html;MF-Characters/module-federation.config.ts;MF-Characters/package.json;MF-Characters/rspack.config.ts;MF-Characters/webpack.config.js | MF-Characters/package.json | MF-Characters/rspack.config.ts:17-19 (`entry.main: ./src/index.ts`); MF-Characters/rspack.config.ts:78-80 (`HtmlRspackPlugin` with `./index.html`); MF-Characters/src/App.tsx:8-9 (`createRoot(...).render(<App />)`) | MF-Characters/rspack.config.ts:15-92 + MF-Characters/package.json:5 (`rspack build`) | — | MF-Characters/Dockerfile:1-40 (own multi-stage build, `EXPOSE 3001`); docker-compose.yml:35-38 (`mf-characters` service with `context: ./MF-Characters`) | Yes | React app with its own entry and Rspack build (Module Federation remote) |
| MF-Shell | MF-Shell/index.html;MF-Shell/module-federation.config.ts;MF-Shell/package.json;MF-Shell/rspack.config.ts | MF-Shell/package.json | MF-Shell/rspack.config.ts:16-18 (`entry.main: ./src/index.ts`); MF-Shell/rspack.config.ts:95-97 (`HtmlRspackPlugin` with `./index.html`); MF-Shell/src/App.tsx:55-56 (`createRoot(...).render(<App />)`) | MF-Shell/rspack.config.ts:14-110 + MF-Shell/package.json:5 (`rspack build`) | — | Dockerfile:1-44 (at the root, builds only `MF-Shell/`, lines 7-8 and 15, `EXPOSE 3000`); docker-compose.yml:18-21 (`mf-shell` service with this Dockerfile) | Yes | React host app with its own entry and Rspack build |

## Summary

Frontend applications in the snapshot: 3 (MF-CharacterDetail, MF-Characters, MF-Shell).

## Notes

- `MF-Characters/pnpm-workspace.yaml:1-2` and `MF-Shell/pnpm-workspace.yaml:1-2` (marked `workspace-config` in `artifacts.csv`) have only `ignoredBuiltDependencies` (`@tailwindcss/oxide`), without `packages`; they do not declare a workspace. Each project has its own lockfile.
- `matches.csv` has no `ci-*` occurrences; it has 3 `ws-path-alias` (`paths` in the `tsconfig.json` files of MF-CharacterDetail, MF-Characters and MF-Shell, line 15) and 28 `ops-*` (6 `ops-dockerfile`, 5 `ops-deployment-file`, 5 `ops-compose-service`, 9 `ops-proxy-route`, 3 `ops-cors`), including the Dockerfiles and `docker-compose.yml`, which were opened directly. There is no CI workflow.
- `MF-Characters/webpack.config.js` and `MF-CharacterDetail/webpack.config.js` are markers, but no `package.json` script uses webpack (`package.json:5-9`, only `rspack`); the cited entry and build are those in `rspack.config.ts`.
- N = 3 matches the classification’s `frontend_units: 3`.
