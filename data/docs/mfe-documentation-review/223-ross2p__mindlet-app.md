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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 223 — ross2p/mindlet-app

## Repository overview

Project documentation is sole English `README.md`, only `documentation` file in `artifacts.csv`. Presents Mindlet superproject: five Next.js micro-frontends (dashboard, auth, profile, study, decks), each own `basePath`, plus libraries `@ross2p/shared`/`@ross2p/types` (README.md:3). Describes zone/library submodule layout, nginx/`compose.yml` local environment (README.md:5-11), running Docker ensemble behind gateway at `localhost:8080` (README.md:26-37), or without Docker, terminal per zone at ports 3001-3005 (README.md:39-51). Also GitHub Packages publishing/consuming `@ross2p/shared` (README.md:53-74), updating submodule (README.md:76-84). Sole `doc-*` occurrence in `matches.csv`: `doc-mfe-term` README.md:3, table row 1.

README generally matches previous reviews, with fundamental limitation: five zones/two libraries are submodules with own repositories (.gitmodules:1-21), directories `apps/*`/`libs/*` absent. Hence reviews 3.4.2 through 3.4.6 have no rows; only versioned orchestration verifiable: `compose.yml`, nginx configurations, `start-local-dev.sh`. Zone/library internals (Next.js version, `basePath`, scripts, `.npmrc`, `file:` dependency) lack artifacts. Sole contradiction concerns Compose zone startup (row 9), already in build and deployment review.

Excluded command blocks: README.md:15-24 (clone submodules), README.md:30-32 (`docker compose up`), README.md:59-65 and README.md:69-72 (registry configuration/`npm publish`), README.md:78-84 (submodule update), run instructions with surrounding text in rows 4, 5, 11; title "Mindlet — superproject" (README.md:1). Also read previously cited artifact comments. `compose.yml` header (compose.yml:1-12): "frontend stack (Next.js micro-frontends)" repeats rows 1/2; build command compose.yml:3-4 instruction; `localhost:8080` entry (compose.yml:6) repeats 8; direct zone access (compose.yml:7-8) in row 10 paragraph; API note row 13. `start-local-dev.sh` Ukrainian messages: "Запуск Mindlet локально (без Docker)" (English translation: "Run Mindlet locally without Docker") (start-local-dev.sh:56), "Запустіть кожен додаток у окремому терміналі" (English translation: "Run each application in separate terminal") (start-local-dev.sh:75), repeating row 10; others only check submodules/ports. Frontend nginx configurations (`infra/nginx/nginx.conf`, `infra/nginx/nginx.conf.local`, `infra/nginx/routing-map.frontend.conf`, `config/nginx/nginx.conf`) without comments. `infra/nginx/api-gateway.conf:1`/`infra/nginx/api-gateway.host.conf:1-5` comments concern backend API gateway; latter says "Frontends use NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1" (infra/nginx/api-gateway.host.conf:5), same default Compose passes zones (compose.yml:20), environment-variable detail excluded. Skills in `.agents/skills/` (with `skills-lock.json`) third-party coding-agent material unrelated to project.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "Micro-frontends: **dashboard**, **auth**, **profile**, **study**, **decks** [...] plus **`@ross2p/shared`** and **`@ross2p/types`**" | structure | corroborated | 3.4.3 (Notes: five zones as submodules `apps/*`); 3.4.5 (Repository overview); .gitmodules:1-21; compose.yml:15-108; infra/nginx/nginx.conf:14-18 |
| 2 | README.md:3 | "Next.js 16" | structure | partial | compose.yml:20, 27 |
| 3 | README.md:3 | "`basePath` per zone" | composition | partial | 3.4.5 (Repository overview); compose.yml:8; infra/nginx/nginx.conf.local:35-68; config/nginx/nginx.conf:38-39 |
| 4 | README.md:7 | "`apps/*` — submodule repos (`mindlet-dashboard`, `mindlet-app-auth`, …)" | structure | corroborated | 3.4.3 (Notes); .gitmodules:4-18 |
| 5 | README.md:8 | "`@ross2p/shared` (GitHub Packages name under scope `ross2p`)" | build-deploy | uncorroborated | — |
| 6 | README.md:10 | "`infra/nginx` — dev reverse proxy" | composition | corroborated | 3.4.5 (Repository overview); 3.4.6 (Repository overview); compose.yml:110-124; infra/nginx/nginx.conf:14-66 |
| 7 | README.md:11 | "`compose.yml` — one-command local stack (Node + nginx)" | build-deploy | partial | 3.4.6 (Repository overview); compose.yml:14-127 |
| 8 | README.md:34-35 | "Gateway: **http://localhost:8080** [...] Zones: `/dashboard/`, `/auth/login`, `/profile/me`, `/study/`, `/decks/`" | composition | corroborated | 3.4.5 (Repository overview); compose.yml:112-113; infra/nginx/nginx.conf:29-66; infra/nginx/routing-map.frontend.conf:1-9 |
| 9 | README.md:37 | "Each service runs `npm install` then `npm run dev` inside `node:20-alpine` with the repo mounted at `/workspace`." | build-deploy | contradicted | 3.4.6 (Repository overview); compose.yml:15-32 |
| 10 | README.md:41-49 | "In separate terminals, from each app (after `npm install`)" (table: dashboard 3001, auth 3002, profile 3003, study 3004, decks 3005) | independence | partial | infra/nginx/nginx.conf.local:16-20; start-local-dev.sh:75-90 |
| 11 | README.md:67 | "In consuming apps, `.npmrc`" (zones consume `@ross2p/shared` from GitHub Packages) | structure | uncorroborated | — |
| 12 | README.md:74 | "For local monorepo development, apps use `\"@ross2p/shared\": \"file:../../libs/shared\"`." | structure | uncorroborated | — |
| 13 | compose.yml:10 | "API (optional, run separately in mindlet-api)" | other | partial | compose.yml:14-127; compose.yml:19-20 |

## Observations

**1. README.md:3.** Names five micro-frontends/two libraries as superproject parts. Snapshot confirms set: seven submodules, five in `apps/`, two `libs/` (.gitmodules:1-21); Compose service per zone built from submodule directory (compose.yml:15-18, analogous through compose.yml:91-94); gateway upstream per zone (infra/nginx/nginx.conf:14-18). Structural review counts 0 snapshot applications, Notes attributing `frontend_units: 5` difference to external zones; composition reads route composition with units in other repositories. Zone contents unobservable. Compose header repeats ("Next.js micro-frontends", compose.yml:1), README.md:8-9 places libraries `libs/shared`/`libs/types`, matching .gitmodules:1-3, 19-20.

**2. README.md:3.** Says Next.js 16 zones. Without snapshot `package.json` (3.4.2, Notes), version lacks artifact. Compose indicates Next.js without naming configuration: each zone receives build argument `NEXT_PUBLIC_API_BASE_URL`, variable `NEXT_TELEMETRY_DISABLED` (compose.yml:20, 27, likewise other services), Next.js conventions. Framework supported by indications; "16" not. Header "Next.js micro-frontends" (compose.yml:1) repeats without version.

**3. README.md:3.** Each zone own `basePath`, serving pages under prefix. Next.js configurations in inaccessible submodules, as composition review records. Three consistent points: Compose direct dashboard comment `http://localhost:3001/dashboard/` (compose.yml:8); Docker-free nginx variant forwards prefixes unchanged, e.g. `/dashboard/` to `http://mindlet_dashboard/dashboard/` (infra/nginx/nginx.conf.local:38-39, analogous through :66-67); `config/nginx/nginx.conf` likewise `proxy_pass` without URI (config/nginx/nginx.conf:38-39). But `infra/nginx/nginx.conf`, mounted by Compose (compose.yml:115), uses trailing-slash `proxy_pass http://mindlet_dashboard/;` (infra/nginx/nginx.conf:36-37, analogous through :64-65), removing prefix before forwarding. Without zone Dockerfiles/configuration, cannot tell whether refutes `basePath` or reflects different build. README.md:51 repeats ("hit ports directly with the correct `basePath` URLs").

**4. README.md:7.** Each zone own repository included as submodule. `.gitmodules` confirms five paths `apps/<zona>` (English explanation: zone placeholder), URLs `mindlet-dashboard`, `mindlet-app-auth`, `mindlet-profile`, `mindlet-study`, `mindlet-decks` (.gitmodules:4-18), structural Notes same. "Updating a submodule" (README.md:76-84) shows corresponding flow: update zone in own repository, record new commit in superproject. README.md:9 says same for `libs/types` ("existing submodule"), checked .gitmodules:1-3; library not frontend unit, cited without row.

**5. README.md:8.** `@ross2p/shared` would publish on GitHub Packages under `ross2p`. README.md:53-65 repeats/details: package published from repository `mindlet-shared`, actual `libs/shared` submodule URL (.gitmodules:19-21), with `npm publish`/token. But no library `package.json`, `.npmrc`, publishing workflow; build and deployment review notes publication documentation only. Neither confirmed nor refuted.

**6. README.md:10.** `infra/nginx` would be development reverse proxy. Compose starts nginx mounting `infra/nginx/nginx.conf`, `proxy.conf`, `logging.conf`, `routing-map.frontend.conf`, depending on five zones (compose.yml:110-124); `nginx.conf` forwards prefix to zone upstream (infra/nginx/nginx.conf:14-18, 36-66). Composition/build and deployment overviews same. "dev" matches use: no off-local-machine deployment indication. Directory also backend API gateway files (`api-gateway.conf`, `api-gateway.host.conf`, `routing-map.api.conf`), not Compose-mounted.

**7. README.md:11.** One-command Compose ensemble, "Node + nginx". Nginx holds (`image: nginx:1.27-alpine`, compose.yml:111), five zones/gateway indeed one file (compose.yml:14-127). Node lacks artifact: zones built by own submodule `Dockerfile` (compose.yml:16-18 and analogous), outside snapshot per build and deployment review. Compose header suggests another command, `docker compose build --parallel 1 && docker compose up` (compose.yml:3-4).

**8. README.md:34-35.** Single entry `localhost:8080`, each zone under prefix. Nginx publishes port 8080 (compose.yml:112-113), redirects `/` to `/dashboard/` (infra/nginx/nginx.conf:29-31), forwards `/dashboard/`, `/auth/`, `/profile/`, `/study/`, `/decks/` to zone upstreams (infra/nginx/nginx.conf:36-66); map infra/nginx/routing-map.frontend.conf:1-9 repeats. `/auth` without slash redirects `/auth/login` (infra/nginx/nginx.conf:40-42), matching README; `/profile/me` is unverifiable zone page, but `/profile/` routed (infra/nginx/nginx.conf:50-52). README.md:51 ("Use `compose.yml` / nginx for a single entrypoint"), comment "Entrypoint: http://localhost:8080" (compose.yml:6) repeat.

**9. README.md:37.** Says services run `npm install` then `npm run dev` in `node:20-alpine`, repository mounted at `/workspace`. Compose does not: each zone `build` with `context: apps/<zona>` and `dockerfile: Dockerfile` (compose.yml:16-18), no `image`, `command`, `volumes`; only nginx volumes (compose.yml:114-118). Build and deployment review records same contradiction. Only service per zone confirmed; Dockerfile execution unobservable.

**10. README.md:41-49.** Without Docker, zones run independently, own terminals/ports (3001 through 3005). Two consistent artifacts: local nginx upstream per zone to `localhost:3001` through `localhost:3005` (infra/nginx/nginx.conf.local:16-20); `start-local-dev.sh` instructs `npm install && npm run dev` per `apps/<zona>`, terminal per zone, same ports (start-local-dev.sh:75-90). Zone `dev` scripts/configured ports inside submodules. README.md:51 ("or hit ports directly"), Compose direct access (compose.yml:7-8) repeat access without gateway.

**11. README.md:67.** Consuming applications of `@ross2p/shared` would configure GitHub Packages in `.npmrc`. Neither applications nor `.npmrc` in snapshot, previous reviews record no `@ross2p/shared` dependency. Cannot determine any zone consuming this way, or count.

**12. README.md:74.** Local development zones would reference library through `file:../../libs/shared`. Path fits layout (`apps/<zona>`/`libs/shared`, .gitmodules:4-21), but zone `package.json` files absent; composition review records dependency unverifiable. Text calls set "monorepo", despite separate zone repositories joined as submodules (row 4); describes superproject local checkout without judgment change.

**13. compose.yml:10.** Comment says API optional, runs separately in `mindlet-api`. No Compose backend service: five zones/nginx only (compose.yml:14-127), each zone API URL build argument defaulting to `http://localhost:4000/api/v1` (compose.yml:19-20), confirming backend outside stack. Functioning without API ("optional") unverifiable without code. Commands compose.yml:11-12 target `../mindlet-api`, outside snapshot.

## Summary

Claims: 13 (corroborated: 4, partial: 5, contradicted: 1, uncorroborated: 3). Themes: (structure: 5, composition: 3, build-deploy: 3, independence: 1, other: 1).
