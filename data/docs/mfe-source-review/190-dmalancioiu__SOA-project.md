---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 190 — dmalancioiu/SOA-project

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | frontend/shell-app/src/App.js:21 | frontend/shell-app | dynamic-loading | Yes | `lazy(() => import('restaurantCatalog/RestaurantCatalog'))` carrega em runtime o módulo do remote `restaurantCatalog` (`restaurantCatalog@http://localhost:3001/remoteEntry.js` em frontend/shell-app/webpack.config.js:51), exposto pela unidade frontend/restaurant-catalog (`'./RestaurantCatalog'` em frontend/restaurant-catalog/webpack.config.js:48); renderizado na rota `/restaurants/*` (frontend/shell-app/src/App.js:77-84). App montado em frontend/shell-app/src/bootstrap.js:5-6, carregado por frontend/shell-app/src/index.js:1 |
| src-remote-import | frontend/shell-app/src/App.js:22 | frontend/shell-app | dynamic-loading | Yes | `lazy(() => import('orderTracking/OrderTracking'))` carrega o remote `orderTracking` (frontend/shell-app/webpack.config.js:52, porta 3002), exposto pela unidade frontend/order-tracking (frontend/order-tracking/webpack.config.js:49); renderizado na rota `/orders/*` (frontend/shell-app/src/App.js:86-93) |
| src-remote-import | frontend/shell-app/src/App.js:23 | frontend/shell-app | dynamic-loading | Yes | `lazy(() => import('userDashboard/UserDashboard'))` carrega o remote `userDashboard` (frontend/shell-app/webpack.config.js:53, porta 3003), exposto pela unidade frontend/user-dashboard (frontend/user-dashboard/webpack.config.js:54); renderizado na rota `/dashboard/*` (frontend/shell-app/src/App.js:95-102) |
| src-async-bootstrap | frontend/order-tracking/src/index.js:1 | frontend/order-tracking | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap da própria unidade (frontend/order-tracking/src/bootstrap.js); interno à unidade |
| src-async-bootstrap | frontend/restaurant-catalog/src/index.js:1 | frontend/restaurant-catalog | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap da própria unidade (frontend/restaurant-catalog/src/bootstrap.js); interno à unidade |
| src-async-bootstrap | frontend/shell-app/src/index.js:1 | frontend/shell-app | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap do próprio shell, que monta `App` (frontend/shell-app/src/bootstrap.js:3-6); interno à unidade |
| src-async-bootstrap | frontend/user-dashboard/src/index.js:1 | frontend/user-dashboard | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap da própria unidade (frontend/user-dashboard/src/bootstrap.js); interno à unidade |
| src-cross-unit-communication | frontend/restaurant-catalog/src/components/MenuView.js:56 | frontend/restaurant-catalog | communication | Undetermined | `window.dispatchEvent(new CustomEvent('addToCart', { detail: { item, restaurant } }))` em `handleAddToCart` (frontend/restaurant-catalog/src/components/MenuView.js:53-61), ligado ao botão de cada item (MenuView.js:190 → frontend/restaurant-catalog/src/components/MenuItemCard.js:40-44, :155); MenuView é rota do módulo exposto (frontend/restaurant-catalog/src/RestaurantCatalog.js:12). O comentário diz que o alvo é o carrinho do shell (MenuView.js:54-55), mas nenhum arquivo do snapshot escuta `addToCart`: o `CartContext` do shell só expõe a função `addToCart` (frontend/shell-app/src/context/CartContext.js:38, :100), sem `addEventListener`. Ver Notas |
| src-cross-unit-communication | frontend/restaurant-catalog/src/components/MenuView.js:57 | frontend/restaurant-catalog | communication | Undetermined | `new CustomEvent('addToCart', ...)` é o evento disparado em frontend/restaurant-catalog/src/components/MenuView.js:56; sem receptor no snapshot, pelo mesmo motivo da linha anterior |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | frontend/shell-app/src/App.js:72 | frontend/shell-app | host-relationship | Yes | `Routes` declara quais aplicações o shell usa e sob quais caminhos: `/restaurants/*` → `RestaurantCatalog`, `/orders/*` → `OrderTracking`, `/dashboard/*` → `UserDashboard`, cada uma dentro de `PrivateRoute` e do `Suspense` de :71 (frontend/shell-app/src/App.js:72-104); os três componentes vêm dos `lazy` de :21-23. App montado em frontend/shell-app/src/bootstrap.js:5-6 |
| manual | frontend/shell-app/src/context/AuthContext.js:38 | frontend/shell-app | communication | Yes | `localStorage.setItem('token', response.token)` e `localStorage.setItem('user', ...)` gravam a sessão no login (frontend/shell-app/src/context/AuthContext.js:38-39; também no registro, :53-54; removidos no logout, :61-62); `AuthProvider` envolve o app em frontend/shell-app/src/App.js:66. Os remotes, que rodam na página do shell, leem as mesmas chaves: `token` nos interceptores de frontend/restaurant-catalog/src/services/restaurantService.js:15, frontend/order-tracking/src/services/orderService.js:15 e frontend/user-dashboard/src/services/orderService.js:15 (entre outros), e `user` para escolher a visão de motorista em frontend/user-dashboard/src/UserDashboard.js:12-13 |

## Resumo

Construções com composição: 5 (dynamic-loading: 3, host-relationship: 1, communication: 1).

## Notas

- O evento `addToCart` (`src-cross-unit-communication`, MenuView.js:56-57) está ativo do lado emissor, mas a busca por `addToCart` e `addEventListener` em todo o snapshot só encontrou o próprio disparo e a função do contexto do shell (frontend/shell-app/src/context/CartContext.js:38, :100), que não é ouvinte. O canal fica sem receptor, por isso `Undetermined`: a construção é feita para outra unidade, mas não se confirma qual unidade a recebe. Se o revisor entender que um disparo sem ouvinte não se comunica com ninguém, as duas linhas passam a `No`; o Resumo não muda.
- A comunicação de sessão entre unidades passa pelas chaves `token` e `user` do `localStorage`, gravadas pelo shell (linha manual de AuthContext.js:38). frontend/user-dashboard/src/components/UserProfile.js:92 também regrava `user`; é ponto de uso do mesmo mecanismo e não virou linha.
- A busca do passo 4 nos arquivos `.js` e `.html` de `frontend/` não encontrou `customElements`, `<iframe`, `postMessage`, `BroadcastChannel`, injeção de `<script>`, `registerApplication`, `loadRemote` nem `initFederation`; os únicos `import()` são os da tabela da mineração.
- A renderização de `<RestaurantCatalog />`, `<OrderTracking />` e `<UserDashboard />` (frontend/shell-app/src/App.js:81, :90, :99) fica na observação da linha manual de `Routes`, como os elementos da tabela de rotas.
