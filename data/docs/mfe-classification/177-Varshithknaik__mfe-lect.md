---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
url: https://github.com/Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [webpack]
frontend_units: 7
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 177 — Varshithknaik/mfe-lect

## Context

“MFE learning project” (`README.md:1–5`): webpack 5 Module Federation learning project, with React shell (`container`), React remotes `marketing` and `auth` and a “legacy” Vue dashboard. The snapshot has two parallel trees:
- at the root, `container/`, `marketing/` and `auth/`, incrementally developed by the author, with deployment workflows; `dashboard/` has only `package.json`;
- `packages/`, a complete copy with `container`, `marketing`, `auth` and `dashboard`, added in a single commit and never changed.

The README refers to `docs/README.md` (`README.md:7`), absent from the snapshot. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:178` records rank 177, ID 1063353073, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:178` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:19183` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:19189` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-09` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T23:20:08.640Z / 2026-10-08T16:15:51.112Z |

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 185;
- created at 2025-09-24T14:04:39Z, pushed at 2026-07-26T16:44:32Z.

The hit comes from `README.md:3`, “…a webpack Module Federation learning project…”, the only occurrence. The README was rewritten in the SHA itself, `deea335` (2026-07-26), changing only `README.md` and `.gitignore` (`git diff-tree`). It precedes October 2026 collection, and the SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 89 entries, all regular `100644` files (includes `.DS_Store` and `.vscode/settings.json`); zero symlinks and zero gitlinks. Root contains `container/`, `marketing/` and `auth/`, each with `package.json`, `config/webpack.{common,dev,prod}.js` and `src/`; `dashboard/` has only `package.json`; three workflows in `.github/workflows/`. `packages/` contains four complete packages. No root workspace. | context |
| Configuration (host, root) | `container/config/webpack.dev.js:17–25`: `remotes` `marketing` (`localhost:8081`) and `auth` (`localhost:8082`). `container/config/webpack.prod.js:15–23`: same at `${domain}/<pacote>/latest/remoteEntry.js` (original placeholder means package), with `dashboard` commented (`:20`). | strong |
| Configuration (remotes, root) | `marketing/config/webpack.dev.js:17–25`: `exposes: { './MarketingApp': './src/bootstrap' }`. `auth/config/webpack.dev.js:17–25`: `exposes: { './AuthApp': './src/bootstrap' }`. | strong |
| Source code (composition, root) | `container/src/App.js:14–15`, `34–46`: wrapper `lazy` and routes `/auth/*` and `/*`; `dashboard` commented (`:16`, `40–43`). `container/src/components/MarketingApp.js:1`, `12–27` and `AuthApp.js:1`, `11–27`: remote `import { mount }` and navigation synchronization. `marketing/src/bootstrap.js:7–19`: `mount` with memory history and `createRoot`. | strong |
| Build/deploy | `.github/workflows/container.yml:7–12`, `25–30`, `auth.yml:7–12`, `23–28` and `marketing.yml:7–12`, `23–28`: one workflow per root package, with `paths` filter, `aws s3 sync` to `/<pacote>/latest` (original placeholder means package) and CloudFront invalidation. | strong |
| `packages/` copy | `packages/container/config/webpack.dev.js:17–25`: `remotes` `marketing`, `auth` and `dashboard`. `packages/container/src/App.js:8–10`, `29–37`: three `lazy`, including Dashboard. Blobs differ from root counterparts (for example, `container/config/webpack.dev.js` versus `packages/container/config/webpack.dev.js`), except identical `auth/src/bootstrap.js`. The tree entered in `9584f06` (2025-10-05) and was never changed again. No workflow references it. | context |
| Source code (boundaries) | Searching for `../../` imports at the SHA returns nothing. Both trees do not import each other; cross-package imports are only federated. | context |

## Authorship and history

Non-shallow clone; 40 commits, 1 merge (`2710964`), all by `Varshith K <varshithknaik@gmail.com>`.
- **Dates:** from 2025-09-24 (`256e049`, “first commit”) to 2025-11-06 (`b3e0b20`), plus SHA `deea335` (2026-07-26).
- **Root evolution:** according to `git log`, 23 commits in `container/`, 13 in `marketing/` and 8 in `auth/`. They introduce navigation, `initialPath`, workflows and `onSignIn`, with conventional commit messages.
- **`packages/` copy:** has a single commit, `9584f06`, together with root `dashboard/`.
- **SHA:** message is “Please provide the changes or files you would like summarized so I can generate the commit message for you.”, consistent with an automatic message generator.

No historical blob was read. `git show --stat` of the SHA did not complete because of a missing blob in the partial clone (`195ea731…`), which was not fetched; the clone remained unchanged.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | In the root tree, `container` and remotes `marketing` and `auth` are referenced by composition configuration (`container/config/webpack.dev.js:20–23`). |
| Q2 | Yes | Each package has its own entry, build and deployment (`config/webpack.*.js`; per-package workflows with `paths`), without source code imports between them. |
| Q3 | Yes | Container mounts remotes by route (`container/src/App.js:34–46`). |
| Q4 | Yes | Module Federation configured in host and remotes, consumed through `import { mount }` and called in wrappers (`MarketingApp.js:13`; `AuthApp.js:12`). |
| Q5 | Yes | Q1–Q4 are Yes: shell with two remotes and independent deployment. Copy `packages/` repeats the pattern with four packages. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- The chain is complete in the snapshot, as in 076/084/096/106/109. Remotes expose applications mounted by route, rather than shared components (089/100). As in 174, structure follows a course outline (container/marketing/auth/dashboard with `mount` and S3/CloudFront deployment), but composition is implemented. Not reduced to content or an exercise without composition (023/094).
- `frontend_units: 7` counts seven buildable units: three in the root tree (container, marketing and auth) and four in `packages/` (container, marketing, auth and Vue dashboard, participating in configured and consumed composition, `packages/container/config/webpack.dev.js:17–25`; `packages/container/src/App.js:8–10`, `29–37`). Root `dashboard/` has only a manifest, without entry or source, and does not count. Follows final 007's aggregation convention (five units when assessing two independent examples in one repository). Initial draft counted 3, treating `packages/` as a parallel copy outside workflows; reviewer count was adopted. `ui_technologies: [react, vue]`, `build_tools: [webpack]`, `unit_organization: monorepo`, `repo_type: example`.
- No class decision remains open.

## Analysis notes

- **RQ2:** integration through `mount(el, { onNavigate, initialPath, onSignIn })` with React Router 6 in shell and memory history in remotes.
- **RQ3:** two versions of the same architecture in one snapshot: author's evolving version with CI, and a static reference copy in `packages/`. Current README points to absent documentation (`docs/README.md`).
- **Protocol (search):** entry only through query `"module federation"`. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented and Q1–Q5 Yes; no open decision (`draft`). Adopted field disagreement: `frontend_units: 7` and `ui_technologies: [react, vue]`, under final 007's aggregation convention and because the four `packages/` packages form configured and consumed composition (final 006 excludes only the fifth application for not participating in composition); duplicated names and implementations are context and do not make the second tree dead code. Records: `git show --stat` fails because of a missing partial clone blob (`195ea73…`), affecting only historical statistics; `README.md:7` points to `docs/README.md`, absent at the SHA.
