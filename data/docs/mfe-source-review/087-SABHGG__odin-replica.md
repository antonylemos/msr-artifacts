---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 087 — SABHGG/odin-replica

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-mount-export | src/root.app.js:16 | . | runtime-composition | No | Exporta o lifecycle `bootstrap` dos lifecycles React criados em src/root.app.js:6-14; o único consumidor é o registro da própria unidade em src/index.js:56-60 (`async () => RootApp`, importado em src/index.js:4), no mesmo bundle CRA; interno à unidade `.`. |
| src-mount-export | src/root.app.js:17 | . | runtime-composition | No | Exporta o lifecycle `mount` do mesmo objeto de src/root.app.js:6-14, consumido pelo registro local de src/index.js:56-60; nenhuma outra unidade o consome (não há exposição de build; package.json:18-22 só tem os scripts do `react-scripts`). |
| src-mount-export | src/root.app.js:18 | . | runtime-composition | No | Exporta o lifecycle `unmount` do mesmo objeto de src/root.app.js:6-14, com o mesmo consumidor interno de src/index.js:56-60. |
| src-lifecycles | src/index.js:56 | . | runtime-composition | No | `registerApplication('odin-react', async () => RootApp, () => true)` (src/index.js:56-60) registra a própria unidade `.`: o objeto de lifecycles vem do import estático de src/index.js:4 e monta em `#root` (src/root.app.js:13, public/index.html:31); registro interno, sem outra unidade envolvida. |
| src-lifecycles | src/index.js:63 | . | runtime-composition | Yes | `registerApplication('leadocs-angular', ...)` (src/index.js:63-100) registra a unidade externa `leadocs-angular`: loader de script (src/index.js:65-94), função de atividade `() => isLeadocsActive` (src/index.js:96) e `domElementGetter` para `#microfrontend-container` (src/index.js:98), nó criado pelo host em src/App.js:57. |
| src-lifecycles | src/root.app.js:3 | . | runtime-composition | No | Importa `singleSpaReact`, usado em src/root.app.js:6 para criar os lifecycles da própria unidade; o uso que habilita é `No`. |
| src-lifecycles | src/root.app.js:6 | . | runtime-composition | No | `singleSpaReact({ React, ReactDOM, rootComponent: App, ... })` (src/root.app.js:6-14) adapta o App local a lifecycles single-spa; é a própria unidade `.` se adaptando ao orquestrador do mesmo bundle (src/index.js:4 e 56-60). |
| src-dynamic-script | src/index.js:72 | . | script-loading | Yes | Dentro do loader do remoto, cria o `<script>` com `src = LEAPDOCS_BUNDLE_URL` (src/index.js:73; URL em src/index.js:8-9, padrão `http://localhost:4200/main.js`) e o injeta em `document.head` (src/index.js:93), resolvendo com `globalThis.leapdocs` (src/index.js:78-80); carrega o bundle da unidade externa `leadocs-angular`, fora do snapshot. |
| src-cross-unit-communication | src/App.js:18 | . | none | No | `window.dispatchEvent(...)` (src/App.js:18-22), acionado pelos botões da barra lateral (src/App.js:29-38), dispara um evento que só a própria unidade `.` escuta (src/index.js:47); emissor e receptor estão na mesma unidade, logo é evento interno, não construção de composição. A montagem da unidade externa é feita pelo orquestrador, registrada em src/index.js:63. |
| src-cross-unit-communication | src/App.js:19 | . | none | No | `new CustomEvent('toggle-leapdocs', { detail: { isActive: sectionId === 'microfrontend' } })` (src/App.js:19-21) é o evento disparado em src/App.js:18, cujo único receptor é o listener da própria unidade `.` em src/index.js:47; evento interno, pelo mesmo motivo da linha de src/App.js:18. |
| src-cross-unit-communication | src/index.js:47 | . | none | No | `globalThis.addEventListener('toggle-leapdocs', ...)` (src/index.js:47-51) recebe o evento emitido pela própria unidade `.` em src/App.js:18-22, grava `isLeadocsActive` (src/index.js:48) e chama `triggerAppChange()` (src/index.js:50); é o lado receptor de um evento interno à unidade, e a montagem de `leadocs-angular` fica a cargo do registro de src/index.js:63. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | src/index.js:103 | . | runtime-composition | Yes | `start()` do single-spa (importado em src/index.js:3) inicia o orquestrador; sem ele nenhum dos registros de src/index.js:56-100 monta. É o que torna ativo o carregamento da unidade externa `leadocs-angular`. |

## Resumo

Construções com composição: 3 (runtime-composition: 2, script-loading: 1).

## Notas

- O snapshot tem uma só unidade (`.`, revisão estrutural 087). O root single-spa e a aplicação React local estão no mesmo bundle CRA (src/index.js:4 importa `./root.app` estaticamente), por isso os lifecycles de `src/root.app.js` e o registro `odin-react` de src/index.js:56-60 são internos à unidade e ficaram `No`, como em 007 para o `mount` do próprio container. A única outra unidade é o remoto externo `leadocs-angular`, que não está no snapshot.
- `triggerAppChange()` (src/index.js:50) e o `domElementGetter` de `#microfrontend-container` (src/index.js:98, nó criado em src/App.js:57) não viraram linha própria: são passos das linhas já registradas em src/index.js:47 e src/index.js:63, e estão nas observações delas.
- O par `toggle-leapdocs` tem emissor (src/App.js:18) e receptor (src/index.js:47) na mesma unidade `.`: é evento interno, anotado como `none` / `No`. A montagem da unidade externa é feita pelo orquestrador single-spa, registrada em src/index.js:63; a ativação posterior pelo evento não torna o evento uma interação entre unidades.
- `import('web-vitals')` em src/reportWebVitals.js:3 é carga dinâmica de um pacote npm dentro da própria unidade; não é construção de composição e não virou linha.
- A busca do passo 4 em `src/`, `public/`, `README.md` e `package.json` não encontrou `customElements`, `<iframe`, `postMessage`, `BroadcastChannel`, `loadRemote*`, `initFederation`, `registerRemotes` nem `System.import`.
