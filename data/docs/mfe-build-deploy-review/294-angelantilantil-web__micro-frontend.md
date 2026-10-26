---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
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

# 294 — angelantilantil-web/micro-frontend

## Leitura do repositório

Onze aplicações React com webpack, cada uma num diretório próprio, sem `package.json` na raiz nem workspace (revisão estrutural). Todas seguem o mesmo esqueleto: `start` roda `webpack serve` numa porta fixa e `build` roda `webpack --mode production` (por exemplo host-app/package.json:4-7), e o `webpack.config.js` de cada uma tem entrada própria e grava em `<diretório>/dist` com `publicPath: 'auto'` (por exemplo host-app/webpack.config.js:8-13). O arquivo declara `mode: 'development'` (host-app/webpack.config.js:7), que o `--mode production` do script de build sobrepõe. Cada build é independente: não há script que construa todas de uma vez, e o README manda entrar em cada diretório e rodar `npm run build` (README.md:176-199), listando só o host e seis dos remotos. O `.gitignore` exclui `dist/` e `remoteEntry.js` (.gitignore:11, 44), então nenhum artefato de build está versionado.

Não há artefato de deploy no snapshot: nenhum Dockerfile, compose, CI, configuração de nginx ou de hospedagem, e o `matches.csv` não tem nenhuma ocorrência `ci-*`. As onze ocorrências `cfg-public-path` são o `publicPath: 'auto'` da linha 11 de cada `webpack.config.js`, configuração de build que não indica onde a aplicação é publicada. As onze `ops-cors` são os cabeçalhos `Access-Control-Allow-*` do `devServer` (linhas 19-23 de cada `webpack.config.js`, por exemplo host-app/webpack.config.js:19-23), necessários para o host buscar os `remoteEntry.js` de outra porta em desenvolvimento. O que existe para rodar o conjunto é o start-all-modules.bat, que abre um terminal por aplicação com `npm start` e um para o backend Python com `uvicorn --reload` na porta 8000 (start-all-modules.bat:4-12): é desenvolvimento local, e deixa de fora `accounts-module`, `cards-module` e `loans-module`, que o host também não carrega (revisão de composição). Os endereços dos remotes no host são todos `http://localhost:30xx/remoteEntry.js` (host-app/webpack.config.js:47-55). O backend `ai-agent-backend/` (FastAPI com `CORSMiddleware`, ai-agent-backend/app.py:108-110) não tem empacotamento próprio e não é unidade frontend. O README afirma que os remotos podem ser "independently developed and deployed" (README.md:24), mas nada no snapshot os publica.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | accounts-module | separado | não observado | `http://localhost:3001` em desenvolvimento (accounts-module/webpack.config.js:15; accounts-module/package.json:5) | No | accounts-module/package.json:6 (`webpack --mode production`); accounts-module/webpack.config.js:8-13 (entrada própria, saída `accounts-module/dist`, `publicPath: 'auto'`) |
| 2 | ai-agent-module | separado | não observado | `http://localhost:3016` em desenvolvimento (ai-agent-module/webpack.config.js:15; ai-agent-module/package.json:5) | No | ai-agent-module/package.json:6 (`webpack --mode production`); ai-agent-module/webpack.config.js:8-13 (entrada própria, saída `ai-agent-module/dist`, `publicPath: 'auto'`) |
| 3 | business-reports | separado | não observado | `http://localhost:3010` em desenvolvimento (business-reports/webpack.config.js:15; business-reports/package.json:5) | No | business-reports/package.json:6 (`webpack --mode production`); business-reports/webpack.config.js:8-13 (entrada própria, saída `business-reports/dist`, `publicPath: 'auto'`) |
| 4 | cards-module | separado | não observado | `http://localhost:3003` em desenvolvimento (cards-module/webpack.config.js:15; cards-module/package.json:5) | No | cards-module/package.json:6 (`webpack --mode production`); cards-module/webpack.config.js:8-13 (entrada própria, saída `cards-module/dist`, `publicPath: 'auto'`) |
| 5 | host-app | separado | não observado | `http://localhost:3000` em desenvolvimento (host-app/webpack.config.js:15; host-app/package.json:5) | No | host-app/package.json:6 (`webpack --mode production`); host-app/webpack.config.js:8-13 (entrada própria, saída `host-app/dist`, `publicPath: 'auto'`) |
| 6 | incoming-api-logs | separado | não observado | `http://localhost:3013` em desenvolvimento (incoming-api-logs/webpack.config.js:15; incoming-api-logs/package.json:5) | No | incoming-api-logs/package.json:6 (`webpack --mode production`); incoming-api-logs/webpack.config.js:8-13 (entrada própria, saída `incoming-api-logs/dist`, `publicPath: 'auto'`) |
| 7 | loans-module | separado | não observado | `http://localhost:3002` em desenvolvimento (loans-module/webpack.config.js:15; loans-module/package.json:5) | No | loans-module/package.json:6 (`webpack --mode production`); loans-module/webpack.config.js:8-13 (entrada própria, saída `loans-module/dist`, `publicPath: 'auto'`) |
| 8 | maker-requests | separado | não observado | `http://localhost:3014` em desenvolvimento (maker-requests/webpack.config.js:15; maker-requests/package.json:5) | No | maker-requests/package.json:6 (`webpack --mode production`); maker-requests/webpack.config.js:8-13 (entrada própria, saída `maker-requests/dist`, `publicPath: 'auto'`) |
| 9 | model-portfolio-configuration | separado | não observado | `http://localhost:3011` em desenvolvimento (model-portfolio-configuration/webpack.config.js:15; model-portfolio-configuration/package.json:5) | No | model-portfolio-configuration/package.json:6 (`webpack --mode production`); model-portfolio-configuration/webpack.config.js:8-13 (entrada própria, saída `model-portfolio-configuration/dist`, `publicPath: 'auto'`) |
| 10 | outgoing-api-logs | separado | não observado | `http://localhost:3012` em desenvolvimento (outgoing-api-logs/webpack.config.js:15; outgoing-api-logs/package.json:5) | No | outgoing-api-logs/package.json:6 (`webpack --mode production`); outgoing-api-logs/webpack.config.js:8-13 (entrada própria, saída `outgoing-api-logs/dist`, `publicPath: 'auto'`) |
| 11 | vro-uploads | separado | não observado | `http://localhost:3015` em desenvolvimento (vro-uploads/webpack.config.js:15; vro-uploads/package.json:5) | No | vro-uploads/package.json:6 (`webpack --mode production`); vro-uploads/webpack.config.js:8-13 (entrada própria, saída `vro-uploads/dist`, `publicPath: 'auto'`) |

## Observações

**1. accounts-module.** Remoto pronto que o host não declara nos remotes (host-app/webpack.config.js:47-55). Build separado: `webpack --mode production` (accounts-module/package.json:6) gera `accounts-module/dist` (accounts-module/webpack.config.js:10). Deploy não observado: o único endereço é o do servidor de desenvolvimento na porta 3001 (accounts-module/package.json:5; accounts-module/webpack.config.js:15), e nem o start-all-modules.bat o sobe (start-all-modules.bat:4-12). Versionamento No: `version: 1.0.0` (accounts-module/package.json:3) não é usado em nenhuma publicação.

**2. ai-agent-module.** Remoto `aiAgent`, carregado pelo host (host-app/webpack.config.js:54). Build separado: `webpack --mode production` (ai-agent-module/package.json:6) gera `ai-agent-module/dist` (ai-agent-module/webpack.config.js:10). Ele tem uma chamada ao backend Python em `http://localhost:8000/chat`, mas ela está dentro de um bloco comentado (ai-agent-module/src/App.js:84-109, "API integration is currently disabled for static demo mode"); o backend tem processo próprio (start-all-modules.bat:11) e não entra no build do frontend. Deploy não observado: só o servidor de desenvolvimento na porta 3016 (ai-agent-module/package.json:5; ai-agent-module/webpack.config.js:15), disparado por start-all-modules.bat:12. A seção de build do README não o inclui (README.md:176-199). Versionamento No: `version: 1.0.0` (ai-agent-module/package.json:3) não é usado em nenhuma publicação.

**3. business-reports.** Remoto `businessReports`, carregado pelo host (host-app/webpack.config.js:48). Build separado: `webpack --mode production` (business-reports/package.json:6) gera `business-reports/dist` (business-reports/webpack.config.js:10), com o `remoteEntry.js` dela. Deploy não observado: só o servidor de desenvolvimento na porta 3010 (business-reports/package.json:5; business-reports/webpack.config.js:15), disparado por start-all-modules.bat:5. Versionamento No: `version: 1.0.0` (business-reports/package.json:3) não é usado em nenhuma publicação.

**4. cards-module.** Remoto pronto que o host não declara nos remotes (host-app/webpack.config.js:47-55). Build separado: `webpack --mode production` (cards-module/package.json:6) gera `cards-module/dist` (cards-module/webpack.config.js:10). Deploy não observado: o único endereço é o do servidor de desenvolvimento na porta 3003 (cards-module/package.json:5; cards-module/webpack.config.js:15), e nem o start-all-modules.bat o sobe (start-all-modules.bat:4-12). Versionamento No: `version: 1.0.0` (cards-module/package.json:3) não é usado em nenhuma publicação.

**5. host-app.** Shell. Build separado: `webpack --mode production` (host-app/package.json:6) gera `host-app/dist` (host-app/webpack.config.js:10) só com o código do host; os sete remotos entram em tempo de execução pelos endereços `http://localhost:30xx/remoteEntry.js` (host-app/webpack.config.js:47-55), não no bundle. Deploy não observado: só o servidor de desenvolvimento na porta 3000 (host-app/package.json:5; host-app/webpack.config.js:15), disparado por start-all-modules.bat:4. Versionamento No: `version: 1.0.0` (host-app/package.json:3) não é usado em nenhuma publicação.

**6. incoming-api-logs.** Remoto `incomingApiLogs`, carregado pelo host (host-app/webpack.config.js:51). Build separado: `webpack --mode production` (incoming-api-logs/package.json:6) gera `incoming-api-logs/dist` (incoming-api-logs/webpack.config.js:10), com o `remoteEntry.js` dela. Deploy não observado: só o servidor de desenvolvimento na porta 3013 (incoming-api-logs/package.json:5; incoming-api-logs/webpack.config.js:15), disparado por start-all-modules.bat:8. Versionamento No: `version: 1.0.0` (incoming-api-logs/package.json:3) não é usado em nenhuma publicação.

**7. loans-module.** Remoto pronto que o host não declara nos remotes (host-app/webpack.config.js:47-55). Build separado: `webpack --mode production` (loans-module/package.json:6) gera `loans-module/dist` (loans-module/webpack.config.js:10). Deploy não observado: o único endereço é o do servidor de desenvolvimento na porta 3002 (loans-module/package.json:5; loans-module/webpack.config.js:15), e nem o start-all-modules.bat o sobe (start-all-modules.bat:4-12). Versionamento No: `version: 1.0.0` (loans-module/package.json:3) não é usado em nenhuma publicação.

**8. maker-requests.** Remoto `makerRequests`, carregado pelo host (host-app/webpack.config.js:52). Build separado: `webpack --mode production` (maker-requests/package.json:6) gera `maker-requests/dist` (maker-requests/webpack.config.js:10), com o `remoteEntry.js` dela. Deploy não observado: só o servidor de desenvolvimento na porta 3014 (maker-requests/package.json:5; maker-requests/webpack.config.js:15), disparado por start-all-modules.bat:9. Versionamento No: `version: 1.0.0` (maker-requests/package.json:3) não é usado em nenhuma publicação.

**9. model-portfolio-configuration.** Remoto `modelPortfolio`, carregado pelo host (host-app/webpack.config.js:49). Build separado: `webpack --mode production` (model-portfolio-configuration/package.json:6) gera `model-portfolio-configuration/dist` (model-portfolio-configuration/webpack.config.js:10), com o `remoteEntry.js` dela. Deploy não observado: só o servidor de desenvolvimento na porta 3011 (model-portfolio-configuration/package.json:5; model-portfolio-configuration/webpack.config.js:15), disparado por start-all-modules.bat:6. Versionamento No: `version: 1.0.0` (model-portfolio-configuration/package.json:3) não é usado em nenhuma publicação.

**10. outgoing-api-logs.** Remoto `outgoingApiLogs`, carregado pelo host (host-app/webpack.config.js:50). Build separado: `webpack --mode production` (outgoing-api-logs/package.json:6) gera `outgoing-api-logs/dist` (outgoing-api-logs/webpack.config.js:10), com o `remoteEntry.js` dela. Deploy não observado: só o servidor de desenvolvimento na porta 3012 (outgoing-api-logs/package.json:5; outgoing-api-logs/webpack.config.js:15), disparado por start-all-modules.bat:7. Versionamento No: `version: 1.0.0` (outgoing-api-logs/package.json:3) não é usado em nenhuma publicação.

**11. vro-uploads.** Remoto `vroUploads`, carregado pelo host (host-app/webpack.config.js:53). Build separado: `webpack --mode production` (vro-uploads/package.json:6) gera `vro-uploads/dist` (vro-uploads/webpack.config.js:10), com o `remoteEntry.js` dela. Deploy não observado: só o servidor de desenvolvimento na porta 3015 (vro-uploads/package.json:5; vro-uploads/webpack.config.js:15), disparado por start-all-modules.bat:10. Versionamento No: `version: 1.0.0` (vro-uploads/package.json:3) não é usado em nenhuma publicação.

## Resumo

Aplicações: 11. Build (separado: 11). Deploy (não observado: 11). Versionamento independente: 0.
