---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
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

# 316 — Tutul33/mf-workspace

## Repository overview

Two English documents were read in full: `README.md` and `angular_20_microfrontend_app_guide.md`. Both are project-specific guides rather than standard Angular CLI READMEs. Content is nearly repeated; README adds general workspace tree (README.md:213-253). Guide presents three Angular 20 applications, one host and two remotes, and Native Federation (README.md:3,22-24). This matches structural review’s three units and composition review’s two active relationships (3.4.3, Units table; 3.4.5 #1-#2). All five previous reviews are `final`, sharing classification/acquisition commit.

Configuration/code blocks are reproduced guide examples without separate claims: remote configurations, route modules, Home component and host routes (README.md:67-183; angular_20_microfrontend_app_guide.md:67-183). Routing example matches projects/host-app/src/app/app.routes.ts:4-26; internal examples have detail differences, such as guide `HomeComponent` versus snapshot `Home` (projects/customer-app/src/app/customer/home/home.ts:9; projects/orders-app/src/app/orders/home/home.ts:9). Small tree at README.md:54-63 and angular_20_microfrontend_app_guide.md:54-63 describes only customer-app internals without a collective unit property; its `customer-routes.module.ts` appears under `src/app`, whereas actual file is in `src/app/customer` (projects/customer-app/federation.config.js:9). Instructions to create empty workspace (README.md:7-12; angular_20_microfrontend_app_guide.md:7-12), generate/install/initialize (README.md:16-48; angular_20_microfrontend_app_guide.md:16-48), open three terminals and test host URLs (README.md:187-209; angular_20_microfrontend_app_guide.md:187-209) are tutorial steps. They claim neither deployment nor independent evolution. Expected texts “Customer Home” and “Orders Home” are presentation details; actual templates say “Customer home works!” and “Orders home works!” (projects/customer-app/src/app/customer/home/home.html:1; projects/orders-app/src/app/orders/home/home.html:1).

`doc-*` occurrences without separate rows: README.md:1,28 and angular_20_microfrontend_app_guide.md:1,28 are titles; README.md:246 is guide name in tree without additional claim; README.md:255 and angular_20_microfrontend_app_guide.md:214 are closing headings repeating claim #1’s configuration. README.md:3 and angular_20_microfrontend_app_guide.md:3 occurrences consolidate in #1; README.md:258 and angular_20_microfrontend_app_guide.md:217 repeat #3-#4 roles. README.md:267 and angular_20_microfrontend_app_guide.md:226 offer “Tailwind + Material setup for MFEs” as possible continuation (“Let me know if you want”), without claiming current implementation; same applies to additional remotes (README.md:263-267; angular_20_microfrontend_app_guide.md:222-226). “Standalone components” and “Angular 20 compatible configuration” (README.md:260-261; angular_20_microfrontend_app_guide.md:219-220) concern internal components and version already included in #1, without another inter-unit relationship.

Comments/descriptive fields read in artifacts cited by previous reviews: package.json (no `description`), angular.json (no comments), .gitignore, .vscode/tasks.json, three federation.config.js, main.ts, bootstrap.ts, app.config.ts, app.routes.ts and host app.html, plus remote route modules. Federation comments are generic tool instructions on `skip`, sharing and `ignoreUnusedDeps` (projects/host-app/federation.config.js:14-24; projects/customer-app/federation.config.js:21-31; projects/orders-app/federation.config.js:21-31). Alternative `./Component` exposures are commented (projects/customer-app/federation.config.js:8; projects/orders-app/federation.config.js:8); they are not prose claiming active relationships. None adds a project-specific architectural claim. Host `initFederation` map points `customerApp` to host’s own port (projects/host-app/src/main.ts:3-5; angular.json:114), as 3.4.4 and 3.4.5 already record; documented relationships use direct route URLs (projects/host-app/src/app/app.routes.ts:8-19). Corroboration below uses artifacts without executing guide.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | “Host + Customer-App + Orders-App” / “microfrontend setup using Angular 20 and @angular-architects/native-federation” | structure | corroborated | 3.4.3 (Units: customer-app, host-app and orders-app = Yes); 3.4.2 (@angular-architects/native-federation configured = Yes); package.json:23-29,36; 3.4.5 #1-#2 |
| 2 | README.md:22 | “host-app → main shell” | structure | corroborated | 3.4.5 #1-#2; projects/host-app/src/app/app.html:1-3; projects/host-app/src/app/app.routes.ts:4-20 |
| 3 | README.md:23 | “customer-app → remote” | structure | corroborated | 3.4.5 #1; projects/customer-app/federation.config.js:5-10; projects/host-app/src/app/app.routes.ts:6-11 |
| 4 | README.md:24 | “orders-app → remote” | structure | corroborated | 3.4.5 #2; projects/orders-app/federation.config.js:5-10; projects/host-app/src/app/app.routes.ts:14-19 |
| 5 | README.md:213-251 | “Folder Structure: MF-WORKSPACE” / “projects” / “customer-app” / “host-app” / “orders-app” / “public” / “dist” / “node_modules” | structure | partial | 3.4.3 (Workspace and Units); angular.json:13-14,126-127,239-240; angular.json:68,181,294; .gitignore:4,10,32 |
| 6 | README.md:259 | “Federated routing” | composition | corroborated | 3.4.5 #1-#2; projects/host-app/src/app/app.routes.ts:2-19; projects/customer-app/src/app/customer/customer-routes.module.ts:5-12; projects/orders-app/src/app/orders/orders-routes.module.ts:5-12 |

## Observations

**1. README.md:3.** Sentence presents three applications collectively and technology. Workspace registers all three projects (angular.json:6,119,232), manifest declares Angular 20 and `@angular-architects/native-federation` (package.json:23-29,36), and composition review confirms both host → remote links (3.4.5 #1-#2). Sentence recurs at angular_20_microfrontend_app_guide.md:3; titles README.md:1,255 and angular_20_microfrontend_app_guide.md:1,214 repeat the framing. Corroboration concerns snapshot configuration/relationships; closing title’s “working” does not represent a test executed in this review.

**2. README.md:22.** Host is shell offering navigation links/outlet (projects/host-app/src/app/app.html:1-3), with two remote routes registered (projects/host-app/src/app/app.routes.ts:4-20). Same role repeats at angular_20_microfrontend_app_guide.md:22 and final lists “A host container app” (README.md:257; angular_20_microfrontend_app_guide.md:216). Initialization heading “Host” (README.md:36; angular_20_microfrontend_app_guide.md:36) adds no property.

**3. README.md:23.** Customer-app exposes `./CustomerRoutes` (projects/customer-app/federation.config.js:5-10), loaded by host at route `customers` (projects/host-app/src/app/app.routes.ts:6-11). This is relationship 3.4.5 #1. Role repeats at angular_20_microfrontend_app_guide.md:23, headings “Customer Remote” and “Configure customer-app (Remote)” in both documents (:40 and :52), and count “Two remote microfrontends” (README.md:258; angular_20_microfrontend_app_guide.md:217), consolidated here and in #4.

**4. README.md:24.** Orders-app exposes `./OrdersRoutes` (projects/orders-app/federation.config.js:5-10), consumed by route `orders` (projects/host-app/src/app/app.routes.ts:14-19), as in 3.4.5 #2. Sentence recurs at angular_20_microfrontend_app_guide.md:24; heading “Orders Remote” (:44 in both documents) and final two-remote count repeat role without new claim.

**5. README.md:213-251.** Tree represents three applications within `projects/`, with own federation configurations/tsconfigs and root workspace files. This matches structural review and configured directories (angular.json:13-14,126-127,239-240). Tree also includes `public` in each project, `.angular`, `dist` and `node_modules`; these directories lack files in snapshot inventory. `public` paths are configured asset inputs (angular.json:68,181,294), but that does not demonstrate contents. `.gitignore:4,10,32` excludes outputs, dependencies and cache. Thus drawing documents a working tree broader than acquired files: present part confirmed, remainder lacks artifacts, resulting in `partial`.

**6. README.md:259.** Federated routing is implemented: `loadChildren` calls `loadRemoteModule` for each `remoteEntry.json` URL and selects exposed module (projects/host-app/src/app/app.routes.ts:2-19). Remote modules register pages through `RouterModule.forChild` (projects/customer-app/src/app/customer/customer-routes.module.ts:5-12; projects/orders-app/src/app/orders/orders-routes.module.ts:5-12). Claim recurs at angular_20_microfrontend_app_guide.md:218. Both documents’ route examples (:159-183) and `/customers` and `/orders` testing instructions (:197-209) illustrate the same link without new table rows.

## Summary

Claims: 6 (corroborated: 5, partial: 1, contradicted: 0, uncorroborated: 0). Themes: (structure: 5, composition: 1).
