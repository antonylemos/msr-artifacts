---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Leitura do repositório

Reprodução mínima de um defeito de Module Federation com Vite (README.md:3), organizada como workspace pnpm com quatro pacotes: `host`, `remote_a`, `remote_b` e `remote_c` (pnpm-workspace.yaml:1-5). Cada pacote tem `package.json` e `vite.config.js` próprios, com `build` (`vite build`) e `preview` (`vite preview`) (ex.: host/package.json:5-8). A raiz só orquestra: `build` dispara o build de cada pacote por filtro, e `build:all` os roda em sequência, dos remotes ao host (package.json:6-7); os scripts `preview:*` servem cada pacote construído na sua porta, de 5000 a 5003 (package.json:8-11). O README manda fazer o mesmo à mão, construindo os pacotes um a um e subindo quatro `vite preview` em `127.0.0.1` antes de rodar o roteiro Playwright (README.md:33-45).

Tudo o que existe é execução local de um experimento. Cada `vite.config.js` fixa `base` em `http://localhost:<porta>/` e uma porta de `preview` com `strictPort` (host/vite.config.js:14-16; remote_a/vite.config.js:14-16; remote_b/vite.config.js:14-16; remote_c/vite.config.js:14-16), e o build só ajusta `target` e desliga a minificação (host/vite.config.js:38). Os artefatos gerados ficam presos a essas portas de `localhost`. `scripts/capture.mjs` abre o host em `http://localhost:5000/` (scripts/capture.mjs:58) e grava relatórios em `evidence/` (scripts/capture.mjs:6, 124-130); é ferramenta de teste, não deploy. `dist/` é ignorado no git (.gitignore:2). Não há Dockerfile, compose, CI nem configuração de hospedagem, e o `matches.csv` não tem nenhuma ocorrência `ops-*`, `ci-*` ou `cfg-public-path`.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | host | separado | não observado | `http://localhost:5000/` (host/vite.config.js:15-16) | No | host/vite.config.js:13-39 (configuração própria, `base` fixo); host/package.json:6 (`vite build`); package.json:6-7 (`build`, `build:all`) |
| 2 | remote_a | separado | não observado | `http://localhost:5001/` (remote_a/vite.config.js:15-16) | No | remote_a/vite.config.js:13-38 (configuração própria, `base` fixo); remote_a/package.json:6 (`vite build`); package.json:6-7 (`build`, `build:all`) |
| 3 | remote_b | separado | não observado | `http://localhost:5002/` (remote_b/vite.config.js:15-16) | No | remote_b/vite.config.js:13-31 (configuração própria, `base` fixo); remote_b/package.json:6 (`vite build`); package.json:6-7 (`build`, `build:all`) |
| 4 | remote_c | separado | não observado | `http://localhost:5003/` (remote_c/vite.config.js:15-16) | No | remote_c/vite.config.js:13-31 (configuração própria, `base` fixo); remote_c/package.json:6 (`vite build`); package.json:6-7 (`build`, `build:all`) |

## Observações

**1. host.** Build Vite próprio (host/package.json:6), disparado por último em `build:all` (package.json:7). Os endereços dos remotes ficam fixos em `localhost:5001` e `localhost:5002` na configuração (host/vite.config.js:22-31), e o próprio `base` em `localhost:5000`. Sem deploy observado: `preview:host` (package.json:11) e o `vite preview` do README (README.md:43) só servem localmente. O pacote é `private` e a versão não é usada para publicá-lo.

**2. remote_a.** Build próprio (remote_a/package.json:6). É remote do host e host de remote_c, cuja entrada fica fixa em `http://localhost:5003/remoteEntry.js` (remote_a/vite.config.js:26-30); por isso `build:all` constrói remote_c antes dele (package.json:7). Servido só por `preview:remote_a` na porta 5001 (package.json:10). Sem deploy observado.

**3. remote_b.** Build próprio (remote_b/package.json:6), com `base` em `localhost:5002`. Servido só por `preview:remote_b` (package.json:9). Sem deploy observado.

**4. remote_c.** Build próprio (remote_c/package.json:6), o primeiro em `build:all` (package.json:7), com `base` em `localhost:5003`. Servido só por `preview:remote_c` (package.json:8). Sem deploy observado.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (não observado: 4). Versionamento independente: 0.
