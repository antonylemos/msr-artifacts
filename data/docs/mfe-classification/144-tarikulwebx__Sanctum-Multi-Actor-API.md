---
schema: 1
id: 1256232082
full_name: tarikulwebx/Sanctum-Multi-Actor-API
url: https://github.com/tarikulwebx/Sanctum-Multi-Actor-API
commit: 7f41b77806f478bd4fc773e5fb0d4fcd987140d0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 144 — tarikulwebx/Sanctum-Multi-Actor-API

## Context

Laravel 13 **API-only** reference application demonstrating Sanctum bearer-token authentication for multiple user models (customers and administrators) consumed by external SPAs (`README.md:1–3`; `composer.json:3–16`). Repository contains no frontend. Search hit for `"single-spa"` comes from expression “a single SPA backend” (`README.md:3`), not single-spa library. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:145` records rank 144, ID 1256232082, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:145` records strategy `technology` and eligibility `unknown`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:31085` and `data/discovery/mfe-round-002/candidates.csv:31093`, both with `technology` and eligibility `unknown`.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2026-Q2` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:35:29.231Z / 2026-10-08T16:21:38.477Z |

Hit metadata:
- description “Reference Laravel API: multi-actor Sanctum auth for SPAs (bearer tokens + abilities).”;
- topics `api`, `authentication`, `laravel`, `laravel-sanctum`, `php`, `rest-api`, `sanctum` and `spa`;
- PHP language, `fork: false`, creation at 2026-06-01T15:26:32Z, push at 2026-06-01T15:29:52Z.

Description has “for SPAs” but not sequence “single SPA”. By elimination, retrieval comes from `README.md:3`, “…in a single SPA backend using **Sanctum personal access tokens**…”. Spelling is “single SPA”, with space; GitHub phrase search treats hyphen in `"single-spa"` as separator. No SHA file contains `single-spa` or `singlespa`.

Last README change is SHA itself, `7f41b77` (2026-06-01T21:29:45+06:00), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 74 entries, all regular files `100644`; zero symlinks and zero gitlinks. Structure is Laravel (`app/`, `bootstrap/`, `config/`, `database/`, `routes/`, `public/index.php`, `tests/`, `composer.json`/`composer.lock`) plus Postman collection in `docs/`. No `package.json`, bundler configuration, `resources/` with views or any JS/TS/Vue/JSX file. | contrary |
| Documentation (scope) | `README.md:3`: “Laravel 13 API-only reference application”. `AGENTS.md:25`: “This is an API-only Laravel application. There is no Vite, npm, Blade UI, or frontend asset pipeline.” `README.md:33–36` and `README.md:425–431` treat user/admin SPAs as external clients. `README.md:403` contains illustrative client `fetch` snippet. | contrary |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `vite`, `webpack` and `package.json`. Only hits are `AGENTS.md:25` (denying Vite/npm), `README.md:403` (`VITE_API_URL` in client snippet) and a Symfony package restriction in `composer.lock:3712`. No composition mechanism. | absent |
| Source code | `routes/api.php`, `routes/api/*.php` and `app/Http/Controllers/V1/*` are backend HTTP routes/controllers, without UI layer. | context |

## Authorship and history

Non-shallow clone; 9 commits, no merge, all by Md. Tarikul Islam `<tarikulwebx@gmail.com>` on 2026-06-01. Root `e45eb39` (“Laravel base”) is followed by “API only setup” (`8a1547e`), authentication, password reset, Postman collection and README (`ac177fc`, `7f41b77`). History records a Laravel scaffold with `resources/css/app.css`, `resources/js/app.js` and `resources/views/welcome.blade.php` at root (`e45eb39`), removed in "API only setup" (`8a1547e`); no MFE composition signal exists. No historical blob was read. Traversal of `app/` and `routes/` through `git log --name-status` fails with `GIT_NO_LAZY_FETCH=1` when requesting unavailable promisor objects in partial clone (no network), limiting claim of path-history completeness, but not reading current commit.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in repository (inventory; `AGENTS.md:25`). README SPAs are external clients unreferenced by composition configuration. |
| Q2 | No | Without frontend units, no entries or builds require evaluation. |
| Q3 | No | No host, shell or root frontend configuration exists. |
| Q4 | No | No configured composition mechanism (recorded search). |
| Q5 | No | Q1–Q4 are No: API-only backend retrieved through expression “single SPA backend”. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Repository has no frontend implementation; retrieval is lexical.
- Same lexical false positive for query `"single-spa"` observed in 131 (“Single SPA”). Here there is not even a repository SPA, only API serving one.
- `frontend_units: 0` and `unit_organization: none`, as frontend-less profiles (011/064/068/073/077/101/111), although this is an actual software project (backend).
- `repo_type: example`: “reference application” (`README.md:3`) with package `experiments/sanctum-multi-actor-api` (`composer.json:3`). `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** second case where `"single-spa"` matches expression “single SPA”. Together with 131, indicates technology query captures common SPA text.
- **Protocol (eligibility):** eligibility `unknown` in both rounds, without examining reason here. Language (PHP) or absent-frontend filters would eliminate candidate.
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE and Q1–Q5 No (Laravel/Sanctum API, without `package.json` or UI sources in snapshot); no open decision. Adopted correction: history is not frontend-free, as root supplies conventional scaffold removed in `8a1547e` (verified). Reproducibility caveat: with lazy fetch disabled, traversal of `app/` and `routes/` encounters missing promisor objects.
