---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
url: https://github.com/lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Context

Micro-frontends example with Module Federation in Nx/pnpm monorepo (`pnpm-workspace.yaml:1–3`; `README.md:1–29`). Three React/Rsbuild applications: `apps/shell` (host, port 3000), `apps/courses` (remote, 3001) and `apps/profile` (remote, 3002), plus local plugin `packages/zephyr-rsbuild-plugin` wrapping build with Zephyr Cloud. Each app has own `vercel.json` for separate deployment (`README.md:95–101`). Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:143` records rank 142, ID 999205690, branch `master`, status `cloned` and front-matter commit, which is clone HEAD and `origin/master`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:143` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:14938` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:14944` (`pass`), both with `terminology;technology`.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same four hits in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2025-06` | 2026-10-07T23:17:55.163Z / 2026-10-08T16:14:22.984Z |
| `technology-topic-module-federation`: `topic:module-federation` | without partition | 2026-10-07T23:13:42.957Z / 2026-10-08T16:11:12.560Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-06` | 2026-10-07T22:22:33.626Z / 2026-10-08T15:54:38.038Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-06` | 2026-10-07T22:54:08.850Z / 2026-10-08T16:05:53.214Z |

Effective queries append `pushed:>=2025-04-01` and, for partitioned queries, `created:2025-06-01..2025-06-30`.

Hit metadata:
- description “Simple example using React, Module Federation, NX, zephyr, RsBuild and Vercel”;
- topics `module-federation`, `nx`, `react`, `rsbuild`, `typescript`, `vercel` and `zephyr`;
- TypeScript language, `fork: false`, creation at 2025-06-09T22:50:18Z, push at 2025-06-11T01:11:05Z, Vercel homepage.

Origin of each hit:
- `topic:module-federation` comes from literal topic.
- `"module federation"` may come from description or `README.md:3` (“using Module Federation”).
- `"micro frontend"` corresponds to hyphenated spelling “micro-frontend” in `README.md:3`, `47` and `83`.
- No plural form exists in README or description; hit for `"micro frontends"` depends on unrecorded GitHub search text processing.

Last README change is `f9593dc` (2025-06-10T15:29:11-03:00), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 65 entries, all regular files `100644`; zero symlinks and zero gitlinks. Workspaces `packages/*` and `apps/*` (`pnpm-workspace.yaml:1–3`); three apps with `package.json`, `project.json`, `rsbuild.config.ts`, `module-federation.config.ts`, `src/` and `vercel.json` (shell’s is at root), plus package `zephyr-rsbuild-plugin`. | context |
| Configuration (host) | `apps/shell/module-federation.config.ts:17–24`: `name: "shell"` and `remotes` `courses@${COURSES_URL}/remoteEntry.js` and `profile@${PROFILE_URL}/remoteEntry.js`. Development URLs are `http://localhost:3001` and `http://localhost:3002`; production uses variables `VITE_*` or default Vercel URLs (`apps/shell/module-federation.config.ts:4–15`). `react`/`react-dom` are `eager` singletons (`apps/shell/module-federation.config.ts:25–37`). Configuration enters Rsbuild through `moduleFederation.options` (`apps/shell/rsbuild.config.ts:31–33`). | strong |
| Configuration (remotes) | `apps/courses/module-federation.config.ts:4–9` and `apps/profile/module-federation.config.ts:4–9`: `name` `courses`/`profile`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App" }`. Ports 3001 and 3002 (`apps/courses/rsbuild.config.ts:7–9`; `apps/profile/rsbuild.config.ts:7–9`), consistent with host dev URLs. | strong |
| Source code (consumption) | `apps/shell/src/App.tsx:6–7`: `lazy(() => import("courses/App"))` and `lazy(() => import("profile/App"))`, mounted at routes `/courses*` and `/profile*` within `Suspense` (`apps/shell/src/App.tsx:17–23`), with navigation in `Header` (`apps/shell/src/components/Header.tsx:16–43`). `apps/shell/src/remotes.d.ts:3–11` types modules. Remotes default-export `App` (`apps/courses/src/App.tsx:111`; `apps/profile/src/App.tsx:100`). | strong |
| Source code (boundaries) | Search for `from '../` and `import('../` in `apps` and `packages`: no occurrence. Apps depend on local plugin only as build package (`zephyr-rsbuild-plugin: workspace:*`, for example at `apps/shell/package.json:18`), and host accesses remotes only through federated specifiers. | context |
| Build/deploy | Separate builds and servers: each app runs `rsbuild build`/`rsbuild dev` (`apps/shell/package.json:6–12`; `apps/courses/package.json:6–12`; `apps/profile/package.json:6–12`), with own Nx targets (`apps/courses/project.json:6–20`). Separate Vercel deployment: `vercel.json:2–3` for shell, `apps/courses/vercel.json:2–3` and `apps/profile/vercel.json:2–3`. `package.json:5–9` orchestrates `dev`/`build` for all three. | moderate |
| Technology | `pnpm-lock.yaml:33–37` and `pnpm-lock.yaml:67–71` resolve `@rsbuild/core` 0.4.15 for `courses` and `profile`. `pnpm-lock.yaml:125–127` resolves 1.3.22 for `shell`. Remotes declare `@rsbuild/core` `^0.4.5` (`apps/courses/package.json:14`; `apps/profile/package.json:14`). Zephyr plugin wraps configuration with `withZephyr()` before creating compiler (`packages/zephyr-rsbuild-plugin/src/index.ts:4–10`). | ambiguous |
| Documentation | `README.md:9–29`: shell host and two remotes. `README.md:81–93`: Shell → Courses/Profile diagram. `README.md:117–127`: `pnpm dev` starts 3000/3001/3002. `README.md:95–101`: separate Vercel deployments. | moderate |

## Authorship and history

Non-shallow clone; 13 commits, no merge, all by Valdery Alves `<valdery.jur@gmail.com>`, from 2025-06-09 to 2025-06-10. By path (`git log --no-renames`): `apps/shell` 9 commits, `apps/courses` 5, `apps/profile` 6, `packages` 2. According to `git log --name-status`:
- root `5a52004` adds `shell` and `profile` with federation configurations and Zephyr plugin;
- `78c42b1` (“divides microfrontends between two page…”) adds `courses/module-federation.config.ts`;
- `9b23a4f` moves URLs to environment variables;
- SHA `766b6a2` adjusts Zephyr plugin.

History shows incremental host/remotes composition evolution by one author, without third-party code beyond dependencies. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three frontend units in repository, `shell`, `courses` and `profile`, with own entries (`apps/*/src/index.tsx`). Host references both remotes in federation configuration (`apps/shell/module-federation.config.ts:20–23`). |
| Q2 | Yes | Each unit has own `package.json`, `rsbuild.config.ts`, port, Nx target and `vercel.json`. No source-code import between them (search for `../` has no occurrences); host uses only `courses/App` and `profile/App`. |
| Q3 | Yes | Shell routes and mounts remotes (`apps/shell/src/App.tsx:6–7`, `17–23`). |
| Q4 | Yes | Module Federation configured on both sides, with consistent names, `filename`, key `./App` and dev ports (`apps/shell/module-federation.config.ts:7–23`; `apps/courses/module-federation.config.ts:4–9`; `apps/profile/module-federation.config.ts:4–9`; `apps/*/rsbuild.config.ts:7–9`, `31–33`) and consumed in code (`apps/shell/src/App.tsx:6–7`). |
| Q5 | Yes | Q1–Q4 are Yes: complete host → two remotes chain in documented development flow. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples … that actually compose frontend units”, with `repo_type: example` (description “Simple example…”; `README.md:3`: “demonstration”). Same complete chain as 076/084/096/106/109.
- Unlike 089/100, each remote exposes entire application, mounted as host route. Unlike 097/103/104, names, ports and exposes align.
- Zephyr Cloud is build/deploy platform wrapping Rspack, not third-party host composing units. 074/080/102 case does not apply.
- `approaches: [module-federation]`, `ui_technologies: [react]`. `build_tools: [rsbuild]`, as in 029, from explicit configurations (`apps/*/rsbuild.config.ts`). `frontend_units: 3`, without counting build plugin. `unit_organization: monorepo` (pnpm workspaces + Nx).
- No decision remains open: runtime composition through Module Federation, without iframe, links between applications or build-time packages.

## Analysis notes

- **RQ2:** Module Federation through native Rsbuild option `moduleFederation.options`, with environment-specific remote URLs and each unit deployed as separate Vercel project.
- **RQ1 (unverified operability):** row `ambígua` (English translation: “ambiguous”) records remotes use `@rsbuild/core` 0.4.15 and host 1.3.22, and Zephyr plugin changes configuration in every build/dev. This may affect execution, not performed, but does not change consistency of read configuration. Published demo (`README.md:5`) was not accessed.
- **Protocol (search):** plural hit has no corresponding spelling in README or description. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, three units, `module-federation` and `rsbuild`; no open decision. Resolution caveat, verified at SHA: local plugin declares `@rsbuild/plugin-react: ^0.4.5` and `@rsbuild/shared: ^0.4.5` (`packages/zephyr-rsbuild-plugin/package.json:22–38`), but corresponding importer in `pnpm-lock.yaml:141–158` records `^1.2.0` and `^0.7.10`. Lockfile does not represent current manifest specifications, so frozen installation is not demonstrably reproducible; deployments use `pnpm install --no-frozen-lockfile` (`vercel.json:2`; `apps/courses/vercel.json:2`; `apps/profile/vercel.json:2`). Host resolves Rsbuild 1.3.22 and both remotes 0.4.15 (`pnpm-lock.yaml:101–130`, `:33–40`, `:67–74`). Operability caution without class effect: configuration and Module Federation remote consumption are in snapshot. Final comparators: 029 (React/Rsbuild in monorepo, MFE-implemented) and 059 (host and remotes, different mechanism).
