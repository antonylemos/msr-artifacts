---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
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

# 294 — angelantilantil-web/micro-frontend

## Repository overview

Documentation comprises 24 English Markdown files: root and per-unit README and DOCUMENTATION, plus AI module and backend READMEs. None is a tool README or third-party document. All 24 artifacts.csv `documentation` files were read in full. Texts present a banking dashboard with shell and Webpack Module Federation remotes. Architecture is confirmed for seven links; accounts, cards and loans exist as remotes but host does not load them (host-app/webpack.config.js:47–55; host-app/src/App.js:230–240). Several documents confuse remote availability with consumption and separate CSS files with style isolation. Independent evolution is supported by own entries/builds; independent publication lacks artifacts (3.4.3 and 3.4.6).

The eleven package.json and webpack.config.js files, eleven src/index.js entries, App.js comments cited in reviews and start-all-modules.bat were read. Manifests lack description fields and webpack configurations lack architectural comments. Bus, store and loading comments became claims; layout, sample data and upload-handling comments describe internals. CSS passages were also compared with stylesheets and style-loader/css-loader rules. Review 3.4.5 (Observation 7) records commented backend integration, per ai-agent-module/src/App.js:84–109; the active path uses local responses (ai-agent-module/src/App.js:81–82). This reading matches the seven host → remote relationships in the composition review.

Doc-* occurrences without additional architectural claims: DOCUMENTATION.md:1 and README.md:1 are titles; README.md:8 is the tree root name. business-reports/DOCUMENTATION.md:4, incoming-api-logs/DOCUMENTATION.md:4, incoming-api-logs/README.md:3, model-portfolio-configuration/DOCUMENTATION.md:25 and vro-uploads/DOCUMENTATION.md:4 mention the project alongside functional descriptions, adding no mechanism or role. accounts-module/DOCUMENTATION.md:4 repeats participation already listed at root; ai-agent-module/README.md:3 repeats the tree's AI unit. All other occurrences are in rows or repetitions indicated in Observations, including DOCUMENTATION.md:35, README.md:111 and incoming-api-logs/README.md:28 within execution instructions. Command lists and code examples (README.md:37–61,69–93,99–115,164–172,178–199; DOCUMENTATION.md:23–33 and local blocks) were not counted as new claims.

Screen, filter and banking data descriptions are functional context; business-reports/src/App.js:4–11, maker-requests/src/App.js:4–11 and model-portfolio-configuration/src/App.js:4–11 contain placeholders. Backend documentation covers FastAPI, database and setup (ai-agent-backend/README.md:3–39,48–49), but these internal backend relationships are excluded; frontend configuration instruction at :44 proposes integration without claiming it is active, producing no row. Local instructions without a new architectural property also remain in this overview.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | DOCUMENTATION.md:4 | "This repository implements a micro-frontend architecture [...] using `host-app` as the shell and multiple remote modules." | structure | corroborated | 3.4.3 (Units); 3.4.5 #1–7 |
| 2 | DOCUMENTATION.md:8 | "`accounts-module/` - Accounts management micro-frontend" | structure | corroborated | 3.4.3 (Units: accounts-module); accounts-module/webpack.config.js:44–49 |
| 3 | DOCUMENTATION.md:9 | "`business-reports/` - Business reports micro-frontend" | structure | corroborated | 3.4.3 (Units: business-reports); business-reports/webpack.config.js:44–49 |
| 4 | DOCUMENTATION.md:10 | "`cards-module/` - Cards management micro-frontend" | structure | corroborated | 3.4.3 (Units: cards-module); cards-module/webpack.config.js:44–49 |
| 5 | DOCUMENTATION.md:11 | "`incoming-api-logs/` - Incoming API logs micro-frontend" | structure | corroborated | 3.4.3 (Units: incoming-api-logs); incoming-api-logs/webpack.config.js:44–49 |
| 6 | DOCUMENTATION.md:12 | "`loans-module/` - Loans management micro-frontend" | structure | corroborated | 3.4.3 (Units: loans-module); loans-module/webpack.config.js:44–49 |
| 7 | DOCUMENTATION.md:13 | "`maker-requests/` - Maker-requests workflow micro-frontend" | structure | corroborated | 3.4.3 (Units: maker-requests); maker-requests/webpack.config.js:44–49 |
| 8 | DOCUMENTATION.md:14 | "`model-portfolio-configuration/` - Portfolio configuration micro-frontend" | structure | corroborated | 3.4.3 (Units: model-portfolio-configuration); model-portfolio-configuration/webpack.config.js:44–49 |
| 9 | DOCUMENTATION.md:15 | "`outgoing-api-logs/` - Outgoing API logs micro-frontend" | structure | corroborated | 3.4.3 (Units: outgoing-api-logs); outgoing-api-logs/webpack.config.js:44–49 |
| 10 | DOCUMENTATION.md:16 | "`vro-uploads/` - VRO uploads micro-frontend" | structure | corroborated | 3.4.3 (Units: vro-uploads); vro-uploads/webpack.config.js:44–49 |
| 11 | DOCUMENTATION.md:38 | "The host uses Webpack Module Federation to load remote entries from each module." | composition | contradicted | 3.4.5 #1–7; host-app/webpack.config.js:47–55 |
| 12 | DOCUMENTATION.md:39 | "Each module is independently runnable and documented at its own folder level." | independence | corroborated | 3.4.3 (Units); 3.4.6 (Applications) |
| 13 | README.md:15 | "ai-agent-module/ [...] # AI Agent chatbot module" | structure | corroborated | 3.4.3 (Units: ai-agent-module); ai-agent-module/src/index.js:3–7 |
| 14 | README.md:21 | "This project uses **Webpack Module Federation** to implement a micro-frontend architecture:" | composition | corroborated | host-app/webpack.config.js:2,44–55; 3.4.5 #1–7 |
| 15 | README.md:24 | "Standalone applications that can be independently developed" | independence | corroborated | 3.4.3 (Units); 3.4.6 (Applications) |
| 16 | README.md:24 | "can be independently [...] deployed" | build-deploy | uncorroborated | — |
| 17 | README.md:135 | "Shared event bus for cross-module communication" | composition | contradicted | 3.4.4 (event bus: No); host-app/src/App.js:6–27; accounts-module/src/App.js:5–19,38–48 |
| 18 | README.md:145 | "Remote module loaded by host app" | composition | corroborated | 3.4.5 #3; host-app/src/App.js:38,233 |
| 19 | README.md:176 | "Build each module for production:" | build-deploy | corroborated | 3.4.6 (Separate build: 11); host-app/package.json:6; business-reports/package.json:6 |
| 20 | accounts-module/DOCUMENTATION.md:9 | "Remote module configuration for Module Federation" | composition | corroborated | accounts-module/webpack.config.js:44–49 |
| 21 | accounts-module/DOCUMENTATION.md:15 | "Uses isolated module styles and components" | composition | contradicted | accounts-module/src/App.js:1–2; accounts-module/src/styles.css:8–19; accounts-module/webpack.config.js:37–40 |
| 22 | accounts-module/DOCUMENTATION.md:26 | "The host app loads this module as a federated remote when the user navigates to the Accounts route." | composition | contradicted | host-app/webpack.config.js:47–55; host-app/src/App.js:230–240 |
| 23 | accounts-module/src/App.js:4 | "Event Bus for cross-module communication" | composition | contradicted | 3.4.4 (event bus: No); accounts-module/src/App.js:5–19,46–48; host-app/webpack.config.js:47–55 |
| 24 | accounts-module/src/App.js:36 | "Initialize accounts from shared store" | composition | contradicted | accounts-module/src/App.js:38–44; host-app/src/App.js:6–24 |
| 25 | ai-agent-module/README.md:21 | "This module is built as a Webpack Module Federation remote and is exposed as `AIAgentApp`." | composition | corroborated | 3.4.5 #7; ai-agent-module/webpack.config.js:44–48 |
| 26 | ai-agent-module/src/App.js:84 | "API integration is currently disabled for static demo mode." | composition | corroborated | ai-agent-module/src/App.js:81–109 |
| 27 | business-reports/DOCUMENTATION.md:9 | "Remote entry configuration for Module Federation" | composition | corroborated | business-reports/webpack.config.js:44–48 |
| 28 | business-reports/DOCUMENTATION.md:15 | "Uses isolated CSS for module-specific layout" | composition | contradicted | business-reports/src/styles.css:2–26; business-reports/webpack.config.js:37–40 |
| 29 | business-reports/DOCUMENTATION.md:25 | "The module is loaded by `host-app` when the Business Reports route is active." | composition | corroborated | 3.4.5 #1; host-app/src/App.js:30,231 |
| 30 | cards-module/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composition | corroborated | cards-module/webpack.config.js:44–49 |
| 31 | cards-module/DOCUMENTATION.md:14 | "Displays card data as a standalone micro-frontend" | independence | corroborated | cards-module/src/index.js:3–7; cards-module/src/App.js:38–44; cards-module/package.json:5 |
| 32 | cards-module/DOCUMENTATION.md:15 | "Uses isolated styles for module-specific UI" | composition | contradicted | cards-module/src/styles.css:8–19; cards-module/webpack.config.js:37–40 |
| 33 | cards-module/DOCUMENTATION.md:26 | "The host shell loads this module dynamically as part of the micro-frontend routing." | composition | contradicted | host-app/webpack.config.js:47–55; host-app/src/App.js:230–240 |
| 34 | cards-module/src/App.js:4 | "Event Bus for cross-module communication" | composition | contradicted | 3.4.4 (event bus: No); cards-module/src/App.js:5–19,46–48; host-app/webpack.config.js:47–55 |
| 35 | cards-module/src/App.js:36 | "Initialize cards from shared store" | composition | contradicted | cards-module/src/App.js:38–44; host-app/src/App.js:6–24 |
| 36 | host-app/DOCUMENTATION.md:10 | "Global shared styling" | composition | corroborated | host-app/src/App.js:3,228–238; host-app/src/styles.css:2–13 |
| 37 | host-app/DOCUMENTATION.md:26 | "Must run together with remote modules so the federated remotes can be loaded." | composition | corroborated | host-app/webpack.config.js:48–54; host-app/src/App.js:30–57 |
| 38 | host-app/DOCUMENTATION.md:27 | "The host app uses route-based loading for each remote module." | composition | corroborated | host-app/src/App.js:30–57,230–240 |
| 39 | host-app/src/App.js:26 | "Make EventBus available globally" | composition | corroborated | host-app/src/App.js:27 |
| 40 | host-app/src/App.js:29 | "Lazy load remote modules" | composition | corroborated | host-app/src/App.js:30–57 |
| 41 | incoming-api-logs/DOCUMENTATION.md:6 | "It is designed as a remote micro-frontend that can be loaded into the `host-app` using Webpack Module Federation." | composition | corroborated | 3.4.5 #4; incoming-api-logs/webpack.config.js:44–48; host-app/src/App.js:42,234 |
| 42 | loans-module/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composition | corroborated | loans-module/webpack.config.js:44–49 |
| 43 | loans-module/DOCUMENTATION.md:14 | "Uses independent styling and routing for the loan module" | independence | contradicted | loans-module/src/App.js:1–51; loans-module/src/styles.css:8–19; loans-module/webpack.config.js:37–40 |
| 44 | loans-module/DOCUMENTATION.md:26 | "The host loads it dynamically when the Loans route is requested." | composition | contradicted | host-app/webpack.config.js:47–55; host-app/src/App.js:230–240 |
| 45 | loans-module/src/App.js:4 | "Event Bus for cross-module communication" | composition | contradicted | 3.4.4 (event bus: No); loans-module/src/App.js:5–19,46–48; host-app/webpack.config.js:47–55 |
| 46 | loans-module/src/App.js:36 | "Initialize loans from shared store" | composition | contradicted | loans-module/src/App.js:38–44; host-app/src/App.js:6–24 |
| 47 | maker-requests/DOCUMENTATION.md:13 | "Exposes a remote entry to the host shell" | composition | corroborated | maker-requests/webpack.config.js:44–48; 3.4.5 #5 |
| 48 | maker-requests/DOCUMENTATION.md:15 | "Uses isolated styling to avoid conflicts with other modules" | composition | contradicted | maker-requests/src/styles.css:2–26; maker-requests/webpack.config.js:37–40 |
| 49 | maker-requests/DOCUMENTATION.md:25 | "The host app loads this module on the Maker Requests route." | composition | corroborated | 3.4.5 #5; host-app/src/App.js:46,236 |
| 50 | model-portfolio-configuration/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composition | corroborated | model-portfolio-configuration/webpack.config.js:44–48 |
| 51 | model-portfolio-configuration/DOCUMENTATION.md:15 | "Isolation ensures styles do not leak into the host or other modules" | composition | contradicted | model-portfolio-configuration/src/styles.css:2–26; model-portfolio-configuration/webpack.config.js:37–40 |
| 52 | model-portfolio-configuration/DOCUMENTATION.md:26 | "The host app loads it dynamically through Module Federation." | composition | corroborated | 3.4.5 #2; host-app/src/App.js:34,232 |
| 53 | outgoing-api-logs/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composition | corroborated | outgoing-api-logs/webpack.config.js:44–48 |
| 54 | outgoing-api-logs/DOCUMENTATION.md:15 | "Uses isolated CSS to keep the module visually separated" | composition | contradicted | outgoing-api-logs/src/styles.css:2–12; outgoing-api-logs/webpack.config.js:37–40 |
| 55 | start-all-modules.bat:2 | "Batch file to run all HDFC micro frontend modules and host app in separate terminals" | independence | contradicted | start-all-modules.bat:4–12; 3.4.3 (Units) |
| 56 | vro-uploads/DOCUMENTATION.md:9 | "Module Federation remote configuration" | composition | corroborated | vro-uploads/webpack.config.js:44–48 |
| 57 | vro-uploads/DOCUMENTATION.md:15 | "Uses isolated styles so it does not affect the host or other modules" | composition | contradicted | vro-uploads/src/styles.css:1–10; vro-uploads/webpack.config.js:37–40 |
| 58 | vro-uploads/DOCUMENTATION.md:25 | "This module is loaded when the VRO Uploads route is selected from the host app." | composition | corroborated | 3.4.5 #6; host-app/src/App.js:50,237 |

## Observations

**1. DOCUMENTATION.md:4.** The shell and remotes exist; seven are connected. Repetitions: README.md:3; README.md:23; README.md:132; host-app/DOCUMENTATION.md:4; host-app/DOCUMENTATION.md:7; host-app/DOCUMENTATION.md:13; host-app/README.md:3,9,23. DOCUMENTATION.md:7 specifies shell navigation; the annotated README.md:9–16 tree confirms the same organization and adds the AI unit.

**2. DOCUMENTATION.md:8.** Unit accounts-module has its own entry and remote configuration. The label’s business function is context, not proof of functionality. The remote declaration recurs at accounts-module/README.md:3; this does not imply shell consumption.

**3. DOCUMENTATION.md:9.** Unit business-reports has its own entry and remote configuration. The label’s business function is context, not proof of functionality. The remote declaration recurs at business-reports/README.md:3; this does not imply shell consumption.

**4. DOCUMENTATION.md:10.** Unit cards-module has its own entry and remote configuration. The label’s business function is context, not proof of functionality. The remote declaration recurs at cards-module/README.md:3; this does not imply shell consumption.

**5. DOCUMENTATION.md:11.** Unit incoming-api-logs has its own entry and remote configuration. The label’s business function is context, not proof of functionality. The remote declaration recurs at incoming-api-logs/README.md:3; this does not imply shell consumption.

**6. DOCUMENTATION.md:12.** Unit loans-module has its own entry and remote configuration. The label’s business function is context, not proof of functionality. The remote declaration recurs at loans-module/README.md:3; this does not imply shell consumption.

**7. DOCUMENTATION.md:13.** Unit maker-requests has its own entry and remote configuration. The label’s business function is context, not proof of functionality. The doc-mfe-term occurrence at maker-requests/README.md:3 ("The `maker-requests` module is a remote micro-frontend for the HDFC project.") repeats this unit/remote-role claim, requiring no other table row; this role alone does not imply shell consumption.

**8. DOCUMENTATION.md:14.** Unit model-portfolio-configuration has its own entry and remote configuration. The label’s business function is context, not proof of functionality. The doc-mfe-term occurrence at model-portfolio-configuration/README.md:3 ("The `model-portfolio-configuration` module is a remote micro-frontend for the HDFC project.") repeats this unit/remote-role claim, requiring no other table row; this role alone does not imply shell consumption.

**9. DOCUMENTATION.md:15.** Unit outgoing-api-logs has its own entry and remote configuration. The label’s business function is context, not proof of functionality. The doc-mfe-term occurrence at outgoing-api-logs/README.md:3 ("The `outgoing-api-logs` module is a remote micro-frontend for the HDFC project.") repeats this unit/remote-role claim, requiring no other table row; this role alone does not imply shell consumption.

**10. DOCUMENTATION.md:16.** Unit vro-uploads has its own entry and remote configuration. The label’s business function is context, not proof of functionality. The doc-mfe-term occurrence at vro-uploads/README.md:3 ("The `vro-uploads` module is a remote micro-frontend for the HDFC project.") repeats this unit/remote-role claim, requiring no other table row; this role alone does not imply shell consumption.

**11. DOCUMENTATION.md:38.** The mechanism matches seven remotes, but “each module” includes accounts, cards and loans listed at DOCUMENTATION.md:8,10,12, which host neither declares nor imports. This universality also appears at host-app/README.md:22. Instruction DOCUMENTATION.md:35 repeats host loading. The general technology claim without the universal quantifier has its own row at README.md:21.

**12. DOCUMENTATION.md:39.** Each frontend has its own entry, local server and documentation. README.md:3,24,65–67 repeats execution/development autonomy; publication is not inferred. Installation/execution commands at DOCUMENTATION.md:22–33 and README.md:35–115 illustrate local operation without additional rows.

**13. README.md:15.** The annotated tree adds the AI module to the general documentation’s older list. ai-agent-module/README.md:3 repeats its POC participation; chat experience description is functional context.

**14. README.md:21.** The technology is Webpack 5’s built-in plugin. Repetitions: README.md:134,156, host-app/DOCUMENTATION.md:9,14 and host-app/README.md:6,11. This mechanism claim excludes the universal quantification contradicted at DOCUMENTATION.md:38.

**15. README.md:24.** Separate development is supported by per-unit manifests, entries and builds. Execution autonomy in the same sentence is already at DOCUMENTATION.md:39; this row records separate development possibility, also repeated at accounts-module/README.md:23.

**16. README.md:24.** Independent deployment possibility is claimed, but no publication configuration or pipeline exists in the snapshot (3.4.6: Deploy not observed for all eleven applications). Separate builds do not demonstrate separate deployment. accounts-module/README.md:23 repeats the intention to support independent deployment.

**17. README.md:135.** The global bus exists but does not communicate between composed units: subscribers exist only in the three unloaded remotes, without an active publisher. Repetitions: README.md:162 and host-app/DOCUMENTATION.md:15; example README.md:164–172 is a code block, not a new claim. Comment host-app/src/App.js:5 repeats the purpose, whereas :26 correctly describes global exposure.

**18. README.md:145.** The section names outgoing-api-logs. Repetitions: outgoing-api-logs/DOCUMENTATION.md:13,25 and outgoing-api-logs/README.md:22. Host declares and mounts the component at route outgoing-api.

**19. README.md:176.** The text introduces per-directory builds. README.md:178–199 merely illustrates commands for some units, without another row; all eleven scripts use webpack --mode production.

**20. accounts-module/DOCUMENTATION.md:9.** The plugin exposes AccountsApp and AccountsService. Remote availability is real even without a consumer. Repetitions: accounts-module/DOCUMENTATION.md:13 and accounts-module/README.md:12.

**21. accounts-module/DOCUMENTATION.md:15.** Components and CSS reside in local files, but CSS uses global selectors such as .module-header, also in business-reports/src/styles.css:6–19. style-loader and css-loader without CSS Modules do not isolate styles between units.

**22. accounts-module/DOCUMENTATION.md:26.** Host has neither remote accountsModule nor Accounts route. accounts-module/README.md:22 repeats the same nonexistent loading; exposing AccountsApp does not suffice to be loaded.

**23. accounts-module/src/App.js:4.** accounts-module subscribes to events but is not loaded by host, with no active publisher to complete communication. Fallback is a local bus rather than a shared channel between separately executed applications.

**24. accounts-module/src/App.js:36.** Store access is conditional; host bus implements only subscribe/publish, without the requested getter. The available path uses local sample data; no store is used by two units.

**25. ai-agent-module/README.md:21.** The exposed key matches the federated import. Chat functionality does not require a backend in the current state.

**26. ai-agent-module/src/App.js:84.** The comment describes the backend boundary: active local responses and commented HTTP integration. This is not internal processing detail; it changes which service the unit depends on.

**27. business-reports/DOCUMENTATION.md:9.** BusinessReportsApp exposure matches. Repetitions: business-reports/DOCUMENTATION.md:14 and business-reports/README.md:11.

**28. business-reports/DOCUMENTATION.md:15.** Local CSS contains global .module-container, .module-header and .module-content, repeated in model-portfolio-configuration/src/styles.css:2–26. The loader does not enable module scoping.

**29. business-reports/DOCUMENTATION.md:25.** Configuration and route confirm loading. business-reports/README.md:22–23 repeats mounting by host.

**30. cards-module/DOCUMENTATION.md:9.** Exposes CardsApp and CardsService without a host consumer. Repetitions: cards-module/DOCUMENTATION.md:13 and cards-module/README.md:11.

**31. cards-module/DOCUMENTATION.md:14.** Own entry and local-data fallback support autonomous execution. cards-module/DOCUMENTATION.md:25 repeats independence; serving alongside host does not connect it automatically.

**32. cards-module/DOCUMENTATION.md:15.** Styles are global and repeat .module-header from accounts-module/src/styles.css:8–19. No technical CSS isolation exists between units.

**33. cards-module/DOCUMENTATION.md:26.** Host neither declares cardsModule nor mounts CardsApp. cards-module/README.md:22 repeats the nonexistent Cards route.

**34. cards-module/src/App.js:4.** cards-module subscribes to events but is not loaded by host, with no active publisher to complete communication. Fallback is a local bus rather than a shared channel between separately executed applications.

**35. cards-module/src/App.js:36.** Store access is conditional; host bus implements only subscribe/publish, without the requested getter. The available path uses local sample data; no store is used by two units.

**36. host-app/DOCUMENTATION.md:10.** Host imports global CSS with universal reset and body; remote components mounted within it share the document and are subject to those rules. host-app/README.md:12 repeats the global nature. This is not a CSS library imported by multiple builds.

**37. host-app/DOCUMENTATION.md:26.** URLs require available remote servers to load components. Shell can show warnings when absent, but the claim conditions loading rather than interface opening.

**38. host-app/DOCUMENTATION.md:27.** The seven configured remotes are mounted through routes and imported through React.lazy. Here “each remote” describes host remote strategy rather than inclusion of every project. Comment host-app/src/App.js:29 confirms lazy loading.

**39. host-app/src/App.js:26.** Assignment to window.EventBus exists. Global availability is distinct from effective communication, which remains contradicted.

**40. host-app/src/App.js:29.** React.lazy wraps all seven imports; this is loading strategy, distinct from route linkage described at host-app/DOCUMENTATION.md:27.

**41. incoming-api-logs/DOCUMENTATION.md:6.** Configuration and consumption confirm mechanism and unit. incoming-api-logs/DOCUMENTATION.md:40 and incoming-api-logs/README.md:28 repeat integration within execution instructions.

**42. loans-module/DOCUMENTATION.md:9.** Exposes LoansApp and LoansService. Repetitions: loans-module/DOCUMENTATION.md:13 and loans-module/README.md:11. Does not demonstrate a consumer.

**43. loans-module/DOCUMENTATION.md:14.** The module has its own files but defines no router, and its CSS uses global .module-header, identical to accounts-module/src/styles.css:8–19. Internal selection and modal are not independent routes. The doc-independence occurrence is addressed here; isolation between units is not confirmed.

**44. loans-module/DOCUMENTATION.md:26.** Host has neither remote loansModule nor Loans route. loans-module/README.md:22 repeats the claim.

**45. loans-module/src/App.js:4.** loans-module subscribes to events but is not loaded by host, with no active publisher to complete communication. Fallback is a local bus rather than a shared channel between separately executed applications.

**46. loans-module/src/App.js:36.** Store access is conditional; host bus implements only subscribe/publish, without the requested getter. The available path uses local sample data; no store is used by two units.

**47. maker-requests/DOCUMENTATION.md:13.** The unit exposes MakerRequestsApp and host consumes it. maker-requests/README.md:11 names Module Federation for the same configuration.

**48. maker-requests/DOCUMENTATION.md:15.** CSS repeats global selectors from business-reports/src/styles.css:2–26; pipeline uses ordinary style-loader/css-loader. Interference is possible, without isolated scoping.

**49. maker-requests/DOCUMENTATION.md:25.** The route loads MakerRequestsApp. maker-requests/README.md:22 repeats shell loading.

**50. model-portfolio-configuration/DOCUMENTATION.md:9.** Exposes ModelPortfolioApp. Repetitions: model-portfolio-configuration/DOCUMENTATION.md:13 and model-portfolio-configuration/README.md:11.

**51. model-portfolio-configuration/DOCUMENTATION.md:15.** No CSS Modules, Shadow DOM or loader encapsulation; .module-content and .module-header are global selectors also used by business-reports/src/styles.css:6–26. The mechanism contradicts the no-leakage guarantee.

**52. model-portfolio-configuration/DOCUMENTATION.md:26.** Dynamic loading and route portfolio link to the exposure. model-portfolio-configuration/README.md:22 repeats route linkage.

**53. outgoing-api-logs/DOCUMENTATION.md:9.** Remote exposes OutgoingApiLogsApp. outgoing-api-logs/README.md:11 repeats configuration description; consumption is recorded in the claim originating at README.md:145.

**54. outgoing-api-logs/DOCUMENTATION.md:15.** Local stylesheet uses global .module-container and .module-header, identical to business-reports/src/styles.css:2–8. Separate files do not guarantee isolation between remotes.

**55. start-all-modules.bat:2.** Opens separate terminals for host, seven remotes and backend, but “all” is not confirmed: accounts-module, cards-module and loans-module are not started. The separate-process part is correct; scope contradiction prevails.

**56. vro-uploads/DOCUMENTATION.md:9.** Exposes VroUploadsApp. Repetitions: vro-uploads/DOCUMENTATION.md:13 and vro-uploads/README.md:11.

**57. vro-uploads/DOCUMENTATION.md:15.** Global .module-container and .module-header selectors also appear in outgoing-api-logs/src/styles.css:2–12. CSS loading does not provide isolation between units.

**58. vro-uploads/DOCUMENTATION.md:25.** The route mounts VroUploadsApp. vro-uploads/README.md:22 repeats the same relationship.

## Summary

Claims: 58 (corroborated: 37, partial: 0, contradicted: 20, uncorroborated: 1). Themes: (structure: 11, composition: 40, build-deploy: 2, independence: 5).
