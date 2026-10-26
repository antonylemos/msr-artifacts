---
schema: 1
id: 1131427099
full_name: SmitArole/UX221-LAB-1
url: https://github.com/SmitArole/UX221-LAB-1
commit: 9e71a6d1827768b7c186b21bb8fd06017e7e8996
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
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

# 333 — SmitArole/UX221-LAB-1

## Context

Repository created from template `cd-wordpress` (“continuous deployment wordpress”), without site content: only the README, `package.json` delegating everything to external tool `wp-pwa`, devcontainer configuration, publication workflow and license (`README.md:1–11`; `package.json:1–11`). The template README says the site would be “a consumer of microfrontends” and cites a PayPal example in another repository (`README.md:13–15`). The snapshot has identical structure to draft 079. Description (“test my ability to use Wordpress”) and name indicate a course lab. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:334` records rank 333, ID 1131427099, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:334` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:23117` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:23124` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-01` | 2026-10-07T19:35:58.148Z / 2026-10-08T15:40:38.870Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-01` | 2026-10-07T22:10:28.465Z / 2026-10-08T15:48:46.710Z |

The effective queries append `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Hit metadata (identical in both rounds): description “The goal of this site is to test my ability to use Wordpress ”, no topics, null language, MIT license, `fork: false`, size 2, created at 2026-01-10T01:54:08Z, pushed at 2026-01-10T01:54:10Z.

**Spellings:** both appear in template `README.md:13`:
- “microfrontends” in “a consumer of microfrontends”;
- “microfrontend” in “an example microfrontend for paypal standard”.

The README exists only in the single commit, the SHA (2026-01-09T20:54:10-05:00, that is, 2026-01-10T01:54:10Z), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 6 entries, all regular files `100644`; zero symlinks and zero gitlinks. These are `.devcontainer/devcontainer.json`, `.github/workflows/main.yml`, `.gitignore`, `LICENSE.txt`, `README.md` and `package.json`. There is no `wp-content`, pages, themes or site code; `.gitignore:5` ignores `.wordpress`. | contrary |
| Configuration | `package.json:1–11`: only dependency `wp-pwa` and scripts `dev`/`start`/`preview`/`build` invoking it. `.github/workflows/main.yml:28–32`: publication through `diy-pwa/npm-build-2-gh-pages@v1.11`. | contrary |
| Documentation | `README.md:11–15`: continuous publication to gh-pages and “The idea of this is as a consumer of microfrontends. There is an example microfrontend for paypal standard here.” The example is in another repository (`diy-pwa/paypal-microfrontend`), and nothing in the snapshot consumes it. | weak |
| Technology / Configuration / Composition | Entire inventory read: no composition configuration, remote reference or code mounting units. Relative imports between units do not apply (there is no code). | absent |

## Authorship and history

Non-shallow clone. There is 1 commit (1 across all refs), without merges: `9e71a6d` (2026-01-09T20:54:10-05:00), author `SmitArole <arolem8@gmail.com>`, committer `GitHub`, “Initial commit”. This is the pattern of a template-generated repository through the GitHub interface; content is template `cd-wordpress`, without subsequent changes. `git rev-list --objects $SHA --missing=print` lists no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in the inventory; the PayPal example appears only in the README (`README.md:13`). |
| Q2 | No | There are no units. |
| Q3 | No | There is no host loading units; not even site content is versioned. |
| Q4 | No | No composition mechanism configured (`package.json:1–11`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”: the mention is inherited template text.
- Same case as draft 079 (template `cd-wordpress` without content, Non-MFE, `template`, 0 units). Unlike 119 and 125 (drafts), where the WordPress site was versioned and counted as one unit.
- `repo_type: template`, `frontend_units: 0`, `unit_organization: none`, empty technology arrays.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** template `cd-wordpress` README (“a consumer of microfrontends”, `README.md:13`) is replicated in every lab repository created from it. In the sample, the family already includes 079, 119 and 125 (drafts), and now this one.
- **Protocol (families/duplicates):** course exercise repositories (UX221/UX308) generated from the same template enter through terminology queries; filtering content identical to the template would avoid manual reassessment.
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).
