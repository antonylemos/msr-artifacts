---
schema: 1
id: 1245053416
full_name: attentiondotnet/backstage
url: https://github.com/attentiondotnet/backstage
commit: 813608335f8c6f35a9b95d90782a9cd9ef1a5109
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 340 — attentiondotnet/backstage

## Context

Complete copy of the Backstage framework repository (CNCF): `README.md:1–19`, with badges and links for `backstage/backstage`; description identical to the project’s. No owner commit, and the SHA is a merge from the original project. Module Federation appears in the framework’s own dynamic plugin loading libraries (`packages/frontend-dynamic-feature-loader`, `packages/module-federation-common`, `packages/backend-dynamic-feature-service`, `packages/cli-module-build`), the same ones matching code search in draft 247 (another Backstage copy). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:341` records rank 340, ID 1245053416, status `cloned`, branch `master` (the default) and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:341` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:30432` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:30439` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same four hits in each round, all from endpoint `code` and query `technology-module-federation-package-code` (`"@module-federation" filename:package.json`):

| Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|
| `…#size:1800..1999` | `packages/frontend-dynamic-feature-loader/package.json` | 2026-10-07T19:47:00.785Z / 2026-10-08T15:42:30.174Z |
| `…#size:1800..1999` | `packages/module-federation-common/package.json` | 2026-10-07T19:47:05.277Z / 2026-10-08T15:42:35.449Z |
| `…#size:3000..3999` | `packages/backend-dynamic-feature-service/package.json` | 2026-10-07T20:33:04.318Z / 2026-10-08T15:43:53.217Z |
| `…#size:3000..3999` | `packages/cli-module-build/package.json` | 2026-10-07T20:33:04.318Z / 2026-10-08T15:43:48.071Z |

Effective queries append the `size:` range. Code hit metadata records only the Backstage description and `fork: false`.

Matches at the SHA:
- `packages/frontend-dynamic-feature-loader/package.json` (1.874 bytes): `@backstage/frontend-dynamic-feature-loader`, role `web-library` (`:2–6`), dependencies `@module-federation/enhanced`, `runtime` and `sdk` (`:38–40`);
- `packages/module-federation-common/package.json` (1.823 bytes): “Helper library for module federation” (`:2–6`), `@module-federation/runtime` (`:42`);
- `packages/backend-dynamic-feature-service/package.json` (3.037 bytes): role `node-library`, `@module-federation/sdk` (`:2–6`, `:71`);
- `packages/cli-module-build/package.json` (3.525 bytes): role `cli-module`, `@module-federation/enhanced` (`:2–6`, `:50`).

All four files were last changed on 2026-05-19 (`b97fcb0a93`), before collections. The match does not depend on the README.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 11.580 entries, comprising 11.518 regular files `100644`, 60 executables `100755` and 2 symlinks `120000` (`.claude/CLAUDE.md` → `../AGENTS.md`; `.cursor/rules/backstage-project.mdc` → `../../AGENTS.md`); zero gitlinks. Framework monorepo: `plugins/` (5.504), `packages/` (3.838), `docs/`, `microsite/`, `docs-ui/` and others. | context |
| Documentation | `README.md:1–19`: “Backstage is an open source framework for building developer portals”, with badges from repository `backstage/backstage`. | contrary |
| Source code (framework MF) | `packages/frontend-dynamic-feature-loader/README.md:1–12`: “Backstage frontend feature loader to load new frontend system plugins exposed as module federation remotes”, together with the `backend-dynamic-feature-service` remote server, and marked alpha. Search for `frontend-dynamic-feature-loader` in `packages/app`, `packages/app-legacy` and `packages/backend`: no occurrences; example apps do not enable dynamic loading. | weak |
| Structure (apps) | `packages/app/package.json:2`, `:5`: `example-app`, role `frontend`; 45 `workspace:` dependencies (for example, `@backstage/plugin-api-docs` and `@backstage/plugin-app`, `:50–53`). Plugins enter through workspace dependencies in the example app build. `packages/app-legacy` and other `app-*` are framework variants and libraries. | contrary |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 73.934 commits (73.934 across all refs), 21.500 merges, by 2.370 identities. Most frequent are `poldsberg@gmail.com`, `freben@gmail.com` and bot `renovate`. The root is `1a19a01c4b` (2020-01-25, Stefan Ålund), and the SHA is a 2026-05-20 merge by Fredrik Adelöw in the original project (“Merge pull request #34321 from backstage/freben/enter-prerelease-mode”). No commit belongs to owner `attentiondotnet`; the repository is a Backstage copy with `fork: false`, with no mechanism asserted. `git rev-list --objects $SHA --missing=print` lists 255.745 missing objects. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | The repository is the framework; federation configurations are in framework libraries (`packages/*-dynamic-feature-*`, `packages/module-federation-common`), without authored units referenced by composition configuration. Example apps do not enable the dynamic loader (recorded search). |
| Q2 | No | There are no units of a composed application to assess. |
| Q3 | No | No repository host loads remotes; the example app receives plugins through workspace dependencies (`packages/app/package.json:50–53`). |
| Q4 | No | The dynamic loading mechanism exists as a framework library, not configured and active between repository units. |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: Module Federation dynamic loading libraries are part of the Backstage framework.
- Same categorization as draft 247 (another Backstage copy, with the same four code hits). Here there is not even an owner contribution.
- Third-party code redistribution (074/080/102/122) and the platform rule (037) do not change the class.
- `frontend_units: 1` (`packages/app`, the example app), `unit_organization: single-unit`, `ui_technologies: [react]` and `build_tools: []` follow 247. `repo_type: other` (framework copy).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** Backstage dynamic plugin libraries (`@backstage/frontend-dynamic-feature-loader` and similar) match searches for `@module-federation` in `package.json`. Every Backstage monorepo copy enters the sample through the technology strategy.
- **Protocol (families/duplicates):** second Backstage copy in the sample (247 and 340). Deduplication by history or shared root commit (`1a19a01c4b`) would avoid repeated review.
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).
