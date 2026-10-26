---
schema: 1
id: 977898028
full_name: yasinekinci/admin-dashboard-frontend
url: https://github.com/yasinekinci/admin-dashboard-frontend
commit: 3d2dcd7b46b3a1ad3e048a96d7cd5e33203179dc
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 155 — yasinekinci/admin-dashboard-frontend

## Context

Newly created Vite + React + TypeScript project, with default scaffold code (counter and logos in `src/App.tsx:6–33`) and an Azure Static Web Apps deployment workflow. The README is a list of topics to study or apply (React, Redux, authentication, styles, tests, CI/CD etc.), including “Micro Frontend” (`README.md:3–7`). There is no implementation beyond the scaffold. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:156` records rank 155, ID 977898028, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:156` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:13655` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:13661` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-05` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:21:59.654Z / 2026-10-08T15:54:21.435Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:53:14.512Z / 2026-10-08T16:05:40.430Z |

Effective queries append `pushed:>=2025-04-01 created:2025-05-01..2025-05-31`.

Hit metadata:
- null description, no topics, language CSS, `fork: false`, size 48;
- created at 2025-05-05T06:35:03Z, pushed at 2025-05-07T10:54:27Z;
- homepage `lemon-hill-09b3ffd10.6.azurestaticapps.net`.

Without a description, the hit comes from `README.md:4`, “Micro Frontend”, the only occurrence. The plural form “micro frontends” does not appear in the README; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is the SHA itself, `3d2dcd7` (2025-05-05), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 18 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single Vite project is at the root (`package.json`, `vite.config.ts`, `index.html`, `src/` with `App.tsx`, `main.tsx`, CSS and `assets/react.svg`) and a workflow. | contrary |
| Source code | `src/main.tsx:6–10` mounts `App`. `src/App.tsx:1–35` is the default Vite template (counter, logos). Imports are internal. | contrary |
| Configuration / Build/deploy | `vite.config.ts:5–7`: only `react()`. `package.json:6–27`: `tsc -b && vite build`, dependencies only `react`/`react-dom`. `.github/workflows/azure-static-web-apps-lemon-hill-09b3ffd10.yml:22–33`: single deployment of `dist` to Azure. | contrary |
| Documentation | `README.md:1–61`: topic list (“React / Micro Frontend / Function vs Class Components / Hooks / formik”, Redux, Auth, Ant Design etc.), without a description of implemented architecture. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA (except `package-lock.json`) for `micro.?front`, `federation`, `single-spa`, `remoteEntry`, `customElements` and `iframe`: only `README.md:4`. | absent |

## Authorship and history

Non-shallow clone. The SHA has 6 commits, no merges, all by Yasin Ekinci with two email addresses, `@dzdtech.com` and `@yandex.com`, on 2025-05-05. According to `git log --no-renames --name-status`:
- root `9149e56` (“Initial commit”, through GitHub) adds `.gitignore` and `README.md`;
- `b46c245` (“create react vite app”) adds the scaffold;
- `81fa867` and `e6f7db0` concern the Azure workflow;
- `973f7f9` and SHA `3d2dcd7` change only the README.

Branch `origin/first` (`e917bcd`, 2025-05-07) descends from the SHA and has test commits (“deneme”, “deneme2”, “deneme3”) by Ali Yurtsever, plus a PR merge. English translation of the original Turkish commit titles: “test”, “test two”, “test three”. `pushed_at` corresponds to this branch. This branch was not considered. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects --missing=print` at the SHA reports five missing promisor blobs; trees, metadata for the six commits and snapshot files were read locally, without network.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single application (Vite scaffold); no composition configuration references other units. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | No host composes units. |
| Q4 | No | No composition mechanism configured (`vite.config.ts:5–7`; recorded search). |
| Q5 | No | Q1–Q4 are No: scaffold with a topic list mentioning micro-frontends. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them” and “conventional frontend monoliths”, here at the scaffold stage.
- The term is study list content, as in 023. There is a minimal real application, hence `frontend_units: 1` and `single-unit`, rather than 0 as in profiles without implementation (011/064/068/073/077/101/111).
- `repo_type: other`: initial study or planning repository without the character of an MFE example, template or product. `ui_technologies: [react]`, `build_tools: [vite]`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** README in study topic list form, with “Micro Frontend” as an item, on a Vite scaffold.
- **Protocol (search):** the plural hit `"micro frontends"` has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE, Q1–Q5 No, one unit (`index.html` → `src/main.tsx` → `src/App.tsx`), `single-unit` and `other`; no open decision. Adopted correction: the sentence claiming no objects were missing was replaced (five missing promisor blobs, verified). Branch `origin/first` descends from the SHA, with `deneme` commits in `src/App.css` and a merge, and changes only `App.css` and README; it is not part of the assessed snapshot. English translation of the original commit label “deneme”: test.
