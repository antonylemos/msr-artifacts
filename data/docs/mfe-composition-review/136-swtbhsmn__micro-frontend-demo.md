---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
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

# 136 — swtbhsmn/micro-frontend-demo

## Leitura do repositório

Demonstração mínima de Module Federation do webpack com duas aplicações React no mesmo repositório (README.txt:1-5): `app1` é o host e `app2` é o remote. As duas usam o `ModuleFederationPlugin` que vem no próprio webpack (app1/webpack.config.js:2; app2/webpack.config.js:2), e não um pacote separado; por isso a revisão de dependências não tem linha de tecnologia. O app2 se publica como `app2` com `remoteEntry.js` e expõe um único componente, `./RemoteApp` (app2/webpack.config.js:29-32). O app1 declara esse remote (app1/webpack.config.js:30-31), carrega o componente com `React.lazy` e o renderiza dentro de `Suspense` (app1/src/App.jsx:2, 8-10). As duas compartilham `react` e `react-dom` como singletons (app1/webpack.config.js:33; app2/webpack.config.js:34).

O repositório é só um exemplo de uso: o componente remoto é um `div` com uma frase (app2/src/RemoteApp.jsx:3-5), não há props nem troca de dados entre as unidades, e as duas configurações estão em modo development, com servidores locais nas portas 3001 e 3002 (app1/webpack.config.js:7-9; app2/webpack.config.js:7-9). O app2 também roda sozinho, renderizando o mesmo componente na sua própria página (app2/src/bootstrap.js:3-6); esse modo isolado não é relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | app1 | app2 | host → remote | origem → destino | module-federation | Yes | Yes | app1/webpack.config.js:30-31 (remote `app2` em `http://localhost:3002/remoteEntry.js`); app2/webpack.config.js:29-32 (`name: "app2"`, `filename: "remoteEntry.js"`, expõe `./RemoteApp`); app2/webpack.config.js:9 (porta 3002) | app1/src/App.jsx:2; app1/src/App.jsx:9 |

## Observações

**1. app1 → app2.** O remote `app2@…/remoteEntry.js` declarado pelo host (app1/webpack.config.js:31) corresponde à unidade app2 pelo `name: "app2"` e pelo `filename: "remoteEntry.js"` (app2/webpack.config.js:29-30); a porta 3002 (app2/webpack.config.js:9) só corrobora. O módulo importado, `app2/RemoteApp` (app1/src/App.jsx:2), é o `./RemoteApp` exposto em app2/webpack.config.js:31-32. A relação é ativa porque o componente é renderizado no `App` do host (app1/src/App.jsx:9), e esse `App` é montado na entrada (app1/src/index.js:1 → app1/src/bootstrap.js:3, 6).

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
