---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
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

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Leitura do repositório

Sistema de "Buy Now, Pay Later" com backend Django e frontend React num workspace pnpm em `frontend/` (frontend/pnpm-workspace.yaml:1-5). O script `build` da raiz do workspace compila primeiro a biblioteca `@bnpl/shared` e depois dispara, em paralelo, o `build` de cada pacote (frontend/package.json:14). Cada aplicação tem `webpack.config.js` próprio, sem `output.path` comum: os remotes gravam no `dist` do próprio pacote (frontend/customer-app/webpack.config.js:24-29; frontend/merchant-app/webpack.config.js:24-29), e o shell não define `output.path` (frontend/shell/webpack.config.js:29-32), então usa o `dist` padrão do seu pacote. A biblioteca `shared` entra em cada build por alias (frontend/customer-app/webpack.config.js:35), sem ser unidade frontend. Os endereços de federação e de `publicPath` são todos `localhost` (frontend/shell/webpack.config.js:62-63; frontend/customer-app/webpack.config.js:26; frontend/merchant-app/webpack.config.js:26), e o shell fixa `mode: "development"` (frontend/shell/webpack.config.js:8). Não há configuração de produção da federação.

O único artefato de contêiner do frontend é de desenvolvimento. O `frontend/Dockerfile.dev` só instala o pnpm e prepara um usuário, sem copiar o código (`COPY . .` comentado em :15) e sem build, terminando em `CMD ["sh"]` (:52). O serviço `bnpl-frontend` do compose monta `./frontend` como volume, roda `sh` com `NODE_ENV=development` e expõe as portas 3000, 3001 e 3002, comentadas como shell, customer-app e merchant-app (docker-compose.dev.yml:149-174). O README manda entrar no contêiner e rodar `pnpm install` e `pnpm dev` à mão (README.md:211, :219, :227-228), ou seja, os servidores `webpack serve` de cada pacote (frontend/package.json:13; frontend/shell/package.json:6; frontend/customer-app/package.json:6). O contêiner não empacota nem publica nenhuma aplicação: é um ambiente de desenvolvimento comum aos quatro pacotes, por isso não conta como deploy. O serviço nginx do compose está todo comentado (docker-compose.dev.yml:176-187). O README fala em "isolated deployments" (README.md:42), mas nenhum artefato do snapshot sustenta isso.

Artefatos sem aplicação frontend: `backend/Dockerfile.dev` é a imagem Python de desenvolvimento do backend (backend/Dockerfile.dev:2, :23, :36); os serviços `bnpl-tests`, `bnpl-api`, `bnpl-worker`, `bnpl-beat`, `bnpl-redis` e `bnpl-db` do compose são backend e infraestrutura (docker-compose.dev.yml:5-147). Os dois workflows de CI tratam só do backend: `backend-docker-publish.yml` constrói e publica no Docker Hub a imagem `bnpl-backend` a partir de `./backend` (.github/workflows/backend-docker-publish.yml:7-16, :40-49), e `backend-tests.yml` dispara por mudanças em `backend/**` e roda os testes pelo serviço `bnpl-tests` (.github/workflows/backend-tests.yml:13-20, :133-134). As ocorrências `ops-cors` (frontend/shell/webpack.config.js:23; frontend/customer-app/webpack.config.js:129; frontend/merchant-app/webpack.config.js:129) estão nos `devServer` e só liberam o carregamento cruzado em desenvolvimento.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | frontend/customer-app | separado | não observado | `http://localhost:3001/remoteEntry.js`, só em desenvolvimento com `webpack serve` (frontend/customer-app/webpack.config.js:121; frontend/shell/webpack.config.js:62); `http://localhost:3001/` no modo standalone (frontend/customer-app/webpack.config.js:26) | No | frontend/customer-app/package.json:7 (`webpack --env standalone=false`); frontend/customer-app/webpack.config.js:6-137 (configuração própria, saída em `dist` em :24-29, `ModuleFederationPlugin` `customer_app` com `remoteEntry.js` em :81-88); frontend/package.json:14 (build da raiz dispara o do pacote) |
| 2 | frontend/merchant-app | separado | não observado | `http://localhost:3002/remoteEntry.js`, só em desenvolvimento com `webpack serve` (frontend/merchant-app/webpack.config.js:121; frontend/shell/webpack.config.js:63); `http://localhost:3002/` no modo standalone (frontend/merchant-app/webpack.config.js:26) | No | frontend/merchant-app/package.json:7 (`webpack --env standalone=false`); frontend/merchant-app/webpack.config.js:6-137 (configuração própria, saída em `dist` em :24-29, `ModuleFederationPlugin` `merchant_app` com `remoteEntry.js` em :81-88); frontend/package.json:14 (build da raiz dispara o do pacote) |
| 3 | frontend/shell | separado | não observado | `http://localhost:3000`, só em desenvolvimento com `webpack serve` (frontend/shell/webpack.config.js:16; frontend/shell/package.json:6) | No | frontend/shell/package.json:7 (`webpack --config webpack.config.js`); frontend/shell/webpack.config.js:6-115 (configuração própria, entrada em :7, `publicPath: "/"` em :30, `ModuleFederationPlugin` `shell` em :59-94, `HtmlWebpackPlugin` em :95-98); frontend/package.json:14 (build da raiz dispara o do pacote) |

## Observações

**1. frontend/customer-app.** Build próprio no modo remoto, o dos scripts `dev` e `build` (frontend/customer-app/package.json:6-7), que gera o `remoteEntry.js` do remote `customer_app` em `dist` do pacote (frontend/customer-app/webpack.config.js:24-29, :81-88); o shell só o consome em tempo de execução (frontend/shell/webpack.config.js:62), por isso `separado`, mesmo com o disparo conjunto pela raiz (frontend/package.json:14). Há ainda o modo standalone (`build:standalone`, frontend/customer-app/package.json:9), com `publicPath` `http://localhost:3001/` (frontend/customer-app/webpack.config.js:26). A porta 3001 está no `devServer` (:121) e no compose de desenvolvimento (docker-compose.dev.yml:170), sem artefato que publique o `dist`. O `publicPath: "/"` de :126 é do diretório estático do `devServer`. A `version` `0.1.0` (frontend/customer-app/package.json:3) não é usada em publicação, e o pacote é `private` (:4).

**2. frontend/merchant-app.** Mesma forma da aplicação 1: a configuração difere só no `publicPath` standalone `http://localhost:3002/` (frontend/merchant-app/webpack.config.js:26), no `name: "merchant_app"` (:82) e na porta 3002 (:121). Build próprio pelos scripts `build` e `build:standalone` (frontend/merchant-app/package.json:7, :9), consumido pelo shell em `http://localhost:3002/remoteEntry.js` (frontend/shell/webpack.config.js:63). Porta exposta só no compose de desenvolvimento (docker-compose.dev.yml:171). `version` `0.1.0` sem uso, pacote `private` (frontend/merchant-app/package.json:3-4).

**3. frontend/shell.** Build próprio a partir de `./src/infrastructure/shell/shell-app.bootstrap.tsx` (frontend/shell/webpack.config.js:7), com os remotes resolvidos em tempo de execução (:61-64), de modo que o código deles não entra no artefato do shell. A configuração fixa `mode: "development"` (:8) e `publicPath: "/"` (:30), e as URLs dos remotes são `localhost`; não há variante de produção. Servido só pelo `webpack serve` na porta 3000 (frontend/shell/package.json:6; frontend/shell/webpack.config.js:16), exposta pelo compose de desenvolvimento (docker-compose.dev.yml:169). `version` `0.1.0` sem uso, pacote `private` (frontend/shell/package.json:3-4).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
