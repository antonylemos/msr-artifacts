---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
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

# 223 — ross2p/mindlet-app

## Repository overview

Mindlet superproject, a personal product: five Next.js zones (dashboard, auth, profile, study and decks) and two libraries (`@ross2p/shared` and `@ross2p/types`), all Git submodules with own repositories (.gitmodules:1-21). Directories `apps/*` and `libs/*` absent from snapshot. Only local orchestration versioned: `compose.yml`, nginx configurations in `infra/nginx/` and `config/nginx/`, `start-local-dev.sh` and agent skills in `.agents/`.

Therefore dimensions 1 to 6 remain empty. Dependency review has no dependency (no `package.json`), structural review has empty "Units" table, source review no construct, composition and build/deployment reviews no relationship or application. All observations come from documentation (#1 to #13) and history (#14, #15), all `weak`: no observation in this file itself configures, uses or links units.

Chain used by classification (`MFE-implemented`, `multi-zones`, five `multi-repo` units) resides in orchestration artifacts appearing here only as claim targets:
- **Units:** each zone submodule has own repository (#4, corroborated by .gitmodules:4-18), with own compose service built from submodule directory (#1, compose.yml:15-108).
- **Composition:** nginx gateway publishes port 8080, defining upstream per zone and forwarding each prefix (`/dashboard/`, `/auth/`, `/profile/`, `/study/`, `/decks/`) to its upstream (#6, #8; compose.yml:112-113, infra/nginx/nginx.conf:14-66, infra/nginx/routing-map.frontend.conf:1-9).
- **Independence:** without Docker, each zone runs in own terminal/port (3001 to 3005), behind local nginx variant (#10).

None of these files became configuration observation. `.gitmodules` records repositories in checkout (structure); `compose.yml` declares services/builds/ports; `nginx.conf` and `routing-map.frontend.conf` declare upstreams and `location`, treated by step 2 as deployment (dimension 6). None declares federation builder, remote, exposed module, shared dependency, remote URL, import map or application registration. Since 3.4.6 has no row (zones are not applications in this snapshot), dimension 6 also has no observation. Mechanism linking zones present in snapshot only as claim target.

Misleading or open signals:
- **Per-zone `basePath`:** README says each zone has own `basePath` (#3). Local variant and old nginx configuration forward prefix, but compose-mounted `nginx.conf` removes it (`proxy_pass` with trailing slash). History shows three files from different stages, with `config/nginx/` configuration intact remnant of first stage (#14), but does not establish whether prefix removal contradicts `basePath`, located in submodules.
- **How compose starts zones:** README describes `node:20-alpine` with `npm run dev` and mounted repository; compose builds each zone from submodule Dockerfile without volume (#9, contradicted; #7, partial). History compatible with README describing earlier compose without showing confirming contents (#15).
- **Shared library:** publication of `@ross2p/shared` to GitHub Packages and consumption through `.npmrc` or `file:` (#5, #11, #12) have no snapshot artifact and are not composition relationship (3.4.5, Reading).
- **Next.js:** framework has only compose indications (argument `NEXT_PUBLIC_API_BASE_URL` and `NEXT_TELEMETRY_DISABLED`); version 16 has no artifact (#2).
- **Backend:** API resides in repository `mindlet-api`, outside stack (#13).
- **Language:** GitHub labels "Python" because of skill scripts in `.agents/`, unrelated to project.

## Observations

### 1. README.md:3

**Observation:** "Micro-frontends: **dashboard**, **auth**, **profile**, **study**, **decks** (Next.js 16, `basePath` per zone), plus **`@ross2p/shared`** and **`@ross2p/types`**." Compose header repeats "Next.js micro-frontends" (compose.yml:1), and README.md:8-9 locate libraries in `libs/shared` and `libs/types`. Review marks claim corroborated by .gitmodules:1-21, five compose.yml:15-108 services and five infra/nginx/nginx.conf:14-18 upstreams.

**Interpretation:** Claim addresses units as group: five microfrontends and two libraries form product.

### 2. README.md:3

**Observation:** "Next.js 16". No `package.json` in snapshot. Compose passes build argument `NEXT_PUBLIC_API_BASE_URL` and variable `NEXT_TELEMETRY_DISABLED` to each zone (compose.yml:20, 27, same in other services), Next.js conventions. Review marks claim partial: framework indicated, version unconfirmed.

**Interpretation:** Claim only names zone framework/version.

### 3. README.md:3

**Observation:** "`basePath` per zone". README.md:51 repeats ("hit ports directly with the correct `basePath` URLs"). Compose comment indicates direct access at `http://localhost:3001/dashboard/` (compose.yml:8); infra/nginx/nginx.conf.local:38-39 forwards `/dashboard/` to `http://mindlet_dashboard/dashboard/`, and config/nginx/nginx.conf:38-39 uses `proxy_pass` without URI, preserving prefix. Compose-mounted file uses `proxy_pass http://mindlet_dashboard/;` (infra/nginx/nginx.conf:36-37 and counterparts), removing prefix. Review marks claim partial.

**Interpretation:** Claim says each zone serves pages under own prefix, the means of composing Next.js zones under same origin.

### 4. README.md:7

**Observation:** "`apps/*` — submodule repos (`mindlet-dashboard`, `mindlet-app-auth`, …)". `.gitmodules` declares five paths `apps/<zona>` (English translation: apps/zone) with URLs `mindlet-dashboard`, `mindlet-app-auth`, `mindlet-profile`, `mindlet-study` and `mindlet-decks` (.gitmodules:4-18). README.md:76-84 shows updating zone in its repository and recording new commit in superproject. Review marks claim corroborated.

**Interpretation:** Claim says each zone has own repository, joined to superproject through submodule.

### 5. README.md:8

**Observation:** "`libs/shared` — `@ross2p/shared` (GitHub Packages name under scope `ross2p`)". README.md:53-65 details publication from repository `mindlet-shared`, URL of submodule `libs/shared` (.gitmodules:19-21). Snapshot lacks library `package.json`, `.npmrc` and publication workflow. Review marks claim uncorroborated.

**Interpretation:** Claim describes library publication to external registry, neither frontend unit nor composition mechanism.

### 6. README.md:10

**Observation:** "`infra/nginx` — dev reverse proxy". Compose starts nginx mounting `infra/nginx/nginx.conf`, `proxy.conf`, `logging.conf` and `routing-map.frontend.conf`, depending on five zones (compose.yml:110-124); `nginx.conf` defines upstream per zone, forwarding each prefix (infra/nginx/nginx.conf:14-66). Folder also contains backend API gateway (`api-gateway.conf`, `api-gateway.host.conf`), not mounted by compose. Review marks claim corroborated.

**Interpretation:** Claim only names mechanism, development reverse proxy, without identifying what lies behind it.

### 7. README.md:11

**Observation:** "`compose.yml` — one-command local stack (Node + nginx)". Compose combines five zones and gateway in single file (compose.yml:14-127); nginx image `nginx:1.27-alpine` (compose.yml:111). Each zone built from own submodule `Dockerfile` (compose.yml:16-18 and counterparts), absent from snapshot. Compose header gives different command, `docker compose build --parallel 1 && docker compose up` (compose.yml:3-4). Review marks claim partial.

**Interpretation:** Claim says zones/gateway start together with single command as local stack.

### 8. README.md:34-35

**Observation:** "Gateway: **http://localhost:8080** (nginx maps host 8080 → container 80)" and "Zones: `/dashboard/`, `/auth/login`, `/profile/me`, `/study/`, `/decks/`". Nginx publishes `8080:80` (compose.yml:112-113), redirects `/` to `/dashboard/` and `/auth` to `/auth/login`, forwarding each prefix to zone upstream (infra/nginx/nginx.conf:29-66); infra/nginx/routing-map.frontend.conf:1-9 repeats mapping. README.md:51 and comment "Entrypoint: http://localhost:8080" (compose.yml:6) repeat idea. Review marks claim corroborated.

**Interpretation:** Claim says zones under own prefixes behind single entry.

### 9. README.md:37

**Observation:** "Each service runs `npm install` then `npm run dev` inside `node:20-alpine` with the repo mounted at `/workspace`." In compose each zone has `build` with `context: apps/<zona>` and `dockerfile: Dockerfile` (compose.yml:15-32 and counterparts), without `image`, `command` or `volumes`; only service with volumes is nginx (compose.yml:114-118). Review marks claim contradicted.

**Interpretation:** Claim says each zone runs in own container as development server over mounted checkout.

### 10. README.md:41-49

**Observation:** "In separate terminals, from each app (after `npm install`)", with table dashboard 3001, auth 3002, profile 3003, study 3004 and decks 3005. infra/nginx/nginx.conf.local:16-20 points upstream per zone to `localhost:3001` through `localhost:3005`, and start-local-dev.sh:75-90 instructs running `npm install && npm run dev` in each `apps/<zona>`, one terminal per zone at same ports. README.md:51 ("or hit ports directly") and compose.yml:7-8 repeat each zone accessible without gateway. Review marks claim partial.

**Interpretation:** Claim says each zone runs alone in own process/port.

### 11. README.md:67

**Observation:** "In consuming apps, `.npmrc`:", followed by registry `@ross2p:registry=https://npm.pkg.github.com` (README.md:69-72). Neither applications nor `.npmrc` present in snapshot. Review marks claim uncorroborated.

**Interpretation:** Claim describes how zones would obtain shared library from package registry, package dependency rather than composition relationship.

### 12. README.md:74

**Observation:** "For local monorepo development, apps use `\"@ross2p/shared\": \"file:../../libs/shared\"`." Path consistent with layout `apps/<zona>` and `libs/shared` (.gitmodules:4-21), but zone `package.json` files absent from snapshot. Review marks claim uncorroborated.

**Interpretation:** Claim describes how zones point to library in local checkout, package dependency rather than composition relationship.

**Note:** "monorepo" describes local superproject checkout; zones separate repositories joined by submodules (#4).

### 13. compose.yml:10

**Observation:** "API (optional, run separately in mindlet-api)", with compose.yml:11-12 commands pointing to `../mindlet-api`. Compose declares only five zones and nginx (compose.yml:14-127); each zone receives API URL as build argument, default `http://localhost:4000/api/v1` (compose.yml:19-20). Review marks claim partial.

**Interpretation:** Claim locates backend outside stack in another repository.

### 14. 404dce1 2026-05-03 (infra/nginx/nginx.conf, infra/nginx/proxy.conf); 4128490 2026-05-03 (config/nginx/nginx.conf, config/nginx/proxy.conf); 2581f29 2026-05-23 (infra/nginx/nginx.conf); e98db1d 2026-08-17 (infra/nginx/nginx.conf); b1c17af 2026-09-19 (infra/nginx/nginx.conf.local)

**Observation:** `config/nginx/nginx.conf` has same object (`fd6ada3`) as `infra/nginx/nginx.conf` in `404dce1`, commit creating zone submodules; `4128490` moves both files to `config/nginx/`, unchanged afterward. Compose-mounted `infra/nginx/nginx.conf` recreated in `2581f29` and changed in `e98db1d`, producing snapshot object. `infra/nginx/nginx.conf.local` appears only in `b1c17af`. Intermediate version contents absent from clone. Review marks point clarified.

**Interpretation:** Prefix divergence comes from different stages: prefix-preserving configuration in `config/nginx/` is unmounted first-stage remnant; mounted configuration later; local variant newest. Whether prefix removal contradicts zone `basePath` remains open because `basePath` resides in submodules.

### 15. 404dce1 2026-05-03 (README.md, compose.yml); 77a6cf8 2026-05-03 (README.md); 2581f29 2026-05-23 (compose.yml); 4f2dbca 2026-05-23 (compose.yml); e98db1d 2026-08-17 (compose.yml); 91bfed2 2026-08-29 (README.md)

**Observation:** README and compose originate together in `404dce1`. After `77a6cf8`, README retains same object while `compose.yml` changes three times (`2581f29`, `4f2dbca`, `e98db1d`, last with snapshot object), with messages announcing compose "refresh" and separation of local stack. `91bfed2`, only later commit changing README, announces only auth zone repository replacement. Older versions of both files absent from clone. Review marks point inconclusive.

**Interpretation:** History compatible with README.md:37 describing earlier compose but does not show it. Question concerns only past: snapshot compose builds each zone from submodule Dockerfile.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates .gitmodules:1-21; corroborates compose.yml:15-108; corroborates infra/nginx/nginx.conf:14-18 |
| 2 | 3.4.7 #2 | 7 documentation | documentation | — | technological | weak | partially corroborates compose.yml:20; partially corroborates compose.yml:27 |
| 3 | 3.4.7 #3 | 7 documentation | documentation | multi-zones | architectural | weak | partially corroborates compose.yml:8; partially corroborates infra/nginx/nginx.conf.local:35-68; partially corroborates config/nginx/nginx.conf:38-39 |
| 4 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates .gitmodules:4-18 |
| 5 | 3.4.7 #5 | 7 documentation | documentation | — | context | weak | — |
| 6 | 3.4.7 #6 | 7 documentation | documentation | — | technological | weak | corroborates compose.yml:110-124; corroborates infra/nginx/nginx.conf:14-66 |
| 7 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | partially corroborates compose.yml:14-127 |
| 8 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates compose.yml:112-113; corroborates infra/nginx/nginx.conf:29-66; corroborates infra/nginx/routing-map.frontend.conf:1-9 |
| 9 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | contradicts compose.yml:15-32 |
| 10 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | partially corroborates infra/nginx/nginx.conf.local:16-20; partially corroborates start-local-dev.sh:75-90 |
| 11 | 3.4.7 #11 | 7 documentation | documentation | — | context | weak | — |
| 12 | 3.4.7 #12 | 7 documentation | documentation | — | context | weak | — |
| 13 | 3.4.7 #13 | 7 documentation | comment | — | context | weak | partially corroborates compose.yml:14-127; partially corroborates compose.yml:19-20 |
| 14 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #3 |
| 15 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #7; explains #9 |

## Summary

Observations: 15. Dimensions (technology: 0, configuration: 0, code: 0, structure: 0, composition: 0, build-deploy: 0, documentation: 13, history: 2). Strength (strong: 0, moderate: 0, weak: 15, ambiguous: 0). Evidence (technological: 2, architectural: 7, context: 6).

