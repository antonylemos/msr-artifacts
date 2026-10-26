---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
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

# 172 — Jyotisaini1234/moduleFederation

## Repository overview

Minimal Module Federation example with webpack 5, with two sibling projects and no root manifest: `mfe1` (host) and `mfe2` (remote). Each has its own `package.json`, `package-lock.json` and same two scripts, running webpack through `ts-node/esm` over `webpack.config.ts`: `start` with `serve` and `build` with `--mode production` (mfe1/package.json:7-10; mfe2/package.json:7-10). No script triggers both builds together. Output of `mfe1` goes to `mfe1/dist`, with `contenthash` names (mfe1/webpack.config.ts:37-42); `mfe2` defines only `publicPath` and uses default webpack directory (mfe2/webpack.config.ts:19-21). Both `dist` directories are in `.gitignore` (.gitignore:3, 6).

No deployment artifact is present in snapshot: no Dockerfile, compose, CI workflow or hosting configuration, and `matches.csv` has no `ci-*` occurrences. The only `ops-*` occurrence is `ops-cors` at mfe1/webpack.config.ts:31, an `Access-Control-Allow-Origin` header inside `devServer` (mfe1/webpack.config.ts:22-35), not a deployment artifact. Both `cfg-public-path` occurrences are `publicPath: 'auto'` (mfe1/webpack.config.ts:41; mfe2/webpack.config.ts:20). Host points remote to `http://localhost:3002/remoteEntry.js` (mfe1/webpack.config.ts:77; composition review, Configuration column), development server port of `mfe2` (mfe2/webpack.config.ts:15-18), so even production build only finds remote on local machine.

The `mfe1` also includes an HTTP server with SSR serving files from `mfe1/dist` at `/static/` and listening on `PORT` or 3003 (mfe1/src/server/server.ts:15-16, 84, 100-104). No script runs it (mfe1/package.json:7-10) and no snapshot configuration compiles it; therefore it does not count as a deployment artifact. README has only a title (README.md:1).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | mfe1 | separate | not observed | `http://localhost:3001/`, only in development with `webpack serve` (mfe1/webpack.config.ts:26; mfe1/package.json:8) | No | mfe1/package.json:9 (`webpack --mode production`); mfe1/webpack.config.ts:18-101 (own entry, output in `dist`, `ModuleFederationPlugin` `app1`, `HtmlWebpackPlugin`) |
| 2 | mfe2 | separate | not observed | `http://localhost:3002/`, only in development with `webpack serve` (mfe2/webpack.config.ts:17; mfe2/package.json:8; mfe1/webpack.config.ts:77) | No | mfe2/package.json:9 (`webpack --mode production`); mfe2/webpack.config.ts:12-45 (own entry, `ModuleFederationPlugin` `app2` with `remoteEntry.js`, `HtmlWebpackPlugin`) |

## Observations

**1. mfe1.** Own webpack build, with entry `./src/index.tsx`, page generated from `./public/index.html` and remote `app2` declared in `ModuleFederationPlugin` (mfe1/webpack.config.ts:19, 74-93). Configuration fixes `mode: 'development'` (mfe1/webpack.config.ts:20), overridden by script `build` with `--mode production` (mfe1/package.json:9). SSR server described above is the only code that would serve `dist` outside `webpack serve`, but no artifact runs it. No observed deploy; version `1.0.0` unused in publication (mfe1/package.json:3).

**2. mfe2.** Own webpack build, with own entry and `remoteEntry.js` exposing `./App` (mfe2/webpack.config.ts:13, 37-40), also with `mode: 'development'` overridden by script `build` (mfe2/webpack.config.ts:14; mfe2/package.json:9). Address where host looks for it is development server address, port 3002 (mfe1/webpack.config.ts:77; mfe2/webpack.config.ts:17). No observed deploy; version `1.0.0` unused (mfe2/package.json:3).

## Summary

Applications: 2. Build (separate: 2). Deploy (not observed: 2). Independent versioning: 0.
