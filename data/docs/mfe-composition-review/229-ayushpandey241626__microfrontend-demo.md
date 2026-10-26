---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
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

# 229 — ayushpandey241626/microfrontend-demo

## Leitura do repositório

Workspace Angular de demonstração, com quatro projetos em `projects/` e um único `package.json`
na raiz. `host-app` é o shell (porta 4200, angular.json:76). Os outros três são remotes de Module
Federation, cada um com uma única exposição de rotas: `mfe1` expõe `./ContactsModule`
(projects/mfe1/webpack.config.js:7-11), `mfe2` expõe `./AdminModule`
(projects/mfe2/webpack.config.js:7-11) e `login-mfe-app` expõe `./LoginModule`
(projects/login-mfe-app/webpack.config.js:7-11). Os remotes montam a federação com
`withModuleFederationPlugin` de `@angular-architects/module-federation`; o host usa o
`ModuleFederationPlugin` do webpack direto (projects/host-app/webpack.config.js:6, :20), e as
quatro configurações compartilham todas as dependências como singletons (`shareAll`, por exemplo
projects/host-app/webpack.config.js:26-32).

O host carrega os três remotes no roteador, com `loadRemoteModule({ type: 'module', ... })` e a
URL fixa do `remoteEntry.js` em `localhost`: `contacts` → mfe1, `admin` → mfe2 e `login` →
login-mfe-app (projects/host-app/src/app/app.routes.ts:13-41). A rota vazia redireciona para
`login` (:8-12). As rotas são registradas por `provideRouter(routes)`
(projects/host-app/src/app/app.config.ts:12), e o menu do host navega para `/contacts` e `/admin`
(projects/host-app/src/app/app.component.ts:29, :34). Os `remotes` estáticos do
`webpack.config.js` do host (projects/host-app/webpack.config.js:21-25) não são usados por nenhum
`import('mfe1/...')`; a carga é só por URL. Por isso a chave `loginMfeApp`
(projects/host-app/webpack.config.js:24), diferente do `name: "login-mfe-app"`
(projects/login-mfe-app/webpack.config.js:7), não impede a carga.

Além da federação, o login liga as unidades pela chave `isLoggedIn` do `localStorage`: o
formulário de login grava a chave e navega para `/contacts`
(projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63-64), e o `AuthGuard`
do host a lê para liberar `contacts` e `admin` (projects/host-app/src/app/auth.guard.ts:11;
projects/host-app/src/app/app.routes.ts:15, :25). O logout do host só navega para `/login`, sem
apagar a chave (projects/host-app/src/app/app.component.ts:71-74).

Não viraram relação os `import('./bootstrap')` de cada projeto (por exemplo
projects/host-app/src/main.ts:1), internos à unidade, nem o uso da chave `contacts` do
`localStorage`, que só mfe1 lê e grava. O script `run:all` (package.json:10) aponta para o
servidor de desenvolvimento do pacote de federação e não declara relação. Toda unidade `Yes` da
revisão estrutural participa de ao menos uma relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/host-app | projects/login-mfe-app | host → remote | origem → destino | module-federation | Yes | Yes | projects/host-app/webpack.config.js:24 (remote `loginMfeApp@http://localhost:4203/remoteEntry.js`); projects/login-mfe-app/webpack.config.js:7 (`name: "login-mfe-app"`); projects/login-mfe-app/webpack.config.js:10-11 (expõe `./LoginModule`); angular.json:383 (porta 4203) | projects/host-app/src/app/app.routes.ts:3; projects/host-app/src/app/app.routes.ts:36; projects/host-app/src/app/app.routes.ts:7 |
| 2 | projects/host-app | projects/mfe1 | host → remote | origem → destino | module-federation | Yes | Yes | projects/host-app/webpack.config.js:22 (remote `mfe1@http://localhost:4201/remoteEntry.js`); projects/mfe1/webpack.config.js:7 (`name: "mfe1"`); projects/mfe1/webpack.config.js:10-11 (expõe `./ContactsModule`); angular.json:177 (porta 4201) | projects/host-app/src/app/app.routes.ts:3; projects/host-app/src/app/app.routes.ts:17; projects/host-app/src/app/app.routes.ts:7 |
| 3 | projects/host-app | projects/mfe2 | host → remote | origem → destino | module-federation | Yes | Yes | projects/host-app/webpack.config.js:23 (remote `mfe2@http://localhost:4202/remoteEntry.js`); projects/mfe2/webpack.config.js:7 (`name: "mfe2"`); projects/mfe2/webpack.config.js:10-11 (expõe `./AdminModule`); angular.json:278 (porta 4202) | projects/host-app/src/app/app.routes.ts:3; projects/host-app/src/app/app.routes.ts:27; projects/host-app/src/app/app.routes.ts:7 |
| 4 | projects/login-mfe-app | projects/host-app | communication | origem → destino | other | Yes | Yes | — | projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63 |

## Observações

**1. projects/host-app → projects/login-mfe-app.** A rota `login` chama `loadRemoteModule` com
`exposedModule: './LoginModule'` e `remoteEntry: 'http://localhost:4203/remoteEntry.js'`
(projects/host-app/src/app/app.routes.ts:33-40). O módulo corresponde à única exposição de
projects/login-mfe-app/webpack.config.js:10-11, que aponta para as rotas do formulário de login
(projects/login-mfe-app/src/app/login/login-form.routes.ts:4). A porta 4203 (angular.json:383)
só corrobora. O remote estático do host (projects/host-app/webpack.config.js:24) usa a chave
`loginMfeApp`, que não bate com o `name` do remote (projects/login-mfe-app/webpack.config.js:7);
como a carga é por URL, a diferença não muda a relação, e a declaração entra na Configuração só
por ligar as duas unidades. As três relações de federação compartilham o primeiro `Código`
(o import de app.routes.ts:3), por isso a ordem entre elas segue o Destino em ordem alfabética.
A linha manual da tabela `routes` (app.routes.ts:7) entra nas relações 1 a 3.

**2. projects/host-app → projects/mfe1.** A rota `contacts` carrega `./ContactsModule` de
`http://localhost:4201/remoteEntry.js` (projects/host-app/src/app/app.routes.ts:14-21), protegida
pelo `AuthGuard` (:15). O módulo corresponde à exposição de projects/mfe1/webpack.config.js:10-11,
e o remote estático `mfe1@` (projects/host-app/webpack.config.js:22) bate com o `name` de
projects/mfe1/webpack.config.js:7. A porta 4201 (angular.json:177) só corrobora.

**3. projects/host-app → projects/mfe2.** A rota `admin` carrega `./AdminModule` de
`http://localhost:4202/remoteEntry.js` (projects/host-app/src/app/app.routes.ts:23-31), também
protegida pelo `AuthGuard` (:25). O módulo corresponde à exposição de
projects/mfe2/webpack.config.js:10-11, e o remote estático `mfe2@`
(projects/host-app/webpack.config.js:23) bate com o `name` de projects/mfe2/webpack.config.js:7.
A porta 4202 (angular.json:278) só corrobora.

**4. projects/login-mfe-app → projects/host-app.** A troca é por estado compartilhado no
`localStorage`, não por eventos, por isso o mecanismo é `other`. O formulário de login grava
`isLoggedIn = 'true'` (projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63),
e o `AuthGuard` do host lê a mesma chave (projects/host-app/src/app/auth.guard.ts:11) para liberar
as rotas `contacts` e `admin` (projects/host-app/src/app/app.routes.ts:15, :25). Só
login-mfe-app grava a chave e só o host a lê; nenhum código a apaga, nem o logout
(projects/host-app/src/app/app.component.ts:71-74). Por isso a direção é `origem → destino`. A
chave só é a mesma quando o formulário roda dentro da página do host, numa única origem; isolado
na porta 4203 (angular.json:383), login-mfe-app tem `localStorage` próprio. Nenhuma declaração de
configuração liga as unidades por esse canal, e a Configuração fica `—`.

## Resumo

Relações: 4 (host → remote: 3, communication: 1). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
