---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Workspace

`package.json:4-6` (`workspaces` com `packages/*`), com `lerna.json:1-4` (só `$schema` e `version`, sem lista de pacotes própria).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-14 (manifesto da raiz do workspace) | — | — (package.json:8 `lerna run dev` só orquestra os membros; sem script `build`) | — | — (.github/workflows/main_vdumpavue3.yml:26-33 e 61-73 compactam e publicam o repositório inteiro num Azure Web App, sem build de UI da raiz) | No | Raiz de coordenação do workspace, sem entrada nem build de UI próprios. |
| packages/app-1 | packages/app-1/package.json;packages/app-1/vite.config.js | packages/app-1/package.json:1-19 | packages/app-1/index.html:11 (`/src/main.js`); packages/app-1/src/main.js:5 (monta a UI Vue) | packages/app-1/vite.config.js:6-21 (config própria, porta 5011); packages/app-1/package.json:8 (`vite build`) | package.json:5 (`packages/*`) | — | Yes | Aplicação Vue/Vite com entrada e build próprios. |
| packages/app-2 | packages/app-2/package.json;packages/app-2/vite.config.js | packages/app-2/package.json:1-19 | packages/app-2/index.html:11 (`/src/main.js`); packages/app-2/src/main.js:5 (monta a UI Vue) | packages/app-2/vite.config.js:6-21 (config própria, porta 5012); packages/app-2/package.json:8 (`vite build`) | package.json:5 (`packages/*`) | — | Yes | Aplicação Vue/Vite com entrada e build próprios. |
| packages/host | packages/host/package.json;packages/host/vite.config.js | packages/host/package.json:1-21 | packages/host/index.html:11 (`/src/main.js`); packages/host/src/main.js:8-17 (cria e monta a UI Vue) | packages/host/vite.config.js:7-24 (config própria, porta 5010); packages/host/package.json:8 (`vite build`) | package.json:5 (`packages/*`) | — | Yes | Aplicação Vue/Vite com entrada e build próprios. |

## Resumo

Aplicações frontend no snapshot: 3 (packages/app-1, packages/app-2, packages/host).

## Notas

- N = 3 coincide com `frontend_units: 3` da classificação.
- O único workflow (`.github/workflows/main_vdumpavue3.yml`, `ci-workflow-file` no `matches.csv`) roda `npm run build --if-present` na raiz, que não define `build` (`:26-30`), e publica o zip do repositório inteiro (`:32-33`, `:72-73`); não constrói nem publica nenhum pacote separadamente, por isso nenhuma linha tem deploy.
