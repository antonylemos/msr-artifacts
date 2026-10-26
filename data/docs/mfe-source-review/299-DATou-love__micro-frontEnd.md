---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-mount-export | sub-vue2/src/main.js:32 | sub-vue2 | runtime-composition | Yes | Lifecycle `bootstrap` do qiankun (sub-vue2/src/main.js:32-34), exportado pela entrada da unidade e consumido pelo host main-vue3, que registra `sub-vue2` com `entry: '//localhost:8081'` em main-vue3/src/main.ts:11-16 (porta do dev server em sub-vue2/vue.config.js:6; bundle `umd` em sub-vue2/vue.config.js:15-16). |
| src-mount-export | sub-vue2/src/main.js:36 | sub-vue2 | runtime-composition | Yes | Lifecycle `mount(props)` (sub-vue2/src/main.js:36-39) chama `render(props)`, que monta o app no container recebido do host qiankun; unidade registrada pelo host em main-vue3/src/main.ts:11-16. |
| src-mount-export | sub-vue2/src/main.js:41 | sub-vue2 | runtime-composition | Yes | Lifecycle `unmount` (sub-vue2/src/main.js:41-46) destrói a instância Vue e limpa o elemento quando o host desativa a rota `/sub-vue2` (main-vue3/src/main.ts:15). |
| src-mount-call | sub-vue2/src/main.js:16 | sub-vue2 | runtime-composition | Yes | `$mount(container ? container.querySelector('#app') : '#app')` dentro de `render` (sub-vue2/src/main.js:10-17): chamado pelo lifecycle `mount(props)` (sub-vue2/src/main.js:38), monta o app no container entregue pelo host main-vue3 (`container: '#subapp-viewport'` em main-vue3/src/main.ts:14; nó em main-vue3/src/App.vue:11). Fora do qiankun, a mesma linha monta o app isolado em `#app` (sub-vue2/src/main.js:27-29). |
| src-lifecycles | main-vue3/src/main.ts:3 | main-vue3 | runtime-composition | Yes | Importa `registerMicroApps` e `start` do qiankun, usados em main-vue3/src/main.ts:10-23 e main-vue3/src/main.ts:26-36; main.ts é a entrada do host (main-vue3/index.html:11). |
| src-lifecycles | main-vue3/src/main.ts:10 | main-vue3 | runtime-composition | Yes | `registerMicroApps([...])` (main-vue3/src/main.ts:10-23) registra `sub-vue2` (`entry: '//localhost:8081'`, `activeRule: '/sub-vue2'`) e `sub-react16` (`entry: '//localhost:3000'`, `activeRule: '/sub-react16'`), ambos no container `#subapp-viewport` (main-vue3/src/App.vue:11); `sub-react16` não tem código no snapshot. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | main-vue3/src/main.ts:26 | main-vue3 | runtime-composition | Yes | `start({ sandbox: { strictStyleIsolation: true } })` (main-vue3/src/main.ts:26-36) inicia o qiankun após o registro de main-vue3/src/main.ts:10-23; a chamada fica no nível do módulo de entrada (main-vue3/index.html:11). |

## Resumo

Construções com composição: 7 (runtime-composition: 7).

## Notas

- `sub-react16`, registrada em main-vue3/src/main.ts:17-22 e linkada em main-vue3/src/App.vue:7, é unidade alvo fora do snapshot (só a URL `//localhost:3000`).
- Não há mecanismo de comunicação entre unidades: a busca do passo 4 (incluindo `initGlobalState`, `postMessage`, `CustomEvent`, `addEventListener`, `localStorage`, `<iframe`, `customElements`, `import(`) só encontrou main-vue3/src/main.ts:3, :10 e :26. As `props` recebidas em `mount(props)` (sub-vue2/src/main.js:36) só levam o `container`.
- O `matches.csv` não tem `cfg-route-rewrites`, então a regra do `rewrites()` do host não se aplica a este repositório.
