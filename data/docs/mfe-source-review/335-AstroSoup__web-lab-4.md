---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 335 — AstroSoup/web-lab-4

## Construções da mineração

Nenhuma ocorrência src-* no matches.csv.

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | frontend/vite/host/src/pages/MainPage.vue:23 | frontend/vite/host | runtime-composition | Yes | `<InputsContainer />` renderiza no host o `InputsContainer` de frontend/vite/remote-inputs, importado de `remote_inputs/InputsContainer` (frontend/vite/host/src/pages/MainPage.vue:6, registrado em :11); o remote `remote_inputs` aponta para `https://localhost/remote-inputs/remoteEntry.js` (frontend/vite/host/vite.config.js:23-27) e expõe `./InputsContainer` (frontend/vite/remote-inputs/vite.config.js:16-18). `MainPage` é a rota `/app` (frontend/vite/host/src/main.js:14), exibida pelo `<router-view />` de frontend/vite/host/src/App.vue:5. |
| manual | frontend/vite/host/src/pages/MainPage.vue:24 | frontend/vite/host | runtime-composition | Yes | `<ResultsContainer />` renderiza no host o `ResultsContainer` de frontend/vite/remote-results, importado de `remote_results/ResultsContainer` (frontend/vite/host/src/pages/MainPage.vue:7, registrado em :11); remote em `https://localhost/remote-results/remoteEntry.js` (frontend/vite/host/vite.config.js:28-32), que expõe `./ResultsContainer` (frontend/vite/remote-results/vite.config.js:16-18). Mesma rota `/app` da linha anterior. |
| manual | frontend/vite/host/src/stores/HistoryStore.js:6 | frontend/vite/host | communication | Yes | `defineStore('history', ...)` define o estado de pontos e grupos compartilhado entre o host e os dois remotes: exposto pelo host como `./HistoryStore` (frontend/vite/host/vite.config.js:18), com `pinia` singleton no host (frontend/vite/host/vite.config.js:36) e nos remotes (frontend/vite/remote-inputs/vite.config.js:28; frontend/vite/remote-results/vite.config.js:28), que o importam de `host/HistoryStore` (remote `host` em `https://localhost/remoteEntry.js`, frontend/vite/remote-inputs/vite.config.js:20-24). remote-inputs escreve `x`, `y`, `r` e chama `addRecord` (frontend/vite/remote-inputs/src/InputsContainer.vue:5, :23, :27-29) e lê `history` no canvas (frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:3, :139-140); remote-results lê `history`/`reversedHistory` e escreve `chosenHitsIds` (frontend/vite/remote-results/src/elements/Table.vue:2, :8-13) e cria grupos (frontend/vite/remote-results/src/elements/GroupInput.vue:4, :17, :32); o host limpa o estado no logout (frontend/vite/host/src/common/Header.vue:20-22). |
| manual | frontend/vite/host/src/stores/ErrorStore.js:3 | frontend/vite/host | communication | Yes | `defineStore('error', ...)` (`errorMsg`, `errorTitle`, :4-7) é o canal pelo qual os remotes mandam mensagens de erro ao host: exposto como `./ErrorStore` (frontend/vite/host/vite.config.js:19), mesmo `pinia` singleton da linha anterior. remote-inputs grava a mensagem quando o envio falha (frontend/vite/remote-inputs/src/InputsContainer.vue:6, :30-31) e remote-results quando falta o nome do grupo (frontend/vite/remote-results/src/elements/GroupInput.vue:3, :23-24); o host lê o estado (frontend/vite/host/src/pages/MainPage.vue:13) e mostra o `PopupWindow` (:21). |
| manual | frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175 | frontend/vite/remote-inputs | runtime-composition | Yes | `<PopupWindow` renderiza no remote o componente `PopupWindow` do host, importado de `host/PopupWindow` (frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:2, registrado em :9) e exposto pelo host como `./PopupWindow` (frontend/vite/host/vite.config.js:20); a mensagem vem do estado local do componente (:23-24, :154-155). `GraphCanvas` é usado em `InputsContainer` (frontend/vite/remote-inputs/src/InputsContainer.vue:66), o módulo que o host monta. |

## Resumo

Construções com composição: 5 (runtime-composition: 3, communication: 2).

## Notas

- O `matches.csv` não tem linhas `src-*`: a composição é toda por imports estáticos de módulos federados (`remote_inputs/...`, `remote_results/...`, `host/...`) e tags Vue, que os padrões linha a linha não cobrem.
- A federação é bidirecional: o host consome os dois remotes e expõe stores e o `PopupWindow`, que os remotes consomem pelo remote `host` (frontend/vite/remote-inputs/vite.config.js:19-25; frontend/vite/remote-results/vite.config.js:19-25). Os imports de `host/...` nos remotes vão nas observações das linhas de store e do `PopupWindow`, não viram linhas próprias.
- A tabela de rotas do host (frontend/vite/host/src/main.js:11-16) não vira linha `host-relationship`: só nomeia páginas locais (`StartPage`, `MainPage`); os remotes entram dentro de `MainPage`.
- `AuthStore` também é exposto pelo host (frontend/vite/host/vite.config.js:17), mas nenhum arquivo dos remotes o importa (grep `Store\|host/` em `remote-*/src`); é usado indiretamente pelas ações de `HistoryStore` (frontend/vite/host/src/stores/HistoryStore.js:2, :31).
