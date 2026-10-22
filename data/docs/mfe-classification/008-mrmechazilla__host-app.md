---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
url: https://github.com/mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 3
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 008 — mrmechazilla/host-app

## Contexto

- **Abordagem de implementação:** Module Federation (`@angular-architects/module-federation`, Angular 19) com manifesto dinâmico
- **Tipo de repositório:** example/proof of concept (5 commits, remotes em `localhost`, README só com o título)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:14`: `@angular-architects/module-federation` ^19; `:18` Angular 19; `:10` script `run:all` com o `mf-dev-server` | fraca |
| Estrutura | Uma única app Angular no repositório: o host (shell) com `header`, `footer` e `unavailable` | contexto |
| Configuração (host) | `webpack.config.js:3-12`: `withModuleFederationPlugin` com `name: 'host-mfe'`, `exposes` vazio e `shareAll` singleton; sem `remotes` estáticos (resolvidos pelo manifesto) | moderada |
| Configuração (manifesto) | `public/mf.manifest.json:2-10`: remote `users-mfe` (`localhost:4202/remoteEntry.js`, `./users`, `usersRoutes`, `type: routes`); `:11-19`: remote `payments-mfe` (`localhost:4203`, `./payments`, `PaymentsModule`, `type: module`) | forte |
| Código-fonte (bootstrap) | `src/main.ts:2-6`: `loadManifest("mf.manifest.json")` antes de `import('./bootstrap')` | forte |
| Código-fonte (composição) | `src/app/app.routes.ts:5-14`: rota `''` com `loadChildren` → `loadRemoteModule({ type: 'manifest', remoteName: 'users-mfe', exposedModule: './users' })` → `m.usersRoutes`, com fallback em erro | forte |
| Código-fonte (layout) | `src/app/app.component.html:1-2`: `<app-header>` do host + `<router-outlet>` onde as rotas do remote são montadas; `header.component.html:8-9` com links `/users` e `/payments` | moderada |
| Código-fonte | `src/app/core/models/remote-config.ts:1-9` modela tipos de integração (`module`, `routes`, `component`); `src/app/shared/utils/remote-loader.ts:1-28` é um loader genérico com fallback, **inteiro comentado** (em evolução) | ambígua |
| Composição (lacuna) | `payments-mfe` está no manifesto e no header, mas nenhuma rota do host o carrega; pode ser carregado pelas rotas do próprio `users-mfe`, o que não é observável aqui | ambígua |
| Build/deploy | Nenhum CI/CD, Dockerfile ou config de hospedagem; `webpack.prod.config.js:1` reusa a config de dev | fraca |
| Documentação | `README.md:1`: só "# Host Application Documentation" | ausente |
| Histórico | `2227f83` "add and configure module federation"; `292d70d` "ingest a routing file from remote microfrontend"; `4885b01` "update integration setup for users mfe" | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | O host no repositório + `users-mfe` (e `payments-mfe`) referenciados pela config de composição (`public/mf.manifest.json:2-19`) |
| Q2 | Yes | O host tem entry e build próprios; os remotes são externos e servidos separadamente (`localhost:4202`/`4203`), o que conta como Yes pelo critério operacional |
| Q3 | Yes | O host monta as rotas do `users-mfe` no seu `router-outlet` (`app.routes.ts:5-14`, `app.component.html:1-2`) |
| Q4 | Yes | `loadManifest` (`main.ts:4`) + `loadRemoteModule` em `loadChildren` (`app.routes.ts:8-13`), configurado e em uso para `users-mfe` |
| Q5 | Yes | Q1–Q4 convergem para `users-mfe`; a lacuna de `payments-mfe` não afeta o resultado |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde ao caso listado "repositories containing only the host, which references external remote units".
- É o inverso do repositório 001 (`chart-app`, MFE-unit): aqui a composição é observável, porque o host declara e carrega os remotes. A unidade externa conta para Q1 por estar na config de composição.
- Basta o par host → `users-mfe` para satisfazer o checklist; `payments-mfe` reforça a intenção, mas sua carga não é observável no host.

## Notas para análise

- **RQ1:** a evidência está toda em configuração (manifesto) e código de roteamento; documentação e deploy estão ausentes.
- **RQ3:** relação host → remote mediada por manifesto em runtime, com tipos de integração diferentes por remote (`routes` vs `module`), como no repositório 006 (`eager-workspace1`).
- **Protocolo (corpus):** os remotes `users-mfe` e `payments-mfe` não estão no repositório; a análise de artefatos fica restrita ao lado host.
