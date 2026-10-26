---
schema: 1
id: 1329958608
full_name: deepbag/micro-frontend-rspack
url: https://github.com/deepbag/micro-frontend-rspack
commit: 12ffbcc434814305d41c8fbb875477a744233caa
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

# 300 — deepbag/micro-frontend-rspack

## Contexto

Repositório vazio: no commit fixado, que é o único, há só um `README.md` de uma linha (“# micro-frontend-rspack”, 23 bytes), criado pela interface do GitHub. Não há código, configuração nem dependências. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:301` registra rank 300, ID 1329958608, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:301` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35106` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:35112` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:40:50.062Z / 2026-10-08T16:01:32.208Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:11:13.636Z / 2026-10-08T16:10:20.504Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 0;
- criação em 2026-08-10T15:14:59Z, push em 2026-08-10T15:15:00Z.

O único texto é `README.md:1` (“# micro-frontend-rspack”, sem quebra de linha final), em que “micro-frontend” aparece dentro de um identificador hifenizado; o plural não aparece. Os campos buscados incluem também o nome, e a parte responsável por cada hit depende do processamento textual da busca do GitHub, que não está registrado. O README é do único commit (2026-08-10), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 23 bytes); zero symlinks e zero gitlinks. Não há código, configuração nem dependências. | contrária |
| Documentação | `README.md:1`: só um título. | ausente |

## Autoria e histórico

Clone não raso; um único commit, `12ffbcc` (2026-08-10, “Initial commit”), de Deep Bag, criado pela interface do GitHub (committer `GitHub`). Só há o branch `main`. Não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só um README de uma linha. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição. |
| Q5 | No | Q1–Q4 são No: repositório vazio. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”: o termo está só no título.
- Mesmo enquadramento do rascunho 265 (commit inicial só com README) e dos perfis 011/064/068/073/077/101/111 (sem implementação).
- **Campos:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (busca):** o título hifenizado (ou o nome do repositório) casa as duas consultas; o plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
