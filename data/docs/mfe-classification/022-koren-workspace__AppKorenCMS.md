---
schema: 1
id: 1155398481
full_name: koren-workspace/AppKorenCMS
url: https://github.com/koren-workspace/AppKorenCMS
commit: 51c2d420cc24ea85cf231bf3466a817e68a61db8
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 022 — koren-workspace/AppKorenCMS

## Contexto

- **Tipo de repositório:** production-oriented application (CMS interno de um app de orações/Tanakh, ambientes STAGE/PROD, deploy na Vercel)
- **Commit avaliado:** `51c2d42` (branch padrão `master`)

O projeto nasceu do template "FireCMS Cloud starter" (`README.md:1`). No FireCMS Cloud, a app do cliente é compilada como remote de Module Federation (`exposes: { "./config" }`) e carregada pela plataforma hospedada. O commit `d994cc7` (2026-03-17, "chnage to core from cloud firecms") migrou para FireCMS self-hosted e removeu `@firecms/cloud`, `FireCMSCloudApp` e o script `firecms deploy`. A config de federação continuou no `vite.config.ts`.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:42`: `@originjs/vite-plugin-federation`; `:32-34`: `@firecms/core`, `@firecms/firebase`, `@firecms/ui` (sem `@firecms/cloud`) | fraca |
| Configuração | `vite.config.ts:494-514`: `federation({ name: "remote_app", filename: "remoteEntry.js", exposes: { "./config": "./src/index" }, shared: [react, @firecms/*, @firebase/*] })`; sem `remotes` (resíduo, ver histórico) | ambígua |
| Código-fonte (entry) | `src/main.tsx:7-13`: `ReactDOM.createRoot(...)` renderiza `App` localmente; `src/App.tsx:2-3,38` importa `appConfig` de `./index` diretamente e renderiza `FireCMSFirebaseApp`, ou seja, a app se monta sozinha | contrária |
| Código-fonte | `src/index.tsx:11-58`: `appConfig` com as views internas (`TocTranslationsView`, `AppCopyView`, `CouponsView`, `CatalogView`, `TanakhView` etc.), todas importadas estaticamente | contrária |
| Composição | Nenhum host no repositório e nenhum consumidor do `remoteEntry.js`: o único consumidor previsto (FireCMS Cloud) foi abandonado | ausente |
| Build/deploy | `vercel.json:1-5`: SPA com rewrite para `index.html` (exceto `/api/`); `api/bagel/*.ts` como funções serverless; `package.json` sem script de deploy para o FireCMS Cloud | contrária |
| Histórico | `d994cc7`: remove `"deploy": "run-s build && firecms deploy --project=koren-stage-b"`, `@firecms/cloud` e `FireCMSCloudApp`, e adiciona `FireCMSFirebaseApp` e `src/firebase_config.ts`; depois `7f1c613` "addung vercel.json" (explica o resíduo) | forte |
| Documentação | `README.md:1-30`: texto original do template FireCMS Cloud (desatualizado: cita `yarn deploy`, que não existe mais); `MIGRATION_FIREBASE_PROJECT.md:9-10` ainda cita `firecms deploy` (contradita pelo código) | fraca |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; a config de federação só tem `exposes`, sem referência a outras unidades |
| Q2 | No | Não há unidades a comparar; as views são importadas estaticamente (`src/index.tsx:2-9`) |
| Q3 | No | Nenhum host carrega a app: ela se monta sozinha (`src/main.tsx:7`) e é servida como SPA (`vercel.json`) |
| Q4 | No | O `exposes` está configurado mas sem consumidor; o mecanismo de carga pelo FireCMS Cloud foi removido em `d994cc7` |
| Q5 | No | Q1–Q4 convergem |

## Motivo

- A app hoje é uma SPA monolítica self-hosted. A federação é resíduo do template FireCMS Cloud, cujo host (a plataforma) deixou de ser usado.
- A exceção MFE-unit não se aplica. A unidade até tem `exposes`, mas o histórico mostra que o host externo previsto foi abandonado, e a app é implantada standalone. Não há mais "an external host" para o qual ela esteja preparada.
- Corresponde a "MFE-related dependencies that are unused or experimental" e, antes da migração, a algo análogo ao repositório 010: MF como mecanismo de plugin de uma plataforma, não composição autoral.

## Notas para análise

- **RQ1 (sinais enganosos):** config de MF ativa no build (gera `remoteEntry.js`), mas sem consumidor. Só o histórico revela que é resíduo.

## Ponto para revisão conjunta

- Pela letra do checklist, o `exposes` (`vite.config.ts:496-498`) poderia sugerir MFE-unit. A decisão por Non-MFE se apoia no histórico (seção 3.4.8: "whether a configuration is active or abandoned").
- Mesmo antes da migração, o caso seria o do repositório 010 (plugin de plataforma low-code/CMS). Se a regra sugerida no 010 for adotada, os dois ficam consistentes.
