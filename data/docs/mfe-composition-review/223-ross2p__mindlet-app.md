---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
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

# 223 — ross2p/mindlet-app

## Repository overview

The superproject of a personal product, Mindlet, with five Next.js zones (dashboard, auth, profile, study and decks) and two libraries (`@ross2p/shared` and `@ross2p/types`) (README.md:3). All are Git submodules, each with its own repository (.gitmodules:1-21). The snapshot contains no code from any of them: directories `apps/*` and `libs/*` do not exist in `files/`. Only local orchestration is versioned here, namely `compose.yml`, nginx configurations and agent skills in `.agents/`.

Composition uses zones behind a reverse proxy. `compose.yml` declares one service per zone, built from the submodule directory (compose.yml:15-18, with `context: apps/dashboard`; others in compose.yml:36, :55, :74 and :93). It also declares an `nginx` service mounting configurations from `infra/nginx/` and depending on all five zones (compose.yml:110-124). Nginx defines one upstream per zone (infra/nginx/nginx.conf:14-18), forwards each prefix to its upstream (infra/nginx/nginx.conf:36-38 for `/dashboard/`, and equivalents through infra/nginx/nginx.conf:64-66 for `/decks/`) and redirects `/` to `/dashboard/` (infra/nginx/nginx.conf:29-31). Map infra/nginx/routing-map.frontend.conf:1-9 repeats the prefix-service mapping. The Docker-free development variant points the same upstreams to `localhost:3001-3005` (infra/nginx/nginx.conf.local:16-20). There is also a `config/nginx/nginx.conf` with upstreams on service ports 3001-3005 (config/nginx/nginx.conf:11-25), not mounted by `compose.yml` (compose.yml:115-118). According to the README, each zone uses its own `basePath` (README.md:3), and the gateway is at `localhost:8080` (README.md:34-35). The `basePath` values reside in submodules and cannot be checked.

No relationship was recorded. The structural review has no row in its "Units" table and counts 0 frontend applications in the snapshot. The source code review has no `Yes` or `Undetermined` construct, and the dependency review has no dependency on the inspected technologies. A relationship requires a Source directory that is `Yes` or `Undetermined` in the structural review, and here there is none. The nginx gateway is deployment configuration, not a frontend unit, and routes requests between zones without one zone loading, registering or embedding another. All five zones are outside the snapshot. The same applies to package dependency `@ross2p/shared`, consumed by zones through `file:../../libs/shared` during local development (README.md:74): it is not verifiable here and is not a composition relationship. This does not contradict the classification (`MFE-implemented`, `approaches: [multi-zones]`, five `multi-repo` units): the repository configures route-based composition whose units all reside in other repositories.

## Relationships

No relationship.

## Observations

No relationship. The source code review has no `Yes` or `Undetermined` row to distribute in the Code column.

## Summary

Relationships: 0. Active: 0. Target outside the snapshot: 0.
Units without a relationship: none.

