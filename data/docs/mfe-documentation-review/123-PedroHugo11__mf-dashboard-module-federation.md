---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 123 — PedroHugo11/mf-dashboard-module-federation

## Repository overview

Documentation is English root README. It presents project as a micro-frontend proof of concept using Module Federation in Vite, React and TypeScript (README.md:1-5), describes three applications and roles (README.md:9-25), lists technology (README.md:27-33) and concepts POC seeks to validate (README.md:37-45), ending with local run steps (README.md:49-82). READMEs in `shell/`, `mfe-counter/` and `mfe-weather/` are identical Vite "React + TypeScript + Vite" templates (shell/README.md:1-3; all three contents identical), without project claims.

README matches previous reviews in every structure and composition claim: three applications with own manifests and builds (structural review), shell loading two remotes through `@originjs/vite-plugin-federation` and rendering them on same dashboard (source-code and composition reviews), and remotes running independently too (mfe-weather/src/main.tsx:4-6; mfe-counter/src/main.tsx:4-6). Sole claim without artifact is independent deployment (README.md:24, 43): snapshot lacks deployment configuration, and build and deployment review recorded `not observed` for all three applications.

`artifacts.csv` lists only four READMEs above as `documentation`. `matches.csv` has 25 `doc-*` occurrences (`doc-mfe-term`, `doc-integration-technology`, `doc-runtime-loading` and `doc-independence`), all in root README.md, on 21 distinct lines. Table covers README.md:3 (claim 1), 5 (2), 11 (3), 14 (4), 16 (5), 19 and 20 (6), 22 (7, 8 and 9), 24 (7 and 8), 25 (9) and 32 (10). README.md:41, 42 and 43 repeat recorded claims and appear in paragraphs of claims 4, 2 and 2 and 8, respectively. README.md:1, 39, 56, 59, 65, 67 and 71 are title, purpose and run instructions, cited below.

Excluded from table:
- Title "Microfrontend Dashboard — Module Federation + Vite" (README.md:1), shell card title and subtitle "Module Federation • Vite • React" (shell/src/App.tsx:10-12), repeating claim 1;
- Tech Stack list "Vite", "React", "TypeScript" (README.md:29-31), unit technology already covered by claim 1;
- "This project is **not focused on the final product**" (README.md:39), concerning purpose rather than architecture;
- Run steps (README.md:51-82). Code block opened at README.md:55 is unclosed, leaving subheadings "Build and preview the Microfrontends", "Run the Shell (Host)" and "Finally" (README.md:65, 75, 80) inside it. These are commands and instructions: `npm install` in each project, `npm run build` and `npm run preview` in weather then counter, `npm run dev` in shell and address `http://localhost:5175` (README.md:56-82). This order assigns remote previews ports 4173 and 4174 expected by shell (shell/vite.config.ts:16-17), as composition and build and deployment reviews recorded.

Artifacts cited by previous reviews were read: three `vite.config.ts` and `package.json` files, `shell/index.html`, `shell/src/App.tsx`, `shell/src/main.tsx`, `shell/src/vite-env.d.ts`, `main.tsx`, `bootstrap.tsx` and widgets of both remotes, and root `.gitignore`. None has comments, and no `package.json` has `description`.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "demonstrate the usage of **Microfrontends with Module Federation** using **Vite, React and TypeScript**" | structure | corroborated | 3.4.3 (mfe-counter, mfe-weather and shell `Yes`); 3.4.2 (module-federation configured in all three); 3.4.5 #1, #2 |
| 2 | README.md:5 | "focusing on **application decoupling**, **independent builds**, and **runtime loading of remote front-end applications**" | independence | corroborated | 3.4.3; 3.4.6 #1, #2, #3 (`separate`); 3.4.4 (shell/src/App.tsx:3-4, `dynamic-loading`); 3.4.5 #1, #2 |
| 3 | README.md:11 | "The application is composed of three independent front-end applications" | structure | corroborated | 3.4.3 (Summary: 3 applications) |
| 4 | README.md:13-14 | "**Shell (Host)** Responsible for layout, orchestration and dynamically loading the microfrontends." | structure | corroborated | 3.4.5 #1, #2; shell/src/App.tsx:3-4, 16-28 |
| 5 | README.md:16-17 | "**Weather Microfrontend** A standalone widget exposed remotely and loaded by the Shell." | structure | corroborated | 3.4.3 (mfe-weather `Yes`); 3.4.5 #1; mfe-weather/vite.config.ts:15-18; mfe-weather/src/main.tsx:4-6 |
| 6 | README.md:19-20 | "**Counter Microfrontend** Another standalone widget, independently built and consumed by the Shell." | structure | corroborated | 3.4.3 (mfe-counter `Yes`); 3.4.6 #1 (`separate`); 3.4.5 #2; mfe-counter/src/main.tsx:4-6 |
| 7 | README.md:22, 24 | "Each microfrontend: […] Can be developed […] independently" | independence | corroborated | 3.4.3; mfe-weather/package.json:6-11; mfe-counter/package.json:6-11; mfe-weather/src/main.tsx:4-6; mfe-counter/src/main.tsx:4-6 |
| 8 | README.md:22, 24 | "Each microfrontend: […] Can be […] deployed independently" | build-deploy | uncorroborated | — |
| 9 | README.md:22, 25 | "Each microfrontend: […] Is loaded at runtime via Module Federation" | composition | corroborated | 3.4.4 (shell/src/App.tsx:3-4, `dynamic-loading`); 3.4.5 #1, #2 |
| 10 | README.md:32-33 | "**Module Federation** (`@originjs/vite-plugin-federation`)" | composition | corroborated | 3.4.2 (mfe-counter/package.json:13, mfe-weather/package.json:13, shell/package.json:13); 3.4.5 #1, #2 |
| 11 | README.md:45 | "Integration of multiple applications in a single UI" | composition | corroborated | 3.4.4 (shell/src/App.tsx:19, 25, `runtime-composition`); shell/src/App.tsx:16-28 |

## Observations

**1. README.md:3.** Project has three React frontend units with Vite and TypeScript (`.tsx` and `tsc -b` in build; shell/package.json:8), linked through Module Federation: remotes expose `./Widget` and shell consumes them (mfe-weather/vite.config.ts:14-20; mfe-counter/vite.config.ts:14-20; shell/vite.config.ts:14-20). Title (README.md:1) and dashboard subtitle (shell/src/App.tsx:12) repeat same idea.

**2. README.md:5.** Sentence states POC focus, and all three points hold: each application has own manifest, lockfile and configuration, without workspace or code imported from another unit outside federation, and only `react` and `react-dom` are shared at runtime (shell/vite.config.ts:19); three builds are separate (3.4.6); remotes load at runtime through `React.lazy` (shell/src/App.tsx:3-4). "Purpose" concept list repeats three points: "Runtime loading of remote applications" (README.md:42), "Independent builds" part of README.md:43 and "Front-end decoupling by responsibility" (README.md:44), also reiterating roles from claims 4 through 6. "Has its own build process" (README.md:23) repeats independent builds. Remotes do not communicate with each other or shell beyond being rendered by it (source-code review, Notes).

**3. README.md:11.** Three applications at root, `shell`, `mfe-weather` and `mfe-counter`, each with own `package.json`, `index.html` and `vite.config.ts`, and no workspace declaration (structural review).

**4. README.md:13-14.** Shell hosts both Module Federation relationships, loads `weather/Widget` and `counter/Widget` through `React.lazy` and constructs card layout with `Suspense` and loading skeleton (shell/src/App.tsx:3-4, 16-28). "Microfrontend architecture using a Shell (Host)" (README.md:41) repeats claim.

**5. README.md:16-17.** Remote `weather` exposes `./Widget` from `./src/bootstrap` (mfe-weather/vite.config.ts:15-18), reexporting `WeatherWidget`; same widget mounts independently through unit's own entry (mfe-weather/src/main.tsx:4-6). Widget is static component with temperature and city fixed in code (mfe-weather/src/WeatherWidget.tsx:4-5).

**6. README.md:19-20.** Remote `counter` has own build (mfe-counter/package.json:8; mfe-counter/vite.config.ts:14-18), runs independently through own entry (mfe-counter/src/main.tsx:4-6), and renders in shell "Counter" card (shell/src/App.tsx:23-27).

**7. README.md:22, 24.** Subject is micro-frontends, namely both remotes. Each has own manifest, lockfile and scripts `dev`, `build` and `preview`, and an entry mounting widget without shell; nothing requires developing them together. Claim split from 8 because independent development has artifact while deployment does not.

**8. README.md:22, 24.** Snapshot has no Dockerfile, CI or hosting configuration, and build and deployment review recorded `not observed` for all three applications; sole way to serve remotes is local `vite preview` (mfe-weather/package.json:10; mfe-counter/package.json:10). Fixed `localhost` URLs in shell (shell/vite.config.ts:16-17) neither refute claim, since remote can be republished at same address without rebuilding shell, nor support it. "deployments" part of "Independent builds and deployments" (README.md:43) repeats claim.

**9. README.md:22, 25.** Shell loads both remotes at runtime through `remoteEntry.js` entries declared in shell/vite.config.ts:15-18, with dynamic `import()` inside `React.lazy` (shell/src/App.tsx:3-4). Composition review records both relationships as active `module-federation`.

**10. README.md:32-33.** Named plugin matches dependency review's record in three units, `@originjs/vite-plugin-federation` `^1.4.1`, configured in each `vite.config.ts` (mfe-counter/vite.config.ts:3; mfe-weather/vite.config.ts:3; shell/vite.config.ts:3).

**11. README.md:45.** Both remote applications appear on one shell page, in two cards of same grid (shell/src/App.tsx:16-28).

## Summary

Claims: 11 (corroborated: 10, partial: 0, contradicted: 0, uncorroborated: 1). Themes: (structure: 5, composition: 3, build-deploy: 1, independence: 2).
