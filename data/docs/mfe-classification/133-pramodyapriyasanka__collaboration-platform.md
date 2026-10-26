---
schema: 1
id: 1217014736
full_name: pramodyapriyasanka/collaboration-platform
url: https://github.com/pramodyapriyasanka/collaboration-platform
commit: e0beccb6235e08bdc799c9c006ccf04eb2029525
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 133 — pramodyapriyasanka/collaboration-platform

## Context

Next.js institutional site (App Router) for product “Hela Ahasa”, built on a landing-page template: manifest is named `startup-nextjs` version 2.2.1 and home retains metadata “Free Next.js Template for Startup and SaaS” (`package.json:2–3`; `src/app/page.tsx:14–17`). README declares a “Micro-frontend inspired” structure, but snapshot is one Next app without composition. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:134` records rank 133, ID 1217014736, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:134` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:28816` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:28822` (`terminology`, `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-04` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-04-30` | 2026-10-07T22:34:23.585Z / 2026-10-08T15:59:00.892Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-04` | `"micro frontends" … created:2026-04-01..2026-04-30` | 2026-10-07T23:02:41.710Z / 2026-10-08T16:08:48.189Z |

Hit metadata: null description, no topics, TypeScript language, `fork: false`, creation at 2026-04-21T13:10:08Z, push at 2026-04-21T15:34:28Z. By elimination, retrieval comes from README. `README.md:71` contains “**Architecture:** Scalable Micro-frontend inspired structure”, hyphenated singular spelling. No plural form exists in README; hit for `"micro frontends"` depends on unrecorded GitHub search text processing.

Last README change is SHA itself, `e0beccb` (2026-04-21T21:04:27+05:30), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 114 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are 34 PNG/JPG images, SVGs, one video and one Next project at root (`package.json`, `next.config.js`, `tsconfig.json`, `src/app`, `src/components`, `src/types`). No second manifest, subproject or `node_modules`. | contrary |
| Source code (UI) | `src/app/layout.tsx:11–35`: root layout with `Header`, `{children}`, `Footer` and `Providers` (theme). `src/app/page.tsx:1–35` composes home from sections imported from `@/components`. Other routes (`src/app/about`, `blog`, `contact`, `demo`, `privacy-policy`, `security`, `tos`) are pages of same App Router. `src/app/demo/page.tsx:82–147` is a static form without `action` or handler. | contrary |
| Source code (boundaries) | Search for `../` in `src`: `src/app/layout.tsx:7` (`../styles/index.css`) and `../Common/SectionTitle` in six components (for example, `src/components/Video/index.tsx:6`). Remaining imports use alias `@/`. Everything stays within same `src`; no second unit exists whose boundary could be crossed. | context |
| Configuration / Build/deploy | `package.json:5–10`: one `next dev`/`next build` cycle. `next.config.js:2–12` configures only `images.remotePatterns`, without `rewrites`, zones or federation. Next 16.2.4 and React/ReactDOM 19.2.5 are resolved in `package-lock.json:4461–4462`, `5016–5017` and `5025–5026`. | contrary |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfile, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `multi.?zone`, `rewrites` and `zones`: sole hit in `README.md:71`. Lockfile contains neither `federation` nor `single-spa`. | absent |
| Documentation (MFE claim) | `README.md:66–71` lists Next.js, React, Tailwind, Hooks/Context and “Scalable Micro-frontend inspired structure”, without identifying units or mechanism. Versions diverge: `README.md:8` and `README.md:67` say Next.js 14 and `README.md:9`/`README.md:68` React 18, whereas manifest declares `next` `^16.2.4` and `react` `^19.2.0` (`package.json:15`, `18`). | weak |
| Documentation (origin) | `package.json:2–3` (`startup-nextjs`, `2.2.1`), `src/app/page.tsx:15–16` (“Free Next.js Template for Startup and SaaS”, “Startup Nextjs Template”) and third-party brand logos in `public/images/brands/` indicate base in a public landing-page template. Template structures one app, not a third-party MFE platform. | context |

## Authorship and history

Non-shallow clone; 6 commits, no merge, root `5d7385a` (“My cleaned project push”, 2026-04-21T18:41:04+05:30), adding entire project. Following commits, all that day, change only README (`da0b154`, `1d0093a`, `7f71ae3`, `e0beccb`) or add screenshots (`eba38af`). All have noreply email `143013116+pramodyapriyasanka@users.noreply.github.com`, with names “pramodya priyasanka” (1) and “Pramodya Priyasanka” (5). `git log --no-renames --name-status` shows `src/`, `package.json` and `next.config.js` appear only at root. History records neither evolution from template nor distinction between own and inherited code. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend unit, root Next app (`package.json:5–10`; `src/app/layout.tsx:11–35`). No composition configuration references external units (recorded search). Phrase in `README.md:71` identifies no units. |
| Q2 | No | Without two units, no independent entries or builds exist; pages and sections share same build and import `@/components` (`src/app/page.tsx:1–11`). |
| Q3 | No | Root layout wraps same App Router routes (`src/app/layout.tsx:25–32`), without host or shell mounting distinct units. |
| Q4 | No | `next.config.js:2–12` configures no composition, and no mechanism was found (recorded search). |
| Q5 | No | Q1–Q4 are No: monolithic landing page labeled “Micro-frontend inspired” without corresponding implementation. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them” and “conventional frontend monoliths”. No external-host preparation exists, so `MFE-unit` does not apply.
- As in 023 and 129, self-declaration (“Micro-frontend inspired structure”) is insufficient without units and mechanism. Third-party template base does not resemble 074/080/102: template is one landing-page app, not a composition platform.
- `repo_type: production`: repository presents itself as product “Hela Ahasa” site (`README.md:4–6`; `src/app/demo/page.tsx:36–39`), not educational example or reusable template. No homepage or deployment is configured, and demo form sends no data. Type classification is recorded as uncertain.
- `ui_technologies: [react, next]`. `build_tools: []`, under Next bundler-encapsulation convention without explicit configuration. `frontend_units: 1` / `single-unit`.
- No decision remains open: no iframe, link between applications or build-time composition.

## Analysis notes

- **RQ1 (misleading signals):** label “Micro-frontend inspired structure” in README (`README.md:71`) is sole signal. Alongside documented versions diverging from manifest, it indicates descriptive text unchecked against code.
- **Protocol (search):** without description or topics, retrieval can only come from README. Plural hit has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE, Q1–Q5 No, `frontend_units: 1`, `single-unit`, `[react, next]` and `build_tools: []`; no open architectural decision. README predates searches (last change at SHA itself, 2026-04-21) and retrieval origin, hyphenated `Micro-frontend` in README, is inferred by elimination. Field disagreement without Q1–Q5 effect: reviewer recommends `repo_type: template` instead of `production`, because package retains origin-template identity (`package.json` with `name: startup-nextjs`, `version: 2.2.1`) and no operational evidence of complete product exists. Retained `production` (presentation as product "Hela Ahasa" site) and recorded alternative for researcher, in pending `repo_type` harmonization.
