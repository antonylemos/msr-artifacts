---
schema: 1
id: 1382897771
full_name: valdman40/scheduler
url: https://github.com/valdman40/scheduler
commit: 9d4a656121d62b0f8b5d2271fefbfdbce66ac011
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 196 — valdman40/scheduler

## Contexto

“Kavua — multi-tenant appointment booking (architecture brief)” (`README.md:1–3`): no commit registrado, o repositório contém só documentação de planejamento, um brief de arquitetura de 703 linhas e cinco planos de implementação em `plans/`. Não há código. A arquitetura descrita é uma única SPA React/Vite (“One build serves both roles”, `README.md:18`). O acerto da busca `"single-spa"` vem da expressão “A single SPA built with Vite” (`README.md:669`), não da biblioteca single-spa. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:197` registra rank 196, ID 1382897771, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:197` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:37783` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:37815` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2026-Q3` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:36:12.321Z / 2026-10-08T16:21:53.010Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 193;
- criação em 2026-09-23T06:38:15Z, push em 2026-09-23T14:12:12Z.

O acerto vem de `README.md:669`, “- **React 18 · Vite 5 · TypeScript**: A single SPA built with Vite…”, única ocorrência. A grafia é “single SPA”, com espaço; a busca de frase do GitHub trata o hífen de `"single-spa"` como separador. Nenhum arquivo do SHA contém `single-spa` ou menções a micro-frontends.

O README vem do único commit em `main`, que é o SHA `9d4a656` (2026-09-23), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 7 entradas, todas arquivos regulares `100644` (`README.md` e `plans/README.md`, `plans/PLAN-1…5-*.md`); zero symlinks e zero gitlinks. Não há código, manifesto ou configuração. | contrária |
| Documentação | `README.md:5–18`: stack planejada (monorepo pnpm/Turborepo com `apps/web`, `apps/api`, `packages/shared`; frontend React/Vite com “One build serves both roles”). `README.md:669`: “A single SPA built with Vite”. O frontend planejado é uma única aplicação; não há composição de frontends no plano. | contrária |
| Busca | `git grep -i` no SHA por `single.?spa`, `micro.?front` e `federation`: só `README.md:669`. | ausente |

## Autoria e histórico

Clone não raso; 2 commits em todos os refs, nenhum merge, de Roy Wald `<roywal@checkpoint.com>`. O SHA `9d4a656` (2026-09-23, “Init”) é o único em `main`. O branch `origin/plan-1-frontend-shell` (`6ca0463`, 2026-09-23, “Plan 1 — monorepo, phone shell, design system, i18n/RTL, mock data”) contém o início da implementação e corresponde ao `pushed_at`; não foi considerado, pois o snapshot é o commit de `clones.csv`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no snapshot; só documentação. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; a arquitetura planejada é uma SPA única (`README.md:18`, `669`). |
| Q5 | No | Q1–Q4 são No: brief de arquitetura captado pela expressão “single SPA”. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. O acerto é lexical: “single SPA” no sentido de uma única aplicação. É o mesmo falso positivo de 131, 144 e 187.
- Repositório sem implementação no snapshot, como os perfis 011/064/068/073/077/101/111: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** documento de arquitetura que descreve “a single SPA” casa a consulta de tecnologia `"single-spa"`.
- **Protocolo (snapshot):** a implementação inicial está em `plan-1-frontend-shell`, fora do branch padrão capturado e não inspecionada; o plano documentado no SHA é de uma SPA única.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).
