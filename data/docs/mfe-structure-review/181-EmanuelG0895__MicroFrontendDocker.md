---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 181 — EmanuelG0895/MicroFrontendDocker

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| MF-CharacterDetail | MF-CharacterDetail/index.html;MF-CharacterDetail/module-federation.config.ts;MF-CharacterDetail/package.json;MF-CharacterDetail/rspack.config.ts;MF-CharacterDetail/webpack.config.js | MF-CharacterDetail/package.json | MF-CharacterDetail/rspack.config.ts:17-19 (`entry.main: ./src/index.ts`); MF-CharacterDetail/rspack.config.ts:83-85 (`HtmlRspackPlugin` com `./index.html`); MF-CharacterDetail/src/App.tsx:14-15 (`createRoot(...).render(<App />)`) | MF-CharacterDetail/rspack.config.ts:15-97 + MF-CharacterDetail/package.json:5 (`rspack build`) | — | MF-CharacterDetail/Dockerfile:1-40 (build multi-stage próprio, `EXPOSE 3002`); docker-compose.yml:52-55 (serviço `mf-character-detail` com `context: ./MF-CharacterDetail`) | Yes | App React com entrada e build Rspack próprios (remote de Module Federation) |
| MF-Characters | MF-Characters/index.html;MF-Characters/module-federation.config.ts;MF-Characters/package.json;MF-Characters/rspack.config.ts;MF-Characters/webpack.config.js | MF-Characters/package.json | MF-Characters/rspack.config.ts:17-19 (`entry.main: ./src/index.ts`); MF-Characters/rspack.config.ts:78-80 (`HtmlRspackPlugin` com `./index.html`); MF-Characters/src/App.tsx:8-9 (`createRoot(...).render(<App />)`) | MF-Characters/rspack.config.ts:15-92 + MF-Characters/package.json:5 (`rspack build`) | — | MF-Characters/Dockerfile:1-40 (build multi-stage próprio, `EXPOSE 3001`); docker-compose.yml:35-38 (serviço `mf-characters` com `context: ./MF-Characters`) | Yes | App React com entrada e build Rspack próprios (remote de Module Federation) |
| MF-Shell | MF-Shell/index.html;MF-Shell/module-federation.config.ts;MF-Shell/package.json;MF-Shell/rspack.config.ts | MF-Shell/package.json | MF-Shell/rspack.config.ts:16-18 (`entry.main: ./src/index.ts`); MF-Shell/rspack.config.ts:95-97 (`HtmlRspackPlugin` com `./index.html`); MF-Shell/src/App.tsx:55-56 (`createRoot(...).render(<App />)`) | MF-Shell/rspack.config.ts:14-110 + MF-Shell/package.json:5 (`rspack build`) | — | Dockerfile:1-44 (na raiz, constrói só `MF-Shell/`, linhas 7-8 e 15, `EXPOSE 3000`); docker-compose.yml:18-21 (serviço `mf-shell` com esse Dockerfile) | Yes | App React host com entrada e build Rspack próprios |

## Resumo

Aplicações frontend no snapshot: 3 (MF-CharacterDetail, MF-Characters, MF-Shell).

## Notas

- `MF-Characters/pnpm-workspace.yaml:1-2` e `MF-Shell/pnpm-workspace.yaml:1-2` (marcados `workspace-config` no `artifacts.csv`) só têm `ignoredBuiltDependencies` (`@tailwindcss/oxide`), sem `packages`; não declaram workspace. Cada projeto tem lockfile próprio.
- O `matches.csv` não tem ocorrências `ci-*`; tem 3 `ws-path-alias` (`paths` dos `tsconfig.json` de MF-CharacterDetail, MF-Characters e MF-Shell, linha 15) e 28 `ops-*` (6 `ops-dockerfile`, 5 `ops-deployment-file`, 5 `ops-compose-service`, 9 `ops-proxy-route`, 3 `ops-cors`), entre eles os Dockerfiles e o `docker-compose.yml`, que foram abertos diretamente. Não há workflow de CI.
- `MF-Characters/webpack.config.js` e `MF-CharacterDetail/webpack.config.js` são marcadores, mas nenhum script do `package.json` usa webpack (`package.json:5-9`, só `rspack`); a entrada e o build citados são os do `rspack.config.ts`.
- N = 3 coincide com `frontend_units: 3` da classificação.
