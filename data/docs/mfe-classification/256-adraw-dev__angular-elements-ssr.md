---
schema: 1
id: 1165865529
full_name: adraw-dev/angular-elements-ssr
url: https://github.com/adraw-dev/angular-elements-ssr
commit: b9b6dfc7e74bfafd8c934c33515c6294f2b4f795
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 256 — adraw-dev/angular-elements-ssr

## Context

Next.js 16 / React 19 demonstration of using design system Web Components (Angular Elements `siste-ui-button` and `siste-ui-text-field`) with SSR, hybrid and client-only strategies (`README.md:1–16`). The components are not in the repository: they are loaded at runtime from an external CDN (`app/hooks/useDesignSystem.ts:3–4`, `:64–70`). The CDN path contains segment `micro-frontends/desing-lib`, the only occurrence of the term. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:257` records rank 256, ID 1165865529, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access (the CDN was not consulted).

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:257` records strategies `terminology;technology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:25375` and `data/discovery/mfe-round-002/candidates.csv:25382`, both with `terminology;technology` and `unknown`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T22:32:05.378Z / 2026-10-08T15:58:08.819Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T23:00:40.387Z / 2026-10-08T16:08:10.841Z |
| `technology-web-components-mfe-repositories`: `"web components" "micro frontends" in:readme` | no partition (same id as the query) | 2026-10-07T23:37:09.864Z / 2026-10-08T16:22:11.019Z |

Subqueries `#created:2026-02` append `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`; the web components subquery appends `pushed:>=2025-04-01`.

Hit metadata (identical in both rounds): null description, no topics, language TypeScript, `fork: false`, size 77, homepage `https://angular-elements-ssr.vercel.app`, created at 2026-02-24T16:20:27Z, pushed at 2026-02-24T16:25:15Z.

Without a description, the match comes from the README:
- **“micro frontends”:** only within the CDN URL in `README.md:93` (`…/frontend/micro-frontends/desing-lib/beta-1.0.0`); hyphen and slashes act as separators.
- **“micro frontend”:** does not appear literally; this hit depends on GitHub search text processing, which is not recorded.
- **“web components”:** `README.md:3`, `:9`, `:88`, among others.

The README was last changed at the SHA (2026-02-24T11:24:10-05:00, that is, 16:24:10Z), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 26 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single Next.js project with App Router: `package.json`, `next.config.ts`, `app/` (pages `/`, `/demo`, `/ssr`, `/client-only`, wrappers, hook, types) and `public/`. | contrary |
| Configuration / Build | `package.json:5–16`: `next dev/build/start` scripts and Next, React, React DOM and react-hook-form dependencies. `next.config.ts:3–5`: empty configuration. No federation or Angular package. | contrary |
| Source code (Web Component loading) | `app/hooks/useDesignSystem.ts:3–4`: `CDN_BASE` at `https://stoconopmercurio.blob.core.windows.net/frontend/micro-frontends/desing-lib/beta-1.0.0`; `:31–41`, `:64–70`: injects `siste-ui-elements.css`, `polyfills.js` and `main.js` from that CDN. Used by `app/demo/components-demo.tsx:7`, `:15` and `app/client-only/page.tsx:8`, `:17`. | ambiguous |
| Source code (use) | `app/components/Button.tsx:43–55` and `app/components/text-field.tsx:86–105`: React wrappers rendering `<siste-ui-button>` and `<siste-ui-text-field>` and listening for events (`clickButton`, `input`, `iconRightClick`). `app/vite-env.d.ts:10–100`: JSX types for these and other `siste-*` elements (select, checkbox, modal etc.). The elements are design system form controls, not applications. | contrary |
| Source code (boundaries) | Active relative import search in `app/`: only `../components/*` and `../hooks/useDesignSystem` within the same project (for example, `app/client-only/page.tsx:6–8`). | context |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfile and README, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie` and `registerApplication`: only the CDN URL in `useDesignSystem.ts:4`. No own `customElements.define`, no remote unit beyond the component package. | absent |
| Documentation | `README.md:88–98`: “Los Web Components se cargan desde el CDN de Azure” (English translation: “Web Components are loaded from the Azure CDN”) and lists both components; `README.md:231–234`: Web Components as custom elements requiring Client Components. No micro-frontends mention outside the URL. | context |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 2 commits (2 across all refs), no merges, both by `alejandro velez <alvelez@sistecredito.com>` as author and committer:
- root `a5b610c` (2026-02-24T11:22:13-05:00, “Initial commit: Next.js SSR demo with Angular Web Components”) adds the project at once;
- SHA `b9b6dfc` (2026-02-24T11:24:10-05:00) updates the README.

The corporate email and element prefix `siste-` suggest the design system belongs to the author’s organization, but the repository contains neither Angular code nor its configuration; nothing about it is asserted beyond the URL and element names.

`git rev-list --objects $SHA --missing=print` lists 1 missing object, outside the SHA tree (the earlier README version). No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit, the Next.js app (`package.json:5–10`). The package loaded from the CDN (`useDesignSystem.ts:64–70`) provides design system form controls (`Button.tsx:43–55`; `text-field.tsx:86–105`), not a frontend unit referenced by composition configuration. |
| Q2 | No | There are not two units to assess. |
| Q3 | No | The app does not load, mount or route another unit; it uses UI components within its own pages. |
| Q4 | No | There is no unit composition mechanism: script injection loads a Web Components library. |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- It matches “component libraries using Web Components”, here on the consumer side: the app uses buttons and fields from a design system published as custom elements. It also fits “conventional frontend monoliths”.
- Comparable to 042 (shared Web Components library classified as Non-MFE) and 044 (custom elements as internal components).
- The term “micro-frontends” appears only in the CDN storage path; it does not describe repository architecture.
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`. `build_tools: []`: Next.js encapsulates the bundler and there is no explicit configuration (`next.config.ts:3–5`). `vite-env.d.ts` is only a types file referencing `vite/client`, without Vite installed. `repo_type: example`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** the search term comes from a URL path (`…/micro-frontends/desing-lib/…`, `README.md:93`; `useDesignSystem.ts:4`), not text about architecture. Storage folders named `micro-frontends` can contain only shared libraries.
- **RQ1:** loading design system Web Components through `<script type="module">` at runtime has the same technical form as script composition, but the loaded artifact is a controls library.
- **Protocol (search):** the singular hit has no literal spelling; eligibility remains `unknown` in both rounds.
