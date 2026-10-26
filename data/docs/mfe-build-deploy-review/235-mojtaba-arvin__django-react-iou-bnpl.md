---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
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

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Repository overview

"Buy Now, Pay Later" system with Django backend and React frontend in a pnpm workspace at `frontend/` (frontend/pnpm-workspace.yaml:1-5). Workspace root `build` script first compiles library `@bnpl/shared`, then triggers each package’s `build` in parallel (frontend/package.json:14). Each application has its own `webpack.config.js`, without shared `output.path`: remotes write to their own package `dist` (frontend/customer-app/webpack.config.js:24-29; frontend/merchant-app/webpack.config.js:24-29), and shell defines no `output.path` (frontend/shell/webpack.config.js:29-32), thus using its package’s default `dist`. Library `shared` enters each build through alias (frontend/customer-app/webpack.config.js:35), without being a frontend unit. Federation and `publicPath` addresses are all `localhost` (frontend/shell/webpack.config.js:62-63; frontend/customer-app/webpack.config.js:26; frontend/merchant-app/webpack.config.js:26), and shell fixes `mode: "development"` (frontend/shell/webpack.config.js:8). No production federation configuration exists.

The only frontend container artifact is for development. The `frontend/Dockerfile.dev` only installs pnpm and prepares a user, without copying code (`COPY . .` commented out at :15) or build, ending in `CMD ["sh"]` (:52). Compose service `bnpl-frontend` mounts `./frontend` as volume, runs `sh` with `NODE_ENV=development` and exposes ports 3000, 3001 and 3002, commented as shell, customer-app and merchant-app (docker-compose.dev.yml:149-174). README instructs entering container and manually running `pnpm install` and `pnpm dev` (README.md:211, :219, :227-228), namely each package’s `webpack serve` servers (frontend/package.json:13; frontend/shell/package.json:6; frontend/customer-app/package.json:6). Container neither packages nor publishes any application: it is a development environment shared by all four packages, so does not count as deploy. Compose nginx service is entirely commented out (docker-compose.dev.yml:176-187). README discusses "isolated deployments" (README.md:42), but no snapshot artifact supports this.

Artifacts without frontend applications: `backend/Dockerfile.dev` is backend development Python image (backend/Dockerfile.dev:2, :23, :36); compose services `bnpl-tests`, `bnpl-api`, `bnpl-worker`, `bnpl-beat`, `bnpl-redis` and `bnpl-db` are backend and infrastructure (docker-compose.dev.yml:5-147). Both CI workflows handle only backend: `backend-docker-publish.yml` builds and publishes image `bnpl-backend` from `./backend` to Docker Hub (.github/workflows/backend-docker-publish.yml:7-16, :40-49), and `backend-tests.yml` triggers on changes in `backend/**` and runs tests through service `bnpl-tests` (.github/workflows/backend-tests.yml:13-20, :133-134). The `ops-cors` occurrences (frontend/shell/webpack.config.js:23; frontend/customer-app/webpack.config.js:129; frontend/merchant-app/webpack.config.js:129) are in `devServer` blocks and only enable cross-origin loading in development.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | frontend/customer-app | separate | not observed | `http://localhost:3001/remoteEntry.js`, only in development with `webpack serve` (frontend/customer-app/webpack.config.js:121; frontend/shell/webpack.config.js:62); `http://localhost:3001/` in standalone mode (frontend/customer-app/webpack.config.js:26) | No | frontend/customer-app/package.json:7 (`webpack --env standalone=false`); frontend/customer-app/webpack.config.js:6-137 (own configuration, output in `dist` at :24-29, `ModuleFederationPlugin` `customer_app` with `remoteEntry.js` at :81-88); frontend/package.json:14 (root build triggers package build) |
| 2 | frontend/merchant-app | separate | not observed | `http://localhost:3002/remoteEntry.js`, only in development with `webpack serve` (frontend/merchant-app/webpack.config.js:121; frontend/shell/webpack.config.js:63); `http://localhost:3002/` in standalone mode (frontend/merchant-app/webpack.config.js:26) | No | frontend/merchant-app/package.json:7 (`webpack --env standalone=false`); frontend/merchant-app/webpack.config.js:6-137 (own configuration, output in `dist` at :24-29, `ModuleFederationPlugin` `merchant_app` with `remoteEntry.js` at :81-88); frontend/package.json:14 (root build triggers package build) |
| 3 | frontend/shell | separate | not observed | `http://localhost:3000`, only in development with `webpack serve` (frontend/shell/webpack.config.js:16; frontend/shell/package.json:6) | No | frontend/shell/package.json:7 (`webpack --config webpack.config.js`); frontend/shell/webpack.config.js:6-115 (own configuration, entry at :7, `publicPath: "/"` at :30, `ModuleFederationPlugin` `shell` at :59-94, `HtmlWebpackPlugin` at :95-98); frontend/package.json:14 (root build triggers package build) |

## Observations

**1. frontend/customer-app.** Own build in remote mode, used by scripts `dev` and `build` (frontend/customer-app/package.json:6-7), generating `remoteEntry.js` for remote `customer_app` in package `dist` (frontend/customer-app/webpack.config.js:24-29, :81-88); shell only consumes it at runtime (frontend/shell/webpack.config.js:62), hence `separate`, even with root triggering builds together (frontend/package.json:14). There is also standalone mode (`build:standalone`, frontend/customer-app/package.json:9), with `publicPath` `http://localhost:3001/` (frontend/customer-app/webpack.config.js:26). Port 3001 is in `devServer` (:121) and development compose (docker-compose.dev.yml:170), without an artifact publishing `dist`. The `publicPath: "/"` at :126 belongs to `devServer` static directory. The `version` `0.1.0` (frontend/customer-app/package.json:3) is unused in publication, and package is `private` (:4).

**2. frontend/merchant-app.** Same arrangement as application 1: configuration differs only in standalone `publicPath` `http://localhost:3002/` (frontend/merchant-app/webpack.config.js:26), `name: "merchant_app"` (:82) and port 3002 (:121). Own build through scripts `build` and `build:standalone` (frontend/merchant-app/package.json:7, :9), consumed by shell at `http://localhost:3002/remoteEntry.js` (frontend/shell/webpack.config.js:63). Port exposed only in development compose (docker-compose.dev.yml:171). The `version` `0.1.0` is unused, package `private` (frontend/merchant-app/package.json:3-4).

**3. frontend/shell.** Own build from `./src/infrastructure/shell/shell-app.bootstrap.tsx` (frontend/shell/webpack.config.js:7), with remotes resolved at runtime (:61-64), so their code does not enter shell artifact. Configuration fixes `mode: "development"` (:8) and `publicPath: "/"` (:30), and remote URLs are `localhost`; no production variant exists. Served only by `webpack serve` on port 3000 (frontend/shell/package.json:6; frontend/shell/webpack.config.js:16), exposed by development compose (docker-compose.dev.yml:169). The `version` `0.1.0` is unused, package `private` (frontend/shell/package.json:3-4).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.
