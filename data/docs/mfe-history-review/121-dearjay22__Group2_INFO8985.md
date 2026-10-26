---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
inputs:
  clone: data/samples/mfe-sample-001/repos/dearjay22__Group2_INFO8985
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 121 — dearjay22/Group2_INFO8985

## Repository overview

History up to snapshot has 56 commits, 16 merges, from 2025-12-02 to 2025-12-08: from `095fa12` (2025-12-02, "Initial commit") to snapshot `9f8b0b7` (2025-12-08, "Revise README for Microservices E‑Commerce Project"). Both frontend applications are introduced together in `ebce825` (2025-12-02, "Added Microfrontend App"), creating all files in `frontend/shell-app` and `frontend/products-mf`, including `App.js` files and `ProductList.js`; previously, `d32ef49` (2025-12-02, "add readme") creates a file named `frontend`, removed in `54317c8` (2025-12-02, "updated folder strcuture"). Next come Dockerfiles in `b3e4f84` (2025-12-05, "updated the front end part with docker file and all the required data"), `nginx.conf` files in `5c59071` (2025-12-06), `products.json` in `3b6d2f0` (2025-12-07, "Fix product endpoint") and last frontend change in `9f51b10` (2025-12-07, "Update package").

Clone lacks contents of old versions of queried files: every reading of `App.js`, `ProductList.js` and `docker-compose.yml` at earlier commits failed with missing objects. Points below have only messages, file lists per commit and object identifiers. No point was resolved by snapshot itself.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Shell iframe points to port 3001, linked to products-mf only through Compose, and comment immediately above says URL is API Gateway at port 8080 | 3.4.5 #1; 3.4.7 #5 | conflicting stages | ebce825 2025-12-02 Added Microfrontend App; b3e4f84 2025-12-05 updated the front end part with docker file and all the required data; 20fcc0c 2025-12-06 updated; 3b6d2f0 2025-12-07 Fix product endpoint; 15495fb 2025-12-07 Added K6 | inconclusive |
| 2 | README says microfrontends work with backends, but products-mf uses local `products.json`, and `ProductList.js`, which would call gateway, is not imported | 3.4.7 #4 | active or abandoned | ebce825 2025-12-02 Added Microfrontend App; 20fcc0c 2025-12-06 updated; 3b6d2f0 2025-12-07 Fix product endpoint; 9f51b10 2025-12-07 Update package | inconclusive |

## Observations

**1. Shell iframe points to port 3001, linked to products-mf only through Compose, and comment immediately above says URL is API Gateway at port 8080.** The `frontend/shell-app/src/App.js` is created in `ebce825` and changes in `b3e4f84`, `20fcc0c` and `3b6d2f0`; object at `3b6d2f0` matches snapshot, so port 8080 comment and URL with port 3001 coexist at least since this commit. Versions at `ebce825`, `b3e4f84` and `20fcc0c` are unavailable, and history does not show whether any constructed gateway URL. The `docker-compose.yml` changes for last time in `15495fb`, with same object as snapshot; earlier versions, including `b3e4f84`, commit where shell receives Dockerfile, are also unavailable, so since when products-mf is at port 3001 cannot be known. Message of `3b6d2f0` announces correction of "product endpoint" without saying whether it is iframe URL or another. Conclusion: history does not say whether comment is a remnant of a stage where iframe pointed to gateway.

**2. README says microfrontends work with backends, but products-mf uses local `products.json`, and `ProductList.js`, which would call gateway, is not imported.** The `ProductList.js` is created in `ebce825`, together with products-mf `App.js`, and changes in `20fcc0c` and `9f51b10`, last commit touching frontend; file was edited until the end, rather than forgotten since creation. The `products.json` is created in `3b6d2f0`, also changing products-mf `App.js`, and message announces correction of "product endpoint"; this is consistent with replacing a backend call with local data, but old versions of `App.js` and `ProductList.js` are unavailable, and history does not show whether `App.js` ever imported `ProductList.js` or called gateway. Conclusion: history does not say whether backend connection was abandoned or never connected.

## Commands

```
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 rev-list --count 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 rev-list --count --merges 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --reverse --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --reverse --format='%h %ad %s' --date=short --name-status --no-renames 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend shell-app products-mf
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree ebce825 -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree b3e4f84 -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 20fcc0c -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 3b6d2f0 -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend/shell-app/src/App.js frontend/products-mf/src/App.js frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show --format='%h %ad %s' --date=short --name-status 73402bf
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show ebce825:frontend/shell-app/src/App.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show b3e4f84:frontend/shell-app/src/App.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 20fcc0c:frontend/shell-app/src/App.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show ebce825:frontend/products-mf/src/ProductList.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 20fcc0c:frontend/products-mf/src/ProductList.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show ebce825:frontend/products-mf/src/App.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show b3e4f84:frontend/products-mf/src/App.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 20fcc0c:frontend/products-mf/src/App.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 5c59071:frontend/products-mf/src/App.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 3b6d2f0:frontend/products-mf/src/App.js   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend/shell-app/src/App.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend/products-mf/src/ProductList.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- frontend/products-mf/src/App.js
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 log --format='%h %ad %s' --date=short 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show --format='%h %ad %s' --date=short --name-status 24a61a0
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show --format='%h %ad %s' --date=short --name-status 3b6d2f0
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show --format='%h %ad %s' --date=short --name-status 9f51b10
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree b3e4f84 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 20fcc0c -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 5c59071 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree c976c69 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 15495fb -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 ls-tree 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show b3e4f84:docker-compose.yml   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show 5c59071:docker-compose.yml   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh dearjay22__Group2_INFO8985 show c976c69:docker-compose.yml   # failed: missing object (bad object)
```

## Summary

Commits up to the snapshot: 56 (2025-12-02 to 2025-12-08). Points: 2 (clarified: 0, inconclusive: 2, resolved by the snapshot: 0).
