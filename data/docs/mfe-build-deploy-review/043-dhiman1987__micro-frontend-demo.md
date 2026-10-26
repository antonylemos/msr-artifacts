---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 043 — dhiman1987/micro-frontend-demo

## Leitura do repositório

Demonstração de Web Components com quatro pastas. Três são estáticas, sem `package.json` nem build: `app-shell`, com `index.html` e `style.css`, e `app1` e `app2`, cada uma com `index.html` e `app.js`. Só a `app3` tem build: um `vite build` em modo biblioteca que gera o bundle `iife` `my-counter-app` (app3/package.json:8; app3/vite.config.js:9-15).

Não há artefato de deploy no repositório: nem Dockerfile, nem CI, nem configuração de hospedagem. As ocorrências `ops-*`, `ci-*` e `cfg-public-path` da mineração estão vazias. A execução descrita no README é toda local e manual: instalar o `http-server` globalmente e abrir um terminal por pasta, cada uma servida numa porta com CORS liberado (3000 a 3003). Na `app3`, o build roda antes de servir (README.md:42, 47-69). São essas portas que o shell usa nas URLs dos scripts (ver a revisão de composição).

Na `app3`, o README sobe o servidor na raiz da pasta (README.md:65-69). Como a configuração não define `outDir`, o Vite grava o bundle em `dist/`. O shell, porém, pede o bundle na raiz do servidor, sem `/dist/` (app-shell/index.html:26), e o README não diz como o servidor chega ao arquivo. O ponto não muda os valores da tabela, mas mostra que a demonstração, como descrita, não serve o bundle no caminho que o shell pede.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | app-shell | sem build | não observado | `http://localhost:3000`, servido à mão com `http-server` (README.md:46-50, 72) | No | — |
| 2 | app1 | sem build | não observado | `http://localhost:3001`, servido à mão com `http-server` (README.md:52-56) | No | — |
| 3 | app2 | sem build | não observado | `http://localhost:3002`, servido à mão com `http-server` (README.md:58-62) | No | — |
| 4 | app3 | separado | não observado | `http://localhost:3003`, servido à mão com `http-server` depois do build (README.md:64-70) | No | app3/vite.config.js:4-16 (build `lib` `iife` próprio); app3/package.json:8 (`vite build`) |

## Observações

**1. app-shell.** Página estática servida como está. Sem artefato de deploy: o `http-server` é rodado à mão em desenvolvimento, e por isso não conta. Não tem `package.json`, então não há versão.

**2. app1.** Página estática com um `app.js` que define a tag `hello-app`. O shell carrega esse arquivo da porta 3001. Sem build, sem deploy observado.

**3. app2.** Mesmo arranjo da app1, com a tag `world-app`, na porta 3002.

**4. app3.** Única aplicação com build: produz um bundle `iife` próprio, consumido pelo shell por URL. Sem deploy observado. A versão `0.0.0` (app3/package.json:4) não é usada.

## Resumo

Aplicações: 4. Build (separado: 1, sem build: 3). Deploy (não observado: 4). Versionamento independente: 0.
