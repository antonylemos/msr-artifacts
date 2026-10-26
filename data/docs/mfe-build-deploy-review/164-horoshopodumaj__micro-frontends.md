---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
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

# 164 — horoshopodumaj/micro-frontends

## Leitura do repositório

Demonstração de Module Federation com Rspack, com três projetos irmãos e nenhum manifesto na raiz: `host` (React), `remote` (React) e `vue-remote` (Vue 3). Cada projeto tem seu `package.json`, seu `package-lock.json` e o mesmo conjunto de scripts: `"build": "NODE_ENV=production rspack build"`, `build:dev`, `build:start` e `start` (host/package.json:4-9; remote/package.json:4-9; vue-remote/package.json:4-9). As três configurações Rspack são quase idênticas: entrada `./src/index.ts`, `HtmlRspackPlugin` com `./index.html` e `ModuleFederationPlugin` com a configuração federada do próprio projeto (host/rspack.config.ts:17-19, 78-81; remote/rspack.config.ts:17-19, 78-81; vue-remote/rspack.config.ts:16-18, 79-82). Nenhuma define `output.path`, só `uniqueName` e `publicPath` (host/rspack.config.ts:29-34), de modo que a saída fica no diretório padrão do Rspack, ignorado pelo git (host/.gitignore:85). Nenhum script dispara os três builds juntos.

Não há artefato de deploy no snapshot: nem Dockerfile, nem compose, nem workflow de CI, nem configuração de hospedagem, e o `matches.csv` não tem ocorrências `ops-*` nem `ci-*`. As três ocorrências `cfg-public-path` são os `publicPath` fixos em `localhost` de cada projeto (host/rspack.config.ts:33; remote/rspack.config.ts:33; vue-remote/rspack.config.ts:33), as mesmas portas do `devServer` (host/rspack.config.ts:24-25; remote/rspack.config.ts:24-25; vue-remote/rspack.config.ts:23-24). Como os containers remotos também são declarados em `localhost:3001` e `localhost:3002` (revisão de composição, coluna Configuração), mesmo o build de produção só funciona na máquina local.

Tudo o que o snapshot executa é de desenvolvimento: `start` roda `rspack serve`, e `build:start` roda `rspack serve` de dentro de `dist` (host/package.json:7-8), ainda o servidor de desenvolvimento. O README manda instalar e subir cada aplicação num terminal próprio com `npm run start` e abrir `http://localhost:3000` (README.md:61-65, 71, 101); ele usa `cd vue_remote`, mas o diretório é `vue-remote` (README.md:62).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | host | separado | não observado | `http://localhost:3000/`, só em desenvolvimento com `rspack serve` (host/rspack.config.ts:25, 33; host/package.json:8) | No | host/package.json:5 (`NODE_ENV=production rspack build`); host/rspack.config.ts:15-92 (entrada própria, `HtmlRspackPlugin`, `ModuleFederationPlugin`, `uniqueName: "host"`) |
| 2 | remote | separado | não observado | `http://localhost:3001/`, só em desenvolvimento com `rspack serve` (remote/rspack.config.ts:25, 33; remote/package.json:8) | No | remote/package.json:5 (`NODE_ENV=production rspack build`); remote/rspack.config.ts:15-92 (entrada própria, `HtmlRspackPlugin`, `ModuleFederationPlugin`, `uniqueName: "remote"`); remote/module-federation.config.ts:3 (`filename: 'remoteEntry.js'`) |
| 3 | vue-remote | separado | não observado | `http://localhost:3002/`, só em desenvolvimento com `rspack serve` (vue-remote/rspack.config.ts:24, 33; vue-remote/package.json:8) | No | vue-remote/package.json:5 (`NODE_ENV=production rspack build`); vue-remote/rspack.config.ts:14-92 (entrada própria, `vue-loader`, `HtmlRspackPlugin`, `ModuleFederationPlugin`, `uniqueName: "vue_remote"`); vue-remote/module-federation.config.ts:3 (`filename: 'remoteEntry.js'`) |

## Observações

**1. host.** Build próprio com o Rspack, que gera a página do contêiner a partir de `./index.html` (host/rspack.config.ts:78-80) e carrega o `remote` pela federação (host/rspack.config.ts:81). O `publicPath` `http://localhost:3000/` (host/rspack.config.ts:33) amarra os assets ao servidor local. Sem artefato de deploy. A versão `0.0.1` (host/package.json:3) não é usada em nenhuma publicação.

**2. remote.** Build próprio, igual ao do host salvo a porta, o `uniqueName` e o `publicPath` (remote/rspack.config.ts:25, 31, 33); gera também o `remoteEntry.js` consumido pelo host (remote/module-federation.config.ts:3). Sem deploy observado; versão `0.0.1` sem uso (remote/package.json:3).

**3. vue-remote.** Build próprio, com `vue-loader` e `VueLoaderPlugin` no lugar do refresh do React (vue-remote/rspack.config.ts:5, 43-47, 78) e `remoteEntry.js` próprio (vue-remote/module-federation.config.ts:3). O `uniqueName` `vue_remote` (vue-remote/rspack.config.ts:31) difere do nome do diretório. Sem deploy observado; versão `0.0.1` sem uso (vue-remote/package.json:3).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
