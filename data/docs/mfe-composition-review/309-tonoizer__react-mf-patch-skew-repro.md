---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
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

# 309 — tonoizer/react-mf-patch-skew-repro

## Repository overview

A minimal reproduction of a defect in `@module-federation/vite` 1.21.6 (README.md:1-5): four React/Vite applications in a pnpm workspace, joined by Module Federation in a chain. `host` is the top-level host and declares two remotes, `remote_a` and `remote_b` (host/vite.config.js:19-36). `remote_a` has a dual role: it exposes `./App` to the host and is a nested host of `remote_c` (remote_a/vite.config.js:19-35). `remote_b` and `remote_c` only expose `./App` (remote_b/vite.config.js:19-28; remote_c/vite.config.js:19-28). All remotes enter the same way: a `lazy(() => import('<remote>/App'))` (host/src/App.jsx:3-4; remote_a/src/App.jsx:3) rendered inside `Suspense` (host/src/App.jsx:74-78, 86-90; remote_a/src/App.jsx:11-13). The module exposed by `remote_a` is the same `App` mounting `remote_c`, so loading `remote_a` in the host brings `remote_c` along.

The purpose is not a product: apps pin different React 19.2.x patches, with host and remote_c pinning the same 19.2.8 (host/package.json:11-12, 19.2.8; remote_a/package.json:11-12, 19.2.4; remote_b/package.json:11-12, 19.2.6; remote_c/package.json:11-12, 19.2.8), and all share the React family as a singleton with `requiredVersion: '^19.2.4'` and `shareStrategy: 'version-first'` (host/vite.config.js:5-11, 33-34), to trigger failure. The versioned result records that, on natural loading, the host goes blank with `Cannot read properties of null (reading 'useState')` and never mounts remotes (evidence/RESULT.json:12-13). Composition is complete in configuration and code; failure is the experiment's object and does not change the relationships below.

What did not become a relationship: the host's `ShareDump`, which only reads federation runtime globals (`__mf_module_cache__`, `__FEDERATION__`) and publishes `__SKEW_DUMP__` for Playwright (host/src/App.jsx:6-57); `onError` passed to `ErrorBoundary`, an internal host callback (host/src/App.jsx:74, 108); and `__SKEW_CRASHES__` (host/src/App.jsx:109-114). None exchanges messages with another unit. `scripts/capture.mjs` is the Playwright script, not a unit. There is no inter-unit communication channel.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host | remote_a | host → remote | source → target | module-federation | Yes | Yes | host/vite.config.js:22-26 (remote `remote_a` at `http://localhost:5001/remoteEntry.js`); remote_a/vite.config.js:20-24 (`name: 'remote_a'`, `filename: 'remoteEntry.js'`, exposes `./App`); remote_a/vite.config.js:16 (`base: 'http://localhost:5001/'`) | host/src/App.jsx:3; host/src/App.jsx:76 |
| 2 | host | remote_b | host → remote | source → target | module-federation | Yes | Yes | host/vite.config.js:27-31 (remote `remote_b` at `http://localhost:5002/remoteEntry.js`); remote_b/vite.config.js:20-24 (`name: 'remote_b'`, `filename: 'remoteEntry.js'`, exposes `./App`); remote_b/vite.config.js:16 (`base: 'http://localhost:5002/'`) | host/src/App.jsx:4; host/src/App.jsx:88 |
| 3 | remote_a | remote_c | host → remote | source → target | module-federation | Yes | Yes | remote_a/vite.config.js:26-30 (remote `remote_c` at `http://localhost:5003/remoteEntry.js`); remote_c/vite.config.js:20-24 (`name: 'remote_c'`, `filename: 'remoteEntry.js'`, exposes `./App`); remote_c/vite.config.js:16 (`base: 'http://localhost:5003/'`) | remote_a/src/App.jsx:3; remote_a/src/App.jsx:12 |

## Observations

**1. host → remote_a.** The remote declared by the host has `name: 'remote_a'` and entry point `remoteEntry.js` at `localhost:5001` (host/vite.config.js:22-26), matching `name`, `filename` and `base` of unit remote_a (remote_a/vite.config.js:16, 20-21); port 5001 (remote_a/vite.config.js:14-15) only corroborates. The host imports `remote_a/App`, which is exposed `./App` (remote_a/vite.config.js:22-24), and renders it in host/src/App.jsx:76. The entry chain is host/index.html:9 → host/src/main.jsx:3,7 → host/src/App.jsx, hence the relationship is active, although versioned evidence records that the host breaks before mounting the remote (evidence/RESULT.json:13). The exposed component is the same one mounting remote_c (relationship 3).

**2. host → remote_b.** Same arrangement as relationship 1: `name: 'remote_b'` and `http://localhost:5002/remoteEntry.js` (host/vite.config.js:27-31) match `name`, `filename` and `base` of remote_b (remote_b/vite.config.js:16, 20-21). `import('remote_b/App')` (host/src/App.jsx:4) is rendered in host/src/App.jsx:88, inside the same active `App`. Remote_b is only a remote, without its own `remotes`.

**3. remote_a → remote_c.** Remote_a is a nested host: it declares `remote_c` at `http://localhost:5003/remoteEntry.js` (remote_a/vite.config.js:26-30), matching `name`, `filename` and `base` of remote_c (remote_c/vite.config.js:16, 20-21). `import('remote_c/App')` (remote_a/src/App.jsx:3) is rendered in remote_a/src/App.jsx:12. The file is simultaneously remote_a's standalone entry point (remote_a/src/main.jsx:3,5) and the module exposed to the host (remote_a/vite.config.js:23), so the relationship occurs in both contexts. According to evidence, on natural loading remote_c's shared modules participate in the host's failure (evidence/RESULT.json:15).

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.

