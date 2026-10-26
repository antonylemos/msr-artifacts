---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
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

# 190 — dmalancioiu/SOA-project

## Leitura do repositório

É um projeto acadêmico de SOA, uma plataforma de entrega de comida. Os microsserviços Spring Boot ficam em `backend/` e as funções OpenFaaS em `infrastructure/faas/`. Em `frontend/` há quatro aplicações React com webpack, sem workspace que as agregue: `shell-app` é o host (#21), e `restaurant-catalog`, `order-tracking` e `user-dashboard` são os remotes (#19, #20, #22). A função `order-completion` tem `package.json`, mas é um servidor Express, não frontend (#23).

A cadeia de Module Federation está completa no snapshot:
- **Dependência:** `@module-federation/enhanced` `^0.2.3` está declarada no host e em dois remotes (#1 a #3). O `user-dashboard` não a declara e usa o plugin embutido do webpack (#7).
- **Configuração:** cada remote se nomeia, gera `remoteEntry.js` e expõe um componente de domínio (#4, #5, #7). O host declara os três remotes por URLs fixas em `localhost:3001` a `3003` (#6). As quatro configurações compartilham React, React Router, MUI e Emotion como singletons.
- **Código:** o host carrega cada remote por `lazy(() => import(...))` (#8 a #10) e monta cada um numa rota própria, protegida por `PrivateRoute` (#17).
- **Relação:** daí saem três relações host → remote ativas, com os destinos no snapshot (#24 a #26).
- **Build e deploy:** cada aplicação tem build webpack, Dockerfile e serviço de compose próprios, na porta que o host usa para buscar o `remoteEntry.js` (#31 a #34).

Além da federação, as unidades se ligam pela sessão no `localStorage`. O shell grava `token` e `user` no login (#18), e os remotes, que rodam na página do shell, leem essas chaves. O `user-dashboard` também regrava `user` (#28 a #30). Não é um mecanismo de MFE declarado: só funciona porque, dentro do shell, todas as unidades estão na mesma origem.

O que fica ambíguo é o evento de janela `addToCart`. O catálogo o dispara ao adicionar um item (#15, #16), mas nenhum arquivo do snapshot o escuta, e a relação fica sem destino resolvido (#27). O histórico mostra que o carrinho do shell nunca foi ouvinte, mas não diz se o canal foi planejado e nunca ligado ou abandonado (#61). Os `import('./bootstrap')` das quatro unidades são o padrão associado ao Module Federation, mas internos (#11 a #14).

A documentação é extensa e repetitiva. No essencial, confirma a organização host/remotes, a separação de build e deploy, o compartilhamento e a sessão no `localStorage` (#35 a #38, #40 a #43, #45 a #48, #50 a #57, #59). Cinco afirmações são desmentidas: o shell não expõe contextos nem serviços (#39); o item do catálogo não chega ao carrinho do shell (#44, #58); o carrinho e o pedido ficam no shell, não no catálogo (#49); e o compartilhamento dos pacotes de WebSocket não evita conexões duplicadas (#60). O histórico mostra que essas divergências são do mesmo estágio do código, e não documentação deixada para trás. A exceção é a página de pedido do shell, criada no último commit (#62 a #64).

Configuração: ficaram 4 blocos, um por `webpack.config.js`, porque cada arquivo serve uma única unidade. A ordem segue a primeira origem: as três linhas da 3.4.2 e depois a unidade `user-dashboard` da 3.4.3. Ficaram de fora:
- o docker-compose.yml. Os serviços, portas e `depends_on` são deploy (dimensão 6). As variáveis `REACT_APP_*_URL` passadas ao shell (docker-compose.yml:357-359) não são o endereço pelo qual o host resolve os remotes, que está fixo no `webpack.config.js`, como registrou a 3.4.6;
- o infrastructure/nginx/nginx.conf, os Dockerfiles e os `nginx.conf` de cada aplicação, que são proxy e publicação (dimensão 6);
- os `scripts` dos `package.json`, que são build, e o `devServer.port` dos `webpack.config.js`, porta de desenvolvimento que a 3.4.5 marcou como corroboração;
- o infrastructure/faas/order-completion/package.json, que não declara elemento da composição.

## Observações

### 1. frontend/order-tracking/package.json:27

**Observação:** `@module-federation/enhanced` `^0.2.3` em `devDependencies`. A revisão o marca como configurado, pelo `require('@module-federation/enhanced/webpack')` e pelo `ModuleFederationPlugin` em frontend/order-tracking/webpack.config.js:2, 45-59, lido pelos scripts `webpack serve` e `webpack --mode production` (frontend/order-tracking/package.json:7-8).

**Interpretação:** O `order-tracking` declara o plugin de Module Federation e o usa no build.

### 2. frontend/restaurant-catalog/package.json:25

**Observação:** `@module-federation/enhanced` `^0.2.3` em `devDependencies`. A revisão o marca como configurado, pelo `require` e pelo `ModuleFederationPlugin` em frontend/restaurant-catalog/webpack.config.js:2, 44-58, lido pelos scripts de frontend/restaurant-catalog/package.json:7-8.

**Interpretação:** O `restaurant-catalog` declara o plugin de Module Federation e o usa no build.

### 3. frontend/shell-app/package.json:28

**Observação:** `@module-federation/enhanced` `^0.2.3` em `devDependencies`. A revisão o marca como configurado, pelo `require` e pelo `ModuleFederationPlugin` com `remotes` em frontend/shell-app/webpack.config.js:2, 48-63, lido pelos scripts de frontend/shell-app/package.json:7-8.

**Interpretação:** O host declara o plugin de Module Federation e o usa no build.

### 4. frontend/order-tracking/webpack.config.js:2; frontend/order-tracking/webpack.config.js:45-59

**Observação:** `new ModuleFederationPlugin({ name: 'orderTracking', filename: 'remoteEntry.js', exposes: { './OrderTracking': './src/OrderTracking' }, shared: { ... } })`, com `react`, `react-dom`, `react-router-dom`, `@mui/material`, `@emotion/react` e `@emotion/styled` como `singleton`. O plugin vem de `@module-federation/enhanced/webpack` (:2).

**Interpretação:** A unidade se configura como remote `orderTracking`, publica o `remoteEntry.js` e expõe um módulo, `./OrderTracking`.

### 5. frontend/restaurant-catalog/webpack.config.js:2; frontend/restaurant-catalog/webpack.config.js:44-58

**Observação:** `new ModuleFederationPlugin({ name: 'restaurantCatalog', filename: 'remoteEntry.js', exposes: { './RestaurantCatalog': './src/RestaurantCatalog' }, shared: { ... } })`, com as mesmas seis bibliotecas como `singleton`. O plugin vem de `@module-federation/enhanced/webpack` (:2).

**Interpretação:** A unidade se configura como remote `restaurantCatalog`, publica o `remoteEntry.js` e expõe um módulo, `./RestaurantCatalog`.

### 6. frontend/shell-app/webpack.config.js:2; frontend/shell-app/webpack.config.js:48-63

**Observação:** `new ModuleFederationPlugin({ name: 'shellApp', remotes: { restaurantCatalog: 'restaurantCatalog@http://localhost:3001/remoteEntry.js', orderTracking: 'orderTracking@http://localhost:3002/remoteEntry.js', userDashboard: 'userDashboard@http://localhost:3003/remoteEntry.js' }, shared: { ... } })`, com as mesmas seis bibliotecas como `singleton`. Não há `exposes`. O plugin vem de `@module-federation/enhanced/webpack` (:2).

**Interpretação:** A configuração do host declara os três remotes e os endereços fixos dos seus `remoteEntry.js`, e compartilha com eles as bibliotecas de UI.

### 7. frontend/user-dashboard/webpack.config.js:2-3; frontend/user-dashboard/webpack.config.js:50-67

**Observação:** `new ModuleFederationPlugin({ name: 'userDashboard', filename: 'remoteEntry.js', exposes: { './UserDashboard': './src/UserDashboard' }, shared: { ... } })`, com as mesmas seis bibliotecas e também `sockjs-client` e `@stomp/stompjs` como `singleton` (:63-65). O plugin vem de `require('webpack').container` (:3), abaixo do comentário "FIX: Use the standard built-in plugin from 'webpack'" (:2).

**Interpretação:** A unidade se configura como remote `userDashboard`, publica o `remoteEntry.js` e expõe um módulo, `./UserDashboard`, com o plugin embutido do webpack.

### 8. frontend/shell-app/src/App.js:21; frontend/shell-app/webpack.config.js:51; frontend/restaurant-catalog/webpack.config.js:48

**Observação:** `const RestaurantCatalog = lazy(() => import('restaurantCatalog/RestaurantCatalog'))`. O nome é o do remote declarado no host, e o módulo é o exposto pelo `restaurant-catalog`. O componente é renderizado na rota `/restaurants/*` (frontend/shell-app/src/App.js:77-84).

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `restaurantCatalog`, nomeando-o.

### 9. frontend/shell-app/src/App.js:22; frontend/shell-app/webpack.config.js:52; frontend/order-tracking/webpack.config.js:49

**Observação:** `const OrderTracking = lazy(() => import('orderTracking/OrderTracking'))`, renderizado na rota `/orders/*` (frontend/shell-app/src/App.js:86-93).

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `orderTracking`, nomeando-o.

### 10. frontend/shell-app/src/App.js:23; frontend/shell-app/webpack.config.js:53; frontend/user-dashboard/webpack.config.js:54

**Observação:** `const UserDashboard = lazy(() => import('userDashboard/UserDashboard'))`, renderizado na rota `/dashboard/*` (frontend/shell-app/src/App.js:95-102).

**Interpretação:** O host carrega em runtime o módulo exposto pelo remote `userDashboard`, nomeando-o.

### 11. frontend/order-tracking/src/index.js:1

**Observação:** `import('./bootstrap')`, que carrega frontend/order-tracking/src/bootstrap.js, da própria unidade.

**Interpretação:** É um bootstrap assíncrono interno ao `order-tracking`.

### 12. frontend/restaurant-catalog/src/index.js:1

**Observação:** `import('./bootstrap')`, que carrega frontend/restaurant-catalog/src/bootstrap.js, da própria unidade.

**Interpretação:** É um bootstrap assíncrono interno ao `restaurant-catalog`.

### 13. frontend/shell-app/src/index.js:1

**Observação:** `import('./bootstrap')`, que carrega frontend/shell-app/src/bootstrap.js, onde `App` é montado (:3-6).

**Interpretação:** É um bootstrap assíncrono interno ao host.

### 14. frontend/user-dashboard/src/index.js:1

**Observação:** `import('./bootstrap')`, que carrega frontend/user-dashboard/src/bootstrap.js, da própria unidade.

**Interpretação:** É um bootstrap assíncrono interno ao `user-dashboard`.

### 15. frontend/restaurant-catalog/src/components/MenuView.js:56; frontend/restaurant-catalog/src/components/MenuView.js:53-61

**Observação:** `window.dispatchEvent(new CustomEvent('addToCart', { detail: { item, restaurant } }))` em `handleAddToCart`, ligado ao botão de cada item do menu. `MenuView` é rota do módulo exposto (frontend/restaurant-catalog/src/RestaurantCatalog.js:12). Os comentários de :54-55 apontam o carrinho do shell como alvo, mas nenhum arquivo do snapshot registra ouvinte para `addToCart`; o `CartContext` do shell só tem a função de mesmo nome (frontend/shell-app/src/context/CartContext.js:38, 100). A revisão marca a composição como indeterminada.

**Interpretação:** Duas leituras continuam plausíveis. O disparo é um canal de comunicação feito para o shell, que o snapshot não completa. Ou é um evento que não alcança nenhuma unidade e não participa da composição.

### 16. frontend/restaurant-catalog/src/components/MenuView.js:57

**Observação:** `new CustomEvent('addToCart', ...)`, o evento disparado na linha anterior, sem receptor no snapshot. A revisão marca a composição como indeterminada, pelo mesmo motivo.

**Interpretação:** É a mesma dúvida da observação #15: o evento pode ser um canal para o shell, ainda sem ouvinte, ou um disparo que não chega a nenhuma unidade.

### 17. frontend/shell-app/src/App.js:72-104; frontend/shell-app/src/App.js:21-23; frontend/shell-app/src/App.js:71

**Observação:** `<Routes>` do host, dentro de um `Suspense`: `/`, `/login`, `/register` e `/cart` são páginas do shell. `/restaurants/*` → `<RestaurantCatalog />`, `/orders/*` → `<OrderTracking />` e `/dashboard/*` → `<UserDashboard />`, cada um dentro de `PrivateRoute`. Os três componentes vêm dos `lazy` de :21-23.

**Interpretação:** É a tabela de rotas que liga caminhos do host aos componentes dos três remotes.

### 18. frontend/shell-app/src/context/AuthContext.js:38; frontend/shell-app/src/context/AuthContext.js:38-39, 53-54, 61-62

**Observação:** `localStorage.setItem('token', response.token)` e `localStorage.setItem('user', ...)` no login; o mesmo no registro, e `removeItem` no logout. O `AuthProvider` envolve o app em frontend/shell-app/src/App.js:66. Os remotes leem as mesmas chaves nos seus interceptores HTTP (ex.: frontend/restaurant-catalog/src/services/restaurantService.js:15) e o `user-dashboard` lê `user` em frontend/user-dashboard/src/UserDashboard.js:12-13.

**Interpretação:** O host publica a sessão em chaves do `localStorage` que os remotes consomem, um canal de estado compartilhado. A linha não nomeia a unidade de destino.

### 19. frontend/order-tracking; frontend/order-tracking/package.json; frontend/order-tracking/webpack.config.js:7, 61; frontend/order-tracking/src/bootstrap.js:7-8; frontend/order-tracking/webpack.config.js:44-64; frontend/order-tracking/package.json:8

**Observação:** Projeto com manifesto e `webpack.config.js` próprios. A entrada é `./src/index.js`, que carrega o bootstrap com `createRoot`, e a página vem de `./public/index.html`. O build é `webpack --mode production`, e o projeto tem Dockerfile e serviço de compose próprios (docker-compose.yml:317-319). Não há workspace.

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação React remota.

### 20. frontend/restaurant-catalog; frontend/restaurant-catalog/package.json; frontend/restaurant-catalog/webpack.config.js:7, 60; frontend/restaurant-catalog/src/bootstrap.js:7-8; frontend/restaurant-catalog/webpack.config.js:43-63; frontend/restaurant-catalog/package.json:8

**Observação:** Projeto com manifesto e `webpack.config.js` próprios, entrada `./src/index.js`, página de `./public/index.html` e build `webpack --mode production`. Tem Dockerfile e serviço de compose próprios (docker-compose.yml:301-303).

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação React remota.

### 21. frontend/shell-app; frontend/shell-app/package.json; frontend/shell-app/webpack.config.js:7, 65; frontend/shell-app/src/bootstrap.js:5-6; frontend/shell-app/webpack.config.js:47-68; frontend/shell-app/package.json:8

**Observação:** Projeto com manifesto e `webpack.config.js` próprios, entrada `./src/index.js`, que monta `App` com `ReactDOM.createRoot`, página de `./public/index.html` e build `webpack --mode production`. Tem Dockerfile e serviço de compose próprios (docker-compose.yml:349-351).

**Interpretação:** É uma unidade frontend com limite próprio, o host da composição.

### 22. frontend/user-dashboard; frontend/user-dashboard/package.json; frontend/user-dashboard/webpack.config.js:8, 69; frontend/user-dashboard/src/bootstrap.js:7-8; frontend/user-dashboard/webpack.config.js:49-72; frontend/user-dashboard/package.json:19

**Observação:** Projeto com manifesto e `webpack.config.js` próprios, entrada `./src/index.js`, página de `./public/index.html` e build `webpack --mode production`. Tem Dockerfile e serviço de compose próprios (docker-compose.yml:333-335).

**Interpretação:** É uma unidade frontend com limite próprio, uma aplicação React remota.

### 23. infrastructure/faas/order-completion; infrastructure/faas/order-completion/package.json:5; infrastructure/faas/order-completion/handler.js:1-2; infrastructure/faas/order-completion/Dockerfile:1, 25

**Observação:** Projeto com `package.json` próprio, `main: handler.js` e um servidor Express em `handler.js`. A imagem é `node:18-alpine` com `CMD ["node", "handler.js"]`. Não há página nem entrada de UI.

**Interpretação:** É uma função OpenFaaS em Node, não uma unidade frontend.

### 24. frontend/shell-app/webpack.config.js:51; frontend/restaurant-catalog/webpack.config.js:45-46, 48; frontend/shell-app/src/App.js:21; frontend/shell-app/src/App.js:72

**Observação:** O host declara o remote `restaurantCatalog@http://localhost:3001/remoteEntry.js`. O `restaurant-catalog` tem `name: 'restaurantCatalog'`, `filename: 'remoteEntry.js'` e expõe `./RestaurantCatalog`. O host importa `restaurantCatalog/RestaurantCatalog` e o monta na rota `/restaurants/*`. As duas unidades estão no snapshot.

**Interpretação:** É uma relação host → remote ativa por Module Federation, de `shell-app` para `restaurant-catalog`.

### 25. frontend/shell-app/webpack.config.js:52; frontend/order-tracking/webpack.config.js:46-47, 49; frontend/shell-app/src/App.js:22; frontend/shell-app/src/App.js:72

**Observação:** O host declara `orderTracking@http://localhost:3002/remoteEntry.js`. O `order-tracking` tem `name: 'orderTracking'`, `filename: 'remoteEntry.js'` e expõe `./OrderTracking`. O host importa `orderTracking/OrderTracking` e o monta na rota `/orders/*`.

**Interpretação:** É uma relação host → remote ativa por Module Federation, de `shell-app` para `order-tracking`.

### 26. frontend/shell-app/webpack.config.js:53; frontend/user-dashboard/webpack.config.js:51-52, 54; frontend/shell-app/src/App.js:23; frontend/shell-app/src/App.js:72

**Observação:** O host declara `userDashboard@http://localhost:3003/remoteEntry.js`. O `user-dashboard` tem `name: 'userDashboard'`, `filename: 'remoteEntry.js'` e expõe `./UserDashboard`, com o plugin embutido do webpack. O host importa `userDashboard/UserDashboard` e o monta na rota `/dashboard/*`.

**Interpretação:** É uma relação host → remote ativa por Module Federation, de `shell-app` para `user-dashboard`.

### 27. frontend/restaurant-catalog/src/components/MenuView.js:56; frontend/restaurant-catalog/src/components/MenuView.js:57

**Observação:** O `restaurant-catalog` dispara o evento de janela `addToCart` dentro da página do shell. Nenhum arquivo do snapshot o escuta, e o comentário que aponta o carrinho do shell não é correspondência explícita. A relação tem tipo communication, mecanismo `events`, destino `addToCart` (o nome do evento), No snapshot `Undetermined` e Ativa `Undetermined`.

**Interpretação:** Continuam plausíveis duas leituras: uma comunicação do catálogo para o shell que o snapshot não completa, ou um evento sem destino, que não liga unidades.

### 28. frontend/shell-app/src/context/AuthContext.js:38; frontend/order-tracking/src/services/orderService.js:15-17; frontend/order-tracking/src/services/websocketService.js:13

**Observação:** O shell grava `token` no login e no registro e o apaga no logout e num 401. O `order-tracking` só lê a chave, no interceptor HTTP e na conexão WebSocket. Nenhuma configuração declara o canal. A relação tem tipo communication, direção origem → destino, mecanismo `other`, No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação de comunicação ativa por estado compartilhado no `localStorage`, de `shell-app` para `order-tracking`. Só vale com o remote dentro da página do shell, na mesma origem.

### 29. frontend/shell-app/src/context/AuthContext.js:38; frontend/restaurant-catalog/src/services/restaurantService.js:15-17

**Observação:** O mesmo canal: o `restaurant-catalog` só lê `token` no interceptor HTTP e não grava nenhuma das chaves da sessão. A relação tem direção origem → destino, mecanismo `other`, No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação de comunicação ativa por estado compartilhado no `localStorage`, de `shell-app` para `restaurant-catalog`.

### 30. frontend/shell-app/src/context/AuthContext.js:38-39; frontend/user-dashboard/src/UserDashboard.js:12-13; frontend/user-dashboard/src/components/UserProfile.js:91-92; frontend/shell-app/src/context/AuthContext.js:21-24

**Observação:** O shell grava `token` e `user`. O `user-dashboard` lê `user` para escolher a visão de motorista e `token` nos seus serviços. Ao salvar o perfil, regrava `user`, que o shell lê ao montar o `AuthProvider` e em `getCurrentUser`. A relação tem direção bidirecional, mecanismo `other`, No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação de comunicação ativa nos dois sentidos, por estado compartilhado no `localStorage`, entre `shell-app` e `user-dashboard`.

### 31. frontend/order-tracking/package.json:8; frontend/order-tracking/webpack.config.js:46-47; frontend/order-tracking/Dockerfile:2-31; frontend/order-tracking/nginx.conf:26-28; docker-compose.yml:317-326

**Observação:** O build `webpack --mode production` gera o `remoteEntry.js` da unidade. O Dockerfile multi-stage roda `npm ci` e `npm run build` e serve o `dist` por nginx. O serviço `order-tracking` do compose usa a pasta como contexto e publica a porta 3002, a da URL que o host usa. Não há imagem nomeada nem tag, e o `version` do manifesto não é usado na publicação. Os Dockerfiles rodam `npm ci` sem lockfile no snapshot.

**Interpretação:** O `order-tracking` tem build e deploy separados, sem versionamento independente.

### 32. frontend/restaurant-catalog/package.json:8; frontend/restaurant-catalog/webpack.config.js:45-46; frontend/restaurant-catalog/Dockerfile:2-31; frontend/restaurant-catalog/nginx.conf:26-28; docker-compose.yml:301-310

**Observação:** O mesmo arranjo: build webpack próprio, imagem nginx própria e serviço `restaurant-catalog` na porta 3001, que corresponde a `http://localhost:3001/remoteEntry.js` no host. Sem versão própria usada na publicação.

**Interpretação:** O `restaurant-catalog` tem build e deploy separados, sem versionamento independente.

### 33. frontend/shell-app/package.json:8; frontend/shell-app/webpack.config.js:48-54; frontend/shell-app/Dockerfile:2-31; frontend/shell-app/nginx.conf:26-28; docker-compose.yml:349-361; infrastructure/nginx/nginx.conf:13-15, 37-38

**Observação:** O host tem build e imagem próprios, que contêm só o seu `dist`; os remotes são buscados em runtime pelas URLs fixas. O serviço `shell-app` publica a porta 3000, e o nginx de borda faz proxy de `/` só para ele. O compose passa ao shell as URLs dos remotes em `REACT_APP_*_URL`, que não chegam ao bundle. Sem versão própria usada na publicação.

**Interpretação:** O host tem build e deploy separados, é o único atrás do nginx de borda e não tem versionamento independente.

### 34. frontend/user-dashboard/package.json:19; frontend/user-dashboard/webpack.config.js:51-52; frontend/user-dashboard/Dockerfile:2-31; frontend/user-dashboard/nginx.conf:26-28; docker-compose.yml:333-342

**Observação:** Build webpack próprio, imagem nginx própria e serviço `user-dashboard` na porta 3003, que corresponde a `http://localhost:3003/remoteEntry.js` no host. O `start` passa a porta na linha de comando. Sem versão própria usada na publicação.

**Interpretação:** O `user-dashboard` tem build e deploy separados, sem versionamento independente.

### 35. FRONTEND_IMPLEMENTATION.md:3

**Observação:** "Complete implementation of all React frontend applications using Module Federation for micro frontend architecture."

**Interpretação:** Afirma que todas as aplicações frontend usam Module Federation. O host e dois remotes usam o pacote `@module-federation/enhanced`, o `user-dashboard` usa o plugin embutido, e o shell compõe os três remotes. A afirmação é corroborada.

### 36. FRONTEND_IMPLEMENTATION.md:7

**Observação:** "The Food Delivery Platform frontend consists of 4 independent React applications that work together using Webpack Module Federation".

**Interpretação:** Afirma quatro aplicações independentes compostas por Module Federation. O snapshot tem as quatro unidades, as três relações host → remote e build e deploy separados. A afirmação é corroborada.

### 37. FRONTEND_IMPLEMENTATION.md:9-12

**Observação:** "**Shell App** - Main orchestrator application", seguido das três aplicações de domínio.

**Interpretação:** Afirma que o shell orquestra `restaurant-catalog`, `order-tracking` e `user-dashboard`. O shell declara, carrega e roteia os três. A afirmação é corroborada.

### 38. FRONTEND_IMPLEMENTATION.md:49

**Observação:** "Global navigation and routing", entre as responsabilidades do shell.

**Interpretação:** Afirma que o shell cuida da navegação e das rotas de toda a aplicação. A tabela de rotas do shell decide qual remote aparece em cada caminho, e o cabeçalho navega entre as áreas. A afirmação é corroborada.

### 39. FRONTEND_IMPLEMENTATION.md:56-60

**Observação:** "**Exposed Services:**" "AuthContext", "CartContext", "API Service", "WebSocket Service", sob o shell.

**Interpretação:** Afirma que o shell expõe seus contextos e serviços aos remotes. A configuração do shell não tem `exposes`, nenhum remote importa os contextos, e cada remote tem seu próprio cliente HTTP. A afirmação é contradita.

### 40. FRONTEND_IMPLEMENTATION.md:140

**Observação:** "RestaurantCatalog.js       # Main component (exposed)".

**Interpretação:** Afirma que o componente principal do `restaurant-catalog` é exposto. A configuração expõe `./RestaurantCatalog`, que o shell importa. A afirmação é corroborada.

### 41. FRONTEND_IMPLEMENTATION.md:209

**Observação:** "OrderTracking.js           # Main component (exposed)".

**Interpretação:** Afirma que o componente principal do `order-tracking` é exposto. A configuração expõe `./OrderTracking`, que o shell importa. A afirmação é corroborada.

### 42. FRONTEND_IMPLEMENTATION.md:262

**Observação:** "UserDashboard.js           # Main component (exposed)".

**Interpretação:** Afirma que o componente principal do `user-dashboard` é exposto. A configuração expõe `./UserDashboard`, que o shell importa. A afirmação é corroborada.

### 43. FRONTEND_IMPLEMENTATION.md:282-291

**Observação:** "Shared Technologies" "All applications use:" React 18.2.0, Material-UI 5.15.0, React Router DOM 6.20.1, Axios 1.6.2, Webpack 5, Module Federation, Emotion.

**Interpretação:** Afirma a pilha comum das quatro aplicações. Os quatro manifestos declaram essas bibliotecas, com as versões citadas ou faixas que as admitem. A afirmação é corroborada.

### 44. FRONTEND_IMPLEMENTATION.md:442-449

**Observação:** "Click \"Add to Cart\" on menu item" → "Add item to CartContext" → "Update cart badge in header".

**Interpretação:** Afirma que o item adicionado no menu do catálogo chega ao carrinho do shell. O clique só dispara o evento `addToCart`, que ninguém escuta, e a função `addToCart` do contexto não é chamada em nenhum arquivo. A afirmação é contradita.

### 45. FRONTEND_IMPLEMENTATION.md:609

**Observação:** "**Independent** - Each can be developed and deployed separately".

**Interpretação:** Afirma desenvolvimento e deploy separados por aplicação. Cada aplicação tem manifesto, configuração e build próprios, e as quatro têm build e deploy separados. A afirmação é corroborada.

### 46. FRONTEND_IMPLEMENTATION.md:614

**Observação:** "**Fast** - Optimized builds and lazy loading".

**Interpretação:** "Fast" é avaliação sem medida. O que a linha enuncia se confirma: os builds são de produção, e o shell carrega os remotes sob demanda por `lazy`. A afirmação é corroborada.

### 47. README.md:9

**Observação:** "**3 Micro Frontends** (React with Module Federation)".

**Interpretação:** Afirma três micro-frontends React compostos por Module Federation. São os três remotes, todos ligados ao shell por federação. A afirmação é corroborada.

### 48. README.md:142-155

**Observação:** "Building Individual Services", com `# Frontend application`, `npm run build` e `docker build -t app-name .`.

**Interpretação:** Afirma que cada aplicação frontend é construída e empacotada sozinha. Cada uma tem script de build e Dockerfile próprios. A afirmação é corroborada.

### 49. docs/ARCHITECTURE.md:267-274

**Observação:** "Restaurant Catalog MFE (Port 3001)" "**Responsibility**: Restaurant browsing, menu display, cart management", com "Shopping cart functionality" e "Order placement".

**Interpretação:** Atribui ao catálogo a gestão do carrinho e a colocação do pedido. No snapshot, as duas ficam no shell: o `CartContext`, a página `/cart` e o envio do pedido. A afirmação é contradita.

### 50. docs/ARCHITECTURE.md:350-361

**Observação:** "Nginx Load Balancer (Port 80)", com "`frontend`: Shell App" e "`/` → Shell App".

**Interpretação:** Afirma que o nginx de borda serve o shell. O upstream `frontend` só tem `shell-app:80`, com proxy de `/`. A afirmação é corroborada.

### 51. docs/ARCHITECTURE.md:401

**Observação:** "Module Federation | Module Federation Enhanced | 0.2.3 | Micro frontend".

**Interpretação:** Nomeia o pacote de federação do frontend e a versão. O pacote está declarado e configurado no host e em dois remotes; o `user-dashboard` usa o plugin embutido. A afirmação é corroborada, com essa exceção.

### 52. docs/ARCHITECTURE.md:773-777

**Observação:** "Frontend Layer (4 containers)": "`fooddelivery-shell-app`: Module Federation host (Shell App)" e um contêiner por MFE.

**Interpretação:** Afirma um contêiner por aplicação frontend, com o shell como host. O compose tem os quatro serviços com esses `container_name`. A afirmação é corroborada.

### 53. docs/ARCHITECTURE.md:866-877

**Observação:** Diagrama "Dependency Chain": "API Gateway" → "Frontend Services (Shell App, MFEs)" → "Nginx Load Balancer".

**Interpretação:** Descreve a ordem de dependência entre o gateway, os serviços de frontend e o nginx. O `depends_on` do compose segue essa cadeia, que só ordena a subida dos contêineres. A afirmação é corroborada.

### 54. frontend/README.md:18

**Observação:** "Provides shared authentication context", entre as funções do shell.

**Interpretação:** Afirma que o shell provê a autenticação usada pelas outras unidades. O shell grava a sessão no `localStorage`, e os remotes a leem. A afirmação é corroborada.

### 55. frontend/README.md:28-34

**Observação:** "Shared Dependencies" "All apps share:" React 18, React DOM, React Router DOM, Material-UI, Emotion.

**Interpretação:** Afirma as dependências compartilhadas entre as aplicações. As quatro configurações de federação declaram essas bibliotecas como `singleton` em `shared`. A afirmação é corroborada.

### 56. frontend/README.md:304

**Observação:** "All applications connect to the API Gateway at `http://localhost:8080`."

**Interpretação:** Afirma que as quatro aplicações usam o mesmo gateway de backend. Os serviços HTTP das quatro têm esse endereço como padrão. A afirmação é corroborada.

### 57. frontend/README.md:307-308

**Observação:** "JWT tokens stored in localStorage" e "Authorization header added to all requests".

**Interpretação:** Afirma o token no `localStorage` e o cabeçalho em cada requisição. O shell grava o token, e o interceptor de cada aplicação o põe no cabeçalho. A afirmação é corroborada.

### 58. frontend/restaurant-catalog/src/components/MenuView.js:54-55

**Observação:** Comentário: "This will be handled by the shell app's cart context" / "For now, we'll use window events to communicate".

**Interpretação:** Afirma que o carrinho do shell trata o item enviado por evento de janela. O disparo existe, mas o `CartContext` do shell não registra ouvinte. A afirmação é contradita.

### 59. frontend/user-dashboard/webpack.config.js:2

**Observação:** Comentário: "FIX: Use the standard built-in plugin from 'webpack'".

**Interpretação:** Afirma que a unidade usa o plugin embutido do webpack. A linha seguinte o importa de `require('webpack').container`, e o manifesto não declara `@module-federation/enhanced`. A afirmação é corroborada.

### 60. frontend/user-dashboard/webpack.config.js:63

**Observação:** Comentário: "Add these to shared to prevent duplicate socket connections", acima de `sockjs-client` e `@stomp/stompjs` em `shared`.

**Interpretação:** Afirma que compartilhar os pacotes de WebSocket evita conexões duplicadas. Nenhuma outra configuração compartilha esses pacotes, e o painel de motorista abre a própria conexão com `new SockJS(...)`. A afirmação é contradita.

### 61. 497d666 2026-01-14 (frontend/shell-app/src/context/CartContext.js); 3638c74 2026-01-14 (frontend/restaurant-catalog/src/components/MenuView.js); a00d643 2026-01-14 (frontend/shell-app/src/App.js, frontend/shell-app/src/components/Header.js)

**Observação:** O `CartContext.js` tem o mesmo objeto nos três commits e nunca registra ouvinte. O `MenuView.js` muda em `3638c74`, e a versão de `497d666` não está disponível. `App.js` e `Header.js` mudam em `a00d643`, com versões anteriores indisponíveis. Nenhum arquivo do frontend é removido. O ponto é inconclusivo.

**Interpretação:** O carrinho do shell nunca escutou o evento. Fica em aberto se o canal chegou a ter receptor em outro arquivo, ou seja, se foi planejado e nunca ligado ou abandonado. A dúvida é sobre o passado: no snapshot, não há ouvinte, e as leituras das observações #15, #16 e #27 não mudam.

### 62. 497d666 2026-01-14 (frontend/shell-app/webpack.config.js, FRONTEND_IMPLEMENTATION.md)

**Observação:** A configuração do shell e o `FRONTEND_IMPLEMENTATION.md` vêm de `497d666` e têm o mesmo objeto nos três commits. O ponto é esclarecido.

**Interpretação:** O shell nunca teve `exposes`. A lista de serviços expostos e a configuração sem `exposes` são do mesmo estágio; a divergência não vem de uma mudança posterior.

### 63. 497d666 2026-01-14 (docs/ARCHITECTURE.md, frontend/shell-app/src/context/CartContext.js); 3638c74 2026-01-14 (frontend/restaurant-catalog/src/components/MenuView.js, frontend/restaurant-catalog/src/components/MenuItemCard.js); a00d643 2026-01-14 (frontend/shell-app/src/pages/CartPage.js)

**Observação:** `docs/ARCHITECTURE.md` e o `CartContext.js` do shell existem desde `497d666` e nunca mudam. A página que envia o pedido, `CartPage.js`, é criada em `a00d643`, o commit do snapshot. Nenhum arquivo do catálogo com nome de carrinho ou pedido é criado ou removido. O ponto é esclarecido.

**Interpretação:** A atribuição do carrinho ao catálogo e o carrinho no shell são do mesmo estágio. A colocação do pedido opõe o documento do primeiro commit a uma página do shell criada no último, sem que o documento tenha sido atualizado.

### 64. 3638c74 2026-01-14 (frontend/user-dashboard/webpack.config.js, frontend/user-dashboard/src/components/DriverDashboard.js, frontend/user-dashboard/package.json); 497d666 2026-01-14 (frontend/shell-app/webpack.config.js)

**Observação:** A configuração do `user-dashboard` muda em `3638c74` para o objeto do snapshot, com o comentário, e o mesmo commit cria o `DriverDashboard.js`, que abre a própria conexão. As configurações do shell e do `order-tracking` não mudam depois de `497d666`. O ponto é esclarecido.

**Interpretação:** O comentário e o código que o contradiz são do mesmo estágio, e as outras unidades nunca compartilharam os pacotes de WebSocket.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (frontend/order-tracking/package.json:27) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 2 | 3.4.2 (frontend/restaurant-catalog/package.json:25) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 3 | 3.4.2 (frontend/shell-app/package.json:28) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 4 | 3.4.2 (frontend/order-tracking/package.json:27, Evidência); 3.4.3 (frontend/order-tracking, Marcadores, Entrada e Build); 3.4.4 (frontend/shell-app/src/App.js:22, Observação); 3.4.5 #2 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #7, #21 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #19; configura #25 |
| 5 | 3.4.2 (frontend/restaurant-catalog/package.json:25, Evidência); 3.4.3 (frontend/restaurant-catalog, Marcadores, Entrada e Build); 3.4.4 (frontend/shell-app/src/App.js:21, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #6, #21 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #20; configura #24 |
| 6 | 3.4.2 (frontend/shell-app/package.json:28, Evidência); 3.4.3 (frontend/shell-app, Marcadores, Entrada e Build); 3.4.4 (frontend/shell-app/src/App.js:21, :22, :23, Observação); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #1, #2, #4 (Onde é servida); 3.4.6 #3 (Artefatos); 3.4.7 #3, #5, #21 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #21; configura #24; configura #25; configura #26 |
| 7 | 3.4.3 (frontend/user-dashboard, Marcadores, Entrada e Build); 3.4.4 (frontend/shell-app/src/App.js:23, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Artefatos); 3.4.7 #1, #8, #21, #25, #26 (Evidência); 3.4.7 #25, #26 (Documento) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #22; configura #26 |
| 8 | 3.4.4 (frontend/shell-app/src/App.js:21) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #24 |
| 9 | 3.4.4 (frontend/shell-app/src/App.js:22) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #25 |
| 10 | 3.4.4 (frontend/shell-app/src/App.js:23) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #26 |
| 11 | 3.4.4 (frontend/order-tracking/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 12 | 3.4.4 (frontend/restaurant-catalog/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (frontend/shell-app/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 14 | 3.4.4 (frontend/user-dashboard/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 15 | 3.4.4 (frontend/restaurant-catalog/src/components/MenuView.js:56) | 3 código | código-fonte | events | tecnológica | ambígua | implementa #27 |
| 16 | 3.4.4 (frontend/restaurant-catalog/src/components/MenuView.js:57) | 3 código | código-fonte | events | tecnológica | ambígua | implementa #27 |
| 17 | 3.4.4 (frontend/shell-app/src/App.js:72) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #24; implementa #25; implementa #26 |
| 18 | 3.4.4 (frontend/shell-app/src/context/AuthContext.js:38) | 3 código | código-fonte | other | tecnológica | moderada | implementa #28; implementa #29; implementa #30 |
| 19 | 3.4.3 (frontend/order-tracking) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 20 | 3.4.3 (frontend/restaurant-catalog) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 21 | 3.4.3 (frontend/shell-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 22 | 3.4.3 (frontend/user-dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.3 (infrastructure/faas/order-completion) | 4 estrutura | diretório | — | contexto | fraca | — |
| 24 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #21; liga #20 |
| 25 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #21; liga #19 |
| 26 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #21; liga #22 |
| 27 | 3.4.5 #4 | 5 composição | código-fonte | events | arquitetural | ambígua | liga #20 |
| 28 | 3.4.5 #5 | 5 composição | código-fonte | other | arquitetural | forte | liga #21; liga #19 |
| 29 | 3.4.5 #6 | 5 composição | código-fonte | other | arquitetural | forte | liga #21; liga #20 |
| 30 | 3.4.5 #7 | 5 composição | código-fonte | other | arquitetural | forte | liga #21; liga #22 |
| 31 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #19 |
| 32 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #20 |
| 33 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #21 |
| 34 | 3.4.6 #4 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #22 |
| 35 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #7; corrobora #24; corrobora #25; corrobora #26 |
| 36 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #19; corrobora #20; corrobora #21; corrobora #22; corrobora #24; corrobora #25; corrobora #26; corrobora #31; corrobora #32; corrobora #33; corrobora #34 |
| 37 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #21; corrobora #6; corrobora #8; corrobora #9; corrobora #10; corrobora #24; corrobora #25; corrobora #26 |
| 38 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora frontend/shell-app/src/components/Header.js:56, 68, 80 |
| 39 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #6; contradiz frontend/shell-app/src/context/CartContext.js:38, 100; contradiz frontend/restaurant-catalog/src/services/restaurantService.js:3-17 |
| 40 | 3.4.7 #6 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #5; corrobora #24 |
| 41 | 3.4.7 #7 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #4; corrobora #25 |
| 42 | 3.4.7 #8 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #7; corrobora #26 |
| 43 | 3.4.7 #9 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora frontend/shell-app/package.json:12-19, 35; corrobora frontend/restaurant-catalog/package.json:12-19, 28; corrobora frontend/order-tracking/package.json:12-19, 30; corrobora frontend/user-dashboard/package.json:6-13, 30 |
| 44 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | contradiz frontend/restaurant-catalog/src/components/MenuView.js:53-61; contradiz frontend/shell-app/src/context/CartContext.js:38, 100 |
| 45 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #19; corrobora #20; corrobora #21; corrobora #22; corrobora #31; corrobora #32; corrobora #33; corrobora #34 |
| 46 | 3.4.7 #12 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #8; corrobora #9; corrobora #10; corrobora frontend/shell-app/package.json:8 |
| 47 | 3.4.7 #13 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #19; corrobora #20; corrobora #22; corrobora #24; corrobora #25; corrobora #26 |
| 48 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #31; corrobora #32; corrobora #33; corrobora #34 |
| 49 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | contradiz frontend/shell-app/src/context/CartContext.js:38, 100; contradiz frontend/shell-app/src/pages/CartPage.js:23, 46; contradiz frontend/shell-app/src/App.js:103 |
| 50 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #33; corrobora infrastructure/nginx/nginx.conf:12-15, 36-38 |
| 51 | 3.4.7 #17 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3 |
| 52 | 3.4.7 #18 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #31; corrobora #32; corrobora #33; corrobora #34 |
| 53 | 3.4.7 #19 | 7 documentação | documentação | — | contexto | fraca | corrobora docker-compose.yml:313-314, 329-330, 345-346, 364-367, 379-381 |
| 54 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #18; corrobora #28; corrobora #29; corrobora #30 |
| 55 | 3.4.7 #21 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #4; corrobora #5; corrobora #6; corrobora #7 |
| 56 | 3.4.7 #22 | 7 documentação | documentação | — | contexto | fraca | corrobora frontend/shell-app/src/services/apiService.js:3-6; corrobora frontend/restaurant-catalog/src/services/restaurantService.js:3-6; corrobora frontend/order-tracking/src/services/orderService.js:3-6; corrobora frontend/user-dashboard/src/services/userService.js:3-6 |
| 57 | 3.4.7 #23 | 7 documentação | documentação | other | tecnológica | fraca | corrobora #18; corrobora #28; corrobora #29; corrobora #30 |
| 58 | 3.4.7 #24 | 7 documentação | comentário | events | arquitetural | fraca | contradiz frontend/shell-app/src/context/CartContext.js:38, 100 |
| 59 | 3.4.7 #25 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #7; corrobora frontend/user-dashboard/package.json:22-34 |
| 60 | 3.4.7 #26 | 7 documentação | comentário | — | tecnológica | fraca | contradiz frontend/user-dashboard/src/components/DriverDashboard.js:57; contradiz #4; contradiz #6 |
| 61 | 3.4.8 #1 | 8 histórico | histórico | events | tecnológica | fraca | explica #15; explica #16; explica #27; explica #44; explica #58 |
| 62 | 3.4.8 #2 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #39 |
| 63 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #49 |
| 64 | 3.4.8 #4 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #60 |

## Resumo

Observações: 64. Dimensões (tecnologia: 3, configuração: 4, código: 11, estrutura: 5, composição: 7, build-deploy: 4, documentação: 26, histórico: 4). Força (forte: 11, moderada: 12, fraca: 38, ambígua: 3). Evidência (tecnológica: 25, arquitetural: 36, contexto: 3).
