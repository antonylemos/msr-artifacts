---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
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

# 246 — shermondevelopment/microfrontend-shop

## Repository overview

Snapshot combines four React/Vite applications in npm workspace: host, header, footer and products (#15–#18). Federation dependency (#1) realized in configurations (#3–#6): remotes expose components; host declares targets. Imports name targets (#7–#9), and visual mounting (#10–#12) integrates three page sections through active host → remote relationships (#24–#26). Products/header also communicate through shared Zustand store (#13, #27), parameterized as singleton in configurations. Section 3.4.5 records reactive service as events mechanism.

Each app has own build, output, bucket, distribution and rollback (#28–#31), although joint versioning. Root and five support packages are not frontend units (#14, #19–#23); @microfrontend/types name is nominal shared-type signal without own MFE mechanism (#2). Footer shares React without explicit singleton (#3); host, header and products configure singletons (#4–#6).

Documentary claims corroborate organization (#32–#43, #45). Listed CloudFront addresses uncorroborated (#44), since values absent from CI artifacts. Limitation does not leave snapshot composition open. Section 3.4.8 records no historical points, therefore no dimension 8 observations.

## Observations

### 1. package.json:48

**Observation:** Root declares @module-federation/vite ^1.16.0 in devDependencies. Section 3.4.2 records Configured Yes.

**Interpretation:** Declaration signals Module Federation; app configurations separately show usage.

### 2. packages/shared/package.json:10; packages/shared/src/state/cart-store.ts:3-6

**Observation:** packages/shared declares @microfrontend/types 0.0.0, imported as CartProduct type in store. Section 3.4.2 records Configured Yes.

**Interpretation:** Name captured as mfe-term corresponds to internal workspace types; identifies no composition mechanism.

### 3. apps/footer/vite.config.ts:13-21

**Observation:** Federation plugin names footer, generates remoteEntry.js, exposes ./Footer from ./src/Footer.tsx and shares react/react-dom without explicit singleton.

**Interpretation:** Configures footer federation mechanism/public interface; block names no consumers.

### 4. apps/header/vite.config.ts:13-37

**Observation:** Federation plugin names header, generates remoteEntry.js, exposes ./Header from ./src/Header.tsx and shares react, react-dom, zustand, @microfrontend/shared and @tanstack/react-query as singletons.

**Interpretation:** Configures header federation mechanism/public interface; block names no consumers.

### 5. apps/host/vite.config.ts:12-15; apps/host/vite.config.ts:22-65

**Observation:** Federation plugin names host, declaring header, footer and products as module remotes, with entry through VITE_*_REMOTE_URL and fallback to local remoteEntry.js. react, react-dom, zustand, @microfrontend/shared and @tanstack/react-query singletons.

**Interpretation:** Configuration links host to three remote units, parameterizing dependency sharing.

### 6. apps/products/vite.config.ts:13-37

**Observation:** Federation plugin names products, generates remoteEntry.js, exposes ./ProductsList from ./src/ProductsList.tsx and shares react, react-dom, zustand, @microfrontend/shared and @tanstack/react-query as singletons.

**Interpretation:** Configures products federation mechanism/public interface; block names no consumers.

### 7. apps/host/src/App.tsx:5

**Observation:** Host declares Header with lazy(() => import('header/Header')). Section 3.4.4 records Composition Yes.

**Interpretation:** Import identifies remote unit header and module consumed by host.

### 8. apps/host/src/App.tsx:6

**Observation:** Host declares Footer with lazy(() => import('footer/Footer')). Section 3.4.4 records Composition Yes.

**Interpretation:** Import identifies remote unit footer and module consumed by host.

### 9. apps/host/src/App.tsx:7

**Observation:** Host declares ProductsList with lazy(() => import('products/ProductsList')). Section 3.4.4 records Composition Yes.

**Interpretation:** Import identifies remote unit products and module consumed by host.

### 10. apps/host/src/App.tsx:12-16

**Observation:** JSX renders <Header /> inside RemoteErrorBoundary and Suspense with skeleton. Section 3.4.4 records Composition Yes.

**Interpretation:** Rendering participates in visual mounting; isolated from import/configuration does not resolve remote unit.

### 11. apps/host/src/App.tsx:19-23

**Observation:** JSX renders <ProductsList /> inside RemoteErrorBoundary and Suspense with skeleton. Section 3.4.4 records Composition Yes.

**Interpretation:** Rendering participates in visual mounting; isolated from import/configuration does not resolve remote unit.

### 12. apps/host/src/App.tsx:26-30

**Observation:** JSX renders <Footer /> inside RemoteErrorBoundary and Suspense with skeleton. Section 3.4.4 records Composition Yes.

**Interpretation:** Rendering participates in visual mounting; isolated from import/configuration does not resolve remote unit.

### 13. packages/shared/src/state/cart-store.ts:12-18; packages/shared/src/state/cart-store.ts:70-72; packages/shared/src/index.ts:4; apps/products/src/components/Product.tsx:14; apps/products/src/components/Product.tsx:36-43; apps/products/src/ProductsList.tsx:30; apps/header/src/Header.tsx:16-18; apps/header/src/Header.tsx:27

**Observation:** useCartStore creates Zustand state persisted in cart-storage. ProductCard adds products; Header reads items/quantity and allows removal. Section 3.4.4 records Composition Yes.

**Interpretation:** Shared reactive service supports products/header communication; uniqueness across system parameterized by federation configurations.

### 14. .; package.json:4-8; package.json:18-22

**Observation:** Root declares workspaces apps/*, packages/* and packages/config/*, chaining app builds without own UI entry/build. Frontend unit No in 3.4.3.

**Interpretation:** Root coordinates workspace rather than representing another frontend application.

### 15. apps/footer; apps/footer/package.json:8; apps/footer/index.html:10; apps/footer/src/main.tsx:5-9; apps/footer/vite.config.ts:47-53

**Observation:** apps/footer has manifest, index.html pointing to src/main.tsx, React mounting and Vite build outputting dist/footer. Frontend unit Yes in 3.4.3.

**Interpretation:** Directory delimits frontend application with own entry/build. Link to other applications appears in composition observations.

### 16. apps/header; apps/header/package.json:8; apps/header/index.html:10; apps/header/src/main.tsx:5-9; apps/header/vite.config.ts:63-69

**Observation:** apps/header has manifest, index.html pointing to src/main.tsx, React mounting and Vite build outputting dist/header. Frontend unit Yes in 3.4.3.

**Interpretation:** Directory delimits frontend application with own entry/build. Link to other applications appears in composition observations.

### 17. apps/host; apps/host/package.json:8; apps/host/index.html:11; apps/host/src/main.tsx:10-16; apps/host/vite.config.ts:90-96

**Observation:** apps/host has manifest, index.html pointing to src/main.tsx, React mounting and Vite build outputting dist/host. Frontend unit Yes in 3.4.3.

**Interpretation:** Directory delimits frontend application with own entry/build. Link to other applications appears in composition observations.

### 18. apps/products; apps/products/package.json:8; apps/products/index.html:10; apps/products/src/main.tsx:5-9; apps/products/vite.config.ts:63-69

**Observation:** apps/products has manifest, index.html pointing to src/main.tsx, React mounting and Vite build outputting dist/products. Frontend unit Yes in 3.4.3.

**Interpretation:** Directory delimits frontend application with own entry/build. Link to other applications appears in composition observations.

### 19. packages/config/eslint-config; packages/config/eslint-config/package.json:1-18

**Observation:** Package exports ESLint configuration; tsc build compiles configuration. No application entry; Frontend unit No in 3.4.3.

**Interpretation:** Workspace support package without own frontend application boundary.

### 20. packages/config/tailwind-config; packages/config/tailwind-config/package.json:1-12

**Observation:** Package exports tailwind.config.ts as shared configuration. No application entry; Frontend unit No in 3.4.3.

**Interpretation:** Workspace support package without own frontend application boundary.

### 21. packages/shared; packages/shared/package.json:1-16; packages/shared/src/index.ts:1-4

**Observation:** Package exports HTTP client, QueryClient creation, queryKeys and useCartStore. No application entry; Frontend unit No in 3.4.3.

**Interpretation:** Workspace support package without own frontend application boundary.

### 22. packages/types; packages/types/package.json:1-9; packages/types/src/index.ts:1-3

**Observation:** Package only reexports HTTP, product and cart types. No application entry; Frontend unit No in 3.4.3.

**Interpretation:** Workspace support package without own frontend application boundary.

### 23. packages/ui; packages/ui/package.json:1-12; packages/ui/src/index.ts:1-6

**Observation:** Package exports UI components including skeletons, Modal and CartList. No application entry; Frontend unit No in 3.4.3.

**Interpretation:** Workspace support package without own frontend application boundary.

### 24. apps/host/src/App.tsx:5; apps/host/src/App.tsx:14; apps/host/vite.config.ts:12; apps/host/vite.config.ts:26-32; apps/header/vite.config.ts:14-19

**Observation:** Host imports/renders header module; remote header matches name/exposes in apps/header configuration. Section 3.4.5 records In snapshot Yes and Active Yes.

**Interpretation:** Directly links host to header application through runtime Module Federation.

### 25. apps/host/src/App.tsx:6; apps/host/src/App.tsx:28; apps/host/vite.config.ts:13; apps/host/vite.config.ts:33-39; apps/footer/vite.config.ts:14-19

**Observation:** Host imports/renders footer module; remote footer matches name/exposes in apps/footer configuration. Section 3.4.5 records In snapshot Yes and Active Yes.

**Interpretation:** Directly links host to footer application through runtime Module Federation.

### 26. apps/host/src/App.tsx:7; apps/host/src/App.tsx:21; apps/host/vite.config.ts:14-15; apps/host/vite.config.ts:40-46; apps/products/vite.config.ts:14-19

**Observation:** Host imports/renders products module; remote products matches name/exposes in apps/products configuration. Section 3.4.5 records In snapshot Yes and Active Yes.

**Interpretation:** Directly links host to products application through runtime Module Federation.

### 27. packages/shared/src/state/cart-store.ts:12-18; packages/shared/src/state/cart-store.ts:70-72; packages/shared/src/index.ts:4; apps/products/src/components/Product.tsx:14; apps/products/src/components/Product.tsx:36-43; apps/products/src/ProductsList.tsx:30; apps/header/src/Header.tsx:16-18; apps/header/src/Header.tsx:27; apps/host/vite.config.ts:55-60; apps/header/vite.config.ts:27-32; apps/products/vite.config.ts:27-32

**Observation:** products writes cart store and header reads state; zustand and @microfrontend/shared singletons in host and both remotes. Section 3.4.5 records products → header communication, events mechanism, present and active.

**Interpretation:** Reactive service constitutes explicit channel between two frontend units. Recorded direction products → header; host provides sharing and footer does not use store.

### 28. apps/footer/package.json:3-8; apps/footer/vite.config.ts:47-53; .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:134-137; .github/workflows/ci-cd.yml:151-152; .github/workflows/ci-cd.yml:230-233; .github/workflows/ci-cd.yml:247-248; .releaserc.json:18-29

**Observation:** footer workspace builds dist/footer; CI publishes output to own S3 bucket and invalidates own CloudFront distribution defined by secrets. Per-app rollback. Section 3.4.6 records Build separate, Deploy separate and Versioning No; app manifest private, version 0.0.0, release versions root files.

**Interpretation:** Build/deployment delimit footer publication separately from other applications. Hosting values unresolved in snapshot; versioning remains joint.

### 29. apps/header/package.json:3-8; apps/header/vite.config.ts:63-69; .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:129-132; .github/workflows/ci-cd.yml:151-152; .github/workflows/ci-cd.yml:225-228; .github/workflows/ci-cd.yml:247-248; .releaserc.json:18-29

**Observation:** header workspace builds dist/header; CI publishes output to own S3 bucket and invalidates own CloudFront distribution defined by secrets. Per-app rollback. Section 3.4.6 records Build separate, Deploy separate and Versioning No; app manifest private, version 0.0.0, release versions root files.

**Interpretation:** Build/deployment delimit header publication separately from other applications. Hosting values unresolved in snapshot; versioning remains joint.

### 30. apps/host/package.json:3-8; apps/host/vite.config.ts:90-96; .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:144-147; .github/workflows/ci-cd.yml:151-152; .github/workflows/ci-cd.yml:240-243; .github/workflows/ci-cd.yml:247-248; .releaserc.json:18-29

**Observation:** host workspace builds dist/host; CI publishes output to own S3 bucket and invalidates own CloudFront distribution defined by secrets. Per-app rollback. Section 3.4.6 records Build separate, Deploy separate and Versioning No; app manifest private, version 0.0.0, release versions root files.

**Interpretation:** Build/deployment delimit host publication separately from other applications. Hosting values unresolved in snapshot; versioning remains joint.

### 31. apps/products/package.json:3-8; apps/products/vite.config.ts:63-69; .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:139-142; .github/workflows/ci-cd.yml:151-152; .github/workflows/ci-cd.yml:235-238; .github/workflows/ci-cd.yml:247-248; .releaserc.json:18-29

**Observation:** products workspace builds dist/products; CI publishes output to own S3 bucket and invalidates own CloudFront distribution defined by secrets. Per-app rollback. Section 3.4.6 records Build separate, Deploy separate and Versioning No; app manifest private, version 0.0.0, release versions root files.

**Interpretation:** Build/deployment delimit products publication separately from other applications. Hosting values unresolved in snapshot; versioning remains joint.

### 32. .github/workflows/ci-cd.yml:12-13

**Observation:** Documentation states: "App to rollback" (rollback per app: header, footer, products or host). Corroboration in 3.4.7: corroborated.

**Interpretation:** Description presents rollback as application choice; per-app implementation corroborates claim.

### 33. .github/workflows/ci-cd.yml:86

**Observation:** Documentation states: "Deploy changed apps to CloudFront". Corroboration in 3.4.7: corroborated.

**Interpretation:** Job name presents publication by changed applications; per-app builds/targets corroborate organization.

### 34. README.md:3

**Observation:** Documentation states: "Aplicação de e-commerce construída com arquitetura de microfrontends usando **Module Federation** (Vite)". Corroboration in 3.4.7: corroborated. English translation: "E-commerce application built with microfrontend architecture using Module Federation through Vite."

**Interpretation:** Documentation presents e-commerce as microfrontend group linked through Module Federation; units/relationships corroborate description.

### 35. README.md:15-18

**Observation:** Documentation states: "host/ # App principal — orquestra os remotes", "header/ # Microfrontend do cabeçalho", "footer/ # Microfrontend do rodapé", "products/ # Microfrontend da listagem de produtos". Corroboration in 3.4.7: corroborated. English translation: "Host: main app orchestrating remotes; header: header microfrontend; footer: footer microfrontend; products: product-list microfrontend."

**Interpretation:** Tree assigns host orchestration of three remotes, consistent with observed units/relationships.

### 36. README.md:21-25

**Observation:** Documentation states: "shared/ # Estado global (Zustand), API client, React Query config", "types/ # Tipos TypeScript compartilhados", "ui/ # Componentes UI reutilizáveis", "tailwind-config/ # Config base do Tailwind compartilhada". Corroboration in 3.4.7: corroborated. English translation: "Shared: global Zustand state, API client and React Query configuration; types: shared TypeScript types; UI: reusable UI components; tailwind-config: shared base Tailwind configuration."

**Interpretation:** Documentation locates support libraries shared between units; packages not additional applications.

### 37. README.md:27

**Observation:** Documentation states: "package.json # Scripts e dependências raiz (npm workspaces)". Corroboration in 3.4.7: corroborated. English translation: "Root package manifest: root scripts and dependencies through npm workspaces."

**Interpretation:** Root manifest coordinates workspace without constituting another frontend unit.

### 38. README.md:33-38

**Observation:** Documentation states: "Expõe": "—" (host), "`header/Header`", "`footer/Footer`", "`products/ProductsList`". Corroboration in 3.4.7: corroborated. English translation: "Exposes: none for host; remaining quoted values are exposed module names."

**Interpretation:** Published module names describe host/remote linking interfaces, corroborated by configuration/code.

### 39. README.md:65-70

**Observation:** Documentation states: "Ou individualmente: npm run dev:header … npm run dev:footer … npm run dev:products" (each remote runs alone). Corroboration in 3.4.7: corroborated. English translation: "Or individually: run the listed development commands for header, footer and products."

**Interpretation:** Described individual execution matches own remote entries; alone demonstrates no link.

### 40. README.md:71

**Observation:** Documentation states: "npm run dev:host # http://localhost:3000 (depende dos outros)". Corroboration in 3.4.7: corroborated. English translation: "Run host development command at the stated local address; depends on other applications."

**Interpretation:** Host depends on remote availability for complete page; error boundaries allow failures displayed without crashing entire page.

### 41. README.md:80

**Observation:** Documentation states: "Build completo (todos os apps em sequência)". Corroboration in 3.4.7: corroborated. English translation: "Complete build: all apps in sequence."

**Interpretation:** Complete build is command coordinating four application builds.

### 42. README.md:86-95

**Observation:** Documentation states: "Ou por app: npm run build:header …" / "Os artefatos são gerados em `dist/<app>`.". Corroboration in 3.4.7: corroborated. English translation: "Or per app: run header build command and others. Artifacts generated under per-application distribution directory."

**Interpretation:** Documentation describes per-unit build outputs corroborated by build artifacts.

### 43. README.md:144

**Observation:** Documentation states: "A aplicação está distribuída em múltiplos microfrontends, cada um hospedado de forma independente via **AWS S3 + CloudFront**.". Corroboration in 3.4.7: corroborated. English translation: "Application distributed across multiple microfrontends, each independently hosted through AWS object storage and CloudFront."

**Interpretation:** Per-application hosting corroborated by workflow without implying independent versioning.

### 44. README.md:148-162

**Observation:** Documentation states: "Host (App principal) https://d6kooi9qoycog.cloudfront.net", "Header https://do4w2f9yum2t1.cloudfront.net", "Products https://dpprlnwt0shjp.cloudfront.net", "Footer https://d1h65an7ioo3f5.cloudfront.net" (published addresses of each app). Corroboration in 3.4.7: uncorroborated. English translation: "Host: main application at first listed address; Header, Products and Footer at respective following addresses."

**Interpretation:** Documentation assigns public address to each unit. Addresses themselves remain uncorroborated in snapshot with no variable/secret values.

### 45. README.md:171

**Observation:** Documentation states: "Zustand — estado do carrinho compartilhado entre microfrontends". Corroboration in 3.4.7: corroborated. English translation: "Zustand: cart state shared between microfrontends."

**Interpretation:** Claim describes shared-reactive-state communication between products/header, corroborated by code/recorded relationship.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:48) | 1 technology | manifest | module-federation | technological | weak | declares #3; declares #4; declares #5; declares #6 |
| 2 | 3.4.2 (packages/shared/package.json:10) | 1 technology | manifest | — | context | weak | declares packages/shared/src/state/cart-store.ts:3 |
| 3 | 3.4.2 (package.json:48, Evidence); 3.4.3 (apps/footer, Markers and Build); 3.4.4 (apps/host/src/App.tsx:6, Observation); 3.4.5 #2 (Configuration); 3.4.7 #7 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #15; configures #25 |
| 4 | 3.4.2 (package.json:48, Evidence); 3.4.2 (packages/shared/package.json:10, Evidence); 3.4.3 (apps/header, Markers and Build); 3.4.4 (apps/host/src/App.tsx:5 and packages/shared/src/state/cart-store.ts:12, Observation); 3.4.5 #1, #4 (Configuration); 3.4.7 #7 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #16; configures #24; configures #27 |
| 5 | 3.4.2 (package.json:48, Evidence); 3.4.3 (apps/host, Markers and Build); 3.4.4 (apps/host/src/App.tsx:5-7 and packages/shared/src/state/cart-store.ts:12, Observation); 3.4.5 #1, #2, #3, #4 (Configuration); 3.4.7 #7, #9 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #17; configures #24; configures #25; configures #26; configures #27 |
| 6 | 3.4.2 (package.json:48, Evidence); 3.4.3 (apps/products, Markers and Build); 3.4.4 (apps/host/src/App.tsx:7 and packages/shared/src/state/cart-store.ts:12, Observation); 3.4.5 #3, #4 (Configuration); 3.4.7 #7 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #18; configures #26; configures #27 |
| 7 | 3.4.4 (apps/host/src/App.tsx:5) | 3 code | source code | module-federation | architectural | strong | implements #24 |
| 8 | 3.4.4 (apps/host/src/App.tsx:6) | 3 code | source code | module-federation | architectural | strong | implements #25 |
| 9 | 3.4.4 (apps/host/src/App.tsx:7) | 3 code | source code | module-federation | architectural | strong | implements #26 |
| 10 | 3.4.4 (apps/host/src/App.tsx:14) | 3 code | source code | module-federation | technological | moderate | implements #24 |
| 11 | 3.4.4 (apps/host/src/App.tsx:21) | 3 code | source code | module-federation | technological | moderate | implements #26 |
| 12 | 3.4.4 (apps/host/src/App.tsx:28) | 3 code | source code | module-federation | technological | moderate | implements #25 |
| 13 | 3.4.4 (packages/shared/src/state/cart-store.ts:12) | 3 code | source code | events | architectural | moderate | implements #27 |
| 14 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 15 | 3.4.3 (apps/footer) | 4 structure | directory | — | architectural | moderate | — |
| 16 | 3.4.3 (apps/header) | 4 structure | directory | — | architectural | moderate | — |
| 17 | 3.4.3 (apps/host) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (apps/products) | 4 structure | directory | — | architectural | moderate | — |
| 19 | 3.4.3 (packages/config/eslint-config) | 4 structure | directory | — | context | weak | — |
| 20 | 3.4.3 (packages/config/tailwind-config) | 4 structure | directory | — | context | weak | — |
| 21 | 3.4.3 (packages/shared) | 4 structure | directory | — | context | weak | — |
| 22 | 3.4.3 (packages/types) | 4 structure | directory | — | context | weak | — |
| 23 | 3.4.3 (packages/ui) | 4 structure | directory | — | context | weak | — |
| 24 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #17; links #16 |
| 25 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #17; links #15 |
| 26 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #17; links #18 |
| 27 | 3.4.5 #4 | 5 composition | source code | events | architectural | strong | links #18; links #16 |
| 28 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #15 |
| 29 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #16 |
| 30 | 3.4.6 #3 | 6 build-deploy | CI | — | architectural | moderate | publishes #17 |
| 31 | 3.4.6 #4 | 6 build-deploy | CI | — | architectural | moderate | publishes #18 |
| 32 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #28; corroborates #29; corroborates #30; corroborates #31 |
| 33 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | corroborates #28; corroborates #29; corroborates #30; corroborates #31 |
| 34 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #1; corroborates #15; corroborates #16; corroborates #17; corroborates #18; corroborates #24; corroborates #25; corroborates #26 |
| 35 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #15; corroborates #16; corroborates #17; corroborates #18; corroborates #24; corroborates #25; corroborates #26 |
| 36 | 3.4.7 #5 | 7 documentation | documentation | — | context | weak | corroborates #20; corroborates #21; corroborates #22; corroborates #23; corroborates apps/host/src/main.tsx:4; corroborates apps/host/src/App.tsx:2; corroborates apps/host/tailwind.config.ts:2 |
| 37 | 3.4.7 #6 | 7 documentation | documentation | — | context | weak | corroborates #14 |
| 38 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #3; corroborates #4; corroborates #5; corroborates #6; corroborates #24; corroborates #25; corroborates #26 |
| 39 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #15; corroborates #16; corroborates #18; corroborates package.json:14-16 |
| 40 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #24; corroborates #25; corroborates #26 |
| 41 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates package.json:18 |
| 42 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #28; corroborates #29; corroborates #30; corroborates #31 |
| 43 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #28; corroborates #29; corroborates #30; corroborates #31 |
| 44 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | — |
| 45 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #13; corroborates #27 |

## Summary

Observations: 45. Dimensions (technology: 2, configuration: 4, code: 7, structure: 10, composition: 4, build-deploy: 4, documentation: 14, history: 0). Strength (strong: 8, moderate: 15, weak: 22, ambiguous: 0). Evidence (technological: 7, architectural: 29, context: 9).

