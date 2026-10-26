---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
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

# 284 — RafaM-dev/hostRepo

## Leitura do repositório

O repositório é só o host React + Vite de um explorador de personagens de Rick and Morty, feito como prova técnica. O snapshot tem uma única unidade, na raiz. O host usa `@originjs/vite-plugin-federation` e declara um único remote, `mf-remoteDetails`, servido em `http://localhost:5001/assets/remoteEntry.js` (vite.config.ts:8-15). Esse remote não está no snapshot. Dele o host importa o componente `DetailEpisode` (src/features/episodes_list/ListEpisodes.tsx:15), com o tipo declarado em src/declare.d.ts:1-4, e o renderiza como modal de detalhe na lista de episódios (src/features/episodes_list/ListEpisodes.tsx:96-100). A lista é a rota `/episodes` (src/App.tsx:11).

O host passa ao componente remoto o personagem selecionado, um booleano `open` e o callback `onClose`, que limpa a seleção no host (src/features/episodes_list/ListEpisodes.tsx:97-99). Esses props e o callback são a única troca entre as unidades; não há eventos, `postMessage` nem serviço compartilhado no `src/`, e por isso não há relação `communication`. O host também se declara `name: "host"` com `filename: "remoteEntry.js"` (vite.config.ts:9-10), mas não tem `exposes`: nada dele é oferecido a outra unidade. Só `react` e `react-dom` são compartilhados (vite.config.ts:14).

O README descreve outra configuração: um remote `remote_root` em `http://localhost:5174/assets/remoteEntry.js` (README.md:335-341, 346-347). A tabela segue o `vite.config.ts` do snapshot; o README não gera relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | mf-remoteDetails | host → remote | origem → destino | module-federation | No | Yes | vite.config.ts:11-13 (`remotes` com `mf-remoteDetails` em `http://localhost:5001/assets/remoteEntry.js`) | src/features/episodes_list/ListEpisodes.tsx:96 |

## Observações

**1. . → mf-remoteDetails.** O destino é conhecido só pelo nome do remote e pela URL na configuração (vite.config.ts:12) e pelo especificador `mf-remoteDetails/DetailEpisode` do import (src/features/episodes_list/ListEpisodes.tsx:15). Não há no snapshot nenhum `name`, `exposes` ou `base` que o resolva, e a classificação o registra como unidade externa: No snapshot = No. Ativa = Yes pela linha `Yes` da revisão de código-fonte: o componente é renderizado em src/features/episodes_list/ListEpisodes.tsx:96-100, dentro da rota `/episodes` (src/App.tsx:11), e o App é montado em src/main.tsx:7-13. O módulo exposto pelo remote não é observável; pelo import, seria `./DetailEpisode`.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 1.
Unidades sem relação: nenhuma.
