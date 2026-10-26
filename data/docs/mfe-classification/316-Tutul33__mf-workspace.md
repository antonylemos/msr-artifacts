---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
url: https://github.com/Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 316 — Tutul33/mf-workspace

## Contexto

Workspace Angular 20 com `@angular-architects/native-federation`, montado como guia passo a passo (`README.md:1–3`). Tem três projetos em `projects/`:
- `host-app` (porta 4200);
- `customer-app` (porta 4301);
- `orders-app` (porta 4302).

O host carrega por rota os módulos de rotas expostos pelos dois remotos, com `loadRemoteModule`. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:317` registra rank 316, ID 1098942873, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:317` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21202` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:21208` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-11` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:17:25.775Z / 2026-10-08T15:40:03.503Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:45.099Z / 2026-10-08T15:48:26.230Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem HTML, `fork: false`, tamanho 143;
- criação em 2025-11-18T10:49:50Z, push em 2025-11-18T11:00:09Z.

Grafias no README:
- “Microfrontend”: `README.md:1` (“# Angular 20 + Native Federation (Microfrontend) — Step-by-Step Guide”) e `README.md:3` (“…microfrontend setup…”);
- “microfrontends”: `README.md:258` (“- Two remote microfrontends”).

A última alteração do README é o próprio SHA (2025-11-18), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 65 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três projetos em `projects/` (54 arquivos), cada um com `federation.config.js`, `src/main.ts` → `bootstrap.ts` e tsconfigs próprios. Na raiz ficam um `angular.json`, um `package.json` e um guia (`angular_20_microfrontend_app_guide.md`). | contexto |
| Builds | `angular.json`: os três projetos usam o builder `@angular-architects/native-federation:build` (`:18`, `131`, `244`) sobre `@angular/build:application` (`:60`, `173`, `286`), com `dev-server` nas portas 4200, 4301 e 4302 (`:114`, `227`, `340`). | forte |
| Remotos | `projects/customer-app/federation.config.js:5–10`: `name: 'customer-app'`, `exposes: { './CustomerRoutes': …customer-routes.module.ts }`. `projects/orders-app/federation.config.js:5–10`: `name: 'orders-app'`, `exposes: { './OrdersRoutes': … }`. Os módulos expostos são `RouterModule.forChild` com a página `Home` (`customer-routes.module.ts:5–12`; `orders-routes.module.ts:5–12`). | forte |
| Host | `projects/host-app/src/app/app.routes.ts:2–20`: rotas `customers` e `orders` com `loadChildren: () => loadRemoteModule({ remoteEntry: 'http://localhost:4301/remoteEntry.json', exposedModule: './CustomerRoutes' })` e o mesmo para `4302`/`./OrdersRoutes`. `app.html:1–3`: links e `<router-outlet>`. `federation.config.js:3–27`: `shareAll` singleton. | forte |
| Inconsistência | `projects/host-app/src/main.ts:3–5`: `initFederation({ customerApp: 'http://localhost:4200/remoteEntry.json' })` aponta para a porta do próprio host, com um nome que não corresponde a nenhum remoto. As rotas não usam esse mapa: passam a URL do `remoteEntry` diretamente ao `loadRemoteModule`. | ambígua |
| Código-fonte (fronteiras) | Busca por imports com `../../` em `projects/`: nenhum. Cada projeto só importa os próprios arquivos e pacotes npm. As dependências ficam num único `package.json` de workspace, como é padrão no Angular CLI. | contexto |

## Autoria e histórico

Clone não raso; 5 commits lineares, nenhum merge, todos de Tutul Chakma, em 2025-11-18, de `1137709` (“initial commit”) ao SHA `eb6d1cc` (“Commit”). Só há o branch `master`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Host e dois remotos no repositório, referenciados pelas rotas do host (`app.routes.ts:9–10`, `17–18`). |
| Q2 | Yes | Cada projeto tem entry (`main.ts` → `bootstrap.ts`), build `native-federation` e porta próprios em `angular.json`, sem import de código-fonte entre projetos. |
| Q3 | Yes | O host roteia e monta os módulos remotos em `customers` e `orders` (`app.routes.ts:4–20`; `app.html:3`). |
| Q4 | Yes | Native Federation: `loadRemoteModule` com `remoteEntry`/`exposedModule` coerentes com o `exposes` dos remotos e as portas do `angular.json`. |
| Q5 | Yes | Q1–Q4 são Yes: host e remotos compostos em runtime, com cadeia completa no snapshot. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- O `initFederation` com URL errada não impede a composição, porque as rotas carregam os remotos por URL direta.
- **Campos:** `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (como no final 059, Angular `application` builder com Native Federation), `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example` (guia passo a passo).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** Native Federation no Angular 20 com módulos de rotas (`NgModule` + `RouterModule.forChild`) expostos e carregados via `loadChildren`.
- **Protocolo (busca):** as duas grafias estão literalmente no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
