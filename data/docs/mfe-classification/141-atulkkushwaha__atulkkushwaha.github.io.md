---
schema: 1
id: 834236828
full_name: atulkkushwaha/atulkkushwaha.github.io
url: https://github.com/atulkkushwaha/atulkkushwaha.github.io
commit: 0061673ff7e0605d5f7dab5f9cda1acb71a70f77
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 141 — atulkkushwaha/atulkkushwaha.github.io

## Context

Static personal site (user GitHub Pages) with resume and portfolio. It has a resume-style README and four self-contained HTML pages with inline CSS and JS (`README.md:1–7`; `index.html:1–83`). Micro-frontends and Module Federation appear only as declared skills and professional experience. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:142` records rank 141, ID 834236828, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:142` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:9240` and `data/discovery/mfe-round-002/candidates.csv:9246`, both with `terminology;technology` and `pass`.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same five hits in each round, all with subquery `#created:2024-07`, endpoint `repositories` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:16:23.663Z / 2026-10-08T16:13:37.605Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:19:19.247Z / 2026-10-08T15:53:20.709Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:50:20.115Z / 2026-10-08T16:05:00.025Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:24:30.406Z / 2026-10-08T15:37:00.959Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:06:33.008Z / 2026-10-08T15:46:38.663Z |

Effective query for each row appends `pushed:>=2025-04-01 created:2024-07-01..2024-07-31`.

Hit metadata: null description, no topics, HTML language, `fork: false`, size 13, creation at 2024-07-26T18:15:00Z, push at 2026-10-05T13:44:45Z. Without description, retrieval comes from README:
- “Micro Frontend”: `README.md:20`, `76`, `113`, `119`, `133`;
- “Micro Frontends”: `README.md:246`;
- “Module Federation”: `README.md:129`;
- “microfrontend”: only within suggested name “angular-microfrontend-demo” (`README.md:257`).

Joined plural form “microfrontends” is absent from README; this hit depends on unrecorded GitHub search text processing.

Last reachable change to `README.md` is `2d62d16` (2026-04-27T10:02:06+05:30). SHA (2026-10-05T13:44:38Z) only adds HTML pages. Both predate collections on 7 and 8 October 2026, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 5 entries, all regular files `100644`; zero symlinks and zero gitlinks. They are `README.md`, `index.html`, `AIFocusedEngineerPortfolio.html`, `FullstackProfessionalPortfolio.html` and `vscodeDemo.html`. No manifest, build, external scripts or assets. | contrary |
| Source code (UI) | `index.html:1–83`: resume page with inline CSS (`index.html:6–25`) and inline theme script (`index.html:79–81`). Other pages are equally self-contained, with own title (`AIFocusedEngineerPortfolio.html:2`; `FullstackProfessionalPortfolio.html:2`; `vscodeDemo.html:6`) and inline theme/animation script (`vscodeDemo.html:546–575`). No page loads or incorporates another (`git grep` for `<script`, `src=`, `<link`, `.html` and `<iframe`). | contrary |
| Documentation (MFE mentions) | `README.md:13–20`, `75–79`, `113–133` and `246` list “Micro Frontend Architecture” and Module Federation as skills and experience in third-party projects (BMW UK, Siemens Healthineers). `index.html:43`, `index.html:47`, `AIFocusedEngineerPortfolio.html:37`, `FullstackProfessionalPortfolio.html:37` and `vscodeDemo.html:447–448` repeat these mentions as resume text. `README.md:252–261` only suggests future repositories (“angular-microfrontend-demo”). | weak |
| Technology / Configuration / Composition (search) | `git grep -i` across entire SHA for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` and `wujie`: only resume texts above, no configured mechanism. | absent |

## Authorship and history

Non-shallow clone; 4 commits, no merge, all by `Atulkkushwaha <atulkkushwaha@users.noreply.github.com>`. According to `git log --no-renames --name-status`:
- root `de3800a` (2025-12-19) adds `README.md`;
- `2d62d16` (2026-04-27) changes README;
- `1271d9e` (2026-10-05) adds `vscodeDemo.html`;
- SHA `0061673` (2026-10-05, “portfolio sites”) adds `index.html` and other two pages.

History contains no application code beyond static pages. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Only one static site with independent HTML pages, without unit entries/builds or composition configuration (inventory; recorded search). Micro-frontends mentions are resume text (`README.md:20`, `129`). |
| Q2 | No | No frontend units with own entry and build; pages have no build. |
| Q3 | No | No page loads, mounts or routes another; no host or shell. |
| Q4 | No | No configured composition mechanism (recorded search). |
| Q5 | No | Q1–Q4 are No: personal resume mentioning micro-frontends without implementing them. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”, as profiles 011/064/068/073/077/101/111 where micro-frontends are a listed skill.
- Unlike those profiles (README only, `frontend_units: 0`), publishable HTML pages exist here. They are recorded as one static site (`frontend_units: 1`, `single-unit`), following static template 129. Even counted separately, they would be “multiple frontend applications without explicit composition”, and class would not change.
- `repo_type: other` (personal site/resume). `ui_technologies: []` and `build_tools: []`: inline HTML/CSS/JS without library or bundler.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** professional resume repeatedly mentioning “Micro Frontend” and “Module Federation” in README and pages, without corresponding artifact. Passed both rounds with eligibility `pass`.
- **Protocol (search):** five terminology/technology queries match same resume text. Hit for `microfrontends` has no corresponding spelling in README.

### Analyst–reviewer disagreement (unit granularity)

Independent reviewer (Lupa) agrees with Non-MFE, Q2 to Q5 No, `other`, `approaches: []` and empty technology arrays, and `draft`. Disagrees only with Q1 and count: would record Q1 Yes, `frontend_units: 4` and `unit_organization: monorepo`, because snapshot has four complete HTML documents (`index.html`, `AIFocusedEngineerPortfolio.html`, `FullstackProfessionalPortfolio.html` and `vscodeDemo.html`), each with own `<!DOCTYPE html>`, title and body, without loading others (verified: five tree files, without manifest or build, and no page references another). Class and Q2 to Q5 do not change in either scenario, since neither own build nor composition exists.

Retained `frontend_units: 1`/`single-unit` and Q1 No: four files are portfolio variants of same identity, published on one GitHub Pages site, without per-unit entry, build or configuration, and checklist does not specify granularity for independent static pages. Reviewer notes that, if rule counts same-identity variants as one unit per site, it should apply uniformly, and case 032 (HTML post pages within a single-entry React application) is not transferable. Counting independent static HTML documents remains for researcher, alongside pending server-rendered-page convention (118, 119, 125).
