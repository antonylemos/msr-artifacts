---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Repository overview

The repository contains only a single-spa application's root config. It is the snapshot's only unit (`.`). Both microfrontends it composes, `menu` and `base`, reside outside it. The project uses Vite with `vite-plugin-single-spa` in `type: 'root'` and `cssStrategy: 'multiMife'` mode (vite.config.ts:12-15), served on port 9080 (vite.config.ts:18). The `index.html` page has two containers, `single-spa-application:menu` inside `nav` and `single-spa-application:base` inside `main` (index.html:12, 17), and loads `src/main.ts` as the entry point (index.html:20). That file registers both applications with `registerApplication`, both active at `/` and therefore mounted together on all routes (src/main.ts:13-17, 21-25), and calls `start()` (src/main.ts:29).

Each application is loaded through `import()` of a URL read from `import.meta.env` (src/main.ts:7, 15, 23). In the snapshot, values appear only in `.envtest`: `VITE_MENU=http://localhost:9083/src/index.ts` and `VITE_BASE=http://localhost:9081/src/index.ts` (.envtest:8, 11). That file's comments explain that each microfrontend is its own Vite dev server on its port and that `import()` brings the `bootstrap`, `mount` and `unmount` lifecycles (.envtest:2-4). They also mention CDN-published builds as a future step (.envtest:5). There is no import map, Module Federation, custom element, iframe or message exchange. The unit connection uses only URLs.

It is a small six-file example without a README. There is an execution caveat: the src/main.ts:5-6 comment directs setting the URLs in `.env`/`.env.local`, but the only versioned file is named `.envtest`, which Vite does not load by default. This caveat is already in previous reviews and does not change the relationships, because each registration target is named in code and its URL is declared in the snapshot.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | menu | root-config → application | source → target | single-spa | No | Yes | vite.config.ts:12-15 (`vitePluginSingleSpa` with `type: 'root'`); .envtest:8 (`VITE_MENU=http://localhost:9083/src/index.ts`) | src/main.ts:13; src/main.ts:15; src/main.ts:29 |
| 2 | . | base | root-config → application | source → target | single-spa | No | Yes | vite.config.ts:12-15 (`vitePluginSingleSpa` with `type: 'root'`); .envtest:11 (`VITE_BASE=http://localhost:9081/src/index.ts`) | src/main.ts:21; src/main.ts:23; src/main.ts:29 |

## Observations

**1. . → menu.** The root config registers application `menu` with `app: () => import(env.VITE_MENU)` and `activeWhen: '/'` (src/main.ts:13-17). Single-spa mounts it in the `single-spa-application:menu` container in `nav` (index.html:12) after `start()` (src/main.ts:29). The target is identified by registration name and URL `http://localhost:9083/src/index.ts` (.envtest:8), a Vite dev server from another project (.envtest:2). No snapshot unit matches it, hence In snapshot = `No`. Type is `root-config → application` because the target enters registered in the orchestrator, although loading is dynamic `import()`. Active = `Yes`: all three code lines are `Yes` in the source code review. The caveat is the environment filename, described in the repository overview.

**2. . → base.** The same path as relationship 1. Registration `base` (src/main.ts:21-25) loads through `import()` the URL in `VITE_BASE`, `http://localhost:9081/src/index.ts` (.envtest:11), also active at `/`. The application is mounted in the `single-spa-application:base` container in `main` (index.html:17), alongside `menu`. The target is outside the snapshot and Active = `Yes` through lines src/main.ts:21, 23 and 29. The src/main.ts:29 line (`start()`) supports both relationships and appears in both.

## Summary

Relationships: 2 (root-config → application: 2). Active: 2. Target outside the snapshot: 2.
Units without a relationship: none.

