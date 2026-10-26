---
schema: 1
id: 1408068032
full_name: israelmeinert/fiap-aula-arquitetura-no-front
url: https://github.com/israelmeinert/fiap-aula-arquitetura-no-front
commit: e1c6fb92488afd39e2c1d704ee1243ed52d862b6
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [runtime-script]
ui_technologies: [react, angular]
build_tools: [esbuild, vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 283 — israelmeinert/fiap-aula-arquitetura-no-front

## Context

Front-end architecture class material: HTML/Markdown slides, outline, exercises and 14 executable examples implementing the same domain (“EventFlow”) in different architectural styles (`README.md:1–5`; `scripts/exemplos.json:1–86`). Only block 10, `exemplos/10-micro-frontends/`, composes units: a shell (Vite/TypeScript) loads two remotes at runtime, React Catalog and Angular Checkout. Each remote is separately compiled to an ESM module served on its own port (`exemplos/10-micro-frontends/README.md:15–23`). Other 13 blocks are isolated applications, without composition relationships. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:284` records rank 283, ID 1408068032, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:284` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:38520` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:38556` (`terminology`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:>=2026-10-01` | 2026-10-07T22:44:09.214Z / 2026-10-08T16:02:37.417Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:>=2026-10-01` | 2026-10-07T23:13:19.642Z / 2026-10-08T16:11:03.037Z |

Effective queries append `pushed:>=2025-04-01 created:>=2026-10-01`.

Hit metadata (same in both rounds): null description, no topics, language HTML, `fork: false`, size 277, created at 2026-10-07T00:47:22Z, pushed at 2026-10-07T00:48:50Z.

Without a description, the hit comes from README:
- **“micro frontends”:** “micro-frontends” at `README.md:22`, `:28` and `:49`; hyphen acts as separator.
- **“micro frontend”:** singular form does not appear literally in root README; that hit depends on GitHub search text processing, which is not recorded.

README exists only in the single commit, the SHA (2026-10-06T21:48:41-03:00, i.e., 2026-10-07T00:48:41Z). It precedes collection, and the SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 405 entries, all regular `100644` files; zero symlinks and zero gitlinks. Root with `package.json` (workspaces `exemplos/*/react`, `angular`, `next`, `astro`, `apps/*`; `package.json:9–15`), slides (`aula-arquitetura-front-end.html`, `conteudo/`), `material/`, `scripts/`, `tests/` and 14 folders in `exemplos/`. Block 10: `apps/shell`, `apps/catalogo-react`, `apps/checkout-angular` and `packages/contracts`. | context |
| Source code (remotes) | `exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3–6`: `export async function mount(host)` creates a React root and returns cleanup. `exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4–12`: `mount(host)` creates an Angular application (`createApplication`, `createComponent`) and returns cleanup. | strong |
| Build (remotes) | `catalogo-react/package.json:6–9` and `checkout-angular/package.json:6–9`: `build` with `scripts/build-remoto.mjs` (Angular first with `ngc`) and `dev` with `scripts/servir-remoto.mjs` on ports 4301/4302. `scripts/build-remoto.mjs:21–26`: esbuild generates `dist/microfrontend.js` in ESM format from `src/mount.tsx` or `dist/compiled/mount.js`. `scripts/servir-remoto.mjs:1–6`: static `dist` server with CORS for shell at 4300. | strong |
| Configuration (shell) | `exemplos/10-micro-frontends/apps/shell/public/remotes.json:1–5`: versioned manifest with `catalogo` → `http://127.0.0.1:4301/microfrontend.js` and `checkout` → `http://127.0.0.1:4302/microfrontend.js`. `apps/shell/package.json:6–9`: Vite on port 4300 and its own build. | strong |
| Source code (composition) | `apps/shell/src/main.ts:8–35`: fetches `/remotes.json`, validates version and origin (`:16–22`), loads remote through `import(/* @vite-ignore */ url.href)` (`:23`), checks `mount` contract (`:25`), mounts in its own slot (`:26`) and calls cleanup on switching or unmounting (`:7`, `:27–28`). `:36–38`: buttons to open catalog, checkout and unmount. | strong |
| Configuration (contract) | `exemplos/10-micro-frontends/packages/contracts/mount.ts:1–5`: types `Cleanup`, `Mount`, `Remote` and `Manifest` (“Contrato de integração versionado, sem componentes ou estado global compartilhados”, English translation: “Versioned integration contract, without shared components or global state”). | moderate |
| Source code (boundaries) | Active search for relative imports crossing folders in block 10. Shell imports only contract types (`apps/shell/src/main.ts:1`, `import type … from '../../../packages/contracts/mount'`) and material's common stylesheet (`:2`, `../../../../../material/estilos.css`). Remotes import neither shell nor each other (`catalogo-react/src/App.tsx:1`; `checkout-angular/src/mount.ts:1–3` import only frameworks and their own files); `../../../../scripts/*` in `package.json` are common build tools. No source code imports between units. | context |
| Tests | `tests/e2e/aula.spec.ts:142–154`: block 10 e2e test covers mounting, cleanup, remounting and remote failure (manifest with nonexistent URL). | moderate |
| Documentation | `exemplos/10-micro-frontends/README.md:17–23`, `:107`, `:111`, `:117–125`: shell → manifest → remote ESM module → `mount` → `cleanup` flow, separate builds and exercise recompiling only catalog without rebuilding shell. Independent deployment is described, not provisioned (“o laboratório não provisiona um pipeline de deploy”, English translation: “the laboratory does not provision a deployment pipeline”). | moderate |

## Authorship and history

Non-shallow clone. There is 1 commit, the SHA and root (1 across all refs), without merges: author and committer `Israel M. <israelmeinert@gmail.com>`, 2026-10-06T21:48:41-03:00, “material completo da aula de front com slides implementação dos exemplos para cada arquitetura com exemplos de angular e react” (English translation: “complete front-end class material with slides, implementation of examples for each architecture with angular and react examples”). The single commit cannot distinguish evolution or per-folder authorship. `git rev-list --objects $SHA --missing=print` lists no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units in block 10: `shell`, `catalogo-react` and `checkout-angular`, the latter two referenced by composition manifest (`apps/shell/public/remotes.json:3–4`). |
| Q2 | Yes | Each unit has its own entry and build (shell: Vite, `apps/shell/package.json:7–8`; remotes: esbuild/ngc, `catalogo-react/package.json:7`, `checkout-angular/package.json:7`). No source code imports between units; shell imports only contract types (recorded search). |
| Q3 | Yes | Shell loads and mounts remotes on its page (`apps/shell/src/main.ts:23–28`, `:36–37`). |
| Q4 | Yes | Runtime composition through manifest and remote ESM module `import()`, with verified `mount`/`cleanup` contract (`main.ts:16–28`; `packages/contracts/mount.ts:2–5`). Manifest URLs and ports match remote servers (`servir-remoto.mjs:2–6`; each remote's `package.json`). |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes. Matches “examples, templates, and proofs of concept that actually compose frontend units”.
- Repository is teaching material with several architectural styles, but block 10 implements and tests composition. Not content without implementation (023/075/081/094/105).
- Follows final 007 (example repository with actual composition in some examples) and 002 (runtime URL loading with `mount` contract).
- Other 13 blocks were not counted as units: isolated applications, like unrelated demos in 193.
- Not code sharing (089/100): remotes are complete React and Angular applications, mounted with their own instances.
- Not an unconnectable chain (097/103/104): manifest, allowed origins and ports match.
- `approaches: [runtime-script]`: closest existing slug (002). Here loading is through ESM module `import()` instead of `<script>`; see notes.
- `frontend_units: 3`, `unit_organization: monorepo`, `ui_technologies: [react, angular]`, `build_tools: [esbuild, vite]`, `repo_type: example`.
- No open decision changes class.

## Analysis notes

- **RQ2 (approach):** composition through JSON manifest and dynamic `import()` of remote ESM modules, with typed contract `mount(host) → cleanup`, version checking and allowed-origin list. Close to `runtime-script` (002), but without injected `<script>` or `window` global. If researchers prefer distinguishing ESM URL loading from script loading, this is the first such case in this screening series. No new slug is created in this draft.
- **RQ2:** heterogeneous remotes (React and Angular AOT with linker) mounted by the same shell, each embedding its framework (`exemplos/10-micro-frontends/README.md:125`).
- **RQ1:** repository mixes micro-frontends with 13 other architectures; automated `package.json` counts (all workspaces) would overestimate composed units.
- **Protocol (search):** singular hit has no literal spelling in root README. Eligibility changes from `unknown` (001) to `pass` (002). Repository created on 2026-10-07, within partition `created:>=2026-10-01`.
