---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | shell/src/App.js:5 | shell | dynamic-loading | Yes | Solicita headerMf/Header em shell/src/App.js:3-9; Header é renderizado em shell/src/App.js:24-26 e App está ligado à entrada em shell/src/bootstrap.js:3-6. |
| src-remote-import | shell/src/App.js:13 | shell | dynamic-loading | Yes | Solicita productsMf/Products em shell/src/App.js:11-17; Products é renderizado em shell/src/App.js:32-34 e App está ligado à entrada em shell/src/bootstrap.js:3-6. |
| src-async-bootstrap | header-mf/src/index.js:1 | header-mf | dynamic-loading | No | header-mf/src/index.js:1 carrega o bootstrap da própria unidade. |
| src-async-bootstrap | products-mf/src/index.js:1 | products-mf | dynamic-loading | No | products-mf/src/index.js:1 carrega o bootstrap da própria unidade. |
| src-async-bootstrap | shell/src/index.js:1 | shell | dynamic-loading | No | shell/src/index.js:1 carrega o bootstrap local do shell. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | shell/src/App.js:25 | shell | runtime-composition | Yes | Renderiza o componente Header de outra unidade dentro de Suspense (shell/src/App.js:24-26); carregado pelo import remoto em shell/src/App.js:5. |
| manual | shell/src/App.js:33 | shell | runtime-composition | Yes | Renderiza o componente Products de outra unidade dentro de Suspense (shell/src/App.js:32-34); carregado pelo import remoto em shell/src/App.js:13. |

## Resumo

Construções com composição: 4 (dynamic-loading: 2, runtime-composition: 2).

## Notas

- A revisão estrutural marca as três unidades Undetermined pelos templates HTML ausentes. Elas continuam sendo as unidades das linhas desta etapa; a cadeia de código shell/src/index.js:1 → shell/src/bootstrap.js:3-6 → shell/src/App.js:3-34 está presente e ligada à configuração de build, sem código comentado ou arquivo órfão.
- Os Yes descrevem construções de composição observáveis e referenciadas pelo código de entrada; não confirmam executabilidade do snapshot. shell/webpack.config.js:40 referencia template ausente, assim como os remotes, conforme registrado na revisão estrutural.
- Os fallbacks em shell/src/App.js:5-7 e shell/src/App.js:13-15 mostram tratamento de falha dos imports; não constituem novas unidades ou outra carga remota. Não há comunicação por eventos entre unidades encontrada nas buscas.
- Pelo critério de construções fora da mineração (passo 4 do método), ficam fora da tabela os exports dos componentes expostos: header-mf/src/Header.js:38 e products-mf/src/Products.js:70 (exposição em header-mf/webpack.config.js:25-26 e products-mf/webpack.config.js:25-26).
