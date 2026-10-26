---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
inputs:
  clone: data/samples/mfe-sample-001/repos/JandrySan__becas-uleam
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 321 — JandrySan/becas-uleam

## Repository overview

Reachable history up to snapshot has 10 commits, from 2026-07-08 to 2026-07-10. First observable presence of container, three modules and nested Vue scaffold is root commit `2f53246` (2026-07-08, “estructura (English translation: "structure")”); this does not reveal where they were developed before. Reviews 3.4.2 to 3.4.7 leave no dependency, unit, relationship or deploy with value `Undetermined`. Historical points are message contracts without receiver and three documentary contradictions.

The `acb73a0` (2026-07-09, “Agregar servicio y archivos de base de datos de Supabase (English translation: "Add Supabase service and database files")”) creates Angular Supabase service and changes its store, container and Vue. Angular README, already present at history root, does not change. Root README last changes in `997197b` (2026-07-09, “añadir la configuración del espacio de trabajo de pnpm con las definiciones de paquetes y los límites de compilación (English translation: "add pnpm workspace configuration with package definitions and build boundaries")”). Afterward, `c1a2ab3` (2026-07-10, “Eliminar rewrites que bloqueaban los modulos (English translation: "Remove rewrites blocking modules")”) changes `vercel.json`: message announces removal of rewrites still promised by README. These milestones explain documentation and implementation mismatches without changing snapshot judgments.

Clone supports querying all commits and their changed paths with `--no-renames`, but several historical contents are missing. First-commit React provider could be read; old container, Vue, Angular store and `vercel.json` contents could not. Abandonment or intention is not inferred solely from creation date of incomplete contract.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | React sends `BECAS_POSTULACION_UPDATE` to container without receiver; Angular handles this message and `BECAS_POSTULACION_ENVIADA`, without receiving either | 3.4.4 (2postulacion-react/src/context/PostulacionContext.tsx:69; Notes); 3.4.5 (Overview; #5) | active or abandoned | 2f53246 2026-07-08 estructura (English translation: "structure"); acb73a0 2026-07-09 Agregar servicio y archivos de base de datos de Supabase (English translation: "Add Supabase service and database files") | inconclusive |
| 2 | Container waits for `BECAS_VUE_READY` and sends state to Vue, but module does not implement these contract sides | 3.4.4 (Notes, src/main.ts:205); 3.4.5 (Overview; #4) | active or abandoned | 2f53246 2026-07-08 estructura (English translation: "structure"); acb73a0 2026-07-09 Agregar servicio y archivos de base de datos de Supabase (English translation: "Add Supabase service and database files") | inconclusive |
| 3 | README promises rewrites absent from `vercel.json` | 3.4.6 (Overview); 3.4.7 #9 | conflicting stages | 997197b 2026-07-09 añadir la configuración del espacio de trabajo de pnpm con las definiciones de paquetes y los límites de compilación (English translation: "add pnpm workspace configuration with package definitions and build boundaries"); c1a2ab3 2026-07-10 Eliminar rewrites que bloqueaban los modulos (English translation: "Remove rewrites blocking modules") | clarified |
| 4 | Angular README describes in-memory data and no database, but module uses Supabase | 3.4.7 #1 | conflicting stages | 2f53246 2026-07-08 estructura (English translation: "structure"); acb73a0 2026-07-09 Agregar servicio y archivos de base de datos de Supabase (English translation: "Add Supabase service and database files") | clarified |
| 5 | Login note extends session through `localStorage` to three modules, but React does not read session keys | 3.4.7 #14 | conflicting stages | 2f53246 2026-07-08 estructura (English translation: "structure"); acb73a0 2026-07-09 Agregar servicio y archivos de base de datos de Supabase (English translation: "Add Supabase service and database files") | inconclusive |

## Observations

**1. Messages without receiver.** The `PostulacionContext.tsx` is added in `2f53246` and absent from changed files in following nine commits. Available initial contents already send `BECAS_POSTULACION_UPDATE` to parent window and apply only data/documents from `BECAS_PORTAL_STATE`. Thus React emitter remains identical throughout observed history. The `src/main.ts` and Angular `app.component.ts` are added in first commit and changed in `acb73a0`, but initial contents are missing. Whether container had receiver or earlier functional forwarding, or contract was abandoned or never connected, cannot be known. Snapshot absence of emitter for `BECAS_POSTULACION_ENVIADA` remains as recorded in 3.4.4; available history does not clarify origin.

**2. Incomplete Vue contract.** Container and `HomeView.vue` appear in first commit and change in `acb73a0`, without further changes up to snapshot. Attempts to read both at first commit failed with missing objects. Path list does not reveal whether `BECAS_VUE_READY` was removed from Vue or container branch never had counterpart. Result is inconclusive, without attributing abandonment to module or contract.

**3. Rewrites removed and README retained.** Last README change is `997197b`. Afterward, `c1a2ab3` changes only `vercel.json`, and its message announces “Eliminar rewrites que bloqueaban los modulos (English translation: "Remove rewrites blocking modules")”. Snapshot file has no rewrites (`vercel.json:1-6`), while README still promises them (`README.md:80`). Sequence clarifies documentation outdated relative to announced removal. Attempts to read `vercel.json` at `2f53246` and `79810ab` (2026-07-10, “Actualizar vercel.json para usar pnpm en los comandos de instalación y construcción (English translation: "Update vercel.json to use pnpm in installation and build commands")”) failed: old rules were not inspected and blockage alleged by message was not verified.

**4. Angular README and Supabase.** Angular README is added in `2f53246` and unchanged afterward; claim about memory and no database therefore already belongs to first observable document version. The `acb73a0` creates `3seguimiento-angular/src/app/services/supabase.service.ts` and changes store. Snapshot confirms Supabase usage (3.4.7 #1). History clarifies mismatch limited to these artifacts: description remained from before Supabase service creation in module. Initial and intermediate store versions are unavailable; neither inspection of earlier exclusively in-memory implementation nor completion of entire integration in that commit is asserted.

**5. React session and container note.** Available initial version of `PostulacionContext.tsx`, unchanged up to snapshot, already reads only student data and documents from `localStorage`; it does not read session keys. This rules out later removal of these reads in this file. However, `index.html` and `src/main.ts` change in `acb73a0`, and earlier contents are missing. Whether three-module note came from earlier integration or originated broader than code cannot be established. Provider chronology is insufficient to explain contradiction origin; point remains inconclusive.

## Commands

All revisions below are snapshot or ancestors in log limited to it. Marked `show` queries failed with `fatal: bad object`, without fetching objects. First `log` query failed with missing object during rename detection; repetition with `--no-renames` returned all 10 commits.

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt

docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam log --reverse --format='%h %ad %s' --date=short --name-status 613ce6ac8c615f494d214e3d1e01fa3d08e02267
# Failed: object 46a0d7fadaffabe37668efcad4a478a557ceb317 missing; lazy fetching disabled.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam log --reverse --format='%h %ad %s' --date=short --name-status --no-renames 613ce6ac8c615f494d214e3d1e01fa3d08e02267
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam rev-list --count 613ce6ac8c615f494d214e3d1e01fa3d08e02267
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:3seguimiento-angular/src/app/services/seguimiento-store.service.ts
# Falhou: missing object.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show acb73a0:3seguimiento-angular/src/app/services/seguimiento-store.service.ts
# Falhou: missing object.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:vercel.json
# Falhou: missing object.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 79810ab:vercel.json
# Falhou: missing object.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:index.html
# Falhou: missing object.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:src/main.ts
# Falhou: missing object.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:3seguimiento-angular/src/app/app.component.ts
# Falhou: missing object.
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:2postulacion-react/src/context/PostulacionContext.tsx
docs/mfe-history-review/tools/hist.sh JandrySan__becas-uleam show 2f53246:1verificador-vue/src/views/HomeView.vue
# Falhou: missing object.

LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

Comparisons before and after queries matched reference (empty output, code 0).

## Summary

Commits up to the snapshot: 10 (2026-07-08 to 2026-07-10). Points: 5 (clarified: 2, inconclusive: 3, resolved by the snapshot: 0).
