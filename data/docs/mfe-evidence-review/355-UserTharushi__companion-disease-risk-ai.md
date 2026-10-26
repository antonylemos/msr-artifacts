---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
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

# 355 — UserTharushi/companion-disease-risk-ai

## Repository overview

Eight React/Vite applications have own entries/builds (#28–#35). Federation chain starts in declared dependencies (#1–#8), passes through seven remote blocks/host map (#10–#17), reaches shell imports/routes (#18–#23, #26). Six active relationships (#45–#50) integrate pet-profile, symptom-checker, risk-results, vet-discovery, vaccination, admin into shell UI. “Active” describes code recorded in 3.4.5 without proving production execution.

Auth remote configured (#11) but federated relationship remains only configured (#51): shell redirects browser to independent application. Eight applications have separate builds (#52–#59), while deployment/independent versioning unobserved. Auth/shell containers run development servers. Documentation situates auth as main functional application, but exclusive real usage partially corroborated (#61); inert-shell allegation uncorroborated (#65). History does not resolve operational state (#78).

Misleading signals include Workbox loader/MessageChannel internal to PWA (#24–#25), coordination, service/library directories not frontend units (#27, #36–#44). Turbo automation usage remains undetermined (#9, #76). Documentation calling all other frontends empty conflicts with existing implementation (#63); gateway-access generalization conflicts with direct clients (#68). Historical queries delimit code persistence without explaining conflicts’ origin (#79, #81). Common types corroborated at compilation (#66), shared-utils sharing uncorroborated (#67, #80).

## Observations

### 1. apps/mfe-admin/package.json:26

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `devDependencies`, version `^1.3.5`.

**Interpretation:** Declaration signals Module Federation; configuration examined separately.

### 2. apps/mfe-auth/package.json:43

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `devDependencies`, version `^1.3.5`.

**Interpretation:** Declaration signals Module Federation; configuration examined separately.

### 3. apps/mfe-pet-profile/package.json:27

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `devDependencies`, version `^1.3.5`.

**Interpretation:** Declaration signals Module Federation; configuration examined separately.

### 4. apps/mfe-risk-results/package.json:25

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `devDependencies`, version `^1.3.5`.

**Interpretation:** Declaration signals Module Federation; configuration examined separately.

### 5. apps/mfe-symptom-checker/package.json:27

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `devDependencies`, version `^1.3.5`.

**Interpretation:** Declaration signals Module Federation; configuration examined separately.

### 6. apps/mfe-vaccination/package.json:25

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `devDependencies`, version `^1.3.5`.

**Interpretation:** Declaration signals Module Federation; configuration examined separately.

### 7. apps/mfe-vet-discovery/package.json:25

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `devDependencies`, version `^1.3.5`.

**Interpretation:** Declaration signals Module Federation; configuration examined separately.

### 8. apps/shell/package.json:26

**Observation:** Manifest declares `@originjs/vite-plugin-federation` in `devDependencies`, version `^1.3.5`.

**Interpretation:** Declaration signals Module Federation; configuration examined separately.

### 9. package.json:20

**Observation:** Manifest declares `turbo` in `devDependencies`, version `^2.0.0`.

**Interpretation:** Turbo signals monorepo coordination without frontend composition mechanism. Snapshot allows configured-only coordination or automation usage unrecorded in observed artifacts; 3.4.2 retains undetermined usage.

### 10. apps/mfe-admin/vite.config.ts:8-20

**Observation:** Block `federation` names `mfeAdmin`, defines `filename: "remoteEntry.js"`, exposes `./App`, `./DashboardPage`, `./ClinicManagementPage`, `./SurgeonManagementPage`, `./DiseaseVaccineDBPage`, `./AnalyticsPage`, declares react, react-dom, react-router-dom, zustand in `shared`.

**Interpretation:** Configures federation mechanism/unit exposed interface without naming consumers.

### 11. apps/mfe-auth/vite.config.ts:9-18

**Observation:** Block `federation` names `mfeAuth`, defines `filename: "remoteEntry.js"`, exposes `./App`, `./LoginPage`, `./RegisterPage`, declares react, react-dom, react-router-dom, zustand in `shared`.

**Interpretation:** Configures federation mechanism/unit exposed interface without naming consumers.

### 12. apps/mfe-pet-profile/vite.config.ts:8-18

**Observation:** Block `federation` names `mfePetProfile`, defines `filename: "remoteEntry.js"`, exposes `./App`, `./PetListPage`, `./PetDetailPage`, `./AddPetPage`, declares react, react-dom, react-router-dom, zustand in `shared`.

**Interpretation:** Configures federation mechanism/unit exposed interface without naming consumers.

### 13. apps/mfe-risk-results/vite.config.ts:8-17

**Observation:** Block `federation` names `mfeRiskResults`, defines `filename: "remoteEntry.js"`, exposes `./App`, `./RiskResultPage`, `./PredictionHistoryPage`, declares react, react-dom, react-router-dom, zustand in `shared`.

**Interpretation:** Configures federation mechanism/unit exposed interface without naming consumers.

### 14. apps/mfe-symptom-checker/vite.config.ts:8-17

**Observation:** Block `federation` names `mfeSymptom`, defines `filename: "remoteEntry.js"`, exposes `./App`, `./SymptomFormPage`, `./ChatbotPage`, declares react, react-dom, react-router-dom, zustand in `shared`.

**Interpretation:** Configures federation mechanism/unit exposed interface without naming consumers.

### 15. apps/mfe-vaccination/vite.config.ts:8-17

**Observation:** Block `federation` names `mfeVaccination`, defines `filename: "remoteEntry.js"`, exposes `./App`, `./VaccinationDashboard`, `./AddVaccinationPage`, declares react, react-dom, react-router-dom, zustand in `shared`.

**Interpretation:** Configures federation mechanism/unit exposed interface without naming consumers.

### 16. apps/mfe-vet-discovery/vite.config.ts:8-18

**Observation:** Block `federation` names `mfeVetDiscover`, defines `filename: "remoteEntry.js"`, exposes `./App`, `./ClinicMapPage`, `./ClinicDetailPage`, `./BookingPage`, declares react, react-dom, react-router-dom, zustand in `shared`.

**Interpretation:** Configures federation mechanism/unit exposed interface without naming consumers.

### 17. apps/shell/vite.config.ts:9-21

**Observation:** Block `federation` names `shell`, maps mfeAuth, mfePetProfile, mfeSymptom, mfeRiskResults, mfeVetDiscover, mfeVaccination, mfeAdmin to URLs `http://localhost:3001` through `3007` at `/assets/remoteEntry.js`, shares react, react-dom, react-router-dom, zustand.

**Interpretation:** Host configuration explicitly links shell to seven remote targets. Map does not demonstrate all targets consumed.

### 18. apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:48; apps/shell/vite.config.ts:13; apps/mfe-pet-profile/vite.config.ts:9-12

**Observation:** Shell declares `lazy(() => import("mfePetProfile/App"))`, renders component at `pets/*` under `ShellLayout`.

**Interpretation:** Consumption names target apps/mfe-pet-profile/integrates UI through Module Federation.

### 19. apps/shell/src/App.tsx:19; apps/shell/src/App.tsx:49; apps/shell/vite.config.ts:14; apps/mfe-symptom-checker/vite.config.ts:9-12

**Observation:** Shell declares `lazy(() => import("mfeSymptom/App"))`, renders component at `symptom/*` under `ShellLayout`.

**Interpretation:** Consumption names target apps/mfe-symptom-checker/integrates UI through Module Federation.

### 20. apps/shell/src/App.tsx:20; apps/shell/src/App.tsx:50; apps/shell/vite.config.ts:15; apps/mfe-risk-results/vite.config.ts:9-12

**Observation:** Shell declares `lazy(() => import("mfeRiskResults/App"))`, renders component at `risk-results/*` under `ShellLayout`.

**Interpretation:** Consumption names target apps/mfe-risk-results/integrates UI through Module Federation.

### 21. apps/shell/src/App.tsx:21; apps/shell/src/App.tsx:51; apps/shell/vite.config.ts:16; apps/mfe-vet-discovery/vite.config.ts:9-12

**Observation:** Shell declares `lazy(() => import("mfeVetDiscover/App"))`, renders component at `vet-discovery/*` under `ShellLayout`.

**Interpretation:** Consumption names target apps/mfe-vet-discovery/integrates UI through Module Federation.

### 22. apps/shell/src/App.tsx:22; apps/shell/src/App.tsx:52; apps/shell/vite.config.ts:17; apps/mfe-vaccination/vite.config.ts:9-12

**Observation:** Shell declares `lazy(() => import("mfeVaccination/App"))`, renders component at `vaccination/*` under `ShellLayout`.

**Interpretation:** Consumption names target apps/mfe-vaccination/integrates UI through Module Federation.

### 23. apps/shell/src/App.tsx:23; apps/shell/src/App.tsx:53; apps/shell/vite.config.ts:18; apps/mfe-admin/vite.config.ts:9-12

**Observation:** Shell declares `lazy(() => import("mfeAdmin/App"))`, renders component at `admin/*` under `ShellLayout`.

**Interpretation:** Consumption names target apps/mfe-admin/integrates UI through Module Federation.

### 24. apps/mfe-auth/dev-dist/sw.js:22-37

**Observation:** Generated loader creates script tag/assigns required chunk URI.

**Interpretation:** Loads own Workbox chunks in PWA without composing other frontend unit.

### 25. apps/mfe-auth/dev-dist/workbox-af90992f.js:775-778

**Observation:** Generated code responds through `event.ports[0].postMessage(true)` after cache request.

**Interpretation:** Communication between service worker/page of same unit; false positive for inter-frontend communication.

### 26. apps/shell/src/App.tsx:18-23; apps/shell/src/App.tsx:42-55; apps/shell/src/main.tsx:6-10

**Observation:** Routes associates pets, symptom, risk-results, vet-discovery, vaccination, admin with six imported components under ShellLayout. /auth/* route renders AuthRedirect.

**Interpretation:** Routes compose six remote units under shell UI; auth reached through navigation to another page.

### 27. .; package.json:1-31

**Observation:** Root manifest lists apps/service/package workspaces and Turbo-invoking scripts; no own UI entry.

**Interpretation:** Coordination root without frontend unit.

### 28. apps/mfe-admin; apps/mfe-admin/package.json:1-33; apps/mfe-admin/index.html:10; apps/mfe-admin/src/main.tsx:6-12; apps/mfe-admin/vite.config.ts:5-23; apps/mfe-admin/package.json:8

**Observation:** Directory `apps/mfe-admin` has own manifest, index.html loading src/main.tsx, React mounting/script `tsc && vite build` with own vite.config.ts.

**Interpretation:** Own entry/build confirm frontend application boundary.

### 29. apps/mfe-auth; apps/mfe-auth/package.json:1-55; apps/mfe-auth/index.html:17; apps/mfe-auth/src/main.tsx:53-64; apps/mfe-auth/vite.config.ts:5-53; apps/mfe-auth/package.json:8; apps/mfe-auth/Dockerfile:1-15; docker-compose.yml:24-27

**Observation:** Directory `apps/mfe-auth` has own manifest, index.html loading src/main.tsx, React mounting/script `tsc && vite build` with own vite.config.ts. Own Dockerfile/Compose service run development server.

**Interpretation:** Own entry/build confirm frontend application boundary.

### 30. apps/mfe-pet-profile; apps/mfe-pet-profile/package.json:1-34; apps/mfe-pet-profile/index.html:10; apps/mfe-pet-profile/src/main.tsx:6-12; apps/mfe-pet-profile/vite.config.ts:5-21; apps/mfe-pet-profile/package.json:8

**Observation:** Directory `apps/mfe-pet-profile` has own manifest, index.html loading src/main.tsx, React mounting/script `tsc && vite build` with own vite.config.ts.

**Interpretation:** Own entry/build confirm frontend application boundary.

### 31. apps/mfe-risk-results; apps/mfe-risk-results/package.json:1-32; apps/mfe-risk-results/index.html:10; apps/mfe-risk-results/src/main.tsx:6-12; apps/mfe-risk-results/vite.config.ts:5-20; apps/mfe-risk-results/package.json:8

**Observation:** Directory `apps/mfe-risk-results` has own manifest, index.html loading src/main.tsx, React mounting/script `tsc && vite build` with own vite.config.ts.

**Interpretation:** Own entry/build confirm frontend application boundary.

### 32. apps/mfe-symptom-checker; apps/mfe-symptom-checker/package.json:1-34; apps/mfe-symptom-checker/index.html:10; apps/mfe-symptom-checker/src/main.tsx:6-12; apps/mfe-symptom-checker/vite.config.ts:5-20; apps/mfe-symptom-checker/package.json:8

**Observation:** Directory `apps/mfe-symptom-checker` has own manifest, index.html loading src/main.tsx, React mounting/script `tsc && vite build` with own vite.config.ts.

**Interpretation:** Own entry/build confirm frontend application boundary.

### 33. apps/mfe-vaccination; apps/mfe-vaccination/package.json:1-32; apps/mfe-vaccination/index.html:10; apps/mfe-vaccination/src/main.tsx:6-12; apps/mfe-vaccination/vite.config.ts:5-20; apps/mfe-vaccination/package.json:8

**Observation:** Directory `apps/mfe-vaccination` has own manifest, index.html loading src/main.tsx, React mounting/script `tsc && vite build` with own vite.config.ts.

**Interpretation:** Own entry/build confirm frontend application boundary.

### 34. apps/mfe-vet-discovery; apps/mfe-vet-discovery/package.json:1-32; apps/mfe-vet-discovery/index.html:10; apps/mfe-vet-discovery/src/main.tsx:6-12; apps/mfe-vet-discovery/vite.config.ts:5-21; apps/mfe-vet-discovery/package.json:8

**Observation:** Directory `apps/mfe-vet-discovery` has own manifest, index.html loading src/main.tsx, React mounting/script `tsc && vite build` with own vite.config.ts.

**Interpretation:** Own entry/build confirm frontend application boundary.

### 35. apps/shell; apps/shell/package.json:1-34; apps/shell/index.html:17; apps/shell/src/main.tsx:6-10; apps/shell/vite.config.ts:5-61; apps/shell/package.json:8; apps/shell/Dockerfile:1-15; docker-compose.yml:11-14

**Observation:** Directory `apps/shell` has own manifest, index.html loading src/main.tsx, React mounting/script `tsc && vite build` with own vite.config.ts. Own Dockerfile/Compose service run development server.

**Interpretation:** Own entry/build confirm frontend application boundary.

### 36. backend/services/nodejs/admin-service; backend/services/nodejs/admin-service/package.json:1-23; backend/services/nodejs/admin-service/src/server.ts:5; backend/services/nodejs/admin-service/package.json:5; backend/services/nodejs/admin-service/Dockerfile:1-20; docker-compose.yml:142

**Observation:** Directory `backend/services/nodejs/admin-service` has manifest, HTTP app.listen entry, TypeScript build/service Dockerfile.

**Interpretation:** Backend service without frontend application boundary.

### 37. backend/services/nodejs/api-gateway; backend/services/nodejs/api-gateway/package.json:1-37; backend/services/nodejs/api-gateway/src/server.ts:6; backend/services/nodejs/api-gateway/package.json:7; backend/services/nodejs/api-gateway/Dockerfile:1-20; docker-compose.yml:38

**Observation:** Directory `backend/services/nodejs/api-gateway` has manifest, HTTP app.listen entry, TypeScript build/service Dockerfile.

**Interpretation:** Backend service without frontend application boundary.

### 38. backend/services/nodejs/auth-service; backend/services/nodejs/auth-service/package.json:1-33; backend/services/nodejs/auth-service/src/server.ts:24; backend/services/nodejs/auth-service/package.json:7; backend/services/nodejs/auth-service/Dockerfile:1-20; docker-compose.yml:67

**Observation:** Directory `backend/services/nodejs/auth-service` has manifest, HTTP app.listen entry, TypeScript build/service Dockerfile.

**Interpretation:** Backend service without frontend application boundary.

### 39. backend/services/nodejs/clinic-service; backend/services/nodejs/clinic-service/package.json:1-20; backend/services/nodejs/clinic-service/src/server.ts:5; backend/services/nodejs/clinic-service/package.json:5; backend/services/nodejs/clinic-service/Dockerfile:1-20; docker-compose.yml:97

**Observation:** Directory `backend/services/nodejs/clinic-service` has manifest, HTTP app.listen entry, TypeScript build/service Dockerfile.

**Interpretation:** Backend service without frontend application boundary.

### 40. backend/services/nodejs/notification-service; backend/services/nodejs/notification-service/package.json:1-24; backend/services/nodejs/notification-service/src/server.ts:5; backend/services/nodejs/notification-service/package.json:5; backend/services/nodejs/notification-service/Dockerfile:1-20; docker-compose.yml:112

**Observation:** Directory `backend/services/nodejs/notification-service` has manifest, HTTP app.listen entry, TypeScript build/service Dockerfile.

**Interpretation:** Backend service without frontend application boundary.

### 41. backend/services/nodejs/pet-service; backend/services/nodejs/pet-service/package.json:1-32; backend/services/nodejs/pet-service/src/server.ts:4; backend/services/nodejs/pet-service/package.json:7; backend/services/nodejs/pet-service/Dockerfile:1-20; docker-compose.yml:82

**Observation:** Directory `backend/services/nodejs/pet-service` has manifest, HTTP app.listen entry, TypeScript build/service Dockerfile.

**Interpretation:** Backend service without frontend application boundary.

### 42. backend/services/nodejs/vaccination-service; backend/services/nodejs/vaccination-service/package.json:1-24; backend/services/nodejs/vaccination-service/src/server.ts:5; backend/services/nodejs/vaccination-service/package.json:5; backend/services/nodejs/vaccination-service/Dockerfile:1-20; docker-compose.yml:127

**Observation:** Directory `backend/services/nodejs/vaccination-service` has manifest, HTTP app.listen entry, TypeScript build/service Dockerfile.

**Interpretation:** Backend service without frontend application boundary.

### 43. packages/shared-types; packages/shared-types/package.json:1-14; packages/shared-types/package.json:9

**Observation:** Package `packages/shared-types` declares main/types at ./src/index.ts, tsc build, no application entry.

**Interpretation:** Support library; package presence establishes no frontend unit.

### 44. packages/shared-utils; packages/shared-utils/package.json:1-18; packages/shared-utils/package.json:9

**Observation:** Package `packages/shared-utils` declares main/types at ./src/index.ts, tsc build, no application entry.

**Interpretation:** Support library; package presence establishes no frontend unit.

### 45. apps/shell/vite.config.ts:13; apps/mfe-pet-profile/vite.config.ts:9-12; apps/mfe-pet-profile/package.json:7; apps/shell/src/App.tsx:18; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:48

**Observation:** Shell map resolves `apps/mfe-pet-profile` through remote name and remoteEntry.js; corresponding import consumes ./App/route renders under ShellLayout.

**Interpretation:** Host → remote relationship active in snapshot code, linking applications with own entries/builds.

### 46. apps/shell/vite.config.ts:14; apps/mfe-symptom-checker/vite.config.ts:9-12; apps/mfe-symptom-checker/package.json:7; apps/shell/src/App.tsx:19; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:49

**Observation:** Shell map resolves `apps/mfe-symptom-checker` through remote name and remoteEntry.js; corresponding import consumes ./App/route renders under ShellLayout.

**Interpretation:** Host → remote relationship active in snapshot code, linking applications with own entries/builds.

### 47. apps/shell/vite.config.ts:15; apps/mfe-risk-results/vite.config.ts:9-12; apps/mfe-risk-results/package.json:7; apps/shell/src/App.tsx:20; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:50

**Observation:** Shell map resolves `apps/mfe-risk-results` through remote name and remoteEntry.js; corresponding import consumes ./App/route renders under ShellLayout.

**Interpretation:** Host → remote relationship active in snapshot code, linking applications with own entries/builds.

### 48. apps/shell/vite.config.ts:16; apps/mfe-vet-discovery/vite.config.ts:9-12; apps/mfe-vet-discovery/package.json:7; apps/shell/src/App.tsx:21; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:51

**Observation:** Shell map resolves `apps/mfe-vet-discovery` through remote name and remoteEntry.js; corresponding import consumes ./App/route renders under ShellLayout.

**Interpretation:** Host → remote relationship active in snapshot code, linking applications with own entries/builds.

### 49. apps/shell/vite.config.ts:17; apps/mfe-vaccination/vite.config.ts:9-12; apps/mfe-vaccination/package.json:7; apps/shell/src/App.tsx:22; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:52

**Observation:** Shell map resolves `apps/mfe-vaccination` through remote name and remoteEntry.js; corresponding import consumes ./App/route renders under ShellLayout.

**Interpretation:** Host → remote relationship active in snapshot code, linking applications with own entries/builds.

### 50. apps/shell/vite.config.ts:18; apps/mfe-admin/vite.config.ts:9-12; apps/mfe-admin/package.json:7; apps/shell/src/App.tsx:23; apps/shell/src/App.tsx:42; apps/shell/src/App.tsx:53

**Observation:** Shell map resolves `apps/mfe-admin` through remote name and remoteEntry.js; corresponding import consumes ./App/route renders under ShellLayout.

**Interpretation:** Host → remote relationship active in snapshot code, linking applications with own entries/builds.

### 51. apps/shell/vite.config.ts:12; apps/mfe-auth/vite.config.ts:10-16; apps/mfe-auth/package.json:7; apps/shell/src/App.tsx:8-15; apps/shell/src/App.tsx:44

**Observation:** Shell declares mfeAuth in map/auth exposes ./App, ./LoginPage, ./RegisterPage. No recorded federation consumer; /auth/* redirects.

**Interpretation:** Auth federation link exists only in configuration, not active composition.

### 52. apps/mfe-admin/package.json:8; apps/mfe-admin/vite.config.ts:8-22; package.json:13; apps/shell/vite.config.ts:18; apps/mfe-admin/package.json:7

**Observation:** `apps/mfe-admin/package.json` declares build through `tsc && vite build` using own Vite configuration. Application version 1.0.0/private true. Cited port belongs to dev/preview scripts; review records no application deployment artifact.

**Interpretation:** Separate build confirms unit boundary. Deployment/independent versioning unobserved; configured build proves no publication.

### 53. apps/mfe-auth/package.json:8; apps/mfe-auth/vite.config.ts:9-52; apps/mfe-auth/Dockerfile:1-15; docker-compose.yml:24-32; apps/mfe-auth/package.json:7; apps/shell/vite.config.ts:12; apps/shell/src/App.tsx:12; apps/mfe-auth/Dockerfile:13-15; docker-compose.yml:28-29

**Observation:** `apps/mfe-auth/package.json` declares build through `tsc && vite build` using own Vite configuration. Application version 1.0.0/private true. Dockerfile runs npm run dev/Compose publishes development port.

**Interpretation:** Separate build confirms unit boundary. Deployment/independent versioning unobserved; configured build proves no publication.

### 54. apps/mfe-pet-profile/package.json:8; apps/mfe-pet-profile/vite.config.ts:8-20; apps/shell/vite.config.ts:13; apps/mfe-pet-profile/package.json:7

**Observation:** `apps/mfe-pet-profile/package.json` declares build through `tsc && vite build` using own Vite configuration. Application version 1.0.0/private true. Cited port belongs to dev/preview scripts; review records no application deployment artifact.

**Interpretation:** Separate build confirms unit boundary. Deployment/independent versioning unobserved; configured build proves no publication.

### 55. apps/mfe-risk-results/package.json:8; apps/mfe-risk-results/vite.config.ts:8-19; apps/shell/vite.config.ts:15; apps/mfe-risk-results/package.json:7

**Observation:** `apps/mfe-risk-results/package.json` declares build through `tsc && vite build` using own Vite configuration. Application version 1.0.0/private true. Cited port belongs to dev/preview scripts; review records no application deployment artifact.

**Interpretation:** Separate build confirms unit boundary. Deployment/independent versioning unobserved; configured build proves no publication.

### 56. apps/mfe-symptom-checker/package.json:8; apps/mfe-symptom-checker/vite.config.ts:8-19; apps/shell/vite.config.ts:14; apps/mfe-symptom-checker/package.json:7

**Observation:** `apps/mfe-symptom-checker/package.json` declares build through `tsc && vite build` using own Vite configuration. Application version 1.0.0/private true. Cited port belongs to dev/preview scripts; review records no application deployment artifact.

**Interpretation:** Separate build confirms unit boundary. Deployment/independent versioning unobserved; configured build proves no publication.

### 57. apps/mfe-vaccination/package.json:8; apps/mfe-vaccination/vite.config.ts:8-19; apps/shell/vite.config.ts:17; apps/mfe-vaccination/package.json:7

**Observation:** `apps/mfe-vaccination/package.json` declares build through `tsc && vite build` using own Vite configuration. Application version 1.0.0/private true. Cited port belongs to dev/preview scripts; review records no application deployment artifact.

**Interpretation:** Separate build confirms unit boundary. Deployment/independent versioning unobserved; configured build proves no publication.

### 58. apps/mfe-vet-discovery/package.json:8; apps/mfe-vet-discovery/vite.config.ts:8-20; apps/shell/vite.config.ts:16; apps/mfe-vet-discovery/package.json:7

**Observation:** `apps/mfe-vet-discovery/package.json` declares build through `tsc && vite build` using own Vite configuration. Application version 1.0.0/private true. Cited port belongs to dev/preview scripts; review records no application deployment artifact.

**Interpretation:** Separate build confirms unit boundary. Deployment/independent versioning unobserved; configured build proves no publication.

### 59. apps/shell/package.json:8; apps/shell/vite.config.ts:9-60; apps/shell/Dockerfile:1-15; docker-compose.yml:11-21; apps/shell/package.json:7; apps/shell/Dockerfile:13-15; docker-compose.yml:15-16

**Observation:** `apps/shell/package.json` declares build through `tsc && vite build` using own Vite configuration. Application version 1.0.0/private true. Dockerfile runs npm run dev/Compose publishes development port.

**Interpretation:** Separate build confirms unit boundary. Deployment/independent versioning unobserved; configured build proves no publication.

### 60. CLAUDE.md:7

**Observation:** Text states: "Monorepo with React micro-frontends, Node.js microservices, Python ML/agent services".

**Interpretation:** Describes frontend unit group in monorepo, corroborated by directories/workspace.

### 61. CLAUDE.md:56

**Observation:** Text states: "apps/mfe-auth […] is the entire live front end […] the application monolith".

**Interpretation:** Functional concentration in auth confirmed by routes, but sole frontend in real usage undemonstrated; partial corroboration.

### 62. CLAUDE.md:58

**Observation:** Text states: "apps/shell […] the Module Federation host, remotes map in apps/shell/vite.config.ts".

**Interpretation:** Host role/remote map corroborated by configuration/recorded relationships.

### 63. CLAUDE.md:58

**Observation:** Text states: "The other MFEs […] and apps/shell […] are empty scaffolds".

**Interpretation:** All-empty claim contradicted by shell routes/pet-profile data access; scaffold does not equal absent implementation.

### 64. CLAUDE.md:62

**Observation:** Text states: "Shared libs react, react-dom, react-router-dom, zustand are declared federated shared deps".

**Interpretation:** Federation shared-dependency declaration corroborated; does not prove each package used across multiple units.

### 65. CLAUDE.md:62

**Observation:** Text states: "inert while the shell is unused".

**Interpretation:** Operational inertia from unused shell remains uncorroborated. Existing code does not decide real usage.

### 66. CLAUDE.md:95

**Observation:** Text states: "packages/shared-types — canonical TypeScript interfaces".

**Interpretation:** Type sharing corroborated by three frontend import type statements; compilation support without runtime composition mechanism.

### 67. CLAUDE.md:96

**Observation:** Text states: "packages/shared-utils — shared utility functions".

**Interpretation:** Utility-library sharing remains uncorroborated, without observed consumers.

### 68. CLAUDE.md:115

**Observation:** Text states: "frontends call everything through the gateway (:4000) with Authorization: Bearer <jwt>".

**Interpretation:** Gateway/Bearer generalization contradicted by pet-profile/admin direct clients; backend access without frontend composition mechanism.

### 69. README.md:7

**Observation:** Text states: "Frontend: React + Tailwind + Module Federation micro-frontends + PWA".

**Interpretation:** Federated-microfrontend stack corroborated by configurations/relationships; PWA proves no architecture publication.

### 70. README.md:18-26

**Observation:** Text states: "apps/ […] shell/ […] mfe-auth/ […] mfe-admin/" (tree with shell and seven mfe-* apps).

**Interpretation:** Documentary tree matches eight frontend units without proving eight deployments/complete functional boundaries.

### 71. apps/mfe-auth/vite.config.ts:47-48

**Observation:** Text states: "The container serves vite dev, so enable the SW there too".

**Interpretation:** Comment corroborated by Dockerfile/dev script; development execution without observed production deployment.

### 72. apps/shell/src/App.tsx:8

**Observation:** Text states: "Auth MFE runs standalone at localhost:3001 – redirect to it instead of federating".

**Interpretation:** Comment corroborated by auth redirection/own execution without demonstrating federation composition.

### 73. apps/shell/src/App.tsx:17

**Observation:** Text states: "Lazy MFE Imports (Module Federation)".

**Interpretation:** Comment corroborated by six shell imports/consuming routes.

### 74. docs/INTERIM_REPORT.md:462

**Observation:** Text states: "Turborepo, npm workspaces […] Coordinated builds across services".

**Interpretation:** Build coordination configured in workspaces, scripts/Turbo tasks; claim proves no executed automation.

### 75. docs/INTERIM_REPORT.md:504

**Observation:** Text states: "microservice architecture behind an API gateway, with a React PWA client".

**Interpretation:** Main PWA client/gateway link corroborated; concerns frontend/backend services without frontend-application composition.

### 76. 1d5c716 2026-03-25 (package.json; turbo.json); f1531e1 2026-04-09 (package.json; turbo.json)

**Observation:** History records package.json same object in March, April/snapshot; turbo.json same object since April. Query records no .github workflow; scripts found in July concern other tasks.

**Interpretation:** Origin/eventual earlier Turbo automation usage inconclusive. Configured snapshot coordination clear; frontend unit boundaries unchanged.

### 77. 1d5c716 2026-03-25 (apps/shell/vite.config.ts; apps/shell/src/App.tsx); f1531e1 2026-04-09 (apps/shell/vite.config.ts; apps/shell/src/App.tsx)

**Observation:** Shell federation configuration same object in March, April/snapshot. April App identical to current; March App content unreadable.

**Interpretation:** Current auth redirection persists since April incorporation. Clarified within limit; proves no abandonment/excludes no earlier federation consumption.

### 78. f1531e1 2026-04-09 (CLAUDE.md); 46d7f21 2026-07-18 (CLAUDE.md); 869945f 2026-07-26 (CLAUDE.md); dcd3623 2026-07-29 (CLAUDE.md)

**Observation:** CLAUDE.md added in April/changed in July. April/July 18 version reads fail; metadata do not attribute real-usage sentence to commit.

**Interpretation:** Real shell usage/exclusive auth operational concentration remain undetermined: existing composition/isolated main application compatible with different snapshot operational states.

### 79. f1531e1 2026-04-09 (CLAUDE.md; apps/shell/src/App.tsx; apps/mfe-pet-profile/src/pages/PetListPage.tsx; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts); 3d48ece 2026-07-18 (CLAUDE.md; apps/shell/src/App.tsx; apps/mfe-pet-profile/src/pages/PetListPage.tsx; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts); 46d7f21 2026-07-18 (CLAUDE.md; apps/shell/src/App.tsx; apps/mfe-pet-profile/src/pages/PetListPage.tsx; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts)

**Observation:** April shell App identical to snapshot. July introduces pet-profile/admin API clients/changes PetListPage; objects same as current. Old CLAUDE.md versions unreadable.

**Interpretation:** Historical uncertainty when empty-description originated. Current implementation clear/contradicts claim; cannot attribute conflict to outdated documentation.

### 80. 1d5c716 2026-03-25 (packages/shared-utils); f1531e1 2026-04-09 (packages/shared-utils); 9ac4ff2 2026-07-18 (packages/shared-utils)

**Observation:** shared-utils manifest/code appear in March/April incorporation; July adds tsconfig. Query does not trace every possible historical consumer.

**Interpretation:** Historical library presence proves neither earlier sharing nor abandonment. Snapshot consumer absence remains recorded.

### 81. 3d48ece 2026-07-18 (CLAUDE.md; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts); 46d7f21 2026-07-18 (CLAUDE.md; apps/mfe-pet-profile/src/lib/api.ts; apps/mfe-admin/src/lib/api.ts)

**Observation:** Pet-profile/admin direct clients enter in July with snapshot-identical objects. Old CLAUDE.md versions unreadable.

**Interpretation:** Direct-client persistence since July does not date documentary generalization. Current conflict clear/origin historically inconclusive.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/mfe-admin/package.json:26) | 1 technology | manifest | module-federation | technological | weak | declares #10 |
| 2 | 3.4.2 (apps/mfe-auth/package.json:43) | 1 technology | manifest | module-federation | technological | weak | declares #11 |
| 3 | 3.4.2 (apps/mfe-pet-profile/package.json:27) | 1 technology | manifest | module-federation | technological | weak | declares #12 |
| 4 | 3.4.2 (apps/mfe-risk-results/package.json:25) | 1 technology | manifest | module-federation | technological | weak | declares #13 |
| 5 | 3.4.2 (apps/mfe-symptom-checker/package.json:27) | 1 technology | manifest | module-federation | technological | weak | declares #14 |
| 6 | 3.4.2 (apps/mfe-vaccination/package.json:25) | 1 technology | manifest | module-federation | technological | weak | declares #15 |
| 7 | 3.4.2 (apps/mfe-vet-discovery/package.json:25) | 1 technology | manifest | module-federation | technological | weak | declares #16 |
| 8 | 3.4.2 (apps/shell/package.json:26) | 1 technology | manifest | module-federation | technological | weak | declares #17 |
| 9 | 3.4.2 (package.json:20) | 1 technology | manifest | — | context | ambiguous | — |
| 10 | 3.4.2 (apps/mfe-admin/package.json:26) (Evidence); 3.4.3 (apps/mfe-admin) (Markers, Build); 3.4.4 (apps/shell/src/App.tsx:23) (Observation); 3.4.5 #6 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #28; configures #50 |
| 11 | 3.4.2 (apps/mfe-auth/package.json:43) (Evidence); 3.4.3 (apps/mfe-auth) (Markers, Build); 3.4.5 #7 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #5 (Evidence); 3.4.7 #10 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #29; configures #51 |
| 12 | 3.4.2 (apps/mfe-pet-profile/package.json:27) (Evidence); 3.4.3 (apps/mfe-pet-profile) (Markers, Build); 3.4.4 (apps/shell/src/App.tsx:18) (Observation); 3.4.5 #1 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #5 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #30; configures #45 |
| 13 | 3.4.2 (apps/mfe-risk-results/package.json:25) (Evidence); 3.4.3 (apps/mfe-risk-results) (Markers, Build); 3.4.4 (apps/shell/src/App.tsx:20) (Observation); 3.4.5 #3 (Configuration); 3.4.6 #4 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #31; configures #47 |
| 14 | 3.4.2 (apps/mfe-symptom-checker/package.json:27) (Evidence); 3.4.3 (apps/mfe-symptom-checker) (Markers, Build); 3.4.4 (apps/shell/src/App.tsx:19) (Observation); 3.4.5 #2 (Configuration); 3.4.6 #5 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #32; configures #46 |
| 15 | 3.4.2 (apps/mfe-vaccination/package.json:25) (Evidence); 3.4.3 (apps/mfe-vaccination) (Markers, Build); 3.4.4 (apps/shell/src/App.tsx:22) (Observation); 3.4.5 #5 (Configuration); 3.4.6 #6 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #33; configures #49 |
| 16 | 3.4.2 (apps/mfe-vet-discovery/package.json:25) (Evidence); 3.4.3 (apps/mfe-vet-discovery) (Markers, Build); 3.4.4 (apps/shell/src/App.tsx:21) (Observation); 3.4.5 #4 (Configuration); 3.4.6 #7 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #34; configures #48 |
| 17 | 3.4.2 (apps/shell/package.json:26) (Evidence); 3.4.3 (apps/shell) (Markers, Build); 3.4.4 (apps/shell/src/App.tsx:18) (Observation); 3.4.4 (apps/shell/src/App.tsx:19) (Observation); 3.4.4 (apps/shell/src/App.tsx:20) (Observation); 3.4.4 (apps/shell/src/App.tsx:21) (Observation); 3.4.4 (apps/shell/src/App.tsx:22) (Observation); 3.4.4 (apps/shell/src/App.tsx:23) (Observation); 3.4.5 #1 (Configuration); 3.4.5 #2 (Configuration); 3.4.5 #3 (Configuration); 3.4.5 #4 (Configuration); 3.4.5 #5 (Configuration); 3.4.5 #6 (Configuration); 3.4.5 #7 (Configuration); 3.4.6 #1 (Where served); 3.4.6 #2 (Where served); 3.4.6 #3 (Where served); 3.4.6 #4 (Where served); 3.4.6 #5 (Where served); 3.4.6 #6 (Where served); 3.4.6 #7 (Where served); 3.4.6 #8 (Artifacts); 3.4.7 #3 (Evidence); 3.4.7 #5 (Evidence); 3.4.7 #10 (Evidence); 3.4.7 #11 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #35; configures #45; configures #46; configures #47; configures #48; configures #49; configures #50; configures #51 |
| 18 | 3.4.4 (apps/shell/src/App.tsx:18) | 3 code | source code | module-federation | architectural | strong | implements #45 |
| 19 | 3.4.4 (apps/shell/src/App.tsx:19) | 3 code | source code | module-federation | architectural | strong | implements #46 |
| 20 | 3.4.4 (apps/shell/src/App.tsx:20) | 3 code | source code | module-federation | architectural | strong | implements #47 |
| 21 | 3.4.4 (apps/shell/src/App.tsx:21) | 3 code | source code | module-federation | architectural | strong | implements #48 |
| 22 | 3.4.4 (apps/shell/src/App.tsx:22) | 3 code | source code | module-federation | architectural | strong | implements #49 |
| 23 | 3.4.4 (apps/shell/src/App.tsx:23) | 3 code | source code | module-federation | architectural | strong | implements #50 |
| 24 | 3.4.4 (apps/mfe-auth/dev-dist/sw.js:28) | 3 code | source code | — | context | weak | — |
| 25 | 3.4.4 (apps/mfe-auth/dev-dist/workbox-af90992f.js:777) | 3 code | source code | — | context | weak | — |
| 26 | 3.4.4 (apps/shell/src/App.tsx:42, outside mining) | 3 code | source code | module-federation | architectural | strong | implements #45; implements #46; implements #47; implements #48; implements #49; implements #50 |
| 27 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 28 | 3.4.3 (apps/mfe-admin) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.3 (apps/mfe-auth) | 4 structure | directory | — | architectural | moderate | — |
| 30 | 3.4.3 (apps/mfe-pet-profile) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (apps/mfe-risk-results) | 4 structure | directory | — | architectural | moderate | — |
| 32 | 3.4.3 (apps/mfe-symptom-checker) | 4 structure | directory | — | architectural | moderate | — |
| 33 | 3.4.3 (apps/mfe-vaccination) | 4 structure | directory | — | architectural | moderate | — |
| 34 | 3.4.3 (apps/mfe-vet-discovery) | 4 structure | directory | — | architectural | moderate | — |
| 35 | 3.4.3 (apps/shell) | 4 structure | directory | — | architectural | moderate | — |
| 36 | 3.4.3 (backend/services/nodejs/admin-service) | 4 structure | directory | — | context | weak | — |
| 37 | 3.4.3 (backend/services/nodejs/api-gateway) | 4 structure | directory | — | context | weak | — |
| 38 | 3.4.3 (backend/services/nodejs/auth-service) | 4 structure | directory | — | context | weak | — |
| 39 | 3.4.3 (backend/services/nodejs/clinic-service) | 4 structure | directory | — | context | weak | — |
| 40 | 3.4.3 (backend/services/nodejs/notification-service) | 4 structure | directory | — | context | weak | — |
| 41 | 3.4.3 (backend/services/nodejs/pet-service) | 4 structure | directory | — | context | weak | — |
| 42 | 3.4.3 (backend/services/nodejs/vaccination-service) | 4 structure | directory | — | context | weak | — |
| 43 | 3.4.3 (packages/shared-types) | 4 structure | directory | — | context | weak | — |
| 44 | 3.4.3 (packages/shared-utils) | 4 structure | directory | — | context | weak | — |
| 45 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #35; links #30 |
| 46 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #35; links #32 |
| 47 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #35; links #31 |
| 48 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #35; links #34 |
| 49 | 3.4.5 #5 | 5 composition | source code | module-federation | architectural | strong | links #35; links #33 |
| 50 | 3.4.5 #6 | 5 composition | source code | module-federation | architectural | strong | links #35; links #28 |
| 51 | 3.4.5 #7 | 5 composition | configuration | module-federation | architectural | moderate | links #35; links #29 |
| 52 | 3.4.6 #1 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #28 |
| 53 | 3.4.6 #2 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #29 |
| 54 | 3.4.6 #3 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #30 |
| 55 | 3.4.6 #4 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #31 |
| 56 | 3.4.6 #5 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #32 |
| 57 | 3.4.6 #6 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #33 |
| 58 | 3.4.6 #7 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #34 |
| 59 | 3.4.6 #8 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #35 |
| 60 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #28; corroborates #29; corroborates #30; corroborates #31; corroborates #32; corroborates #33; corroborates #34; corroborates #35 |
| 61 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | partially corroborates apps/mfe-auth/src/App.tsx:23-70 |
| 62 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #17 |
| 63 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | contradicts #26; contradicts apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; contradicts apps/mfe-pet-profile/src/lib/api.ts:24-51 |
| 64 | 3.4.7 #5 | 7 documentation | documentation | module-federation | technological | weak | corroborates #17; corroborates #11; corroborates #12 |
| 65 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | — |
| 66 | 3.4.7 #7 | 7 documentation | documentation | — | context | weak | corroborates apps/mfe-auth/src/lib/clinic-api.ts:1; corroborates apps/mfe-pet-profile/src/lib/api.ts:1; corroborates apps/mfe-admin/src/lib/api.ts:1 |
| 67 | 3.4.7 #8 | 7 documentation | documentation | — | context | weak | — |
| 68 | 3.4.7 #9 | 7 documentation | documentation | — | context | weak | contradicts apps/mfe-pet-profile/src/lib/api.ts:3-18; contradicts apps/mfe-admin/src/lib/api.ts:3-9 |
| 69 | 3.4.7 #10 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #45; corroborates #46; corroborates #47; corroborates #48; corroborates #49; corroborates #50 |
| 70 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #28; corroborates #29; corroborates #30; corroborates #31; corroborates #32; corroborates #33; corroborates #34; corroborates #35 |
| 71 | 3.4.7 #12 | 7 documentation | comment | — | architectural | weak | corroborates #53 |
| 72 | 3.4.7 #13 | 7 documentation | comment | — | architectural | weak | corroborates #51; corroborates #29; corroborates #53 |
| 73 | 3.4.7 #14 | 7 documentation | comment | module-federation | technological | weak | corroborates #18; corroborates #19; corroborates #20; corroborates #21; corroborates #22; corroborates #23 |
| 74 | 3.4.7 #15 | 7 documentation | documentation | — | context | weak | corroborates #27; corroborates turbo.json:5-9 |
| 75 | 3.4.7 #16 | 7 documentation | documentation | — | context | weak | corroborates apps/mfe-auth/src/lib/api-base.ts:49-59; corroborates apps/mfe-auth/src/lib/clinic-api.ts:3-14; corroborates docker-compose.yml:35-61 |
| 76 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #9; explains #74 |
| 77 | 3.4.8 #2 | 8 history | history | module-federation | architectural | weak | explains #51; explains #72 |
| 78 | 3.4.8 #3 | 8 history | history | module-federation | architectural | ambiguous | explains #61; explains #65 |
| 79 | 3.4.8 #4 | 8 history | history | module-federation | architectural | weak | explains #63 |
| 80 | 3.4.8 #5 | 8 history | history | — | context | weak | explains #67 |
| 81 | 3.4.8 #6 | 8 history | history | — | context | weak | explains #68 |

## Summary

Observations: 81. Dimensions (technology: 9, configuration: 8, code: 9, structure: 18, composition: 7, build-deploy: 8, documentation: 16, history: 6). Strength (strong: 14, moderate: 24, weak: 41, ambiguous: 2). Evidence (technological: 17, architectural: 43, context: 21).
