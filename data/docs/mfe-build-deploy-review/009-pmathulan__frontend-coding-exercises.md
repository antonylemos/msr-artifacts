---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Leitura do repositório

Repositório de exercícios de uma avaliação técnica, cada um numa pasta com README próprio (README.md:1-11). Os exercícios não formam uma aplicação única. O único conjunto composto é `microfrontend-workspace`, um workspace Angular CLI com `shell`, `mfe1` e a biblioteca `shared`, que compartilham o `package.json` da pasta (microfrontend-workspace/package.json:5-11). Shell e mfe1 têm targets `build` próprios com `ngx-build-plus` e saídas separadas, `dist/shell` e `dist/mfe1` (microfrontend-workspace/angular.json:18-23, 126-131). A biblioteca `shared` é empacotada com `ng-packagr` (microfrontend-workspace/angular.json:228-231) e chega às aplicações por um alias para `./dist/shared` (ver a revisão de composição). Os outros exercícios são aplicações isoladas: `angular-frontend-practical` e `ssr-app`, Angular com SSR (ex.: ssr-app/angular.json:18-20, 38-40), e `react-performance-practical`, em Vite. A pasta `rate-limited-scheduler` é TypeScript sem UI.

Nenhuma aplicação tem Dockerfile, CI ou configuração de hospedagem própria. As únicas ocorrências `ops-*` da mineração estão na pasta `spa-helm/`, um chart Helm genérico "for deploying a frontend SPA" (spa-helm/Chart.yaml:1-4). O chart tem Deployment, Service, Ingress e um job que limpa o cache da Cloudflare depois de cada upgrade (spa-helm/templates/deployment.yaml:1-27; spa-helm/templates/service.yaml:1-13; spa-helm/templates/ingress.yaml:1-27; spa-helm/templates/post-upgrade-hook.yaml:1-32), além de rótulos comuns em spa-helm/templates/_helpers.tpl:1-8. Não há ocorrências `ci-*` nem `cfg-public-path`. Os valores são de modelo: imagem `dockerhub-username/spa-image:latest` e host `spa.example.com` (spa-helm/values.yaml:3-5, 17-18). Nada liga o chart a uma pasta: não há Dockerfile que gere a imagem nem README que o mencione.

Os dois exercícios com SSR trazem um script que roda o servidor Node já construído (`serve:ssr:*`, ex.: ssr-app/package.json:10). O README do ssr-app só descreve estratégias genéricas de deploy (ssr-app/README.md:44-57), e cita um `dist/angular-optimized-ssr` que não corresponde à saída `dist/ssr-app` do projeto (ssr-app/README.md:51; ssr-app/angular.json:20).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | angular-frontend-practical | separado | Undetermined | — | No | angular-frontend-practical/angular.json:17-22 (target `build`, saída `dist/angular-frontend-practical`); angular-frontend-practical/package.json:7 (`ng build`); spa-helm/Chart.yaml:1-4 (chart genérico sem vínculo com a pasta) |
| 2 | microfrontend-workspace/projects/mfe1 | separado | Undetermined | `http://localhost:4201` em desenvolvimento (microfrontend-workspace/angular.json:191) | No | microfrontend-workspace/angular.json:125-131 (target `build`, saída `dist/mfe1`); microfrontend-workspace/angular.json:150 (webpack próprio); spa-helm/Chart.yaml:1-4 (chart genérico sem vínculo com a pasta) |
| 3 | microfrontend-workspace/projects/shell | separado | Undetermined | `http://localhost:4200` em desenvolvimento (microfrontend-workspace/angular.json:83) | No | microfrontend-workspace/angular.json:17-23 (target `build`, saída `dist/shell`); microfrontend-workspace/angular.json:42 (webpack próprio); spa-helm/Chart.yaml:1-4 (chart genérico sem vínculo com a pasta) |
| 4 | react-performance-practical | separado | Undetermined | — | No | react-performance-practical/vite.config.ts:6-11 (configuração Vite); react-performance-practical/package.json:8 (`tsc -b && vite build`); spa-helm/Chart.yaml:1-4 (chart genérico sem vínculo com a pasta) |
| 5 | ssr-app | separado | Undetermined | — | No | ssr-app/angular.json:17-22 (target `build`, saída `dist/ssr-app`); ssr-app/package.json:7 (`ng build`); spa-helm/Chart.yaml:1-4 (chart genérico sem vínculo com a pasta) |

## Observações

**1. angular-frontend-practical.** Projeto Angular independente, com manifesto, lockfile e build próprios, e SSR. O Deploy é `Undetermined` só por causa do chart genérico, que poderia servir a qualquer SPA do repositório, ou a nenhuma (ver a Decisão registrada). A versão `0.0.0` não é usada.

**2. microfrontend-workspace/projects/mfe1.** Target e saída próprios dentro do workspace, com a mesma instalação de dependências do shell. É o remote do shell e serve seu `remoteEntry.js` na porta 4201 em desenvolvimento. O `run:all` do workspace sobe os dois servidores de desenvolvimento juntos (microfrontend-workspace/package.json:10). Não há publicação.

**3. microfrontend-workspace/projects/shell.** Mesmo arranjo, porta 4200. O host só aponta para o mfe1 em `localhost` (ver a revisão de composição). Não há configuração de produção dos remotes.

**4. react-performance-practical.** Projeto Vite independente, com build próprio. A versão `0.0.0` não é usada.

**5. ssr-app.** Projeto Angular com SSR, com build próprio e um script que roda o servidor construído (ssr-app/package.json:10). O README descreve o deploy só em termos genéricos (ssr-app/README.md:44-57).

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (Undetermined: 5). Versionamento independente: 0.

## Decisão registrada

O chart `spa-helm/` é um artefato de deploy genérico, sem vínculo com nenhuma pasta (imagem placeholder, sem Dockerfile, sem menção em README). Decisão do pesquisador (2026-10-21): `Undetermined` nas cinco aplicações, porque há um artefato cuja relação com elas não se resolve no snapshot (evidência ambígua), e não ausência de artefato. A mineração passou a cobrir pastas de chart com outros nomes (registrada no documento do projeto original `docs/mfe-config-revisions.md`, que não está incluído neste pacote).
