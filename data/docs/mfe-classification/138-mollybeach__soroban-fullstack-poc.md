---
schema: 1
id: 1231078343
full_name: mollybeach/soroban-fullstack-poc
url: https://github.com/mollybeach/soroban-fullstack-poc
commit: d5b366a499b3b7e0a41c5a2436dfc6d2347c0e3d
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 138 — mollybeach/soroban-fullstack-poc

## Context

Proof of concept for a Soroban smart contract (Rust) with one Next.js frontend to read/write contract on Stellar testnet, connect wallets and display test results (`README.md:1–3`; `README.md:358–366`). Search retrieval comes from a README future-expansion-list item, “frontend orchestration flows”. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:139` records rank 138, ID 1231078343, branch `master`, status `cloned` and front-matter commit, which is clone HEAD and `origin/master`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:139` records strategy `broader` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:29651` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:29657` (`broader`, `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q2` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:44:19.637Z / 2026-10-08T16:24:59.268Z |

Hit metadata: description “A lightweight end-to-end Soroban smart contract proof-of-concept built with Rust, Soroban SDK, React, and Stellar testnet tooling.”, topics `soroban` and `stellar`, TypeScript language, `fork: false`, creation at 2026-05-06T15:51:04Z, push at 2026-05-30T03:52:45Z, homepage `https://soroban-fullstack-poc.vercel.app/`. Description lacks term. By elimination, retrieval comes from `README.md:522`, “- frontend orchestration flows”, with literal phrase, in section “Future Expansion” (`README.md:513–524`).

Last reachable change to `README.md` is `f240465` (2026-05-29T16:44:40-04:00), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 925 entries, 922 regular files `100644` and 3 executables `100755` (`scripts/deploy-testnet.sh`, `scripts/reencode-demo-video.sh`, `scripts/setup-testnet-identity.sh`); zero symlinks and zero gitlinks. There are 835 entries in `contracts/basic-storage` (Rust, fuzz and more than 800 JSON test snapshots), one `frontend/` project (Next), `docs/` and `scripts/`. Sole JS manifests are `frontend/package.json` and `frontend/lib/basic-storage-bindings/package.json`. | contrary |
| Source code (UI) | `frontend/app/layout.tsx:15–27`: root layout wrapping pages in `AppShell`. `frontend/components/AppShell.tsx:7–17`: wallet provider, `SiteHeader` and `main`. Routes `frontend/app/page.tsx`, `bindings`, `demo`, `docs` and `tests` are pages of same App Router. | contrary |
| Source code (bindings) | `frontend/lib/basic-storage-bindings/package.json:1–17` is a generated TypeScript client for contract (`frontend/lib/basic-storage-bindings/README.md:1–3`; `README.md:231`). In `frontend` UI code, search for `basic-storage-bindings` finds text mention at `frontend/app/bindings/bindings-explorer.tsx:174`; literal search across all `frontend` also returns package directory itself (`README.md` and `package.json:3`). Package is not a UI unit. | context |
| Source code (boundaries) | Search for `from '../` and `import('../` in `frontend` (except lockfile): one occurrence, `frontend/app/tests/[section]/page.tsx:3` (`../page`), within same App Router. Other imports use alias `@/`. No second unit exists whose boundary could be crossed. | context |
| Configuration / Build/deploy | `frontend/package.json:5–13`: one `next dev`/`next build`/`next start` cycle and test-export scripts. `frontend/next.config.ts:3–8` has only `transpilePackages`, without `rewrites`, zones or federation. Next 15.5.18 and React/ReactDOM 19.2.6 are resolved in `frontend/package-lock.json:11361–11362`, `12251–12252` and `12261–12262`. `README.md:31` cites example Vercel deployment. | contrary |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfiles and snapshots, for `orchestrat`, `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `rewrites` and `zones`. Hits are `README.md:522`, “orchestration” in financial/blockchain sense in `docs/DTCC-Digital-Assets-Tokenization-Synthesis.md` (for example, lines 13 and 36), “Makefile orchestration” in `docs/POC_WORKSTREAM_TRACKING.md:160` and `@stellar/stellar-sdk/lib/federation/` paths (Stellar federation, address protocol) within `frontend/tsconfig.tsbuildinfo`. Frontend lockfile contains neither Module Federation `federation` nor `single-spa`. | absent |
| Documentation | `README.md:358–366`: “The frontend is intentionally lightweight and integration-focused.” `README.md:513–524`: “frontend orchestration flows” as potential future expansion, alongside ERC20 contracts and CI/CD. | weak |

## Authorship and history

Non-shallow clone. `git rev-list` at the SHA: 73 commits, 4 merges, one root `6f589eb` (2026-05-06, “docs(README): add Soroban fullstack POC guide”). All commits have author and committer Molly Beach `<mollyjbeach@gmail.com>`. Frontend appears in `f966a2f` (2026-05-06, “feat(frontend): add Next.js testnet contract read and write flow”) and has 39 path commits (`git log --no-renames`). Two parallel commit lineages have identical messages and times (15 duplicate messages), joined through merges (`c258ab2`, `b9b2aaf` and SHA), compatible with rewritten history or pushing twice. Throughout reachable history only manifests `frontend/package.json`, `frontend/lib/basic-storage-bindings/package.json` and `frontend/next.config.ts` exist; no second frontend unit ever existed. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend unit, Next app in `frontend/` (`frontend/package.json:5–13`; `frontend/app/layout.tsx:15–27`). Bindings package is contract client. No composition configuration references external units (recorded search). |
| Q2 | No | Without two units, no independent entries or builds exist; routes share same build and `AppShell` (`frontend/components/AppShell.tsx:7–17`). |
| Q3 | No | Root layout wraps same App Router routes, without host or shell mounting distinct units. |
| Q4 | No | `frontend/next.config.ts:3–8` configures no composition, and no mechanism was found (recorded search). |
| Q5 | No | Q1–Q4 are No: smart-contract POC with monolithic Next frontend. “Frontend orchestration flows” is roadmap item. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “conventional frontend monoliths”. No external-host preparation exists, so `MFE-unit` does not apply.
- Same lexical pattern as 066/130/132/135 for `"frontend orchestration"`: here phrase is literal, but in future-expansion list (`README.md:513–524`), without implementation.
- `repo_type: example`: description and README present proof-of-concept (`README.md:3`; `README.md:37`), with example deployment (`README.md:31`). `ui_technologies: [react, next]`. `build_tools: []`, under Next bundler-encapsulation convention. `frontend_units: 1` / `single-unit`.
- No decision remains open: no iframe, link between applications or build-time composition.

## Analysis notes

- **RQ1 (misleading signals):** “frontend orchestration” as roadmap item and “federation” of Stellar protocol (`@stellar/stellar-sdk/lib/federation`) are homonyms text searches could confuse with MFE signals.
- **Protocol (search):** fifth observed case of query `"frontend orchestration"` without frontend composition (066, 130, 132, 135 and this one). Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE, Q1–Q5 No, `example`, `[react, next]`, one unit and `single-unit`; no open decision. Adopted correction: literal search for `basic-storage-bindings` in `frontend` also returns package itself (`frontend/lib/basic-storage-bindings/README.md` and `package.json:3`), not only mention in `bindings-explorer.tsx:174`. Package is generated TypeScript client for Soroban contract, without UI. History: 73 commits and 4 merges, 39 commits in `frontend/`, all by same author; parallel commits with repeated messages, joined through merges, reveal no other frontend unit.
