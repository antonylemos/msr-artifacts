---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
url: https://github.com/pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [angularjs, react]
build_tools: [webpack]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 102 — pierrekasongo/bahmni-drc

## Context

Local Bahmni/OpenMRS distribution/customization, with Bahmni host sources, clinical configurations, translations and Docker services. The host includes AngularJS and a React bridge loading an external IPD remote through Module Federation. This is not merely an MFE mention: configuration, imports, component registration, clinical template and proxy forwarding exist.

The open decision is application of the platform plugin rule. Bahmni/OpenMRS is a third-party product; manifests and READMEs identify upstream. On the other hand, the candidate includes the complete host, configures a local image/volumes and delivers a distribution, not merely a unit for installation in another party’s host. Neither copying/customizing the host making it an authored application nor every platform distribution automatically being a plugin is assumed. Q5 remains under review to resolve this boundary with 037/051 and OpenMRS comparator 074.

The clone is `pierrekasongo__bahmni-drc`; SHA according to `data/samples/mfe-sample-001/clones.csv:103`. Complete inventory through `git ls-tree -r` at the SHA: **4.537 entries**, comprising **4.535 regular files** (4.470 mode `100644`, 65 mode `100755`), **2 symlinks** and **0 gitlinks**. Links are `openmrs-module-bahmniapps/ui/app/app`, whose blob points to `/bahmni/openmrs-module-bahmniapps/ui/app/`, and `openmrs-module-bahmniapps/ui/app/components`, pointing to `../node_modules/@bower_components`. They were read as blobs without following them; they are not additional applications. There is no versioned `node_modules/` or submodules.

Subtrees are `openmrs-module-bahmniapps` (2.854 entries), `bahmni-core` (1.067), `default-config` (337), `bahmni-java-utils` (149), `openmrs-db` (101), `bahmni-proxy` (17) and 12 root files. There are third-party dependencies/artifacts in `ui/dist/components`, compiled code and Yarn/PnP metadata; they were not counted as own units. No PnP file was executed.

`frontend_units: 2` records the distribution’s **locally repackaged host** and the **explicitly referenced, separately deployed IPD remote**. It does not count each AngularJS application/page, React component, `ipd`/`next-ui`/`shared` bundle, backend or copied upstream source as an additional unit. The remote has no own sources in this clone, but counts through an explicit composition reference; `unit_organization: multi-repo` describes this relationship, not Java modules. Acceptance of these targets in the phenomenon, given the third-party platform, remains open in Q5.

## Sample provenance

- `data/samples/mfe-sample-001/sample.csv:103`: rank 102, id 970061359, `strategies: terminology;technology`, eligibility `pass`. The manifest points to round `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:13210` and `data/discovery/mfe-round-002/candidates.csv:13215`: null description, empty topics, JavaScript language, null license, default branch `master`, creation on 2025-04-21, last push on 2025-06-19 and same sample strategies. These data do not confirm architecture.
- `sqlite3 -readonly` query against both `discovery.sqlite` databases, joining `hits` and `queries` through `query_id` and filtering `hits.repository_id = 970061359`: both rounds have endpoint `repositories` hits for `terminology-micro-frontend-repositories` and `terminology-micro-frontends-repositories`, queries `"micro frontend" in:name,description,readme` and `"micro frontends" in:name,description,readme`, without a located path.
- **Field elimination:** the name lacks the expressions; recorded description/topics are empty. Root README contains micro-frontend and build references (`README.md:40–44`), making it the observed compatible thematic field. Neither an unreported indexed line/version is attributed to the database nor the name used as architectural evidence.
- Each round also has a code hit for query `technology-module-federation-plugin-js-code`, text `ModuleFederationPlugin remotes extension:js`, path `openmrs-module-bahmniapps/micro-frontends/webpack.config.js`. This file’s configuration was read and connected to consumers, not counted alone.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation / Platform provenance | `README.md:3–15` references Bahmni upstream and describes AngularJS/React frontend. The UI manifest points to repository `Bahmni/openmrs-module-bahmniapps` and author Bahmni (`openmrs-module-bahmniapps/ui/package.json:129–140`); the React host also has Bahmni authorship (`openmrs-module-bahmniapps/micro-frontends/package.json:2–7`). This prevents assuming architectural authorship by this clone’s owner. | context |
| Configuration (federation host) | `openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16–24` defines ipd, next-ui and shared entries and output in the UI tree. `:34–40` instantiates ModuleFederationPlugin with `@openmrs-mf/ipd`, expected container `bahmni_ipd`, path `ipd` and `exposes: {}`. The host is not a remote exposed to another host. | strong |
| Configuration (URL and protocol) | `openmrs-module-bahmniapps/micro-frontends/webpack.config.js:113–138` builds a current-origin URL at `/ipd/remoteEntry.js`, injects script and returns a proxy for methods `get` and `init` of `window.bahmni_ipd`. This is runtime composition; local bridge bundles do not make this external load merely build-time composition. | strong |
| Configuration (static resolution) | Config requires (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:1–6`) match declared Webpack, MiniCssExtractPlugin and CopyWebpackPlugin (`openmrs-module-bahmniapps/micro-frontends/package.json:18`, `:27–33`). The lock resolves Webpack **5.99.5** for range `^5.86.0` (`openmrs-module-bahmniapps/micro-frontends/yarn.lock:16928–16930`), MiniCssExtractPlugin 2.9.2 (`:11878–11880`) and CopyWebpackPlugin 11.0.0 (`:6497–6499`). Webpack 4 also present in the lock is another entry, not resolution of the project’s range. | moderate |
| Configuration / Technology (bridge) | Babel/presets and loaders used in config are declared (`openmrs-module-bahmniapps/micro-frontends/package.json:9–16`, `:19–33`); Babel uses env/react presets and transform-runtime (`openmrs-module-bahmniapps/micro-frontends/.babelrc:1–11`). react2angular is declared (`openmrs-module-bahmniapps/micro-frontends/package.json:47–50`) and resolved in lock (`openmrs-module-bahmniapps/micro-frontends/yarn.lock:13974–13976`). Build calls Webpack (`openmrs-module-bahmniapps/micro-frontends/package.json:56–58`), not a CLI encapsulating the bundler. These are coherent static references; successful installation is not asserted. | moderate |
| Source code (remote consumption) | `openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:5–15` lazily imports `@openmrs-mf/ipd/IpdDashboard` and renders under Suspense with `hostData`/`hostApi`. `openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:5–14` consumes `@openmrs-mf/ipd/CareViewDashboard` from the same container. These are two expected exposures of one remote, not two separately counted units. | strong |
| Source code (bridge and contract) | `openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:4–24` imports wrappers and registers `mfeIpdDashboard` in `bahmni.mfe.ipd` with react2angular; `:29–34` does the same for CareView. Expected props and callbacks are in `openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:20–28` and `openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:17–25`. A UI contract exists, not merely shared data or text. | strong |
| Composition (entry and clinical screen) | The clinical page has `ng-app="consultation"` (`openmrs-module-bahmniapps/ui/app/clinical/index.html:29`), loads React/ReactDOM and local bundles (`:83–96`). `consultation` depends on `bahmni.clinical` (`openmrs-module-bahmniapps/ui/app/clinical/app.js:3`), which depends on `bahmni.mfe.ipd` (`openmrs-module-bahmniapps/ui/app/clinical/init.js:7–9`). The IPD route uses `visitIpd.html` (`openmrs-module-bahmniapps/ui/app/clinical/app.js:328–337`), and that template mounts the tag with host-data/host-api (`openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1`). | strong |
| Build/deploy (separate units) | `docker-compose.yml:366–377` configures local image `bahmni-web-drc`, Bahmni tree build and UI volume. The local path is defined in `.env:110`. IPD has separate external service/image (`docker-compose.yml:586–593`), with tag 1.0.0 (`.env:193`). Proxy forwards `/ipd` to service ipd (`bahmni-proxy/resources/bahmni-proxy.conf:31–33`), and Dockerfile includes this configuration (`bahmni-proxy/Dockerfile:7–8`). This corroborates separate deployment and connection of the remote URL to host origin. | strong |
| Build/deploy (local artifacts) | `openmrs-module-bahmniapps/package/docker/Dockerfile:1–13` delivers `ui/dist` through Apache; Compose also provides for a `ui/app` volume (`docker-compose.yml:375–377`). README explains the React build followed by the UI Grunt build (`README.md:38–50`). Names ipd/next-ui/shared are entries in the same config/build, not proof of three independent units. | context |
| Source code (local components) | `openmrs-module-bahmniapps/micro-frontends/src/next-ui/index.js:1–39` imports local containers and registers components through the bridge; it does not use remote import. The IPD wrapper imports Loader from this local code (`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:3`). Therefore independence between next-ui and IPD bridge is not attributed, nor count multiplied by bundle. | context |
| Architecture documentation | `openmrs-module-bahmniapps/micro-frontends/README.md:3–8` describes the build and references architecture/guide in the Bahmni wiki, not accessed. `:27–46` describes output and distinguishes local next-ui from remote IPD. No distribution-specific ADR was found in the inventory. Text corroborates the read chain; it does not replace consumer inspection. | context |
| Structure / Configuration (limitations and negative searches) | Inventory searched for IPD producer files, additional federation configurations, IPD exposures, additional authored-target manifests and gitlinks: only the cited host config, with `exposes: {}`; producer comes from the external image. There are no `bahmni_ipd` sources/config or `exposes` for `./IpdDashboard`/`./CareViewDashboard` to check in this clone. Expected imports are observable, but internal image 1.0.0 compatibility was not inspected. Third-party compiled artifacts and symlinks add no units. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Local host and IPD remote explicitly configured (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34–40`, `docker-compose.yml:586–593`). These are the two technical targets observed; acceptance in authored-application scope remains in Q5. |
| Q2 | Yes | Local host has its own build, including Webpack bridge (`openmrs-module-bahmniapps/micro-frontends/package.json:56–58`), while remote is delivered through separate service/image (`docker-compose.yml:586–593`). The host uses federated imports (`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6`), not remote sources. Independence between local bundles of the same bridge is not asserted. |
| Q3 | Yes | The host clinical screen mounts the IPD wrapper (`openmrs-module-bahmniapps/ui/app/clinical/app.js:328–337`, `openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1`), which renders remote UI with host data/API (`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:5–15`). |
| Q4 | Yes | Config and consumer connect through alias/container/URL; loader uses init/get (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:113–138`), proxy forwards the URL (`bahmni-proxy/resources/bahmni-proxy.conf:31–33`) and wrappers consume modules in the screen. This answer records implemented integration on the observable side, as in host-with-external-remotes cases; it presumes neither execution nor inspection of internal image exposures. |
| Q5 | Yes | The candidate delivers configured Bahmni host, remote-consuming bridge, clinical route, proxy and distribution services. Upstream origin does not erase concrete composition implementation present in the snapshot. |

## Rationale

- The `MFE-implemented` rule applies: Q1–Q5 are Yes after joint review.
- It is neither MFE-unit nor an isolated plugin: the snapshot delivers complete host, its composition configuration, consumer route, proxy and distribution remote service.
- Each upstream source, AngularJS page or packaged component was not classified as an own unit. The two-target count represents the host configured/repackaged by the distribution and the explicitly referenced remote, without counting vendored dependencies. Original architecture authorship by the repository owner is not asserted.
- This is not reduced to generic code sharing in 089: the remote element is a clinical dashboard interface with integration data/callbacks. The open question is the third-party platform, not minimum UI size, links/iframe or build-time-only composition.

## Analysis notes

- **RQ1:** the same candidate appears in both rounds through README terminology and federation configuration code. Technical confirmation required following config → React imports → AngularJS registration → template/route → proxy/service. This alone does not decide phenomenon inclusion under the platform criterion.
- **RQ2:** Module Federation with Promise-based remote and origin-relative URL; react2angular integrates the consumer into the AngularJS host. `build_tools: [webpack]` follows from explicit config and lock; Grunt/Maven/Docker are not recorded as bundlers. `ui_technologies: [angularjs, react]` describes observed host code, not technology inferred from the external image. The angularjs slug already appears in case 055.
- **Protocol (comparator 074):** LIME-EMR also distributes third-party OpenMRS, but contains module/import-map configuration and assembly scripts without the local loader. Here there are bridge and federated-loader sources, consumer page and separate IPD service; therefore Q2/Q4 have more direct evidence. Neither import-maps, single-spa nor the 42 modules of 074 are attributed to this candidate. Platform status must be compared between both cases without automatically transferring class or unit count.
- **Protocol (families):** searches in annotations for `pierrekasongo` and `bahmni-drc` found no sibling. Bahmni upstream relationship is declared in manifests/README and observed in prefixes; relationship with 074 concerns the OpenMRS ecosystem, not demonstrated duplication or common template. No upstream was accessed.
- **History:** non-shallow clone; **42 reachable commits**, **0 merges**, **1 root commit**, `ee1e6fcc03d5a2cda53470bb5ae610b80a44f2ea` (2025-04-21, “First commit”), counted through `git rev-list --count`, `--count --merges` and `--max-parents=0`. Log metadata records subfolder addition in `f710945`, Compose build in `5cd61e6`, dist in `f445aea`, micro-frontend translations in `d1faead` and location fixes at the evaluated SHA (2025-06-19). These subjects contextualize customization/packaging; no old-version content was inferred or historical blob requested.
- **Protocol (branches):** `master`, `origin/master` and `origin/HEAD` point to the pinned SHA; `origin/santu-branche` points to `d040cbf2f65d20120c713e1fea6931b0c4bc7b75`. References recorded without inspecting another branch to complete the snapshot.
- **Protocol (limitations):** all clone Git commands executed with `GIT_NO_LAZY_FETCH=1`; only pinned-SHA blobs and history metadata read. No network, submodule, installed dependencies, PnP, build, container or application executed. Wiki, Docker image and package references were not consulted outside the clone. Static configuration does not prove clinical execution or successful deployment.

## Recorded decision

Promote to **MFE-implemented**. The snapshot delivers complete Bahmni host, Module Federation configuration and loader, wrappers inserted in the clinical route, proxy and separate remote service. Platform upstream origin does not erase MFE composition concretely implemented and delivered by the distribution.
