---
schema: 1
id: 1068958688
full_name: Boopathi-V-143/Micro-FrontEnd-React
url: https://github.com/Boopathi-V-143/Micro-FrontEnd-React
commit: 8c193636e617f68791eb77ceb5332680a881b590
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

# 369 — Boopathi-V-143/Micro-FrontEnd-React

## Contexto

Repositório vazio: o único commit, criado pela interface do GitHub, contém só um `README.md` de duas linhas que repete o identificador “Micro-FrontEnd-React” (`README.md:1–2`). Não há código, configuração nem dependências. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:370` registra rank 369, ID 1068958688, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:370` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:19509` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:19515` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-10` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:26:30.472Z / 2026-10-08T15:56:06.882Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:57:16.375Z / 2026-10-08T16:06:53.306Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-10-01..2025-10-31`.

Metadados do hit:
- descrição “Micro-FrontEnd-React”, sem tópicos, linguagem nula, `fork: false`, tamanho 0;
- criação em 2025-10-03T07:17:37Z, push em 2025-10-03T07:17:38Z.

O único texto é o identificador “Micro-FrontEnd-React”, em `README.md:1–2` e na descrição. O plural não aparece; os hits dependem do processamento textual da busca do GitHub, que não está registrado. O README é do único commit (2025-10-03), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 44 bytes); zero symlinks e zero gitlinks. | contrária |
| Documentação | `README.md:1–2`: só o título repetido. | ausente |

## Autoria e histórico

Clone não raso; um único commit, `8c19363` (2025-10-03, “Initial commit”), de `Boopathi-V-143`, criado pela interface do GitHub. Só há o branch `main`. Não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só um README de duas linhas. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição. |
| Q5 | No | Q1–Q4 são No: repositório vazio. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”: o termo está só no título e na descrição, sem implementação.
- Mesmo enquadramento dos rascunhos 265 e 300 (repositórios só com README inicial) e dos perfis 011/064/068/073/077/101/111.
- **Campos:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (busca):** o identificador hifenizado do título e da descrição (e o nome) casa as duas consultas; o plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
