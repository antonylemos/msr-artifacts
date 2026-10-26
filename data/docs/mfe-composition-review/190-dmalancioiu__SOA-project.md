---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 190 — dmalancioiu/SOA-project

## Leitura do repositório

Projeto acadêmico de demonstração de SOA: uma plataforma de entrega de comida com microsserviços
Spring Boot em `backend/` e, em `frontend/`, quatro aplicações React com webpack, sem workspace
que as agregue. `frontend/shell-app` é o host. Ele declara três remotes de Module Federation,
`restaurantCatalog`, `orderTracking` e `userDashboard`, cada um em
`http://localhost:<porta>/remoteEntry.js` (frontend/shell-app/webpack.config.js:48-54). Carrega
cada remote por `lazy(() => import(...))` (frontend/shell-app/src/App.js:21-23) e o monta numa rota
própria protegida por `PrivateRoute`: `/restaurants/*`, `/orders/*` e `/dashboard/*`
(frontend/shell-app/src/App.js:72-102). O shell cuida de login, registro, carrinho e cabeçalho
(frontend/shell-app/src/App.js:66-69, :73-75, :103). Cada remote expõe um único componente de
domínio com rotas internas próprias: `./RestaurantCatalog`, `./OrderTracking` e `./UserDashboard`
(frontend/restaurant-catalog/webpack.config.js:47-49; frontend/order-tracking/webpack.config.js:48-50;
frontend/user-dashboard/webpack.config.js:53-55). As quatro configurações compartilham `react`,
`react-dom`, `react-router-dom`, `@mui/material` e `@emotion/*` como singletons
(frontend/shell-app/webpack.config.js:55-62). O host e dois remotes usam o plugin de
`@module-federation/enhanced` (frontend/shell-app/webpack.config.js:2). `user-dashboard` usa o
plugin embutido do webpack (frontend/user-dashboard/webpack.config.js:2-3), o que não muda a
relação.

Além do carregamento por federação, as unidades se ligam pela sessão no `localStorage`. O shell
grava `token` e `user` no login e no registro e os apaga no logout
(frontend/shell-app/src/context/AuthContext.js:38-39, :53-54, :61-62). Os remotes rodam na página
do shell e leem essas chaves: o `token` vai no cabeçalho `Authorization` de cada requisição
(frontend/restaurant-catalog/src/services/restaurantService.js:15-17;
frontend/order-tracking/src/services/orderService.js:15-17;
frontend/user-dashboard/src/services/orderService.js:15-17), e o `user` decide se o
`user-dashboard` mostra a visão de motorista (frontend/user-dashboard/src/UserDashboard.js:12-13).
`restaurant-catalog` também dispara o evento de janela `addToCart` ao adicionar um item
(frontend/restaurant-catalog/src/components/MenuView.js:56-60). O comentário diz que o carrinho
do shell trata o evento (MenuView.js:54-55), mas nenhum arquivo do snapshot o escuta. O carrinho
do shell só recebe itens pela função `addToCart` do seu contexto
(frontend/shell-app/src/context/CartContext.js:38, :100).

Não viraram relação os `import('./bootstrap')` de cada unidade
(frontend/shell-app/src/index.js:1 e equivalentes), que são internos (linhas `No` da revisão de
código-fonte). Também ficam de fora as chaves `cart` e `cartRestaurant`, que só o shell lê e grava
(frontend/shell-app/src/context/CartContext.js:19-20, :32-34). Toda unidade `Yes` da revisão
estrutural participa de ao menos uma relação. As URLs dos remotes ficam fixas em `localhost`
(frontend/shell-app/webpack.config.js:51-53), sem variável de ambiente.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/shell-app | frontend/restaurant-catalog | host → remote | origem → destino | module-federation | Yes | Yes | frontend/shell-app/webpack.config.js:51 (remote `restaurantCatalog@http://localhost:3001/remoteEntry.js`); frontend/restaurant-catalog/webpack.config.js:45-46 (`name: 'restaurantCatalog'`, `filename: 'remoteEntry.js'`); frontend/restaurant-catalog/webpack.config.js:48 (expõe `./RestaurantCatalog`); frontend/restaurant-catalog/webpack.config.js:10 (porta 3001) | frontend/shell-app/src/App.js:21; frontend/shell-app/src/App.js:72 |
| 2 | frontend/shell-app | frontend/order-tracking | host → remote | origem → destino | module-federation | Yes | Yes | frontend/shell-app/webpack.config.js:52 (remote `orderTracking@http://localhost:3002/remoteEntry.js`); frontend/order-tracking/webpack.config.js:46-47 (`name: 'orderTracking'`, `filename: 'remoteEntry.js'`); frontend/order-tracking/webpack.config.js:49 (expõe `./OrderTracking`); frontend/order-tracking/webpack.config.js:10 (porta 3002) | frontend/shell-app/src/App.js:22; frontend/shell-app/src/App.js:72 |
| 3 | frontend/shell-app | frontend/user-dashboard | host → remote | origem → destino | module-federation | Yes | Yes | frontend/shell-app/webpack.config.js:53 (remote `userDashboard@http://localhost:3003/remoteEntry.js`); frontend/user-dashboard/webpack.config.js:51-52 (`name: 'userDashboard'`, `filename: 'remoteEntry.js'`); frontend/user-dashboard/webpack.config.js:54 (expõe `./UserDashboard`); frontend/user-dashboard/webpack.config.js:11 (porta 3003) | frontend/shell-app/src/App.js:23; frontend/shell-app/src/App.js:72 |
| 4 | frontend/restaurant-catalog | addToCart | communication | origem → destino | events | Undetermined | Undetermined | — | frontend/restaurant-catalog/src/components/MenuView.js:56; frontend/restaurant-catalog/src/components/MenuView.js:57 |
| 5 | frontend/shell-app | frontend/order-tracking | communication | origem → destino | other | Yes | Yes | — | frontend/shell-app/src/context/AuthContext.js:38 |
| 6 | frontend/shell-app | frontend/restaurant-catalog | communication | origem → destino | other | Yes | Yes | — | frontend/shell-app/src/context/AuthContext.js:38 |
| 7 | frontend/shell-app | frontend/user-dashboard | communication | bidirecional | other | Yes | Yes | — | frontend/shell-app/src/context/AuthContext.js:38 |

## Observações

**1. frontend/shell-app → frontend/restaurant-catalog.** A chave do remote e o prefixo da URL,
`restaurantCatalog@` (frontend/shell-app/webpack.config.js:51), correspondem ao `name` da unidade
(frontend/restaurant-catalog/webpack.config.js:45). O módulo importado, `restaurantCatalog/RestaurantCatalog`
(frontend/shell-app/src/App.js:21), corresponde à exposição `./RestaurantCatalog`
(frontend/restaurant-catalog/webpack.config.js:48). A porta 3001 (frontend/restaurant-catalog/webpack.config.js:10)
só corrobora. O componente é renderizado na rota `/restaurants/*`
(frontend/shell-app/src/App.js:77-84), por isso a linha manual de `Routes` (frontend/shell-app/src/App.js:72)
entra nas relações 1 a 3.

**2. frontend/shell-app → frontend/order-tracking.** `orderTracking@` (frontend/shell-app/webpack.config.js:52)
corresponde ao `name` em frontend/order-tracking/webpack.config.js:46. O módulo
`orderTracking/OrderTracking` (frontend/shell-app/src/App.js:22) corresponde à exposição
`./OrderTracking` (frontend/order-tracking/webpack.config.js:49). A porta 3002 (:10) só corrobora.
O componente é renderizado na rota `/orders/*` (frontend/shell-app/src/App.js:86-93).

**3. frontend/shell-app → frontend/user-dashboard.** `userDashboard@` (frontend/shell-app/webpack.config.js:53)
corresponde ao `name` em frontend/user-dashboard/webpack.config.js:51. O módulo
`userDashboard/UserDashboard` (frontend/shell-app/src/App.js:23) corresponde a `./UserDashboard`
(frontend/user-dashboard/webpack.config.js:54). A porta 3003 (:11) só corrobora. O componente é
renderizado na rota `/dashboard/*` (frontend/shell-app/src/App.js:95-102). Esta unidade monta o
`ModuleFederationPlugin` com o plugin embutido do webpack, `require('webpack').container`
(frontend/user-dashboard/webpack.config.js:3), e não com o pacote `@module-federation/enhanced`
dos outros. O mecanismo continua `module-federation`.

**4. frontend/restaurant-catalog → addToCart.** A Origem é quem envia: `handleAddToCart` dispara
`new CustomEvent('addToCart', { detail: { item, restaurant } })` em `window`
(frontend/restaurant-catalog/src/components/MenuView.js:53-60). `MenuView` é a rota `/:restaurantId/menu`
do módulo exposto (frontend/restaurant-catalog/src/RestaurantCatalog.js:12), então o disparo
acontece dentro do shell. Os comentários de MenuView.js:54-55 apontam o carrinho do shell como
alvo, mas uma busca por `addToCart` e `addEventListener` nos `.js` de `frontend/` só acha o
disparo e a função de frontend/shell-app/src/context/CartContext.js:38, :100, que não escuta
eventos. Um comentário não é correspondência explícita, e não há ouvinte. Por isso o Destino fica
com o nome do evento, como aparece no artefato, e `No snapshot = Undetermined`. Se o revisor
entender que o comentário basta para resolver o destino em `frontend/shell-app`, só a coluna
Destino e a coluna No snapshot (`Yes`) mudam; o Resumo não muda. `Ativa = Undetermined`, porque
as duas linhas de código são `Undetermined` na revisão de código-fonte.

**5. frontend/shell-app → frontend/order-tracking.** Esta troca é por estado compartilhado no
`localStorage`, não por eventos, por isso o mecanismo é `other`. O shell grava `token` no login e
no registro (frontend/shell-app/src/context/AuthContext.js:38, :53) e o apaga no logout e num 401
(:61; frontend/shell-app/src/services/apiService.js:34). `order-tracking` só lê a chave: no
interceptor HTTP (frontend/order-tracking/src/services/orderService.js:15-17) e na conexão
WebSocket (frontend/order-tracking/src/services/websocketService.js:13). Ele não grava nem apaga
`token` ou `user`, por isso a direção é `origem → destino`. As chaves só são as mesmas quando a
unidade roda dentro da página do shell, numa única origem. Isolada, cada unidade tem porta e
`localStorage` próprios (frontend/order-tracking/webpack.config.js:10). Nenhuma declaração de
configuração liga as unidades por esse canal, por isso a Configuração fica `—`.

**6. frontend/shell-app → frontend/restaurant-catalog.** É o mesmo canal da relação 5.
`restaurant-catalog` só lê `token` no interceptor de
frontend/restaurant-catalog/src/services/restaurantService.js:15-17 e não grava nenhuma das
chaves da sessão, por isso a direção é `origem → destino`.

**7. frontend/shell-app ↔ frontend/user-dashboard.** É o mesmo canal, mas com envio nos dois
sentidos. O shell grava `token` e `user` (frontend/shell-app/src/context/AuthContext.js:38-39), e
`user-dashboard` lê o `user` para escolher a visão de motorista
(frontend/user-dashboard/src/UserDashboard.js:12-13) e lê o `token` nos serviços
(frontend/user-dashboard/src/services/orderService.js:15; frontend/user-dashboard/src/services/userService.js:15;
frontend/user-dashboard/src/services/deliveryService.js:15; frontend/user-dashboard/src/components/DriverDashboard.js:56).
No sentido inverso, ao salvar o perfil na rota `/profile` (frontend/user-dashboard/src/UserDashboard.js:31),
`user-dashboard` regrava `user` com os dados atualizados
(frontend/user-dashboard/src/components/UserProfile.js:91-92). O shell lê essa chave ao montar o
`AuthProvider` (frontend/shell-app/src/context/AuthContext.js:21-24) e em `getCurrentUser`
(frontend/shell-app/src/services/authService.js:28-30). Por isso a direção é `bidirecional`, com
Origem e Destino em ordem alfabética. O Código tem só AuthContext.js:38, porque a revisão de
código-fonte registrou UserProfile.js:92 como ponto de uso do mesmo mecanismo, sem linha própria.

## Resumo

Relações: 7 (host → remote: 3, communication: 4). Ativas: 6. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
