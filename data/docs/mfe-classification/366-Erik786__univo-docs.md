---
schema: 1
id: 1322173014
full_name: Erik786/univo-docs
url: https://github.com/Erik786/univo-docs
commit: 84bd176c0cb4e78e0853fcecbae7fe77510f45d8
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

# 366 — Erik786/univo-docs

## Contexto

- **Tipo de repositório:** não é projeto de software com implementação. É a documentação de produto (GitBook) de uma plataforma LMS (“LXS Univo — Product documentation, developer guides and roadmap”), só em Markdown e duas imagens. A documentação descreve três micro-frontends React mantidos em outros repositórios (`lms-mfe-app`, `lms-mfe-auth`, `lms-mfe-admin`, `architecture/micro-frontends.md:7–11`), cujo código não está neste snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:367` registra rank 366, ID 1322173014, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:367` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34710` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:34716` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-08` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-08-01..2026-08-31` | 2026-10-07T22:40:50.062Z / 2026-10-08T16:01:32.208Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-08` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-08-01..2026-08-31` | 2026-10-07T23:10:56.388Z / 2026-10-08T16:10:16.961Z |

Metadados do hit: descrição “LXS Univo — Product documentation, developer guides and roadmap”, sem tópicos, linguagem nula, sem licença, `fork: false`, tamanho 3239, 1 estrela, criação em 2026-08-03T19:37:40Z, push em 2026-09-07T08:53:00Z.

As duas grafias aparecem hifenizadas no README (hífen como separador): o plural em `README.md:33` (“React micro-frontends, GraphQL on AWS Lambda…”) e o singular em `README.md:71–73` (“React 17 SPA (micro-frontend)”, linhas da tabela de componentes). A última alteração do README é `1ce0772` (2026-09-04), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 41 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São 39 arquivos Markdown (inclusive `SUMMARY.md` do GitBook e tradução em `fr/`) e duas imagens em `.gitbook/assets/`. Nenhum commit do histórico adicionou outro tipo de arquivo. | ausente |
| Documentação (arquitetura) | `architecture/micro-frontends.md:3`: “three independent micro-frontends, each a separate Create React App (React 17) codebase”; `:7–11`: repositórios `lms-mfe-app`, `lms-mfe-auth`, `lms-mfe-admin`, servidos em `/app`, `/auth`, `/v2-admin`; `:15–17`: builds e deploys separados em S3/CloudFront sob um domínio; `:21–25`: sessão por JWT em `localStorage` e navegação entre MFEs por URLs de ambiente. | fraca |
| Documentação (guias) | `developer-guides/mfe-app.md`, `mfe-admin.md`, `mfe-auth.md`: guias de desenvolvimento dos MFEs externos; `README.md:69–78`: tabela de componentes da plataforma. | contexto |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes no snapshot; os três MFEs e sua configuração estão em outros repositórios, não referenciados por nenhuma configuração versionada aqui. Sem código, não há imports a buscar. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 34 commits alcançáveis (36 em todos os refs), 1 merge, de 2026-08-03 (`1b44191`, “Initial commit”) a 2026-09-07 (SHA `84bd176`, “docs(summary): rename Tutor operations entry”). Autoria: “Eric G” em 19 commits (18 pela interface web, 1 pelo `gitbook-bot`), uma identidade `root` de servidor em 14 e “Salim (CTO)” em 1. Refs remotos `docs/qa-fixes-fr-specs` e `gitbook-home-export` não considerados à parte. `git rev-list --objects $SHA --missing=print` identifica 91 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório; os MFEs são só descritos (`architecture/micro-frontends.md:7–11`) e não há configuração de composição que os referencie. |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config no snapshot. |
| Q4 | No | Nenhum mecanismo configurado; a composição por rotas sob CloudFront e por redirecionamento é descrita em texto (`architecture/micro-frontends.md:15–25`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”; na seção 3.2 do protocolo, a “repositories that are purely documentation without an implementation”, como o final 023 e a exclusão de conteúdo de 075/081/094/105.
- A documentação descreve uma arquitetura MFE real em outros repositórios, mas o critério de Q1 exige unidades no repositório ou referenciadas por configuração de composição; aqui não há configuração alguma.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, arrays vazios.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (ecossistema multi-repositório):** os repositórios `lms-mfe-app`, `lms-mfe-auth` e `lms-mfe-admin` citados não aparecem nas rodadas sob nenhum dono (busca por `/lms-mfe-(app|auth|admin)` em `data/discovery/mfe-round-002/candidates.csv`: nenhuma ocorrência; da conta só há `Erik786/univo-docs`, `:34716`); se forem privados ou de outra organização, a arquitetura documentada não é observável no corpus.
- **RQ1 (sinais enganosos):** documentação de produto com página dedicada à arquitetura micro-frontend gera hits terminológicos sem código.
- **RQ2 (documentado, não observado):** composição descrita por rotas sob CloudFront, sessão compartilhada por `localStorage` e URLs de MFEs irmãos em variáveis de build, sem federação em runtime.
