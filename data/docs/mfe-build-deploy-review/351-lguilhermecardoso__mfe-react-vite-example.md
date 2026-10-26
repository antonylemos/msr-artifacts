---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
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

# 351 — lguilhermecardoso/mfe-react-vite-example

## Repository overview

No root `package.json` or workspace exists. Each of five applications (`mf-dashboard`, `mf-login`, `mf-navbar`, `mf-personagem-detalhe`, `root-app`) has its own manifest, lockfile and build script (`tsc -b && vite build`, for example mf-login/package.json:8). Each also has its own `vite.config.ts`, with own output directory within shared `dist/` at repository root: `../dist/<aplicação>` (mf-login/vite.config.ts:23; mf-dashboard/vite.config.ts:23; mf-navbar/vite.config.ts:23; mf-personagem-detalhe/vite.config.ts:23; root-app/vite.config.ts:38). All use `emptyOutDir: false` (for example mf-login/vite.config.ts:24), and root script handles `dist/` cleanup.

Script `build-all.sh` deletes previous `dist` (build-all.sh:6). Then runs `npm install && npm run build` sequentially in each directory for all four remotes, then host last (build-all.sh:8-21). Finally copies contents of `dist/root-app` to `dist` root (build-all.sh:23). Result is one static tree: host at root and each remote in its subdirectory (`dist/mf-login/`, `dist/mf-navbar/` etc.).

The only CI workflow, `.github/workflows/deploy.yml`, runs on every push to `main` (.github/workflows/deploy.yml:3-5). It has a single job, `build-and-deploy` (.github/workflows/deploy.yml:8), running `build-all.sh` (.github/workflows/deploy.yml:19-20) and publishing entire `./dist` to GitHub Pages with `peaceiris/actions-gh-pages@v4` (.github/workflows/deploy.yml:22-27). Production deploy, and joint: one published artifact contains all five applications. Remote production addresses in host point to subdirectories of same GitHub Pages site (`https://lguilhermecardoso.github.io/mfe-react-vite-example/<mf>/assets/remoteEntry.js`, root-app/vite.config.ts:12-23), when `IS_LOCAL` is not `true` (root-app/vite.config.ts:9; root-app/.env:1). Host fixes `base: '/mfe-react-vite-example/'` (root-app/vite.config.ts:27), the `cfg-public-path` occurrence. Remotes define no `base`.

Local configuration (`root-app/.env.local.bkp:1`, `IS_LOCAL=true`) points remotes to `localhost:4173–4176` (root-app/vite.config.ts:13-22), `vite preview` ports according to README (README.md:62-65). Ports 5000–5004 of `server.port` (for example root-app/vite.config.ts:42; mf-login/vite.config.ts:20) are for development. Neither counts as deploy.

The `ops-hosting` occurrence at roadmap.md:82 is an unchecked roadmap item ("Copiar arquivos finais para branch `gh-pages` no deploy"; English translation: "Copy final files to gh-pages branch at deploy"), not an artifact. Roadmap and README still list GitHub Pages deploy as pending (roadmap.md:80-84; README.md:104), but workflow exists in snapshot. Outdated documentation, not changing Deploy column. No Dockerfile, compose or backend exists in repository.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | mf-dashboard | separate | joint | `https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-dashboard/` (root-app/vite.config.ts:17); `http://localhost:4175` in preview (root-app/vite.config.ts:16) | No | mf-dashboard/package.json:8 (`tsc -b && vite build`); mf-dashboard/vite.config.ts:22-24 (output `../dist/mf-dashboard`); build-all.sh:12 (directory build); .github/workflows/deploy.yml:19-27 (publishes entire `./dist` to GitHub Pages) |
| 2 | mf-login | separate | joint | `https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-login/` (root-app/vite.config.ts:14); `http://localhost:4173` in preview (root-app/vite.config.ts:13) | No | mf-login/package.json:8 (`tsc -b && vite build`); mf-login/vite.config.ts:22-24 (output `../dist/mf-login`); build-all.sh:9 (directory build); .github/workflows/deploy.yml:19-27 (publishes entire `./dist` to GitHub Pages) |
| 3 | mf-navbar | separate | joint | `https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-navbar/` (root-app/vite.config.ts:23); `http://localhost:4174` in preview (root-app/vite.config.ts:22) | No | mf-navbar/package.json:8 (`tsc -b && vite build`); mf-navbar/vite.config.ts:22-24 (output `../dist/mf-navbar`); build-all.sh:15 (directory build); .github/workflows/deploy.yml:19-27 (publishes entire `./dist` to GitHub Pages) |
| 4 | mf-personagem-detalhe | separate | joint | `https://lguilhermecardoso.github.io/mfe-react-vite-example/mf-personagem-detalhe/` (root-app/vite.config.ts:20); `http://localhost:4176` in preview (root-app/vite.config.ts:19) | No | mf-personagem-detalhe/package.json:8 (`tsc -b && vite build`); mf-personagem-detalhe/vite.config.ts:22-24 (output `../dist/mf-personagem-detalhe`); build-all.sh:18 (directory build); .github/workflows/deploy.yml:19-27 (publishes entire `./dist` to GitHub Pages) |
| 5 | root-app | separate | joint | `/mfe-react-vite-example/` on GitHub Pages (root-app/vite.config.ts:27; build-all.sh:23) | No | root-app/package.json:8 (`tsc -b && vite build`); root-app/vite.config.ts:37-40 (output `../dist/root-app`); root-app/vite.config.ts:27 (`base`); build-all.sh:21-23 (build and copy to root of `dist`); .github/workflows/deploy.yml:19-27 (publishes entire `./dist` to GitHub Pages) |

## Observations

**1. mf-dashboard.** Separate build: own script and `vite.config.ts`, generating only remote in `dist/mf-dashboard` (mf-dashboard/package.json:8; mf-dashboard/vite.config.ts:23). Build is triggered by shared root script (build-all.sh:12). Joint deploy: directory enters same `./dist` published all at once by workflow to GitHub Pages (.github/workflows/deploy.yml:26), without its own job or hosting configuration. Production address used by host matches output directory. Manifest `version: "0.0.0"` (mf-dashboard/package.json:4), in a `private` package (mf-dashboard/package.json:3), is unused in publication: Versioning `No`.

**2. mf-login.** Same arrangement as mf-dashboard: own build (mf-login/package.json:8; mf-login/vite.config.ts:23), triggered by build-all.sh:9, and publication in same `./dist` of only workflow (.github/workflows/deploy.yml:22-27). First directory built by script, but order creates no build dependency: each remote only writes to its subdirectory. No own version (mf-login/package.json:4).

**3. mf-navbar.** Own build (mf-navbar/package.json:8; mf-navbar/vite.config.ts:23), triggered by build-all.sh:15, and joint deploy through same workflow. No own version (mf-navbar/package.json:4).

**4. mf-personagem-detalhe.** Own build (mf-personagem-detalhe/package.json:8; mf-personagem-detalhe/vite.config.ts:23), triggered by build-all.sh:18, and joint deploy through same workflow. No own version (mf-personagem-detalhe/package.json:4).

**5. root-app.** Separate build (root-app/package.json:8; root-app/vite.config.ts:38), last in script (build-all.sh:21). The only application whose artifact script reorganizes: copy to `dist` root (build-all.sh:23) makes host site homepage, served under `base` `/mfe-react-vite-example/` (root-app/vite.config.ts:27). Host build does not incorporate remote code. Only fixes their addresses in same site, selected by `IS_LOCAL` at build time (root-app/vite.config.ts:7-24; root-app/.env:1). Thus changing remote hosting requires rebuilding host, although snapshot republishes everything together on each push. Joint deploy with remotes, without own version (root-app/package.json:4).

## Summary

Applications: 5. Build (separate: 5). Deploy (joint: 5). Independent versioning: 0.
