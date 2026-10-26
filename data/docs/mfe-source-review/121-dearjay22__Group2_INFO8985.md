---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 121 — dearjay22/Group2_INFO8985

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-iframe | frontend/shell-app/src/App.js:32 | frontend/shell-app | embedding | Yes | O shell embute o `products-mf` num `<iframe>` (linhas 32-36) quando `window.location.pathname === "/products"` (linhas 4 e 31). O `src` vem de `getApiUrl()` (linhas 6-18), que no Codespaces monta `https://<codespace>-3001.app.github.dev` (linha 14); a porta 3001 é a do serviço `products-mf` (`docker-compose.yml:66-69`, `build: ./frontend/products-mf`, `3001:80`). Ativo: `App` é renderizado pela entrada `frontend/shell-app/src/index.js:4-12`. |

## Construções fora da mineração

Nenhuma construção adicional.

## Resumo

Construções com composição: 1 (embedding: 1).

## Notas

- Fora do Codespaces, `getApiUrl()` não tem `return` (`frontend/shell-app/src/App.js:6-18`) e o `src` do iframe fica `"undefined"`; a URL do `products-mf` só é montada para o host `*.app.github.dev` (linhas 8-15). Não há proxy para o `products-mf` no nginx do shell (`frontend/shell-app/nginx.conf:8-10`, só `try_files`).
- A busca do passo 4 achou apenas `import('web-vitals')` em `frontend/shell-app/src/reportWebVitals.js:3` e `frontend/products-mf/src/reportWebVitals.js:3`, carga de biblioteca do template do CRA, não de outra unidade; não viram linha.
- O `products-mf` não tem código de composição nem de comunicação (`postMessage`, eventos): renderiza `App` com dados locais de `products.json` (`frontend/products-mf/src/App.js:2,7-9`). `frontend/products-mf/src/ProductList.js` não é importado por nenhum arquivo.
