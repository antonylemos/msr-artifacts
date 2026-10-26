---
schema: 1
id: 1226451008
full_name: thirupathi124/SDE-1
url: https://github.com/thirupathi124/SDE-1
commit: 87e0d0122ccca6bf8b0510461ef75e16b0a95d81
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 341 — thirupathi124/SDE-1

## Contexto

Exercício de frontend para um processo seletivo (“A frontend assignment project for **RAGA.AI**”, `README.md:3`): uma única aplicação Next.js 16 (App Router) de SaaS de saúde, com Firebase Auth, shadcn/ui e dados simulados em JSON (`README.md:1–34`, `67–74`). Micro-frontends aparecem só como possibilidade futura: “…making the app ready for micro-frontend splits or API integration without restructuring pages.” (`README.md:78`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:342` registra rank 341, ID 1226451008, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:342` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29354` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:29360` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-05` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:36:39.291Z / 2026-10-08T15:59:48.873Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:05:10.076Z / 2026-10-08T16:09:15.173Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 177;
- criação em 2026-05-01T12:16:37Z, push em 2026-05-01T12:33:54Z.

A única grafia é “micro-frontend”, em `README.md:78`. O plural não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é `bd37c42` (2026-05-01), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 71 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Uma única aplicação Next.js na raiz: `app/` (páginas), `components/`, `context/`, `hooks/`, `lib/`, `data/*.json`, `public/` (PWA) e configs. | contrária |
| Configuração | `next.config.ts:1–12`: só `reactStrictMode` e o wrapper PWA (`@ducanh2912/next-pwa`); sem `rewrites`, zonas ou federação. | contrária |
| Busca de mecanismos | `git grep` no SHA, sem lockfile, por `micro.?front`, `federation`, `iframe`, `single-spa`, `remoteEntry`, `zones` e `rewrites`: só `README.md:78`. | ausente |
| Documentação | `README.md:76–78`: as pastas de funcionalidade são módulos internos da mesma aplicação, “ready for micro-frontend splits” no futuro. | contrária |

## Autoria e histórico

Clone não raso; 3 commits lineares, nenhum merge, todos de `thirupathi-lab`, de 2026-04-28 (`38be4a9`, “Initial commit from Create Next App”) a 2026-05-01 (SHA `87e0d01`, “app process completed”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; os “módulos” de funcionalidade são pastas internas (`README.md:78`). |
| Q2 | No | Sem duas unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz de composição. |
| Q4 | No | Nenhum mecanismo de composição (`next.config.ts:1–12`). |
| Q5 | No | Q1–Q4 são No: aplicação Next.js convencional de exercício. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”.
- Como no final 094 (exercício de entrevista), o caráter de exercício só define `repo_type: example`. Mesmo enquadramento do rascunho 306 (micro-frontends citados como possibilidade futura).
- **Campos:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react, next]`, `build_tools: []` (Next.js sem bundler explícito, como em 094).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** uma linha sobre prontidão para “micro-frontend splits” casa as duas consultas terminológicas.
- **Protocolo (busca):** o hit plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
