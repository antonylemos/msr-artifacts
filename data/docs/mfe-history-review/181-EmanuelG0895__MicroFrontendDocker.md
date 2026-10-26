---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
inputs:
  clone: data/samples/mfe-sample-001/repos/EmanuelG0895__MicroFrontendDocker
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 181 — EmanuelG0895/MicroFrontendDocker

## Repository overview

History up to snapshot has 18 commits, without merges, from 2025-06-27 to 2025-08-19. Seventeen are from 2025-06-27: `4f9653f` ("Initial commit") adds only `.gitattributes`, and `c228808` ("incio de proyecto" (English translation: "project start")) introduces three directories, `MF-Shell/`, `MF-Characters/` and `MF-CharacterDetail/`, each with `package.json`, `rspack.config.ts`, `module-federation.config.ts` and `src/`. Next come screen commits (`63e9550` "micrfrontend con buscador y tajeta ordenada" (English translation: "microfrontend with search and ordered card"), `7c93dbc` "creacion de componente falta conectar" (English translation: "component creation, connection pending"), `411b8a1` "ruta creada y funcionando" (English translation: "route created and working")), Docker commits (`0608a73` "doker" (English translation: "Docker"), adding root Dockerfile, remote Dockerfiles, docker-compose.yml, nginx.conf, start.sh and README-Docker.md, through `05a3ca8` "doker" (English translation: "Docker")), `6d5fdab` ("puertos" (English translation: "ports")) and `feccf9f` ("README"), adding README.md. Only subsequent commit is snapshot itself, `137ba29` (2025-08-19, "Update ports, module federation, and type definitions"), changing `MF-Shell/module-federation.config.ts`, both `webpack.config.js` files, `MF-CharacterDetail/src/services/api.ts`, `MF-Shell/@mf-types/MF_CharacterDetail/apis.d.ts` and removing `MF-Shell/@mf-types/MF_Characters/apis.d.ts`. README.md and README-Docker.md do not change after creation.

Clone is partial and has only snapshot version contents. Queried old file versions (host `module-federation.config.ts` before `137ba29`, initial `package.json`, `webpack.config.js`, `docker-compose.yml` and `CharacterInfo.tsx`) are unavailable: history shows files created, changed or removed by each commit and, through `ls-tree`, when a file still has snapshot object, but not what earlier versions said. The `log --name-status` with rename detection stops at `7c93dbc` requesting a missing object; complete list was obtained with `--no-renames`.

Raised points: from 3.4.2 and 3.4.3 (Notes), unused `webpack.config.js` files; from 3.4.5 (Overview), mismatch between remote names and contents, revisited in claims 5 and 6 of 3.4.7, and host `shared-hooks` without package or usage; from 3.4.6 (Overview), port mismatch between composition and Docker profile, revisited in claim 10 of 3.4.7; and from 3.4.7, claims 2 (`partial`) and 11 (`contradicted`). 3.4.2 has no unused dependency, 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive, commented-out or `Undetermined` construct (three `MF-Shell/@mf-types/` rows are type declarations, `none`), 3.4.5 has no `Undetermined` relationship and 3.4.6 has no `Undetermined` deploy. Note in 3.4.4 about `MF-Shell/@mf-types/index.d.ts:2`, importing missing `./MF_Characters/apis.d.ts`, did not become a point: it is generated type detail without composition uncertainty; history shows this file was added in `411b8a1` and removed in `137ba29`. Snapshot resolves none of these points.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `MF-Characters/webpack.config.js` and `MF-CharacterDetail/webpack.config.js` are used by no script, which call only `rspack` | 3.4.2 (Notes); 3.4.3 (Notes); 3.4.6 (Overview) | active or abandoned | c228808 2025-06-27 incio de proyecto (English translation: "project start"); 7c93dbc 2025-06-27 creacion de componente falta conectar (English translation: "component creation, connection pending"); 411b8a1 2025-06-27 ruta creada y funcionando (English translation: "route created and working"); 8850753 2025-06-27 parche de error de configuracion (English translation: "configuration error patch"); 137ba29 2025-08-19 Update ports, module federation, and type definitions | inconclusive |
| 2 | Remote names do not match contents: `MF-CharacterDetail` exposes list and `MF-Characters` detail, and documentation says opposite | 3.4.5 (Overview); 3.4.7 #5, #6 | conflicting stages | c228808 2025-06-27 incio de proyecto (English translation: "project start"); 63e9550 2025-06-27 micrfrontend con buscador y tajeta ordenada (English translation: "microfrontend with search and ordered card"); 7c93dbc 2025-06-27 creacion de componente falta conectar (English translation: "component creation, connection pending"); 0608a73 2025-06-27 doker (English translation: "Docker"); feccf9f 2025-06-27 README | clarified |
| 3 | Host shares `shared-hooks` as singleton, without corresponding package or usage | 3.4.5 (Overview); 3.4.7 (Overview) | active or abandoned | 137ba29 2025-08-19 Update ports, module federation, and type definitions | inconclusive |
| 4 | Host remote URLs use development ports (3003/3002), and documentation and Docker profile use 3001/3002 | 3.4.6 (Overview); 3.4.7 #10 | conflicting stages | 411b8a1 2025-06-27 ruta creada y funcionando (English translation: "route created and working"); 8850753 2025-06-27 parche de error de configuracion (English translation: "configuration error patch"); 6d5fdab 2025-06-27 puertos (English translation: "ports"); feccf9f 2025-06-27 README; 137ba29 2025-08-19 Update ports, module federation, and type definitions | inconclusive |
| 5 | "cuando accedas a cualquier URL, se levantan automáticamente TODOS los servicios" (English translation: "when you access any URL, ALL services start automatically") has no artifact starting containers per request | 3.4.7 #2 | conflicting stages | 0608a73 2025-06-27 doker (English translation: "Docker"); 4473fa3 2025-06-27 parche doker (English translation: "Docker patch") | inconclusive |
| 6 | README tree places a Dockerfile in `MF-Shell/`, which does not exist; shell image comes from root Dockerfile | 3.4.7 #11 | conflicting stages | 0608a73 2025-06-27 doker (English translation: "Docker"); feccf9f 2025-06-27 README | clarified |

## Observations

**1. Unused `webpack.config.js` files.** The `MF-Characters/webpack.config.js` is already in `c228808`, commit creating three directories. The `7c93dbc` adds `MF-CharacterDetail/webpack.config.js` and a `MF-Shell/webpack.config.js`, and `411b8a1` removes shell file. Both remaining files change in snapshot `137ba29`, whose message announces port and Module Federation updates. Remote `package.json` files, containing scripts, change only in `c228808` and `8850753` ("parche de error de configuracion" (English translation: "configuration error patch")), and earlier versions of all these files are absent from clone. History does not show whether a script ever called webpack, or why files continue to be edited; changes in `137ba29` do not prove usage. Point remains unanswered.

**2. Swapped remote names.** History of `MF-CharacterDetail/src/components` and `MF-Characters/src/components` shows `view.tsx`, list component mounted by host at `/`, added in `MF-CharacterDetail` by `63e9550` (message announces "micrfrontend con buscador y tajeta ordenada" (English translation: "microfrontend with search and ordered card")), and `vista.tsx` and `detalles-personaje.tsx`, detail screen, added in `MF-Characters` by `7c93dbc`. No file in these directories is removed or moves between them up to snapshot. README-Docker.md (`0608a73`) and README.md (`feccf9f`) are written afterward and never change again. Limited to these paths, history clarifies documentation split does not correspond to an earlier file stage: list has been in `MF-CharacterDetail` and detail in `MF-Characters` since creation. The `CharacterInfo.tsx`, present in `MF-CharacterDetail` since `c228808`, has a detail name, but its initial contents are unavailable, and history does not say whether directory was intended for detail before receiving list. Values in 3.4.7 remain unchanged.

**3. `shared-hooks`.** The `MF-Shell/module-federation.config.ts` changes in seven of eighteen commits, last being snapshot (`137ba29`), and no earlier version is available. No commit up to snapshot creates a path containing `shared-hooks`. History does not show when entry appeared in configuration or whether a package was planned; it does not distinguish planned, never connected configuration from abandoned configuration. Point remains unanswered.

**4. Ports.** The `MF-CharacterDetail/rspack.config.ts` has snapshot object since `411b8a1` and `MF-Characters/rspack.config.ts` since `6d5fdab` ("puertos" (English translation: "ports")); remote `package.json` files, with `start:prod` ports, since `8850753`. All predate `feccf9f`, adding README.md. Thus when README was written, remote development ports (3003 and 3002) and Docker profile ports (3001 and 3002) already matched snapshot, and port table does not describe an earlier remote stage. Only point file changed after README is host configuration, changed in `feccf9f` and again in `137ba29`, whose message announces "Update ports, module federation". Because version at `feccf9f` is absent from clone, history does not show whether README block with `MF_CharacterDetail@http://localhost:3002` and `MF_Characters@http://localhost:3001` (README.md:113-118) reproduced host configuration that day. Question whether documentation and composition belong to different stages remains unanswered.

**5. Services starting "when accessing any URL".** README-Docker.md is added in `0608a73` and never changes again. The `docker-compose.yml` originates in same commit and changes once, in `4473fa3` ("parche doker" (English translation: "Docker patch")); version at `0608a73` is absent from clone. History does not show whether compose or another artifact ever had a request-triggered startup mechanism, or whether sentence is an intention or loose description of `up` with `depends_on`. Point remains unanswered, and `partial` corroboration in 3.4.7 remains unchanged.

**6. Dockerfile in `MF-Shell/`.** Query for `MF-Shell/Dockerfile` with `--full-history` returns empty: file never existed up to snapshot. Root Dockerfile is added in `0608a73`, together with those in `MF-Characters/` and `MF-CharacterDetail/`, and README.md with directory tree only afterward in `feccf9f`. History clarifies tree does not describe an earlier repository stage: shell image always came from root Dockerfile.

## Commands

```
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker rev-list --count 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker rev-list --count --merges 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --reverse --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --reverse --format='%h %ad %s' --date=short --name-status 137ba29996f64553efd3401f8ad619646d8a78e5   # failed at 7c93dbc: object 140fae5… missing (lazy fetching disabled)
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --reverse --no-renames --format='%h %ad %s' --date=short --name-status 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree 6d5fdab MF-Shell/module-federation.config.ts ...   # rejected by script (path as argument); same for feccf9f and 137ba29
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r c228808
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 7c93dbc
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 411b8a1
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 0608a73
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 4473fa3
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 8850753
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 6d5fdab
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r feccf9f
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t feccf9f:MF-Shell/module-federation.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 6d5fdab:MF-Shell/module-federation.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 8850753:MF-Shell/module-federation.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t c228808:MF-Characters/package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 0608a73:MF-Characters/package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t c228808:MF-Characters/webpack.config.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 7c93dbc:MF-CharacterDetail/webpack.config.js   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 0608a73:docker-compose.yml   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t c228808:MF-CharacterDetail/src/components/CharacterInfo.tsx   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 6d5fdab:MF-Characters/rspack.config.ts   # blob (same object as snapshot)
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 8850753:MF-Characters/rspack.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Shell/Dockerfile   # empty output
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- README.md
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- README-Docker.md
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Shell/module-federation.config.ts
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Characters/rspack.config.ts
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-CharacterDetail/rspack.config.ts
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Characters/package.json
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-CharacterDetail/package.json
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short --name-status 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Characters/webpack.config.js MF-CharacterDetail/webpack.config.js MF-Shell/webpack.config.js
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short --name-status 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-CharacterDetail/src/components MF-Characters/src/components
```

## Summary

Commits up to the snapshot: 18 (2025-06-27 to 2025-08-19). Points: 6 (clarified: 2, inconclusive: 4, resolved by the snapshot: 0).
