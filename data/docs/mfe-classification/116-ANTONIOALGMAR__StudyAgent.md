---
schema: 1
id: 1343187191
full_name: ANTONIOALGMAR/StudyAgent
url: https://github.com/ANTONIOALGMAR/StudyAgent
commit: 2799940125ce682f451fcda1a72fc3e507cd52f5
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

# 116 — ANTONIOALGMAR/StudyAgent

## Context

Local multimodal tutoring application, with React/Vite frontend and Python/FastAPI/Ollama backend. Chat, 3D avatar, exercises, flashcards, documents and dashboards are features of the same frontend (`README.md:3`; `frontend/src/App.tsx:3–5`; `frontend/src/components/Chat.tsx:1–20`). `repo_type: production` records an application intended for functional local use, with installation, permissions and packaging, without asserting maturity or successful execution.

## Sample provenance

- Rank 116, ID, identity and strategy `broader`: `data/samples/mfe-sample-001/sample.csv:117`. Clone, branch `main` and SHA checked in `data/samples/mfe-sample-001/clones.csv:117`. Sample origin in round 002: `data/samples/mfe-sample-001/manifest.json:2–5`.
- `data/discovery/mfe-round-001/candidates.csv:35930` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:35935`, `pass`. Both have description `agente de estudo` (English translation: “study agent”), empty topics, Python language, null license, `fork: false` and last push `2026-10-06T21:25:42Z`.
- `sqlite3 -readonly` query of databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, joining `hits`, `queries` and `subqueries`, by `repository_id=1343187191`: both have one hit `broader-frontend-decomposition`, strategy `broader`, endpoint `repositories`, exact query `"frontend decomposition" in:name,description,readme`. Subquery is also named `broader-frontend-decomposition`, with exact `q_effective` `"frontend decomposition" in:name,description,readme pushed:>=2025-04-01`, empty `partition_label` and `path`. These are SQLite keys, without artificial text lines.
- `fetched_at`: `2026-10-07T23:39:32.932Z` in round 001 and `2026-10-08T16:22:51.991Z` in 002. By elimination, name/description lack the expression and topics are empty; README literally presents `Frontend Decomposition: Chat.tsx 993→357 lines, 3 hooks, 4 components` in `README.md:548`. Expression matches query disregarding capitalization and describes internal refactoring. Database does not identify the exact excerpt producing the hit. Name and retrieval do not confirm architecture.
- README at the SHA **is not later than searches**: metadata of its last modifying commit, `c65588caf6cbf39123fac27120a0aadd0bfee7c6`, record `2026-10-06T15:13:26-03:00` (`2026-10-06T18:13:26Z`), before both collections. HEAD is from `2026-10-06T18:25:40-03:00`. Chronology was checked without reading historical blobs.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 222 regular files, 213 mode 100644 and nine mode 100755; zero symlinks and zero gitlinks. There are 132 in `backend/`, 54 in `frontend/`, seven in `scripts/`, six in `docs/`, three in `data/`, two in `config/`, one in `.github/` and 17 at root. No `node_modules`, submodules or vendored third-party application tree. A single npm manifest, in `frontend/`. Git-tree counts, without artificial text lines. | context |
| Build/deploy / Configuration | Sole frontend has Vite dev/build/preview scripts (`frontend/package.json:1–9`) and explicit configuration with React plugin, port 5173 and test configuration (`frontend/vite.config.ts:1–13`). HTML contains `#root` and `/src/main.tsx` (`frontend/index.html:8–10`); this entry imports local App and renders it (`frontend/src/main.tsx:1–10`). No own entry/build exists per panel. | contrary |
| Source code (consumption) | App imports local Chat and Notifications and renders them in the same root (`frontend/src/App.tsx:3–5`; `frontend/src/App.tsx:108–114`). Chat imports local components and hooks, including PanelManager (`frontend/src/components/Chat.tsx:1–17`). This is conventional React component composition within the same build. | contrary |
| Source code (panels) | `PanelManager` imports panels from a local barrel (`frontend/src/components/PanelManager.tsx:1–9`); `panels.ts` reexports six local files (`frontend/src/components/panels.ts:1–6`). Manager renders these components under Suspense (`frontend/src/components/PanelManager.tsx:38–63`), without a remote, lifecycle or independent application per panel. | contrary |
| Source code (lazy loading) | Observed lazy imports load `./PdfViewer` and `./StudyAgent3D/StudyAgentAvatar` (`frontend/src/components/Chat.tsx:19–20`). These are existing local destinations of the same application, not external composition units. Avatar and agent-generated exercise content add no frontend units. | contrary |
| Source code (boundary search) | Ran `git grep -n -F -e '../../' -e '../../../'` across all `frontend/src` at the SHA. Two results: `getVoiceLevel` in `AgentRealisticHead` and `setVoiceSensitivity` in `StudyAgentAvatar`, both from `../../lib/audioReactive` (`frontend/src/components/StudyAgent3D/AgentRealisticHead.tsx:9`; `frontend/src/components/StudyAgent3D/StudyAgentAvatar.tsx:7`). These are local utilities of the same tree; independence through sampling or fictitious absence of imports is not asserted. | context |
| Source code / Composition (iframe) | `PdfViewer` receives document as prop and imports local API functions (`frontend/src/components/PdfViewer.tsx:1–9`). Its iframe points to `documentFileUrl(doc.id)` with PDF-viewing parameters (`frontend/src/components/PdfViewer.tsx:144–148`); function returns `/api/documents/<id>/file` (`frontend/src/api.ts:458–460`). This displays a document, without an integration contract between frontend units. Iframe existence was neither ignored nor automatically elevated to MFE mechanism. | contrary |
| Technology / Resolution | React/ReactDOM, Vite and plugin are declared (`frontend/package.json:14–15`; `frontend/package.json:24–28`). Lockfile resolves React/ReactDOM 18.3.1 (`frontend/package-lock.json:3034–3037`; `frontend/package-lock.json:3058–3061`), Vite 6.4.3 (`frontend/package-lock.json:3606–3609`) and React plugin 4.7.0 (`frontend/package-lock.json:1940–1943`), whose recorded peer allows Vite 6. Config/entry/local imports exist; basic static resolution checked, without installation or build execution. | context |
| Build/deploy | Dockerfile copies sole manifest/lockfile, runs build and serves dist in nginx (`frontend/Dockerfile:1–10`). Backend/API is a data/service dependency, not another UI: central client points to `http://localhost:8000` (`frontend/src/api.ts:1`). Panels have no independent application packaging. | contrary |
| Technology / Configuration / Composition | Text search at the SHA, excluding frontend lockfile, for `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap`, `loadRemote` and `micro.?frontend`: sole result was PDF iframe. Manifest/config/entry inventory finds no remotes ↔ exposes ↔ consumption chain or preparation of a unit for an external host. | absent |
| Documentation / Architecture | `architecture-map.md:9–11` declares React UI with “shell único, sem roteador” (English translation: “single shell, without router”) connected to API through HTTP; describes components/services (`architecture-map.md:15–35`). Audit defines “Frontend Decomposition” as extracting ChatInput/ChatMessages/ChatVoice and hooks from Chat (`docs/ARCHITECTURE_AUDIT.md:276–282`), consistent with current imports. README marks this work complete (`README.md:548`). These are observed architecture documents; no separate ADR exists in inventory. | contrary |

## Authorship and history

Metadata at the SHA: 98 reachable commits, one merge, one root commit `a290e64349b7f31f072942bf1b20559b4460e9ca`, non-shallow clone. All record author and committer `ANTONIOALGMAR`. Root, from 22/08/2026, describes V1 with chat/voice/vision/permissions; HEAD is from 06/10/2026, concerning screen-question resolution.

`git log --no-renames --name-status` for `frontend/`, `backend/` and `architecture-map.md`, always with `GIT_NO_LAZY_FETCH=1`, shows both trees added at root and incremental changes. `65c31f0e2d012c1e5dc857c832235ac13f2e6521` unifies sidebars/adjusts frontend; `889404ec92693709be9e2bfe9cd2651b5f96e98b` modifies client API, live panel and styles; `b50c791e34fdc5a379a051f267a8dacf0675ba15` modifies screen hook/test. HEAD changes backend code and tests, without adding another frontend. `22d44f23d50040b435564680da6b6c9a83c39c25` adds architecture map. No object was missing in queries and historical blobs were unnecessary.

Identities and initial addition do not prove original intellectual authorship of all components/models/dependencies. No separate vendored copy was observed being counted as own target. `main`, `origin/main` and `origin/HEAD` point to SHA; ref `origin/feature/identity-centralization` was only recorded, without reading alternative content.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend with its own root, manifest/build and sources (`frontend/package.json:1–9`; `frontend/src/main.tsx:1–10`). Panels, avatar, backend and iframe document are not additional units. |
| Q2 | No | No two units have their own entries/builds: panels are imported from local sources of the same application (`frontend/src/components/PanelManager.tsx:1–9`; `frontend/src/components/panels.ts:1–6`). Complete relative-import scan reveals no other unit; absent boundaries are not positive proof of independence. |
| Q3 | No | App/Chat render components of the same root, not distinct frontend units (`frontend/src/App.tsx:108–114`; `frontend/src/components/Chat.tsx:1–20`). Map describes a single shell (`architecture-map.md:9–11`). |
| Q4 | No | No mechanism is configured and used to connect frontend units. Lazy imports are local (`frontend/src/components/Chat.tsx:19–20`); iframe points to an API document (`frontend/src/components/PdfViewer.tsx:144–148`; `frontend/src/api.ts:458–460`). |
| Q5 | No | Conventional React application, with internal refactoring called “Frontend Decomposition”, without implemented MFE architecture or MFE-unit. |

## Rationale

- `Non-MFE`: Q1–Q5 No, without MFE-unit exception. `frontend_units: 1` follows from complete inventory. Observability is sufficient; `null` is not used, nor Python backend counted as frontend.
- Q1 requires concrete composition targets or targets referenced by configuration. Q2 requires own entry/build and source independence; panels share bootstrap, build and local imports. Q4 requires a composition mechanism actually connecting units, not component imports, Suspense or hook extraction.
- Iframe was inspected: it displays a PDF file, without a second application or UI integration contract between units. As in content separation in 023/081, no general iframe decision requires adjudication. Code tools and agent-generated exercises are also not units present/configured for composition, following caution in 075/105.
- This is not personal profile as in 011/064/068/073/077/101/111. Application is concrete, but differs from complete chains 076/084/096/106/109 and final 007. Nor is it unconnectable MFE configuration (097/103/104), code-sharing federation requiring adjudication (089/100), or platform distribution/plugin as discussed in 074/102/080.
- Without a unit prepared for an external host, Q2–Q4 remain No. Observed technology is React, with explicitly configured Vite; Three.js/R3F are features of the same frontend, without a new independent framework/unit in record.
- No classification decision remains open about build-time package composition, link/iframe or execution imperfection. Scripts, installation, build, tests, models and application were not run; classification does not confirm product functionality claims.

## Analysis notes

- **RQ1 (families):** searching for `ANTONIOALGMAR` and `StudyAgent` in available annotations found no previously annotated sibling/template. Cited comparators are methodological, without common-origin evidence.
- **RQ1 (misleading signal):** search expression “Frontend Decomposition” corresponds to extracting components/hooks from a large file, not decomposing an application into units with their own builds. Documentation and sources demonstrate the effect, without relying only on README.
- **RQ3:** checked chain: HTML → main → App → Chat → local components/panels/services. API supplies data/documents; iframe presents PDF. No link adds a remote frontend.
- **Protocol:** sole query and subquery of strategy `broader` were preserved, as were exact README line and precedence over collections. Database supplies no textual match location; name and hit do not confirm MFE.
