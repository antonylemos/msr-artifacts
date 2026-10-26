---
schema: 1
id: 1311273254
full_name: Swatigavhane/swatigavhane
url: https://github.com/Swatigavhane/swatigavhane
commit: 8cb49008ea9d0634d9aa1a2463d124043841f5b8
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

# 352 — Swatigavhane/swatigavhane

## Contexto

Repositório de perfil do GitHub: um único `README.md` com apresentação e lista de tecnologias. Micro-frontends aparecem só como competência: “**Architecture & Performance**: Frontend Architecture, Micro-frontends, …” (`README.md:8`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:353` registra rank 352, ID 1311273254, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:353` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34152` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:34159` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:39:16.433Z / 2026-10-08T16:01:00.203Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:09:08.693Z / 2026-10-08T16:09:58.275Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 3;
- criação em 2026-07-24T17:25:27Z, push em 2026-07-24T17:34:24Z.

A única grafia é “Micro-frontends”, em `README.md:8`. O singular não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA (2026-07-24), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 688 bytes); zero symlinks e zero gitlinks. | contrária |
| Documentação | `README.md:1–10`: apresentação e lista de tecnologias; `README.md:8` cita “Micro-frontends” como competência. | fraca |

## Autoria e histórico

Clone não raso; 3 commits lineares, nenhum merge, todos de Swati Gavhane e criados na interface do GitHub (committer `GitHub`), em 2026-07-24, de `afb35a6` (“Initial commit”) ao SHA `8cb4900` (“Update README.md”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só um README. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; só a menção em `README.md:8`. |
| Q5 | No | Q1–Q4 são No: repositório de perfil. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo enquadramento dos finais de perfil 011/064/068/073/077/101/111 e dos rascunhos 285, 303 e 337.
- **Campos:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** competência listada num README de perfil casa as consultas terminológicas.
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
