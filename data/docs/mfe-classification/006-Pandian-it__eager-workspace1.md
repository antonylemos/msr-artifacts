---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
url: https://github.com/Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
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
  date: 2026-10-14
---

# 006 — Pandian-it/eager-workspace1

## Contexto

- **Abordagem de implementação:** Module Federation (`@angular-architects/module-federation`, Angular 18) com carga dinâmica guiada por manifesto
- **Tipo de repositório:** example/proof of concept, com pipeline de release semelhante a produção (README é o boilerplate do Angular CLI e as apps são simples, mas há versionamento por app e deploy em S3/CloudFront)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:37`: `@angular-architects/module-federation`; `:24` Angular 18; `:59` Nx | fraca |
| Estrutura | Monorepo Nx com quatro apps (`projects/shell`, `projects/cart`, `projects/checkout`, `projects/orders`) e duas libs (`projects/shared-lib`, `projects/shared-ui`). Cada app tem `package.json`, `project.json`, `webpack.config.js`, `src/main.ts` e `src/bootstrap.ts` próprios. | forte |
| Configuração (host) | `projects/shell/webpack.config.js:5-11`: `name: 'shell'`, `remotes` para `cart` (4201), `checkout` (4202) e `orders` (4203); `:21-33` `@shared-lib` e `@shared-ui` como singletons `eager` | forte |
| Configuração (remotes) | `projects/cart/webpack.config.js:5-8`, `projects/checkout/webpack.config.js:5-8`, `projects/orders/webpack.config.js:5-8`: cada um expõe `./Module` → `src/app/mfe.module.ts` | forte |
| Código-fonte (composição) | `projects/shell/src/app/app-routing.module.ts:9-29`: rotas `cart`, `checkout` e `orders` com `loadChildren` → `ManifestService.loadRemoteModule(...)` | forte |
| Código-fonte (carga) | `projects/shell/src/app/manifest.service.ts:4` importa `loadRemoteModule`; `:23-37` busca o manifesto (`mfe.manifest.json` em localhost, `deployment-manifest.json` em produção); `:57-58` monta a URL `/apps/<app>/<version>/remoteEntry.js`; `:62-75` chama `loadRemoteModule({ remoteEntry, exposedModule: './Module' })` | forte |
| Código-fonte | `src/main.ts:1` de cada app usa `import('./bootstrap')` (entry assíncrono do MF); nenhuma app importa código-fonte de outra, só as libs `@shared-lib`/`@shared-ui` via path alias (`tsconfig.json:17-20`) (sustenta a independência das unidades) | moderada |
| Configuração (runtime) | `projects/shell/public/mfe.manifest.json:2-4`: URLs locais dos três remotes; `deployment-manifest.json:10-25`: versão independente por app (checkout 2.0.4, orders 1.1.3, shell 1.0.7, cart 1.0.5) | forte |
| Build/deploy | `.github/workflows/Push-Event-To-Release.yml:61` detecta apps afetadas (`nx show projects --affected`); `:158-162` `aws s3 sync dist/$app s3://…/apps/$app/$APP_VERSION`; `:167` publica `deployment-manifest.json`. Cada app tem build e deploy versionado próprio. | forte |
| Configuração (resíduo) | `projects/shell/public/federation.manifest.json:2-3` (`mfe1`, `mfe2`) não é referenciado no código; resíduo de scaffolding | contexto |
| Documentação | `README.md` é o boilerplate do Angular CLI, sem descrição da arquitetura | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades frontend no repositório (`shell`, `cart`, `checkout`, `orders`), todas referenciadas pela config de composição (`shell/webpack.config.js:7-11`) |
| Q2 | Yes | Entry, `webpack.config.js` e build próprios por app; versões e deploy independentes (`deployment-manifest.json`, `Push-Event-To-Release.yml:158-162`); sem import de código-fonte entre apps |
| Q3 | Yes | O shell roteia e carrega os remotes (`app-routing.module.ts:9-29`) |
| Q4 | Yes | Module Federation configurado nos dois lados (`remotes`/`exposes`) e usado em runtime por `loadRemoteModule` (`manifest.service.ts:62-75`) |
| Q5 | Yes | Q1–Q4 convergem; nenhuma divergência a justificar |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde ao caso "monorepos containing a host and its remotes".
- A evidência forma uma cadeia completa: dependência → config `remotes`/`exposes` → rotas com `loadChildren` → `loadRemoteModule` guiado por manifesto → build e deploy versionados por app.
- As libs compartilhadas (`shared-lib`, `shared-ui`) entram como `shared` singleton do MF, não como acoplamento direto entre unidades, então não comprometem Q2.

## Notas para análise

- **RQ1:** a documentação está ausente (README boilerplate); toda a evidência vem de configuração, código e CI/CD.
- **RQ3:** relação host → remote mediada por manifesto em runtime (`mfe.manifest.json` / `deployment-manifest.json`), em vez de URLs fixas. O `remotes` estático no webpack coexiste com a resolução dinâmica.
- **RQ1 (build/deploy):** versionamento independente por app com Changesets (`.changeset/`) e Nx affected, um caso forte para a dimensão de evidência 6.
