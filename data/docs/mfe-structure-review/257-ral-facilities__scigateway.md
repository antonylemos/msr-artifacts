---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 257 — ral-facilities/scigateway

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;vite.config.ts | package.json | index.html:32 (`<script type="module" src="/src/main.tsx">`, entrada do Vite); src/main.tsx:6-9 (`createRoot(...).render(<App .../>)`) | vite.config.ts:35-53 (`defineConfig`, com `plugins` e `build`) + package.json:57 (`"build": "tsc --project tsconfig.build.json && vite build"`) | — | Dockerfile:4, 23 e 31 (estágio `builder`, `RUN yarn build`, cópia de `dist/` para o httpd); .github/workflows/docker-release-build.yml:42-46 (`docker/build-push-action` com `context: .` e `file: ./Dockerfile`) | Yes | Aplicação Vite com entrada própria, build próprio e imagem Docker. |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra `frontend_units: 2`: o host (raiz) e o plugin `demo_plugin`, construído em outro repositório e referenciado por `public/settings.example.json:15-22` e `server/e2e-settings.json:7-14`. O plugin não está no snapshot como fonte e não vira linha; `server/e2e-plugin/main.js` é só o bundle compilado usado nos testes e2e.
- `server/` e `micro-frontend-tools/` têm scripts Node (servidores de teste e de plugins) sem `package.json` próprio e não aparecem no `units.csv`; não são frontend.
- `package.json` aparece como `workspace-config` no `artifacts.csv`, mas não declara `workspaces`, e não há ocorrências `ws-*` no `matches.csv`. O `yarn workspaces focus --production` do `Dockerfile:19` é um comando do Yarn, não uma declaração de workspace.
