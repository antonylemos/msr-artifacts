---
schema: 1
id: 1257221343
full_name: TrevelinT/mba-mfe-product
url: https://github.com/TrevelinT/mba-mfe-product
commit: 84095623e00334b94dd4f0f6cac1a16f066770c8
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
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

# 225 — TrevelinT/mba-mfe-product

## Context

“Product MFE” (`README.md:1–7`): micro-frontend remote for product-details section (title, gallery and description), in React 19 + Vite 8 with `@originjs/vite-plugin-federation`. Exposes `./Product` to shell in another repository (“`product/Product` when consumed by the shell”, `README.md:7`). Runs independently at port 5001 and has CI, Changesets releases and own GitHub Pages deployment (`README.md:30–55`). Shell is absent from repository; README references it only through `../README.md` (`:28`). Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:226` records rank 225, ID 1257221343, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:226` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:31144` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:31152` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2026-06` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:37:56.959Z / 2026-10-08T16:00:28.526Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:07:22.535Z / 2026-10-08T16:09:37.872Z |

Effective queries append `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Hit metadata:
- null description, no topics, TypeScript language, `fork: false`, size 449;
- creation at 2026-06-02T13:29:13Z, push at 2026-08-30T21:34:55Z.

Retrieval comes from `README.md:3`, “Remote micro-frontend for the product details section (title, gallery, description).”. Phrase search treats hyphen as separator. Plural “micro frontends” does not appear literally; this hit depends on unrecorded GitHub search text processing.

Last README change is `3ebffe7` (2026-08-20), before October 2026 collections. README at the SHA is not later than searches.

In both rounds same account has three other candidates: `TrevelinT/mba-modular-monolith`, `mba-mfe-cart` and `mba-mfe-buy-box` (for example, `data/discovery/mfe-round-002/candidates.csv`). Only this is in sample (`sample.csv:226`); others were not inspected.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 54 entries, all regular files `100644`; zero symlinks and zero gitlinks. One Vite project: `index.html`, `src/` (API, components and tests), `public/` (fonts/images), `vite.config.ts`, `vite-federation-css-fix.ts`, release scripts and CI/Release/CD workflows. | context |
| Configuration (remote) | `vite.config.ts:12–22`: `federation({ name: "product", filename: "remoteEntry.js", exposes: { "./Product": "./src/components/product-container.tsx" }, shared: react/react-dom singleton })`. `:5`, `23`: federation CSS fix for Vite 8. `:29–38`: port 5001 with CORS. | strong |
| Source code | `src/components/product-container.tsx:6–26`: component loading product page and rendering view or skeleton; default and named exports. `src/main.tsx:5–10`: standalone mounting in `#app`. | moderate |
| Build/deploy | `package.json:10–24`: own `dev`, `build`, `preview`. `.github/workflows/cd.yml:1–70`: own GitHub Pages deployment from CI artifact on tag `v*`. `README.md:55`: “Point the shell product remote at the deployed `remoteEntry.js` path under that base.” | strong |
| Host | No host in snapshot; configuration has no `remotes`. README refers to shell outside repository (`README.md:28`, `55`). | ambiguous |
| Source code (boundaries) | Search for imports `../..`: no occurrence. Dependency `@trevelint/mfe-config` (`package.json:26`), shared configuration package. | context |

## Authorship and history

Non-shallow clone; 15 commits reachable from SHA, no merge (count of 16 included `32fb0be`, "Version packages", present only in `origin/changeset-release/main` and not SHA ancestor). 13 by Danilo Trevelin `<danilo.muller.trevelin@gmail.com>`, from 2026-06-02 (`949f2bf`, “feat: create project boilerplate”) to 2026-08-30 (`e0154c7`, “build: first release”), and 2 by `github-actions[bot]`, including SHA `8409562` (“Version packages (#2)”). Commit `5192c5c` (2026-08-20) says “update features to match modular monolith”. Branch `origin/changeset-release/main` was not considered. No historical blob was read. Clone is partial (`blob:none`) and `git rev-list --objects $SHA --missing=print` identifies 41 missing historical objects; standard workflow inspection encounters missing historical blob in rename detection, repeated with `--no-renames --name-status`. Cited current files are present.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend unit; federation configuration has only `exposes` (`vite.config.ts:15–17`), without referencing other units. |
| Q2 | Yes | Own entry, build, port, CI and deployment (`package.json:10–24`; `.github/workflows/cd.yml`). |
| Q3 | Undetermined | Shell is unobservable; README only asserts consumption (`README.md:7`, `28`, `55`). |
| Q4 | Undetermined | Mechanism prepared on remote side (`exposes`, `remoteEntry.js`); connection depends on absent shell. |
| Q5 | No | One unit prepared for composition by unobservable external host. |

## Rationale

- `MFE-unit` under rule “single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, with exception vector of finals 001/050/069/004/058.
- Matches “repositories containing only a remote unit, without the composing host”. Remote exposes functional page section with own data, not utilities (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (demonstration product page, with single-product images in `public/images/`, published on GitHub Pages).
- No decision remains open.

## Analysis notes

- **RQ2:** remote `@originjs/vite-plugin-federation` in Vite 8 with own CSS-fix plugin (`vite-federation-css-fix.ts`) and Changesets versioning.
- **Protocol (sample):** same-account repositories are in rounds, outside sample; family assessment may change Q3/Q4 if repository-family analysis is adopted.
- **Protocol (search):** plural hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with MFE-unit, No/Yes/Undetermined/Undetermined/No vector and `draft`: unit exposes functional product module (`./Product`) to absent shell, and both Undetermined answers are consumer-observation limits, persisting after local search, not open class decision. Adopted corrections: count of 15 commits (13 by Danilo Trevelin and 2 by `github-actions[bot]`, verified); `singleton: true` in `shared` (`vite.config.ts`) is unsupported field of interface `SharedConfig` in `@originjs/vite-plugin-federation@1.4.1` (`types/index.d.ts:260–319`, commented), so record "compartilhamento de React/ReactDOM configurado; flags singleton declaradas, sem suporte tipado nessa versão" (English translation: “React/ReactDOM sharing configured; singleton flags declared, without typed support in this version”), and build `tsc` does not validate this object (`tsconfig.json:20` includes sources, not Vite config); deployment citation should cover actual steps. Final comparators: 001, 050 and 069 (single remote with explicit exposure and absent consumer), with 004 and 058; no evidence of platform-exclusive plugin.
