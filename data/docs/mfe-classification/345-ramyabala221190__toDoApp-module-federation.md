---
schema: 1
id: 770503403
full_name: ramyabala221190/toDoApp-module-federation
url: https://github.com/ramyabala221190/toDoApp-module-federation
commit: 9a6aa1517cf821c621d786afe272ad644157be12
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 345 — ramyabala221190/toDoApp-module-federation

## Contexto

Remote Angular 16 com `@angular-architects/module-federation` que expõe um módulo de lista de tarefas, com deploy próprio em Docker/nginx e Helm. A descrição o apresenta como “the first micro-frontend of the module federation demo”, e o README remete o roteamento e o deploy aos repositórios do shell e de outro remote (`README.md:24`, “All deployment, routing info given in users-app and shell-app repo”), que não estão neste snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:346` registra rank 345, ID 770503403, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:346` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:8000` e `data/discovery/mfe-round-002/candidates.csv:8006`, ambos com `terminology;technology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos cinco hits em cada rodada, todos do endpoint `repositories`, subconsulta `…#created:2024-03` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:24:22.070Z / 2026-10-08T15:36:53.374Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:06:23.788Z / 2026-10-08T15:46:29.084Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:18:52.971Z / 2026-10-08T15:53:11.159Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:49:49.032Z / 2026-10-08T16:04:51.115Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:16:14.988Z / 2026-10-08T16:13:27.818Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2024-03-01..2024-03-31`. Metadados do hit: descrição “This is the first micro-frontend of the module federation demo”, sem tópicos, linguagem TypeScript, sem licença, `fork: false`, tamanho 248, 1 estrela, criação em 2024-03-11T17:02:33Z, push em 2026-01-11T16:22:30Z.

Correspondência textual:
- “module federation” e “micro-frontend” (singular, hifenizado) aparecem na descrição.
- “microfrontends” aparece literalmente no README só dentro de caminhos de diretório Windows (`README.md:2`, `4`, `22`, “…\angular\microfrontends\module-federation-updated…”).
- O singular unido “microfrontend” e o plural separado “micro frontends” não aparecem literalmente; esses hits dependem do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `582aa47` (2026-01-11, “updated documentation”), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 58 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único workspace Angular na raiz (`angular.json`, `package.json`, `src/`), mais `docker/`, `nginx/`, `charts/` e dois workflows. | contrária |
| Configuração (remote) | `webpack.config.js:13–16`: `uniqueName: "toDoApp"`, `publicPath: "/toDoApp/"`; `:29–37`: `ModuleFederationPlugin` com `library: { type: "module" }`, `name: "toDoApp"`, `filename: "remote-toDoApp.js"`, `exposes: { './myToDoModule': './src/app/to-do/to-do.module.ts' }`; `:39–43`: `remotes` só em comentário; `:45–56`: Angular e `module-federation-config-lib` compartilhados como singleton. `angular.json:18`, `68`, `80–81`: builders `ngx-build-plus` e porta 5006. | moderada |
| Código-fonte | `src/main.ts:1–2` → `src/bootstrap.ts:1–7`: bootstrap assíncrono de remote. `src/app/to-do/to-do.module.ts:10–44`: módulo com rotas filhas (`list`, `detail/:id`) e token `appName`, o artefato exposto; `src/app/app-routing.module.ts:4–7`: o próprio app também o carrega em modo isolado. | moderada |
| Build/deploy | `docker/Dockerfile:25–37`: build e cópia para `/usr/share/nginx/html/toDoApp`, coerente com o `publicPath`; `charts/angular-todo-app-module-federation/`: chart Helm próprio; `.github/workflows/app-build-deploy.yml:1`, `55–72`: build e push de imagem própria. | moderada |
| Composição (host externo) | Nenhum host no repositório; busca por `remotes` e `loadRemoteModule` só encontra o bloco comentado (`webpack.config.js:39–43`). O README remete ao `shell-app` (`README.md:24`); a conta tem `ramyabala221190/shell-app-module-federation` e `users-module-federation` nas rodadas (`data/discovery/mfe-round-002/candidates.csv:8005`, `8007`), fora da amostra e não inspecionados. | ausente |
| Código-fonte (fronteiras) | Busca por `../` em `*.ts`, `*.js` e `*.json` (exceto lockfile): só `src/app/to-do/to-do-container/to-do-container.component.ts:5`, interno. Há uma única unidade. | contexto |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 62 commits alcançáveis (62 em todos os refs), nenhum merge, todos de `Ramya <ramya.bala221190@gmail.com>`, de 2024-03-11 (`0a860c2`, “initial commit”) a 2026-01-11 (SHA `9a6aa15`, “updated”). A configuração federada existe desde `eba93dc` (2024-03-11, “first commit”). `git rev-list --objects $SHA --missing=print` identifica 148 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; a configuração de composição só tem `exposes` (`webpack.config.js:35–37`) e não referencia outras unidades. |
| Q2 | Yes | Para a unidade: entrada, build, imagem Docker e chart Helm próprios (`docker/Dockerfile`; `charts/…`; workflow). |
| Q3 | Undetermined | O shell não está no repositório (`README.md:24`). |
| Q4 | Undetermined | Lado remote configurado (`exposes`, `remote-toDoApp.js`, `publicPath`); o consumidor não é observável. |
| Q5 | No | Unidade preparada para composição por host externo, não instância de MFE no repositório. |

## Motivo

- `MFE-unit` pela regra “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`)… but the composing host is not observable”, como nos finais 001 e 050.
- Corresponde a “repositories containing only a remote unit, without the composing host”. O remote expõe um módulo de funcionalidade com rotas próprias, não utilitários (contraste com 089/100).
- `approaches: [module-federation]`, `ui_technologies: [angular]`, `build_tools: [webpack]` (`ngx-build-plus` com `webpack.config.js`), `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (“module federation demo”).
- Não há decisão aberta.

## Notas para análise

- **Protocolo (ecossistema multi-repositório):** shell e outro remote da mesma demo estão em repositórios separados da mesma conta, presentes nas rodadas e fora da amostra (`candidates.csv:8005`, `8007`); a análise de família poderia observar a composição completa.
- **RQ2:** remote Angular com MF em formato ESM (`library: { type: "module" }`, `outputModule`), `publicPath` por subcaminho e configuração em runtime via `config.json` gerado no contêiner (`docker/startup.envsh:2`).
- **RQ1:** o termo “microfrontends” do README vem de caminhos de diretório copiados do terminal.
