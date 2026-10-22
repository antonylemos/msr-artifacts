---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 006 — Pandian-it/eager-workspace1

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/cart/src/main.ts:1 | projects/cart | dynamic-loading | No | Importa o bootstrap local de cart em projects/cart/src/main.ts:1; não carrega outra unidade. |
| src-async-bootstrap | projects/checkout/src/main.ts:1 | projects/checkout | dynamic-loading | No | Importa o bootstrap local de checkout em projects/checkout/src/main.ts:1; interno à unidade. |
| src-async-bootstrap | projects/orders/src/main.ts:1 | projects/orders | dynamic-loading | No | Importa o bootstrap local de orders em projects/orders/src/main.ts:1; interno à unidade. |
| src-async-bootstrap | projects/shell/src/main.ts:1 | projects/shell | dynamic-loading | No | Importa o bootstrap local do shell em projects/shell/src/main.ts:1; interno à unidade. |
| src-load-remote | projects/shell/src/app/app-routing.module.ts:13 | projects/shell | remote-resolution | Yes | A rota cart chama o carregador do ManifestService (projects/shell/src/app/app-routing.module.ts:9-14); rotas registradas em projects/shell/src/app/app-routing.module.ts:41-45 e importadas por projects/shell/src/app/app.module.ts:24. |
| src-load-remote | projects/shell/src/app/app-routing.module.ts:20 | projects/shell | remote-resolution | Yes | A rota checkout chama o carregador remoto (projects/shell/src/app/app-routing.module.ts:16-21), conectado ao AppModule por projects/shell/src/app/app.module.ts:4 e projects/shell/src/app/app.module.ts:24. |
| src-load-remote | projects/shell/src/app/app-routing.module.ts:27 | projects/shell | remote-resolution | Yes | A rota orders chama o carregador remoto (projects/shell/src/app/app-routing.module.ts:23-28), conectado ao AppModule por projects/shell/src/app/app.module.ts:4 e projects/shell/src/app/app.module.ts:24. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:4 | projects/shell | remote-resolution | Yes | Importa a API usada em projects/shell/src/app/manifest.service.ts:71-75 para carregar o módulo de outra aplicação; o serviço é invocado pelas rotas em projects/shell/src/app/app-routing.module.ts:13-27. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:23 | projects/shell | remote-resolution | Yes | Método que busca o manifesto local ou de produção (projects/shell/src/app/manifest.service.ts:23-36) para resolver as entradas dos remotes; chamado em projects/shell/src/app/manifest.service.ts:65. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:63 | projects/shell | remote-resolution | Yes | Define o carregador usado nas rotas do shell (projects/shell/src/app/app-routing.module.ts:13-27); resolve remoteEntry e carrega ./Module em projects/shell/src/app/manifest.service.ts:63-75. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:65 | projects/shell | remote-resolution | Yes | Carrega o manifesto antes de resolver o remoteEntry, dentro do fluxo ativo do carregador em projects/shell/src/app/manifest.service.ts:63-75. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:71 | projects/shell | remote-resolution | Yes | Invoca a API com remoteEntry e exposedModule ./Module (projects/shell/src/app/manifest.service.ts:71-75), retornando MfeModule à rota do shell em projects/shell/src/app/app-routing.module.ts:13-27. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | projects/shell/src/app/app-routing.module.ts:8 | projects/shell | host-relationship | Yes | Declara as rotas que nomeiam cart, checkout e orders (projects/shell/src/app/app-routing.module.ts:8-28), registradas por RouterModule.forRoot em projects/shell/src/app/app-routing.module.ts:42. |
| manual | projects/shell/src/app/manifest.service.ts:40 | projects/shell | remote-resolution | Yes | getRemoteUrl resolve a entrada de outra aplicação pelo manifesto: URL direta em desenvolvimento ou caminho com versão em produção (projects/shell/src/app/manifest.service.ts:40-58); chamado em projects/shell/src/app/manifest.service.ts:68. |

## Resumo

Construções com composição: 10 (remote-resolution: 9, host-relationship: 1).

## Notas

- Cadeia ativa: projects/shell/project.json:24 → projects/shell/src/main.ts:1 → projects/shell/src/bootstrap.ts:3-7 → projects/shell/src/app/app.module.ts:4 e projects/shell/src/app/app.module.ts:24 → AppRoutingModule e ManifestService.
- projects/cart é Undetermined na revisão estrutural pela inicialização standalone; isso não torna inativa a construção do shell que solicita o remote cart. O julgamento aqui descreve o código de composição, sem afirmar sucesso de execução ou disponibilidade dos servidores.
- As buscas adicionais encontraram a declaração de rotas e a resolução de URL não capturadas por src-*. Os imports de bootstrap locais não participam da interação entre unidades.
