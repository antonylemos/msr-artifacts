---
schema: 1
id: 1213587080
full_name: yesrab/yesrab
url: https://github.com/yesrab/yesrab
commit: 4a3f236d6c5ca7fe095c0a6cfd800aa3a0ec56a1
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

# 360 — yesrab/yesrab

## Contexto

- **Tipo de repositório:** não é projeto de software com aplicação. É o repositório de perfil do GitHub (`<usuário>/<usuário>`): um README de apresentação e o currículo do autor em LaTeX (`main.tex`, classe `cvhari.cls`), compilado em PDF por GitHub Actions (descrição “this is my Letex resume”). A coincidência entre dono e nome é registrada só como tipo de repositório, não como evidência arquitetural.

`data/samples/mfe-sample-001/clones.csv:361` registra rank 360, ID 1213587080, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:361` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:28616` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:28622` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-04` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-04-30` | 2026-10-07T22:34:37.622Z / 2026-10-08T15:59:05.472Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-04` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-04-30` | 2026-10-07T23:03:00.607Z / 2026-10-08T16:08:51.936Z |

Metadados do hit: descrição “this is my Letex resume”, sem tópicos, linguagem TeX, licença GPL-3.0, `fork: false`, tamanho 26, criação em 2026-04-17T14:39:11Z, push em 2026-06-28T20:06:18Z.

A única ocorrência do termo no README é `README.md:3`: “I’m currently learning **advanced NestJS, micro-frontend architecture & scalable RBAC**”, no singular e hifenizado (hífen como separador). O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA `4a3f236` (2026-06-29, “chore: updated readme”), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 7 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks: `.github/workflows/build-pdf.yml`, `.gitignore`, `.vscode/settings.json`, `LICENSE`, `README.md`, `cvhari.cls` e `main.tex`. Não há código de aplicação web. | ausente |
| Build/deploy | `.github/workflows/build-pdf.yml:1–30`: compila `main.tex` em PDF (`xu-cheng/latex-action`, `:22–26`) e prepara a publicação do currículo. | contexto |
| Documentação | `README.md:3`: micro-frontends como tema que o autor está aprendendo; `main.tex:120`: “Micro-frontend Architecture” entre as práticas listadas no currículo. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição | Inexistentes; sem código, não há imports entre unidades a buscar. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 7 commits alcançáveis (7 em todos os refs), nenhum merge, de 2026-04-17 (`7e71690`, “Initial commit”, pela interface web) a 2026-06-29 (SHA). Autoria: o titular com três identidades (`yesrab <yesrab.ali111@gmail.com>`, `Yesrab Ali` com o mesmo e-mail, e `yesrabali` com e-mail corporativo em `358ee16`). Tag `resume-17-04-2026` não considerada à parte. O histórico nunca conteve código de aplicação. `git rev-list --objects $SHA --missing=print` identifica 4 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só README, currículo LaTeX e workflow de PDF (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; o termo é tema de estudo e item de currículo (`README.md:3`; `main.tex:120`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”, como os perfis 011/064/068/073/077/101/111.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, arrays vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README de perfil (`owner == name`) que também versiona o currículo em LaTeX; “micro-frontend” aparece como aprendizado em curso e como prática listada.
