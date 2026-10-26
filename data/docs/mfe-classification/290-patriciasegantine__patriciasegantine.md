---
schema: 1
id: 1116266409
full_name: patriciasegantine/patriciasegantine
url: https://github.com/patriciasegantine/patriciasegantine
commit: 2d4b77002325b5a00e076f5fc1489c45ce03503b
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

# 290 — patriciasegantine/patriciasegantine

## Contexto

- **Tipo de repositório:** não é projeto de software (README de perfil do GitHub).

O snapshot contém só `README.md`, com apresentação, projetos em andamento (em outros repositórios) e tecnologias. “Micro-frontends” aparece como item da lista de “Quality & Architecture” (`README.md:25–26`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:291` registra rank 290, ID 1116266409, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:291` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:22186` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:22192` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-12` | 2026-10-07T22:29:12.648Z / 2026-10-08T15:57:08.965Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-12` | 2026-10-07T22:58:53.141Z / 2026-10-08T16:07:29.993Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-12-01..2025-12-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 21, criação em 2025-12-14T14:29:20Z, push em 2026-09-21T16:37:01Z.

Sem descrição, o acerto vem do README. A única grafia correspondente é “Micro-frontends” (`README.md:26`); a busca de frase trata o hífen como separador, o que casa literalmente “micro frontends”. A forma singular “micro frontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O SHA (2026-09-21T17:36:59+01:00, isto é, 16:36:59Z) é a última alteração do README, coincide com o `pushed_at` e antecede as coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md`, arquivo regular `100644`; zero symlinks e zero gitlinks. Não há código, manifesto nem build. | ausente |
| Documentação | `README.md:1–4`: apresentação como “Frontend Engineer”; `README.md:9–13`: projetos em outros repositórios (Nexus, Redirect Lab), descritos como apps Next.js ou React + Vite; `README.md:25–26`: “Micro-frontends” na lista “Quality & Architecture”. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes; nenhuma configuração de federação, single-spa, import map, iframe ou Web Components. Imports relativos entre unidades não se aplicam (não há código). | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 12 commits (12 em todos os refs), nenhum merge, todos de `Patricia Segantine <68874361+patriciasegantine@users.noreply.github.com>` com committer `GitHub` (edição pela interface web), de 2025-12-14 (`6902d28`, “Initial commit”) ao SHA (2026-09-21, “Update about me”). Pelo `git log --no-renames --name-status`, um commit adiciona e onze modificam `README.md`. `git rev-list --objects $SHA --missing=print` lista 11 objetos ausentes, nenhum na árvore do SHA (versões anteriores do README); não foi possível datar a introdução de “Micro-frontends”.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só `README.md` (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; “Micro-frontends” é item de competências (`README.md:26`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo padrão dos perfis 011/064/068/073/077/101/111; `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, arrays de tecnologia vazios.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (busca):** o hit singular “micro frontend” não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002). O padrão `owner == name` reforça a sugestão de filtro automático registrada em 011.
