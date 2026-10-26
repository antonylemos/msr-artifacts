---
schema: 1
id: 927288121
full_name: rk4rohankumar/qoutes-child-app
url: https://github.com/rk4rohankumar/qoutes-child-app
commit: 18edcd7d2f1cf9ce988870c19cefabef4bd1f49a
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 382 — rk4rohankumar/qoutes-child-app

## Contexto

Remote React (CRA + CRACO) com webpack Module Federation que expõe um app de citações, consumido por um shell em outro repositório, `rk4rohankumar/micro-frontend-host` (`README.md:1–6`), que não está neste snapshot. Roda também de forma isolada e tem deploy próprio na Vercel (`README.md:27`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:383` registra rank 382, ID 927288121, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

O candidato é **substituto** na clonagem: `clones.csv:383` tem `replaces = 1018045713`, que corresponde ao rank 364 (`chinhtq/microfrontend-angular`, `data/samples/mfe-sample-001/sample.csv:365`), cuja clonagem falhou (`clones.csv:365`, status `failed`). Por isso o ID não está em `sample.csv` (380 linhas de dados, `manifest.json:23`, `size: 380`) e vem da posição seguinte do ranking determinístico: `data/samples/mfe-sample-001/ranking.csv:383` (rank 382, estratégias `terminology;technology`, elegibilidade `pass`). A amostra vem da rodada 002 (`manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:11652` e `data/discovery/mfe-round-002/candidates.csv:11657`, ambos com `terminology;technology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, subconsulta `…#created:2025-02` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:20:16.030Z / 2026-10-08T15:53:42.347Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:51:32.207Z / 2026-10-08T16:05:16.826Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:16:49.435Z / 2026-10-08T16:13:52.773Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-02-01..2025-02-28`. Metadados do hit: descrição nula, sem tópicos, linguagem JavaScript, sem licença, `fork: false`, tamanho 197, criação em 2025-02-04T18:01:05Z, push em 2026-10-02T04:35:25Z, homepage na Vercel.

Correspondência no README: “Micro Frontend” em `README.md:1` (“# Quotes · Micro Frontend remote”) e “Module Federation” em `README.md:5`; o plural “micro frontends” não aparece literalmente (só “micro-frontend-host”, `README.md:6`), e esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA `18edcd7` (2026-10-02), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 19 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único app (um `package.json`, `public/index.html`, `src/`). | contrária |
| Configuração (remote) | `craco.config.js:15–27`: `ModuleFederationPlugin` com `name: 'QuotesApp'`, `filename: 'remoteEntry.js'`, `exposes: { './QuotesApp': './src/App' }` e React, ReactDOM, framer-motion e axios compartilhados como singleton; sem `remotes`. `:10–12`: `publicPath: 'auto'` em produção. `package.json:21–26`: scripts `craco start/build`. | moderada |
| Código-fonte | `src/index.js:1–3`: fronteira assíncrona `import('./bootstrap')`; `src/bootstrap.js:6–14`: montagem isolada em `#root`; `src/App.js` (componente exposto) importa só componentes e hooks locais. | moderada |
| Composição (host externo) | Nenhum host no repositório. `README.md:6`, `37–38`: o shell `micro-frontend-host` injeta `remoteEntry.js`, inicializa o container e obtém `./QuotesApp`. A conta tem o shell e outros oito `*-child-app` nas rodadas (`data/discovery/mfe-round-002/candidates.csv:11648`, `11650–11658`, com o shell em `:11658`), fora da amostra e não inspecionados. | ausente |
| Build/deploy | `README.md:27`, `34`: deploy próprio em `qoutes-child-app.vercel.app`, com `remoteEntry.js` publicado. | moderada |
| Código-fonte (fronteiras) | Busca por `../` em `src/`: nenhuma ocorrência. Há uma única unidade. | contexto |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 5 commits (5 em todos os refs), nenhum merge, do mesmo titular com duas identidades (`rohan` e `Rohan Kumar`, mesmo e-mail), de 2025-02-04 (`2f5409d`, “initial setup of qoute repo for micro frontend”) a 2026-10-02 (SHA `18edcd7`, “feat: shell-ready remote — singleton shared, async bootstrap, a11y names (#1)”, pela interface web). A configuração de federação existe desde o commit inicial. `git rev-list --objects $SHA --missing=print` identifica 20 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade; a configuração de composição só tem `exposes` (`craco.config.js:18–20`). |
| Q2 | Yes | Para a unidade: entrada, build e deploy próprios (`craco.config.js`; `package.json:21–26`; Vercel). |
| Q3 | Undetermined | O shell não está no repositório (`README.md:6`). |
| Q4 | Undetermined | Lado remote configurado (`exposes`, `remoteEntry.js`, `publicPath: 'auto'`, singletons); o consumidor não é observável. |
| Q5 | No | Unidade preparada para composição por host externo, não instância de MFE no repositório. |

## Motivo

- `MFE-unit` pela regra “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, como nos finais 001 e 050.
- Corresponde a “repositories containing only a remote unit, without the composing host”. O remote expõe o app inteiro, não utilitários (contraste com 089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]` (CRA/CRACO), `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (substituição):** candidato entrou como substituto do rank 364, cuja clonagem falhou; vem de `ranking.csv:383`, não de `sample.csv`.
- **Protocolo (ecossistema multi-repositório):** shell (`micro-frontend-host`) e nove remotes da mesma conta estão nas rodadas; a análise de família poderia observar a composição completa.
- **RQ2:** remote webpack MF com `publicPath: 'auto'` só em produção e fronteira assíncrona para negociar singletons.
