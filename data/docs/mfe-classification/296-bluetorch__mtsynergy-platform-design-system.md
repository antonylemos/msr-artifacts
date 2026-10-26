---
schema: 1
id: 1163740306
full_name: bluetorch/mtsynergy-platform-design-system
url: https://github.com/bluetorch/mtsynergy-platform-design-system
commit: 083c31698fea69c741812937fba32b63bc7a8ffa
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react]
build_tools: [tsup]
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 296 — bluetorch/mtsynergy-platform-design-system

## Context

- **Repository type:** React component library (design system) published as npm package `@mtsynergy/platform-design-system` (`package.json:3–5`), with tokens, Tailwind preset, compiled CSS and Storybook (`README.md:1–12`). According to README, consumed by a shell and micro-frontends maintained in other repositories (`README.md:571–593`, `659–665`), none present in snapshot. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:297` records rank 296, ID 1163740306, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:297` records strategies `terminology;broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:25249` (`terminology;broader`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:25256` (`terminology;broader`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-02` | `… pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T22:32:05.378Z / 2026-10-08T15:58:08.819Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-02` | `… pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T23:00:40.387Z / 2026-10-08T16:08:10.841Z |
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `broader-micro-apps#created:2026-Q1` | `… pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:49:49.455Z / 2026-10-08T16:27:03.230Z |

Hit metadata: description “The React Component Library — UI Components, Tailwind Tokens, Storybook for MTSynergy” (without terms), no topics, language TypeScript, Apache-2.0, `fork: false`, size 410, created at 2026-02-22T04:14:33Z, pushed at 2026-02-23T08:40:37Z.

README match:
- “micro frontend”: `README.md:466` (“### Micro-Frontend Considerations”) and `README.md:468` (“For Micro-Frontend (MFE) architectures”), with hyphen treated as separator. Plural “micro frontends” does not appear literally; that hit depends on GitHub search text processing, which is not recorded.
- “micro apps” + “frontend”: `README.md:472` (“Consumer micro-apps”) and, singular, `README.md:470` (“each micro-app”); “frontend” occurs at `README.md:466`/`468`.

Last reachable README change is SHA `083c316` itself (2026-02-23), before collection on October 7 and 8, 2026. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 219 entries, 216 regular `100644` files, 2 executables `100755` (`.husky/pre-commit`, `scripts/build-css.mjs`), 1 symlink `120000` (`SPECIFICATION.md` → local absolute path `/Users/bholt/dev/mtsynergy/SPECIFICATION.md`, nonexistent in repository) and zero gitlinks. A single package: `package.json`, `src/` (10 components with stories and tests, theme, tokens), `.storybook/`, `scripts/` and 85 Loki reference PNGs stored as Git LFS pointers (`.gitattributes:2`). | contrary |
| Configuration (package) | `package.json:6–30`: `main`/`module`/`types` and `exports` (`.`, `./tokens`, `./tailwind-preset`, `./tokens.json`, `./styles.css`); `:52–55`: React as `peerDependencies`; `:109–111`: internal npm registry publication. `tsup.config.ts:3–9`: library build (CJS/ESM + d.ts) from `src/index.ts`, `src/tokens/index.ts` and `src/tailwind.preset.ts`. | contrary |
| Source code | `src/index.ts:1–19`: only reexports components (`Button`, `Input`, `Modal`, …), `ThemeProvider`/`useTheme` and theme utilities; for example, `src/components/Button.tsx:3–12` defines a presentation component. No application entry, DOM mounting, routes or lifecycles. | contrary |
| Source code (boundaries) | Search for `../` specifiers: only within package itself (`src/theme/web/*.ts` → `src/theme/types`; `scripts/generate-tailwind-config.ts:10–12` → `src/`; `.storybook/main.ts:4`, `.storybook/preview.ts:3`). With a single package, there is no unit boundary to cross. | context |
| Documentation (MFE) | `README.md:466–490`: recommends loading CSS once in host and shows a `HostShell` with `<MicroApp1 />` and `<MicroApp2 />` as code block example; `README.md:571–593`: CDN and import map distribution in “platform-shell”; `README.md:659–665`: related projects `platform-shell`, `platform-mfe-publishing`, `platform-mfe-inbox`, `platform-mfe-reporting`, outside repository. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except Markdown and `package-lock.json`, for `federation`, `single.?spa`, `remoteEntry`, `importmap`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `systemjs`, `registerApplication`, `bootstrap` and `mount`: no occurrences. Import map exists only as README example. | absent |
| Build/deploy | `.onedev-buildspec.yml:3–66`: CI with lint, formatting, tests, `npm run build` and Storybook build; `:75–105`: “Publish” job with `npm publish` to internal registry (`:105`). No application deployment step. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 18 reachable commits (18 across all refs), no merges, root `c078f8f` (2026-02-21, “Initial commit”) and SHA `083c316` (2026-02-23, “feat(DS-1005): implement complete theming solution with compiled CSS”). Authorship: Bruce Holt with two emails, `bruce.holt@spaceiq.com` (17 local commits) and `bjholt@gmail.com` (1, through web interface). Files `.github/agents/riper.agent.md`, `.github/prompts/*` and `.github/memory-bank/**` (per-feature plans and reviews DS-1001 through DS-1005) indicate coding assistant use; metadata does not distinguish intellectual authorship. No historical blob was read. `git rev-list --objects $SHA --missing=print` identifies 40 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit: only package is a component library without application entry (`src/index.ts:1–19`; `tsup.config.ts:3–9`); no repository composition configuration references external units (recorded search). Shell and MFEs appear only in README. |
| Q2 | No | No units to assess. |
| Q3 | No | No host, shell or root config in repository; `HostShell` is documentation example (`README.md:476–490`). |
| Q4 | No | No configured composition mechanism; import map is described in README (`README.md:573–583`), rather than versioned as configuration. |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “component libraries” and, by analogy, “MFE frameworks and libraries”: a shared dependency in an MFE ecosystem, rather than a composed unit or host.
- Not `MFE-unit`: package is unprepared for host mounting as a unit (no `exposes`, lifecycles, SystemJS bundle or application entry); cited import map distributes library as shared dependency, approaching code sharing (089/100), rather than composition.
- No composed third-party unit (102/074/080) or chain to assess (097/103/104; 076/084/096/106/109).
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `ui_technologies: [react]`, `build_tools: [tsup]` (`tsup.config.ts`; Storybook uses Vite only for documentation, `.storybook/main.ts:11–14`).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** MFE ecosystem design system with “Micro-Frontend Considerations” section and `HostShell` example in README; MFE vocabulary comes from consumption documentation, rather than composition artifacts.
- **RQ3:** shared library distribution through CDN and import map in shell (`README.md:571–593`) is an MFE dependency-sharing pattern; if sibling repositories (`platform-shell`, `platform-mfe-*`) exist in rounds, family could show composition. Search for `bluetorch/` in `data/discovery/mfe-round-002/candidates.csv` found only this repository (`:25256`).
- **Protocol:** symlink `SPECIFICATION.md` points to an absolute path on author's machine; specification content is not in repository.
