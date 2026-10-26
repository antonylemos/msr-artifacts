---
schema: 1
id: 1118681120
full_name: PriyadarshaniMishra/microfrontend-project
url: https://github.com/PriyadarshaniMishra/microfrontend-project
commit: 7a4338bf7e5edc18986fe18ce77654abde80743a
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 371 — PriyadarshaniMishra/microfrontend-project

## Context

Newly created Create React App project. `App.js` is still the template version (`src/App.js:1–25`), and there is a `Login` component (`src/Pages/login.js`) that is imported by neither `App.js` nor `index.js`. The README is standard CRA text (`README.md:1–3`). The sequence “microfrontend” appears only in the package name (`package.json:2`, `"react-microfrontend-project"`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:372` records rank 371, ID 1118681120, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:372` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:22321` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:22327` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns a single hit in each round. It comes from endpoint `repositories`, query `terminology-microfrontend-repositories` (`microfrontend in:name,description,readme`), subquery `…#created:2025-12`, with an empty `path`. Collections are 2026-10-07T19:26:02.279Z (001) and 2026-10-08T15:40:23.911Z (002). The effective query appends `pushed:>=2025-04-01 created:2025-12-01..2025-12-31`.

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 310;
- created at 2025-12-18T05:57:00Z, pushed at 2025-12-18T07:11:13Z.

The README (standard CRA text) does not contain the spelling, and the description is null. The sequence appears only in `package.json:2` and `package-lock.json`, outside the searched fields, and in the repository name. The origin of the hit in GitHub search processing is not recorded. The last README change is `deb46fd` (2025-12-18), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 19 entries, all regular files `100644`; zero symlinks and zero gitlinks. Standard CRA structure (`public/`, `src/`, `package.json`) plus `src/Pages/login.js`. | contrary |
| Code | `src/App.js:1–25`: standard CRA page. `package.json:12–19`: `react-scripts`, without federation. `src/Pages/login.js`: unused form component. | contrary |
| Search | `git grep -i micro.?front` at the SHA: only `package.json:2` and `package-lock.json:2`, `8`. | absent |

## Authorship and history

Non-shallow clone; 2 linear commits by “Priyanka”, on 2025-12-18: `deb46fd` (“Initialize project using Create React App”) and SHA `7a4338b` (“Initial React project setup”). Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single CRA application in its initial state. |
| Q2 | No | Without two units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root configuration. |
| Q4 | No | No composition mechanism. |
| Q5 | No | Q1–Q4 are No: initial CRA project. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”, at an early stage.
- As in draft 212 (hit only through the name), the term appears only in the package name, without implementation.
- **Fields:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react]`, `build_tools: []` (unejected CRA, as in 087), `repo_type: example`.
- There is no open decision.

## Analysis notes

- **Protocol (search):** no spelling in searched fields apart from the repository name. Eligibility changes from `unknown` (001) to `pass` (002).
