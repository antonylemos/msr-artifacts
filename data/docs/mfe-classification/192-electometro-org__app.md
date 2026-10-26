---
schema: 1
id: 1147440284
full_name: electometro-org/app
url: https://github.com/electometro-org/app
commit: 2ca538163085797c8eac3b8a3aa7138389b24e3c
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

# 192 — electometro-org/app

## Context

“Electometro” (homepage `electometro.org`): React + Vite voting alignment webapp, a quiz with results, Peru and Chile elections, deployed on Cloudflare Workers. A single frontend application. Assets and Worker configuration come from two submodules (`external/peru-assets`, `external/cf-workers`). A Vercel microfrontends configuration existed and was removed (ADR 0002, `docs/DECISIONS/0002-architecture-refactor.md:30–31`; `CHANGELOG.md:38–39`). README still says the SPA is sometimes mounted under subpath `/electometro` of a “host microfrontend” (`README.md:299–301`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:193` records rank 192, ID 1147440284, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred; submodules were not obtained.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:193` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:24254` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:24261` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-02` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:59:56.167Z / 2026-10-08T15:41:20.219Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:11:17.037Z / 2026-10-08T15:49:10.515Z |

Effective queries append `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`.

Hit metadata:
- description “Voting Alignment WebApp”, without the terms;
- no topics, language JavaScript, `fork: false`, size 1,396;
- created at 2026-02-01T18:43:40Z, pushed at 2026-10-04T19:49:30Z.

The hit comes from `README.md:301`, “microfrontend. Hash routing avoids server rewrite requirements for deep links.”, continuing “mounted under a sub-path (`/electometro`) of a host” (`README.md:300`). Form “microfrontends” does not appear in README; that hit depends on GitHub search text processing, which is not recorded.

The README's last change in SHA history is `eb3d4b6` (2026-08-04), before October 2026 collection. The SHA's README does not postdate searches. `pushed_at` (2026-10-04) corresponds to one of the remote branches, rather than SHA (2026-08-04).

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 152 entries, 150 regular `100644` files and **2 gitlinks `160000`**: `external/cf-workers` (`dea6a02…`) and `external/peru-assets` (`ada4e0d…`), declared in `.gitmodules:1–8` (repositories `electometro-org/cf-workers` and `electometro-org/peru`). Objects are not in the clone. Zero versioned symlinks; symlinks `public`, `i18n` and `wrangler` to submodules are created locally (`AGENTS.md:24–27`). A single application in `src/` (contexts, hooks, widgets, elections). | context |
| Configuration / Build | `vite.config.js:1–5`, `178–180`: `react()`, `legacy()`, Cloudflare plugin and `base: '/electometro/'` (`ASSETS_SUBDIR`, `:28`). `package.json:6–19`, `20–49`: `vite build` and `wrangler deploy`, without federation, single-spa or import map dependencies. | contrary |
| Decision history | `docs/DECISIONS/0002-architecture-refactor.md:30–31`: “Remove the multi-target (`DEPLOY_TARGET`) matrix and Vercel/microfrontends configuration”. `AGENTS.md:28–29`, `91`: “do not reintroduce `vercel.json`, `microfrontends.json`…”, “Don't reintroduce Vercel/microfrontend config”. `CHANGELOG.md:38–39`: same removal. | contrary |
| Documentation (host mounting) | `README.md:299–301`: static SPA is “sometimes mounted under a sub-path (`/electometro`) of a host microfrontend”. `base` `/electometro/` and `HashRouter` support this path mounting. Host is not in the repository, and no snapshot artifact configures this integration. | ambiguous |
| Search | `git grep -i` at the SHA (except lockfiles) for `micro.?front`, `federation`, `remoteEntry` and `single-spa`: only `README.md:301`, `AGENTS.md:29`, `91`, `CHANGELOG.md:39` and cited ADR. | absent |

## Authorship and history

Non-shallow clone. There are 441 commits reachable from the SHA (37 merges; 524 across all refs). Authors are `seffs`/“Seff” (noreply, 417 total at the SHA), `chrissummer1311` (23) and `nicolasleonri` (1). Root is `57ee939` (2026-02-04, “Initial release”); SHA is `2ca5381` (2026-08-04, “fix(wrangler): restore wrangler.toml”). History records Vercel deployment (`7255e5d`, 2026-05-11, “feat: deploy into vercel”) and revision of that migration (`eb5de1d`, 2026-08-04). Eight remote branches (`feat/*`, `architecture/analytics` etc.) were not considered. `git log -S microfrontends.json` did not complete because of a missing blob in the partial clone (`dc1cc5d9…`), which was not fetched; the clone remained unchanged.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application; no composition configuration in the snapshot. Submodules are assets and Worker configuration, rather than frontend units. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | Repository contains no host. Mounting under an external host is only mentioned (`README.md:299–301`). |
| Q4 | No | No configured composition mechanism; Vercel microfrontends configuration was removed (`docs/DECISIONS/0002-architecture-refactor.md:30–31`; `AGENTS.md:28–29`). |
| Q5 | No | Q1–Q4 are No: single SPA whose host integration is external and only through a subpath. |

## Rationale

- Proposed `Non-MFE` with `status: review`. Matches “conventional frontend monoliths” and, historically, “MFE-related dependencies that are unused”: microfrontends configuration existed and was deliberately removed.
- Review is justified by README phrase about mounting under a “host microfrontend” subpath, together with `base: '/electometro/'`. This is path composition (host routing/linking), the type in open checklist decision “Link-only or iframe composition”, here without observable host or configuration.
- MFE-unit cannot safely apply: preparation is only serving the SPA under a base path, without `exposes`, lifecycles, custom element or registration.
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`. `repo_type: production` (public site, Cloudflare deployment).

## Analysis notes

- **RQ1 (misleading signals):** project abandoning a microfrontends configuration (Vercel) but retaining references in README, ADR, CHANGELOG and agent instructions.
- **RQ3:** history records passage through Vercel microfrontends and return to a single build. Potentially interesting as a reversal case, outside the snapshot.
- **Protocol (search):** plural hit has no literal spelling in README. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

Decide whether mentioning mounting under an external host subpath (`README.md:299–301`), with dedicated `base` and no snapshot composition configuration, suffices to treat repository as a unit prepared for composition.

- **Non-MFE (proposed):** no configured mechanism; MFE configuration was removed (ADR 0002), and case reduces to an SPA served under a path.
- **MFE-unit:** if path composition (zones, links) counts as a mechanism and `base` with `HashRouter` is explicit preparation for the external host.

No new rule is proposed. Until a decision, preserve `Non-MFE`/`review`.
- **Independent review contribution (Lupa):** agreement with Non-MFE (provisional) and `review`; no basis for promotion to `final`. Q1 through Q5 No correctly describe the snapshot under a literal checklist reading; the real alternative is MFE-unit through subpath mounting: README says SPA is sometimes mounted under `/electometro` of a host microfrontend (`README.md:299–301`), Vite configures that `base` (`vite.config.js:212–221`) and application uses `HashRouter`. Repository does not contain host configuration, and checklist leaves open whether path composition counts; that rule is unresolved, rather than an MFE configuration with obscure use. Missing submodules are identified as translation assets and backend/Worker (`external/peru-assets`, `external/cf-workers`), rather than frontend applications or remotes. Traceability corrections: Q1, Q2 and Q5 should cite `src/main.jsx:13–31`, `src/App.jsx:2,302–328` and `vite.config.js:212–221`; symlinks `public`, `i18n` and `wrangler` described in `AGENTS.md:25–27` do not exist in the inspected clone (submodules are empty), and should be presented as expected, unmaterialized configuration, rather than observed checkout content, so build and external configuration were not fully resolved offline. Historical search `git log -S'microfrontends.json'` and broad `git log --name-status` traversal fail because of missing promisor blobs (`dc1cc5d…`, `aacaae4…`), and local refs show 16 branches besides `origin/HEAD`.
