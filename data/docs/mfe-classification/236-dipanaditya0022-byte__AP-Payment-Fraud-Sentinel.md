---
schema: 1
id: 1346779318
full_name: dipanaditya0022-byte/AP-Payment-Fraud-Sentinel
url: https://github.com/dipanaditya0022-byte/AP-Payment-Fraud-Sentinel
commit: fddf46aedffeee183826d1d07a5f7e0c28561900
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 236 — dipanaditya0022-byte/AP-Payment-Fraud-Sentinel

## Contexto

“AP Payment Fraud Sentinel”: projeto de hackathon RocketRide (`README.md:6`, `89–99`). Tem um motor Python de risco e investigação de fraudes em pagamentos (`app/`), um pipeline RocketRide (`pipelines/fraud_sentinel.pipe`) e uma UI React em `apps/ap-payment-fraud-sentinel-ui/`.

A UI é uma “RocketRide app” (`apps/ap-payment-fraud-sentinel-ui/package.json:5–20`). É construída como remoto Module Federation que expõe `./AppDescriptor` para o shell da plataforma RocketRide (`rsbuild.config.mts:12–48`; `src/AppDescriptor.ts:6–27`). Os arquivos de configuração e de entrada trazem o cabeçalho “Copyright (c) 2026 Aparavi Software AG” (`rsbuild.config.mts:1–4`), o que indica o scaffold do App Builder da plataforma (`apps/ap-payment-fraud-sentinel-ui/README.md:9–13`). O shell não está no repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:237` registra rank 236, ID 1346779318, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:237` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:36092` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:36099` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta / consulta efetiva | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:1000..1149` / `"@module-federation" filename:package.json size:1000..1149` | `apps/ap-payment-fraud-sentinel-ui/package.json` | 2026-10-07T18:41:50.721Z / 2026-10-08T15:39:47.769Z |

O arquivo tem 1.118 bytes no SHA, dentro da faixa, e declara `"@module-federation/rsbuild-plugin": "2.5.1"` (`:31`). Os metadados do hit de código vêm vazios. A entrada é só por código; o README não menciona micro-frontends nem Module Federation.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 44 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São o backend Python em `app/` (com testes), `pipelines/fraud_sentinel.pipe`, `data/input/` e uma única aplicação de UI em `apps/ap-payment-fraud-sentinel-ui/`. | contexto |
| Configuração (remoto) | `apps/ap-payment-fraud-sentinel-ui/rsbuild.config.mts:12`: “Module Federation remote: the shell loads ./AppDescriptor at runtime.” `:19–48`: `pluginModuleFederation({ name: moduleId, filename: 'remoteEntry.js', exposes: { './AppDescriptor': './src/AppDescriptor.ts' }, runtime: false, shareStrategy: 'loaded-first', shared: react, react-dom, 'shell', 'rocketride' })`. O comentário de `:24–26` diz que o runtime de federação é fornecido pelo host (“the shell”). | forte |
| Contrato com a plataforma | `package.json:7–20`: `appManifest` com `id`, `publisher`, `projectId` e categorias da loja. `src/AppDescriptor.ts:6–27`: “the one module this app exposes to the RocketRide shell”. `ap-payment-fraud-sentinel.rrapp:1–3`: arquivo do App Builder. Os singletons `shell` e `rocketride` (`rsbuild.config.mts:38–41`) são pacotes da plataforma. | forte |
| Host | O shell RocketRide é da plataforma (terceiro) e não está no snapshot. Nenhuma outra unidade frontend do projeto é referenciada. | contrária |
| Código-fonte (fronteiras) | `src/App.tsx:10–18`: imports só de componentes e dados locais; nenhum `../..` em `apps/`. | contexto |

## Autoria e histórico

Clone não raso; 12 commits, 1 merge (`6f01561`), todos em 2026-08-26. São 9 de Aditya (e-mail local de máquina) e 3 de Shivadarshan-HM (e-mail institucional). A raiz é `865bda7` (“chore: initialize AP Payment Fraud Sentinel”); `dbbca69` (Shivadarshan-HM) adiciona o frontend; o SHA `fddf46a` (“Integrate frontend with backend API”) é o HEAD de `main`. O branch `origin/frontend-dashboard` tem 2 commits além de `main` e não foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; a configuração de federação só tem `exposes`, sem referenciar outra unidade do projeto. |
| Q2 | Yes | A UI tem entrada, build e porta próprios (`package.json:21–25`; `rsbuild.config.mts:64`, `78–79`). |
| Q3 | Undetermined | O host é o shell da plataforma RocketRide, não observável (`src/AppDescriptor.ts:7–9`). |
| Q4 | Undetermined | Mecanismo preparado do lado do remoto; a conexão é feita pela plataforma. |
| Q5 | No | Extensão de uma plataforma de terceiros carregada por seu shell, não parte de uma aplicação decomposta pelo autor. |

## Motivo

- `Non-MFE` pelo precedente final 037: pela letra do checklist seria MFE-unit (remoto MF preparado para host externo), mas o host é a UI de uma plataforma de terceiros e o MF é o mecanismo oficial de extensão dela. O vetor é o de 037 (`q1: no`, `q2: yes`, `q3/q4: undetermined`, `q5: no`).
- Difere dos rascunhos 161/189/222, em que a plataforma era da própria organização do titular (`review`). Aqui a plataforma é de terceiros (Aparavi/RocketRide), e a configuração vem do scaffold dela, como no caso de gerador (075/081/094/105).
- `approaches: []` (como 037), `ui_technologies: [react]`, `build_tools: [rsbuild]`, `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (projeto de hackathon com dados de demonstração em `src/mockData.ts`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** o scaffold de apps RocketRide usa Module Federation como mecanismo de plugin; repositórios de hackathon dessa plataforma casam a busca de código por `@module-federation`.
- **Protocolo (busca):** entrada só por busca de código no `package.json` da UI. A elegibilidade muda de `unknown` (001) para `pass` (002).
