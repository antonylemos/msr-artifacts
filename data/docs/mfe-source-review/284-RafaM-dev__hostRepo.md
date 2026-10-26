---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 284 — RafaM-dev/hostRepo

## Construções da mineração

Nenhuma ocorrência src-* no matches.csv.

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | src/features/episodes_list/ListEpisodes.tsx:96 | . | runtime-composition | Yes | Renderiza `<DetailEpisode />` da unidade externa `mf-remoteDetails` (src/features/episodes_list/ListEpisodes.tsx:96-100), importado em src/features/episodes_list/ListEpisodes.tsx:15 (`import DetailEpisode from "mf-remoteDetails/DetailEpisode"`) e resolvido pelo remote declarado em vite.config.ts:11-13 (`http://localhost:5001/assets/remoteEntry.js`); tipo declarado em src/declare.d.ts:1-4. Ativo: `ListEpisodes` é o element da rota `/episodes` em src/App.tsx:11, e App é renderizado em src/main.tsx:7-13. Props `character`, `open`, `onClose` passadas ao remote (ListEpisodes.tsx:97-99). |

## Resumo

Construções com composição: 1 (runtime-composition: 1).

## Notas

- A unidade alvo `mf-remoteDetails` está fora do snapshot; só aparece em vite.config.ts:12.
- O carregamento do remote é por import estático de módulo federado (ListEpisodes.tsx:15), que nenhum padrão `src-*` pega; a mineração registra apenas a configuração (`cfg-*`, `rt-remote-entry`).
