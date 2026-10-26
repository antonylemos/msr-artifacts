---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
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

# 172 — Jyotisaini1234/moduleFederation

## Leitura do repositório

Exemplo mínimo de Module Federation com webpack 5, com dois projetos irmãos e nenhum manifesto na raiz: `mfe1` (host) e `mfe2` (remote). Cada um tem seu `package.json`, seu `package-lock.json` e os mesmos dois scripts, que rodam o webpack por `ts-node/esm` sobre um `webpack.config.ts`: `start` com `serve` e `build` com `--mode production` (mfe1/package.json:7-10; mfe2/package.json:7-10). Nenhum script dispara os dois builds juntos. A saída do `mfe1` vai para `mfe1/dist`, com nomes por `contenthash` (mfe1/webpack.config.ts:37-42); o `mfe2` só define `publicPath` e usa o diretório padrão do webpack (mfe2/webpack.config.ts:19-21). Os dois `dist` estão no `.gitignore` (.gitignore:3, 6).

Não há artefato de deploy no snapshot: nem Dockerfile, nem compose, nem workflow de CI, nem configuração de hospedagem, e o `matches.csv` não tem ocorrências `ci-*`. A única `ops-*` é `ops-cors` em mfe1/webpack.config.ts:31, um cabeçalho `Access-Control-Allow-Origin` dentro do `devServer` (mfe1/webpack.config.ts:22-35), não um artefato de deploy. As duas ocorrências `cfg-public-path` são `publicPath: 'auto'` (mfe1/webpack.config.ts:41; mfe2/webpack.config.ts:20). O host aponta o remote para `http://localhost:3002/remoteEntry.js` (mfe1/webpack.config.ts:77; revisão de composição, coluna Configuração), a porta do servidor de desenvolvimento do `mfe2` (mfe2/webpack.config.ts:15-18), de modo que mesmo o build de produção só encontra o remote na máquina local.

`mfe1` traz ainda um servidor HTTP com SSR que serve os arquivos de `mfe1/dist` em `/static/` e escuta em `PORT` ou 3003 (mfe1/src/server/server.ts:15-16, 84, 100-104). Nenhum script o executa (mfe1/package.json:7-10) e ele não é compilado por nenhuma configuração do snapshot; por isso não conta como artefato de deploy. O README só tem o título (README.md:1).

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | mfe1 | separado | não observado | `http://localhost:3001/`, só em desenvolvimento com `webpack serve` (mfe1/webpack.config.ts:26; mfe1/package.json:8) | No | mfe1/package.json:9 (`webpack --mode production`); mfe1/webpack.config.ts:18-101 (entrada própria, saída em `dist`, `ModuleFederationPlugin` `app1`, `HtmlWebpackPlugin`) |
| 2 | mfe2 | separado | não observado | `http://localhost:3002/`, só em desenvolvimento com `webpack serve` (mfe2/webpack.config.ts:17; mfe2/package.json:8; mfe1/webpack.config.ts:77) | No | mfe2/package.json:9 (`webpack --mode production`); mfe2/webpack.config.ts:12-45 (entrada própria, `ModuleFederationPlugin` `app2` com `remoteEntry.js`, `HtmlWebpackPlugin`) |

## Observações

**1. mfe1.** Build webpack próprio, com entrada `./src/index.tsx`, página gerada de `./public/index.html` e o remote `app2` declarado no `ModuleFederationPlugin` (mfe1/webpack.config.ts:19, 74-93). A configuração fixa `mode: 'development'` (mfe1/webpack.config.ts:20), que o script `build` sobrescreve com `--mode production` (mfe1/package.json:9). O servidor SSR descrito acima é o único código que serviria o `dist` fora do `webpack serve`, mas nenhum artefato o executa. Sem deploy observado; versão `1.0.0` sem uso em publicação (mfe1/package.json:3).

**2. mfe2.** Build webpack próprio, com entrada própria e `remoteEntry.js` expondo `./App` (mfe2/webpack.config.ts:13, 37-40), também com `mode: 'development'` sobrescrito pelo script `build` (mfe2/webpack.config.ts:14; mfe2/package.json:9). O endereço em que o host o procura é o do servidor de desenvolvimento, porta 3002 (mfe1/webpack.config.ts:77; mfe2/webpack.config.ts:17). Sem deploy observado; versão `1.0.0` sem uso (mfe2/package.json:3).

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (não observado: 2). Versionamento independente: 0.
