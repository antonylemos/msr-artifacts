---
schema: 1
id: 1080315685
full_name: the-alien-club/datastreaming-demos
url: https://github.com/the-alien-club/datastreaming-demos
commit: 9d93211bf02f2a23a09a10c732649e524e273af1
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 293 — the-alien-club/datastreaming-demos

## Context

Alien Intelligence Data Streaming platform demo collection (`README.md:1–3`): five independent Next.js applications, each in its own folder (`alien-agents/`, `avatar/`, `bnf/`, `openaire/packages/frontend/`, `publisher-demo/`), plus services without UI (`bnf/broker`, `bnf/worker-v2`, `openaire/packages/mcp`, `openaire/packages/viz-mcp`). Three are published on the same host (`demo.alien.club`) under distinct prefixes through separate Istio VirtualServices; fourth (`bnf`) has its own subdomain and `avatar` has no chart. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:294` records rank 293, ID 1080315685, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution, network access or submodule reading occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:294` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:20110` (`broader`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:20116` (`broader`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2025-Q4` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2025-10-01..2025-12-31` | 2026-10-07T23:41:29.688Z / 2026-10-08T16:24:05.096Z |

Hit metadata:
- null description, no topics, language TypeScript, license MIT, `fork: false`, size 22303;
- created at 2025-10-21T07:35:39Z, pushed at 2026-07-22T15:51:04Z.

Spelling “frontend orchestration” does not appear literally. Only “orchestrat” occurrence in README is `README.md:41`: “The frontend orchestrates 5 specialized agents that call a dedicated MCP server” (OpenAIRE demo), where a frontend orchestrates AI agents, rather than frontend units. Hit depends on GitHub search text processing (inflection), which is not recorded.

Last reachable README change is `dc7e52b` (2026-06-08), before collection on October 7 and 8, 2026. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1247 entries, 1232 regular `100644` files, 14 executables `100755`, zero symlinks and 1 gitlink (`160000`), `openaire/environment/plugin`, submodule of `the-alien-club/claude-marketplace` (`.gitmodules:1–4`), not traversed. No root `workspaces` or monorepo orchestrator; each project has its own `package.json`. | context |
| Structure (frontend units) | Five Next.js apps with their own `dev`/`build`/`start` scripts: `alien-agents/package.json` (Next 16.2.4), `avatar/package.json` (15.5.6), `bnf/package.json` (16.2.9), `openaire/packages/frontend/package.json` (14.2.15, React 18) and `publisher-demo/package.json` (16.2.4). `bnf/broker`, `bnf/worker-v2`, `openaire/packages/mcp` and `openaire/packages/viz-mcp` are `tsx`/`tsc` servers without UI. `bnf/design/` (31 files) is a design handoff package, with generated `support.js` (`bnf/design/support.js:1`), rather than an app. | context |
| Documentation | `README.md:5–114` presents four distinct demos (Alien Agents, OpenAIRE, Avatar, Publisher Demo), each with its own tech stack and “Quick Start”; describes neither one application nor navigation between them. | contrary |
| Build/deploy (same host) | `alien-agents/helm/alien-agents-chart/values.yaml:36–39`: `demo.alien.club`, `path: /agents`, `gateway: shared`. `openaire/helm/openaire-chart/values.yaml:22–23`: `demo.alien.club`, `/openaire`. `publisher-demo/helm/publisher-demo-chart/values.yaml:17–26`: on same host, takes catch-all `/` and comment states “the two existing demos keep their routes and everything else lands here”; `publisher-demo/helm/DEPLOY.md:4–5` repeats coexistence. Each chart has its own VirtualService (for example, `openaire/helm/openaire-chart/templates/virtualservice.yaml:11–25`, routing prefix to its own service). | ambiguous |
| Configuration (basePath) | `alien-agents/next.config.ts:7`, `14`: `basePath` from `NEXT_PUBLIC_BASE_PATH`, fixed to `/agents` at build (`alien-agents/Dockerfile:20–21`). `openaire/packages/frontend/next.config.mjs:4–6` and `lib/basePath.ts:5–8`: `/openaire` in production. `bnf/next.config.ts:26–52` and `publisher-demo/next.config.ts:3–9`: no `basePath`. No `rewrites`, `assetPrefix` or proxy to another app in any `next.config`. | contrary |
| Source code (navigation) | Search for literals `/agents` and `/openaire` (with or without `https://demo.alien.club`) in `publisher-demo`, `avatar`, `bnf` and `openaire/packages/frontend`, outside Markdown and lockfiles: only internal occurrences in `openaire` itself (`lib/basePath.ts:7`; comment in `app/api/auth/[...all]/route.ts:9`). In `publisher-demo`, `openaire`/`bnf` mentions are MCP server names in pricing calculation (`publisher-demo/app/api/demo/pricing/route.ts:175–180`), rather than UI links. No app links, loads or embeds another. | absent |
| Source code (boundaries) | Scan of all relative specifiers (`./`, `../`) in SHA's `*.ts`, `*.tsx`, `*.js`, `*.mjs`, `*.jsx`, `*.cjs` and `*.css` (811 specifiers), resolved against each project root: none leave originating project. Found `../../` (for example, `alien-agents/app/api/chat/cancel/route.ts:3`) stay within the app itself. Each `tsconfig.json` maps `@/*` to its own project's `./*` (for example, `alien-agents/tsconfig.json:21–22`). | context |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfiles, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `qiankun`, `wujie`, `systemjs`, `loadRemote`, `registerApplication`, `multi.?zone` and `assetPrefix`: only `customElements.get` in generated design runtime (`bnf/design/support.js:1095–1135`) and a false positive (`openaire/packages/mcp/src/utils/sanitize.ts:20`). `<iframe`: no occurrences. `package.json`/lockfiles for `@module-federation`, `single-spa`, `qiankun`, `@originjs`: none. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 414 commits reachable from the SHA (447 across all refs), 11 merges, root `7771f68` (2025-10-21, “Initial commit”, Xqua). SHA is PR #3 merge (`feature/bnf-prod-cutover-config`, 2026-07-22, author Xqua, committer GitHub). 17 remote refs `feature/*`, `fix/*` and `staging`, whose content was not considered.

Metadata authorship: Leo, with two emails (`leo@jogl.io`, 380 commits; `leo@alien.club`, 13), accounts for almost all history; followed by `nomeforme` (15), Xqua with two emails (4) and `yoratoni` (2). According to per-folder `git log --no-renames`, demos enter at different times: `avatar` on 2025-10-21 (7 commits), `openaire` on 2025-12-01 (64), `alien-agents` on 2026-05-29 (20 under this name; README describes it as former “LDS Chatbot”, `README.md:11`), `publisher-demo` on 2026-06-08 (37) and `bnf` on 2026-06-18 (150). Sequence is demos added one at a time, rather than one decomposed application. Metadata does not distinguish intellectual authorship; `CLAUDE.md` and `.claude/skills` in `alien-agents/` indicate coding assistant use. No historical blob was read. `git rev-list --objects $SHA --missing=print` identifies 3074 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Five identifiable frontend units in repository: `alien-agents`, `avatar`, `bnf`, `openaire/packages/frontend` and `publisher-demo`, each with its own `package.json` and Next scripts. Q1 counts identifiable repository units, whether or not referenced by composition configuration (cf. 146). |
| Q2 | Yes | Own entry and build per app (`next build` in each `package.json`; separate Dockerfiles and charts) and no source code imports between them (relative specifier scan; local `@/*` in each `tsconfig.json`). |
| Q3 | No | README presents distinct demos (`README.md:5–114`); no app loads, mounts or links another. Publishing three on same host is declared coexistence (`publisher-demo/helm/publisher-demo-chart/values.yaml:19–23`), without a common shell, host or root config. |
| Q4 | No | No configured frontend composition mechanism (recorded search); `basePath` only isolates each app under its prefix, without `rewrites`/`assetPrefix` from one app to another. |
| Q5 | No | Q3 and Q4 are No: independent demo collection. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “monorepos containing several unrelated frontend applications” and “multiple frontend applications without explicit composition”.
- Prefix routing in `demo.alien.club`'s Istio gateway distributes requests among different products under the same domain, configured separately per chart; no shell or navigation between them. As in final 028, infrastructure routing is not unit composition. Contrast with 013 (Multi-Zones): there a dedicated shell declares `rewrites` to zones with `assetPrefix` and links zones of the same product; here none of the three exists.
- Not `MFE-unit`: no app exports an external host contract. No partial chain (097/103/104), federation for code sharing (089/100) or composed third-party unit (102/074/080). Submodule (`openaire/environment/plugin`) points to a coding assistant plugin marketplace, rather than a frontend unit.
- `frontend_units: 5`, `unit_organization: monorepo`, `ui_technologies: [react, next]` (as in 013), `build_tools: []` (Next-encapsulated bundler, without explicit bundler configuration), `repo_type: example` (“Collection of demo applications”, `README.md:3`).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “frontend orchestrates … agents” (`README.md:41`) matches broad query `"frontend orchestration"` through inflection; concerns AI agent orchestration.
- **RQ3 (gateway ≠ shell):** several products under the same host with prefixes (`/agents`, `/openaire`, `/`) through independent VirtualServices. If researcher wishes to treat prefix co-hosting as a route composition signal, case should be reassessed alongside 013 (still `review`); under snapshot evidence (distinct products, without shell or links), it was not treated that way.
- **Protocol (search):** eligibility changes from `unknown` (001, `activity_incomplete`) to `pass` (002).
