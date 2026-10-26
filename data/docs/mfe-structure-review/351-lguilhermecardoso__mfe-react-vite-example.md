---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 351 — lguilhermecardoso/mfe-react-vite-example

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| mf-dashboard | mf-dashboard/index.html;mf-dashboard/package.json;mf-dashboard/vite.config.ts | mf-dashboard/package.json:1-11 (own manifest) | mf-dashboard/index.html:11 (`/src/main.tsx` entry); mf-dashboard/src/main.tsx:6-10 (mounts React) | mf-dashboard/vite.config.ts:6-34 (own configuration, output `../dist/mf-dashboard`); mf-dashboard/package.json:8 (`tsc -b && vite build`) | — | — | Yes | React application with its own standalone entry and Vite build. |
| mf-login | mf-login/index.html;mf-login/package.json;mf-login/vite.config.ts | mf-login/package.json:1-11 (own manifest) | mf-login/index.html:11 (`/src/main.tsx` entry); mf-login/src/main.tsx:6-10 (mounts React) | mf-login/vite.config.ts:6-34 (own configuration, output `../dist/mf-login`); mf-login/package.json:8 (`tsc -b && vite build`) | — | — | Yes | React application with its own standalone entry and Vite build. |
| mf-navbar | mf-navbar/index.html;mf-navbar/package.json;mf-navbar/vite.config.ts | mf-navbar/package.json:1-11 (own manifest) | mf-navbar/index.html:11 (`/src/main.tsx` entry); mf-navbar/src/main.tsx:6-10 (mounts React) | mf-navbar/vite.config.ts:6-34 (own configuration, output `../dist/mf-navbar`); mf-navbar/package.json:8 (`tsc -b && vite build`) | — | — | Yes | React application with its own standalone entry and Vite build. |
| mf-personagem-detalhe | mf-personagem-detalhe/index.html;mf-personagem-detalhe/package.json;mf-personagem-detalhe/vite.config.ts | mf-personagem-detalhe/package.json:1-11 (own manifest) | mf-personagem-detalhe/index.html:11 (`/src/main.tsx` entry); mf-personagem-detalhe/src/main.tsx:6-10 (mounts React) | mf-personagem-detalhe/vite.config.ts:6-34 (own configuration, output `../dist/mf-personagem-detalhe`); mf-personagem-detalhe/package.json:8 (`tsc -b && vite build`) | — | — | Yes | React application with its own standalone entry and Vite build. |
| root-app | root-app/index.html;root-app/package.json;root-app/vite.config.ts | root-app/package.json:1-11 (own manifest) | root-app/index.html:15 (`/src/main.tsx` entry); root-app/src/main.tsx:7-13 (mounts React with `HashRouter`) | root-app/vite.config.ts:6-45 (own configuration, output `../dist/root-app`); root-app/package.json:8 (`tsc -b && vite build`) | — | — | Yes | React application with its own entry and Vite build. |

## Summary

Frontend applications in the snapshot: 5 (mf-dashboard, mf-login, mf-navbar, mf-personagem-detalhe, root-app).

## Notes

- There is no `package.json` at the root or other workspace declaration; the `tsconfig*.json` files marked as `workspace-config` in `artifacts.csv` are each project’s TypeScript configurations.
- Deploy remains — in all rows: the only workflow, `.github/workflows/deploy.yml:19-27`, runs `build-all.sh` and publishes a single `./dist` to GitHub Pages. `build-all.sh:8-21` builds each directory separately, but deployment is joint, without a job or artifact for only one directory.
- The number of `Yes` rows (5) matches the classification’s `frontend_units: 5`.
- The `dist/` build output cited in the classification is not in the snapshot files.
