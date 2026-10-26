---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
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

# 228 — Christian-Encalada/examen-microfrontend

## Leitura do repositório

São três projetos npm independentes, sem workspace: o host `appclases` na raiz e os remotes `alert-sender` e `alert-dashboard` em subdiretórios, cada um com `package.json`, `package-lock.json` e `rspack.config.ts` próprios. Os três `package.json` têm os mesmos scripts: `build` (`rspack build` em produção), `build:dev`, `build:start` (`cd dist && rspack serve`) e `start` (`rspack serve` em desenvolvimento) (package.json:4-9; alert-sender/package.json:4-9; alert-dashboard/package.json:4-9). Não há script na raiz que dispare os builds dos remotes; o README manda instalar e iniciar cada projeto em seu diretório, em três terminais (README.md:23-66).

As três configurações Rspack são quase idênticas: entrada `./src/index.ts`, `HtmlRspackPlugin` com o `index.html` do projeto e `ModuleFederationPlugin` com o `module-federation.config.ts` do projeto (rspack.config.ts:17-19, 77-83). Diferem na porta do servidor de desenvolvimento (rspack.config.ts:25; alert-sender/rspack.config.ts:25; alert-dashboard/rspack.config.ts:25: 3000, 3001 e 3002) e no `output`, em que `uniqueName` e `publicPath` são próprios de cada aplicação (rspack.config.ts:29-34; alert-sender/rspack.config.ts:29-34; alert-dashboard/rspack.config.ts:29-34). Nenhuma define `output.path`, então cada build sai no `dist` do próprio projeto, ignorado pelo git (.gitignore:85).

Não há artefato de deploy no snapshot: nenhum workflow de CI, Dockerfile, compose, manifesto ou configuração de hospedagem, e o `matches.csv` não tem ocorrências `ops-*` nem `ci-*`. As únicas ocorrências do recorte são as três `cfg-public-path`, todas em `http://localhost` (rspack.config.ts:33; alert-sender/rspack.config.ts:33; alert-dashboard/rspack.config.ts:33), as mesmas portas das URLs dos remotes no host (module-federation.config.ts:6-7). É configuração de desenvolvimento: mesmo o build de produção fica preso a `localhost` pelo `publicPath`, e o `build:start` só serve o `dist` com o servidor do Rspack, rodado à mão.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | não observado | `http://localhost:3000` em desenvolvimento (rspack.config.ts:25, 33) | No | rspack.config.ts:15-92 (configuração própria, entrada `./src/index.ts`); package.json:5 (`rspack build`) |
| 2 | alert-dashboard | separado | não observado | `http://localhost:3002` em desenvolvimento (alert-dashboard/rspack.config.ts:25, 33) | No | alert-dashboard/rspack.config.ts:15-92 (configuração própria, gera `remoteEntry.js` pelo alert-dashboard/module-federation.config.ts:2-6); alert-dashboard/package.json:5 (`rspack build`) |
| 3 | alert-sender | separado | não observado | `http://localhost:3001` em desenvolvimento (alert-sender/rspack.config.ts:25, 33) | No | alert-sender/rspack.config.ts:15-92 (configuração própria, gera `remoteEntry.js` pelo alert-sender/module-federation.config.ts:2-6); alert-sender/package.json:5 (`rspack build`) |

## Observações

**1. . (host `appclases`).** O build da raiz parte só de `./src/index.ts` (rspack.config.ts:17-19) e não inclui o código dos remotes, que o host consome em tempo de execução pelos `remoteEntry.js` em localhost (module-federation.config.ts:5-8); por isso `separado`, embora os remotes estejam em subdiretórios dele. O `publicPath` `http://localhost:3000/` (rspack.config.ts:33) e a porta 3000 (rspack.config.ts:25) são de desenvolvimento. A `version` `0.0.1` (package.json:3) não é usada em publicação.

**2. alert-dashboard.** Projeto à parte, com build Rspack próprio (alert-dashboard/package.json:5; alert-dashboard/rspack.config.ts:15-92) que gera o `remoteEntry.js` do remote `AlertDashboard` (alert-dashboard/module-federation.config.ts:2-6). Servido só pelo servidor de desenvolvimento na porta 3002, com `publicPath` `http://localhost:3002/` (alert-dashboard/rspack.config.ts:25, 33). `version` `0.0.1` sem uso (alert-dashboard/package.json:3).

**3. alert-sender.** Mesma forma da aplicação 2: build próprio (alert-sender/package.json:5; alert-sender/rspack.config.ts:15-92), `remoteEntry.js` do remote `AlertSender` (alert-sender/module-federation.config.ts:2-6), porta 3001 e `publicPath` `http://localhost:3001/` (alert-sender/rspack.config.ts:25, 33). `version` `0.0.1` sem uso (alert-sender/package.json:3).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
