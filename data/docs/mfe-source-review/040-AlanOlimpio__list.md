---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 040 — AlanOlimpio/list

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | src/components/ListRoutes/ListRoutes.js:5 | . | dynamic-loading | Yes | React.lazy importa RegisterApp/ModalRegister em src/components/ListRoutes/ListRoutes.js:5; componente usado pela rota em src/components/ListRoutes/ListRoutes.js:11; ListRoutes é montado pela entrada em src/bootstrap.js:5-12. |
| src-async-bootstrap | src/index.js:1 | . | dynamic-loading | No | src/index.js:1 importa o bootstrap local da própria unidade. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | src/components/ListRoutes/ListRoutes.js:9 | . | host-relationship | Yes | Routes declara o ponto /register para o componente remoto ModalRegister (src/components/ListRoutes/ListRoutes.js:9-12); roteador e ListRoutes são iniciados em src/bootstrap.js:9-13. |
| manual | src/components/ListRoutes/ListRoutes.js:11 | . | runtime-composition | Yes | O element da rota renderiza ModalRegister, importado da unidade externa em src/components/ListRoutes/ListRoutes.js:5; o conteúdo é encaixado em Outlet no layout List em src/components/List/List.js:82-84. |

## Resumo

Construções com composição: 3 (dynamic-loading: 1, host-relationship: 1, runtime-composition: 1).

## Notas

- A unidade externa RegisterApp tem URL em webpack.config.js:52-54 e não está no snapshot. A Unidade das linhas é ., correspondente à aplicação local, não ao remote externo.
- webpack.config.js:49-50 expõe ListRoutes, mas não há consumidor desse módulo no snapshot. A exportação comum de ListRoutes não foi acrescentada como uma segunda relação de composição sem consumidor observável.
- A cadeia ativa é src/index.js:1 → src/bootstrap.js:5-12 → src/components/ListRoutes/index.js:1-2 → src/components/ListRoutes/ListRoutes.js:5-11. Nenhum ponto de dúvida para a carga do ModalRegister.
