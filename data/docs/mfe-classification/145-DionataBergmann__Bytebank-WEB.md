---
schema: 1
id: 976783667
full_name: DionataBergmann/Bytebank-WEB
url: https://github.com/DionataBergmann/Bytebank-WEB
commit: 3f897860c06307eb4a3515123e722e125f1e6a45
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: example
approaches: [single-spa]
ui_technologies: [react, next]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 145 — DionataBergmann/Bytebank-WEB

## Context

“Bytebank”: financial-management Next.js app (Pages Router) for FIAP’s Frontend Engineering MBA (`README.md:1–3`). It received a single-spa block in July 2025. On client, `_app.tsx` loads SystemJS, injects an import map with module `bytebank-investments` and registers a single-spa application active at `/investments` (`src/pages/_app.tsx:13–19`; `src/single-spa-init.ts:1–36`). Module URL comes only from variable `NEXT_PUBLIC_MFE_INVESTMENTS_URL`, undefined in repository. External unit is absent from snapshot. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:146` records rank 145, ID 976783667, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:146` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:13599` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:13605` (`technology`, `pass`); candidate metadata contain null description.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from code search with `path` `package.json`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `technology-single-spa-package-code#size:1000..1149` | `"single-spa" filename:package.json size:1000..1149` | 2026-10-07T22:15:19.330Z / 2026-10-08T15:58:53.357Z |

Matched file is root `package.json` (1.004 bytes at SHA, within range), declaring `"single-spa": "^6.0.3"` in `package.json:26`. Retrieval does not depend on README, which mentions neither micro-frontends nor single-spa. README and SHA (2025-08-04) predate October 2026 collections.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 68 entries, all regular files `100644`; zero symlinks and zero gitlinks. One Next project at root (`package.json`, `next.config.ts`, `src/pages`, `src/components`, `src/store`, `Dockerfile`), with `yarn.lock` and `package-lock.json`. No second manifest or sources of unit `bytebank-investments`. | context |
| Source code (single-spa registration) | `src/single-spa-init.ts:1–16`: in browser, loads SystemJS from CDN and injects `<script type="systemjs-importmap">` with `react`, `react-dom` and `'bytebank-investments': mfeUrl`, where `mfeUrl = process.env.NEXT_PUBLIC_MFE_INVESTMENTS_URL`. `src/single-spa-init.ts:18–30`: `registerApplication({ name: 'bytebank-investments', app: () => System.import('bytebank-investments'), activeWhen: pathname startsWith '/investments' })` and `start()`. This module is imported in `src/pages/_app.tsx:16–18`. | strong |
| Configuration (external-unit location) | Sole source of remote URL is `NEXT_PUBLIC_MFE_INVESTMENTS_URL` (`src/single-spa-init.ts:6`), without default value. `.env.example:1` defines only `NEXT_PUBLIC_API_URL`. No other configuration file, README or script informs where unit is published. Without variable, `JSON.stringify` omits key and import map lacks module. | ambiguous |
| Source code (mounting point) | `src/pages/investments.tsx:1–5` only renders `<div id="root" className="w-full h-full" />`. Menu leads to `/investments` (`src/components/layout/MainLayout/index.tsx:10–15`). Local component `src/components/pages/InvestmentsPage/index.tsx:16–43` exists, but no page imports it (`git grep InvestmentsPage`). | moderate |
| Source code (dead code) | `src/microfrontends.ts:3–17` defines `registerMicrofrontends` with same registration, but no file imports function (`git grep registerMicrofrontends`). | context |
| Source code (boundaries) | Search for `from '../` in `src`: only internal imports (for example, `src/components/ui/BalanceCard/index.tsx:4` → `store/transactionSlice`; `src/components/ui/TransactionList/index.tsx:4–5`). No external-unit code; connection is only name `bytebank-investments` in import map and registration. | context |
| Technology | `package.json:19–27`: `next` 15.3.1, `react`/`react-dom` 18.2.0, `single-spa` ^6.0.3 and `systemjs` ^6.15.1. `yarn.lock:2090–2091` resolves `single-spa` 6.0.3 and `yarn.lock:2168–2169` resolves `systemjs` 6.15.1. `package-lock.json` is outdated: `react` 19.1.0 in `package-lock.json:3083–3084`. Import map points to CDN `react`/`react-dom` 18.2.0 (`src/single-spa-init.ts:11–12`). | context |
| Negative search | `git grep -i` at the SHA (except lockfiles) for `micro.?front`, `federation`, `remoteEntry`, `customElements`, `<iframe`, `qiankun` and `wujie`: only identifier `registerMicrofrontends` (`src/microfrontends.ts:3`). | absent |

## Authorship and history

Non-shallow clone; 55 commits, 18 merges, root `2eb23fb` (2025-05-02, “Estrutura inicial do projeto”; English translation: “Initial project structure”). Authors: `DionataBergmann <dionata.podewils@outlook.com>` (33) and `Dionata Bergmann <67449438+DionataBergmann@users.noreply.github.com>` (22), same owner. `5e2a3a8` (2025-07-27, “Implement microfrontend structure using Single SPA”) adds `src/microfrontends.ts` and `src/single-spa-init.ts` and changes `_app.tsx`, `investments.tsx` and `package.json` (`git log --no-renames --name-status`). Following commits fix build and menu. Remote branches `feature/*` and `fix/*` correspond to PRs, including `origin/feature/microfrontend-init` (`5e2a3a8`); none was considered beyond SHA. One merge records origin `DionataBergmann/Gerenciador-Financeiro` (`ac7e31a`), former repository name. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units: Next host (`src/pages/_app.tsx`) and external unit `bytebank-investments`, explicitly registered in single-spa composition configuration (`src/single-spa-init.ts:21–27`). |
| Q2 | Yes | Host has own entry and build (`package.json:5–12`), and external unit would be loaded as separate SystemJS module (`src/single-spa-init.ts:13`, `24`), without source-code import between them. External artifact is not observable. |
| Q3 | Yes | Host registers application, activates it at `/investments` and provides route and container (`src/single-spa-init.ts:22–29`; `src/pages/investments.tsx:1–5`; `src/components/layout/MainLayout/index.tsx:13`). |
| Q4 | Undetermined | Mechanism is configured and called at runtime (`src/pages/_app.tsx:16–18`; `src/single-spa-init.ts:18–30`), but unit location depends on variable undefined in repository (`src/single-spa-init.ts:6`; `.env.example:1`). Under criterion, “a configuration whose actual use is unclear is Undetermined”. |
| Q5 | Undetermined | No No answer and Q4 Undetermined. |

## Rationale

- `Uncertain` under rule “No question is No, but at least one is Undetermined”, with `status: review`.
- Close to 087 (single-spa host registering external remote through loader), proposed as `MFE-implemented`, but with material difference. In 087 bundle URL had default value (`http://localhost:4200/main.js`) and was used by loader. Here no default or documentation exists: composition configuration names unit but does not say where it is. Also differs from 008/040, whose configurations supplied remote URL.
- This is not `MFE-unit`: host is present and exposes no lifecycles. Not code sharing (089/100): single-spa registration activates an application through route. Unlike 097, consumer code is executed (`_app.tsx`); uncertainty concerns remote resolvability.
- `approaches: [single-spa]` (with SystemJS and import map for loading). `ui_technologies: [react, next]`. `build_tools: []`, under Next bundler-encapsulation convention. `frontend_units: 2` (host + referenced remote), `unit_organization: multi-repo`. `repo_type: example` (MBA project, `README.md:3`).

## Analysis notes

- **RQ2:** single-spa as root config inside Next app (Pages Router), loading remote through SystemJS and runtime-injected import map, with CDN `react`/`react-dom` for remote.
- **RQ1 (misleading signals):** dead code (`src/microfrontends.ts`), unused local investments component and `package-lock.json` outdated relative to `package.json`/`yarn.lock`. Sample entry came only from declared dependency.
- **Protocol (search):** entry exclusively through code search in `package.json`. Eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Retain **Uncertain**. Host registers and activates external unit through single-spa, but `NEXT_PUBLIC_MFE_INVESTMENTS_URL` has no value, fallback or versioned deployment source. Remote location and actual connection cannot be verified in snapshot.
