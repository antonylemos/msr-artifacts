---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
inputs:
  clone: data/samples/mfe-sample-001/repos/jonatasmirand__ReiBurguer-MicroFrontends
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Repository overview

History up to snapshot has 5 commits, from 2025-12-14 to 2026-01-04. The `8e7f1d9` (2025-12-14, "Subindo projeto" (English translation: "Uploading project")) creates README, `container`, `pedido` and root `package-lock.json`, and records `cardapio` as gitlink (`160000`, pointing to `907edba`). The `670f5e2` (2025-12-14, "Alteração do readme.md" (English translation: "Changing readme.md")) changes README. The `682204a` (2025-12-16, "Adiciona micro frontend Cardapio" (English translation: "Adds Cardapio micro frontend")) only moves gitlink to `54865bb`. The `b7c02c3` (2025-12-16, "Converte cardapio de sub-repo para pasta normal" (English translation: "Converts cardapio from sub-repo to regular directory")) removes gitlink and adds regular files in `cardapio/`. Snapshot `268d79a` (2026-01-04, "Atualização do arquivo README com detalhes e avisos do projeto." (English translation: "Updates README file with project details and notices.")) changes only README.

For `cardapio`, `b7c02c3` is first observable file presence, rather than introduction: previously they were in a sub-repository, and commits pointed to by gitlink (`907edba`, `54865bb`) are absent from clone. History of `cardapio` before `b7c02c3` cannot be seen. Clone also lacks old README versions (`8e7f1d9` and `b7c02c3`). File lists per commit and object identifiers are available and suffice for points below. The fact that `cardapio` was a separate repository is consistent with "Em cada repositório" (English translation: "In each repository") in README (README.md:20, :24), read by documentation review as loose usage of word.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `cardapio` has `next.config.js` and `next.config.mjs`, and `.mjs` exposes `./src/_components/Cardapio.jsx`, missing from snapshot | 3.4.2 (Notes; cardapio/next.config.mjs:13); 3.4.3 (Notes); 3.4.5 (Overview) | conflicting stages | 8e7f1d9 2025-12-14 Subindo projeto (English translation: "Uploading project"); 682204a 2025-12-16 Adiciona micro frontend Cardapio (English translation: "Adds Cardapio micro frontend"); b7c02c3 2025-12-16 Converte cardapio de sub-repo para pasta normal (English translation: "Converts cardapio from sub-repo to regular directory") | inconclusive |
| 2 | Menu function `adicionarPedido` dispatches an event, is never called and has no listener | 3.4.4 (cardapio/src/components/Cardapio.jsx:6, :7) | active or abandoned | b7c02c3 2025-12-16 Converte cardapio de sub-repo para pasta normal (English translation: "Converts cardapio from sub-repo to regular directory") | inconclusive |
| 3 | README says each microfrontend can be "deployado separadamente" (English translation: "deployed separately"), and snapshot has no deploy artifact | 3.4.7 #10 | active or abandoned | 8e7f1d9 2025-12-14 Subindo projeto (English translation: "Uploading project"); 670f5e2 2025-12-14 Alteração do readme.md (English translation: "Changing readme.md"); 682204a 2025-12-16 Adiciona micro frontend Cardapio (English translation: "Adds Cardapio micro frontend"); b7c02c3 2025-12-16 Converte cardapio de sub-repo para pasta normal (English translation: "Converts cardapio from sub-repo to regular directory"); 268d79a 2026-01-04 Atualização do arquivo README com detalhes e avisos do projeto. (English translation: "Updates README file with project details and notices.") | clarified |

## Observations

**1. `cardapio` has `next.config.js` and `next.config.mjs`, and `.mjs` exposes `./src/_components/Cardapio.jsx`, missing from snapshot.** Both files arrive together in `b7c02c3`, with same objects as snapshot (`d43c89b` and `5b96066`), and no later commit touches them. No commit up to snapshot creates `cardapio/src/_components`, and `Cardapio.jsx` exists only in `src/components`. Thus repository has no stage where `.mjs` was valid file and another where `.js` replaced it: both arrive together, already conflicting. Creation order would be in sub-repository history (`907edba`, `54865bb`), absent from clone. In snapshot, menu `.mjs` matches `pedido/next.config.mjs` except `name` and exposed key, and both use `src/_components`. This is consistent with copying, but history does not show file source or whether it predates `.js`. History does not answer whether both files belong to different stages.

**2. Menu function `adicionarPedido` dispatches an event, is never called and has no listener.** The `cardapio/src/components/Cardapio.jsx` arrives in `b7c02c3` with same object as snapshot (`bb70618`) and does not change afterward. In no version seen in repository was function called, and no call was removed. If it was used before, that occurred in sub-repository, whose history is absent from clone. History does not answer whether function was abandoned or never connected.

**3. README says each microfrontend can be "deployado separadamente" (English translation: "deployed separately"), and snapshot has no deploy artifact.** File lists of five commits show everything repository ever had up to snapshot. No commit creates or removes Dockerfile, compose, `vercel.json`, `netlify.toml`, CI workflow or other hosting configuration, at root or in three applications. Files brought by `b7c02c3` from menu sub-repository also include none of these artifacts. Thus missing deploy artifact is not a remnant of an abandoned stage: repository never had one. History does not show when sentence at README.md:89 was written, because old README versions are absent from clone. It also does not show whether deploy occurred outside repository, as suggested by Vercel homepage in metadata.

## Commands

```
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends rev-list --count 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends log --format='%h %ad %s' --date=short --name-status 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends ls-tree 8e7f1d9 -- cardapio
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends ls-tree 682204a -- cardapio
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends ls-tree -r b7c02c3 -- cardapio/next.config.js cardapio/next.config.mjs cardapio/src/components/Cardapio.jsx
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends ls-tree -r 268d79ae1ff2579a9c9877adba0e1b87cfac1dff -- cardapio/next.config.js cardapio/next.config.mjs cardapio/src/components/Cardapio.jsx pedido/next.config.mjs
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends log --format='%h %ad %s' --date=short 268d79ae1ff2579a9c9877adba0e1b87cfac1dff -- cardapio/next.config.js cardapio/next.config.mjs cardapio/src/components/Cardapio.jsx
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends log --format='%h %ad %s' --date=short 268d79ae1ff2579a9c9877adba0e1b87cfac1dff -- cardapio/src/_components   # no output: no commit
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends cat-file -t 907edba27958d34caf13b1aeb3735cc2cfac8823   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends cat-file -t 54865bba56d30542be618bc371c7ba3527d3d50a   # failed: missing object (could not get object info)
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends show 8e7f1d9:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends show b7c02c3:README.md   # failed: missing object (bad object)
docs/mfe-history-review/tools/hist.sh jonatasmirand__ReiBurguer-MicroFrontends log --format='%h %ad %s' --date=short 268d79ae1ff2579a9c9877adba0e1b87cfac1dff -- README.md
```

## Summary

Commits up to the snapshot: 5 (2025-12-14 to 2026-01-04). Points: 3 (clarified: 1, inconclusive: 2, resolved by the snapshot: 0).
