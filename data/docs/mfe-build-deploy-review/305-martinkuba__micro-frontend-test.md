---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
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

# 305 — martinkuba/micro-frontend-test

## Leitura do repositório

Monorepo npm workspaces com três pacotes webpack 5: `packages/shell`, `packages/main-content` e `packages/sidebar` (package.json:14-18). O `build` da raiz só dispara o `build` de cada workspace (package.json:11). Cada pacote tem o próprio `webpack --config webpack.config.js` (packages/shell/package.json:7; packages/main-content/package.json:7; packages/sidebar/package.json:7) e a própria saída `dist` no seu diretório (packages/shell/webpack.config.js:11; packages/main-content/webpack.config.js:10; packages/sidebar/webpack.config.js:10). São três builds separados. Os dois remotes geram cada um o seu `remoteEntry.js` (packages/main-content/webpack.config.js:33; packages/sidebar/webpack.config.js:33), e o shell gera o `index.html` com `HtmlWebpackPlugin` (packages/shell/webpack.config.js:44-47).

Toda a configuração é de desenvolvimento. As três configurações estão em `mode: 'development'` (packages/shell/webpack.config.js:7; packages/main-content/webpack.config.js:6; packages/sidebar/webpack.config.js:6). O `publicPath` aponta para `localhost` (portas 3000, 3001 e 3002: packages/shell/webpack.config.js:12; packages/main-content/webpack.config.js:11; packages/sidebar/webpack.config.js:11), e o shell busca o remote em `http://localhost:3001/remoteEntry.js` (packages/shell/webpack.config.js:35), como registra a revisão de composição. O único modo de servir as aplicações é o `webpack serve` dos scripts `start` (packages/shell/package.json:6; packages/main-content/package.json:6; packages/sidebar/package.json:6), com `devServer` em portas próprias (packages/shell/webpack.config.js:49-59; packages/main-content/webpack.config.js:44-53; packages/sidebar/webpack.config.js:44-53). O `start` da raiz sobe main-content e shell em paralelo com `concurrently` (package.json:7), e o sidebar tem `start:sidebar` à parte (package.json:10).

Não há Dockerfile, compose, workflow de CI, manifesto de deploy nem configuração de hospedagem no snapshot. Os 23 arquivos são os três pacotes, a raiz (`package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore`) e o `README.md`. O `.gitignore` exclui `dist/` (.gitignore:2). As ocorrências `cfg-public-path` do `matches.csv` são os três `publicPath` de `localhost` citados acima. As `ops-cors` são o cabeçalho `Access-Control-Allow-Origin: '*'` dos `devServer` (packages/shell/webpack.config.js:56-58; packages/main-content/webpack.config.js:50-52; packages/sidebar/webpack.config.js:50-52), que deixa o shell buscar o `remoteEntry.js` de outra porta em desenvolvimento. Nenhuma é deploy. O README também só descreve execução local, com `npm start` e `http://localhost:3000` (README.md:14-19).

Todos os pacotes estão em `version: "1.0.0"` e `private: true` (packages/shell/package.json:3-4; packages/main-content/package.json:3-4; packages/sidebar/package.json:3-4), sem publicação.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | packages/main-content | separado | não observado | `http://localhost:3001` em desenvolvimento (packages/main-content/webpack.config.js:11, :45) | No | packages/main-content/webpack.config.js:4-43 (configuração própria, gera `remoteEntry.js` em `dist`); packages/main-content/package.json:7 (`webpack`); package.json:11 (`npm run build --workspaces`) |
| 2 | packages/shell | separado | não observado | `http://localhost:3000` em desenvolvimento (packages/shell/webpack.config.js:12, :50) | No | packages/shell/webpack.config.js:5-48 (configuração própria, host federado e `index.html`); packages/shell/package.json:7 (`webpack`); package.json:11 (`npm run build --workspaces`) |
| 3 | packages/sidebar | separado | não observado | `http://localhost:3002` em desenvolvimento (packages/sidebar/webpack.config.js:11, :45) | No | packages/sidebar/webpack.config.js:4-42 (configuração própria, gera `remoteEntry.js` em `dist`); packages/sidebar/package.json:7 (`webpack`); package.json:11 (`npm run build --workspaces`) |

## Observações

**1. packages/main-content.** O build é próprio: a configuração gera em `packages/main-content/dist` o `remoteEntry.js` que expõe `./MainContent` (packages/main-content/webpack.config.js:10, :31-36), e é disparada pelo script do pacote (packages/main-content/package.json:7) ou pelo `build` da raiz (package.json:11). Com o shell, compartilha `react`, `react-dom` e `@grafana/faro-web-sdk` como singletons em runtime (packages/main-content/webpack.config.js:37-41), mas o artefato é só do remote. Ele é servido apenas pelo `webpack serve` na porta 3001 (packages/main-content/package.json:6; packages/main-content/webpack.config.js:44-53), e o shell o busca nesse endereço (packages/shell/webpack.config.js:35). Nada no snapshot publica o `dist`, por isso o deploy fica `não observado`. A revisão estrutural deixou o pacote como `Undetermined` porque ele não sobe uma UI sozinho; isso não afeta o build, que é dele.

**2. packages/shell.** Build próprio do host em `packages/shell/dist`, com o `index.html` gerado do `public/index.html` (packages/shell/webpack.config.js:11, :44-47) e `publicPath` em `http://localhost:3000/` (packages/shell/webpack.config.js:12). O código do remote não entra nesse artefato: o shell só declara `mainContent` em `remotes` e o carrega em runtime (packages/shell/webpack.config.js:34-35). Servido só pelo `webpack serve` na porta 3000, com `historyApiFallback` (packages/shell/package.json:6; packages/shell/webpack.config.js:49-55). Deploy `não observado`.

**3. packages/sidebar.** Build próprio, igual ao do main-content, com `remoteEntry.js` que expõe `./Sidebar` (packages/sidebar/webpack.config.js:10, :31-36). A diferença é que o Faro SDK não é compartilhado, e o comentário diz que o pacote leva o próprio bundle dele (packages/sidebar/webpack.config.js:40). Entra no `build --workspaces` da raiz (package.json:11, :17), mas o shell não o declara como remote (packages/shell/webpack.config.js:36, comentado) e o `start` da raiz não o sobe (package.json:7). Ele só é servido pelo `start:sidebar`, na porta 3002 (package.json:10; packages/sidebar/webpack.config.js:44-53). Deploy `não observado`.

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
