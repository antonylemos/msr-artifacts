---
schema: 1
id: 864279586
full_name: metayoub/Qodly_DropZone
url: https://github.com/metayoub/Qodly_DropZone
commit: fef8994e8aad0a3e96f7eccd678856f0ad046037
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: library
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 379 — metayoub/Qodly_DropZone

## Context

Custom component (“DropZone”, file upload) for Qodly Studio, a third-party low-code platform (`README.md:1–12`). The project follows the platform model: `package.json` with `app_id` and author “Qodly Team” (`package.json:2–11`) and build through CLI `qodly build` (`:14`). In production, `vite.config.ts` publishes `./components` as a Module Federation remote (`@module-federation/vite`, `filename: 'components.js'`), loaded by Qodly Studio. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:380` records rank 379, ID 864279586, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:380` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:10114` and `data/discovery/mfe-round-002/candidates.csv:10120`, both with `pass`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns a single hit in each round. It comes from endpoint `code`, query `technology-module-federation-package-code` (`"@module-federation" filename:package.json`), subquery `…#size:1600..1799`, `path` `package.json`. Collections are 2026-10-07T19:26:03.130Z (001) and 2026-10-08T15:42:01.160Z (002).

The file has 1.717 bytes at the SHA and declares `"@module-federation/vite": "^1.9.4"` (`package.json:31`). Code hit metadata has no description, topics or dates. Entry is through code only; the README mentions neither micro-frontends nor Module Federation.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 34 entries, 33 regular files `100644` and 1 executable `100755` (`public/monaco_theme.json`); zero symlinks and zero gitlinks. A Vite project with component `src/components/DropZone/` (`build`, `config`, `render`, `settings`) and the Qodly editor development environment. | context |
| MF remote | `vite.config.ts:11–13`, `40–76`: `federation({ name: app_id, filename: 'components.js', exposes: { './components': './src/components/index.tsx' }, library: { type: 'var' }, shared: { react, react-dom, react/jsx-runtime, @ws-ui/* } })`, only in the production build. `src/components/index.tsx`: exports `{ DropZone }`. | strong |
| Platform | `package.json:2–11`, `14–15`: `app_id`, author “Qodly Team”, `qodly build`/`qodly new component`. Qodly editor dependencies `@ws-ui/*` (`:20–23`, `47–51`). The host loading `components.js` is Qodly Studio, outside the repository. | context |
| Family | The rounds contain 16 `metayoub/*` candidates, almost all Qodly components (`qodly_chart`, `qodly_datagrid`, `qodly-calendar` etc.). Only this one is in the sample; the others were not inspected. | context |

## Authorship and history

Non-shallow clone; 31 commits across all refs, 2 merges, from 2024-09-27 to 2026-05-19 (SHA `fef8994`, “support i18n”). Authors are Ayoub METWALLI (26) and Tihouna Nasrallah (5, two through the GitHub interface). Branches `dev` and `feat/compressPicture` were not considered. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single unit, prepared as a remote; the host (Qodly Studio) is neither in the repository nor referenced. |
| Q2 | Yes | The component has its own build and is published separately (`qodly build`; `vite.config.ts:40–76`). |
| Q3 | Undetermined | The host loading `components.js` is not observable. |
| Q4 | Undetermined | There is `exposes`, but host composition is not observable. |
| Q5 | No | MF is the official extension mechanism of a third-party platform (Qodly), not a decomposition by the author, as in finals 037 and 010. |

## Rationale

- `Non-MFE` under the vector of final 037 (q1 no, q2 yes, q3/q4 undetermined, q5 no), which treats remotes serving as official platform extensions as `Non-MFE`. Final 010, also from the Qodly ecosystem, was `Non-MFE` because MF signals came from platform artifacts.
- Under the literal checklist it would be `MFE-unit` (remote with `exposes`), but the platform precedents’ Q5 override applies.
- **Fields:**
  - `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`;
  - `frontend_units: 1`, `unit_organization: single-unit`;
  - `repo_type: library` (reusable platform component).
- There is no open decision.

## Analysis notes

- **RQ2:** low-code platform using Module Federation (`library.type: 'var'`, `@ws-ui/*` singletons) as the format for third-party component plugins.
- **Protocol (sample):** a family of 16 Qodly components by the same author is in the rounds.
- **Protocol (search):** entry only through a declared `package.json` dependency. Eligibility `pass` in both rounds.
