---
schema: 1
id: 1254367910
full_name: MistyBIT/vkr_demo_1780147798
url: https://github.com/MistyBIT/vkr_demo_1780147798
commit: 083c24b16df8aa3543f7792b213036de3389a5ea
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 331 — MistyBIT/vkr_demo_1780147798

## Contexto

Repositório gerado automaticamente a partir de um template de “ferramenta ATM” (descrição “ATM tool scaffold: vkr_demo_1780147798”; commit único de `ATM Scaffold <atm-scaffold@local>`): um remote React com Webpack Module Federation (`mf/`) e um microsserviço Express/PostgreSQL (`service/`) que devolve os metadados da ferramenta registrados na tabela `tools.tools` (`README.md:1–3`). O host (“host ATM”) não está no repositório; o README descreve o registro do `remoteEntry.js` no banco desse host (`README.md:54–58`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:332` registra rank 331, ID 1254367910, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:332` registra a estratégia `technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30963` (`technology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:30971` (`technology`, `unknown`, `author_indeterminate`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-05` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T23:26:24.296Z / 2026-10-08T16:18:08.915Z |

Metadados do hit: descrição “ATM tool scaffold: vkr_demo_1780147798”, sem tópicos, linguagem JavaScript, sem licença, `fork: false`, tamanho 70, criação em 2026-05-30T13:30:00Z, push em 2026-05-30T13:30:02Z.

“Module Federation” aparece literalmente em `README.md:3` (“**React + Webpack Module Federation** (микрофронт)”) e `README.md:58` (“В **Module Federation** имя remote…”). O README veio no único commit, o próprio SHA (2026-05-30), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 25 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um projeto frontend (`mf/`: `package.json`, `webpack.config.js`, `src/`, `public/`, `Dockerfile`, `nginx.conf`) e um backend (`service/`), com `docker-compose.yml` na raiz. | contrária |
| Configuração (remote) | `mf/webpack.config.js:54–64`: `ModuleFederationPlugin` com `name` vindo de `ATM_TEMPLATE_REMOTE_NAME` (padrão `remote_template`, `:21–22`), `filename: 'remoteEntry.js'`, `exposes: { './App': './src/App.js' }`, `shared` React/ReactDOM singleton; sem `remotes`. `:11–15`, `29`: `publicPath` absoluto para carregar chunks quando embutido em outro origin; `:31`: `uniqueName: 'atm_remote'`. | moderada |
| Código-fonte | `mf/src/index.js:1` e `mf/src/bootstrap.js:1–14`: entrada assíncrona de remote e montagem isolada em `#root`; `mf/src/App.js:9–114`: tela que só exibe os metadados da ferramenta; `mf/src/toolProfileApi.js:1–21`: chama `/v1/tool-profile` no origin do MF, explicitamente para funcionar quando embutido no host (comentário `:2–5`). | moderada |
| Build/deploy | `mf/Dockerfile:1–30`: build do MF e nginx; `mf/nginx.conf:17–21`: CORS `*` para servir `remoteEntry` e chunks a outro origin; `docker-compose.yml:16–27`: serviço `tool-mf` próprio. | moderada |
| Composição (host externo) | Nenhum host no repositório. `README.md:54–58`: publicar `remoteEntry.js`, gravá-lo no campo `frontend_remote_entry` da ferramenta no banco do “host ATM” e alinhar o nome do remote a `config.ui.remoteKey`. `service/src/db.js:32–37`: lê esses campos de `tools.tools`. O nome do remote permanece o padrão do template (`remote_template`), não substituído como o README pede (`README.md:58`). | ausente |
| Código-fonte (fronteiras) | Busca por `../` em `*.js` e `*.json` (exceto lockfiles): nenhuma ocorrência. Há um só projeto frontend; o backend é consumido por HTTP. | contexto |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 1 commit (1 em todos os refs), nenhum merge: o próprio SHA `083c24b` (2026-05-30T13:29:59Z, “chore: scaffold tool vkr_demo_1780147798 from ATM template”), autor e committer `ATM Scaffold <atm-scaffold@local>`, adicionando os 25 arquivos. É saída automática de uma ferramenta de scaffold, sem commit humano; a rodada 002 registra `author_indeterminate`. A mesma conta tem dezenas de repositórios com o mesmo padrão de nome e descrição nas rodadas (por exemplo, `MistyBIT/atm_template`, `MistyBIT/my_tool`, `MistyBIT/vkr_demo` e `vkr_demo_<número>`, `data/discovery/mfe-round-002/candidates.csv:28789`, `28794`, `30932`, `30936`, `30971`, `31550`; 44 repositórios da conta na rodada 002); só este está na amostra (`sample.csv:332`). `git rev-list --objects $SHA --missing=print` não identifica objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; a configuração de composição só tem `exposes` (`mf/webpack.config.js:57–59`) e não referencia outras unidades. |
| Q2 | Yes | Para a unidade: entrada, webpack, Dockerfile e serviço próprios (`mf/Dockerfile`; `docker-compose.yml:16–27`). |
| Q3 | Undetermined | O host ATM não é observável; o README só descreve o registro (`README.md:54–58`). |
| Q4 | Undetermined | Lado remote configurado (`exposes`, `remoteEntry.js`, `publicPath` absoluto, CORS); o consumidor não é observável. |
| Q5 | No | Unidade preparada para composição por host externo, não instância de MFE no repositório. |

## Motivo

- Proposta `MFE-unit` com `status: review`: pela letra do checklist, é “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, como nos finais 001 e 050.
- A preparação é explícita e implementada (`exposes`, `remoteEntry.js`, `publicPath` absoluto, CORS, chamada de API pelo origin do MF), não apenas mencionada.
- A revisão se justifica por dois pontos que dependem de juízo do pesquisador (ver abaixo): o host é uma plataforma que registra ferramentas como remotes, e o repositório é saída automática não modificada de um scaffold.
- `repo_type: template` (cópia gerada do template de ferramenta, sem personalização), `frontend_units: 1`, `unit_organization: single-unit`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`.

## Notas para análise

- **Protocolo (família e duplicatas):** a conta tem dezenas de repositórios gerados pelo mesmo scaffold, com nomes por timestamp (`vkr_demo_<número>`, `vkr_profile_…`, `vkr_scale_…`), aparentemente criados em execuções de teste da ferramenta; a filtragem automática não os agrupou.
- **RQ2:** remote Module Federation com `publicPath` absoluto e API própria acessada pelo origin do MF, para funcionar quando embutido em host de outro origin (`mf/webpack.config.js:11–18`; `mf/src/toolProfileApi.js:2–8`).
- **RQ3:** registro do remote no host por banco de dados (`frontend_remote_entry`, `config.ui.remoteKey` em `tools.tools`), não por configuração estática do host.

## Ponto para revisão conjunta

1. **Host de plataforma:** o host ATM registra ferramentas como remotes por banco (`README.md:54–58`). Se ATM for tratado como plataforma que usa Module Federation como mecanismo de extensão, aplica-se a regra de plugins de plataforma do final 037 e a classe passa a `Non-MFE`. Não é observável no snapshot se ATM é plataforma de terceiros ou o próprio projeto do titular (a conta tem `MistyBIT/atm_template` nas rodadas, não inspecionado).
2. **Saída de scaffold não modificada:** o repositório é cópia automática do template (autor `ATM Scaffold`, nome de remote padrão `remote_template`). Decidir se uma unidade gerada e não personalizada conta como unidade preparada (`MFE-unit`) ou se segue os casos de gerador/template (075/081/105; 079/117), levando a `Non-MFE`.

Não se propõe regra nova; até a decisão, preservar `MFE-unit`/`review`.
