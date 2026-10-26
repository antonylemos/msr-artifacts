---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
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

# 202 — harshad-eden/module-federation

## Repository overview

Fictional insurance-platform example: pnpm monorepo (`apps/*` and `packages/*`) with four React/Vite applications. `apps/shell` host, `apps/sales-portal`, `apps/underwriter-portal` and `apps/product-config` remotes. Four frontend units with own manifest, entry and build (#17, #18, #19, #20). Root and two `packages/` packages are not units (#16, #21, #22).

Module Federation chain complete in three relationships:
- **Dependency:** `@originjs/vite-plugin-federation` `^1.3.5`, declared in four units (#1, #2, #3, #4).
- **Configuration:** each remote names itself (`productConfig`, `salesPortal`, `underwriterPortal`), generates `remoteEntry.js` and exposes `./App` (#5, #6, #8). Shell declares three remotes by URL (#7). All four share `react`, `react-dom` and `react-router-dom`.
- **Code:** shell has wrapper per remote, importing `<remote>/App` through `React.lazy` (#9, #10, #11), rendering inside `ErrorBoundary` and `Suspense` (#13, #14, #15). Shell route table links `/sales/*`, `/underwriter/*` and `/products/*` to wrappers (#12).
- **Relationship:** three active shell → remote relationships result (#23, #24, #25).

Four builds separate, triggered by root, without observed deployment (#26 through #29). Remote URLs fixed to `localhost` in shell build (#7), limiting execution to one machine without changing composition.

Documentation extensive, in six Markdown files, producing 35 claims (#30 through #64). Most match chain above. Misleading signals reside there:
- six applications, with `employer-portal` and `service-provider`, absent from snapshot and shell remotes (#61, #62);
- login with shared session, implemented by no unit and listed as pending in `TODO.md` (#58);
- `shared-types` called shared although only sales-portal imports it (#40);
- address `http://localhost:3001/remoteEntry.js`, unlike configuration `/dist/assets/` path (#55);
- production domains, rollback, release cycles and performance isolation without snapshot artifact (#47, #48, #50, #59, #60); per-application deployment and loading from own domains only partially corroborated (#31, #33, #49).

History has 2 same-day commits. First already contains entire project and documents, so mismatches coexist since first observable presence without abandoned stage (#65 through #69). Nothing remains ambiguous in snapshot.

## Observations

### 1. apps/product-config/package.json:23

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) is declared in `devDependencies`.

**Interpretation:** Federation technology present in product-config build.

### 2. apps/sales-portal/package.json:23

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) is declared in `devDependencies`.

**Interpretation:** Federation technology present in sales-portal build.

### 3. apps/shell/package.json:24

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) is declared in `devDependencies`.

**Interpretation:** Federation technology present in shell build.

### 4. apps/underwriter-portal/package.json:23

**Observation:** `@originjs/vite-plugin-federation` (`^1.3.5`) is declared in `devDependencies`.

**Interpretation:** Federation technology present in underwriter-portal build.

### 5. apps/product-config/vite.config.ts:3, 8-15

**Observation:** `vite.config.ts` imports `federation`, invoking in `plugins` with `name: "productConfig"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.tsx" }` and `shared: ["react", "react-dom", "react-router-dom"]`.

**Interpretation:** product-config configured as Module Federation remote with own name and module exposed to host.

**Note:** Port 3004 and CORS headers in `server` block (lines 25-32) belong to development server, excluded.

### 6. apps/sales-portal/vite.config.ts:3, 8-15

**Observation:** `vite.config.ts` imports `federation`, invoking in `plugins` with `name: "salesPortal"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.tsx" }` and `shared: ["react", "react-dom", "react-router-dom"]`.

**Interpretation:** sales-portal configured as Module Federation remote with own name and module exposed to host.

**Note:** Port 3001 and CORS headers in `server` block (lines 25-32) belong to development server, excluded.

### 7. apps/shell/vite.config.ts:3, 8-16

**Observation:** `vite.config.ts` imports `federation`, invoking in `plugins` with `name: "shell"`, `remotes: { salesPortal: "http://localhost:3001/dist/assets/remoteEntry.js", underwriterPortal: "http://localhost:3002/dist/assets/remoteEntry.js", productConfig: "http://localhost:3004/dist/assets/remoteEntry.js" }` and `shared: ["react", "react-dom", "react-router-dom"]`. No `filename` or `exposes`.

**Interpretation:** Host configuration declares three remotes with matching self-declared names (#5, #6, #8), and local address of each.

**Note:** Port 3000 in `server` block (lines 23-25) belongs to development server, excluded.

### 8. apps/underwriter-portal/vite.config.ts:3, 8-15

**Observation:** `vite.config.ts` imports `federation`, invoking in `plugins` with `name: "underwriterPortal"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.tsx" }` and `shared: ["react", "react-dom", "react-router-dom"]`.

**Interpretation:** underwriter-portal configured as Module Federation remote with own name and module exposed to host.

**Note:** Port 3002 and CORS headers in `server` block (lines 25-32) belong to development server, excluded.

### 9. apps/shell/src/components/ProductConfig.tsx:5; apps/shell/src/components/ProductConfig.tsx:4-26

**Observation:** `const RemoteProductConfig = lazy(() => import("productConfig/App").catch(() => ({ default: () => (…) })))`; `.catch` returns local component saying portal unavailable on port 3004.

**Interpretation:** Shell loads `./App` module from remote `productConfig` by name at runtime, with local screen on failure.

### 10. apps/shell/src/components/SalesPortal.tsx:5; apps/shell/src/components/SalesPortal.tsx:4-27

**Observation:** `const RemoteSalesPortal = lazy(() => import("salesPortal/App").catch((err) => ({ default: () => (…) })))`; `.catch` returns local unavailability component.

**Interpretation:** Shell loads `./App` module from remote `salesPortal` by name at runtime, with local screen on failure.

### 11. apps/shell/src/components/UnderwriterPortal.tsx:5; apps/shell/src/components/UnderwriterPortal.tsx:4-26

**Observation:** `const RemoteUnderwriterPortal = lazy(() => import("underwriterPortal/App").catch(() => ({ default: () => (…) })))`; `.catch` returns local unavailability component.

**Interpretation:** Shell loads `./App` module from remote `underwriterPortal` by name at runtime, with local screen on failure.

### 12. apps/shell/src/App.tsx:12; apps/shell/src/App.tsx:5-7, 12-17; apps/shell/src/main.tsx:7-13

**Observation:** `<Routes>` with `<Route path="/sales/*" element={<SalesPortal />} />`, `<Route path="/underwriter/*" element={<UnderwriterPortal />} />` and `<Route path="/products/*" element={<ProductConfig />} />`, plus `/` for local `Dashboard`. Three components are wrappers imported from `./components/`. `App` mounted inside `BrowserRouter`.

**Interpretation:** Shell route table links URL prefix to each remote wrapper (#9, #10, #11), deciding unit loading.

### 13. apps/shell/src/components/ProductConfig.tsx:75; apps/shell/src/components/ProductConfig.tsx:62-77

**Observation:** `<RemoteProductConfig />`, inside `<ErrorBoundary FallbackComponent={ErrorFallback}>` and `<Suspense fallback={…}>`. Component comes from `lazy` on line 4.

**Interpretation:** Shell renders federated product-config component protected by error/loading boundary.

### 14. apps/shell/src/components/SalesPortal.tsx:84; apps/shell/src/components/SalesPortal.tsx:69-86

**Observation:** `<RemoteSalesPortal />`, inside `<ErrorBoundary FallbackComponent={ErrorFallback}>` and `<Suspense fallback={…}>`. Component comes from `lazy` on line 4.

**Interpretation:** Shell renders federated sales-portal component protected by error/loading boundary.

### 15. apps/shell/src/components/UnderwriterPortal.tsx:75; apps/shell/src/components/UnderwriterPortal.tsx:62-77

**Observation:** `<RemoteUnderwriterPortal />`, inside `<ErrorBoundary FallbackComponent={ErrorFallback}>` and `<Suspense fallback={…}>`. Component comes from `lazy` on line 4.

**Interpretation:** Shell renders federated underwriter-portal component protected by error/loading boundary.

### 16. .; package.json:1-43; package.json:16-22

**Observation:** Root with manifest `insurance-platform` (`private`), `workspaces` `apps/*` and `packages/*` and scripts only delegating to packages/applications (`cd … && pnpm run build`). No UI entry or build configuration.

**Interpretation:** Workspace coordination root rather than frontend unit.

### 17. apps/product-config; apps/product-config/package.json:1-9; apps/product-config/index.html:10-11; apps/product-config/src/main.tsx:7-13; apps/product-config/vite.config.ts:5-33; apps/product-config/package.json:7

**Observation:** Directory with manifest `@insurance/product-config`, `index.html` with `#root` loading `/src/main.tsx`, entry mounting React, own `vite.config.ts` and `build` script `tsc && vite build`. Workspace membership through `apps/*` (pnpm-workspace.yaml:2).

**Interpretation:** Frontend unit with own boundary, also running standalone.

### 18. apps/sales-portal; apps/sales-portal/package.json:1-9; apps/sales-portal/index.html:10-11; apps/sales-portal/src/main.tsx:7-13; apps/sales-portal/vite.config.ts:5-33; apps/sales-portal/package.json:7

**Observation:** Directory with manifest `@insurance/sales-portal`, `index.html` with `#root` loading `/src/main.tsx`, entry mounting React, own `vite.config.ts` and `build` script `tsc && vite build`. Workspace membership through `apps/*` (pnpm-workspace.yaml:2).

**Interpretation:** Frontend unit with own boundary, also running standalone.

### 19. apps/shell; apps/shell/package.json:1-9; apps/shell/index.html:10-11; apps/shell/src/main.tsx:7-13; apps/shell/vite.config.ts:5-26; apps/shell/package.json:7

**Observation:** Directory with manifest `@insurance/shell`, `index.html` with `#root` loading `/src/main.tsx`, entry mounting React inside `BrowserRouter`, own `vite.config.ts` and `build` script `tsc && vite build`. Workspace membership through `apps/*` (pnpm-workspace.yaml:2).

**Interpretation:** Frontend unit with own boundary, containing federated imports (#9, #10, #11).

### 20. apps/underwriter-portal; apps/underwriter-portal/package.json:1-9; apps/underwriter-portal/index.html:10-11; apps/underwriter-portal/src/main.tsx:7-13; apps/underwriter-portal/vite.config.ts:5-33; apps/underwriter-portal/package.json:7

**Observation:** Directory with manifest `@insurance/underwriter-portal`, `index.html` with `#root` loading `/src/main.tsx`, entry mounting React, own `vite.config.ts` and `build` script `tsc && vite build`. Workspace membership through `apps/*` (pnpm-workspace.yaml:2).

**Interpretation:** Frontend unit with own boundary, also running standalone.

### 21. packages/shared-types; packages/shared-types/package.json:1-17; packages/shared-types/package.json:8

**Observation:** Manifest `@insurance/shared-types` with `main: dist/index.js` and `tsc` build without application entry. Workspace membership through `packages/*` (pnpm-workspace.yaml:3).

**Interpretation:** Shared types package rather than frontend unit.

### 22. packages/shared-ui; packages/shared-ui/package.json:1-39; packages/shared-ui/package.json:8

**Observation:** Manifest `@insurance/shared-ui` with `main: dist/index.js` and `tsc` build followed by `tailwindcss`, without application entry. Workspace membership through `packages/*` (pnpm-workspace.yaml:3).

**Interpretation:** Shared component library rather than frontend unit.

### 23. apps/shell/src/components/ProductConfig.tsx:5; apps/shell/src/App.tsx:16; apps/shell/src/components/ProductConfig.tsx:75; apps/shell/vite.config.ts:13; apps/product-config/vite.config.ts:9-13

**Observation:** Shell specifier `productConfig/App` matches remote `productConfig` (`http://localhost:3004/dist/assets/remoteEntry.js`) in shell configuration and, in product-config, `name: "productConfig"`, `filename: "remoteEntry.js"` and key `./App`. Wrapper rendered at `/products/*` route, rendering remote component. Relationship has In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active Module Federation host → remote relationship from shell to product-config. Target resolved through name and exposed key.

### 24. apps/shell/src/components/SalesPortal.tsx:5; apps/shell/src/App.tsx:14; apps/shell/src/components/SalesPortal.tsx:84; apps/shell/vite.config.ts:11; apps/sales-portal/vite.config.ts:9-13

**Observation:** Shell specifier `salesPortal/App` matches remote `salesPortal` (`http://localhost:3001/dist/assets/remoteEntry.js`) in shell configuration and, in sales-portal, `name: "salesPortal"`, `filename: "remoteEntry.js"` and key `./App`. Wrapper rendered at `/sales/*` route, rendering remote component. Relationship has In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active Module Federation host → remote relationship from shell to sales-portal. Remote declares routes with and without prefix `/sales` (apps/sales-portal/src/App.tsx:11-18), allowing same screens under shell or standalone.

### 25. apps/shell/src/components/UnderwriterPortal.tsx:5; apps/shell/src/App.tsx:15; apps/shell/src/components/UnderwriterPortal.tsx:75; apps/shell/vite.config.ts:12; apps/underwriter-portal/vite.config.ts:9-13

**Observation:** Shell specifier `underwriterPortal/App` matches remote `underwriterPortal` (`http://localhost:3002/dist/assets/remoteEntry.js`) in shell configuration and, in underwriter-portal, `name: "underwriterPortal"`, `filename: "remoteEntry.js"` and key `./App`. Wrapper rendered at `/underwriter/*` route, rendering remote component. Relationship has In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active Module Federation host → remote relationship from shell to underwriter-portal. Remote declares routes with and without prefix `/underwriter` (apps/underwriter-portal/src/App.tsx:11-18).

### 26. apps/product-config/package.json:7; apps/product-config/vite.config.ts:5-33; package.json:22; apps/product-config/package.json:3

**Observation:** Script `build` `tsc && vite build` with own `vite.config.ts`, generating `remoteEntry.js` of remote `productConfig`; root only invokes (`build:product`). Sole address local server on port 3004 (`dev` and `preview`). No Dockerfile, CI, compose or `vercel.json`. `version: "1.0.0"`, unused in publication.

**Interpretation:** product-config has separate build. Deployment unobserved, no versioning used in publication.

### 27. apps/sales-portal/package.json:7; apps/sales-portal/vite.config.ts:5-33; package.json:20; apps/sales-portal/package.json:3

**Observation:** Script `build` `tsc && vite build` with own `vite.config.ts`, generating `remoteEntry.js` of remote `salesPortal`; root only invokes (`build:sales`). Sole address local server on port 3001 (`dev` with `--strictPort` and `preview`). No Dockerfile, CI, compose or `vercel.json`. `version: "1.0.0"`, unused in publication.

**Interpretation:** sales-portal has separate build. Deployment unobserved, no versioning used in publication.

### 28. apps/shell/package.json:7; apps/shell/vite.config.ts:5-26; package.json:19; apps/shell/package.json:3

**Observation:** Script `build` `tsc && vite build` with own host `vite.config.ts`, embedding remote `localhost` URLs; root only invokes (`build:shell`). Sole address local server on port 3000. No Dockerfile, CI, compose or `vercel.json`. `version: "1.0.0"`, unused in publication.

**Interpretation:** Shell has separate build only working against remotes served on same machine. Deployment unobserved, no versioning used in publication.

### 29. apps/underwriter-portal/package.json:7; apps/underwriter-portal/vite.config.ts:5-33; package.json:21; apps/underwriter-portal/package.json:3

**Observation:** Script `build` `tsc && vite build` with own `vite.config.ts`, generating `remoteEntry.js` of remote `underwriterPortal`; root only invokes (`build:underwriter`). Sole address local server on port 3002. No Dockerfile, CI, compose or `vercel.json`. `version: "1.0.0"`, unused in publication.

**Interpretation:** underwriter-portal has separate build. Deployment unobserved, no versioning used in publication.

### 30. ARCHITECTURE_DOCUMENTATION.md:5

**Observation:** "This project implements a **Micro-Frontend Architecture** using **Module Federation** within a **Monorepo** structure."

**Interpretation:** Claims micro-frontends linked through Module Federation in monorepo. Configured dependency in four units (#1 through #4), four workspace units (#17 through #20) and three relationships (#23, #24, #25) confirm claim.

### 31. ARCHITECTURE_DOCUMENTATION.md:5

**Observation:** "multiple independent applications work together as a unified system"

**Interpretation:** Claims independent applications working as one system. Each unit has own entry/build (#17 through #20), shell unites through remote configuration (#7). Independence not fully confirmed: deployment unobserved (#26 through #29), shell only works with remotes at fixed addresses. Claim partially corroborated.

### 32. ARCHITECTURE_DOCUMENTATION.md:12

**Observation:** "Independent development [...] of features"

**Interpretation:** Claims independent development. Each application has own manifest, entry/build (#17 through #20) and development server invoked by separate root script (package.json:12-15), confirming claim.

### 33. ARCHITECTURE_DOCUMENTATION.md:12

**Observation:** "Independent [...] deployment of features"

**Interpretation:** Claims independent deployment. Four applications have separate build (#26 through #29), but deployment unobserved in all. Claim partially corroborated.

### 34. ARCHITECTURE_DOCUMENTATION.md:13

**Observation:** "Technology diversity across teams"

**Interpretation:** Claims each team can use different technologies. Four applications use same React, React Router and Vite versions, sharing libraries through federation (#5 through #8), neither confirming nor refuting possibility. Claim uncorroborated.

### 35. ARCHITECTURE_DOCUMENTATION.md:14

**Observation:** "Runtime composition of applications"

**Interpretation:** Claims runtime composition. Federated imports through `React.lazy` (#9, #10, #11), remote component rendering (#13, #14, #15) and three active relationships (#23, #24, #25) confirm claim.

### 36. ARCHITECTURE_DOCUMENTATION.md:19-20

**Observation:** "The project uses a monorepo pattern with workspace management: - Single repository containing multiple related applications"

**Interpretation:** Claims monorepo with application-grouping workspace. Pnpm workspace covers `apps/*` and `packages/*` (pnpm-workspace.yaml:1-3; package.json:6-9), confirming claim.

### 37. ARCHITECTURE_DOCUMENTATION.md:29-74

**Observation:** Tree: "apps/ # Micro-frontend applications", "shell/ # Host application (Module Federation Host)", "SalesPortal.tsx # Remote wrapper for Sales" [...], "sales-portal/ # Sales micro-frontend (Remote)", "underwriter-portal/ # Underwriting micro-frontend (Remote)", "product-config/ # Product configuration micro-frontend (Remote)"

**Interpretation:** Describes host and three remotes, wrapper per remote in shell. Four units (#17 through #20), three wrappers (#9, #10, #11) and three relationships (#23, #24, #25) confirm tree.

### 38. ARCHITECTURE_DOCUMENTATION.md:52

**Observation:** "main.tsx # Standalone entry point" (remote runs standalone)

**Interpretation:** Claims remote has own standalone entry. Sales-portal entry (#18), development server (apps/sales-portal/package.json:6) and unprefixed routes (apps/sales-portal/src/App.tsx:12-14) confirm claim.

### 39. ARCHITECTURE_DOCUMENTATION.md:76-77

**Observation:** "packages/ # Shared libraries" / "shared-ui/ # Common UI components"

**Interpretation:** Claims common UI library. `shared-ui` (#22) used by four units (e.g. apps/shell/src/components/Dashboard.tsx:3; apps/sales-portal/src/App.tsx:3), confirming claim. Package not frontend unit.

### 40. ARCHITECTURE_DOCUMENTATION.md:78

**Observation:** "shared-types/ # Shared TypeScript types"

**Interpretation:** Claims types shared between applications. All four declare `@insurance/shared-types` (e.g. apps/shell/package.json:16), but only sales-portal imports it (apps/sales-portal/src/components/QuotesList.tsx:3; apps/sales-portal/src/components/PoliciesList.tsx:3). Snapshot refutes sharing.

### 41. ARCHITECTURE_DOCUMENTATION.md:108-114

**Observation:** "Each portal acts as a **Module Federation Remote**" / "Sales Portal | 3001 | Remote | `./App` component" [...]

**Interpretation:** Claims each portal is remote exposing `./App`. Three remote configurations (#5, #6, #8) and three relationships (#23, #24, #25) confirm claim.

### 42. ARCHITECTURE_DOCUMENTATION.md:132

**Observation:** "No build-time dependencies between micro-frontends"

**Interpretation:** Claims no build dependency between micro-frontends. Four builds separate (#26 through #29), `build:apps` runs all four in parallel (package.json:18), shell depends on no application in manifest (apps/shell/package.json:10-28), confirming claim.

### 43. ARCHITECTURE_DOCUMENTATION.md:136-138

**Observation:** "Each remote module wrapped in error boundaries" / "Graceful degradation when remotes fail to load" / "Fallback UI with links to standalone applications"

**Interpretation:** Claims failure isolation when loading remotes. Each wrapper renders remote inside `ErrorBoundary` and `Suspense` (#13, #14, #15), returning local screen linked to remote server upon import failure (apps/shell/src/components/SalesPortal.tsx:4-28), confirming claim.

### 44. ARCHITECTURE_DOCUMENTATION.md:141-143

**Observation:** "Shell app provides consistent navigation" / "Each portal maintains its own internal routing" / "Seamless transitions between applications"

**Interpretation:** Claims shell navigation and remote internal routing. Shell routes (#12), `Layout` with navigation bar (apps/shell/src/components/Layout.tsx:8-13, 30-48, 54) and remote internal routes under shell `BrowserRouter` (apps/sales-portal/src/App.tsx:11-18) confirm claim.

### 45. ARCHITECTURE_DOCUMENTATION.md:152-153

**Observation:** "**Vite**: Build tool and dev server" / "**@originjs/vite-plugin-federation**: Module Federation implementation for Vite"

**Interpretation:** Names Vite and federation plugin, same declared (#1 through #4) and configured (#5 through #8) in four units.

### 46. ARCHITECTURE_DOCUMENTATION.md:167

**Observation:** "**Concurrently**: Run multiple dev servers"

**Interpretation:** Names tool starting development servers. Root `dev` uses `concurrently` (package.json:11, 34), confirming claim. Not composition mechanism.

### 47. ARCHITECTURE_DOCUMENTATION.md:175

**Observation:** "Independent release cycles"

**Interpretation:** Claims independent release cycles. No release record, four `1.0.0` versions unused in publication (#26 through #29). Claim uncorroborated.

### 48. ARCHITECTURE_DOCUMENTATION.md:197-203

**Observation:** Diagram: "Production Environment: ├── shell.insurance-platform.com # Host application ├── sales.insurance-platform.com # Sales portal [...]"

**Interpretation:** Describes production domain per application. None appears in snapshot configuration, no deployment artifact (#26 through #29). Claim uncorroborated.

### 49. ARCHITECTURE_DOCUMENTATION.md:207

**Observation:** "Module Federation loads remotes from their respective domains"

**Interpretation:** Claims host fetches each remote from its origin. Shell fetches each `remoteEntry.js` at corresponding remote port (#7; #23, #24, #25), but referenced production domains have no artifact. Claim partially corroborated.

### 50. ARCHITECTURE_DOCUMENTATION.md:208-209

**Observation:** "Rollback capabilities per application" / "Blue-green deployments possible"

**Interpretation:** Claims rollback and blue-green deployment per application. No pipeline or hosting configuration in snapshot (#26 through #29). Claim uncorroborated.

### 51. ARCHITECTURE_DOCUMENTATION.md:237

**Observation:** "Decomposition by business domain"

**Interpretation:** Claims business-domain units. Four units (#17 through #20) and shell Dashboard presenting three remotes as sales, underwriting and products (apps/shell/src/components/Dashboard.tsx:6-28) confirm claim.

### 52. ARCHITECTURE_DOCUMENTATION.md:243

**Observation:** "Shared dependencies optimization" (Module Federation Pattern)

**Interpretation:** Claims federation-shared dependencies. Four configurations share `react`, `react-dom` and `react-router-dom` (#5 through #8), confirming claim.

### 53. ARCHITECTURE_DOCUMENTATION.md:253

**Observation:** "Route-based micro-frontend loading"

**Interpretation:** Claims route-based micro-frontend loading. Shell route table (#12) links each prefix to wrapper with `lazy` (#9, #10, #11), confirming claim.

### 54. DEPLOYMENT_GUIDE.md:20-21

**Observation:** "Shared packages must be built before individual applications" / "Applications have interdependencies that affect build order"

**Interpretation:** Claims package/application build order. Root `build` builds `shared-types` and `shared-ui` before applications (package.json:16-18), packages publish `dist/index.js` (packages/shared-types/package.json:5; packages/shared-ui/package.json:5), confirming claim. Interdependencies with packages rather than between units.

### 55. NAVIGATION_AND_EMBEDDING.md:12-16

**Observation:** "Shell app renders `<SalesPortal />` component" / "Module Federation dynamically imports the Sales app from `http://localhost:3001/remoteEntry.js`" / "Sales app renders WITHIN the shell - no page reload, no redirect"

**Interpretation:** Describes sales-portal loading inside shell. Flow matches relationship #24, address does not: shell fetches `http://localhost:3001/dist/assets/remoteEntry.js` (#7). Configuration refutes claim at this point.

### 56. NAVIGATION_AND_EMBEDDING.md:74

**Observation:** "Each portal supports **dual routing** for both modes"

**Interpretation:** Claims routes for embedded and standalone modes. Three remotes declare unprefixed and shell-route-prefixed routes (apps/sales-portal/src/App.tsx:12-17; apps/underwriter-portal/src/App.tsx:12-17; apps/product-config/src/App.tsx:10-11), confirming claim, arrangement recorded by relationships #24 and #25.

### 57. NAVIGATION_AND_EMBEDDING.md:93

**Observation:** "Internal navigation adapts based on context"

**Interpretation:** Claims internal navigation changes with shell or standalone execution. Sales-portal and underwriter-portal Dashboards detect URL prefix, constructing links with it (apps/sales-portal/src/components/Dashboard.tsx:12-14, 79, 84; apps/underwriter-portal/src/components/Dashboard.tsx:12-14, 73, 78), confirming claim.

### 58. NAVIGATION_AND_EMBEDDING.md:108-111

**Observation:** "User logs in to Shell App" / "User stays logged in for ALL portals (shared session)" / "No additional logins required for individual portals"

**Interpretation:** Claims shell login with inter-unit shared session. Shell mounts routes without login screen (apps/shell/src/App.tsx:11-18; apps/shell/src/main.tsx:7-13), no unit has session, and TODO.md:8-13 lists authentication and "Token sharing across microfrontends" as pending. Snapshot refutes claim.

### 59. NAVIGATION_AND_EMBEDDING.md:173

**Observation:** "**Performance Isolation**: Poor performance in one portal doesn't affect others"

**Interpretation:** Claims inter-portal performance isolation. Run on same shell page with shared React (#5 through #8), snapshot has no measurement or isolation mechanism. Claim uncorroborated.

### 60. NAVIGATION_AND_EMBEDDING.md:179-185

**Observation:** Diagram: "Production URLs: ├── app.insurance.com # Shell app ├── sales.insurance.com # Sales portal (for Module Federation) [...]"

**Interpretation:** Describes production addresses per application, unlike ARCHITECTURE_DOCUMENTATION.md:197-203 (#48). None appears in snapshot configuration. Claim uncorroborated.

### 61. README.md:7

**Observation:** "each business domain (Sales, Underwriting, Employer Services, Product Configuration, and Service Provider) operates as an independent application"

**Interpretation:** Claims five domains each independent application. Snapshot has shell and three remotes (#17 through #20), shell only declares three remotes (#7); `employer-portal` and `service-provider` absent. Snapshot refutes claim.

### 62. README.md:119-120

**Observation:** "This starts all 6 applications simultaneously: - Shell (3000), Sales (3001), Underwriter (3002), Employer (3003), Product (3004), Service (3005)"

**Interpretation:** Claims `dev` starts six applications. Root `dev` starts four (package.json:11), without Employer or Service. Snapshot refutes claim.

### 63. README.md:150-156

**Observation:** "Build individual applications: [...] cd apps/sales-portal && npm run build [...] Preview production build"

**Interpretation:** Claims build and preview per application. Sales-portal has separate build (#27) and own `build` and `preview` scripts (apps/sales-portal/package.json:7-8), confirming claim.

### 64. README.md:247-250

**Observation:** "Add to shell application: - Add remote reference in `apps/shell/vite.config.ts` - Add route in `apps/shell/src/App.tsx` - Add navigation item in `apps/shell/src/components/Layout.tsx`" (new remote requires shell change)

**Interpretation:** Claims new remote requires three host changes. Remote declaration (#7), route table (#12) and menu (apps/shell/src/components/Layout.tsx:8-13) link each remote to shell in relationships #23, #24 and #25, confirming claim.

### 65. ac5fbbc 2025-07-07 (DEPLOYMENT_GUIDE.md, ARCHITECTURE_DOCUMENTATION.md, NAVIGATION_AND_EMBEDDING.md, apps/shell/vite.config.ts); dde74e6 2025-07-07 (README.md)

**Observation:** Neither commit creates or removes `vercel.json`, workflow, Dockerfile or another deployment file, and no commit removes a file. Deployment documents and shell configuration appear together in `ac5fbbc`, unchanged afterward. Result: `clarified`.

**Interpretation:** History records no abandoned configured-deployment stage: `localhost` URLs and publication plans coexist since first observable presence. Explains independent deployment without artifact in claims #31, #33 and #49.

### 66. ac5fbbc 2025-07-07 (apps/*/package.json, apps/, packages/shared-types/src/index.ts)

**Observation:** Four application `package.json` files, sources in `apps/` and `packages/shared-types/src/index.ts` created in `ac5fbbc`, unchanged afterward. No removed import of `@insurance/shared-types`. Result: `clarified`.

**Interpretation:** Declaration without import exists from first observable presence; package never used by other three applications in history. Explains claim #40.

### 67. ac5fbbc 2025-07-07 (NAVIGATION_AND_EMBEDDING.md, apps/shell/vite.config.ts)

**Observation:** Document and shell configuration created in same commit, unchanged afterward. No configuration version has document-cited path. Result: `clarified`.

**Interpretation:** Both `remoteEntry.js` paths coexist since first observable presence; no earlier configuration with document path. Explains claim #55 and configuration address #7.

### 68. TODO.md:8-13

**Observation:** Snapshot itself lists JWT authentication and "Token sharing across microfrontends" as pending (`- [ ]`). No commits consulted for point. Result: `resolved by the snapshot`.

**Interpretation:** Shared session is plan rather than implemented then removed. Explains claim #58.

### 69. ac5fbbc 2025-07-07 (apps/, context.md); dde74e6 2025-07-07 (README.md)

**Observation:** No commit creates or removes file in `apps/employer-portal` or `apps/service-provider`; sole historical applications are four created in `ac5fbbc`. `context.md`, listing six, created in `ac5fbbc`, unchanged. `README.md` changed in `dde74e6`, earlier version absent from clone. Result: `clarified`.

**Interpretation:** Both applications never existed in repository history, no six-application stage reduced to four. Explains claims #61 and #62.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/product-config/package.json:23) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 2 | 3.4.2 (apps/sales-portal/package.json:23) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 3 | 3.4.2 (apps/shell/package.json:24) | 1 technology | manifest | module-federation | technological | weak | declares #7 |
| 4 | 3.4.2 (apps/underwriter-portal/package.json:23) | 1 technology | manifest | module-federation | technological | weak | declares #8 |
| 5 | 3.4.2 (apps/product-config/package.json:23, Evidence); 3.4.3 (apps/product-config, Markers and Build); 3.4.4 (apps/shell/src/components/ProductConfig.tsx:5, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #12, #23 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #17; configures #23 |
| 6 | 3.4.2 (apps/sales-portal/package.json:23, Evidence); 3.4.3 (apps/sales-portal, Markers and Build); 3.4.4 (apps/shell/src/components/SalesPortal.tsx:5, Observation); 3.4.5 #2 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #12, #23 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #18; configures #24 |
| 7 | 3.4.2 (apps/shell/package.json:24, Evidence); 3.4.3 (apps/shell, Markers and Build); 3.4.4 (apps/shell/src/components/ProductConfig.tsx:5, apps/shell/src/components/SalesPortal.tsx:5, apps/shell/src/components/UnderwriterPortal.tsx:5, Observation); 3.4.5 #1, #2, #3 (Configuration); 3.4.6 #1, #2, #4 (Where served); 3.4.6 #3 (Artifacts); 3.4.7 #2, #20, #23, #26, #32, #35 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #19; configures #23; configures #24; configures #25 |
| 8 | 3.4.2 (apps/underwriter-portal/package.json:23, Evidence); 3.4.3 (apps/underwriter-portal, Markers and Build); 3.4.4 (apps/shell/src/components/UnderwriterPortal.tsx:5, Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Artifacts); 3.4.7 #12, #23 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #20; configures #25 |
| 9 | 3.4.4 (apps/shell/src/components/ProductConfig.tsx:5) | 3 code | source code | module-federation | architectural | strong | implements #23 |
| 10 | 3.4.4 (apps/shell/src/components/SalesPortal.tsx:5) | 3 code | source code | module-federation | architectural | strong | implements #24 |
| 11 | 3.4.4 (apps/shell/src/components/UnderwriterPortal.tsx:5) | 3 code | source code | module-federation | architectural | strong | implements #25 |
| 12 | 3.4.4 (apps/shell/src/App.tsx:12) | 3 code | source code | — | architectural | strong | implements #23; implements #24; implements #25 |
| 13 | 3.4.4 (apps/shell/src/components/ProductConfig.tsx:75) | 3 code | source code | module-federation | architectural | moderate | implements #23 |
| 14 | 3.4.4 (apps/shell/src/components/SalesPortal.tsx:84) | 3 code | source code | module-federation | architectural | moderate | implements #24 |
| 15 | 3.4.4 (apps/shell/src/components/UnderwriterPortal.tsx:75) | 3 code | source code | module-federation | architectural | moderate | implements #25 |
| 16 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 17 | 3.4.3 (apps/product-config) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (apps/sales-portal) | 4 structure | directory | — | architectural | moderate | — |
| 19 | 3.4.3 (apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 20 | 3.4.3 (apps/underwriter-portal) | 4 structure | directory | — | architectural | moderate | — |
| 21 | 3.4.3 (packages/shared-types) | 4 structure | directory | — | context | weak | — |
| 22 | 3.4.3 (packages/shared-ui) | 4 structure | directory | — | context | weak | — |
| 23 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #19; links #17 |
| 24 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #19; links #18 |
| 25 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #19; links #20 |
| 26 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #17 |
| 27 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #18 |
| 28 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #19 |
| 29 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #20 |
| 30 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #17; corroborates #18; corroborates #19; corroborates #20; corroborates #23; corroborates #24; corroborates #25 |
| 31 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | partially corroborates #17; partially corroborates #18; partially corroborates #19; partially corroborates #20; partially corroborates #7 |
| 32 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates #18; corroborates #19; corroborates #20; corroborates package.json:12-15 |
| 33 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | partially corroborates #26; partially corroborates #27; partially corroborates #28; partially corroborates #29 |
| 34 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | — |
| 35 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates #10; corroborates #11; corroborates #13; corroborates #14; corroborates #15; corroborates #23; corroborates #24; corroborates #25 |
| 36 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates pnpm-workspace.yaml:1-3; corroborates package.json:6-9 |
| 37 | 3.4.7 #8 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #17; corroborates #18; corroborates #19; corroborates #20; corroborates #9; corroborates #10; corroborates #11; corroborates #23; corroborates #24; corroborates #25 |
| 38 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #18; corroborates apps/sales-portal/package.json:6; corroborates apps/sales-portal/src/App.tsx:12-14 |
| 39 | 3.4.7 #10 | 7 documentation | documentation | — | context | weak | corroborates #22; corroborates apps/shell/src/components/Dashboard.tsx:3; corroborates apps/sales-portal/src/App.tsx:3; corroborates apps/underwriter-portal/src/App.tsx:3; corroborates apps/product-config/src/App.tsx:3 |
| 40 | 3.4.7 #11 | 7 documentation | documentation | — | context | weak | contradicts apps/sales-portal/src/components/QuotesList.tsx:3; contradicts apps/sales-portal/src/components/PoliciesList.tsx:3; contradicts apps/shell/package.json:16 |
| 41 | 3.4.7 #12 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #5; corroborates #6; corroborates #8; corroborates #23; corroborates #24; corroborates #25 |
| 42 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #26; corroborates #27; corroborates #28; corroborates #29; corroborates package.json:18; corroborates apps/shell/package.json:10-28 |
| 43 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #14; corroborates #15; corroborates apps/shell/src/components/SalesPortal.tsx:4-28 |
| 44 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates apps/shell/src/components/Layout.tsx:8-13; corroborates apps/sales-portal/src/App.tsx:11-18 |
| 45 | 3.4.7 #16 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #5; corroborates #6; corroborates #7; corroborates #8 |
| 46 | 3.4.7 #17 | 7 documentation | documentation | — | context | weak | corroborates package.json:11 |
| 47 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | — |
| 48 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | — |
| 49 | 3.4.7 #20 | 7 documentation | documentation | module-federation | architectural | weak | partially corroborates #7; partially corroborates #23; partially corroborates #24; partially corroborates #25 |
| 50 | 3.4.7 #21 | 7 documentation | documentation | — | architectural | weak | — |
| 51 | 3.4.7 #22 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates #18; corroborates #19; corroborates #20; corroborates apps/shell/src/components/Dashboard.tsx:6-28 |
| 52 | 3.4.7 #23 | 7 documentation | documentation | module-federation | technological | weak | corroborates #5; corroborates #6; corroborates #7; corroborates #8 |
| 53 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #9; corroborates #10; corroborates #11 |
| 54 | 3.4.7 #25 | 7 documentation | documentation | — | architectural | weak | corroborates package.json:16-18; corroborates packages/shared-types/package.json:5; corroborates packages/shared-ui/package.json:5 |
| 55 | 3.4.7 #26 | 7 documentation | documentation | module-federation | architectural | weak | contradicts #7 |
| 56 | 3.4.7 #27 | 7 documentation | documentation | — | architectural | weak | corroborates apps/sales-portal/src/App.tsx:12-17; corroborates apps/underwriter-portal/src/App.tsx:12-17; corroborates apps/product-config/src/App.tsx:10-11 |
| 57 | 3.4.7 #28 | 7 documentation | documentation | — | architectural | weak | corroborates apps/sales-portal/src/components/Dashboard.tsx:12-14; corroborates apps/underwriter-portal/src/components/Dashboard.tsx:12-14 |
| 58 | 3.4.7 #29 | 7 documentation | documentation | — | architectural | weak | contradicts apps/shell/src/App.tsx:11-18; contradicts apps/shell/src/main.tsx:7-13; contradicts TODO.md:8-13 |
| 59 | 3.4.7 #30 | 7 documentation | documentation | — | architectural | weak | — |
| 60 | 3.4.7 #31 | 7 documentation | documentation | — | architectural | weak | — |
| 61 | 3.4.7 #32 | 7 documentation | documentation | — | architectural | weak | contradicts #17; contradicts #18; contradicts #19; contradicts #20; contradicts #7 |
| 62 | 3.4.7 #33 | 7 documentation | documentation | — | architectural | weak | contradicts package.json:11 |
| 63 | 3.4.7 #34 | 7 documentation | documentation | — | architectural | weak | corroborates #27; corroborates apps/sales-portal/package.json:7-8 |
| 64 | 3.4.7 #35 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #12; corroborates apps/shell/src/components/Layout.tsx:8-13 |
| 65 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #31; explains #33; explains #49 |
| 66 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #40 |
| 67 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #55; explains #7 |
| 68 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #58 |
| 69 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #61; explains #62 |

## Summary

Observations: 69. Dimensions (technology: 4, configuration: 4, code: 7, structure: 7, composition: 3, build-deploy: 4, documentation: 35, history: 5). Strength (strong: 8, moderate: 14, weak: 47, ambiguous: 0). Evidence (technological: 9, architectural: 53, context: 7).

