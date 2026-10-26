---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
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

# 185 — Marcel-b-velop/vue-mf

## Leitura do repositório

Experimento com quatro aplicações Vue 3 + Vite num workspace pnpm, unidas por Module Federation
(`@originjs/vite-plugin-federation`). `host` é a casca: mantém a navegação e o `<RouterView />`
(host/src/App.vue:8-9) e declara três remotes, `remote-app1`, `remote-app2` e `remote-lib`
(host/vite.config.ts:15-19). Ele entra com as unidades de duas formas: componentes globais
criados por `defineAsyncComponent` em host/src/main.ts:12-14 e registrados em host/src/main.ts:19-21,
e rotas que importam páginas remotas (host/src/router/index.ts:7-8). A rota `/` mostra o `App1`
de app-1 (host/src/views/Home.vue:1); `/login` e `/register` mostram os formulários de app-2. O
`host` também traz `filename: "remoteEntry.js"` e o comentário "Modules to expose"
(host/vite.config.ts:13-14), mas não expõe nada.

`lib` funciona como remote de componentes e serviços compartilhados: expõe o diálogo `Confirm`, o
`apiClient` e os tipos (lib/vite.config.ts:21-25). app-1 também é host de `lib`: carrega o
`Confirm` (app-1/src/main.ts:11, :16) e importa o `apiClient` estaticamente
(app-1/src/main.ts:8; app-1/src/composables/api.ts:1). O `<Confirm>` de app-1/src/App.vue:33 não
tem import local; ele é resolvido pelo componente global do app que monta o `App1`, ou seja, por
app-1/src/main.ts:16 quando app-1 roda isolada e por host/src/main.ts:21 quando roda dentro do
host. app-2 declara `remote-lib` (app-2/vite.config.ts:21-23), mas nenhum arquivo de app-2 o
importa.

Ficaram fora das relações ativas: o `App2` de app-2 é registrado como `AppTwo`
(host/src/main.ts:13, :20) sem nenhum `<AppTwo>` em template (linha `No` da revisão de
código-fonte); as exposições `./App2` e `./Home` de app-2 (app-2/vite.config.ts:16-17) não têm
outro consumidor; o evento `auth:logout` só circula dentro de app-2
(app-2/src/services/authService.ts:57, :99; app-2/src/App.vue:24); e o store
host/src/stores/authStore.ts:3-17, que também lê e grava `accessToken`, não é importado. A sessão
liga as unidades pelo `localStorage`: app-2 grava o token (app-2/src/services/authService.ts:67,
:76) e o `apiClient` de lib o lê em cada requisição (lib/src/services/apiClient.ts:15) e, num 401,
apaga o token e manda para `/login` (lib/src/services/apiClient.ts:33-35), rota que no host é o
`LoginForm` de app-2, que por sua vez lê o token em cada requisição
(app-2/src/services/authService.ts:40). Há também uma API .NET e um IdentityServer em `Api/`, que não são unidades
frontend.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | app-1 | lib | host → remote | origem → destino | module-federation | Yes | Yes | app-1/vite.config.ts:18-20 (remote `remote-lib` em `http://localhost:5177/assets/remoteEntry.js`); lib/vite.config.ts:18-19 (`name: "remote-lib"`, `filename: "remoteEntry.js"`); lib/vite.config.ts:22-23 (expõe `./Confirm` e `./apiClient`); lib/package.json:9 (`vite preview --port 5177`) | app-1/src/main.ts:11; app-1/src/App.vue:33 |
| 2 | host | app-1 | host → remote | origem → destino | module-federation | Yes | Yes | host/vite.config.ts:16 (remote `remote-app1` em `http://localhost:5174/assets/remoteEntry.js`); app-1/vite.config.ts:12-13 (`name: "remote-app1"`, `filename: "remoteEntry.js"`); app-1/vite.config.ts:16 (expõe `./App1`); app-1/package.json:10 (`vite preview --port 5174`) | host/src/main.ts:12; host/src/router/index.ts:4; host/src/views/Home.vue:1 |
| 3 | host | lib | host → remote | origem → destino | module-federation | Yes | Yes | host/vite.config.ts:18 (remote `remote-lib` em `http://localhost:5177/assets/remoteEntry.js`); lib/vite.config.ts:18-19 (`name: "remote-lib"`, `filename: "remoteEntry.js"`); lib/vite.config.ts:22 (expõe `./Confirm`); lib/package.json:9 (`vite preview --port 5177`) | host/src/main.ts:14; app-1/src/App.vue:33 |
| 4 | host | app-2 | host → remote | origem → destino | module-federation | Yes | Yes | host/vite.config.ts:17 (remote `remote-app2` em `http://localhost:5175/assets/remoteEntry.js`); app-2/vite.config.ts:12-13 (`name: "remote-app2"`, `filename: "remoteEntry.js"`); app-2/vite.config.ts:18-19 (expõe `./LoginForm` e `./RegisterForm`); app-2/vite.config.ts:40 (porta 5175) | host/src/router/index.ts:7; host/src/router/index.ts:8; host/src/router/index.ts:4 |
| 5 | app-2 | lib | communication | bidirecional | other | Yes | Yes | — | app-2/src/services/authService.ts:67 |
| 6 | app-2 | lib | host → remote | origem → destino | module-federation | Yes | No | app-2/vite.config.ts:21-23 (remote `remote-lib` em `http://localhost:5177/assets/remoteEntry.js`); lib/vite.config.ts:18-19 (`name: "remote-lib"`, `filename: "remoteEntry.js"`) | — |

## Observações

**1. app-1 → lib.** O remote `remote-lib` de app-1 (app-1/vite.config.ts:19) corresponde à
unidade lib pelo `name` (lib/vite.config.ts:18), e `./Confirm` é exposto em lib/vite.config.ts:22;
a porta 5177 do `preview` de lib (lib/package.json:9) só corrobora. app-1 carrega o `Confirm` em
app-1/src/main.ts:11, registra-o como global em app-1/src/main.ts:16 e o usa em
app-1/src/App.vue:33 quando roda isolada (app-1/src/main.ts:21). O import estático de
`remote-lib/apiClient` (app-1/src/main.ts:8; app-1/src/composables/api.ts:1), exposto em
lib/vite.config.ts:23, é a mesma relação, mas não entrou como linha na revisão de código-fonte,
por isso aparece só aqui e na Configuração.

**2. host → app-1.** `remote-app1` (host/vite.config.ts:16) corresponde a app-1 pelo `name` e
pelo `./App1` exposto (app-1/vite.config.ts:12, :16); a porta 5174 do `preview` de app-1
(app-1/package.json:10) só corrobora, já que app-1 não fixa porta no `server`. O `App1` é carregado
em host/src/main.ts:12, registrado como `AppOne` (host/src/main.ts:19) e renderizado em
host/src/views/Home.vue:1, componente da rota `/` da tabela de rotas (host/src/router/index.ts:4-5),
por isso host/src/router/index.ts:4 também entra aqui. A relação é ativa: `/` é a rota inicial,
exibida pelo `<RouterView />` de host/src/App.vue:9.

**3. host → lib.** `remote-lib` do host (host/vite.config.ts:18) corresponde a lib pelo `name`
(lib/vite.config.ts:18). O host carrega o `Confirm` em host/src/main.ts:14 e o registra como
global em host/src/main.ts:21, mas nenhum template do próprio host usa `<Confirm>`; quem o usa é o
`App1` de app-1 renderizado dentro do host (app-1/src/App.vue:33), resolvido por esse registro.
Por isso app-1/src/App.vue:33 entra nesta relação e na 1. A Origem fica `host`, que é quem carrega
e registra o componente.

**4. host → app-2.** `remote-app2` (host/vite.config.ts:17) corresponde a app-2 pelo `name`
(app-2/vite.config.ts:12) e pelas exposições `./LoginForm` e `./RegisterForm`
(app-2/vite.config.ts:18-19), as mesmas importadas nas rotas `/login` e `/register`
(host/src/router/index.ts:7-8); a porta 5175 (app-2/vite.config.ts:40) só corrobora. A tabela
`routes` (host/src/router/index.ts:4) é passada ao router em host/src/main.ts:23-28, e `/login` é
alcançada pelo menu (host/src/components/Navigation.vue:17-19). O `App2` também é carregado
(host/src/main.ts:13), mas a revisão de código-fonte o marcou `No` por não ser usado; ele não
muda a linha.

**5. app-2 ↔ lib.** A troca é por estado compartilhado no `localStorage`, não por eventos, daí
`other`. app-2 grava `accessToken` no registro e no login (app-2/src/services/authService.ts:67,
:76) e o apaga no 401 e no logout (:56, :98); o interceptor do `apiClient` de lib lê a chave e
monta o cabeçalho `Authorization` (lib/src/services/apiClient.ts:15-19). O sentido inverso também
existe: num 401, o `apiClient` de lib apaga o `accessToken` (lib/src/services/apiClient.ts:34), e
o interceptor do `authClient` de app-2 lê a mesma chave em cada requisição
(app-2/src/services/authService.ts:40), daí `bidirecional`. lib usa o cliente no `Confirm`
(lib/src/components/Confirm.vue:7, :22) e o fornece a app-1. A chave só é a mesma porque, no host, `LoginForm`/`RegisterForm` e o `Confirm` rodam na
página do host, numa única origem; em execução isolada cada unidade tem sua porta e seu
`localStorage`. A Configuração fica `—`: nenhuma declaração liga as duas unidades nesse canal.

**6. app-2 → lib.** app-2 declara `remote-lib` (app-2/vite.config.ts:22), que corresponde a lib
pelo `name` (lib/vite.config.ts:18), mas nenhum arquivo de app-2 importa `remote-lib/...` (busca
por `remote-lib` em app-2 só acha app-2/vite.config.ts:22). A relação existe só na configuração,
por isso `Ativa = No` e Código `—`.

## Resumo

Relações: 6 (host → remote: 5, communication: 1). Ativas: 5. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
