---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
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

# 203 — agsosa/react-next-umd-remote-modules-poc

## Repository overview

Proof of concept with two independent Next.js applications, `shell` and `mf-1`, each in its own directory with its own `package.json` and `package-lock.json`; no root `package.json` or workspace declaration, so each application is installed and built separately. The `shell` builds with `next build` (shell/package.json:7). The `mf-1` has a two-phase build: first Vite generates UMD bundle of remote components (`vite build --config vite.mf.ts`, mf-1/package.json:11), then Next builds application (mf-1/package.json:8). Bundle outputs to `public/remote-modules/bundle.js` (mf-1/vite.mf.ts:28, 37-39), inside directory `public` of `mf-1` itself, served as a static file by Next; comment says Next `/public` is used "pero podemos subirlo a cualquier otro lugar" (English translation: "but we can upload it anywhere else") (mf-1/vite.mf.ts:28). Generated file is also versioned in snapshot (mf-1/public/remote-modules/bundle.js:1).

No deployment artifact is present in snapshot: no Dockerfile, compose, CI workflow, `vercel.json` or other hosting configuration. Root README lists two Vercel addresses, one for `shell` and another for `mf-1` (README.md:5-8), indicating separate publications, but README is not a deployment artifact and does not decide column. Other `ops-hosting` occurrences (mf-1/README.md:25, 34, 36, 38; shell/README.md:25, 34, 36, 38) are standard create-next-app text about fonts and Vercel. The `.gitignore` files ignore `.vercel` (.gitignore:81-82; mf-1/.gitignore:36-37), without versioned content.

Only a URL connects both applications at runtime: `shell` reads `MF1_BASE_URL` from environment variable, defaulting to `http://localhost:3001` (shell/next.config.js:7-9), and requests `MF1_BASE_URL + "/remote-modules/bundle.js"` (shell/src/components/RemoteHeader.tsx:19). Thus remote address is configurable by environment, and default points to `mf-1` development server (mf-1/package.json:7). In production, `mf-1` adds a `Cache-Control` header to `/remote-modules/:path*` responses (mf-1/next.config.ts:3, 9-23), Next server configuration intended for remote bundle, but packaging or publishing nothing. A comment mentions injecting environment variables "en los pods de Kubernetes" (English translation: "in Kubernetes pods") as pending work (mf-1/vite.mf.ts:9), without corresponding snapshot manifest.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | mf-1 | separate | not observed | port 3001 in development (mf-1/package.json:7); bundle at `/remote-modules/bundle.js` (mf-1/vite.mf.ts:28, 37) | No | mf-1/package.json:8 (`npm run build:vite && next build`); mf-1/package.json:11 (`vite build --config vite.mf.ts`); mf-1/vite.mf.ts:27-47 (bundle UMD `bundle.js`, global `MF1_RemoteModules`, output `public/remote-modules`); mf-1/next.config.ts:9-23 (`Cache-Control` at `/remote-modules/:path*` in production) |
| 2 | shell | separate | not observed | — | No | shell/package.json:7 (`next build`); shell/next.config.js:7-9 (`MF1_BASE_URL`, default `http://localhost:3001`) |

## Observations

**1. mf-1.** Separate build: own directory’s `build` script generates UMD bundle with Vite and then Next application (mf-1/package.json:8, 11), and nothing outside `mf-1/` enters build. Remote bundle is not an artifact apart from application: it resides in `public/remote-modules` (mf-1/vite.mf.ts:28) and is served by same Next server, applying production caching (mf-1/next.config.ts:13-17); consumption by `shell` depends on `mf-1` running. Deploy not observed: the only code address is port 3001 of `next dev` (mf-1/package.json:7), and Vercel publication appears only in README (README.md:8). Versioning `No`: version `0.1.0` with `private: true` (mf-1/package.json:3-4) is unused in publication, and bundle name is fixed, `bundle.js` (mf-1/vite.mf.ts:37).

**2. shell.** Separate build: `next build` in its own directory (shell/package.json:7), without any `mf-1` code in artifact; remote components arrive only at runtime through URL `MF1_BASE_URL` (shell/next.config.js:8; shell/src/components/RemoteHeader.tsx:19). Deploy not observed: snapshot has no port or hosting configuration for `shell` (`next dev` without port, shell/package.json:6), and Vercel address appears only in README (README.md:7). Versioning `No`: `0.1.0` with `private: true` (shell/package.json:3-4), unused in publication.

## Summary

Applications: 2. Build (separate: 2). Deploy (not observed: 2). Independent versioning: 0.
