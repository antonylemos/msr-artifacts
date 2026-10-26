---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
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

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Repository overview

README, in English, has 566 lines and is a recipe: it instructs creating the project structure and provides, in code blocks, each file's content for all three applications (README.md:13-45, 47-531). Initially, only root is presented as existing, and all three folders appear as "← Create this" (README.md:37-45). The snapshot contains all three folders, but lacks the `public/index.html` files README instructs creating (e.g.: README.md:123). This is why applications remained `Undetermined` in the structural review. Thus the repository partially materializes the recipe.

Prose concentrates in three passages:
- initial promises (README.md:3-11);
- explanation of "Bootstrap Pattern" and React sharing (README.md:542-554);
- promotional ending (README.md:556-565).

Code blocks did not become rows, as file copies rather than claims. This includes interface texts such as "the shell application that orchestrates multiple microfrontends" (README.md:184) and "displays our product catalog independently" (README.md:503).

Artifacts cited by previous reviews were read:
- root and all three applications' `package.json` files;
- `webpack.config.js` files;
- `index.js` and `bootstrap.js` files;
- `shell/src/App.js`, `header-mf/src/Header.js` and `products-mf/src/Products.js`.

None has an architecture comment.

The composition description matches previous reviews: Module Federation, shared React and "Bootstrap Pattern". Three promises differ:
- **Complete project:** README calls the project "complete", but snapshot lacks files required by build.
- **Independent execution:** depends on files absent from the snapshot.
- **"production-ready":** no deployment artifact exists, and remotes are fixed at `localhost`.

`doc-*` occurrences that did not become rows:
- **Title and recipe steps:** README.md:1, 18, 38.
- **Code blocks:** README.md:130, 158, 161, 166, 169, 183, 184, 284, 335, 436, 503.
- **Section titles:** README.md:197, 349.

Others are in claims 1, 2, 3, 6, 7 and 8, as claims or repetitions.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:3 | "A complete microfrontends project" (the project is complete) | structure | contradicted | 3.4.3 (three `Undetermined` applications); shell/webpack.config.js:40; header-mf/webpack.config.js:46; products-mf/webpack.config.js:46 |
| 2 | README.md:3 | "microfrontends project with React and Module Federation" | structure | corroborated | 3.4.2 (module-federation configured); 3.4.5 #1-#2 |
| 3 | README.md:3 | "supports both independent and integrated development" (each application also runs independently) | independence | partial | 3.4.3 (three `Undetermined` applications); header-mf/src/bootstrap.js:5-6; header-mf/webpack.config.js:46 |
| 4 | README.md:9 | "**Shared Dependencies** - optimized React sharing" | composition | corroborated | header-mf/webpack.config.js:28-41; shell/webpack.config.js:28-37 |
| 5 | README.md:10 | "**Bootstrap Pattern**" (each application enters through `import('./bootstrap')`) | composition | corroborated | shell/src/index.js:1; header-mf/src/index.js:1; products-mf/src/index.js:1 |
| 6 | README.md:10 | "prevents eager consumption errors" (the pattern prevents eager consumption errors) | composition | uncorroborated | — |
| 7 | README.md:11 | "**Real-World Architecture** - used by Netflix, Spotify, etc." | other | uncorroborated | — |
| 8 | README.md:558 | "You now have a production-ready microfrontend architecture" | build-deploy | contradicted | 3.4.6 (Deploy `not observed`); shell/webpack.config.js:24-27, 39-41 |

## Observations

**1. README.md:3.** README presents the repository as a complete project, but all three configurations require a `public/index.html` absent from the snapshot (shell/webpack.config.js:40; header-mf/webpack.config.js:46; products-mf/webpack.config.js:46). README itself instructs creating those files (README.md:20, 123), and the structural review left all three applications `Undetermined` for this reason. Repetition: "3 Working Applications" (README.md:7).

**2. README.md:3.** All three applications use webpack's `ModuleFederationPlugin`: shell consumes `headerMf` and `productsMf`, exposing `./Header` and `./Products`. Repetitions: README.md:561 and README.md:7, the "together" portion.

**3. README.md:3.** Each remote has a `bootstrap.js` mounting the component in its own `#root` (e.g.: header-mf/src/bootstrap.js:5-6), and README gives ports for opening each independently (README.md:29-30). The `index.html` supplying that `#root`, required by build (header-mf/webpack.config.js:46), is absent from the snapshot. Independent execution code exists, but the remainder depends on missing files. Repetitions: README.md:7 ("can run standalone"), 8, 551-554 and 562.

**4. README.md:9.** React and React DOM are declared shared singletons in configurations. Repetitions: README.md:552-553, explaining each application uses its own React independently and shell's when integrated, and README.md:563.

**5. README.md:10.** All three applications enter through an `index.js` only dynamically importing `bootstrap.js`. Repetitions: README.md:544-547 and README.md:564.

**6. README.md:10.** The claimed effect, preventing "eager consumption" errors, is runtime Module Federation behavior without a confirming or refuting snapshot artifact. Repetition: README.md:549.

**7. README.md:11.** Other companies' use of the architecture is unverifiable in the snapshot. Repetition: README.md:565.

**8. README.md:558.** Build scripts pass `--mode production` (e.g.: shell/package.json:6), but nothing beyond this supports a production-ready architecture: configurations require missing templates (shell/webpack.config.js:39-41), shell fetches remotes at `localhost` (shell/webpack.config.js:24-27), and there is no deployment artifact.

## Summary

Claims: 8 (corroborated: 3, partial: 1, contradicted: 2, uncorroborated: 2). Themes: (structure: 2, composition: 3, build-deploy: 1, independence: 1, other: 1).
