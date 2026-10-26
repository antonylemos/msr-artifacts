---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 045 — mrgleam/mf-tanstack-demo

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| shell | shell/index.html;shell/package.json;shell/vite.config.ts | shell/package.json:1-9 (own manifest) | shell/index.html:10-11 (main.tsx entry); shell/src/main.tsx:6-8 (mounts React) | shell/vite.config.ts:5-29 (own configuration); shell/package.json:7 (`vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| shop | shop/index.html;shop/package.json;shop/vite.config.ts | shop/package.json:1-10 (own manifest) | shop/index.html:10-11 (main.tsx entry); shop/src/main.tsx:6-8 (mounts React) | shop/vite.config.ts:5-25 (own configuration); shop/package.json:7 (`vite build`) | — | — | Yes | React application with its own entry and Vite build. |

## Summary

Frontend applications in the snapshot: 2 (shell, shop).

## Notes

- kong-shell/docker-compose.yml:3-16 and kong-remote/docker-compose.yml:3-12 deploy only the Kong gateway. The routes in kong-remote/kong.yml:3-13 point to servers already external to the container; they neither build nor publish shell or shop, so Deploy remains —.
- The kong-shell and kong-remote directories are absent from units.csv and were not added to the table.
