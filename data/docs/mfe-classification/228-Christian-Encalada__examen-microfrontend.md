---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
url: https://github.com/Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 228 — Christian-Encalada/examen-microfrontend

## Context

“Sistema de Alertas Académicas - Arquitectura Microfrontend” (English translation: “Academic Alert System - Microfrontend Architecture”) (`README.md:1–12`): three React 19 + Rspack applications with `@module-federation/enhanced`:
- host `appclases`, at the root (port 3000);
- remote `AlertSender`, in `alert-sender/` (port 3001), which sends alerts;
- remote `AlertDashboard`, in `alert-dashboard/` (port 3002), which displays them.

The two remotes communicate through `CustomEvent('academic-alert')` (`README.md:81–87`). There are also federation-generated types in `@mf-types/`. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:229` records rank 228, ID 1149061587, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:229` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:24367` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:24374` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same six hits in each round.

Code search, subquery `technology-module-federation-package-code#size:900..999`:

| Query (`q`) | `path` | Collection 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `package.json` | 2026-10-07T18:30:51.097Z / 2026-10-08T15:38:47.802Z |
| same | `alert-sender/package.json` | 2026-10-07T18:32:56.357Z / 2026-10-08T15:38:59.330Z |
| same | `alert-dashboard/package.json` | 2026-10-07T18:35:20.768Z / 2026-10-08T15:39:11.345Z |

The three files (922, 925 and 928 bytes) declare `"@module-federation/enhanced": "^0.8.9"` on line 27.

Repository search, subquery `…#created:2026-02`, empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:47:03.321Z / 2026-10-08T15:40:58.025Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:10:42.583Z / 2026-10-08T15:48:59.289Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:22:54.184Z / 2026-10-08T16:16:59.525Z |

The effective queries append `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`.

Repository hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 70;
- created at 2026-02-03T17:18:22Z, pushed at 2026-02-03T17:18:25Z.

Spellings in the README:
- “Microfrontend”: `README.md:1` (“Arquitectura Microfrontend”; English translation: “Microfrontend Architecture”);
- “microfrontends”: `README.md:3` (“una arquitectura de microfrontends con Module Federation”; English translation: “a microfrontends architecture with Module Federation”);
- “Module Federation”: `README.md:3`, `16`.

The README comes from the only commit, the SHA (2026-02-03), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 42 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are three projects: the host at the root (`package.json`, `rspack.config.ts`, `module-federation.config.ts`, `src/`) and remotes `alert-sender/` and `alert-dashboard/`, each with `package.json`, lockfile, `rspack.config.ts`, `module-federation.config.ts` and `src/`. There are also generated types in `@mf-types/` and one `.babelrc` per project. | context |
| Configuration (host) | `module-federation.config.ts:1–9`: `name: "appclases"`, `remotes: { AlertSender: "AlertSender@http://localhost:3001/remoteEntry.js", AlertDashboard: "AlertDashboard@http://localhost:3002/remoteEntry.js" }`, `shared: ["react", "react-dom"]`. `rspack.config.ts:5`, `8`, `81`: `ModuleFederationPlugin` from `@module-federation/enhanced/rspack`. | strong |
| Configuration (remotes) | `alert-sender/module-federation.config.ts:1–8`: `name: "AlertSender"`, `exposes: { "./AlertSender": "./src/components/AlertSender.tsx" }`. `alert-dashboard/module-federation.config.ts:1–8`: `name: "AlertDashboard"`, `exposes: { "./AlertDashboard": … }`. Ports and `publicPath` 3001/3002 (`alert-sender/rspack.config.ts:25`, `33`; `alert-dashboard/rspack.config.ts:25`, `33`) match the host. | strong |
| Source code (composition) | `src/index.ts:1`: `import("./App")` (asynchronous bootstrap). `src/App.tsx:3–4`: `import AlertSender from "AlertSender/AlertSender"` and `import AlertDashboard from "AlertDashboard/AlertDashboard"`; `:61–68`: both mounted side by side. | strong |
| Source code (integration) | `alert-sender/src/components/AlertSender.tsx:71–81`: `window.dispatchEvent(new CustomEvent('academic-alert', …))`. `alert-dashboard/src/components/AlertDashboard.tsx:97–108`: listens for the same event. Each remote also runs independently (`alert-sender/src/App.tsx:1–10`). | moderate |
| Source code (boundaries) | Search for `../..` and for `../alert-*` or `../src`: no occurrences. The projects connect only through federated modules. `src/types/federation.d.ts:1–5` declares an unused `Footer/Footer` module, a template remnant. | context |

## Authorship and history

Non-shallow clone; 1 commit, SHA `9456a39` (2026-02-03), by Christian_Encalada `<cris_7715@hotmail.com>`, with a long message describing the architecture initialization (“Initialize microfrontend architecture for academic alert system with Module Federation…”). No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units in the repository, two referenced by the host composition configuration (`module-federation.config.ts:5–8`). |
| Q2 | Yes | Each unit has its own `package.json`, lockfile, `rspack.config.ts`, entry point and port, without source code imports between them. |
| Q3 | Yes | The host mounts both remotes on the page (`src/App.tsx:61–68`). |
| Q4 | Yes | Module Federation (enhanced/Rspack) with `remotes` in the host and `exposes` in the remotes, consumed through federated imports. |
| Q5 | Yes | Q1–Q4 are Yes: host and two remotes composed at runtime, with event-based communication. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. It matches “monorepos containing a host and its remotes”. The chain is complete in the snapshot, as in 076/084/096/106/109.
- The remotes expose functional slices with their own state and interaction, integrated through `CustomEvent`, as in draft 209; this is not component sharing (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rspack]` (as in 164/181), `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example` (demonstration with fixed messages, `alert-sender/src/components/AlertSender.tsx:64–68`, and URLs on `localhost`).
- There is no open decision.

## Analysis notes

- **RQ2:** `@module-federation/enhanced` 0.8 in Rspack 1.2, with generated remote types in `@mf-types/` and communication between remotes through `CustomEvent` on `window`.
- **Protocol (search):** the repository enters through code (three `package.json`) and through three textual queries. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, React/Rspack, three units and `monorepo`; no open decision (`draft`). The host → remote configuration → exports → rendering chain is complete, and communication between the two remotes uses matching event and payload. Verification was static, without execution or proof of deployment. History has a single commit, without earlier versions to compare, and `rev-list --objects --missing=print` finds no missing object in the reachable set. Q2 should cite the scripts in the three manifests (`:4–8`), entry points and HTML and the boundary search; Q4, the configs, exports, imports and rendering; Q5, the evidence synthesis.
