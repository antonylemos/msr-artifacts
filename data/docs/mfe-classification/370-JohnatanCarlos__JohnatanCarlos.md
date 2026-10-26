---
schema: 1
id: 325860876
full_name: JohnatanCarlos/JohnatanCarlos
url: https://github.com/JohnatanCarlos/JohnatanCarlos
commit: 8b50c6e26c8e75077df14e7d07973db141b83e3d
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

# 370 — JohnatanCarlos/JohnatanCarlos

## Contexto

- **Tipo de repositório:** não é projeto de software. É o README de perfil do GitHub (repositório `<usuário>/<usuário>`, descrição “My Description!”), com apresentação profissional, tecnologias e contatos. Contém dados de contato pessoais (`README.md:29`), não reproduzidos aqui. A coincidência entre dono e nome é registrada só como tipo de repositório, não como evidência arquitetural.

`data/samples/mfe-sample-001/clones.csv:371` registra rank 370, ID 325860876, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:371` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:1754` e `data/discovery/mfe-round-002/candidates.csv:1754`, ambos com `terminology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2020-12` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2020-12-01..2020-12-31` | 2026-10-07T22:16:01.750Z / 2026-10-08T15:51:45.538Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2020-12` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2020-12-01..2020-12-31` | 2026-10-07T22:45:51.456Z / 2026-10-08T16:03:32.620Z |

Metadados do hit: descrição “My Description!”, sem tópicos, linguagem nula, sem licença, `fork: false`, tamanho 15, 1 fork, criação em 2020-12-31T19:22:10Z, push em 2026-08-30T22:40:09Z.

O plural “Micro Frontends” aparece literalmente em `README.md:12` (“…incluindo arquitetura de Micro Frontends/MFE…”) e `README.md:19` (“`Micro Frontends (MFE)`” na lista de tecnologias de front-end). O singular “micro frontend” não aparece isolado; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA `8b50c6e` (2026-08-30, “Update introduction in README.md”), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 1715 bytes); zero symlinks e zero gitlinks. | ausente |
| Documentação | `README.md:12` e `README.md:19`: micro-frontends como experiência profissional e item da lista de tecnologias; `README.md:30`: link para portfólio externo, não seguido. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes no snapshot; sem código, não há imports a buscar. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 11 commits alcançáveis (11 em todos os refs), nenhum merge, todos de “Johnatan Carlos” pela interface web (committer GitHub), de 2020-12-31 (`e42b2fd`, “Initial commit”) a 2026-08-30 (SHA). Todos os commits tocam só `README.md`; o histórico nunca conteve código. `git rev-list --objects $SHA --missing=print` identifica 10 objetos históricos ausentes; o blob do SHA está presente e foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só `README.md` (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; micro-frontends aparecem como experiência e tecnologia (`README.md:12`, `19`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”, como os perfis 011/064/068/073/077/101/111. Na seção 3.2 do protocolo, cabe em “purely documentation without an implementation”.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, arrays vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README de perfil (`owner == name`) criado em 2020 e reeditado em 2026, que entra pela partição `created:2020-12` graças ao push recente; mesmo padrão de 011.
- **Protocolo:** o README expõe e-mail pessoal; a anotação não o reproduz.
