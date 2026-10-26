---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
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

# 172 — Jyotisaini1234/moduleFederation

## Leitura do repositório

Exemplo mínimo de Module Federation com o `ModuleFederationPlugin` embutido no webpack 5 (mfe1/webpack.config.ts:11-12; mfe2/webpack.config.ts:6-7) e duas aplicações React em TypeScript. `mfe1` (“Product Listing”) é o host, com `name: 'app1'` e um único remote, `app2` (mfe1/webpack.config.ts:74-78). `mfe2` (“Cart Application”) é o remote: declara `name: 'app2'`, `filename: 'remoteEntry.js'` e expõe `./App` (mfe2/webpack.config.ts:37-40), um componente que só mostra um título (mfe2/src/App.tsx:3-14). O host carrega esse componente com `React.lazy(() => import("app2/App"))`, com um fallback de erro que pede para subir o app2 na porta 3002 (mfe1/src/App.tsx:3-12), e o renderiza dentro de `Suspense` logo abaixo do seu próprio título (mfe1/src/App.tsx:23-27). As duas unidades compartilham `react` e `react-dom` como singletons (mfe1/webpack.config.ts:79-88; mfe2/webpack.config.ts:41) e usam a fronteira assíncrona `import("./bootstrap")` (mfe1/src/index.tsx:3; mfe2/src/index.tsx:1).

O que não virou relação: uma versão alternativa do `App` do host, com import condicional para SSR, está toda comentada (mfe1/src/App.tsx:35-53). `mfe1` também traz um servidor SSR experimental que renderiza o mesmo `App` e injeta os bundles da própria `mfe1` por `<script src="/static/...">` (mfe1/src/server/server.ts:7, 54, 84); nenhum script do mfe1/package.json o executa (mfe1/package.json:8-9). A variável `window.app2Url` é gravada (mfe1/src/index.tsx:1; mfe1/src/server/server.ts:81) e tipada (mfe1/src/types/global.d.ts:17), mas o endereço do remote vem fixo do webpack (mfe1/webpack.config.ts:77). Não há comunicação entre as unidades além da renderização do componente.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | mfe1 | mfe2 | host → remote | origem → destino | module-federation | Yes | Yes | mfe1/webpack.config.ts:74-78 (`name: 'app1'`; remote `app2` em `app2@http://localhost:3002/remoteEntry.js`); mfe2/webpack.config.ts:37-40 (`name: 'app2'`, `filename: 'remoteEntry.js'`, expõe `./App`); mfe2/webpack.config.ts:17 (porta 3002) | mfe1/src/App.tsx:4; mfe1/src/App.tsx:26 |

## Observações

**1. mfe1 → mfe2.** O remote `app2` declarado pelo host (mfe1/webpack.config.ts:77) corresponde à unidade `mfe2` pelo `name: 'app2'` e pelo `filename: 'remoteEntry.js'` (mfe2/webpack.config.ts:38-39), e o módulo pedido, `app2/App` (mfe1/src/App.tsx:4), é o `./App` exposto em mfe2/webpack.config.ts:40; a porta 3002 (mfe2/webpack.config.ts:17) só corrobora. As duas linhas de código são `Yes` na revisão de código-fonte: o import remoto e a renderização de `<RemoteApp2 />` (mfe1/src/App.tsx:26), alcançados a partir de mfe1/src/index.tsx:3 → mfe1/src/bootstrap.tsx:15, 18. O tipo do módulo remoto é declarado à mão no host (mfe1/src/types/global.d.ts:9-13).

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
