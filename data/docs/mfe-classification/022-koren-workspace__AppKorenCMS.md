---
schema: 1
id: 1155398481
full_name: koren-workspace/AppKorenCMS
url: https://github.com/koren-workspace/AppKorenCMS
commit: 51c2d420cc24ea85cf231bf3466a817e68a61db8
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 022 — koren-workspace/AppKorenCMS

## Context

- **Repository type:** production-oriented application (internal CMS for a prayer/Tanakh app, STAGE/PROD environments, deployment on Vercel)
- **Assessed commit:** `51c2d42` (default branch `master`)

The project originated from the "FireCMS Cloud starter" template (`README.md:1`). In FireCMS Cloud, the client app is compiled as a Module Federation remote (`exposes: { "./config" }`) and loaded by the hosted platform. Commit `d994cc7` (2026-03-17, "chnage to core from cloud firecms") migrated to self-hosted FireCMS and removed `@firecms/cloud`, `FireCMSCloudApp` and the `firecms deploy` script. Federation config remained in `vite.config.ts`.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json:42`: `@originjs/vite-plugin-federation`; `:32-34`: `@firecms/core`, `@firecms/firebase`, `@firecms/ui` (without `@firecms/cloud`) | weak |
| Configuration | `vite.config.ts:494-514`: `federation({ name: "remote_app", filename: "remoteEntry.js", exposes: { "./config": "./src/index" }, shared: [react, @firecms/*, @firebase/*] })`; no `remotes` (remnant, see history) | ambiguous |
| Source code (entry) | `src/main.tsx:7-13`: `ReactDOM.createRoot(...)` renders `App` locally; `src/App.tsx:2-3,38` directly imports `appConfig` from `./index` and renders `FireCMSFirebaseApp`, so the app mounts itself | contrary |
| Source code | `src/index.tsx:11-58`: `appConfig` with internal views (`TocTranslationsView`, `AppCopyView`, `CouponsView`, `CatalogView`, `TanakhView`, etc.), all statically imported | contrary |
| Composition | No host in the repository and no consumer of `remoteEntry.js`: the only intended consumer (FireCMS Cloud) was abandoned | absent |
| Build/deploy | `vercel.json:1-5`: SPA with rewrite to `index.html` (except `/api/`); `api/bagel/*.ts` as serverless functions; `package.json` without a deployment script for FireCMS Cloud | contrary |
| History | `d994cc7`: removes `"deploy": "run-s build && firecms deploy --project=koren-stage-b"`, `@firecms/cloud` and `FireCMSCloudApp`, and adds `FireCMSFirebaseApp` and `src/firebase_config.ts`; later `7f1c613` "addung vercel.json" (explains the remnant) | strong |
| Documentation | `README.md:1-30`: original FireCMS Cloud template text (outdated: cites `yarn deploy`, which no longer exists); `MIGRATION_FIREBASE_PROJECT.md:9-10` still cites `firecms deploy` (contradicted by the code) | weak |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit; federation config has only `exposes`, with no reference to other units |
| Q2 | No | No units to compare; views are statically imported (`src/index.tsx:2-9`) |
| Q3 | No | No host loads the app: it mounts itself (`src/main.tsx:7`) and is served as a SPA (`vercel.json`) |
| Q4 | No | `exposes` is configured but has no consumer; the FireCMS Cloud loading mechanism was removed in `d994cc7` |
| Q5 | No | Q1–Q4 converge |

## Rationale

- The app is now a self-hosted monolithic SPA. Federation is a remnant of the FireCMS Cloud template, whose host (the platform) is no longer used.
- The MFE-unit exception does not apply. The unit does have `exposes`, but history shows that the intended external host was abandoned, and the app is deployed standalone. There is no longer "an external host" for which it is prepared.
- Matches "MFE-related dependencies that are unused or experimental" and, before migration, something analogous to repository 010: MF as a platform plugin mechanism, not project-authored composition.

## Analysis notes

- **RQ1 (misleading signals):** MF config active in the build (generates `remoteEntry.js`), but without a consumer. Only history reveals it is a remnant.

## Point for joint review

- Under a literal reading of the checklist, `exposes` (`vite.config.ts:496-498`) could suggest MFE-unit. The Non-MFE decision relies on history (section 3.4.8: "whether a configuration is active or abandoned").
- Even before migration, this would be the case of repository 010 (low-code/CMS platform plugin). If the rule suggested in 010 is adopted, both become consistent.
