---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
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

# 136 — swtbhsmn/micro-frontend-demo

## Leitura do repositório

Demonstração mínima de Module Federation com duas aplicações React, `app1` (host) e `app2` (remote), cada uma numa pasta com `package.json`, lockfile e configuração webpack próprios. Não há manifesto nem workspace na raiz. O único script de cada aplicação é `start`, que roda `webpack serve` em modo development numa porta fixa (app1/package.json:5-7; app2/package.json:5-7). As duas configurações também fixam `mode: "development"` e o servidor de desenvolvimento nas portas 3001 e 3002 (app1/webpack.config.js:7-11; app2/webpack.config.js:7-11). Não há script `build` nem configuração de produção.

Não há artefato de deploy no snapshot: nem Dockerfile, nem compose, nem CI, nem configuração de hospedagem, e o `matches.csv` não tem ocorrências `ops-*` ou `ci-*`. As duas ocorrências `cfg-public-path` são o `publicPath: "auto"` de cada configuração (app1/webpack.config.js:13; app2/webpack.config.js:13), que deixa o webpack resolver o caminho dos chunks pela origem do script; é configuração de build, não publicação. A execução descrita no README é toda local: um terminal por pasta, `npm install` e `npm start`, primeiro o app2 e depois o app1 (README.txt:7-14). O endereço do remote no host é fixo em `http://localhost:3002/remoteEntry.js` (app1/webpack.config.js:31), ou seja, a composição só funciona com os dois servidores de desenvolvimento no ar.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | app1 | separado | não observado | `http://localhost:3001` em desenvolvimento (app1/webpack.config.js:8-9) | No | app1/webpack.config.js:5-40 (configuração própria, modo desenvolvimento, host de Module Federation); app1/package.json:6 (`webpack serve`) |
| 2 | app2 | separado | não observado | `http://localhost:3002` em desenvolvimento (app2/webpack.config.js:8-9); `remoteEntry.js` nessa origem, esperado pelo host (app1/webpack.config.js:31) | No | app2/webpack.config.js:5-41 (configuração própria, modo desenvolvimento, gera `remoteEntry.js`); app2/package.json:6 (`webpack serve`) |

## Observações

**1. app1.** Build separado: configuração webpack e dependências só desta aplicação, mesmo que o único uso seja o servidor de desenvolvimento (app1/package.json:6). Ela consome o remote `app2` por URL de localhost (app1/webpack.config.js:30-31) e não empacota código do app2. Sem deploy observado. A versão `1.0.0` (app1/package.json:3) não é usada em publicação, e o pacote é `private` (app1/package.json:4).

**2. app2.** Mesmo arranjo, na porta 3002, gerando o `remoteEntry.js` que expõe `./RemoteApp` (app2/webpack.config.js:29-32). Também roda sozinha, com página própria a partir do template (app2/webpack.config.js:36-38). Sem deploy observado. Versão `1.0.0` (app2/package.json:3) sem uso na publicação; pacote `private` (app2/package.json:4).

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (não observado: 2). Versionamento independente: 0.
