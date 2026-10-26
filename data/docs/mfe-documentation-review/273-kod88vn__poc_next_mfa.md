---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
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

# 273 — kod88vn/poc_next_mfa

## Repository overview

English documentation, two `documentation` files in `artifacts.csv`, both entirely read. Root `README.md` Next.js 16 Multi-Zones/Turborepo micro-frontend POC (README.md:1, 3), request diagram (README.md:9-14), workspace roles (README.md:16-20), run instructions (README.md:24-49), key-file table (README.md:53-63), zone connections (README.md:67-72), Turborepo cache (README.md:76-84). Only `apps/shell`/`apps/shop`, omits third structural unit `apps/duda` (3.4.3), also shell-rewritten (3.4.5 #1). Composition notes seemingly predates duda; "both zones" holds for named two, paragraphs identify third-zone participation. Second `apps/duda/ARCHITECTURE.md` zone scope (apps/duda/ARCHITECTURE.md:5-10), `DUDA_ORIGIN` read from root `.env` (apps/duda/ARCHITECTURE.md:14-24), request flow (apps/duda/ARCHITECTURE.md:26-37), server fetching external Duda-builder HTML/CSS, deriving brand theme/injecting page (apps/duda/ARCHITECTURE.md:39-144). Already "All three zones" (apps/duda/ARCHITECTURE.md:10, 30, 45), complements omission.

Exclusions. README title "How the MFE \"string\" works" (README.md:67, `doc-mfe-term`); Server Action file-table line (README.md:62, `doc-mfe-term`), shop-file behavior repeated claim 7 paragraph; PDP `generateMetadata`/`generateStaticParams` (README.md:63), internal; prerequisites (README.md:26-29); command blocks (README.md:33-36, 43-49, 78-82), only claims 10/11 extracted. `apps/duda/ARCHITECTURE.md`: `DUDA_ORIGIN` from root `.env` through `load-root-env.js` in each `next.config.js` (apps/duda/ARCHITECTURE.md:16-24; load-root-env.js:4-28; apps/shell/next.config.js:1-2), environment detail, absent `.env` ignored by `.gitignore` (.gitignore:26); external HTML fetching/sanitizing/injecting (apps/duda/ARCHITECTURE.md:31-38, 73-138), internal duda/external-system link rather than unit, including `doc-integration-technology` apps/duda/ARCHITECTURE.md:80 ("Strips `script`, `noscript`, and `iframe` blocks"), external iframe removal (apps/duda/lib/duda-landing.ts:383-387), not embedding; external URL rewrite policy to `/`, `/shop/*`, `/duda` (apps/duda/ARCHITECTURE.md:86-102; apps/duda/lib/duda-landing.ts:320-322, 396-397), shell `not-found` receiving unmapped links (apps/duda/ARCHITECTURE.md:104-108), navigation not prior-review relationship; contrast normalization/tests (apps/duda/ARCHITECTURE.md:55-71, 146-152), library-internal; limitations (apps/duda/ARCHITECTURE.md:154-159), `doc-host-remote` apps/duda/ARCHITECTURE.md:157 ("remote host rules") external-site host rather than remote unit.

Comments/descriptive fields read: three `next.config.js`, three `layout.tsx`, shell homepage, `apps/duda/app/page.tsx`, `apps/shop/app/actions.ts`, `packages/ui/src/Header.tsx`, `apps/duda/lib/duda-landing.ts`, `package.json` of root, apps and `packages/ui` (none `description`), `turbo.json`. Comments apps/shell/next.config.js:8 (#18), apps/shop/app/layout.tsx:4-7 (#19) rows; others repeat README in paragraphs. Next.js `description` of `metadata` repeats (apps/shell/app/layout.tsx:18-19, apps/shell/app/page.tsx:11-12 #1; apps/duda/app/layout.tsx:12, apps/duda/app/page.tsx:6 #15) or business (apps/shop/app/layout.tsx:22). CORS `http://localhost:3000`, "In a production deployment, replace with the actual
shell origin" (apps/shop/next.config.js:25-27), access restriction in claim 2. Homepage interface rather than comments repeats: "Two independent Next.js applications seamlessly stitched together via URL rewrites.
Independent deployments, shared design system, and a cross-zone cart counter" (apps/shell/app/page.tsx:60-62), cards apps/shell/app/page.tsx:17-43, diagram apps/shell/app/page.tsx:120-128; like README counts two rather than three.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:1, 3 | "A production-style Microfrontend architecture using **Next.js 16 Multi-Zones** and **Turborepo**" | structure | corroborated | 3.4.3 (apps/duda, apps/shell, apps/shop = `Yes`); 3.4.5 #1-#2; 3.4.6 (package.json:9; turbo.json:6-10) |
| 2 | README.md:3 | "demonstrating independent deployability" | build-deploy | partial | 3.4.6 #1-#3 (build `separate`, deploy `not observed`); apps/shell/next.config.js:28-41 |
| 3 | README.md:3 | "a shared design system" | composition | corroborated | apps/shell/app/layout.tsx:10, 57; apps/shop/app/layout.tsx:14, 60; apps/duda/app/layout.tsx:3, 82; apps/shell/next.config.js:9; apps/shop/next.config.js:23; apps/duda/next.config.js:8 |
| 4 | README.md:3 | "cross-zone state" | composition | corroborated | 3.4.4 (apps/shop/app/actions.ts:26, communication); 3.4.5 #3-#4 |
| 5 | README.md:10, 18 | "localhost:3000/ ← Shell zone (homepage + global navigation)" / "`apps/shell` \| 3000 \| Host — homepage, global nav, rewrite proxy" | structure | corroborated | 3.4.3 (apps/shell = `Yes`); 3.4.4 (apps/shell/next.config.js:25, host-relationship); apps/shell/app/page.tsx:46; apps/shell/package.json:7, 9 |
| 6 | README.md:11 | "localhost:3000/shop/* ← Shell rewrites → Shop zone (localhost:3001/shop/*)" | composition | corroborated | 3.4.4 (apps/shell/next.config.js:25, host-relationship); 3.4.5 #2; apps/shell/next.config.js:32-41 |
| 7 | README.md:13 | "Cookie: mfe_cart_count ← Shared by both zones (port-agnostic on localhost)" | composition | corroborated | 3.4.4 (apps/shop/app/actions.ts:26, communication); 3.4.5 #3-#4; apps/shell/app/layout.tsx:29-32; apps/shop/app/layout.tsx:32-35 |
| 8 | README.md:19 | "`apps/shop` \| 3001 \| Remote — product listing & PDP (`basePath: /shop`)" | structure | corroborated | 3.4.3 (apps/shop = `Yes`); 3.4.5 #2; apps/shop/next.config.js:19; apps/shop/package.json:7, 9 |
| 9 | README.md:20 | "`packages/ui` \| — \| Shared design system — `Header`, `Button`" (`Button` portion) | composition | contradicted | packages/ui/src/index.ts:1; apps/shell/app/layout.tsx:10; apps/shop/app/layout.tsx:14; apps/duda/app/layout.tsx:3 |
| 10 | README.md:35 | "Turborepo starts shell (:3000) + shop (:3001) in parallel" | other | corroborated | package.json:10; turbo.json:11-14; apps/shell/package.json:7; apps/shop/package.json:7 |
| 11 | README.md:41-48 | "Run a single zone" / "Shell only" / "Shop only (direct, no shell proxy)" | independence | corroborated | 3.4.3 (apps/shell, apps/shop = `Yes`); apps/shell/package.json:7; apps/shop/package.json:7; apps/shop/next.config.js:19 |
| 12 | README.md:57 | "`turbo.json` \| Pipeline tasks with Turborepo caching" | build-deploy | corroborated | 3.4.6 (package.json:9; turbo.json:6-10); turbo.json:5-26 |
| 13 | README.md:71 | "Cross-zone links use plain `<a>` tags (not `<Link>`) to force a full navigation and load the correct zone's JS bundle." | composition | contradicted | 3.4.4 (apps/shell/app/page.tsx:68, 74; packages/ui/src/Header.tsx:74, 81); apps/shell/app/not-found/page.tsx:1, 50-55 |
| 14 | README.md:84 | "The `turbo.json` pipeline ensures `packages/ui` is always built before the apps, and apps build in parallel after that." | build-deploy | contradicted | 3.4.6 (packages/ui/package.json:13-16; turbo.json:6-10); apps/shell/next.config.js:9; apps/shop/next.config.js:23; apps/duda/next.config.js:8 |
| 15 | apps/duda/ARCHITECTURE.md:3, 7 | "the current Duda zone architecture" / "Zone app: `apps/duda`" | structure | corroborated | 3.4.3 (apps/duda = `Yes`); apps/duda/next.config.js:6; apps/duda/package.json:6-9 |
| 16 | apps/duda/ARCHITECTURE.md:9 | "Host shell route: `/duda` via shell rewrite to the Duda zone" | composition | corroborated | 3.4.4 (apps/shell/next.config.js:25, host-relationship); 3.4.5 #1; apps/shell/next.config.js:28-31; apps/duda/next.config.js:6 |
| 17 | apps/duda/ARCHITECTURE.md:10 | "All three zones (shell, shop, duda) share a single brand theme pipeline" | composition | corroborated | packages/ui/src/index.ts:5; apps/shell/app/layout.tsx:10, 28; apps/shop/app/layout.tsx:14, 31; apps/duda/app/layout.tsx:3, 23 |
| 18 | apps/shell/next.config.js:8 | "Compile the shared UI package from source (no separate build step needed)." | build-deploy | corroborated | 3.4.6 (transpilePackages in three apps; packages/ui/package.json:13-16); apps/shell/next.config.js:9 |
| 19 | apps/shop/app/layout.tsx:5-7 | "When accessed via the shell's rewrite (localhost:3000/shop) the browser loads the shell's layout for the outer chrome" | composition | contradicted | 3.4.5 (Repository overview: each zone renders whole page with own layout); apps/shell/next.config.js:32-41; apps/shop/app/layout.tsx:49-63 |

## Observations

**1. README.md:1, 3.** Title/opening micro-frontends using Next.js Multi-Zones/Turborepo. Three parts hold: three Next.js units (3.4.3), shell `rewrites()` (3.4.5 #1-#2), root `turbo build` with task `build` of `turbo.json` (package.json:9; turbo.json:6-10). "Production-style" unverifiable, 3.4.6 no deployment artifact. `description` of `metadata` repetitions: "A Next.js 16 Multi-Zone Microfrontend POC powered
by Turborepo and Tailwind CSS." (apps/shell/app/layout.tsx:18-19), "built with Next.js 16
Multi-Zones and Turborepo" (apps/shell/app/page.tsx:11-12).

**2. README.md:3.** Each own `next build`/standalone `next start` port (3.4.6 #1-#3), supports separate artifacts. Deployment no artifact, three `not observed` in 3.4.6. Shell `rewrites()` fixed `localhost` targets (apps/shell/next.config.js:28-41), shop CORS asks replacing origin "In a production deployment" (apps/shop/next.config.js:25-27): local-run configuration. Hence `partial`. Shell UI repeats "Independent deployments" (apps/shell/app/page.tsx:61).

**3. README.md:3.** Shared design system `packages/ui` (`@repo/ui`): three apps import/render `Header` in layouts (apps/shell/app/layout.tsx:10, 57; apps/shop/app/layout.tsx:14, 60; apps/duda/app/layout.tsx:3, 82), compile through `transpilePackages` (apps/shell/next.config.js:9; apps/shop/next.config.js:23; apps/duda/next.config.js:8). Repetitions: workspace `Header` portion (README.md:20; `Button` claim 9), file table ("Shared header showing
the live cart count", README.md:60), `apps/duda/ARCHITECTURE.md` scope ("Shared UI: `packages/ui`", apps/duda/ARCHITECTURE.md:8), duda layout ("Renders shared `Header` from `packages/ui`", apps/duda/ARCHITECTURE.md:136), "Shared header component" with `doc-mfe-term` "Renders
the MFE navigation header" (apps/duda/ARCHITECTURE.md:140-144). Source/composition treat `Header` shared code rather than relationship (3.4.4, Notes).

**4. README.md:3.** "Cross-zone state" cart count: shop Server Action writes cookie `mfe_cart_count` (3.4.4, apps/shop/app/actions.ts:26), shell/duda read (3.4.5 #3-#4). Unnamed mechanism; cookie claim 7.

**5. README.md:10, 18.** Diagram/table shell host with homepage/global navigation/rewrite proxy. `HomePage` at `/` (apps/shell/app/page.tsx:46), port 3000 (apps/shell/package.json:7, 9), source `rewrites()` `host-relationship` (3.4.4). Global navigation `Header` from `@repo/ui`, rendered by other zones too (claim 3). "rewrite
proxy" detailed claim 6.

**6. README.md:11.** Shell forwards `/shop`/`/shop/:path*` to `http://localhost:3001/shop`/`http://localhost:3001/shop/:path*` (apps/shell/next.config.js:32-41), composition relationship 2. Repetitions: "Navigate to **http://localhost:3000/shop** — transparently served
by the shop zone" (README.md:39); file table "**Rewrite rules** — the multi-zone
\"glue\"" (README.md:58, `doc-import-map-zones`); README.md:69; comment "MULTI-ZONE ROUTING — the core MFE \"string\" ... forwarding the request to the independent shop
Next.js app running on port 3001" (apps/shell/next.config.js:11-20); shop part apps/duda/ARCHITECTURE.md:29. Duda route claim 16.

**7. README.md:13.** Server Action `addToCart` writes `mfe_cart_count`, `path: '/'` (apps/shop/app/actions.ts:26-31), shell/shop layouts read (apps/shell/app/layout.tsx:29-32; apps/shop/app/layout.tsx:32-35). "Both zones" named two; duda also reads (apps/duda/app/layout.tsx:24-27), composition (3.4.5 #3). "port-agnostic" browser behavior, no own artifact. Repetitions: `doc-mfe-term` README.md:62 ("Server
Action — increments `mfe_cart_count` cookie"), README.md:72 (`doc-mfe-term`), comments apps/shell/app/layout.tsx:4-6, apps/shop/app/layout.tsx:9-10, apps/shop/app/actions.ts:4-9, packages/ui/src/Header.tsx:6, 90.

**8. README.md:19.** Shop `basePath: '/shop'` (apps/shop/next.config.js:19), port 3001 (apps/shop/package.json:7, 9), listing `/shop`, detail `/shop/[id]` (apps/shop/app/page.tsx:65; apps/shop/app/[id]/page.tsx). "Remote" README label: composition `other`, route forwarding not module loading (3.4.5 #2), but host-reached role holds. `basePath` repetitions README.md:59, README.md:70, "MULTI-ZONE KEY SETTING" (apps/shop/next.config.js:6-18).

**9. README.md:20.** Shared system `Header`/`Button`. `Header` three apps (claim 3), `Button` exported `packages/ui/src/index.ts:1` imported by none: `@repo/ui` layout imports only `Header`, `getDudaBrandTheme`, `normalizeHeaderTheme` (apps/shell/app/layout.tsx:10; apps/shop/app/layout.tsx:14; apps/duda/app/layout.tsx:3), `Button` search in `apps/` only UI text apps/shell/app/page.tsx:33. Package existence insufficient sharing, `Button` `contradicted`. Repetition "Shared button
(`\"use client\"`)" (README.md:61), UI "@repo/ui exports a Header and Button
consumed by both zones" (apps/shell/app/page.tsx:33).

**10. README.md:35.** Command comment root `npm run dev` parallel shell/shop. `turbo dev` (package.json:10), persistent uncached `dev` (turbo.json:11-14), each workspace `dev`: shell 3000/shop 3001 (apps/shell/package.json:7; apps/shop/package.json:7). Also duda 3002 (apps/duda/package.json:7), unmentioned. "Install & run all zones
simultaneously" (README.md:31) repeats.

**11. README.md:41-48.** Each own `dev`, starts independently (apps/shell/package.json:7; apps/shop/package.json:7); direct shop `localhost:3001/shop` through `basePath` (apps/shop/next.config.js:19). Three own manifests/entries/builds (3.4.3). Repetitions "the independent shop
Next.js app" (apps/shell/next.config.js:15), "The shop zone has its own <html> root because it is
an independent Next.js app" (apps/shop/app/layout.tsx:4-5).

**12. README.md:57.** `turbo.json` tasks `build`, `dev`, `lint`, `type-check`, `clean` (turbo.json:5-26), cached `build` outputs (turbo.json:9), root `build` `turbo build` (package.json:9), per 3.4.6. "Turborepo caching" (README.md:76), commands (README.md:78-82) repeat; "sub-second" lacks artifact.

**13. README.md:71.** `Header`/homepage cross-zone `<a>` (packages/ui/src/Header.tsx:74, 81; apps/shell/app/page.tsx:68, 74), as source review. But shell `not-found` imports `Link` from `next/link` (apps/shell/app/not-found/page.tsx:1), uses `/shop`/`/duda` links (apps/shell/app/not-found/page.tsx:50-55), other zones. General "Cross-zone links use plain `<a>` tags (not `<Link>`)" refuted there, `contradicted`; `Header`/homepage hold. Shop `<Link>` own routes (apps/shop/app/page.tsx:103-104, 116-117; apps/shop/app/[id]/page.tsx:106-107). Comments apps/shell/next.config.js:21-23, apps/shell/app/page.tsx:4-5, 66, packages/ui/src/Header.tsx:45, 72 repeat.

**14. README.md:84.** `packages/ui` lacks `build` (packages/ui/package.json:13-16), `dependsOn: ["^build"]` (turbo.json:7) nothing to execute; compiled per-app `transpilePackages` (apps/shell/next.config.js:9; apps/shop/next.config.js:23; apps/duda/next.config.js:8), per 3.4.6. "apps build in parallel" holds (three independent `next build`), "ensures `packages/ui` is always built
before the apps" refuted, `contradicted`. Shell comment opposite README (claim 18). UI diagram repeats "build ──► ^build (packages/ui first, then apps in parallel)" (apps/shell/app/page.tsx:126).

**15. apps/duda/ARCHITECTURE.md:3, 7.** `apps/duda` Next.js, `basePath: '/duda'`, own port-3002 scripts (apps/duda/next.config.js:6; apps/duda/package.json:6-9), three-unit structural review (3.4.3). `description` repetitions "Duda integration
zone." (apps/duda/app/layout.tsx:12), "Duda site inside a dedicated multi-zone app." (apps/duda/app/page.tsx:6). "All three zones" claim 17.

**16. apps/duda/ARCHITECTURE.md:9.** Shell forwards `/duda` to `http://localhost:3002/duda` (apps/shell/next.config.js:28-31), duda `basePath` (apps/duda/next.config.js:6), composition relationship 1. Only `/duda`, no `/duda/:path*` (3.4.5, Repository overview); sole page, no claim limit. apps/duda/ARCHITECTURE.md:28-29 repeats flow.

**17. apps/duda/ARCHITECTURE.md:10.** `getDudaBrandTheme` exported `@repo/ui` (packages/ui/src/index.ts:5), called by three layouts (apps/shell/app/layout.tsx:28; apps/shop/app/layout.tsx:31; apps/duda/app/layout.tsx:23), applying `--brand-*` on `body`. More than two units, shared library. Minor difference shell/shop reapply `normalizeHeaderTheme`, duda not, function already normalizes before return (packages/ui/src/dudaBrandTheme.ts:356), as apps/duda/ARCHITECTURE.md:51 says. Repetitions apps/duda/ARCHITECTURE.md:30, 45 ("Single source of truth for
`--brand-*` CSS variables used by all three zones"). Previous reviews no relationship since shared code; snapshot evidence.

**18. apps/shell/next.config.js:8.** `@repo/ui` compiled from source without own build. 3.4.6 same: no package `build` (packages/ui/package.json:13-16), `main`/`exports` `./src/index.ts` (packages/ui/package.json:5-11), per-app `transpilePackages` (apps/shell/next.config.js:9). Contradicts README claim 14.

**19. apps/shop/app/layout.tsx:5-7.** Says shell rewrite access displays shop within shell layout, own layout only direct. Rewrite forwards whole request (apps/shell/next.config.js:32-41), shop responds own `<html>`, `<body>`, `Header` (apps/shop/app/layout.tsx:49-63) both ways; composition whole-page per-zone layouts (3.4.5, Repository overview). Nothing applies shell layout to shop response, `contradicted`. "its own <html> root because it is an independent Next.js app" (apps/shop/app/layout.tsx:4-5) holds, claim 11.

## Summary

Claims: 19 (corroborated: 14, partial: 1, contradicted: 4, uncorroborated: 0). Themes: (structure: 4, composition: 9, build-deploy: 4, independence: 1, other: 1).
