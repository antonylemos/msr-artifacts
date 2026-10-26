---
schema: 1
id: 1314943076
full_name: Cloudscaile-Experience/patient-management-portal-a7df64e7
url: https://github.com/Cloudscaile-Experience/patient-management-portal-a7df64e7
commit: b2bcbb43dec149d4e6b3d18792eace5207db1e4d
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 376 — Cloudscaile-Experience/patient-management-portal-a7df64e7

## Context

“Patient Management Portal”: extension for a platform (tenant `cloudscaile`) comprising two parts:
- a Fastify API (`js/`);
- a React micro-frontend (`web/`) exposing `./PatientManagement` and `./PatientDetail` through Module Federation to a host (`README.md:1–8`, `:43`; `manifest.json:1–30`).

The host is not in the repository. The remote depends on bridge `@cloudscaile-eng/web-ext-utils` for axios, Redux store, theme, i18n and toasts.

The SHA tree is identical to candidate 161 (`Cloudscaile-Experience/patient-management-portal-b32c1776`, annotation `MFE-unit`/review). Both commits have the same tree `332910855d40e61b46aa315c62db04aff7583c28`, and comparison of the 141 `git ls-tree -r` entries shows no path or blob difference. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:377` records rank 376, ID 1314943076, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:377` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:34357` (`unknown`, `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:34363` (`pass`, `qualifying_commit`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with subquery `…#created:2026-07` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:35.473Z / 2026-10-08T16:00:43.513Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:31.860Z / 2026-10-08T16:09:50.872Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:28:59.650Z / 2026-10-08T16:18:56.800Z |

The effective queries append `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`. Collection times match those of 161 in the same subqueries, to the millisecond.

Hit metadata (identical in both rounds): null description, no topics, language TypeScript, no license, `fork: false`, size 239, created at 2026-07-28T12:16:59Z, pushed at 2026-07-28T12:17:02Z.

Spellings in the README:
- **“micro-frontend”:** `README.md:3` (“React micro-frontend”), `:8`, `:35`, `:43`, `:52`; “Micro-frontend” in `:77`. Phrase “micro frontend” would match if search treats the hyphen as a separator, which is not recorded.
- **“Module Federation”:** `README.md:8` (“Module Federation component consumed by the host”).
- **“micro frontends”:** plural does not appear; this hit depends on GitHub search text processing, which is not recorded.

The README comes from the only commit, the SHA (2026-07-28T12:16:59Z), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 141 entries, 138 regular files `100644` and 3 executables `100755` (`js/entrypoint.sh`, `js/scripts/migrate.sh`, `js/scripts/seed-if-new-db.sh`); zero symlinks and zero gitlinks. There are `js/` (Fastify + Drizzle/PostgreSQL API), `web/` (only frontend project), `manifest.json` and `lefthook.yml` at the root, and `.claude/` with skills and `CLAUDE.md` in both packages. | context |
| Configuration (federation) | `web/webpack/webpack.common.cjs:45–65`: `ModuleFederationPlugin({ name: 'remote', filename: 'remoteEntry.js', exposes: { './PatientManagement', './PatientDetail' }, shared: react, react-dom, react-router, i18next, react-i18next singleton })`, without `remotes`. `web/webpack/webpack.prod.cjs:11–16`: `publicPath: 'auto'`. `web/src/index.tsx:1`: asynchronous bootstrap. | strong |
| Configuration (registration) | `manifest.json:2–24`: `tenant`, `extensionName`, `web.scope: "remote"`, `remoteFileName: "remoteEntry.js"` and modules `./PatientManagement` and `./PatientDetail` with grid sizes. This declares the remote to the platform host. | moderate |
| Source code (host contract) | `web/src/utils/extension.ts:1–78`: `getExtension(tenant, name)`, `getExtAxios`, `getReduxStore`, `injectReducers`, `getTheme`, `registerTranslation`, `toast`, `getEventBus` and `getUser`, from `@cloudscaile-eng/web-ext-utils` (`web/package.json:17`). `web/src/containers/PatientManagementContainer.tsx:9–26` and `web/src/containers/PatientDetailContainer.tsx:16–22`, `:67–88`: register translations in the host and receive route props. `web/README.md:3`, `:118–126` and `web/.claude/skills/micro-frontend-integration/SKILL.md:7`: “never standalone in production”; the host controls routes, store and theme. | moderate |
| Source code (boundaries) | `web/` uses alias `@` → `web/src` (`web/webpack/webpack.common.cjs:13–15`). Active search for `../` imports in `web` and `js` and imports from `js/` in `web`: no occurrence. | context |
| Build/deploy | `web/package.json:4–12`: `webpack` with dev and prod configurations; `bootstrap.tsx:1–14` and `App.tsx:14–20` only for local execution. There is no host, shell or `remotes` configuration. | context |

## Authorship and history

Non-shallow clone with a single commit (1 across all refs), SHA `b2bcbb4` (2026-07-28T12:16:59Z, “Initial commit”). Author and committer are `Cloudscaile-Experience <dev@cloudscaile.com>`. Metadata creation and push occur in the same second as the commit, or 3 s later.

Commit 161 (`b8a9112`, 2026-07-17) has a different date but the same tree. Two repositories from the same organization with identical content and hexadecimal name suffixes are consistent with automated creation by platform tooling. Metadata does not demonstrate this.

`git rev-list --objects $SHA --missing=print` lists no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`web/`). Composition configuration has only `exposes` (`web/webpack/webpack.common.cjs:48–51`) and references no external units. API `js/` is not a frontend unit. |
| Q2 | Yes | For the unit: own entry and build generating `remoteEntry.js` (`web/webpack/webpack.common.cjs:10`, `:46–47`; `web/package.json:6`). |
| Q3 | Undetermined | The platform host is not in the repository; it appears only through the bridge contract (`web/src/utils/extension.ts`) and `manifest.json`. |
| Q4 | Undetermined | The remote side is configured; the consumer is not observable. |
| Q5 | No | There is a unit prepared for composition, not an MFE instance in the repository. |

## Rationale

- Proposed `MFE-unit` with `status: review`, identical to 161, since SHA content is the same.
- The checklist exception applies literally: “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”.
- The same platform question as in 161 remains open:
  - 037 classified a unit whose only host is a third-party platform’s extension mechanism as `Non-MFE`;
  - here the tenant and owning organization match (`manifest.json:3–4`; account `Cloudscaile-Experience`).
- The generator (075) or exercise (094) parallel is not used for classification: automated origin is not demonstrated.
- Same fields as 161: `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (`production` would also be defensible).

## Analysis notes

- **Protocol (families/duplicates):** 161 and 376 have identical trees (same tree `3329108…`) and enter through the same three queries in the same monthly subquery. Deduplication by HEAD tree or content hash would avoid counting the same unit twice in the RQs.
- **RQ2:** Module Federation remote in a multi-tenant extension platform, with declarative manifest (modules and grid sizes) and bridge SDK providing host services.
- **Protocol (search):** the plural hit has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

1. **Same decision as 161.** Does a Module Federation remote prepared for an extension platform host, with the platform’s own manifest and SDK and maintained by its organization, count as `MFE-unit` or follow precedent 037 (`Non-MFE`)? This candidate’s classification should follow the decision for 161.
2. **Exact duplicate.** Decide whether 376 remains an independent observation in the sample or is treated as a duplicate of 161 for counting purposes. This does not change individual classification.
