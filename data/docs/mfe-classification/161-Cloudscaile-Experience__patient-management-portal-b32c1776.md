---
schema: 1
id: 1303822970
full_name: Cloudscaile-Experience/patient-management-portal-b32c1776
url: https://github.com/Cloudscaile-Experience/patient-management-portal-b32c1776
commit: b8a9112f70efaa4ed2cd4f3e47ed5581d1381939
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

# 161 — Cloudscaile-Experience/patient-management-portal-b32c1776

## Context

“Patient Management Portal”: extension for a platform (tenant `cloudscaile`) consisting of a Fastify API (`js/`) and a React micro-frontend (`web/`) exposing `./PatientManagement` and `./PatientDetail` to a host through Module Federation (`README.md:1–8`, `43`; `manifest.json:1–30`). The host is not in the repository. The remote depends on a host bridge (`@cloudscaile-eng/web-ext-utils`) for axios, Redux store, theme, i18n and toasts. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:162` records rank 161, ID 1303822970, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:162` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:33696` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:33703` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with subquery `…#created:2026-07` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:35.473Z / 2026-10-08T16:00:43.513Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:31.860Z / 2026-10-08T16:09:50.872Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:28:59.650Z / 2026-10-08T16:18:56.800Z |

Effective queries append `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 239;
- created at 2026-07-17T09:37:36Z, pushed at 2026-07-17T09:37:39Z.

README spellings:
- “micro-frontend”: `README.md:3` (“React micro-frontend”), `8`, `35`, `43`, `52`;
- “Micro-frontend”: `README.md:77`;
- “Module Federation”: `README.md:8` (“Module Federation component consumed by the host”).

Indexing hypothesis, not demonstrated by local data: phrase search might treat the hyphen as a separator. The plural form “micro frontends” does not appear in the README or description; that hit depends on GitHub search text processing, which is not recorded.

The README comes from the only commit, the SHA (2026-07-17), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 141 entries, 138 regular `100644` files and 3 executables `100755` (`js/entrypoint.sh`, `js/scripts/migrate.sh`, `js/scripts/seed-if-new-db.sh`); zero symlinks and zero gitlinks. There are `js/` (Fastify + Drizzle/PostgreSQL API), `web/` (only frontend project), `manifest.json` and `lefthook.yml` at the root, and `.claude/` with skills and `CLAUDE.md` in both packages. | context |
| Configuration (federation) | `web/webpack/webpack.common.cjs:45–65`: `ModuleFederationPlugin({ name: 'remote', filename: 'remoteEntry.js', exposes: { './PatientManagement', './PatientDetail' }, shared: react, react-dom, react-router, i18next, react-i18next singleton })`, without `remotes`. `web/webpack/webpack.prod.cjs:11–16`: `publicPath: 'auto'`. `web/src/index.tsx:1`: asynchronous bootstrap. | strong |
| Configuration (registration) | `manifest.json:2–24`: `tenant`, `extensionName` and `web.scope: "remote"`, `remoteFileName: "remoteEntry.js"`, modules `./PatientManagement` and `./PatientDetail` with grid sizes. The remote's declaration for the platform host. | moderate |
| Source code (host contract) | `web/src/utils/extension.ts:1–78`: `getExtension(tenant, name)`, `getExtAxios`, `getReduxStore`, `injectReducers`, `getTheme`, `registerTranslation`, `toast`, `getEventBus` and `getUser`, from `@cloudscaile-eng/web-ext-utils` (`web/package.json:17`). `web/src/containers/PatientManagementContainer.tsx:9–26` and `PatientDetailContainer.tsx`: register translations in the host and receive route props. `web/README.md:3` and `web/.claude/skills/micro-frontend-integration/SKILL.md:7–61`: “never standalone in production”; the host controls routes, store and theme. | moderate |
| Source code (boundaries) | `web/` uses alias `@` → `web/src` (`webpack.common.cjs:13–15`) and imports nothing from `js/`. Searching for `../../` imports in `web` and `js` returns nothing. Communication with the API is through HTTP using host axios. | context |
| Build/deploy | `web/package.json:4–12`: `webpack` with dev and prod configurations. `js/Dockerfile`, `js/docker-compose*.yml`: API and database. No host, shell or `remotes` configuration. | context |

## Authorship and history

Non-shallow clone with a single commit, SHA `b8a9112` (2026-07-17T09:37:36Z, “Initial commit”), by `Cloudscaile-Experience <dev@cloudscaile.com>`. Creation and push metadata fall in the same second as the commit. `.claude/` files and `CLAUDE.md` indicate a project organized for a coding assistant; metadata cannot distinguish intellectual authorship or establish whether the repository was automatically generated. The sample contains another repository from the same organization with the same name prefix (rank 376, `patient-management-portal-a7df64e7`, `data/samples/mfe-sample-001/sample.csv:377`), not inspected here. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`web/`); composition configuration only has `exposes` (`webpack.common.cjs:48–51`) and references no external units. API `js/` is not a frontend unit. |
| Q2 | Yes (for the unit) | Its own entry and build generating `remoteEntry.js` (`webpack.common.cjs:10`, `46–47`; `web/package.json:6`). |
| Q3 | Undetermined | The platform host is not in the repository; it appears only through the bridge contract (`extension.ts`) and `manifest.json`. |
| Q4 | Undetermined | The remote side is configured; the consumer is not observable. |
| Q5 | No | A unit is prepared for composition, rather than an MFE instance in the repository. |

## Rationale

- Proposed `MFE-unit` with `status: review`. The checklist exception applies literally: “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”. The pattern matches final 001/050/069, with a richer host contract (store, theme, i18n, axios, event bus).
- **Review is justified by the platform question:** the host is an extension platform (`manifest.json` with `tenant`/`extensionName`; SDK `@cloudscaile-eng/web-ext-utils`). Final 037 (ioBroker Admin) classified a unit whose only host is a third-party platform extension mechanism as `Non-MFE`, and this is also the question in 102/074/080.
- **Difference from 037:** here the repository belongs to the platform organization itself (`tenant: "cloudscaile"`, account `Cloudscaile-Experience`), bringing it closer to a first-party unit, as discussed in 152.
- **Repository origin:** a single organization-account commit and an almost identically named sibling repository in the sample are consistent with generation by a platform tool, but this is unproven, and the pair was not inspected; the parallel with generator cases (075 is a tool; 081 and 105 are not final; 094 is an exercise/application) is not used to classify this candidate.
- **Fields:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 1`, `unit_organization: single-unit`. `repo_type: example`: clinic demonstration extension, without evidence of production use; `production` would also be defensible.

## Analysis notes

- **RQ2:** Module Federation remote for a multi-tenant extension platform, with declarative manifest (`manifest.json`: modules, grid sizes) and bridge SDK delivering host services (authenticated axios, reducer injection, MUI theme, i18n, toasts, event bus).
- **RQ1 (misleading signals):** none; MFE vocabulary corresponds to actual configuration.
- **Protocol (sample):** rank 376 belongs to the same organization, with the same name prefix. Both should be classified consistently and checked for generated variants.
- **Protocol (search):** the plural hit has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

Decide whether a Module Federation remote prepared for an extension platform host, with platform-specific manifest and SDK and maintained by the platform organization, counts as MFE-unit or follows precedent 037.

- **MFE-unit (proposed):** `exposes`, `remoteEntry.js`, `shared` singleton and explicit host contract, as in 001/050/069. The platform is not third-party relative to the repository owner.
- **Non-MFE:** follows 037, because the only host is a platform's extension mechanism and the repository is its extension, possibly generated.

No new rule is proposed. Until a decision, preserve `MFE-unit`/`review`.
- **Independent review contribution (Lupa):** provisional agreement with MFE-unit and `review`; the boundary between first-party MFE remote and platform extension remains a real decision, since the host is not included and final 037 treated an extension remote for a third-party platform host as Non-MFE. Here tenant and owning organization coincide (`manifest.json:3–4`), weakening the analogy, but not demonstrating that the consuming host is part of this product; 074, 102 and 080 do not resolve the case. Q3 and Q4 remain Undetermined, and `repo_type: example` is the most likely reading (`README.md:22–43`; `web/README.md:92–99`), with `production` as an alternative that does not change the class. Locations to complete in citations: export contract in `web/src/containers/PatientDetailContainer.tsx:24–27,67–88`; `web/webpack/webpack.common.cjs:13–15` and `:48–51` (with `web/` prefix); HTTP/axios calls in `web/src/api/calls/patients.ts:16–28` and bridge `web/src/utils/extension.ts:33–35`; `js/Dockerfile:1–32`, `js/docker-compose.yml:1–35` and `js/docker-compose.dev.yml:1–26` (local PostgreSQL); `web/package.json:4–12`. Structure is a `git ls-tree` inventory at the SHA, rather than a file citation; `.claude/` is not a frontend. The shared prefix with another candidate from the same organization (`sample.csv:377`) is a family signal, not proof of generation.
