---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
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

# 083 — webdevqadeer/frontend-development

## Repository overview

Marketplace example in `react/mv-marketplace/`, an npm workspaces monorepo (#20) with five Vite applications, a shell and four remotes (#21 through #25), and a theme library that is not a unit (#26). The Module Federation chain is declared end to end:
- **Dependencies:** `@originjs/vite-plugin-federation`, in the five applications (#1 through #5).
- **Configuration:** each remote declares itself and exposes `./App` (#6 through #9). The shell names the four remotes through `localhost` URLs (#10).
- **Code:** the shell imports the four `<remote>/App` modules through `React.lazy` (#11 through #14) and places them in a route table (#15 through #19).
- **Relationships:** this results in four host → remote relationships (#27 through #30).

The failing link is the shell entry. `main.jsx` imports `./App.jsx`, and the snapshot only has `src/app.jsx`, the file using the router. On a case-sensitive filesystem, the chain does not reach the router. Thus the shell boundary (#25), nine code constructs (#11 through #19) and four relationships (#27 through #30) remain ambiguous: whether composition is active or never occurs is unknown. History shows this discrepancy has existed since the first commit, rather than coming from a rename (#44). The payment relationship also has a name mismatch, `payment_app` in the shell and `payment-app` in the remote (#8, #30).

One signal is misleading: the five configurations declare a `package` remote at `localhost:5005` (#31 through #35), called "The remote package" by a comment (#42). No snapshot unit serves that address, and no code imports it. History shows a `package` directory existed in the first commit, was removed in the next, and the declarations remained (#45). The `mv-theme` library does not configure federation and is not imported (#26).

The five builds are separate (#36 through #40), without observed deployment. Documentation consists of three admin configuration comments (#41 through #43).

## Observations

### 1. react/mv-marketplace/apps/admin/package.json:18

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `devDependencies`.

**Interpretation:** Federation technology is present in the admin build.

### 2. react/mv-marketplace/apps/buyer/package.json:18

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `devDependencies`.

**Interpretation:** Federation technology is present in the buyer build.

### 3. react/mv-marketplace/apps/payment/package.json:18

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `devDependencies`.

**Interpretation:** Federation technology is present in the payment build.

### 4. react/mv-marketplace/apps/seller/package.json:18

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `devDependencies`.

**Interpretation:** Federation technology is present in the seller build.

### 5. react/mv-marketplace/apps/shell/package.json:19

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `devDependencies`.

**Interpretation:** Federation technology is present in the shell build.

### 6. react/mv-marketplace/apps/admin/vite.config.js:1-21

**Observation:** `federation` declares `name: "admin_app"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.jsx" }`, `remotes: { package: "http://localhost:5005/assets/remoteEntry.js" }` and `shared: ["react", "react-dom"]`. `preview` on port 5003.

**Interpretation:** Admin is configured as a remote and offers its screen to a host. It also declares consumption of a `package` remote.

**Note:** Strength follows the single-unit configuration case. The `package` remote matches no snapshot unit (#31), so the declaration does not link admin to another part.

### 7. react/mv-marketplace/apps/buyer/vite.config.js:1-21

**Observation:** `federation` declares `name: "buyer_app"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.jsx" }`, the same `package` remote and `shared: ["react", "react-dom"]`. `preview` on port 5001.

**Interpretation:** Buyer is configured as a remote and offers its screen to a host.

**Note:** As in #6, the `package` remote does not link the unit to another part (#32).

### 8. react/mv-marketplace/apps/payment/vite.config.js:1-19

**Observation:** `federation` declares `name: "payment-app"`, with a hyphen, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.jsx" }`, the same `package` remote and `shared: ["react", "react-dom"]`. `preview` on port 5004.

**Interpretation:** Payment is configured as a remote. The name differs in its separator from the `payment_app` key used by the shell.

**Note:** As in #6, the `package` remote does not link the unit to another part (#33).

### 9. react/mv-marketplace/apps/seller/vite.config.js:1-19

**Observation:** `federation` declares `name: "seller_app"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App.jsx" }`, the same `package` remote and `shared: ["react", "react-dom"]`. `preview` on port 5002.

**Interpretation:** Seller is configured as a remote and offers its screen to a host.

**Note:** As in #6, the `package` remote does not link the unit to another part (#34).

### 10. react/mv-marketplace/apps/shell/vite.config.js:1-35

**Observation:** `federation` declares `name: "shell_app"` and `remotes` `buyer_app`, `seller_app`, `admin_app` and `payment_app` at `http://localhost:5001` through `5004/assets/remoteEntry.js`, plus `package` at `5005`, with `shared: ["react", "react-dom"]`.

**Interpretation:** The host configuration declares the four snapshot remotes and where to find them, and a fifth without a corresponding unit.

### 11. react/mv-marketplace/apps/shell/src/router.jsx:4

**Observation:** `const Buyer = React.lazy(() => import("buyer_app/App"));`.

**Interpretation:** The shell loads the module exposed by buyer, by name. Two readings remain plausible: loading occurs if the shell entry reaches the router, or does not occur because `main.jsx` imports an `App.jsx` that does not exist with that case.

### 12. react/mv-marketplace/apps/shell/src/router.jsx:5

**Observation:** `const Seller = React.lazy(() => import("seller_app/App"));`.

**Interpretation:** The shell loads the module exposed by seller. The same two readings as #11.

### 13. react/mv-marketplace/apps/shell/src/router.jsx:6

**Observation:** `const Admin = React.lazy(() => import("admin_app/App"));`.

**Interpretation:** The shell loads the module exposed by admin. The same two readings as #11.

### 14. react/mv-marketplace/apps/shell/src/router.jsx:7

**Observation:** `const Payment = React.lazy(() => import("payment_app/App"));`.

**Interpretation:** The shell loads the module exposed by payment. The same two readings as #11.

### 15. react/mv-marketplace/apps/shell/src/router.jsx:13-18

**Observation:** `<Routes>` with routes `/`, `/seller`, `/admin` and `/payment`, inside `<BrowserRouter>` and `<Suspense>`. The router is used by `react/mv-marketplace/apps/shell/src/app.jsx:9`, but `react/mv-marketplace/apps/shell/src/main.jsx:3` imports `./App.jsx`.

**Interpretation:** The shell route table links a path to each remote. The same two readings as #11.

### 16. react/mv-marketplace/apps/shell/src/router.jsx:14

**Observation:** `<Route path="/" element={<Buyer />} />`.

**Interpretation:** Route `/` renders the buyer component. The same two readings as #11.

### 17. react/mv-marketplace/apps/shell/src/router.jsx:15

**Observation:** `<Route path="/seller" element={<Seller />} />`.

**Interpretation:** Route `/seller` renders the seller component. The same two readings as #11.

### 18. react/mv-marketplace/apps/shell/src/router.jsx:16

**Observation:** `<Route path="/admin" element={<Admin />} />`.

**Interpretation:** Route `/admin` renders the admin component. The same two readings as #11.

### 19. react/mv-marketplace/apps/shell/src/router.jsx:17

**Observation:** `<Route path="/payment" element={<Payment />} />`.

**Interpretation:** Route `/payment` renders the payment component. The same two readings as #11.

### 20. react/mv-marketplace; react/mv-marketplace/package.json:1-21

**Observation:** The coordinating manifest, with `workspaces` for `packages/mvp-theme` and the five applications and scripts that only invoke workspace scripts. It has no UI entry or application build.

**Interpretation:** The workspace coordination root rather than a frontend unit.

### 21. react/mv-marketplace/apps/admin; react/mv-marketplace/apps/admin/package.json:1-28; react/mv-marketplace/apps/admin/index.html:11; react/mv-marketplace/apps/admin/src/main.jsx:1-9; react/mv-marketplace/apps/admin/vite.config.js:5-21

**Observation:** A React application with its own manifest, `index.html`, entry with `createRoot` and `vite build`.

**Interpretation:** A frontend unit with its own boundary.

### 22. react/mv-marketplace/apps/buyer; react/mv-marketplace/apps/buyer/package.json:1-28; react/mv-marketplace/apps/buyer/index.html:11; react/mv-marketplace/apps/buyer/src/main.jsx:1-9; react/mv-marketplace/apps/buyer/vite.config.js:5-21

**Observation:** A React application with its own manifest, `index.html`, entry with `createRoot` and `vite build`.

**Interpretation:** A frontend unit with its own boundary.

### 23. react/mv-marketplace/apps/payment; react/mv-marketplace/apps/payment/package.json:1-28; react/mv-marketplace/apps/payment/index.html:11; react/mv-marketplace/apps/payment/src/main.jsx:1-9; react/mv-marketplace/apps/payment/vite.config.js:5-19

**Observation:** A React application with its own manifest, `index.html`, entry with `createRoot` and `vite build`.

**Interpretation:** A frontend unit with its own boundary.

### 24. react/mv-marketplace/apps/seller; react/mv-marketplace/apps/seller/package.json:1-28; react/mv-marketplace/apps/seller/index.html:11; react/mv-marketplace/apps/seller/src/main.jsx:1-9; react/mv-marketplace/apps/seller/vite.config.js:5-19

**Observation:** A React application with its own manifest, `index.html`, entry with `createRoot` and `vite build`.

**Interpretation:** A frontend unit with its own boundary.

### 25. react/mv-marketplace/apps/shell; react/mv-marketplace/apps/shell/package.json:1-29; react/mv-marketplace/apps/shell/index.html:11; react/mv-marketplace/apps/shell/src/main.jsx:3, 5-9; react/mv-marketplace/apps/shell/src/app.jsx:5-15; react/mv-marketplace/apps/shell/vite.config.js:6-35

**Observation:** It has its own manifest, `index.html`, entry and `vite build`. The entry imports `./App.jsx`, and the snapshot only has `src/app.jsx`.

**Interpretation:** Two readings remain plausible: a frontend unit whose entry resolves on a case-insensitive filesystem, or a unit whose entry does not mount the shell as written.

### 26. react/mv-marketplace/packages/mvp-theme; react/mv-marketplace/packages/mvp-theme/package.json:1-27; react/mv-marketplace/packages/mvp-theme/vite.config.js:7-24; react/mv-marketplace/packages/mvp-theme/src/index.js:1

**Observation:** Package `mv-theme`, with an ES/UMD library build from `src/index.js`, which reexports a Button. It has no `index.html` or federation configuration.

**Interpretation:** A component library rather than a frontend unit; no application imports it.

### 27. react/mv-marketplace/apps/shell/src/router.jsx:4, 13, 14; react/mv-marketplace/apps/shell/vite.config.js:12; react/mv-marketplace/apps/buyer/vite.config.js:9-12

**Observation:** The shell imports `buyer_app/App` and places it at route `/`. Key `buyer_app` points to `localhost:5001/assets/remoteEntry.js`, and its name and exposed `./App` match buyer.

**Interpretation:** A host → remote relationship. Two readings remain plausible: active if the shell entry reaches the router, or declared but not executed because of the entry case discrepancy.

### 28. react/mv-marketplace/apps/shell/src/router.jsx:5, 13, 15; react/mv-marketplace/apps/shell/vite.config.js:13; react/mv-marketplace/apps/seller/vite.config.js:9-11

**Observation:** The shell imports `seller_app/App` and places it at route `/seller`. The key points to `localhost:5002`, and its name and `./App` match seller.

**Interpretation:** A host → remote relationship, with the same two readings as #27.

### 29. react/mv-marketplace/apps/shell/src/router.jsx:6, 13, 16; react/mv-marketplace/apps/shell/vite.config.js:14; react/mv-marketplace/apps/admin/vite.config.js:9-12

**Observation:** The shell imports `admin_app/App` and places it at route `/admin`. The key points to `localhost:5003`, and its name and `./App` match admin.

**Interpretation:** A host → remote relationship, with the same two readings as #27.

### 30. react/mv-marketplace/apps/shell/src/router.jsx:7, 13, 17; react/mv-marketplace/apps/shell/vite.config.js:15; react/mv-marketplace/apps/payment/vite.config.js:9-11

**Observation:** The shell imports `payment_app/App` and places it at route `/payment`. The key points to `localhost:5004`; the remote declares itself as `payment-app`, with a hyphen, and exposes `./App` in `remoteEntry.js`.

**Interpretation:** A host → remote relationship, with the same two readings as #27. The name difference is not verified through execution.

### 31. react/mv-marketplace/apps/admin/vite.config.js:14-16

**Observation:** Admin declares the `package` remote at `http://localhost:5005/assets/remoteEntry.js` and does not import it. No snapshot configuration uses `name: "package"` or port 5005.

**Interpretation:** A configuration-only relationship to a target without a corresponding unit.

### 32. react/mv-marketplace/apps/buyer/vite.config.js:14-16

**Observation:** Buyer declares the same `package` remote and does not import it.

**Interpretation:** A configuration-only relationship to a target without a corresponding unit.

### 33. react/mv-marketplace/apps/payment/vite.config.js:12-14

**Observation:** Payment declares the same `package` remote and does not import it.

**Interpretation:** A configuration-only relationship to a target without a corresponding unit.

### 34. react/mv-marketplace/apps/seller/vite.config.js:12-14

**Observation:** Seller declares the same `package` remote and does not import it.

**Interpretation:** A configuration-only relationship to a target without a corresponding unit.

### 35. react/mv-marketplace/apps/shell/vite.config.js:16

**Observation:** The shell declares the `package` remote alongside the other four, and the router does not import it.

**Interpretation:** A configuration-only relationship to a target without a corresponding unit.

### 36. react/mv-marketplace/apps/admin/vite.config.js:5-21; react/mv-marketplace/apps/admin/package.json:8; react/mv-marketplace/package.json:15

**Observation:** It has its own configuration and `vite build`, generating the `remoteEntry.js` of `admin_app`; the root only invokes the build. The only address is port 5003 of `vite preview`, and nothing publishes the build.

**Interpretation:** There is a separate build boundary, without observed deployment.

### 37. react/mv-marketplace/apps/buyer/vite.config.js:5-21; react/mv-marketplace/apps/buyer/package.json:8; react/mv-marketplace/package.json:15

**Observation:** Same arrangement as #36, with `buyer_app` and port 5001.

**Interpretation:** There is a separate build boundary, without observed deployment.

### 38. react/mv-marketplace/apps/payment/vite.config.js:5-19; react/mv-marketplace/apps/payment/package.json:8; react/mv-marketplace/package.json:15

**Observation:** Same arrangement as #36, with `payment-app` and port 5004.

**Interpretation:** There is a separate build boundary, without observed deployment.

### 39. react/mv-marketplace/apps/seller/vite.config.js:5-19; react/mv-marketplace/apps/seller/package.json:8; react/mv-marketplace/package.json:15

**Observation:** Same arrangement as #36, with `seller_app` and port 5002.

**Interpretation:** There is a separate build boundary, without observed deployment.

### 40. react/mv-marketplace/apps/shell/vite.config.js:6-35; react/mv-marketplace/apps/shell/package.json:8; react/mv-marketplace/package.json:15

**Observation:** It has its own configuration with `dist` output and `vite build`; remotes arrive through URLs at runtime. The only address is port 5173 of the development server, and nothing publishes the build.

**Interpretation:** There is a separate build boundary, without observed deployment.

### 41. react/mv-marketplace/apps/admin/vite.config.js:12

**Observation:** "Exposing the main app component".

**Interpretation:** Claims admin exposes its main component. The claim is corroborated.

### 42. react/mv-marketplace/apps/admin/vite.config.js:15

**Observation:** "The remote package".

**Interpretation:** Claims `package` is a remote. The declaration exists, but no snapshot artifact is that remote, and the claim is partially corroborated.

### 43. react/mv-marketplace/apps/admin/vite.config.js:17

**Observation:** "Shared libraries".

**Interpretation:** Claims `react` and `react-dom` are shared between units. The claim is corroborated.

### 44. 64fe384 2025-12-14 (React/mv-marketplace/shell-app/src/main.jsx, React/mv-marketplace/shell-app/src/app.jsx); 59eb629 2025-12-16 (react/mv-marketplace/apps/shell/src/main.jsx, react/mv-marketplace/apps/shell/src/app.jsx)

**Observation:** The shell's `main.jsx` and `app.jsx` appear together in the first commit and move to `apps/shell/src/` with the same objects as the snapshot. No version has an `App.jsx` in the shell. `main.jsx` is the same object as in the other applications, which have `App.jsx`.

**Interpretation:** The case discrepancy does not come from different stages or a rename. History does not show whether the chain worked. The point is clarified.

### 45. 64fe384 2025-12-14 (React/mv-marketplace/package/); 59eb629 2025-12-16 (removal of React/mv-marketplace/package/); be25e7c 2025-12-19 (apps/admin/vite.config.js, apps/shell/vite.config.js); f8d2648 2025-12-20 (apps/shell/vite.config.js)

**Observation:** The first commit has a `package` directory shaped as a Vite application, and the message announces "Shared UI remote". `59eb629` removes it, and no commit recreates it. Buyer, payment and seller configurations have the first commit objects in the snapshot.

**Interpretation:** The `package` remote points to an artifact that existed and was removed; declarations remained. The point is clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (react/mv-marketplace/apps/admin/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 2 | 3.4.2 (react/mv-marketplace/apps/buyer/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #7 |
| 3 | 3.4.2 (react/mv-marketplace/apps/payment/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #8 |
| 4 | 3.4.2 (react/mv-marketplace/apps/seller/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #9 |
| 5 | 3.4.2 (react/mv-marketplace/apps/shell/package.json:19) | 1 technology | manifest | module-federation | technological | weak | declares #10 |
| 6 | 3.4.2 (react/mv-marketplace/apps/admin/package.json:18, Evidence); 3.4.3 (react/mv-marketplace/apps/admin, Markers and Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:6, Observation); 3.4.5 #3, #5 (Configuration); 3.4.6 #1 (Where served and Artifacts); 3.4.7 #1, #2, #3 (Document and Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #21; configures #29; configures #31 |
| 7 | 3.4.2 (react/mv-marketplace/apps/buyer/package.json:18, Evidence); 3.4.3 (react/mv-marketplace/apps/buyer, Markers and Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:4, Observation); 3.4.5 #1, #6 (Configuration); 3.4.6 #2 (Where served and Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #22; configures #27; configures #32 |
| 8 | 3.4.2 (react/mv-marketplace/apps/payment/package.json:18, Evidence); 3.4.3 (react/mv-marketplace/apps/payment, Markers and Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:7, Observation); 3.4.5 #4, #7 (Configuration); 3.4.6 #3 (Where served and Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #23; configures #30; configures #33 |
| 9 | 3.4.2 (react/mv-marketplace/apps/seller/package.json:18, Evidence); 3.4.3 (react/mv-marketplace/apps/seller, Markers and Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:5, Observation); 3.4.5 #2, #8 (Configuration); 3.4.6 #4 (Where served and Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #28; configures #34 |
| 10 | 3.4.2 (react/mv-marketplace/apps/shell/package.json:19, Evidence); 3.4.3 (react/mv-marketplace/apps/shell, Markers and Build); 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:4-7, Observation); 3.4.5 #1-#4, #9 (Configuration); 3.4.6 #1-#5 (Where served and Artifacts); 3.4.7 #3 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #25; configures #27; configures #28; configures #29; configures #30; configures #35 |
| 11 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:4) | 3 code | source code | module-federation | architectural | ambiguous | implements #27 |
| 12 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:5) | 3 code | source code | module-federation | architectural | ambiguous | implements #28 |
| 13 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:6) | 3 code | source code | module-federation | architectural | ambiguous | implements #29 |
| 14 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:7) | 3 code | source code | module-federation | architectural | ambiguous | implements #30 |
| 15 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:13) | 3 code | source code | module-federation | architectural | ambiguous | implements #27; implements #28; implements #29; implements #30 |
| 16 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:14) | 3 code | source code | module-federation | architectural | ambiguous | implements #27 |
| 17 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:15) | 3 code | source code | module-federation | architectural | ambiguous | implements #28 |
| 18 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:16) | 3 code | source code | module-federation | architectural | ambiguous | implements #29 |
| 19 | 3.4.4 (react/mv-marketplace/apps/shell/src/router.jsx:17) | 3 code | source code | module-federation | architectural | ambiguous | implements #30 |
| 20 | 3.4.3 (react/mv-marketplace) | 4 structure | directory | — | context | weak | — |
| 21 | 3.4.3 (react/mv-marketplace/apps/admin) | 4 structure | directory | — | architectural | moderate | — |
| 22 | 3.4.3 (react/mv-marketplace/apps/buyer) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.3 (react/mv-marketplace/apps/payment) | 4 structure | directory | — | architectural | moderate | — |
| 24 | 3.4.3 (react/mv-marketplace/apps/seller) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.3 (react/mv-marketplace/apps/shell) | 4 structure | directory | — | architectural | ambiguous | — |
| 26 | 3.4.3 (react/mv-marketplace/packages/mvp-theme) | 4 structure | directory | — | context | weak | — |
| 27 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | ambiguous | links #25; links #22 |
| 28 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | ambiguous | links #25; links #24 |
| 29 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | ambiguous | links #25; links #21 |
| 30 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | ambiguous | links #25; links #23 |
| 31 | 3.4.5 #5 | 5 composition | configuration | module-federation | architectural | moderate | links #21; links react/mv-marketplace/apps/admin/vite.config.js:15 |
| 32 | 3.4.5 #6 | 5 composition | configuration | module-federation | architectural | moderate | links #22; links react/mv-marketplace/apps/buyer/vite.config.js:15 |
| 33 | 3.4.5 #7 | 5 composition | configuration | module-federation | architectural | moderate | links #23; links react/mv-marketplace/apps/payment/vite.config.js:13 |
| 34 | 3.4.5 #8 | 5 composition | configuration | module-federation | architectural | moderate | links #24; links react/mv-marketplace/apps/seller/vite.config.js:13 |
| 35 | 3.4.5 #9 | 5 composition | configuration | module-federation | architectural | moderate | links #25; links react/mv-marketplace/apps/shell/vite.config.js:16 |
| 36 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #21 |
| 37 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #22 |
| 38 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #23 |
| 39 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #24 |
| 40 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #25 |
| 41 | 3.4.7 #1 | 7 documentation | comment | — | technological | weak | corroborates #6 |
| 42 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | partially corroborates #31 |
| 43 | 3.4.7 #3 | 7 documentation | comment | — | technological | weak | corroborates #6; corroborates #10 |
| 44 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #25; explains #11; explains #12; explains #13; explains #14; explains #15; explains #16; explains #17; explains #18; explains #19; explains #27; explains #28; explains #29; explains #30 |
| 45 | 3.4.8 #2 | 8 history | history | module-federation | architectural | weak | explains #31; explains #32; explains #33; explains #34; explains #35; explains #42 |

## Summary

Observations: 45. Dimensions (technology: 5, configuration: 5, code: 9, structure: 7, composition: 9, build-deploy: 5, documentation: 3, history: 2). Strength (strong: 1, moderate: 18, weak: 12, ambiguous: 14). Evidence (technological: 11, architectural: 32, context: 2).

