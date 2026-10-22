---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 002 — EnjoyFX/fe_containerize

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-mount-export | microfrontend/src/main.jsx:7 | microfrontend | runtime-composition | Yes | Exporta `mount(container)`, que renderiza Widget em microfrontend/src/main.jsx:7-11; consumido por outra unidade em frontend/src/RemoteWidget.jsx:14; entrada do bundle em microfrontend/vite.config.js:25-29. |
| src-mount-export | microfrontend/src/main.jsx:14 | microfrontend | runtime-composition | Yes | Exporta `unmount(container)` em microfrontend/src/main.jsx:14-19, chamado pelo host na limpeza em frontend/src/RemoteWidget.jsx:24-26. |
| src-mount-call | frontend/src/RemoteWidget.jsx:14 | frontend | runtime-composition | Yes | Monta o widget externo após carregar seu script (frontend/src/RemoteWidget.jsx:12-18); componente usado por App em frontend/src/App.jsx:802, a partir da entrada frontend/src/main.jsx:3-8. |
| src-mount-call | frontend/src/RemoteWidget.jsx:26 | frontend | runtime-composition | Yes | Desmonta o widget de outra unidade na limpeza do efeito (frontend/src/RemoteWidget.jsx:24-31); montagem ativa em frontend/src/App.jsx:802. |
| src-mount-call | microfrontend/src/main.jsx:7 | microfrontend | runtime-composition | Yes | O padrão reconheceu a declaração, não uma chamada: mesma exportação `mount` de microfrontend/src/main.jsx:7-11, usada pelo host em frontend/src/RemoteWidget.jsx:14. |
| src-mount-call | microfrontend/src/main.jsx:14 | microfrontend | runtime-composition | Yes | O padrão reconheceu a declaração, não uma chamada: mesma exportação `unmount` de microfrontend/src/main.jsx:14-19, usada pelo host em frontend/src/RemoteWidget.jsx:26. |
| src-bundle-url | frontend/src/App.jsx:475 | frontend | none | No | frontend/src/App.jsx:475 é texto YAML dentro de uma string de exemplo para exibição, não carregamento de código; a montagem executável está em frontend/src/App.jsx:800-803. |
| src-bundle-url | frontend/src/App.jsx:802 | frontend | script-loading | Yes | Passa a URL do bundle IIFE de microfrontend para RemoteWidget (frontend/src/App.jsx:800-803); o wrapper atribui essa URL ao script em frontend/src/RemoteWidget.jsx:8-9. |
| src-dynamic-script | frontend/src/RemoteWidget.jsx:8 | frontend | script-loading | Yes | Injeta script com a URL do widget e o anexa ao documento (frontend/src/RemoteWidget.jsx:8-22); usado por App em frontend/src/App.jsx:802, carregado por frontend/src/main.jsx:3-8. |

## Construções fora da mineração

Nenhuma construção adicional.

## Resumo

Construções com composição: 8 (runtime-composition: 6, script-loading: 2).

## Notas

- As definições de mount e unmount aparecem duas vezes por sobreposição dos padrões src-mount-export e src-mount-call. As linhas foram preservadas e o resumo conta ocorrências, não construções únicas.
- A cadeia do host é frontend/index.html:10 → frontend/src/main.jsx:3-8 → frontend/src/App.jsx:2 e frontend/src/App.jsx:802 → frontend/src/RemoteWidget.jsx:7-32. O bundle do widget usa microfrontend/src/main.jsx como entrada (microfrontend/vite.config.js:25-29).
- A busca adicional não encontrou outra construção de composição. root.unmount em microfrontend/src/main.jsx:17 é a limpeza interna da raiz React; não constitui outra interação entre unidades.
