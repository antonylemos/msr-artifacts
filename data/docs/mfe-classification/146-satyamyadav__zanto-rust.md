---
schema: 1
id: 1264718438
full_name: satyamyadav/zanto-rust
url: https://github.com/satyamyadav/zanto-rust
commit: 5495c74f9c107afebc6b22b389e9109477c1f588
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [svelte, astro]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 146 — satyamyadav/zanto-rust

## Context

“zanto”: local-first Rust AI assistant, with library `zanto-core`, terminal CLI and Tauri desktop app with SvelteKit UI, plus Astro marketing site in `site/` (`README.md:9`; `README.md:92–99`; `site/astro.config.mjs:11–18`). Product calls internal tools “micro-apps”, such as Personal Finance (`README.md:39–40`). These are Svelte modules of same desktop build, statically imported by canvas, not separate frontend units. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:147` records rank 146, ID 1264718438, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:147` records strategy `broader` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:31587` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:31595` (`broader`, `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | `broader-micro-apps#created:2026-Q2` | `"micro apps" frontend in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:50:27.916Z / 2026-10-08T16:27:12.314Z |

Hit metadata:
- description about local-first AI workspace, with “focused apps like Personal Finance”, without “micro apps”;
- topics include `desktop-app`, `tauri` and `sevltekit`;
- Rust language, `fork: false`, creation at 2026-06-10T05:57:57Z, push at 2026-07-02T17:46:20Z, GitHub Pages homepage.

README contains “**Micro-apps.**” (`README.md:39`, hyphenated spelling) and “frontend” (`README.md:97`, “terminal frontend”), both query-required terms.

Last README change is `fa0dbd7` (2026-06-28). It and SHA (2026-07-02) predate October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 411 entries, 410 regular files `100644` and 1 executable `100755` (`install.sh`); zero symlinks and zero gitlinks. Cargo workspace with `crates/zanto-core`, `crates/zanto-cli` and `crates/zanto-desktop` (`README.md:94–99`), Astro site in `site/` and documentation in `docs/`. Only two frontend projects: `crates/zanto-desktop/package.json` and `site/package.json`. | context |
| Source code (micro-apps) | `crates/zanto-desktop/src/lib/components/Canvas.svelte:6`: `import FinanceV1 from "$lib/apps/finance/FinanceV1.svelte"`, rendered at `Canvas.svelte:116–120`. `crates/zanto-desktop/src/lib/registry.ts:13–15`, `32–34`: finance components registered in a static map alongside generic blocks. `crates/zanto-desktop/src/lib/stores/app.svelte.ts:15–24`: lists and “mounts” apps through Tauri IPC, that is, activates backend profile, not frontend code loading. | contrary |
| Documentation (architecture) | `docs/product.md:27–33`: “A micro app is a self-contained Svelte module mounted in the desktop shell's right-side panel… Think micro-frontends — each app is independently defined, mounted, and switched at runtime”. `crates/zanto-desktop/src-tauri/src/app.rs:1–4`: app = Rust slice + Svelte slice + manifest. `docs/archive/genui-d.md:70–71` and `75`: micro-app “not a separately built application”; “CDN/ESM micro-app” delivery was discarded. | contrary |
| Configuration / Build/deploy | Desktop: one SvelteKit build with `adapter-static` (`crates/zanto-desktop/svelte.config.js:9–15`) and Vite (`crates/zanto-desktop/vite.config.js:12–41`), packaged by Tauri (`crates/zanto-desktop/src-tauri/tauri.conf.json:6–11`). Site: independent static Astro (`site/package.json:7–11`; `site/astro.config.mjs:11–18`). Neither loads other. | contrary |
| Source code (boundaries) | Relative-import search in `site` and `crates/zanto-desktop/src`. Desktop `../` stays within `src/lib/apps/finance` (for example, `v1/AccountsTab.svelte:4–6`), and `src/lib/mock/backend.ts:8` reads fixtures in `contract/`, of same project. Site references neither `crates/` nor desktop. | context |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfiles and `docs/archive`, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` and `wujie`. Hits are text, plus executable component `Html.svelte` (sandbox iframe for generated HTML, reopened in `ArtifactHub.svelte:360`), not a remote unit: `docs/product.md:31`, `docs/feature-roadmap.md:51` (sandbox iframe for generated HTML artifacts, as plan) and false positives (`fetch_url.rs:276`, `import.rs:208`, `finance-v1-plan.md`). No composition mechanism. | absent |

## Authorship and history

Non-shallow clone; 336 commits, no merge, all by Satyam `<satyamyadav3@gmail.com>`, from 2026-06-09 (`24acb39`, “core structure”) to 2026-07-02. By path (`git log --no-renames`): `crates/zanto-desktop` 231 commits, `crates/zanto-core` 76, `site` 3 and `docs` 78. Tags `v1.0.0-beta.0` to `v1.0.0-beta.3` and two remote refs `worktree-agent-*` exist, whose content was not considered. `CLAUDE.md` and `.claude/` indicate coding-assistant use; metadata do not separate intellectual authorship. No historical blob was read. Complete `git log --name-status` traversal in `crates/zanto-desktop`, `crates/zanto-core` and `docs` fails with `GIT_NO_LAZY_FETCH=1` for unavailable promisor objects in partial clone; necessary path logs are available.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two identifiable frontend projects in repository: SvelteKit/Tauri desktop application and Astro site (`frontend_units: 2`). “Micro-apps” are not separate units: modules of same build imported statically (`Canvas.svelte:6`; `registry.ts:13–15`). Q1 counts identifiable repository units, referenced by composition configuration or otherwise (cf. 042). |
| Q2 | Yes | Desktop and site have own entry/build and do not import each other’s code; site is independent of desktop. Finance shares entry/build with desktop shell (`svelte.config.js:9–15`; `vite.config.js:12–41`), and does not count separately. |
| Q3 | No | Desktop mounts internal modules, not independent units. Site and desktop do not participate in same application. |
| Q4 | No | No frontend composition mechanism is configured. “Mounting” is static import plus IPC profile activation (`app.svelte.ts:21–24`). |
| Q5 | No | Q1–Q4 are No: modular desktop app with internal “micro-apps” and separate site, without unit composition. |

## Rationale

- `Non-MFE` under rule “at least one question is No” (Q3 and Q4 No; Q1 and Q2 Yes for two independent frontend projects, desktop and site, not composing each other). Matches “conventional frontend monoliths”, for internal modularization called micro-app, and “monorepos containing several unrelated frontend applications” (desktop and site).
- Analogy “Think micro-frontends” (`docs/product.md:31`) is self-description, and design history itself records discarded separate micro-app delivery (`docs/archive/genui-d.md:70–75`). Thus it is not treated as composition mechanism.
- `frontend_units: 2` (SvelteKit desktop and Astro site), `unit_organization: monorepo`. `ui_technologies: [svelte, astro]`. `build_tools: [vite]` through explicit desktop configuration; Astro encapsulates site bundler. `repo_type: production`: product distributed through releases and tags (`README.md:43–50`).
- No decision remains open: roadmap iframe is sandbox for generated artifacts, not unit composition, and is not implemented as composition.

## Analysis notes

- **RQ1 (misleading signals):** “micro-app” as internal product-module name (with Rust backend and Svelte UI in same binary), accompanied by analogy “Think micro-frontends”. Broad query `"micro apps" frontend` captures this vocabulary.
- **Protocol (search):** both query terms appear in distinct README lines (`README.md:39`, `97`). Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** agreement with Non-MFE and `draft`; adopted disagreement in Q1/Q2 answers, changed from No to Yes. Verifiable rationale: literal Q1 text counts identifiable repository frontend units, and Q2 asks for own entry/build without code import between units; desktop and site satisfy both, and final 042 applies Q1 Yes to two monorepo frontend apps, excluding class through Q4 No. Here, additionally, desktop and site do not compose (Q3 No), and Q5 No follows Q3/Q4. Description of search for `<iframe` and assertion of no missing historical objects were also corrected.
