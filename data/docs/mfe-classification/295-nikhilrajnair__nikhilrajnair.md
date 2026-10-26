---
schema: 1
id: 444043628
full_name: nikhilrajnair/nikhilrajnair
url: https://github.com/nikhilrajnair/nikhilrajnair
commit: 1338fe6af62c0cdb149009dcd43963698bdcc26c
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

# 295 — nikhilrajnair/nikhilrajnair

## Contexto

- **Tipo de repositório:** não é projeto de software. É o README de perfil do GitHub (repositório `<usuário>/<usuário>`, descrição “My Personal Details”), com apresentação profissional, competências e links de contato. A coincidência entre dono e nome é registrada só como tipo de repositório, não como evidência arquitetural.

`data/samples/mfe-sample-001/clones.csv:296` registra rank 295, ID 444043628, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:296` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:3481` e `data/discovery/mfe-round-002/candidates.csv:3483`, ambos com `terminology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2022-01` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2022-01-01..2022-01-31` | 2026-10-07T22:17:01.804Z / 2026-10-08T15:52:15.597Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2022-01` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2022-01-01..2022-01-31` | 2026-10-07T22:47:12.936Z / 2026-10-08T16:03:58.890Z |

Metadados do hit: descrição “My Personal Details”, sem tópicos, linguagem nula, sem licença, `fork: false`, tamanho 39, criação em 2022-01-03T11:54:46Z, push em 2026-05-10T08:25:59Z.

A única ocorrência do termo no README é `README.md:5`: “My work spans micro-frontends, onboarding workflows, analytics systems…”. A busca de frase trata o hífen como separador, o que casa o plural “micro frontends”; o singular “micro frontend” não aparece isolado e esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA `1338fe6` (2026-05-10, “Revise README for updated profile and focus areas”), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 3005 bytes); zero symlinks e zero gitlinks. | ausente |
| Documentação | `README.md:3–5`: “Product Engineer with 9+ years of experience…”; “My work spans micro-frontends…” como experiência profissional; `README.md:22–34`: badges de tecnologias; `README.md:38–43`: emprego atual; `README.md:53–58`: links externos (site, LinkedIn, CodePen, X), não seguidos. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes no snapshot; sem código, portanto sem imports relativos a buscar. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 26 commits alcançáveis (26 em todos os refs), 3 merges de PR, raiz `8d5902e` (2022-01-03, “Initial commit”). Refs remotos `copilot/update-readme-with-details`, `nikhilrajnair-remove-github-streak` e `nikhilrajnair-we` correspondem aos PRs integrados e não foram considerados à parte. Autoria: `Nikhil Raj A <nikhilrajnair.a@gmail.com>` em 25 commits, todos pela interface web (committer GitHub), e `copilot-swe-agent[bot]` em `61da0f7` (2026-04-30, “docs: update README with current title, skills, and experience”), integrado pelo PR #3. Por `git diff-tree --no-renames --name-status`, todos os commits com alteração só tocam `README.md`; o histórico nunca conteve código. Nenhum blob histórico foi lido. `git rev-list --objects $SHA --missing=print` identifica 22 objetos históricos ausentes; o blob do SHA está presente e foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só `README.md` (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; micro-frontends aparecem só como experiência profissional (`README.md:5`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”, como os perfis 011/064/068/073/077/101/111. Na seção 3.2 do protocolo, cabe em “purely documentation without an implementation”.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, arrays vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** mais um README de perfil (`owner == name`) que entra pela menção hifenizada “micro-frontends” como competência, no padrão já apontado em 011.
- **Protocolo (busca):** o repositório foi criado em 2022 e entra pela partição `created:2022-01` e passa no filtro `pushed:>=2025-04-01` por commits de README de 2026-04/05; não se verificou em qual revisão o termo entrou, porque os blobs históricos estão ausentes no clone parcial. O hit singular não tem grafia literal.
