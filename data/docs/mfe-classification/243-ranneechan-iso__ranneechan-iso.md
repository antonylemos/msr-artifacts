---
schema: 1
id: 1126172096
full_name: ranneechan-iso/ranneechan-iso
url: https://github.com/ranneechan-iso/ranneechan-iso
commit: cb14d4556172419d7b0b3ee1356fe95e3f79be44
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

# 243 — ranneechan-iso/ranneechan-iso

## Contexto

- **Tipo de repositório:** não é projeto de software (README de perfil do GitHub; descrição do repositório “My GitHub Profile”).

O snapshot contém só `README.md`, com apresentação pessoal, badges, GIFs e um objeto JavaScript ilustrativo que lista competências (`README.md:12–37`). “Micro-frontends” aparece só nessa lista, em `architecture` (`README.md:24–28`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:244` registra rank 243, ID 1126172096, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:244` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:22723` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:22729` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-01` | 2026-10-07T22:30:19.747Z / 2026-10-08T15:57:32.444Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-01` | 2026-10-07T22:59:35.430Z / 2026-10-08T16:07:45.338Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit (iguais nas duas rodadas): descrição “My GitHub Profile”, sem tópicos, linguagem nula, `fork: false`, tamanho 14, criação em 2026-01-01T09:48:37Z, push em 2026-01-01T19:04:01Z.

A descrição não contém os termos; o acerto vem do README. A única grafia correspondente é “Micro-frontends” (`README.md:25`). A busca de frase trata o hífen como separador, o que casa literalmente “micro frontends”. A forma singular “micro frontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O SHA (2026-01-02T02:04:00+07:00, isto é, 2026-01-01T19:04:00Z) coincide com o `pushed_at` registrado e antecede as coletas de outubro de 2026. O README do SHA não é posterior às buscas e é a versão indexada.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md`, arquivo regular `100644`; zero symlinks e zero gitlinks. Não há manifesto, código, build nem assets. | ausente |
| Documentação | `README.md:12–37`: bloco de código Markdown (`javascript`) com objeto de perfil; `README.md:15` “Front-end Engineer”; `README.md:19` stack frontend (React, Next.js etc.); `README.md:24–28` `architecture: ["Micro-frontends", …]` como competência listada. O bloco é conteúdo de apresentação, não código executável versionado. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes: o único arquivo é o README; nenhuma configuração de federação, single-spa, import map, iframe ou Web Components. Imports relativos entre unidades não se aplicam (não há código). | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`); 8 commits alcançáveis (8 em todos os refs), nenhum merge, todos com autor `NywnChan <habibrouf690@gmail.com>` e committer `GitHub` (edição pela interface web), de 2026-01-01T16:48:37+07:00 (`a47d029`, “Initial commit”) ao SHA `cb14d45` (“Add footer section to README”). Pelo `git log --no-renames --name-status`, todos os commits só adicionam ou modificam `README.md`. `git rev-list --objects $SHA --missing=print` identifica 7 objetos ausentes: os blobs de `README.md` dos 7 commits anteriores ao SHA. Por isso não foi possível ler versões históricas nem datar a introdução de “Micro-frontends”; o blob do SHA está presente. Os metadados não indicam conteúdo além do README em nenhum momento do histórico.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o repositório só tem `README.md` (inventário). |
| Q2 | No | Não há unidades com entrada ou build próprios. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição configurado; “Micro-frontends” é item de lista de competências (`README.md:25`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo padrão dos perfis 011/064/068/073/077/101/111: README de perfil do GitHub em que micro-frontends aparecem como competência profissional, com `frontend_units: 0` e `unit_organization: none`.
- `repo_type: other` (perfil, não projeto de software). `ui_technologies` e `build_tools` vazios: React, Next.js etc. são só competências declaradas.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** competência “Micro-frontends” dentro de um objeto JavaScript ilustrativo em bloco de código Markdown; buscas de código não o captam, mas a busca por README sim.
- **Protocolo (busca):** o hit singular “micro frontend” não tem grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002). O padrão `owner == name` reforça a sugestão de filtro automático registrada em 011.
- **Protocolo (clone parcial):** os blobs históricos do README não estão no clone; a análise se apoia no SHA e nos metadados dos commits.
