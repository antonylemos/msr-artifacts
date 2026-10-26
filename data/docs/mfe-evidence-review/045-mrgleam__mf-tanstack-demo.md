---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
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
  date: 2026-10-21
---

# 045 — mrgleam/mf-tanstack-demo

## Repository overview

Module Federation chain complete through module loading:
- **Dependency:** `@originjs/vite-plugin-federation` in both applications (#1, #2).
- **Configuration:** shell declares remote `shop` (#3), shop declares itself/exposes own routes (#4).
- **Code:** shell imports remote module by name (#5), in cached/fallback module registry (#6), requesting module when creating router (#7).
- **Relationship:** active shell → shop relationship results (#11).

Ambiguity in next step. Shell reads `default.routes`, shop exports only named `routes` (#8). Module loaded without guarantee routes reach tree. Documentation claims they do, contradicted by artifacts (#18). History does not establish compatible version (#21).

Loader "retry logic" also contradicted (#20): attempts await same promise. History shows no version with working retry (#22).

Separate builds for both applications (#12, #13). No observed deployment: both Kong arrangements only forward to local servers.

## Observations

### 1. shell/package.json:16

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) declared in `devDependencies`.

**Interpretation:** Federation technology present in shell build.

### 2. shop/package.json:17

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) declared in `devDependencies`.

**Interpretation:** Federation technology present in shop build.

### 3. shell/vite.config.ts:1-34

**Observation:** `federation` declares remote `shop: 'http://localhost:3001/shop/assets/remoteEntry.js'`, sharing `react`, `react-dom` and `@tanstack/react-router`.

**Interpretation:** Host configuration declares remote/development location.

### 4. shop/vite.config.ts:1-30

**Observation:** `base: '/shop/'`. `federation` declares `name: 'shop'` and `filename: 'remoteEntry.js'`, exposing `./ShopRoutes` (`./src/routes/ShopRoutes.tsx`), sharing same libraries.

**Interpretation:** Shop configured as remote under own path, offering routes to host.

**Note:** Kong configurations (`kong-shell/kong.yml`, `kong-remote/kong.yml`) cited in build/deployment review table (3.4.6) are gateway routes, hence publication paths. Included in dimension 6, not here.

### 5. shell/src/moduleLoader.ts:130

**Observation:** `module: import('shop/ShopRoutes')` within `MODULE_CONFIGS.shop`.

**Interpretation:** Shell imports remote-exposed module by name.

### 6. shell/src/moduleLoader.ts:127-136

**Observation:** `MODULE_CONFIGS.shop` declares name `shop/ShopRoutes`, import, `retries: 3`, `retryDelay: 1000` and fallback `{ default: { routes: [] } }`.

**Interpretation:** Host declares used remote module/how to continue without it.

### 7. shell/src/router.tsx:49-58

**Observation:** `moduleLoader.loadModules([MODULE_CONFIGS.shop])`, called in router creation.

**Interpretation:** Host requests shop module when starting routing.

### 8. shell/src/router.tsx:61-68; shop/src/routes/ShopRoutes.tsx:49-53

**Observation:** Shell assigns `result.module.default.routes` to shop routes. Shop module exports named `routes` and `shopRouter` only, without default export.

**Interpretation:** Remote route integration ambiguous: module loads but requested shape absent, routes possibly using empty fallback.

### 9. shell; shell/package.json:1-9; shell/index.html:10-11; shell/src/main.tsx:6-8; shell/vite.config.ts:5-29

**Observation:** React application with own manifest, entry and Vite build.

**Interpretation:** Frontend unit with own boundary.

### 10. shop; shop/package.json:1-10; shop/index.html:10-11; shop/src/main.tsx:6-8; shop/vite.config.ts:5-25

**Observation:** React application with own manifest, entry and Vite build.

**Interpretation:** Frontend unit with own boundary, capable of running alone.

### 11. shell/src/moduleLoader.ts:127-130; shell/src/router.tsx:52, 64; shell/vite.config.ts:9-11; shop/vite.config.ts:6, 10-12

**Observation:** Shell requests `shop/ShopRoutes` during router initialization. Name, `remoteEntry.js` and `/shop/` path match shop configuration.

**Interpretation:** Active host → remote relationship, route integration ambiguous (#8).

### 12. shell/vite.config.ts:5-34; shell/package.json:7; kong-shell/kong.yml:3-9

**Observation:** Own configuration/`vite build`. Kong gateway only forwards `/` to shell local server, nothing packaging/publishing build.

**Interpretation:** Own build boundary without observed deployment.

### 13. shop/vite.config.ts:5-30; shop/package.json:7; kong-remote/kong.yml:8-13

**Observation:** Own configuration/`vite build` with `base: '/shop/'`. One Kong arrangement forwards `/shop` to shop local server.

**Interpretation:** Own build boundary/path without observed deployment.

### 14. README.md:1

**Observation:** "Microfrontend Monorepo with Vite, TanStack Router, and Module Federation".

**Interpretation:** Presents repository as micro-frontend monorepo with Module Federation. Claim corroborated.

### 15. README.md:7-8

**Observation:** "shell/ # Host app with layout & routing / shop/ # Remote microfrontend exposing routes".

**Interpretation:** Describes host/remote roles. Claim corroborated.

### 16. README.md:9-10

**Observation:** "kong-shell/ # Kong config for layout-controlled routing / kong-remote/ # Kong config for standalone remote access".

**Interpretation:** Describes two gateways, one shell-only, another also exposing remote. Claim corroborated.

### 17. README.md:53

**Observation:** "Shared layout with always-visible NavBar".

**Interpretation:** Claims shell provides common layout. Claim corroborated.

### 18. README.md:54

**Observation:** "Remote subroutes via Module Federation".

**Interpretation:** Claims remote subroutes enter shell. Shell-requested shape absent from shop module, making claim contradicted.

### 19. shell/src/moduleLoader.ts:1

**Observation:** "Module Federation Loader with caching, […] and error handling".

**Interpretation:** Claims loader caching/error handling. Claim corroborated.

### 20. shell/src/moduleLoader.ts:1

**Observation:** "retry logic".

**Interpretation:** Claims loader retries on loading failure. Attempts reawait same promise, making claim contradicted.

### 21. 04bfb96 2025-07-30 (shop/src/routes/ShopRoutes.tsx, shell/src/router.tsx); 5633835 2025-07-30 (shell/src/router.tsx, version absent); 1816f5b 2025-07-30 (shell/src/router.tsx, version absent); a717597 2025-08-01 (shell/src/router.tsx)

**Observation:** `ShopRoutes.tsx` unchanged since first commit, never default-exported. Shell `router.tsx` changed in four commits, prior versions unavailable.

**Interpretation:** Unknown whether earlier shell read named export. Past-only question: mismatch exists in snapshot.

### 22. a717597 2025-08-01 (shell/src/moduleLoader.ts)

**Observation:** Loader created in snapshot commit, sole version.

**Interpretation:** No stage with working retry. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (shell/package.json:16) | 1 technology | manifest | module-federation | technological | weak | declares #3 |
| 2 | 3.4.2 (shop/package.json:17) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 3 | 3.4.2 (shell/package.json:16, Evidence); 3.4.3 (shell, Markers and Build); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #9; configures #11 |
| 4 | 3.4.2 (shop/package.json:17, Evidence); 3.4.3 (shop, Markers and Build); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #2 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #10; configures #11 |
| 5 | 3.4.4 (shell/src/moduleLoader.ts:130) | 3 code | source code | module-federation | architectural | strong | implements #11 |
| 6 | 3.4.4 (shell/src/moduleLoader.ts:127) | 3 code | source code | module-federation | architectural | strong | implements #11 |
| 7 | 3.4.4 (shell/src/router.tsx:52) | 3 code | source code | module-federation | architectural | strong | implements #11 |
| 8 | 3.4.4 (shell/src/router.tsx:64) | 3 code | source code | module-federation | architectural | ambiguous | implements #11 |
| 9 | 3.4.3 (shell) | 4 structure | directory | — | architectural | moderate | — |
| 10 | 3.4.3 (shop) | 4 structure | directory | — | architectural | moderate | — |
| 11 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #9; links #10 |
| 12 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #9 |
| 13 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #10 |
| 14 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #9; corroborates #10; corroborates #1; corroborates #2 |
| 15 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #11; corroborates #4 |
| 16 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates kong-shell/kong.yml:3-9; corroborates kong-remote/kong.yml:8-13 |
| 17 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates shell/src/router.tsx:19-25 |
| 18 | 3.4.7 #5 | 7 documentation | documentation | module-federation | architectural | weak | contradicts shop/src/routes/ShopRoutes.tsx:49-53; contradicts shell/src/router.tsx:61-68 |
| 19 | 3.4.7 #6 | 7 documentation | comment | module-federation | technological | weak | corroborates #6; corroborates shell/src/moduleLoader.ts:33-40, 49-53, 61-74 |
| 20 | 3.4.7 #7 | 7 documentation | comment | module-federation | technological | weak | contradicts shell/src/moduleLoader.ts:42-47; contradicts #5 |
| 21 | 3.4.8 #1 | 8 history | history | module-federation | architectural | weak | explains #8; explains #18 |
| 22 | 3.4.8 #2 | 8 history | history | module-federation | technological | weak | explains #20 |

## Summary

Observations: 22. Dimensions (technology: 2, configuration: 2, code: 4, structure: 2, composition: 1, build-deploy: 2, documentation: 7, history: 2). Strength (strong: 5, moderate: 5, weak: 11, ambiguous: 1). Evidence (technological: 6, architectural: 16, context: 0).

