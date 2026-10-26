---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
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
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Repository overview

An academic project ("PC Build Planner") with four Next.js applications joined by Next.js
Multi-Zones: a `shell` and three zones (`catalog-mfe`, `builds-mfe`, `auth-mfe`), "stitched together
by path rewrites" (README.md:11). The repository also has three backend services and two BFFs
(README.md:9-10), which are not frontend units.

Composition occurs through server routes, rather than mounting on the page. The `shell` declares in `rewrites()`
that `/catalog`, `/builds` and `/auth` (and their subroutes) go to `CATALOG_URL`, `BUILDS_URL` and
`AUTH_URL`, together with each zone's `/<zona>-static/_next/*` assets (English translation of the path placeholder: zone) (shell/next.config.ts:6-29).
Each zone serves its assets with its own `assetPrefix` (catalog-mfe/next.config.ts:6,
builds-mfe/next.config.ts:6, auth-mfe/next.config.ts:6), to coexist under the shell's origin. The
`docker-compose.yml` connects the variables to the zone services (docker-compose.yml:200-202,
209-211). Each zone renders the entire page with its own layout. None of the relationship types
`host → remote`, `root-config → application`, `application → custom-element` or
`page → embedded-frontend` describes this entry method, so the shell's three relationships
are marked `other`.

The second connection is the session. `auth-mfe` writes the `jwt` cookie with `path=/` after
login and registration (auth-mfe/src/lib/auth-client.ts:20-23, auth-mfe/src/app/auth/login/page.tsx:41,
auth-mfe/src/app/auth/register/page.tsx:46), and the other three apps read it in `Header`
(shell/src/components/Header.tsx:12, catalog-mfe/src/components/Header.tsx:12,
builds-mfe/src/components/Header.tsx:12), reading it again when the window gains focus (`focus`, line 16
in all three files). This works because the zones share the shell's origin.

What did not become a relationship: navigation between zones uses full-page links (`<a href>` in
shell/src/components/Header.tsx:32, 35, 51 and in the `sections` list in shell/src/app/page.tsx:12, 19,
26), which is not a relationship type. `Header`, `Footer` and `src/lib/{auth,auth-client,bff,jwt}.ts`
are copies in each app, rather than imports between units. Communication with `web-bff`/`mobile-bff` is with
the backend, not between frontends.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | auth-mfe | other | source → target | other | Yes | Yes | shell/next.config.ts:9, 23-28 (`AUTH_URL`; `/auth`, `/auth/:path+`, `/auth-static/_next/:path+`); docker-compose.yml:202, 211 (`AUTH_URL: http://auth-mfe:3003`); auth-mfe/next.config.ts:6 (`assetPrefix: "/auth-static"`) | shell/next.config.ts:6 |
| 2 | shell | builds-mfe | other | source → target | other | Yes | Yes | shell/next.config.ts:8, 17-22 (`BUILDS_URL`; `/builds`, `/builds/:path+`, `/builds-static/_next/:path+`); docker-compose.yml:201, 210 (`BUILDS_URL: http://builds-mfe:3002`); builds-mfe/next.config.ts:6 (`assetPrefix: "/builds-static"`) | shell/next.config.ts:6 |
| 3 | shell | catalog-mfe | other | source → target | other | Yes | Yes | shell/next.config.ts:7, 11-16 (`CATALOG_URL`; `/catalog`, `/catalog/:path+`, `/catalog-static/_next/:path+`); docker-compose.yml:200, 209 (`CATALOG_URL: http://catalog-mfe:3001`); catalog-mfe/next.config.ts:6 (`assetPrefix: "/catalog-static"`) | shell/next.config.ts:6 |
| 4 | auth-mfe | builds-mfe | communication | source → target | other | Yes | Yes | — | auth-mfe/src/lib/auth-client.ts:20 |
| 5 | auth-mfe | catalog-mfe | communication | source → target | other | Yes | Yes | — | auth-mfe/src/lib/auth-client.ts:20 |
| 6 | auth-mfe | shell | communication | source → target | other | Yes | Yes | — | auth-mfe/src/lib/auth-client.ts:20 |

## Observations

**1. shell → auth-mfe.** The shell forwards `/auth`, `/auth/:path+` and the `/auth-static/_next/:path+` assets
to `AUTH_URL` (shell/next.config.ts:9, 23-28). The target was resolved through three
matches: `AUTH_URL: http://auth-mfe:3003` points to the `auth-mfe` service
(docker-compose.yml:211, also as a build arg in docker-compose.yml:202), built from
`./auth-mfe` (docker-compose.yml:158); the `/auth-static` prefix is the zone's `assetPrefix`
(auth-mfe/next.config.ts:6); and the `/auth` route exists in `auth-mfe/src/app/auth/page.tsx`. Type and
mechanism are `other`: the shell neither loads zone modules nor registers the zone in an orchestrator. It
forwards requests from a path to another application, which responds with the entire page (Next.js
Multi-Zones, routing through `rewrites`). Direction follows forwarding.

**2. shell → builds-mfe.** The same pattern with `/builds`, `/builds/:path+` and `/builds-static/_next/:path+`
to `BUILDS_URL` (shell/next.config.ts:8, 17-22). `BUILDS_URL: http://builds-mfe:3002`
(docker-compose.yml:201, 210) points to the service built from `./builds-mfe`
(docker-compose.yml:184), whose `assetPrefix` is `/builds-static` (builds-mfe/next.config.ts:6), and the
`/builds` route exists in `builds-mfe/src/app/builds/page.tsx`.

**3. shell → catalog-mfe.** The same pattern with `/catalog`, `/catalog/:path+` and
`/catalog-static/_next/:path+` to `CATALOG_URL` (shell/next.config.ts:7, 11-16).
`CATALOG_URL: http://catalog-mfe:3001` (docker-compose.yml:200, 209) points to the service
built from `./catalog-mfe` (docker-compose.yml:171), whose `assetPrefix` is `/catalog-static`
(catalog-mfe/next.config.ts:6), and the `/catalog` route exists in `catalog-mfe/src/app/catalog/page.tsx`.
The defaults at `localhost:3001-3003` (shell/next.config.ts:7-9) only corroborate the three
resolutions.

**4. auth-mfe → builds-mfe.** `auth-mfe` writes the `jwt` cookie with `path=/`
(auth-mfe/src/lib/auth-client.ts:20-23; name in auth-mfe/src/lib/jwt.ts:7) after login and
registration (auth-mfe/src/app/auth/login/page.tsx:41, auth-mfe/src/app/auth/register/page.tsx:46).
`builds-mfe` reads the cookie in `Header` (builds-mfe/src/components/Header.tsx:12) and before creating
a build, sending users to `/auth/login` when there is no session
(builds-mfe/src/app/builds/new/new-build-form.tsx:59-62). Mechanism `other`: this is state
shared through a cookie under the same origin, rather than event exchange. Reading sees the cookie only because
the shell joins the zones under one origin (relationships 1-3). Each app's logout deletes the cookie
(`clearJwtCookie` in builds-mfe/src/components/Header.tsx:21, and the same in the other three `Header.tsx` files).
The source code review did not record those lines, so direction remains that of writing the
session, the only recorded construct.

**5. auth-mfe → catalog-mfe.** The same session: `catalog-mfe` reads the cookie in `Header`
(catalog-mfe/src/components/Header.tsx:12) to display the user and logout button. The same
observation about `clearJwtCookie` applies (catalog-mfe/src/components/Header.tsx:21).

**6. auth-mfe → shell.** The same session: the shell reads the cookie in `Header`
(shell/src/components/Header.tsx:12). The same observation about `clearJwtCookie` applies
(shell/src/components/Header.tsx:21).

## Summary

Relationships: 6 (other: 3, communication: 3). Active: 6. Target outside the snapshot: 0.
Units without a relationship: none.

