---
schema: 1
id: 1191011861
full_name: sero-labs/sero-humanizer-plugin
url: https://github.com/sero-labs/sero-humanizer-plugin
commit: 3acd5e15eb656c8a8aa967ca9547b4adf78f3ac1
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 222 — sero-labs/sero-humanizer-plugin

## Context

Sero “Humanizer” plugin (`package.json:2–4`; `README.md:1–5`). Rewrites text in various styles and removes AI-writing patterns, with two parts:
- Pi agent extension (`extension/index.ts`), with tool, command and skill (`skills/humanizer/SKILL.md`);
- React web UI built as Module Federation remote (`vite.config.ts:1–52`), loaded and mounted by Sero host in main area (`README.md:41–46`).

Manifest declares Sero app (`package.json:23–45`), with `"ui": "./dist/ui/remoteEntry.js"` and `"component": "HumanizerApp"`. Sero host is absent from repository. Repository and organization names are not used as evidence.

`data/samples/mfe-sample-001/clones.csv:223` records rank 222, ID 1191011861, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:223` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:27135` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:27141` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same hit in each round, at endpoint `code`:

| Query (`q`) | Subquery / effective query | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:2000..2249` / `"@module-federation" filename:package.json size:2000..2249` | `package.json` | 2026-10-07T19:59:44.705Z / 2026-10-08T15:42:41.920Z |

`package.json` is 2.200 bytes at SHA, within range, and declares `"@module-federation/vite": "1.21.6"` (`:60`). Value was recorded by SHA itself, `3acd5e1` (2026-09-26, “upgrade Module Federation Vite to 1.21.6”), before collections. Code-hit metadata provide only description “Humanizer app for Sero — transform text with creative writing styles and remove AI patterns”, without topics or dates. Entry is code-only. README contains neither micro-frontend nor Module Federation terms.

In both rounds same organization has 17 other candidates, including `sero-labs/sero` (ID 1152424927) and several `sero-*-plugin`. Only this repository appears in sample (`sample.csv:223`).

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 40 entries, all regular files `100644`; zero symlinks and zero gitlinks. One package: `ui/` (React app, `index.html` “Sero Humanizer (remote)”, components and libs), `extension/` (Pi extension), `shared/types.ts`, `skills/`, `vite.config.ts` and `package.json`. | context |
| Configuration (remote) | `vite.config.ts:21–36`: `federation({ name: 'sero_humanizer', filename: 'remoteEntry.js', manifest: true, exposes: { './HumanizerApp': './ui/HumanizerApp.tsx' }, shared: react/react-dom/streamdown singleton })`. Comment says “The host (Sero on 5173) declares this as a remote and imports components via MF” (`:4–5`). Own port 5192 (`:38–42`). | strong |
| Host contract | `package.json:23–34`: `sero.app` with `ui: "./dist/ui/remoteEntry.js"`, `component: "HumanizerApp"`, `devPort: 5192`, `styleIsolation: "scope"`. `ui/HumanizerApp.tsx:18`, `37–39`: uses `useAppState` and `useAI` from platform runtime (`@sero-ai/app-runtime`). `README.md:9–16`: Sero clones, installs, builds UI and loads it in sidebar. | strong |
| Host | Sero host is absent from snapshot. It appears as candidate `sero-labs/sero` in rounds, outside sample and uninspected. | ambiguous |
| Source code (boundaries) | Relative imports stay within package: `ui/` and `extension/` share `../shared/types` (`ui/HumanizerApp.tsx:22–23`; `extension/index.ts:21–22`), plugin’s own types. No other frontend unit. | context |

## Authorship and history

Non-shallow clone; 21 linear commits, no merge, by same person: 15 as monobyte and 6 as Dan Carter, with same email.
- **Root:** `c2ddd55` (2026-03-24, “feat(SERO-008): initial plugin scaffold — @sero-ai/plugin-humanizer”).
- **Evolution:** governance in April (license, CODEOWNERS, CI); then SDK, platform-runtime and Module Federation updates (`e54aa46`, SHA `3acd5e1`).

Installation README points to `github.com/monobyte/sero-humanizer-plugin` (`README.md:12`), compatible with transfer, rename or earlier origin, but not proof of repository transfer; current Sero relationship is more directly supported by `CONTRIBUTING.md:5`, manifest and platform runtime. No historical blob was read. Clone is partial (`blob:none`) and `git rev-list --objects --all --missing=print` finds 28 missing historical objects; SHA evidence files were read, and commit messages/statuses are available.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend unit (`ui/`); repository composition configuration has only `exposes`, without referencing another unit. |
| Q2 | Yes | Own entry, build (`vite build`, `package.json:10–14`) and port; separately installed/built by host (`README.md:15–16`). |
| Q3 | Undetermined | Sero host is not observable; manifest and comment indicate host mounting (`package.json:31–32`; `vite.config.ts:4–5`). |
| Q4 | Undetermined | Mechanism prepared on remote side (`exposes`, `remoteEntry.js`, manifest), but connection depends on absent host. |
| Q5 | No | One unit prepared for composition by unobservable external host. |

## Rationale

- `MFE-unit` under rule “single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, with exception vector (`q1: no`, `q2: yes`, `q3/q4: undetermined`, `q5: no`) of finals 001/050/069/004/058.
- Same case as drafts 161 and 189: Module Federation remote for own organization’s extension platform, with manifest and platform runtime. Thus status is `review`, awaiting same decision about 037 (platform plugin, final `Non-MFE`).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 1`, `unit_organization: single-unit`. `repo_type: production`, as published plugin with version, CI, license and security policy; if review prefers `example`, as in 161/189, field follows decision.

## Analysis notes

- **RQ2:** AI-agent desktop application (Sero) plugins distributed as Vite Module Federation remotes, with CSS isolation (`seroPluginCssScope`, `vite.config.ts:20`) and host-mediated state.
- **Protocol (sample):** organization has 18 candidates in each round (host and many plugins), only one in sample; host lies outside sample.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

1. **First-party platform plugin:** does a Module Federation remote prepared for own organization’s extension host count as MFE-unit or follow 037?
   - **MFE-unit (proposed):** `exposes`, `remoteEntry.js`, singleton `shared` and explicit host contract, as 161/189.
   - **Non-MFE:** follows 037, since sole host is platform’s plugin mechanism.
2. **`repo_type`:** `production` (published/maintained plugin) or `example`, as used in 161/189.

No new rule is proposed. Until decision, preserve `MFE-unit`/`review`, consistent with 161 and 189.
- **Independent-review contribution (Lupa):** provisional agreement with MFE-unit and `review`: React unit is explicitly prepared for Module Federation composition and consumer host is unobservable (mounting only documented, `README.md:15–16,43–46`; local host-clone search yielded nothing). No/Yes/Undetermined/Undetermined/No vector is consistent with exception. Real decision concerns platform precedent 037; mere name "plugin" does not eliminate proven preparation. Finals 001, 050 and 069 classify as MFE-unit one unit with explicit exposure/contract and absent host, and 004 and 058 confirm vector. Reviewer recommends retaining `repo_type: production` (without second pending decision) and focusing review point on plugin-rule scope; if Non-MFE under 037 prevails, class and `approaches` must follow template convention while preserving observed federation in body. README was last changed in `80802ec` (2026-03-24), before searches.
