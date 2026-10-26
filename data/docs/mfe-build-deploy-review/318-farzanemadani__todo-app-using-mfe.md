---
schema: 1
id: 1205888629
full_name: farzanemadani/todo-app-using-mfe
commit: 21fc4773aa4d577351ce2000de48b52a73db8378
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

# 318 — farzanemadani/todo-app-using-mfe

## Leitura do repositório

Três projetos webpack 5 lado a lado, sem `package.json` na raiz e sem workspace: cada um instala
as próprias dependências e tem os mesmos dois scripts, `start` com `webpack serve --config
webpack.dev.js` e `build` com `webpack --config webpack.prod.js` (host-app/package.json:7-8;
todoForm-app/package.json:7-8; todoList-app/package.json:8-9). Não há script que dispare os três
builds juntos. Cada `webpack.prod.js` está em modo `production` e grava `bundle.js` no `build/`
do próprio projeto (host-app/webpack.prod.js:12-16; todoForm-app/webpack.prod.js:10-14;
todoList-app/webpack.prod.js:9-13), com um `index.html` gerado do `public/index.html` local e um
`remoteEntry.js` do ModuleFederationPlugin (host-app/webpack.prod.js:45-51;
todoForm-app/webpack.prod.js:44-50; todoList-app/webpack.prod.js:43-49). O `build/` está no
`.gitignore` (.gitignore:2), e nenhum artefato gerado está no snapshot.

Nada no snapshot publica as aplicações: não há Dockerfile, compose, workflow de CI, manifesto de
deploy nem configuração de hospedagem, e o `matches.csv` não tem ocorrência `ops-*`, `ci-*` nem
`cfg-public-path`. O que existe é configuração de desenvolvimento: os `devServer` nas portas 3000,
3001 e 3002 (host-app/webpack.dev.js:13-16; todoForm-app/webpack.dev.js:15-18;
todoList-app/webpack.dev.js:14-17), que nos `webpack.prod.js` estão comentados
(host-app/webpack.prod.js:17-20; todoForm-app/webpack.prod.js:15-18;
todoList-app/webpack.prod.js:14-17). Mesmo a configuração de produção do host aponta os remotes
para `http://localhost:3001` e `http://localhost:3002` (host-app/webpack.prod.js:7-8, usados em
:53-54), e o próprio README reconhece que o deploy exigiria trocar essas URLs (README.md:128).
O README descreve o build de cada aplicação em separado (README.md:97-105), o que confere com os
scripts, mas não decide a coluna Deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | host-app | separado | não observado | `http://localhost:3000` em desenvolvimento (host-app/webpack.dev.js:14) | No | host-app/package.json:8 (`webpack --config webpack.prod.js`); host-app/webpack.prod.js:11-16 (entrada e saída `build/bundle.js` próprias); host-app/webpack.prod.js:49-55 (ModuleFederationPlugin `host_app` com os dois remotes) |
| 2 | todoForm-app | separado | não observado | `http://localhost:3001` em desenvolvimento (todoForm-app/webpack.dev.js:16); `http://localhost:3001/remoteEntry.js` na configuração de produção do host (host-app/webpack.prod.js:7, 53) | No | todoForm-app/package.json:8 (`webpack --config webpack.prod.js`); todoForm-app/webpack.prod.js:9-14 (entrada e saída `build/bundle.js` próprias); todoForm-app/webpack.prod.js:48-53 (`remoteEntry.js` que expõe `./TodoForm`) |
| 3 | todoList-app | separado | não observado | `http://localhost:3002` em desenvolvimento (todoList-app/webpack.dev.js:15); `http://localhost:3002/remoteEntry.js` na configuração de produção do host (host-app/webpack.prod.js:8, 54) | No | todoList-app/package.json:9 (`webpack --config webpack.prod.js`); todoList-app/webpack.prod.js:8-13 (entrada e saída `build/bundle.js` próprias); todoList-app/webpack.prod.js:47-52 (`remoteEntry.js` que expõe `./todoList`) |

## Observações

**1. host-app.** Build separado: o projeto tem `package.json` e `webpack.prod.js` próprios, que
geram `build/bundle.js` a partir de `./src/bootstrap.js` (host-app/webpack.prod.js:11-14). O código
dos remotes não entra nesse bundle; é carregado em tempo de execução pelas URLs dos remotes
(host-app/webpack.prod.js:52-55). Deploy não observado: só o servidor de desenvolvimento, na porta
3000 com `historyApiFallback` (host-app/webpack.dev.js:13-16), serve a aplicação. Sem
versionamento: o `version` `1.0.0` (host-app/package.json:3) não é usado em nenhuma publicação.

**2. todoForm-app.** Build separado: `webpack.prod.js` próprio, com saída em `build/` do projeto
(todoForm-app/webpack.prod.js:9-14) e o `remoteEntry.js` com o nome `todoForm_app`
(todoForm-app/webpack.prod.js:48-53). Deploy não observado: o endereço que o host espera em
produção ainda é `localhost:3001` (host-app/webpack.prod.js:7), a mesma porta do `devServer` do
remote (todoForm-app/webpack.dev.js:16); nada no snapshot serve o `build/` nesse endereço. Sem
versionamento: `version` `1.0.0` sem uso (todoForm-app/package.json:3).

**3. todoList-app.** Mesma forma do formulário: `webpack.prod.js` próprio com saída em `build/`
(todoList-app/webpack.prod.js:8-13) e `remoteEntry.js` com o nome `todoList_app`
(todoList-app/webpack.prod.js:47-52). O `name` do `package.json` é `todolist-app`, em minúsculas
(todoList-app/package.json:2), diferente do diretório, sem efeito no build. Deploy não observado:
o host espera o remote em `localhost:3002` (host-app/webpack.prod.js:8), a porta do `devServer`
(todoList-app/webpack.dev.js:15). Sem versionamento: `version` `1.0.0` sem uso
(todoList-app/package.json:3).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
