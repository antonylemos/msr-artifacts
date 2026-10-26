---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
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

# 013 — nikJovanovic/ita-vaje

## Repository overview

Academic project ("PC Build Planner") with four Next.js applications (`shell`, `catalog-mfe`, `builds-mfe` and `auth-mfe`) joined through Next.js Multi-Zones alongside three services/two BFFs. Composition uses only Next.js resources, depending on no dependency-catalog technology. Hence no dependency observation.

Architecture-supporting chain is server routing rather than page mounting:
- **Structure:** four apps have own manifest, entry and build (#7, #8, #10, #13).
- **Configuration:** shell `rewrites()` forwards `/catalog`, `/builds` and `/auth` and `/<zona>-static/_next/*` assets to `CATALOG_URL`, `BUILDS_URL` and `AUTH_URL` (#2). English explanation: original path placeholder means zone. Compose `shell` service assigns zone-service addresses to variables at build/runtime (#1).
- **Code:** `rewrites()` line recorded in 3.4.4 (#4), inside #2 block.
- **Relationships:** three active shell → zone relationships result (#16 through #18). Each zone responds with full page/own layout.

Second link is session: `auth-mfe` writes `jwt` cookie with `path=/` (#5), other three apps reading it in `Header`. Gives relationships #19 through #21, working only because shell puts zones under same origin.

Per-app build/deployment separate (#22 through #25): own Dockerfile, image, compose service and CI workflow. No image publication/versioning; shell build receives zone addresses.

Misleading/excluded signals:
- Five backend directories/root have manifests, Dockerfiles/workflows without being frontend (#6, #9, #11, #12, #14, #15).
- Sole mined `<script src>` is backend service Swagger UI (#3).
- Zone `assetPrefix` and shell Dockerfile `ARG` produce no configuration observation (see #2 Note).

Documentation confirms general form: four zones, `rewrites`, cookie session, independent apps/deployment (#28 through #30, #32, #33, #36, #38). Three mismatches:
- `.github/copilot-instructions.md` describes one `frontend/` (#26). History shows it stopped before zone split (#40).
- "Shared" for shadcn preset, `src/lib/bff.ts` and Header/Footer (#31, #35, #39) describes identical per-app copies rather than common code. Text/copies originated in same commit (#41).
- "Every MFE fetches from `web-bff`" excludes shell (#34). Shell `bff.ts` never used (#42).

No snapshot ambiguity remains.

## Observations

### 1. docker-compose.yml:196-217

**Observation:** Service `shell` builds from `./shell` with build args `CATALOG_URL: http://catalog-mfe:3001`, `BUILDS_URL: http://builds-mfe:3002` and `AUTH_URL: http://auth-mfe:3003` (199-202). Same three variables recur in `environment` (209-211). Publishes port 3000, depending on `catalog-mfe`, `builds-mfe` and `auth-mfe` (214-217).

**Interpretation:** Host execution configuration supplies addresses through which shell resolves three zones.

### 2. shell/next.config.ts:3-31

**Observation:** `output: "standalone"`. `async rewrites()` reads `CATALOG_URL`, `BUILDS_URL` and `AUTH_URL`, defaults `http://localhost:3001` through `3003`, returning nine rules: `/catalog`, `/catalog/:path+` and `/catalog-static/_next/:path+` to `${catalog}`, likewise `builds` and `auth`.

**Interpretation:** Host configuration declares three zones as path destinations under own origin, including each zone’s assets.

**Note:** Zone `next.config.ts` files cited in same tables only declare `output: "standalone"` and `assetPrefix` (e.g. auth-mfe/next.config.ts:3-7). `assetPrefix` is zone asset publication path, hence deployment (dimension 6), in observations #22 through #24. `ARG`/`ENV` at shell/Dockerfile:8-13 only declare variable names without addresses. None produces configuration observation.

### 3. users-service/src/identity/api/openapi.ts:188

**Observation:** `<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js">` in Swagger UI HTML served by `users-service` at `/swagger`.

**Interpretation:** Backend service loads CDN library without MFE mechanism.

### 4. shell/next.config.ts:6

**Observation:** `async rewrites()` links `/catalog`, `/builds` and `/auth`, subroutes and `/<zona>-static/_next/:path+` assets to `CATALOG_URL`, `BUILDS_URL` and `AUTH_URL` (6-30). English explanation: original path placeholder means zone.

**Interpretation:** Host routing declares destination zone for each path.

**Note:** Manual 3.4.4 row inside #2 configuration block. Own observation because every 3.4.4 row becomes one (step 2). Strength follows guidance for route linking path to another unit in route table.

### 5. auth-mfe/src/lib/auth-client.ts:20-23; auth-mfe/src/app/auth/login/page.tsx:41; auth-mfe/src/app/auth/register/page.tsx:46

**Observation:** `setJwtCookie` writes `jwt` cookie with `path=/`, one-day `max-age` and `samesite=lax`. Called after login/registration.

**Interpretation:** Auth writes session to origin-wide cookie, the shared-state mechanism. Other-zone reads in relationships #19 through #21.

### 6. .; package.json:1-6

**Observation:** Root has only `package.json` with `@biomejs/biome` in `devDependencies`, without entry/build. Root `docker-compose.yml` orchestrates subdirectory services.

**Interpretation:** Coordination root rather than frontend unit.

### 7. auth-mfe; auth-mfe/package.json:7; auth-mfe/src/app/layout.tsx:28; auth-mfe/src/app/auth/page.tsx; auth-mfe/next.config.ts:3-7

**Observation:** Own manifest, App Router root layout, `/auth` route and `next build`, with `standalone` output and `assetPrefix: "/auth-static"`.

**Interpretation:** Frontend unit with own boundary.

### 8. builds-mfe; builds-mfe/package.json:7; builds-mfe/src/app/layout.tsx:28; builds-mfe/src/app/builds/page.tsx; builds-mfe/next.config.ts:3-7

**Observation:** Own manifest, App Router root layout, `/builds` route and `next build`, with `standalone` output and `assetPrefix: "/builds-static"`.

**Interpretation:** Frontend unit with own boundary.

### 9. builds-service; builds-service/package.json:6; builds-service/src/index.ts:15

**Observation:** `bun run src/index.ts` starts Bun server (`export default {`), with own Dockerfile, workflow and compose service.

**Interpretation:** Backend service rather than frontend unit.

### 10. catalog-mfe; catalog-mfe/package.json:7; catalog-mfe/src/app/layout.tsx:28; catalog-mfe/src/app/catalog/page.tsx; catalog-mfe/next.config.ts:3-7

**Observation:** Own manifest, App Router root layout, `/catalog` route and `next build`, with `standalone` output and `assetPrefix: "/catalog-static"`.

**Interpretation:** Frontend unit with own boundary.

### 11. mobile-bff; mobile-bff/package.json:6; mobile-bff/src/index.ts:19

**Observation:** `bun run src/index.ts` starts HTTP server (`app.listen(port)`), with own Dockerfile, workflow and compose service.

**Interpretation:** Backend-for-frontend rather than frontend unit.

### 12. parts-service; parts-service/package.json:6; parts-service/src/index.ts:9-12

**Observation:** `bun run src/index.ts` starts gRPC server and `Bun.serve`, with own Dockerfile, workflow and compose service.

**Interpretation:** Backend service rather than frontend unit.

### 13. shell; shell/package.json:7; shell/src/app/layout.tsx:28; shell/src/app/page.tsx; shell/next.config.ts:3-31

**Observation:** Own manifest, App Router root layout, `/` route and `next build`, with `standalone` output and zone `rewrites()`.

**Interpretation:** Frontend unit with own boundary.

### 14. users-service; users-service/deno.json:4; users-service/src/index.ts:40

**Observation:** `deno run ... src/index.ts` starts server (`app.listen({ port })`). `package.json` only declares drizzle.

**Interpretation:** Backend service rather than frontend unit.

### 15. web-bff; web-bff/package.json:6; web-bff/src/index.ts:22

**Observation:** `bun run src/index.ts` starts Bun server (`export default {`), with own Dockerfile, workflow and compose service.

**Interpretation:** Backend-for-frontend rather than frontend unit.

### 16. shell/next.config.ts:6, 9, 23-28; docker-compose.yml:202, 211; auth-mfe/next.config.ts:6; auth-mfe/src/app/auth/page.tsx

**Observation:** Shell forwards `/auth`, `/auth/:path+` and `/auth-static/_next/:path+` to `AUTH_URL`. Compose assigns `AUTH_URL` address `http://auth-mfe:3003`, service built from `./auth-mfe`. Prefix `/auth-static` is auth-mfe `assetPrefix`, with existing `/auth` route.

**Interpretation:** Active relationship forwarding shell path to auth zone, responding with full page.

### 17. shell/next.config.ts:6, 8, 17-22; docker-compose.yml:201, 210; builds-mfe/next.config.ts:6; builds-mfe/src/app/builds/page.tsx

**Observation:** Shell forwards `/builds`, `/builds/:path+` and `/builds-static/_next/:path+` to `BUILDS_URL`, assigned `http://builds-mfe:3002` by compose. Prefix `/builds-static` is builds-mfe `assetPrefix`, with existing `/builds` route.

**Interpretation:** Active relationship forwarding shell path to builds zone.

### 18. shell/next.config.ts:6, 7, 11-16; docker-compose.yml:200, 209; catalog-mfe/next.config.ts:6; catalog-mfe/src/app/catalog/page.tsx

**Observation:** Shell forwards `/catalog`, `/catalog/:path+` and `/catalog-static/_next/:path+` to `CATALOG_URL`, assigned `http://catalog-mfe:3001` by compose. Prefix `/catalog-static` is catalog-mfe `assetPrefix`, with existing `/catalog` route.

**Interpretation:** Active relationship forwarding shell path to catalog zone.

### 19. auth-mfe/src/lib/auth-client.ts:20-23; auth-mfe/src/app/auth/login/page.tsx:41; auth-mfe/src/app/auth/register/page.tsx:46; builds-mfe/src/components/Header.tsx:12; builds-mfe/src/app/builds/new/new-build-form.tsx:59-62

**Observation:** Auth-mfe writes `jwt` cookie with `path=/` after login/registration. Builds-mfe reads cookie in `Header` and before build creation, redirecting to `/auth/login` without session.

**Interpretation:** Active cookie-shared-state relationship between auth/builds, possible because zones share shell origin.

### 20. auth-mfe/src/lib/auth-client.ts:20-23; auth-mfe/src/app/auth/login/page.tsx:41; auth-mfe/src/app/auth/register/page.tsx:46; catalog-mfe/src/components/Header.tsx:12

**Observation:** Auth-mfe-written `jwt` cookie read in catalog-mfe `Header`, displaying user/logout button.

**Interpretation:** Active cookie-shared-state relationship between auth/catalog.

### 21. auth-mfe/src/lib/auth-client.ts:20-23; auth-mfe/src/app/auth/login/page.tsx:41; auth-mfe/src/app/auth/register/page.tsx:46; shell/src/components/Header.tsx:12

**Observation:** Auth-mfe-written `jwt` cookie read in shell `Header`.

**Interpretation:** Active cookie-shared-state relationship between auth/shell.

### 22. auth-mfe/package.json:7; auth-mfe/next.config.ts:5-6; auth-mfe/Dockerfile:10, 15-20; docker-compose.yml:157-158; .github/workflows/auth-mfe.yml:5-7, 15

**Observation:** `next build` generates `standalone` server with `/auth-static` assets. Dockerfile builds own image, compose starting service `auth-mfe` built from `./auth-mfe`. Own workflow triggered by `auth-mfe/**` installs, runs lint/build/tests without publication.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 23. builds-mfe/package.json:7; builds-mfe/next.config.ts:5-6; builds-mfe/Dockerfile:10, 15-20; docker-compose.yml:183-184; .github/workflows/builds-mfe.yml:5-7, 15

**Observation:** `next build` generates `standalone` server with `/builds-static` assets. Dockerfile builds own image, compose starting service `builds-mfe`. Own workflow triggered by `builds-mfe/**` without publication.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 24. catalog-mfe/package.json:7; catalog-mfe/next.config.ts:5-6; catalog-mfe/Dockerfile:10, 15-20; docker-compose.yml:170-171; .github/workflows/catalog-mfe.yml:5-7, 15

**Observation:** `next build` generates `standalone` server with `/catalog-static` assets. Dockerfile builds own image, compose starting service `catalog-mfe`. Own workflow triggered by `catalog-mfe/**` without publication.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 25. shell/package.json:7; shell/next.config.ts:5-30; shell/Dockerfile:8-16, 21-26; docker-compose.yml:196-202; .github/workflows/shell.yml:5-7, 15

**Observation:** `next build` generates `standalone` server with `rewrites()`. Dockerfile build receives zone addresses as `ARG` passed by compose. Shell-only image served on port 3000. Own workflow triggered by `shell/**` without publication.

**Interpretation:** Own build/deployment boundaries without independent versioning. Shell artifact contains no zone code, but included routing depends on zone locations.

### 26. .github/copilot-instructions.md:7, 13-18

**Observation:** "Architecture: 3 backend microservices + 1 Next.js frontend.", with sole `frontend/` directory "consuming all three services".

**Interpretation:** Document describes single frontend. Snapshot has four frontend units/no `frontend/`, contradicting claim.

### 27. .github/copilot-instructions.md:138

**Observation:** "Do not create shared packages/libs between services — keep them fully independent".

**Interpretation:** Claims independent parts without common library. In four apps each `layout.tsx` imports own Header/Footer, none importing other-app code, confirming claim.

### 28. CLAUDE.md:11

**Observation:** "4-zone Next.js micro-frontend".

**Interpretation:** Claims four frontend units, confirmed by structure.

### 29. CLAUDE.md:25-30

**Observation:** Zone table: `shell` (3000, "landing + rewrites"), `catalog-mfe` (3001, `/catalog-static`, `/catalog/*`), `builds-mfe` (3002, `/builds-static`, `/builds/*`) and `auth-mfe` (3003, `/auth-static`, `/auth/*`).

**Interpretation:** Claims shell forwards path to each zone, confirmed by shell → zone relationships.

### 30. CLAUDE.md:32

**Observation:** "All zones are independent Next.js 16 apps."

**Interpretation:** Claims independent units, confirmed by structure/per-app build/deployment.

### 31. CLAUDE.md:32

**Observation:** "Each uses shadcn/ui with the shared preset `b1t3ILnrM` for consistent design tokens."

**Interpretation:** Claims common zone design preset. Four `components.json` have same configuration in separate copies, identifier absent from artifacts. Claim partially confirmed.

### 32. CLAUDE.md:32

**Observation:** "Cross-zone navigation uses plain `<a>` tags (never `next/link`)."

**Interpretation:** Claims whole-page inter-zone navigation. Four `Header.tsx` confirm claim.

### 33. CLAUDE.md:32

**Observation:** "Shared auth = `jwt` cookie on the shared origin; each zone has both server-side ... and client-side ... helpers."

**Interpretation:** Claims cookie-shared session under same origin, confirmed by session relationships.

### 34. CLAUDE.md:32

**Observation:** "Every MFE fetches from `web-bff`".

**Interpretation:** Claims all zones call same BFF. Catalog, builds and auth call `bffFetch`, shell does not, making claim partially confirmed.

### 35. CLAUDE.md:32

**Observation:** "the shared `src/lib/bff.ts`".

**Interpretation:** Claims common zone module. Four separate file copies, one per app, contradict claim.

### 36. README.md:11

**Observation:** "Each zone is its own Next.js app, own Dockerfile, own CI pipeline."

**Interpretation:** Claims own app, image and CI per zone, confirmed by structure/build/deployment.

### 37. README.md:46

**Observation:** "`mobile-bff` ... not wired into the micro-frontend zones".

**Interpretation:** Claims backend not linked to zones. No zone references `mobile-bff`, confirming claim.

### 38. README.md:69

**Observation:** "despite being deployed independently".

**Interpretation:** Claims independent zone deployment, confirmed by build/deployment observations.

### 39. shell/README.md:3, 28-29

**Observation:** "shared header/footer"; `Header.tsx` — "shared nav..."; `Footer.tsx` — "shared footer".

**Interpretation:** Claims common zone components. Each app imports own `@/components/Header` and `@/components/Footer`, identical separate-file copies, contradicting claim.

### 40. 7470aff 2026-03-21 (.github/copilot-instructions.md); 1695f25 2026-04-16 (CLAUDE.md); 28c49a9 2026-04-16 (frontend/, shell/, catalog-mfe/, builds-mfe/, auth-mfe/, CLAUDE.md, README.md)

**Observation:** `.github/copilot-instructions.md` unchanged since 7470aff. `CLAUDE.md` updated at 1695f25, adding BFFs, and 28c49a9, removing 21 `frontend/` files/adding four apps.

**Interpretation:** Documents belong to different project stages; only one updated when single frontend became four zones. Point clarified.

### 41. 28c49a9 2026-04-16 (CLAUDE.md, shell/README.md, <app>/src/components/Header.tsx, <app>/src/components/Footer.tsx, <app>/src/lib/bff.ts, <app>/components.json); 999c879 2026-04-16 (shell/tests/header.test.tsx); 842a007 2026-05-07

**Observation:** 28c49a9 creates four apps, each already with own Header, Footer, `bff.ts` and `components.json`, and "shared" wording in `CLAUDE.md:32` and `shell/README.md:3, 28-29` in same commit. Later commits do not touch files.

**Interpretation:** "shared" text/copies originated together. No later extraction/copying. Point clarified.

### 42. 28c49a9 2026-04-16 (shell/src/lib/bff.ts); 999c879 2026-04-16 (shell/tests/header.test.tsx); 842a007 2026-05-07

**Observation:** `shell/src/lib/bff.ts` created with shell at 28c49a9. Only later 999c879 touches `shell/`, and only one test. Snapshot commit does not touch `shell/`.

**Interpretation:** Shell never called `web-bff`: file unused since creation rather than removed call. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (., Deploy); 3.4.3 (shell, Deploy); 3.4.4 (shell/next.config.ts:6, Observation); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #1, #2, #3, #4 (Where served); 3.4.6 #4 (Artifacts); 3.4.7 #4 (Evidence) | 2 configuration | deploy | other | architectural | strong | configures #13; configures #16; configures #17; configures #18 |
| 2 | 3.4.3 (shell, Markers); 3.4.3 (shell, Build); 3.4.4 (shell/next.config.ts:6, Observation); 3.4.5 #1, #2, #3 (Configuration, Code); 3.4.6 #1, #2, #3 (Where served); 3.4.6 #4 (Artifacts); 3.4.7 #4 (Evidence) | 2 configuration | configuration | other | architectural | strong | configures #13; configures #16; configures #17; configures #18 |
| 3 | 3.4.4 (users-service/src/identity/api/openapi.ts:188) | 3 code | source code | — | context | weak | — |
| 4 | 3.4.4 (shell/next.config.ts:6) | 3 code | configuration | other | architectural | strong | implements #16; implements #17; implements #18 |
| 5 | 3.4.4 (auth-mfe/src/lib/auth-client.ts:20) | 3 code | source code | other | technological | moderate | implements #19; implements #20; implements #21 |
| 6 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 7 | 3.4.3 (auth-mfe) | 4 structure | directory | — | architectural | moderate | — |
| 8 | 3.4.3 (builds-mfe) | 4 structure | directory | — | architectural | moderate | — |
| 9 | 3.4.3 (builds-service) | 4 structure | directory | — | context | weak | — |
| 10 | 3.4.3 (catalog-mfe) | 4 structure | directory | — | architectural | moderate | — |
| 11 | 3.4.3 (mobile-bff) | 4 structure | directory | — | context | weak | — |
| 12 | 3.4.3 (parts-service) | 4 structure | directory | — | context | weak | — |
| 13 | 3.4.3 (shell) | 4 structure | directory | — | architectural | moderate | — |
| 14 | 3.4.3 (users-service) | 4 structure | directory | — | context | weak | — |
| 15 | 3.4.3 (web-bff) | 4 structure | directory | — | context | weak | — |
| 16 | 3.4.5 #1 | 5 composition | configuration | other | architectural | strong | links #13; links #7 |
| 17 | 3.4.5 #2 | 5 composition | configuration | other | architectural | strong | links #13; links #8 |
| 18 | 3.4.5 #3 | 5 composition | configuration | other | architectural | strong | links #13; links #10 |
| 19 | 3.4.5 #4 | 5 composition | source code | other | architectural | strong | links #7; links #8 |
| 20 | 3.4.5 #5 | 5 composition | source code | other | architectural | strong | links #7; links #10 |
| 21 | 3.4.5 #6 | 5 composition | source code | other | architectural | strong | links #7; links #13 |
| 22 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #7 |
| 23 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #8 |
| 24 | 3.4.6 #3 | 6 build-deploy | deploy | — | architectural | moderate | publishes #10 |
| 25 | 3.4.6 #4 | 6 build-deploy | deploy | — | architectural | moderate | publishes #13 |
| 26 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | contradicts #7; contradicts #8; contradicts #10; contradicts #13 |
| 27 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates shell/src/app/layout.tsx:3-4; corroborates catalog-mfe/src/app/layout.tsx:3-4; corroborates builds-mfe/src/app/layout.tsx:3-4; corroborates auth-mfe/src/app/layout.tsx:3-4 |
| 28 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #8; corroborates #10; corroborates #13 |
| 29 | 3.4.7 #4 | 7 documentation | documentation | other | architectural | weak | corroborates #16; corroborates #17; corroborates #18 |
| 30 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #8; corroborates #10; corroborates #13; corroborates #22; corroborates #23; corroborates #24; corroborates #25 |
| 31 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | partially corroborates shell/components.json:3; partially corroborates catalog-mfe/components.json:3; partially corroborates builds-mfe/components.json:3; partially corroborates auth-mfe/components.json:3 |
| 32 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates shell/src/components/Header.tsx:28-56; corroborates catalog-mfe/src/components/Header.tsx:28-56; corroborates builds-mfe/src/components/Header.tsx:28-56; corroborates auth-mfe/src/components/Header.tsx:28-56 |
| 33 | 3.4.7 #8 | 7 documentation | documentation | other | architectural | weak | corroborates #19; corroborates #20; corroborates #21 |
| 34 | 3.4.7 #9 | 7 documentation | documentation | — | context | weak | partially corroborates catalog-mfe/src/app/catalog/page.tsx:38; partially corroborates builds-mfe/src/app/builds/page.tsx:29; partially corroborates auth-mfe/src/app/auth/me/page.tsx:34 |
| 35 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | contradicts shell/src/lib/bff.ts; contradicts catalog-mfe/src/lib/bff.ts; contradicts builds-mfe/src/lib/bff.ts; contradicts auth-mfe/src/lib/bff.ts |
| 36 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #8; corroborates #10; corroborates #13; corroborates #22; corroborates #23; corroborates #24; corroborates #25 |
| 37 | 3.4.7 #12 | 7 documentation | documentation | — | context | weak | corroborates docker-compose.yml:129-130 |
| 38 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #22; corroborates #23; corroborates #24; corroborates #25 |
| 39 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | contradicts shell/src/app/layout.tsx:3-4; contradicts catalog-mfe/src/app/layout.tsx:3-4; contradicts builds-mfe/src/app/layout.tsx:3-4; contradicts auth-mfe/src/app/layout.tsx:3-4 |
| 40 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #26 |
| 41 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #31; explains #35; explains #39 |
| 42 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #34 |

## Summary

Observations: 42. Dimensions (technology: 0, configuration: 2, code: 3, structure: 10, composition: 6, build-deploy: 4, documentation: 14, history: 3). Strength (strong: 9, moderate: 9, weak: 24, ambiguous: 0). Evidence (technological: 1, architectural: 31, context: 10).

