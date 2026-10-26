---
schema: 1
id: 1265404002
full_name: angelcolorado/endurance-ui
url: https://github.com/angelcolorado/endurance-ui
commit: 7b53daa4c19ee67815514d07de7c3b9e4a100463
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 361 — angelcolorado/endurance-ui

## Contexto

SPA Angular (standalone, SSR, Tailwind) de logística de corridas, com módulos de autenticação, dashboard, eventos e logística (`src/app/features/`). O README a descreve como “Angular SPA — micro-frontend client for the EnduranceOps race logistics platform.” (`README.md:3`). No snapshot, porém, é uma aplicação Angular única, sem federação, host ou outra unidade. `ABOUT_ME.md:5` cita “arquitecturas de micro-frontends” como interesse do autor. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:362` registra rank 361, ID 1265404002, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:362` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:31632` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:31640` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-06` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:23.431Z / 2026-10-08T16:00:38.564Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:11.673Z / 2026-10-08T16:09:47.363Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 382;
- criação em 2026-06-10T18:38:44Z, push em 2026-07-03T22:16:17Z.

A grafia “micro-frontend” está em `README.md:3`. O plural não aparece no README; aparece em `ABOUT_ME.md:5`, fora dos campos buscados. Esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA (2026-07-03), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 72 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Uma única aplicação Angular (`angular.json`, `src/app/`, `src/main.ts`, `src/main.server.ts`, `src/server.ts`) e documentos (`README.md`, `CLAUDE.md`, `ABOUT_ME.md`). | contrária |
| Build | `angular.json`: um projeto com `@angular/build:application` (`:17`), `dev-server` (`:64`) e `unit-test` (`:76`). Nenhum builder de federação. | contrária |
| Busca de mecanismos | `git grep` no SHA, sem lockfile, por `federation`, `remoteEntry`, `single-spa`, `iframe` e `loadRemote`: nada. | ausente |
| Documentação | `README.md:3`: “micro-frontend client” para a plataforma, ou seja, o papel esperado do cliente, sem host nem composição no repositório. | fraca |

## Autoria e histórico

Clone não raso; 17 commits lineares, nenhum merge, todos de Angel Colorado, de 2026-06-10 a 2026-07-03 (SHA `7b53daa`). Há 12 branches `feat/*` remotos, não considerados. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; nenhuma outra unidade referenciada por configuração de composição. |
| Q2 | No | Sem duas unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz que componha unidades. |
| Q4 | No | Nenhum mecanismo de composição configurado. |
| Q5 | No | Q1–Q4 são No: SPA Angular convencional descrita como “micro-frontend client”. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”.
- Não é `MFE-unit`: não há nada que a prepare para composição por um host externo, como `exposes`, lifecycles ou Custom Elements.
- **Campos:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (builder `application` do Angular, como em 059 e 316), `repo_type: production`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro-frontend client” no README de uma SPA única casa as consultas terminológicas.
- **Protocolo (busca):** o plural está só em `ABOUT_ME.md`, fora dos campos buscados. A elegibilidade muda de `unknown` (001) para `pass` (002).
