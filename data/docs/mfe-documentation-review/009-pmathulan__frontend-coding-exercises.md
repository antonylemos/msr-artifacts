---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Repository overview

Documentation is in English. The root README presents the repository as a set of exercises for a technical assessment, each in its own folder with its own README. Only the README in `microfrontend-workspace/` describes a micro-frontends architecture. Others do not enter the table:
- **Isolated exercises:** READMEs in `angular-frontend-practical/` and `ssr-app/` discuss practices internal to one application (NgRx, OnPush, SSR, lazy loading), and the one in `rate-limited-scheduler/` covers a folder without an interface.
- **Templates:** READMEs in `react-performance-practical/` and `microfrontend-workspace/projects/shared/`.

Artifacts cited by previous reviews were also read:
- configurations (`angular.json`, `package.json`, `tsconfig.json`, `webpack.config.js` and `webpack.prod.config.js`);
- `main.ts`, `bootstrap.ts`, and shell and mfe1 components and routes;
- `MessageService`;
- chart `spa-helm/`.

None of these artifacts has a comment describing architecture; the only one annotates the exported component's name (microfrontend-workspace/projects/shell/src/app/app.routes.ts:12). Chart `spa-helm/` has no documentation linking it to an exercise.

The workspace README matches previous reviews: shell as host, mfe1 as remote loaded at runtime through Module Federation, and a library with a service used by both applications to communicate. Only the library alias explanation differs, citing a nonexistent file and import path.

`doc-*` occurrences that did not become rows: microfrontend-workspace/README.md:1 (title) and microfrontend-workspace/README.md:21, 25, 28 (execution instructions). Others are in claims 2, 3, 5, 7, 8 and 9.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3-5 | "multiple frontend coding exercises […] Each exercise is organized in its own folder" (independent exercises, each in its own folder) | structure | corroborated | 3.4.3 (five applications in separate folders, only the workspace has composition) |
| 2 | microfrontend-workspace/README.md:3 | "demonstrates a **Micro-Frontend architecture** using Angular, Module Federation, and a shared library" | composition | corroborated | 3.4.2 (module-federation configured); 3.4.5 #1 |
| 3 | microfrontend-workspace/README.md:5-6 | "**Shell**: The main host application. **MFE1**: A remote micro-frontend loaded at runtime." | structure | corroborated | 3.4.5 #1; microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12; microfrontend-workspace/projects/mfe1/webpack.config.js:5-10 |
| 4 | microfrontend-workspace/README.md:7 | "**Shared Library**: Contains services or utilities used across apps." | structure | corroborated | microfrontend-workspace/projects/shell/src/app/app.component.ts:4; microfrontend-workspace/projects/mfe1/src/app/app.component.ts:3 |
| 5 | microfrontend-workspace/README.md:41 | "Navigating to /mfe1 in the shell will dynamically load MFE1 via Module Federation" | composition | corroborated | 3.4.5 #1; microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12 |
| 6 | microfrontend-workspace/README.md:46 | "Routes are defined […] using loadRemoteModule() from @angular-architects/module-federation." | composition | corroborated | 3.4.4; microfrontend-workspace/projects/shell/src/app/app.routes.ts:2, 8-12 |
| 7 | microfrontend-workspace/README.md:50 | "Shell can share services and state with MFE1 using the shared library." | composition | corroborated | 3.4.5 #2 (communication); microfrontend-workspace/projects/shell/webpack.config.js:11-13; microfrontend-workspace/projects/mfe1/webpack.config.js:12-14 |
| 8 | microfrontend-workspace/README.md:53 | "Exposes Angular components or modules via Module Federation." | composition | corroborated | 3.4.5 #1 (Configuration); microfrontend-workspace/projects/mfe1/webpack.config.js:8-10 |
| 9 | microfrontend-workspace/README.md:55 | "Registered as a remote in Shell's webpack.config.js." | composition | corroborated | 3.4.5 #1 (Configuration); microfrontend-workspace/projects/shell/webpack.config.js:15 |
| 10 | microfrontend-workspace/README.md:62 | "Aliased in tsconfig.base.json for clean imports (e.g., @shared/message.service)." | structure | contradicted | microfrontend-workspace/tsconfig.json:15-18; microfrontend-workspace/projects/shell/src/app/app.component.ts:4 |

## Observations

**1. README.md:3-5.** The structural review found five applications in separate folders, without relationships between them except shell and mfe1 inside the workspace. This confirms the repository as an exercise collection. Classification considers only the workspace an MFE.

**2. microfrontend-workspace/README.md:3.** The workspace uses Module Federation through package `@angular-architects/module-federation`, with host and remote configured. Repetition: the title (microfrontend-workspace/README.md:1).

**3. microfrontend-workspace/README.md:5-6.** Shell loads mfe1 through `loadRemoteModule` at a route with `loadComponent`, hence at runtime and on demand. Mfe1 exposes `./Component`. Repetition: microfrontend-workspace/README.md:52.

**4. microfrontend-workspace/README.md:7.** Shell and mfe1 import `MessageService` from library `shared`, making it shared by two units. Repetition: microfrontend-workspace/README.md:57-60.

**5. microfrontend-workspace/README.md:41.** Shell route `mfe1` loads the remote component with `loadComponent` and `loadRemoteModule` only when accessed. Repetition: microfrontend-workspace/README.md:48 ("lazy-loaded at runtime").

**6. microfrontend-workspace/README.md:46.** Shell routes use `loadRemoteModule` from the cited package. The constant is named `routes`, rather than `APP_ROUTES` (microfrontend-workspace/projects/shell/src/app/app.routes.ts:4), a name difference that does not change the mechanism.

**7. microfrontend-workspace/README.md:50.** The composition review recorded shell-to-mfe1 communication through `MessageService`, shared as a singleton through `shareAll` in both configurations. Repetition: microfrontend-workspace/README.md:66-69, describing the same mechanism with `Subject` and "Module Federation's shared config". According to the composition review, sending occurs only in direction shell → mfe1.

**8. microfrontend-workspace/README.md:53.** Mfe1 exposes a single module, `./Component`, pointing to its `AppComponent` (microfrontend-workspace/projects/mfe1/webpack.config.js:8-10). The README refers generically to "components or modules".

**9. microfrontend-workspace/README.md:55.** Shell declares `mfe1` in `remotes` (microfrontend-workspace/projects/shell/webpack.config.js:15). The route, however, loads the remote through the direct `remoteEntry.js` URL (microfrontend-workspace/projects/shell/src/app/app.routes.ts:10). Registration exists, but loading is not resolved through it.

**10. microfrontend-workspace/README.md:62.** The workspace has no `tsconfig.base.json`. Its alias is in `tsconfig.json`, with name `shared` pointing to `./dist/shared` (microfrontend-workspace/tsconfig.json:15-18), and applications import from `'shared'`, rather than `@shared/message.service`. The library is shared by alias, as the README says, but the described file and path do not exist.

## Summary

Claims: 10 (corroborated: 9, partial: 0, contradicted: 1, uncorroborated: 0). Themes: (structure: 4, composition: 6).
