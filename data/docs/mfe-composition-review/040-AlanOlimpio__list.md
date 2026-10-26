---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
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
  date: 2026-10-21
---

# 040 — AlanOlimpio/list

## Repository overview

The repository contains a single React application (webpack 5, native Module Federation), `ListApp`, which belongs to a system distributed across several repositories and has **two roles**:

- **Host:** consumes `RegisterApp`, hosted on Vercel (webpack.config.js:52-55). The registration modal is loaded with `React.lazy` and rendered on the `/register` route (src/components/ListRoutes/ListRoutes.js:5-12), inside the list layout's `Outlet` (src/components/List/List.js:82-84).
- **Remote:** exposes its own routes, `./ListRoutes` (webpack.config.js:47-51), to a consumer outside the snapshot.

Only the first role becomes a relationship here; the second is recorded in this overview. The application has its own hosting configuration (structural review).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | RegisterApp | host → remote | source → target | module-federation | No | Yes | webpack.config.js:52-55 (remote `RegisterApp@https://register-navy-ten.vercel.app/remoteEntry.js`) | src/components/ListRoutes/ListRoutes.js:5; src/components/ListRoutes/ListRoutes.js:9; src/components/ListRoutes/ListRoutes.js:11 |

## Observations

**1. . → RegisterApp.** The application imports `RegisterApp/ModalRegister` and renders it on the `/register` route (src/components/ListRoutes/ListRoutes.js:5-12). The remote is identified by name and Vercel URL, outside the snapshot.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 1.
Units without a relationship: none.

