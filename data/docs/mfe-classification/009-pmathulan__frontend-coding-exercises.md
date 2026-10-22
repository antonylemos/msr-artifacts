---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
url: https://github.com/pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 009 — pmathulan/frontend-coding-exercises

## Contexto

- **Abordagem de implementação:** Module Federation (`@angular-architects/module-federation` + `ngx-build-plus`, Angular 19)
- **Tipo de repositório:** example/proof of concept (exercícios de avaliação técnica, `README.md:3`)
- **Commit avaliado:** `89a3c27` (único commit do repositório)

## Evidências observadas

O repositório reúne seis exercícios independentes (`angular-frontend-practical/`, `microfrontend-workspace/`, `rate-limited-scheduler/`, `react-performance-practical/`, `spa-helm/`, `ssr-app/`). Só `microfrontend-workspace/` tem evidência de MFE; os caminhos abaixo são relativos a ele, salvo indicação.

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:14`: `@angular-architects/module-federation` ^19.0.3; `:10` script `run:all` com o `mf-dev-server` | fraca |
| Estrutura | Workspace Angular com `projects/shell`, `projects/mfe1` (apps) e `projects/shared` (lib); cada app tem `main.ts`, `bootstrap.ts`, `webpack.config.js` e `webpack.prod.config.js` próprios | forte |
| Configuração (build) | `angular.json:18` builder `ngx-build-plus:browser`; `:42`, `:60`, `:85` `extraWebpackConfig` apontando para o webpack de cada projeto | moderada |
| Configuração (host) | `projects/shell/webpack.config.js:5` `name: 'shell'`; `:14-16` `remotes: { mfe1: "mfe1@http://localhost:4201/remoteEntry.js" }` | forte |
| Configuração (remote) | `projects/mfe1/webpack.config.js:5-10`: `name: 'mfe1'`, `filename: 'remoteEntry.js'`, `exposes: { './Component' }` | forte |
| Código-fonte (composição) | `projects/shell/src/app/app.routes.ts:5-13`: rota `mfe1` com `loadComponent` → `loadRemoteModule({ remoteEntry: 'http://localhost:4201/remoteEntry.js', exposedModule: './Component' })` → `AppComponent`; `:23` redireciona `''` para `mfe1`; `:14-21` rota `mfe2` comentada | forte |
| Código-fonte (layout) | `projects/shell/src/app/app.component.html:1-5`: título do shell, input e botão "Send to MFE1" + `<router-outlet>` onde o mfe1 é montado | forte |
| Código-fonte (comunicação) | `projects/shared/src/lib/message.service.ts:7-13`: `MessageService` com `BehaviorSubject`; usado pelo shell (`shell/src/app/app.component.ts:4,14`) e pelo mfe1 (`mfe1/src/app/app.component.ts:3,13-18`) via lib compartilhada (`tsconfig.json:15-18`, `"shared": ["./dist/shared"]`), singleton via `shareAll` | moderada |
| Código-fonte | `projects/shell/src/main.ts:1` e `projects/mfe1/src/main.ts:1`: `import('./bootstrap')`; nenhum import de código-fonte entre `shell` e `mfe1` (sustenta a independência das unidades) | moderada |
| Build/deploy | Nenhum CI/CD nem deploy do workspace; só dev servers em portas distintas (`README.md:28,34`). `spa-helm/` (raiz) é um chart genérico de SPA, não ligado ao workspace. | fraca |
| Documentação | `README.md:3-7`: "demonstrates a Micro-Frontend architecture using Angular, Module Federation, and a shared library" com Shell, MFE1 e Shared Library; `:41`, `:46-55` descrevem a carga em runtime | moderada |
| Código-fonte (outros exercícios) | `ssr-app/src/app/app.routes.ts:22-36` usa `loadComponent` com `import()` local (lazy loading comum, não composição); nenhuma outra ocorrência de federation, `remoteEntry` ou `customElements` | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `shell` e `mfe1` em `microfrontend-workspace/projects/` |
| Q2 | Yes | Entry, webpack e target de build próprios por app (`angular.json`), servidos separadamente (4200/4201); sem import de código-fonte entre apps, só a lib `shared` |
| Q3 | Yes | O shell monta o `mfe1` no seu `router-outlet` (`app.routes.ts:5-13`, `app.component.html:5`) |
| Q4 | Yes | MF configurado nos dois lados (`remotes`/`exposes`) e usado via `loadRemoteModule` (`app.routes.ts:8-12`) |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "examples, templates, and proofs of concept that actually compose frontend units" e a "monorepos containing a host and its remotes".
- O MFE é só um dos seis exercícios do repositório; os outros são apps independentes sem composição. Pelo protocolo (seção 3.1), o repositório é avaliado como um todo, e basta uma implementação observável.
- A lib `shared` é compartilhada como singleton e serve de canal de comunicação, não como acoplamento de código entre unidades; não compromete Q2.

## Notas para análise

- **Protocolo (corpus):** na mineração de artefatos, restringir a análise a `microfrontend-workspace/`; os demais diretórios são ruído (outros exercícios).
- **RQ3:** comunicação host ↔ remote por serviço singleton compartilhado (`MessageService`), um mecanismo que os repos anteriores não tinham.
- **RQ1:** a composição está duplicada (o `remotes` estático no webpack e a URL fixa no `loadRemoteModule`), um padrão comum em exemplos.
