---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
url: https://github.com/dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [iframe]
ui_technologies: [react]
build_tools: []
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 121 — dearjay22/Group2_INFO8985

## Context

E-commerce demonstration with Java microservices, two React applications, Docker Compose and monitoring (`README.md:6–16`). Shell mounts Products application in iframe at route `/products`, with a Codespaces URL whose port 3001 matches Products service in Compose (`frontend/shell-app/src/App.js:6–35`; `docker-compose.yml:59–71`). Relationship between own targets is observable; sufficiency of this URL/route contract for iframe MFE composition remains for review, without presupposing a new methodological rule.

Identity and SHA checked in `data/samples/mfe-sample-001/clones.csv:122`, status `cloned`; HEAD matches front-matter commit. All clone Git inspection used `GIT_NO_LAZY_FETCH=1`, without snapshot changes, installation, application execution or network.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:122` records rank 121, strategy `terminology` and eligibility `pass`. Sample source is round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). Candidate appears in `data/discovery/mfe-round-001/candidates.csv:21751`, with eligibility `unknown`, and `data/discovery/mfe-round-002/candidates.csv:21757`, with `pass`. Both record null description, empty topics, JavaScript language, `fork: false`, creation at 2025-12-02T20:20:55Z and push at 2025-12-09T20:29:58Z.

`sqlite3 -readonly` queries of tables `hits`, `queries` and `subqueries` in `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, by ID 1108713604, show:

| Query | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-12` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2025-12-01..2025-12-31` | 2026-10-07T19:25:56.873Z / 2026-10-08T15:40:18.421Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-12` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2025-12-01..2025-12-31` | 2026-10-07T22:09:59.973Z / 2026-10-08T15:48:34.496Z |

Hits have empty `path`, without matched-field location. By elimination, name lacks terms and description/topics do not explain them; `README.md:2` contains “Microfrontends”, `README.md:13` contains “Products Microfrontend” and `README.md:107` contains “microfrontends”. These are observed lines compatible with both spellings, not API-supplied positions. README at the SHA was revised at 2025-12-09T03:09:28Z, before October 2026 searches; it is not later than collections. Repository name does not underpin classification.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r`: 111 regular files, including 110 `100644` and one `100755`; zero symlinks and zero gitlinks. Two own targets exist in `frontend/shell-app` and `frontend/products-mf`, plus Java backend with `target` artifacts, data and monitoring. No versioned `node_modules` or explicit bundler configuration. JARs and infrastructure dashboards are not new own frontend units. | context |
| Source code (entries) | `frontend/shell-app/src/index.js:1–12` and `frontend/products-mf/src/index.js:1–12` import their respective `App` and create separate React roots. Each directory has `public/index.html`, with element `root` on line 31. | moderate |
| Build/deploy (independence) | `frontend/shell-app/package.json:10–19` and `frontend/products-mf/package.json:10–19` declare React, ReactDOM and own start/build/test scripts through `react-scripts`. Both lockfiles resolve `react-scripts` 5.0.1 in `frontend/shell-app/package-lock.json:12674–12676` and `frontend/products-mf/package-lock.json:12674–12676`. No federation hook/configuration requires resolution; bundler remains encapsulated by CRA. | moderate |
| Build/deploy (images) | `frontend/shell-app/Dockerfile:1–11` and `frontend/products-mf/Dockerfile:1–11` compile each directory independently and publish output in Nginx. `docker-compose.yml:59–71` defines separate builds and publishes shell at `3000:80` and Products at `3001:80`. Both have navigation fallback in their `nginx.conf:5–9`. Referenced files and entries exist in snapshot; build was not run. | strong |
| Source code / Composition (connection) | `frontend/shell-app/src/App.js:4–14` identifies route and, for compatible hostname `app.github.dev`, derives `https://${codespaceName}-3001.app.github.dev`. `frontend/shell-app/src/App.js:26–36` offers navigation to `/products` and mounts iframe titled “Products Microfrontend” at that route. Port matches Products application (`docker-compose.yml:66–69`), not backend gateway on port 8080. | strong |
| Source code (consumed target) | `frontend/products-mf/src/App.js:1–9` reads local `products.json` and `frontend/products-mf/src/App.js:18–38` renders a products table. This `App` is the entry imported in `frontend/products-mf/src/index.js:4–10`. `frontend/products-mf/src/ProductList.js:3–18` contains an alternative API fetch, but is not imported by actually mounted App; its participation in current chain is not presumed. | moderate |
| Source code (boundaries) | Active literal search for `../../` and `../../../` in all JavaScript under `frontend`: no occurrence. Imports/exports of all 11 JS files in `frontend/*/src` were read, including `import()` and `require()`: relative imports stay in their respective target, without directly consuming the other’s sources. Shell→Products connection uses iframe URL, not static import across trees. | moderate |
| Configuration / Composition (limits) | `frontend/shell-app/src/App.js:6–18` returns no fallback URL for localhost or hostnames outside expected pattern; `src` template string receives `undefined` in these cases. Configuration targets Codespaces, as `README.md:2` declares, and demonstrates no universal operation. Comment in `frontend/shell-app/src/App.js:13` mentions gateway 8080, but following code uses 3001, consistent with Products in Compose. | ambiguous |
| Technology / Composition (searches) | Search across entire `frontend` tree for `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage` and `import.?map`: no occurrence. Iframe mounting exists, but no messaging protocol, dynamic registration, shared authentication or other bidirectional contract is observed between targets. Sufficiency of explicit URL/route relationship is Q4’s open decision. | ambiguous |
| Documentation (limitations) | `README.md:50–74` instructs entering directories without prefix `frontend/` and running `npm run dev`, a nonexistent manifest script; `README.md:80–84` indicates ports 5173/4173, differing from Compose publications 3000/3001. These instructions do not replace implemented chain read in sources and Compose. | context |

## Authorship and history

Metadata from `git rev-list`: **56 commits, 16 merges and 1 root commit**, root `095fa1229e81a2f2fb2e9d6ef2bf0e09b63ed34b`; non-shallow clone. Root has author Patel Jay at 2025-12-02T15:20:55-05:00. Evaluated SHA has author Patel Jay at 2025-12-08T22:09:28-05:00 and message `Revise README for Microservices E‑Commerce Project`.

`git log --no-renames --name-status` was queried separately for `frontend/shell-app` and `frontend/products-mf`, plus central files and README. Initial 18 shell files and 19 Products files are added by `altaf-khan-jk` in `ebce825` (2025-12-02T21:23:55Z). App.js files are later modified by `altaf-khan-jk` in `b3e4f84` and `20fcc0c`, and by Patel Jay in `3b6d2f0`; Products receives additional changes in `5c59071` and `9f51b10`. Dockerfiles are added by `altaf-khan-jk` and modified by Patel Jay. This shows collaborator work and evolution of relevant files, not merely immutable import of third-party applications.

Basic files retain CRA scaffold characteristics (`frontend/shell-app/public/index.html:9–10` and `frontend/shell-app/src/index.js:14–17`); original authorship of that scaffold is not attributed to collaborators. Specific route/URL connection and products table were evaluated as implementation materialized in repository. Historical blobs were not read and old-version content was not inferred from messages; no missing object was found.

Local branches, for record only: `main`, `origin/main` and `origin/HEAD` point to evaluated SHA; `origin/Jay-load-test` exists at `b90842606ee7f510f521fdc0178c6660ec693c13` and `origin/varunfeature/fix-api-gateway` at `3ad49c0cac9f87bbbb64a907eab5369f0d4244a1`. No content from those branches was incorporated into analysis. No separate ADR exists in inventory; architectural overview is in README and cited configurations.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Shell and Products are identifiable applications, with respective entries (`frontend/shell-app/src/index.js:1–12`; `frontend/products-mf/src/index.js:1–12`). Shell references port 3001 URL, mapped to Products (`frontend/shell-app/src/App.js:6–14`; `docker-compose.yml:66–69`). |
| Q2 | Yes | Each target has its own entry, manifest, build and image, without direct source import from the other (`frontend/shell-app/package.json:15–19`; `frontend/products-mf/package.json:15–19`; respective Dockerfiles, lines 1–11; complete import search described above). |
| Q3 | Yes | Shell route `/products` mounts Products through iframe (`frontend/shell-app/src/App.js:26–36`), participating in the same e-commerce interface. Chain is explicit for expected Codespaces hostname. |
| Q4 | Yes | Shell mounts Products through iframe at route `/products`, using URL of port explicitly associated with Products application by Compose (`frontend/shell-app/src/App.js:26–36`; `docker-compose.yml:66–69`). |
| Q5 | Yes | Two independent applications are composed in interface through iframe; Codespaces-environment limitation concerns portability, not absent mechanism. |

## Rationale

- Rule `MFE-implemented` applies: Q1–Q5 are Yes after joint review. Relationship between project’s own applications is implemented through iframe, not merely documented.
- `frontend_units: 2`, `unit_organization: monorepo`, `repo_type: example`, supported by entries/builds and demonstrative purpose (`README.md:6–16`). Java services, Eureka, Grafana and Prometheus are not counted as own frontend units.
- `approaches: [iframe]` records concretely observed mechanism; `ui_technologies: [react]` follows from entries and implementations. `build_tools: []`: CRA encapsulates bundler, without explicit bundler configuration or hook in snapshot. Transitive lockfile dependencies do not change this convention.
- No is not concluded merely for absent local fallback or outdated instructions; nor is Yes concluded without resolving iframe criterion. Snapshot permits a consistent static Codespaces chain, without execution confirming public port access or remote-loading result.

## Analysis notes

- **Protocol (family):** annotation search for `dearjay22`, `INFO8985` and `ObsShop` found no previously annotated sibling. CRA scaffold family does not prove duplication of a specific candidate.
- **Checklist:** unlike case 119 (third-party map), iframe here points to another target in the same repository. Case 031 is `review` and has a broader contract (registration and messages), not a transferable final rule. Comparison with 076/084/096/106/109: two entries/builds and concrete connection exist, through another mechanism. Unlike 089/100, connection loads an application, not merely shared code.
- **RQ1:** backend gateway routes APIs (`backend/api-gateway/src/main/resources/application.yml:15–28`), not frontend units; names “Shell” and “Microfrontend” in README were considered only alongside sources and port mapping.

## Recorded decision

Promote to **MFE-implemented**. Shell incorporates Products application through iframe at an own route, with URL linked to Compose Products service. URL/route contract is sufficient in this case of two applications of the same project; dependency on Codespaces URL pattern is a portability limitation.
