---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
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

# 102 — pierrekasongo/bahmni-drc

## Repository overview

A local Bahmni/OpenMRS distribution. Sole frontend unit in snapshot is AngularJS host
`openmrs-module-bahmniapps/ui` (#28). Composition is in a React bridge with Module Federation
(`openmrs-module-bahmniapps/micro-frontends`). Bridge is not a unit: its build writes inside
`ui` (#27). Consumed remote, `bahmni_ipd`, has no sources here and comes from an external image.

Architecture-supporting chain:
- **Dependency:** no row in 3.4.2. Chain starts with configuration.
- **Configuration:** host `ModuleFederationPlugin` declares remote `@openmrs-mf/ipd` → `bahmni_ipd`, with `exposes: {}`. `remoteEntry.js` URL is assembled at runtime on page origin (#1).
- **Code:** remote declaration (#16) and script injection (#2). Two `lazy(() => import(...))` calls for modules `IpdDashboard` and `CareViewDashboard` (#17, #18). Their registration as AngularJS components through `react2angular` (#19, #20). Host routes and tags mounting them in clinical, adt and bedmanagement applications (#22–#25).
- **Relationship:** active host → remote `bahmni_ipd`, with target outside snapshot (#29).

Build and deployment: host has its own Grunt build and Apache image (#32). Remote runs in another service,
recorded by observation #29 through Compose and proxy.

Misleading signals:
- **Communication:** eight `dispatchEvent` occurrences are synthetic `KeyboardEvent` calls in unit tests (#8–#15).
- **Iframes:** gallery, printing and vendored-library iframes do not load units (#4–#6). Script helper loads configuration validation file (#3).
- **Bundles:** pages loading bridge bundles are internal to host (#21).
- **Documentation:** bridge README calls local `ipd`, `next-ui` and `shared` bundles micro-frontends. Four claims are therefore contradicted (#39, #40, #42, #43). History shows text arrived with upstream copy (#51).

Registration extension point remains ambiguous: an iframe with configuration-provided `src` and a
`message` listener (#7, #26, #30, #31). No configuration declares that point. History
shows it was never declared in this repository (#50).

## Observations

### 1. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16-25, 34-67, 113-138

**Observation:** Bridge Webpack configuration defines entries `ipd`, `next-ui` and `shared`, outputting to `../ui/app/micro-frontends-dist`. `ModuleFederationPlugin` declares `name: "bahmni_mfe_host"` and remote `"@openmrs-mf/ipd": remoteProxiedAtHostDomain({ name: "bahmni_ipd", path: "ipd" })`, with `exposes: {}`. Shares `carbon-components-react`, `carbon-components`, `bahmni-carbon-ui`, `react` and `react-dom` as `singleton` and `eager`. Function `remoteProxiedAtHostDomain` assembles `/<path>/remoteEntry.js` over `window.location.href`, injects script and returns a proxy of `get`/`init` from `window['<name>']`.

**Interpretation:** Host configuration naming remote `bahmni_ipd` and resolving its address at runtime, on same page origin. Host exposes nothing.

**Note:** Section 3.4.5 #1 also cites, in Configuration column, `bahmni-proxy/resources/bahmni-proxy.conf:31-33`, `docker-compose.yml:586-593` and `.env:193`. These are publication path, service and image tag, hence deployment. They remain in observations #29 and #32 rather than here.

### 2. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:119

**Observation:** `const script = document.createElement('script')`, inside text returned by `remoteProxiedAtHostDomain` (`:113`). `src` is `/<path>/remoteEntry.js` on current origin (`:115-120`).

**Interpretation:** Remote entry bundle loading. Remote arrives through function parameters `name` and `path`, used with `bahmni_ipd` at `:38`.

### 3. openmrs-module-bahmniapps/ui/app/common/util/dynamicResourceLoader.js:6

**Observation:** Helper `includeJs` creates a `<script>` with received `src`. Sole caller assembles `<configBaseUrl>/registration/fieldValidation.js` (`openmrs-module-bahmniapps/ui/app/registration/initialization.js:29-31`).

**Interpretation:** Loads a configuration validation script of same application rather than another unit. A false positive from script-loading search.

### 4. openmrs-module-bahmniapps/ui/app/common/gallery/views/gallery.html:29

**Observation:** `<iframe ng-src="{{image.src}}" class="pdf-frame">` in image gallery `isPdf(image)` branch.

**Interpretation:** Iframe displays a patient document PDF. Not a frontend unit.

### 5. openmrs-module-bahmniapps/ui/app/common/ui-helper/printer.js:8

**Observation:** Factory `printer` creates a hidden iframe, writes locally generated HTML in it, prints and removes it (`:6-20`).

**Interpretation:** Application printing feature. Iframe does not load another unit.

### 6. openmrs-module-bahmniapps/ui/app/lib/magnific-popup/jquery.magnific-popup.js:1593

**Observation:** Iframe template of `iframe` module in magnific-popup library, vendored in `ui/app/lib`. No snapshot HTML or build references library.

**Interpretation:** Inactive third-party code. Does not participate in composition.

### 7. openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93; openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21, 35-37

**Observation:** `<iframe id="extension-popup">`, shown through `controllerScope.showExtIframe`. Controller assigns `src` at runtime from extension point `org.bahmni.registration.identifier`. No snapshot configuration declares this point.

**Interpretation:** Embedding mechanism is implemented and active. It may load an external frontend unit or merely a supporting page, and snapshot does not decide between them.

### 8. openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:63

**Observation:** `$window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape', 'metaKey': true, 'ctrlKey': false}))` in a unit test.

**Interpretation:** Test exercises controller exit shortcut. Not communication between units.

### 9. openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:69

**Observation:** Same `dispatchEvent` of `KeyboardEvent`, with `ctrlKey: true`.

**Interpretation:** Synthetic test event. Not communication between units.

### 10. openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:75

**Observation:** Same `dispatchEvent` of `KeyboardEvent`, without modifiers.

**Interpretation:** Synthetic test event. Not communication between units.

### 11. openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:82

**Observation:** Same `dispatchEvent` of `KeyboardEvent`, in case where shortcut should not act.

**Interpretation:** Synthetic test event. Not communication between units.

### 12. openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:62

**Observation:** Escape `$window.dispatchEvent(new KeyboardEvent('keydown', ...))` in bedmanagement `CareViewController` test.

**Interpretation:** Synthetic test event. Not communication between units.

### 13. openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:69

**Observation:** Same `dispatchEvent` of `KeyboardEvent`, with `ctrlKey: true`.

**Interpretation:** Synthetic test event. Not communication between units.

### 14. openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:76

**Observation:** Same `dispatchEvent` of `KeyboardEvent`, without modifiers.

**Interpretation:** Synthetic test event. Not communication between units.

### 15. openmrs-module-bahmniapps/ui/test/unit/clinical/common/controllers/visitController.spec.js:171

**Observation:** Escape `window.dispatchEvent(new KeyboardEvent('keydown', ...))` in `VisitController` test.

**Interpretation:** Synthetic test event. Not communication between units.

### 16. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38

**Observation:** `"@openmrs-mf/ipd": remoteProxiedAtHostDomain({ name: "bahmni_ipd", path: "ipd" })`, in `remotes` entry of `ModuleFederationPlugin`.

**Interpretation:** Host names remote `bahmni_ipd` and path through which it resolves it.

### 17. openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:10-15

**Observation:** `const LazyApp = lazy(() => import("@openmrs-mf/ipd/IpdDashboard"))`, rendered under `Suspense` with `hostData` and `hostApi`.

**Interpretation:** Host imports remote `IpdDashboard` module on demand through declared alias and passes data and callbacks.

### 18. openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:10-12

**Observation:** `const LazyApp = lazy(() => import("@openmrs-mf/ipd/CareViewDashboard"))`, rendered under `Suspense` with `hostData` and `hostApi`.

**Interpretation:** Host imports a second module of same remote on demand.

### 19. openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:21; openmrs-module-bahmniapps/ui/app/clinical/init.js:7-9

**Observation:** `.component("mfeIpdDashboard", react2angular(IpdDashboard), ...)` in AngularJS module `bahmni.mfe.ipd`. Clinical application includes this module.

**Interpretation:** Registers remote module `IpdDashboard` wrapper as an AngularJS component mountable in host pages.

### 20. openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:31

**Observation:** `.component("mfeIpdCareViewDashboard", react2angular(CareViewDashboard), ...)` in same module `bahmni.mfe.ipd`.

**Interpretation:** Registers wrapper of second remote exposure as AngularJS component.

### 21. openmrs-module-bahmniapps/ui/app/clinical/index.html:95

**Observation:** `<script src="../micro-frontends-dist/ipd.min.js">`, after `shared.min.js` (`:92`) and before `next-ui.min.js` (`:96`). Same loads appear in adt, bedmanagement and ot pages.

**Interpretation:** Page loads bridge bundle, part of host itself. Does not link two units.

### 22. openmrs-module-bahmniapps/ui/app/clinical/app.js:328-337

**Observation:** State `patient.dashboard.ipdVisit`, with URL `/dashboard/visit/ipd/:visitUuid?source`, uses `templateUrl` `common/views/visitIpd.html`.

**Interpretation:** Host route table links path to screen mounting remote IPD UI.

### 23. openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1

**Observation:** `<mfe-ipd-dashboard ... host-data="ipdDashboard.hostData" host-api="ipdDashboard.hostApi">`.

**Interpretation:** Host mounts component tag rendering remote `IpdDashboard`.

### 24. openmrs-module-bahmniapps/ui/app/adt/app.js:51-58

**Observation:** State `careViewDashboard`, at URL `/home/careViewDashboard`, has inline `template` with `<mfe-ipd-care-view-dashboard ... host-data="hostData" host-api="hostApi">`.

**Interpretation:** Adt application route links path to remote `CareViewDashboard` UI.

### 25. openmrs-module-bahmniapps/ui/app/bedmanagement/app.js:133-140

**Observation:** Bedmanagement state `careViewDashboard` has same `<mfe-ipd-care-view-dashboard>` tag in inline `template`.

**Interpretation:** Bedmanagement application route links path to same remote UI.

### 26. openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39-54

**Observation:** `$window.addEventListener("message", ...)`, registered when identifier popup opens. Received `patient` or `patientUuid` fills form or navigates. Handler checks neither `source` nor `origin`.

**Interpretation:** Channel through which content embedded in #7 would return data to host. Sender is not identified in snapshot.

### 27. openmrs-module-bahmniapps/micro-frontends; openmrs-module-bahmniapps/micro-frontends/package.json:57; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16-25; openmrs-module-bahmniapps/ui/app/clinical/index.html:92-96

**Observation:** Own manifest and Webpack build (`webpack --mode production`). Output goes to `../ui/app/micro-frontends-dist`, loaded by `ui` pages. Does not start its own UI.

**Interpretation:** Host React bridge, built into it rather than separate frontend unit.

### 28. openmrs-module-bahmniapps/ui; openmrs-module-bahmniapps/ui/package.json:117; openmrs-module-bahmniapps/ui/Gruntfile.js:215-229, 600-620; openmrs-module-bahmniapps/ui/app/clinical/index.html:29; openmrs-module-bahmniapps/package/docker/Dockerfile:12-13

**Observation:** AngularJS pages with own `ng-app` (for example, `consultation`), own Grunt build and `dist` output copied to Apache image.

**Interpretation:** Frontend unit with its own boundary: Bahmni host.

### 29. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40, 113-135; openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6; openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1; bahmni-proxy/resources/bahmni-proxy.conf:31-33; docker-compose.yml:586-593

**Observation:** Host loads `IpdDashboard` and `CareViewDashboard` from remote `bahmni_ipd` and mounts them in clinical, adt and bedmanagement applications. Proxy forwards `/ipd` to service `ipd`, running image `bahmni/microfrontend-ipd:${IPD_TAG}`. Local-source volume is commented out. Remote is not in snapshot.

**Interpretation:** An active host → remote relationship with external target.

### 30. openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93; openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21, 35-37

**Observation:** Host opens `src` from extension point `org.bahmni.registration.identifier` in an iframe. No snapshot file declares this point.

**Interpretation:** May be a page → embedded frontend relationship. Target may be an external unit, local page or nothing, and snapshot does not decide.

### 31. openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39

**Observation:** Host receives window `message`, without checking sender, and sends no `postMessage` to iframe.

**Interpretation:** May be event communication with content from #30. Neither sender nor direction is established.

### 32. openmrs-module-bahmniapps/ui/package.json:117; openmrs-module-bahmniapps/ui/Gruntfile.js:600-620; openmrs-module-bahmniapps/package/docker/Dockerfile:1-13; docker-compose.yml:366-377; start.sh:6-8; bahmni-proxy/resources/bahmni-proxy.conf:40-41

**Observation:** `grunt build` generates `dist`. Apache image copies `ui/dist/` to `htdocs/bahmni`. Service `bahmni-web` builds local image `bahmni-web-drc:latest` and mounts `ui/app/` through volume. Proxy publishes application at `/bahmni`. Version tag from `.env` is unused.

**Interpretation:** Own build and deployment boundaries, separate from remote IPD image, without independent versioning.

### 33. README.md:41-44

**Observation:** "Run these commands from within the `micro-frontends` sub-folder […] the `../ui/app/micro-frontends-dist` folder has the set of files which can be used by the angular modules for their build".

**Interpretation:** Describes bridge build into `ui`. Claim corroborated.

### 34. README.md:46-50

**Observation:** "Run these commands from within the `ui` sub-folder […] `yarn ci` (will internally trigger grunt) […] the `dist` folder has the set of files to be deployed in Apache (or in Vagrant)."

**Interpretation:** Describes host Grunt build and Apache deployment. Claim corroborated.

### 35. README.md:68

**Observation:** "Docker images for [Bahmniapps] is built using [Github Actions]."

**Interpretation:** Discusses image published by upstream. Snapshot has no CI workflow. Claim remains uncorroborated.

### 36. README.md:70

**Observation:** "Resources to build the following docker images can be found in the [package] directory."

**Interpretation:** Points to host image Dockerfile. Claim corroborated.

### 37. README.md:112-116

**Observation:** "Building local images […] `docker build -t bahmni-web-drc:latest -f package/docker/Dockerfile .`"

**Interpretation:** Describes local host image used by `start.sh` and Compose. Claim corroborated.

### 38. bahmni-proxy/README.md:5

**Observation:** "Proxy rules for different components of the application is configured."

**Interpretation:** Discusses proxy rules, including `/ipd`, placing remote on host origin. Claim corroborated.

### 39. openmrs-module-bahmniapps/micro-frontends/README.md:3-4

**Observation:** "a webpack build system to package the various react micro-frontends (mfe) available".

**Interpretation:** Calls build-generated bundles micro-frontends. Bundles are part of host, and sole remote does not come from this build. Claim contradicted.

### 40. openmrs-module-bahmniapps/micro-frontends/README.md:36-37

**Observation:** "shared.min.js // Contains shared JS across microfrontends. should be loaded first"; "shared.min.css // Contains shared CSS across microfrontends including the carbon stylesheet. should be loaded first".

**Interpretation:** Loading order is confirmed, but resource is shared between bundles of a single unit. Claim contradicted.

### 41. openmrs-module-bahmniapps/micro-frontends/README.md:39-40

**Observation:** "<mfe-name>.min.js // angular module containing components from a single mfe".

**Interpretation:** Describes bundle form: AngularJS module with bridge-registered components. Claim corroborated.

### 42. openmrs-module-bahmniapps/micro-frontends/README.md:45

**Observation:** "`next-ui.min.js`: A local micro-fontend containing next gen react components to be used by bahmniapps".

**Interpretation:** Calls a bundle of local components a micro-frontend, without own build, deployment or entry. Claim contradicted.

### 43. openmrs-module-bahmniapps/micro-frontends/README.md:46

**Observation:** "`ipd.min.js`: The IPD micro-frontend".

**Interpretation:** Calls host bridge to IPD a micro-frontend. IPD micro-frontend is remote from another image. Claim contradicted.

### 44. openmrs-module-bahmniapps/micro-frontends/README.md:46

**Observation:** "[`ipd.min.js`] talking to the remote IPD repository".

**Interpretation:** Claims bridge loads an IPD remote maintained elsewhere. Claim corroborated.

### 45. openmrs-module-bahmniapps/micro-frontends/package.json:4

**Observation:** `"description": "Hosting microfrontends for openmrs"`.

**Interpretation:** Assigns host role to package, which configures a container without exposures and with one remote. Claim corroborated.

### 46. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:104-105

**Observation:** "An alternative to providing build time URLs. We need to do this string promise stuff because we need to resolve the host at run-time."

**Interpretation:** Explains remote URL resolves at runtime rather than being fixed in build. Claim corroborated.

### 47. openmrs-module-bahmniapps/ui/app/adt/index.html:60

**Observation:** "Adding react since micro-frontends will be used".

**Interpretation:** Links global React loading to bridge needs, treating `react` and `react-dom` as `externals`. Claim corroborated.

### 48. openmrs-module-bahmniapps/ui/app/adt/index.html:64

**Observation:** "polyfill to add angular feature which will allow easy loading of mfe into angular component".

**Interpretation:** Describes `shared.min.js` as polyfill for `angular.module.component`, used by bridge to register remote UI. Claim corroborated.

### 49. f710945 2025-04-22 (openmrs-module-bahmniapps/ui/app/lib/magnific-popup); f3ee559 2025-04-23 (openmrs-module-bahmniapps/ui/app/admin/index.html, openmrs-module-bahmniapps/ui/app/home/index.html, openmrs-module-bahmniapps/ui/app/home/views/dashboard.html); 1ed2b99 2025-05-01 (openmrs-module-bahmniapps/ui/app/registration/views/patientcommon.html)

**Observation:** Library arrives with Bahmni tree copy and does not change through snapshot. `Gruntfile.js` also does not change, and no `ui/app` file is removed. Only four pages change after copy, and their earlier versions are unavailable.

**Interpretation:** Library is part of copied contents. Distribution neither connected nor disconnected it. Point clarified.

### 50. f710945 2025-04-22 (openmrs-module-bahmniapps/ui/app/registration, default-config/openmrs/apps/registration/extension.json); f3ee559 2025-04-23, 1ed2b99 2025-05-01, f44767d 2025-05-01 (default-config/openmrs/apps/registration/app.json)

**Observation:** Iframe, directive and controller arrive in copy and do not change. Registration `extension.json` has same object in every commit and never declares `org.bahmni.registration.identifier`. Only `app.json` changes, with messages about translations, master data and default visit.

**Interpretation:** Extension point was never declared in this history. Iframe and listener are inherited code not triggered by distribution configuration. Point clarified, but history does not exclude external configuration.

### 51. ee1e6fc 2025-04-21 (openmrs-module-bahmniapps); f710945 2025-04-22 (openmrs-module-bahmniapps/micro-frontends); d1faead 2025-06-12 (openmrs-module-bahmniapps/micro-frontends/public/i18n/locale_fr.json)

**Observation:** First commit has `openmrs-module-bahmniapps` only as gitlink. Bridge README, configuration, manifest and `src/` arrive together in next copy and do not change. Sole later commit in folder changes a translation.

**Interpretation:** Text calling bundles micro-frontends and contradicting code are from same stage. Wording arrived with upstream copy. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (openmrs-module-bahmniapps/micro-frontends, Markers, Entry and Build); 3.4.4 (openmrs-module-bahmniapps/micro-frontends/webpack.config.js:119, :38, File:line); 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6; openmrs-module-bahmniapps/ui/app/clinical/index.html:95, Observation); 3.4.5 #1 (Configuration, Code); 3.4.7 #14 (Document); 3.4.7 #1, #7, #11, #12, #13, #14, #15 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #28; configures #29 |
| 2 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/webpack.config.js:119) | 3 code | configuration | module-federation | technological | moderate | implements #29 |
| 3 | 3.4.4 (openmrs-module-bahmniapps/ui/app/common/util/dynamicResourceLoader.js:6) | 3 code | source code | — | context | weak | — |
| 4 | 3.4.4 (openmrs-module-bahmniapps/ui/app/common/gallery/views/gallery.html:29) | 3 code | source code | — | context | weak | — |
| 5 | 3.4.4 (openmrs-module-bahmniapps/ui/app/common/ui-helper/printer.js:8) | 3 code | source code | — | context | weak | — |
| 6 | 3.4.4 (openmrs-module-bahmniapps/ui/app/lib/magnific-popup/jquery.magnific-popup.js:1593) | 3 code | source code | — | context | weak | — |
| 7 | 3.4.4 (openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93) | 3 code | source code | iframe | technological | ambiguous | implements #30 |
| 8 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:63) | 3 code | source code | — | context | weak | — |
| 9 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:69) | 3 code | source code | — | context | weak | — |
| 10 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:75) | 3 code | source code | — | context | weak | — |
| 11 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:82) | 3 code | source code | — | context | weak | — |
| 12 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:62) | 3 code | source code | — | context | weak | — |
| 13 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:69) | 3 code | source code | — | context | weak | — |
| 14 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:76) | 3 code | source code | — | context | weak | — |
| 15 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/clinical/common/controllers/visitController.spec.js:171) | 3 code | source code | — | context | weak | — |
| 16 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38) | 3 code | configuration | module-federation | architectural | strong | implements #29 |
| 17 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 18 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 19 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:21) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 20 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:31) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 21 | 3.4.4 (openmrs-module-bahmniapps/ui/app/clinical/index.html:95) | 3 code | source code | — | context | weak | — |
| 22 | 3.4.4 (openmrs-module-bahmniapps/ui/app/clinical/app.js:328) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 23 | 3.4.4 (openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 24 | 3.4.4 (openmrs-module-bahmniapps/ui/app/adt/app.js:55) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 25 | 3.4.4 (openmrs-module-bahmniapps/ui/app/bedmanagement/app.js:137) | 3 code | source code | module-federation | architectural | strong | implements #29 |
| 26 | 3.4.4 (openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39) | 3 code | source code | events | technological | ambiguous | implements #31 |
| 27 | 3.4.3 (openmrs-module-bahmniapps/micro-frontends) | 4 structure | directory | — | context | weak | — |
| 28 | 3.4.3 (openmrs-module-bahmniapps/ui) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #28 |
| 30 | 3.4.5 #2 | 5 composition | source code | iframe | architectural | ambiguous | links #28 |
| 31 | 3.4.5 #3 | 5 composition | source code | events | architectural | ambiguous | links #28 |
| 32 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #28 |
| 33 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates #32 |
| 34 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #32 |
| 35 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | — |
| 36 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #32 |
| 37 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #32 |
| 38 | 3.4.7 #6 | 7 documentation | documentation | — | context | weak | corroborates #29; corroborates #32 |
| 39 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | contradicts #27; contradicts #29 |
| 40 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | contradicts #27 |
| 41 | 3.4.7 #9 | 7 documentation | documentation | — | technological | weak | corroborates #19; corroborates #20 |
| 42 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | contradicts #27 |
| 43 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | contradicts #27; contradicts #29 |
| 44 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #29; corroborates #1 |
| 45 | 3.4.7 #13 | 7 documentation | comment | — | architectural | weak | corroborates #29; corroborates #1 |
| 46 | 3.4.7 #14 | 7 documentation | comment | — | technological | weak | corroborates #2; corroborates #1; corroborates #29 |
| 47 | 3.4.7 #15 | 7 documentation | comment | — | technological | weak | corroborates openmrs-module-bahmniapps/ui/app/adt/index.html:61-62; corroborates #1 |
| 48 | 3.4.7 #16 | 7 documentation | comment | — | technological | weak | corroborates openmrs-module-bahmniapps/micro-frontends/src/shared.js:1-2; corroborates #19 |
| 49 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #6 |
| 50 | 3.4.8 #2 | 8 history | history | iframe | architectural | weak | explains #7; explains #26; explains #30; explains #31 |
| 51 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #39; explains #40; explains #42; explains #43 |

## Summary

Observations: 51. Dimensions (technology: 0, configuration: 1, code: 25, structure: 2, composition: 3, build-deploy: 1, documentation: 16, history: 3). Strength (strong: 11, moderate: 3, weak: 33, ambiguous: 4). Evidence (technological: 7, architectural: 28, context: 16).

