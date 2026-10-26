---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 294 — angelantilantil-web/micro-frontend

## Leitura do repositório

Painel bancário de demonstração com onze aplicações React em diretórios próprios, todas com o `ModuleFederationPlugin` embutido do webpack. Por isso não há observação de dependência: a revisão de dependências não tem linha de tecnologia. A cadeia que sustenta a arquitetura é:
- **Configuração:** o host declara sete remotes do próprio repositório (#5), e cada um desses remotes se declara com nome próprio e expõe um módulo (#2, #3, #6, #8 a #11).
- **Código:** o host importa cada remote pelo nome com `React.lazy` (#12 a #18) e monta os sete numa tabela de rotas (#19).
- **Relações:** isso resulta em sete relações host → remote ativas (#32 a #38).
- **Estrutura e build:** as onze unidades têm limite (#21 a #31) e build próprios (#39 a #49), mas nenhuma tem deploy observado: o único endereço de cada uma é o servidor de desenvolvimento.

Sinais que enganam se lidos sozinhos:
- **Remotes sem consumidor:** accounts-module, cards-module e loans-module estão configurados como remotes, com aplicação e serviço expostos (#1, #4, #7), mas o host não os declara (#5). São unidades (#21, #24, #27) fora da composição.
- **Event bus:** o host expõe um bus global (#20), sem publicador; os únicos assinantes são os três módulos não carregados. Não há comunicação entre unidades compostas.
- **Documentação:** ela confirma o conjunto shell e remotes (#50, #63) e a carga por rota das unidades ligadas, mas exagera em três frentes. Diz que o host carrega todos os módulos, inclusive os três sem consumidor (#60, #71, #82, #93, #104); atribui comunicação e store compartilhados ao bus (#66, #72, #73, #83, #84, #94, #95); e promete estilos isolados que o CSS global sem escopo desmente (#70, #77, #81, #92, #97, #100, #103, #106). O deploy independente fica sem corroboração (#65).

O histórico (#108 a #110) não decide se o host já carregou os três módulos ou se o bus já teve publicador, porque as versões antigas do host não estão no clone; mostra só que a promessa de isolamento e o CSS sem escopo coexistem desde o primeiro commit. Nenhuma dessas dúvidas muda a leitura do snapshot: sete relações ativas e três remotes sem consumidor.

## Observações

### 1. accounts-module/webpack.config.js:2, 44-63

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'accountsModule'` e `filename: 'remoteEntry.js'`, expõe `./AccountsApp` e `./AccountsService` (`./src/App.js` e `./src/accountsService.js`) e compartilha `react` e `react-dom` como singleton, `eager`. Nenhuma configuração de outra unidade declara esse nome como remote.

**Interpretação:** `accounts-module` está configurado como remote com nome próprio e oferece aplicação e serviço, mas sem consumidor no snapshot.

### 2. ai-agent-module/webpack.config.js:2, 44-62

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'aiAgent'` e `filename: 'remoteEntry.js'`, expõe `./AIAgentApp` (`./src/App.js`) e compartilha `react` e `react-dom` como singleton, `eager`.

**Interpretação:** `ai-agent-module` está configurado como remote com nome próprio e oferece um módulo a um host.

### 3. business-reports/webpack.config.js:2, 44-62

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'businessReports'` e `filename: 'remoteEntry.js'`, expõe `./BusinessReportsApp` (`./src/App.js`) e compartilha `react` e `react-dom` como singleton, `eager`.

**Interpretação:** `business-reports` está configurado como remote com nome próprio e oferece um módulo a um host.

### 4. cards-module/webpack.config.js:2, 44-63

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'cardsModule'` e `filename: 'remoteEntry.js'`, expõe `./CardsApp` e `./CardsService` (`./src/App.js` e `./src/cardsService.js`) e compartilha `react` e `react-dom` como singleton, `eager`. Nenhuma configuração de outra unidade declara esse nome como remote.

**Interpretação:** `cards-module` está configurado como remote com nome próprio e oferece aplicação e serviço, mas sem consumidor no snapshot.

### 5. host-app/webpack.config.js:2, 44-68

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (`webpack/lib/container/ModuleFederationPlugin`, linha 2) e o configura com `name: 'hdfcHostApp'`, `filename: 'remoteEntry.js'` e sem `exposes`. Declara sete remotes, todos em `http://localhost:30xx/remoteEntry.js`: `businessReports` (3010), `modelPortfolio` (3011), `outgoingApiLogs` (3012), `incomingApiLogs` (3013), `makerRequests` (3014), `vroUploads` (3015) e `aiAgent` (3016) (linhas 47-55). Compartilha `react` e `react-dom` como singleton, `eager`, com a versão do próprio `package.json` (linhas 56-67). Não há remote para `accountsModule`, `cardsModule` nem `loansModule`.

**Interpretação:** A configuração do host declara sete unidades do repositório como remotes e onde encontrá-las em desenvolvimento; as outras três unidades preparadas como remotes ficam de fora.

### 6. incoming-api-logs/webpack.config.js:2, 44-62

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'incomingApiLogs'` e `filename: 'remoteEntry.js'`, expõe `./IncomingApiLogsApp` (`./src/App.js`) e compartilha `react` e `react-dom` como singleton, `eager`.

**Interpretação:** `incoming-api-logs` está configurado como remote com nome próprio e oferece um módulo a um host.

### 7. loans-module/webpack.config.js:2, 44-63

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'loansModule'` e `filename: 'remoteEntry.js'`, expõe `./LoansApp` e `./LoansService` (`./src/App.js` e `./src/loansService.js`) e compartilha `react` e `react-dom` como singleton, `eager`. Nenhuma configuração de outra unidade declara esse nome como remote.

**Interpretação:** `loans-module` está configurado como remote com nome próprio e oferece aplicação e serviço, mas sem consumidor no snapshot.

### 8. maker-requests/webpack.config.js:2, 44-62

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'makerRequests'` e `filename: 'remoteEntry.js'`, expõe `./MakerRequestsApp` (`./src/App.js`) e compartilha `react` e `react-dom` como singleton, `eager`.

**Interpretação:** `maker-requests` está configurado como remote com nome próprio e oferece um módulo a um host.

### 9. model-portfolio-configuration/webpack.config.js:2, 44-62

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'modelPortfolio'` e `filename: 'remoteEntry.js'`, expõe `./ModelPortfolioApp` (`./src/App.js`) e compartilha `react` e `react-dom` como singleton, `eager`.

**Interpretação:** `model-portfolio-configuration` está configurado como remote com nome próprio e oferece um módulo a um host.

### 10. outgoing-api-logs/webpack.config.js:2, 44-62

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'outgoingApiLogs'` e `filename: 'remoteEntry.js'`, expõe `./OutgoingApiLogsApp` (`./src/App.js`) e compartilha `react` e `react-dom` como singleton, `eager`.

**Interpretação:** `outgoing-api-logs` está configurado como remote com nome próprio e oferece um módulo a um host.

### 11. vro-uploads/webpack.config.js:2, 44-62

**Observação:** Importa o `ModuleFederationPlugin` embutido do webpack (linha 2) e o configura com `name: 'vroUploads'` e `filename: 'remoteEntry.js'`, expõe `./VroUploadsApp` (`./src/App.js`) e compartilha `react` e `react-dom` como singleton, `eager`.

**Interpretação:** `vro-uploads` está configurado como remote com nome próprio e oferece um módulo a um host.

### 12. host-app/src/App.js:30-33

**Observação:** `React.lazy(() => import('businessReports/BusinessReportsApp'))`, com um `.catch` que registra o erro e devolve um componente `ModuleLoadUnavailable` no lugar do módulo.

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `businessReports`, a unidade `business-reports`, pelo nome.

### 13. host-app/src/App.js:34-37

**Observação:** `React.lazy(() => import('modelPortfolio/ModelPortfolioApp'))`, com um `.catch` que registra o erro e devolve um componente `ModuleLoadUnavailable` no lugar do módulo.

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `modelPortfolio`, a unidade `model-portfolio-configuration`, pelo nome.

### 14. host-app/src/App.js:38-41

**Observação:** `React.lazy(() => import('outgoingApiLogs/OutgoingApiLogsApp'))`, com um `.catch` que registra o erro e devolve um componente `ModuleLoadUnavailable` no lugar do módulo.

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `outgoingApiLogs`, a unidade `outgoing-api-logs`, pelo nome.

### 15. host-app/src/App.js:42-45

**Observação:** `React.lazy(() => import('incomingApiLogs/IncomingApiLogsApp'))`, com um `.catch` que registra o erro e devolve um componente `ModuleLoadUnavailable` no lugar do módulo.

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `incomingApiLogs`, a unidade `incoming-api-logs`, pelo nome.

### 16. host-app/src/App.js:46-49

**Observação:** `React.lazy(() => import('makerRequests/MakerRequestsApp'))`, com um `.catch` que registra o erro e devolve um componente `ModuleLoadUnavailable` no lugar do módulo.

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `makerRequests`, a unidade `maker-requests`, pelo nome.

### 17. host-app/src/App.js:50-53

**Observação:** `React.lazy(() => import('vroUploads/VroUploadsApp'))`, com um `.catch` que registra o erro e devolve um componente `ModuleLoadUnavailable` no lugar do módulo.

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `vroUploads`, a unidade `vro-uploads`, pelo nome.

### 18. host-app/src/App.js:54-57

**Observação:** `React.lazy(() => import('aiAgent/AIAgentApp'))`, com um `.catch` que registra o erro e devolve um componente `ModuleLoadUnavailable` no lugar do módulo.

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `aiAgent`, a unidade `ai-agent-module`, pelo nome.

### 19. host-app/src/App.js:228-240; host-app/src/index.js:3, 7

**Observação:** Dentro de `ModuleErrorBoundary` e `Suspense`, a tabela de rotas liga `/business-reports`, `/model-portfolio`, `/outgoing-api`, `/incoming-api`, `/maker-requests`, `/vro-uploads` e `/ai-agent` aos sete componentes carregados por `React.lazy`; `/http-access-logs` e `/` mostram só um texto local. O `App` é renderizado na entrada do host.

**Interpretação:** O shell monta cada um dos sete remotes numa rota própria, e as cargas são alcançáveis por navegação.

### 20. host-app/src/App.js:6-27; accounts-module/src/App.js:5, 46-48; cards-module/src/App.js:5, 46-48; loans-module/src/App.js:5, 46-48; host-app/webpack.config.js:47-55

**Observação:** Um objeto `EventBus` com `subscribe` e `publish` é atribuído a `window.EventBus`. O host não chama `publish`, e nenhum dos sete remotes carregados usa `EventBus`. Os únicos assinantes são accounts-module, cards-module e loans-module, que o host não declara como remotes.

**Interpretação:** É um mecanismo de comunicação disponível no host, mas não conectado a nenhuma unidade composta; não participa da composição.

### 21. accounts-module; accounts-module/webpack.config.js:8, 65; accounts-module/src/index.js:6-7; accounts-module/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote que o host não referencia.

### 22. ai-agent-module; ai-agent-module/webpack.config.js:8, 64; ai-agent-module/src/index.js:6-7; ai-agent-module/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote carregado pelo host.

### 23. business-reports; business-reports/webpack.config.js:8, 64; business-reports/src/index.js:6-7; business-reports/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote carregado pelo host.

### 24. cards-module; cards-module/webpack.config.js:8, 65; cards-module/src/index.js:6-7; cards-module/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote que o host não referencia.

### 25. host-app; host-app/webpack.config.js:8, 70; host-app/src/index.js:6-7; host-app/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: o shell.

### 26. incoming-api-logs; incoming-api-logs/webpack.config.js:8, 64; incoming-api-logs/src/index.js:6-7; incoming-api-logs/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote carregado pelo host.

### 27. loans-module; loans-module/webpack.config.js:8, 65; loans-module/src/index.js:6-7; loans-module/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote que o host não referencia.

### 28. maker-requests; maker-requests/webpack.config.js:8, 64; maker-requests/src/index.js:6-7; maker-requests/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote carregado pelo host.

### 29. model-portfolio-configuration; model-portfolio-configuration/webpack.config.js:8, 64; model-portfolio-configuration/src/index.js:6-7; model-portfolio-configuration/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote carregado pelo host.

### 30. outgoing-api-logs; outgoing-api-logs/webpack.config.js:8, 64; outgoing-api-logs/src/index.js:6-7; outgoing-api-logs/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote carregado pelo host.

### 31. vro-uploads; vro-uploads/webpack.config.js:8, 64; vro-uploads/src/index.js:6-7; vro-uploads/package.json:6

**Observação:** Diretório com `package.json` e `webpack.config.js` próprios, entrada `./src/index.js` com `createRoot` e `render`, página `./src/index.html` e build `webpack --mode production`. Não há `package.json` na raiz nem workspace.

**Interpretação:** É uma unidade frontend React com limite próprio: um remote carregado pelo host.

### 32. host-app/src/App.js:30; host-app/src/App.js:231; host-app/webpack.config.js:48; business-reports/webpack.config.js:45-48

**Observação:** O host importa `businessReports/BusinessReportsApp` (host-app/src/App.js:30) e o monta na rota `/business-reports` (host-app/src/App.js:231). O remote `businessReports` do host (host-app/webpack.config.js:48) corresponde a `name: 'businessReports'` e ao `exposes './BusinessReportsApp'` de business-reports/webpack.config.js:45-48.

**Interpretação:** É uma relação host → remote ativa entre host-app e business-reports, por Module Federation.

### 33. host-app/src/App.js:34; host-app/src/App.js:232; host-app/webpack.config.js:49; model-portfolio-configuration/webpack.config.js:45-48

**Observação:** O host importa `modelPortfolio/ModelPortfolioApp` (host-app/src/App.js:34) e o monta na rota `/model-portfolio` (host-app/src/App.js:232). O remote `modelPortfolio` do host (host-app/webpack.config.js:49) corresponde a `name: 'modelPortfolio'` e ao `exposes './ModelPortfolioApp'` de model-portfolio-configuration/webpack.config.js:45-48.

**Interpretação:** É uma relação host → remote ativa entre host-app e model-portfolio-configuration, por Module Federation.

### 34. host-app/src/App.js:38; host-app/src/App.js:233; host-app/webpack.config.js:50; outgoing-api-logs/webpack.config.js:45-48

**Observação:** O host importa `outgoingApiLogs/OutgoingApiLogsApp` (host-app/src/App.js:38) e o monta na rota `/outgoing-api` (host-app/src/App.js:233). O remote `outgoingApiLogs` do host (host-app/webpack.config.js:50) corresponde a `name: 'outgoingApiLogs'` e ao `exposes './OutgoingApiLogsApp'` de outgoing-api-logs/webpack.config.js:45-48.

**Interpretação:** É uma relação host → remote ativa entre host-app e outgoing-api-logs, por Module Federation.

### 35. host-app/src/App.js:42; host-app/src/App.js:234; host-app/webpack.config.js:51; incoming-api-logs/webpack.config.js:45-48

**Observação:** O host importa `incomingApiLogs/IncomingApiLogsApp` (host-app/src/App.js:42) e o monta na rota `/incoming-api` (host-app/src/App.js:234). O remote `incomingApiLogs` do host (host-app/webpack.config.js:51) corresponde a `name: 'incomingApiLogs'` e ao `exposes './IncomingApiLogsApp'` de incoming-api-logs/webpack.config.js:45-48.

**Interpretação:** É uma relação host → remote ativa entre host-app e incoming-api-logs, por Module Federation.

### 36. host-app/src/App.js:46; host-app/src/App.js:236; host-app/webpack.config.js:52; maker-requests/webpack.config.js:45-48

**Observação:** O host importa `makerRequests/MakerRequestsApp` (host-app/src/App.js:46) e o monta na rota `/maker-requests` (host-app/src/App.js:236). O remote `makerRequests` do host (host-app/webpack.config.js:52) corresponde a `name: 'makerRequests'` e ao `exposes './MakerRequestsApp'` de maker-requests/webpack.config.js:45-48.

**Interpretação:** É uma relação host → remote ativa entre host-app e maker-requests, por Module Federation.

### 37. host-app/src/App.js:50; host-app/src/App.js:237; host-app/webpack.config.js:53; vro-uploads/webpack.config.js:45-48

**Observação:** O host importa `vroUploads/VroUploadsApp` (host-app/src/App.js:50) e o monta na rota `/vro-uploads` (host-app/src/App.js:237). O remote `vroUploads` do host (host-app/webpack.config.js:53) corresponde a `name: 'vroUploads'` e ao `exposes './VroUploadsApp'` de vro-uploads/webpack.config.js:45-48.

**Interpretação:** É uma relação host → remote ativa entre host-app e vro-uploads, por Module Federation.

### 38. host-app/src/App.js:54; host-app/src/App.js:238; host-app/webpack.config.js:54; ai-agent-module/webpack.config.js:45-48; ai-agent-module/src/App.js:84-109

**Observação:** O host importa `aiAgent/AIAgentApp` (host-app/src/App.js:54) e o monta na rota `/ai-agent` (host-app/src/App.js:238). O remote `aiAgent` do host (host-app/webpack.config.js:54) corresponde a `name: 'aiAgent'` e ao `exposes './AIAgentApp'` de ai-agent-module/webpack.config.js:45-48. A chamada do módulo a um backend em `http://localhost:8000/chat` está comentada (ai-agent-module/src/App.js:84-109).

**Interpretação:** É uma relação host → remote ativa entre host-app e ai-agent-module, por Module Federation.

### 39. accounts-module/package.json:3, 5-6; accounts-module/webpack.config.js:8-15; start-all-modules.bat:4-12

**Observação:** `webpack --mode production` gera `accounts-module/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3001. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação. O start-all-modules.bat não o sobe.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 40. ai-agent-module/package.json:3, 5-6; ai-agent-module/webpack.config.js:8-15

**Observação:** `webpack --mode production` gera `ai-agent-module/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3016. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 41. business-reports/package.json:3, 5-6; business-reports/webpack.config.js:8-15

**Observação:** `webpack --mode production` gera `business-reports/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3010. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 42. cards-module/package.json:3, 5-6; cards-module/webpack.config.js:8-15; start-all-modules.bat:4-12

**Observação:** `webpack --mode production` gera `cards-module/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3003. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação. O start-all-modules.bat não o sobe.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 43. host-app/package.json:3, 5-6; host-app/webpack.config.js:8-15; host-app/webpack.config.js:47-55

**Observação:** `webpack --mode production` gera `host-app/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3000. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação. Os remotes entram em runtime pelos endereços `localhost`, não no bundle.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 44. incoming-api-logs/package.json:3, 5-6; incoming-api-logs/webpack.config.js:8-15

**Observação:** `webpack --mode production` gera `incoming-api-logs/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3013. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 45. loans-module/package.json:3, 5-6; loans-module/webpack.config.js:8-15; start-all-modules.bat:4-12

**Observação:** `webpack --mode production` gera `loans-module/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3002. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação. O start-all-modules.bat não o sobe.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 46. maker-requests/package.json:3, 5-6; maker-requests/webpack.config.js:8-15

**Observação:** `webpack --mode production` gera `maker-requests/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3014. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 47. model-portfolio-configuration/package.json:3, 5-6; model-portfolio-configuration/webpack.config.js:8-15

**Observação:** `webpack --mode production` gera `model-portfolio-configuration/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3011. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 48. outgoing-api-logs/package.json:3, 5-6; outgoing-api-logs/webpack.config.js:8-15

**Observação:** `webpack --mode production` gera `outgoing-api-logs/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3012. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 49. vro-uploads/package.json:3, 5-6; vro-uploads/webpack.config.js:8-15

**Observação:** `webpack --mode production` gera `vro-uploads/dist` com `publicPath: 'auto'`. O único endereço é o do servidor de desenvolvimento na porta 3015. Não há Dockerfile, CI nem configuração de hospedagem, e a versão `1.0.0` do `package.json` não é usada em publicação.

**Interpretação:** Há uma fronteira de build própria da unidade, sem deploy observado.

### 50. DOCUMENTATION.md:4

**Observação:** "This repository implements a micro-frontend architecture [...] using `host-app` as the shell and multiple remote modules."

**Interpretação:** Afirma uma organização de shell e remotes. Há o shell e dez remotes, e sete estão ligados ao shell; a afirmação é corroborada.

### 51. DOCUMENTATION.md:8

**Observação:** "`accounts-module/` - Accounts management micro-frontend"

**Interpretação:** Afirma que accounts-module é um micro frontend. A unidade tem entrada e configuração de remote próprias; a afirmação é corroborada, sem implicar consumo pelo shell.

### 52. DOCUMENTATION.md:9

**Observação:** "`business-reports/` - Business reports micro-frontend"

**Interpretação:** Afirma que business-reports é um micro frontend. A unidade tem entrada e configuração de remote próprias; a afirmação é corroborada.

### 53. DOCUMENTATION.md:10

**Observação:** "`cards-module/` - Cards management micro-frontend"

**Interpretação:** Afirma que cards-module é um micro frontend. A unidade tem entrada e configuração de remote próprias; a afirmação é corroborada, sem implicar consumo pelo shell.

### 54. DOCUMENTATION.md:11

**Observação:** "`incoming-api-logs/` - Incoming API logs micro-frontend"

**Interpretação:** Afirma que incoming-api-logs é um micro frontend. A unidade tem entrada e configuração de remote próprias; a afirmação é corroborada.

### 55. DOCUMENTATION.md:12

**Observação:** "`loans-module/` - Loans management micro-frontend"

**Interpretação:** Afirma que loans-module é um micro frontend. A unidade tem entrada e configuração de remote próprias; a afirmação é corroborada, sem implicar consumo pelo shell.

### 56. DOCUMENTATION.md:13

**Observação:** "`maker-requests/` - Maker-requests workflow micro-frontend"

**Interpretação:** Afirma que maker-requests é um micro frontend. A unidade tem entrada e configuração de remote próprias; a afirmação é corroborada.

### 57. DOCUMENTATION.md:14

**Observação:** "`model-portfolio-configuration/` - Portfolio configuration micro-frontend"

**Interpretação:** Afirma que model-portfolio-configuration é um micro frontend. A unidade tem entrada e configuração de remote próprias; a afirmação é corroborada.

### 58. DOCUMENTATION.md:15

**Observação:** "`outgoing-api-logs/` - Outgoing API logs micro-frontend"

**Interpretação:** Afirma que outgoing-api-logs é um micro frontend. A unidade tem entrada e configuração de remote próprias; a afirmação é corroborada.

### 59. DOCUMENTATION.md:16

**Observação:** "`vro-uploads/` - VRO uploads micro-frontend"

**Interpretação:** Afirma que vro-uploads é um micro frontend. A unidade tem entrada e configuração de remote próprias; a afirmação é corroborada.

### 60. DOCUMENTATION.md:38

**Observação:** "The host uses Webpack Module Federation to load remote entries from each module."

**Interpretação:** Afirma que o host carrega por Module Federation todos os módulos. O mecanismo confere para sete, mas o host não declara accounts-module, cards-module nem loans-module; a afirmação é contradita.

### 61. DOCUMENTATION.md:39

**Observação:** "Each module is independently runnable and documented at its own folder level."

**Interpretação:** Afirma que cada módulo roda sozinho. Cada unidade tem entrada, servidor local e documentação próprios; a afirmação é corroborada, sem implicar publicação.

### 62. README.md:15

**Observação:** "ai-agent-module/ [...] # AI Agent chatbot module"

**Interpretação:** Afirma que ai-agent-module é um módulo do conjunto. A unidade existe com entrada própria; a afirmação é corroborada.

### 63. README.md:21

**Observação:** "This project uses **Webpack Module Federation** to implement a micro-frontend architecture:"

**Interpretação:** Nomeia Module Federation como a tecnologia da arquitetura. O plugin embutido do webpack está configurado e usado nas sete relações; a afirmação é corroborada.

### 64. README.md:24

**Observação:** "Standalone applications that can be independently developed"

**Interpretação:** Afirma que as aplicações são desenvolvidas de forma independente. Manifestos, entradas e builds por unidade a sustentam; a afirmação é corroborada.

### 65. README.md:24

**Observação:** "can be independently [...] deployed"

**Interpretação:** Afirma que as aplicações podem ser implantadas de forma independente. Não há artefato de deploy no snapshot; a afirmação fica sem corroboração.

### 66. README.md:135

**Observação:** "Shared event bus for cross-module communication"

**Interpretação:** Afirma que um event bus compartilhado comunica os módulos. O bus existe no host, mas não há publicador e os únicos assinantes não são carregados; a afirmação é contradita.

### 67. README.md:145

**Observação:** "Remote module loaded by host app"

**Interpretação:** Afirma que outgoing-api-logs é carregado pelo host. O host o declara e o monta na rota `/outgoing-api`; a afirmação é corroborada.

### 68. README.md:176

**Observação:** "Build each module for production:"

**Interpretação:** Afirma que cada módulo tem build de produção próprio. Os onze `package.json` têm `webpack --mode production`; a afirmação é corroborada.

### 69. accounts-module/DOCUMENTATION.md:9

**Observação:** "Remote module configuration for Module Federation"

**Interpretação:** Afirma que accounts-module tem configuração de remote. O plugin expõe `AccountsApp` e `AccountsService`; a afirmação é corroborada, sem consumidor.

### 70. accounts-module/DOCUMENTATION.md:15

**Observação:** "Uses isolated module styles and components"

**Interpretação:** Afirma que os estilos do módulo são isolados. O CSS usa seletores globais carregados por `style-loader` e `css-loader`, sem escopo; a afirmação é contradita.

### 71. accounts-module/DOCUMENTATION.md:26

**Observação:** "The host app loads this module as a federated remote when the user navigates to the Accounts route."

**Interpretação:** Afirma que o host carrega accounts-module numa rota. Não há remote `accountsModule` nem rota Accounts no host; a afirmação é contradita.

### 72. accounts-module/src/App.js:4

**Observação:** "Event Bus for cross-module communication"

**Interpretação:** Afirma que o bus comunica módulos. accounts-module assina eventos, mas não é carregado pelo host e não há publicador; a afirmação é contradita.

### 73. accounts-module/src/App.js:36

**Observação:** "Initialize accounts from shared store"

**Interpretação:** Afirma que os dados vêm de um store compartilhado. O bus do host não tem o getter procurado, e o caminho disponível usa dados locais; a afirmação é contradita.

### 74. ai-agent-module/README.md:21

**Observação:** "This module is built as a Webpack Module Federation remote and is exposed as `AIAgentApp`."

**Interpretação:** Afirma que ai-agent-module é um remote que expõe `AIAgentApp`. A configuração e o import do host conferem; a afirmação é corroborada.

### 75. ai-agent-module/src/App.js:84

**Observação:** "API integration is currently disabled for static demo mode."

**Interpretação:** Afirma que a integração com o backend está desligada. A chamada HTTP está comentada e as respostas são locais; a afirmação é corroborada.

### 76. business-reports/DOCUMENTATION.md:9

**Observação:** "Remote entry configuration for Module Federation"

**Interpretação:** Afirma que business-reports tem configuração de remote. A exposição de `BusinessReportsApp` confere; a afirmação é corroborada.

### 77. business-reports/DOCUMENTATION.md:15

**Observação:** "Uses isolated CSS for module-specific layout"

**Interpretação:** Afirma que o CSS do módulo é isolado. A folha usa seletores globais sem escopo no carregador; a afirmação é contradita.

### 78. business-reports/DOCUMENTATION.md:25

**Observação:** "The module is loaded by `host-app` when the Business Reports route is active."

**Interpretação:** Afirma que o host carrega business-reports numa rota. Configuração e rota confirmam; a afirmação é corroborada.

### 79. cards-module/DOCUMENTATION.md:9

**Observação:** "Module Federation remote configuration"

**Interpretação:** Afirma que cards-module tem configuração de remote. O plugin expõe `CardsApp` e `CardsService`; a afirmação é corroborada, sem consumidor.

### 80. cards-module/DOCUMENTATION.md:14

**Observação:** "Displays card data as a standalone micro-frontend"

**Interpretação:** Afirma que cards-module roda sozinho. Entrada própria e dados locais de exemplo sustentam a execução autônoma; a afirmação é corroborada.

### 81. cards-module/DOCUMENTATION.md:15

**Observação:** "Uses isolated styles for module-specific UI"

**Interpretação:** Afirma que os estilos do módulo são isolados. O CSS é global e sem escopo; a afirmação é contradita.

### 82. cards-module/DOCUMENTATION.md:26

**Observação:** "The host shell loads this module dynamically as part of the micro-frontend routing."

**Interpretação:** Afirma que o shell carrega cards-module por rota. O host não declara `cardsModule` nem monta `CardsApp`; a afirmação é contradita.

### 83. cards-module/src/App.js:4

**Observação:** "Event Bus for cross-module communication"

**Interpretação:** Afirma que o bus comunica módulos. cards-module assina eventos, mas não é carregado pelo host e não há publicador; a afirmação é contradita.

### 84. cards-module/src/App.js:36

**Observação:** "Initialize cards from shared store"

**Interpretação:** Afirma que os dados vêm de um store compartilhado. O bus do host não tem o getter procurado, e o caminho disponível usa dados locais; a afirmação é contradita.

### 85. host-app/DOCUMENTATION.md:10

**Observação:** "Global shared styling"

**Interpretação:** Afirma que o host tem estilo global compartilhado. O host importa CSS global, e os remotes montados nele ficam sujeitos a essas regras; a afirmação é corroborada.

### 86. host-app/DOCUMENTATION.md:26

**Observação:** "Must run together with remote modules so the federated remotes can be loaded."

**Interpretação:** Afirma que o host depende dos remotes em execução. As URLs dos remotes exigem os servidores dos remotes; a afirmação é corroborada.

### 87. host-app/DOCUMENTATION.md:27

**Observação:** "The host app uses route-based loading for each remote module."

**Interpretação:** Afirma que o host carrega cada remote por rota. Os sete remotes configurados são importados por `React.lazy` e montados por rota; a afirmação é corroborada.

### 88. host-app/src/App.js:26

**Observação:** "Make EventBus available globally"

**Interpretação:** Afirma que o bus fica disponível globalmente. A atribuição a `window.EventBus` existe; a afirmação é corroborada, sem implicar comunicação.

### 89. host-app/src/App.js:29

**Observação:** "Lazy load remote modules"

**Interpretação:** Afirma que os remotes são carregados sob demanda. `React.lazy` envolve as sete importações; a afirmação é corroborada.

### 90. incoming-api-logs/DOCUMENTATION.md:6

**Observação:** "It is designed as a remote micro-frontend that can be loaded into the `host-app` using Webpack Module Federation."

**Interpretação:** Afirma que incoming-api-logs é um remote carregado pelo host. Configuração e consumo confirmam; a afirmação é corroborada.

### 91. loans-module/DOCUMENTATION.md:9

**Observação:** "Module Federation remote configuration"

**Interpretação:** Afirma que loans-module tem configuração de remote. O plugin expõe `LoansApp` e `LoansService`; a afirmação é corroborada, sem consumidor.

### 92. loans-module/DOCUMENTATION.md:14

**Observação:** "Uses independent styling and routing for the loan module"

**Interpretação:** Afirma que o módulo tem estilo e roteamento independentes. Não há roteador, e o CSS é global e sem escopo; a afirmação é contradita.

### 93. loans-module/DOCUMENTATION.md:26

**Observação:** "The host loads it dynamically when the Loans route is requested."

**Interpretação:** Afirma que o host carrega loans-module numa rota. Não há remote `loansModule` nem rota Loans no host; a afirmação é contradita.

### 94. loans-module/src/App.js:4

**Observação:** "Event Bus for cross-module communication"

**Interpretação:** Afirma que o bus comunica módulos. loans-module assina eventos, mas não é carregado pelo host e não há publicador; a afirmação é contradita.

### 95. loans-module/src/App.js:36

**Observação:** "Initialize loans from shared store"

**Interpretação:** Afirma que os dados vêm de um store compartilhado. O bus do host não tem o getter procurado, e o caminho disponível usa dados locais; a afirmação é contradita.

### 96. maker-requests/DOCUMENTATION.md:13

**Observação:** "Exposes a remote entry to the host shell"

**Interpretação:** Afirma que maker-requests oferece um remote entry ao shell. A unidade expõe `MakerRequestsApp` e o host o consome; a afirmação é corroborada.

### 97. maker-requests/DOCUMENTATION.md:15

**Observação:** "Uses isolated styling to avoid conflicts with other modules"

**Interpretação:** Afirma que os estilos são isolados dos outros módulos. O CSS repete seletores globais sem escopo; a afirmação é contradita.

### 98. maker-requests/DOCUMENTATION.md:25

**Observação:** "The host app loads this module on the Maker Requests route."

**Interpretação:** Afirma que o host carrega maker-requests numa rota. A rota monta `MakerRequestsApp`; a afirmação é corroborada.

### 99. model-portfolio-configuration/DOCUMENTATION.md:9

**Observação:** "Module Federation remote configuration"

**Interpretação:** Afirma que model-portfolio-configuration tem configuração de remote. O plugin expõe `ModelPortfolioApp`; a afirmação é corroborada.

### 100. model-portfolio-configuration/DOCUMENTATION.md:15

**Observação:** "Isolation ensures styles do not leak into the host or other modules"

**Interpretação:** Afirma que os estilos não vazam para o host nem para outros módulos. Não há CSS Modules, Shadow DOM nem escopo no carregador; a afirmação é contradita.

### 101. model-portfolio-configuration/DOCUMENTATION.md:26

**Observação:** "The host app loads it dynamically through Module Federation."

**Interpretação:** Afirma que o host carrega model-portfolio-configuration por Module Federation. A carga dinâmica e a rota confirmam; a afirmação é corroborada.

### 102. outgoing-api-logs/DOCUMENTATION.md:9

**Observação:** "Module Federation remote configuration"

**Interpretação:** Afirma que outgoing-api-logs tem configuração de remote. O plugin expõe `OutgoingApiLogsApp`; a afirmação é corroborada.

### 103. outgoing-api-logs/DOCUMENTATION.md:15

**Observação:** "Uses isolated CSS to keep the module visually separated"

**Interpretação:** Afirma que o CSS do módulo é isolado. A folha usa seletores globais sem escopo; a afirmação é contradita.

### 104. start-all-modules.bat:2

**Observação:** "Batch file to run all HDFC micro frontend modules and host app in separate terminals"

**Interpretação:** Afirma que o script sobe todos os módulos. Ele abre terminais para o host, sete remotes e o backend, mas não para accounts-module, cards-module e loans-module; a afirmação é contradita.

### 105. vro-uploads/DOCUMENTATION.md:9

**Observação:** "Module Federation remote configuration"

**Interpretação:** Afirma que vro-uploads tem configuração de remote. O plugin expõe `VroUploadsApp`; a afirmação é corroborada.

### 106. vro-uploads/DOCUMENTATION.md:15

**Observação:** "Uses isolated styles so it does not affect the host or other modules"

**Interpretação:** Afirma que os estilos não afetam o host nem outros módulos. Há seletores globais sem escopo; a afirmação é contradita.

### 107. vro-uploads/DOCUMENTATION.md:25

**Observação:** "This module is loaded when the VRO Uploads route is selected from the host app."

**Interpretação:** Afirma que o host carrega vro-uploads numa rota. A rota monta `VroUploadsApp`; a afirmação é corroborada.

### 108. c7a7aa3 2026-05-03 (accounts-module/src/App.js, cards-module/src/App.js, loans-module/src/App.js, host-app/src/App.js, README.md); a1d2264 2026-05-25 (host-app/src/App.js, README.md)

**Observação:** Os três assinantes do bus estão no primeiro commit e não mudam até o snapshot. host-app/src/App.js muda uma vez, em `a1d2264` ("testing"), e a versão de `c7a7aa3` não está disponível no clone.

**Interpretação:** Não se sabe se o bus é resto de um estágio em que comunicava ou se nunca foi conectado. A dúvida é só sobre o passado: no snapshot, o bus não liga nenhuma unidade composta.

### 109. c7a7aa3 2026-05-03 (DOCUMENTATION.md, accounts-module/DOCUMENTATION.md, cards-module/DOCUMENTATION.md, loans-module/DOCUMENTATION.md, host-app/webpack.config.js, host-app/src/App.js, start-all-modules.bat); a1d2264 2026-05-25 (host-app/webpack.config.js, host-app/src/App.js, start-all-modules.bat, ai-agent-module)

**Observação:** A documentação que diz que o host carrega accounts, cards e loans está no primeiro commit e nunca muda. host-app/webpack.config.js, host-app/src/App.js e start-all-modules.bat mudam só em `a1d2264`, que cria o ai-agent-module; as versões de `c7a7aa3` desses arquivos não estão disponíveis no clone.

**Interpretação:** Não se sabe se o host de `c7a7aa3` declarava os três módulos e os perdeu, ou se nunca os declarou. A dúvida é só sobre o passado: no snapshot, o host não os carrega.

### 110. c7a7aa3 2026-05-03 (DOCUMENTATION.md, webpack.config.js e src/styles.css de accounts-module, business-reports, cards-module, loans-module, maker-requests, model-portfolio-configuration, outgoing-api-logs e vro-uploads); a1d2264 2026-05-25 (outgoing-api-logs/src/styles.css, vro-uploads/src/styles.css)

**Observação:** Os `DOCUMENTATION.md` com as oito afirmações de isolamento e os `webpack.config.js` dos remotos, com `style-loader` e `css-loader`, estão no primeiro commit e não mudam. Só as folhas de outgoing-api-logs e vro-uploads mudam depois, em `a1d2264`.

**Interpretação:** A promessa de isolamento e o CSS sem escopo coexistem desde a primeira presença observável; nenhum commit cria ou retira um mecanismo de escopo. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (accounts-module, Marcadores, Entrada e Build); 3.4.6 #1 (Artefatos); 3.4.7 #2, #20 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #21 |
| 2 | 3.4.3 (ai-agent-module, Marcadores, Entrada e Build); 3.4.4 (host-app/src/App.js:54, Observação); 3.4.5 #7 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #25 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #22; configura #38 |
| 3 | 3.4.3 (business-reports, Marcadores, Entrada e Build); 3.4.4 (host-app/src/App.js:30, Observação); 3.4.5 #1 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #3, #27 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #23; configura #32 |
| 4 | 3.4.3 (cards-module, Marcadores, Entrada e Build); 3.4.6 #4 (Artefatos); 3.4.7 #4, #30 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24 |
| 5 | 3.4.3 (host-app, Marcadores, Entrada e Build); 3.4.4 (host-app/src/App.js:30, 34, 38, 42, 46, 50, 54, 6, Observação); 3.4.5 #1, #2, #3, #4, #5, #6, #7 (Configuração); 3.4.6 #5 (Artefatos); 3.4.7 #11, #14, #22, #23, #33, #34, #37, #44, #45 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #25; configura #32; configura #33; configura #34; configura #35; configura #36; configura #37; configura #38 |
| 6 | 3.4.3 (incoming-api-logs, Marcadores, Entrada e Build); 3.4.4 (host-app/src/App.js:42, Observação); 3.4.5 #4 (Configuração); 3.4.6 #6 (Artefatos); 3.4.7 #5, #41 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #26; configura #35 |
| 7 | 3.4.3 (loans-module, Marcadores, Entrada e Build); 3.4.6 #7 (Artefatos); 3.4.7 #6, #42 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #27 |
| 8 | 3.4.3 (maker-requests, Marcadores, Entrada e Build); 3.4.4 (host-app/src/App.js:46, Observação); 3.4.5 #5 (Configuração); 3.4.6 #8 (Artefatos); 3.4.7 #7, #47 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #28; configura #36 |
| 9 | 3.4.3 (model-portfolio-configuration, Marcadores, Entrada e Build); 3.4.4 (host-app/src/App.js:34, Observação); 3.4.5 #2 (Configuração); 3.4.6 #9 (Artefatos); 3.4.7 #8, #50 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #29; configura #33 |
| 10 | 3.4.3 (outgoing-api-logs, Marcadores, Entrada e Build); 3.4.4 (host-app/src/App.js:38, Observação); 3.4.5 #3 (Configuração); 3.4.6 #10 (Artefatos); 3.4.7 #9, #53 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #30; configura #34 |
| 11 | 3.4.3 (vro-uploads, Marcadores, Entrada e Build); 3.4.4 (host-app/src/App.js:50, Observação); 3.4.5 #6 (Configuração); 3.4.6 #11 (Artefatos); 3.4.7 #10, #56 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #31; configura #37 |
| 12 | 3.4.4 (host-app/src/App.js:30) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32 |
| 13 | 3.4.4 (host-app/src/App.js:34) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #33 |
| 14 | 3.4.4 (host-app/src/App.js:38) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #34 |
| 15 | 3.4.4 (host-app/src/App.js:42) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #35 |
| 16 | 3.4.4 (host-app/src/App.js:46) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #36 |
| 17 | 3.4.4 (host-app/src/App.js:50) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #37 |
| 18 | 3.4.4 (host-app/src/App.js:54) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #38 |
| 19 | 3.4.4 (host-app/src/App.js:230) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32; implementa #33; implementa #34; implementa #35; implementa #36; implementa #37; implementa #38 |
| 20 | 3.4.4 (host-app/src/App.js:6) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 21 | 3.4.3 (accounts-module) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 22 | 3.4.3 (ai-agent-module) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.3 (business-reports) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 24 | 3.4.3 (cards-module) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.3 (host-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 26 | 3.4.3 (incoming-api-logs) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 27 | 3.4.3 (loans-module) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 28 | 3.4.3 (maker-requests) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.3 (model-portfolio-configuration) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 30 | 3.4.3 (outgoing-api-logs) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (vro-uploads) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 32 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #25; liga #23 |
| 33 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #25; liga #29 |
| 34 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #25; liga #30 |
| 35 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #25; liga #26 |
| 36 | 3.4.5 #5 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #25; liga #28 |
| 37 | 3.4.5 #6 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #25; liga #31 |
| 38 | 3.4.5 #7 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #25; liga #22 |
| 39 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #21 |
| 40 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #22 |
| 41 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #23 |
| 42 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #24 |
| 43 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #25 |
| 44 | 3.4.6 #6 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #26 |
| 45 | 3.4.6 #7 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #27 |
| 46 | 3.4.6 #8 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #28 |
| 47 | 3.4.6 #9 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #29 |
| 48 | 3.4.6 #10 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #30 |
| 49 | 3.4.6 #11 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #31 |
| 50 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #22; corrobora #23; corrobora #24; corrobora #25; corrobora #26; corrobora #27; corrobora #28; corrobora #29; corrobora #30; corrobora #31; corrobora #32; corrobora #33; corrobora #34; corrobora #35; corrobora #36; corrobora #37; corrobora #38 |
| 51 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #1 |
| 52 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #23; corrobora #3 |
| 53 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #24; corrobora #4 |
| 54 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #26; corrobora #6 |
| 55 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #27; corrobora #7 |
| 56 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #28; corrobora #8 |
| 57 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #29; corrobora #9 |
| 58 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #30; corrobora #10 |
| 59 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #31; corrobora #11 |
| 60 | 3.4.7 #11 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz #5 |
| 61 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #22; corrobora #23; corrobora #24; corrobora #25; corrobora #26; corrobora #27; corrobora #28; corrobora #29; corrobora #30; corrobora #31; corrobora #39; corrobora #40; corrobora #41; corrobora #42; corrobora #43; corrobora #44; corrobora #45; corrobora #46; corrobora #47; corrobora #48; corrobora #49 |
| 62 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22 |
| 63 | 3.4.7 #14 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #5; corrobora #32; corrobora #33; corrobora #34; corrobora #35; corrobora #36; corrobora #37; corrobora #38 |
| 64 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #22; corrobora #23; corrobora #24; corrobora #25; corrobora #26; corrobora #27; corrobora #28; corrobora #29; corrobora #30; corrobora #31; corrobora #39; corrobora #40; corrobora #41; corrobora #42; corrobora #43; corrobora #44; corrobora #45; corrobora #46; corrobora #47; corrobora #48; corrobora #49 |
| 65 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 66 | 3.4.7 #17 | 7 documentação | documentação | events | arquitetural | fraca | contradiz #20; contradiz accounts-module/src/App.js:5-19, 38-48 |
| 67 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #34; corrobora #14; corrobora #19 |
| 68 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #39; corrobora #40; corrobora #41; corrobora #42; corrobora #43; corrobora #44; corrobora #45; corrobora #46; corrobora #47; corrobora #48; corrobora #49 |
| 69 | 3.4.7 #20 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1 |
| 70 | 3.4.7 #21 | 7 documentação | documentação | — | arquitetural | fraca | contradiz accounts-module/src/App.js:1-2; contradiz accounts-module/src/styles.css:8-19; contradiz accounts-module/webpack.config.js:37-40 |
| 71 | 3.4.7 #22 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz #5; contradiz #19 |
| 72 | 3.4.7 #23 | 7 documentação | comentário | events | arquitetural | fraca | contradiz #20; contradiz accounts-module/src/App.js:5-19, 46-48; contradiz #5 |
| 73 | 3.4.7 #24 | 7 documentação | comentário | — | arquitetural | fraca | contradiz accounts-module/src/App.js:38-44; contradiz #20 |
| 74 | 3.4.7 #25 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #2; corrobora #38 |
| 75 | 3.4.7 #26 | 7 documentação | comentário | — | contexto | fraca | corrobora ai-agent-module/src/App.js:81-109 |
| 76 | 3.4.7 #27 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #3 |
| 77 | 3.4.7 #28 | 7 documentação | documentação | — | arquitetural | fraca | contradiz business-reports/src/styles.css:2-26; contradiz business-reports/webpack.config.js:37-40 |
| 78 | 3.4.7 #29 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32; corrobora #12; corrobora #19 |
| 79 | 3.4.7 #30 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #4 |
| 80 | 3.4.7 #31 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #24; corrobora cards-module/src/App.js:38-44; corrobora #42 |
| 81 | 3.4.7 #32 | 7 documentação | documentação | — | arquitetural | fraca | contradiz cards-module/src/styles.css:8-19; contradiz cards-module/webpack.config.js:37-40 |
| 82 | 3.4.7 #33 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #5; contradiz #19 |
| 83 | 3.4.7 #34 | 7 documentação | comentário | events | arquitetural | fraca | contradiz #20; contradiz cards-module/src/App.js:5-19, 46-48; contradiz #5 |
| 84 | 3.4.7 #35 | 7 documentação | comentário | — | arquitetural | fraca | contradiz cards-module/src/App.js:38-44; contradiz #20 |
| 85 | 3.4.7 #36 | 7 documentação | documentação | — | arquitetural | fraca | corrobora host-app/src/App.js:3; corrobora host-app/src/styles.css:2-13; corrobora #19 |
| 86 | 3.4.7 #37 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #5; corrobora #12; corrobora #13; corrobora #14; corrobora #15; corrobora #16; corrobora #17; corrobora #18 |
| 87 | 3.4.7 #38 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #13; corrobora #14; corrobora #15; corrobora #16; corrobora #17; corrobora #18; corrobora #19 |
| 88 | 3.4.7 #39 | 7 documentação | comentário | events | tecnológica | fraca | corrobora #20 |
| 89 | 3.4.7 #40 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #12; corrobora #13; corrobora #14; corrobora #15; corrobora #16; corrobora #17; corrobora #18 |
| 90 | 3.4.7 #41 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #35; corrobora #6; corrobora #15; corrobora #19 |
| 91 | 3.4.7 #42 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #7 |
| 92 | 3.4.7 #43 | 7 documentação | documentação | — | arquitetural | fraca | contradiz loans-module/src/App.js:1-51; contradiz loans-module/src/styles.css:8-19; contradiz loans-module/webpack.config.js:37-40 |
| 93 | 3.4.7 #44 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #5; contradiz #19 |
| 94 | 3.4.7 #45 | 7 documentação | comentário | events | arquitetural | fraca | contradiz #20; contradiz loans-module/src/App.js:5-19, 46-48; contradiz #5 |
| 95 | 3.4.7 #46 | 7 documentação | comentário | — | arquitetural | fraca | contradiz loans-module/src/App.js:38-44; contradiz #20 |
| 96 | 3.4.7 #47 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #8; corrobora #36 |
| 97 | 3.4.7 #48 | 7 documentação | documentação | — | arquitetural | fraca | contradiz maker-requests/src/styles.css:2-26; contradiz maker-requests/webpack.config.js:37-40 |
| 98 | 3.4.7 #49 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #36; corrobora #16; corrobora #19 |
| 99 | 3.4.7 #50 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #9 |
| 100 | 3.4.7 #51 | 7 documentação | documentação | — | arquitetural | fraca | contradiz model-portfolio-configuration/src/styles.css:2-26; contradiz model-portfolio-configuration/webpack.config.js:37-40 |
| 101 | 3.4.7 #52 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #33; corrobora #13; corrobora #19 |
| 102 | 3.4.7 #53 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #10 |
| 103 | 3.4.7 #54 | 7 documentação | documentação | — | arquitetural | fraca | contradiz outgoing-api-logs/src/styles.css:2-12; contradiz outgoing-api-logs/webpack.config.js:37-40 |
| 104 | 3.4.7 #55 | 7 documentação | comentário | — | arquitetural | fraca | contradiz start-all-modules.bat:4-12; contradiz #21; contradiz #24; contradiz #27 |
| 105 | 3.4.7 #56 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #11 |
| 106 | 3.4.7 #57 | 7 documentação | documentação | — | arquitetural | fraca | contradiz vro-uploads/src/styles.css:1-10; contradiz vro-uploads/webpack.config.js:37-40 |
| 107 | 3.4.7 #58 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #37; corrobora #17; corrobora #19 |
| 108 | 3.4.8 #1 | 8 histórico | histórico | events | tecnológica | fraca | explica #20; explica #66; explica #72; explica #73; explica #83; explica #84; explica #94; explica #95 |
| 109 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #5; explica #60; explica #71; explica #82; explica #93; explica #104 |
| 110 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #70; explica #77; explica #81; explica #92; explica #97; explica #100; explica #103; explica #106 |

## Resumo

Observações: 110. Dimensões (tecnologia: 0, configuração: 11, código: 9, estrutura: 11, composição: 7, build-deploy: 11, documentação: 58, histórico: 3). Força (forte: 16, moderada: 32, fraca: 62, ambígua: 0). Evidência (tecnológica: 23, arquitetural: 86, contexto: 1).
