---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
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
  date: 2026-10-21
---

# 043 — dhiman1987/micro-frontend-demo

## Repository overview

Composition uses native Web Components only, without library. Strong evidence all in shell HTML: for each unit loads script by URL (#4, #12 through #14), using script-defined tag (#15 through #17). Other side:
- **app1 and app2:** define tags in plain JavaScript (#5 through #8).
- **app3:** wraps React in custom element with Shadow DOM (#9 through #11). Build packages IIFE bundle (#3).

Three active relationships result (#23 through #25).

Structure shows four units (#19 through #22), three static pages without build. Thus build/deployment provide little evidence:
- **Build:** only app3 has own build (#29).
- **Deployment:** none observed for applications. README claims "independently deployed apps" without supporting artifact (#30).

Signals misleading in isolation:
- **Lit dependencies:** `lit` and `@lit/react` declared (#1, #2), but no entry reaches Lit counter variant (#18). History shows added/never connected (#37).
- **Style isolation:** README promises "zero global style bleed", but shell CSS affects app1/app2 (#36). History shows promise/code coexist since first commit (#38).

## Observations

### 1. app3/package.json:13; app3/src/MyCounterLitElement.jsx:20-23

**Observation:** `@lit/react` (`^1.0.7`) declared in `dependencies`, without import anywhere. Lit variant calls `createComponent` without importing it.

**Interpretation:** Declared unused Web Components library. Misleading signal.

### 2. app3/package.json:15; app3/src/MyCounterLitElement.jsx:1-8

**Observation:** `lit` (`^3.3.0`) declared in `dependencies`. Imported only by variant `MyCounterLitElement.jsx`, referenced by no build/entry.

**Interpretation:** Library used only by variant unreachable from any entry. Misleading signal.

**Note:** Guidance would assign `ambiguous` to dependency `Undetermined` in dependency review (3.4.2). Here `weak`: no build, entry or page references variant (app3/vite.config.js:9-15; app3/src/main.jsx:1), leaving no other plausible snapshot reading.

### 3. app3/vite.config.js:1-17

**Observation:** `build.lib` uses `entry: 'src/MyCounterElement.jsx'`, `formats: ['iife']`, `name: 'MyCounterApp'` and `fileName: 'my-counter-app'`.

**Interpretation:** App3 configured for standalone script publication registering custom element.

### 4. app-shell/index.html:26

**Observation:** `<script src="http://localhost:3003/my-counter-app.iife.js"></script>`.

**Interpretation:** Shell loads app3 bundle through its URL.

**Note:** Source-code review (3.4.4) recorded line through two patterns (#4 and #14). This stage (3.5) retains one observation per row.

### 5. app1/app.js:1-5

**Observation:** Class `HelloApp` extends `HTMLElement`, writing `<h2>` in `connectedCallback`.

**Interpretation:** App1 implements offered custom element.

### 6. app1/app.js:6

**Observation:** `customElements.define('hello-app', HelloApp)`.

**Interpretation:** App1 registers shell-consumed tag.

### 7. app2/app.js:1-5

**Observation:** Class extends `HTMLElement`, writing contents in `connectedCallback`.

**Interpretation:** App2 implements offered custom element.

### 8. app2/app.js:6

**Observation:** `customElements.define('world-app', …)`.

**Interpretation:** App2 registers shell-consumed tag.

### 9. app3/src/MyCounterElement.jsx:6

**Observation:** `class MyCounterElement extends HTMLElement`.

**Interpretation:** App3 implements custom-element wrapper for React application.

### 10. app3/src/MyCounterElement.jsx:7-24

**Observation:** `connectedCallback` creates Shadow DOM (`attachShadow`), injecting application CSS, reading attributes `theme` and `maxCount`, rendering React within.

**Interpretation:** App3 mounts isolated in Shadow DOM with attribute-provided configuration.

### 11. app3/src/MyCounterElement.jsx:28

**Observation:** `customElements.define('my-counter-app', MyCounterElement)`.

**Interpretation:** App3 registers shell-consumed tag.

### 12. app-shell/index.html:14

**Observation:** `<script type="module" src="http://localhost:3001/app.js"></script>`.

**Interpretation:** Shell loads app1 script through its URL.

### 13. app-shell/index.html:20

**Observation:** `<script type="module" src="http://localhost:3002/app.js"></script>`.

**Interpretation:** Shell loads app2 script through its URL.

### 14. app-shell/index.html:26

**Observation:** Same line as #4, recognized by external-script pattern.

**Interpretation:** Shell loads app3 bundle through its URL.

### 15. app-shell/index.html:15

**Observation:** `<hello-app></hello-app>`.

**Interpretation:** Shell inserts app1 through tag.

### 16. app-shell/index.html:21

**Observation:** `<world-app></world-app>`.

**Interpretation:** Shell inserts app2 through tag.

### 17. app-shell/index.html:27

**Observation:** `<my-counter-app theme="dark" maxcount="7"></my-counter-app>`.

**Interpretation:** Shell inserts app3 through tag, passing attribute configuration.

### 18. app3/src/MyCounterLitElement.jsx:7

**Observation:** Decorator `@customElement('my-counter-lit-app')` registers Lit variant imported/used by no entry, build or page.

**Interpretation:** Disconnected custom element not participating in composition.

### 19. app-shell; app-shell/index.html:9-29

**Observation:** Own HTML page loading only own `style.css` and other units’ URL scripts. No build.

**Interpretation:** Static frontend unit with own boundary.

### 20. app1; app1/index.html:3-4; app1/app.js:1-6

**Observation:** Own HTML page loading `app.js`/using tag, without package imports/build.

**Interpretation:** Static frontend unit with own boundary, capable of running alone.

### 21. app2; app2/index.html:3-4; app2/app.js:1-6

**Observation:** Own HTML page loading `app.js`/using tag, without package imports/build.

**Interpretation:** Static frontend unit with own boundary, capable of running alone.

### 22. app3; app3/package.json:1-11; app3/vite.config.js:9-15; app3/src/MyCounterElement.jsx:20-28; app3/index.html:11-12

**Observation:** Own manifest, build entry/Vite IIFE build and standalone page.

**Interpretation:** Frontend unit with own boundary.

### 23. app-shell/index.html:26-27; app3/src/MyCounterElement.jsx:28; app3/vite.config.js:10-15

**Observation:** Shell loads `my-counter-app.iife.js`, using `<my-counter-app>`. Tag/filename match app3.

**Interpretation:** Active application → custom-element relationship.

### 24. app-shell/index.html:14-15; app1/app.js:6

**Observation:** Shell loads `http://localhost:3001/app.js`, using `<hello-app>`, app1-defined tag.

**Interpretation:** Active application → custom-element relationship.

### 25. app-shell/index.html:20-21; app2/app.js:6

**Observation:** Shell loads `http://localhost:3002/app.js`, using `<world-app>`, app2-defined tag.

**Interpretation:** Active application → custom-element relationship.

### 26. app-shell; README.md:46-50

**Observation:** Static page without build, manually served through `http-server` on port 3000. No deployment artifact.

**Interpretation:** No observed build/deployment boundary.

### 27. app1; README.md:52-56

**Observation:** Static page without build, manually served on port 3001. No deployment artifact.

**Interpretation:** No observed build/deployment boundary.

### 28. app2; README.md:58-62

**Observation:** Static page without build, manually served on port 3002. No deployment artifact.

**Interpretation:** No observed build/deployment boundary.

### 29. app3/vite.config.js:4-16; app3/package.json:8

**Observation:** Library-mode `vite build` generates `iife` bundle `my-counter-app`. No deployment artifact.

**Interpretation:** Own build boundary without observed deployment.

### 30. README.md:3

**Observation:** "3 independently deployed apps".

**Interpretation:** Claims independent application deployment without snapshot artifact. Claim uncorroborated.

### 31. README.md:5-8

**Observation:** "`app1` – Vanilla JS component […] `app3` – A React component wrapped in Shadow DOM […] `app-shell` – The main UI that brings it all together".

**Interpretation:** Describes units/shell role. Claim corroborated.

### 32. README.md:16

**Observation:** "index.html # Standalone entry point for app1".

**Interpretation:** Claims app1 runs alone. Claim corroborated.

### 33. README.md:19

**Observation:** "index.html # Standalone entry point for app2".

**Interpretation:** Claims app2 runs alone. Claim corroborated.

### 34. README.md:22-23

**Observation:** "my-counter-app.iife.js # Self-contained React bundle".

**Interpretation:** Claims app3 bundle self-contained. Claim corroborated.

### 35. README.md:35

**Observation:** "Each app […] is dropped into the shell via `<script>` and custom elements, simulating real-world frontend autonomy."

**Interpretation:** Describes script/tag composition. Claim corroborated.

### 36. README.md:88

**Observation:** "Plug-and-play architecture with zero global style bleed".

**Interpretation:** Claims no inter-unit style leakage. Shell CSS affects app1/app2, making claim contradicted.

### 37. cae0143 2025-08-25 (app3/src/MyCounterLitElement.jsx, app3/package.json); 8841396 2025-06-28 (app3/vite.config.js, app3/index.html, app3/src/main.jsx, app3/src/MyCounterElement.jsx)

**Observation:** Lit variant created in last commit alongside app3 `package.json` change. App3 entry/build-defining files unchanged since first commit.

**Interpretation:** Variant added/never connected rather than later disconnected. Point clarified.

### 38. 8841396 2025-06-28 (app1/app.js, app2/app.js, app-shell/index.html, app-shell/style.css); 54b84a0 2025-06-28 (README.md)

**Observation:** Style/markup files unchanged since first commit, README last changed same day.

**Interpretation:** Promise/contradicting code coexist since start rather than different stages. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (app3/package.json:13) | 1 technology | manifest | web-components | technological | weak | — |
| 2 | 3.4.2 (app3/package.json:15) | 1 technology | manifest | web-components | technological | weak | declares #18 |
| 3 | 3.4.2 (app3/package.json:15, Evidence); 3.4.3 (app3, Markers, Entry and Build); 3.4.4 (app-shell/index.html:26; app3/src/MyCounterElement.jsx:6, 8, 28; app3/src/MyCounterLitElement.jsx:7, Observation); 3.4.5 #1 (Configuration); 3.4.6 #4 (Artifacts); 3.4.7 #5 (Evidence) | 2 configuration | configuration | web-components | technological | moderate | configures #22; configures #23 |
| 4 | 3.4.4 (app-shell/index.html:26, src-bundle-url) | 3 code | source code | web-components | architectural | strong | implements #23 |
| 5 | 3.4.4 (app1/app.js:1) | 3 code | source code | web-components | technological | moderate | implements #24 |
| 6 | 3.4.4 (app1/app.js:6) | 3 code | source code | web-components | technological | moderate | implements #24 |
| 7 | 3.4.4 (app2/app.js:1) | 3 code | source code | web-components | technological | moderate | implements #25 |
| 8 | 3.4.4 (app2/app.js:6) | 3 code | source code | web-components | technological | moderate | implements #25 |
| 9 | 3.4.4 (app3/src/MyCounterElement.jsx:6) | 3 code | source code | web-components | technological | moderate | implements #23 |
| 10 | 3.4.4 (app3/src/MyCounterElement.jsx:8) | 3 code | source code | web-components | technological | moderate | implements #23 |
| 11 | 3.4.4 (app3/src/MyCounterElement.jsx:28) | 3 code | source code | web-components | technological | moderate | implements #23 |
| 12 | 3.4.4 (app-shell/index.html:14) | 3 code | source code | web-components | architectural | strong | implements #24 |
| 13 | 3.4.4 (app-shell/index.html:20) | 3 code | source code | web-components | architectural | strong | implements #25 |
| 14 | 3.4.4 (app-shell/index.html:26, src-html-external-script) | 3 code | source code | web-components | architectural | strong | implements #23 |
| 15 | 3.4.4 (app-shell/index.html:15) | 3 code | source code | web-components | architectural | strong | implements #24 |
| 16 | 3.4.4 (app-shell/index.html:21) | 3 code | source code | web-components | architectural | strong | implements #25 |
| 17 | 3.4.4 (app-shell/index.html:27) | 3 code | source code | web-components | architectural | strong | implements #23 |
| 18 | 3.4.4 (app3/src/MyCounterLitElement.jsx:7) | 3 code | source code | web-components | technological | weak | — |
| 19 | 3.4.3 (app-shell) | 4 structure | directory | — | architectural | moderate | — |
| 20 | 3.4.3 (app1) | 4 structure | directory | — | architectural | moderate | — |
| 21 | 3.4.3 (app2) | 4 structure | directory | — | architectural | moderate | — |
| 22 | 3.4.3 (app3) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.5 #1 | 5 composition | source code | web-components | architectural | strong | links #19; links #22 |
| 24 | 3.4.5 #2 | 5 composition | source code | web-components | architectural | strong | links #19; links #20 |
| 25 | 3.4.5 #3 | 5 composition | source code | web-components | architectural | strong | links #19; links #21 |
| 26 | 3.4.6 #1 | 6 build-deploy | documentation | — | architectural | weak | publishes #19 |
| 27 | 3.4.6 #2 | 6 build-deploy | documentation | — | architectural | weak | publishes #20 |
| 28 | 3.4.6 #3 | 6 build-deploy | documentation | — | architectural | weak | publishes #21 |
| 29 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #22 |
| 30 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | — |
| 31 | 3.4.7 #2 | 7 documentation | documentation | web-components | architectural | weak | corroborates #19; corroborates #20; corroborates #21; corroborates #22; corroborates #23; corroborates #24; corroborates #25 |
| 32 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #20 |
| 33 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #21 |
| 34 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #29; corroborates #3 |
| 35 | 3.4.7 #6 | 7 documentation | documentation | web-components | architectural | weak | corroborates #23; corroborates #24; corroborates #25 |
| 36 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | contradicts app1/app.js:3; contradicts app-shell/style.css:48-52; contradicts app-shell/index.html:12-16 |
| 37 | 3.4.8 #1 | 8 history | history | web-components | technological | weak | explains #1; explains #2; explains #18 |
| 38 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #36 |

## Summary

Observations: 38. Dimensions (technology: 2, configuration: 1, code: 15, structure: 4, composition: 3, build-deploy: 4, documentation: 7, history: 2). Strength (strong: 10, moderate: 13, weak: 15, ambiguous: 0). Evidence (technological: 12, architectural: 26, context: 0).

