---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 237 — Axiean/micro-store

## Repository overview

Example created for frontend technical assessment: store with two Next.js applications, `store-app` (storefront) and `cart-app` (cart), joined through Next.js Multi-Zones. Composition uses only native Next.js features without dependency-catalog technology. Thus no dependency observation.

Architecture chain uses server routing rather than page mounting:
- **Structure:** both apps have own manifests, entries/builds (#4, #5).
- **Configuration:** `rewrites()` in `store-app` forwards `/cart/:path*` to `http://cart-app:3000/cart/:path*` (#1). Address fixed in file without environment variable.
- **Code:** `rewrites()` line recorded in 3.4.4 (#2), inside #1 block.
- **Relationship:** yields active `store-app → cart-app` relationship (#6). Hostname `cart-app` is compose service built from `./cart-app`; `cart-app` responds under `basePath: "/cart"` with entire page.

Second link is cart state: both zones persist same zustand store under key `cart-storage` in `localStorage` (#3). `store-app` writes and `cart-app` reads (#7). Works only because #1 rewrite puts both zones under same origin. Store copied into each zone rather than common code.

Build/deployment separate per app (#8, #9): `next build` with `standalone` output, own Dockerfile, image and compose service. No CI, image registry or versioning; compose local stack.

Documentation confirms all its claims: microfrontend architecture, two independent apps, Multi-Zones through rewrites, entry through `store-app`, shared cart through `localStorage`, own builds/containers (#10 to #18). Containerization (#17) addresses only infrastructure.

Misleading/excluded signals:
- `basePath` of `cart-app` and compose services resolve rewrite target but concern path/publication, therefore in build/deployment observations rather than configuration (see #1 Note).
- `cart-app` also directly published at port 3001 under another origin, where it cannot read cart written by `store-app` (#6, #7, #14).
- Store-to-cart navigation is full-page link (`<a href="/cart">`), not composition construct.

Nothing ambiguous in snapshot; history had no point to clarify.

## Observations

### 1. store-app/next.config.ts:6-43

**Observation:** `output: "standalone"` (10), `images.remotePatterns` for `images.unsplash.com` and `fakestoreapi.com` (12-25) and `async rewrites()` (32-42), returning one rule: `source: "/cart/:path*"` to `destination: "http://cart-app:3000/cart/:path*"` (36-39). Block comment says "Configures the core of the Multi-Zone micro-frontend architecture" (27-28).

**Interpretation:** Host configuration declares another application, `cart-app`, as path target under own origin, with resolution address.

**Note:** `cart-app/next.config.ts:3-15`, cited in same tables, only declares `basePath: "/cart"`, `images` and `output: "standalone"`. `basePath` is zone publication path, thus deployment (dimension 6), in observation #8. Services in `docker-compose.yml:8-15, 20-28` declare build context, container name and ports, also deployment (#8, #9); target address in rewrite, compose only provides service name. None of these blocks became configuration observation.

### 2. store-app/next.config.ts:32

**Observation:** `async rewrites()` links `/cart/:path*` to `http://cart-app:3000/cart/:path*` (36-39). Configuration exported as `nextConfig` (45).

**Interpretation:** Host routing declares path `/cart` goes to cart zone.

**Note:** Manual 3.4.4 row inside configuration block #1. Becomes own observation because every 3.4.4 row becomes one (step 2). Strength follows guidance for route linking path to another unit in route table.

### 3. store-app/src/store/cartStore.ts:83-84; store-app/src/store/cartStore.ts:26; store-app/src/store/cartStore.ts:38-55; store-app/src/components/ProductCart.tsx:17

**Observation:** Zustand store `useCartStore` persisted with `persist` under key `cart-storage` (`name: "cart-storage"`, 83), with `createJSONStorage(() => safeLocalStorage)` (84), writing through `localStorage.setItem` (26). `addToCart` (38-55) writes cart, called by `ProductCard`.

**Interpretation:** `store-app` writes cart to `localStorage` under fixed key, shared-state mechanism. Reading by `cart-app` in relationship #7.

### 4. cart-app; cart-app/package.json:7; cart-app/src/app/layout.tsx:20; cart-app/src/app/page.tsx:3; cart-app/next.config.ts:3-15

**Observation:** Has own manifest, App Router root layout (`RootLayout`), page `Home` and `next build` build, with `basePath: "/cart"` and `standalone` output.

**Interpretation:** Frontend unit with own boundary.

### 5. store-app; store-app/package.json:7; store-app/src/app/layout.tsx:10; store-app/src/app/page.tsx; store-app/next.config.ts:6-43

**Observation:** Has own manifest, App Router root layout (`RootLayout`), route `/` and `next build` build, with `standalone` output and `rewrites()` for `/cart`.

**Interpretation:** Frontend unit with own boundary.

### 6. store-app/next.config.ts:32, 36-39; docker-compose.yml:20-24; cart-app/next.config.ts:4; cart-app/src/app/page.tsx:10

**Observation:** `store-app` forwards `/cart/:path*` to `http://cart-app:3000/cart/:path*`. Hostname `cart-app` is compose service built from `./cart-app`, container at port 3000. Prefix `/cart` is `basePath` of `cart-app`, whose page `Home` mounts cart.

**Interpretation:** Active relationship in which `store-app` forwards path to cart zone responding with entire page.

### 7. store-app/src/store/cartStore.ts:83-84; store-app/src/components/ProductCart.tsx:17; cart-app/src/store/cartStore.ts:83-84; cart-app/src/components/CartDisplay.tsx:15; store-app/next.config.ts:36-39

**Observation:** `store-app` writes cart under key `cart-storage` when adding products. `cart-app` declares same store under same key, reading items in `CartDisplay` (`const { items, removeItem, updateQuantity } = useCartStore();`).

**Interpretation:** Active shared-state relationship through `localStorage` between `store-app` and `cart-app`, possible because rewrite puts `cart-app` under `store-app` origin. Direct access at port 3001 puts `cart-app` under another origin without same state.

### 8. cart-app/package.json:7; cart-app/next.config.ts:4, 14; cart-app/Dockerfile:22, 25-33; docker-compose.yml:20-28

**Observation:** `next build` generates `standalone` server under `basePath: "/cart"`. Dockerfile runs build, generating own image starting with `node server.js` at port 3000. Compose starts it as service `cart-app`, built from `./cart-app`, published at host port 3001. `version: "0.1.0"` unused for publication; app `private`.

**Interpretation:** Own build/deployment boundaries without independent versioning.

### 9. store-app/package.json:7; store-app/next.config.ts:10, 32-41; store-app/Dockerfile:22, 25-33; docker-compose.yml:8-15

**Observation:** `next build` generates `standalone` server with `rewrites()`. Dockerfile runs build, generating own image served at port 3000. Compose starts it as service `store-app`, built from `./store-app`, without `depends_on`. `version: "0.1.0"` unused; app `private`.

**Interpretation:** Own build/deployment boundaries without independent versioning. Artifact of `store-app` contains no `cart-app` code but carries fixed service address.

### 10. README.md:3

**Observation:** "This project is a demonstration of a micro-frontend architecture for a simple e-commerce application".

**Interpretation:** Claims microfrontend architecture, confirmed by two units and two inter-unit relationships.

### 11. README.md:3

**Observation:** "It consists of two independent Next.js applications: a **Store** for Browse products and a **Cart** for managing the shopping cart, containerized with Docker".

**Interpretation:** Claims two independent containerized apps, confirmed by structure and per-app build/deployment.

### 12. README.md:7

**Observation:** "The application employs a **Multi-Zone** architecture".

**Interpretation:** Names Next.js composition pattern, confirmed by rewrite configuration and route relationship.

### 13. README.md:9

**Observation:** "**Store App (Zone 1)**: The main application that runs on port `3000`. ... acts as the primary entry point for users."

**Interpretation:** Claims `store-app` as entry, confirmed by port 3000 deployment and `/cart` forwarding.

### 14. README.md:10

**Observation:** "**Cart App (Zone 2)**: An independent application that runs on port `3001`."

**Interpretation:** Claims `cart-app` as independent app, confirmed by structure and own build/deployment. Port 3001 belongs to `dev` script and compose host.

### 15. README.md:12

**Observation:** "These two \"zones\" are seamlessly combined under a single domain using **Next.js Rewrites**. The Store App is configured to proxy all requests for the `/cart` path to the Cart App".

**Interpretation:** Claims host forwards path to other zone under same domain, confirmed by `rewrites()` line and route relationship.

### 16. README.md:19

**Observation:** "`localStorage` is used to persist and share the cart state between the two independent applications."

**Interpretation:** Claims shared state through `localStorage` between zones, confirmed by writing in `store-app` and state relationship. State shared; store code copied into each zone.

### 17. README.md:20

**Observation:** "**Containerization**: Docker & Docker Compose for creating a reproducible production environment."

**Interpretation:** Addresses container infrastructure without locating units. Compose and both app Dockerfiles confirm claim; "production environment" is what compose assembles without snapshot hosting.

### 18. docker-compose.yml:19

**Observation:** Service comment for `cart-app`: "It has its own build process and runs in a separate container."

**Interpretation:** Claims own build/container for `cart-app`, confirmed by its build/deployment.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (store-app, Markers); 3.4.3 (store-app, Build); 3.4.4 (store-app/next.config.ts:32, Observation); 3.4.4 (store-app/src/store/cartStore.ts:83, Observation); 3.4.5 #1 (Configuration, Code); 3.4.6 #1 (Where served); 3.4.6 #2 (Artifacts); 3.4.7 #3, #6 (Evidence) | 2 configuration | configuration | other | architectural | strong | configures #5; configures #6 |
| 2 | 3.4.4 (store-app/next.config.ts:32) | 3 code | configuration | other | architectural | strong | implements #6 |
| 3 | 3.4.4 (store-app/src/store/cartStore.ts:83) | 3 code | source code | other | technological | moderate | implements #7 |
| 4 | 3.4.3 (cart-app) | 4 structure | directory | — | architectural | moderate | — |
| 5 | 3.4.3 (store-app) | 4 structure | directory | — | architectural | moderate | — |
| 6 | 3.4.5 #1 | 5 composition | configuration | other | architectural | strong | links #5; links #4 |
| 7 | 3.4.5 #2 | 5 composition | source code | other | architectural | strong | links #5; links #4 |
| 8 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #4 |
| 9 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #5 |
| 10 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #4; corroborates #5; corroborates #6; corroborates #7 |
| 11 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #4; corroborates #5; corroborates #8; corroborates #9 |
| 12 | 3.4.7 #3 | 7 documentation | documentation | other | technological | weak | corroborates #1; corroborates #6 |
| 13 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates #6 |
| 14 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #4; corroborates #8 |
| 15 | 3.4.7 #6 | 7 documentation | documentation | other | architectural | weak | corroborates #2; corroborates #6 |
| 16 | 3.4.7 #7 | 7 documentation | documentation | other | architectural | weak | corroborates #3; corroborates #7 |
| 17 | 3.4.7 #8 | 7 documentation | documentation | — | context | weak | corroborates #8; corroborates #9 |
| 18 | 3.4.7 #9 | 7 documentation | comment | — | architectural | weak | corroborates #8 |

## Summary

Observations: 18. Dimensions (technology: 0, configuration: 1, code: 2, structure: 2, composition: 2, build-deploy: 2, documentation: 9, history: 0). Strength (strong: 4, moderate: 5, weak: 9, ambiguous: 0). Evidence (technological: 2, architectural: 15, context: 1).

