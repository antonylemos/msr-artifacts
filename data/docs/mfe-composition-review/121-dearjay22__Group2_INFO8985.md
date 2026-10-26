---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
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

# 121 — dearjay22/Group2_INFO8985

## Leitura do repositório

Projeto de disciplina que monta um e-commerce de demonstração com microsserviços Spring Boot, Eureka, Docker Compose e duas aplicações React criadas com CRA, pensado para rodar no GitHub Codespaces (README.md:1-2). As duas aplicações são `frontend/shell-app` e `frontend/products-mf`, cada uma com imagem Nginx própria e publicada pelo Compose nas portas 3000 e 3001 (docker-compose.yml:59-62, 66-69). Não há biblioteca de composição: o único mecanismo é um `<iframe>`.

O shell é uma página com navegação para `/` e `/products` (frontend/shell-app/src/App.js:26-28). Na rota `/products`, ele renderiza um iframe com título "Products Microfrontend" (frontend/shell-app/src/App.js:31-36). O `src` vem de `getApiUrl()`, que só monta uma URL quando o host é `*.app.github.dev`, trocando a porta da URL atual do Codespace por 3001 (frontend/shell-app/src/App.js:6-15). Fora do Codespaces a função não retorna nada e o `src` vira a string `"undefined"` (frontend/shell-app/src/App.js:17-18, 33). O comentário da linha 13 fala em API Gateway na porta 8080, mas a URL usa 3001.

A URL do iframe só traz a porta. No snapshot, a porta 3001 é a que o Compose publica para o serviço construído de `./frontend/products-mf` (docker-compose.yml:66-69), e o título do iframe fala em Products; mas não há `base`/`publicPath`, `homepage` ou outro nome na URL que aponte para a unidade. Pela regra do Destino, porta sozinha não basta, e o destino fica registrado pela URL (ver relação 1). A classificação (3.4.2) usou o mesmo mapeamento de porta para Q4, com outro critério; isso não é divergência a corrigir aqui.

O `products-mf` não tem código de composição nem de comunicação: renderiza uma tabela com dados de `products.json` local (frontend/products-mf/src/App.js:2, 7-9), e o `ProductList.js` não é importado (revisão de código-fonte, Notas). Não há `postMessage` nem eventos entre as duas aplicações.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/shell-app | https://${codespaceName}-3001.app.github.dev | page → embedded-frontend | origem → destino | iframe | Undetermined | Yes | docker-compose.yml:66-69 (serviço `products-mf`, `build: ./frontend/products-mf`, porta `3001:80`) | frontend/shell-app/src/App.js:32 |

## Observações

**1. frontend/shell-app → https://${codespaceName}-3001.app.github.dev.** O shell embute a URL num `<iframe>` na rota `/products` (frontend/shell-app/src/App.js:31-36); a URL é montada em frontend/shell-app/src/App.js:14 a partir do nome do Codespace extraído do host (frontend/shell-app/src/App.js:10-12). O único elemento da URL que aponta para uma unidade é a porta 3001, que o Compose publica para o serviço construído de `./frontend/products-mf` (docker-compose.yml:66-69). Como porta sozinha não basta, o destino fica escrito como aparece no artefato e No snapshot é `Undetermined`; se o mapeamento do Compose fosse aceito como correspondência, o destino seria `frontend/products-mf`, com No snapshot `Yes`. Ativa `Yes`: a linha da revisão de código-fonte é `Yes`, e o `App` é renderizado pela entrada do shell (frontend/shell-app/src/index.js:4-12). A relação só produz URL válida no Codespaces; fora dele o `src` fica `"undefined"` (frontend/shell-app/src/App.js:6-18, 33).

## Resumo

Relações: 1 (page → embedded-frontend: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: frontend/products-mf.
