---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 294 — angelantilantil-web/micro-frontend

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| accounts-module | accounts-module/package.json;accounts-module/webpack.config.js | accounts-module/package.json | accounts-module/webpack.config.js:8 (`entry: './src/index.js'`); accounts-module/webpack.config.js:65 (`template: './src/index.html'`); accounts-module/src/index.js:6-7 (`createRoot` + `render`) | accounts-module/webpack.config.js + accounts-module/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios; não referenciado pelo host |
| ai-agent-module | ai-agent-module/package.json;ai-agent-module/webpack.config.js | ai-agent-module/package.json | ai-agent-module/webpack.config.js:8 (`entry: './src/index.js'`); ai-agent-module/webpack.config.js:64 (`template: './src/index.html'`); ai-agent-module/src/index.js:6-7 (`createRoot` + `render`) | ai-agent-module/webpack.config.js + ai-agent-module/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios |
| business-reports | business-reports/package.json;business-reports/webpack.config.js | business-reports/package.json | business-reports/webpack.config.js:8 (`entry: './src/index.js'`); business-reports/webpack.config.js:64 (`template: './src/index.html'`); business-reports/src/index.js:6-7 (`createRoot` + `render`) | business-reports/webpack.config.js + business-reports/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios |
| cards-module | cards-module/package.json;cards-module/webpack.config.js | cards-module/package.json | cards-module/webpack.config.js:8 (`entry: './src/index.js'`); cards-module/webpack.config.js:65 (`template: './src/index.html'`); cards-module/src/index.js:6-7 (`createRoot` + `render`) | cards-module/webpack.config.js + cards-module/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios; não referenciado pelo host |
| host-app | host-app/package.json;host-app/webpack.config.js | host-app/package.json | host-app/webpack.config.js:8 (`entry: './src/index.js'`); host-app/webpack.config.js:70 (`template: './src/index.html'`); host-app/src/index.js:6-7 (`createRoot` + `render`) | host-app/webpack.config.js + host-app/package.json:6 (`webpack --mode production`) | — | — | Yes | Shell React com entrada e build webpack próprios |
| incoming-api-logs | incoming-api-logs/package.json;incoming-api-logs/webpack.config.js | incoming-api-logs/package.json | incoming-api-logs/webpack.config.js:8 (`entry: './src/index.js'`); incoming-api-logs/webpack.config.js:64 (`template: './src/index.html'`); incoming-api-logs/src/index.js:6-7 (`createRoot` + `render`) | incoming-api-logs/webpack.config.js + incoming-api-logs/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios |
| loans-module | loans-module/package.json;loans-module/webpack.config.js | loans-module/package.json | loans-module/webpack.config.js:8 (`entry: './src/index.js'`); loans-module/webpack.config.js:65 (`template: './src/index.html'`); loans-module/src/index.js:6-7 (`createRoot` + `render`) | loans-module/webpack.config.js + loans-module/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios; não referenciado pelo host |
| maker-requests | maker-requests/package.json;maker-requests/webpack.config.js | maker-requests/package.json | maker-requests/webpack.config.js:8 (`entry: './src/index.js'`); maker-requests/webpack.config.js:64 (`template: './src/index.html'`); maker-requests/src/index.js:6-7 (`createRoot` + `render`) | maker-requests/webpack.config.js + maker-requests/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios |
| model-portfolio-configuration | model-portfolio-configuration/package.json;model-portfolio-configuration/webpack.config.js | model-portfolio-configuration/package.json | model-portfolio-configuration/webpack.config.js:8 (`entry: './src/index.js'`); model-portfolio-configuration/webpack.config.js:64 (`template: './src/index.html'`); model-portfolio-configuration/src/index.js:6-7 (`createRoot` + `render`) | model-portfolio-configuration/webpack.config.js + model-portfolio-configuration/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios |
| outgoing-api-logs | outgoing-api-logs/package.json;outgoing-api-logs/webpack.config.js | outgoing-api-logs/package.json | outgoing-api-logs/webpack.config.js:8 (`entry: './src/index.js'`); outgoing-api-logs/webpack.config.js:64 (`template: './src/index.html'`); outgoing-api-logs/src/index.js:6-7 (`createRoot` + `render`) | outgoing-api-logs/webpack.config.js + outgoing-api-logs/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios |
| vro-uploads | vro-uploads/package.json;vro-uploads/webpack.config.js | vro-uploads/package.json | vro-uploads/webpack.config.js:8 (`entry: './src/index.js'`); vro-uploads/webpack.config.js:64 (`template: './src/index.html'`); vro-uploads/src/index.js:6-7 (`createRoot` + `render`) | vro-uploads/webpack.config.js + vro-uploads/package.json:6 (`webpack --mode production`) | — | — | Yes | Remoto React com entrada e build webpack próprios |

## Resumo

Aplicações frontend no snapshot: 11 (accounts-module, ai-agent-module, business-reports, cards-module, host-app, incoming-api-logs, loans-module, maker-requests, model-portfolio-configuration, outgoing-api-logs, vro-uploads).

## Notas

- Não há `package.json` na raiz, e nenhum dos onze `package.json` tem `workspaces` (grep); a marcação `workspace-config` desses arquivos no `artifacts.csv` não corresponde a uma declaração de workspace.
- As onze ocorrências `ops-cors` do `matches.csv` (`<dir>/webpack.config.js:20`) são cabeçalhos CORS do `devServer`, não deploy. `start-all-modules.bat:4-12` só sobe os servidores de desenvolvimento em terminais locais. Não há Dockerfile, CI nem configuração de hospedagem no snapshot.
- O total (11) coincide com `frontend_units: 11` da classificação. `accounts-module`, `cards-module` e `loans-module` são fronteiras de aplicação, mas o host não os referencia (classificação, "Notas para análise"); isso pertence à revisão de composição (seção 3.4.5 do protocolo) e não muda esta etapa.
- `ai-agent-backend/` é o backend Python e não está no `units.csv`, corretamente.
