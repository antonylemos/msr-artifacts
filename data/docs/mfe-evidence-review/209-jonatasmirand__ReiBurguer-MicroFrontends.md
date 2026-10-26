---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
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

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Repository overview

Learning project with three Next.js applications (Pages Router) in sibling folders, without workspace: `container` is host, and `cardapio` and `pedido` are remotes. All three declare `@module-federation/nextjs-mf` (#1 to #3), using it through `NextFederationPlugin` inside `webpack(config)`.

Architecture is supported by the Module Federation chain:
- **Structure:** three apps have own manifest, Pages Router entry and `next build` (#17 to #19).
- **Configuration:** host declares `pedido` and `cardapio` remotes with fixed `localhost` URLs (#5). Remotes name themselves `cardapio` and `pedido`, exposing `./Cardapio` and `./Pedido` (#4, #6).
- **Code:** host imports `cardapio/Cardapio` and `pedido/Pedido` with `next/dynamic` and `ssr: false` (#8, #9), rendering both on page `/` (#15, #16).
- **Relationships:** this yields two active host → remote relationships (#20, #21).

Second link is between remotes: each menu dish button dispatches `CustomEvent` `adicionarCarrinho` on `window` (#12, #13), listened to by order component (#14). This yields active cardapio → pedido relationship (#22), existing only because container mounts both components on same page.

Build separate per app (#23 to #25), but no deployment artifact; host embeds remote `localhost` addresses during build. History shows repository never had deployment artifact (#39).

Misleading or excluded signals:
- `cardapio` has second configuration file, `next.config.mjs`, exposing `./src/_components/Cardapio.jsx`, absent from snapshot (#7). Next 14 loads `next.config.js` (#4), and history does not explain origin of `.mjs` (#37).
- Menu function `adicionarPedido` dispatches another event, is never called and has no listener (#10, #11). History does not establish whether abandoned or never connected (#38).

Documentation in single README confirms general form: three microfrontends linked through Module Federation, host and remotes, loading with `dynamic()` and communication through Custom Events (#26 to #34). Separate deployment confirmed only for build portion (#35); Vercel hosting has no artifact (#36).

Nothing remains ambiguous in snapshot.

## Observations

### 1. cardapio/package.json:12

**Observation:** `@module-federation/nextjs-mf` (`^8.8.47`) declared in `dependencies`.

**Interpretation:** Federation technology present in cardapio build.

### 2. container/package.json:12

**Observation:** `@module-federation/nextjs-mf` (`^8.8.47`) declared in `dependencies`.

**Interpretation:** Federation technology present in container build.

### 3. pedido/package.json:12

**Observation:** `@module-federation/nextjs-mf` (`^8.8.47`) declared in `dependencies`.

**Interpretation:** Federation technology present in pedido build.

### 4. cardapio/next.config.js:1, 7-17

**Observation:** `next.config.js` calls `require("@module-federation/nextjs-mf")`, and in `webpack(config)` adds `new NextFederationPlugin({ name: "cardapio", filename: "static/chunks/remoteEntry.js", exposes: { "./Cardapio": "./src/components/Cardapio.jsx" }, shared: { react: { singleton: true }, "react-dom": { singleton: true } } })`.

**Interpretation:** Remote cardapio configuration assigns name by which host resolves it, exposes menu component and shares React as singleton.

### 5. container/next.config.mjs:1, 9-26

**Observation:** `next.config.mjs` imports `NextFederationPlugin`, invoking it in `webpack(config)` with `name: 'container'`, `filename: 'static/chunks/remoteEntry.js'`, `remotes: { pedido: 'pedido@http://localhost:3002/_next/static/chunks/remoteEntry.js', cardapio: 'cardapio@http://localhost:3001/_next/static/chunks/remoteEntry.js' }` and `react` and `react-dom` shared as singletons with `requiredVersion: false`. No `exposes`.

**Interpretation:** Host configuration declares two remotes, with names they assign themselves (#4, #6) and local address of each.

### 6. pedido/next.config.mjs:1, 9-25

**Observation:** `next.config.mjs` imports `NextFederationPlugin`, invoking it in `webpack(config)` with `name: 'pedido'`, `filename: 'static/chunks/remoteEntry.js'`, `exposes: { './Pedido': './src/_components/Pedido.jsx' }` and `react` and `react-dom` shared as singletons with `requiredVersion: false`.

**Interpretation:** Remote pedido configuration assigns name by which host resolves it and exposes order component.

### 7. cardapio/next.config.mjs:1, 9-25

**Observation:** Second cardapio configuration file imports `NextFederationPlugin`, invoking it with `name: 'cardapio'`, `filename: 'static/chunks/remoteEntry.js'`, `exposes: { './Cardapio': './src/_components/Cardapio.jsx' }` and same `shared` as pedido. `cardapio/src/_components/Cardapio.jsx` absent from snapshot; component in `src/components`.

**Interpretation:** Cardapio federation configuration not loaded by build, whose exposed module points to nonexistent path.

**Note:** Guidance for mechanism configuration within a unit is `moderate`. Strength is `weak` because, as dependency and structure reviews record (3.4.2, Notes; 3.4.3, Notes), Next 14 loads `next.config.js` (#4) with precedence, and this file is unused by build: a construct not participating in composition. For same reason, row has no `configures` relationship. File appears only in Markers column of 3.4.3, without lines; block is entire unit configuration.

### 8. container/src/pages/index.js:5

**Observation:** `const Cardapio = dynamic(() => import("cardapio/Cardapio"), { ssr: false });`, below comment `// Importação dinâmica` (English translation: dynamic import; line 4).

**Interpretation:** Host loads module `./Cardapio` from remote `cardapio` on client only.

### 9. container/src/pages/index.js:6

**Observation:** `const Pedido = dynamic(() => import("pedido/Pedido"), { ssr: false });`.

**Interpretation:** Host loads module `./Pedido` from remote `pedido` on client only.

### 10. cardapio/src/components/Cardapio.jsx:6

**Observation:** `new CustomEvent('adicionarPedido', { detail: item })` inside function `adicionarPedido` (lines 5-8). Function not called in file; no code file listens for `adicionarPedido`.

**Interpretation:** Communication event prepared but reaches no unit.

### 11. cardapio/src/components/Cardapio.jsx:7

**Observation:** `window.dispatchEvent(event)` in same uncalled function `adicionarPedido` (lines 5-8).

**Interpretation:** Dispatch exists but connects to no unit.

### 12. cardapio/src/components/Cardapio.jsx:32; cardapio/src/components/Cardapio.jsx:30-40

**Observation:** `window.top.dispatchEvent(...)` in `onClick` of each dish’s `+` button.

**Interpretation:** Menu emits global event when user adds dish. Listener in #14.

### 13. cardapio/src/components/Cardapio.jsx:33; cardapio/src/components/Cardapio.jsx:33-38

**Observation:** `new CustomEvent("adicionarCarrinho", { detail: { nome: prato.nome, preco: Number(prato.preco) } })`, event dispatched at line 32.

**Interpretation:** Message sent by menu, with event name and `detail` format expected by order component (#14).

### 14. pedido/src/_components/Pedido.jsx:13; pedido/src/_components/Pedido.jsx:7-16

**Observation:** `window.addEventListener("adicionarCarrinho", handler)` in `useEffect` of `Pedido`. `handler` adds `e.detail` to items, and return removes listener.

**Interpretation:** Order component receives event emitted by menu (#12, #13), updating own list.

### 15. container/src/pages/index.js:20; container/src/pages/index.js:8-29

**Observation:** `<Cardapio />` on `Home` page (`export default function Home`), below logo. Component comes from `dynamic` at line 5.

**Interpretation:** Host renders federated menu component on own page `/`.

### 16. container/src/pages/index.js:25; container/src/pages/index.js:24-26

**Observation:** `<Pedido />` inside `<div className={styles.section}>`, below menu. Component comes from `dynamic` at line 6.

**Interpretation:** Host renders federated order component on same page.

### 17. cardapio; cardapio/package.json:1-22; cardapio/src/pages/_app.js:3; cardapio/src/pages/index.js:14; cardapio/next.config.js:3-21; cardapio/package.json:7

**Observation:** Has own manifest, Pages Router `App`, route `/` and `next build` build, with `next.config.js` loading `NextFederationPlugin`. Also has `next.config.mjs` (#7).

**Interpretation:** Frontend unit with own boundary, remote `cardapio`.

### 18. container; container/package.json:1-22; container/src/pages/_app.js:3; container/src/pages/index.js:8; container/next.config.mjs:4-32; container/package.json:7

**Observation:** Has own manifest, Pages Router `App`, route `/` and `next build` build, with `next.config.mjs` loading `NextFederationPlugin`.

**Interpretation:** Frontend unit with own boundary, host.

### 19. pedido; pedido/package.json:1-22; pedido/src/pages/_app.js:3; pedido/src/pages/index.js:15; pedido/next.config.mjs:4-31; pedido/package.json:7

**Observation:** Has own manifest, Pages Router `App`, route `/` and `next build` build, with `next.config.mjs` loading `NextFederationPlugin`.

**Interpretation:** Frontend unit with own boundary, remote `pedido`.

### 20. container/src/pages/index.js:5; container/src/pages/index.js:20; container/next.config.mjs:14; cardapio/next.config.js:8-11

**Observation:** Import `cardapio/Cardapio` uses host remote `cardapio`, `cardapio@http://localhost:3001/_next/static/chunks/remoteEntry.js`. Remote named `cardapio`, exposing `./Cardapio`. Component rendered on host page `/`.

**Interpretation:** Active host → remote relationship in which container mounts menu through Module Federation.

### 21. container/src/pages/index.js:6; container/src/pages/index.js:25; container/next.config.mjs:13; pedido/next.config.mjs:10-13

**Observation:** Import `pedido/Pedido` uses host remote `pedido`, `pedido@http://localhost:3002/_next/static/chunks/remoteEntry.js`. Remote named `pedido`, exposing `./Pedido`. Component rendered inside `styles.section` on same page.

**Interpretation:** Active host → remote relationship in which container mounts order component through Module Federation.

### 22. cardapio/src/components/Cardapio.jsx:32-38; pedido/src/_components/Pedido.jsx:13; container/src/pages/index.js:20, 25

**Observation:** Menu sends `adicionarCarrinho` through `window.top.dispatchEvent`, and order component receives it through `window.addEventListener`. No sending in reverse direction or own channel configuration. Both components mounted on same container page without iframe.

**Interpretation:** Active event communication relationship from menu to order component. Channel depends on host mounting both together: each remote running alone cannot talk to other.

### 23. cardapio/package.json:7; cardapio/next.config.js:5-20

**Observation:** `next build` in app folder with own configuration, generating `static/chunks/remoteEntry.js`. No deployment artifact. Only address is development address expected by host, `http://localhost:3001` (container/next.config.mjs:14; cardapio/package.json:6). Package `private`, version `0.1.0`, unused for publication.

**Interpretation:** Own build boundary, without observed deployment or independent versioning.

### 24. container/package.json:7; container/next.config.mjs:7-29

**Observation:** `next build` in app folder with host configuration embedding remote `localhost` addresses. No deployment artifact; no snapshot address indicates where container served. Package `private`, version `0.1.0`.

**Interpretation:** Own build boundary, without observed deployment or independent versioning. Changing remote address requires rebuilding host.

### 25. pedido/package.json:7; pedido/next.config.mjs:7-29

**Observation:** `next build` in app folder with own configuration, generating `static/chunks/remoteEntry.js`. No deployment artifact. Only address is development address expected by host, `http://localhost:3002` (container/next.config.mjs:13; pedido/package.json:6). Package `private`, version `0.1.0`.

**Interpretation:** Own build boundary, without observed deployment or independent versioning.

### 26. README.md:4

**Observation:** "Projeto para testar aprendizado com Modulate Federation incluindo três Micro Frontends dividos em (container, cardápio e pedido)". English translation: "Project to test learning with Modulate Federation, including three microfrontends divided into container, menu and order."

**Interpretation:** Claims three microfrontends linked through Module Federation ("Modulate" read as typo). Three units, dependency configured in all three and host → remote relationships confirm claim.

### 27. README.md:12

**Observation:** "Ele contém três aplicações independentes, que se comunicam entre si". English translation: "It contains three independent applications communicating with each other."

**Interpretation:** Claims independent linked units. Structure and per-app build confirm independence; three relationships confirm communication.

### 28. README.md:13-15

**Observation:** "/container → Host principal" / "/cardapio → Remote 1" / "/pedido → Remote 2". English translation: "Container: main host; menu: remote one; order: remote two."

**Interpretation:** Claims host/remote roles of each folder, confirmed by host and remote configurations and host → remote relationships.

### 29. README.md:18

**Observation:** "é necessário baixar e executar os três microfrontends, pois o Container consome os remotes via localhost". English translation: "All three microfrontends must be downloaded and run, because Container consumes remotes through localhost."

**Interpretation:** Claims host depends on remotes running at local addresses. Fixed host `localhost` URLs and host → remote relationships confirm claim.

### 30. README.md:31-32

**Observation:** "Carrega dinamicamente os remotes Cardápio e Pedido." / "Usa dynamic() + Module Federation." English translation: "Dynamically loads menu and order remotes; uses dynamic loading plus Module Federation."

**Interpretation:** Claims dynamic remote loading by host, confirmed by two `dynamic(() => import(...))` calls and page rendering.

### 31. README.md:36

**Observation:** "Envia eventos globais ao adicionar itens ao pedido." (Menu section) English translation: "Sends global events when adding items to order."

**Interpretation:** Claims menu emits events to order component, confirmed by button dispatch.

### 32. README.md:39

**Observation:** "Escuta eventos enviados pelo Cardápio." (Order section) English translation: "Listens for events sent by menu."

**Interpretation:** Claims order component receives menu events, confirmed by order listener and communication relationship.

### 33. README.md:42

**Observation:** "A comunicação é feita via Custom Events do navegador, permitindo comunicação desacoplada entre aplicações separadas." English translation: "Communication uses browser Custom Events, allowing decoupled communication between separate applications."

**Interpretation:** Claims inter-unit communication mechanism. `CustomEvent` on `window`, without imports between units, confirms claim.

### 34. README.md:75-76

**Observation:** "O mesmo vale para o micro Pedido." / "Cardápio expõe componentes assim:", followed by block `exposes` from menu `next.config.js`. English translation: "Same applies to order microfrontend. Menu exposes components as follows."

**Interpretation:** Claims each remote exposes component through federation configuration, confirmed by menu and order configurations.

### 35. README.md:89

**Observation:** "Cada microfrontend pode ser desenvolvido e deployado separadamente." English translation: "Each microfrontend can be developed and deployed separately."

**Interpretation:** Claims separate development and deployment. Per-app build confirms portion visible in snapshot; no deployment artifact, and host embeds remote addresses. Claim partially corroborated.

### 36. README.md:94

**Observation:** "o projeto pode ser hospedado em Vercel da vida ou semelhantes." English translation: "Project can be hosted on services such as Vercel or similar."

**Interpretation:** Suggests external hosting service for entire project. No hosting artifact in snapshot or contradiction, since sentence describes possibility.

### 37. 8e7f1d9 2025-12-14 (cardapio, gitlink); 682204a 2025-12-16 (cardapio, gitlink); b7c02c3 2025-12-16 (cardapio/next.config.js, cardapio/next.config.mjs)

**Observation:** `cardapio` enters as gitlink to subrepository (8e7f1d9, 682204a), whose commits absent from clone. Both `next.config` files enter together in b7c02c3, with same objects as snapshot; no later commit touches them. No commit creates `cardapio/src/_components`.

**Interpretation:** Both files arrive together already conflicting. History does not establish whether from different stages. Point inconclusive only for past: snapshot loads `next.config.js`.

### 38. b7c02c3 2025-12-16 (cardapio/src/components/Cardapio.jsx)

**Observation:** `Cardapio.jsx` enters in b7c02c3 with same object as snapshot, unchanged afterward. No observed version calls function `adicionarPedido`, and no call removed.

**Interpretation:** History does not establish whether function abandoned or never connected, because past would be in subrepository. Point inconclusive only for past: snapshot function disconnected.

### 39. 8e7f1d9 2025-12-14; 670f5e2 2025-12-14; 682204a 2025-12-16; b7c02c3 2025-12-16; 268d79a 2026-01-04 (README.md)

**Observation:** None of five commits creates or removes Dockerfile, compose, `vercel.json`, `netlify.toml`, CI workflow or other hosting configuration, including files b7c02c3 brings from menu subrepository.

**Interpretation:** Missing deployment artifact is no remnant of abandoned stage: repository never had one. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (cardapio/package.json:12) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 2 | 3.4.2 (container/package.json:12) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 3 | 3.4.2 (pedido/package.json:12) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 4 | 3.4.2 (cardapio/package.json:12, Evidence); 3.4.3 (cardapio, Markers and Build); 3.4.4 (container/src/pages/index.js:5, cardapio/src/components/Cardapio.jsx:32, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #3, #9 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #17; configures #20 |
| 5 | 3.4.2 (container/package.json:12, Evidence); 3.4.3 (container, Markers and Build); 3.4.4 (container/src/pages/index.js:5, container/src/pages/index.js:6, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #1, #3 (Where served); 3.4.6 #2 (Artifacts); 3.4.7 #3, #4 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #18; configures #20; configures #21 |
| 6 | 3.4.2 (pedido/package.json:12, Evidence); 3.4.3 (pedido, Markers and Build); 3.4.4 (container/src/pages/index.js:6, pedido/src/_components/Pedido.jsx:13, Observation); 3.4.5 #2 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #3, #9 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #19; configures #21 |
| 7 | 3.4.3 (cardapio, Markers) | 2 configuration | configuration | module-federation | technological | weak | — |
| 8 | 3.4.4 (container/src/pages/index.js:5) | 3 code | source code | module-federation | architectural | strong | implements #20 |
| 9 | 3.4.4 (container/src/pages/index.js:6) | 3 code | source code | module-federation | architectural | strong | implements #21 |
| 10 | 3.4.4 (cardapio/src/components/Cardapio.jsx:6) | 3 code | source code | events | technological | weak | — |
| 11 | 3.4.4 (cardapio/src/components/Cardapio.jsx:7) | 3 code | source code | events | technological | weak | — |
| 12 | 3.4.4 (cardapio/src/components/Cardapio.jsx:32) | 3 code | source code | events | technological | moderate | implements #22 |
| 13 | 3.4.4 (cardapio/src/components/Cardapio.jsx:33) | 3 code | source code | events | technological | moderate | implements #22 |
| 14 | 3.4.4 (pedido/src/_components/Pedido.jsx:13) | 3 code | source code | events | technological | moderate | implements #22 |
| 15 | 3.4.4 (container/src/pages/index.js:20) | 3 code | source code | module-federation | architectural | moderate | implements #20 |
| 16 | 3.4.4 (container/src/pages/index.js:25) | 3 code | source code | module-federation | architectural | moderate | implements #21 |
| 17 | 3.4.3 (cardapio) | 4 structure | directory | — | architectural | moderate | — |
| 18 | 3.4.3 (container) | 4 structure | directory | — | architectural | moderate | — |
| 19 | 3.4.3 (pedido) | 4 structure | directory | — | architectural | moderate | — |
| 20 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #18; links #17 |
| 21 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #18; links #19 |
| 22 | 3.4.5 #3 | 5 composition | source code | events | architectural | strong | links #17; links #19 |
| 23 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #17 |
| 24 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #18 |
| 25 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #19 |
| 26 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #17; corroborates #18; corroborates #19; corroborates #1; corroborates #2; corroborates #3; corroborates #20; corroborates #21 |
| 27 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates #18; corroborates #19; corroborates #23; corroborates #24; corroborates #25; corroborates #20; corroborates #21; corroborates #22 |
| 28 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #17; corroborates #18; corroborates #19; corroborates #20; corroborates #21; corroborates #5; corroborates #4; corroborates #6 |
| 29 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #20; corroborates #21; corroborates #5 |
| 30 | 3.4.7 #5 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #8; corroborates #9; corroborates #20; corroborates #21; corroborates #15; corroborates #16 |
| 31 | 3.4.7 #6 | 7 documentation | documentation | events | architectural | weak | corroborates #12; corroborates #13; corroborates #22 |
| 32 | 3.4.7 #7 | 7 documentation | documentation | events | architectural | weak | corroborates #14; corroborates #22 |
| 33 | 3.4.7 #8 | 7 documentation | documentation | events | architectural | weak | corroborates #22; corroborates #12; corroborates #13; corroborates #14 |
| 34 | 3.4.7 #9 | 7 documentation | documentation | module-federation | technological | weak | corroborates #4; corroborates #6 |
| 35 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | partially corroborates #23; partially corroborates #24; partially corroborates #25 |
| 36 | 3.4.7 #11 | 7 documentation | documentation | — | context | weak | — |
| 37 | 3.4.8 #1 | 8 history | history | — | technological | weak | explains #4; explains #7 |
| 38 | 3.4.8 #2 | 8 history | history | — | technological | weak | explains #10; explains #11 |
| 39 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #35; explains #23; explains #24; explains #25 |

## Summary

Observations: 39. Dimensions (technology: 3, configuration: 4, code: 9, structure: 3, composition: 3, build-deploy: 3, documentation: 11, history: 3). Strength (strong: 6, moderate: 13, weak: 20, ambiguous: 0). Evidence (technological: 14, architectural: 24, context: 1).

