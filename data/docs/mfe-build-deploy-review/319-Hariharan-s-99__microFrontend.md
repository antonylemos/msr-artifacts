---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
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

# 319 — Hariharan-s-99/microFrontend

## Repository overview

Four sibling projects, without root manifest or workspace: `container` (host), `home` and `settings` (remotes), all with Rspack and Module Federation, and `advancedWebpack`, a React app with webpack outside composition. Each project has its own `package.json` and lockfile. All three Rspack projects have identical scripts: `build` (`NODE_ENV=production rspack build`), `build:dev`, `build:start` (`cd dist && rspack serve`) and `start` (`rspack serve` in development) (container/package.json:4-9; home/package.json:4-9; settings/package.json:4-9). All three Rspack configurations are nearly identical: entry `./src/index.ts`, `HtmlRspackPlugin` and `ModuleFederationPlugin` with project’s own federated configuration (container/rspack.config.ts:17-19, 91, 94; home/rspack.config.ts:17-19, 91, 94; settings/rspack.config.ts:16-18, 90, 93). None defines `output.path`, only `uniqueName` and `publicPath` (container/rspack.config.ts:29-34), so output remains in default directory `dist`, ignored by git (container/.gitignore:86; home/.gitignore:85; settings/.gitignore:85). The `advancedWebpack` has `build` with `webpack --mode production` and `start` with `webpack serve` (advancedWebpack/package.json:6-9), output in `dist` with `publicPath: "/"` (advancedWebpack/webpack.config.js:6-11). No script triggers builds together.

Everything snapshot executes is for development. The `build:start` runs `rspack serve` from inside `dist`, still development server. The `publicPath` values point to `localhost`, one per port: `http://localhost:8080/` in container, `:8081/` in home and `:8082/` in settings (container/rspack.config.ts:33; home/rspack.config.ts:33; settings/rspack.config.ts:32), same ports as `devServer` (container/rspack.config.ts:24-25; home/rspack.config.ts:24-25; settings/rspack.config.ts:23-24). These are four `cfg-public-path` occurrences in `matches.csv`, together with `publicPath: "/"` of advancedWebpack (advancedWebpack/webpack.config.js:10). The `matches.csv` has no `ops-*` or `ci-*` occurrence, and snapshot has no Dockerfile, compose, CI workflow, hosting configuration or README.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | advancedWebpack | separate | not observed | `http://localhost:3001` in development (advancedWebpack/webpack.config.js:119-122) | No | advancedWebpack/webpack.config.js:4-124 (own configuration, output `dist`, `publicPath: "/"`); advancedWebpack/package.json:8 (`webpack --mode production`) |
| 2 | container | separate | not observed | `http://localhost:8080/` in development (container/rspack.config.ts:24-25, 33) | No | container/rspack.config.ts:15-105 (own configuration, `publicPath` at `localhost:8080`); container/package.json:5 (`rspack build`) |
| 3 | home | separate | not observed | `http://localhost:8081/` in development (home/rspack.config.ts:24-25, 33) | No | home/rspack.config.ts:15-105 (own configuration, generates `remoteEntry.js`, `publicPath` at `localhost:8081`); home/package.json:5 (`rspack build`) |
| 4 | settings | separate | not observed | `http://localhost:8082/` in development (settings/rspack.config.ts:23-24, 32) | No | settings/rspack.config.ts:14-104 (own configuration, generates `remoteEntry.js`, `publicPath` at `localhost:8082`); settings/package.json:5 (`rspack build`) |

## Observations

**1. advancedWebpack.** Own build, with output in `dist` and content-hashed bundle (advancedWebpack/webpack.config.js:6-11). Does not participate in composition (composition review, "Units without relationships"). Deploy is `not observed`: only `webpack serve` on port 3001 (advancedWebpack/package.json:7; advancedWebpack/webpack.config.js:119-123). Version `1.0.0` (advancedWebpack/package.json:3) is unused in publication.

**2. container.** Own build. Host fetches remotes through fixed URLs at `localhost` (container/module-federation.config.ts:4-5), so production build also only works with remotes served on these ports. Deploy is `not observed`: `start` and `build:start` run `rspack serve` (container/package.json:7-8). Version `0.0.1` (container/package.json:3) is unused in publication.

**3. home.** Own build, generating remote `remoteEntry.js` (home/module-federation.config.ts:3). Fixed `publicPath` at `http://localhost:8081/` (home/rspack.config.ts:33) ties chunks to this address, same as container uses. Deploy is `not observed`, for same reason as container (home/package.json:7-8). Version `0.0.1` (home/package.json:3) is unused.

**4. settings.** Same arrangement as home, on port 8082: `remoteEntry.js` (settings/module-federation.config.ts:3) and `publicPath` `http://localhost:8082/` (settings/rspack.config.ts:32). Deploy is `not observed` (settings/package.json:7-8). Version `0.0.1` (settings/package.json:3) is unused.

## Summary

Applications: 4. Build (separate: 4). Deploy (not observed: 4). Independent versioning: 0.
