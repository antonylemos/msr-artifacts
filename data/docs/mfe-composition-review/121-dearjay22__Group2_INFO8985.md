---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
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

# 121 — dearjay22/Group2_INFO8985

## Repository overview

A course project assembling a demonstration e-commerce system with Spring Boot microservices, Eureka, Docker Compose and two React applications created with CRA, intended to run in GitHub Codespaces (README.md:1-2). The two applications are `frontend/shell-app` and `frontend/products-mf`, each with its own Nginx image and published by Compose on ports 3000 and 3001 (docker-compose.yml:59-62, 66-69). There is no composition library: the only mechanism is an `<iframe>`.

The shell is a page with navigation to `/` and `/products` (frontend/shell-app/src/App.js:26-28). On `/products`, it renders an iframe titled "Products Microfrontend" (frontend/shell-app/src/App.js:31-36). Its `src` comes from `getApiUrl()`, which only assembles a URL when the host is `*.app.github.dev`, replacing the current Codespace URL's port with 3001 (frontend/shell-app/src/App.js:6-15). Outside Codespaces the function returns nothing and `src` becomes the string `"undefined"` (frontend/shell-app/src/App.js:17-18, 33). The comment on line 13 mentions an API Gateway on port 8080, but the URL uses 3001.

The iframe URL contains only the port. In the snapshot, port 3001 is published by Compose for the service built from `./frontend/products-mf` (docker-compose.yml:66-69), and the iframe title mentions Products; however, there is no `base`/`publicPath`, `homepage` or other URL name pointing to the unit. Under the Target rule, a port alone is insufficient, and the target is recorded by URL (see relationship 1). The classification (3.4.2) used the same port mapping for Q4 under a different criterion; this is not a discrepancy to correct here.

`products-mf` has no composition or communication code: it renders a table with data from local `products.json` (frontend/products-mf/src/App.js:2, 7-9), and `ProductList.js` is not imported (source code review, Notes). There is no `postMessage` or event exchange between the two applications.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/shell-app | https://${codespaceName}-3001.app.github.dev | page → embedded-frontend | source → target | iframe | Undetermined | Yes | docker-compose.yml:66-69 (service `products-mf`, `build: ./frontend/products-mf`, port `3001:80`) | frontend/shell-app/src/App.js:32 |

## Observations

**1. frontend/shell-app → https://${codespaceName}-3001.app.github.dev.** The shell embeds the URL in an `<iframe>` at `/products` (frontend/shell-app/src/App.js:31-36); the URL is assembled in frontend/shell-app/src/App.js:14 from the Codespace name extracted from the host (frontend/shell-app/src/App.js:10-12). The only URL element pointing to a unit is port 3001, which Compose publishes for the service built from `./frontend/products-mf` (docker-compose.yml:66-69). Because a port alone is insufficient, the target remains written as in the artifact and In snapshot is `Undetermined`; if the Compose mapping were accepted as a match, the target would be `frontend/products-mf`, with In snapshot `Yes`. Active `Yes`: the source code review line is `Yes`, and `App` is rendered by the shell entry point (frontend/shell-app/src/index.js:4-12). The relationship produces a valid URL only in Codespaces; outside it, `src` becomes `"undefined"` (frontend/shell-app/src/App.js:6-18, 33).

## Summary

Relationships: 1 (page → embedded-frontend: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: frontend/products-mf.

