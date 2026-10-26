---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
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

# 043 — dhiman1987/micro-frontend-demo

## Repository overview

Documentation is the root README, in English. It presents the repository as a micro-frontends "playground" with Web Components: three applications, `app1` and `app2` in plain JavaScript and `app3` in React with Shadow DOM, plus an `app-shell` bringing them together. It includes an annotated folder tree, instructions to serve each folder with `http-server`, CORS tips and a "Features" list. The tone is promotional ("Ideal for learning, prototyping, or showcasing microfrontend architecture without any tooling overhead", README.md:92), and that purpose sentence did not become a row.

Artifacts cited by previous reviews were read:
- `app-shell/index.html`;
- `app1/index.html`, `app1/app.js`, `app2/index.html` and `app2/app.js`;
- `app3/index.html`, `app3/package.json`, `app3/vite.config.js`, `app3/src/main.jsx`, `app3/src/MyCounterElement.jsx` and `app3/src/MyCounterLitElement.jsx`.

The only comments concern CSS injection into Shadow DOM (app3/src/MyCounterElement.jsx:14) and disabled code passages.

Structure and composition descriptions match previous reviews. Two points differ:
- **Deployment:** README says applications are "independently deployed", but the repository has only local servers.
- **Style isolation:** it promises "zero global style bleed", but only `app3` isolates its styles.

`doc-*` occurrences that did not become rows: README.md:1 (title), README.md:11 (folder tree root) and README.md:92 (purpose sentence). Others are in claims 1, 2 and 6.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "3 independently deployed apps" (three independently deployed applications) | build-deploy | uncorroborated | 3.4.6 (Deploy `not observed` in all four) |
| 2 | README.md:5-8 | "`app1` – Vanilla JS component […] `app3` – A React component wrapped in Shadow DOM […] `app-shell` – The main UI that brings it all together" | structure | corroborated | 3.4.3 (four `Yes` applications); 3.4.5 #1-#3; app1/app.js:1-6; app3/src/MyCounterElement.jsx:8, 28 |
| 3 | README.md:16 | "index.html # Standalone entry point for app1" (app1 runs independently) | independence | corroborated | 3.4.3; app1/index.html:3-4 |
| 4 | README.md:19 | "index.html # Standalone entry point for app2" (app2 runs independently) | independence | corroborated | 3.4.3; app2/index.html:3-4 |
| 5 | README.md:22-23 | "my-counter-app.iife.js # Self-contained React bundle" (app3 bundle is self-contained) | build-deploy | corroborated | 3.4.6 #4; app3/vite.config.js:9-16 |
| 6 | README.md:35 | "Each app […] is dropped into the shell via `<script>` and custom elements, simulating real-world frontend autonomy." | composition | corroborated | 3.4.5 #1-#3; app-shell/index.html:14-15, 20-21, 26-27 |
| 7 | README.md:88 | "Plug-and-play architecture with zero global style bleed" (no global styles bleed between units) | composition | contradicted | app1/app.js:3; app-shell/style.css:48-52; app-shell/index.html:12-16 |

## Observations

**1. README.md:3.** The build and deployment review found no deployment artifact: each folder is manually served with `http-server` on its own port (README.md:46-69). The snapshot neither confirms nor refutes independent deployment, and README describes only local execution. Hence the claim remains `uncorroborated`.

**2. README.md:5-8.** All four folders are applications in the structural review. All three `application → custom-element` relationships start from shell. App1 and app2 define custom elements in plain JavaScript, and app3 encapsulates React in a custom element with `attachShadow`. Repetitions: annotated tree (README.md:13, "Hosts all microfrontends"; README.md:17, "Vanilla JS custom element").

**3. README.md:16.** App1 has its own `index.html` loading the script and using the tag, allowing it to open independently.

**4. README.md:19.** App2 has the same arrangement as app1: its own `index.html` loading the script and using tag `world-app`.

**5. README.md:22-23.** App3 is built as an IIFE library, without declared external dependencies, and shell loads it through a single URL. `dist/` cited in the tree is absent from the snapshot because it is build output.

**6. README.md:35.** Shell loads each application's script through its port URL and uses the corresponding tag. The sentence also mentions each app on its own port; that is an infrastructure detail already recorded by the build and deployment review.

**7. README.md:88.** Only app3 isolates styles: it creates a Shadow DOM and injects its CSS there (app3/src/MyCounterElement.jsx:8, 14-16; repetition in README.md:85). App1 and app2 write `<h2>` into the common DOM with `innerHTML` (app1/app.js:3). Shell styles `.app-container h2` (app-shell/style.css:48-52), and both elements are inside `.app-container` (app-shell/index.html:12-16). Thus shell's style reaches both applications. The claim holds for app3, but not for the set.

## Summary

Claims: 7 (corroborated: 5, partial: 0, contradicted: 1, uncorroborated: 1). Themes: (structure: 1, composition: 2, build-deploy: 2, independence: 2).
