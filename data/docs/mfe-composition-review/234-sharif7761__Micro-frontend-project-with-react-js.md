---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
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

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Leitura do repositório

Demonstração mínima de Module Federation (README.md:3) com três aplicações React/Rsbuild, todas com `@module-federation/rsbuild-plugin`. `core_simple` é o shell (README.md:10; porta 3000 em core_simple/rsbuild.config.ts:31-33) e declara dois remotes, `common_simple` e `users_simple` (core_simple/rsbuild.config.ts:11-14). `users_simple` expõe sua aplicação inteira como `./UserList` (users_simple/rsbuild.config.ts:11-13) e consome, ele próprio, o remote `common_simple` (users_simple/rsbuild.config.ts:14-16). `common_simple` é uma biblioteca de componentes federada, que expõe `./Button` e `./Card` (common_simple/rsbuild.config.ts:11-14) e não consome ninguém. O resultado são três relações `host → remote`, sendo uma delas entre duas unidades que não são o shell: `users_simple`, quando montado no shell, traz consigo os componentes de `common_simple`.

O shell carrega `UserList` por `lazy(() => import('users_simple/UserList'))` (core_simple/src/App.tsx:9) e o coloca na rota `/users` (core_simple/src/App.tsx:57-60); a página inicial usa `Card` remoto (core_simple/src/App.tsx:15, :24). Os componentes de `common_simple` entram por import estático (core_simple/src/App.tsx:4-6; users_simple/src/App.tsx:3-5), resolvido pelo runtime de federação depois do bootstrap assíncrono (`import('./bootstrap')` em core_simple/src/index.tsx:1 e users_simple/src/index.tsx:1). O shell importa `common_simple/Button` (core_simple/src/App.tsx:4) mas não renderiza `<Button>`, embora o README liste esse consumo (README.md:45-48); o import não acrescenta relação, porque o par core_simple → common_simple já existe pelo `Card`. Cada unidade também roda sozinha, com bootstrap próprio (core_simple/src/bootstrap.tsx:5-10; users_simple/src/bootstrap.tsx:5-10), e não há comunicação entre unidades: o shell não passa props a `UserList` (core_simple/src/App.tsx:59), e os dados de usuários vêm da JSONPlaceholder (users_simple/src/App.tsx:25). Todos os remotes apontam para `localhost`, sem configuração de deploy no snapshot.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | core_simple | users_simple | host → remote | origem → destino | module-federation | Yes | Yes | core_simple/rsbuild.config.ts:13 (remote `users_simple@http://localhost:3002/remoteEntry.js`); users_simple/rsbuild.config.ts:9-13 (`name: 'users_simple'`, `filename: 'remoteEntry.js'`, expõe `./UserList` → `./src/App.tsx`); users_simple/rsbuild.config.ts:33-35 (porta 3002) | core_simple/src/App.tsx:9; core_simple/src/App.tsx:57 |
| 2 | core_simple | common_simple | host → remote | origem → destino | module-federation | Yes | Yes | core_simple/rsbuild.config.ts:12 (remote `common_simple@http://localhost:3001/remoteEntry.js`); common_simple/rsbuild.config.ts:9-14 (`name: 'common_simple'`, `filename: 'remoteEntry.js'`, expõe `./Button` e `./Card`); common_simple/rsbuild.config.ts:28-30 (porta 3001) | core_simple/src/App.tsx:15; core_simple/src/App.tsx:24 |
| 3 | users_simple | common_simple | host → remote | origem → destino | module-federation | Yes | Yes | users_simple/rsbuild.config.ts:14-16 (remote `common_simple@http://localhost:3001/remoteEntry.js`); common_simple/rsbuild.config.ts:9-14 (`name: 'common_simple'`, `filename: 'remoteEntry.js'`, expõe `./Button` e `./Card`); common_simple/rsbuild.config.ts:28-30 (porta 3001) | users_simple/src/App.tsx:40; users_simple/src/App.tsx:49 |

## Observações

**1. core_simple → users_simple.** O remote `users_simple` do shell (core_simple/rsbuild.config.ts:13) corresponde à unidade users_simple pelo `name` e pelo `filename: 'remoteEntry.js'` (users_simple/rsbuild.config.ts:9-10); a porta 3002 (users_simple/rsbuild.config.ts:33-35) só corrobora. O módulo pedido, `users_simple/UserList` (core_simple/src/App.tsx:9), é o `./UserList` exposto, que é o `App` inteiro de users_simple (users_simple/rsbuild.config.ts:12). A relação é ativa: o import é feito por `lazy` e o componente é renderizado na rota `/users`, dentro de `Suspense` (core_simple/src/App.tsx:56-61), com link de navegação em core_simple/src/App.tsx:50. A linha core_simple/src/App.tsx:57 (`Routes`) entra aqui porque é onde o shell decide em que rota a unidade remota aparece.

**2. core_simple → common_simple.** O remote `common_simple` (core_simple/rsbuild.config.ts:12) corresponde à unidade common_simple pelo `name` e pelo `filename` (common_simple/rsbuild.config.ts:9-10). O shell renderiza duas vezes o `Card` remoto na página `Home` (core_simple/src/App.tsx:15, :24), que é o element da rota `/` (core_simple/src/App.tsx:58), a partir do import estático de core_simple/src/App.tsx:6. O `Button` também é importado (core_simple/src/App.tsx:4), mas não é usado no arquivo, por isso não aparece na coluna Código.

**3. users_simple → common_simple.** users_simple declara o mesmo remote `common_simple` (users_simple/rsbuild.config.ts:14-16), resolvido na unidade common_simple como na relação 2. Ele renderiza `<Button>` para recarregar a lista (users_simple/src/App.tsx:40-42) e um `<Card>` por usuário (users_simple/src/App.tsx:48-53), a partir dos imports de users_simple/src/App.tsx:3-5. A relação vale quando users_simple roda sozinho (users_simple/src/bootstrap.tsx:5-10) e também quando é montado no shell pela relação 1, já que o `App` exposto é o mesmo componente; nesse caso o shell recebe `Button` e `Card` através de users_simple, além do `Card` que usa diretamente.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
