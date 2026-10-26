---
schema: 1
id: 1238375866
full_name: Aestheticsuraj234/resources-2026
url: https://github.com/Aestheticsuraj234/resources-2026
commit: 78dcaa0a773da112769d49a098e2b4a99ad2797c
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

# 367 — Aestheticsuraj234/resources-2026

## Contexto

Repositório de notas de estudo: “Advanced Frontend & React — Deep Dive Notes”, com 30 tópicos (`README.md:1–3`) e um segundo documento, `backend.md`. Micro-frontends são um dos tópicos (`README.md:35`, `346–357`), descritos conceitualmente com Module Federation e single-spa. Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:368` registra rank 367, ID 1238375866, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:368` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30055` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:30061` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, todos do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T22:35:41.883Z / 2026-10-08T15:59:28.928Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:04:12.402Z / 2026-10-08T16:09:04.849Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:26:38.626Z / 2026-10-08T16:18:13.090Z |
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `…#created:2026-Q2` | 2026-10-07T23:35:29.231Z / 2026-10-08T16:21:38.477Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e `created:2026-05-01..2026-05-31` (ou `2026-04-01..2026-06-30` para single-spa).

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 22;
- criação em 2026-05-14T04:15:38Z, push em 2026-05-14T12:05:24Z.

Grafias no README:
- “Micro-frontends”: `README.md:35`, `346` e `348`; o singular não aparece literalmente;
- “Module Federation”: `README.md:352`;
- “Single-SPA”: `README.md:357`.

A última alteração do README é `f909b9f` (2026-05-14), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 2 entradas, arquivos regulares `100644` (`README.md`, 40.419 bytes; `backend.md`, 11.028 bytes); zero symlinks e zero gitlinks. Não há código. | contrária |
| Documentação | `README.md:346–357`: texto explicativo sobre micro-frontends, estratégias de integração, Module Federation e single-spa, como tópico de estudo. | fraca |

## Autoria e histórico

Clone não raso; 3 commits lineares, nenhum merge, todos de “Suraj Kumar Jha aka Sigma”, em 2026-05-14, dois deles feitos na interface do GitHub. Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só documentos Markdown. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo configurado; os mecanismos só são descritos (`README.md:352`, `357`). |
| Q5 | No | Q1–Q4 são No: notas de estudo. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Como no final 023 (conteúdo), texto explicativo sobre MFE não constitui implementação.
- **Campos:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** um tópico de notas de estudo casa as quatro consultas, terminológicas e tecnológicas.
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
