---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 045 — mrgleam/mf-tanstack-demo

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| shell | shell/index.html;shell/package.json;shell/vite.config.ts | shell/package.json:1-9 (manifesto próprio) | shell/index.html:10-11 (entrada main.tsx); shell/src/main.tsx:6-8 (monta React) | shell/vite.config.ts:5-29 (configuração própria); shell/package.json:7 (`vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| shop | shop/index.html;shop/package.json;shop/vite.config.ts | shop/package.json:1-10 (manifesto próprio) | shop/index.html:10-11 (entrada main.tsx); shop/src/main.tsx:6-8 (monta React) | shop/vite.config.ts:5-25 (configuração própria); shop/package.json:7 (`vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |

## Resumo

Aplicações frontend no snapshot: 2 (shell, shop).

## Notas

- kong-shell/docker-compose.yml:3-16 e kong-remote/docker-compose.yml:3-12 implantam apenas o gateway Kong. As rotas em kong-remote/kong.yml:3-13 apontam para servidores já externos ao container; não constroem nem publicam shell ou shop, por isso Deploy permanece —.
- Os diretórios kong-shell e kong-remote não constam de units.csv e não foram acrescentados à tabela.
