---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 324 — lmedhub/zephyr-microfrontends

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | frontend/apps/host/src/App.tsx:6 | frontend/apps/host | dynamic-loading | Yes | `React.lazy(() => import("remote_header/Header"))` loads the `./Header` exposed by unit frontend/apps/remote-header (frontend/apps/remote-header/rspack.config.ts:74-78), declared as remote `remote_header` at frontend/apps/host/rspack.config.ts:85; `App.tsx` is the host build entry (frontend/apps/host/rspack.config.ts:10) |
| src-remote-import | frontend/apps/host/src/App.tsx:7 | frontend/apps/host | dynamic-loading | Yes | `React.lazy(() => import("remote_footer/Footer"))` loads the `./Footer` exposed by unit frontend/apps/remote-footer (frontend/apps/remote-footer/rspack.config.ts:74-78), remote `remote_footer` at frontend/apps/host/rspack.config.ts:86 |
| src-remote-import | frontend/apps/host/src/utils/VueShortener.tsx:12 | frontend/apps/host | dynamic-loading | Yes | `await import("url_shortener/Shortener")` loads Vue component `./Shortener` exposed by unit frontend/apps/url-shortener (frontend/apps/url-shortener/rspack.config.ts:75-78), remote `url_shortener` at frontend/apps/host/rspack.config.ts:87; the wrapper is imported at frontend/apps/host/src/App.tsx:4 and rendered at frontend/apps/host/src/App.tsx:17 |
| src-mount-call | frontend/apps/host/src/utils/VueShortener.tsx:16 | frontend/apps/host | runtime-composition | Yes | `app.mount(containerRef.current)` mounts in the React host the Vue component of unit frontend/apps/url-shortener, created by `createApp(Shortener.default)` at frontend/apps/host/src/utils/VueShortener.tsx:15 with `vue` loaded at frontend/apps/host/src/utils/VueShortener.tsx:10 |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | frontend/apps/host/src/App.tsx:13 | frontend/apps/host | runtime-composition | Yes | Renders `<RemoteHeader />` from unit frontend/apps/remote-header inside `Suspense` (frontend/apps/host/src/App.tsx:12-14); component resolved at frontend/apps/host/src/App.tsx:6 and App mounted at frontend/apps/host/src/App.tsx:27-28 |
| manual | frontend/apps/host/src/App.tsx:21 | frontend/apps/host | runtime-composition | Yes | Renders `<RemoteFooter />` from unit frontend/apps/remote-footer inside `Suspense` (frontend/apps/host/src/App.tsx:20-22); component resolved at frontend/apps/host/src/App.tsx:7 |

## Summary

Constructs participating in composition: 6 (dynamic-loading: 3, runtime-composition: 3).

## Notes

- `<VueShortener />` (frontend/apps/host/src/App.tsx:17) renders the host’s local wrapper; remote component mounting is already in the frontend/apps/host/src/utils/VueShortener.tsx:16 row, so it does not become a manual row.
- The step 4 search also found `import("./App")` at frontend/apps/host/src/index.ts:1, internal and outside the build (entry is `./src/App.tsx`, frontend/apps/host/rspack.config.ts:10), and `createApp(App)`/`app.mount("#app")` at frontend/apps/url-shortener/src/index.ts:18-19, mounting the unit itself in standalone mode. Neither is a composition construct.
- There are no custom elements, iframes or communication mechanism between units in the four apps’ code.
- The remotes are resolved through fixed `localhost` URLs (frontend/apps/host/rspack.config.ts:85-87); `withZephyr()` (frontend/apps/host/rspack.config.ts:7) may rewrite them on publication, which does not appear in code.
