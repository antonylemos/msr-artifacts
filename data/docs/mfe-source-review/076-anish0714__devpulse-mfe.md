---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 076 — anish0714/devpulse-mfe

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | packages/shell/src/App.tsx:7 | packages/shell | dynamic-loading | Yes | `lazy(() => import("pdfConversion/Widget"))` loads at runtime the `./Widget` module of remote `pdfConversion`, declared at `packages/shell/webpack.config.js:53` with the `remoteEntry.js` URL assembled at `:11-13`; the target is `packages/pdf-conversion-remote`, which exposes `./Widget` at `packages/pdf-conversion-remote/webpack.config.js:33-43`. The resulting component enters `sections` (`packages/shell/src/App.tsx:45`) and is rendered at `:164`. Active chain: `packages/shell/webpack.config.js:28` → `packages/shell/src/index.ts:3` → `packages/shell/src/bootstrap.tsx:2,7` → `App.tsx`. |
| src-remote-import | packages/shell/src/App.tsx:8 | packages/shell | dynamic-loading | Yes | `lazy(() => import("pdfManipulation/Widget"))` loads the `./Widget` module of remote `pdfManipulation`, declared at `packages/shell/webpack.config.js:54` (URL at `:14-16`); target `packages/pdf-manipulation-remote`, which exposes `./Widget` at `packages/pdf-manipulation-remote/webpack.config.js:33-43`. Component used at `packages/shell/src/App.tsx:56` and rendered at `:164`. |
| src-remote-import | packages/shell/src/App.tsx:9 | packages/shell | dynamic-loading | Yes | `lazy(() => import("devUtils/Widget"))` loads the `./Widget` module of remote `devUtils`, declared at `packages/shell/webpack.config.js:55` (URL at `:17-19`); target `packages/dev-utils-remote`, which exposes `./Widget` at `packages/dev-utils-remote/webpack.config.js:33-43`. Component used at `packages/shell/src/App.tsx:67` and rendered at `:164`. |
| src-remote-import | packages/shell/src/App.tsx:10 | packages/shell | dynamic-loading | Yes | `lazy(() => import("pdfFormFiller/Widget"))` loads the `./Widget` module of remote `pdfFormFiller`, declared at `packages/shell/webpack.config.js:56` (URL at `:20-22`); target `packages/pdf-form-filler-remote`, which exposes `./Widget` at `packages/pdf-form-filler-remote/webpack.config.js:33-43`. Component used at `packages/shell/src/App.tsx:78` and rendered at `:164`. |
| src-remote-import | packages/shell/src/App.tsx:11 | packages/shell | dynamic-loading | Yes | `lazy(() => import("ocr/Widget"))` loads the `./Widget` module of remote `ocr`, declared at `packages/shell/webpack.config.js:57` (URL at `:23-25`); target `packages/ocr-remote`, which exposes `./Widget` at `packages/ocr-remote/webpack.config.js:33-43`. Component used at `packages/shell/src/App.tsx:89` and rendered at `:164`. |
| src-async-bootstrap | packages/dev-utils-remote/src/index.ts:3 | packages/dev-utils-remote | dynamic-loading | No | `import("./bootstrap")` is asynchronous loading of the unit’s own bootstrap, required by Module Federation to initialize the shared scope (comment at `packages/dev-utils-remote/src/index.ts:1-2`). The target is internal: `packages/dev-utils-remote/src/bootstrap.tsx:4-7` mounts its own `App`. |
| src-async-bootstrap | packages/ocr-remote/src/index.ts:3 | packages/ocr-remote | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap; `packages/ocr-remote/src/bootstrap.tsx:4-7` mounts its own `App`. Internal construct. |
| src-async-bootstrap | packages/pdf-conversion-remote/src/index.ts:3 | packages/pdf-conversion-remote | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap; `packages/pdf-conversion-remote/src/bootstrap.tsx:4-7` mounts its own `App`. Internal construct. |
| src-async-bootstrap | packages/pdf-form-filler-remote/src/index.ts:3 | packages/pdf-form-filler-remote | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap; `packages/pdf-form-filler-remote/src/bootstrap.tsx:4-7` mounts its own `App`. Internal construct. |
| src-async-bootstrap | packages/pdf-manipulation-remote/src/index.ts:3 | packages/pdf-manipulation-remote | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap; `packages/pdf-manipulation-remote/src/bootstrap.tsx:4-7` mounts its own `App`. Internal construct. |
| src-async-bootstrap | packages/shell/src/index.ts:3 | packages/shell | dynamic-loading | No | `import("./bootstrap")` loads the shell’s own bootstrap; `packages/shell/src/bootstrap.tsx:4-7` mounts its own `App`. Internal construct, although this step enables the `lazy(() => import(...))` calls at `packages/shell/src/App.tsx:7-11`. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | packages/shell/src/App.tsx:34 | packages/shell | host-relationship | Yes | `const sections: Section[] = [` opens the shell’s sections table, which declares which applications it uses and where: each entry names the remote (`key`), the package (`packageName`) and the `remoteEntry.js` URL — `packages/pdf-conversion-remote` at `:37-45`, `packages/pdf-manipulation-remote` at `:48-56`, `packages/dev-utils-remote` at `:59-67`, `packages/pdf-form-filler-remote` at `:70-78` and `packages/ocr-remote` at `:81-89`. Navigation at `:135-148` chooses the active section and `:97` resolves the corresponding item. |
| manual | packages/shell/src/App.tsx:164 | packages/shell | runtime-composition | Yes | `<current.Component />` renders in the host the `Widget` component of the selected remote, any of the five (`:45,56,67,78,89`), inside the `Suspense` at `:163` and the `RemoteErrorBoundary` at `:162`. The `remoteName` prop passed to the error boundary is only the package name used in the failure message (`packages/shell/src/RemoteErrorBoundary.tsx:21,37`). |

## Summary

Constructs participating in composition: 7 (dynamic-loading: 5, host-relationship: 1, runtime-composition: 1).

## Notes

- `src-async-bootstrap` is a composition false positive in all six units: the pattern captures the `import("./bootstrap")` required by Module Federation at each entry, always internal to the unit itself.
- The five remotes are targets within the snapshot, but the production URLs (`packages/shell/src/App.tsx:43,54,65,76,87` and `packages/shell/webpack.config.js:12,15,18,21,24`) point to `https://anish0714.github.io/devpulse-mfe/remotes/...`; they were not accessed.
- The `url` field in `sections` entries is declared at `packages/shell/src/App.tsx:28` and populated at `:42-44,53-55,64-66,75-77,86-88`, but no point in the shell reads it — actual remote resolution comes from `packages/shell/webpack.config.js:52-58`. This does not change the answer for the `sections` row.
- `packages/shell/src/types/remotes.d.ts:1-29` declares the `<remote>/Widget` modules for TypeScript. This is a type declaration rather than a composition construct and did not become a row.
- No construct for inter-unit communication (`CustomEvent`, `postMessage`, `BroadcastChannel`, `storage`, shared bus), `iframe`, custom element or loading through `<script>` was found in the snapshot’s code files.
