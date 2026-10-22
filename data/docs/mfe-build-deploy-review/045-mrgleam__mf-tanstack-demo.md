---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
inputs:
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

## Leitura do repositório

Duas aplicações Vite independentes, `shell` e `shop`, cada uma com manifesto, lockfile e `vite.config.ts` próprios, e sem workspace. O `shop` é construído com `base: '/shop/'` e saída em `dist` (shop/vite.config.ts:6, 20-25). O shell busca o remote em `http://localhost:3001/shop/assets/remoteEntry.js` (shell/vite.config.ts:9-11). O README manda rodar as duas com `npm run dev`, cada uma no seu terminal (README.md:22-30). As duas também têm `preview` com porta fixa (shell/vite.config.ts:30-33; shop/vite.config.ts:26-29).

As pastas `kong-shell/` e `kong-remote/` trazem dois arranjos alternativos de um gateway Kong em Docker, sem banco e com configuração declarativa, que o README apresenta como "Choose one" (README.md:32-44). Nenhum dos dois empacota ou publica as aplicações: o Kong roda em contêiner e encaminha para os servidores que já estão rodando na máquina (`host.docker.internal:3000` e `:3001`).
- **kong-shell:** só uma rota, `/` → shell (kong-shell/kong.yml:3-9), com TLS e certificados gerados à mão (kong-shell/docker-compose.yml:12-17; kong-shell/start-kong-ssl.sh:6-11).
- **kong-remote:** acrescenta a rota `/shop` → shop, sem remover o prefixo (kong-remote/kong.yml:8-13), para acessar o remote também sozinho, segundo o README (README.md:10, 41-44).

Os arranjos têm inconsistências entre si:
- **Portas:** o README indica `http://localhost:8000` (README.md:46-49), e é isso que o `kong-remote` publica (kong-remote/docker-compose.yml:5-7). O `kong-shell`, porém, publica a porta HTTP 8000 do contêiner na 8080 do host (kong-shell/docker-compose.yml:5-8), e o script dele anuncia as portas internas 8000/8443 (kong-shell/start-kong-ssl.sh:29-31).
- **Remote no kong-shell:** o shell continua buscando o remote direto em `localhost:3001`, fora do gateway.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | shell | separado | não observado | `http://localhost:3000` (shell/vite.config.ts:15-16, 30-31); `/` do gateway Kong, encaminhado ao servidor local (kong-shell/kong.yml:3-8; kong-remote/kong.yml:3-7) | No | shell/vite.config.ts:5-34 (configuração própria); shell/package.json:7 (`vite build`); kong-shell/kong.yml:3-9 (rota do gateway para o servidor local) |
| 2 | shop | separado | não observado | `http://localhost:3001/shop/` (shop/vite.config.ts:6, 16-17); `/shop` do gateway Kong, encaminhado ao servidor local (kong-remote/kong.yml:8-13) | No | shop/vite.config.ts:5-30 (configuração própria, `base: '/shop/'`); shop/package.json:7 (`vite build`); kong-remote/kong.yml:8-13 (rota do gateway para o servidor local) |

## Observações

**1. shell.** Build próprio. O deploy é `não observado`: o gateway só encaminha para o servidor de desenvolvimento do shell, que o README manda subir com `npm run dev` (README.md:28-29). Nada empacota ou publica o build. A versão `1.0.0` não é usada.

**2. shop.** Build próprio, com `base` próprio. Isso permite que o remote divida uma origem com o shell, sob o prefixo `/shop`, como faz o `kong-remote`. É o mesmo princípio de caminho por aplicação dos repositórios 059 e 017, só que aqui sobre servidores locais. O deploy é `não observado` pelo mesmo motivo do shell.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (não observado: 2). Versionamento independente: 0.
