---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 006 — Pandian-it/eager-workspace1

## Workspace

package.json:4-6 (`workspaces: ["projects/*"]`); nx.json:3-20 (defaults dos targets Nx).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-17 (manifesto do workspace) | — | — | — | — | No | Raiz de coordenação do workspace, sem entrada ou build de UI próprios. |
| projects/cart | projects/cart/package.json;projects/cart/project.json;projects/cart/webpack.config.js | projects/cart/package.json:1-5 (manifesto próprio) | projects/cart/project.json:23-24 (index e main próprios); projects/cart/src/bootstrap.ts:1-7 (chama bootstrapModule); projects/cart/src/app/mfe.module.ts:8-19 (módulo sem bootstrap ou ngDoBootstrap) | projects/cart/project.json:19-24 (target build e output próprios); projects/cart/project.json:39-40 (webpack próprio); .github/workflows/Push-Event-To-Release.yml:140-145 (`nx build` por projeto) | package.json:4-5 (`projects/*`) | .github/workflows/Push-Event-To-Release.yml:155-162 (publica dist de cada projeto sob nome e versão próprios) | Undetermined | Entrada e build próprios declarados, mas o módulo usado pelo bootstrap não define como iniciar a UI. |
| projects/checkout | projects/checkout/package.json;projects/checkout/project.json;projects/checkout/webpack.config.js | projects/checkout/package.json:1-5 (manifesto próprio) | projects/checkout/project.json:24-25 (index e main próprios); projects/checkout/src/bootstrap.ts:1-7 (bootstrap Angular) | projects/checkout/project.json:20-25 (target build e output próprios); projects/checkout/project.json:40-41 (webpack próprio); .github/workflows/Push-Event-To-Release.yml:140-145 (`nx build` por projeto) | package.json:4-5 (`projects/*`) | .github/workflows/Push-Event-To-Release.yml:155-162 (publica dist de cada projeto sob nome e versão próprios) | Yes | Aplicação Angular com entrada e target de build próprios. |
| projects/orders | projects/orders/package.json;projects/orders/project.json;projects/orders/webpack.config.js | projects/orders/package.json:1-5 (manifesto próprio) | projects/orders/project.json:23-24 (index e main próprios); projects/orders/src/bootstrap.ts:1-7 (bootstrap Angular) | projects/orders/project.json:19-24 (target build e output próprios); projects/orders/project.json:39-40 (webpack próprio); .github/workflows/Push-Event-To-Release.yml:140-145 (`nx build` por projeto) | package.json:4-5 (`projects/*`) | .github/workflows/Push-Event-To-Release.yml:155-162 (publica dist de cada projeto sob nome e versão próprios) | Yes | Aplicação Angular com entrada e target de build próprios. |
| projects/shared-lib | projects/shared-lib/package.json;projects/shared-lib/project.json | projects/shared-lib/package.json:1-12 (manifesto de biblioteca) | — | projects/shared-lib/project.json:4-11 (target de biblioteca com ng-packagr) | package.json:4-5 (`projects/*`) | projects/shared-lib/project.json:22-24 (artefato dist da biblioteca) | No | Biblioteca compartilhada; build ng-packagr sem entrada de aplicação. |
| projects/shared-ui | projects/shared-ui/package.json;projects/shared-ui/project.json | projects/shared-ui/package.json:1-12 (manifesto de biblioteca) | — | projects/shared-ui/project.json:4-11 (target de biblioteca com ng-packagr) | package.json:4-5 (`projects/*`) | projects/shared-ui/project.json:22-24 (artefato dist da biblioteca) | No | Biblioteca compartilhada; build ng-packagr sem entrada de aplicação. |
| projects/shell | projects/shell/package.json;projects/shell/project.json;projects/shell/webpack.config.js | projects/shell/package.json:1-5 (manifesto próprio) | projects/shell/project.json:23-24 (index e main próprios); projects/shell/src/bootstrap.ts:1-7 (bootstrap Angular) | projects/shell/project.json:19-24 (target build e output próprios); projects/shell/project.json:39-40 (webpack próprio); package.json:13 (`nx build shell`) | package.json:4-5 (`projects/*`) | .github/workflows/Push-Event-To-Release.yml:155-162 (publica dist de cada projeto sob nome e versão próprios) | Yes | Aplicação Angular com entrada e target de build próprios. |

## Resumo

Aplicações frontend no snapshot: 3 (projects/checkout, projects/orders, projects/shell).

## Notas

- A raiz coordena os projetos; as duas bibliotecas têm artefatos próprios, mas não iniciam uma UI. O workflow publica os projetos afetados por nome e versão, sem tornar essas bibliotecas aplicações frontend.
- projects/cart/src/bootstrap.ts:4-7 chama `bootstrapModule(MfeModule)`, mas projects/cart/src/app/mfe.module.ts:8-19 não define `bootstrap` nem `ngDoBootstrap`. A entrada não comprova a inicialização da UI; pela regra de artefatos contraditórios, projects/cart recebeu Undetermined.
- O mesmo `MfeModule` é exposto como remote em projects/cart/webpack.config.js:7-8 (`'./Module'`) e carregado pelo shell em projects/shell/src/app/manifest.service.ts:75. O Undetermined se refere à execução de projects/cart sozinho, não ao seu papel como remote, que é assunto da revisão de composição (seção 3.4.5 do protocolo).
- A classificação registra frontend_units: 4. Esta revisão conta três linhas Yes; a quarta unidade, projects/cart, permanece Undetermined pela contradição no bootstrap. A classificação não foi alterada.
