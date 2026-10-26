---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 223 — ross2p/mindlet-app

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|

## Summary

Frontend applications in the snapshot: 0.

## Notes

- `units.csv` has only the header, so the table has no rows. The snapshot has no `package.json`, `angular.json`, `project.json` or build configuration; it has only `README.md`, `compose.yml`, `start-local-dev.sh`, `.gitmodules`, `skills-lock.json`, the nginx configurations in `config/nginx/` and `infra/nginx/`, and the skills in `.agents/`.
- The count differs from the classification’s `frontend_units: 5` because the five zones are external to the snapshot. They are submodules (.gitmodules:4-18: `apps/dashboard`, `apps/auth`, `apps/profile`, `apps/study`, `apps/decks`, each with its own repository), and the directories do not exist in `files/`. `libs/types` and `libs/shared` (.gitmodules:1-3, 19-21) are also submodules.
- Deployment of these zones appears only outside them: compose.yml:15-108 declares a service per zone with `build.context: apps/<zona>` and `dockerfile: Dockerfile` (e.g., compose.yml:17-18). The `ops-*` occurrences in `matches.csv` belong to the nginx gateway (`config/nginx/nginx.conf:31-71`, `infra/nginx/nginx.conf:29-65`), which is not a frontend unit. There are no `ws-*` or `ci-*` occurrences.
