---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
url: https://github.com/ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 229 — ayushpandey241626/microfrontend-demo

## Contexto

Workspace Angular 19 (Angular CLI, `angular.json`) com quatro projetos em `projects/`:
- `host-app`, o shell (porta 4200);
- `mfe1`, lista de contatos (porta 4201);
- `mfe2`, administração de contatos (porta 4202);
- `login-mfe-app`, login (porta 4203).

A composição usa Module Federation via `@angular-architects/module-federation` e `ngx-build-plus` (`package.json:31`, `42`), com UI em PrimeNG. O shell carrega cada remoto por rota com `loadRemoteModule` (`projects/host-app/src/app/app.routes.ts:13–41`). O README é o padrão gerado pelo Angular CLI, com título “MicrofrontendDemo”. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:230` registra rank 229, ID 994642993, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:230` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14626` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14632` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2025-06` (`created:2025-06-01..2025-06-30`) | — | 2026-10-07T18:37:57.021Z / 2026-10-08T15:38:19.699Z |
| `technology-angular-module-federation-package-code`: `"@angular-architects/module-federation" filename:package.json` | `…#size:1300..1449` | `package.json` | 2026-10-07T22:10:20.188Z / 2026-10-08T15:53:29.846Z |
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `…#size:900..999` | `projects/host-app/webpack.config.js` | 2026-10-07T22:25:19.514Z / 2026-10-08T16:07:25.274Z |

O `package.json` (1.357 bytes) declara `@angular-architects/module-federation` (`:31`). `projects/host-app/webpack.config.js` (934 bytes) contém `ModuleFederationPlugin` com `remotes` (`:6`, `20–25`).

Metadados do hit de repositório:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 259;
- criação em 2025-06-02T08:58:47Z, push em 2025-06-10T09:29:18Z.

Grafia: o README só tem “MicrofrontendDemo” (`README.md:1`), título gerado pelo Angular CLI a partir do nome do projeto. O hit terminológico `microfrontend` depende desse token composto ou do nome do repositório, conforme o processamento da busca do GitHub, que não está registrado. O README vem do commit-raiz `bfddd76` (2025-05-27) e não foi alterado depois, sendo anterior às coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 104 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um workspace Angular com um `package.json`/lockfile na raiz e quatro projetos em `projects/` (`host-app`, `mfe1`, `mfe2`, `login-mfe-app`), cada um com `src/main.ts` → `bootstrap.ts`, `webpack.config.js` e `webpack.prod.config.js`. | contexto |
| Configuração (host) | `projects/host-app/webpack.config.js:20–33`: `ModuleFederationPlugin` com `remotes` `mfe1@…:4201`, `mfe2@…:4202`, `loginMfeApp@…:4203` e `shareAll` singleton. | forte |
| Configuração (remotos) | `projects/mfe1/webpack.config.js:6–21`: `withModuleFederationPlugin({ name: "mfe1", exposes: { "./ContactsModule": …/contact-list.routes.ts } })`. `projects/mfe2/webpack.config.js:6–21`: `./AdminModule`. `projects/login-mfe-app/webpack.config.js:6–21`: `./LoginModule`. | forte |
| Build | `angular.json`: um projeto por unidade com builder `ngx-build-plus:browser` e `ngx-build-plus:dev-server`, nas portas 4200 (`:76`), 4201 (`:177`), 4202 (`:278`) e 4203 (`:383`). `package.json:10`: `run:all` com o `mf-dev-server` da biblioteca. | forte |
| Código-fonte (composição) | `projects/host-app/src/app/app.routes.ts:13–41`: rotas `contacts`, `admin` e `login` com `loadRemoteModule({ type: 'module', exposedModule, remoteEntry: 'http://localhost:420x/remoteEntry.js' })`; as duas primeiras protegidas por `AuthGuard`. `projects/host-app/src/main.ts:1`: bootstrap assíncrono. | forte |
| Código-fonte (fronteiras) | Imports relativos só dentro de cada projeto (por exemplo, `projects/mfe1/src/app/contact-list/contact-list.component.ts:2` → `../contact.service`). Não há `paths` no `tsconfig.json` nem imports entre projetos. Os remotos compartilham só dependências npm do workspace. | contexto |

## Autoria e histórico

Clone não raso; 22 commits lineares, nenhum merge, de Ayush Pandey, 21 com `<ayushpandey667@gmail.com>` e o commit-raiz `bfddd76` com `<aypandey@synoptek.com>`, de 2025-05-27 (`bfddd76`, “initial commit”) a 2025-06-10 (SHA `ec39a27`, refatoração dos componentes `Mfe1Component`/`Mfe2Component`). As mensagens descrevem a evolução de funcionalidades: login MF (`f269b80`), CRUD de contatos, guard de autenticação e testes. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` identifica 83 objetos históricos ausentes; metadados e nomes e status das alterações foram inspecionados com renames desativados, sem comparar todo o conteúdo antigo, e as evidências citadas do SHA atual foram lidas.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades no workspace, três referenciadas pela configuração de composição do host (`projects/host-app/webpack.config.js:21–25`; `app.routes.ts:17–40`). |
| Q2 | Yes | Cada projeto tem entrada, configuração de federação e alvos de build/serve próprios em `angular.json`, sem imports de código-fonte entre projetos. |
| Q3 | Yes | O shell roteia `contacts`, `admin` e `login` para os remotos (`app.routes.ts:13–41`). |
| Q4 | Yes | Module Federation configurado no host e nos remotos (`exposes` via `withModuleFederationPlugin`), consumido por `loadRemoteModule`. |
| Q5 | Yes | Q1–Q4 são Yes: shell Angular com três remotos carregados por rota. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- Os remotos expõem módulos de rotas com telas próprias (lista, administração e login de contatos), não componentes compartilhados (089/100).
- O build é independente por projeto, embora o workspace tenha um só `package.json`; essa forma é comum em workspaces Angular e não se confunde com um build único.
- `approaches: [module-federation]`, `ui_technologies: [angular]`, `build_tools: [webpack]` (configurações `webpack.config.js` explícitas via `ngx-build-plus`), `frontend_units: 4`, `unit_organization: monorepo`, `repo_type: example` (demonstração com dados de contato fictícios, `projects/mfe1/src/app/contact-list/contact-data.ts`).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** `@angular-architects/module-federation` com remotos ESM (`type: 'module'`) carregados por URL em `loadRemoteModule`; o mapa estático de `remotes` do host convive com o carregamento dinâmico nas rotas.
- **Protocolo (busca):** o hit terminológico não tem grafia literal separada (“MicrofrontendDemo”). A elegibilidade muda de `unknown` (001) para `pass` (002). O branch padrão é `master`.
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, Angular/webpack, quatro unidades e `monorepo`; sem decisão aberta (`draft`). A composição efetivamente consumida é a carga ESM por URL nas rotas, com módulos expostos que exportam arrays de rotas compatíveis (default export em `:4–6` dos três arquivos de rotas, `provideRouter` do host e `router-outlet:30`). Correções verificadas: o e-mail não é o mesmo em todos os commits (21 com `ayushpandey667@gmail.com` e o commit-raiz `bfddd76` com `aypandey@synoptek.com`; dois e-mails não provam duas pessoas); o clone tem 83 objetos históricos ausentes. Ressalva sobre o mapa estático paralelo: `projects/host-app/webpack.config.js:21–25` usa containers globais (`mfe1@…`, `mfe2@…`, `loginMfeApp@…`), e o nome `loginMfeApp` não coincide com `login-mfe-app` (`projects/login-mfe-app/webpack.config.js:7`); não há imports ativos desses aliases no host, e é resíduo de configuração que não quebra a cadeia realmente usada nas rotas. A classe não implica validar esse mapa nem afirmar sucesso de compilação ou deploy.
