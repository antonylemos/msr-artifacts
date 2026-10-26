---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
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

# 060 — hscale/adx-core-k

## Leitura do repositório

Exemplo de plataforma ("ADX CORE") em que um shell React/Vite compõe seis micro frontends de domínio por Module Federation (`@originjs/vite-plugin-federation`). O shell (`name: 'shell'`) declara seis remotes, um por app, em `http://localhost:300N/assets/remoteEntry.js` (adx-core/apps/shell/vite.config.ts:10-18). Cada app de `adx-core/apps/` se declara como `<app>_app`, gera `remoteEntry.js` e expõe `./App` → `./src/App.tsx` (ex.: adx-core/apps/auth/vite.config.ts:9-12). O shell carrega os seis `./App` com `React.lazy(() => import('<app>_app/App'))` (adx-core/apps/shell/src/App.tsx:16-21) e monta cada um sob um prefixo de rota (`/auth/*`, `/tenant/*`, `/files/*`, `/users/*`, `/workflows/*`, `/modules/*`, adx-core/apps/shell/src/App.tsx:46-55). A composição é de um nível só: nenhum remote carrega outro, e o shell não expõe nada.

A configuração é mais completa que o código. Além de `./App`, os remotes expõem componentes de domínio, e vários desses arquivos não existem no snapshot (ex.: adx-core/apps/file/vite.config.ts:13-15, adx-core/apps/tenant/vite.config.ts:13, adx-core/apps/module/vite.config.ts:15-17); `file`, `user` e `workflow` têm só `src/App.tsx`. Nenhum desses componentes é consumido pelo shell, então eles não viram relação; só o `./App` de cada remote é carregado, e ele existe nos seis. Dos destinos, só `adx-core/apps/auth` é `Yes` na revisão estrutural; os outros cinco são `Undetermined` pela falta de `index.html` ou pelos exposes ausentes.

Cada `App.tsx` de remote monta a própria pilha de providers e o próprio `BrowserRouter` (ex.: adx-core/apps/auth/src/App.tsx:2,30-32; adx-core/apps/file/src/App.tsx:26-28), e o shell já envolve as rotas num `BrowserRouter` (adx-core/apps/shell/src/App.tsx:41). Ou seja, os remotes foram escritos para rodar sozinhos e são encaixados como estão; no react-router-dom 6 (`requiredVersion: '^6.8.1'`, adx-core/apps/shell/vite.config.ts:28-31) um router dentro de outro não é aceito em tempo de execução, o que limita a execução da composição, mas não muda a relação declarada e carregada. Também por isso cada remote tem seu próprio `EventBusProvider` (ex.: adx-core/apps/auth/src/App.tsx:31), separado do do shell (adx-core/apps/shell/src/App.tsx:40).

Não há relação `communication`. O shell declara `singleton` os pacotes `@adx-core/shared-context`, `@adx-core/event-bus` e `@adx-core/i18n` (adx-core/apps/shell/vite.config.ts:40-51); os seis remotes declaram `singleton` `@adx-core/shared-context` e `@adx-core/event-bus` (ex.: adx-core/apps/auth/vite.config.ts:24-25), mas não `@adx-core/i18n`, e acrescentam `@adx-core/bff-client`, que o shell não declara (ex.: adx-core/apps/auth/vite.config.ts:26). Mesmo com esses pacotes compartilhados, todas as construções de evento entre unidades da revisão de código-fonte são `No`: os arquivos que disparam ou escutam os eventos não são alcançados por nenhuma unidade. Os BFFs em `adx-core/bff-services/` e o backend Rust ficam fora da composição de frontend.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | adx-core/apps/shell | adx-core/apps/auth | host → remote | origem → destino | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:12 (remote `auth_app` em `http://localhost:3001/assets/remoteEntry.js`); adx-core/apps/auth/vite.config.ts:9-12 (`name: 'auth_app'`, `filename: 'remoteEntry.js'`, expõe `./App`); adx-core/apps/auth/vite.config.ts:35-36 (porta 3001) | adx-core/apps/shell/src/App.tsx:16; adx-core/apps/shell/src/App.tsx:46 |
| 2 | adx-core/apps/shell | adx-core/apps/tenant | host → remote | origem → destino | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:13 (remote `tenant_app` em `http://localhost:3002/assets/remoteEntry.js`); adx-core/apps/tenant/vite.config.ts:9-12 (`name: 'tenant_app'`, `filename: 'remoteEntry.js'`, expõe `./App`); adx-core/apps/tenant/vite.config.ts:34-35 (porta 3002) | adx-core/apps/shell/src/App.tsx:17; adx-core/apps/shell/src/App.tsx:46 |
| 3 | adx-core/apps/shell | adx-core/apps/file | host → remote | origem → destino | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:14 (remote `file_app` em `http://localhost:3003/assets/remoteEntry.js`); adx-core/apps/file/vite.config.ts:9-12 (`name: 'file_app'`, `filename: 'remoteEntry.js'`, expõe `./App`); adx-core/apps/file/vite.config.ts:28 (porta 3003) | adx-core/apps/shell/src/App.tsx:18; adx-core/apps/shell/src/App.tsx:46 |
| 4 | adx-core/apps/shell | adx-core/apps/user | host → remote | origem → destino | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:15 (remote `user_app` em `http://localhost:3004/assets/remoteEntry.js`); adx-core/apps/user/vite.config.ts:9-12 (`name: 'user_app'`, `filename: 'remoteEntry.js'`, expõe `./App`); adx-core/apps/user/vite.config.ts:28 (porta 3004) | adx-core/apps/shell/src/App.tsx:19; adx-core/apps/shell/src/App.tsx:46 |
| 5 | adx-core/apps/shell | adx-core/apps/workflow | host → remote | origem → destino | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:16 (remote `workflow_app` em `http://localhost:3005/assets/remoteEntry.js`); adx-core/apps/workflow/vite.config.ts:9-12 (`name: 'workflow_app'`, `filename: 'remoteEntry.js'`, expõe `./App`); adx-core/apps/workflow/vite.config.ts:28 (porta 3005) | adx-core/apps/shell/src/App.tsx:20; adx-core/apps/shell/src/App.tsx:46 |
| 6 | adx-core/apps/shell | adx-core/apps/module | host → remote | origem → destino | module-federation | Yes | Yes | adx-core/apps/shell/vite.config.ts:17 (remote `module_app` em `http://localhost:3006/assets/remoteEntry.js`); adx-core/apps/module/vite.config.ts:9-12 (`name: 'module_app'`, `filename: 'remoteEntry.js'`, expõe `./App`); adx-core/apps/module/vite.config.ts:35-36 (porta 3006) | adx-core/apps/shell/src/App.tsx:21; adx-core/apps/shell/src/App.tsx:46 |

## Observações

**1. adx-core/apps/shell → adx-core/apps/auth.** O remote `auth_app` do shell (adx-core/apps/shell/vite.config.ts:12) corresponde à unidade pelo `name: 'auth_app'` e pelo `remoteEntry.js` (adx-core/apps/auth/vite.config.ts:9-10); a porta 3001 só corrobora. O `./App` importado em adx-core/apps/shell/src/App.tsx:16 existe (adx-core/apps/auth/src/App.tsx:53, `export default App`) e é montado em `/auth/*` (adx-core/apps/shell/src/App.tsx:48). É o único par com destino `Yes` na revisão estrutural, e o único remote cujos exposes estão todos presentes (adx-core/apps/auth/src/components/), o que confirma a ressalva da classificação de que é este par que sustenta a composição.

**2. adx-core/apps/shell → adx-core/apps/tenant.** `tenant_app` (adx-core/apps/shell/vite.config.ts:13) corresponde a adx-core/apps/tenant/vite.config.ts:9-10. O `./App` carregado em adx-core/apps/shell/src/App.tsx:17 existe (adx-core/apps/tenant/src/App.tsx:51) e é montado em `/tenant/*` (adx-core/apps/shell/src/App.tsx:49). A unidade é `Undetermined` na revisão estrutural (sem `index.html`; o expose `./TenantSwitcher`, adx-core/apps/tenant/vite.config.ts:13, aponta para arquivo ausente); isso não afeta a correspondência nem o carregamento do `./App`.

**3. adx-core/apps/shell → adx-core/apps/file.** `file_app` (adx-core/apps/shell/vite.config.ts:14) corresponde a adx-core/apps/file/vite.config.ts:9-10. O `./App` (adx-core/apps/file/src/App.tsx:43) é carregado em adx-core/apps/shell/src/App.tsx:18 e montado em `/files/*` (adx-core/apps/shell/src/App.tsx:50). O diretório só tem `src/App.tsx`; os três outros exposes (adx-core/apps/file/vite.config.ts:13-15) não existem, e a unidade é `Undetermined` na revisão estrutural.

**4. adx-core/apps/shell → adx-core/apps/user.** `user_app` (adx-core/apps/shell/vite.config.ts:15) corresponde a adx-core/apps/user/vite.config.ts:9-10. O `./App` (adx-core/apps/user/src/App.tsx:43) é carregado em adx-core/apps/shell/src/App.tsx:19 e montado em `/users/*` (adx-core/apps/shell/src/App.tsx:51). Mesma situação de `file`: só `src/App.tsx`, exposes de componentes ausentes (adx-core/apps/user/vite.config.ts:13-15), unidade `Undetermined`.

**5. adx-core/apps/shell → adx-core/apps/workflow.** `workflow_app` (adx-core/apps/shell/vite.config.ts:16) corresponde a adx-core/apps/workflow/vite.config.ts:9-10. O `./App` (adx-core/apps/workflow/src/App.tsx:43) é carregado em adx-core/apps/shell/src/App.tsx:20 e montado em `/workflows/*` (adx-core/apps/shell/src/App.tsx:52). Só `src/App.tsx`, exposes ausentes (adx-core/apps/workflow/vite.config.ts:13-15), unidade `Undetermined`.

**6. adx-core/apps/shell → adx-core/apps/module.** `module_app` (adx-core/apps/shell/vite.config.ts:17) corresponde a adx-core/apps/module/vite.config.ts:9-10. O `./App` (adx-core/apps/module/src/App.tsx:54) é carregado em adx-core/apps/shell/src/App.tsx:21 e montado em `/modules/*` (adx-core/apps/shell/src/App.tsx:53). Diferente dos outros remotes incompletos, o próprio `./App` importa componentes ausentes (adx-core/apps/module/src/App.tsx:10-12, `ModuleInstaller`, `ModuleSettings`, `ModuleDeveloper`), então o módulo carregado pelo shell não se resolve inteiro no snapshot; a relação continua `Ativa = Yes` porque as linhas da revisão de código-fonte que a sustentam são `Yes`.

## Resumo

Relações: 6 (host → remote: 6). Ativas: 6. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
