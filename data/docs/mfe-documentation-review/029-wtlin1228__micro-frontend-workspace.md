---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 029 — wtlin1228/micro-frontend-workspace

## Repository overview

Prose documentation is minimal. The root README has the title, a per-package port table and build and preview steps (README.md:1-23). Each package's READMEs are Rsbuild and Rslib templates (e.g.: packages/app-mf-1/README.md; packages/lib-app-interface/README.md). The most direct architecture description is in the `description` of the root `package.json`: "a micro-frontend workspace architected by qiankun and module federation" (package.json:4).

Artifacts cited by previous reviews were read:
- `package.json` and `pnpm-workspace.yaml`;
- Rsbuild, Rslib and Module Federation configurations;
- host (`App.tsx`, `bootstrap.tsx`, `router.tsx`, `configs/apps.ts` and loaders in `app-loaders/`);
- remotes' `index.tsx`, `bootstrap.tsx`, `App.tsx`, `exposed.tsx` and `lifecycles.tsx`.

Comments with architectural content:
- **Host:** the Module Federation configuration comment explains that remotes are loaded through the runtime API.
- **Qiankun sub-apps:** comments in `lifecycles.tsx` reproduce qiankun documentation about when `bootstrap` and `mount` are called (packages/app-qiankun-1/src/lifecycles.tsx:8-13, 18-20). This is library text, not a claim about this project, hence no row.
- **App configuration:** a comment in `configs/apps.ts` says that "in a real-world scenario", configuration would come from a backend API (packages/host/src/configs/apps.ts:8). A hypothesis, rather than a snapshot description.

Documentation matches previous reviews: a workspace with one host, two Module Federation remotes and two qiankun sub-apps.

`doc-*` occurrences that did not become rows: README.md:8 and 9, rows in the port table (an infrastructure detail). README.md:1 is in claim 1.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:1 | "micro-frontend workspace" | structure | corroborated | 3.4.3 (five applications in the pnpm workspace); pnpm-workspace.yaml:1-2 |
| 2 | package.json:4 | "a micro-frontend workspace architected by qiankun and module federation" (the workspace combines qiankun and Module Federation) | structure | corroborated | 3.4.2 (qiankun and module-federation configured); 3.4.5 #1-#4 |
| 3 | packages/host/module-federation.config.ts:6-7 | "we use the runtime API to load our remotes / see `src/app-loaders/module-federation.ts`" (remotes are loaded through the runtime API) | composition | corroborated | 3.4.4; packages/host/module-federation.config.ts:5-10; packages/host/src/app-loaders/module-federation.ts:27, 34 |

## Observations

**1. README.md:1.** The workspace has five applications and a library in `packages/`, all pnpm workspace members. The title says no more than that.

**2. package.json:4.** The description names both technologies found by the composition review: two `host → remote` relationships through Module Federation (app-mf-1 and app-mf-2), and two `root-config → application` through qiankun (app-qiankun-1 and app-qiankun-2), all from host. The hybrid composition declaration matches.

**3. packages/host/module-federation.config.ts:6-7.** Configuration block `remotes` is empty, with static entries commented out (packages/host/module-federation.config.ts:8-9). The loader registers remotes and loads them at runtime with `registerRemotes` and `loadRemote`, from the `configs/apps.ts` list.

## Summary

Claims: 3 (corroborated: 3, partial: 0, contradicted: 0, uncorroborated: 0). Themes: (structure: 2, composition: 1).
