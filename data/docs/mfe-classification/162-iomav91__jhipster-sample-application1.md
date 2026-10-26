---
schema: 1
id: 1031805791
full_name: iomav91/jhipster-sample-application1
url: https://github.com/iomav91/jhipster-sample-application1
commit: ef5d7021b37ad287ffef2d8664fbc140b2c5499e
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 162 — iomav91/jhipster-sample-application1

## Context

JHipster 8.11.0 `microservice` application (Spring Boot + Maven, with Consul), generated with an Angular client configured as a microfrontend. The frontend is a Module Federation remote exposing modules to a JHipster gateway (`.yo-rc.json:3`, `9`, `21`; `webpack/webpack.microfrontend.js:24–52`; `README.md:5`, `102–130`). The gateway is not in the repository. The repository is generator output in a single “JHipster Bot” commit, without entities (`.yo-rc.json:17`), and exposed route and navbar modules are empty. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:163` records rank 162, ID 1031805791, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:163` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:17269` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:17273` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-08` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:50:52.808Z / 2026-10-08T15:39:00.430Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:08:46.359Z / 2026-10-08T15:47:49.789Z |

Effective queries append `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Hit metadata:
- null description, no topics, language Java, `fork: false`, size 461;
- created at 2025-08-04T11:05:41Z, pushed at 2025-08-04T11:06:15Z.

Without a description, the hit comes from the README:
- “Microfrontend”: `README.md:102` (“### Developing Microfrontend”);
- “microfrontends”: `README.md:104`;
- “microfrontend”: `README.md:116`, `120`, `125`, `128`.

The README comes from the only commit, the SHA (2025-08-04), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 315 entries, 312 regular `100644` files and 3 executables `100755` (`.husky/pre-commit`, `mvnw`, `npmw`); zero symlinks and zero gitlinks. A single project: Spring Boot backend (`pom.xml`, `src/main/java`, `src/main/docker`) and Angular client in `src/main/webapp` (165 files), with `angular.json` and `webpack/`. | context |
| Configuration (generator) | `.yo-rc.json:2–37`: `applicationType: "microservice"`, `clientFramework: "angular"`, `entities: []`, `jhipsterVersion: "8.11.0"`, `serviceDiscoveryType: "consul"`. | context |
| Configuration (federation) | `webpack/webpack.microfrontend.js:24–52`: `withModuleFederationPlugin({ name: 'jhipstersampleapplication1', exposes: { './translation-module', './entity-navbar-items', './entity-routes' }, shared: … })`, without `remotes`, with singleton `shared` for all dependencies and internal app modules (“Microfrontend api, should match across gateway and microservices”, `:3–4`). `webpack/webpack.custom.js:132–136`: applies configuration outside `serve`. `angular.json:21`: builder `@angular-builders/custom-webpack:browser`. `package.json:104–105`: `@angular-architects/module-federation` 19.0.3. | strong |
| Source code (exposed content) | `src/main/webapp/app/entities/entity.routes.ts:3–5`: empty `routes` (only marker `jhipster-needle-add-entity-route`). `src/main/webapp/app/entities/entity-navbar-items.ts:3`: `EntityNavbarItems = []`. Only the translation module has content. `src/main/webapp/app/app.component.ts:27`: `setMicrofrontend()`. | ambiguous |
| Documentation | `README.md:102–130`: the microfrontend depends on a gateway (“You must start a pre-built gateway…”) and `build-watch` synchronizes with the gateway frontend. `src/main/resources/static/index.html:86–87`: “Packaged microfrontends should be accessed through a JHipster gateway.” | moderate |
| Source code (boundaries) | Imports through alias `app/…` within `src/main/webapp`. `shared` maps `app/core/*` and `app/shared/*` for sharing with the gateway, without importing another unit's code in the repository. | context |

## Authorship and history

Non-shallow clone with a single commit, SHA `ef5d702` (2025-08-04T11:06:14Z, “Initial application generation by JHipster”), by `JHipster Bot <jhipster-bot@jhipster.tech>` as author and committer. Creation and push metadata fall in the same minute. No human change is recorded after generation. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit; composition configuration only has `exposes` (`webpack.microfrontend.js:27–31`) and references no external units. |
| Q2 | Yes (for the unit) | Angular client's own entry and build with federation (`angular.json:21`, `26–28`; `webpack.custom.js:132–136`). |
| Q3 | Undetermined | The JHipster gateway that would compose the microfrontend is not in the repository (`README.md:104–105`). |
| Q4 | Undetermined | The remote side is configured; the consumer is not observable. Additionally, exposed route and navbar modules are empty (`entity.routes.ts:3–5`; `entity-navbar-items.ts:3`). |
| Q5 | No | A unit is prepared for composition, rather than an MFE instance in the repository. |

## Rationale

- Proposed `MFE-unit` with `status: review`. Literally, there is “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…)”, with an unobservable host (gateway), as in final 001/050/069.
- **Review is justified by content:** the repository is intact generator output (single JHipster Bot commit, `entities: []`), and what is exposed to the gateway is empty routes and navbar items plus the translation module. Preparation is real, but there is no functionality to compose. This may be read as “MFE-related dependencies that are unused or experimental”.
- **Not a generator case like 075/081/105:** those were generating tools, without a concrete unit (075 is a CLI to generate and maintain plugins, 081 is a generation platform and 105 a project tool; 081 and 105 are not final), and 094 is an exercise, not a generator. Here there is a concrete generated unit.
- **Inapplicable precedents:** not a third-party platform (102/074/080, 037), because the JHipster gateway is recommended pre-built or from source (`README.md:104–114`), without identifying its owner; this inference is therefore unresolved by the snapshot, and final 037 concerns a platform extension component, which does not decide this case. Not code sharing (089/100), because the JHipster contract exposes routes and menus.
- **Fields:** `approaches: [module-federation]`, `ui_technologies: [angular]`, `build_tools: [webpack]` (explicit webpack configuration through custom-webpack), `frontend_units: 1`, `single-unit`. `repo_type: example`: generated sample application; `template` would also be defensible.

## Analysis notes

- **RQ2:** JHipster microfrontends, with a Spring Boot microservice and Angular remote client in Module Federation, singleton `shared` for all dependencies and internal modules (“Microfrontend api”), for composition by a JHipster gateway.
- **RQ1 (misleading signals):** uncustomized generator output brings complete MFE configuration and generic documentation, but no exposed functionality.
- **Protocol (search):** both searched spellings are literally in the README. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

Decide whether an uncustomized generated remote, whose exposed route and navbar modules are empty, counts as MFE-unit.

- **MFE-unit (proposed):** `exposes` configuration, gateway contract and federated build are complete and ready for use, as in 001/050.
- **Non-MFE:** without exposed functionality or any change after generation, federation is unused structure (“unused or experimental”), and the repository is generator output.

No new rule is proposed. Until a decision, preserve `MFE-unit`/`review`.
- **Independent review contribution (Lupa):** provisional agreement with MFE-unit and `review`. Module Federation configuration is active in the build that is not `serve` and exposed paths resolve (`./translation-module`, `./entity-navbar-items` and `./entity-routes`, `webpack/webpack.microfrontend.js:24–34`); the real uncertainty is whether generated JHipster output without functional entity and navigation modules satisfies the MFE-unit exception or falls under “MFE-related dependencies that are unused or experimental”, and the checklist does not define minimum functional content. Citation corrections: `README.md:5` describes a microservice application and is not microfrontend evidence (documentary evidence is `README.md:102–130`); dependency sharing is in `webpack/webpack.microfrontend.js:6–20` and internal module sharing in `:32–50`; the `../../` search was not empty, and the finding in `alert.service.spec.ts:3` is internal and does not cross units; Q4 uses `src/main/webapp/app/entities/entity.routes.ts:3–7` and `src/main/webapp/app/entities/entity-navbar-items.ts:1–3`; Q2 adds `package.json:17–18` and `:62–68` (build and watch scripts); `README.md:116` is a generic instruction, not demonstrated by the current script (`package.json:18`), moderate/ambiguous strength; the tree is a `git ls-tree` inventory at the SHA and provenance comes from `hits` tables in both `discovery.sqlite` databases, filtered by ID. `repo_type: example` is reasonable, with `template` as an alternative without effect on class. 074 (OpenMRS distribution) and 080 (documentation) have different scope.
