---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 045 — mrgleam/mf-tanstack-demo

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | shell/src/moduleLoader.ts:130 | shell | dynamic-loading | Yes | Importa shop/ShopRoutes em shell/src/moduleLoader.ts:127-136; registro é usado por shell/src/router.tsx:52-57, alcançado a partir da entrada shell/src/main.tsx:4-7. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | shell/src/moduleLoader.ts:127 | shell | host-relationship | Yes | MODULE_CONFIGS declara shop/ShopRoutes como módulo usado pelo shell e define fallback (shell/src/moduleLoader.ts:127-136); configuração selecionada em shell/src/router.tsx:52-57. |
| manual | shell/src/router.tsx:52 | shell | remote-resolution | Yes | Solicita ao ModuleLoader o módulo shop configurado, com cache e tratamento de falhas em shell/src/moduleLoader.ts:26-98; função alcançada por shell/src/router.tsx:87 e shell/src/router.tsx:116. |
| manual | shell/src/router.tsx:64 | shell | runtime-composition | Undetermined | Tenta extrair result.module.default.routes do módulo remoto (shell/src/router.tsx:61-68), mas shop/src/routes/ShopRoutes.tsx:49-53 só exporta routes e shopRouter por nome, sem default. Não há compatibilidade comprovada para integrar as rotas. |

## Resumo

Construções com composição: 3 (dynamic-loading: 1, host-relationship: 1, remote-resolution: 1).

## Notas

- A cadeia ativa é shell/src/main.tsx:4-7 → shell/src/router.tsx:116 → createRouterAsync/loadFederatedModules → MODULE_CONFIGS.shop em shell/src/moduleLoader.ts:127-136. A ocorrência de import remoto é Yes: o módulo é solicitado, independentemente da compatibilidade das rotas exportadas.
- Ponto de dúvida: o consumidor exige default.routes, mas shop/src/routes/ShopRoutes.tsx:49-53 não fornece export default. O arquivo é exposto diretamente em shop/vite.config.ts:12. Por isso a integração pretendida das rotas ficou Undetermined; a classificação não foi alterada.
- As rotas próprias do shop e sua montagem standalone em shop/src/main.tsx:4-7 são internas à unidade. Não há comunicação por eventos entre unidades encontrada nas buscas.
- Pelo critério de construções fora da mineração (passo 4 do método), a integração das rotas remotas é uma linha (shell/src/router.tsx:64); os passos seguintes, a reatribuição por `replaceParentRoute` em shell/src/router.tsx:92 e o acréscimo à árvore em shell/src/router.tsx:99-103, dependem da mesma extração incompatível.
