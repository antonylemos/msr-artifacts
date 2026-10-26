---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Leitura do repositório

São cinco aplicações Create React App em `frontend/`, cada uma com `package.json` e `package-lock.json` próprios e o script `"build": "react-scripts build"` (ex.: frontend/analytics-app/package.json:21-22). Não há workspace: o `package.json` da raiz só entra em cada diretório com `cd`, e o `build:all` roda os cinco builds em sequência, cada um na sua pasta (package.json:13-14). Cada build gera a pasta `build/` da própria aplicação; nenhuma aplicação entra no build de outra. O container não embute os micro-frontends: ele os carrega em `<iframe>` por URL (frontend/container/src/App.tsx:239-245).

O deploy é feito por GitHub Actions para o GitHub Pages do repositório, com `peaceiris/actions-gh-pages@v3`, em duas formas que chegam ao mesmo resultado. (a) Um workflow por aplicação (`.github/workflows/deploy-<app>.yml`), disparado por push ou pull request na `main` que altere `frontend/<app>/**` (ex.: .github/workflows/deploy-analytics.yml:3-12). Ele instala e constrói só aquela aplicação e publica a pasta `build/` dela num subdiretório próprio do Pages (ex.: .github/workflows/deploy-analytics.yml:28-43). (b) O `deploy-all.yml`, disparado por push na `main` ou manualmente (.github/workflows/deploy-all.yml:3-6). Ele tem um job `build-and-test` que constrói e testa as cinco aplicações sem publicar nada (.github/workflows/deploy-all.yml:9-47), um job `deploy-container` (.github/workflows/deploy-all.yml:49-78) e uma matriz `deploy-micro-frontends` com uma execução por micro-frontend (.github/workflows/deploy-all.yml:80-116). Nas duas formas, cada publicação leva o `build/` de uma só aplicação para um `destination_dir` só dela: `container`, `user-management`, `data-grid`, `analytics` e `settings`. As aplicações dividem o mesmo site do Pages, mas em publicações distintas e em subdiretórios distintos, diferentemente de um único artefato do Pages montado com todas.

O endereço do Pages desta conta não está escrito no snapshot. O container aponta os iframes para `https://olivium-dev.github.io/golden-sample-react-micro-web/<subdiretório>/` (frontend/container/src/App.tsx:241-244), que é o Pages de outra conta com os mesmos subdiretórios dos workflows, como registra a revisão de composição. Assim, o container publicado por este repositório exibe builds servidos de outra origem. O workflow do container acrescenta `cname: micro-frontend-container.github.io` (.github/workflows/deploy-container.yml:44), que não aparece no job equivalente do `deploy-all.yml` (.github/workflows/deploy-all.yml:73-78). O snapshot não mostra se esse domínio tem efeito, e isso não muda a linha do container.

O `DEPLOYMENT.md` descreve deploy no Vercel, com um projeto por micro-frontend, e alternativas no Netlify e no Pages (DEPLOYMENT.md:3-28, 84-106). Essas são as ocorrências `ops-hosting` do arquivo. Os workflows do snapshot não usam Vercel nem Netlify, só o Pages. Por ser documentação, o `DEPLOYMENT.md` não decide a coluna Deploy. Os arquivos `.env` de cada aplicação só fixam a porta do dev server (ex.: frontend/analytics-app/.env:1), que não conta como deploy. Não há Dockerfile, compose, `vercel.json` nem `netlify.toml`, e nenhuma aplicação tem versão usada na publicação.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | frontend/analytics-app | separado | separado | subdiretório `analytics/` do GitHub Pages do repositório (.github/workflows/deploy-analytics.yml:43; .github/workflows/deploy-all.yml:88, 116); porta 3003 do dev server (frontend/analytics-app/.env:1) | No | frontend/analytics-app/package.json:22 (`react-scripts build`); .github/workflows/deploy-analytics.yml:3-12 (gatilho por `frontend/analytics-app/**`); .github/workflows/deploy-analytics.yml:28-43 (build só da aplicação e publicação de `frontend/analytics-app/build` em `analytics`); .github/workflows/deploy-all.yml:80-116 (execução da matriz que constrói e publica só esta aplicação em `analytics`) |
| 2 | frontend/container | separado | separado | subdiretório `container/` do GitHub Pages do repositório (.github/workflows/deploy-container.yml:43; .github/workflows/deploy-all.yml:78); porta 3000 do dev server (frontend/container/.env:1) | No | frontend/container/package.json:22 (`react-scripts build`); .github/workflows/deploy-container.yml:3-12 (gatilho por `frontend/container/**`); .github/workflows/deploy-container.yml:28-44 (build só da aplicação e publicação de `frontend/container/build` em `container`, com `cname`); .github/workflows/deploy-all.yml:49-78 (job `deploy-container`, build e publicação só do container) |
| 3 | frontend/data-grid-app | separado | separado | subdiretório `data-grid/` do GitHub Pages do repositório (.github/workflows/deploy-data-grid.yml:43; .github/workflows/deploy-all.yml:87, 116); porta 3002 do dev server (frontend/data-grid-app/.env:1) | No | frontend/data-grid-app/package.json:22 (`react-scripts build`); .github/workflows/deploy-data-grid.yml:3-12 (gatilho por `frontend/data-grid-app/**`); .github/workflows/deploy-data-grid.yml:28-43 (build só da aplicação e publicação de `frontend/data-grid-app/build` em `data-grid`); .github/workflows/deploy-all.yml:80-116 (execução da matriz que constrói e publica só esta aplicação em `data-grid`) |
| 4 | frontend/settings-app | separado | separado | subdiretório `settings/` do GitHub Pages do repositório (.github/workflows/deploy-settings.yml:43; .github/workflows/deploy-all.yml:89, 116); porta 3004 do dev server (frontend/settings-app/.env:1) | No | frontend/settings-app/package.json:22 (`react-scripts build`); .github/workflows/deploy-settings.yml:3-12 (gatilho por `frontend/settings-app/**`); .github/workflows/deploy-settings.yml:28-43 (build só da aplicação e publicação de `frontend/settings-app/build` em `settings`); .github/workflows/deploy-all.yml:80-116 (execução da matriz que constrói e publica só esta aplicação em `settings`) |
| 5 | frontend/user-management-app | separado | separado | subdiretório `user-management/` do GitHub Pages do repositório (.github/workflows/deploy-user-management.yml:43; .github/workflows/deploy-all.yml:86, 116); porta 3001 do dev server (frontend/user-management-app/.env:1) | No | frontend/user-management-app/package.json:22 (`react-scripts build`); .github/workflows/deploy-user-management.yml:3-12 (gatilho por `frontend/user-management-app/**`); .github/workflows/deploy-user-management.yml:28-43 (build só da aplicação e publicação de `frontend/user-management-app/build` em `user-management`); .github/workflows/deploy-all.yml:80-116 (execução da matriz que constrói e publica só esta aplicação em `user-management`) |

## Observações

**1. frontend/analytics-app.** Build `separado`: `react-scripts build` sem configuração própria (frontend/analytics-app/package.json:22), com saída na pasta `build/` da aplicação. O `build:all` da raiz (package.json:14) e o job `build-and-test` (.github/workflows/deploy-all.yml:33-39) só disparam esse mesmo build. Deploy `separado`: o workflow próprio publica só `frontend/analytics-app/build` em `analytics` (.github/workflows/deploy-analytics.yml:38-43). A execução `analytics-app` da matriz do `deploy-all.yml` faz o mesmo (.github/workflows/deploy-all.yml:88, 101-116). As duas formas publicam a aplicação à parte, então não há a ambiguidade que levaria a `Undetermined`. O workflow próprio também roda em pull request (.github/workflows/deploy-analytics.yml:9-12) e publica nesse caso, porque o passo de deploy não tem condição. Na composição, o container carrega esta aplicação pelo mesmo subdiretório, mas no Pages de `olivium-dev` (frontend/container/src/App.tsx:243). Versionamento `No`: `"version": "0.1.0"` com `"private": true` (frontend/analytics-app/package.json:3-4), sem uso na publicação.

**2. frontend/container.** Build `separado`, nos mesmos termos da aplicação 1 (frontend/container/package.json:22). Os micro-frontends não entram no bundle, porque são carregados por iframe em tempo de execução (frontend/container/src/App.tsx:239-245). Deploy `separado`: o workflow próprio publica só `frontend/container/build` em `container` (.github/workflows/deploy-container.yml:38-44), e o job `deploy-container` do `deploy-all.yml` faz o mesmo (.github/workflows/deploy-all.yml:68-78). A particularidade é o `cname: micro-frontend-container.github.io`, que existe só no workflow próprio (.github/workflows/deploy-container.yml:44). As URLs dos iframes estão fixas no código e apontam para o Pages de outra conta (frontend/container/src/App.tsx:241-244), não para os subdiretórios que este repositório publica. Versionamento `No` (frontend/container/package.json:3-4).

**3. frontend/data-grid-app.** Mesma situação da aplicação 1: build próprio (frontend/data-grid-app/package.json:22), workflow próprio que publica só o `build/` em `data-grid` (.github/workflows/deploy-data-grid.yml:28-43) e execução própria na matriz do `deploy-all.yml` (.github/workflows/deploy-all.yml:87, 101-116). O container usa o subdiretório `data-grid/` na aba `data` (frontend/container/src/App.tsx:242). Versionamento `No` (frontend/data-grid-app/package.json:3-4).

**4. frontend/settings-app.** Mesma situação da aplicação 1: build próprio (frontend/settings-app/package.json:22), workflow próprio que publica só o `build/` em `settings` (.github/workflows/deploy-settings.yml:28-43) e execução própria na matriz (.github/workflows/deploy-all.yml:89, 101-116). O container usa o subdiretório `settings/` (frontend/container/src/App.tsx:244). Versionamento `No` (frontend/settings-app/package.json:3-4).

**5. frontend/user-management-app.** Mesma situação da aplicação 1: build próprio (frontend/user-management-app/package.json:22), workflow próprio que publica só o `build/` em `user-management` (.github/workflows/deploy-user-management.yml:28-43) e execução própria na matriz (.github/workflows/deploy-all.yml:86, 101-116). O container usa o subdiretório `user-management/` na aba `users` (frontend/container/src/App.tsx:241). Versionamento `No` (frontend/user-management-app/package.json:3-4).

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (separado: 5). Versionamento independente: 0.
