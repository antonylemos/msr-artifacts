---
schema: 1
id: 1299611320
full_name: psca1234psca1234/react-micro-frontend-architecture
url: https://github.com/psca1234psca1234/react-micro-frontend-architecture
commit: 23c5cf3b9db892edba342cea53ae0eb18786828d
classification: Non-MFE
checklist: { q1: yes, q2: no, q3: yes, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, lit]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 042 — psca1234psca1234/react-micro-frontend-architecture

## Context

- **Repository type:** example/proof of concept (study monorepo "for mastering React, TypeScript, Web Components…", `README.md:3`, with "SENIOR INTERVIEW TIP" in comments)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | pnpm + Turborepo monorepo: `apps/canvas-app` and `apps/editor-app` (each with `package.json`, `vite.config.ts`, `src/main.tsx`), `packages/ui-library` (Lit Web Components + React bridge) and `packages/typescript-config` (`README.md:7-17`) (two apps) | moderate |
| Configuration | `apps/canvas-app/vite.config.ts:27-56` and `apps/editor-app/vite.config.ts:16-32`: only `@vitejs/plugin-react`, ports 5173/5174; no federation, `build.lib` or import map | absent |
| Structure (dependency between apps) | `apps/editor-app/package.json:43-49`: `"@abhishek/canvas-app": "workspace:*"` as a dependency | contrary |
| Source code (integration) | `apps/editor-app/src/components/Editor/CanvasBlockNode.tsx:45-48`: `lazy(() => import('@abhishek/canvas-app/src/components/Canvas/Canvas.tsx'))`, that is, **direct source code import** from the other app, resolved and bundled in the editor's build | contrary |
| Source code (Web Components) | `packages/ui-library/src/components/ui-card/UiCard.ts` (Lit component) + `react-bridge/UiCardReact.tsx`: shared component library | contrary |
| Documentation | Repository name; `docs/Micro-App Integration.md`, `docs/Web Component & Shadow DOM Bridge Prompt.md`, `docs/Monorepo Orchestration Prompt.md` (generation prompts) | weak |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `canvas-app` and `editor-app` |
| Q2 | **No** | `editor-app` directly imports `canvas-app` source code (`CanvasBlockNode.tsx:48`) through a workspace dependency (`package.json:49`); canvas is compiled into the editor's bundle |
| Q3 | Yes | `editor-app` embeds canvas in a Lexical editor block |
| Q4 | No | "Composition" is `React.lazy` + source code import, that is, code splitting within one build, not a mechanism connecting independent units |
| Q5 | No | Q2 and Q4 converge |

## Rationale

- Both apps exist, but integration uses direct source code imports in a single build. The operational Q2 criterion explicitly says units "do not import each other's source code directly".
- Web Components (`packages/ui-library`) form a shared component library, matching the Non-MFE case "component libraries using Web Components".
- The repository name promises a micro-frontend architecture that the implementation does not realize.

## Analysis notes

- **RQ1 (misleading signals):** monorepo with multiple apps + Web Components + "micro-frontend" in the name, but build-time integration through source code imports. Also touches the unresolved decision about build-time composition; here there is not even a published package, only direct `src/` imports.

## Recorded decision

- **Researchers' decision:** Non-MFE confirmed. Monorepos count as MFE only when units are composed at runtime; here there is **deployment dependency**: any change to `canvas-app` requires rebuilding and redeploying `editor-app`, because canvas is compiled into the editor's bundle.
