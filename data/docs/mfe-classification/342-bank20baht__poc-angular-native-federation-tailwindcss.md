---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
url: https://github.com/bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Contexto

Prova de conceito de Native Federation em Angular 20 com Tailwind CSS 4 e daisyUI (descrição do repositório): um host (`host/`) e um remote (`remote/`), cada um com seu workspace Angular, `federation.config.js`, `package.json` e lockfiles. O foco declarado do histórico é fazer o estilo Tailwind do remote funcionar dentro do host, o que foi resolvido fazendo o Tailwind do host varrer o código-fonte do remote (`host/src/styles.css:4`). O README raiz só tem o título (`README.md:1`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:343` registra rank 342, ID 1050538328, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:343` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:18434` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:18439` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-09` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T19:02:49.821Z / 2026-10-08T15:39:32.098Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-09` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T22:09:10.723Z / 2026-10-08T15:48:05.193Z |

Metadados do hit: descrição “POC angular v20 microfrontend with Native Federation Styling with Tailwindcss v4”, sem tópicos, linguagem TypeScript, sem licença, `fork: false`, tamanho 382, criação em 2025-09-04T15:13:04Z, push em 2025-09-18T17:14:52Z.

O acerto vem da descrição: o singular “microfrontend” aparece literalmente nela; o README raiz (`README.md:1`, “# Native Federation Angular”) não contém o termo, e o plural “microfrontends” não aparece literalmente, de modo que esse hit depende do processamento textual da busca do GitHub, que não está registrado. O README vem do commit `bb8b5ac` (2025-09-04) e não é posterior às buscas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 72 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Dois workspaces Angular independentes (`host/`, `remote/`), cada um com `angular.json`, `package.json`, `package-lock.json`, `bun.lock`, `federation.config.js`, `src/main.ts` → `src/bootstrap.ts`. | forte |
| Configuração (host) | `host/federation.config.js:3–27`: `withNativeFederation` com `shareAll` singleton. `host/src/main.ts:3–5`: `initFederation({ 'remote': 'http://localhost:4201/remoteEntry.json' })` antes do bootstrap. `host/angular.json:17`, `31`, `111`: builder `@angular-architects/native-federation:build`, servidor original na porta 4200. | forte |
| Configuração (remote) | `remote/federation.config.js:5–10`: `name: 'remote'`, `exposes` `./Component` (`src/app/app.ts`) e `./routes` (`src/app/modules/home/home.routes.ts`); `shareAll` singleton. `remote/angular.json:17`, `108`: mesmo builder, porta 4201, coincidente com a URL do host. | forte |
| Código-fonte (composição) | `host/src/app/app.routes.ts:7–28`: rota `''` com `loadRemoteModule('remote', './Component')` → `m.App` e rota `flights` com `loadRemoteModule('remote', './routes')` → `m.APP_ROUTES`, ambas com fallback local; `remote/src/app/app.ts:10` exporta `App` e `remote/src/app/modules/home/home.routes.ts:3–14` exporta `APP_ROUTES`. | forte |
| Build (estilo entre unidades) | `host/src/styles.css:2–5`: `@import "tailwindcss" source(none)` com `@source "./app/**/*.{html,js}"` e `@source "../../remote/src/**/*.{html,js}"`, ou seja, o CSS do host é gerado a partir das classes usadas nos templates do remote (por exemplo, `remote/src/app/app.html:1–10`). O remote tem seu próprio Tailwind (`remote/src/styles.css:2–3`). Histórico: `f61b3c0` (2025-09-13), “can render style from remote but tailwindcss host must scan remote first”. | ambígua |
| Código-fonte (fronteiras) | Busca por `../` em `*.ts`, `*.css`, `*.html`, `*.json` e `*.js` (exceto lockfiles): única ocorrência `host/src/styles.css:4`, a varredura de CSS acima. Nenhum import de código TypeScript entre `host` e `remote`; o host só alcança o remote por `loadRemoteModule`. `host/src/remote.d.ts:1` declara um módulo `remote/Styles?inline` sem uso no código. | moderada |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 11 commits alcançáveis a partir do SHA (14 em todos os refs), 1 merge (o próprio SHA, de `feature/tailwindcss@4`), de 2025-09-04 (`bb8b5ac`, “feat: module federation with native federation in angular 20”) a 2025-09-19. Autoria: `Nattapong Promthong <banker.z412@gmail.com>` em todos os commits. Refs remotos `feature/nx`, `feature/tailwindcss`, `feature/tailwindcss@3` e `feature/tailwindcss@4` não foram considerados à parte. A sequência de commits (safelist, scan do remote, Tailwind 3 e 4) documenta o problema de estilo entre unidades. A conta tem outros POCs de MFE nas rodadas (`bank20baht/poc-angular-module-federation`, `poc-angular-native-federation`, `poc-microfrontend-angular`; `data/discovery/mfe-round-002/candidates.csv:18050`, `19064`, `22401`), fora deste snapshot. `git rev-list --objects $SHA --missing=print` identifica 35 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `host` e `remote`, este referenciado pela configuração de composição (`host/src/main.ts:3–5`). |
| Q2 | Yes | Entrada, builder, porta e lockfiles próprios por unidade e nenhum import de código-fonte entre elas. Ver ponto de revisão sobre a varredura de CSS (`host/src/styles.css:4`). |
| Q3 | Yes | O host roteia e carrega o componente e as rotas do remote (`host/src/app/app.routes.ts:7–28`). |
| Q4 | Yes | Native Federation configurada nos dois lados, com nome, chaves expostas e porta coincidentes, e usada por `initFederation` + `loadRemoteModule`. |
| Q5 | Yes | Q1–Q4 convergem, sujeito ao ponto de revisão. |

## Motivo

- `MFE-implemented` (decisão registrada abaixo). Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”; mesma abordagem do final 059 (Native Federation com host e remotes no monorepo).
- A cadeia de federação é completa e coerente (contraste com 097/103/104); comparável aos casos de cadeia completa (076/084/096/106/109).
- O remote expõe um componente de página e um conjunto de rotas montadas pelo host, não utilitários (contraste com 089/100).
- `frontend_units: 2`, `unit_organization: monorepo`, `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (builder `application` por trás do Native Federation, `host/angular.json:57–59`), `repo_type: example`.

## Notas para análise

- **RQ2:** Native Federation em Angular 20 com rotas remotas e fallback local por `catch` em `loadRemoteModule`.
- **RQ3:** estilo utilitário (Tailwind/daisyUI) gerado pelo host a partir do código-fonte do remote, um acoplamento de build no nível de CSS que o histórico descreve como requisito (“host must scan remote first”).
- **Protocolo (família):** a conta mantém uma série de POCs de MFE em Angular nas rodadas; só este está na amostra.

## Decisão registrada

- **Questão:** o host gera seu CSS varrendo `../../remote/src/**` (`host/src/styles.css:4`), de modo que classes novas usadas pelo remote só são estilizadas depois de recompilar o host. Não há import de código entre as unidades, que é o critério literal de Q2, mas há dependência de build do host em relação ao código-fonte do remote. Cotejo com a “dependência de deploy” do final 042 (código compilado dentro do bundle; aqui, só a geração de CSS) e com a nota de 128 (varredura de biblioteca compartilhada, não de outra unidade).
- **Decisão dos pesquisadores:** o acoplamento de CSS em build não pesa em Q2. Mantém-se `MFE-implemented`.
- **Regra nova:** não se propõe.
