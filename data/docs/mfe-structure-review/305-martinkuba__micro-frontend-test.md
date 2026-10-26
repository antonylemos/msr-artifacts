---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
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

## Workspace

`package.json:14-18` (`workspaces` npm: `packages/shell`, `packages/main-content`, `packages/sidebar`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — (package.json:11 `build` só delega: `npm run build --workspaces`) | — | — | No | Raiz do workspace npm: coordena os pacotes, sem entrada nem configuração de build próprias |
| packages/main-content | packages/main-content/package.json;packages/main-content/webpack.config.js | packages/main-content/package.json | packages/main-content/webpack.config.js:8 (`entry: './src/index.ts'`); packages/main-content/src/index.ts:1 (só reexporta `MainContent`, sem render); sem `index.html` no diretório | packages/main-content/webpack.config.js:30-43 (`ModuleFederationPlugin` com `filename: 'remoteEntry.js'`); packages/main-content/package.json:7 (`webpack --config webpack.config.js`) | package.json:16 (`packages/main-content`) | — | Undetermined | Build federado próprio, mas a entrada só reexporta o componente e nada no diretório inicia a UI sozinho |
| packages/shell | packages/shell/package.json;packages/shell/webpack.config.js | packages/shell/package.json | packages/shell/webpack.config.js:9 (`entry: './src/index.tsx'`); packages/shell/src/index.tsx:2 (`import('./bootstrap')`); packages/shell/src/bootstrap.tsx:14-19 (`createRoot(container).render(<App />)`); packages/shell/webpack.config.js:44-47 (`HtmlWebpackPlugin` com `./public/index.html`) | packages/shell/webpack.config.js:31-48 (`ModuleFederationPlugin` host e `HtmlWebpackPlugin`); packages/shell/package.json:7 (`webpack --config webpack.config.js`) | package.json:15 (`packages/shell`) | — | Yes | Host React com entrada que monta a UI e build webpack próprio |
| packages/sidebar | packages/sidebar/package.json;packages/sidebar/webpack.config.js | packages/sidebar/package.json | packages/sidebar/webpack.config.js:8 (`entry: './src/index.ts'`); packages/sidebar/src/index.ts:1 (só reexporta `Sidebar`, sem render); sem `index.html` no diretório | packages/sidebar/webpack.config.js:30-42 (`ModuleFederationPlugin` com `filename: 'remoteEntry.js'`); packages/sidebar/package.json:7 (`webpack --config webpack.config.js`) | package.json:17 (`packages/sidebar`) | — | Undetermined | Build federado próprio, mas a entrada só reexporta o componente e nada no diretório inicia a UI sozinho |

## Resumo

Aplicações frontend no snapshot: 1 (packages/shell).

## Notas

- A classificação registra `frontend_units: 2` (shell e main-content; o sidebar não conta por estar desconectado). Esta revisão conta uma linha Yes: `packages/main-content` e `packages/sidebar` ficaram Undetermined, como os remotes de 039 e 084, porque o build federado produz só o `remoteEntry.js` e a entrada `src/index.ts` apenas reexporta o componente. O Undetermined se refere a rodar o pacote sozinho, não ao seu papel de remote, que é assunto da revisão de composição (seção 3.4.5 do protocolo). A classificação não foi alterada.
- As ocorrências `ops-cors` do `matches.csv` (`packages/*/webpack.config.js:51` e `packages/shell/webpack.config.js:57`) são cabeçalhos do `devServer`, não deploy. Não há Dockerfile, workflow de CI nem configuração de hospedagem no snapshot.
- Cada pacote tem porta própria no `devServer` (shell 3000, main-content 3001, sidebar 3002: `packages/shell/webpack.config.js:50`, `packages/main-content/webpack.config.js:45`, `packages/sidebar/webpack.config.js:45`), mas só para servir o `dist` e o `remoteEntry.js` em desenvolvimento.
