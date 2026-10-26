---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 121 — dearjay22/Group2_INFO8985

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-iframe | frontend/shell-app/src/App.js:32 | frontend/shell-app | embedding | Yes | The shell embeds `products-mf` in an `<iframe>` (lines 32-36) when `window.location.pathname === "/products"` (lines 4 and 31). The `src` comes from `getApiUrl()` (lines 6-18), which in Codespaces assembles `https://<codespace>-3001.app.github.dev` (line 14); port 3001 belongs to service `products-mf` (`docker-compose.yml:66-69`, `build: ./frontend/products-mf`, `3001:80`). Active: `App` is rendered by entry `frontend/shell-app/src/index.js:4-12`. |

## Constructs outside mining

No additional constructs.

## Summary

Constructs participating in composition: 1 (embedding: 1).

## Notes

- Outside Codespaces, `getApiUrl()` has no `return` (`frontend/shell-app/src/App.js:6-18`) and the iframe `src` becomes `"undefined"`; the `products-mf` URL is assembled only for host `*.app.github.dev` (lines 8-15). There is no `products-mf` proxy in the shell nginx (`frontend/shell-app/nginx.conf:8-10`, only `try_files`).
- The step 4 search found only `import('web-vitals')` at `frontend/shell-app/src/reportWebVitals.js:3` and `frontend/products-mf/src/reportWebVitals.js:3`, loading a CRA template library rather than another unit; these do not become rows.
- `products-mf` has no composition or communication code (`postMessage`, events): it renders `App` with local `products.json` data (`frontend/products-mf/src/App.js:2,7-9`). `frontend/products-mf/src/ProductList.js` is not imported by any file.
