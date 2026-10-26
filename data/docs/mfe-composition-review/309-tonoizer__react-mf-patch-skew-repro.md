---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
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

# 309 — tonoizer/react-mf-patch-skew-repro

## Leitura do repositório

Reprodução mínima de um defeito do `@module-federation/vite` 1.21.6 (README.md:1-5): quatro aplicações React/Vite num workspace pnpm, unidas por Module Federation em cadeia. `host` é o host de topo e declara dois remotes, `remote_a` e `remote_b` (host/vite.config.js:19-36). `remote_a` tem papel duplo: expõe `./App` ao host e é host aninhado de `remote_c` (remote_a/vite.config.js:19-35). `remote_b` e `remote_c` só expõem `./App` (remote_b/vite.config.js:19-28; remote_c/vite.config.js:19-28). Todos os remotos entram da mesma forma: um `lazy(() => import('<remote>/App'))` (host/src/App.jsx:3-4; remote_a/src/App.jsx:3) renderizado dentro de `Suspense` (host/src/App.jsx:74-78, 86-90; remote_a/src/App.jsx:11-13). O módulo exposto por `remote_a` é o mesmo `App` que monta `remote_c`, então carregar `remote_a` no host traz `remote_c` junto.

O propósito não é um produto: os apps fixam patches diferentes de React 19.2.x, sendo que host e remote_c fixam o mesmo 19.2.8 (host/package.json:11-12, 19.2.8; remote_a/package.json:11-12, 19.2.4; remote_b/package.json:11-12, 19.2.6; remote_c/package.json:11-12, 19.2.8) e todos compartilham a família React como singleton com `requiredVersion: '^19.2.4'` e `shareStrategy: 'version-first'` (host/vite.config.js:5-11, 33-34), para provocar a falha. O resultado versionado registra que, na carga natural, o host fica em branco com `Cannot read properties of null (reading 'useState')` e nunca chega a montar os remotos (evidence/RESULT.json:12-13). A composição está completa na configuração e no código; a falha é o objeto do experimento e não altera as relações abaixo.

Não viraram relação: o `ShareDump` do host, que só lê globais do runtime de federação (`__mf_module_cache__`, `__FEDERATION__`) e publica `__SKEW_DUMP__` para o Playwright (host/src/App.jsx:6-57); o `onError` passado ao `ErrorBoundary`, que é callback interno do host (host/src/App.jsx:74, 108); e `__SKEW_CRASHES__` (host/src/App.jsx:109-114). Nenhum deles troca mensagens com outra unidade. `scripts/capture.mjs` é o roteiro Playwright, não unidade. Não há canal de comunicação entre unidades.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host | remote_a | host → remote | origem → destino | module-federation | Yes | Yes | host/vite.config.js:22-26 (remote `remote_a` em `http://localhost:5001/remoteEntry.js`); remote_a/vite.config.js:20-24 (`name: 'remote_a'`, `filename: 'remoteEntry.js'`, expõe `./App`); remote_a/vite.config.js:16 (`base: 'http://localhost:5001/'`) | host/src/App.jsx:3; host/src/App.jsx:76 |
| 2 | host | remote_b | host → remote | origem → destino | module-federation | Yes | Yes | host/vite.config.js:27-31 (remote `remote_b` em `http://localhost:5002/remoteEntry.js`); remote_b/vite.config.js:20-24 (`name: 'remote_b'`, `filename: 'remoteEntry.js'`, expõe `./App`); remote_b/vite.config.js:16 (`base: 'http://localhost:5002/'`) | host/src/App.jsx:4; host/src/App.jsx:88 |
| 3 | remote_a | remote_c | host → remote | origem → destino | module-federation | Yes | Yes | remote_a/vite.config.js:26-30 (remote `remote_c` em `http://localhost:5003/remoteEntry.js`); remote_c/vite.config.js:20-24 (`name: 'remote_c'`, `filename: 'remoteEntry.js'`, expõe `./App`); remote_c/vite.config.js:16 (`base: 'http://localhost:5003/'`) | remote_a/src/App.jsx:3; remote_a/src/App.jsx:12 |

## Observações

**1. host → remote_a.** O remote declarado pelo host tem `name: 'remote_a'` e entrada `remoteEntry.js` em `localhost:5001` (host/vite.config.js:22-26), o que corresponde ao `name`, ao `filename` e ao `base` da unidade remote_a (remote_a/vite.config.js:16, 20-21); a porta 5001 (remote_a/vite.config.js:14-15) só corrobora. O host importa `remote_a/App`, que é o `./App` exposto (remote_a/vite.config.js:22-24), e o renderiza em host/src/App.jsx:76. A cadeia de entrada é host/index.html:9 → host/src/main.jsx:3,7 → host/src/App.jsx, por isso a relação é ativa, ainda que a evidência versionada registre que o host quebra antes de montar o remoto (evidence/RESULT.json:13). O componente exposto é o mesmo que monta remote_c (relação 3).

**2. host → remote_b.** Mesmo arranjo da relação 1: `name: 'remote_b'` e `http://localhost:5002/remoteEntry.js` (host/vite.config.js:27-31) correspondem ao `name`, `filename` e `base` de remote_b (remote_b/vite.config.js:16, 20-21). O `import('remote_b/App')` (host/src/App.jsx:4) é renderizado em host/src/App.jsx:88, dentro do mesmo `App` ativo. remote_b é só remoto, sem `remotes` próprios.

**3. remote_a → remote_c.** remote_a é host aninhado: declara `remote_c` em `http://localhost:5003/remoteEntry.js` (remote_a/vite.config.js:26-30), que corresponde ao `name`, `filename` e `base` de remote_c (remote_c/vite.config.js:16, 20-21). O `import('remote_c/App')` (remote_a/src/App.jsx:3) é renderizado em remote_a/src/App.jsx:12. O arquivo é ao mesmo tempo a entrada standalone de remote_a (remote_a/src/main.jsx:3,5) e o módulo exposto ao host (remote_a/vite.config.js:23), então a relação ocorre nos dois contextos. Segundo a evidência, na carga natural os módulos compartilhados de remote_c participam da quebra do host (evidence/RESULT.json:15).

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
