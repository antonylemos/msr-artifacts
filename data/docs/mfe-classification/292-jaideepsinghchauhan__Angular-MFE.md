---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
url: https://github.com/jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 292 — jaideepsinghchauhan/Angular-MFE

## Contexto

Monorepo Nx 21 com Angular 20 e Module Federation (`@nx/module-federation`): um host (`appshell/host`) e dois remotes (`appshell/mfe1`, `appshell/mfe2`), mais duas bibliotecas compartilhadas, uma de dados e outra de UI (`README.md:1–3`; `libs/shared/data`, `libs/shared/ui`). O host carrega as rotas expostas pelos remotes por lazy loading. Há também `apps/angular-monorepo`, a aplicação padrão gerada pelo Nx, sem relação de composição. O README é um tutorial de montagem do workspace. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:293` registra rank 292, ID 1010507438, status `cloned`, branch `master` (a padrão) e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:293` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:15772` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:15776` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-06` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-06-01..2025-06-30` | 2026-10-07T23:18:22.174Z / 2026-10-08T16:15:05.653Z |

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 265, criação em 2025-06-29T08:08:34Z, push em 2025-06-29T08:22:08Z.

Sem descrição, o acerto vem do README: “module federation” em `README.md:134` (“the mapping in host module federation config file for both mfes”), `:138` e `:171` (“Update mfe1 module federation with this new route”).

A última alteração do README é o SHA (2025-06-29T13:52:07+05:30, isto é, 08:22:07Z), igual ao `pushed_at` e anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 141 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Workspace Nx (`nx.json`, `package.json`, `tsconfig.base.json`) com `appshell/host`, `appshell/mfe1`, `appshell/mfe2` (cada um com `project.json`, `module-federation.config.ts`, `webpack.config.ts`, `webpack.prod.config.ts` e `src/`), projetos e2e, `libs/shared/data`, `libs/shared/ui` e `apps/angular-monorepo` (app padrão do Nx). | contexto |
| Configuração (host) | `appshell/host/module-federation.config.ts:3–18`: `name: 'host'`, `remotes: ['mfe1', 'mfe2']`. `appshell/host/webpack.config.ts:1–9` e `webpack.prod.config.ts:9–24`: `withModuleFederation(config)`. `appshell/host/project.json:10`, `:15`, `:25–26`: build `@nx/angular:webpack-browser` com entry própria; `:59–64`: `module-federation-dev-server` na porta 4200. | forte |
| Configuração (remotes) | `appshell/mfe1/module-federation.config.ts:3–10`: `name: 'mfe1'`, `exposes: { './Routes': …/entry.routes.ts, './GreetingComponent': …/greeting.component.ts }`. `appshell/mfe2/module-federation.config.ts:3–8`: `name: 'mfe2'`, `exposes: { './Routes': …/entry.routes.ts }`. Builds próprios (`appshell/mfe1/project.json:10`, `:15`; portas 4201 e 4202 em `appshell/mfe1/project.json:63` e `appshell/mfe2/project.json:63`). | forte |
| Código-fonte (composição) | `appshell/host/src/main.ts:1` → `bootstrap.ts:1–5`. `appshell/host/src/app/app.routes.ts:5–12`: rotas `mfe2` e `mfe1` com `loadChildren: () => import('mfe2/Routes')` / `import('mfe1/Routes')`, que obtêm `remoteRoutes`, exportado por `appshell/mfe1/src/app/remote-entry/entry.routes.ts:4`. `appshell/host/src/app/app.html:1–5`, `:17`: menu e `router-outlet`. | forte |
| Configuração (elo divergente) | `appshell/host/src/app/app.routes.ts:13–17` importa `mfe1/GreetingRoutes` (declarado em `appshell/host/src/remotes.d.ts:8–11`), mas `mfe1` expõe `./GreetingComponent`, não `./GreetingRoutes` (`appshell/mfe1/module-federation.config.ts:5–8`). O próprio README orienta adicionar `./GreetingRoutes` (`README.md:171–176`) e mostra o arquivo com `./GreetingComponent` (`:181–189`). A rota `/greeting` não tem módulo correspondente; as rotas `mfe1` e `mfe2` têm. | ambígua |
| Código-fonte (fronteiras) | Busca ativa de imports relativos `../../` em `appshell`, `apps` e `libs`: só `eslint.config.mjs` importando a configuração da raiz. O host e `mfe1` usam as bibliotecas compartilhadas por alias (`appshell/host/src/app/app.ts:4–5`; `appshell/mfe1/src/app/remote-entry/entry.ts:4`; `tsconfig.base.json:18–19`). `tsconfig.base.json:20–21` mapeia `mfe1/Routes` e `mfe2/Routes` para os fontes dos remotes, convenção do Nx para tipagem; no build, `withModuleFederation` trata esses módulos como remotos. Não há import direto de arquivos de um app no outro. | contexto |
| Documentação | `README.md:1–3`: “1 host/Appshell and 2 MFE's and 2 Libraries”; `README.md:131–144`: passos de geração do host e dos remotes e explicação da conexão por remote entry e lazy loading. | moderada |

## Autoria e histórico

Clone não raso. São 4 commits (4 em todos os refs), nenhum merge:
- `f716548` (2025-06-17, “Initial commit”) e `6a85acf` (2025-06-29, “Initial commit”, que adiciona o workspace) são de `Singh, Jaideep <jaideep.singh@dell.com>`, com o mesmo committer;
- `0a0848e` e o SHA `7648339` (2025-06-29, “Update README.md”) são de `Jaideep singh <johny.s.chauhan@gmail.com>`, com committer `GitHub`.

`git rev-list --objects $SHA --missing=print` lista 7 objetos ausentes, nenhum na árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades: `host`, `mfe1` e `mfe2`, os remotes referenciados em `remotes: ['mfe1', 'mfe2']` (`appshell/host/module-federation.config.ts:17`). `apps/angular-monorepo` e as bibliotecas não são contados. |
| Q2 | Yes | Cada unidade tem `project.json`, entry, webpack config e build próprios (por exemplo, `appshell/host/project.json:10–26`; `appshell/mfe1/project.json:10–26`). Não há import de código-fonte entre apps; o compartilhamento é por bibliotecas e o mapeamento de tipos do Nx (busca registrada). |
| Q3 | Yes | O host roteia e carrega as rotas dos remotes (`appshell/host/src/app/app.routes.ts:5–12`; `app.html:1–5`, `:17`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nomes e módulo exposto `./Routes` correspondentes para `mfe1` e `mfe2` (`appshell/mfe1/module-federation.config.ts:4–6`; `appshell/mfe2/module-federation.config.ts:4–6`; `app.routes.ts:7`, `:11`). O elo adicional `mfe1/GreetingRoutes` não corresponde a nenhum `exposes`, mas não invalida as duas conexões principais. |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- Cadeia completa como em 076/084/096/106/109 para as rotas `mfe1` e `mfe2`.
- A divergência `GreetingRoutes` × `GreetingComponent` atinge só uma rota extra, diferente de 103/193, em que a ligação principal era incerta.
- Não é code sharing (089/100): os remotes expõem rotas montadas pelo router do host. As bibliotecas compartilhadas (botão e `UserService`) são integração em build time paralela, não o mecanismo de composição.
- `frontend_units: 3`, `unit_organization: monorepo`, `ui_technologies: [angular]`, `build_tools: [webpack]` (`@nx/angular:webpack-browser`), `approaches: [module-federation]`, `repo_type: example` (tutorial em `README.md`).
- Não há decisão aberta que altere a classe.

## Notas para análise

- **RQ1:** o README tutorial diverge do código (`README.md:171–176` pede `./GreetingRoutes`; a configuração tem `./GreetingComponent`), e o host importa o módulo inexistente. Citar o README como configuração levaria a uma cadeia aparentemente completa também para `/greeting`.
- **RQ3:** os mapeamentos `mfe1/Routes` e `mfe2/Routes` em `tsconfig.base.json:20–21` apontam para os fontes dos remotes por convenção do Nx. Uma busca automática por imports cruzados os veria como acoplamento; o empacotamento por `withModuleFederation` trata esses specifiers como remotos.
- **Checklist:** se os pesquisadores entenderem que um elo exposto/consumido divergente deve tornar Q4 Undetermined mesmo quando outros elos conectam, como em 193, a classe passaria a `Uncertain`. Este rascunho não adota essa leitura, porque as rotas principais correspondem.
- **Protocolo (busca):** entrada só pela consulta de tecnologia `"module federation"` no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
