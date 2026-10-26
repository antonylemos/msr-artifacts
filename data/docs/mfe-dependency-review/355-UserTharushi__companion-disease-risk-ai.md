---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 355 — UserTharushi/companion-disease-risk-ai

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| apps/mfe-admin/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-admin/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-admin/vite.config.ts:8-20 (the default Vite configuration invokes `federation({ ... })` in plugins with exposes and shared); apps/mfe-admin/package.json:8 (the build runs `tsc && vite build` with no alternative configuration); apps/shell/src/App.tsx:23 (the shell consumes `import("mfeAdmin/App")`, route `admin/*` in :53) |
| apps/mfe-auth/package.json:43 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-auth/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-auth/vite.config.ts:9-18 (the default Vite configuration invokes `federation({ ... })` in plugins with exposes and shared); apps/mfe-auth/package.json:8 (the build runs `tsc && vite build` with no alternative configuration); apps/mfe-auth/Dockerfile:15 (`npm run dev`, which runs `vite --port 3001` with this configuration); docker-compose.yml:24-27 (service `mfe-auth` built by this Dockerfile) |
| apps/mfe-pet-profile/package.json:27 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-pet-profile/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-pet-profile/vite.config.ts:8-18 (the default Vite configuration invokes `federation({ ... })` in plugins with exposes and shared); apps/mfe-pet-profile/package.json:8 (the build runs `tsc && vite build` with no alternative configuration); apps/shell/src/App.tsx:18 (the shell consumes `import("mfePetProfile/App")`, route `pets/*` in :48) |
| apps/mfe-risk-results/package.json:25 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-risk-results/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-risk-results/vite.config.ts:8-17 (the default Vite configuration invokes `federation({ ... })` in plugins with exposes and shared); apps/mfe-risk-results/package.json:8 (the build runs `tsc && vite build` with no alternative configuration); apps/shell/src/App.tsx:20 (the shell consumes `import("mfeRiskResults/App")`, route `risk-results/*` in :50) |
| apps/mfe-symptom-checker/package.json:27 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-symptom-checker/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-symptom-checker/vite.config.ts:8-17 (the default Vite configuration invokes `federation({ ... })` in plugins with exposes and shared); apps/mfe-symptom-checker/package.json:8 (the build runs `tsc && vite build` with no alternative configuration); apps/shell/src/App.tsx:19 (the shell consumes `import("mfeSymptom/App")`, route `symptom/*` in :49) |
| apps/mfe-vaccination/package.json:25 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-vaccination/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-vaccination/vite.config.ts:8-17 (the default Vite configuration invokes `federation({ ... })` in plugins with exposes and shared); apps/mfe-vaccination/package.json:8 (the build runs `tsc && vite build` with no alternative configuration); apps/shell/src/App.tsx:22 (the shell consumes `import("mfeVaccination/App")`, route `vaccination/*` in :52) |
| apps/mfe-vet-discovery/package.json:25 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/mfe-vet-discovery/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/mfe-vet-discovery/vite.config.ts:8-18 (the default Vite configuration invokes `federation({ ... })` in plugins with exposes and shared); apps/mfe-vet-discovery/package.json:8 (the build runs `tsc && vite build` with no alternative configuration); apps/shell/src/App.tsx:21 (the shell consumes `import("mfeVetDiscover/App")`, route `vet-discovery/*` in :51) |
| apps/shell/package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.3.5 | module-federation | Yes | apps/shell/vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); apps/shell/vite.config.ts:9-21 (the default Vite configuration invokes `federation({ ... })` in plugins with remotes and shared); apps/shell/package.json:8 (the build runs `tsc && vite build` with no alternative configuration); apps/shell/src/App.tsx:18-23 (`lazy(() => import("mfePetProfile/App"))` and the other five remotes); apps/shell/Dockerfile:15 (`npm run dev`); docker-compose.yml:11-14 (service `shell`) |
| package.json:20 | devDependencies | turbo | ^2.0.0 | monorepo-tool | Undetermined | turbo.json:5-28 (tasks `build`, `dev`, `lint`, `type-check`, `test`, `clean` configured); the only invocation of `turbo` in a build file is in the scripts in package.json:12-17, which do not count as use; apps/shell/Dockerfile:6-7 and apps/mfe-auth/Dockerfile:6-7 run `npm install` only in the app directory, and the Dockerfiles run `npm run dev` of the app (:15); no CI workflow or automation script calling `turbo` (grep, excluding the lockfile; CLAUDE.md:27-28 is documentation) |

## Notes

- None of the eight apps has an alternative `vite.config.*` or `--config` in its scripts; each directory's `vite.config.ts` is the default configuration read by `vite`/`vite build`.
- `apps/mfe-auth` exposes modules (`apps/mfe-auth/vite.config.ts:12-16`), but the shell does not federate it: `apps/shell/src/App.tsx:8-15` and `:44` redirect `/auth/*` to `http://localhost:3001`. The plugin is in use in the app's build and dev server (`Dockerfile`, `docker-compose.yml`), hence `Yes`; the lack of consumption concerns composition, not this stage.
- Only `shell` and `mfe-auth` start in `docker-compose.yml` (`:11-34`); the other six remotes have only the `dev`/`build`/`preview` scripts from their own `package.json`.
- `turbo`: `CLAUDE.md:27-28` and `docs/VERIFICATION.md:32` mention `turbo run`, but are documentation. `same_package_matches` points to `package.json:5`, which is npm's `workspaces` list, not Turborepo configuration.

