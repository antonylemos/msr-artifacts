---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
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

# 033 — abhikukreti/music-library-project

## Repository overview

Two independent Vite applications, `main-app` (host) and `music-library` (remote), without a root workspace. Each has its own manifest, lockfile, `vite.config.js` and `vite build` (main-app/package.json:8; music-library/package.json:8). Remote generates `remoteEntry.js` during build (music-library/vite.config.js:8-13). README therefore instructs running it with `build` + `preview` even in development, since the development server does not serve the federated entry (README.md:17-22).

Deployment is described in README rather than configuration artifacts. Each application was published as a separate Netlify site, configured in the Netlify panel with its own base folder, build command and publication folder (README.md:30-34). Both published addresses appear in README (README.md:5-7). README also records the order: publish remote, copy the `remoteEntry.js` URL to host’s `vite.config.js`, and only then publish host (README.md:32-34).

Two snapshot artifacts support this account:
- The remote Netlify URL is fixed in host configuration (main-app/vite.config.js:10-12).
- Remote provides a Netlify `_headers` file enabling CORS for `/assets/*`, containing `remoteEntry.js`, "since remote loads from a different domain" (music-library/public/_headers:1-2; README.md:35).

There is no `netlify.toml`, CI or Dockerfile.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | main-app | separate | not observed | `https://fluffy-pika-9e723b.netlify.app`, according to README (README.md:6); `http://localhost:5000` in development (main-app/vite.config.js:21) | No | main-app/vite.config.js:5-22 (own configuration); main-app/package.json:8 (`vite build`) |
| 2 | music-library | separate | separate | `https://astonishing-seahorse-d2decf.netlify.app` (main-app/vite.config.js:11; README.md:7); `http://localhost:5001` in development and preview (music-library/vite.config.js:22-23) | No | music-library/vite.config.js:5-24 (own configuration, generates `remoteEntry.js`); music-library/package.json:8 (`vite build`); music-library/public/_headers:1-2 (own hosting headers); main-app/vite.config.js:11 (remote’s own domain) |

## Observations

**1. main-app.** Build is separate. Separate deployment is asserted only by README (README.md:6, 31-34): no snapshot artifact configures host hosting, so the value is `not observed` (see the Recorded decision). Version `0.0.0` is unused.

**2. music-library.** Separate build. Deployment is separate because two configuration artifacts support it: host loads remote from its own domain (main-app/vite.config.js:11), and remote has a hosting `_headers` that exists precisely because it is served from another origin (music-library/public/_headers:1-2). Site configuration (base folder and publication folder) is in Netlify, outside the repository (README.md:32). Since remote URL is fixed in host build, republishing remote at another address requires rebuilding host (README.md:33). No versioning.

## Summary

Applications: 2. Build (separate: 2). Deploy (separate: 1, not observed: 1). Independent versioning: 0.

## Recorded decision

Deployment of `main-app` as its own Netlify site is asserted only by README (README.md:6, 31-34). Researcher decision (2026-10-21): `not observed`. Documentation is not a deployment artifact; the claim remains recorded in text and enters the documentation review (protocol section 3.4.7).
