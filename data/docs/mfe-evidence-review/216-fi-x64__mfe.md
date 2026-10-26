---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
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

# 216 — fi-x64/mfe

## Repository overview

Snapshot contains two React frontend units: `packages/container` and `packages/marketing`, with own entries/builds (#11, #14). Container configurations declare marketing as Module Federation remote in development and production (#1, #2); marketing configurations expose bootstrap as `./MarketingApp`, sharing package dependencies (#3, #4). Bootstrap exports `mount(el)` (#7), imported and called by container wrapper (#8, #9). Chain realizes active host → remote relationship (#16), without props or callbacks passed to remote in observed call.

Own builds/workflows publish separate artifacts under S3 prefixes `container/latest` and `marketing/latest`, with CloudFront invalidations (#17, #18). Fixed paths record no independent versions. Production domain comes from secret whose value absent from snapshot; this does not prevent resolving target unit through federated name, exposed module and publication path (#2, #4, #16, #18).

Local asynchronous bootstraps alone do not compose units (#5, #6). `auth` and `dashboard` contain only manifest/lockfile without entry/build (#10, #13); `config` directories belong to two applications without constituting additional units (#12, #15). Comments describe isolated development execution and export to container, both corroborated (#19, #20). Section 3.4.2 has no dependency rows for inspected technologies; 3.4.8 has no points: these dimensions yield no observations. No architectural ambiguity recorded in final inputs.

## Observations

### 1. packages/container/config/webpack.dev.js:16-22

**Observation:** `ModuleFederationPlugin` uses `name: "container"`, declaring `marketing` at `marketing@http://localhost:8081/remoteEntry.js` and setting `shared: packageJson.dependencies`.

**Interpretation:** Development configuration links container host to marketing remote through Module Federation.

### 2. packages/container/config/webpack.prod.js:6; packages/container/config/webpack.prod.js:15-21

**Observation:** Plugin names `container`, declares remote `marketing` as `marketing@${domain}/marketing/latest/remoteEntry.js` and shares `packageJson.dependencies`. `domain` comes from `process.env.PRODUCTION_DOMAIN`.

**Interpretation:** Production configuration links host to marketing through remote address parameterized by environment domain.

### 3. packages/marketing/config/webpack.dev.js:16-23

**Observation:** Plugin names `marketing`, generates `remoteEntry.js`, exposes `./MarketingApp` pointing to `./src/bootstrap` and sets `shared: packageJson.dependencies`.

**Interpretation:** Federation mechanism configured in marketing to provide bootstrap without naming consumer in this block.

### 4. packages/marketing/config/webpack.prod.js:13-20

**Observation:** Production configuration declares `name: "marketing"`, `filename: "remoteEntry.js"`, exposure of `./MarketingApp` from `./src/bootstrap` and sharing of `packageJson.dependencies`.

**Interpretation:** Marketing offers bootstrap as production federated module; block configures one unit without declaring another consuming unit.

### 5. packages/container/src/index.js:1; packages/container/src/bootstrap.js:1-5

**Observation:** Entry executes `import('./bootstrap')`; local bootstrap imports container App, rendering in `#root`.

**Interpretation:** Local asynchronous loading is isolated technological signal, establishing no inter-unit link or MFE mechanism by itself.

### 6. packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:1-22

**Observation:** Entry executes `import('./bootstrap')`, pointing to marketing’s own bootstrap.

**Interpretation:** Asynchronous loading remains internal to unit; alone establishes neither composition nor MFE technology.

### 7. packages/marketing/src/bootstrap.js:6-8; packages/marketing/src/bootstrap.js:22

**Observation:** `mount(el)` calls `ReactDOM.render(<App />, el)` and is exported by bootstrap.

**Interpretation:** Function offers application mounting in supplied element. Construct prepares integration but names no consumer or inter-unit organization by itself.

### 8. packages/container/src/components/MarketingApp.js:1-11

**Observation:** Wrapper imports `mount` from `marketing/MarketingApp`, creates `ref`, calls `mount(ref.current)` in `useEffect` and returns associated `div`. Call passes no further argument.

**Interpretation:** Container uses remote mounting mechanism in own element. Call is neither route nor registration naming target; participates in relationship whose federated resolution appears in configurations.

### 9. packages/container/src/components/MarketingApp.js:1; packages/container/src/components/MarketingApp.js:8

**Observation:** Code imports symbol `mount` from `marketing/MarketingApp`, using it in `mount(ref.current)`.

**Interpretation:** Import consumes federated module, preparing mounting implementing relationship without itself constituting route or application registration.

### 10. packages/auth; packages/auth/package.json:1-29

**Observation:** Directory contains manifest/lockfile. Manifest names `auth`, declaring only default `test` script at lines 4-6; review records no entry/build.

**Interpretation:** Package does not constitute implemented frontend unit in snapshot. Name/dependencies provide context insufficient to count another application.

### 11. packages/container; packages/container/package.json:4-7; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5; packages/container/config/webpack.common.js:19-23; packages/container/config/webpack.dev.js:7-29; packages/container/config/webpack.prod.js:8-25

**Observation:** Container has entry loading bootstrap, React mounting in `#root`, HTML template and `start` and `build` scripts selecting own webpack configurations.

**Interpretation:** Own entry/build confirm frontend unit boundary. Boundary alone does not link application to another unit.

### 12. packages/container/config; packages/container/config/webpack.common.js:1-24; packages/container/config/webpack.dev.js:1-29; packages/container/config/webpack.prod.js:1-25

**Observation:** Directory combines common, development and production configurations used by container build; no own entry/build of another application in structure table.

**Interpretation:** Internal container build organization without additional frontend unit.

### 13. packages/dashboard; packages/dashboard/package.json:1-33

**Observation:** Directory contains manifest/lockfile. Manifest names `dashboard`, with only default `test` script at lines 4-6; review records no entry/build.

**Interpretation:** Package does not confirm another frontend unit; dependency declarations do not demonstrate implemented application.

### 14. packages/marketing; packages/marketing/package.json:4-7; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:12-17; packages/marketing/config/webpack.dev.js:7-30; packages/marketing/config/webpack.prod.js:6-24

**Observation:** Marketing has entry loading bootstrap, isolated development mounting in `#_marketing-dev-root`, HTML template in development configuration and own scripts for development/production webpack configurations.

**Interpretation:** Entry/build confirm second frontend unit. Recorded isolated execution is in development.

### 15. packages/marketing/config; packages/marketing/config/webpack.common.js:1-17; packages/marketing/config/webpack.dev.js:1-30; packages/marketing/config/webpack.prod.js:1-24

**Observation:** Directory combines webpack configurations used by marketing; no own entry/build of another application in structure review.

**Interpretation:** Internal marketing unit directory without constituting third application.

### 16. packages/container/src/components/MarketingApp.js:1-11; packages/container/src/App.js:10-11; packages/container/config/webpack.dev.js:18-20; packages/container/config/webpack.prod.js:17-19; packages/marketing/config/webpack.dev.js:17-21; packages/marketing/config/webpack.prod.js:14-18; packages/marketing/src/bootstrap.js:6-8; packages/marketing/src/bootstrap.js:22

**Observation:** Container declares remote `marketing`, imports `marketing/MarketingApp` and calls its `mount` function in wrapper rendered by App. Marketing declares this name, exposing `./MarketingApp` pointing to bootstrap exporting `mount`.

**Interpretation:** Active host → remote Module Federation relationship between two units present in snapshot. Match between declaration, exposure and consumption resolves marketing target.

### 17. packages/container/package.json:3-7; packages/container/config/webpack.prod.js:6-25; packages/container/config/webpack.common.js:19-23; .github/workflows/container.yml:1-35

**Observation:** Build script selects container production configuration, whose `publicPath` is `/container/latest/`; common configuration generates `index.html`. Workflow reacts to changes in `packages/container/**`, installing/building in directory, receiving `PRODUCTION_DOMAIN` through secret, syncing `dist` to `container/latest` in S3 and invalidating `/container/latest/index.html` in CloudFront. Manifest version `1.0.0` absent from target.

**Interpretation:** Container has separate build/deployment, delimiting publication artifact. Fixed path implements no independent versioning; remote address parameterized at build time.

### 18. packages/marketing/package.json:3-7; packages/marketing/config/webpack.prod.js:6-24; packages/container/config/webpack.prod.js:18; .github/workflows/marketing.yml:1-33

**Observation:** Build script selects marketing production configuration, with `publicPath: "/marketing/latest/"` and `remoteEntry.js` generation. Workflow reacts to changes in `packages/marketing/**`, installing/building in directory, syncing `dist` to `marketing/latest` in S3 and invalidating `/marketing/latest/remoteEntry.js` in CloudFront. Container uses this remote path; manifest version `1.0.0` absent from publication.

**Interpretation:** Marketing has build/deployment separate from container, published as production remote. Prefix `latest` allows artifact replacement without independent versioning in path.

### 19. packages/marketing/src/bootstrap.js:10-11

**Observation:** Comment states that in development and isolation application should call `mount` immediately.

**Interpretation:** Claim describes marketing’s isolated development execution capability, corroborated by unit entry and local mounting branch. Semantic independence evidence without configuring or performing composition itself.

### 20. packages/marketing/src/bootstrap.js:20-21

**Observation:** Comment states application running through container should export function `mount`.

**Interpretation:** Text describes marketing role as container-mounted application, corroborated by export, exposure and consumption. Claim alone does not implement relationship.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.4 (src-mount-call, Observation); 3.4.5 #1 (Configuration) | 2 configuration | configuration | module-federation | architectural | strong | configures #8; configures #9; configures #11; configures #16 |
| 2 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Markers); 3.4.4 (src-mount-call, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.6 #2 (Where served) | 2 configuration | configuration | module-federation | architectural | strong | configures #8; configures #9; configures #11; configures #16 |
| 3 | 3.4.3 (packages/marketing, Entry and Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (src-mount-export, Observation); 3.4.5 #1 (Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #7; configures #14; configures #16 |
| 4 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Markers); 3.4.4 (src-mount-export, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts and Where served); 3.4.7 #2 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #7; configures #14; configures #16 |
| 5 | 3.4.4 (src-async-bootstrap, packages/container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 6 | 3.4.4 (src-async-bootstrap, packages/marketing/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 7 | 3.4.4 (src-mount-export, packages/marketing/src/bootstrap.js:22) | 3 code | source code | — | technological | moderate | implements #16 |
| 8 | 3.4.4 (src-mount-call, packages/container/src/components/MarketingApp.js:8) | 3 code | source code | module-federation | architectural | moderate | implements #16 |
| 9 | 3.4.4 (src-mount-import, packages/container/src/components/MarketingApp.js:1) | 3 code | source code | module-federation | architectural | moderate | implements #16 |
| 10 | 3.4.3 (packages/auth) | 4 structure | directory | — | context | weak | — |
| 11 | 3.4.3 (packages/container) | 4 structure | directory | — | architectural | moderate | — |
| 12 | 3.4.3 (packages/container/config) | 4 structure | directory | — | context | weak | — |
| 13 | 3.4.3 (packages/dashboard) | 4 structure | directory | — | context | weak | — |
| 14 | 3.4.3 (packages/marketing) | 4 structure | directory | — | architectural | moderate | — |
| 15 | 3.4.3 (packages/marketing/config) | 4 structure | directory | — | context | weak | — |
| 16 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #11; links #14 |
| 17 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #11 |
| 18 | 3.4.6 #2 | 6 build-deploy | CI | module-federation | architectural | moderate | publishes #14 |
| 19 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #14; corroborates packages/marketing/src/bootstrap.js:12-17; corroborates packages/marketing/public/index.html:5 |
| 20 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | corroborates #7; corroborates #4; corroborates #9; corroborates #8; corroborates #16 |

## Summary

Observations: 20. Dimensions (technology: 0, configuration: 4, code: 5, structure: 6, composition: 1, build-deploy: 2, documentation: 2, history: 0). Strength (strong: 3, moderate: 9, weak: 8, ambiguous: 0). Evidence (technological: 5, architectural: 11, context: 4).

