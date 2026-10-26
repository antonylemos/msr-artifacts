---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| mf-1 | mf-1/next.config.ts;mf-1/package.json | mf-1/package.json | mf-1/src/pages/_app.tsx:5 (`export default function App`, Pages Router); mf-1/src/pages/index.tsx:11 (route `/`); mf-1/vite.mf.ts:33 (`input: "src/RemoteModules/RemoteModules.ts"`, UMD bundle entry) | mf-1/next.config.ts:5-32 (`nextConfig`); mf-1/package.json:8 (`npm run build:vite && next build`); mf-1/package.json:11 (`vite build --config vite.mf.ts`); mf-1/vite.mf.ts:27-47 (`format: "umd"`, `outDir: "public/remote-modules"`) | — | — | Yes | Next.js app with its own entry and build; the same build generates the remote UMD bundle |
| shell | shell/next.config.js;shell/package.json | shell/package.json | shell/src/pages/_app.tsx:5 (`export default function App`, Pages Router); shell/src/pages/index.tsx:138 (route `/`) | shell/next.config.js:2-18 (`nextConfig`, `publicRuntimeConfig.MF1_BASE_URL`); shell/package.json:7 (`next build`) | — | — | Yes | Next.js app with its own entry and build |

## Summary

Frontend applications in the snapshot: 2 (mf-1, shell).

## Notes

- N = 2 matches the classification’s `frontend_units: 2`.
- There is no `workspaces` in `package.json`, nor `pnpm-workspace.yaml`, `turbo.json`, `nx.json` or `lerna.json`; the root has no `package.json`, and each directory has its own `package-lock.json`. The `ws-path-alias` occurrences (`<app>/tsconfig.json:16`) are internal `paths` aliases for each app, not a workspace declaration.
- In both Next.js apps, the entry follows the Pages Router convention (`src/pages/_app.tsx` + pages), invoked by `next build`, without a configuration declaration.
- Deploy: `README.md:7-8` cites separate deployments on Vercel (`umd-remote-modules-poc-shell`, `umd-remote-modules-poc-mf1`), but there is no `vercel.json`, Dockerfile or workflow in the snapshot. The other `ops-hosting` occurrences (`<app>/README.md:25-38`) are the standard create-next-app text.
- `mf-1/public/remote-modules/bundle.js` is versioned output from the Vite build of `mf-1`, not a unit.
