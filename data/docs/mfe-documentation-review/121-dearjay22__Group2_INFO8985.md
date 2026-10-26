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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 121 — dearjay22/Group2_INFO8985

## Repository overview

Project documentation is English root README.md. It presents demonstration e-commerce with Spring Boot microservices, Eureka, API Gateway, Prometheus and Grafana, and frontend comprising shell and "Products Microfrontend" (README.md:1-14), all designed for GitHub Codespaces (README.md:2, 16). Other two `documentation` files in `artifacts.csv`, frontend/products-mf/README.md and frontend/shell-app/README.md, are identical standard Create React App READMEs (frontend/shell-app/README.md:1-3), without project claims; they yield no rows.

For frontend units, README matches previous reviews: two React applications, shell and products-mf, each with own Compose image and service, shell embedding a Codespace URL in iframe. Two differences yield rows: it says microfrontends work with backend services, but neither application's active code calls backend (#4); shell comment says iframe URL belongs to API Gateway, while code constructs products-mf port (#5).

`matches.csv` has four `doc-mfe-term` occurrences. README.md:2 appears in table row 1, README.md:13 in row 2 and README.md:107 in row 4. README.md:70 is a title ("Products Microfrontend") above run command, without claim; cited in row 2's paragraph.

Excluded as solely backends, monitoring or installation: backend and monitoring service list (README.md:7-12, 14), prerequisites (README.md:20-26) and Eureka configuration with "You do **not** hardcode the gateway or discovery URL anywhere" (README.md:94-100), referring to backend Eureka URL. Sole fixed frontend gateway address is default `http://api-gateway:8080` at frontend/products-mf/src/ProductList.js:3, a file no other imports (source-code review, Notes). Run instructions also yield no rows, but mismatch snapshot. README instructs starting "backend services" with `docker-compose up --build` and lists only backends and monitoring (README.md:32-46), but same Compose also builds and publishes shell and products-mf (docker-compose.yml:56-71) and puts Grafana on port 3030 rather than 3000 (docker-compose.yml:110; README.md:46, 86). It instructs entering `shell-app` and `products-mf` from root (README.md:54, 57, 66, 72), but directories are in `frontend/`. It instructs `npm run dev` (README.md:67, 73), a script absent from both `package.json` files, which only have `start`, `build`, `test` and `eject` (frontend/shell-app/package.json:15-20; frontend/products-mf/package.json:15-20). It gives shell and products-mf ports 5173 and 4173 (README.md:82-83), numbers absent from other snapshot files; Compose publishes them on ports 3000 and 3001 (docker-compose.yml:62, 69). Build and deployment review already records these differences in its Repository overview.

Comments and descriptive fields read: docker-compose.yml section headers (e.g. `# FRONTEND`, docker-compose.yml:56-58), without claims; Dockerfiles, `nginx.conf` files and .github/workflows/ci.yml from previous reviews, without comments; `package.json` files without `description` (frontend/shell-app/package.json:1-4; frontend/products-mf/package.json:1-4); CRA-standard `meta description` in `index.html` ("Web site created using create-react-app", frontend/shell-app/public/index.html:8-11); CRA comments in `src/index.js` (frontend/shell-app/src/index.js:14-16; frontend/products-mf/src/index.js:14-16); comments at frontend/shell-app/src/App.js:7, 9, 13, of which only line 13 makes a claim (#5).

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:2 | "Running on **GitHub Codespaces** with **Docker Compose**, **Spring Boot**, **Eureka**, and **Microfrontends**" | build-deploy | corroborated | 3.4.3 (frontend/products-mf and frontend/shell-app `Yes`); 3.4.4 (src-iframe, Composition `Yes`); 3.4.5 #1; 3.4.6 #1, #2; docker-compose.yml:59-71; frontend/shell-app/src/App.js:8-14 |
| 2 | README.md:13 | "**Frontend (Shell App + Products Microfrontend)**" | structure | corroborated | 3.4.3; 3.4.5 #1; frontend/shell-app/src/App.js:31-36 |
| 3 | README.md:16 | "automatically resolving internal service URLs" | composition | corroborated | 3.4.5 #1; frontend/shell-app/src/App.js:6-15 |
| 4 | README.md:107 | "View frontend microfrontends working with backend services" | other | contradicted | 3.4.4 (Notes); frontend/products-mf/src/App.js:2, 7-9; frontend/products-mf/src/ProductList.js:3, 10; frontend/shell-app/src/App.js:1-45 |
| 5 | frontend/shell-app/src/App.js:13 | "Construct API Gateway URL (port 8080)" (iframe URL belongs to API Gateway) | composition | contradicted | 3.4.5 #1; frontend/shell-app/src/App.js:14; docker-compose.yml:45-52, 66-69 |

## Observations

**1. README.md:2.** Compose declares one service per frontend application, built from its directory (docker-compose.yml:59-71), and build and deployment review recorded separate deployment for both through this path. Snapshot has no Codespaces configuration (`.devcontainer`), but shell was written for it: only constructs iframe URL when host ends in `app.github.dev` (frontend/shell-app/src/App.js:8-14). Codespaces part repeats in README.md:16 ("Everything runs in **GitHub Codespaces**"). Spring Boot and Eureka belong to backends, making no frontend-unit claim. As for "Microfrontends", two frontend units have own manifests, entries, builds and images (3.4.3), and shell embeds another application in iframe (3.4.4; 3.4.5 #1). Composition review leaves iframe target `Undetermined`, because only port 3001 links URL to products-mf; this limits connection between them rather than existence of separate units. Term repeats in README.md:107 ("frontend microfrontends"), whose other part is row 4. Sentence remains unsplit because both parts hold; Theme is first property mentioned, execution in Codespaces with Docker Compose.

**2. README.md:13.** Both units bear sentence's names (`shell-app` and `products-mf`, frontend/shell-app/package.json:2; frontend/products-mf/package.json:2). Shell role holds: application has navigation and embeds another in iframe on route `/products`, titled "Products Microfrontend" (frontend/shell-app/src/App.js:26-36). Products-mf is unaware of embedding: no composition or communication code (3.4.4, Notes). Same names repeat in command headings (README.md:64, 70) and access table as "Main Frontend (Shell)" and "Products MF" (README.md:82-83).

**3. README.md:16.** Sole automatically resolved frontend URL is iframe's: shell extracts Codespace name from own host and constructs `https://${codespaceName}-3001.app.github.dev` (frontend/shell-app/src/App.js:10-14), without fixed address. Resolution only occurs in Codespaces as sentence states; outside it `getApiUrl()` returns nothing and `src` becomes `"undefined"` (frontend/shell-app/src/App.js:6-18, 33). README.md:92 ("Codespaces exposes public URLs automatically") offers same explanation.

**4. README.md:107.** Neither application's active code calls backend services. Products-mf builds table from local `products.json` (frontend/products-mf/src/App.js:2, 7-9). Shell only has navigation and iframe (frontend/shell-app/src/App.js:1-45), and its nginx forwards nothing (frontend/shell-app/nginx.conf:8-10). Sole frontend code that would call gateway is `fetch` at frontend/products-mf/src/ProductList.js:3, 10, and component is not imported (3.4.4, Notes). Backends exist and start in same Compose, but no artifact connects units to them. "Frontend microfrontends" holds (row 1); "working with backend services" is refuted, hence `contradicted`.

**5. frontend/shell-app/src/App.js:13.** Comment sits above line constructing iframe URL, but URL uses port 3001 (frontend/shell-app/src/App.js:14). Compose publishes API Gateway on 8080 (docker-compose.yml:45-52) and products-mf on 3001 (docker-compose.yml:66-69). Function name `getApiUrl` (frontend/shell-app/src/App.js:6) repeats comment's idea. Composition review already notes difference in its Repository overview. Code embeds application on port 3001 rather than gateway.

## Summary

Claims: 5 (corroborated: 3, partial: 0, contradicted: 2, uncorroborated: 0). Themes: (structure: 1, composition: 2, build-deploy: 1, other: 1).
