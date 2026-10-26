---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
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

# 273 — kod88vn/poc_next_mfa

## Repository overview

Next.js 16 Multi-Zones proof of concept in npm workspaces + Turborepo monorepo, with three Next.js applications: `apps/shell` (host, port 3000), `apps/shop` (under `basePath: '/shop'`, port 3001) and `apps/duda` (under `basePath: '/duda'`, port 3002), plus library `packages/ui` (`@repo/ui`). Composition uses only native Next.js features. Only dependency in dependency review is `turbo`, monorepo tool whose usage remains undetermined (#1).

Architecture chain uses server routing rather than page mounting:
- **Structure:** three apps have own manifests, entries/builds (#7, #8, #9).
- **Configuration:** shell `rewrites()` forwards `/duda` to `http://localhost:3002/duda` and `/shop` and `/shop/:path*` to `http://localhost:3001/shop...` (#2).
- **Code:** `rewrites()` line recorded in 3.4.4 (#4), within #2 block.
- **Relationships:** yields two active shell → zone relationships (#11, #12). Each zone responds with entire page and own layout.

Second link is cart counter: shop Server Action writes cookie `mfe_cart_count` with `path: '/'` (#5); shell/duda layouts read it, passing to `Header` (#13, #14).

Build separate per app (`next build` in each, triggered by root `turbo build`), but no deployment artifact: apps only start through `next dev`/`next start` at fixed `localhost` ports (#15 to #17).

Misleading/excluded signals:
- Workspace root and library `packages/ui` not frontend units (#6, #10). Common `Header` from library compiled inside each app; shared code rather than unit mounted in another.
- Only mined construct, `src-iframe`, regular expression removing iframes from external HTML injected by duda zone (#3). HTML comes from Duda builder site outside repository.
- Zone `basePath`, CORS headers and ports did not become configuration observations (see #2 Note).
- Cross-zone navigation through full-page link rather than composition construct.

Documentation confirms general form: Multi-Zones, host/zones, rewrite, shared cookie, common library and apps starting alone (#18, #20 to #25, #27, #28, #32 to #35). README written before duda zone describes two zones; `apps/duda/ARCHITECTURE.md` adds third. "Independent deployability" only partially confirmed because no deployment artifact (#19). Four claims contradicted by snapshot: `Button` imported by no app (#26), only-`<a>` cross-zone rule not followed by shell `not-found` page (#30), building `packages/ui` before apps despite absent `build` script (#31), shell layout as shop frame although shop responds with own layout (#36). History clarifies README predates `not-found` and `packages/ui` never had build (#40, #41); does not establish whether `Button` previously used or shop layout comment date (#39, #42), uncertainties only about past.

Only ambiguous observation is `turbo` (#1); snapshot architecture not ambiguous.

## Observations

### 1. package.json:18; turbo.json:5-26

**Observation:** `turbo` (`^2.3.3`) declared in `devDependencies`. `turbo.json` defines tasks `build`, `dev`, `lint`, `type-check` and `clean`. Only `turbo` invocation in root `package.json` scripts (package.json:9-11, 13-14), without CI workflow, Dockerfile or invoking automation script.

**Interpretation:** Monorepo tool rather than MFE technology. Under dependency review rule usage undetermined: Turborepo may be actual build orchestration or merely script shortcut.

### 2. apps/shell/next.config.js:5-44

**Observation:** `reactStrictMode: true` (6), `transpilePackages: ['@repo/ui']` (9) and `async rewrites()` (25-43), returning three rules: `/duda` to `http://localhost:3002/duda` (29-30), `/shop` to `http://localhost:3001/shop` (34-35) and `/shop/:path*` to `http://localhost:3001/shop/:path*` (39-40). Block comment says "MULTI-ZONE ROUTING — the core MFE \"string\"" (12). Addresses fixed in file without environment variable.

**Interpretation:** Host configuration declares two zones, duda/shop, as path targets under own origin with resolution addresses.

**Note:** Zone `next.config.js` files, cited in same tables, only declare `basePath`, `reactStrictMode`, `transpilePackages` and CORS header for `http://localhost:3000` (apps/shop/next.config.js:5-42; apps/duda/next.config.js:5-23). `basePath` is zone publication path, thus deployment (dimension 6), in observations #15 and #17; CORS and `transpilePackages` declare no composition element. App `package.json` files only contain port scripts, root `package.json` declares workspace (structure, #6), `turbo.json` build tasks. None of these blocks became configuration observation.

### 3. apps/duda/lib/duda-landing.ts:387

**Observation:** `sanitized = sanitized.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');`, in `sanitizeLandingHtml` (363), alongside `<script>` and `<noscript>` removal (385-386), applied to external Duda site HTML.

**Interpretation:** Sanitization of external content injected by duda zone rather than unit embedding; no MFE mechanism.

### 4. apps/shell/next.config.js:25

**Observation:** `async rewrites()` links `/duda` to `http://localhost:3002/duda` and `/shop` and `/shop/:path*` to `http://localhost:3001/shop` and `http://localhost:3001/shop/:path*` (26-42). Configuration exported in `module.exports = nextConfig` (46).

**Interpretation:** Host routing declares target zone of each path.

**Note:** Manual 3.4.4 row inside configuration block #2. Becomes own observation because every 3.4.4 row becomes one (step 2). Strength follows guidance for route linking path to another unit in route table.

### 5. apps/shop/app/actions.ts:26-31; apps/shop/app/page.tsx:124; apps/shop/app/[id]/page.tsx:141

**Observation:** Server Action `addToCart` writes cookie `mfe_cart_count` with `path: '/'`, `sameSite: 'lax'` and one-week validity. Triggered by `<form action={addToCart}>` forms in product list/detail.

**Interpretation:** Shop writes cart count to origin-wide cookie, shared-state mechanism. Other-zone reading in relationships #13 and #14.

### 6. .; package.json:1-27; package.json:9

**Observation:** Root only has `package.json`, with `workspaces` (`apps/*`, `packages/*`), `devDependencies` `tsx` and `turbo` and `build` equal to `turbo build`. No own entry/build configuration.

**Interpretation:** Workspace coordination root rather than frontend unit.

### 7. apps/duda; apps/duda/package.json:6; apps/duda/app/layout.tsx:15; apps/duda/app/page.tsx:9; apps/duda/next.config.js:5-23

**Observation:** Has own manifest, App Router root layout (`DudaLayout`), page `DudaPage` and `next build` build, with `basePath: '/duda'` and `transpilePackages`.

**Interpretation:** Frontend unit with own boundary.

### 8. apps/shell; apps/shell/package.json:6; apps/shell/app/layout.tsx:22; apps/shell/app/page.tsx:46; apps/shell/next.config.js:5-44

**Observation:** Has own manifest, App Router root layout (`RootLayout`), page `HomePage` at route `/` and `next build` build, with `rewrites()` for `/shop` and `/duda`.

**Interpretation:** Frontend unit with own boundary.

### 9. apps/shop; apps/shop/package.json:6; apps/shop/app/layout.tsx:25; apps/shop/app/page.tsx:65; apps/shop/next.config.js:5-42

**Observation:** Has own manifest, App Router root layout (`ShopLayout`), page `ShopPage` and `next build` build, with `basePath: '/shop'` and `transpilePackages`.

**Interpretation:** Frontend unit with own boundary.

### 10. packages/ui; packages/ui/package.json:5-11; packages/ui/package.json:13-16

**Observation:** `main`, `types` and `exports` point to `./src/index.ts`. Only scripts `lint` and `type-check`, without `build`; apps compile package through `transpilePackages`.

**Interpretation:** Shared library `@repo/ui` without application entry, not frontend unit.

### 11. apps/shell/next.config.js:25, 28-31; apps/duda/next.config.js:6; apps/duda/app/page.tsx:9

**Observation:** Shell forwards `/duda` to `http://localhost:3002/duda`. Prefix `/duda` is `basePath` of `apps/duda`, whose page `DudaPage` responds at route. Rewrite covers only `/duda`, without `/duda/:path*`; zone has single page.

**Interpretation:** Active relationship in which shell forwards path to duda zone, responding with entire page.

### 12. apps/shell/next.config.js:25, 32-41; apps/shop/next.config.js:19; apps/shop/app/page.tsx:65

**Observation:** Shell forwards `/shop` and `/shop/:path*` to `http://localhost:3001/shop` and `http://localhost:3001/shop/:path*`. Prefix `/shop` is `basePath` of `apps/shop`; zone comment says shell rewrite forwards `localhost:3000/shop/*` to it (apps/shop/next.config.js:13-14).

**Interpretation:** Active relationship in which shell forwards path/subroutes to shop zone, responding with entire page.

### 13. apps/shop/app/actions.ts:26-31; apps/shop/app/page.tsx:124; apps/shop/app/[id]/page.tsx:141; apps/duda/app/layout.tsx:24-27, 82

**Observation:** Shop writes cookie `mfe_cart_count` with `path: '/'` when adding products. Duda layout reads cookie, passing count as `cartCount` to `Header` (`<Header cartCount={cartCount} currentZone="duda" />`).

**Interpretation:** Active cookie-shared-state relationship between shop/duda.

### 14. apps/shop/app/actions.ts:26-31; apps/shop/app/page.tsx:124; apps/shop/app/[id]/page.tsx:141; apps/shell/app/layout.tsx:29-32, 58

**Observation:** Cookie `mfe_cart_count` written by shop read in shell layout, passed as `cartCount` to `Header`.

**Interpretation:** Active cookie-shared-state relationship between shop/shell.

### 15. apps/duda/package.json:6; apps/duda/next.config.js:5-23; package.json:9; turbo.json:6-10; apps/duda/package.json:7, 9

**Observation:** `next build` generates duda-only `.next` under `basePath: '/duda'`; root `turbo build` triggers build, task `build` stores `.next/**` as output. Code of `@repo/ui` enters artifact through `transpilePackages`. No Dockerfile, compose, workflow or hosting configuration: app only starts through `next dev`/`next start` at port 3002. `version: "0.0.1"` unused for publication; app `private`.

**Interpretation:** Own build boundary without observed deployment or independent versioning.

### 16. apps/shell/package.json:6; apps/shell/next.config.js:5-44; package.json:9; turbo.json:6-10; apps/shell/package.json:7, 9

**Observation:** `next build` generates shell-only `.next` with `rewrites()` to fixed `localhost` addresses. No deployment artifact; starts through `next dev`/`next start` at port 3000. `version: "0.0.1"` unused; app `private`.

**Interpretation:** Own build boundary without observed deployment or independent versioning. Shell artifact contains no zone code, but included routing only works with zones at scripts’ local ports.

### 17. apps/shop/package.json:6; apps/shop/next.config.js:5-42; package.json:9; turbo.json:6-10; apps/shop/package.json:7, 9

**Observation:** `next build` generates shop-only `.next` under `basePath: '/shop'`. No deployment artifact; starts at port 3001. Fixed CORS at `http://localhost:3000` accompanied by comment "In a production deployment, replace with the actual shell origin" (apps/shop/next.config.js:26-27). `version: "0.0.1"` unused; app `private`.

**Interpretation:** Own build boundary without observed deployment or independent versioning; configuration for local execution.

### 18. README.md:1, 3

**Observation:** "A production-style Microfrontend architecture using **Next.js 16 Multi-Zones** and **Turborepo**".

**Interpretation:** Claims microfrontend architecture with Multi-Zones/Turborepo, confirmed by three units, route relationships and root `turbo build`. "Production-style" unsupported by deployment artifact.

### 19. README.md:3

**Observation:** "demonstrating independent deployability".

**Interpretation:** Claims independent zone deployment. Each app has own build/starts alone but no artifact deploys; rewrite targets fixed `localhost` addresses. Claim partially confirmed.

### 20. README.md:3

**Observation:** "a shared design system".

**Interpretation:** Claims UI library common to zones. Three apps import `Header` from `@repo/ui`, compiling through `transpilePackages`, confirming claim.

### 21. README.md:3

**Observation:** "cross-zone state".

**Interpretation:** Claims shared inter-zone state without naming mechanism. Cookie written by shop/read by shell/duda confirms claim.

### 22. README.md:10, 18

**Observation:** "localhost:3000/ ← Shell zone (homepage + global navigation)" / "`apps/shell` | 3000 | Host — homepage, global nav, rewrite proxy".

**Interpretation:** Claims shell host with home page/rewrite proxy, confirmed by shell unit and `rewrites()` line.

### 23. README.md:11

**Observation:** "localhost:3000/shop/* ← Shell rewrites → Shop zone (localhost:3001/shop/*)".

**Interpretation:** Claims host forwards `/shop/*` to shop zone, confirmed by `rewrites()` line/route relationship.

### 24. README.md:13

**Observation:** "Cookie: mfe_cart_count ← Shared by both zones (port-agnostic on localhost)".

**Interpretation:** Claims cookie-shared state confirmed by shop writing/cookie relationships. "Both zones" applies to README’s two named zones; duda also reads cookie.

### 25. README.md:19

**Observation:** "`apps/shop` | 3001 | Remote — product listing & PDP (`basePath: /shop`)".

**Interpretation:** Claims shop zone reached by host under `/shop`, confirmed by shop unit/route relationship. "Remote" README label: link forwards route rather than loading module.

### 26. README.md:20

**Observation:** "`packages/ui` | — | Shared design system — `Header`, `Button`" (`Button` portion).

**Interpretation:** Claims `Button` shared. `packages/ui/src/index.ts:1` exports it but `@repo/ui` imports in three apps only include `Header`, `getDudaBrandTheme` and `normalizeHeaderTheme`, contradicting claim.

### 27. README.md:35

**Observation:** "Turborepo starts shell (:3000) + shop (:3001) in parallel".

**Interpretation:** Claims zones start in own servers in parallel through Turborepo. Root `turbo dev` and persistent task `dev` run each app `dev` at own port, confirming claim; same command also starts duda, unmentioned in README.

### 28. README.md:41-48

**Observation:** "Run a single zone" / "Shell only" / "Shop only (direct, no shell proxy)".

**Interpretation:** Claims each zone runs alone, confirmed by units with own manifests, entries/builds.

### 29. README.md:57

**Observation:** "`turbo.json` | Pipeline tasks with Turborepo caching".

**Interpretation:** Addresses monorepo tool without locating units. Tasks in `turbo.json` and root `turbo build` confirm claim.

### 30. README.md:71

**Observation:** "Cross-zone links use plain `<a>` tags (not `<Link>`) to force a full navigation and load the correct zone's JS bundle."

**Interpretation:** Claims cross-zone navigation exclusively full-page. `Header` and shell home use `<a>`, but shell `not-found` page uses `Link` from `next/link` for `/shop` and `/duda` (apps/shell/app/not-found/page.tsx:1, 50-55), contradicting general claim.

### 31. README.md:84

**Observation:** "The `turbo.json` pipeline ensures `packages/ui` is always built before the apps, and apps build in parallel after that."

**Interpretation:** Claims own `packages/ui` build before apps. Package lacks script `build`, so `^build` runs nothing there; each app compiles it through `transpilePackages`, contradicting claim.

### 32. apps/duda/ARCHITECTURE.md:3, 7

**Observation:** "the current Duda zone architecture" / "Zone app: `apps/duda`".

**Interpretation:** Claims duda own zone, confirmed by unit `apps/duda`.

### 33. apps/duda/ARCHITECTURE.md:9

**Observation:** "Host shell route: `/duda` via shell rewrite to the Duda zone".

**Interpretation:** Claims host forwards `/duda` to duda zone, confirmed by `rewrites()` line/route relationship.

### 34. apps/duda/ARCHITECTURE.md:10

**Observation:** "All three zones (shell, shop, duda) share a single brand theme pipeline".

**Interpretation:** Claims common theme code for three zones. All layouts call `getDudaBrandTheme`, exported by `@repo/ui`, confirming claim.

### 35. apps/shell/next.config.js:8

**Observation:** Comment: "Compile the shared UI package from source (no separate build step needed)."

**Interpretation:** Claims common library has no own build, compiled inside apps, confirmed by library `packages/ui`.

### 36. apps/shop/app/layout.tsx:5-7

**Observation:** Comment: "When accessed via the shell's rewrite (localhost:3000/shop) the browser loads the shell's layout for the outer chrome".

**Interpretation:** Claims rewrite displays shop inside shell layout. Rewrite forwards entire request; shop responds with own `<html>`, `<body>` and `Header` (apps/shop/app/layout.tsx:49-63), contradicting claim.

### 37. 18d620e 2026-04-12 (package.json, turbo.json); 3e95170 2026-04-24 (package.json, turbo.json, load-root-env.js, test-duda-themes.js)

**Observation:** `package.json` and `turbo.json` appear in 18d620e, changed once in 3e95170. No commit creates/removes CI workflow, Dockerfile or script calling `turbo`; standalone scripts enter in 3e95170, remain in snapshot.

**Interpretation:** Never an automation invoking `turbo` subsequently deleted. Point clarified; dependency remains undetermined.

### 38. 18d620e 2026-04-12; e001413 2026-04-12 (apps/shell/tsconfig.json, apps/shop/tsconfig.json, yarn.lock); 3e95170 2026-04-24

**Observation:** e001413 message "ready for deploy", but only changes shell/shop `tsconfig.json`, creating `yarn.lock`. None of five commits creates/removes Dockerfile, compose, workflow, hosting manifest or proxy configuration.

**Interpretation:** Missing deployment artifact not abandonment: none in any version through snapshot. Point clarified.

### 39. 18d620e 2026-04-12 (packages/ui/src/Button.tsx, packages/ui/src/index.ts, README.md); 3e95170 2026-04-24 (packages/ui/src/Button.tsx, packages/ui/src/index.ts)

**Observation:** `Button.tsx` and `index.ts` appear in 18d620e with shell/shop apps, changed in 3e95170. README citing `Button` same since 18d620e. Old version contents absent from clone.

**Interpretation:** History does not establish whether `Button` previously used then stopped or never used. Point inconclusive only about past: no snapshot app imports it.

### 40. 18d620e 2026-04-12 (README.md); 3e95170 2026-04-24 (apps/shell/app/not-found/page.tsx)

**Observation:** Only-`<a>` link sentence in README since 18d620e with same snapshot object. Shell `not-found` page using `Link` for `/shop` and `/duda` created in 3e95170 with duda zone.

**Interpretation:** Claim/page from different stages: README not updated on page addition. Point clarified.

### 41. 18d620e 2026-04-12 (packages/ui/package.json, README.md, turbo.json); 3e95170 2026-04-24 (turbo.json)

**Observation:** `packages/ui/package.json` created in 18d620e, never changed (same snapshot object); README.md:84 sentence also unchanged since 18d620e. `turbo.json` changes in 3e95170.

**Interpretation:** Package never had script `build`; contradiction since sentence written rather than earlier-stage remnant. Point clarified.

### 42. 18d620e 2026-04-12 (apps/shop/app/layout.tsx); 3e95170 2026-04-24 (apps/shop/app/layout.tsx, apps/shell/next.config.js)

**Observation:** `apps/shop/app/layout.tsx` appears in 18d620e, changed in 3e95170, same commit changing shell `next.config.js`. Old contents of both absent from clone.

**Interpretation:** History does not establish whether comment in first version or describing earlier configuration. Point inconclusive only about past: snapshot shop responds with own layout.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:18) | 1 technology | manifest | — | context | ambiguous | declares turbo.json:5-26 |
| 2 | 3.4.3 (apps/shell, Markers); 3.4.3 (apps/shell, Build); 3.4.4 (apps/shell/next.config.js:25, Observation); 3.4.5 #1, #2 (Configuration, Code); 3.4.6 #1, #3 (Where served); 3.4.6 #2 (Artifacts); 3.4.7 #2, #3, #6, #14, #16, #18 (Evidence) | 2 configuration | configuration | other | architectural | strong | configures #8; configures #11; configures #12 |
| 3 | 3.4.4 (apps/duda/lib/duda-landing.ts:387) | 3 code | source code | — | context | weak | — |
| 4 | 3.4.4 (apps/shell/next.config.js:25) | 3 code | configuration | other | architectural | strong | implements #11; implements #12 |
| 5 | 3.4.4 (apps/shop/app/actions.ts:26) | 3 code | source code | other | technological | moderate | implements #13; implements #14 |
| 6 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 7 | 3.4.3 (apps/duda) | 4 structure | directory | — | architectural | moderate | — |
| 8 | 3.4.3 (apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 9 | 3.4.3 (apps/shop) | 4 structure | directory | — | architectural | moderate | — |
| 10 | 3.4.3 (packages/ui) | 4 structure | directory | — | context | weak | — |
| 11 | 3.4.5 #1 | 5 composition | configuration | other | architectural | strong | links #8; links #7 |
| 12 | 3.4.5 #2 | 5 composition | configuration | other | architectural | strong | links #8; links #9 |
| 13 | 3.4.5 #3 | 5 composition | source code | other | architectural | strong | links #9; links #7 |
| 14 | 3.4.5 #4 | 5 composition | source code | other | architectural | strong | links #9; links #8 |
| 15 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #7 |
| 16 | 3.4.6 #2 | 6 build-deploy | manifest | — | architectural | moderate | publishes #8 |
| 17 | 3.4.6 #3 | 6 build-deploy | manifest | — | architectural | moderate | publishes #9 |
| 18 | 3.4.7 #1 | 7 documentation | documentation | other | architectural | weak | corroborates #7; corroborates #8; corroborates #9; corroborates #11; corroborates #12; corroborates #15; corroborates #16; corroborates #17 |
| 19 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | partially corroborates #15; partially corroborates #16; partially corroborates #17 |
| 20 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #10; corroborates apps/shell/app/layout.tsx:10; corroborates apps/shop/app/layout.tsx:14; corroborates apps/duda/app/layout.tsx:3 |
| 21 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #5; corroborates #13; corroborates #14 |
| 22 | 3.4.7 #5 | 7 documentation | documentation | other | architectural | weak | corroborates #8; corroborates #4 |
| 23 | 3.4.7 #6 | 7 documentation | documentation | other | architectural | weak | corroborates #4; corroborates #12 |
| 24 | 3.4.7 #7 | 7 documentation | documentation | other | architectural | weak | corroborates #5; corroborates #13; corroborates #14 |
| 25 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates #12 |
| 26 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | contradicts apps/shell/app/layout.tsx:10; contradicts apps/shop/app/layout.tsx:14; contradicts apps/duda/app/layout.tsx:3 |
| 27 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates package.json:10; corroborates turbo.json:11-14; corroborates apps/shell/package.json:7; corroborates apps/shop/package.json:7 |
| 28 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #8; corroborates #9 |
| 29 | 3.4.7 #12 | 7 documentation | documentation | — | context | weak | corroborates turbo.json:5-26; corroborates package.json:9 |
| 30 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | contradicts apps/shell/app/not-found/page.tsx:50-55 |
| 31 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | contradicts #10 |
| 32 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #7 |
| 33 | 3.4.7 #16 | 7 documentation | documentation | other | architectural | weak | corroborates #4; corroborates #11 |
| 34 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates apps/shell/app/layout.tsx:28; corroborates apps/shop/app/layout.tsx:31; corroborates apps/duda/app/layout.tsx:23 |
| 35 | 3.4.7 #18 | 7 documentation | comment | — | architectural | weak | corroborates #10 |
| 36 | 3.4.7 #19 | 7 documentation | comment | other | architectural | weak | contradicts apps/shop/app/layout.tsx:49-63; contradicts #12 |
| 37 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #1 |
| 38 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #19; explains #15; explains #16; explains #17 |
| 39 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #26 |
| 40 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #30 |
| 41 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #31 |
| 42 | 3.4.8 #6 | 8 history | history | — | architectural | weak | explains #36 |

## Summary

Observations: 42. Dimensions (technology: 1, configuration: 1, code: 3, structure: 5, composition: 4, build-deploy: 3, documentation: 19, history: 6). Strength (strong: 6, moderate: 7, weak: 28, ambiguous: 1). Evidence (technological: 1, architectural: 35, context: 6).

