---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
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

# 045 — mrgleam/mf-tanstack-demo

## Repository overview

Documentation is the root README, in English: folder structure, running both applications and one of two Kong configurations, access addresses and a "Features" list (README.md:1-55). The most informative comments are in shell's module loader, presenting itself as a "Module Federation Loader with caching, retry logic, and error handling" (shell/src/moduleLoader.ts:1).

Artifacts cited by previous reviews were read:
- Vite configurations and both applications' `package.json` and `index.html` files;
- `shell/src/main.tsx`, `shell/src/router.tsx` and `shell/src/moduleLoader.ts`;
- `shop/src/main.tsx` and `shop/src/routes/ShopRoutes.tsx`;
- files in `kong-shell/` and `kong-remote/`.

Kong and TLS script comments concern ports and certificates and remained outside the table. The comment anticipating other modules ("Add more modules as needed", shell/src/router.tsx:54-56) was also excluded, as a possibility rather than a snapshot fact.

README access addresses (README.md:46-49) use port 8000. That is `kong-remote`'s port, but `kong-shell` publishes on 8080 (see the build and deployment review). Since port is an infrastructure detail, this remained outside the table.

Documentation matches previous reviews in structure and Kong use. Two points differ:
- **Remote routes:** README says remote subroutes enter through Module Federation, but shell reads an export absent from shop.
- **Retries:** the loader claims "retry logic", but retries await the same promise again without repeating import.

`doc-*` occurrences that did not become rows: README.md:41, title of option "Shell + standalone remote", repeating claim 3. Others are in claims 1, 2 and 5.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:1 | "Microfrontend Monorepo with Vite, TanStack Router, and Module Federation" | structure | corroborated | 3.4.3 (shell and shop `Yes`); 3.4.2 (module-federation configured) |
| 2 | README.md:7-8 | "shell/ # Host app with layout & routing / shop/ # Remote microfrontend exposing routes" | structure | corroborated | 3.4.5 #1; shop/vite.config.ts:10-12 |
| 3 | README.md:9-10 | "kong-shell/ # Kong config for layout-controlled routing / kong-remote/ # Kong config for standalone remote access" (one gateway exposes only shell, another also exposes remote independently) | build-deploy | corroborated | 3.4.6 (Overview); kong-shell/kong.yml:3-9; kong-remote/kong.yml:8-13 |
| 4 | README.md:53 | "Shared layout with always-visible NavBar" (shell provides the common layout) | composition | corroborated | shell/src/router.tsx:19-25 |
| 5 | README.md:54 | "Remote subroutes via Module Federation" (remote subroutes enter shell) | composition | contradicted | 3.4.5 #1 (Overview); shell/src/router.tsx:61-68; shop/src/routes/ShopRoutes.tsx:49-53 |
| 6 | shell/src/moduleLoader.ts:1 | "Module Federation Loader with caching, […] and error handling" (loader has caching and error handling) | composition | corroborated | shell/src/moduleLoader.ts:33-40, 49-53, 61-74, 134 |
| 7 | shell/src/moduleLoader.ts:1 | "retry logic" (loader retries when loading fails) | composition | contradicted | 3.4.5 #1 (Overview); shell/src/moduleLoader.ts:42-47, 130 |

## Observations

**1. README.md:1.** Two independent Vite applications in the same repository, without a workspace; "monorepo" is used broadly. Shell uses TanStack Router, and both use `@originjs/vite-plugin-federation`.

**2. README.md:7-8.** Shell is host and has the router. Shop exposes `./ShopRoutes`.

**3. README.md:9-10.** `kong-shell` forwards everything to shell (kong-shell/kong.yml:3-9). `kong-remote` adds route `/shop` to the shop server (kong-remote/kong.yml:8-13), allowing remote to open independently. Both forward only to local servers, as recorded by the build and deployment review. Repetitions: README.md:36-44 and README.md:55 ("Two Kong setups for flexible architecture").

**4. README.md:53.** Shell's root route renders `NavBar` and `Outlet` (shell/src/router.tsx:19-25), and remote routes would be its children.

**5. README.md:54.** Shell imports the remote module and attempts to fit `default.routes` into the tree (shell/src/router.tsx:52-68). Shop, however, exports `routes` only by name, and the composition review recorded that nothing ensures routes reach the tree. Module loading through Module Federation is confirmed, but the format read by shell does not exist in shop's module, and routes fall back to empty `fallback`. The source code review left the extraction line `Undetermined`, because it did not test execution; here the comparison is between README claims and artifacts, which refute subroutes reaching shell.

**6. shell/src/moduleLoader.ts:1.** The loader caches the module with an expiration (shell/src/moduleLoader.ts:33-40, 49-53). On the last failed attempt, it stores the error and returns configured `fallback` (shell/src/moduleLoader.ts:61-74), an empty route list for shop (shell/src/moduleLoader.ts:134). Repetition: shell/src/router.tsx:48.

**7. shell/src/moduleLoader.ts:1.** `import('shop/ShopRoutes')` is created only once, in the definition of `MODULE_CONFIGS` (shell/src/moduleLoader.ts:130). The "retries" loop only awaits the same promise again (shell/src/moduleLoader.ts:42-47). A rejected promise remains rejected, so loading is never repeated, as recorded by the composition review. Repetition: shell/src/router.tsx:48.

## Summary

Claims: 7 (corroborated: 5, partial: 0, contradicted: 2, uncorroborated: 0). Themes: (structure: 2, composition: 4, build-deploy: 1).
