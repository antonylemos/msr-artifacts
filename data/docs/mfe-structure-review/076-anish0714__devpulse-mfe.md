---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 076 — anish0714/devpulse-mfe

## Workspace

`package.json:5-7` declara `workspaces` com `packages/*` (npm workspaces).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-13 (manifesto da raiz, sem dependências) | — | package.json:10 (`npm run build --workspaces --if-present`, só delega aos workspaces) | — | — | No | Raiz do workspace npm, sem entrada nem configuração de build próprias. |
| packages/dev-utils-remote | packages/dev-utils-remote/package.json;packages/dev-utils-remote/webpack.config.js | packages/dev-utils-remote/package.json:1-26 (manifesto próprio) | packages/dev-utils-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/dev-utils-remote/src/index.ts:3 (`import("./bootstrap")`); packages/dev-utils-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/dev-utils-remote/webpack.config.js:44 (`HtmlWebpackPlugin` com `./public/index.html`) | packages/dev-utils-remote/webpack.config.js:9-46 (configuração webpack própria, `ModuleFederationPlugin` `devUtils` em :33-43, porta 3005 em :28); packages/dev-utils-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` com `packages/*`) | — | Yes | Remote React com entrada que monta a UI e build webpack próprios. |
| packages/ocr-remote | packages/ocr-remote/package.json;packages/ocr-remote/webpack.config.js | packages/ocr-remote/package.json:1-28 (manifesto próprio) | packages/ocr-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/ocr-remote/src/index.ts:3 (`import("./bootstrap")`); packages/ocr-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/ocr-remote/webpack.config.js:44 (`HtmlWebpackPlugin` com `./public/index.html`) | packages/ocr-remote/webpack.config.js:9-46 (configuração webpack própria, `ModuleFederationPlugin` `ocr` em :33-43, porta 3007 em :28); packages/ocr-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` com `packages/*`) | — | Yes | Remote React com entrada que monta a UI e build webpack próprios. |
| packages/pdf-conversion-remote | packages/pdf-conversion-remote/package.json;packages/pdf-conversion-remote/webpack.config.js | packages/pdf-conversion-remote/package.json:1-32 (manifesto próprio) | packages/pdf-conversion-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/pdf-conversion-remote/src/index.ts:3 (`import("./bootstrap")`); packages/pdf-conversion-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/pdf-conversion-remote/webpack.config.js:44 (`HtmlWebpackPlugin` com `./public/index.html`) | packages/pdf-conversion-remote/webpack.config.js:9-46 (configuração webpack própria, `ModuleFederationPlugin` `pdfConversion` em :33-43, porta 3003 em :28); packages/pdf-conversion-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` com `packages/*`) | .github/workflows/ci.yml:18,36 (matriz que constrói só este workspace: `npm run build --workspace=packages/${{ matrix.package }}`); .github/workflows/deploy.yml:43 (copia `packages/pdf-conversion-remote/dist` para `site/remotes/pdf-conversion/`, publicado no GitHub Pages em :46-60) | Yes | Remote React com entrada que monta a UI e build webpack próprios. |
| packages/pdf-form-filler-remote | packages/pdf-form-filler-remote/package.json;packages/pdf-form-filler-remote/webpack.config.js | packages/pdf-form-filler-remote/package.json:1-28 (manifesto próprio) | packages/pdf-form-filler-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/pdf-form-filler-remote/src/index.ts:3 (`import("./bootstrap")`); packages/pdf-form-filler-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/pdf-form-filler-remote/webpack.config.js:44 (`HtmlWebpackPlugin` com `./public/index.html`) | packages/pdf-form-filler-remote/webpack.config.js:9-46 (configuração webpack própria, `ModuleFederationPlugin` `pdfFormFiller` em :33-43, porta 3006 em :28); packages/pdf-form-filler-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` com `packages/*`) | — | Yes | Remote React com entrada que monta a UI e build webpack próprios. |
| packages/pdf-manipulation-remote | packages/pdf-manipulation-remote/package.json;packages/pdf-manipulation-remote/webpack.config.js | packages/pdf-manipulation-remote/package.json:1-28 (manifesto próprio) | packages/pdf-manipulation-remote/webpack.config.js:10 (`entry: "./src/index.ts"`); packages/pdf-manipulation-remote/src/index.ts:3 (`import("./bootstrap")`); packages/pdf-manipulation-remote/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/pdf-manipulation-remote/webpack.config.js:44 (`HtmlWebpackPlugin` com `./public/index.html`) | packages/pdf-manipulation-remote/webpack.config.js:9-46 (configuração webpack própria, `ModuleFederationPlugin` `pdfManipulation` em :33-43, porta 3004 em :28); packages/pdf-manipulation-remote/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` com `packages/*`) | .github/workflows/ci.yml:18,36 (matriz que constrói só este workspace: `npm run build --workspace=packages/${{ matrix.package }}`); .github/workflows/deploy.yml:44 (copia `packages/pdf-manipulation-remote/dist` para `site/remotes/pdf-manipulation/`, publicado no GitHub Pages em :46-60) | Yes | Remote React com entrada que monta a UI e build webpack próprios. |
| packages/shell | packages/shell/package.json;packages/shell/webpack.config.js | packages/shell/package.json:1-26 (manifesto próprio) | packages/shell/webpack.config.js:28 (`entry: "./src/index.ts"`); packages/shell/src/index.ts:3 (`import("./bootstrap")`); packages/shell/src/bootstrap.tsx:4-7 (`createRoot(container).render(<App />)`); packages/shell/webpack.config.js:64 (`HtmlWebpackPlugin` com `./public/index.html`) | packages/shell/webpack.config.js:8-66 (configuração webpack própria, `ModuleFederationPlugin` `shell` com cinco remotes em :50-63); packages/shell/package.json:7 (`webpack build --mode production`) | package.json:5-7 (`workspaces` com `packages/*`) | .github/workflows/ci.yml:18,36 (matriz que constrói só este workspace: `npm run build --workspace=packages/${{ matrix.package }}`); .github/workflows/deploy.yml:42 (copia `packages/shell/dist` para a raiz de `site/`, publicado no GitHub Pages em :46-60) | Yes | Host React com entrada que monta a UI e build webpack próprios. |

## Resumo

Aplicações frontend no snapshot: 6 (packages/dev-utils-remote, packages/ocr-remote, packages/pdf-conversion-remote, packages/pdf-form-filler-remote, packages/pdf-manipulation-remote, packages/shell).

## Notas

- N = 6 coincide com `frontend_units: 6` da classificação (shell e cinco remotes, todos no snapshot).
- `.github/workflows/deploy.yml:37` constrói todos os workspaces, mas `:41-44` só copia para o site publicado o shell e os remotes `pdf-conversion` e `pdf-manipulation`. Os remotes `dev-utils`, `ocr` e `pdf-form-filler` não são publicados por esse workflow, embora `packages/shell/webpack.config.js:17-25` aponte, em produção, para `remotes/dev-utils/`, `remotes/pdf-form-filler/` e `remotes/ocr/`. A matriz de `.github/workflows/ci.yml:18` também cobre só os três primeiros. Por isso a coluna Deploy dessas três linhas fica `—`; isso não muda a resposta, porque deploy separado não é exigido para `Yes`.
