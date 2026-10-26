---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
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

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-bundle-url | app-shell/index.html:26 | app-shell | script-loading | Yes | app-shell/index.html:26 loads the app3 unit’s IIFE bundle; the corresponding element is consumed at app-shell/index.html:27 and the bundle entry is app3/vite.config.js:11. |
| src-custom-element | app1/app.js:1 | app1 | custom-element | Yes | app1/app.js:1 defines the hello-app element for consumption; script loaded by the shell at app-shell/index.html:14 and tag used at app-shell/index.html:15. |
| src-custom-element | app1/app.js:6 | app1 | custom-element | Yes | app1/app.js:6 defines the hello-app element for consumption; script loaded by the shell at app-shell/index.html:14 and tag used at app-shell/index.html:15. |
| src-custom-element | app2/app.js:1 | app2 | custom-element | Yes | app2/app.js:1 defines the world-app element for consumption; script loaded by the shell at app-shell/index.html:20 and tag used at app-shell/index.html:21. |
| src-custom-element | app2/app.js:6 | app2 | custom-element | Yes | app2/app.js:6 defines the world-app element for consumption; script loaded by the shell at app-shell/index.html:20 and tag used at app-shell/index.html:21. |
| src-custom-element | app3/src/MyCounterElement.jsx:6 | app3 | custom-element | Yes | app3/src/MyCounterElement.jsx:6 participates in encapsulation/registration of my-counter-app; active entry at app3/vite.config.js:11, script consumed by the shell at app-shell/index.html:26 and tag at app-shell/index.html:27. |
| src-custom-element | app3/src/MyCounterElement.jsx:8 | app3 | custom-element | Yes | app3/src/MyCounterElement.jsx:8 participates in encapsulation/registration of my-counter-app; active entry at app3/vite.config.js:11, script consumed by the shell at app-shell/index.html:26 and tag at app-shell/index.html:27. |
| src-custom-element | app3/src/MyCounterElement.jsx:28 | app3 | custom-element | Yes | app3/src/MyCounterElement.jsx:28 participates in encapsulation/registration of my-counter-app; active entry at app3/vite.config.js:11, script consumed by the shell at app-shell/index.html:26 and tag at app-shell/index.html:27. |
| src-html-external-script | app-shell/index.html:14 | app-shell | script-loading | Yes | app-shell/index.html:14 loads a script from the other unit app1; element consumed on line 15 of app-shell/index.html. |
| src-html-external-script | app-shell/index.html:20 | app-shell | script-loading | Yes | app-shell/index.html:20 loads a script from the other unit app2; element consumed on line 21 of app-shell/index.html. |
| src-html-external-script | app-shell/index.html:26 | app-shell | script-loading | Yes | app-shell/index.html:26 loads a script from the other unit app3; element consumed on line 27 of app-shell/index.html. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | app-shell/index.html:15 | app-shell | custom-element | Yes | Consumes the other unit’s hello-app tag, defined at app1/app.js:6; script loaded at app-shell/index.html:14. |
| manual | app-shell/index.html:21 | app-shell | custom-element | Yes | Consumes the other unit’s world-app tag, defined at app2/app.js:6; script loaded at app-shell/index.html:20. |
| manual | app-shell/index.html:27 | app-shell | custom-element | Yes | Consumes the other unit’s my-counter-app tag, defined at app3/src/MyCounterElement.jsx:28; script loaded at app-shell/index.html:26. |
| manual | app3/src/MyCounterLitElement.jsx:7 | app3 | custom-element | No | The decorator registers the my-counter-lit-app variant, but no entry/build imports it and its tag is not consumed; active entries use MyCounterElement at app3/src/main.jsx:1 and app3/vite.config.js:11. |

## Summary

Constructs participating in composition: 14 (script-loading: 4, custom-element: 10).

## Notes

- The IIFE URL at app-shell/index.html:26 appears twice in mining through different patterns; both rows were preserved and counted.
- Tag uses in the shell are inter-unit composition; the same elements in standalone HTML files are internal and remain outside the table (method step 4).
- The Lit variant is not reached by the snapshot entry points. The No answer follows this stage’s inactive construct rule; it does not change the dependency review.
- Consumption through the theme and maxcount attributes is a contract between shell and app3. No event or other communication channel between units was found in the searches.
- Under the criteria for constructs outside mining (method step 4), use of each tag in the unit’s own standalone page (app1/index.html:4, app2/index.html:4, app3/index.html:11) and reading the `theme` and `maxCount` attributes at app3/src/MyCounterElement.jsx:10-11, supplied by the shell at app-shell/index.html:27, remain outside the table.
