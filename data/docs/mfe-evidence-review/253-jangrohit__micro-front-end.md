---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
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

# 253 — jangrohit/micro-front-end

## Repository overview

Composition chain links two React applications with own entries/builds: container (#11) and marketing (#14). Host configuration names marketing and resolves remoteEntry in production/development (#1, #2); remote exposes MarketingApp (#3, #4). Container imports interface by federated name (#9), calls mount in wrapper element (#8), and target exports mounting function (#7). Active relationship #16 combines Module Federation chain. Workflows build/publish each application separately under own S3/CloudFront prefixes (#17, #18), without independent publication versioning or evidence of job execution.

Section 3.4.2 has no inspected-technology dependency rows, therefore no dimension 1 observations. This does not exclude mechanism: configurations import webpack built-in plugin (#1–#4). Local asynchronous bootstraps (#5, #6) isolated weak signals. Auth/dashboard packages without UI (#10, #13); config directories not extra applications (#12, #15).

23 documentary claims (#19–#41) describe roles/mounting contract but weak as semantic statements. Two contradicted: denial of pipelines (#40) versus workflows, and conclusion about routers nested in same React tree (#41) versus marketing’s own root. History clarifies workflows predate README (#42); second point resolved by snapshot (#43). No architectural ambiguity recorded in final inputs. No inference of successful execution, navigation synchronization or external code origin.

## Observations

### 1. packages/container/config/webpack.prod.js:3-5; packages/container/config/webpack.prod.js:19-25

**Observation:** ModuleFederationPlugin declares name `container`, remote `marketing@${domain}/marketing/latest/remoteEntry.js` and shared obtained from package dependencies; domain comes from PRODUCTION_DOMAIN.

**Interpretation:** Host declares another unit and production resolution address.

### 2. packages/container/config/webpack.dev.js:3-4; packages/container/config/webpack.dev.js:14-20

**Observation:** ModuleFederationPlugin declares name `container`, remote `marketing@http://localhost:8081/remoteEntry.js` and shared with package dependencies.

**Interpretation:** Host declares marketing as development federated target.

### 3. packages/marketing/config/webpack.prod.js:3-4; packages/marketing/config/webpack.prod.js:19-26

**Observation:** ModuleFederationPlugin declares name `marketing`, filename `remoteEntry.js`, exposes from `./MarketingApp` to `./src/bootstrap` and shared with package dependencies.

**Interpretation:** Configures federated exposure of marketing unit without naming consuming unit.

### 4. packages/marketing/config/webpack.dev.js:4-5; packages/marketing/config/webpack.dev.js:15-22

**Observation:** ModuleFederationPlugin declares name `marketing`, filename `remoteEntry.js`, exposes from `./MarketingApp` to `./src/bootstrap` and shared with package dependencies.

**Interpretation:** Configures same exposed module in development without naming consuming unit.

### 5. packages/container/src/index.js:1

**Observation:** Entry executes `import("./bootstrap")`, targeting own package.

**Interpretation:** Local asynchronous bootstrap; review records Composition No. Line alone identifies no MFE mechanism.

### 6. packages/marketing/src/index.js:1

**Observation:** Entry executes `import("./bootstrap")`, targeting own package.

**Interpretation:** Local asynchronous bootstrap; review records Composition No. Line alone identifies no MFE mechanism.

### 7. packages/marketing/src/bootstrap.js:5-7; packages/marketing/src/bootstrap.js:17

**Observation:** Defines mount(el), executing ReactDOM.render of App in supplied element, exporting mount.

**Interpretation:** Offers application mounting in consumer-supplied element; code receives element as parameter without naming host.

### 8. packages/container/src/components/MarketingApp.js:3-11

**Observation:** Wrapper imports mount from `marketing/MarketingApp`, calls `mount(ref.current)` inside useEffect and returns referenced div. Passes only element.

**Interpretation:** Wrapper mounts remote application inside host. Call uses mechanism outside route without independently establishing build/deployment boundaries.

### 9. packages/container/src/components/MarketingApp.js:3

**Observation:** Imports mount through federated specifier `marketing/MarketingApp`.

**Interpretation:** Import explicitly names remote unit consumed by container.

### 10. packages/auth; packages/auth/package.json:1-6

**Observation:** Directory contains manifest/lockfile; only script test, without UI code, entry or application build recorded in review.

**Interpretation:** Package without snapshot frontend unit despite name suggesting functional area.

### 11. packages/container; packages/container/package.json:1-7; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5; packages/container/config/webpack.common.js:19-21; packages/container/config/webpack.prod.js:6-29

**Observation:** Directory has manifest, bootstrap-loading entry, App mounting in own element, HTML template and build command with own webpack configuration.

**Interpretation:** Artifacts confirm frontend application boundary; review records Frontend unit Yes.

### 12. packages/container/config; packages/container/config/webpack.common.js:1-23; packages/container/config/webpack.dev.js:1-24; packages/container/config/webpack.prod.js:1-29

**Observation:** Directory combines common, dev and prod configurations used by container.

**Interpretation:** Container build support without constituting separate application; Frontend unit No.

### 13. packages/dashboard; packages/dashboard/package.json:1-7

**Observation:** Directory only has manifest/lockfile; start/build point to config/webpack.dev.js and config/webpack.prod.js, absent from snapshot per review.

**Interpretation:** Declared scripts without entry or existing configuration do not confirm application; Frontend unit No.

### 14. packages/marketing; packages/marketing/package.json:1-7; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:5-14; packages/marketing/config/webpack.common.js:19-21; packages/marketing/config/webpack.prod.js:6-30

**Observation:** Directory has manifest, bootstrap-loading entry, mount function, own development mounting, HTML template and build with own webpack configuration.

**Interpretation:** Confirms marketing frontend application boundary; Frontend unit Yes.

### 15. packages/marketing/config; packages/marketing/config/webpack.common.js:1-23; packages/marketing/config/webpack.dev.js:1-26; packages/marketing/config/webpack.prod.js:1-30

**Observation:** Directory combines common, dev and prod configurations used by marketing.

**Interpretation:** Marketing build support without constituting separate application; Frontend unit No.

### 16. packages/container/src/components/MarketingApp.js:3-11; packages/container/src/App.js:19; packages/container/src/bootstrap.js:5; packages/container/src/index.js:1; packages/container/config/webpack.prod.js:21-22; packages/container/config/webpack.dev.js:16-18; packages/marketing/config/webpack.prod.js:10; packages/marketing/config/webpack.prod.js:20-23; packages/marketing/config/webpack.dev.js:9; packages/marketing/config/webpack.dev.js:16-20; packages/marketing/src/bootstrap.js:5-7; packages/marketing/src/bootstrap.js:17

**Observation:** Container imports/calls mount from marketing/MarketingApp in App-rendered wrapper. Remotes resolve marketing; target declares name, exposing MarketingApp from bootstrap. Production paths match.

**Interpretation:** Active host → remote Module Federation relationship between two snapshot applications per composition review.

### 17. packages/container/package.json:3-7; packages/container/config/webpack.prod.js:6-27; .github/workflows/container.yml:8-13; .github/workflows/container.yml:30-42

**Observation:** Package executes build with own webpack configuration. Workflow uses directory/path trigger, builds/syncs dist to /container/latest S3 prefix; invalidates index.html. Manifest version 1.0.0; publication uses latest.

**Interpretation:** Separate build/deployment confirm operational unit boundary. Bucket/distribution from shared secrets; no independent versioning recorded or evidence of job execution.

### 18. packages/marketing/package.json:3-7; packages/marketing/config/webpack.prod.js:6-27; .github/workflows/marketing.yml:8-13; .github/workflows/marketing.yml:30-40

**Observation:** Package executes build with own webpack configuration. Workflow uses directory/path trigger, builds/syncs dist to /marketing/latest S3 prefix; invalidates remoteEntry.js. Manifest version 1.0.0; publication uses latest.

**Interpretation:** Separate build/deployment confirm operational unit boundary. Bucket/distribution from shared secrets; no independent versioning recorded or evidence of job execution.

### 19. README.md:3

**Observation:** README presents project as microfrontend architecture with Webpack 5 Module Federation.

**Interpretation:** Claims frontend unit organization through named mechanism.

### 20. README.md:3

**Observation:** README identifies container as host application.

**Interpretation:** Assigns container host composition role.

### 21. README.md:3

**Observation:** README claims container loads independently built marketing application at runtime.

**Interpretation:** Describes runtime link between two units with own builds.

### 22. README.md:3

**Observation:** README claims auth/dashboard exist but not connected to host as microfrontends.

**Interpretation:** Distinguishes UI-free packages from units actually participating in composition.

### 23. README.md:11

**Observation:** Diagram places header/upper layout in container.

**Interpretation:** Assigns page frame responsibility to host.

### 24. README.md:12

**Observation:** Diagram identifies marketing as remote, specifying port 8081.

**Interpretation:** Assigns marketing remote role; port only development support.

### 25. README.md:19

**Observation:** README claims container Module Federation configuration declares marketing at http://localhost:8081/remoteEntry.js.

**Interpretation:** Describes development remote unit resolution.

### 26. README.md:19

**Observation:** README claims container imports marketing/MarketingApp, calling mount with host DOM element.

**Interpretation:** Describes remote mounting contract on host page.

### 27. README.md:25

**Observation:** README claims marketing exposes ./MarketingApp from src/bootstrap.js through Module Federation, exporting mount(element) to render application.

**Interpretation:** Describes remote unit exposed interface and consumer mounting.

### 28. README.md:25

**Observation:** README claims marketing mounts itself in #_marketing-dev-root in development and can be opened alone.

**Interpretation:** Describes isolated development unit execution without demonstrating production deployment.

### 29. README.md:39

**Observation:** README claims Module Federation coordinates configured dependency sharing.

**Interpretation:** Names sharing mechanism without locating units in this phrase portion.

### 30. README.md:47

**Observation:** README table describes auth as only package metadata.

**Interpretation:** Documents package not constituting snapshot frontend unit.

### 31. README.md:48

**Observation:** README table describes dashboard as metadata with scripts pointing to absent webpack configurations.

**Interpretation:** Explains misleading scripts of application-free package.

### 32. README.md:52

**Observation:** README claims each package has own package.json/lockfile, no root install script.

**Interpretation:** Describes package organization/boundaries; structure review records no workspace.

### 33. README.md:72

**Observation:** README instructs building each publishable application from own package directory.

**Interpretation:** Claims separation of two application builds.

### 34. README.md:82

**Observation:** README claims marketing build emits remoteEntry.js required by host to locate/load exposed module.

**Interpretation:** Relates remote-produced artifact to host consumption.

### 35. README.md:86

**Observation:** README claims each application has own common/dev/prod webpack configurations in config/.

**Interpretation:** Describes per-application build configuration separation.

### 36. README.md:89

**Observation:** README claims webpack.dev.js configures local server and Module Federation URLs.

**Interpretation:** Describes configuration enabling development remote resolution.

### 37. README.md:90

**Observation:** README claims webpack.prod.js enables production output, defining publication paths.

**Interpretation:** Describes per-unit output paths confirmed by build/deployment artifacts.

### 38. README.md:98-101

**Observation:** README claims container uses PRODUCTION_DOMAIN to locate marketing at ${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js.

**Interpretation:** Describes production remote resolution; concrete domain outside snapshot.

### 39. README.md:104

**Observation:** README instructs publishing marketing assets including remoteEntry.js at configured path and container at own path.

**Interpretation:** Claims publication of two units at own targets.

### 40. README.md:104

**Observation:** README claims repository includes no artifact-publication pipeline.

**Interpretation:** Architectural claim contradicted by both application publication workflows per documentation review.

### 41. README.md:108

**Observation:** README claims container/marketing BrowserRouters nested in composed application because host mounts marketing inside own router.

**Interpretation:** Conclusion about nesting in same React tree contradicted by marketing mounting in own React root. Effect of both on browser history not verified.

### 42. 5d05e98 2026-09-27 (.github/workflows/container.yml); e002f80 2026-09-27 (.github/workflows/marketing.yml; .github/workflows/container.yml); c6c0dbc 2026-09-27 (README.md:104)

**Observation:** History review records container workflow addition in 5d05e98 and marketing in e002f80. Both files read in e002f80 already contain build, S3 sync and CloudFront invalidation. README added only afterward in c6c0dbc.

**Interpretation:** Clarified result: pipeline denial does not correspond to stage before workflows. Chronology demonstrates neither execution, abandonment nor reason for claim.

### 43. packages/container/src/App.js:17-20; packages/marketing/src/App.js:14-19; packages/marketing/src/bootstrap.js:5-7; README.md:108

**Observation:** Historical point resolved by snapshot: wrapper inside host BrowserRouter, but marketing mount executes ReactDOM.render in own root. No specific history query for point.

**Interpretation:** DOM-tree/React-tree distinction explains documentary contradiction without requiring different code stages; browser history effect remains unverified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/container, Build; packages/container/config, Markers); 3.4.4 src-mount-call (Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts), #2 (Where served); 3.4.7 #1, #2, #4, #11, #16, #20 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #11; configures #8; configures #9; configures #16 |
| 2 | 3.4.3 (packages/container/config, Markers); 3.4.5 #1 (Configuration); 3.4.7 #4, #7, #11, #18 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #11; configures #8; configures #9; configures #16 |
| 3 | 3.4.3 (packages/marketing, Build; packages/marketing/config, Markers); 3.4.4 src-mount-export (Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #6, #9, #11, #16 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #7; configures #14; configures #16 |
| 4 | 3.4.3 (packages/marketing/config, Markers); 3.4.4 src-mount-export (Observation); 3.4.5 #1 (Configuration); 3.4.7 #7, #11, #18 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #7; configures #14; configures #16 |
| 5 | 3.4.4 src-async-bootstrap (packages/container/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 6 | 3.4.4 src-async-bootstrap (packages/marketing/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 7 | 3.4.4 src-mount-export | 3 code | source code | module-federation | technological | moderate | implements #16 |
| 8 | 3.4.4 src-mount-call | 3 code | source code | module-federation | architectural | moderate | implements #16 |
| 9 | 3.4.4 src-mount-import | 3 code | source code | module-federation | architectural | strong | implements #16 |
| 10 | 3.4.3 (packages/auth) | 4 structure | directory | — | context | weak | — |
| 11 | 3.4.3 (packages/container) | 4 structure | directory | — | architectural | moderate | — |
| 12 | 3.4.3 (packages/container/config) | 4 structure | directory | — | context | weak | — |
| 13 | 3.4.3 (packages/dashboard) | 4 structure | directory | — | context | weak | — |
| 14 | 3.4.3 (packages/marketing) | 4 structure | directory | — | architectural | moderate | — |
| 15 | 3.4.3 (packages/marketing/config) | 4 structure | directory | — | context | weak | — |
| 16 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #11; links #14 |
| 17 | 3.4.6 #1 | 6 build-deploy | CI | — | architectural | moderate | publishes #11 |
| 18 | 3.4.6 #2 | 6 build-deploy | CI | — | architectural | moderate | publishes #14 |
| 19 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #11; corroborates #14; corroborates #16 |
| 20 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #16 |
| 21 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #8; corroborates #16; corroborates #18 |
| 22 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #10; corroborates #13; corroborates #1; corroborates #2 |
| 23 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates packages/container/src/App.js:3,18; corroborates packages/container/src/components/Header.js:57-98 |
| 24 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #3; corroborates #16 |
| 25 | 3.4.7 #7 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #2; corroborates #4; corroborates #16 |
| 26 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #8; corroborates #9 |
| 27 | 3.4.7 #9 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #3; corroborates #7 |
| 28 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates packages/marketing/src/bootstrap.js:9-13; corroborates packages/marketing/public/index.html:9 |
| 29 | 3.4.7 #11 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4 |
| 30 | 3.4.7 #12 | 7 documentation | documentation | — | context | weak | corroborates #10 |
| 31 | 3.4.7 #13 | 7 documentation | documentation | — | context | weak | corroborates #13 |
| 32 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates packages/container/package.json:1; corroborates packages/marketing/package.json:1; corroborates packages/auth/package.json:1; corroborates packages/dashboard/package.json:1 |
| 33 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates #18 |
| 34 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #3; corroborates #1; corroborates #18 |
| 35 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #15 |
| 36 | 3.4.7 #18 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #2; corroborates #4 |
| 37 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates #18 |
| 38 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #16 |
| 39 | 3.4.7 #21 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates #18 |
| 40 | 3.4.7 #22 | 7 documentation | documentation | — | architectural | weak | contradicts #17; contradicts #18 |
| 41 | 3.4.7 #23 | 7 documentation | documentation | — | architectural | weak | contradicts packages/marketing/src/bootstrap.js:5-7 |
| 42 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #17; explains #18; explains #40 |
| 43 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #41 |

## Summary

Observations: 43. Dimensions (technology: 0, configuration: 4, code: 5, structure: 6, composition: 1, build-deploy: 2, documentation: 23, history: 2). Strength (strong: 4, moderate: 8, weak: 31, ambiguous: 0). Evidence (technological: 6, architectural: 31, context: 6).

