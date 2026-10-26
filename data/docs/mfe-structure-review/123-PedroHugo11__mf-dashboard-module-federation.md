---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 123 — PedroHugo11/mf-dashboard-module-federation

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| mfe-counter | mfe-counter/index.html;mfe-counter/package.json;mfe-counter/vite.config.ts | mfe-counter/package.json:1-31 (manifesto próprio) | mfe-counter/index.html:10-11 (entrada `/src/main.tsx`); mfe-counter/src/main.tsx:4-6 (monta `CounterWidget` com React) | mfe-counter/vite.config.ts:5-23 (configuração própria); mfe-counter/package.json:8 (`tsc -b && vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| mfe-weather | mfe-weather/index.html;mfe-weather/package.json;mfe-weather/vite.config.ts | mfe-weather/package.json:1-31 (manifesto próprio) | mfe-weather/index.html:10-11 (entrada `/src/main.tsx`); mfe-weather/src/main.tsx:4-6 (monta `WeatherWidget` com React) | mfe-weather/vite.config.ts:5-23 (configuração própria); mfe-weather/package.json:8 (`tsc -b && vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| shell | shell/index.html;shell/package.json;shell/vite.config.ts | shell/package.json:1-31 (manifesto próprio) | shell/index.html:10-11 (entrada `/src/main.tsx`); shell/src/main.tsx:5-7 (monta `App` com React) | shell/vite.config.ts:5-22 (configuração própria); shell/package.json:8 (`tsc -b && vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |

## Resumo

Aplicações frontend no snapshot: 3 (mfe-counter, mfe-weather, shell).

## Notas

- Não há `package.json` na raiz nem declaração de workspace; os itens `workspace-config` do `artifacts.csv` são os `package.json` e `tsconfig*.json` de cada diretório, sem `workspaces`. O `matches.csv` não tem ocorrências `ws-*`, `ops-*` ou `ci-*`, e o snapshot não tem Dockerfile, CI nem configuração de hospedagem.
- N = 3 coincide com `frontend_units: 3` da classificação.
