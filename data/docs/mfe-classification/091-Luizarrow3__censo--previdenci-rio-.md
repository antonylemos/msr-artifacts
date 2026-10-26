---
schema: 1
id: 1365262179
full_name: Luizarrow3/censo--previdenci-rio-
url: https://github.com/Luizarrow3/censo--previdenci-rio-
commit: 6a5a4dc196abc896d83573141d2013b0ca233e63
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 091 — Luizarrow3/censo--previdenci-rio-

## Context

Nexo RPPS is a React administration console with a FastAPI API. The implemented frontend concentrates authentication, shell and domain pages in a single application. Documentation expressly distinguishes the current state from a future micro-frontend target (`docs/ARCHITECTURE.md:3–9`). Type `production` records product orientation and deployment configuration (`README.md:29–43`, `render.yaml:1–12`), without asserting verified execution or production readiness.

Exact clone name checked: `Luizarrow3__censo--previdenci-rio-`, with a trailing hyphen. The SHA matches `data/samples/mfe-sample-001/clones.csv:92`. The candidate appears in `data/samples/mfe-sample-001/sample.csv:92` with `strategies: terminology` and `eligibility_status: pass`. This documents the recorded discovery/sampling strategy, not architecture confirmation or identification of a specific query. Documentary mentions of future migration are observed thematic signals, without inferring that a particular query hit exactly those lines.

Complete inventory through `git ls-tree -r 6a5a4dc196abc896d83573141d2013b0ca233e63`: **32 blobs**, no versioned `node_modules/` and no gitlink/submodule. There is one `package.json`, one HTML entry and one own frontend in `src/`. `backend/` is an API, not another frontend unit; the `apps/`, `packages/` and `mobile/` directories shown in documents do not exist in the tree. `frontend_units: 1` follows from this inventory and the observed entry chain.

**Branches and history:** `main`, `origin/main` and `origin/HEAD` point to the pinned SHA; no other local reference was observed. The clone is not shallow (`git rev-parse --is-shallow-repository`: false), and `git rev-list --count` from the evaluated commit returns **2 commits**. Network, submodules or other branches were not accessed.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology / Build/deploy | `package.json:10–12` declares React/ReactDOM; `package.json:18–24` defines a Vite build and separate API commands. `vite.config.js:1–16` explicitly configures the React plugin, `/api` proxy to FastAPI and testing environment. This configuration has no federation plugin. | contrary |
| Source code (entry) | `index.html:30` provides `#root`, and `index.html:42` loads `/src/index.jsx`. `src/index.jsx:1–12` imports the local App and mounts it with ReactDOM. There is a single frontend entry chain, without external module loading. | contrary |
| Source code (shell and pages) | `src/App.jsx:51–80` maintains hash routing and local state; `src/App.jsx:112–124` switches between login and the Shell component. `src/App.jsx:256–270` selects page and panel components defined in the same file, such as `DashboardPage`, `CadastrosPage`, `IntegracoesPage`, `CompliancePage` and `NexoOperativePage`. The name Shell does not indicate a host of independent units here. | contrary |
| Source code (backend integration) | `src/App.jsx:81–87` checks session through `/api/auth/me`; `src/App.jsx:140–147` loads context, notifications and integrations through the API. `backend/app.py:43–50` creates FastAPI. These are data/service calls, not importing or mounting another frontend. | context |
| Build/deploy (SPA delivery) | `backend/app.py:532–543` serves assets from a single `dist/` and uses `dist/index.html` as fallback. `render.yaml:1–7` configures a Python service. Delivery reinforces the SPA organization, without separate frontend-unit build/deployment configuration. | contrary |
| Architecture documentation (state and target) | `docs/ARCHITECTURE.md:5` describes the current React/Vite host concentrating domain screens. `docs/ARCHITECTURE.md:7–9` presents Module Federation as a recommended strategy when there are independent teams/deployments. The diagram in `docs/ARCHITECTURE.md:11–27` and structure in `docs/ARCHITECTURE.md:29–44` are explicitly target and proposal, not executable configuration. | contrary |
| Architecture documentation (contracts and migration) | `docs/ARCHITECTURE.md:46–52` proposes `nexo:*` events, props and exports `mount(container, contract)`/`unmount(container)`. `docs/ARCHITECTURE.md:54–62` presents the extraction sequence and future independent module publishing. Code search found no implementation of these contracts or proposed modules. | context |
| Mobile architecture documentation | `docs/MOBILE_ARCHITECTURE.md:13–19` confirms the current frontend concentrated in `src/App.jsx`. `docs/MOBILE_ARCHITECTURE.md:21–62` describes an Expo/React Native target architecture, and `docs/MOBILE_ARCHITECTURE.md:163–172` presents its migration. There is no mobile application in the snapshot; its screens are not counted as units and React Native is not attributed to the implemented UI. | context |
| Source code (real time and PWA) | `src/App.jsx:1–9` imports the local channel simulator; `src/realtime.js:32–62` generates events and subscriptions in memory. `src/index.jsx:19–21` registers `/sw.js`; `public/sw.js:1–16` configures cache and fallback for the same application. Data channels and service worker are not independent frontend applications. | context |
| Documentation / Provenance | `README.md:47–52` presents progressive MFE extraction as a proposal and points to both architecture documents. `README.md:76–82` retains generic Codespaces/Vite text. The residual statement about a single initial commit in `README.md:78` was not used as the history count; the actual Git count is two. | context |
| History | The two commits are `35b5538aef6bf10cdc53a77ca68df02198d3aeba` (2026-09-11, Add files via upload) and `6a5a4dc196abc896d83573141d2013b0ca233e63` (2026-09-11, Update README.md). Comparing all entries in both trees through `git ls-tree -r` shows only a changed `README.md` blob; all sources and architecture documents have the same blobs. Thus proposed contracts and monolithic implementation already coexisted in the first commit; no extraction is implemented in the second. | context |
| Structure / Configuration (negative target search) | The inventory was searched for other `package.json`, HTML entries, federation configurations and sources under `apps/`, `packages/` or `mobile/`, without results beyond the root application. Module folders listed in `docs/ARCHITECTURE.md:32–43` are Markdown content, not present directories. | absent |
| Configuration / Source code (negative composition search) | `src/`, `public/`, `index.html`, `vite.config.js`, `package.json`, `render.yaml` and `backend/` were searched for `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` and `srcDoc`, without results. Search was performed at the commit, without expanding dependencies. | absent |
| Source code (negative external-preparation search) | In the same code/configuration scope, `nexo:*` events and proposed exports/contracts `mount(container` and `unmount(container` were searched, without implementation found. Positive documentation search locates events in `docs/ARCHITECTURE.md:48–49` and the mounting contract in `docs/ARCHITECTURE.md:51`; this keeps them in the migration plan. The FastAPI `app.mount` call in `backend/app.py:535` only serves assets and is not a frontend lifecycle. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend target: `index.html:42` → `src/index.jsx:1–12` → local App. Screens are components in the same file (`src/App.jsx:256–270`). Modules in the diagram and proposed structure are not implemented (`docs/ARCHITECTURE.md:29–44`). |
| Q2 | No | There is neither a set of independent units nor a unit prepared for an external host. There is one Vite build (`package.json:18–24`, `vite.config.js:1–16`), while domain pages are rendered internally by `src/App.jsx:256–270`. |
| Q3 | No | Shell is a local component of the same SPA (`src/App.jsx:124`, `src/App.jsx:256–270`), without a host/root loading independent units. The backend delivers a single `dist/index.html` (`backend/app.py:538–543`). |
| Q4 | No | No composition mechanism was found in configuration or code. Documentation itself places federation and extraction in the future (`docs/ARCHITECTURE.md:7–9`, `docs/ARCHITECTURE.md:54–62`), and `vite.config.js:5–16` contains only React, API proxy and tests. |
| Q5 | No | Code demonstrates a single conventional frontend with API. MFE evidence is a target architecture and proposed contracts, not an implemented instance (`docs/ARCHITECTURE.md:3–9`, `docs/ARCHITECTURE.md:46–62`). Q5 follows Q1–Q4, without override. |

## Rationale

- Proposed `Non-MFE`, with Q1–Q5 No: this corresponds to a conventional monolithic frontend and a repository mentioning MFE without implementing composition.
- Module names, Mermaid diagrams and mounting signatures appear as documentary proposals. Under 023/028 and 075/081, presented or planned content does not become an implemented unit. There is one actual own unit, not zero; backend and simulator channels are not additional frontends.
- It is not MFE-unit: no implemented exports or contracts preparing this unit for an external host were found. Therefore Q2–Q4 are No, without using Undetermined because of a merely intended migration.
- There is no platform plugin, federation code-sharing, build-time composition or iframe/link question to resolve. React is observed in the entry; Vite has explicit configuration in the snapshot. Expo/React Native and proposed micro-frontends are not added to implementation metadata.

## Analysis notes

- **RQ1 (sampling):** `strategies: terminology` and `eligibility_status: pass` are recorded in `data/samples/mfe-sample-001/sample.csv:92`. Eligibility and discovery do not classify architecture. The candidate has hits in both discovery rounds for queries `terminology-micro-frontend-repositories` and `terminology-micro-frontends-repositories` (`micro frontend(s)` in name, description and README), subquery `created:2026-09`; metadata has neither description nor topics, so the only compatible README text is `README.md:51` ("extração progressiva para micro-frontends"; English translation: "progressive extraction to micro-frontends"), a future migration. It is a terminology false positive for RQ1. Discovery databases queried in read-only mode.
- **RQ1 (misleading signals):** documentation already contains `mf-*` names, host diagram and event/lifecycle contracts before extraction. The current-state/target distinction in `docs/ARCHITECTURE.md:3–9`, together with reading consumer code, prevents treating this material as active configuration.
- **Protocol (families):** searches in existing annotations for `Luizarrow3`, `censo`, `Nexo RPPS` and `codespaces-react` found no sibling or common origin. Codespaces/Vite scaffold is explicit in the README, without evidence of affiliation with a specific candidate. Precedent `docs/mfe-classification/055-threatcode__dump-data.md` is analogous in recommending MFE migration while retaining a conventional application; it does not indicate a shared family or template.
- **Protocol (inspection):** the 32 blobs, absence of submodules and actual count of two commits were checked. No network query, build, application, tests or migration was executed. Documentation provides a published address, but its current state was neither accessed nor transferred to snapshot classification.
