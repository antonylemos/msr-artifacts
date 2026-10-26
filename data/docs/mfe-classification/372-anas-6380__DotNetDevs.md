---
schema: 1
id: 1212374115
full_name: anas-6380/DotNetDevs
url: https://github.com/anas-6380/DotNetDevs
commit: c538dc508770185b82e613f2ce4fbaed207ab9f5
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 372 — anas-6380/DotNetDevs

## Contexto

Plataforma de pedidos de varejo (“Retail Ordering Platform”, `README.md:1–3`) com uma API ASP.NET Core (`RetailOrdering.Api/`) e um único frontend Angular 21 (`retail-ordering-web/`). O README usa “Frontend composition” como título de seção sobre a organização interna do frontend (`README.md:48–52`), sem relação com composição de unidades. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:373` registra rank 372, ID 1212374115, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:373` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:28558` (`broader`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:28564` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-composition`: `"frontend composition" in:name,description,readme` | `broader-frontend-composition` (sem partição) | `"frontend composition" in:name,description,readme pushed:>=2025-04-01` | 2026-10-07T23:39:00.779Z / 2026-10-08T16:22:41.410Z |

Metadados do hit: descrição nula, sem tópicos, linguagem C#, sem licença, `fork: false`, tamanho 123, criação em 2026-04-16T10:10:02Z, push em 2026-04-16T10:15:17Z.

A frase aparece literalmente em `README.md:48` (“### Frontend composition”), título de uma lista sobre estrutura por features, serviços compartilhados, guards e interceptor (`README.md:49–52`). A última alteração do README é o próprio SHA `c538dc5` (2026-04-16, “Enhance README and add technical documentation”), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 123 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Uma API .NET (`RetailOrdering.Api/`, `RetailOrdering.slnx`), um único projeto frontend (`retail-ordering-web/`, 58 arquivos, um `package.json` e um `angular.json`) e documentos Markdown na raiz. | contrária |
| Configuração | `retail-ordering-web/package.json:4–30`: scripts `ng serve`/`ng build` e Angular 21, sem dependência de composição; `retail-ordering-web/angular.json:22–24`: builder `@angular/build:application` com uma entrada `src/main.ts`. | contrária |
| Código-fonte | `retail-ordering-web/src/app/app.routes.ts:1–35`: rotas `login`, `register`, `customer/*` e `admin`, todas com componentes importados estaticamente do próprio app e protegidas por guards. | contrária |
| Código-fonte (fronteiras) | Busca por `../../` em `*.ts` do frontend: só imports internos de `core/` e `layout/` a partir de `features/` (por exemplo, `retail-ordering-web/src/app/features/admin/admin-dashboard.component.ts:4–8`). Há um único projeto frontend. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile, por `federation`, `single.?spa`, `import.?map`, `iframe`, `customElements` e `micro.?front`: nenhuma ocorrência. | ausente |
| Documentação | `README.md:48–52`: “Frontend composition” como organização interna do app Angular. | contexto |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 2 commits (2 em todos os refs), nenhum merge, ambos de `anas-6380` em 2026-04-16: `d71db3e` (“Initial full-stack retail ordering app”) e o SHA `c538dc5` (README e documentação técnica). `git rev-list --objects $SHA --missing=print` identifica 2 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`retail-ordering-web/`); nenhuma configuração de composição (busca registrada). |
| Q2 | No | Não há duas unidades a avaliar. |
| Q3 | No | O roteamento interno (`app.routes.ts:12–35`) organiza componentes da mesma aplicação. |
| Q4 | No | Nenhum mecanismo de composição; “Frontend composition” descreve estrutura interna (`README.md:48–52`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: uma SPA Angular sobre uma API .NET.
- Não é `MFE-unit`: a aplicação não exporta contrato para host externo.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (builder `application` do Angular, `angular.json:22`), `repo_type: example` (projeto de demonstração “production-style”, `README.md:3`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** a consulta ampla `"frontend composition"` casa um título de seção sobre organização interna de um SPA (`README.md:48`).
