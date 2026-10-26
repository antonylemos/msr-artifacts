---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
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

# 237 — Axiean/micro-store

## Repository overview

No root `package.json` or workspace exists: snapshot contains only `README.md`, `docker-compose.yml` and directories `cart-app` and `store-app`. Each is a Next.js app with its own manifest and `package-lock.json` and same script `build: next build` (cart-app/package.json:7; store-app/package.json:7). Both generate a `standalone` server (cart-app/next.config.ts:14; store-app/next.config.ts:10). The `cart-app` resides under `basePath: "/cart"` (cart-app/next.config.ts:4), and `store-app` declares `rewrites()` forwarding `/cart/:path*` to `http://cart-app:3000/cart/:path*` (store-app/next.config.ts:32-41).

Each app has its own Dockerfile, identical in both directories, with four stages: base image `node:22-alpine`, dependency installation through detected lockfile, `npm run build` and final image with `NODE_ENV=production`, copying `public`, `.next/standalone` and `.next/static` and starting with `node server.js` on port 3000 (cart-app/Dockerfile:4-33; store-app/Dockerfile:4-33).

The `docker-compose.yml` starts both apps as own services, each with `build` from its directory: `store-app`, published on host port 3000 (docker-compose.yml:8-15), and `cart-app`, published on 3001 and mapped to internal 3000 (docker-compose.yml:20-28). Rewrite hostname `cart-app` is this service’s name. File comment says it serves "development and deployment" configuration (docker-compose.yml:2-3); this is a local stack with production images, without image registry, proxy ahead of `store-app` or hosting manifest. No CI exists in snapshot. README instructs starting everything with `docker-compose up --build` and accessing store at `http://localhost:3000` and cart at `http://localhost:3000/cart` (README.md:53, 59-60).

No build or deployment artifact exists outside frontends. The `ops-hosting` occurrences are standard create-next-app README text (cart-app/README.md:21, 30, 32, 34; store-app/README.md:21, 30, 32, 34), suggesting Vercel without snapshot hosting configuration.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | cart-app | separate | separate | `/cart` through store-app (store-app/next.config.ts:36-39; cart-app/next.config.ts:4); `http://cart-app:3000/cart` in compose (store-app/next.config.ts:39); port 3001 (docker-compose.yml:28) | No | cart-app/package.json:7 (`next build`); cart-app/next.config.ts:4, 14 (`basePath`, `standalone`); cart-app/Dockerfile:22, 25-33 (own build and image); docker-compose.yml:20-28 (service `cart-app`) |
| 2 | store-app | separate | separate | `/` on port 3000 (docker-compose.yml:15; store-app/Dockerfile:32) | No | store-app/package.json:7 (`next build`); store-app/next.config.ts:10, 32-41 (`standalone`, `rewrites`); store-app/Dockerfile:22, 25-33 (own build and image); docker-compose.yml:8-15 (service `store-app`) |

## Observations

**1. cart-app.** Own build (cart-app/package.json:7; cart-app/Dockerfile:22), generating its own image (cart-app/Dockerfile:25-33). Compose publishes it as own service, built from `./cart-app` (docker-compose.yml:20-23), hence deploy `separate`. User accesses it through `store-app`, at `/cart` (store-app/next.config.ts:36-39), and directly through port 3001 (docker-compose.yml:28), reserved by comment for isolated development and testing (docker-compose.yml:26-27). Destination address is fixed in `next.config.ts` of `store-app`, without environment variable or build arg, so connection between both images depends on compose service name. Field `version: "0.1.0"` (cart-app/package.json:3) is unused in any publication, and app is `private` (cart-app/package.json:4), hence Versioning `No`.

**2. store-app.** Same arrangement as `cart-app`: own build and image (store-app/package.json:7; store-app/Dockerfile:22, 25-33) and own compose service, built from `./store-app` (docker-compose.yml:8-11). Store entry, at `/` on port 3000 (docker-compose.yml:15; `EXPOSE 3000` in store-app/Dockerfile:32), embedding rewrite to `cart-app` in its build (store-app/next.config.ts:32-41). Compose declares no `depends_on` between services (docker-compose.yml:5-29). The `version: "0.1.0"` is unused and app is `private` (store-app/package.json:3-4).

## Summary

Applications: 2. Build (separate: 2). Deploy (separate: 2). Independent versioning: 0.
