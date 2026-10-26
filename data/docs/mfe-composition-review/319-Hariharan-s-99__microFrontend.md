---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
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

# 319 — Hariharan-s-99/microFrontend

## Leitura do repositório

Exemplo de estudo de Module Federation com Rspack (`@module-federation/enhanced`): três aplicações React, em que `container` é o host e `home` e `settings` são remotes. O container declara os dois remotes por URL fixa em `localhost` (container/module-federation.config.ts:3-6), e cada remote expõe `./app`, que aponta para o próprio `src/bootstrap.tsx` (home/module-federation.config.ts:4-5, settings/module-federation.config.ts:4-5). O módulo exposto não é um componente: é uma função `mount(element)` que faz `ReactDOM.render` da UI do remote no elemento recebido (home/src/bootstrap.tsx:6-10, settings/src/bootstrap.tsx:6-10). No host, os wrappers `Home` e `Settings` importam esse `mount` e o chamam num `useEffect` sobre um `div` próprio (container/src/Home.tsx:1-13, container/src/Settings.tsx:1-12). Os dois remotes não declaram `shared` (`shared: []` nas três configurações), e o container renderiza com `createRoot` (container/src/App.tsx:24-27) enquanto os remotes usam `ReactDOM.render` com sua própria cópia do React.

Os wrappers entram no host de duas formas: pelas rotas `/mf1` e `/mf2` do `Switch` (container/src/App.tsx:17-20) e pelo `TabBar`, que também renderiza `<Home />` ou `<Settings />` conforme a aba ativa (container/src/App.tsx:60-64). Como o `TabBar` empurra `/mf1/home` na montagem (container/src/App.tsx:33-36), o remote da aba aparece duas vezes na tela, uma pela aba e outra pela rota. Cada remote tem seu próprio `MemoryRouter` (home/src/App.tsx:48, settings/src/App.tsx:47), então a navegação interna não se sincroniza com o `BrowserRouter` do host. O segundo argumento `{}` passado a `mount` é ignorado pelos remotes, e não há `unmount` nem troca de mensagens entre as unidades; em home/src/bootstrap.tsx:7, a prop `history` passada a `App` é o `history` global do navegador, porque `createMemoryHistory` é importado (home/src/bootstrap.tsx:2) mas não chamado.

Fora da composição fica `advancedWebpack/`, um app React + webpack independente, de experimentos de configuração, sem federação e sem construção de composição (revisão de código-fonte, Notas). Por isso aparece em "Unidades sem relação". A diferença com `frontend_units: 3` da classificação já está registrada na revisão estrutural.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | home | host → remote | origem → destino | module-federation | Yes | Yes | container/module-federation.config.ts:5 (remote `home` em `http://localhost:8081/remoteEntry.js`); container/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)`); home/module-federation.config.ts:2-5 (`name: "home"`, `filename: "remoteEntry.js"`, expõe `./app`); home/rspack.config.ts:33 (`publicPath: "http://localhost:8081/"`); home/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)`) | home/src/bootstrap.tsx:12; container/src/Home.tsx:8; container/src/Home.tsx:1; container/src/App.tsx:17 |
| 2 | container | settings | host → remote | origem → destino | module-federation | Yes | Yes | container/module-federation.config.ts:4 (remote `settings` em `http://localhost:8082/remoteEntry.js`); container/rspack.config.ts:94 (`new ModuleFederationPlugin(mfConfig)`); settings/module-federation.config.ts:2-5 (`name: "settings"`, `filename: "remoteEntry.js"`, expõe `./app`); settings/rspack.config.ts:32 (`publicPath: "http://localhost:8082/"`); settings/rspack.config.ts:93 (`new ModuleFederationPlugin(mfConfig)`) | settings/src/bootstrap.tsx:12; container/src/Settings.tsx:7; container/src/Settings.tsx:1; container/src/App.tsx:17 |

## Observações

**1. container → home.** O remote `home@http://localhost:8081/remoteEntry.js` (container/module-federation.config.ts:5) corresponde à unidade home pelo `name: "home"` e pelo `filename: "remoteEntry.js"` (home/module-federation.config.ts:2-3) e pelo `publicPath` `http://localhost:8081/` (home/rspack.config.ts:33); a porta 8081 (home/rspack.config.ts:25) só corrobora. O specifier `home/app` importado em container/src/Home.tsx:1 casa com o `exposes` `./app` (home/module-federation.config.ts:5). É ativa: a entrada container/src/index.ts:1 carrega `App`, que renderiza o wrapper pela rota `/mf1` (container/src/App.tsx:18) e pela aba padrão (container/src/App.tsx:62), e o wrapper chama `mount` (container/src/Home.tsx:8). O `export { mount }` do remote (home/src/bootstrap.tsx:12) entra nesta relação como o lado exposto.

**2. container → settings.** Mesma forma da relação 1: `settings@http://localhost:8082/remoteEntry.js` (container/module-federation.config.ts:4) corresponde a settings pelo `name` e `filename` (settings/module-federation.config.ts:2-3) e pelo `publicPath` `http://localhost:8082/` (settings/rspack.config.ts:32), e `settings/app` (container/src/Settings.tsx:1) casa com o `exposes` `./app` (settings/module-federation.config.ts:5). É ativa pela rota `/mf2` (container/src/App.tsx:19) e pela aba Settings (container/src/App.tsx:63), com a chamada de `mount` em container/src/Settings.tsx:7. A linha manual container/src/App.tsx:17 (o `Switch` com as duas rotas) sustenta as relações 1 e 2.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: advancedWebpack.
