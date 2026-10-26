---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
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

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Repository overview

Three Next.js applications in sibling directories (`cardapio`, `container`, `pedido`), each with its own `package.json` and `package-lock.json`, without workspace. Root has no `package.json`, and root `package-lock.json` has no packages (package-lock.json:1-6). Each application is built separately with `next build` (cardapio/package.json:7; container/package.json:7; pedido/package.json:7), using its own configuration with `NextFederationPlugin` (cardapio/next.config.js:5-20; container/next.config.mjs:7-29; pedido/next.config.mjs:7-29). No script builds all three together.

No deployment artifact exists: no Dockerfile, compose, hosting configuration or CI workflow. Each app’s scripts are for development or local execution: `next dev` (menu on port 3001 and order on 3002, cardapio/package.json:6 and pedido/package.json:6; container without declared port, container/package.json:6) and `next start` (cardapio/package.json:8; container/package.json:8; pedido/package.json:8), run manually. Host points remotes to fixed `localhost` (container/next.config.mjs:13-14), without environment variable for another address.

All five `ops-hosting` occurrences in `matches.csv` are README text, not deployment artifacts. `README.md:94` says container consumes remotes through localhost and project "pode ser hospedado em Vercel da vida ou semelhantes" (English translation: "can be hosted on Vercel or similar services"); `README.md:89` states each microfrontend "pode ser desenvolvido e deployado separadamente" (English translation: "can be developed and deployed separately"). `cardapio/README.md:25`, `:34`, `:36` and `:38` are standard create-next-app text with section "Deploy on Vercel". These statements remain for documentation review and do not decide Deploy column.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | cardapio | separate | not observed | `http://localhost:3001/_next/static/chunks/remoteEntry.js`, as host expects (container/next.config.mjs:14); port 3001 in development (cardapio/package.json:6) | No | cardapio/package.json:7 (`next build`); cardapio/next.config.js:5-20 (own configuration, generates `static/chunks/remoteEntry.js`) |
| 2 | container | separate | not observed | — | No | container/package.json:7 (`next build`); container/next.config.mjs:7-29 (own configuration, remotes at `localhost`) |
| 3 | pedido | separate | not observed | `http://localhost:3002/_next/static/chunks/remoteEntry.js`, as host expects (container/next.config.mjs:13); port 3002 in development (pedido/package.json:6) | No | pedido/package.json:7 (`next build`); pedido/next.config.mjs:7-29 (own configuration, generates `static/chunks/remoteEntry.js`) |

## Observations

**1. cardapio.** Own build: `next build` (cardapio/package.json:7) in app directory, with dependencies installed through its lockfile (cardapio/package-lock.json). Configuration used is `next.config.js` (cardapio/next.config.js:7-17), according to structural review; `next.config.mjs`, with absent exposed path (cardapio/next.config.mjs:13), does not change separate build. No artifact publishes app; the only address is development address expected by host. Version `0.1.0` (cardapio/package.json:3) is unused for publication, and package is `private` (cardapio/package.json:4).

**2. container.** Own build with `next build` (container/package.json:7) and host configuration (container/next.config.mjs:9-26). The `dev` declares no port (container/package.json:6), so no snapshot address indicates where container is served. Remote addresses are embedded in build (container/next.config.mjs:13-14). No deployment artifact and no versioning used in publication (container/package.json:3-4).

**3. pedido.** Own build with `next build` (pedido/package.json:7) and remote configuration (pedido/next.config.mjs:9-25). No deployment artifact; address is development address expected by host (container/next.config.mjs:13; pedido/package.json:6). No versioning used in publication (pedido/package.json:3-4).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.
