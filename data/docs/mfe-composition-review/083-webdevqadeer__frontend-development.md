---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
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

# 083 — webdevqadeer/frontend-development

## Leitura do repositório

Exemplo de marketplace em `react/mv-marketplace/`, um monorepo npm workspaces com um shell, quatro aplicações React (`admin`, `buyer`, `payment`, `seller`) e a biblioteca `mv-theme` (react/mv-marketplace/package.json:4-11). Todas as aplicações usam Vite com `@originjs/vite-plugin-federation`. O shell (`name: "shell_app"`) declara os quatro remotes por URL fixa de `remoteEntry.js` nas portas 5001–5004 e compartilha React e ReactDOM (react/mv-marketplace/apps/shell/vite.config.js:9-18). Cada remote expõe `./App` a partir de `./src/App.jsx` em `remoteEntry.js` e fixa a porta só em `preview` (por exemplo react/mv-marketplace/apps/buyer/vite.config.js:8-20).

O shell importa os quatro módulos federados com `React.lazy` (react/mv-marketplace/apps/shell/src/router.jsx:4-7) e os coloca nas rotas `/`, `/seller`, `/admin` e `/payment`, dentro de `BrowserRouter` e `Suspense` (react/mv-marketplace/apps/shell/src/router.jsx:11-18). Os componentes expostos são telas mínimas de demonstração, como `<h2>Admin Panel</h2>` (react/mv-marketplace/apps/admin/src/App.jsx:1-2). O roteador entra no layout do shell por react/mv-marketplace/apps/shell/src/app.jsx:2 e :9, mas a entrada do shell importa `./App.jsx` (react/mv-marketplace/apps/shell/src/main.jsx:3), e o snapshot só tem `src/app.jsx`. Num sistema de arquivos sensível à caixa, a cadeia `index.html` → `main.jsx` → roteador não resolve. Por isso as nove construções da revisão de código-fonte são `Undetermined` e nenhuma relação fica `Ativa = Yes`; a classificação lê a divergência como defeito de portabilidade (provável build em Windows), sem execução observada.

O shell e os quatro remotes declaram ainda um remote `package` em `http://localhost:5005/assets/remoteEntry.js` (react/mv-marketplace/apps/shell/vite.config.js:16; react/mv-marketplace/apps/admin/vite.config.js:15), que nenhum código importa e nenhuma unidade serve. Viraram as relações 5–9, só de configuração. A biblioteca `mv-theme` gera um build ES/UMD de biblioteca (react/mv-marketplace/packages/mvp-theme/vite.config.js:7-13), não configura federação e não é importada pelas aplicações; o script raiz a constrói antes das aplicações (react/mv-marketplace/package.json:13-14). Não há comunicação entre unidades: o `AuthProvider` do shell (react/mv-marketplace/apps/shell/src/app.jsx:3 e :7) é interno a ele.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | react/mv-marketplace/apps/shell | react/mv-marketplace/apps/buyer | host → remote | origem → destino | module-federation | Yes | Undetermined | react/mv-marketplace/apps/shell/vite.config.js:12 (remote `buyer_app` em `http://localhost:5001/assets/remoteEntry.js`); react/mv-marketplace/apps/buyer/vite.config.js:9-12 (`name: "buyer_app"`, `filename: "remoteEntry.js"`, expõe `./App`); react/mv-marketplace/apps/buyer/vite.config.js:20 (porta de preview 5001) | react/mv-marketplace/apps/shell/src/router.jsx:4; react/mv-marketplace/apps/shell/src/router.jsx:13; react/mv-marketplace/apps/shell/src/router.jsx:14 |
| 2 | react/mv-marketplace/apps/shell | react/mv-marketplace/apps/seller | host → remote | origem → destino | module-federation | Yes | Undetermined | react/mv-marketplace/apps/shell/vite.config.js:13 (remote `seller_app` em `http://localhost:5002/assets/remoteEntry.js`); react/mv-marketplace/apps/seller/vite.config.js:9-11 (`name: "seller_app"`, `filename: "remoteEntry.js"`, expõe `./App`); react/mv-marketplace/apps/seller/vite.config.js:18 (porta de preview 5002) | react/mv-marketplace/apps/shell/src/router.jsx:5; react/mv-marketplace/apps/shell/src/router.jsx:13; react/mv-marketplace/apps/shell/src/router.jsx:15 |
| 3 | react/mv-marketplace/apps/shell | react/mv-marketplace/apps/admin | host → remote | origem → destino | module-federation | Yes | Undetermined | react/mv-marketplace/apps/shell/vite.config.js:14 (remote `admin_app` em `http://localhost:5003/assets/remoteEntry.js`); react/mv-marketplace/apps/admin/vite.config.js:9-12 (`name: "admin_app"`, `filename: "remoteEntry.js"`, expõe `./App`); react/mv-marketplace/apps/admin/vite.config.js:20 (porta de preview 5003) | react/mv-marketplace/apps/shell/src/router.jsx:6; react/mv-marketplace/apps/shell/src/router.jsx:13; react/mv-marketplace/apps/shell/src/router.jsx:16 |
| 4 | react/mv-marketplace/apps/shell | react/mv-marketplace/apps/payment | host → remote | origem → destino | module-federation | Yes | Undetermined | react/mv-marketplace/apps/shell/vite.config.js:15 (remote `payment_app` em `http://localhost:5004/assets/remoteEntry.js`); react/mv-marketplace/apps/payment/vite.config.js:9-11 (`name: "payment-app"`, `filename: "remoteEntry.js"`, expõe `./App`); react/mv-marketplace/apps/payment/vite.config.js:18 (porta de preview 5004) | react/mv-marketplace/apps/shell/src/router.jsx:7; react/mv-marketplace/apps/shell/src/router.jsx:13; react/mv-marketplace/apps/shell/src/router.jsx:17 |
| 5 | react/mv-marketplace/apps/admin | package | host → remote | origem → destino | module-federation | Undetermined | No | react/mv-marketplace/apps/admin/vite.config.js:14-16 (remote `package` em `http://localhost:5005/assets/remoteEntry.js`) | — |
| 6 | react/mv-marketplace/apps/buyer | package | host → remote | origem → destino | module-federation | Undetermined | No | react/mv-marketplace/apps/buyer/vite.config.js:14-16 (remote `package` em `http://localhost:5005/assets/remoteEntry.js`) | — |
| 7 | react/mv-marketplace/apps/payment | package | host → remote | origem → destino | module-federation | Undetermined | No | react/mv-marketplace/apps/payment/vite.config.js:12-14 (remote `package` em `http://localhost:5005/assets/remoteEntry.js`) | — |
| 8 | react/mv-marketplace/apps/seller | package | host → remote | origem → destino | module-federation | Undetermined | No | react/mv-marketplace/apps/seller/vite.config.js:12-14 (remote `package` em `http://localhost:5005/assets/remoteEntry.js`) | — |
| 9 | react/mv-marketplace/apps/shell | package | host → remote | origem → destino | module-federation | Undetermined | No | react/mv-marketplace/apps/shell/vite.config.js:16 (remote `package` em `http://localhost:5005/assets/remoteEntry.js`) | — |

## Observações

**1. react/mv-marketplace/apps/shell → react/mv-marketplace/apps/buyer.** O especificador `buyer_app/App` (react/mv-marketplace/apps/shell/src/router.jsx:4) corresponde à chave do remote no shell (react/mv-marketplace/apps/shell/vite.config.js:12) e ao `name: "buyer_app"` com a exposição `./App` do buyer (react/mv-marketplace/apps/buyer/vite.config.js:9-12); a porta 5001 do preview só corrobora. O componente vai para a rota `/` (react/mv-marketplace/apps/shell/src/router.jsx:14). `Ativa = Undetermined` porque as três linhas da revisão de código-fonte são `Undetermined`, pela cadeia de entrada do shell que não alcança o roteador como escrita (react/mv-marketplace/apps/shell/src/main.jsx:3).

**2. react/mv-marketplace/apps/shell → react/mv-marketplace/apps/seller.** `seller_app/App` (react/mv-marketplace/apps/shell/src/router.jsx:5) corresponde ao remote `seller_app` (react/mv-marketplace/apps/shell/vite.config.js:13) e ao `name` e `exposes` do seller (react/mv-marketplace/apps/seller/vite.config.js:9-11), com porta de preview 5002 (:18). Rota `/seller` (react/mv-marketplace/apps/shell/src/router.jsx:15). `Ativa = Undetermined` pelo mesmo motivo da relação 1.

**3. react/mv-marketplace/apps/shell → react/mv-marketplace/apps/admin.** `admin_app/App` (react/mv-marketplace/apps/shell/src/router.jsx:6) corresponde ao remote `admin_app` (react/mv-marketplace/apps/shell/vite.config.js:14) e ao `name` e `exposes` do admin (react/mv-marketplace/apps/admin/vite.config.js:9-12), com porta de preview 5003 (:20). Rota `/admin` (react/mv-marketplace/apps/shell/src/router.jsx:16). `Ativa = Undetermined` pelo mesmo motivo da relação 1.

**4. react/mv-marketplace/apps/shell → react/mv-marketplace/apps/payment.** O shell importa `payment_app/App` (react/mv-marketplace/apps/shell/src/router.jsx:7) pela chave `payment_app` (react/mv-marketplace/apps/shell/vite.config.js:15), mas o remote se declara `name: "payment-app"`, com hífen (react/mv-marketplace/apps/payment/vite.config.js:9). O destino foi resolvido porque o nome só difere no separador, e `filename: "remoteEntry.js"`, a exposição `./App` (react/mv-marketplace/apps/payment/vite.config.js:10-11) e a porta de preview 5004 (:18) batem com a URL do shell; a revisão de código-fonte já registra apps/payment como alvo. A diferença de nome é registrada aqui sem afirmar que o plugin a tolera em execução. Rota `/payment` (react/mv-marketplace/apps/shell/src/router.jsx:17). `Ativa = Undetermined` pelo mesmo motivo da relação 1.

**5. react/mv-marketplace/apps/admin → package.** O admin declara o remote `package` em `http://localhost:5005/assets/remoteEntry.js` (react/mv-marketplace/apps/admin/vite.config.js:14-16) e não o importa (react/mv-marketplace/apps/admin/src/App.jsx:1-2). Nenhuma configuração do snapshot usa `name: "package"` nem porta 5005; `packages/mvp-theme` se chama `mv-theme` e só tem build de biblioteca (react/mv-marketplace/packages/mvp-theme/vite.config.js:7-13). Destino escrito como na configuração, `No snapshot = Undetermined` por não haver correspondência nem identificação como externo, e `Ativa = No` porque a relação só aparece na configuração.

**6. react/mv-marketplace/apps/buyer → package.** Mesma declaração (react/mv-marketplace/apps/buyer/vite.config.js:14-16), sem import em react/mv-marketplace/apps/buyer/src/App.jsx:1-9. Valores pelos mesmos motivos da relação 5.

**7. react/mv-marketplace/apps/payment → package.** Mesma declaração (react/mv-marketplace/apps/payment/vite.config.js:12-14), sem import em react/mv-marketplace/apps/payment/src/App.jsx:1-2. Valores pelos mesmos motivos da relação 5.

**8. react/mv-marketplace/apps/seller → package.** Mesma declaração (react/mv-marketplace/apps/seller/vite.config.js:12-14); react/mv-marketplace/apps/seller/src/App.jsx:1 importa só `react`. Valores pelos mesmos motivos da relação 5.

**9. react/mv-marketplace/apps/shell → package.** O shell declara `package` junto dos quatro remotes reais (react/mv-marketplace/apps/shell/vite.config.js:16), mas o roteador só importa os outros quatro (react/mv-marketplace/apps/shell/src/router.jsx:4-7). Valores pelos mesmos motivos da relação 5. As relações 5–9 ficam por último por não terem Código; com o mesmo Destino, seguem a ordem alfabética da Origem.

## Resumo

Relações: 9 (host → remote: 9). Ativas: 0. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
