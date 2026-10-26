---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 121 — dearjay22/Group2_INFO8985

## Repository overview

Course project: demonstration e-commerce with Spring Boot microservices, Eureka, Docker Compose and two CRA React applications, intended for GitHub Codespaces. Dimensions 1 and 2 are empty. Inspection found no MFE technology dependency, and no configuration file cited by reviews declares a composition element: `package.json` files only contain `react-scripts` scripts, and `docker-compose.yml`, Dockerfiles, `nginx.conf` files and workflow concern deployment and CI. Port `3001:80` of service `products-mf`, cited in 3.4.5 Configuration column, is Compose publication and remains in build/deployment observation (#5).

Two frontend units are `frontend/products-mf` and `frontend/shell-app` (#2, #3). Each has its own manifest, entry, `react-scripts` build and Nginx image, and its own Compose service (#5, #6).

Composition chain has a single link, without MFE library:
- **Code:** at route `/products`, shell embeds in an `<iframe>` URL `https://${codespaceName}-3001.app.github.dev`, assembled from Codespace host (#1).
- **Relationship:** page → embedded-frontend relationship is active, but target remains undetermined (#4). Sole URL element pointing to a unit is port 3001, and only Compose links that port to `products-mf` (#5). Two readings remain plausible: shell composes `products-mf` if port mapping is accepted as correspondence (classification criterion for Q4), or embeds a Codespace address not linked to a unit by snapshot. Thus #1 is `moderate` and #4 `ambiguous`, both with Notes.

`products-mf` does not know it is embedded. No `postMessage`, events or other inter-application contract. Outside Codespaces, iframe `src` becomes `"undefined"`.

Misleading signals:
- Comment immediately above URL says it is API Gateway URL on port 8080, but code uses `products-mf` port (#11).
- README says microfrontends work with backends, but active code of neither application calls backend: `products-mf` reads local `products.json` (#10).
- History clarifies neither point because older file versions are absent from clone (#12, #13). Uncertainties concern only past; snapshot is clear.

README claims about microfrontends, shell with Products Microfrontend and automatic Codespaces URL resolution (#7, #8, #9) are confirmed by units, separate deployment and iframe code. None confirms iframe target.

## Observations

### 1. frontend/shell-app/src/App.js:32; frontend/shell-app/src/App.js:31; frontend/shell-app/src/App.js:6-18; frontend/shell-app/src/index.js:4-12

**Observation:** `<iframe src= {`${getApiUrl()}`} title="Products Microfrontend">`, rendered when `window.location.pathname === "/products"` (lines 4 and 31-36). `getApiUrl()` only returns a URL when host is `*.app.github.dev`: extracts Codespace name and assembles `https://${codespaceName}-3001.app.github.dev` (lines 8-14). Other cases have no `return`. `App` is rendered by shell entry (frontend/shell-app/src/index.js:4-12).

**Interpretation:** Shell embeds application served on Codespace port 3001 through an iframe on its own route. Mechanism is used, but row does not name target unit.

**Note:** `moderate` strength, outside guidance for route with Composition `Yes` (`strong`). URL only contains port 3001, and 3.4.5 left target `Undetermined` because port alone is insufficient (3.4.5 #1). Row shows mechanism used in route without independently establishing embedded unit.

### 2. frontend/products-mf; frontend/products-mf/package.json:17; frontend/products-mf/src/index.js:7-12; frontend/products-mf/public/index.html:31; frontend/products-mf/Dockerfile:1-12; docker-compose.yml:66-69

**Observation:** Directory with own `package.json`, CRA entry (`ReactDOM.createRoot` renders `App`) and template with `<div id="root">`. Build is `react-scripts build`, without own configuration file. Dockerfile builds and publishes in Nginx, and Compose service `products-mf`, built from `./frontend/products-mf`, on port `3001:80`.

**Interpretation:** Frontend unit with its own code, build and image boundary.

### 3. frontend/shell-app; frontend/shell-app/package.json:17; frontend/shell-app/src/index.js:7-12; frontend/shell-app/public/index.html:31; frontend/shell-app/Dockerfile:1-12; docker-compose.yml:59-62

**Observation:** Directory with own `package.json`, CRA entry (`ReactDOM.createRoot` renders `App`) and template with `<div id="root">`. Build is `react-scripts build`, without own configuration file. Dockerfile builds and publishes in Nginx, and Compose service `shell-app`, built from `./frontend/shell-app`, on port `3000:80`.

**Interpretation:** Frontend unit with its own boundary, containing iframe (#1).

### 4. frontend/shell-app/src/App.js:32; frontend/shell-app/src/App.js:10-14; docker-compose.yml:66-69

**Observation:** `frontend/shell-app` embeds `https://${codespaceName}-3001.app.github.dev` through iframe at route `/products`. Relationship has In snapshot `Undetermined` and Active `Yes`. Compose publishes service built from `./frontend/products-mf` on port 3001. Outside Codespaces `src` becomes `"undefined"`.

**Interpretation:** An active page → embedded-frontend relationship with undetermined target. Two readings remain plausible: shell composes `frontend/products-mf` if Compose port mapping is accepted as correspondence, or embeds a Codespace address not linked to a unit by snapshot.

**Note:** `ambiguous` strength, outside Active `Yes` guidance (`strong`). Relationship is active, but 3.4.5 recorded target as URL, with In snapshot `Undetermined`, describing both readings above. Observation does not directly link two units.

### 5. frontend/products-mf/package.json:17; frontend/products-mf/Dockerfile:1-12; frontend/products-mf/nginx.conf:1-11; docker-compose.yml:66-71; .github/workflows/ci.yml:18-19, 31-32

**Observation:** `react-scripts build` runs inside application's own image, and output is copied to an `nginx:alpine` image with fallback to `index.html`. Compose service `products-mf` publishes application on host port 3001. CI builds and starts all Compose services on runner itself, publishing nothing outside it. `version: "0.1.0"`, with `private: true`, is used in no publication.

**Interpretation:** `products-mf` has separate build and deployment as own image and service. Port 3001 is used by shell in iframe URL (#1).

### 6. frontend/shell-app/package.json:17; frontend/shell-app/Dockerfile:1-12; frontend/shell-app/nginx.conf:1-11; docker-compose.yml:59-64; .github/workflows/ci.yml:18-19, 31-32

**Observation:** Same arrangement as `products-mf`: `react-scripts build` inside own image, Nginx with fallback to `index.html` and service `shell-app` on host port 3000. Dockerfile and `nginx.conf` are copies of `products-mf` files, without proxy to it. No versioning used in publication.

**Interpretation:** Shell has separate build and deployment, reaching `products-mf` directly through its port rather than own server.

### 7. README.md:2

**Observation:** "Running on **GitHub Codespaces** with **Docker Compose**, **Spring Boot**, **Eureka**, and **Microfrontends**"

**Interpretation:** Claims project runs in Codespaces with Docker Compose and has microfrontends. Two units with separate build and deployment (#2, #3, #5, #6) and shell iframe written for Codespaces (#1) confirm claim. Spring Boot and Eureka concern backends.

### 8. README.md:13

**Observation:** "**Frontend (Shell App + Products Microfrontend)**"

**Interpretation:** Claims frontend comprises shell and products microfrontend. Two units have these names (#2, #3), and shell embeds another application in iframe titled "Products Microfrontend" (#1). Claim corroborated.

### 9. README.md:16

**Observation:** "Everything runs in **GitHub Codespaces**, automatically resolving internal service URLs."

**Interpretation:** In frontend, sole automatically resolved URL is iframe URL assembled from Codespace host (#1). Claim corroborated, and resolution only occurs in Codespaces as sentence says.

### 10. README.md:107

**Observation:** "View frontend microfrontends working with backend services"

**Interpretation:** Claims frontend applications work with backends. Neither active code calls backend: `products-mf` builds table with local `products.json` (frontend/products-mf/src/App.js:2, 7-9), and `ProductList.js`, which would call gateway, is not imported. Claim contradicted.

### 11. frontend/shell-app/src/App.js:13

**Observation:** Comment "Construct API Gateway URL (port 8080)", immediately above line assembling iframe URL with port 3001.

**Interpretation:** Says iframe points to API Gateway. Code assembles port 3001 (#1), and Compose publishes gateway on 8080 (docker-compose.yml:45-52). Claim contradicted.

### 12. ebce825 2025-12-02 (frontend/shell-app/src/App.js); b3e4f84 2025-12-05 (frontend/shell-app/src/App.js); 20fcc0c 2025-12-06 (frontend/shell-app/src/App.js); 3b6d2f0 2025-12-07 (frontend/shell-app/src/App.js); 15495fb 2025-12-07 (docker-compose.yml)

**Observation:** Shell `App.js` is created in `ebce825` and changes in `b3e4f84`, `20fcc0c` and `3b6d2f0`. Object from `3b6d2f0` matches snapshot, so port 8080 comment and URL with port 3001 have coexisted at least since this commit. `docker-compose.yml` changes last in `15495fb`. Earlier versions of both files are absent from clone.

**Interpretation:** History does not say whether comment remains from stage when iframe pointed to gateway, or since when `products-mf` has been on port 3001. Point inconclusive, uncertainty concerns only past: snapshot URL uses port 3001.

### 13. ebce825 2025-12-02 (frontend/products-mf/src/ProductList.js, frontend/products-mf/src/App.js); 20fcc0c 2025-12-06 (frontend/products-mf/src/ProductList.js); 3b6d2f0 2025-12-07 (frontend/products-mf/src/products.json, frontend/products-mf/src/App.js); 9f51b10 2025-12-07 (frontend/products-mf/src/ProductList.js)

**Observation:** `ProductList.js` is created in `ebce825`, alongside `App.js` of `products-mf`, and changes in `20fcc0c` and `9f51b10`. `products.json` is created in `3b6d2f0` ("Fix product endpoint"), also changing `App.js`. Older file versions are absent from clone.

**Interpretation:** Compatible with replacing a backend call with local data, but history does not say whether backend connection was abandoned or never connected. Point inconclusive, uncertainty concerns only past: `products-mf` does not call backend in snapshot.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (frontend/shell-app/src/App.js:32) | 3 code | source code | iframe | architectural | moderate | implements #4 |
| 2 | 3.4.3 (frontend/products-mf) | 4 structure | directory | — | architectural | moderate | — |
| 3 | 3.4.3 (frontend/shell-app) | 4 structure | directory | — | architectural | moderate | — |
| 4 | 3.4.5 #1 | 5 composition | source code | iframe | architectural | ambiguous | links #3 |
| 5 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #2 |
| 6 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #3 |
| 7 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #5; corroborates #6 |
| 8 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #2; corroborates #3 |
| 9 | 3.4.7 #3 | 7 documentation | documentation | — | technological | weak | corroborates #1 |
| 10 | 3.4.7 #4 | 7 documentation | documentation | — | context | weak | contradicts frontend/products-mf/src/App.js:2, 7-9 |
| 11 | 3.4.7 #5 | 7 documentation | comment | — | context | weak | contradicts #1 |
| 12 | 3.4.8 #1 | 8 history | history | iframe | architectural | weak | explains #1; explains #4; explains #11 |
| 13 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #10 |

## Summary

Observations: 13. Dimensions (technology: 0, configuration: 0, code: 1, structure: 2, composition: 1, build-deploy: 2, documentation: 5, history: 2). Strength (strong: 0, moderate: 5, weak: 7, ambiguous: 1). Evidence (technological: 1, architectural: 9, context: 3).

